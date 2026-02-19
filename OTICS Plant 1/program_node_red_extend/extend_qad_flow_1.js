[
    {
        "id": "473819c182b42540",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.3\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 205,
        "wires": [
            [
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "16ba0954368201e7",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 775,
        "y": 350,
        "wires": [
            [
                "a152431516a4878a"
            ]
        ]
    },
    {
        "id": "49556903850fe0e5",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 9",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 765,
        "y": 380,
        "wires": []
    },
    {
        "id": "aea483507b70446a",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 10",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 765,
        "y": 175,
        "wires": []
    },
    {
        "id": "a3af2c89e81392f6",
        "type": "string",
        "z": "a44b6f959bf4186c",
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
        "x": 510,
        "y": 180,
        "wires": [
            [
                "473819c182b42540",
                "aea483507b70446a"
            ]
        ]
    },
    {
        "id": "58cea9820cc4ac4c",
        "type": "string",
        "z": "a44b6f959bf4186c",
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
        "x": 430,
        "y": 300,
        "wires": [
            [
                "49556903850fe0e5",
                "16ba0954368201e7"
            ]
        ]
    },
    {
        "id": "15e1ea48ba86f8a0",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR1",
        "func": "const line_id = \"1\";\nconst display_name = \"Common Rail 1\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_1\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 480,
        "wires": [
            [
                "27a17e1974864dc5",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "015b1efc3a14747a",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR2",
        "func": "const line_id = \"2\";\nconst display_name = \"Common Rail 2\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_2\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 515,
        "wires": [
            [
                "5f7b2ca8513988d5",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "55b4e50b3964e940",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR3",
        "func": "const line_id = \"3\";\nconst display_name = \"Common Rail 3\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_3\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 550,
        "wires": [
            [
                "4d19670127089dfc",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "09b20127385deed9",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR4",
        "func": "const line_id = \"4\";\nconst display_name = \"Common Rail 4\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_4\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 585,
        "wires": [
            [
                "deddeb1d3652b4f8",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "0c79edefde51fefb",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR5",
        "func": "const line_id = \"5\";\nconst display_name = \"Common Rail 5\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_5\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 620,
        "wires": [
            [
                "f38bdcf15564dd41",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "d66b38bd136c8fe8",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR6",
        "func": "\nconst line_id = \"6\";\nconst display_name = \"Common Rail 6\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_6\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 655,
        "wires": [
            [
                "8fd23a4df6a33a92",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "18e98308725d34aa",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR7",
        "func": "\nconst line_id = \"7\";\nconst display_name = \"Common Rail 7\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_7\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 690,
        "wires": [
            [
                "2cc7048833435eda",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "e24215a9951bc4fe",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR8",
        "func": "\nconst line_id = \"8\";\nconst display_name = \"Common Rail 8\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_8\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 725,
        "wires": [
            [
                "6674016ec1ed2c1f",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "92446e6e457c5b22",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR9",
        "func": "\nconst line_id = \"9\";\nconst display_name = \"Common Rail 9\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_9\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 760,
        "wires": [
            [
                "7f8f5ec6ad91930d",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "4b2951fe4d363da9",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR11",
        "func": "\nconst line_id = \"11\";\nconst display_name = \"Common Rail 11\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_11\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 830,
        "wires": [
            [
                "240cad628b3b71b2",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "7da3b23a93e45c32",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR12",
        "func": "\nconst line_id = \"12\";\nconst display_name = \"Common Rail 12\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_12\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 865,
        "wires": [
            [
                "86f0739d9c832dac",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "dd6dbd6991585e1f",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "CR10",
        "func": "const line_id = \"10\";\nconst display_name = \"Common Rail 10\";\nconst pg = \"PG2.2\";\nconst tableName = \"common_rail_10\";\n\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null;\n}\n\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\nconst query = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${pg}', '${display_name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 795,
        "wires": [
            [
                "61abc5c82c211026",
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "27a17e1974864dc5",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 540,
        "wires": []
    },
    {
        "id": "1b5ad459cdfa3904",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 575,
        "wires": []
    },
    {
        "id": "5f7b2ca8513988d5",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 8",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 610,
        "wires": []
    },
    {
        "id": "4d19670127089dfc",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 11",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 645,
        "wires": []
    },
    {
        "id": "deddeb1d3652b4f8",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 12",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 680,
        "wires": []
    },
    {
        "id": "f38bdcf15564dd41",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 13",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 715,
        "wires": []
    },
    {
        "id": "8fd23a4df6a33a92",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 14",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 750,
        "wires": []
    },
    {
        "id": "2cc7048833435eda",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 15",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 785,
        "wires": []
    },
    {
        "id": "6674016ec1ed2c1f",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 16",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 820,
        "wires": []
    },
    {
        "id": "7f8f5ec6ad91930d",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 17",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1180,
        "y": 400,
        "wires": []
    },
    {
        "id": "61abc5c82c211026",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 18",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 890,
        "wires": []
    },
    {
        "id": "240cad628b3b71b2",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 19",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 925,
        "wires": []
    },
    {
        "id": "86f0739d9c832dac",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 20",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1155,
        "y": 960,
        "wires": []
    },
    {
        "id": "e632150b93a044ec",
        "type": "inject",
        "z": "a44b6f959bf4186c",
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
        "payload": "",
        "payloadType": "date",
        "x": 480,
        "y": 440,
        "wires": [
            [
                "15e1ea48ba86f8a0",
                "015b1efc3a14747a",
                "55b4e50b3964e940",
                "09b20127385deed9",
                "0c79edefde51fefb",
                "d66b38bd136c8fe8",
                "18e98308725d34aa",
                "e24215a9951bc4fe",
                "92446e6e457c5b22",
                "dd6dbd6991585e1f",
                "4b2951fe4d363da9",
                "7da3b23a93e45c32"
            ]
        ]
    },
    {
        "id": "0e75b1bfbb4fa673",
        "type": "mysql",
        "z": "a44b6f959bf4186c",
        "mydb": "dc56ad4eb0f6eef7",
        "name": "",
        "x": 1265,
        "y": 205,
        "wires": [
            []
        ]
    },
    {
        "id": "a152431516a4878a",
        "type": "mysql",
        "z": "a44b6f959bf4186c",
        "mydb": "6e2a71cd13bdf08b",
        "name": "",
        "x": 1255,
        "y": 350,
        "wires": [
            []
        ]
    },
    {
        "id": "esp_in",
        "type": "serial in",
        "z": "a44b6f959bf4186c",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 150,
        "y": 180,
        "wires": [
            [
                "cd1c76eecc6c2a56",
                "a3af2c89e81392f6",
                "58cea9820cc4ac4c",
                "9cf925de47b284d0",
                "c244226eb7e53041",
                "50ff1e2c6a06e75c",
                "a2f801ca7cf368a4",
                "cc2109f2a0e5cf4d"
            ]
        ]
    },
    {
        "id": "cd1c76eecc6c2a56",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 420,
        "y": 80,
        "wires": []
    },
    {
        "id": "9cf925de47b284d0",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "filter_energy_line_all",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
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
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 470,
        "y": 1510,
        "wires": [
            [
                "6ba894da92fc1891",
                "5bd74e6d01521b62",
                "6807d9218ee7fe50"
            ]
        ]
    },
    {
        "id": "c244226eb7e53041",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 21",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 460,
        "y": 1130,
        "wires": []
    },
    {
        "id": "bf298d1ac2576228",
        "type": "mysql",
        "z": "a44b6f959bf4186c",
        "mydb": "1b0b8697b910c046",
        "name": "",
        "x": 1395,
        "y": 1275,
        "wires": [
            []
        ]
    },
    {
        "id": "43cb80befac133b3",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "nais_energy",
        "func": "// Ambil payload\nvar panel = msg.payload[0];       // contoh: \"CR_7\"\nvar powerMeter = msg.payload[1];  // contoh: \"PM-220V\"\nvar value = parseFloat(msg.payload[2]); // konversi nilai ke float\n\n// Validasi input dasar\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\n// Daftar nilai minimal untuk setiap tabel (dalam WH)\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 1330539,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 66648,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\n// Waktu saat ini\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Tentukan shift berdasarkan jam\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung minggu dalam bulan\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n// Cari nama tabel dinamis\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1145,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "50ff1e2c6a06e75c",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
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
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 430,
        "y": 1210,
        "wires": [
            [
                "43cb80befac133b3",
                "8e9591e9ac04b43b",
                "dda67001502150f4",
                "4d40cfdeb69e642f",
                "fc91d72df29a4f02",
                "31c2ed87a2708504",
                "27afe5bf8ffe9e60",
                "f3cb31b75887a624",
                "c6867faeada64637"
            ]
        ]
    },
    {
        "id": "17748ce0e8ec27f5",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
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
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1080,
        "y": 1195,
        "wires": [
            [
                "43cb80befac133b3"
            ]
        ]
    },
    {
        "id": "6ba894da92fc1891",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 22",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 1470,
        "wires": []
    },
    {
        "id": "8e9591e9ac04b43b",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 23",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 635,
        "y": 1110,
        "wires": []
    },
    {
        "id": "dda67001502150f4",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 1120,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "5bd74e6d01521b62",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 935,
        "y": 1490,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "6807d9218ee7fe50",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 925,
        "y": 1520,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "4d40cfdeb69e642f",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 1195,
        "wires": [
            [
                "17748ce0e8ec27f5"
            ]
        ]
    },
    {
        "id": "31c2ed87a2708504",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 1255,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "27afe5bf8ffe9e60",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 1340,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "fc91d72df29a4f02",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 1225,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "c6867faeada64637",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 1400,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "f3cb31b75887a624",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 1370,
        "wires": [
            [
                "bf298d1ac2576228"
            ]
        ]
    },
    {
        "id": "5e77ca598bcef48e",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "PM220_CR1",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1705,
        "wires": [
            []
        ]
    },
    {
        "id": "7e060206c5ac8b2e",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "PM200_CR1",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1735,
        "wires": [
            []
        ]
    },
    {
        "id": "0628d00a474d0c61",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "PM220_CR2",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1775,
        "wires": [
            []
        ]
    },
    {
        "id": "4d0ad08ebc9b8b2a",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "PM200_CR2",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1805,
        "wires": [
            []
        ]
    },
    {
        "id": "3b2b140cd56f3933",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "PM220_CR3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1845,
        "wires": [
            []
        ]
    },
    {
        "id": "d1fb75c8b0fe2927",
        "type": "function",
        "z": "a44b6f959bf4186c",
        "name": "PM200_CR3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1875,
        "wires": [
            []
        ]
    },
    {
        "id": "a2f801ca7cf368a4",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
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
                        "value": "10"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 715,
        "y": 1705,
        "wires": [
            [
                "5e77ca598bcef48e",
                "354b683ca9107d36"
            ]
        ]
    },
    {
        "id": "0da51087d7bd4862",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "",
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 715,
        "y": 1735,
        "wires": [
            [
                "7e060206c5ac8b2e"
            ]
        ]
    },
    {
        "id": "b814e00cdb51ed95",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "",
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 715,
        "y": 1775,
        "wires": [
            [
                "0628d00a474d0c61"
            ]
        ]
    },
    {
        "id": "31265961f08009d6",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "",
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 715,
        "y": 1805,
        "wires": [
            [
                "4d0ad08ebc9b8b2a"
            ]
        ]
    },
    {
        "id": "ca3d48db73fc4653",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "",
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 715,
        "y": 1845,
        "wires": [
            [
                "3b2b140cd56f3933"
            ]
        ]
    },
    {
        "id": "a3c919a43a3866fe",
        "type": "string",
        "z": "a44b6f959bf4186c",
        "name": "",
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 715,
        "y": 1875,
        "wires": [
            [
                "d1fb75c8b0fe2927"
            ]
        ]
    },
    {
        "id": "354b683ca9107d36",
        "type": "debug",
        "z": "a44b6f959bf4186c",
        "name": "debug 24",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 890,
        "y": 1600,
        "wires": []
    },
    {
        "id": "cc2109f2a0e5cf4d",
        "type": "link out",
        "z": "a44b6f959bf4186c",
        "name": "link out 1",
        "mode": "link",
        "links": [
            "8e243cb8e828177c"
        ],
        "x": 645,
        "y": 60,
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
        "id": "d576516d42c16d98",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB1",
        "serialbaud": "115200",
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
        "id": "1b0b8697b910c046",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "054d9d31f4b3eeb1",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-node-mysql": "2.0.0",
            "node-red-node-serialport": "2.0.3"
        }
    }
]
