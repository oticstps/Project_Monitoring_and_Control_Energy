[
    {
        "id": "0e75b1bfbb4fa673",
        "type": "mysql",
        "z": "1f12aa45e4cb28c3",
        "mydb": "dc56ad4eb0f6eef7",
        "name": "",
        "x": 890,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "a152431516a4878a",
        "type": "mysql",
        "z": "1f12aa45e4cb28c3",
        "mydb": "6e2a71cd13bdf08b",
        "name": "",
        "x": 880,
        "y": 420,
        "wires": [
            []
        ]
    },
    {
        "id": "473819c182b42540",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.1\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 605,
        "y": 355,
        "wires": [
            [
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "16ba0954368201e7",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 390,
        "wires": [
            [
                "a152431516a4878a"
            ]
        ]
    },
    {
        "id": "99ba1a3b3adb59e7",
        "type": "debug",
        "z": "1f12aa45e4cb28c3",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 400,
        "y": 140,
        "wires": []
    },
    {
        "id": "49556903850fe0e5",
        "type": "debug",
        "z": "1f12aa45e4cb28c3",
        "name": "debug 9",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 615,
        "y": 290,
        "wires": []
    },
    {
        "id": "aea483507b70446a",
        "type": "debug",
        "z": "1f12aa45e4cb28c3",
        "name": "debug 10",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 615,
        "y": 255,
        "wires": []
    },
    {
        "id": "a3af2c89e81392f6",
        "type": "string",
        "z": "1f12aa45e4cb28c3",
        "name": "montiv",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 380,
        "y": 290,
        "wires": [
            [
                "473819c182b42540",
                "aea483507b70446a",
                "bcf579962c97b908",
                "c23a9e3f09e731e3"
            ]
        ]
    },
    {
        "id": "58cea9820cc4ac4c",
        "type": "string",
        "z": "1f12aa45e4cb28c3",
        "name": "hikitori",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 380,
        "y": 325,
        "wires": [
            [
                "49556903850fe0e5",
                "16ba0954368201e7",
                "0515f61e77e2024c"
            ]
        ]
    },
    {
        "id": "08372b7b1cc0bc84",
        "type": "serial in",
        "z": "1f12aa45e4cb28c3",
        "name": "",
        "serial": "2e997caa1e3410c9",
        "x": 115,
        "y": 180,
        "wires": [
            [
                "a3af2c89e81392f6",
                "99ba1a3b3adb59e7",
                "58cea9820cc4ac4c",
                "8aa62f6faa4ca38e",
                "5c195a8f85fab622"
            ]
        ]
    },
    {
        "id": "bcf579962c97b908",
        "type": "link out",
        "z": "1f12aa45e4cb28c3",
        "name": "link out 1",
        "mode": "link",
        "links": [],
        "x": 575,
        "y": 220,
        "wires": []
    },
    {
        "id": "86950d0111bff610",
        "type": "inject",
        "z": "1f12aa45e4cb28c3",
        "name": "07:10",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 185,
        "y": 540,
        "wires": [
            [
                "function_select_last",
                "0534a7b29ad8d6fe",
                "c5e0063997291602",
                "d0e72451897cb144",
                "61ed2fae4f21fbf3",
                "b50530a9aed6edc7",
                "8c0e80e0e2b5d0cd",
                "4a3bd883b55cdcbc",
                "819da4e5242c8d4c",
                "998d9877ed349e8a",
                "e88c5f3c8d9632af",
                "d88f61f6d1127dac"
            ]
        ]
    },
    {
        "id": "e20e93269fbf37b2",
        "type": "inject",
        "z": "1f12aa45e4cb28c3",
        "name": "19:50",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "50 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 190,
        "y": 925,
        "wires": [
            [
                "function_select_last",
                "d88f61f6d1127dac",
                "e88c5f3c8d9632af",
                "998d9877ed349e8a",
                "819da4e5242c8d4c",
                "4a3bd883b55cdcbc",
                "8c0e80e0e2b5d0cd",
                "b50530a9aed6edc7",
                "61ed2fae4f21fbf3",
                "d0e72451897cb144",
                "c5e0063997291602",
                "0534a7b29ad8d6fe"
            ]
        ]
    },
    {
        "id": "a74a1ea7f13d53cf",
        "type": "debug",
        "z": "1f12aa45e4cb28c3",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1280,
        "y": 980,
        "wires": []
    },
    {
        "id": "a6581ee8d7f3dffa",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_12 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_12\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1095,
        "y": 930,
        "wires": [
            [
                "a74a1ea7f13d53cf",
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "function_select_last",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_12",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_12\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 925,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "mysql_node",
        "type": "mysql",
        "z": "1f12aa45e4cb28c3",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 780,
        "y": 705,
        "wires": [
            [
                "debug_result",
                "a6581ee8d7f3dffa",
                "b8484f5b8da7668f",
                "ec1f24e402dbe650",
                "0cd4331080e4b1a3",
                "40ae061d8f356ca8",
                "6e7b4ed1affc0f65",
                "784168ab152537cb",
                "b5e7874aa705cd60",
                "4f2dbcaafa0cd99c",
                "2be011980b2a2393",
                "d8a9a179af231290",
                "2a510ae19d83fdb7"
            ]
        ]
    },
    {
        "id": "debug_result",
        "type": "debug",
        "z": "1f12aa45e4cb28c3",
        "name": "HASIL SELECT",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1065,
        "y": 500,
        "wires": []
    },
    {
        "id": "0534a7b29ad8d6fe",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_11",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_11\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 890,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "c5e0063997291602",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_10",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_10\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 855,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "d0e72451897cb144",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_9",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_9\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 820,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "61ed2fae4f21fbf3",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_8",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_8\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 785,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "b50530a9aed6edc7",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_7",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_7\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 750,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "8c0e80e0e2b5d0cd",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_6",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_6\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 715,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "4a3bd883b55cdcbc",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_5",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_5\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 680,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "819da4e5242c8d4c",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_4",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_4\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 645,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "998d9877ed349e8a",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_3",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_3\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 610,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "e88c5f3c8d9632af",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_2",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_2\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 575,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "d88f61f6d1127dac",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_1",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_1\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 540,
        "wires": [
            [
                "mysql_node"
            ]
        ]
    },
    {
        "id": "2a510ae19d83fdb7",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_11 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_11\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1095,
        "y": 895,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "d8a9a179af231290",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_10 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_10\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1095,
        "y": 860,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "2be011980b2a2393",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_9 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_9\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 825,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "4f2dbcaafa0cd99c",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_8 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_8\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 790,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "b5e7874aa705cd60",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_7 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_7\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 755,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "784168ab152537cb",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_6 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_6\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 720,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "6e7b4ed1affc0f65",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_5 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_5\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 685,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "40ae061d8f356ca8",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_4 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_4\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 650,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "0cd4331080e4b1a3",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_3 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_3\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 615,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "ec1f24e402dbe650",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_2 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_2\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 580,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "b8484f5b8da7668f",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "HG common_rail_1 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_1\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1085,
        "y": 545,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "1139517a8b29aef9",
        "type": "inject",
        "z": "1f12aa45e4cb28c3",
        "name": "19.50",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "50 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 170,
        "y": 475,
        "wires": [
            [
                "function_select_last"
            ]
        ]
    },
    {
        "id": "8aa62f6faa4ca38e",
        "type": "link out",
        "z": "1f12aa45e4cb28c3",
        "name": "montiv",
        "mode": "link",
        "links": [
            "b724fd700a861fe5"
        ],
        "x": 275,
        "y": 110,
        "wires": []
    },
    {
        "id": "c23a9e3f09e731e3",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.1\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 120,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "0515f61e77e2024c",
        "type": "function",
        "z": "1f12aa45e4cb28c3",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 155,
        "wires": [
            [
                "07b669e43ef354e4"
            ]
        ]
    },
    {
        "id": "07b669e43ef354e4",
        "type": "mysql",
        "z": "1f12aa45e4cb28c3",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 880,
        "y": 120,
        "wires": [
            []
        ]
    },
    {
        "id": "3d346af01f4eaf06",
        "type": "comment",
        "z": "1f12aa45e4cb28c3",
        "name": "migrasi tanggal 10 - 02 - 2026 jam 7.50",
        "info": "",
        "x": 190,
        "y": 60,
        "wires": []
    },
    {
        "id": "5a6cea60edb38e5f",
        "type": "debug",
        "z": "1f12aa45e4cb28c3",
        "name": "debug 15",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1215,
        "y": 300,
        "wires": []
    },
    {
        "id": "5c195a8f85fab622",
        "type": "mqtt out",
        "z": "1f12aa45e4cb28c3",
        "name": "",
        "topic": "montiv_hikitori",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "f0213c0bde6bee50",
        "x": 400,
        "y": 220,
        "wires": []
    },
    {
        "id": "dc56ad4eb0f6eef7",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_produksi",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6e2a71cd13bdf08b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_hikitori",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "2e997caa1e3410c9",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB1",
        "serialbaud": "115200",
        "databits": "8",
        "parity": "none",
        "stopbits": "1",
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": "10000"
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
        "id": "f0213c0bde6bee50",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.1.100",
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
        "id": "e0d7cc6b3681a04c",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-mysql": "3.0.0",
            "node-red-contrib-string": "1.0.0",
            "node-red-node-serialport": "2.0.3"
        }
    }
]
