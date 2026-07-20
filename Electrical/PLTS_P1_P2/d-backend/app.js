'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = path.resolve(process.env.DATA_DIR || __dirname);
const LATEST_FILE = path.join(DATA_DIR, 'latest_scada_data.json');
const MAX_HISTORY_LIMIT = Number(process.env.MAX_HISTORY_LIMIT || 5000);

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
 * Membaca JSON dengan retry singkat. Retry diperlukan karena file dapat sedang
 * ditulis ulang oleh proses Python ketika request API masuk.
 */
async function readJsonFile(filePath, retries = 3) {
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
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '');
}

function parseTimestamp(value) {
  if (typeof value !== 'string') return null;
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

function buildHistoryFile(date) {
  if (!isValidDate(date)) return null;
  return path.join(DATA_DIR, `multi_plant_data_${date}.json`);
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

app.get('/', (req, res) => {
  res.json({
    name: 'Multi-Plant SCADA API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      latest: '/api/scada/latest',
      latestPlant: '/api/scada/latest/:plant',
      history: '/api/scada/history/:date',
      dates: '/api/scada/dates',
    },
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const stat = await fs.stat(LATEST_FILE);
    res.json({
      success: true,
      status: 'ok',
      dataDirectory: DATA_DIR,
      latestFile: path.basename(LATEST_FILE),
      latestFileUpdatedAt: stat.mtime.toISOString(),
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    res.status(error.code === 'ENOENT' ? 503 : 500).json({
      success: false,
      status: 'degraded',
      error:
        error.code === 'ENOENT'
          ? 'latest_scada_data.json belum ditemukan'
          : 'Tidak dapat memeriksa file data',
      serverTime: new Date().toISOString(),
    });
  }
});

app.get('/api/scada/latest', async (req, res) => {
  try {
    const data = await readJsonFile(LATEST_FILE);
    res.set('Cache-Control', 'no-store');
    res.json({ success: true, data });
  } catch (error) {
    sendFileError(res, error, path.basename(LATEST_FILE));
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

app.get('/api/scada/history/:date', async (req, res) => {
  const { date } = req.params;
  const historyFile = buildHistoryFile(date);

  if (!historyFile) {
    return res.status(400).json({
      success: false,
      error: 'Format tanggal harus YYYY-MM-DD',
    });
  }

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

  try {
    const rawData = await readJsonFile(historyFile);
    if (!Array.isArray(rawData)) {
      return res.status(500).json({
        success: false,
        error: 'Format file histori harus berupa array JSON',
      });
    }

    let filtered = rawData.filter((item) => {
      if (fromTime === null && toTime === null) return true;
      const itemTime = parseTimestamp(item.timestamp);
      if (itemTime === null) return false;
      if (fromTime !== null && itemTime < fromTime) return false;
      if (toTime !== null && itemTime > toTime) return false;
      return true;
    });

    if (plantKey) {
      filtered = filtered.map((item) => ({
        timestamp: item.timestamp || null,
        [plantKey]: item[plantKey] || {},
      }));
    }

    const data = filtered.slice(offset, offset + limit);

    return res.json({
      success: true,
      date,
      total: filtered.length,
      offset,
      limit,
      returned: data.length,
      data,
    });
  } catch (error) {
    return sendFileError(res, error, path.basename(historyFile));
  }
});

app.get('/api/scada/dates', async (req, res) => {
  try {
    const files = await fs.readdir(DATA_DIR, { withFileTypes: true });
    const dates = files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name.match(/^multi_plant_data_(\d{4}-\d{2}-\d{2})\.json$/))
      .filter(Boolean)
      .map((match) => match[1])
      .sort()
      .reverse();

    res.json({ success: true, count: dates.length, dates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Gagal membaca daftar file histori' });
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
  console.log('============================================');
  console.log(' Multi-Plant SCADA API aktif');
  console.log(` URL      : http://${HOST}:${PORT}`);
  console.log(` Data dir : ${DATA_DIR}`);
  console.log('============================================');
});
