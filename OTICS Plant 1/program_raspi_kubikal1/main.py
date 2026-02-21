
# 

import time
import struct
import math
import pymysql
from pymodbus.client import ModbusTcpClient
import serial
from datetime import datetime

# Modbus Configuration
MODBUS_HOST = '169.254.0.10'
MODBUS_PORT = 502
UNIT_ID = 1

# MySQL Database Configuration
DB_HOST = 'localhost'
DB_USER = 'otics'
DB_PASSWORD = 'tuanku'
DB_NAME = 'database_energy_area_compressor'

# Define Registers
REGISTER_POWER = [
    (3203, "active_energy_delivered"),
    (3207, "active_energy_received"),
    (3211, "active_energy_delivered_received"),
    (3215, "active_energy_delivered_minus_received"),
    (3219, "reactive_energy_delivered"),
    (3223, "reactive_energy_received"),
    (3227, "reactive_energy_delivered_received"),
    (3231, "reactive_energy_delivered_minus_received"),
    (3235, "apparent_energy_delivered"),
    (3239, "apparent_energy_received"),
    (3243, "apparent_energy_delivered_received"),
    (3247, "apparent_energy_delivered_minus_received")
]

FLOAT32_REGISTERS = [
    (2999, "current_a"),
    (3001, "current_b"),
    (3003, "current_c"),
    (3005, "current_n"),
    (3007, "current_g"),
    (3009, "current_avg"),
    (3019, "voltage_ab"),
    (3021, "voltage_bc"),
    (3023, "voltage_ca"),
    (3025, "voltage_ll_avg"),
    (3027, "voltage_an"),
    (3029, "voltage_bn"),
    (3031, "voltage_cn"),
    (3035, "voltage_ln_avg"),
    (3053, "active_power_a"),
    (3055, "active_power_b"),
    (3057, "active_power_c"),
    (3059, "active_power_total"),
    (3061, "reactive_power_a"),
    (3063, "reactive_power_b"),
    (3065, "reactive_power_c"),
    (3067, "reactive_power_total"),
    (3069, "apparent_power_a"),
    (3071, "apparent_power_b"),
    (3073, "apparent_power_c"),
    (3075, "apparent_power_total"),
    (3077, "power_factor_a"),
    (3079, "power_factor_b"),
    (3081, "power_factor_c"),
    (3083, "power_factor_total"),
    (3109, "frequency")
]

REGISTER_DATETIME = [
    (1836, "year"),
    (1837, "month"),
    (1838, "day"),
    (1839, "hour"),
    (1840, "minute"),
    (1841, "second"),
    (1842, "millisecond")
]

# Serial Configuration
SERIAL_PORT = '/dev/ttyUSB0'
BAUD_RATE = 9600

# Register yang ingin dikirim ke serial
TARGET_REGISTERS = {
    3059: "DA_30",  # Active Power Total
    3025: "DA_22",  # Voltage L-L Avg
    3009: "DA_18",  # Current Avg
    3203: "DA_01",  # Active Energy Delivered (Into Load)
}

# Connect to Modbus and MySQL
client = ModbusTcpClient(MODBUS_HOST, port=MODBUS_PORT)
db_connection = pymysql.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)

# Serial connection variable
serial_client = None

def setup_serial_connection():
    """Try to establish a connection to the serial port"""
    global serial_client
    try:
        if serial_client is not None:
            try:
                serial_client.close()
            except:
                pass
        serial_client = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        print(f"Serial connection established on {SERIAL_PORT}")
        return True
    except serial.SerialException as e:
        print(f"Failed to connect to serial port: {e}")
        return False

# Initialize serial connection
setup_serial_connection()

def get_current_month_year():
    now = datetime.now()
    month = now.strftime("%b").lower()  # e.g., 'jan', 'feb'
    year = now.strftime("%Y")          # e.g., '2025'
    return month, year

def create_table_if_not_exists(cursor, table_name):
    create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        active_energy_delivered BIGINT,
        active_energy_received BIGINT,
        active_energy_delivered_received BIGINT,
        active_energy_delivered_minus_received BIGINT,
        reactive_energy_delivered BIGINT,
        reactive_energy_received BIGINT,
        reactive_energy_delivered_received BIGINT,
        reactive_energy_delivered_minus_received BIGINT,
        apparent_energy_delivered BIGINT,
        apparent_energy_received BIGINT,
        apparent_energy_delivered_received BIGINT,
        apparent_energy_delivered_minus_received BIGINT,
        current_a FLOAT,
        current_b FLOAT,
        current_c FLOAT,
        current_n FLOAT,
        current_g FLOAT,
        current_avg FLOAT,
        voltage_ab FLOAT,
        voltage_bc FLOAT,
        voltage_ca FLOAT,
        voltage_ll_avg FLOAT,
        voltage_an FLOAT,
        voltage_bn FLOAT,
        voltage_cn FLOAT,
        voltage_ln_avg FLOAT,
        active_power_a FLOAT,
        active_power_b FLOAT,
        active_power_c FLOAT,
        active_power_total FLOAT,
        reactive_power_a FLOAT,
        reactive_power_b FLOAT,
        reactive_power_c FLOAT,
        reactive_power_total FLOAT,
        apparent_power_a FLOAT,
        apparent_power_b FLOAT,
        apparent_power_c FLOAT,
        apparent_power_total FLOAT,
        power_factor_a FLOAT,
        power_factor_b FLOAT,
        power_factor_c FLOAT,
        power_factor_total FLOAT,
        frequency FLOAT,
        year INT,
        month INT,
        day INT,
        hour INT,
        minute INT,
        second INT,
        millisecond INT
    );
    """
    cursor.execute(create_table_query)
    print(f"Table '{table_name}' created or already exists.")

def fetch_modbus_data():
    data = {}

    # Read power registers
    for address, name in REGISTER_POWER:
        response = client.read_holding_registers(address, 4, slave=UNIT_ID)
        if not response.isError():
            registers = response.registers
            int64_value = struct.unpack('>Q', struct.pack('>HHHH', *registers))[0]
            data[name] = int64_value

    # Read float32 registers
    for address, name in FLOAT32_REGISTERS:
        response = client.read_holding_registers(address, 2, slave=UNIT_ID)
        if not response.isError():
            registers = response.registers
            float_value = struct.unpack('!f', struct.pack('>HH', *registers))[0]
            # Check for NaN and log if detected
            if math.isnan(float_value):
                print(f"NaN detected for {name} at address {address}. Setting value to None.")
                data[name] = None
            else:
                data[name] = float_value

    # Read datetime registers
    for address, name in REGISTER_DATETIME:
        response = client.read_holding_registers(address, 1, slave=UNIT_ID)
        if not response.isError():
            int_value = response.registers[0]
            data[name] = int_value

    return data

def insert_data_into_db(data):
    cursor = db_connection.cursor()
    
    # Get current month and year
    month, year = get_current_month_year()
    table_name = f"table_energy_listrik_otics_{month}_{year}"
    
    # Create table if it doesn't exist
    create_table_if_not_exists(cursor, table_name)
    
    # Filter out any remaining NaN values by replacing them with None
    for key, value in data.items():
        if isinstance(value, float) and math.isnan(value):
            data[key] = None
    
    columns = ', '.join(data.keys())
    placeholders = ', '.join(['%s'] * len(data))
    sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    
    try:
        cursor.execute(sql, list(data.values()))
        db_connection.commit()
        print(f"Data inserted successfully into table '{table_name}':", data)
    except pymysql.MySQLError as e:
        print("Error inserting data:", e)
        db_connection.rollback()
    finally:
        cursor.close()

def send_data_to_serial(data):
    global serial_client
    
    # Check if serial port is available
    if serial_client is None or not serial_client.is_open:
        print("Serial port is not available. Attempting to reconnect...")
        if not setup_serial_connection():
            print("Cannot send data to serial port. Continuing with other operations.")
            return
    
    for address, description in TARGET_REGISTERS.items():
        if address in data:
            value = data[address]
            if value is not None:
                try:
                    serial_data = f"*kub,{description},{value}#"
                    serial_client.write(serial_data.encode('utf-8'))
                    print(f"Sent data to serial: {serial_data}")
                except serial.SerialException as e:
                    print(f"Serial error occurred: {e}")
                    print("Attempting to reconnect serial port...")
                    setup_serial_connection()
                    break  # Break the loop and try again next time
            else:
                print(f"Value for register {address} is None. Skipping serial transmission.")
        time.sleep(1)  # Delay 1 detik antara pengiriman data untuk setiap register

def reconnect_db():
    global db_connection
    try:
        if db_connection and db_connection.open:
            db_connection.close()
        db_connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        print("Database connection re-established")
        return True
    except pymysql.MySQLError as e:
        print(f"Failed to reconnect to database: {e}")
        return False

def reconnect_modbus():
    global client
    try:
        if client.is_socket_open():
            client.close()
        connected = client.connect()
        if connected:
            print("Modbus connection re-established")
            return True
        else:
            print("Failed to reconnect to Modbus server")
            return False
    except Exception as e:
        print(f"Error during Modbus reconnection: {e}")
        return False

try:
    if not client.connect():
        print("Modbus connection failed. Will attempt to reconnect.")
    
    while True:
        try:
            # Check and reconnect database if needed
            if not db_connection.ping(reconnect=True):
                print("Database connection lost. Attempting to reconnect...")
                reconnect_db()
            
            # Check and reconnect Modbus if needed
            if not client.is_socket_open():
                print("Modbus connection lost. Attempting to reconnect...")
                reconnect_modbus()
            
            # Get data from Modbus
            data = fetch_modbus_data()
            if data:
                # Insert data into database
                try:
                    insert_data_into_db(data)
                except pymysql.MySQLError as e:
                    print(f"Database error: {e}")
                    reconnect_db()
                
                # Send data to serial port (with error handling)
                try:
                    send_data_to_serial(data)
                except serial.SerialException as e:
                    print(f"Serial error: {e}")
                    print("USB device may have been disconnected. Will try to reconnect next cycle.")
            else:
                print("No data fetched from Modbus registers.")
                
        except Exception as e:
            print(f"Error in main loop: {e}")
            # Try to reconnect all connections
            try:
                reconnect_modbus()
                reconnect_db()
                setup_serial_connection()
            except Exception as e2:
                print(f"Error during reconnection attempts: {e2}")
        
        time.sleep(10)  # Delay 10 detik antara siklus pengambilan data
        
except KeyboardInterrupt:
    print("Program interrupted by user")
finally:
    # Clean up resources
    if client.is_socket_open():
        client.close()
    
    if db_connection and db_connection.open:
        db_connection.close()
    
    if serial_client and serial_client.is_open:
        serial_client.close()
    
    print("Program terminated, all connections closed")
