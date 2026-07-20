# Multi-Plant SCADA API

API membaca file berikut secara langsung:

- `latest_scada_data.json`: data terbaru berbentuk object.
- `multi_plant_data_YYYY-MM-DD.json`: histori harian berbentuk array.

## Instalasi

```bash
cd ~/on/d-surya/d-program
npm install
chmod +x start_api.sh
./start_api.sh
```

Server aktif pada `http://0.0.0.0:3001`.

## Endpoint

### Status API

```http
GET /api/health
```

### Semua data terbaru

```http
GET /api/scada/latest
```

### Data terbaru per plant

```http
GET /api/scada/latest/otics
GET /api/scada/latest/huawei
```

### Daftar tanggal histori

```http
GET /api/scada/dates
```

### Histori berdasarkan tanggal

```http
GET /api/scada/history/2026-07-20
```

Parameter opsional:

```text
limit=100
 offset=0
plant=otics
from=2026-07-20T08:00:00
  to=2026-07-20T17:00:00
```

Contoh:

```http
GET /api/scada/history/2026-07-20?plant=huawei&limit=100
```

## Pengujian dengan curl

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/scada/latest
curl http://localhost:3001/api/scada/latest/otics
curl "http://localhost:3001/api/scada/history/2026-07-20?limit=10"
```

## Menjalankan terus-menerus dengan PM2

```bash
sudo npm install -g pm2
cd ~/on/d-surya/d-program
pm2 start app.js --name plts-api
pm2 save
pm2 startup
```

Jalankan perintah tambahan yang ditampilkan oleh `pm2 startup`.
