[
    {
        "id": "38ef358c70008079",
        "type": "link in",
        "z": "61319394518d8dc6",
        "name": "link in 3",
        "links": [
            "03c659c6a1802bfe"
        ],
        "x": 145,
        "y": 160,
        "wires": [
            [
                "ae8827bfd1d58ea3",
                "ab1b01659a037b92"
            ]
        ]
    },
    {
        "id": "ae8827bfd1d58ea3",
        "type": "debug",
        "z": "61319394518d8dc6",
        "name": "debug 11",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 300,
        "y": 60,
        "wires": []
    },
    {
        "id": "ab1b01659a037b92",
        "type": "string",
        "z": "61319394518d8dc6",
        "name": "energy",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 290,
        "y": 160,
        "wires": [
            [
                "b3b13b7d1d66044f",
                "5e284b1825caca94",
                "9a3b36fa90c33126",
                "7cf27cc00dc02d07",
                "64acbe5082d0552a",
                "2baf5da39daca3fc",
                "32d5b2dbce8b1225",
                "779cf016467ce5e3",
                "0720c54b997aaf62",
                "c5e3ed2c640fcdf1",
                "f896dfbff1afb40d",
                "1aebc64ecd2d8cc5",
                "c34f0416386cdf18",
                "824d971699158be8",
                "55ab6c25174babd4",
                "ec80917c3e53763b",
                "4a45e51320d39abe",
                "bcf3da1e368ddcf0",
                "bff35527e7004c84",
                "028a3da2328a2e9b",
                "6f43c62b6d2055d7",
                "74d34640c1d9ab33",
                "3a45e5b9804b136b",
                "c7aad7bb6c97ff67",
                "94f5e0a85434744c",
                "81bf7235ea84e11d",
                "b32f84b5f1110b8f",
                "bddc5d369a7e4219",
                "36d6d5d5633573c5",
                "e996509c1cccc25f",
                "8987788849ca7df1",
                "c42305ecb9bef645",
                "3df29542d3c55689",
                "0fe3fafb3d0dfb2a",
                "492f5d23918dcf3a",
                "de99edc4eda88e33",
                "5b8eedd60f72e83a",
                "f2ea9a8518f5ea1c",
                "d570eaa16acb2fd2",
                "6f72fda80484c52c",
                "524e707522888a02",
                "77d5f78e9aa2c39b",
                "2e79e7d06ba1f2f6",
                "4b4469260705b73a",
                "0ddb12bc4fe1bbe3",
                "4a7f37f67be95e8f",
                "51333956dbc0a20f",
                "1378ee51db06b5bb",
                "3b4c28347fea538a",
                "7e5ea9a2b4077a3b",
                "42bdcd01c3f5c56a",
                "69a87931ebb0015c",
                "4766cca34dba30f0",
                "6a1407a0547050f6",
                "89341fbc9fe69077",
                "45d3463f89425aee",
                "3e7798c41c7aacb8",
                "231ddb5545ade101",
                "4f56a10321df29bb"
            ]
        ]
    },
    {
        "id": "b3b13b7d1d66044f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_ah_p20",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_20\" && pm === \"DA_30\") {\n\n    msg.payload = [panel, data_utama];\n\n    msg.topic = \"INSERT INTO tb_comp_20 (panel, wh) VALUES (?, ?)\";\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 400,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "5e284b1825caca94",
        "type": "debug",
        "z": "61319394518d8dc6",
        "name": "debug 12",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 560,
        "y": 60,
        "wires": []
    },
    {
        "id": "33daddf60ad40d2e",
        "type": "mysql",
        "z": "61319394518d8dc6",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 1680,
        "y": 1060,
        "wires": [
            []
        ]
    },
    {
        "id": "9a3b36fa90c33126",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_panel_16_ap",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_16\" && pm === \"DA_30\") {\n\n    msg.payload = [panel, data_utama];\n\n    msg.topic = \"INSERT INTO tb_kub_panel_16_ap (panel, data_wh) VALUES (?, ?)\";\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 160,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "7cf27cc00dc02d07",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_panel_17_ap",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_17\" && pm === \"DA_30\") {\n\n    msg.payload = [panel, data_utama];\n\n    msg.topic = \"INSERT INTO tb_kub_panel_17_ap (panel, data_wh) VALUES (?, ?)\";\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 200,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "64acbe5082d0552a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_panel_20",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_20\" && pm === \"DA_01\") {\n\n    msg.payload = [panel, data_utama];\n\n    msg.topic = \"INSERT INTO tb_comp_20 (panel, wh) VALUES (?, ?)\";\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 240,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "2baf5da39daca3fc",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_panel_17",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_17\" && pm === \"DA_01\") {\n    msg.payload = [panel, data_utama];\n    msg.topic = \"INSERT INTO tb_kub_panel_17_wh (panel, wh) VALUES (?, ?)\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 280,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "32d5b2dbce8b1225",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_panel_16",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_16\" && pm === \"DA_01\") {\n\n    msg.payload = [panel, data_utama];\n\n    msg.topic = \"INSERT INTO tb_kub_panel_16_wh (panel, wh) VALUES (?, ?)\";\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 320,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "779cf016467ce5e3",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 600,
        "wires": [
            [
                "1e0c3404057eba26",
                "c1623fcb83967974"
            ]
        ]
    },
    {
        "id": "0720c54b997aaf62",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_ap",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_ap\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 720,
        "wires": [
            [
                "4cbec14bdd856767",
                "c094adec4c0c036c"
            ]
        ]
    },
    {
        "id": "c5e3ed2c640fcdf1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_apr",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 760,
        "wires": [
            [
                "c7efcaa2a0700f43",
                "2f9194ea36eff9df"
            ]
        ]
    },
    {
        "id": "f896dfbff1afb40d",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_pk",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_pk\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 800,
        "wires": [
            [
                "f03854a02ff36a64",
                "69223a4808e9f349"
            ]
        ]
    },
    {
        "id": "1aebc64ecd2d8cc5",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_freq",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 840,
        "wires": [
            [
                "39bbf712790910fd",
                "8273c421a4c7a6f0"
            ]
        ]
    },
    {
        "id": "c34f0416386cdf18",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_kub",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 120,
        "wires": [
            [
                "d8408abc8cbff786"
            ]
        ]
    },
    {
        "id": "d8408abc8cbff786",
        "type": "debug",
        "z": "61319394518d8dc6",
        "name": "debug 19",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 820,
        "y": 60,
        "wires": []
    },
    {
        "id": "4cbec14bdd856767",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian: panel, total, a, b, c)\nif (parts.length < 5) {\n    node.warn(\"Data tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'panel_kubikal1';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\n// 6. Buat Query SQL (tanpa reserved)\nvar tableName = \"tb_kub_active_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, active_power_total, active_power_a, active_power_b, active_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    total,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 760,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "39bbf712790910fd",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 frequency",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 2 bagian: panel, freq)\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_frequency\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, data_freq) \";\nsql += \"VALUES (?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    dataFreq\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 880,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "c7efcaa2a0700f43",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalApparent = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_apparent_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalApparent,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 800,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "f03854a02ff36a64",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_power_factor\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, power_factor_total, power_factor_a, power_factor_b, power_factor_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    pfTotal,\n    pfA,\n    pfB,\n    pfC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 840,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "824d971699158be8",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 880,
        "wires": [
            [
                "c945bac94ab2ab8c",
                "48ac7cb097d530ee"
            ]
        ]
    },
    {
        "id": "c945bac94ab2ab8c",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalReactive = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_reactive_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalReactive,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 920,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "be0e0370a16b14df",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ll",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AB, 3=BC, 4=CA\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_voltage_ll\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAB,\n    voltageBC,\n    voltageCA\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 680,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "1e0c3404057eba26",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 current",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 6 bagian)\n// Index: 0=Panel, 1=Avg, 2=A, 3=B, 4=C, 5=N\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA   = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB   = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC   = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN   = parts[5] ? parseFloat(parts[5]) : 0.000;\n\n// 6. Buat Query SQL\n// Tabel: tb_kub_current\n// Kolom: panel, current_avg, current_a, current_b, current_c, current_n\nvar tableName = \"tb_kub_current\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, current_avg, current_a, current_b, current_c, current_n) \";\nsql += \"VALUES (?, ?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (Prepared Statement)\nmsg.payload = [\n    panelName,\n    currentAvg,\n    currentA,\n    currentB,\n    currentC,\n    currentN\n];\n\n// 8. Simpan query\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 640,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "55ab6c25174babd4",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 640,
        "wires": [
            [
                "be0e0370a16b14df",
                "db4bf79263442ee1"
            ]
        ]
    },
    {
        "id": "ec80917c3e53763b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 680,
        "wires": [
            [
                "35d8e26711c57d0e",
                "de26c71bdbf301e2"
            ]
        ]
    },
    {
        "id": "35d8e26711c57d0e",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AN, 3=BN, 4=CN\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_voltage_ln\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAN,\n    voltageBN,\n    voltageCN\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 720,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "4a45e51320d39abe",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub64_breakdown_current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 1000,
        "wires": [
            [
                "96b6a71ce90d1523",
                "9148cc31b0482284"
            ]
        ]
    },
    {
        "id": "028a3da2328a2e9b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_ap",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_ap\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1120,
        "wires": [
            [
                "123f7083cfda4a96",
                "a6b0eb35c52b037a"
            ]
        ]
    },
    {
        "id": "6f43c62b6d2055d7",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_apr",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 1160,
        "wires": [
            [
                "89bf4fe7b74200ab",
                "a8be705946ab84cc"
            ]
        ]
    },
    {
        "id": "74d34640c1d9ab33",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_pk",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_pk\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1200,
        "wires": [
            [
                "c8cf725a94fcc694",
                "300d7b309e0c1ee1"
            ]
        ]
    },
    {
        "id": "3a45e5b9804b136b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_freq",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 1240,
        "wires": [
            [
                "bbd80c8fe8c770c4",
                "200ac9b946f1d817"
            ]
        ]
    },
    {
        "id": "c7aad7bb6c97ff67",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 1280,
        "wires": [
            [
                "16bef143da357c69",
                "dae5b60a95d94278"
            ]
        ]
    },
    {
        "id": "bcf3da1e368ddcf0",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub64_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 1040,
        "wires": [
            [
                "55ba111c1ffcf602",
                "69c59690fbd24736"
            ]
        ]
    },
    {
        "id": "bff35527e7004c84",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub64_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 1080,
        "wires": [
            [
                "7d9f0a9396f6b858",
                "065d4c610b72943b"
            ]
        ]
    },
    {
        "id": "94f5e0a85434744c",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 1380,
        "wires": [
            [
                "6d833cd8a6b66937",
                "e333074ee7a7ec64"
            ]
        ]
    },
    {
        "id": "bddc5d369a7e4219",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_ap",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_ap\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1500,
        "wires": [
            [
                "c80f33eefb211ca9",
                "6a13ea0e8663227f"
            ]
        ]
    },
    {
        "id": "36d6d5d5633573c5",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_apr",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 1540,
        "wires": [
            [
                "7fbfe2479f2b8c3f",
                "aa327439c50adaf8"
            ]
        ]
    },
    {
        "id": "e996509c1cccc25f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_pk",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_pk\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1580,
        "wires": [
            [
                "780a792dce79bce1",
                "b20553b144616cc4"
            ]
        ]
    },
    {
        "id": "8987788849ca7df1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_freq",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 1620,
        "wires": [
            [
                "0c9b16c283ac3cc4",
                "fb302c058ca87dbf"
            ]
        ]
    },
    {
        "id": "c42305ecb9bef645",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 1660,
        "wires": [
            [
                "44fedfd119dc2a2a",
                "701717368fa13208"
            ]
        ]
    },
    {
        "id": "81bf7235ea84e11d",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub63_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 1420,
        "wires": [
            [
                "24a0692a0fc30487",
                "654c2ab2ced158a2"
            ]
        ]
    },
    {
        "id": "b32f84b5f1110b8f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_breakdown_voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub63_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 1460,
        "wires": [
            [
                "d9c85b0b6ff2e43a",
                "c58a257e01a517f9"
            ]
        ]
    },
    {
        "id": "96b6a71ce90d1523",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 current",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 6 bagian)\n// Index: 0=Panel, 1=Avg, 2=A, 3=B, 4=C, 5=N\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_current\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, current_avg, current_a, current_b, current_c, current_n) \";\nsql += \"VALUES (?, ?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    currentAvg,\n    currentA,\n    currentB,\n    currentC,\n    currentN\n];\n\n// 8. Simpan query di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
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
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "123f7083cfda4a96",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 active power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian: panel, total, a, b, c)\nif (parts.length < 5) {\n    node.warn(\"Data tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'panel_kubikal1';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\n// 6. Buat Query SQL (tanpa reserved)\nvar tableName = \"tb_kub2_64_active_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, active_power_total, active_power_a, active_power_b, active_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    total,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1140,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "bbd80c8fe8c770c4",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 frequency",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 2 bagian: panel, freq)\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_frequency\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, data_freq) \";\nsql += \"VALUES (?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    dataFreq\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1260,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "89bf4fe7b74200ab",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 apperant power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalApparent = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_apparent_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalApparent,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1180,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "c8cf725a94fcc694",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 power factor",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_power_factor\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, power_factor_total, power_factor_a, power_factor_b, power_factor_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    pfTotal,\n    pfA,\n    pfB,\n    pfC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1220,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "16bef143da357c69",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 reactive power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalReactive = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_reactive_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalReactive,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1300,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "55ba111c1ffcf602",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 voltage ll",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AB, 3=BC, 4=CA\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_voltage_ll\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAB,\n    voltageBC,\n    voltageCA\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1060,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "7d9f0a9396f6b858",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 voltage ln",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AN, 3=BN, 4=CN\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_voltage_ln\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAN,\n    voltageBN,\n    voltageCN\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1100,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "6d833cd8a6b66937",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 current",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 6 bagian)\n// Index: 0=Panel, 1=Avg, 2=A, 3=B, 4=C, 5=N\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_current\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, current_avg, current_a, current_b, current_c, current_n) \";\nsql += \"VALUES (?, ?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    currentAvg,\n    currentA,\n    currentB,\n    currentC,\n    currentN\n];\n\n// 8. Simpan query di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1400,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "c80f33eefb211ca9",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 active power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian: panel, total, a, b, c)\nif (parts.length < 5) {\n    node.warn(\"Data tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'panel_kubikal1';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\n// 6. Buat Query SQL (tanpa reserved)\nvar tableName = \"tb_kub2_63_active_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, active_power_total, active_power_a, active_power_b, active_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    total,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1520,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "0c9b16c283ac3cc4",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 frequency",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 2 bagian: panel, freq)\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_frequency\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, data_freq) \";\nsql += \"VALUES (?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    dataFreq\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1640,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "7fbfe2479f2b8c3f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 apperant power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalApparent = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_apparent_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalApparent,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1560,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "780a792dce79bce1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 power factor",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_power_factor\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, power_factor_total, power_factor_a, power_factor_b, power_factor_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    pfTotal,\n    pfA,\n    pfB,\n    pfC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1600,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "44fedfd119dc2a2a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 reactive power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalReactive = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_reactive_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalReactive,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1680,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "24a0692a0fc30487",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 voltage ll",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AB, 3=BC, 4=CA\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_voltage_ll\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAB,\n    voltageBC,\n    voltageCA\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1440,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "d9c85b0b6ff2e43a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 2 voltage ln",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AN, 3=BN, 4=CN\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_voltage_ln\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAN,\n    voltageBN,\n    voltageCN\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1480,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "3df29542d3c55689",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_ah_p24",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet data_wh = Number(data[1]);\n\nif (isNaN(data_wh)) {\n    return null;\n}\n\nif (panel === \"panel_24\") {\n\n    msg.topic = \"INSERT INTO tb_comp_24 (panel, wh) VALUES (?, ?)\";\n    msg.payload = [panel, data_wh];\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 480,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "492f5d23918dcf3a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_ah_p19",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet data_wh = Number(data[1]);\n\n\nif (isNaN(data_wh)) {\n    return null;\n}\n\nif (panel === \"panel_19\") {\n\n    msg.topic = \"INSERT INTO tb_comp_19 (panel, wh) VALUES (?, ?)\";\n    msg.payload = [panel, data_wh];\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 360,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "0fe3fafb3d0dfb2a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "wh_ah_p21",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet data_wh = Number(data[1]);\n\nif (isNaN(data_wh)) {\n    return null;\n}\n\nif (panel === \"panel_21\") {\n\n    msg.topic = \"INSERT INTO tb_comp_21 (panel, wh) VALUES (?, ?)\";\n    msg.payload = [panel, data_wh];\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 440,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "c1623fcb83967974",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 current update",
        "func": "var raw = msg.payload;\n\n// Konversi ke string\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// Bersihkan karakter khusus\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\n// INSERT ... ON DUPLICATE KEY UPDATE\nvar sql = `\nINSERT INTO ${tableName} \n(id, panel, date_time, current_avg, current_a, current_b, current_c, current_n)\nVALUES (1, ?, NOW(), ?, ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    current_avg = VALUES(current_avg),\n    current_a = VALUES(current_a),\n    current_b = VALUES(current_b),\n    current_c = VALUES(current_c),\n    current_n = VALUES(current_n)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, currentAvg, currentA, currentB, currentC, currentN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 640,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "30d97cce961fa12b",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "kubikal 1",
        "info": "",
        "x": 560,
        "y": 560,
        "wires": []
    },
    {
        "id": "699d7a2b0c1bc46c",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "panel 64",
        "info": "",
        "x": 560,
        "y": 960,
        "wires": []
    },
    {
        "id": "928cb31ff578cd68",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "panel 63",
        "info": "",
        "x": 560,
        "y": 1340,
        "wires": []
    },
    {
        "id": "db4bf79263442ee1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ll update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ll_avg = VALUES(voltage_ll_avg),\n    voltage_ab = VALUES(voltage_ab),\n    voltage_bc = VALUES(voltage_bc),\n    voltage_ca = VALUES(voltage_ca)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAB, voltageBC, voltageCA];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 680,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "48ac7cb097d530ee",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    reactive_power_total = VALUES(reactive_power_total),\n    reactive_power_a = VALUES(reactive_power_a),\n    reactive_power_b = VALUES(reactive_power_b),\n    reactive_power_c = VALUES(reactive_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 920,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "8273c421a4c7a6f0",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 frequency update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, data_freq)\nVALUES (1, ?, NOW(), ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    data_freq = VALUES(data_freq)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, dataFreq];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1260,
        "y": 880,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "69223a4808e9f349",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, power_factor_total, power_factor_a, power_factor_b, power_factor_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    power_factor_total = VALUES(power_factor_total),\n    power_factor_a = VALUES(power_factor_a),\n    power_factor_b = VALUES(power_factor_b),\n    power_factor_c = VALUES(power_factor_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, pfTotal, pfA, pfB, pfC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 840,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "2f9194ea36eff9df",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    apparent_power_total = VALUES(apparent_power_total),\n    apparent_power_a = VALUES(apparent_power_a),\n    apparent_power_b = VALUES(apparent_power_b),\n    apparent_power_c = VALUES(apparent_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 800,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "c094adec4c0c036c",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data active power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, active_power_total, active_power_a, active_power_b, active_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    active_power_total = VALUES(active_power_total),\n    active_power_a = VALUES(active_power_a),\n    active_power_b = VALUES(active_power_b),\n    active_power_c = VALUES(active_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 760,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "de26c71bdbf301e2",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ln_avg = VALUES(voltage_ln_avg),\n    voltage_an = VALUES(voltage_an),\n    voltage_bn = VALUES(voltage_bn),\n    voltage_cn = VALUES(voltage_cn)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAN, voltageBN, voltageCN];\n\nreturn msg;",
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
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "9148cc31b0482284",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 current update",
        "func": "var raw = msg.payload;\n\n// Konversi ke string\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// Bersihkan karakter khusus\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\n// INSERT ... ON DUPLICATE KEY UPDATE\nvar sql = `\nINSERT INTO ${tableName} \n(id, panel, date_time, current_avg, current_a, current_b, current_c, current_n)\nVALUES (1, ?, NOW(), ?, ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    current_avg = VALUES(current_avg),\n    current_a = VALUES(current_a),\n    current_b = VALUES(current_b),\n    current_c = VALUES(current_c),\n    current_n = VALUES(current_n)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, currentAvg, currentA, currentB, currentC, currentN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1000,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "69c59690fbd24736",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ll update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ll_avg = VALUES(voltage_ll_avg),\n    voltage_ab = VALUES(voltage_ab),\n    voltage_bc = VALUES(voltage_bc),\n    voltage_ca = VALUES(voltage_ca)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAB, voltageBC, voltageCA];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1040,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "dae5b60a95d94278",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    reactive_power_total = VALUES(reactive_power_total),\n    reactive_power_a = VALUES(reactive_power_a),\n    reactive_power_b = VALUES(reactive_power_b),\n    reactive_power_c = VALUES(reactive_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1280,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "200ac9b946f1d817",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 frequency update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, data_freq)\nVALUES (1, ?, NOW(), ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    data_freq = VALUES(data_freq)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, dataFreq];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1260,
        "y": 1240,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "300d7b309e0c1ee1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, power_factor_total, power_factor_a, power_factor_b, power_factor_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    power_factor_total = VALUES(power_factor_total),\n    power_factor_a = VALUES(power_factor_a),\n    power_factor_b = VALUES(power_factor_b),\n    power_factor_c = VALUES(power_factor_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, pfTotal, pfA, pfB, pfC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 1200,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "a8be705946ab84cc",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    apparent_power_total = VALUES(apparent_power_total),\n    apparent_power_a = VALUES(apparent_power_a),\n    apparent_power_b = VALUES(apparent_power_b),\n    apparent_power_c = VALUES(apparent_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1160,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "a6b0eb35c52b037a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data active power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, active_power_total, active_power_a, active_power_b, active_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    active_power_total = VALUES(active_power_total),\n    active_power_a = VALUES(active_power_a),\n    active_power_b = VALUES(active_power_b),\n    active_power_c = VALUES(active_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 1120,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "065d4c610b72943b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ln_avg = VALUES(voltage_ln_avg),\n    voltage_an = VALUES(voltage_an),\n    voltage_bn = VALUES(voltage_bn),\n    voltage_cn = VALUES(voltage_cn)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAN, voltageBN, voltageCN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 1080,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "e333074ee7a7ec64",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 current update",
        "func": "var raw = msg.payload;\n\n// Konversi ke string\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// Bersihkan karakter khusus\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\n// INSERT ... ON DUPLICATE KEY UPDATE\nvar sql = `\nINSERT INTO ${tableName} \n(id, panel, date_time, current_avg, current_a, current_b, current_c, current_n)\nVALUES (1, ?, NOW(), ?, ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    current_avg = VALUES(current_avg),\n    current_a = VALUES(current_a),\n    current_b = VALUES(current_b),\n    current_c = VALUES(current_c),\n    current_n = VALUES(current_n)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, currentAvg, currentA, currentB, currentC, currentN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1380,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "654c2ab2ced158a2",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ll update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ll_avg = VALUES(voltage_ll_avg),\n    voltage_ab = VALUES(voltage_ab),\n    voltage_bc = VALUES(voltage_bc),\n    voltage_ca = VALUES(voltage_ca)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAB, voltageBC, voltageCA];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1420,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "701717368fa13208",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    reactive_power_total = VALUES(reactive_power_total),\n    reactive_power_a = VALUES(reactive_power_a),\n    reactive_power_b = VALUES(reactive_power_b),\n    reactive_power_c = VALUES(reactive_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1660,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "fb302c058ca87dbf",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 frequency update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, data_freq)\nVALUES (1, ?, NOW(), ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    data_freq = VALUES(data_freq)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, dataFreq];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1260,
        "y": 1620,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "b20553b144616cc4",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, power_factor_total, power_factor_a, power_factor_b, power_factor_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    power_factor_total = VALUES(power_factor_total),\n    power_factor_a = VALUES(power_factor_a),\n    power_factor_b = VALUES(power_factor_b),\n    power_factor_c = VALUES(power_factor_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, pfTotal, pfA, pfB, pfC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 1580,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "aa327439c50adaf8",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    apparent_power_total = VALUES(apparent_power_total),\n    apparent_power_a = VALUES(apparent_power_a),\n    apparent_power_b = VALUES(apparent_power_b),\n    apparent_power_c = VALUES(apparent_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1540,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "6a13ea0e8663227f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data active power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, active_power_total, active_power_a, active_power_b, active_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    active_power_total = VALUES(active_power_total),\n    active_power_a = VALUES(active_power_a),\n    active_power_b = VALUES(active_power_b),\n    active_power_c = VALUES(active_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 1500,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "c58a257e01a517f9",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ln_avg = VALUES(voltage_ln_avg),\n    voltage_an = VALUES(voltage_an),\n    voltage_bn = VALUES(voltage_bn),\n    voltage_cn = VALUES(voltage_cn)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAN, voltageBN, voltageCN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 1460,
        "wires": [
            [
                "33daddf60ad40d2e",
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "de99edc4eda88e33",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"panel_24_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 1820,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "d570eaa16acb2fd2",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "ap",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_24_ap\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 1940,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "3e7798c41c7aacb8",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "apr",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_24_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 1980,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "6f72fda80484c52c",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "pk",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_24_pf\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2020,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "524e707522888a02",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "freq",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_24_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2060,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "77d5f78e9aa2c39b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"panel_24_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2100,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "5b8eedd60f72e83a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_24_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 1860,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "f2ea9a8518f5ea1c",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_24_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 1900,
        "wires": [
            [
                "4283b9e32ae1d382"
            ]
        ]
    },
    {
        "id": "be880c4f57b222a9",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "panel 24",
        "info": "",
        "x": 560,
        "y": 1780,
        "wires": []
    },
    {
        "id": "40d082c89dc4ecf1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_v-lineto-line",
        "func": "// Voltage Line-to-Line dengan pembulatan 3 desimal\nlet panel = \"panel_21_vll\";\nlet fields = [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1840,
        "y": 2080,
        "wires": [
            []
        ]
    },
    {
        "id": "e6fcc12a2329a62d",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_active_power",
        "func": "// Active Power dengan pembulatan 3 desimal\nlet panel =\"panel_21_ap\";\nlet fields = [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 2160,
        "wires": [
            []
        ]
    },
    {
        "id": "d3fa471e3791ed6e",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_reactive_power",
        "func": "// Reactive Power dengan pembulatan 3 desimal\nlet panel =\"panel_21_rp\";\nlet fields = [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 2320,
        "wires": [
            []
        ]
    },
    {
        "id": "bf1e4e1a41d69dcf",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_apparent_power",
        "func": "// Apparent Power dengan pembulatan 3 desimal\nlet panel =\"panel_21_apr\";\nlet fields = [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 2200,
        "wires": [
            []
        ]
    },
    {
        "id": "3bcaf8ef0c652bbe",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_power_factor",
        "func": "// Power Factor dengan pembulatan 3 desimal\nlet panel = \"panel_21_pf\";\nlet fields = [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 2240,
        "wires": [
            []
        ]
    },
    {
        "id": "4443d69f70572327",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_freq",
        "func": "// Frequency dengan pembulatan 3 desimal\nlet panel = \"panel_21_freq\";\nlet fields = [\"frequency_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1820,
        "y": 2280,
        "wires": [
            []
        ]
    },
    {
        "id": "d186f086213ba7a1",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_current",
        "func": "// Current dengan pembulatan 3 desimal\nlet panel = \"panel_21_c\";\nlet fields = [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1830,
        "y": 2040,
        "wires": [
            []
        ]
    },
    {
        "id": "40f8f4574c1f4847",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kub_v-line-to-netral",
        "func": "// Voltage Line-to-Neutral dengan pembulatan 3 desimal\nlet panel =\"panel_21_vln\";\nlet fields = [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1850,
        "y": 2120,
        "wires": [
            []
        ]
    },
    {
        "id": "feff985f656ab173",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_energy_forward",
        "func": "// Forward Energy dengan pembulatan 3 desimal\nlet panel =\"panel_21_en\";\nlet fields = [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 2360,
        "wires": [
            []
        ]
    },
    {
        "id": "f9c447e5403426fc",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_energy_reverse",
        "func": "// Reverse Energy dengan pembulatan 3 desimal\nlet panel = \"panel_21_enr\";\nlet fields = [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1860,
        "y": 2400,
        "wires": [
            []
        ]
    },
    {
        "id": "d5bd5f9067e9bbc0",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "kirim_demand",
        "func": "// Demand dengan pembulatan 3 desimal\nlet panel = \"panel_21_endm\";\nlet fields = [\"present_demand_ext\", \"rising_demand_ext\"];\nlet values = fields.map(f => {\n    let val = msg.payload[f];\n    if (val === undefined || val === null) return \"\";\n    let num = Number(val);\n    return isNaN(num) ? \"\" : num.toFixed(3);\n});\nmsg.payload = \"*\" + panel + \",\" + values.join(\",\") + \",#\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1840,
        "y": 2440,
        "wires": [
            []
        ]
    },
    {
        "id": "f249b0d0b5235bb3",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "aktualnya_salah",
        "info": "",
        "x": 300,
        "y": 1960,
        "wires": []
    },
    {
        "id": "4283b9e32ae1d382",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "update_db",
        "func": "// Mapping kode panel ke kolom database (sesuaikan dengan kode yang digunakan)\nconst mapping = {\n    \"panel_24_c\": [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"],\n    \"panel_24_vll\": [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"],\n    \"panel_24_vln\": [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"],\n    \"panel_24_ap\": [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"],\n    \"panel_24_apr\": [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"],\n    \"panel_24_pf\": [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"],\n    \"panel_24_freq\": [\"frequency_ext\"],\n    \"panel_24_rp\": [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"],\n    \"panel_24_en\": [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"],\n    \"panel_24_enr\": [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"],\n    \"panel_24_endm\": [\"present_demand_ext\", \"rising_demand_ext\"]\n};\n\n// Ambil payload (sudah berupa array hasil parsing)\nlet parts = msg.payload;\nif (!Array.isArray(parts) || parts.length < 2) {\n    node.warn(\"Payload bukan array atau terlalu pendek\");\n    return null;\n}\n\nlet code = parts[0];                 // contoh: \"panel_24_vll\"\n// Nilai berada di antara index 1 sampai sebelum elemen terakhir (biasanya \"#\" atau \"\")\nlet values = parts.slice(1, -1);\nlet columns = mapping[code];\nif (!columns) {\n    node.warn(\"Kode panel tidak dikenal: \" + code);\n    return null;\n}\nif (values.length !== columns.length) {\n    node.error(\"Jumlah nilai tidak sesuai untuk \" + code + \". Diharapkan: \" + columns.length + \", diterima: \" + values.length);\n    return null;\n}\n\n// Ambil data yang sudah tersimpan di context (gunakan context global agar semua node bisa akses)\nlet data = context.global.get(\"energy_data\") || {};\n\n// Update data dengan nilai baru\nfor (let i = 0; i < columns.length; i++) {\n    let val = values[i];\n    if (val === \"\") {\n        data[columns[i]] = null;\n    } else {\n        let num = Number(val);\n        data[columns[i]] = isNaN(num) ? null : num;\n    }\n}\n\n// Tambahkan timestamp saat ini (format MySQL datetime)\nlet now = new Date();\ndata.timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Simpan kembali ke context global\ncontext.global.set(\"energy_data\", data);\n\n// Bangun query UPDATE dinamis berdasarkan kolom yang ada di data\nlet setClause = [];\nlet params = [];\nfor (let key in data) {\n    if (key === \"id\") continue; // id tidak diubah\n    setClause.push(key + \" = ?\");\n    params.push(data[key]);\n}\n\nif (setClause.length === 0) {\n    return null; // tidak ada data yang diupdate\n}\n\n// Query untuk mengupdate baris dengan id = 1 (pastikan baris ini sudah ada)\nlet query = \"UPDATE tb_realtime_comp_24 SET \" + setClause.join(\", \") + \" WHERE id = 1\";\n\n// Sesuaikan dengan node MySQL yang digunakan:\n// Jika menggunakan node \"mysql\" (node-red-node-mysql) dengan query di msg.topic:\nmsg.topic = query;\nmsg.payload = params;\n\n// Jika menggunakan node MySQL lain yang memerlukan format berbeda, sesuaikan di sini.\n// Misal jika menggunakan node \"MySQL\" dengan properti query di msg.query:\n// msg.query = query;\n// msg.params = params;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 1820,
        "wires": [
            [
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "2e79e7d06ba1f2f6",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"panel_21_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2220,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "4a7f37f67be95e8f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "ap",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_21_ap\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2340,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "231ddb5545ade101",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "apr",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_21_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2380,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "51333956dbc0a20f",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "pk",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_21_pf\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2420,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "1378ee51db06b5bb",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "freq",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_21_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2460,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "3b4c28347fea538a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"panel_21_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2500,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "4b4469260705b73a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_21_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2260,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "0ddb12bc4fe1bbe3",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_21_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 2300,
        "wires": [
            [
                "767695e88daff68b"
            ]
        ]
    },
    {
        "id": "f5cb5c81642e63f2",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "panel 21",
        "info": "",
        "x": 560,
        "y": 2180,
        "wires": []
    },
    {
        "id": "df2784d28dfb1105",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "aktualnya_salah",
        "info": "",
        "x": 300,
        "y": 2380,
        "wires": []
    },
    {
        "id": "767695e88daff68b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "update_db",
        "func": "// Mapping kode panel ke kolom database (sesuaikan dengan kode yang digunakan)\nconst mapping = {\n    \"panel_21_c\": [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"],\n    \"panel_21_vll\": [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"],\n    \"panel_21_vln\": [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"],\n    \"panel_21_ap\": [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"],\n    \"panel_21_apr\": [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"],\n    \"panel_21_pf\": [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"],\n    \"panel_21_freq\": [\"frequency_ext\"],\n    \"panel_21_rp\": [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"],\n    \"panel_21_en\": [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"],\n    \"panel_21_enr\": [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"],\n    \"panel_21_endm\": [\"present_demand_ext\", \"rising_demand_ext\"]\n};\n\n// Ambil payload (sudah berupa array hasil parsing)\nlet parts = msg.payload;\nif (!Array.isArray(parts) || parts.length < 2) {\n    node.warn(\"Payload bukan array atau terlalu pendek\");\n    return null;\n}\n\nlet code = parts[0];                 // contoh: \"panel_24_vll\"\n// Nilai berada di antara index 1 sampai sebelum elemen terakhir (biasanya \"#\" atau \"\")\nlet values = parts.slice(1, -1);\nlet columns = mapping[code];\nif (!columns) {\n    node.warn(\"Kode panel tidak dikenal: \" + code);\n    return null;\n}\nif (values.length !== columns.length) {\n    node.error(\"Jumlah nilai tidak sesuai untuk \" + code + \". Diharapkan: \" + columns.length + \", diterima: \" + values.length);\n    return null;\n}\n\n// Ambil data yang sudah tersimpan di context (gunakan context global agar semua node bisa akses)\nlet data = context.global.get(\"energy_data\") || {};\n\n// Update data dengan nilai baru\nfor (let i = 0; i < columns.length; i++) {\n    let val = values[i];\n    if (val === \"\") {\n        data[columns[i]] = null;\n    } else {\n        let num = Number(val);\n        data[columns[i]] = isNaN(num) ? null : num;\n    }\n}\n\n// Tambahkan timestamp saat ini (format MySQL datetime)\nlet now = new Date();\ndata.timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Simpan kembali ke context global\ncontext.global.set(\"energy_data\", data);\n\n// Bangun query UPDATE dinamis berdasarkan kolom yang ada di data\nlet setClause = [];\nlet params = [];\nfor (let key in data) {\n    if (key === \"id\") continue; // id tidak diubah\n    setClause.push(key + \" = ?\");\n    params.push(data[key]);\n}\n\nif (setClause.length === 0) {\n    return null; // tidak ada data yang diupdate\n}\n\n// Query untuk mengupdate baris dengan id = 1 (pastikan baris ini sudah ada)\nlet query = \"UPDATE tb_realtime_comp_21 SET \" + setClause.join(\", \") + \" WHERE id = 1\";\n\n// Sesuaikan dengan node MySQL yang digunakan:\n// Jika menggunakan node \"mysql\" (node-red-node-mysql) dengan query di msg.topic:\nmsg.topic = query;\nmsg.payload = params;\n\n// Jika menggunakan node MySQL lain yang memerlukan format berbeda, sesuaikan di sini.\n// Misal jika menggunakan node \"MySQL\" dengan properti query di msg.query:\n// msg.query = query;\n// msg.params = params;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 2220,
        "wires": [
            [
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "7e5ea9a2b4077a3b",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"panel_19_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2620,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "4766cca34dba30f0",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "ap",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_19_ap\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2740,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "4f56a10321df29bb",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "apr",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_19_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2780,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "6a1407a0547050f6",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "pk",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_19_pf\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2820,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "89341fbc9fe69077",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "freq",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_19_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 2860,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "45d3463f89425aee",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"panel_19_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2900,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "42bdcd01c3f5c56a",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_19_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 2660,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "69a87931ebb0015c",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"panel_19_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 2700,
        "wires": [
            [
                "8a01106eceb24b26"
            ]
        ]
    },
    {
        "id": "6b8747656c30c3dd",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "panel 19",
        "info": "",
        "x": 560,
        "y": 2580,
        "wires": []
    },
    {
        "id": "13711e26da800e6a",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "aktualnya_salah",
        "info": "",
        "x": 320,
        "y": 2780,
        "wires": []
    },
    {
        "id": "8a01106eceb24b26",
        "type": "function",
        "z": "61319394518d8dc6",
        "name": "update_db",
        "func": "// Mapping kode panel ke kolom database (sesuaikan dengan kode yang digunakan)\nconst mapping = {\n    \"panel_19_c\": [\"current_avg_ext\", \"current_a_ext\", \"current_b_ext\", \"current_c_ext\"],\n    \"panel_19_vll\": [\"voltage_ab_ext\", \"voltage_bc_ext\", \"voltage_ca_ext\"],\n    \"panel_19_vln\": [\"voltage_an_ext\", \"voltage_bn_ext\", \"voltage_cn_ext\"],\n    \"panel_19_ap\": [\"active_power_a_ext\", \"active_power_b_ext\", \"active_power_c_ext\"],\n    \"panel_19_apr\": [\"apparent_power_a_ext\", \"apparent_power_b_ext\", \"apparent_power_c_ext\"],\n    \"panel_19_pf\": [\"power_factor_a_ext\", \"power_factor_b_ext\", \"power_factor_c_ext\"],\n    \"panel_19_freq\": [\"frequency_ext\"],\n    \"panel_19_rp\": [\"reactive_power_a_ext\", \"reactive_power_b_ext\", \"reactive_power_c_ext\"],\n    \"panel_19_en\": [\"fwdVAh_ext\", \"fwdWh_ext\", \"fwdVARh_ind_ext\", \"fwdVARh_cap_ext\"],\n    \"panel_19_enr\": [\"revVAh_ext\", \"revWh_ext\", \"revVARh_ind_ext\", \"revVARh_cap_ext\"],\n    \"panel_19_endm\": [\"present_demand_ext\", \"rising_demand_ext\"]\n};\n\n// Ambil payload (sudah berupa array hasil parsing)\nlet parts = msg.payload;\nif (!Array.isArray(parts) || parts.length < 2) {\n    node.warn(\"Payload bukan array atau terlalu pendek\");\n    return null;\n}\n\nlet code = parts[0];                 // contoh: \"panel_24_vll\"\n// Nilai berada di antara index 1 sampai sebelum elemen terakhir (biasanya \"#\" atau \"\")\nlet values = parts.slice(1, -1);\nlet columns = mapping[code];\nif (!columns) {\n    node.warn(\"Kode panel tidak dikenal: \" + code);\n    return null;\n}\nif (values.length !== columns.length) {\n    node.error(\"Jumlah nilai tidak sesuai untuk \" + code + \". Diharapkan: \" + columns.length + \", diterima: \" + values.length);\n    return null;\n}\n\n// Ambil data yang sudah tersimpan di context (gunakan context global agar semua node bisa akses)\nlet data = context.global.get(\"energy_data\") || {};\n\n// Update data dengan nilai baru\nfor (let i = 0; i < columns.length; i++) {\n    let val = values[i];\n    if (val === \"\") {\n        data[columns[i]] = null;\n    } else {\n        let num = Number(val);\n        data[columns[i]] = isNaN(num) ? null : num;\n    }\n}\n\n// Tambahkan timestamp saat ini (format MySQL datetime)\nlet now = new Date();\ndata.timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Simpan kembali ke context global\ncontext.global.set(\"energy_data\", data);\n\n// Bangun query UPDATE dinamis berdasarkan kolom yang ada di data\nlet setClause = [];\nlet params = [];\nfor (let key in data) {\n    if (key === \"id\") continue; // id tidak diubah\n    setClause.push(key + \" = ?\");\n    params.push(data[key]);\n}\n\nif (setClause.length === 0) {\n    return null; // tidak ada data yang diupdate\n}\n\n// Query untuk mengupdate baris dengan id = 1 (pastikan baris ini sudah ada)\nlet query = \"UPDATE tb_realtime_comp_19 SET \" + setClause.join(\", \") + \" WHERE id = 1\";\n\n// Sesuaikan dengan node MySQL yang digunakan:\n// Jika menggunakan node \"mysql\" (node-red-node-mysql) dengan query di msg.topic:\nmsg.topic = query;\nmsg.payload = params;\n\n// Jika menggunakan node MySQL lain yang memerlukan format berbeda, sesuaikan di sini.\n// Misal jika menggunakan node \"MySQL\" dengan properti query di msg.query:\n// msg.query = query;\n// msg.params = params;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 2620,
        "wires": [
            [
                "2b87d0c519926eca"
            ]
        ]
    },
    {
        "id": "2b87d0c519926eca",
        "type": "debug",
        "z": "61319394518d8dc6",
        "name": "debug 16",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1610,
        "y": 1200,
        "wires": []
    },
    {
        "id": "629d39cdf2f5fc10",
        "type": "comment",
        "z": "61319394518d8dc6",
        "name": "erro data dari tanggal 16 - 22",
        "info": "",
        "x": 360,
        "y": 400,
        "wires": []
    },
    {
        "id": "d424f9339e4dc662",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_master",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "d24187efbcc6a1ec",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-node-mysql": "3.0.0"
        }
    }
]
