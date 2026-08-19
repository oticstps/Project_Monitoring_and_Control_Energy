import json
import os
import re
import shutil
import sys
import time
from datetime import datetime, timedelta, timezone
from decimal import Decimal, InvalidOperation

import mysql.connector
from mysql.connector import Error as MySQLError
from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


# ==============================================================================
# KONFIGURASI ZONA WAKTU
# ==============================================================================

WIB = timezone(timedelta(hours=7))


# ==============================================================================
# KONFIGURASI PLANT 1 - OTICS LISTRINDO
# ==============================================================================

URL_OTICS = "https://pv.listrindo.com/otics/0_dashboard.php?menuItemId=1"

AKUN_OTICS_USER = "otics"
AKUN_OTICS_PASS = "Listrindo2025!"

XPATH_OTICS_CHECKBOX = '//*[@id="ackCheckbox"]'
XPATH_OTICS_TOMBOL_OK = '//*[@id="okButton"]'
XPATH_OTICS_USER = '//*[@id="username"]'
XPATH_OTICS_PASS = '//*[@id="password"]'

TARGET_DATA_OTICS = {
    "Power": '//*[@id="ttlVal"]',
    "Phase_1_INV1": '//*[@id="pow1"]',
    "Phase_1_INV2": '//*[@id="pow2"]',
    "PV_ENERGY_Today": '//*[@id="day"]',
    "PV_ENERGY_Monthly": '//*[@id="month"]',
    "PV_ENERGY_Total": '//*[@id="ttlEnergy"]',
    "Irradiation": '//*[@id="irr"]',
    "PR": '//*[@id="pr"]',
    "WEATHER_FOR_CIKARANG_TEMP": '//*[@id="w_temp"]',
    "WEATHER_FOR_CIKARANG_DATE": '//*[@id="w_time"]',
    "CO2_Reduced": '//*[@id="co2"]',
    "STATUS": '//*[@id="w_status"]/span',
    "COMM_MONITORING_last": '//*[@id="tgl"]',
}


# ==============================================================================
# KONFIGURASI PLANT 2 - HUAWEI FUSIONSOLAR
# ==============================================================================

URL_HUAWEI_LOGIN = "https://sg5.fusionsolar.huawei.com/pvmswebsite/login/build/index.html"

URL_HUAWEI = (
    "https://sg5.fusionsolar.huawei.com/uniportal/pvmswebsite/assets/build/"
    "cloud.html?app-id=smartpvms&instance-id=smartpvms"
    "&zone-id=region-7-d9db2385-36d8-4155-9acd-65e40ad83f6d"
    "#/view/station/NE=51731330/overview"
)

STATION_DN_HUAWEI = "NE=51731330"

AKUN_HUAWEI_USER = "KemalOTICS"
AKUN_HUAWEI_PASS = "q495tofa"

XPATH_HUAWEI_USER = '//*[@id="username"]/input'
XPATH_HUAWEI_PASS = '//*[@id="password"]/input'

TARGET_DATA_HUAWEI = {
    "Temperature":
        '//*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div[1]',
    "Yield_Today":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[1]/div/div[1]/span',
    "Supply_From_Grid_Today":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/span',
    "Total_Yield":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[3]/div/div[1]/span',
    "Inverter_Rated_Power":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div/div[2]/div[4]/div/div[1]/span',
    "Installed_PV_Capacity":
        '//*[@id="root"]/div/div/div/div/div[3]/div/div[2]/div[3]/div/div[1]/div[2]/div[1]/div[3]/span[1]',
    "Standard_Coal_Saved":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[1]/div/div[1]/span',
    "CO2_Avoided":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[2]/div/div[1]/span',
    "EquivalentTrees_Planted":
        '//*[@id="root"]/div/div/div/div/div[3]/div[2]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[3]/div/div[1]/span',
}

HUAWEI_DECIMAL_FIELDS = {
    "Yield_Today",
    "Supply_From_Grid_Today",
    "Total_Yield",
    "Inverter_Rated_Power",
    "Standard_Coal_Saved",
    "CO2_Avoided",
    "EquivalentTrees_Planted",
}


# ==============================================================================
# KONFIGURASI MYSQL
# ==============================================================================

DB_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "otics_tps",
    "password": "sukatno_ali",
    "database": "database_tps_energy_listrik",
    "charset": "utf8mb4",
    "use_unicode": True,
    "autocommit": False,
    "connection_timeout": 10,
}

DB_TABLE = "plts_plant_1_plant_2"


# ==============================================================================
# KONFIGURASI SISTEM
# ==============================================================================

INTERVAL_SECONDS = 300
PAGE_LOAD_TIMEOUT = 90
ELEMENT_TIMEOUT = 15
HEADLESS = True


# ==============================================================================
# FUNGSI LOG
# ==============================================================================

def log(message):
    waktu = datetime.now(WIB).strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{waktu}] {message}", flush=True)


# ==============================================================================
# HELPER DATA
# ==============================================================================

def bersihkan_angka(nilai_mentah, default="0.000"):
    """
    Membersihkan angka dari format teks, satuan, koma, dan simbol lain.

    Contoh:
    1,234.56 kW -> 1234.56
    12,5 kW     -> 12.5
    """
    if nilai_mentah is None:
        return default

    hasil = str(nilai_mentah).strip()

    if hasil.lower() in {
        "",
        "--",
        "error",
        "n/a",
        "none",
        "null",
        "nan",
    }:
        return default

    if "," in hasil and "." in hasil:
        hasil = hasil.replace(",", "")
    elif "," in hasil and "." not in hasil:
        bagian = hasil.split(",")

        if len(bagian) == 2 and len(bagian[1]) <= 3:
            hasil = hasil.replace(",", ".")
        else:
            hasil = hasil.replace(",", "")

    hasil_bersih = re.sub(r"[^\d.\-]", "", hasil)

    try:
        float(hasil_bersih)
        return hasil_bersih
    except (ValueError, TypeError):
        return default


def ke_decimal(value):
    """
    Mengubah data menjadi Decimal(20,3).

    Nilai gagal dibaca disimpan sebagai NULL, bukan nol.
    """
    if value is None:
        return None

    value_string = str(value).strip()

    if value_string.lower() in {
        "",
        "--",
        "error",
        "n/a",
        "none",
        "null",
        "nan",
    }:
        return None

    nilai_bersih = bersihkan_angka(value_string, default="")

    if not nilai_bersih:
        return None

    try:
        return Decimal(nilai_bersih).quantize(Decimal("0.001"))
    except (InvalidOperation, ValueError, TypeError):
        return None


def potong_teks(value, panjang_maksimal):
    """
    Membatasi teks agar tidak melebihi ukuran VARCHAR database.
    """
    if value is None:
        return None

    hasil = str(value).strip()

    if not hasil:
        return None

    return hasil[:panjang_maksimal]


def semua_error(data):
    """
    Mengembalikan True apabila seluruh data berisi Error atau kosong.
    """
    if not data:
        return True

    return all(
        value is None
        or str(value).strip().lower() in {"", "error", "--", "n/a"}
        for value in data.values()
    )


# ==============================================================================
# PENYIMPANAN JSON
# ==============================================================================

def dapatkan_direktori_program():
    if getattr(sys, "frozen", False):
        return os.path.dirname(sys.executable)

    return os.path.dirname(os.path.abspath(__file__))


def tulis_json_atomic(filename, data):
    """
    Menulis JSON melalui file sementara agar file utama tidak rusak
    jika program berhenti saat proses penulisan.
    """
    temporary_file = f"{filename}.tmp"

    with open(temporary_file, "w", encoding="utf-8") as file:
        json.dump(
            data,
            file,
            ensure_ascii=False,
            indent=4,
        )

    os.replace(temporary_file, filename)


def save_to_json(new_data):
    """
    Menyimpan:
    1. Log harian berbentuk array.
    2. Pointer data terbaru berbentuk satu objek.
    """
    script_dir = dapatkan_direktori_program()

    tanggal_hari_ini = datetime.now(WIB).strftime("%Y-%m-%d")
    nama_file_harian = f"multi_plant_data_{tanggal_hari_ini}.json"
    filename_harian = os.path.join(script_dir, nama_file_harian)

    all_data = []

    if os.path.exists(filename_harian):
        try:
            with open(filename_harian, "r", encoding="utf-8") as file:
                isi_lama = json.load(file)

            if isinstance(isi_lama, list):
                all_data = isi_lama
        except (json.JSONDecodeError, OSError):
            all_data = []

    all_data.append(new_data)
    tulis_json_atomic(filename_harian, all_data)

    nama_file_statis = "latest_scada_data.json"
    filename_statis = os.path.join(script_dir, nama_file_statis)
    tulis_json_atomic(filename_statis, new_data)

    return nama_file_harian


# ==============================================================================
# BROWSER
# ==============================================================================

def _cari_executable(candidates):
    """Mencari executable dari PATH dan lokasi umum Windows/Linux."""
    for candidate in candidates:
        if not candidate:
            continue

        expanded_candidate = os.path.expanduser(candidate)

        if os.path.sep in expanded_candidate or "/" in expanded_candidate:
            resolved = expanded_candidate
        else:
            resolved = shutil.which(expanded_candidate)

        if (
            resolved
            and os.path.isfile(resolved)
            and os.access(resolved, os.X_OK)
        ):
            return os.path.abspath(resolved)

    return None


def setup_browser(nama_browser):
    """
    Membuat Chrome/Chromium WebDriver tanpa environment variable.
    Jika ChromeDriver lokal tidak ditemukan, Selenium Manager digunakan.
    """
    program_files = r"C:\Program Files"
    program_files_x86 = r"C:\Program Files (x86)"
    local_app_data = os.path.join(
        os.path.expanduser("~"),
        "AppData",
        "Local",
    )

    browser_path = _cari_executable([
        "chromium-browser",
        "chromium",
        "google-chrome",
        "google-chrome-stable",
        "chrome",
        "/snap/bin/chromium",
        "/usr/bin/chromium-browser",
        "/usr/bin/chromium",
        "/usr/bin/google-chrome",
        os.path.join(
            program_files,
            "Google",
            "Chrome",
            "Application",
            "chrome.exe",
        ),
        os.path.join(
            program_files_x86,
            "Google",
            "Chrome",
            "Application",
            "chrome.exe",
        ),
        os.path.join(
            local_app_data,
            "Google",
            "Chrome",
            "Application",
            "chrome.exe",
        ),
    ])

    driver_path = _cari_executable([
        "chromedriver",
        "chromium.chromedriver",
        "/usr/bin/chromedriver",
        "/snap/bin/chromium.chromedriver",
        "/usr/lib/chromium-browser/chromedriver",
        "/usr/lib/chromium/chromedriver",
    ])

    chrome_options = Options()

    if browser_path:
        chrome_options.binary_location = browser_path

    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--remote-debugging-port=0")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-popup-blocking")

    if HEADLESS:
        chrome_options.add_argument("--headless=new")

    log(f"{nama_browser} - Chromium: {browser_path or 'otomatis'}")
    log(f"{nama_browser} - ChromeDriver: {driver_path or 'Selenium Manager'}")
    log(f"{nama_browser} - Headless: {HEADLESS}")

    service = (
        Service(executable_path=driver_path)
        if driver_path
        else Service()
    )

    driver = webdriver.Chrome(
        service=service,
        options=chrome_options,
    )

    driver.set_page_load_timeout(PAGE_LOAD_TIMEOUT)
    driver.set_script_timeout(20)

    return driver

def cari_elemen_opsional(driver, xpath, timeout=5):
    try:
        return WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
    except TimeoutException:
        return None


def klik_elemen_opsional(driver, xpath, timeout=5):
    try:
        element = WebDriverWait(driver, timeout).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        element.click()
        return True
    except Exception:
        return False


# ==============================================================================
# LOGIN PLANT 1
# ==============================================================================

def buka_dan_login_otics(driver):
    log(f"Plant 1 mengakses {URL_OTICS}")
    driver.get(URL_OTICS)

    time.sleep(5)

    checkbox = cari_elemen_opsional(
        driver,
        XPATH_OTICS_CHECKBOX,
        timeout=4,
    )

    if checkbox is not None:
        try:
            if not checkbox.is_selected():
                checkbox.click()

            time.sleep(1)
            klik_elemen_opsional(
                driver,
                XPATH_OTICS_TOMBOL_OK,
                timeout=4,
            )
            log("Plant 1 popup acknowledgement diproses.")
            time.sleep(3)
        except Exception as error:
            log(f"Plant 1 popup dilewati: {error}")
    else:
        log("Plant 1 popup acknowledgement tidak muncul.")

    input_user = cari_elemen_opsional(
        driver,
        XPATH_OTICS_USER,
        timeout=5,
    )
    input_pass = cari_elemen_opsional(
        driver,
        XPATH_OTICS_PASS,
        timeout=5,
    )

    if input_user is not None and input_pass is not None:
        input_user.clear()
        input_pass.clear()

        input_user.send_keys(AKUN_OTICS_USER)
        input_pass.send_keys(AKUN_OTICS_PASS)
        input_pass.send_keys(Keys.RETURN)

        log("Plant 1 kredensial login dikirim.")
        time.sleep(8)
    else:
        log("Plant 1 form login tidak ditemukan. Diasumsikan sudah masuk.")


# ==============================================================================
# LOGIN PLANT 2
# ==============================================================================

def buka_dan_login_huawei(driver):
    log(f"Plant 2 mengakses halaman login {URL_HUAWEI_LOGIN}")
    driver.get(URL_HUAWEI_LOGIN)

    time.sleep(10)

    input_user = cari_elemen_opsional(
        driver,
        XPATH_HUAWEI_USER,
        timeout=8,
    )
    input_pass = cari_elemen_opsional(
        driver,
        XPATH_HUAWEI_PASS,
        timeout=8,
    )

    if input_user is not None and input_pass is not None:
        input_user.clear()
        input_pass.clear()

        input_user.send_keys(AKUN_HUAWEI_USER)
        input_pass.send_keys(AKUN_HUAWEI_PASS)
        input_pass.send_keys(Keys.RETURN)

        log("Plant 2 kredensial login dikirim.")
        time.sleep(18)
    else:
        log("Plant 2 form login tidak ditemukan. Mencoba sesi aktif.")

    log(f"Plant 2 membuka halaman overview {URL_HUAWEI}")
    driver.get(URL_HUAWEI)
    time.sleep(18)


# ==============================================================================
# EKSTRAKSI PLANT 1
# ==============================================================================

def ekstrak_otics(driver):
    hasil = {}

    if driver is None:
        return {
            name: "Error"
            for name in TARGET_DATA_OTICS
        }

    for name, xpath in TARGET_DATA_OTICS.items():
        try:
            element = WebDriverWait(driver, ELEMENT_TIMEOUT).until(
                EC.presence_of_element_located((By.XPATH, xpath))
            )
            nilai = element.text.strip()
            hasil[name] = nilai if nilai else "Error"
        except Exception:
            hasil[name] = "Error"

    return hasil


# ==============================================================================
# EKSTRAKSI PLANT 2 - XPATH
# ==============================================================================

def ekstrak_huawei_xpath(driver):
    hasil = {}

    if driver is None:
        return {
            name: "Error"
            for name in TARGET_DATA_HUAWEI
        }

    for name, xpath in TARGET_DATA_HUAWEI.items():
        try:
            element = WebDriverWait(driver, ELEMENT_TIMEOUT).until(
                EC.presence_of_element_located((By.XPATH, xpath))
            )

            nilai_mentah = element.text.strip()

            if name in HUAWEI_DECIMAL_FIELDS:
                hasil[name] = bersihkan_angka(
                    nilai_mentah,
                    default="Error",
                )
            else:
                hasil[name] = nilai_mentah or "Error"

        except Exception:
            hasil[name] = "Error"

    return hasil


# ==============================================================================
# EKSTRAKSI PLANT 2 - API REAL-TIME
# ==============================================================================

def fetch_huawei_realtime(driver, cache_p2):
    if driver is None:
        return cache_p2, False

    sekarang = datetime.now(WIB)
    hari_ini = sekarang.strftime("%Y-%m-%d")

    tengah_malam = sekarang.replace(
        hour=0,
        minute=0,
        second=0,
        microsecond=0,
    )

    query_time = int(tengah_malam.timestamp() * 1000)
    waktu_ms = int(time.time() * 1000)

    station_dn_encoded = STATION_DN_HUAWEI.replace("=", "%3D")

    url_api = (
        "https://sg5.fusionsolar.huawei.com/rest/dp/pvms/web/station/"
        "ioc/v2/overview/energy-balance"
        f"?stationDn={station_dn_encoded}"
        "&timeDim=2"
        "&timeZone=7.0"
        "&timeZoneStr=Asia%2FJakarta"
        f"&queryTime={query_time}"
        f"&dateStr={hari_ini}%2000%3A00%3A00"
        f"&_={waktu_ms}"
    )

    script_fetch = """
        const callback = arguments[arguments.length - 1];
        const url = arguments[0];

        fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => callback({
            success: false,
            error: error.message
        }));
    """

    try:
        response_api = driver.execute_async_script(
            script_fetch,
            url_api,
        )

        if not isinstance(response_api, dict):
            return cache_p2, False

        if not response_api.get("success"):
            return cache_p2, False

        isi = response_api.get("data") or {}

        array_pv = isi.get("productPower") or []
        array_beban = isi.get("usePower") or []
        array_mains = isi.get("meterActivePower") or []
        array_irradiance = isi.get("radiationDosePower") or []

        index_terbaru = None

        for index in range(len(array_pv) - 1, -1, -1):
            if array_pv[index] not in ("--", None, ""):
                index_terbaru = index
                break

        if index_terbaru is None:
            return cache_p2, False

        cache_p2["PV output (kW)"] = bersihkan_angka(
            array_pv[index_terbaru]
        )

        if (
            index_terbaru < len(array_mains)
            and array_mains[index_terbaru] not in ("--", None, "")
        ):
            cache_p2["Mains power (kW)"] = bersihkan_angka(
                array_mains[index_terbaru]
            )

        if (
            index_terbaru < len(array_beban)
            and array_beban[index_terbaru] not in ("--", None, "")
        ):
            cache_p2["Consumed by appliances (kW)"] = bersihkan_angka(
                array_beban[index_terbaru]
            )

        if (
            index_terbaru < len(array_irradiance)
            and array_irradiance[index_terbaru] not in ("--", None, "")
        ):
            cache_p2["Irradiance (W/m2)"] = bersihkan_angka(
                array_irradiance[index_terbaru]
            )

        return cache_p2, True

    except Exception as error:
        log(f"Plant 2 API error: {error}")
        return cache_p2, False


# ==============================================================================
# MYSQL
# ==============================================================================

INSERT_SQL = f"""
    INSERT INTO `{DB_TABLE}` (
        `recorded_at`,
        `otics_power`,
        `otics_phase_1_inv1`,
        `otics_phase_1_inv2`,
        `otics_pv_energy_today`,
        `otics_pv_energy_monthly`,
        `otics_pv_energy_total`,
        `otics_irradiation`,
        `otics_pr`,
        `otics_weather_temp`,
        `otics_weather_date`,
        `otics_co2_reduced`,
        `otics_status`,
        `otics_comm_monitoring_last`,
        `huawei_temperature`,
        `huawei_yield_today`,
        `huawei_supply_from_grid_today`,
        `huawei_total_yield`,
        `huawei_inverter_rated_power`,
        `huawei_installed_pv_capacity`,
        `huawei_standard_coal_saved`,
        `huawei_co2_avoided`,
        `huawei_equivalent_trees_planted`,
        `huawei_pv_output_kw`,
        `huawei_mains_power_kw`,
        `huawei_irradiance_wm2`,
        `huawei_consumed_by_appliances_kw`,
        `raw_payload_json`
    )
    VALUES (
        %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s
    )
"""


def pastikan_koneksi_database(connection=None):
    """
    Memakai koneksi lama jika masih aktif.
    Membuat koneksi baru jika koneksi terputus.
    """
    if connection is not None:
        try:
            connection.ping(
                reconnect=True,
                attempts=3,
                delay=2,
            )

            if connection.is_connected():
                return connection

        except MySQLError:
            try:
                connection.close()
            except Exception:
                pass

    log(
        f"Membuka koneksi MySQL "
        f"{DB_CONFIG['host']}:{DB_CONFIG['port']}/"
        f"{DB_CONFIG['database']}"
    )

    return mysql.connector.connect(**DB_CONFIG)


def simpan_ke_database(connection, data_entry):
    plant_1 = data_entry.get("plant_1_otics") or {}
    plant_2 = data_entry.get("plant_2_huawei") or {}

    recorded_at = datetime.strptime(
        data_entry["timestamp"],
        "%Y-%m-%d %H:%M:%S",
    )

    nilai = (
        recorded_at,

        potong_teks(plant_1.get("Power"), 100),
        potong_teks(plant_1.get("Phase_1_INV1"), 100),
        potong_teks(plant_1.get("Phase_1_INV2"), 100),
        potong_teks(plant_1.get("PV_ENERGY_Today"), 100),
        potong_teks(plant_1.get("PV_ENERGY_Monthly"), 100),
        potong_teks(plant_1.get("PV_ENERGY_Total"), 100),
        potong_teks(plant_1.get("Irradiation"), 100),
        potong_teks(plant_1.get("PR"), 100),
        potong_teks(
            plant_1.get("WEATHER_FOR_CIKARANG_TEMP"),
            100,
        ),
        potong_teks(
            plant_1.get("WEATHER_FOR_CIKARANG_DATE"),
            150,
        ),
        potong_teks(plant_1.get("CO2_Reduced"), 100),
        potong_teks(plant_1.get("STATUS"), 100),
        potong_teks(
            plant_1.get("COMM_MONITORING_last"),
            150,
        ),

        potong_teks(plant_2.get("Temperature"), 100),
        ke_decimal(plant_2.get("Yield_Today")),
        ke_decimal(plant_2.get("Supply_From_Grid_Today")),
        ke_decimal(plant_2.get("Total_Yield")),
        ke_decimal(plant_2.get("Inverter_Rated_Power")),
        potong_teks(
            plant_2.get("Installed_PV_Capacity"),
            100,
        ),
        ke_decimal(plant_2.get("Standard_Coal_Saved")),
        ke_decimal(plant_2.get("CO2_Avoided")),
        ke_decimal(plant_2.get("EquivalentTrees_Planted")),
        ke_decimal(plant_2.get("PV output (kW)")),
        ke_decimal(plant_2.get("Mains power (kW)")),
        ke_decimal(plant_2.get("Irradiance (W/m2)")),
        ke_decimal(
            plant_2.get("Consumed by appliances (kW)")
        ),

        json.dumps(
            data_entry,
            ensure_ascii=False,
            separators=(",", ":"),
        ),
    )

    cursor = connection.cursor()

    try:
        cursor.execute(INSERT_SQL, nilai)
        connection.commit()
        return cursor.lastrowid

    except MySQLError:
        connection.rollback()
        raise

    finally:
        cursor.close()


# ==============================================================================
# VALIDASI
# ==============================================================================

def validasi_konfigurasi():
    konfigurasi_wajib = {
        "OTICS_USER": AKUN_OTICS_USER,
        "OTICS_PASS": AKUN_OTICS_PASS,
        "HUAWEI_USER": AKUN_HUAWEI_USER,
        "HUAWEI_PASS": AKUN_HUAWEI_PASS,
        "DB_USER": DB_CONFIG["user"],
        "DB_PASSWORD": DB_CONFIG["password"],
        "DB_NAME": DB_CONFIG["database"],
    }

    kosong = [
        nama
        for nama, nilai in konfigurasi_wajib.items()
        if not nilai
    ]

    if kosong:
        log("Konfigurasi berikut belum diisi:")

        for nama in kosong:
            print(f"  - {nama}")

        return False

    if INTERVAL_SECONDS < 60:
        log(
            "INTERVAL_SECONDS terlalu kecil. "
            "Gunakan minimal 60 detik."
        )
        return False

    return True


# ==============================================================================
# FUNGSI PEMULIHAN BROWSER
# ==============================================================================

def pulihkan_otics(driver):
    try:
        log("Mencoba memulihkan sesi Plant 1.")
        buka_dan_login_otics(driver)
        return ekstrak_otics(driver)
    except Exception as error:
        log(f"Pemulihan Plant 1 gagal: {error}")
        return {
            name: "Error"
            for name in TARGET_DATA_OTICS
        }


def pulihkan_huawei(driver):
    try:
        log("Mencoba memulihkan sesi Plant 2.")
        buka_dan_login_huawei(driver)
        return ekstrak_huawei_xpath(driver)
    except Exception as error:
        log(f"Pemulihan Plant 2 gagal: {error}")
        return {
            name: "Error"
            for name in TARGET_DATA_HUAWEI
        }


# ==============================================================================
# PROGRAM UTAMA
# ==============================================================================

def main():
    log("=== MEMULAI MULTI-PLANT EXTRACTION SYSTEM ===")

    if not validasi_konfigurasi():
        log("Program dihentikan karena konfigurasi belum lengkap.")
        return 2

    driver_otics = None
    driver_huawei = None
    db_connection = None

    cache_p2 = {
        "PV output (kW)": "0.000",
        "Mains power (kW)": "0.000",
        "Irradiance (W/m2)": "0.000",
        "Consumed by appliances (kW)": "0.000",
    }

    try:
        try:
            driver_otics = setup_browser("Plant 1")
            buka_dan_login_otics(driver_otics)
        except Exception as error:
            log(f"Plant 1 gagal disiapkan: {error}")

        try:
            driver_huawei = setup_browser("Plant 2")
            buka_dan_login_huawei(driver_huawei)
        except Exception as error:
            log(f"Plant 2 gagal disiapkan: {error}")

        if driver_otics is None and driver_huawei is None:
            log("Kedua browser gagal dibuat. Program dihentikan.")
            return 1

        try:
            db_connection = pastikan_koneksi_database()
            log("Koneksi MySQL berhasil.")
        except MySQLError as error:
            log(
                "Koneksi awal MySQL gagal. "
                "Program tetap berjalan dan akan mencoba lagi."
            )
            log(f"Detail MySQL: {error}")
            db_connection = None

        log(
            "Semua proses awal selesai. "
            f"Ekstraksi dilakukan setiap "
            f"{INTERVAL_SECONDS // 60} menit."
        )

        while True:
            waktu_mulai = time.monotonic()
            waktu_sekarang = datetime.now(WIB)

            timestamp = waktu_sekarang.strftime(
                "%Y-%m-%d %H:%M:%S"
            )

            data_entry = {
                "timestamp": timestamp,
                "plant_1_otics": {},
                "plant_2_huawei": {},
            }

            log("Menarik data Plant 1.")

            try:
                data_otics = ekstrak_otics(driver_otics)

                if semua_error(data_otics) and driver_otics is not None:
                    data_otics = pulihkan_otics(driver_otics)

            except WebDriverException as error:
                log(f"Plant 1 WebDriver error: {error}")
                data_otics = {
                    name: "Error"
                    for name in TARGET_DATA_OTICS
                }

            data_entry["plant_1_otics"] = data_otics
            log("Data Plant 1 selesai diproses.")

            log("Menarik data teks Plant 2.")

            try:
                data_huawei = ekstrak_huawei_xpath(driver_huawei)

                if semua_error(data_huawei) and driver_huawei is not None:
                    data_huawei = pulihkan_huawei(driver_huawei)

            except WebDriverException as error:
                log(f"Plant 2 WebDriver error: {error}")
                data_huawei = {
                    name: "Error"
                    for name in TARGET_DATA_HUAWEI
                }

            data_entry["plant_2_huawei"] = data_huawei
            log("Data teks Plant 2 selesai diproses.")

            cache_p2, api_berhasil = fetch_huawei_realtime(
                driver_huawei,
                cache_p2,
            )

            for key, value in cache_p2.items():
                data_entry["plant_2_huawei"][key] = value

            if api_berhasil:
                log(
                    "API Plant 2 berhasil. "
                    f"PV={cache_p2['PV output (kW)']} kW, "
                    f"Mains={cache_p2['Mains power (kW)']} kW, "
                    f"Beban="
                    f"{cache_p2['Consumed by appliances (kW)']} kW, "
                    f"Irr={cache_p2['Irradiance (W/m2)']} W/m2."
                )
            else:
                log(
                    "API Plant 2 gagal. "
                    "Program menggunakan cache terakhir."
                )

            try:
                nama_file = save_to_json(data_entry)
                log(
                    f"JSON tersimpan ke {nama_file} "
                    "dan latest_scada_data.json."
                )
            except OSError as error:
                log(f"Gagal menyimpan JSON: {error}")

            try:
                db_connection = pastikan_koneksi_database(
                    db_connection
                )

                inserted_id = simpan_ke_database(
                    db_connection,
                    data_entry,
                )

                log(
                    f"Data berhasil masuk ke MySQL. "
                    f"ID={inserted_id}."
                )

            except MySQLError as error:
                log(
                    "Gagal menyimpan ke MySQL. "
                    "Data JSON tetap tersedia."
                )
                log(f"Detail MySQL: {error}")

                if db_connection is not None:
                    try:
                        db_connection.close()
                    except Exception:
                        pass

                db_connection = None

            durasi_proses = time.monotonic() - waktu_mulai
            waktu_tunggu = max(
                1,
                INTERVAL_SECONDS - durasi_proses,
            )

            log(
                f"Menunggu {int(waktu_tunggu)} detik "
                "untuk ekstraksi berikutnya."
            )

            time.sleep(waktu_tunggu)

    except KeyboardInterrupt:
        log("Sistem dihentikan oleh pengguna.")

    except Exception as error:
        log(f"Error utama yang tidak tertangani: {error}")
        return 1

    finally:
        log("Menutup koneksi dan browser.")

        if db_connection is not None:
            try:
                if db_connection.is_connected():
                    db_connection.close()
                    log("Koneksi MySQL ditutup.")
            except Exception:
                pass

        if driver_otics is not None:
            try:
                driver_otics.quit()
                log("Browser Plant 1 ditutup.")
            except Exception:
                pass

        if driver_huawei is not None:
            try:
                driver_huawei.quit()
                log("Browser Plant 2 ditutup.")
            except Exception:
                pass

    return 0


if __name__ == "__main__":
    sys.exit(main())

