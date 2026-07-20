# Multi-Plant SCADA API v1.1

Backend membaca JSON langsung dari:

```text
/home/tpsoticsraspia1/on/d-surya/d-program
```

File yang digunakan:

```text
latest_scada_data.json
multi_plant_data_YYYY-MM-DD.json
```

Nama histori berubah setiap hari, misalnya:

```text
multi_plant_data_2026-07-20.json
multi_plant_data_2026-07-21.json
```

API menentukan nama file hari ini secara otomatis berdasarkan zona waktu
`Asia/Jakarta`. Server tidak perlu diubah atau direstart saat tanggal berganti.

## Instalasi

```bash
cd /home/tpsoticsraspia1/on/d-surya/d-program
npm install
```

Opsional, buat `.env`:

```bash
cp .env.example .env
```

Jalankan:

```bash
node app.js
```

Atau dengan PM2:

```bash
pm2 restart plts-api --update-env
```

## Endpoint utama

### Data terbaru

```http
GET /api/scada/latest
```

### Data terbaru per plant

```http
GET /api/scada/latest/otics
GET /api/scada/latest/huawei
```

### Histori hari ini secara otomatis

Kedua endpoint berikut membaca file hari ini, misalnya
`multi_plant_data_2026-07-20.json`:

```http
GET /api/scada/history
GET /api/scada/history/today
```

### Histori paling baru yang tersedia

Berguna jika file hari ini belum dibuat atau program Python sedang berhenti:

```http
GET /api/scada/history/latest
```

### Histori tanggal tertentu

```http
GET /api/scada/history/2026-07-20
```

### Daftar seluruh file tanggal

```http
GET /api/scada/dates
```

## Parameter histori

```text
limit=100
offset=0
plant=otics
plant=huawei
from=2026-07-20T08:00:00
to=2026-07-20T17:00:00
```

Contoh:

```bash
curl "http://localhost:3001/api/scada/history?limit=10"
curl "http://localhost:3001/api/scada/history/latest?plant=huawei&limit=100"
curl "http://localhost:3001/api/scada/history/2026-07-20?plant=otics"
```

Respons histori menyertakan nama file yang benar-benar dibaca:

```json
{
  "success": true,
  "requestedDate": "today",
  "resolvedDate": "2026-07-20",
  "filename": "multi_plant_data_2026-07-20.json",
  "total": 100,
  "returned": 100,
  "data": []
}
```

## Pemeriksaan

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/scada/dates
curl http://localhost:3001/api/scada/history
curl http://localhost:3001/api/scada/history/latest
```
