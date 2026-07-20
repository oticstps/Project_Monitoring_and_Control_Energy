'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || '0.0.0.0';

// app.js dan seluruh JSON berada di folder yang sama:
// /home/tpsoticsraspia1/on/d-surya/d-program
// DATA_DIR tetap bisa dioverride melalui environment variable.
const DATA_DIR = path.resolve(process.env.DATA_DIR || __dirname);
const LATEST_FILE = path.join(DATA_DIR, 'latest_scada_data.json');
const HISTORY_PREFIX = 'multi_plant_data_';
const HISTORY_PATTERN = /^multi_plant_data_(\d{4}-\d{2}-\d{2})\.json$/;
const MAX_HISTORY_LIMIT = Number(process.env.MAX_HISTORY_LIMIT || 5000);
const SCADA_TIME_ZONE = process.env.SCADA_TIME_ZONE || 'Asia/Jakarta';

const allowedOrigins = (process.env.ALLOWED_ORIGIN || '*')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin tidak diizinkan oleh CORS'));
    },
  }),
);
app.use(express.json({ limit: '100kb' }));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Membaca JSON dengan retry singkat karena Python menulis ulang file secara
 * berkala. Retry mencegah request gagal saat file sedang berada di tengah
 * proses penulisan.
 */
async function readJsonFile(filePath, retries = 4) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      lastError = error;
      if (error.code === 'ENOENT') throw error;
      if (attempt < retries) await sleep(100 * attempt);
    }
  }

  throw lastError;
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** Menghasilkan YYYY-MM-DD berdasarkan zona waktu SCADA, bukan UTC server. */
function getDateInTimeZone(timeZone = SCADA_TIME_ZONE, date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function parseTimestamp(value) {
  if (typeof value !== 'string') return null;

  // Timestamp Python berbentuk "YYYY-MM-DD HH:mm:ss" dan dianggap berada
  // dalam zona waktu lokal SCADA. Untuk filter dalam satu file harian, bentuk
  // ini dapat dibandingkan secara konsisten setelah dinormalisasi.
  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const timestamp = Date.parse(normalized);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function normalizePlantName(value) {
  const plant = String(value || '').toLowerCase();

  const aliases = {
    otics: 'plant_1_otics',
    plant1: 'plant_1_otics',
    plant_1: 'plant_1_otics',
    plant_1_otics: 'plant_1_otics',
    huawei: 'plant_2_huawei',
    fusionsolar: 'plant_2_huawei',
    plant2: 'plant_2_huawei',
    plant_2: 'plant_2_huawei',
    plant_2_huawei: 'plant_2_huawei',
  };

  return aliases[plant] || null;
}

function buildHistoryFilename(date) {
  return `${HISTORY_PREFIX}${date}.json`;
}

function buildHistoryFile(date) {
  if (!isValidDate(date)) return null;
  return path.join(DATA_DIR, buildHistoryFilename(date));
}

async function listHistoryDates() {
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name.match(HISTORY_PATTERN))
    .filter(Boolean)
    .map((match) => match[1])
    .filter(isValidDate)
    .sort()
    .reverse();
}

async function resolveHistoryDate(dateValue) {
  const normalized = String(dateValue || 'today').toLowerCase();

  if (normalized === 'today' || normalized === 'current') {
    return getDateInTimeZone();
  }

  if (normalized === 'latest') {
    const dates = await listHistoryDates();
    return dates[0] || null;
  }

  return isValidDate(normalized) ? normalized : null;
}

function clampInteger(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function sendFileError(res, error, filename) {
  if (error.code === 'ENOENT') {
    return res.status(404).json({
      success: false,
      error: `File ${filename} belum tersedia`,
      dataDirectory: DATA_DIR,
    });
  }

  if (error instanceof SyntaxError) {
    return res.status(503).json({
      success: false,
      error: `File ${filename} sedang diperbarui atau JSON tidak valid`,
    });
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    error: 'Gagal membaca data SCADA',
  });
}

async function sendHistory(req, res, requestedDate) {
  let date;

  try {
    date = await resolveHistoryDate(requestedDate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Gagal menentukan file histori',
    });
  }

  if (!date) {
    const requested = String(requestedDate || 'today').toLowerCase();

    if (requested === 'latest') {
      return res.status(404).json({
        success: false,
        error: 'Belum ada file histori multi_plant_data_YYYY-MM-DD.json',
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Tanggal harus YYYY-MM-DD, today, current, atau latest',
    });
  }

  const historyFile = buildHistoryFile(date);
  const historyFilename = buildHistoryFilename(date);
  const limit = clampInteger(req.query.limit, 500, 1, MAX_HISTORY_LIMIT);
  const offset = clampInteger(req.query.offset, 0, 0, Number.MAX_SAFE_INTEGER);
  const plantKey = req.query.plant ? normalizePlantName(req.query.plant) : null;

  if (req.query.plant && !plantKey) {
    return res.status(400).json({
      success: false,
      error: 'Plant tidak valid. Gunakan otics atau huawei.',
    });
  }

  const fromTime = req.query.from ? parseTimestamp(req.query.from) : null;
  const toTime = req.query.to ? parseTimestamp(req.query.to) : null;

  if (req.query.from && fromTime === null) {
    return res.status(400).json({ success: false, error: 'Parameter from tidak valid' });
  }

  if (req.query.to && toTime === null) {
    return res.status(400).json({ success: false, error: 'Parameter to tidak valid' });
  }

  if (fromTime !== null && toTime !== null && fromTime > toTime) {
    return res.status(400).json({
      success: false,
      error: 'Parameter from tidak boleh lebih besar dari to',
    });
  }

  try {
    const rawData = await readJsonFile(historyFile);

    if (!Array.isArray(rawData)) {
      return res.status(500).json({
        success: false,
        error: `Format ${historyFilename} harus berupa array JSON`,
      });
    }

    let filtered = rawData.filter((item) => {
      if (fromTime === null && toTime === null) return true;

      const itemTime = parseTimestamp(item?.timestamp);
      if (itemTime === null) return false;
      if (fromTime !== null && itemTime < fromTime) return false;
      if (toTime !== null && itemTime > toTime) return false;
      return true;
    });

    if (plantKey) {
      filtered = filtered.map((item) => ({
        timestamp: item?.timestamp || null,
        [plantKey]: item?.[plantKey] || {},
      }));
    }

    const data = filtered.slice(offset, offset + limit);

    res.set('Cache-Control', 'no-store');
    return res.json({
      success: true,
      requestedDate: requestedDate || 'today',
      resolvedDate: date,
      filename: historyFilename,
      dataDirectory: DATA_DIR,
      total: filtered.length,
      offset,
      limit,
      returned: data.length,
      data,
    });
  } catch (error) {
    return sendFileError(res, error, historyFilename);
  }
}

app.get('/', (req, res) => {
  res.json({
    name: 'Multi-Plant SCADA API',
    version: '1.1.0',
    dataDirectory: DATA_DIR,
    timeZone: SCADA_TIME_ZONE,
    endpoints: {
      health: '/api/health',
      latest: '/api/scada/latest',
      latestPlant: '/api/scada/latest/:plant',
      historyToday: '/api/scada/history',
      historyTodayAlias: '/api/scada/history/today',
      historyLatestAvailable: '/api/scada/history/latest',
      historyByDate: '/api/scada/history/YYYY-MM-DD',
      dates: '/api/scada/dates',
    },
  });
});

app.get('/api/health', async (req, res) => {
  const today = getDateInTimeZone();
  const todayFilename = buildHistoryFilename(today);
  const todayFile = path.join(DATA_DIR, todayFilename);

  const result = {
    success: true,
    status: 'ok',
    dataDirectory: DATA_DIR,
    timeZone: SCADA_TIME_ZONE,
    serverTime: new Date().toISOString(),
    scadaDate: today,
    files: {
      latest: {
        filename: path.basename(LATEST_FILE),
        exists: false,
        updatedAt: null,
      },
      todayHistory: {
        filename: todayFilename,
        exists: false,
        updatedAt: null,
      },
    },
  };

  try {
    const latestStat = await fs.stat(LATEST_FILE);
    result.files.latest.exists = true;
    result.files.latest.updatedAt = latestStat.mtime.toISOString();
  } catch (error) {
    if (error.code !== 'ENOENT') {
      result.status = 'degraded';
      result.files.latest.error = 'Tidak dapat memeriksa file';
    }
  }

  try {
    const historyStat = await fs.stat(todayFile);
    result.files.todayHistory.exists = true;
    result.files.todayHistory.updatedAt = historyStat.mtime.toISOString();
  } catch (error) {
    if (error.code !== 'ENOENT') {
      result.status = 'degraded';
      result.files.todayHistory.error = 'Tidak dapat memeriksa file';
    }
  }

  if (!result.files.latest.exists || !result.files.todayHistory.exists) {
    result.status = 'degraded';
  }

  return res.status(result.status === 'ok' ? 200 : 503).json(result);
});

app.get('/api/scada/latest', async (req, res) => {
  try {
    const data = await readJsonFile(LATEST_FILE);
    res.set('Cache-Control', 'no-store');
    return res.json({
      success: true,
      filename: path.basename(LATEST_FILE),
      data,
    });
  } catch (error) {
    return sendFileError(res, error, path.basename(LATEST_FILE));
  }
});

app.get('/api/scada/latest/:plant', async (req, res) => {
  const plantKey = normalizePlantName(req.params.plant);

  if (!plantKey) {
    return res.status(400).json({
      success: false,
      error: 'Plant tidak valid. Gunakan otics atau huawei.',
    });
  }

  try {
    const data = await readJsonFile(LATEST_FILE);
    res.set('Cache-Control', 'no-store');
    return res.json({
      success: true,
      filename: path.basename(LATEST_FILE),
      data: {
        timestamp: data.timestamp || null,
        plant: req.params.plant.toLowerCase(),
        values: data[plantKey] || {},
      },
    });
  } catch (error) {
    return sendFileError(res, error, path.basename(LATEST_FILE));
  }
});

// Otomatis membaca file sesuai tanggal Asia/Jakarta, misalnya:
// multi_plant_data_2026-07-20.json
app.get('/api/scada/history', (req, res) => sendHistory(req, res, 'today'));

// Mendukung /today, /current, /latest, atau /YYYY-MM-DD.
app.get('/api/scada/history/:date', (req, res) =>
  sendHistory(req, res, req.params.date),
);

app.get('/api/scada/dates', async (req, res) => {
  try {
    const dates = await listHistoryDates();
    const today = getDateInTimeZone();

    return res.json({
      success: true,
      dataDirectory: DATA_DIR,
      timeZone: SCADA_TIME_ZONE,
      today,
      currentFilename: buildHistoryFilename(today),
      count: dates.length,
      dates: dates.map((date) => ({
        date,
        filename: buildHistoryFilename(date),
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Gagal membaca daftar file histori',
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint tidak ditemukan' });
});

app.use((error, req, res, next) => {
  if (error && error.message === 'Origin tidak diizinkan oleh CORS') {
    return res.status(403).json({ success: false, error: error.message });
  }

  console.error(error);
  return res.status(500).json({ success: false, error: 'Kesalahan internal server' });
});

app.listen(PORT, HOST, () => {
  const today = getDateInTimeZone();

  console.log('============================================');
  console.log(' Multi-Plant SCADA API aktif');
  console.log(` URL          : http://${HOST}:${PORT}`);
  console.log(` Data dir     : ${DATA_DIR}`);
  console.log(` Zona waktu   : ${SCADA_TIME_ZONE}`);
  console.log(` File hari ini: ${buildHistoryFilename(today)}`);
  console.log('============================================');
});
