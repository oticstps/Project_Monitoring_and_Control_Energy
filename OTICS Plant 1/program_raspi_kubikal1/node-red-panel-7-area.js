[
    {
        "id": "97bf77017daafa51",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 160,
        "wires": []
    },
    {
        "id": "a1f79e40ec591fdd",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 190,
        "wires": [
            [
                "0afd1d2e1f916505",
                "29e80d4aedc1f440"
            ]
        ]
    },
    {
        "id": "0afd1d2e1f916505",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 250,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "29e80d4aedc1f440",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_20\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 220,
        "wires": [
            [
                "cf17531467a4deac"
            ]
        ]
    },
    {
        "id": "cf17531467a4deac",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 220,
        "wires": []
    },
    {
        "id": "b0cda8060aaa7657",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 160,
        "wires": [
            [
                "fb73ea564e5a7072",
                "1be7ec4480d12eb3"
            ]
        ]
    },
    {
        "id": "fb73ea564e5a7072",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_20_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 190,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "1be7ec4480d12eb3",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_20\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 160,
        "wires": [
            [
                "97bf77017daafa51"
            ]
        ]
    },
    {
        "id": "dce770fa7b7c16e0",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 20",
        "info": "",
        "x": 730,
        "y": 130,
        "wires": []
    },
    {
        "id": "1af29a29df894a07",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 220,
        "wires": [
            [
                "a3cafcb11c854a40"
            ]
        ]
    },
    {
        "id": "a3cafcb11c854a40",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 280,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "e1e2d43ed0ba2e88",
        "type": "mysql",
        "z": "de4c91b568f351a0",
        "mydb": "53be5aa8ed2973e2",
        "name": "",
        "x": 1660,
        "y": 190,
        "wires": [
            []
        ]
    },
    {
        "id": "5fa44f048d6cc68e",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 310,
        "y": 170,
        "wires": [
            [
                "73d15a5b7c99f9c1",
                "17ba2927e683846b",
                "b4086899b0158b4f",
                "f5522427e4e0189f"
            ]
        ]
    },
    {
        "id": "4fba5b7de7fa2c0c",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 140,
        "y": 170,
        "wires": [
            [
                "5fa44f048d6cc68e"
            ]
        ]
    },
    {
        "id": "73d15a5b7c99f9c1",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 310,
        "y": 210,
        "wires": [
            [
                "4828c70aea752968",
                "68f689af20a90304",
                "288bd69eb123138b",
                "77288e315839ce09"
            ]
        ]
    },
    {
        "id": "4828c70aea752968",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 310,
        "y": 250,
        "wires": [
            [
                "02d6308dc9d7743f",
                "75bfb577d4e5f584",
                "5812d2fa299846f2",
                "92acdae3fb44cf36"
            ]
        ]
    },
    {
        "id": "17ba2927e683846b",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 740,
        "y": 170,
        "wires": [
            [
                "b0cda8060aaa7657"
            ],
            []
        ]
    },
    {
        "id": "b4086899b0158b4f",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 740,
        "y": 210,
        "wires": [
            [
                "a1f79e40ec591fdd"
            ],
            []
        ]
    },
    {
        "id": "f5522427e4e0189f",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 740,
        "y": 250,
        "wires": [
            [
                "1af29a29df894a07"
            ],
            []
        ]
    },
    {
        "id": "f4586177719d1c9d",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 320,
        "wires": []
    },
    {
        "id": "c4561ba8a7cc764e",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 350,
        "wires": [
            [
                "8417698b1f8882f2",
                "1fd85765648dd49b"
            ]
        ]
    },
    {
        "id": "8417698b1f8882f2",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 410,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "1fd85765648dd49b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_16\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 380,
        "wires": [
            [
                "bdc10db5890e5a50"
            ]
        ]
    },
    {
        "id": "bdc10db5890e5a50",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 380,
        "wires": []
    },
    {
        "id": "4b3601a9d07ead4c",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 320,
        "wires": [
            [
                "4b3ee6a676cdee74",
                "c357dcf853d0e440"
            ]
        ]
    },
    {
        "id": "4b3ee6a676cdee74",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_16_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 350,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "c357dcf853d0e440",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_16\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 320,
        "wires": [
            [
                "f4586177719d1c9d"
            ]
        ]
    },
    {
        "id": "34e1f60739e1cb6d",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 380,
        "wires": [
            [
                "d6473fa2fd41a06e"
            ]
        ]
    },
    {
        "id": "d6473fa2fd41a06e",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 440,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "68f689af20a90304",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 740,
        "y": 330,
        "wires": [
            [
                "4b3601a9d07ead4c"
            ],
            []
        ]
    },
    {
        "id": "288bd69eb123138b",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 740,
        "y": 370,
        "wires": [
            [
                "c4561ba8a7cc764e"
            ],
            []
        ]
    },
    {
        "id": "77288e315839ce09",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 740,
        "y": 410,
        "wires": [
            [
                "34e1f60739e1cb6d"
            ],
            []
        ]
    },
    {
        "id": "009010f55fbf660e",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 16",
        "info": "",
        "x": 730,
        "y": 290,
        "wires": []
    },
    {
        "id": "6516c7805ce6ee80",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 480,
        "wires": []
    },
    {
        "id": "95c2b05454f6e9c8",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 510,
        "wires": [
            [
                "11d174cfff59a669",
                "7c23eade39b0ab9f"
            ]
        ]
    },
    {
        "id": "11d174cfff59a669",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 570,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "7c23eade39b0ab9f",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_17\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 540,
        "wires": [
            [
                "50f8a43f3dcea614"
            ]
        ]
    },
    {
        "id": "50f8a43f3dcea614",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 540,
        "wires": []
    },
    {
        "id": "0d8dd4c2861010bb",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 480,
        "wires": [
            [
                "ce0acd97da1c057b",
                "40200cb7290c69c8"
            ]
        ]
    },
    {
        "id": "ce0acd97da1c057b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_17_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 510,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "40200cb7290c69c8",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_17\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 480,
        "wires": [
            [
                "6516c7805ce6ee80"
            ]
        ]
    },
    {
        "id": "581bb2676358eaf7",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 540,
        "wires": [
            [
                "92190b4e655fac73"
            ]
        ]
    },
    {
        "id": "92190b4e655fac73",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1120,
        "y": 600,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "02d6308dc9d7743f",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 730,
        "y": 490,
        "wires": [
            [
                "0d8dd4c2861010bb"
            ],
            []
        ]
    },
    {
        "id": "75bfb577d4e5f584",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 730,
        "y": 530,
        "wires": [
            [
                "95c2b05454f6e9c8"
            ],
            []
        ]
    },
    {
        "id": "5812d2fa299846f2",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 730,
        "y": 570,
        "wires": [
            [
                "581bb2676358eaf7"
            ],
            []
        ]
    },
    {
        "id": "9a1f5f1a9f9dd8a1",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 17",
        "info": "",
        "x": 720,
        "y": 450,
        "wires": []
    },
    {
        "id": "35e8cc4c0a481c3a",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 20",
        "info": "",
        "x": 460,
        "y": 170,
        "wires": []
    },
    {
        "id": "301eae535bb945ec",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 16",
        "info": "",
        "x": 460,
        "y": 210,
        "wires": []
    },
    {
        "id": "247b688708ffcc2e",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 17",
        "info": "",
        "x": 460,
        "y": 250,
        "wires": []
    },
    {
        "id": "e867ccb4c09bc5a8",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 890,
        "wires": []
    },
    {
        "id": "a3c7133bf001465e",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nlet data_vah = msg.payload.fwdVAh_ext;\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_24\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",\" + data_vah + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1090,
        "y": 890,
        "wires": [
            [
                "e867ccb4c09bc5a8",
                "51a47aa0d70c7d9e"
            ]
        ]
    },
    {
        "id": "4d118e9d98de68e2",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 790,
        "wires": []
    },
    {
        "id": "12d62c591dfa95b5",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nlet data_vah = msg.payload.fwdVAh_ext;\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_21\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",\" + data_vah + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1090,
        "y": 790,
        "wires": [
            [
                "4d118e9d98de68e2",
                "51a47aa0d70c7d9e"
            ]
        ]
    },
    {
        "id": "ace405f875d190be",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1300,
        "y": 690,
        "wires": []
    },
    {
        "id": "4be41e1a91abe96f",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_wh",
        "func": "\nlet data_vah = msg.payload.fwdVAh_ext;\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_19\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",\" + data_vah + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 690,
        "wires": [
            [
                "ace405f875d190be",
                "51a47aa0d70c7d9e"
            ]
        ]
    },
    {
        "id": "7e07137cf9df9302",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 290,
        "y": 810,
        "wires": [
            [
                "4065d67e3f64fcb6"
            ]
        ]
    },
    {
        "id": "d6917bb71e642b79",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 19",
        "info": "",
        "x": 430,
        "y": 730,
        "wires": []
    },
    {
        "id": "9e953bae3beb8c09",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 290,
        "y": 770,
        "wires": [
            [
                "7e07137cf9df9302",
                "0f479b082ad0f3ec"
            ]
        ]
    },
    {
        "id": "5ebd5a8f25022294",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 21",
        "info": "",
        "x": 430,
        "y": 770,
        "wires": []
    },
    {
        "id": "92acdae3fb44cf36",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 290,
        "y": 730,
        "wires": [
            [
                "9e953bae3beb8c09",
                "026f0e333d334121"
            ]
        ]
    },
    {
        "id": "74369036709cc57d",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 24",
        "info": "",
        "x": 430,
        "y": 810,
        "wires": []
    },
    {
        "id": "51a47aa0d70c7d9e",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "node_insert",
        "func": "let raw = msg.payload.toString().trim();\n\n// Bersihkan format\nraw = raw.replace('*', '').replace(',#', '');\n\nlet parts = raw.split(',');\n\nif (parts.length !== 3) {\n    node.error(\"Format data tidak valid\", msg);\n    return null;\n}\n\nmsg.payload = {\n    panel_name: parts[0],\n    wh: Number(parts[1]),\n    vah: Number(parts[2])\n};\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1300,
        "y": 980,
        "wires": [
            [
                "ad17e5b720842728"
            ]
        ]
    },
    {
        "id": "ad17e5b720842728",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "insert_sql",
        "func": "let panel = msg.payload.panel_name;\nlet table = \"\";\n\n// Tentukan tabel berdasarkan panel\nswitch (panel) {\n    case \"panel_19\":\n        table = \"tb_panel_19_energy_vah_wh\";\n        break;\n    case \"panel_21\":\n        table = \"tb_panel_21_energy_vah_wh\";\n        break;\n    case \"panel_24\":\n        table = \"tb_panel_24_energy_vah_wh\";\n        break;\n    default:\n        node.warn(\"Panel tidak dikenal: \" + panel);\n        return null;\n}\n\n// Query MySQL\nmsg.topic = `\nINSERT INTO ${table}\n(panel_name, wh, vah)\nVALUES (?, ?, ?)\n`;\n\nmsg.payload = [\n    panel,\n    msg.payload.wh,\n    msg.payload.vah\n];\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1310,
        "y": 940,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "4065d67e3f64fcb6",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 750,
        "y": 930,
        "wires": [
            [
                "4534606db1a4169a"
            ],
            []
        ]
    },
    {
        "id": "ea15b124852c0b22",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 590,
        "y": 920,
        "wires": [
            [
                "4065d67e3f64fcb6"
            ]
        ]
    },
    {
        "id": "4534606db1a4169a",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 930,
        "wires": [
            [
                "a082b0b6ad668ae5",
                "a3c7133bf001465e"
            ]
        ]
    },
    {
        "id": "a082b0b6ad668ae5",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toDatabase_tb_com24",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_24 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 930,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "c3815fd88231cc8c",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 24",
        "info": "",
        "x": 750,
        "y": 890,
        "wires": []
    },
    {
        "id": "0f479b082ad0f3ec",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 750,
        "y": 830,
        "wires": [
            [
                "dab04702e15d5cef"
            ],
            []
        ]
    },
    {
        "id": "a74ae6c65cb24707",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 590,
        "y": 820,
        "wires": [
            [
                "0f479b082ad0f3ec"
            ]
        ]
    },
    {
        "id": "dab04702e15d5cef",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 830,
        "wires": [
            [
                "9dd5320b01a9b72a",
                "12d62c591dfa95b5"
            ]
        ]
    },
    {
        "id": "9dd5320b01a9b72a",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toDatabase_tb_com21",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_21 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 830,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "d7b646c2a7e44842",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 21",
        "info": "",
        "x": 750,
        "y": 790,
        "wires": []
    },
    {
        "id": "026f0e333d334121",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 750,
        "y": 730,
        "wires": [
            [
                "59e8437e1cca0b9b"
            ],
            []
        ]
    },
    {
        "id": "dd27ef89232adc89",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 590,
        "y": 710,
        "wires": [
            [
                "026f0e333d334121"
            ]
        ]
    },
    {
        "id": "59e8437e1cca0b9b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 730,
        "wires": [
            [
                "ecb48390df1cfa8b",
                "4be41e1a91abe96f"
            ]
        ]
    },
    {
        "id": "ecb48390df1cfa8b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toDatabase_tb_com19",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_19 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 730,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "a8c3056936b025a7",
        "type": "comment",
        "z": "de4c91b568f351a0",
        "name": "panel 19",
        "info": "",
        "x": 760,
        "y": 690,
        "wires": []
    },
    {
        "id": "2d66b0db3589e1e5",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 240,
        "y": 1100,
        "wires": [
            [
                "5070b9f101fc5e7c"
            ]
        ]
    },
    {
        "id": "0223e294488fd565",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1040,
        "wires": []
    },
    {
        "id": "a69bfb27109e5da9",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1080,
        "wires": [
            [
                "40a270584f2d1be9",
                "6b081bbacb70aa55"
            ]
        ]
    },
    {
        "id": "8108dcd625dcc4ee",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1160,
        "wires": [
            [
                "06092aeab2378506",
                "3315c6879100206e"
            ]
        ]
    },
    {
        "id": "3315c6879100206e",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1200,
        "wires": [
            [
                "14bf85077c8e57c8",
                "74fbcb4e8c45625c"
            ]
        ]
    },
    {
        "id": "d4857d19981254c6",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1320,
        "wires": [
            [
                "cb28f60eaf3d36dd",
                "5241b1295c0d73ba"
            ]
        ]
    },
    {
        "id": "74fbcb4e8c45625c",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1240,
        "wires": [
            [
                "af0e3121d68d6ea0",
                "eeeafe49b42a996f"
            ]
        ]
    },
    {
        "id": "eeeafe49b42a996f",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1280,
        "wires": [
            [
                "d4818bf82f885da3",
                "d4857d19981254c6"
            ]
        ]
    },
    {
        "id": "695e753af787f114",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1080,
        "wires": []
    },
    {
        "id": "67df5df620781f81",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1200,
        "wires": []
    },
    {
        "id": "bc5ec510c8fd1851",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1240,
        "wires": []
    },
    {
        "id": "3edf19e0ea65f9ab",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1160,
        "wires": []
    },
    {
        "id": "13f2ff705b7c6fac",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1280,
        "wires": []
    },
    {
        "id": "d22b814d51a768ff",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1320,
        "wires": []
    },
    {
        "id": "40a270584f2d1be9",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1080,
        "wires": [
            [
                "695e753af787f114"
            ]
        ]
    },
    {
        "id": "14bf85077c8e57c8",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 1200,
        "wires": [
            [
                "67df5df620781f81"
            ]
        ]
    },
    {
        "id": "af0e3121d68d6ea0",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1240,
        "wires": [
            [
                "bc5ec510c8fd1851"
            ]
        ]
    },
    {
        "id": "06092aeab2378506",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1160,
        "wires": [
            [
                "3edf19e0ea65f9ab"
            ]
        ]
    },
    {
        "id": "d4818bf82f885da3",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 1280,
        "wires": [
            [
                "13f2ff705b7c6fac"
            ]
        ]
    },
    {
        "id": "cb28f60eaf3d36dd",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 1320,
        "wires": [
            [
                "d22b814d51a768ff"
            ]
        ]
    },
    {
        "id": "8ad5e09dc0610a54",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1040,
        "wires": [
            [
                "0223e294488fd565"
            ]
        ]
    },
    {
        "id": "1ee885f6a12b5ba0",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 1120,
        "wires": [
            [
                "bee0f9cba3ca6a85"
            ]
        ]
    },
    {
        "id": "6b081bbacb70aa55",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1120,
        "wires": [
            [
                "8108dcd625dcc4ee",
                "1ee885f6a12b5ba0"
            ]
        ]
    },
    {
        "id": "bee0f9cba3ca6a85",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1120,
        "wires": []
    },
    {
        "id": "99928f73755030cd",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1040,
        "wires": [
            [
                "8ad5e09dc0610a54",
                "a69bfb27109e5da9"
            ]
        ]
    },
    {
        "id": "5070b9f101fc5e7c",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 400,
        "y": 1100,
        "wires": [
            [
                "1abc48e8bd9aa2ec"
            ],
            []
        ]
    },
    {
        "id": "0734755095efb1a4",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "comp_19",
        "func": "const to3 = (v) => Number(v ?? 0).toFixed(3);\nconst p = msg.payload;\n\nconst classes = {\n    kub_c: [\n        p.current_avg_ext,\n        p.current_a_ext,\n        p.current_b_ext,\n        p.current_c_ext,\n        p.current_n_ext,\n        p.current_g_ext\n    ],\n    kub_vln: [\n        p.voltage_ln_avg_ext,\n        p.voltage_an_ext,\n        p.voltage_bn_ext,\n        p.voltage_cn_ext\n    ],\n    kub_vll: [\n        p.voltage_ll_avg_ext,\n        p.voltage_ab_ext,\n        p.voltage_bc_ext,\n        p.voltage_ca_ext\n    ],\n    kub_ap: [\n        p.active_power_total_ext,\n        p.active_power_a_ext,\n        p.active_power_b_ext,\n        p.active_power_c_ext\n    ],\n    kub_rp: [\n        p.reactive_power_total_ext,\n        p.reactive_power_a_ext,\n        p.reactive_power_b_ext,\n        p.reactive_power_c_ext\n    ],\n    kub_apr: [\n        p.apparent_power_total_ext,\n        p.apparent_power_a_ext,\n        p.apparent_power_b_ext,\n        p.apparent_power_c_ext\n    ],\n    kub_pk: [\n        p.power_factor_total_ext,\n        p.power_factor_a_ext,\n        p.power_factor_b_ext,\n        p.power_factor_c_ext\n    ],\n    kub_freq: [ p.frequency_ext ]\n};\n\n// kirim satu per satu dengan jeda\nlet delay = 0;\nfor (const [panel, values] of Object.entries(classes)) {\n    const payload = `*${panel},${values.map(to3).join(\",\")},#\\n`;\n\n    setTimeout(() => {\n        node.send({ payload });\n    }, delay);\n\n    delay += 3000; // 3 detik\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 1390,
        "wires": [
            [
                "bfa5162a2453096e"
            ]
        ]
    },
    {
        "id": "846bf417c10277ce",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "comp_21",
        "func": "const to3 = (v) => Number(v ?? 0).toFixed(3);\nconst p = msg.payload;\n\nconst classes = {\n    kub_c: [\n        p.current_avg_ext,\n        p.current_a_ext,\n        p.current_b_ext,\n        p.current_c_ext,\n        p.current_n_ext,\n        p.current_g_ext\n    ],\n    kub_vln: [\n        p.voltage_ln_avg_ext,\n        p.voltage_an_ext,\n        p.voltage_bn_ext,\n        p.voltage_cn_ext\n    ],\n    kub_vll: [\n        p.voltage_ll_avg_ext,\n        p.voltage_ab_ext,\n        p.voltage_bc_ext,\n        p.voltage_ca_ext\n    ],\n    kub_ap: [\n        p.active_power_total_ext,\n        p.active_power_a_ext,\n        p.active_power_b_ext,\n        p.active_power_c_ext\n    ],\n    kub_rp: [\n        p.reactive_power_total_ext,\n        p.reactive_power_a_ext,\n        p.reactive_power_b_ext,\n        p.reactive_power_c_ext\n    ],\n    kub_apr: [\n        p.apparent_power_total_ext,\n        p.apparent_power_a_ext,\n        p.apparent_power_b_ext,\n        p.apparent_power_c_ext\n    ],\n    kub_pk: [\n        p.power_factor_total_ext,\n        p.power_factor_a_ext,\n        p.power_factor_b_ext,\n        p.power_factor_c_ext\n    ],\n    kub_freq: [ p.frequency_ext ]\n};\n\n// kirim satu per satu dengan jeda\nlet delay = 0;\nfor (const [panel, values] of Object.entries(classes)) {\n    const payload = `*${panel},${values.map(to3).join(\",\")},#\\n`;\n\n    setTimeout(() => {\n        node.send({ payload });\n    }, delay);\n\n    delay += 3000; // 3 detik\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 1430,
        "wires": [
            [
                "96ba00bc4c160487"
            ]
        ]
    },
    {
        "id": "90ab23998c51971f",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "comp_24",
        "func": "const to3 = (v) => Number(v ?? 0).toFixed(3);\nconst p = msg.payload;\n\nconst classes = {\n    kub_c: [\n        p.current_avg_ext,\n        p.current_a_ext,\n        p.current_b_ext,\n        p.current_c_ext,\n        p.current_n_ext,\n        p.current_g_ext\n    ],\n    kub_vln: [\n        p.voltage_ln_avg_ext,\n        p.voltage_an_ext,\n        p.voltage_bn_ext,\n        p.voltage_cn_ext\n    ],\n    kub_vll: [\n        p.voltage_ll_avg_ext,\n        p.voltage_ab_ext,\n        p.voltage_bc_ext,\n        p.voltage_ca_ext\n    ],\n    kub_ap: [\n        p.active_power_total_ext,\n        p.active_power_a_ext,\n        p.active_power_b_ext,\n        p.active_power_c_ext\n    ],\n    kub_rp: [\n        p.reactive_power_total_ext,\n        p.reactive_power_a_ext,\n        p.reactive_power_b_ext,\n        p.reactive_power_c_ext\n    ],\n    kub_apr: [\n        p.apparent_power_total_ext,\n        p.apparent_power_a_ext,\n        p.apparent_power_b_ext,\n        p.apparent_power_c_ext\n    ],\n    kub_pk: [\n        p.power_factor_total_ext,\n        p.power_factor_a_ext,\n        p.power_factor_b_ext,\n        p.power_factor_c_ext\n    ],\n    kub_freq: [ p.frequency_ext ]\n};\n\n// kirim satu per satu dengan jeda\nlet delay = 0;\nfor (const [panel, values] of Object.entries(classes)) {\n    const payload = `*${panel},${values.map(to3).join(\",\")},#\\n`;\n\n    setTimeout(() => {\n        node.send({ payload });\n    }, delay);\n\n    delay += 3000; // 3 detik\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 1470,
        "wires": [
            [
                "097003ec9b0d1f79"
            ]
        ]
    },
    {
        "id": "d6fe4bb619f33b77",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 1620,
        "y": 1520,
        "wires": [
            [
                "0734755095efb1a4"
            ],
            []
        ]
    },
    {
        "id": "d0921fc305c9232d",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 1620,
        "y": 1560,
        "wires": [
            [
                "846bf417c10277ce"
            ],
            []
        ]
    },
    {
        "id": "6039d2ec64de0983",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 1620,
        "y": 1600,
        "wires": [
            [
                "90ab23998c51971f"
            ],
            []
        ]
    },
    {
        "id": "bfa5162a2453096e",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1750,
        "y": 1390,
        "wires": []
    },
    {
        "id": "96ba00bc4c160487",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1750,
        "y": 1430,
        "wires": []
    },
    {
        "id": "097003ec9b0d1f79",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1750,
        "y": 1470,
        "wires": []
    },
    {
        "id": "440860278e57de5e",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "repeat": "22",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 1470,
        "y": 1520,
        "wires": [
            [
                "d6fe4bb619f33b77"
            ]
        ]
    },
    {
        "id": "cfad02fc424f783b",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "repeat": "22",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 1470,
        "y": 1560,
        "wires": [
            [
                "d0921fc305c9232d"
            ]
        ]
    },
    {
        "id": "bfe5ef48d09b1bef",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "repeat": "22",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 1470,
        "y": 1600,
        "wires": [
            [
                "6039d2ec64de0983"
            ]
        ]
    },
    {
        "id": "5166826645a91533",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1360,
        "wires": [
            [
                "e3366fdae6de1e90"
            ]
        ]
    },
    {
        "id": "9823a6ac33d2b4fb",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1400,
        "wires": [
            [
                "74ab369b7fd4ad81"
            ]
        ]
    },
    {
        "id": "e3366fdae6de1e90",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1360,
        "wires": []
    },
    {
        "id": "74ab369b7fd4ad81",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1400,
        "wires": []
    },
    {
        "id": "64a301d4571b8c27",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1440,
        "wires": [
            [
                "4bbcc8867eb75264"
            ]
        ]
    },
    {
        "id": "4bbcc8867eb75264",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1440,
        "wires": []
    },
    {
        "id": "5241b1295c0d73ba",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1360,
        "wires": [
            [
                "5166826645a91533",
                "caa3a7f2236f3e3b"
            ]
        ]
    },
    {
        "id": "caa3a7f2236f3e3b",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1400,
        "wires": [
            [
                "9823a6ac33d2b4fb",
                "c29bd2f0a56af5e3"
            ]
        ]
    },
    {
        "id": "c29bd2f0a56af5e3",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1440,
        "wires": [
            [
                "64a301d4571b8c27"
            ]
        ]
    },
    {
        "id": "deae0a76b49f407e",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 240,
        "y": 1580,
        "wires": [
            [
                "10a503b80d2359b5"
            ]
        ]
    },
    {
        "id": "c050d4cb14040d59",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1520,
        "wires": []
    },
    {
        "id": "7f7af6e36b6eea6e",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1560,
        "wires": []
    },
    {
        "id": "8ea9b5e5113a2884",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1680,
        "wires": []
    },
    {
        "id": "a66186de8e558f81",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1720,
        "wires": []
    },
    {
        "id": "2e37f702225f791c",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1640,
        "wires": []
    },
    {
        "id": "8b86a362910a1bb5",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1760,
        "wires": []
    },
    {
        "id": "fd4ee2d48b66ae1f",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1800,
        "wires": []
    },
    {
        "id": "5f80e441728dd55c",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1560,
        "wires": [
            [
                "7f7af6e36b6eea6e"
            ]
        ]
    },
    {
        "id": "4e116459598195ae",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 1680,
        "wires": [
            [
                "8ea9b5e5113a2884"
            ]
        ]
    },
    {
        "id": "c2b78211697df5cd",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1720,
        "wires": [
            [
                "a66186de8e558f81"
            ]
        ]
    },
    {
        "id": "7fa4a56d3496c410",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1640,
        "wires": [
            [
                "2e37f702225f791c"
            ]
        ]
    },
    {
        "id": "7e71364f7fdad5cc",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 1760,
        "wires": [
            [
                "8b86a362910a1bb5"
            ]
        ]
    },
    {
        "id": "250ea737f2c31c9b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 1800,
        "wires": [
            [
                "fd4ee2d48b66ae1f"
            ]
        ]
    },
    {
        "id": "ed18313e436c7ff2",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1520,
        "wires": [
            [
                "c050d4cb14040d59"
            ]
        ]
    },
    {
        "id": "59cd10cb306b3b4a",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 1600,
        "wires": [
            [
                "fb23909f8d674adf"
            ]
        ]
    },
    {
        "id": "fb23909f8d674adf",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1600,
        "wires": []
    },
    {
        "id": "10a503b80d2359b5",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 400,
        "y": 1580,
        "wires": [
            [
                "bebf02526ed95444"
            ],
            []
        ]
    },
    {
        "id": "4ba3374ef720af29",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1840,
        "wires": [
            [
                "2e7f2f28ef47a191"
            ]
        ]
    },
    {
        "id": "d524cefdd8d3903d",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 1880,
        "wires": [
            [
                "e39912e828552e45"
            ]
        ]
    },
    {
        "id": "2e7f2f28ef47a191",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1840,
        "wires": []
    },
    {
        "id": "e39912e828552e45",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1880,
        "wires": []
    },
    {
        "id": "79f9dd14e9973796",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1920,
        "wires": [
            [
                "c36757fc07727c21"
            ]
        ]
    },
    {
        "id": "c36757fc07727c21",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 1920,
        "wires": []
    },
    {
        "id": "aa8d1d51c141f103",
        "type": "inject",
        "z": "de4c91b568f351a0",
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
        "x": 240,
        "y": 2060,
        "wires": [
            [
                "e3ac55369c968f3d"
            ]
        ]
    },
    {
        "id": "1fc6fb13ee73d91f",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2000,
        "wires": []
    },
    {
        "id": "9b5ce43aa087ebea",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2040,
        "wires": []
    },
    {
        "id": "89118d4bc34faac8",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2160,
        "wires": []
    },
    {
        "id": "6d18b4ea351e1933",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2200,
        "wires": []
    },
    {
        "id": "8f2eb3d12ea92512",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2120,
        "wires": []
    },
    {
        "id": "056d277636b17439",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2240,
        "wires": []
    },
    {
        "id": "ee7b66e560d4a803",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2280,
        "wires": []
    },
    {
        "id": "f2ceef6bd53a7663",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 2040,
        "wires": [
            [
                "9b5ce43aa087ebea"
            ]
        ]
    },
    {
        "id": "3158679a172033d4",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 2160,
        "wires": [
            [
                "89118d4bc34faac8"
            ]
        ]
    },
    {
        "id": "031a5b2d09f46f33",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 2200,
        "wires": [
            [
                "6d18b4ea351e1933"
            ]
        ]
    },
    {
        "id": "828d8d928a698e4e",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 2120,
        "wires": [
            [
                "8f2eb3d12ea92512"
            ]
        ]
    },
    {
        "id": "e4f4584b1638fb00",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 2240,
        "wires": [
            [
                "056d277636b17439"
            ]
        ]
    },
    {
        "id": "265455c01889f82b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 2280,
        "wires": [
            [
                "ee7b66e560d4a803"
            ]
        ]
    },
    {
        "id": "0b5311d6c21a30a7",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 2000,
        "wires": [
            [
                "1fc6fb13ee73d91f"
            ]
        ]
    },
    {
        "id": "b3671fb9e260aec2",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 2080,
        "wires": [
            [
                "69970296f353b7dd"
            ]
        ]
    },
    {
        "id": "69970296f353b7dd",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2080,
        "wires": []
    },
    {
        "id": "e3ac55369c968f3d",
        "type": "modbus-getter",
        "z": "de4c91b568f351a0",
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
        "x": 400,
        "y": 2060,
        "wires": [
            [
                "1733b0a437515908"
            ],
            []
        ]
    },
    {
        "id": "871264de952f15c5",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 2320,
        "wires": [
            [
                "227bd207e8f9cfbc"
            ]
        ]
    },
    {
        "id": "fc071bcf7f01748a",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 2360,
        "wires": [
            [
                "dff5e89ae0019793"
            ]
        ]
    },
    {
        "id": "227bd207e8f9cfbc",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2320,
        "wires": []
    },
    {
        "id": "dff5e89ae0019793",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2360,
        "wires": []
    },
    {
        "id": "e57fbb276398d18b",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = msg.panel_id || \"panel_24\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 2400,
        "wires": [
            [
                "563a0ccfb4ce0406"
            ]
        ]
    },
    {
        "id": "563a0ccfb4ce0406",
        "type": "serial out",
        "z": "de4c91b568f351a0",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1060,
        "y": 2400,
        "wires": []
    },
    {
        "id": "1abc48e8bd9aa2ec",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 1040,
        "wires": [
            [
                "99928f73755030cd"
            ]
        ]
    },
    {
        "id": "bebf02526ed95444",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 1520,
        "wires": [
            [
                "544b40b31724eaf0"
            ]
        ]
    },
    {
        "id": "1733b0a437515908",
        "type": "function",
        "z": "de4c91b568f351a0",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 2000,
        "wires": [
            [
                "2c3339834bb23a32"
            ]
        ]
    },
    {
        "id": "3047df520e48c9cf",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1560,
        "wires": [
            [
                "f93d71e38a3a0e77",
                "5f80e441728dd55c"
            ]
        ]
    },
    {
        "id": "95c0a305d9368ef9",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1640,
        "wires": [
            [
                "9366c4f292b88804",
                "7fa4a56d3496c410"
            ]
        ]
    },
    {
        "id": "9366c4f292b88804",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1680,
        "wires": [
            [
                "1cf6a8871370003f",
                "4e116459598195ae"
            ]
        ]
    },
    {
        "id": "c5341bf960118648",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1800,
        "wires": [
            [
                "61cf80eba1df2f6c",
                "250ea737f2c31c9b"
            ]
        ]
    },
    {
        "id": "1cf6a8871370003f",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1720,
        "wires": [
            [
                "cb2bf928ec0f344c",
                "c2b78211697df5cd"
            ]
        ]
    },
    {
        "id": "cb2bf928ec0f344c",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1760,
        "wires": [
            [
                "c5341bf960118648",
                "7e71364f7fdad5cc"
            ]
        ]
    },
    {
        "id": "f93d71e38a3a0e77",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1600,
        "wires": [
            [
                "95c0a305d9368ef9",
                "59cd10cb306b3b4a"
            ]
        ]
    },
    {
        "id": "544b40b31724eaf0",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1520,
        "wires": [
            [
                "3047df520e48c9cf",
                "ed18313e436c7ff2"
            ]
        ]
    },
    {
        "id": "61cf80eba1df2f6c",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1840,
        "wires": [
            [
                "dbfe8f0a71525077",
                "4ba3374ef720af29"
            ]
        ]
    },
    {
        "id": "dbfe8f0a71525077",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1880,
        "wires": [
            [
                "ad94cba173089ab3",
                "d524cefdd8d3903d"
            ]
        ]
    },
    {
        "id": "ad94cba173089ab3",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 1920,
        "wires": [
            [
                "79f9dd14e9973796"
            ]
        ]
    },
    {
        "id": "1cb01cb3ff005365",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2040,
        "wires": [
            [
                "e7eb290a8868cea2",
                "f2ceef6bd53a7663"
            ]
        ]
    },
    {
        "id": "1459862de5620d80",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2120,
        "wires": [
            [
                "506db9f2167a8ec8",
                "828d8d928a698e4e"
            ]
        ]
    },
    {
        "id": "506db9f2167a8ec8",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2160,
        "wires": [
            [
                "a2dd0b89203d3831",
                "3158679a172033d4"
            ]
        ]
    },
    {
        "id": "07dee732448e3fc5",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2280,
        "wires": [
            [
                "803309661159f6a9",
                "265455c01889f82b"
            ]
        ]
    },
    {
        "id": "a2dd0b89203d3831",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2200,
        "wires": [
            [
                "7eca473a13617d41",
                "031a5b2d09f46f33"
            ]
        ]
    },
    {
        "id": "7eca473a13617d41",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2240,
        "wires": [
            [
                "07dee732448e3fc5",
                "e4f4584b1638fb00"
            ]
        ]
    },
    {
        "id": "e7eb290a8868cea2",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2080,
        "wires": [
            [
                "1459862de5620d80",
                "b3671fb9e260aec2"
            ]
        ]
    },
    {
        "id": "2c3339834bb23a32",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2000,
        "wires": [
            [
                "1cb01cb3ff005365",
                "0b5311d6c21a30a7"
            ]
        ]
    },
    {
        "id": "803309661159f6a9",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2320,
        "wires": [
            [
                "9c1d2008c1fd46e5",
                "871264de952f15c5"
            ]
        ]
    },
    {
        "id": "9c1d2008c1fd46e5",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2360,
        "wires": [
            [
                "e08234caa0189fdc",
                "fc071bcf7f01748a"
            ]
        ]
    },
    {
        "id": "e08234caa0189fdc",
        "type": "delay",
        "z": "de4c91b568f351a0",
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
        "x": 610,
        "y": 2400,
        "wires": [
            [
                "e57fbb276398d18b"
            ]
        ]
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
    }
]
