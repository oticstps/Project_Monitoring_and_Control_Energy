[
    {
        "id": "7b8095c90c55916a",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "kubikal",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 390,
        "y": 110,
        "wires": []
    },
    {
        "id": "6f1de2f6a3d3dc0d",
        "type": "serial in",
        "z": "47d2b4a4dc264f89",
        "name": "",
        "serial": "674edb4b1e8b9a61",
        "x": 210,
        "y": 350,
        "wires": [
            [
                "9ae2886c0c878c13",
                "0acb5e5f27c50821",
                "5a5bca9f3573b2a0",
                "52df2163c13a93ab",
                "6c7e8c91cbf386c3",
                "e111e87629627ef7",
                "42b061d50f2a02c8"
            ]
        ]
    },
    {
        "id": "18c3fa8ac4b9e32e",
        "type": "serial in",
        "z": "47d2b4a4dc264f89",
        "name": "",
        "serial": "e92e61eae1e14eaf",
        "x": 210,
        "y": 210,
        "wires": [
            [
                "5b96de550ddd7396",
                "07e19edba38baf0f"
            ]
        ]
    },
    {
        "id": "beae902c3622a2e4",
        "type": "serial in",
        "z": "47d2b4a4dc264f89",
        "name": "",
        "serial": "f695bcbe22e5714e",
        "x": 210,
        "y": 280,
        "wires": [
            [
                "aeab6bce68b3832b",
                "d1b21fd2c73a8dde"
            ]
        ]
    },
    {
        "id": "9ae2886c0c878c13",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "energy",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 380,
        "y": 320,
        "wires": []
    },
    {
        "id": "5b96de550ddd7396",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "montiv",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 380,
        "y": 180,
        "wires": []
    },
    {
        "id": "aeab6bce68b3832b",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "hikitori",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 380,
        "y": 250,
        "wires": []
    },
    {
        "id": "7e97c488d30d809a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
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
                "0246993a2fcc24a6",
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "d1b21fd2c73a8dde",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "y": 280,
        "wires": [
            [
                "7e97c488d30d809a"
            ]
        ]
    },
    {
        "id": "0246993a2fcc24a6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "17131828547a382d",
        "name": "",
        "x": 3030,
        "y": 590,
        "wires": [
            []
        ]
    },
    {
        "id": "679fd9a453493b09",
        "type": "serial in",
        "z": "47d2b4a4dc264f89",
        "name": "",
        "serial": "ef172e1b698087f2",
        "x": 210,
        "y": 140,
        "wires": [
            [
                "7b8095c90c55916a",
                "9d5832746d55cd38",
                "2e4da660f643ec5b"
            ]
        ]
    },
    {
        "id": "d1da2786940c392f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
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
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "417a1f7484aaf57a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 170,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "9d5832746d55cd38",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "kubikal",
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
        "x": 390,
        "y": 140,
        "wires": [
            [
                "d1da2786940c392f",
                "417a1f7484aaf57a"
            ]
        ]
    },
    {
        "id": "0cbc1ec7e757788e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.1\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 210,
        "wires": [
            [
                "0246993a2fcc24a6",
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "07e19edba38baf0f",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "y": 210,
        "wires": [
            [
                "0cbc1ec7e757788e"
            ]
        ]
    },
    {
        "id": "e465eefe64f9fbed",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "w eng all pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 380,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "818c53a1807cd358",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
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
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "0e97ed47b7467be2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 470,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "2388c5c46ab3be74",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 410,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "77afb545e31b4794",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 530,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "25ab21a0c418f558",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 500,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "0acb5e5f27c50821",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "x": 380,
        "y": 350,
        "wires": [
            [
                "77487d257889d927",
                "e465eefe64f9fbed",
                "04eeca61eb518799",
                "2388c5c46ab3be74",
                "818c53a1807cd358",
                "0e97ed47b7467be2",
                "25ab21a0c418f558",
                "77afb545e31b4794",
                "ed1e72f27b03b254",
                "6dcd2b2a79d6d7cd",
                "7162165d4ef04272"
            ]
        ]
    },
    {
        "id": "77487d257889d927",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 310,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "0aa4963d6db5a452",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "x": 750,
        "y": 560,
        "wires": [
            [
                "77487d257889d927"
            ]
        ]
    },
    {
        "id": "04eeca61eb518799",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 560,
        "wires": [
            [
                "0aa4963d6db5a452"
            ]
        ]
    },
    {
        "id": "ed1e72f27b03b254",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 560,
        "y": 330,
        "wires": []
    },
    {
        "id": "2e4da660f643ec5b",
        "type": "link out",
        "z": "47d2b4a4dc264f89",
        "name": "link out 1",
        "mode": "link",
        "links": [
            "1941dab08946d7b6"
        ],
        "x": 345,
        "y": 60,
        "wires": []
    },
    {
        "id": "6dcd2b2a79d6d7cd",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Kub2 wh total panel 64",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_64\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel64 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 590,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "7162165d4ef04272",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Kub2 wh total panel 63",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_63\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel63 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 620,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "5a5bca9f3573b2a0",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 570,
        "y": 880,
        "wires": []
    },
    {
        "id": "0ee7c6863c1cc785",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1150,
        "y": 2980,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "e111e87629627ef7",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "x": 600,
        "y": 2700,
        "wires": [
            [
                "0ee7c6863c1cc785",
                "c256a3ad47cc4894",
                "01643b8de6cbb6e8",
                "b712b21aade3e0dd",
                "1c92fb68b36bc603",
                "136a748e9e59fdd2",
                "90321b41af0f2037",
                "ced5377c79cbb580",
                "281c4ddd41073800",
                "816cf31c24d1f3c9",
                "616b4c440f2852b5",
                "7952f85acb3369bf",
                "c50a0038cac9fc4d",
                "74bd8e06fb7f4415",
                "b269074523fed687",
                "a6bfc1a1d290f260",
                "2b90a95d756868f5",
                "a592136c251b5492",
                "34679dd708ece11c",
                "553ddd734c90172a",
                "1af46b73ca53ed00",
                "107ca5ca94420570"
            ]
        ]
    },
    {
        "id": "08a98ee382665ad5",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "x": 1010,
        "y": 2980,
        "wires": [
            [
                "0ee7c6863c1cc785"
            ]
        ]
    },
    {
        "id": "c256a3ad47cc4894",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "w eng all pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 2740,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "8ea87cdfd91ef645",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2700,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "c69eb95ddcad74af",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 2740,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "01643b8de6cbb6e8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 2980,
        "wires": [
            [
                "08a98ee382665ad5"
            ]
        ]
    },
    {
        "id": "1c92fb68b36bc603",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 2820,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "136a748e9e59fdd2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 2860,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "b712b21aade3e0dd",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 2780,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "ced5377c79cbb580",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 2940,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "90321b41af0f2037",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 2900,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "e664027b380feaad",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "73e0a03b3db84d64",
        "name": "",
        "x": 1520,
        "y": 2880,
        "wires": [
            []
        ]
    },
    {
        "id": "281c4ddd41073800",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 2700,
        "wires": [
            []
        ]
    },
    {
        "id": "616b4c440f2852b5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 3020,
        "wires": [
            []
        ]
    },
    {
        "id": "816cf31c24d1f3c9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 3060,
        "wires": [
            []
        ]
    },
    {
        "id": "f4cedf8f8f70536b",
        "type": "comment",
        "z": "47d2b4a4dc264f89",
        "name": "abnormal signal",
        "info": "0,PROGRES,1348,1422,427,942,0,170,NORMAL,0,0,OFF;\n",
        "x": 180,
        "y": 400,
        "wires": []
    },
    {
        "id": "3a6ac27476e7e28a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Kub wh total",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_kubikal (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1220,
        "y": 2660,
        "wires": [
            []
        ]
    },
    {
        "id": "480e50fc5cfb7cb1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Kub Active Power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1240,
        "y": 2620,
        "wires": [
            []
        ]
    },
    {
        "id": "ae50b669abda128e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 1510,
        "y": 1520,
        "wires": [
            []
        ]
    },
    {
        "id": "c50a0038cac9fc4d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm200_chsac (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3440,
        "wires": [
            [
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "7952f85acb3369bf",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsac (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3400,
        "wires": [
            [
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "b269074523fed687",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_sab\" && power_meter === \"pm_200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm200_chsab (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3320,
        "wires": [
            []
        ]
    },
    {
        "id": "74bd8e06fb7f4415",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_saa\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3240,
        "wires": [
            []
        ]
    },
    {
        "id": "2b90a95d756868f5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_saa\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3280,
        "wires": [
            []
        ]
    },
    {
        "id": "a6bfc1a1d290f260",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_sab\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsab (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3360,
        "wires": [
            []
        ]
    },
    {
        "id": "a592136c251b5492",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_a\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_ch_a (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 3200,
        "wires": [
            []
        ]
    },
    {
        "id": "42b061d50f2a02c8",
        "type": "string",
        "z": "47d2b4a4dc264f89",
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
        "x": 700,
        "y": 3540,
        "wires": [
            [
                "296a451aafa88590"
            ]
        ]
    },
    {
        "id": "296a451aafa88590",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Hitung shift (logika tetap sama)\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung variabel waktu lainnya\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Simpan semua data waktu di msg.timeData\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 3540,
        "wires": [
            [
                "a17782cf0e1f6ba3",
                "1543a943fcd7607f"
            ]
        ]
    },
    {
        "id": "6c7e8c91cbf386c3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "parsing_kub",
        "func": "let data = msg.payload;\n\n// Pastikan string\nif (typeof data !== \"string\") {\n    return null;\n}\n\n// Pisahkan berdasarkan '#'\nlet parts = data.split('#');\n\n// Regex format yang diizinkan\nlet pattern = /^\\*kub,DA_\\d+,[\\d.]+,$/;\n\nlet validData = parts\n    .map(p => p.trim())\n    .filter(p => pattern.test(p))\n    .map(p => p + \"#\");\n\n// Jika tidak ada data valid → stop\nif (validData.length === 0) {\n    return null;\n}\n\n// Gabungkan kembali dengan newline\nmsg.payload = validData.join(\"\\n\");\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 2620,
        "wires": [
            [
                "b08e6cd13c442190",
                "18cc049c31c42f9e"
            ]
        ]
    },
    {
        "id": "18cc049c31c42f9e",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1050,
        "y": 2580,
        "wires": []
    },
    {
        "id": "b08e6cd13c442190",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "",
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
                        "value": "10"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 1040,
        "y": 2620,
        "wires": [
            [
                "480e50fc5cfb7cb1",
                "3a6ac27476e7e28a",
                "8ea87cdfd91ef645",
                "c69eb95ddcad74af",
                "87026ac038b2167d"
            ]
        ]
    },
    {
        "id": "87026ac038b2167d",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1210,
        "y": 2580,
        "wires": []
    },
    {
        "id": "34679dd708ece11c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Kub2 wh total panel 64",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_64\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel64 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 3120,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "553ddd734c90172a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Kub2 wh total panel 63",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_63\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel63 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 3160,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "a17782cf0e1f6ba3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO tb_pm220_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 3540,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "1543a943fcd7607f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO tb_pm200_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 3580,
        "wires": [
            [
                "ae50b669abda128e",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "1af46b73ca53ed00",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 2660,
        "wires": []
    },
    {
        "id": "107ca5ca94420570",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD_rep\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 3500,
        "wires": [
            [
                "ae50b669abda128e",
                "bc282444c4b388aa",
                "e3ba32aa40188dcc"
            ]
        ]
    },
    {
        "id": "bc282444c4b388aa",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1050,
        "y": 3500,
        "wires": []
    },
    {
        "id": "e3ba32aa40188dcc",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1490,
        "y": 2840,
        "wires": []
    },
    {
        "id": "52df2163c13a93ab",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "parse_lora_prefix_suffix",
        "func": "\n\n\n// ============================================\n// STRICT LORA PARSER\n// Format yang diterima:\n// prefix,value,suffix\n//\n// Contoh valid:\n// &e%,12345.67,v*p\n// 908,54321.00,$17\n// @yf,136703120.00,~ku\n//\n// Output:\n// msg.payload = [panel, power_meter, value]\n// ============================================\n\n// Ambil data masuk\nvar raw = msg.payload;\n\n// Pastikan string\nif (typeof raw !== \"string\") {\n    raw = String(raw);\n}\n\n// Bersihkan newline, carriage return, spasi pinggir\nraw = raw.replace(/\\r/g, \"\").replace(/\\n/g, \"\").trim();\n\n// 1) Buang jika kosong\nif (!raw || raw.length < 5) {\n    return null;\n}\n\n// 2) Buang semua paket lama yang diawali *\n// contoh: *BS_1..., *kub..., *cr7...\nif (raw.startsWith(\"*\")) {\n    return null;\n}\n\n// 3) Harus tepat 3 bagian: prefix,value,suffix\nvar parts = raw.split(\",\");\nif (parts.length !== 3) {\n    return null;\n}\n\nvar prefix = parts[0].trim();\nvar valueStr = parts[1].trim();\nvar suffix = parts[2].trim();\n\n// 4) Validasi prefix/suffix\nvar panel = \"\";\nvar power_meter = \"\";\n\n// ============================================\n// CHSAA / CHSAB\n// ============================================\n\n\n\n\n// CHSAA\nif (prefix === \"&e%\" && suffix === \"v*p\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"908\" && suffix === \"$17\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_200\";\n}\n// CHSAB\nelse if (prefix === \"w%c\" && suffix === \"8lv\") {\n    panel = \"chsab\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"u57\" && suffix === \"7%u\") {\n    panel = \"chsab\";\n    power_meter = \"pm_220\";\n}\n// CHAB\nelse if (prefix === \"n2z\" && suffix === \"7~i\") {\n    panel = \"chab\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@&d\" && suffix === \"go%\") {\n    panel = \"chab\";\n    power_meter = \"pm_200\";\n}\n// CHCD\nelse if (prefix === \"adj\" && suffix === \"d18\") {\n    panel = \"chcd\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"zgb\" && suffix === \"ehr\") {\n    panel = \"chcd\";\n    power_meter = \"pm_220\";\n}\n// BS1\nelse if (prefix === \"560\" && suffix === \"818\") {\n    panel = \"bs1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s%3\" && suffix === \"gmo\") {\n    panel = \"bs1\";\n    power_meter = \"pm_200\";\n}\n// BS2\nelse if (prefix === \"ulc\" && suffix === \"uca\") {\n    panel = \"bs2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"x61\" && suffix === \"&sn\") {\n    panel = \"bs2\";\n    power_meter = \"pm_200\";\n}\n\n\n\n\n// CHEF\nelse if (prefix === \"duy\" && suffix === \"ogg\") {\n    panel = \"chef\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"^&a\" && suffix === \"32v\") {\n    panel = \"chef\";\n    power_meter = \"pm_200\";\n}\n\n// CC1\nelse if (prefix === \"n97\" && suffix === \"c1x\") {\n    panel = \"cc1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"574\" && suffix === \"yra\") {\n    panel = \"cc1\";\n    power_meter = \"pm_200\";\n}\n\n// CONN\n\nelse if (prefix === \"5&d\" && suffix === \"t1s\") {\n    panel = \"conn\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// RET\nelse if (prefix === \"mgq\" && suffix === \"dp1\") {\n    panel = \"ret\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"p1@\" && suffix === \"!3p\") {\n    panel = \"ret\";\n    power_meter = \"pm_200\";\n}\n\n// RA\nelse if (prefix === \"~g6\" && suffix === \"%?j\") {\n    panel = \"ra\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"ieq\" && suffix === \"nyy\") {\n    panel = \"ra\";\n    power_meter = \"pm_200\";\n}\n// HLA\nelse if (prefix === \"?l@\" && suffix === \"q&j\") {\n    panel = \"hla\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// CHSAC\nelse if (prefix === \"qix\" && suffix === \"n7~\") {\n    panel = \"chsac\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"u%u\" && suffix === \"7~*\") {\n    panel = \"chsac\"; power_meter = \"pm_200\";\n}\n// CC234\nelse if (prefix === \"1t!\" && suffix === \"q%4\") {\n    panel = \"cc234\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"q9m\" && suffix === \"?@&\") {\n    panel = \"cc234\"; power_meter = \"pm_200\";\n}\n\n\n\n\n\n\n\n// ============================================\n// CR1\n// ============================================\nelse if (prefix === \"0i8\" && suffix === \"9gg\") {\n    panel = \"cr1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"hqm\" && suffix === \"40%\") {\n    panel = \"cr1\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR2\n// ============================================\nelse if (prefix === \"0l0\" && suffix === \"caj\") {\n    panel = \"cr2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s@w\" && suffix === \"9$9\") {\n    panel = \"cr2\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR3\n// ============================================\nelse if (prefix === \"@yf\" && suffix === \"~ku\") {\n    panel = \"cr3\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"$@y\" && suffix === \"o?f\") {\n    panel = \"cr3\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR4\n// ============================================\nelse if (prefix === \"w&7\" && suffix === \"zm2\") {\n    panel = \"cr4\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@2h\" && suffix === \"y6h\") {\n    panel = \"cr4\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR5\n// ============================================\nelse if (prefix === \"0*y\" && suffix === \"pru\") {\n    panel = \"cr5\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"8m7\" && suffix === \"cuf\") {\n    panel = \"cr5\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR6\n// ============================================\nelse if (prefix === \"j4c\" && suffix === \"&32\") {\n    panel = \"cr6\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@3x\" && suffix === \"dk?\") {\n    panel = \"cr6\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR7\n// ============================================\nelse if (prefix === \"kgn\" && suffix === \"yyx\") {\n    panel = \"cr7\";\n    power_meter = \"pm_220\";\n}\n// CR7 PM200 masih nonaktif\nelse if (prefix === \"m!4\" && suffix === \"3uq\") {\n    panel = \"cr7\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR8\n// ============================================\nelse if (prefix === \"xs@\" && suffix === \"@dq\") {\n    panel = \"cr8\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"t%~\" && suffix === \"0qx\") {\n    panel = \"cr8\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR9\n// ============================================\nelse if (prefix === \"s*y\" && suffix === \"joe\") {\n    panel = \"cr9\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"i93\" && suffix === \"!jp\") {\n    panel = \"cr9\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR10\n// ============================================\nelse if (prefix === \"%@j\" && suffix === \"0p6\") {\n    panel = \"cr10\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"lwl\" && suffix === \"0&&\") {\n    panel = \"cr10\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR11\n// ============================================\nelse if (prefix === \"bsv\" && suffix === \"x0f\") {\n    panel = \"cr11\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"&*g\" && suffix === \"qm$\") {\n    panel = \"cr11\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR12\n// ============================================\nelse if (prefix === \"w!9\" && suffix === \"z~x\") {\n    panel = \"cr12\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"g8x\" && suffix === \"hv3\") {\n    panel = \"cr12\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// BUKAN DATA YANG TERDAFTAR\n// ============================================\nelse {\n    return null;\n}\n\n// 5) Validasi angka\nvar value = parseFloat(valueStr);\nif (isNaN(value)) {\n    return null;\n}\n\n// 6) Optional: tolak nilai tidak masuk akal\nif (value < 0) {\n    return null;\n}\n\n// 7) Bentuk output\nmsg.raw_payload = raw;\nmsg.payload = [panel, power_meter, value];\n\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 920,
        "wires": [
            [
                "32ed07694e914830",
                "26c4ef4a2a3baa7a"
            ]
        ]
    },
    {
        "id": "32ed07694e914830",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = 'shift_1';\n} else {\n    shift = 'shift_2';\n}\n\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 960,
        "wires": [
            [
                "d7104e394bc0abb4",
                "90749a04d554fa6b",
                "87407012d995a728",
                "7386a5628bb47642",
                "e8c720b94ce85c3e",
                "764764f7e3e859ac",
                "388bf028cc3c49cf",
                "b88db78974b28d07",
                "ac5dc98da434717f",
                "d6873aed463fac89",
                "edc9344158ca8caa",
                "c5dd3b7b9baea9c4",
                "6082e88df94c1e4d",
                "8595dd8175bfeb55",
                "c98ab8e1b72a11ab",
                "313f10a3fdd6e0bf",
                "419bdd5872c244a9",
                "4ce1d16c5446347c",
                "4435cfe809c24238",
                "d9a97fbd07ea235f",
                "08ffee60b0df1d03",
                "c744b21b4a4bf541",
                "04c1b5cfc5d83ee9",
                "8ac6188296f3cc6d",
                "3b96d4178fcc33ce",
                "8e39d5d2eb11fc69",
                "04eaefec137e2510",
                "56d17e63a3373749",
                "61f373411395bfb1",
                "66b512ad96b5b30a",
                "3334727822a2e697",
                "775bb8aca4454c4f",
                "3be3ed01729c98eb",
                "48950343ce413d29",
                "46b03645b6e4097e",
                "f924b9fab8821640",
                "3fe202eb3aaea669",
                "ad3d7bc288ad6082",
                "2d5b08d6873d5fd5",
                "016a32696ba4069b",
                "5d903b6c8cb9b7bc",
                "a456e00b76e487cb",
                "ec95dfd7d6c6f8c3",
                "815f505629af588b",
                "4058abb529831f7a",
                "d58330eb5aaa61a1",
                "db804c74f592e6a7",
                "7243d2026d7ef612",
                "dfdf7a32ee4c3299",
                "5595a20b3cefc054"
            ]
        ]
    },
    {
        "id": "d7104e394bc0abb4",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = Number(msg.payload[2]);\nvar timeData = msg.timeData;\n\n// jika value <= 2617236, hentikan proses\nif (isNaN(value) || value <= 2618836) {\n    return null;\n}\n\nif (panel === 'cr1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 960,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "90749a04d554fa6b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 137635408) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1000,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "87407012d995a728",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1431999) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1040,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "7386a5628bb47642",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 180995968) {\n    return null;\n}\n\n\nif (panel === 'cr2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1080,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "e8c720b94ce85c3e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 4932691) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1120,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "764764f7e3e859ac",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 119948320) {\n    return null;\n}\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1160,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "388bf028cc3c49cf",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1866267) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1200,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "b88db78974b28d07",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 187249536) {\n    return null;\n}\n\n\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1240,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "ac5dc98da434717f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 215125) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1280,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "d6873aed463fac89",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 24521756) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1320,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "edc9344158ca8caa",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1413539) {\n    return null;\n}\n\n\n\nif (panel === 'cr6' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1360,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "c5dd3b7b9baea9c4",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 168393680) {\n    return null;\n}\n\n\nif (panel === 'cr6' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1400,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "6082e88df94c1e4d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1799111) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1440,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "8595dd8175bfeb55",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 48821776) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1480,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "c98ab8e1b72a11ab",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1480644) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1520,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "313f10a3fdd6e0bf",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 218985312) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1560,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "419bdd5872c244a9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 8960692) {\n    return null;\n}\n\n\nif (panel === 'cr9' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1600,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "4ce1d16c5446347c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 238400704) {\n    return null;\n}\n\n\n\nif (panel === 'cr9' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1640,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "4435cfe809c24238",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1108002) {\n    return null;\n}\n\n\n\nif (panel === 'cr10' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1680,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "d9a97fbd07ea235f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204896096) {\n    return null;\n}\n\n\nif (panel === 'cr10' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1720,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "08ffee60b0df1d03",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1775581) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1760,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "c744b21b4a4bf541",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204330432) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1800,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "04c1b5cfc5d83ee9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 2201929) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1840,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "8ac6188296f3cc6d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 214202624) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1880,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "8e39d5d2eb11fc69",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 662234688) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1960,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "3b96d4178fcc33ce",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 15705259) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1920,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "56d17e63a3373749",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 641965696) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 2040,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "04eaefec137e2510",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 32978992) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 2000,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "3334727822a2e697",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575934464) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2120,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "775bb8aca4454c4f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 16987040) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2080,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "61f373411395bfb1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575647040) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2200,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "66b512ad96b5b30a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 7028043) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2160,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "3be3ed01729c98eb",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 693976) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 920,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "48950343ce413d29",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 574627200) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 960,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "46b03645b6e4097e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 25257830) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 1000,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "f924b9fab8821640",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 269224832) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 1040,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "3fe202eb3aaea669",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_hla",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 762710208) {\n    return null;\n}\n\n\nif (panel === 'hla' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_hla (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 880,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "ad3d7bc288ad6082",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 19994708) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 1080,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "2d5b08d6873d5fd5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 186939856) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 1120,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "016a32696ba4069b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_conn",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 372023) {\n    return null;\n}\n\n\nif (panel === 'conn' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_conn (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 840,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "5d903b6c8cb9b7bc",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 4221932) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1280,
        "y": 1160,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "a456e00b76e487cb",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1118355) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1280,
        "y": 1200,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "d58330eb5aaa61a1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 55759820) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2360,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "4058abb529831f7a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 145193) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2320,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "7243d2026d7ef612",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 12854937) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 2440,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "db804c74f592e6a7",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 3290683) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 2400,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "5595a20b3cefc054",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 37681616) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 2520,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "dfdf7a32ee4c3299",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1149384) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 2480,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "ec95dfd7d6c6f8c3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm220_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 17033846) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2240,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "815f505629af588b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "tb_pm200_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 234197856) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 2280,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "4eaa61a71fa1b1b7",
        "type": "comment",
        "z": "47d2b4a4dc264f89",
        "name": "chcd id nya tida umum, id pm220 : 4, pm200 : 3",
        "info": "pass tidak sesuai default",
        "x": 570,
        "y": 2160,
        "wires": []
    },
    {
        "id": "26c4ef4a2a3baa7a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "update_layout_otics_1",
        "func": "// ============================================\n// FUNCTION NODE: build dynamic update query\n// input  : msg.payload = [panel, power_meter, value]\n// contoh : [\"cr1\", \"pm_200\", 12345.67]\n// output : msg.topic, msg.payload -> ke mysql node\n// ============================================\n\nconst TABLE_NAME = \"tb_layout_otics_1\";\n\n// whitelist panel yang memang ada di parser / DB\nconst ALLOWED_PANELS = new Set([\n    \"bs1\", \"bs2\",\n    \"cc1\", \"cc234\",\n    \"chab\", \"chcd\", \"chef\",\n    \"chsaa\", \"chsab\", \"chsac\",\n    \"conn\",\n    \"cr1\", \"cr2\", \"cr3\", \"cr4\", \"cr5\", \"cr6\",\n    \"cr7\", \"cr8\", \"cr9\", \"cr10\", \"cr11\", \"cr12\",\n    \"ct\", \"hla\", \"ra\", \"ret\"\n]);\n\n// whitelist power meter\nconst ALLOWED_METERS = {\n    \"pm_200\": \"pm200\",\n    \"pm_220\": \"pm220\"\n};\n\n// validasi payload\nif (!Array.isArray(msg.payload) || msg.payload.length < 3) {\n    node.warn(\"Payload tidak sesuai format [panel, power_meter, value]\");\n    return null;\n}\n\nlet panel = String(msg.payload[0] || \"\").trim().toLowerCase();\nlet power_meter = String(msg.payload[1] || \"\").trim().toLowerCase();\nlet value = Number(msg.payload[2]);\n\nif (!ALLOWED_PANELS.has(panel)) {\n    node.warn(\"Panel tidak dikenal: \" + panel);\n    return null;\n}\n\nif (!ALLOWED_METERS[power_meter]) {\n    node.warn(\"Power meter tidak dikenal: \" + power_meter);\n    return null;\n}\n\nif (!isFinite(value)) {\n    node.warn(\"Value bukan angka valid: \" + msg.payload[2]);\n    return null;\n}\n\n// bentuk nama kolom otomatis\n// contoh:\n// panel = cr1, power_meter = pm_200 -> tb_pm200_cr1_value\n// panel = cr1, power_meter = pm_220 -> tb_pm220_cr1_value\nconst meterKey = ALLOWED_METERS[power_meter];\nconst columnName = `tb_${meterKey}_${panel}_value`;\n\n// query update baris terakhir\nmsg.topic = `\n    UPDATE ${TABLE_NAME}\n    SET ${columnName} = ?\n    ORDER BY id DESC\n    LIMIT 1\n`;\n\nmsg.payload = [value];\n\n// info tambahan untuk debug\nmsg.columnName = columnName;\nmsg.panel = panel;\nmsg.power_meter = power_meter;\nmsg.value = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 860,
        "wires": [
            [
                "ae50b669abda128e"
            ]
        ]
    },
    {
        "id": "9d7e97d85f543039",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "energy",
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
        "x": 170,
        "y": 880,
        "wires": [
            []
        ]
    },
    {
        "id": "d4752cb7a2709536",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
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
        "x": 1865,
        "y": 910,
        "wires": [
            [
                "284892a3fb3d458d",
                "c39c9bee005f6731",
                "a00874daa4125f80",
                "70a61e102a0d196a",
                "06da177fcb820ec2",
                "cc8891d12823f460",
                "9175301c12fd9cb5",
                "cfef6882e9d97385",
                "2e630fb5e1cb55d0",
                "b49fab9a061e3416",
                "d71cc070e331567f",
                "131de08a84d79dd9"
            ]
        ]
    },
    {
        "id": "4d6c27d444a7358c",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
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
        "x": 1870,
        "y": 1295,
        "wires": [
            [
                "284892a3fb3d458d",
                "131de08a84d79dd9",
                "d71cc070e331567f",
                "b49fab9a061e3416",
                "2e630fb5e1cb55d0",
                "cfef6882e9d97385",
                "9175301c12fd9cb5",
                "cc8891d12823f460",
                "06da177fcb820ec2",
                "70a61e102a0d196a",
                "a00874daa4125f80",
                "c39c9bee005f6731"
            ]
        ]
    },
    {
        "id": "4a87bf9b4ef9d08b",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 2845,
        "y": 1345,
        "wires": []
    },
    {
        "id": "8bda3175350a1306",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_12 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_12\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2660,
        "y": 1295,
        "wires": [
            [
                "4a87bf9b4ef9d08b",
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "284892a3fb3d458d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_12",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_12\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2150,
        "y": 1295,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "8864de92d35c2dc5",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "17131828547a382d",
        "name": "database_tps_core",
        "x": 2395,
        "y": 1085,
        "wires": [
            [
                "135732142dc5e7a2",
                "8bda3175350a1306",
                "1ec1b45c9c2e4328",
                "54b8618a0249b4f1",
                "c18706af128a640b",
                "49ac3c3a403028ad",
                "ed22e7bc749a1ffb",
                "eb95305530566a81",
                "0216841b91f1f70e",
                "d0ef984bba451b42",
                "8f91c5f1705862b8",
                "1718d5886fe73b0f",
                "41de2cb0a7f05fb6"
            ]
        ]
    },
    {
        "id": "135732142dc5e7a2",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "HASIL SELECT",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 2630,
        "y": 865,
        "wires": []
    },
    {
        "id": "c39c9bee005f6731",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_11",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_11\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2150,
        "y": 1260,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "a00874daa4125f80",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_10",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_10\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2150,
        "y": 1225,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "70a61e102a0d196a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_9",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_9\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 1190,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "06da177fcb820ec2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_8",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_8\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 1155,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "cc8891d12823f460",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_7",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_7\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 1120,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "9175301c12fd9cb5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_6",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_6\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 1085,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "cfef6882e9d97385",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_5",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_5\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 1050,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "2e630fb5e1cb55d0",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_4",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_4\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 1015,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "b49fab9a061e3416",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_3",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_3\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 980,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "d71cc070e331567f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_2",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_2\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 945,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "131de08a84d79dd9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_1",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_1\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 910,
        "wires": [
            [
                "8864de92d35c2dc5"
            ]
        ]
    },
    {
        "id": "41de2cb0a7f05fb6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_11 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_11\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2660,
        "y": 1260,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "1718d5886fe73b0f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_10 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_10\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2660,
        "y": 1225,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "8f91c5f1705862b8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_9 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_9\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 1190,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "d0ef984bba451b42",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_8 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_8\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 1155,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "0216841b91f1f70e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_7 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_7\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 1120,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "eb95305530566a81",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_6 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_6\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 1085,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "ed22e7bc749a1ffb",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_5 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_5\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 1050,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "49ac3c3a403028ad",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_4 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_4\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 1015,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "c18706af128a640b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_3 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_3\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 980,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "54b8618a0249b4f1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_2 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_2\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 945,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "1ec1b45c9c2e4328",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HG common_rail_1 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_1\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2650,
        "y": 910,
        "wires": [
            [
                "0246993a2fcc24a6"
            ]
        ]
    },
    {
        "id": "9b0cacad56669624",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
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
        "x": 1850,
        "y": 845,
        "wires": [
            [
                "284892a3fb3d458d"
            ]
        ]
    },
    {
        "id": "674edb4b1e8b9a61",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB3",
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
        "id": "e92e61eae1e14eaf",
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
        "responsetimeout": "10000"
    },
    {
        "id": "f695bcbe22e5714e",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB2",
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
        "id": "17131828547a382d",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_core",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "ef172e1b698087f2",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
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
        "id": "73e0a03b3db84d64",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_core",
        "tz": "",
        "charset": "UTF8"
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
    }
]
