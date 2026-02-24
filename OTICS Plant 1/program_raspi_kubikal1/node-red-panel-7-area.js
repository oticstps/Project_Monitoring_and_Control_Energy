[
    {
        "id": "97bf77017daafa51",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1490,
        "y": 240,
        "wires": []
    },
    {
        "id": "a1f79e40ec591fdd",
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
        "y": 180,
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 240,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "29e80d4aedc1f440",
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
        "x": 1220,
        "y": 200,
        "wires": [
            [
                "cf17531467a4deac"
            ]
        ]
    },
    {
        "id": "cf17531467a4deac",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1490,
        "y": 300,
        "wires": []
    },
    {
        "id": "b0cda8060aaa7657",
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
        "y": 120,
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_20_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 160,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "1be7ec4480d12eb3",
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
        "x": 1220,
        "y": 120,
        "wires": [
            [
                "97bf77017daafa51"
            ]
        ]
    },
    {
        "id": "dce770fa7b7c16e0",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 20",
        "info": "",
        "x": 800,
        "y": 100,
        "wires": []
    },
    {
        "id": "1af29a29df894a07",
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
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
        "z": "0f3e4c474bfcb955",
        "mydb": "53be5aa8ed2973e2",
        "name": "",
        "x": 1920,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "5fa44f048d6cc68e",
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
        "y": 140,
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
        "y": 140,
        "wires": [
            [
                "5fa44f048d6cc68e"
            ]
        ]
    },
    {
        "id": "73d15a5b7c99f9c1",
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
        "y": 260,
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
        "y": 380,
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
        "y": 140,
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
        "y": 180,
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
        "y": 220,
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
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1490,
        "y": 460,
        "wires": []
    },
    {
        "id": "c4561ba8a7cc764e",
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
        "y": 420,
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 480,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "1fd85765648dd49b",
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
        "x": 1220,
        "y": 440,
        "wires": [
            [
                "bdc10db5890e5a50"
            ]
        ]
    },
    {
        "id": "bdc10db5890e5a50",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1490,
        "y": 520,
        "wires": []
    },
    {
        "id": "4b3601a9d07ead4c",
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
        "y": 360,
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_16_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 400,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "c357dcf853d0e440",
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
        "x": 1220,
        "y": 360,
        "wires": [
            [
                "f4586177719d1c9d"
            ]
        ]
    },
    {
        "id": "34e1f60739e1cb6d",
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
        "y": 460,
        "wires": [
            [
                "d6473fa2fd41a06e"
            ]
        ]
    },
    {
        "id": "d6473fa2fd41a06e",
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
        "x": 1230,
        "y": 520,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "68f689af20a90304",
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
        "y": 380,
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
        "y": 420,
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
        "y": 460,
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
        "z": "0f3e4c474bfcb955",
        "name": "panel 16",
        "info": "",
        "x": 800,
        "y": 340,
        "wires": []
    },
    {
        "id": "6516c7805ce6ee80",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1490,
        "y": 700,
        "wires": []
    },
    {
        "id": "95c2b05454f6e9c8",
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
        "y": 660,
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 720,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "7c23eade39b0ab9f",
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
        "x": 1220,
        "y": 680,
        "wires": [
            [
                "50f8a43f3dcea614"
            ]
        ]
    },
    {
        "id": "50f8a43f3dcea614",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1490,
        "y": 740,
        "wires": []
    },
    {
        "id": "0d8dd4c2861010bb",
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
        "y": 600,
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
        "z": "0f3e4c474bfcb955",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_17_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 640,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "40200cb7290c69c8",
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
        "x": 1220,
        "y": 600,
        "wires": [
            [
                "6516c7805ce6ee80"
            ]
        ]
    },
    {
        "id": "581bb2676358eaf7",
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
        "y": 700,
        "wires": [
            [
                "92190b4e655fac73"
            ]
        ]
    },
    {
        "id": "92190b4e655fac73",
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
        "x": 1230,
        "y": 760,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "02d6308dc9d7743f",
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
        "x": 810,
        "y": 620,
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
        "x": 810,
        "y": 660,
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
        "x": 810,
        "y": 700,
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
        "z": "0f3e4c474bfcb955",
        "name": "panel 17",
        "info": "",
        "x": 800,
        "y": 580,
        "wires": []
    },
    {
        "id": "35e8cc4c0a481c3a",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 20",
        "info": "",
        "x": 400,
        "y": 100,
        "wires": []
    },
    {
        "id": "301eae535bb945ec",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 16",
        "info": "",
        "x": 400,
        "y": 220,
        "wires": []
    },
    {
        "id": "247b688708ffcc2e",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 17",
        "info": "",
        "x": 400,
        "y": 340,
        "wires": []
    },
    {
        "id": "e867ccb4c09bc5a8",
        "type": "serial out",
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1530,
        "y": 1040,
        "wires": []
    },
    {
        "id": "a3c7133bf001465e",
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
        "x": 1180,
        "y": 1040,
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
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1530,
        "y": 940,
        "wires": []
    },
    {
        "id": "12d62c591dfa95b5",
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
        "x": 1180,
        "y": 940,
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
        "z": "0f3e4c474bfcb955",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1530,
        "y": 840,
        "wires": []
    },
    {
        "id": "4be41e1a91abe96f",
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
        "x": 1190,
        "y": 840,
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
        "y": 1080,
        "wires": [
            [
                "4065d67e3f64fcb6"
            ]
        ]
    },
    {
        "id": "d6917bb71e642b79",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 19",
        "info": "",
        "x": 410,
        "y": 840,
        "wires": []
    },
    {
        "id": "9e953bae3beb8c09",
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
        "y": 980,
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
        "z": "0f3e4c474bfcb955",
        "name": "panel 21",
        "info": "",
        "x": 400,
        "y": 940,
        "wires": []
    },
    {
        "id": "92acdae3fb44cf36",
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
        "x": 390,
        "y": 880,
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
        "z": "0f3e4c474bfcb955",
        "name": "panel 24",
        "info": "",
        "x": 400,
        "y": 1040,
        "wires": []
    },
    {
        "id": "51a47aa0d70c7d9e",
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
        "x": 1490,
        "y": 1200,
        "wires": [
            [
                "ad17e5b720842728"
            ]
        ]
    },
    {
        "id": "ad17e5b720842728",
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
        "x": 1660,
        "y": 1200,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "4065d67e3f64fcb6",
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
        "x": 840,
        "y": 1080,
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
        "x": 670,
        "y": 1060,
        "wires": [
            [
                "4065d67e3f64fcb6"
            ]
        ]
    },
    {
        "id": "4534606db1a4169a",
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
        "x": 1020,
        "y": 1080,
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
        "z": "0f3e4c474bfcb955",
        "name": "toDatabase_tb_com24",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_24 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1200,
        "y": 1080,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "c3815fd88231cc8c",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 24",
        "info": "",
        "x": 840,
        "y": 1040,
        "wires": []
    },
    {
        "id": "0f479b082ad0f3ec",
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
        "x": 840,
        "y": 980,
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
        "x": 670,
        "y": 960,
        "wires": [
            [
                "0f479b082ad0f3ec"
            ]
        ]
    },
    {
        "id": "dab04702e15d5cef",
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
        "x": 1020,
        "y": 980,
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
        "z": "0f3e4c474bfcb955",
        "name": "toDatabase_tb_com21",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_21 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1200,
        "y": 980,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "d7b646c2a7e44842",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 21",
        "info": "",
        "x": 840,
        "y": 940,
        "wires": []
    },
    {
        "id": "026f0e333d334121",
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
        "x": 840,
        "y": 880,
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
        "x": 670,
        "y": 860,
        "wires": [
            [
                "026f0e333d334121"
            ]
        ]
    },
    {
        "id": "59e8437e1cca0b9b",
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
        "x": 1020,
        "y": 880,
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
        "z": "0f3e4c474bfcb955",
        "name": "toDatabase_tb_com19",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_19 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1200,
        "y": 880,
        "wires": [
            [
                "e1e2d43ed0ba2e88"
            ]
        ]
    },
    {
        "id": "a8c3056936b025a7",
        "type": "comment",
        "z": "0f3e4c474bfcb955",
        "name": "panel 19",
        "info": "",
        "x": 850,
        "y": 840,
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
        "id": "73649d97f341e361",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-node-mysql": "3.0.0",
            "node-red-contrib-modbus": "5.45.2"
        }
    }
]
