[
    {
        "id": "f4af58fb7f1554a4",
        "type": "inject",
        "z": "94e0063aead55f6e",
        "name": "Trigger (Setiap 5 Menit)",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "300",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 170,
        "y": 80,
        "wires": [
            [
                "367875f7b7b3d0b3"
            ]
        ]
    },
    {
        "id": "367875f7b7b3d0b3",
        "type": "file in",
        "z": "94e0063aead55f6e",
        "name": "Baca File JSON",
        "filename": "/home/tpsoticsraspi/on/d-surya/media/manifest.json",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 140,
        "y": 120,
        "wires": [
            [
                "5eb0b9a3bc631da6"
            ]
        ]
    },
    {
        "id": "5eb0b9a3bc631da6",
        "type": "json",
        "z": "94e0063aead55f6e",
        "name": "Parse JSON",
        "property": "payload",
        "action": "",
        "pretty": false,
        "x": 130,
        "y": 160,
        "wires": [
            [
                "0d8b4a45b654a2eb"
            ]
        ]
    },
    {
        "id": "0d8b4a45b654a2eb",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "Ambil Data OCR",
        "func": "var areas = msg.payload.areas || [];\nvar allData = {};\n\nareas.forEach(function (area) {\n    if (area.ocr) {\n        // Simpan semua data ke dalam satu objek berdasarkan nama Area\n        allData[area.name] = {\n            value: area.ocr.value,\n            label: area.ocr.label,\n            unit: area.ocr.unit,\n            status: area.ocr.ok\n        };\n    }\n});\n\n// Kembalikan sebagai 1 pesan saja berisi objek lengkap\nmsg.payload = allData;\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 140,
        "y": 200,
        "wires": [
            [
                "1a198a99cba08e6a",
                "0ce923d8b7b5b9bb",
                "d5310a94e47a1a5f",
                "4a51d66a1609d4b4",
                "1e6b59726ff05710",
                "217f31125b5cebe2",
                "93a6e9334c4290af",
                "232040ad7dc9594c",
                "91ba73a9c114a68b",
                "fa3ca67ced05cbf6",
                "fd1465834ce49381",
                "ad5da65f8291b807",
                "4b01ae2e741e7da2",
                "6ab05c60fa99a0e1",
                "6710dc094a1a7018",
                "c522e6411f61fb17"
            ]
        ]
    },
    {
        "id": "1a198a99cba08e6a",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "Lihat Hasil (Clean)",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 410,
        "y": 40,
        "wires": []
    },
    {
        "id": "0ce923d8b7b5b9bb",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "Lihat Detail (Full)",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 410,
        "y": 80,
        "wires": []
    },
    {
        "id": "fd2ffbb405fb6935",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 800,
        "y": 440,
        "wires": []
    },
    {
        "id": "d5310a94e47a1a5f",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 POWER",
        "func": "\nmsg.payload = msg.payload.Area1;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 250,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "4a51d66a1609d4b4",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Phase-1",
        "func": "\nmsg.payload = msg.payload.Area2;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 280,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "1e6b59726ff05710",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 PV ENERGY",
        "func": "\nmsg.payload = msg.payload.Area3;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 310,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "217f31125b5cebe2",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Irradiation",
        "func": "\nmsg.payload = msg.payload.Area4;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 340,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "93a6e9334c4290af",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 PR",
        "func": "\nmsg.payload = msg.payload.Area5;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 390,
        "y": 370,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "232040ad7dc9594c",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 WEATHER FOR CIKARAN",
        "func": "\nmsg.payload = msg.payload.Area6;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 400,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "91ba73a9c114a68b",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 CO2 REDUCED",
        "func": "\nmsg.payload = msg.payload.Area7;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 430,
        "y": 430,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "fa3ca67ced05cbf6",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 STATUS",
        "func": "\nmsg.payload = msg.payload.Area8;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 460,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "fd1465834ce49381",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Last",
        "func": "\nmsg.payload = msg.payload.Area9;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 490,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "ad5da65f8291b807",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Yield today",
        "func": "\nmsg.payload = msg.payload.Area10;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 520,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "4b01ae2e741e7da2",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Supply from grid today",
        "func": "\nmsg.payload = msg.payload.Area11;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 450,
        "y": 550,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "6ab05c60fa99a0e1",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Total yield",
        "func": "\nmsg.payload = msg.payload.Area12;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 580,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "6710dc094a1a7018",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Inverter rated power",
        "func": "\nmsg.payload = msg.payload.Area13;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 450,
        "y": 610,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "c522e6411f61fb17",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "function_insert_mysql",
        "func": "let p = msg.payload || {};\n\n// Ambil data dari masing-masing area\nlet area1 = p.Area1 || {};\nlet area2 = p.Area2 || {};\nlet area3 = p.Area3 || {};\nlet area4 = p.Area4 || {};\nlet area5 = p.Area5 || {};\nlet area6 = p.Area6 || {};\nlet area7 = p.Area7 || {};\n\n// Susun query INSERT\nmsg.topic = `\n    INSERT INTO tb_plts (\n        area1_value, area1_label, area1_unit,\n        area2_value, area2_label, area2_unit,\n        area3_value, area3_label, area3_unit,\n        area4_value, area4_label, area4_unit,\n        area5_value, area5_label, area5_unit,\n        area6_value, area6_label, area6_unit,\n        area7_value, area7_label, area7_unit\n    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n`;\n\n// Payload untuk node mysql\nmsg.payload = [\n    area1.value ?? null,\n    area1.label ?? null,\n    area1.unit ?? null,\n\n    area2.value ?? null,\n    area2.label ?? null,\n    area2.unit ?? null,\n\n    area3.value ?? null,\n    area3.label ?? null,\n    area3.unit ?? null,\n\n    area4.value ?? null,\n    area4.label ?? null,\n    area4.unit ?? null,\n\n    area5.value ?? null,\n    area5.label ?? null,\n    area5.unit ?? null,\n\n    area6.value ?? null,\n    area6.label ?? null,\n    area6.unit ?? null,\n\n    area7.value ?? null,\n    area7.label ?? null,\n    area7.unit ?? null\n];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 200,
        "wires": [
            [
                "24f0d44f61f46d48"
            ]
        ]
    },
    {
        "id": "24f0d44f61f46d48",
        "type": "mysql",
        "z": "94e0063aead55f6e",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 840,
        "y": 400,
        "wires": [
            []
        ]
    },
    {
        "id": "400879055811261a",
        "type": "mqtt in",
        "z": "94e0063aead55f6e",
        "name": "",
        "topic": "plts_p1",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "c6cf201b08d397c0",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 370,
        "y": 140,
        "wires": [
            [
                "a52fc2a7668bb95f"
            ]
        ]
    },
    {
        "id": "a52fc2a7668bb95f",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "function_insert_mysql",
        "func": "let p = msg.payload || {};\n\n// Ambil data dari masing-masing area\nlet area1 = p.Area1 || {};\nlet area2 = p.Area2 || {};\nlet area3 = p.Area3 || {};\nlet area4 = p.Area4 || {};\nlet area5 = p.Area5 || {};\nlet area6 = p.Area6 || {};\nlet area7 = p.Area7 || {};\nlet area8 = p.Area8 || {};\nlet area9 = p.Area9 || {};\n\n// Susun query INSERT\nmsg.topic = `\n    INSERT INTO tb_plts_p1 (\n        power, power_unit,\n        phase_1, phase_1_unit,\n        pv_energy, pv_energy_unit,\n        irradiation, irradiation_unit,\n        pr, pr_unit,\n        weather_for_cikarang, weather_unit,\n        co2_reduced, co2_reduced_unit,\n        status_pv, last_update\n    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n`;\n\n// Payload untuk node mysql\nmsg.payload = [\n    area1.value ?? null,\n    area1.unit ?? null,\n\n    area2.value ?? null,\n    area2.unit ?? null,\n\n    area3.value ?? null,\n    area3.unit ?? null,\n\n    area4.value ?? null,\n    area4.unit ?? null,\n\n    area5.value ?? null,\n    area5.unit ?? null,\n\n    area6.value ?? null,\n    area6.unit ?? null,\n\n    area7.value ?? null,\n    area7.unit ?? null,\n\n    area8.unit ?? area8.value ?? null,   // STATUS = \"PV\"\n    area9.unit ?? area9.value ?? null    // Last\n];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 140,
        "wires": [
            [
                "24f0d44f61f46d48"
            ]
        ]
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
        "id": "c6cf201b08d397c0",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.137.241",
        "port": 1883,
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "c72f22e96d31f9bf",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-mysql": "3.0.0"
        }
    }
]
