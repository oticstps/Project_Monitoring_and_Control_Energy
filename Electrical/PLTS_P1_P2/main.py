import json
import time
import os
import sys
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

# ==============================================================================
# [KONFIGURASI PLANT 1 - OTICS LISTRINDO]
# ==============================================================================
URL_OTICS = "http://pv.listrindo.com/otics/0_dashboard.php?menuItemId=1"
AKUN_OTICS_USER = "otics"
AKUN_OTICS_PASS = "Listrindo2025!"

XPATH_OTICS_CHECKBOX = '//*[@id="ackCheckbox"]'
XPATH_OTICS_TOMBOL_OK = '//*[@id="okButton"]'
XPATH_OTICS_USER = '//*[@id="username"]'
XPATH_OTICS_PASS = '//*[@id="password"]'

TARGET_DATA_OTICS = {
    "Power":                    '//*[@id="ttlVal"]',
    "Phase_1_INV1":             '//*[@id="pow1"]',
    "Phase_1_INV2":             '//*[@id="pow2"]',
    "PV_ENERGY_Today":          '//*[@id="day"]',
    "PV_ENERGY_Monthly":        '//*[@id="month"]',
    "PV_ENERGY_Total":          '//*[@id="ttlEnergy"]',
    "Irradiation":              '//*[@id="irr"]',
    "PR":                       '//*[@id="pr"]',
    "WEATHER_FOR_CIKARANG_TEMP":'//*[@id="w_temp"]',
    "WEATHER_FOR_CIKARANG_DATE":'//*[@id="w_time"]',
    "CO2_Reduced":              '//*[@id="co2"]',
    "STATUS":                   '//*[@id="w_status"]/span',
    "COMM_MONITORING_last":    '//*[@id="tgl"]'
}

# ==============================================================================
# [KONFIGURASI PLANT 2 - HUAWEI FUSIONSOLAR]
# ==============================================================================
URL_HUAWEI = "https://sg5.fusionsolar.huawei.com/uniportal/pvmswebsite/assets/build/cloud.html?app-id=smartpvms&instance-id=smartpvms&zone-id=region-7-d9db2385-36d8-4155-9acd-65e40ad83f6d#/view/station/NE=51731330/overview"

AKUN_HUAWEI_USER = "KemalOTICS"
AKUN_HUAWEI_PASS = "q495tofa"
XPATH_HUAWEI_USER = '//*[@id="username"]/input'
XPATH_HUAWEI_PASS = '//*[@id="password"]/input'

TARGET_DATA_HUAWEI = {
    "Temperature":              '//*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div[1]',
    "Yield_Today":              '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[1]/div/div[1]/span',
    "Supply_From_Grid_Today":   '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/span',
    "Total_Yield":              '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[3]/div/div[1]/span',
    "Inverter_Rated_Power":     '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[4]/div/div[1]/span',
    "Installed_PV_Capacity":    '//*[@id="root"]/div/div/div/div/div[3]/div/div[2]/div[3]/div/div[1]/div[2]/div[1]/div[3]/span[1]',
    "Standard_Coal_Saved":      '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[1]/div/div[1]/span',
    "CO2_Avoided":              '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[2]/div/div[1]/span',
    "EquivalentTrees_Planted":  '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[3]/div/div[1]/span'
}

# ==============================================================================
# [SISTEM GLOBAL]
# ==============================================================================
INTERVAL_SECONDS = 300  # 5 menit

# ──────────────────────────────────────────────────────────────────────────────
# HELPER: Bersihkan angka dari format Huawei (koma ribuan, satuan, dll)
# ──────────────────────────────────────────────────────────────────────────────
def bersihkan_angka(nilai_mentah, default="0.000"):
    """
    Membersihkan string angka dari website Huawei agar bisa dibaca React.
    Mengembalikan string angka desimal bersih.
    """
    if not nilai_mentah or nilai_mentah in ("--", "Error", "N/A", ""):
        return default
    
    hasil = str(nilai_mentah).strip()
    
    if ',' in hasil and '.' in hasil:
        hasil = hasil.replace(',', '')
    elif ',' in hasil and '.' not in hasil:
        bagian = hasil.split(',')
        if len(bagian) == 2 and len(bagian[1]) <= 3:
            hasil = hasil.replace(',', '.')
        else:
            hasil = hasil.replace(',', '')
    
    import re
    hasil_bersih = re.sub(r'[^\d.\-]', '', hasil)
    
    try:
        float(hasil_bersih)
        return hasil_bersih
    except (ValueError, TypeError):
        return default


def save_to_json(new_data):
    if getattr(sys, 'frozen', False):
        script_dir = os.path.dirname(sys.executable)
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))

    # 1. DAILY LOG (data bertambah ke bawah sepanjang hari)
    tanggal_hari_ini = datetime.now().strftime("%Y-%m-%d")
    nama_file = f"multi_plant_data_{tanggal_hari_ini}.json"
    filename = os.path.join(script_dir, nama_file)

    all_data = []
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            try:
                all_data = json.load(file)
            except json.JSONDecodeError:
                all_data = []

    all_data.append(new_data)

    with open(filename, 'w') as file:
        json.dump(all_data, file, indent=4)

    # 2. STATIC POINTER untuk React Dashboard → HANYA DATA TERBARU (tidak bertambah)
    nama_file_statis = "latest_scada_data.json"
    filename_statis = os.path.join(script_dir, nama_file_statis)

    with open(filename_statis, 'w') as file_statis:
        json.dump(new_data, file_statis, indent=4)   # ⬅️ objek langsung, bukan array

    return nama_file


def setup_browser():
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    # Hapus tanda '#' di bawah jika dijalankan di Ubuntu tanpa layar (GUI):
    # chrome_options.add_argument("--headless=new")
    return webdriver.Chrome(options=chrome_options)


def main():
    print("=== MEMULAI MULTI-PLANT EXTRACTION SYSTEM ===")

    print("Membuka Browser untuk Plant 1 (Otics Listrindo)...")
    driver_otics = setup_browser()

    print("Membuka Browser untuk Plant 2 (Huawei FusionSolar)...")
    driver_huawei = setup_browser()

    cache_p2 = {
        "PV output (kW)":               "0.000",
        "Mains power (kW)":             "0.000",
        "Irradiance (W/m2)":            "0.000",
        "Consumed by appliances (kW)":  "0.000",
    }

    # ── BLOK LOGIN INDEPENDEN ──────────────────────────────────────────────────
    
    # [1] PROSES LOGIN PLANT 1
    try:
        print(f"\n[Plant 1] Mengakses {URL_OTICS}...")
        driver_otics.get(URL_OTICS)
        time.sleep(5)

        print("[Plant 1] Menangani popup Acknowledgement...")
        try:
            checkbox = driver_otics.find_element(By.XPATH, XPATH_OTICS_CHECKBOX)
            checkbox.click()
            time.sleep(1)
            btn_ok = driver_otics.find_element(By.XPATH, XPATH_OTICS_TOMBOL_OK)
            btn_ok.click()
            print("[Plant 1] Popup OK.")
            time.sleep(3)
        except Exception:
            print("[Plant 1] Popup tidak muncul atau terlewati.")

        print("[Plant 1] Auto-Login...")
        try:
            input_user = driver_otics.find_element(By.XPATH, XPATH_OTICS_USER)
            input_pass = driver_otics.find_element(By.XPATH, XPATH_OTICS_PASS)
            input_user.send_keys(AKUN_OTICS_USER)
            input_pass.send_keys(AKUN_OTICS_PASS)
            input_pass.send_keys(Keys.RETURN)
            print("[Plant 1] Login berhasil.")
        except Exception:
            print("[Plant 1] Form login tidak ditemukan. Berlanjut...")
    except Exception as e:
        # Jika website mati/menolak koneksi, program ditangkap di sini dan TIDAK CRASH
        print(f"[Plant 1] GAGAL DIAKSES! Website down atau bukan jaringan pabrik. Melewati Plant 1...")
        print(f"[Plant 1] Detail Error: {e}")

    # [2] PROSES LOGIN PLANT 2
    try:
        print(f"\n[Plant 2] Mengakses {URL_HUAWEI}...")
        driver_huawei.get(URL_HUAWEI)
        time.sleep(15)

        try:
            print("[Plant 2] Memeriksa form login Huawei...")
            input_user_hw = driver_huawei.find_element(By.XPATH, XPATH_HUAWEI_USER)
            input_pass_hw = driver_huawei.find_element(By.XPATH, XPATH_HUAWEI_PASS)
            input_user_hw.send_keys(AKUN_HUAWEI_USER)
            input_pass_hw.send_keys(AKUN_HUAWEI_PASS)
            input_pass_hw.send_keys(Keys.RETURN)
            print("[Plant 2] Login berhasil.")
            time.sleep(15)
        except Exception:
            print("[Plant 2] Form login tidak terdeteksi / langsung masuk.")
    except Exception as e:
        print(f"[Plant 2] GAGAL DIAKSES! Melewati Plant 2...")
        print(f"[Plant 2] Detail Error: {e}")

    # ── LOOP EKSTRAKSI ────────────────────────────────────────────────────────
    print("\n=== SEMUA BROWSER SIAP, MEMULAI LOOP EKSTRAKSI TIAP 5 MENIT ===")

    try:
        while True:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            data_entry = {
                "timestamp": timestamp,
                "plant_1_otics": {},
                "plant_2_huawei": {}
            }

            print(f"\n[{timestamp}] Menarik data dari Plant 1 & Plant 2...")

            # ── EKSTRAKSI PLANT 1 (OTICS) ─────────────────────────────────────
            for name, xpath in TARGET_DATA_OTICS.items():
                try:
                    element = driver_otics.find_element(By.XPATH, xpath)
                    data_entry["plant_1_otics"][name] = element.text.strip()
                except Exception:
                    # Jika website tadi gagal diakses, find_element pasti error
                    # dan akan otomatis mengisi data dengan "Error" (aman untuk web React)
                    data_entry["plant_1_otics"][name] = "Error"
            print(" -> Data Plant 1 (Otics) selesai diproses.")

            # ── EKSTRAKSI PLANT 2 BAGIAN A: XPath ─────────────────────────────
            for name, xpath in TARGET_DATA_HUAWEI.items():
                try:
                    element = driver_huawei.find_element(By.XPATH, xpath)
                    nilai_mentah = element.text.strip()
                    if name in ("Yield_Today", "Supply_From_Grid_Today", "Total_Yield",
                                "Inverter_Rated_Power", "Standard_Coal_Saved",
                                "CO2_Avoided", "EquivalentTrees_Planted"):
                        data_entry["plant_2_huawei"][name] = bersihkan_angka(nilai_mentah)
                    else:
                        data_entry["plant_2_huawei"][name] = nilai_mentah
                except Exception:
                    data_entry["plant_2_huawei"][name] = "Error"
            print(" -> Data Teks Plant 2 (Huawei) selesai diproses.")

            # ── EKSTRAKSI PLANT 2 BAGIAN B: API Real-time ─────────────────────
            for key, val in cache_p2.items():
                data_entry["plant_2_huawei"][key] = val

            try:
                sekarang    = datetime.now()
                hari_ini    = sekarang.strftime("%Y-%m-%d")
                tengah_malam = datetime(sekarang.year, sekarang.month, sekarang.day)
                query_time  = int(tengah_malam.timestamp() * 1000)
                waktu_ms    = int(time.time() * 1000)

                url_api = (
                    f"https://sg5.fusionsolar.huawei.com/rest/dp/pvms/web/station/ioc/v2/"
                    f"overview/energy-balance?stationDn=NE%3D51731330&timeDim=2"
                    f"&timeZone=7.0&timeZoneStr=Asia%2FJakarta"
                    f"&queryTime={query_time}&dateStr={hari_ini}%2000%3A00%3A00&_={waktu_ms}"
                )

                script_fetch = f"""
                var callback = arguments[arguments.length - 1];
                fetch('{url_api}', {{
                    method: 'GET',
                    credentials: 'include',
                    headers: {{
                        'Accept': 'application/json, text/plain, */*',
                        'X-Requested-With': 'XMLHttpRequest'
                    }}
                }})
                .then(r => r.json())
                .then(d => callback(d))
                .catch(e => callback({{'success': false, 'error': e.message}}));
                """

                driver_huawei.set_script_timeout(15)
                response_api = driver_huawei.execute_async_script(script_fetch)

                if response_api and response_api.get('success'):
                    isi = response_api.get('data', {})

                    array_pv        = isi.get('productPower', [])
                    array_beban     = isi.get('usePower', [])
                    array_mains     = isi.get('meterActivePower', [])
                    array_irradiance = isi.get('radiationDosePower', [])

                    for i in range(len(array_pv) - 1, -1, -1):
                        if array_pv[i] not in ("--", None, ""):
                            cache_p2["PV output (kW)"] = bersihkan_angka(str(array_pv[i]))

                            if i < len(array_mains) and array_mains[i] not in ("--", None, ""):
                                cache_p2["Mains power (kW)"] = bersihkan_angka(str(array_mains[i]))
                            
                            if i < len(array_beban) and array_beban[i] not in ("--", None, ""):
                                cache_p2["Consumed by appliances (kW)"] = bersihkan_angka(str(array_beban[i]))
                            
                            if i < len(array_irradiance) and array_irradiance[i] not in ("--", None, ""):
                                cache_p2["Irradiance (W/m2)"] = bersihkan_angka(str(array_irradiance[i]))
                            break

                    for key, val in cache_p2.items():
                        data_entry["plant_2_huawei"][key] = val

                    print(f" -> API Plant 2 berhasil!")
                    print(f"    PV: {cache_p2['PV output (kW)']} kW | "
                          f"Mains: {cache_p2['Mains power (kW)']} kW | "
                          f"Beban: {cache_p2['Consumed by appliances (kW)']} kW | "
                          f"Irr: {cache_p2['Irradiance (W/m2)']} W/m²")

                else:
                    print(f" -> API Plant 2 gagal. Menggunakan data cache terakhir.")
                    print(f"    Cache: PV={cache_p2['PV output (kW)']} | "
                          f"Mains={cache_p2['Mains power (kW)']}")

            except Exception as e:
                print(f" -> Error saat fetch API: {e}")
                print(f"    Menggunakan data cache: PV={cache_p2['PV output (kW)']}")

            # ── SIMPAN & JEDA ──────────────────────────────────────────────────
            nama_file_tersimpan = save_to_json(data_entry)
            print(f"Tersimpan ke '{nama_file_tersimpan}' dan 'latest_scada_data.json'!")
            print(f"Menunggu {INTERVAL_SECONDS // 60} menit untuk ekstraksi berikutnya...\n")
            time.sleep(INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("\nSistem dihentikan oleh pengguna.")
    finally:
        print("Menutup browser...")
        driver_otics.quit()
        driver_huawei.quit()


if __name__ == "__main__":
    main()