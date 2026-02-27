[
    {
        "id": "8fb494f46bd65df0",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 80,
        "wires": []
    },
    {
        "id": "1fbba5a508930ba1",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 110,
        "wires": [
            [
                "9e929661122f080d",
                "c7117a2e96e6b08d"
            ]
        ]
    },
    {
        "id": "9e929661122f080d",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 170,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "c7117a2e96e6b08d",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_20\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 140,
        "wires": [
            [
                "a54fb15184c2f3f4"
            ]
        ]
    },
    {
        "id": "a54fb15184c2f3f4",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 140,
        "wires": []
    },
    {
        "id": "2367c6b5a03cee04",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 80,
        "wires": [
            [
                "7975a14f3c129cc1",
                "5e43d95fba9dee2b"
            ]
        ]
    },
    {
        "id": "7975a14f3c129cc1",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_20_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 110,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "5e43d95fba9dee2b",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_20\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 80,
        "wires": [
            [
                "8fb494f46bd65df0"
            ]
        ]
    },
    {
        "id": "d34942ed72d3cb4c",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 20",
        "info": "",
        "x": 800,
        "y": 50,
        "wires": []
    },
    {
        "id": "c308a6fe8edf3e3b",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 140,
        "wires": [
            [
                "e09dccca3969947f"
            ]
        ]
    },
    {
        "id": "e09dccca3969947f",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 200,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "3450a13eb794b462",
        "type": "mysql",
        "z": "0f3e4c474bfcb955",
        "mydb": "53be5aa8ed2973e2",
        "name": "",
        "x": 1730,
        "y": 110,
        "wires": [
            []
        ]
    },
    {
        "id": "01db3ae2da888507",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 380,
        "y": 90,
        "wires": [
            [
                "b088c185b9f3fd64",
                "fe094997a5e45204",
                "1f9b51c48f0a9288",
                "e44dab7c6298bbc2"
            ]
        ]
    },
    {
        "id": "998909a60e9fd267",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "60",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 210,
        "y": 90,
        "wires": [
            [
                "01db3ae2da888507"
            ]
        ]
    },
    {
        "id": "b088c185b9f3fd64",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 380,
        "y": 130,
        "wires": [
            [
                "49511eb53cdfc8b2",
                "ee1cb5a5a1f57fbe",
                "98116beef1dd1948",
                "30f0af220404d423"
            ]
        ]
    },
    {
        "id": "49511eb53cdfc8b2",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 380,
        "y": 170,
        "wires": [
            [
                "8cf27fd89a24ca4a",
                "f4b30eef6be60cd4",
                "a2e65bafd9265b63",
                "1c690f46d134dbc7"
            ]
        ]
    },
    {
        "id": "fe094997a5e45204",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "3203",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 810,
        "y": 90,
        "wires": [
            [
                "2367c6b5a03cee04"
            ],
            []
        ]
    },
    {
        "id": "1f9b51c48f0a9288",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "2999",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 810,
        "y": 130,
        "wires": [
            [
                "1fbba5a508930ba1"
            ],
            []
        ]
    },
    {
        "id": "e44dab7c6298bbc2",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "1836",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 810,
        "y": 170,
        "wires": [
            [
                "c308a6fe8edf3e3b"
            ],
            []
        ]
    },
    {
        "id": "c0c068e3fd5be1b8",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 240,
        "wires": []
    },
    {
        "id": "df5e07474b853fb9",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 270,
        "wires": [
            [
                "a9ee8b9163a61c03",
                "e466dc67222558ff"
            ]
        ]
    },
    {
        "id": "a9ee8b9163a61c03",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 330,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "e466dc67222558ff",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_16\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 300,
        "wires": [
            [
                "1c7ca5c6032f6175"
            ]
        ]
    },
    {
        "id": "1c7ca5c6032f6175",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 300,
        "wires": []
    },
    {
        "id": "5b35a7466172cea0",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 240,
        "wires": [
            [
                "3521c7464841bd3b",
                "b5081b2012f2e716"
            ]
        ]
    },
    {
        "id": "3521c7464841bd3b",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_16_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 270,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "b5081b2012f2e716",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_16\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 240,
        "wires": [
            [
                "c0c068e3fd5be1b8"
            ]
        ]
    },
    {
        "id": "9b18fa5f4809617c",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 300,
        "wires": [
            [
                "869eb37bb3964790"
            ]
        ]
    },
    {
        "id": "869eb37bb3964790",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 360,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "ee1cb5a5a1f57fbe",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "3203",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "2",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 810,
        "y": 250,
        "wires": [
            [
                "5b35a7466172cea0"
            ],
            []
        ]
    },
    {
        "id": "98116beef1dd1948",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "2999",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "2",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 810,
        "y": 290,
        "wires": [
            [
                "df5e07474b853fb9"
            ],
            []
        ]
    },
    {
        "id": "30f0af220404d423",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "1836",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "2",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 810,
        "y": 330,
        "wires": [
            [
                "9b18fa5f4809617c"
            ],
            []
        ]
    },
    {
        "id": "6b4dbd0574d2db41",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 16",
        "info": "",
        "x": 800,
        "y": 210,
        "wires": []
    },
    {
        "id": "08a5636c3570f47a",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 400,
        "wires": []
    },
    {
        "id": "66877d7397f09280",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 430,
        "wires": [
            [
                "3ce99c091a3d3b87",
                "34bda4f1222dd81c"
            ]
        ]
    },
    {
        "id": "3ce99c091a3d3b87",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 490,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "34bda4f1222dd81c",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_17\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 460,
        "wires": [
            [
                "fc08ee242221ac88"
            ]
        ]
    },
    {
        "id": "fc08ee242221ac88",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 460,
        "wires": []
    },
    {
        "id": "cee6b4e1913f2b6c",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 400,
        "wires": [
            [
                "0bb0fddc305a5291",
                "55da5c985d1b87d3"
            ]
        ]
    },
    {
        "id": "0bb0fddc305a5291",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_17_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 430,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "55da5c985d1b87d3",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_17\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 400,
        "wires": [
            [
                "08a5636c3570f47a"
            ]
        ]
    },
    {
        "id": "1da1e963891cd940",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 460,
        "wires": [
            [
                "800e32712c96abe3"
            ]
        ]
    },
    {
        "id": "800e32712c96abe3",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 520,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "8cf27fd89a24ca4a",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "3203",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "3",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 800,
        "y": 410,
        "wires": [
            [
                "cee6b4e1913f2b6c"
            ],
            []
        ]
    },
    {
        "id": "f4b30eef6be60cd4",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "2999",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "3",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 800,
        "y": 450,
        "wires": [
            [
                "66877d7397f09280"
            ],
            []
        ]
    },
    {
        "id": "a2e65bafd9265b63",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "1836",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "3",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 800,
        "y": 490,
        "wires": [
            [
                "1da1e963891cd940"
            ],
            []
        ]
    },
    {
        "id": "58d251097248ed0f",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 17",
        "info": "",
        "x": 790,
        "y": 370,
        "wires": []
    },
    {
        "id": "4532248c014b5f02",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 20",
        "info": "",
        "x": 530,
        "y": 90,
        "wires": []
    },
    {
        "id": "5f3cec419fa432b6",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 16",
        "info": "",
        "x": 530,
        "y": 130,
        "wires": []
    },
    {
        "id": "aa5a586c2843ea6e",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 17",
        "info": "",
        "x": 530,
        "y": 170,
        "wires": []
    },
    {
        "id": "b1fb0466663c277f",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 810,
        "wires": []
    },
    {
        "id": "3279abb6595c0222",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nlet data_vah = msg.payload.fwdVAh_ext;\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_24\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",\" + data_vah + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 810,
        "wires": [
            [
                "b1fb0466663c277f",
                "7f97b629cbedc373"
            ]
        ]
    },
    {
        "id": "9ece4a9579d17d2b",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 710,
        "wires": []
    },
    {
        "id": "1c840e8186c9f5d1",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nlet data_vah = msg.payload.fwdVAh_ext;\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_21\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",\" + data_vah + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 710,
        "wires": [
            [
                "9ece4a9579d17d2b",
                "7f97b629cbedc373"
            ]
        ]
    },
    {
        "id": "211af23dda42f799",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1370,
        "y": 610,
        "wires": []
    },
    {
        "id": "46c84904ab8eec86",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_wh",
        "func": "\nlet data_vah = msg.payload.fwdVAh_ext;\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_19\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",\" + data_vah + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 610,
        "wires": [
            [
                "211af23dda42f799",
                "7f97b629cbedc373"
            ]
        ]
    },
    {
        "id": "63f17419a3565ce3",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 730,
        "wires": [
            [
                "916c62cb4934997c"
            ]
        ]
    },
    {
        "id": "2ecf6ad25c856164",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 19",
        "info": "",
        "x": 500,
        "y": 580,
        "wires": []
    },
    {
        "id": "026872057c825eed",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 690,
        "wires": [
            [
                "63f17419a3565ce3",
                "5e1b576dd47e8cc3"
            ]
        ]
    },
    {
        "id": "3ed35b6decdaf8bc",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 21",
        "info": "",
        "x": 500,
        "y": 600,
        "wires": []
    },
    {
        "id": "1c690f46d134dbc7",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 650,
        "wires": [
            [
                "026872057c825eed",
                "5c91fd152003d453"
            ]
        ]
    },
    {
        "id": "4bec0d093f51ce67",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 24",
        "info": "",
        "x": 500,
        "y": 730,
        "wires": []
    },
    {
        "id": "7f97b629cbedc373",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "node_insert",
        "func": "let raw = msg.payload.toString().trim();\n\n// Bersihkan format\nraw = raw.replace('*', '').replace(',#', '');\n\nlet parts = raw.split(',');\n\nif (parts.length !== 3) {\n    node.error(\"Format data tidak valid\", msg);\n    return null;\n}\n\nmsg.payload = {\n    panel_name: parts[0],\n    wh: Number(parts[1]),\n    vah: Number(parts[2])\n};\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 900,
        "wires": [
            [
                "24a63a2754b96ab2"
            ]
        ]
    },
    {
        "id": "24a63a2754b96ab2",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "insert_sql",
        "func": "let panel = msg.payload.panel_name;\nlet table = \"\";\n\n// Tentukan tabel berdasarkan panel\nswitch (panel) {\n    case \"panel_19\":\n        table = \"tb_panel_19_energy_vah_wh\";\n        break;\n    case \"panel_21\":\n        table = \"tb_panel_21_energy_vah_wh\";\n        break;\n    case \"panel_24\":\n        table = \"tb_panel_24_energy_vah_wh\";\n        break;\n    default:\n        node.warn(\"Panel tidak dikenal: \" + panel);\n        return null;\n}\n\n// Query MySQL\nmsg.topic = `\nINSERT INTO ${table}\n(panel_name, wh, vah)\nVALUES (?, ?, ?)\n`;\n\nmsg.payload = [\n    panel,\n    msg.payload.wh,\n    msg.payload.vah\n];\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1380,
        "y": 860,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "916c62cb4934997c",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "6",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 820,
        "y": 850,
        "wires": [
            [
                "f197830b7c7d8ab5"
            ],
            []
        ]
    },
    {
        "id": "5351618c2a977746",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 660,
        "y": 840,
        "wires": [
            [
                "916c62cb4934997c"
            ]
        ]
    },
    {
        "id": "f197830b7c7d8ab5",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 850,
        "wires": [
            [
                "889c87aebbfda8be",
                "3279abb6595c0222"
            ]
        ]
    },
    {
        "id": "889c87aebbfda8be",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toDatabase_tb_com24",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_24 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 850,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "9044e785501d2e42",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 24",
        "info": "",
        "x": 820,
        "y": 810,
        "wires": []
    },
    {
        "id": "5e1b576dd47e8cc3",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "4",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 820,
        "y": 750,
        "wires": [
            [
                "b1ec7ccf5eb38b76"
            ],
            []
        ]
    },
    {
        "id": "f1ba901a9a35af8d",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 660,
        "y": 740,
        "wires": [
            [
                "5e1b576dd47e8cc3"
            ]
        ]
    },
    {
        "id": "b1ec7ccf5eb38b76",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 750,
        "wires": [
            [
                "c2f8de0351b95a6c",
                "1c840e8186c9f5d1"
            ]
        ]
    },
    {
        "id": "c2f8de0351b95a6c",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toDatabase_tb_com21",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_21 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 750,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "8ba78d63131cef54",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 21",
        "info": "",
        "x": 820,
        "y": 710,
        "wires": []
    },
    {
        "id": "5c91fd152003d453",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "5",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 820,
        "y": 650,
        "wires": [
            [
                "fdd60a2c4de88ad3"
            ],
            []
        ]
    },
    {
        "id": "e72822d7fe71b2c2",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 660,
        "y": 630,
        "wires": [
            [
                "5c91fd152003d453"
            ]
        ]
    },
    {
        "id": "fdd60a2c4de88ad3",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 650,
        "wires": [
            [
                "0dba926da8796d76",
                "46c84904ab8eec86"
            ]
        ]
    },
    {
        "id": "0dba926da8796d76",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toDatabase_tb_com19",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_19 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 650,
        "wires": [
            [
                "3450a13eb794b462"
            ]
        ]
    },
    {
        "id": "8f8534266cebb104",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 19",
        "info": "",
        "x": 830,
        "y": 610,
        "wires": []
    },
    {
        "id": "de84afdaf08c746e",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "30",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 1020,
        "wires": [
            [
                "1d56e11afb04d6e3"
            ]
        ]
    },
    {
        "id": "db68fb938d741244",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 960,
        "wires": []
    },
    {
        "id": "09a4b2515f5c130c",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1000,
        "wires": [
            [
                "cc894e0d9713ccf5",
                "a73f609d161c5281"
            ]
        ]
    },
    {
        "id": "6213c37bd3a4ca15",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1080,
        "wires": [
            [
                "88f856b730382f3a",
                "eb83c0a993f785fe"
            ]
        ]
    },
    {
        "id": "eb83c0a993f785fe",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1120,
        "wires": [
            [
                "6746c1092188820c",
                "4538e2094951d106"
            ]
        ]
    },
    {
        "id": "15f4df9f84a83d49",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1240,
        "wires": [
            [
                "0adf55a97547738a",
                "1d52ad5a11878045"
            ]
        ]
    },
    {
        "id": "4538e2094951d106",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1160,
        "wires": [
            [
                "c4616151f6c078c4",
                "6548444279290939"
            ]
        ]
    },
    {
        "id": "6548444279290939",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1200,
        "wires": [
            [
                "46714eed6336f969",
                "15f4df9f84a83d49"
            ]
        ]
    },
    {
        "id": "6bfa3a7fd48533de",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1000,
        "wires": []
    },
    {
        "id": "d4c3a1e1f5629c9a",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1120,
        "wires": []
    },
    {
        "id": "4ba7c06223b68f60",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1160,
        "wires": []
    },
    {
        "id": "281d4250da36d437",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1080,
        "wires": []
    },
    {
        "id": "2fe4645994c76622",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1200,
        "wires": []
    },
    {
        "id": "6b9aa5ea48e529ae",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1240,
        "wires": []
    },
    {
        "id": "cc894e0d9713ccf5",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = \"panel_24_vll\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1000,
        "wires": [
            [
                "6bfa3a7fd48533de"
            ]
        ]
    },
    {
        "id": "6746c1092188820c",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel =\"panel_24_ap\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 1120,
        "wires": [
            [
                "d4c3a1e1f5629c9a"
            ]
        ]
    },
    {
        "id": "c4616151f6c078c4",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel =\"panel_24_rp\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1160,
        "wires": [
            [
                "4ba7c06223b68f60"
            ]
        ]
    },
    {
        "id": "88f856b730382f3a",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel =\"panel_24_ap\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1080,
        "wires": [
            [
                "281d4250da36d437"
            ]
        ]
    },
    {
        "id": "46714eed6336f969",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = \"panel_24_pf\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 1200,
        "wires": [
            [
                "2fe4645994c76622"
            ]
        ]
    },
    {
        "id": "0adf55a97547738a",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = \"panel_24_freq\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1240,
        "wires": [
            [
                "6b9aa5ea48e529ae"
            ]
        ]
    },
    {
        "id": "b38d2f963c5c52ef",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = \"panel_24_c\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 960,
        "wires": [
            [
                "db68fb938d741244"
            ]
        ]
    },
    {
        "id": "454a29ec6eef38d4",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel =\"panel_24_vln\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 1040,
        "wires": [
            [
                "7cb5fca9b48ff092"
            ]
        ]
    },
    {
        "id": "a73f609d161c5281",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1040,
        "wires": [
            [
                "6213c37bd3a4ca15",
                "454a29ec6eef38d4"
            ]
        ]
    },
    {
        "id": "7cb5fca9b48ff092",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1040,
        "wires": []
    },
    {
        "id": "7152a2754165c21b",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 960,
        "wires": [
            [
                "b38d2f963c5c52ef",
                "09a4b2515f5c130c"
            ]
        ]
    },
    {
        "id": "1d56e11afb04d6e3",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "6",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 470,
        "y": 1020,
        "wires": [
            [
                "679e70f206c74c8f"
            ],
            []
        ]
    },
    {
        "id": "fb75ce3ff72ae030",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel =\"panel_24_en\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1280,
        "wires": [
            [
                "97b75d0a51bd3fd7"
            ]
        ]
    },
    {
        "id": "b1b6791763c510fd",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = \"panel_24_enr\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1320,
        "wires": [
            [
                "8b3fa54e8b1351e5"
            ]
        ]
    },
    {
        "id": "97b75d0a51bd3fd7",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1280,
        "wires": []
    },
    {
        "id": "8b3fa54e8b1351e5",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1320,
        "wires": []
    },
    {
        "id": "2c7df496ad6acc80",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = \"panel_24_endm\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1360,
        "wires": [
            [
                "747875dbcdb3a784"
            ]
        ]
    },
    {
        "id": "747875dbcdb3a784",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1360,
        "wires": []
    },
    {
        "id": "1d52ad5a11878045",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1280,
        "wires": [
            [
                "fb75ce3ff72ae030",
                "deb33639dcbd8840"
            ]
        ]
    },
    {
        "id": "deb33639dcbd8840",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1320,
        "wires": [
            [
                "b1b6791763c510fd",
                "3020c97b03bba838"
            ]
        ]
    },
    {
        "id": "3020c97b03bba838",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1360,
        "wires": [
            [
                "2c7df496ad6acc80"
            ]
        ]
    },
    {
        "id": "318d03ec5ea6f380",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "27",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 1500,
        "wires": [
            [
                "4c3661e0439fcb24"
            ]
        ]
    },
    {
        "id": "4c3661e0439fcb24",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "4",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 470,
        "y": 1500,
        "wires": [
            [
                "fdab24644121267a"
            ],
            []
        ]
    },
    {
        "id": "e4820d2af947885d",
        "type": "inject",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "33",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 1980,
        "wires": [
            [
                "aef88cbbd41c6c69"
            ]
        ]
    },
    {
        "id": "aef88cbbd41c6c69",
        "type": "modbus-getter",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "5",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 470,
        "y": 1980,
        "wires": [
            [
                "87d286088cc66e16"
            ],
            []
        ]
    },
    {
        "id": "679e70f206c74c8f",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 960,
        "wires": [
            [
                "7152a2754165c21b"
            ]
        ]
    },
    {
        "id": "fdab24644121267a",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 1440,
        "wires": [
            [
                "35f0778216ab962b"
            ]
        ]
    },
    {
        "id": "87d286088cc66e16",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 1920,
        "wires": [
            [
                "14df87eff1c7b3b8"
            ]
        ]
    },
    {
        "id": "d451ec3770b69ad9",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1480,
        "wires": [
            [
                "81b076cd6b75416f",
                "0f0af9ca931f7d21"
            ]
        ]
    },
    {
        "id": "a01009f5dd71152f",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1560,
        "wires": [
            [
                "03e6f2551e9a5d1d",
                "d9e3a3b9bde11746"
            ]
        ]
    },
    {
        "id": "03e6f2551e9a5d1d",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1600,
        "wires": [
            [
                "ea7071ff3a3bca61",
                "64d549a2ca02b59a"
            ]
        ]
    },
    {
        "id": "c2bcdb6f22523967",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1720,
        "wires": [
            [
                "da33de7ca5575fe8",
                "cb989f0814023a46"
            ]
        ]
    },
    {
        "id": "ea7071ff3a3bca61",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1640,
        "wires": [
            [
                "6927177fc9562281",
                "52fdfd31e0b40765"
            ]
        ]
    },
    {
        "id": "6927177fc9562281",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1680,
        "wires": [
            [
                "c2bcdb6f22523967",
                "bcfe92e966bd17c5"
            ]
        ]
    },
    {
        "id": "81b076cd6b75416f",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1520,
        "wires": [
            [
                "a01009f5dd71152f",
                "5aad451917c6a260"
            ]
        ]
    },
    {
        "id": "35f0778216ab962b",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1440,
        "wires": [
            [
                "d451ec3770b69ad9",
                "134b86bf39b06463"
            ]
        ]
    },
    {
        "id": "da33de7ca5575fe8",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1760,
        "wires": [
            [
                "4a348ff540315862",
                "1f6ee5220b4c45ba"
            ]
        ]
    },
    {
        "id": "4a348ff540315862",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1800,
        "wires": [
            [
                "103b215353f50a32",
                "63d510638c7b9d25"
            ]
        ]
    },
    {
        "id": "103b215353f50a32",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1840,
        "wires": [
            [
                "3a8d337b8f7652b0"
            ]
        ]
    },
    {
        "id": "c3a2b6b87d7dd5ff",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1960,
        "wires": [
            [
                "27036eeeb6a7ffd5",
                "436189c05722f46a"
            ]
        ]
    },
    {
        "id": "139e98f5e3cd726f",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2040,
        "wires": [
            [
                "cfd2d105c020975f",
                "d9355479b2956767"
            ]
        ]
    },
    {
        "id": "cfd2d105c020975f",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2080,
        "wires": [
            [
                "fcb4a252e79d7935",
                "0f9cd2a77eccc1b6"
            ]
        ]
    },
    {
        "id": "6918211e5d1ded79",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2200,
        "wires": [
            [
                "8c0d92839bba9675",
                "2bd1b98bfeb13b2f"
            ]
        ]
    },
    {
        "id": "fcb4a252e79d7935",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2120,
        "wires": [
            [
                "559e603f49d658b3",
                "9a9bc379db6792cc"
            ]
        ]
    },
    {
        "id": "559e603f49d658b3",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2160,
        "wires": [
            [
                "6918211e5d1ded79",
                "f460a4a6afd43f35"
            ]
        ]
    },
    {
        "id": "27036eeeb6a7ffd5",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2000,
        "wires": [
            [
                "139e98f5e3cd726f",
                "4b01b619e6662298"
            ]
        ]
    },
    {
        "id": "14df87eff1c7b3b8",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 1920,
        "wires": [
            [
                "c3a2b6b87d7dd5ff",
                "a6eb7a04b3e4bd22"
            ]
        ]
    },
    {
        "id": "8c0d92839bba9675",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2240,
        "wires": [
            [
                "e9cc62437316c81b",
                "7b618e62061e5288"
            ]
        ]
    },
    {
        "id": "e9cc62437316c81b",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2280,
        "wires": [
            [
                "50f2e0200614e7dd",
                "cc49967f64272f54"
            ]
        ]
    },
    {
        "id": "50f2e0200614e7dd",
        "type": "delay",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 680,
        "y": 2320,
        "wires": [
            [
                "8ae82010d0c4de9b"
            ]
        ]
    },
    {
        "id": "82f12f9613299260",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1440,
        "wires": []
    },
    {
        "id": "31a6456bfebdc93e",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1480,
        "wires": []
    },
    {
        "id": "0a800157b6d73eed",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1600,
        "wires": []
    },
    {
        "id": "7cbb2123c448389a",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1640,
        "wires": []
    },
    {
        "id": "23290d7b06d6a28c",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1560,
        "wires": []
    },
    {
        "id": "9a1d0e5217cb46ba",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1680,
        "wires": []
    },
    {
        "id": "4cf0256079b8a649",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1720,
        "wires": []
    },
    {
        "id": "0f0af9ca931f7d21",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = \"panel_21_vll\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1480,
        "wires": [
            [
                "31a6456bfebdc93e"
            ]
        ]
    },
    {
        "id": "64d549a2ca02b59a",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel =\"panel_21_ap\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 1600,
        "wires": [
            [
                "0a800157b6d73eed"
            ]
        ]
    },
    {
        "id": "52fdfd31e0b40765",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel =\"panel_21_rp\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1640,
        "wires": [
            [
                "7cbb2123c448389a"
            ]
        ]
    },
    {
        "id": "d9e3a3b9bde11746",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel =\"panel_21_ap\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1560,
        "wires": [
            [
                "23290d7b06d6a28c"
            ]
        ]
    },
    {
        "id": "bcfe92e966bd17c5",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = \"panel_21_pf\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 1680,
        "wires": [
            [
                "9a1d0e5217cb46ba"
            ]
        ]
    },
    {
        "id": "cb989f0814023a46",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = \"panel_21_freq\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1720,
        "wires": [
            [
                "4cf0256079b8a649"
            ]
        ]
    },
    {
        "id": "134b86bf39b06463",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = \"panel_21_c\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1440,
        "wires": [
            [
                "82f12f9613299260"
            ]
        ]
    },
    {
        "id": "5aad451917c6a260",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel =\"panel_21_vln\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 1520,
        "wires": [
            [
                "0f7c863344de11e8"
            ]
        ]
    },
    {
        "id": "0f7c863344de11e8",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1520,
        "wires": []
    },
    {
        "id": "1f6ee5220b4c45ba",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel =\"panel_21_en\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1760,
        "wires": [
            [
                "c537b2764ce54653"
            ]
        ]
    },
    {
        "id": "63d510638c7b9d25",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = \"panel_21_enr\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 1800,
        "wires": [
            [
                "32247bc9fcf675ea"
            ]
        ]
    },
    {
        "id": "c537b2764ce54653",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1760,
        "wires": []
    },
    {
        "id": "32247bc9fcf675ea",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1800,
        "wires": []
    },
    {
        "id": "3a8d337b8f7652b0",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = \"panel_21_endm\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1840,
        "wires": [
            [
                "fef6b78ebfecb8a6"
            ]
        ]
    },
    {
        "id": "fef6b78ebfecb8a6",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1840,
        "wires": []
    },
    {
        "id": "1a983ab277f6243c",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1920,
        "wires": []
    },
    {
        "id": "ff2490d44f368e6e",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 1960,
        "wires": []
    },
    {
        "id": "eb80cdbf21b1aa49",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2080,
        "wires": []
    },
    {
        "id": "f79ab235456fe5d7",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2120,
        "wires": []
    },
    {
        "id": "5e7e3f8ef4e1e1ba",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2040,
        "wires": []
    },
    {
        "id": "2513b65b16a73c86",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2160,
        "wires": []
    },
    {
        "id": "cf2b7d44631de7e4",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2200,
        "wires": []
    },
    {
        "id": "436189c05722f46a",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = \"panel_19_vll\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1960,
        "wires": [
            [
                "ff2490d44f368e6e"
            ]
        ]
    },
    {
        "id": "0f9cd2a77eccc1b6",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel =\"panel_19_ap\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 2080,
        "wires": [
            [
                "eb80cdbf21b1aa49"
            ]
        ]
    },
    {
        "id": "9a9bc379db6792cc",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel =\"panel_19_rp\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 2120,
        "wires": [
            [
                "f79ab235456fe5d7"
            ]
        ]
    },
    {
        "id": "d9355479b2956767",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel =\"panel_19_ap\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 2040,
        "wires": [
            [
                "5e7e3f8ef4e1e1ba"
            ]
        ]
    },
    {
        "id": "f460a4a6afd43f35",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = \"panel_19_pf\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 2160,
        "wires": [
            [
                "2513b65b16a73c86"
            ]
        ]
    },
    {
        "id": "2bd1b98bfeb13b2f",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = \"panel_19_freq\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2200,
        "wires": [
            [
                "cf2b7d44631de7e4"
            ]
        ]
    },
    {
        "id": "a6eb7a04b3e4bd22",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = \"panel_19_c\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1920,
        "wires": [
            [
                "1a983ab277f6243c"
            ]
        ]
    },
    {
        "id": "4b01b619e6662298",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel =\"panel_19_vln\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 2000,
        "wires": [
            [
                "755b264f319d0806"
            ]
        ]
    },
    {
        "id": "755b264f319d0806",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2000,
        "wires": []
    },
    {
        "id": "7b618e62061e5288",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel =\"panel_19_en\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 2240,
        "wires": [
            [
                "a539db08373eb51a"
            ]
        ]
    },
    {
        "id": "cc49967f64272f54",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = \"panel_19_enr\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 2280,
        "wires": [
            [
                "1872f90c85a54017"
            ]
        ]
    },
    {
        "id": "a539db08373eb51a",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2240,
        "wires": []
    },
    {
        "id": "1872f90c85a54017",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2280,
        "wires": []
    },
    {
        "id": "8ae82010d0c4de9b",
        "type": "function",
        "z": "0f3e4c474bfcb955",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = \"panel_19_endm\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 2320,
        "wires": [
            [
                "3e24758c9289fa88"
            ]
        ]
    },
    {
        "id": "3e24758c9289fa88",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1130,
        "y": 2320,
        "wires": []
    },
    {
        "id": "d576516d42c16d98",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB1",
        "serialbaud": "9600",
        "databits": 8,
        "parity": "none",
        "stopbits": 1,
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": 10000
    },
    {
        "id": "53be5aa8ed2973e2",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_kub_master",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "45a7f54cff252cb4",
        "type": "modbus-client",
        "name": "",
        "clienttype": "serial",
        "bufferCommands": true,
        "stateLogEnabled": false,
        "queueLogEnabled": false,
        "failureLogEnabled": true,
        "tcpHost": "127.0.0.1",
        "tcpPort": 502,
        "tcpType": "DEFAULT",
        "serialPort": "/dev/ttyUSB0",
        "serialType": "RTU-BUFFERD",
        "serialBaudrate": "19200",
        "serialDatabits": 8,
        "serialStopbits": 1,
        "serialParity": "even",
        "serialConnectionDelay": 100,
        "serialAsciiResponseStartDelimiter": "0x3A",
        "unit_id": 1,
        "commandDelay": 1,
        "clientTimeout": 1000,
        "reconnectOnTimeout": true,
        "reconnectTimeout": 2000,
        "parallelUnitIdsAllowed": true,
        "showErrors": false,
        "showWarnings": true,
        "showLogs": true
    },
    {
        "id": "d025c0107ff689d5",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-node-mysql": "3.0.0",
            "node-red-contrib-modbus": "5.45.2"
        }
    }
]
