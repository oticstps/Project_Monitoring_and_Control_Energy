[
    {
        "id": "a28a0f9596d8e415",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 870,
        "y": 440,
        "wires": []
    },
    {
        "id": "2e831415d67f0864",
        "type": "mysql",
        "z": "ec4dd6af42d608f8",
        "mydb": "53be5aa8ed2973e2",
        "name": "",
        "x": 900,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "e04578df6d8240a1",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 200,
        "wires": [
            [
                "2d206df8d7966694",
                "6340928a665c6979",
                "7cccaaca5daa3bda",
                "a43c575942182131"
            ]
        ]
    },
    {
        "id": "ab2cbb658eeaaec9",
        "type": "modbus-read",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "topic": "",
        "showStatusActivities": false,
        "logIOActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "rate": "23",
        "rateUnit": "s",
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "server": "9eb2b047431c323a",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "x": 150,
        "y": 200,
        "wires": [
            [
                "e04578df6d8240a1"
            ],
            []
        ]
    },
    {
        "id": "2d206df8d7966694",
        "type": "debug",
        "z": "ec4dd6af42d608f8",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 600,
        "y": 60,
        "wires": []
    },
    {
        "id": "6340928a665c6979",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_kub1_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 260,
        "wires": [
            [
                "d29eda7c9303aef1",
                "2e831415d67f0864"
            ]
        ]
    },
    {
        "id": "d29eda7c9303aef1",
        "type": "debug",
        "z": "ec4dd6af42d608f8",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 860,
        "y": 180,
        "wires": []
    },
    {
        "id": "7cccaaca5daa3bda",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_wh",
        "func": "\nlet data_wh = msg.payload.active_power_total;\nlet data_panel = \"kub\";\nlet data_pm = \"DA_30\";\n\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 220,
        "wires": [
            [
                "07c9c98f1df8ade4",
                "ac6629eb5648b75a"
            ]
        ]
    },
    {
        "id": "07c9c98f1df8ade4",
        "type": "debug",
        "z": "ec4dd6af42d608f8",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 860,
        "y": 140,
        "wires": []
    },
    {
        "id": "ac6629eb5648b75a",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 870,
        "y": 380,
        "wires": []
    },
    {
        "id": "fb549ca16497a830",
        "type": "modbus-read",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "topic": "",
        "showStatusActivities": false,
        "logIOActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "rate": "10",
        "rateUnit": "s",
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "server": "9eb2b047431c323a",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "x": 150,
        "y": 260,
        "wires": [
            [
                "0369c7746bacf130"
            ],
            []
        ]
    },
    {
        "id": "0369c7746bacf130",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 350,
        "y": 240,
        "wires": [
            [
                "2b1fcfd7e2439f71",
                "704368d33fb6a579",
                "68a9a7c4beeae206"
            ]
        ]
    },
    {
        "id": "2b1fcfd7e2439f71",
        "type": "debug",
        "z": "ec4dd6af42d608f8",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 600,
        "y": 100,
        "wires": []
    },
    {
        "id": "704368d33fb6a579",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_kub1_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 340,
        "wires": [
            [
                "2e831415d67f0864"
            ]
        ]
    },
    {
        "id": "68a9a7c4beeae206",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"kub\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 300,
        "wires": [
            [
                "a28a0f9596d8e415",
                "4aaae396c2422efb"
            ]
        ]
    },
    {
        "id": "4aaae396c2422efb",
        "type": "debug",
        "z": "ec4dd6af42d608f8",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 860,
        "y": 220,
        "wires": []
    },
    {
        "id": "0ea22c27c370e9a7",
        "type": "comment",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "info": "tb_kub1_datetime_readings",
        "x": 320,
        "y": 140,
        "wires": []
    },
    {
        "id": "cafa0554c2507ec1",
        "type": "modbus-read",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "topic": "",
        "showStatusActivities": false,
        "logIOActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "rate": "10",
        "rateUnit": "s",
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "server": "9eb2b047431c323a",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "x": 150,
        "y": 320,
        "wires": [
            [
                "34402cb053a872cb"
            ],
            []
        ]
    },
    {
        "id": "34402cb053a872cb",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 350,
        "y": 280,
        "wires": [
            [
                "08110157feee8c9c",
                "e0f7d012559d0a2e"
            ]
        ]
    },
    {
        "id": "08110157feee8c9c",
        "type": "debug",
        "z": "ec4dd6af42d608f8",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 600,
        "y": 140,
        "wires": []
    },
    {
        "id": "e0f7d012559d0a2e",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_kub1_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 380,
        "wires": [
            [
                "2e831415d67f0864"
            ]
        ]
    },
    {
        "id": "6e020689a469a2d4",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 700,
        "wires": []
    },
    {
        "id": "c2767bf09d7e603c",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 780,
        "wires": [
            [
                "a08fcfa930aaa137",
                "c9248d43681b31fc"
            ]
        ]
    },
    {
        "id": "d96a0d20a546fa75",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 940,
        "wires": [
            [
                "1f1499075147b537",
                "cc8cfd09ef15a71c"
            ]
        ]
    },
    {
        "id": "1f1499075147b537",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 1020,
        "wires": [
            [
                "b2a128f05ed4d42a",
                "78a828327ebef31c"
            ]
        ]
    },
    {
        "id": "b2a128f05ed4d42a",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 1100,
        "wires": [
            [
                "0e43f15615a3deb9",
                "be43c7e4fe069c03"
            ]
        ]
    },
    {
        "id": "0e43f15615a3deb9",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 1180,
        "wires": [
            [
                "a575d16639406b5b",
                "f19b9cc55086af25"
            ]
        ]
    },
    {
        "id": "a575d16639406b5b",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 1260,
        "wires": [
            [
                "94c083926ff5a448"
            ]
        ]
    },
    {
        "id": "c9d1931b973eb210",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 780,
        "wires": []
    },
    {
        "id": "44c3ec9d78e86cac",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 940,
        "wires": []
    },
    {
        "id": "4772e84c85c74b29",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 1020,
        "wires": []
    },
    {
        "id": "f3bea2c800fef10c",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 1100,
        "wires": []
    },
    {
        "id": "805dfca6a13861f4",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 1180,
        "wires": []
    },
    {
        "id": "7828282ce628d439",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 1260,
        "wires": []
    },
    {
        "id": "a08fcfa930aaa137",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kub_vln",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    voltage_ln_avg,\n    voltage_an,\n    voltage_bn,\n    voltage_cn\n} = msg.payload;\n\nconst data_panel = \"kub_vln\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(voltage_ln_avg)},` +\n    `${to3(voltage_an)},` +\n    `${to3(voltage_bn)},` +\n    `${to3(voltage_cn)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 780,
        "wires": [
            [
                "c9d1931b973eb210"
            ]
        ]
    },
    {
        "id": "cc8cfd09ef15a71c",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_active_power",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    active_power_total,\n    active_power_a,\n    active_power_b,\n    active_power_c\n} = msg.payload;\n\nconst data_panel = \"kub_ap\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(active_power_total)},` +\n    `${to3(active_power_a)},` +\n    `${to3(active_power_b)},` +\n    `${to3(active_power_c)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 940,
        "wires": [
            [
                "44c3ec9d78e86cac"
            ]
        ]
    },
    {
        "id": "78a828327ebef31c",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_reactive_power",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    reactive_power_total,\n    reactive_power_a,\n    reactive_power_b,\n    reactive_power_c\n} = msg.payload;\n\nconst data_panel = \"kub_rp\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(reactive_power_total)},` +\n    `${to3(reactive_power_a)},` +\n    `${to3(reactive_power_b)},` +\n    `${to3(reactive_power_c)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1020,
        "wires": [
            [
                "4772e84c85c74b29"
            ]
        ]
    },
    {
        "id": "be43c7e4fe069c03",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_apparent_power",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    apparent_power_total,\n    apparent_power_a,\n    apparent_power_b,\n    apparent_power_c\n} = msg.payload;\n\nconst data_panel = \"kub_apr\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(apparent_power_total)},` +\n    `${to3(apparent_power_a)},` +\n    `${to3(apparent_power_b)},` +\n    `${to3(apparent_power_c)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1100,
        "wires": [
            [
                "f3bea2c800fef10c"
            ]
        ]
    },
    {
        "id": "f19b9cc55086af25",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_power_factor",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    power_factor_total,\n    power_factor_a,\n    power_factor_b,\n    power_factor_c\n} = msg.payload;\n\nconst data_panel = \"kub_pk\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(power_factor_total)},` +\n    `${to3(power_factor_a)},` +\n    `${to3(power_factor_b)},` +\n    `${to3(power_factor_c)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 1180,
        "wires": [
            [
                "805dfca6a13861f4"
            ]
        ]
    },
    {
        "id": "94c083926ff5a448",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_freq",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    frequency,\n} = msg.payload;\n\nconst data_panel = \"kub_freq\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(frequency)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1260,
        "wires": [
            [
                "7828282ce628d439"
            ]
        ]
    },
    {
        "id": "8af71bc07f8c2e61",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kirim_wh_current",
        "func": "const to3 = (v) => Number(v).toFixed(3);\n\nconst {\n    current_a,\n    current_b,\n    current_c,\n    current_n,\n    current_avg\n} = msg.payload;\n\nconst data_panel = \"kub_c\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(current_avg)},` +\n    `${to3(current_a)},` +\n    `${to3(current_b)},` +\n    `${to3(current_c)},` +\n    `${to3(current_n)},` +\n    `,#\\n`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 700,
        "wires": [
            [
                "6e020689a469a2d4"
            ]
        ]
    },
    {
        "id": "3c9b9d29ed45c6f8",
        "type": "function",
        "z": "ec4dd6af42d608f8",
        "name": "kub_vll",
        "func": "const to3 = (v) => Number(v).toFixed(3);\nconst {\n    voltage_ll_avg,\n    voltage_ab,\n    voltage_bc,\n    voltage_ca\n} = msg.payload;\n\nconst data_panel = \"kub_vll\";\n\nmsg.payload =\n    `*${data_panel},` +\n    `${to3(voltage_ll_avg)},` +\n    `${to3(voltage_ab)},` +\n    `${to3(voltage_bc)},` +\n    `${to3(voltage_ca)},` +\n    `,#\\n`;\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 860,
        "wires": [
            [
                "2ae1310acadb6058"
            ]
        ]
    },
    {
        "id": "c9248d43681b31fc",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "pauseType": "delay",
        "timeout": "3",
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
        "x": 600,
        "y": 860,
        "wires": [
            [
                "d96a0d20a546fa75",
                "3c9b9d29ed45c6f8"
            ]
        ]
    },
    {
        "id": "2ae1310acadb6058",
        "type": "serial out",
        "z": "ec4dd6af42d608f8",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1070,
        "y": 860,
        "wires": []
    },
    {
        "id": "a43c575942182131",
        "type": "delay",
        "z": "ec4dd6af42d608f8",
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
        "x": 600,
        "y": 720,
        "wires": [
            [
                "8af71bc07f8c2e61",
                "c2767bf09d7e603c"
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
        "id": "9eb2b047431c323a",
        "type": "modbus-client",
        "name": "",
        "clienttype": "tcp",
        "bufferCommands": true,
        "stateLogEnabled": false,
        "queueLogEnabled": false,
        "failureLogEnabled": true,
        "tcpHost": "169.254.0.10",
        "tcpPort": 502,
        "tcpType": "DEFAULT",
        "serialPort": "/dev/ttyUSB",
        "serialType": "RTU-BUFFERD",
        "serialBaudrate": 9600,
        "serialDatabits": 8,
        "serialStopbits": 1,
        "serialParity": "none",
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
        "id": "d789371f35c766ac",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-node-mysql": "3.0.0",
            "node-red-contrib-modbus": "5.45.2"
        }
    }
]
