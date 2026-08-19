import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import Layout from "../layout/Layout";
  
  const API_BASE_URL =
    window.__SCADA_API_BASE_URL__ || "http://localhost:3100/api";
  
  const SCADA_ENDPOINTS = {
    latest: "/scada/latest",
    historyToday: "/scada/history",
    historyByDate: (date) => `/scada/history/${date}`,
    dates: "/scada/dates",
  };
  
  const HISTORY_LIMIT = 5000;
  const REFRESH_INTERVAL_MS = 60_000;
  
  function isMissingScadaValue(value) {
    if (value === null || value === undefined) return true;
  
    const text = String(value).trim().toLowerCase();
    return !text || ["--", "error", "n/a", "nan", "null"].includes(text);
  }
  
  function firstScadaValue(...values) {
    return values.find((value) => !isMissingScadaValue(value));
  }
  
  function toNumber(value) {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : 0;
    }
  
    if (isMissingScadaValue(value)) return 0;
  
    const match = String(value).replace(/\s+/g, "").match(/-?[\d.,]+/);
    if (!match) return 0;
  
    let normalized = match[0];
    const commaIndex = normalized.lastIndexOf(",");
    const dotIndex = normalized.lastIndexOf(".");
  
    if (commaIndex >= 0 && dotIndex >= 0) {
      if (commaIndex > dotIndex) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
      } else {
        normalized = normalized.replace(/,/g, "");
      }
    } else if (commaIndex >= 0) {
      const decimalLength = normalized.length - commaIndex - 1;
      normalized =
        decimalLength > 0 && decimalLength <= 3
          ? normalized.replace(",", ".")
          : normalized.replace(/,/g, "");
    }
  
    const number = Number.parseFloat(normalized);
    return Number.isFinite(number) ? number : 0;
  }
  
  function formatNumber(value) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(toNumber(value));
  }
  
  function pad(value) {
    return String(value).padStart(2, "0");
  }
  
  function getDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
  
    return `${year}-${month}-${day}`;
  }
  
  function getDateTimeOnly(value) {
    if (!value) return "";
  
    if (typeof value === "string") {
      return value.replace("T", " ").slice(0, 19);
    }
  
    const date = new Date(value);
  
    if (Number.isNaN(date.getTime())) return "";
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());
  
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  
  function getDateOnly(value) {
    const dateTime = getDateTimeOnly(value);
    return dateTime ? dateTime.slice(0, 10) : "";
  }
  
  function getTimeLabel(value) {
    const dateTime = getDateTimeOnly(value);
    return dateTime ? dateTime.slice(11, 16) : "-";
  }
  
  function getDateLabel(value) {
    const dateOnly = getDateOnly(value);
  
    if (!dateOnly) return "-";
  
    const [, month, day] = dateOnly.split("-");
    return `${day}/${month}`;
  }
  
  function getDateLabelText(value) {
    const dateOnly = getDateOnly(value);
  
    if (!dateOnly) return "-";
  
    const [year, month, day] = dateOnly.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
  
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
  }
  
  function getDateTimeLabel(value) {
    const dateOnly = getDateOnly(value);
    const timeLabel = getTimeLabel(value);
  
    if (!dateOnly || timeLabel === "-") return "-";
  
    const [, month, day] = dateOnly.split("-");
    return `${day}/${month} ${timeLabel}`;
  }
  
  function getTodayRange() {
    const today = getDateString(new Date());
  
    return {
      startDate: `${today} 00:00:00`,
      endDate: `${today} 23:59:59`,
    };
  }
  
  function getRealtimeMonthRange() {
    const today = new Date();
    const todayDate = getDateString(today);
    const year = today.getFullYear();
    const month = pad(today.getMonth() + 1);
  
    return {
      startDate: `${year}-${month}-01 00:00:00`,
      endDate: `${todayDate} 23:59:59`,
    };
  }
  
  function getCurrentMonthDateRange() {
    const today = new Date();
    const year = today.getFullYear();
    const month = pad(today.getMonth() + 1);
    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();
  
    return {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${pad(lastDay)}`,
    };
  }
  
  function getRealtimeRangeByPeriod(period) {
    if (period === "month") {
      return getRealtimeMonthRange();
    }
  
    return getTodayRange();
  }
  
  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
  
    if (!response.ok) {
      let detail = "";
  
      try {
        const payload = await response.json();
        detail = payload?.error ? `: ${payload.error}` : "";
      } catch {
        detail = "";
      }
  
      throw new Error(`${response.status} ${response.statusText}${detail}`);
    }
  
    return response.json();
  }
  
  function normalizePlantRows(entries = [], plantKey) {
    const isPlant1 = plantKey === "plant1";
    const sourceKey = isPlant1 ? "plant_1_otics" : "plant_2_huawei";
  
    return entries
      .map((entry, index) => {
        const values = entry?.[sourceKey] || {};
        const dateTime = getDateTimeOnly(entry?.timestamp);
  
        if (!dateTime) return null;
  
        const power = isPlant1
          ? toNumber(
              firstScadaValue(
                values.Power,
                values.power,
                values.Phase_1_INV1,
                values.Phase_1_INV2
              )
            )
          : toNumber(
              firstScadaValue(
                values["PV output (kW)"],
                values.PV_Output,
                values.power,
                values.Inverter_Rated_Power
              )
            );
  
        const kwh = isPlant1
          ? toNumber(
              firstScadaValue(
                values.PV_ENERGY_Today,
                values.Yield_Today,
                values.kwh
              )
            )
          : toNumber(
              firstScadaValue(
                values.Yield_Today,
                values.PV_ENERGY_Today,
                values.kwh
              )
            );
  
        return {
          idPrimary: `${plantKey}-${dateTime}-${index}`,
          date_time: dateTime,
          date_only: getDateOnly(dateTime),
          time_label: getTimeLabel(dateTime),
          date_label: getDateLabel(dateTime),
          datetime_label: getDateTimeLabel(dateTime),
          power,
          kwh,
          irradiance: isPlant1
            ? toNumber(values.Irradiation)
            : toNumber(values["Irradiance (W/m2)"]),
          temperature: toNumber(
            isPlant1 ? values.WEATHER_FOR_CIKARANG_TEMP : values.Temperature
          ),
          status: isPlant1 ? values.STATUS || "-" : "Online",
          raw: values,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.date_time.localeCompare(b.date_time));
  }
  
  function aggregateDailyEnergy(rows = []) {
    const grouped = new Map();
  
    rows.forEach((item) => {
      if (!item.date_only) return;
  
      const current = grouped.get(item.date_only);
  
      if (!current || item.date_time >= current.latest_date_time) {
        grouped.set(item.date_only, {
          energy_date: item.date_only,
          date_label: getDateLabelText(item.date_only),
          latest_date_time: item.date_time,
          plts_production_kwh: toNumber(item.kwh),
        });
      }
    });
  
    return Array.from(grouped.values())
      .sort((a, b) => a.energy_date.localeCompare(b.energy_date))
      .map(({ latest_date_time, ...item }) => item);
  }
  
  async function fetchTodayHistory() {
    const params = new URLSearchParams({ limit: String(HISTORY_LIMIT) });
    const json = await fetchJson(
      `${API_BASE_URL}${SCADA_ENDPOINTS.historyToday}?${params.toString()}`
    );
  
    return Array.isArray(json.data) ? json.data : [];
  }
  
  async function fetchHistoryByDate(date) {
    const params = new URLSearchParams({ limit: String(HISTORY_LIMIT) });
    const endpoint = SCADA_ENDPOINTS.historyByDate(date);
    const json = await fetchJson(
      `${API_BASE_URL}${endpoint}?${params.toString()}`
    );
  
    return Array.isArray(json.data) ? json.data : [];
  }
  
  async function fetchCurrentMonthHistory() {
    const datesJson = await fetchJson(`${API_BASE_URL}${SCADA_ENDPOINTS.dates}`);
    const monthPrefix = getDateString(new Date()).slice(0, 7);
    const today = getDateString(new Date());
  
    const dates = (Array.isArray(datesJson.dates) ? datesJson.dates : [])
      .map((item) => (typeof item === "string" ? item : item?.date))
      .filter(
        (date) =>
          typeof date === "string" &&
          date.startsWith(monthPrefix) &&
          date <= today
      )
      .sort();
  
    if (!dates.length) return [];
  
    const results = await Promise.all(dates.map((date) => fetchHistoryByDate(date)));
    return results.flat();
  }
  
  async function fetchHistoryByPeriod(period) {
    return period === "month" ? fetchCurrentMonthHistory() : fetchTodayHistory();
  }
  
  function filterDailyByCurrentMonth(rows = [], monthRange) {
    return rows
      .filter((item) => {
        if (!item.energy_date) return false;
        if (item.energy_date < monthRange.startDate) return false;
        if (item.energy_date > monthRange.endDate) return false;
  
        return true;
      })
      .sort((a, b) => a.energy_date.localeCompare(b.energy_date));
  }
  
  function aggregateRealtimeDaily(rows = []) {
    const grouped = new Map();
  
    rows.forEach((item) => {
      if (!item.date_only) return;
  
      if (!grouped.has(item.date_only)) {
        grouped.set(item.date_only, {
          date_only: item.date_only,
          date_label: item.date_label,
          datetime_label: item.date_label,
          total_power: 0,
          count: 0,
          latest_date_time: item.date_time,
          latest_kwh: item.kwh,
          max_power: item.power,
        });
      }
  
      const current = grouped.get(item.date_only);
  
      current.total_power += item.power;
      current.count += 1;
      current.max_power = Math.max(current.max_power, item.power);
  
      if (item.date_time >= current.latest_date_time) {
        current.latest_date_time = item.date_time;
        current.latest_kwh = item.kwh;
      }
    });
  
    return Array.from(grouped.values()).map((item) => ({
      date_time: item.latest_date_time,
      date_only: item.date_only,
      date_label: item.date_label,
      datetime_label: item.datetime_label,
      power: item.count > 0 ? item.total_power / item.count : 0,
      kwh: item.latest_kwh,
      max_power: item.max_power,
    }));
  }
  
  function getRealtimeChartData(rows = [], period) {
    if (period === "month") {
      return aggregateRealtimeDaily(rows);
    }
  
    return rows.map((item) => ({
      ...item,
      datetime_label: item.time_label,
    }));
  }
  
  function getRealtimeSummary(rows = [], latest = null) {
    if (!rows.length) {
      return {
        totalData: 0,
        latestPower: toNumber(latest?.power),
        latestKwh: toNumber(latest?.kwh),
        avgPower: 0,
        maxPower: 0,
      };
    }
  
    const powers = rows.map((item) => toNumber(item.power));
    const totalPower = powers.reduce((total, value) => total + value, 0);
  
    return {
      totalData: rows.length,
      latestPower: toNumber(latest?.power ?? rows[rows.length - 1]?.power),
      latestKwh: toNumber(latest?.kwh ?? rows[rows.length - 1]?.kwh),
      avgPower: totalPower / rows.length,
      maxPower: Math.max(...powers),
    };
  }
  
  function buildDailyPvComparisonData(p1Rows = [], p2Rows = []) {
    const p1Map = new Map(p1Rows.map((item) => [item.energy_date, item]));
    const p2Map = new Map(p2Rows.map((item) => [item.energy_date, item]));
  
    const keys = Array.from(new Set([...p1Map.keys(), ...p2Map.keys()])).sort();
  
    return keys.map((key) => {
      const p1 = p1Map.get(key);
      const p2 = p2Map.get(key);
  
      const plant1Kwh = toNumber(p1?.plts_production_kwh);
      const plant2Kwh = toNumber(p2?.plts_production_kwh);
  
      return {
        energy_date: key,
        date_label: p1?.date_label || p2?.date_label || "-",
        plant1_plts_production_kwh: plant1Kwh,
        plant2_plts_production_kwh: plant2Kwh,
        difference_kwh: plant1Kwh - plant2Kwh,
      };
    });
  }
  
  function getDailyPvComparisonSummary(rows = []) {
    const plant1Total = rows.reduce(
      (total, item) => total + toNumber(item.plant1_plts_production_kwh),
      0
    );
  
    const plant2Total = rows.reduce(
      (total, item) => total + toNumber(item.plant2_plts_production_kwh),
      0
    );
  
    return {
      plant1Total,
      plant2Total,
      difference: plant1Total - plant2Total,
    };
  }
  
  function useElementWidth() {
    const elementRef = useRef(null);
    const [width, setWidth] = useState(0);
  
    useLayoutEffect(() => {
      const element = elementRef.current;
  
      if (!element) return;
  
      function updateWidth() {
        const rect = element.getBoundingClientRect();
        const nextWidth = Math.floor(rect.width);
  
        if (nextWidth > 0) {
          setWidth(nextWidth);
        }
      }
  
      updateWidth();
  
      const resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });
  
      resizeObserver.observe(element);
  
      return () => {
        resizeObserver.disconnect();
      };
    }, []);
  
    return [elementRef, width];
  }
  
  function LoadingBox() {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white text-sm font-semibold text-slate-500">
        Memuat data chart PLTS...
      </div>
    );
  }
  
  function ErrorBox({ message }) {
    return (
      <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-5 text-red-700">
        <p className="text-sm font-black">Gagal memuat data</p>
        <p className="mt-1 text-sm">{message}</p>
  
        <div className="mt-4 rounded-2xl bg-white p-3 text-xs text-red-700">
          <p className="font-black">Endpoint API SCADA:</p>
          <p className="mt-1 font-mono">/api/scada/latest</p>
          <p className="font-mono">/api/scada/history</p>
          <p className="font-mono">/api/scada/history/YYYY-MM-DD</p>
          <p className="font-mono">/api/scada/dates</p>
        </div>
      </div>
    );
  }
  
  function EmptyChart() {
    return (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center text-sm font-semibold text-slate-500">
        Tidak ada data pada periode ini.
      </div>
    );
  }
  
  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
  
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
        <p className="mb-1 font-black text-slate-800">{label}</p>
  
        {payload.map((item) => (
          <p key={item.dataKey} className="font-semibold text-slate-600">
            {item.name}:{" "}
            <span className="font-black text-slate-900">
              {formatNumber(item.value)}
            </span>
          </p>
        ))}
      </div>
    );
  }
  
  function MiniInfo({ label, value, unit }) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {label}
        </p>
  
        <div className="mt-1 flex items-end gap-1">
          <p className="text-base font-black text-slate-900">{value}</p>
  
          {unit && (
            <span className="mb-0.5 text-[10px] font-bold text-slate-500">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }
  
  function ChartBox({ height = 360, hasData, loadingText, children }) {
    const [chartRef, chartWidth] = useElementWidth();
  
    const chartPadding = 24;
    const innerChartWidth = Math.max(chartWidth - chartPadding, 320);
    const innerChartHeight = height - chartPadding;
    const canRenderChart = chartWidth > 80 && hasData;
  
    return (
      <div
        ref={chartRef}
        className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3"
        style={{
          height,
          minHeight: height,
        }}
      >
        {!hasData ? (
          <EmptyChart />
        ) : !canRenderChart ? (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">
            {loadingText || "Menyiapkan chart..."}
          </div>
        ) : (
          children({
            width: innerChartWidth,
            height: innerChartHeight,
          })
        )}
      </div>
    );
  }
  
  function PlantRealtimeChart({ title, data, latest, summary, period, color }) {
    return (
      <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70">
        <div className="mb-3 flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 md:flex-row md:items-start">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
              {title}
            </p>
  
            <h2 className="mt-1 text-lg font-black text-slate-950">
              Realtime Power dan kWh
            </h2>
  
            <p className="mt-1 text-xs text-slate-500">
              {period === "today"
                ? "Data realtime hari ini"
                : "Data realtime bulan ini, diringkas per hari"}
            </p>
          </div>
  
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Update
            </p>
  
            <p className="mt-1 text-xs font-black text-slate-900">
              {latest?.date_time || "-"}
            </p>
          </div>
        </div>
  
        <div className="mb-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
          <MiniInfo label="Data" value={formatNumber(summary.totalData)} />
  
          <MiniInfo
            label="Power"
            value={formatNumber(summary.latestPower)}
            unit="kW"
          />
  
          <MiniInfo
            label="kWh"
            value={formatNumber(summary.latestKwh)}
            unit="kWh"
          />
  
          <MiniInfo label="Max" value={formatNumber(summary.maxPower)} unit="kW" />
        </div>
  
        <ChartBox
          height={360}
          hasData={data.length > 0}
          loadingText="Menyiapkan chart realtime..."
        >
          {({ width, height }) => (
            <AreaChart
              width={width}
              height={height}
              data={data}
              margin={{
                top: 12,
                right: 18,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
  
              <XAxis
                dataKey="datetime_label"
                tick={{ fontSize: 11, fill: "#64748b" }}
                stroke="#94a3b8"
                minTickGap={18}
              />
  
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                stroke="#94a3b8"
              />
  
              <Tooltip content={<CustomTooltip />} />
  
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
  
              <Area
                type="monotone"
                dataKey="power"
                name={period === "month" ? "Rata-rata Power" : "Power"}
                stroke={color}
                fill={color}
                fillOpacity={0.16}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />
  
              <Line
                type="monotone"
                dataKey="kwh"
                name="kWh"
                stroke="#0f172a"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          )}
        </ChartBox>
      </section>
    );
  }
  
  function MonthlyMonitoringSection({ comparisonData, monthRange }) {
    return (
      <section className="mb-4 min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70">
        <div className="mb-3 border-b border-slate-100 pb-3">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
            Monthly Monitoring
          </p>
  
          <h2 className="mt-1 text-lg font-black text-slate-950">
            Chart Monitoring dari Tanggal 1 sampai Akhir Bulan
          </h2>
  
          <p className="mt-1 text-xs text-slate-500">
            Data chart ini memakai API daily full stack, bukan API realtime.
          </p>
  
          <p className="mt-1 text-xs font-semibold text-slate-400">
            Periode: {monthRange.startDate} sampai {monthRange.endDate}
          </p>
        </div>
  
        <ChartBox
          height={360}
          hasData={comparisonData.length > 0}
          loadingText="Menyiapkan chart monitoring bulanan..."
        >
          {({ width, height }) => (
            <BarChart
              width={width}
              height={height}
              data={comparisonData}
              margin={{
                top: 12,
                right: 18,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
  
              <XAxis
                dataKey="date_label"
                tick={{ fontSize: 11, fill: "#64748b" }}
                stroke="#94a3b8"
                minTickGap={18}
              />
  
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                stroke="#94a3b8"
              />
  
              <Tooltip content={<CustomTooltip />} />
  
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
  
              <Bar
                dataKey="plant1_plts_production_kwh"
                name="Plant 1 PLTS"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
  
              <Bar
                dataKey="plant2_plts_production_kwh"
                name="Plant 2 PLTS"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ChartBox>
      </section>
    );
  }
  
  function SingleDailyChartCard({ title, description, data, dataKey, barName, color }) {
    return (
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3">
          <h3 className="text-sm font-black text-slate-950">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
  
        <ChartBox
          height={300}
          hasData={data.length > 0}
          loadingText="Menyiapkan chart produksi..."
        >
          {({ width, height }) => (
            <BarChart
              width={width}
              height={height}
              data={data}
              margin={{
                top: 12,
                right: 18,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
  
              <XAxis
                dataKey="date_label"
                tick={{ fontSize: 11, fill: "#64748b" }}
                stroke="#94a3b8"
                minTickGap={18}
              />
  
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                stroke="#94a3b8"
              />
  
              <Tooltip content={<CustomTooltip />} />
  
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
  
              <Bar
                dataKey={dataKey}
                name={barName}
                fill={color}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ChartBox>
      </div>
    );
  }
  
  function PVComparisonSection({ comparisonData, summary }) {
    const plant1ChartData = comparisonData.map((item) => ({
      date_label: item.date_label,
      plant1_plts_production_kwh: item.plant1_plts_production_kwh,
    }));
  
    const plant2ChartData = comparisonData.map((item) => ({
      date_label: item.date_label,
      plant2_plts_production_kwh: item.plant2_plts_production_kwh,
    }));
  
    return (
      <section className="mb-4 min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70">
        <div className="mb-3 grid gap-3 border-b border-slate-100 pb-3 xl:grid-cols-[1fr_auto] xl:items-end">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
              PV Comparison
            </p>
  
            <h2 className="mt-1 text-lg font-black text-slate-950">
              Perbandingan Produksi PV Plant 1 dan Plant 2
            </h2>
  
            <p className="mt-1 text-xs text-slate-500">
              Produksi harian diambil dari nilai terakhir setiap file histori tanggal.
            </p>
          </div>
  
          <div className="grid grid-cols-3 gap-2">
            <MiniInfo
              label="Total P1"
              value={formatNumber(summary.plant1Total)}
              unit="kWh"
            />
  
            <MiniInfo
              label="Total P2"
              value={formatNumber(summary.plant2Total)}
              unit="kWh"
            />
  
            <MiniInfo
              label="Selisih"
              value={formatNumber(summary.difference)}
              unit="kWh"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <SingleDailyChartCard
            title="Plant 1 PLTS Production"
            description="Produksi harian Plant 1"
            data={plant1ChartData}
            dataKey="plant1_plts_production_kwh"
            barName="Plant 1 PLTS"
            color="#10b981"
          />
  
          <SingleDailyChartCard
            title="Plant 2 PLTS Production"
            description="Produksi harian PV Plant 2"
            data={plant2ChartData}
            dataKey="plant2_plts_production_kwh"
            barName="Plant 2 PLTS"
            color="#6366f1"
          />
        </div>
      </section>
    );
  }
  
  export default function PLTSCommonDashboard() {
    const [period, setPeriod] = useState("today");
  
    const [plant1, setPlant1] = useState({
      rawData: [],
      chartData: [],
      latest: null,
      summary: getRealtimeSummary([]),
    });
  
    const [plant2, setPlant2] = useState({
      rawData: [],
      chartData: [],
      latest: null,
      summary: getRealtimeSummary([]),
    });
  
    const [dailyPlant1, setDailyPlant1] = useState([]);
    const [dailyPlant2, setDailyPlant2] = useState([]);
  
    const [range, setRange] = useState(getRealtimeRangeByPeriod("today"));
    const [monthRange, setMonthRange] = useState(getCurrentMonthDateRange());
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    function buildPlantResult(entries, latestEntry, plantKey, selectedPeriod) {
      const rawData = normalizePlantRows(entries, plantKey);
      const normalizedLatest = latestEntry
        ? normalizePlantRows([latestEntry], plantKey)[0] || null
        : null;
      const latestData = normalizedLatest || rawData[rawData.length - 1] || null;
  
      return {
        rawData,
        chartData: getRealtimeChartData(rawData, selectedPeriod),
        latest: latestData,
        summary: getRealtimeSummary(rawData, latestData),
      };
    }
  
    async function fetchDashboardData(selectedPeriod, silent = false) {
      try {
        if (!silent) setLoading(true);
        setError("");
  
        const selectedRange = getRealtimeRangeByPeriod(selectedPeriod);
        const selectedMonthRange = getCurrentMonthDateRange();
  
        setRange(selectedRange);
        setMonthRange(selectedMonthRange);
  
        const realtimePromise = fetchHistoryByPeriod(selectedPeriod);
        const monthlyPromise =
          selectedPeriod === "month"
            ? realtimePromise
            : fetchCurrentMonthHistory();
        const latestPromise = fetchJson(
          `${API_BASE_URL}${SCADA_ENDPOINTS.latest}`
        ).catch(() => null);
  
        const [realtimeEntries, monthlyEntries, latestJson] = await Promise.all([
          realtimePromise,
          monthlyPromise,
          latestPromise,
        ]);
  
        const latestEntry = latestJson?.data || null;
        const plant1Result = buildPlantResult(
          realtimeEntries,
          latestEntry,
          "plant1",
          selectedPeriod
        );
        const plant2Result = buildPlantResult(
          realtimeEntries,
          latestEntry,
          "plant2",
          selectedPeriod
        );
  
        const monthlyPlant1Rows = normalizePlantRows(monthlyEntries, "plant1");
        const monthlyPlant2Rows = normalizePlantRows(monthlyEntries, "plant2");
  
        setPlant1(plant1Result);
        setPlant2(plant2Result);
        setDailyPlant1(
          filterDailyByCurrentMonth(
            aggregateDailyEnergy(monthlyPlant1Rows),
            selectedMonthRange
          )
        );
        setDailyPlant2(
          filterDailyByCurrentMonth(
            aggregateDailyEnergy(monthlyPlant2Rows),
            selectedMonthRange
          )
        );
      } catch (err) {
        if (silent) {
          console.error("Pembaruan otomatis data SCADA gagal:", err);
          return;
        }
  
        setPlant1({
          rawData: [],
          chartData: [],
          latest: null,
          summary: getRealtimeSummary([]),
        });
  
        setPlant2({
          rawData: [],
          chartData: [],
          latest: null,
          summary: getRealtimeSummary([]),
        });
  
        setDailyPlant1([]);
        setDailyPlant2([]);
        setError(err.message || "Terjadi kesalahan saat mengambil data SCADA.");
      } finally {
        if (!silent) setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchDashboardData(period);
  
      const timer = window.setInterval(() => {
        fetchDashboardData(period, true);
      }, REFRESH_INTERVAL_MS);
  
      return () => window.clearInterval(timer);
    }, [period]);
  
    const totalRealtimeData = useMemo(() => {
      return plant1.rawData.length + plant2.rawData.length;
    }, [plant1.rawData.length, plant2.rawData.length]);
  
    const dailyComparisonData = useMemo(() => {
      return buildDailyPvComparisonData(dailyPlant1, dailyPlant2);
    }, [dailyPlant1, dailyPlant2]);
  
    const dailyComparisonSummary = useMemo(() => {
      return getDailyPvComparisonSummary(dailyComparisonData);
    }, [dailyComparisonData]);
  
    return (
      <Layout>
        <main className="min-h-screen w-full min-w-0 bg-slate-50 p-3 text-slate-900 lg:p-4">
          <div className="mx-auto w-full max-w-[1700px] min-w-0">
            <section className="mb-3 flex flex-col justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                  Chart PLTS — JSON SCADA API
                </p>
  
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Realtime: {range.startDate} sampai {range.endDate} | Total data:{" "}
                  {formatNumber(totalRealtimeData)}
                </p>
  
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  Histori JSON: {monthRange.startDate} sampai {monthRange.endDate}
                </p>
              </div>
  
              <div className="flex w-full rounded-2xl bg-slate-100 p-1 md:w-auto">
                <button
                  type="button"
                  onClick={() => setPeriod("today")}
                  className={`flex-1 rounded-xl px-5 py-2 text-sm font-black transition md:flex-none ${
                    period === "today"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Hari Ini
                </button>
  
                <button
                  type="button"
                  onClick={() => setPeriod("month")}
                  className={`flex-1 rounded-xl px-5 py-2 text-sm font-black transition md:flex-none ${
                    period === "month"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Bulan Ini
                </button>
              </div>
            </section>
  
            {loading && <LoadingBox />}
  
            {!loading && error && <ErrorBox message={error} />}
  
            {!loading && !error && (
              <>
                <section className="mb-4 grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
                  <div className="min-w-0">
                    <PlantRealtimeChart
                      title="Plant 1 — Otics Listrindo"
                      data={plant1.chartData}
                      latest={plant1.latest}
                      summary={plant1.summary}
                      period={period}
                      color="#10b981"
                    />
                  </div>
  
                  <div className="min-w-0">
                    <PlantRealtimeChart
                      title="Plant 2 — Huawei FusionSolar"
                      data={plant2.chartData}
                      latest={plant2.latest}
                      summary={plant2.summary}
                      period={period}
                      color="#6366f1"
                    />
                  </div>
                </section>

  
                <PVComparisonSection
                  comparisonData={dailyComparisonData}
                  summary={dailyComparisonSummary}
                />
                  
                <MonthlyMonitoringSection
                  comparisonData={dailyComparisonData}
                  monthRange={monthRange}
                />
              </>
            )}
          </div>
        </main>
      </Layout>
    );
  }