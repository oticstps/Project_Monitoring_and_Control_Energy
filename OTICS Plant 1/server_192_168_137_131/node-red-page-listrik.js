[
    {
        "id": "5e14721e68ea5e4e",
        "type": "serial in",
        "z": "db5a070f843fb6e9",
        "name": "",
        "serial": "d46f1bcf1e5ff5f1",
        "x": 170,
        "y": 140,
        "wires": [
            [
                "e8823d972ea824ac",
                "f74f8142c9666c6e",
                "03c659c6a1802bfe",
                "f4b93a1725aa06d1",
                "841f710242c71c4f",
                "dcae9d04829cfda0",
                "9bd744819649d54c"
            ]
        ]
    },
    {
        "id": "e8823d972ea824ac",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 360,
        "y": 60,
        "wires": []
    },
    {
        "id": "727ab5d11c973009",
        "type": "mysql",
        "z": "db5a070f843fb6e9",
        "mydb": "c17db8c320f9fd49",
        "name": "",
        "x": 1360,
        "y": 2660,
        "wires": [
            []
        ]
    },
    {
        "id": "99b6bc507e096239",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 2200,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "f74f8142c9666c6e",
        "type": "string",
        "z": "db5a070f843fb6e9",
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
        "x": 450,
        "y": 1920,
        "wires": [
            [
                "99b6bc507e096239",
                "f0c96d55d265dbaa",
                "c80ec7e56f7ace88",
                "9ef37037eb6fdc02",
                "eea855bdbf655aa3",
                "cb6250c666f3c3e1",
                "d92b987232f1ac5a",
                "d2a3600cac8e9b12",
                "d6038662bb48af74",
                "30799df27a06b769",
                "d4437b407aaacfeb",
                "81022e50bdbabd7c",
                "30be8c5ec33f3725",
                "18af0cfa65fccdaa",
                "0ef9feb6adaee1d5",
                "da1926e23fbff80d",
                "e308641d8d6a2c9b",
                "c180a568ed2497c1",
                "6dcd2b2a79d6d7cd",
                "7162165d4ef04272",
                "69ef5e6e2bb7d112",
                "96bd04a055ab35f3"
            ]
        ]
    },
    {
        "id": "887b1b5d3ae82f85",
        "type": "string",
        "z": "db5a070f843fb6e9",
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
        "x": 860,
        "y": 2200,
        "wires": [
            [
                "99b6bc507e096239"
            ]
        ]
    },
    {
        "id": "f0c96d55d265dbaa",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "w eng all pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1960,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "1f031c081e770cde",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1920,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "7112fe091c4f5af8",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1090,
        "y": 1960,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "c80ec7e56f7ace88",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2200,
        "wires": [
            [
                "887b1b5d3ae82f85"
            ]
        ]
    },
    {
        "id": "eea855bdbf655aa3",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 2040,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "cb6250c666f3c3e1",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 2080,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "9ef37037eb6fdc02",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 2000,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "d2a3600cac8e9b12",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 2160,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "d92b987232f1ac5a",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2120,
        "wires": [
            [
                "727ab5d11c973009",
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "a04b9e42d0dd7917",
        "type": "mysql",
        "z": "db5a070f843fb6e9",
        "mydb": "73e0a03b3db84d64",
        "name": "",
        "x": 1370,
        "y": 2100,
        "wires": [
            []
        ]
    },
    {
        "id": "d6038662bb48af74",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1920,
        "wires": [
            []
        ]
    },
    {
        "id": "d4437b407aaacfeb",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 2240,
        "wires": [
            []
        ]
    },
    {
        "id": "30799df27a06b769",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2280,
        "wires": [
            []
        ]
    },
    {
        "id": "77a6c89482d717cb",
        "type": "comment",
        "z": "db5a070f843fb6e9",
        "name": "abnormal signal",
        "info": "0,PROGRES,1348,1422,427,942,0,170,NORMAL,0,0,OFF;\n",
        "x": 160,
        "y": 100,
        "wires": []
    },
    {
        "id": "b52d187a718f6a3e",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "Kub wh total",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_kubikal (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1070,
        "y": 1880,
        "wires": [
            [
                "75cd5d759e503c6d"
            ]
        ]
    },
    {
        "id": "e53efb38cac7d555",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "Kub Active Power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1090,
        "y": 1840,
        "wires": [
            [
                "75cd5d759e503c6d"
            ]
        ]
    },
    {
        "id": "75cd5d759e503c6d",
        "type": "mysql",
        "z": "db5a070f843fb6e9",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 1380,
        "y": 1860,
        "wires": [
            []
        ]
    },
    {
        "id": "03c659c6a1802bfe",
        "type": "link out",
        "z": "db5a070f843fb6e9",
        "name": "energy_listrik",
        "mode": "link",
        "links": [
            "cb5cc321add752ae",
            "38ef358c70008079"
        ],
        "x": 375,
        "y": 100,
        "wires": []
    },
    {
        "id": "51cf8c2e88f7c6ef",
        "type": "mysql",
        "z": "db5a070f843fb6e9",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 1360,
        "y": 740,
        "wires": [
            []
        ]
    },
    {
        "id": "30be8c5ec33f3725",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm200_chsac (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2660,
        "wires": [
            [
                "727ab5d11c973009",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "81022e50bdbabd7c",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsac (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2620,
        "wires": [
            [
                "727ab5d11c973009",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "0ef9feb6adaee1d5",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_sab\" && power_meter === \"pm_200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm200_chsab (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2540,
        "wires": [
            []
        ]
    },
    {
        "id": "18af0cfa65fccdaa",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_saa\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2460,
        "wires": [
            []
        ]
    },
    {
        "id": "e308641d8d6a2c9b",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_saa\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2500,
        "wires": [
            []
        ]
    },
    {
        "id": "da1926e23fbff80d",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_sab\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_chsab (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2580,
        "wires": [
            []
        ]
    },
    {
        "id": "c180a568ed2497c1",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"ch_a\" && power_meter === \"pm_220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pm220_ch_a (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2420,
        "wires": [
            []
        ]
    },
    {
        "id": "f4b93a1725aa06d1",
        "type": "string",
        "z": "db5a070f843fb6e9",
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
        "x": 550,
        "y": 2760,
        "wires": [
            [
                "dd9930439428b3cd"
            ]
        ]
    },
    {
        "id": "dd9930439428b3cd",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Hitung shift (logika tetap sama)\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung variabel waktu lainnya\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Simpan semua data waktu di msg.timeData\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2760,
        "wires": [
            [
                "0a6e2238a08f5fa4",
                "afc5f408330eb4fe"
            ]
        ]
    },
    {
        "id": "841f710242c71c4f",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "parsing_kub",
        "func": "let data = msg.payload;\n\n// Pastikan string\nif (typeof data !== \"string\") {\n    return null;\n}\n\n// Pisahkan berdasarkan '#'\nlet parts = data.split('#');\n\n// Regex format yang diizinkan\nlet pattern = /^\\*kub,DA_\\d+,[\\d.]+,$/;\n\nlet validData = parts\n    .map(p => p.trim())\n    .filter(p => pattern.test(p))\n    .map(p => p + \"#\");\n\n// Jika tidak ada data valid → stop\nif (validData.length === 0) {\n    return null;\n}\n\n// Gabungkan kembali dengan newline\nmsg.payload = validData.join(\"\\n\");\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 1840,
        "wires": [
            [
                "b78b857cab9a7537",
                "a29dc7a8d06a1b6f"
            ]
        ]
    },
    {
        "id": "a29dc7a8d06a1b6f",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 8",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 900,
        "y": 1800,
        "wires": []
    },
    {
        "id": "b78b857cab9a7537",
        "type": "string",
        "z": "db5a070f843fb6e9",
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
        "x": 890,
        "y": 1840,
        "wires": [
            [
                "e53efb38cac7d555",
                "b52d187a718f6a3e",
                "1f031c081e770cde",
                "7112fe091c4f5af8",
                "422fb5d22ecb260d"
            ]
        ]
    },
    {
        "id": "422fb5d22ecb260d",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1060,
        "y": 1800,
        "wires": []
    },
    {
        "id": "6dcd2b2a79d6d7cd",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "Kub2 wh total panel 64",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_64\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel64 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2340,
        "wires": [
            [
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "7162165d4ef04272",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "Kub2 wh total panel 63",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_63\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel63 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2380,
        "wires": [
            [
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "0a6e2238a08f5fa4",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO tb_pm220_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1010,
        "y": 2760,
        "wires": [
            [
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "afc5f408330eb4fe",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO tb_pm200_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1010,
        "y": 2800,
        "wires": [
            [
                "51cf8c2e88f7c6ef",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "69ef5e6e2bb7d112",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 690,
        "y": 1880,
        "wires": []
    },
    {
        "id": "96bd04a055ab35f3",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD_rep\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2720,
        "wires": [
            [
                "51cf8c2e88f7c6ef",
                "727ab5d11c973009",
                "e627d6881150eb09",
                "ee49501d741bfe67"
            ]
        ]
    },
    {
        "id": "e627d6881150eb09",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 13",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 900,
        "y": 2720,
        "wires": []
    },
    {
        "id": "ee49501d741bfe67",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 14",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1340,
        "y": 2060,
        "wires": []
    },
    {
        "id": "dcae9d04829cfda0",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "parse_lora_prefix_suffix",
        "func": "\n\n\n// ============================================\n// STRICT LORA PARSER\n// Format yang diterima:\n// prefix,value,suffix\n//\n// Contoh valid:\n// &e%,12345.67,v*p\n// 908,54321.00,$17\n// @yf,136703120.00,~ku\n//\n// Output:\n// msg.payload = [panel, power_meter, value]\n// ============================================\n\n// Ambil data masuk\nvar raw = msg.payload;\n\n// Pastikan string\nif (typeof raw !== \"string\") {\n    raw = String(raw);\n}\n\n// Bersihkan newline, carriage return, spasi pinggir\nraw = raw.replace(/\\r/g, \"\").replace(/\\n/g, \"\").trim();\n\n// 1) Buang jika kosong\nif (!raw || raw.length < 5) {\n    return null;\n}\n\n// 2) Buang semua paket lama yang diawali *\n// contoh: *BS_1..., *kub..., *cr7...\nif (raw.startsWith(\"*\")) {\n    return null;\n}\n\n// 3) Harus tepat 3 bagian: prefix,value,suffix\nvar parts = raw.split(\",\");\nif (parts.length !== 3) {\n    return null;\n}\n\nvar prefix = parts[0].trim();\nvar valueStr = parts[1].trim();\nvar suffix = parts[2].trim();\n\n// 4) Validasi prefix/suffix\nvar panel = \"\";\nvar power_meter = \"\";\n\n// ============================================\n// CHSAA / CHSAB\n// ============================================\n\n\n\n\n// CHSAA\nif (prefix === \"&e%\" && suffix === \"v*p\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"908\" && suffix === \"$17\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_200\";\n}\n// CHSAB\nelse if (prefix === \"w%c\" && suffix === \"8lv\") {\n    panel = \"chsab\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"u57\" && suffix === \"7%u\") {\n    panel = \"chsab\";\n    power_meter = \"pm_220\";\n}\n// CHAB\nelse if (prefix === \"n2z\" && suffix === \"7~i\") {\n    panel = \"chab\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@&d\" && suffix === \"go%\") {\n    panel = \"chab\";\n    power_meter = \"pm_200\";\n}\n// CHCD\nelse if (prefix === \"adj\" && suffix === \"d18\") {\n    panel = \"chcd\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"zgb\" && suffix === \"ehr\") {\n    panel = \"chcd\";\n    power_meter = \"pm_220\";\n}\n// BS1\nelse if (prefix === \"560\" && suffix === \"818\") {\n    panel = \"bs1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s%3\" && suffix === \"gmo\") {\n    panel = \"bs1\";\n    power_meter = \"pm_200\";\n}\n// BS2\nelse if (prefix === \"ulc\" && suffix === \"uca\") {\n    panel = \"bs2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"x61\" && suffix === \"&sn\") {\n    panel = \"bs2\";\n    power_meter = \"pm_200\";\n}\n\n\n\n\n// CHEF\nelse if (prefix === \"duy\" && suffix === \"ogg\") {\n    panel = \"chef\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"^&a\" && suffix === \"32v\") {\n    panel = \"chef\";\n    power_meter = \"pm_200\";\n}\n\n// CC1\nelse if (prefix === \"n97\" && suffix === \"c1x\") {\n    panel = \"cc1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"574\" && suffix === \"yra\") {\n    panel = \"cc1\";\n    power_meter = \"pm_200\";\n}\n\n// CONN\n\nelse if (prefix === \"5&d\" && suffix === \"t1s\") {\n    panel = \"conn\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// RET\nelse if (prefix === \"mgq\" && suffix === \"dp1\") {\n    panel = \"ret\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"p1@\" && suffix === \"!3p\") {\n    panel = \"ret\";\n    power_meter = \"pm_200\";\n}\n\n// RA\nelse if (prefix === \"~g6\" && suffix === \"%?j\") {\n    panel = \"ra\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"ieq\" && suffix === \"nyy\") {\n    panel = \"ra\";\n    power_meter = \"pm_200\";\n}\n// HLA\nelse if (prefix === \"?l@\" && suffix === \"q&j\") {\n    panel = \"hla\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// CHSAC\nelse if (prefix === \"qix\" && suffix === \"n7~\") {\n    panel = \"chsac\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"u%u\" && suffix === \"7~*\") {\n    panel = \"chsac\"; power_meter = \"pm_200\";\n}\n// CC234\nelse if (prefix === \"1t!\" && suffix === \"q%4\") {\n    panel = \"cc234\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"q9m\" && suffix === \"?@&\") {\n    panel = \"cc234\"; power_meter = \"pm_200\";\n}\n\n\n\n\n\n\n\n// ============================================\n// CR1\n// ============================================\nelse if (prefix === \"0i8\" && suffix === \"9gg\") {\n    panel = \"cr1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"hqm\" && suffix === \"40%\") {\n    panel = \"cr1\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR2\n// ============================================\nelse if (prefix === \"0l0\" && suffix === \"caj\") {\n    panel = \"cr2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s@w\" && suffix === \"9$9\") {\n    panel = \"cr2\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR3\n// ============================================\nelse if (prefix === \"@yf\" && suffix === \"~ku\") {\n    panel = \"cr3\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"$@y\" && suffix === \"o?f\") {\n    panel = \"cr3\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR4\n// ============================================\nelse if (prefix === \"w&7\" && suffix === \"zm2\") {\n    panel = \"cr4\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@2h\" && suffix === \"y6h\") {\n    panel = \"cr4\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR5\n// ============================================\nelse if (prefix === \"0*y\" && suffix === \"pru\") {\n    panel = \"cr5\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"8m7\" && suffix === \"cuf\") {\n    panel = \"cr5\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR6\n// ============================================\nelse if (prefix === \"j4c\" && suffix === \"&32\") {\n    panel = \"cr6\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@3x\" && suffix === \"dk?\") {\n    panel = \"cr6\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR7\n// ============================================\nelse if (prefix === \"kgn\" && suffix === \"yyx\") {\n    panel = \"cr7\";\n    power_meter = \"pm_220\";\n}\n// CR7 PM200 masih nonaktif\nelse if (prefix === \"m!4\" && suffix === \"3uq\") {\n    panel = \"cr7\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR8\n// ============================================\nelse if (prefix === \"xs@\" && suffix === \"@dq\") {\n    panel = \"cr8\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"t%~\" && suffix === \"0qx\") {\n    panel = \"cr8\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR9\n// ============================================\nelse if (prefix === \"s*y\" && suffix === \"joe\") {\n    panel = \"cr9\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"i93\" && suffix === \"!jp\") {\n    panel = \"cr9\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR10\n// ============================================\nelse if (prefix === \"%@j\" && suffix === \"0p6\") {\n    panel = \"cr10\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"lwl\" && suffix === \"0&&\") {\n    panel = \"cr10\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR11\n// ============================================\nelse if (prefix === \"bsv\" && suffix === \"x0f\") {\n    panel = \"cr11\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"&*g\" && suffix === \"qm$\") {\n    panel = \"cr11\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR12\n// ============================================\nelse if (prefix === \"w!9\" && suffix === \"z~x\") {\n    panel = \"cr12\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"g8x\" && suffix === \"hv3\") {\n    panel = \"cr12\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// BUKAN DATA YANG TERDAFTAR\n// ============================================\nelse {\n    return null;\n}\n\n// 5) Validasi angka\nvar value = parseFloat(valueStr);\nif (isNaN(value)) {\n    return null;\n}\n\n// 6) Optional: tolak nilai tidak masuk akal\nif (value < 0) {\n    return null;\n}\n\n// 7) Bentuk output\nmsg.raw_payload = raw;\nmsg.payload = [panel, power_meter, value];\n\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 140,
        "wires": [
            [
                "f63ea3f2ce0bef22",
                "087be8257034ac61",
                "d67f894743a6c081"
            ]
        ]
    },
    {
        "id": "f63ea3f2ce0bef22",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = 'shift_1';\n} else {\n    shift = 'shift_2';\n}\n\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 430,
        "y": 180,
        "wires": [
            [
                "8babd7c6c8e0b980",
                "a679a54b8d1e74dc",
                "40d9539396be755a",
                "9df3c2e9ce9af54b",
                "5a597ea2d7c6f212",
                "d07ae3f5ec9aa3c0",
                "3f5d169342e91e5a",
                "639cd5f68981542f",
                "f1913e8bf924e817",
                "e21c8585b2cf23ef",
                "6d294e8e0a169d2e",
                "dea1ad8ffb260ed9",
                "5d13730fd6c4e23e",
                "de6e38839ae10198",
                "64d46d8504b55d3d",
                "d6321ee317565628",
                "ab6647e23258bf09",
                "ab8dac41b088b6da",
                "546eecb4da90e9ae",
                "8122b389a47e8ab3",
                "6235023fc39493f0",
                "4536735677524c97",
                "8072e5cebeb39fe7",
                "6312012e13a53c31",
                "960f5c8cfa99cae0",
                "4c1f0dd5f6d78248",
                "681fa65d61fb5641",
                "054d0cb56a4d3528",
                "5f5aaed279b9e136",
                "8d8a2d3c1b39d293",
                "8fb1a4190e7e69ed",
                "ccd4b8dbce573692",
                "333814125baa7401",
                "c536bfd1cf36ab5a",
                "158d1b958d5fc37d",
                "75796fe338fb581d",
                "8db2ad8020b17c89",
                "c57e3f201113b351",
                "909a7796fd275364",
                "678eec6c300a7cf2",
                "b8c12ccf4573ad8f",
                "9f8190877ed068d6",
                "f4ce038329b2a992",
                "8fc8f1322cb8515a",
                "b760233f2a87779c",
                "106588a5bfc0ecbc",
                "c420a4f7110dcaff",
                "52553b67a1d62989",
                "051770553319fc87",
                "1580417c05f3dd5d"
            ]
        ]
    },
    {
        "id": "8babd7c6c8e0b980",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = Number(msg.payload[2]);\nvar timeData = msg.timeData;\n\n// jika value <= 2617236, hentikan proses\nif (isNaN(value) || value <= 2618836) {\n    return null;\n}\n\nif (panel === 'cr1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 180,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "a679a54b8d1e74dc",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 137635408) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 220,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "40d9539396be755a",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1431999) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 260,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "9df3c2e9ce9af54b",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 180995968) {\n    return null;\n}\n\n\nif (panel === 'cr2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 300,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "5a597ea2d7c6f212",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 4932691) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 340,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "d07ae3f5ec9aa3c0",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 119948320) {\n    return null;\n}\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 380,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "3f5d169342e91e5a",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1866267) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 420,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "639cd5f68981542f",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 187249536) {\n    return null;\n}\n\n\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 460,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "f1913e8bf924e817",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 215125) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 500,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "e21c8585b2cf23ef",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 24521756) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 540,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "6d294e8e0a169d2e",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1413539) {\n    return null;\n}\n\n\n\nif (panel === 'cr6' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 580,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "dea1ad8ffb260ed9",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 168393680) {\n    return null;\n}\n\n\nif (panel === 'cr6' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 620,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "5d13730fd6c4e23e",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1799111) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 660,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "de6e38839ae10198",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 48821776) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 700,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "64d46d8504b55d3d",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1480644) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 740,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "d6321ee317565628",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 218985312) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 780,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "ab6647e23258bf09",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 8960692) {\n    return null;\n}\n\n\nif (panel === 'cr9' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 820,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "ab8dac41b088b6da",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 238400704) {\n    return null;\n}\n\n\n\nif (panel === 'cr9' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 860,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "546eecb4da90e9ae",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1108002) {\n    return null;\n}\n\n\n\nif (panel === 'cr10' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 900,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "8122b389a47e8ab3",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204896096) {\n    return null;\n}\n\n\nif (panel === 'cr10' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 940,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "6235023fc39493f0",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1775581) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 980,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "4536735677524c97",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204330432) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1020,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "8072e5cebeb39fe7",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 2201929) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1060,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "6312012e13a53c31",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 214202624) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1100,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "4c1f0dd5f6d78248",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 662234688) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1180,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "960f5c8cfa99cae0",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 15705259) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1140,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "054d0cb56a4d3528",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 641965696) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1260,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "681fa65d61fb5641",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 32978992) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1220,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "8fb1a4190e7e69ed",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575934464) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1340,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "ccd4b8dbce573692",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 16987040) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1300,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "5f5aaed279b9e136",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575647040) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1420,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "8d8a2d3c1b39d293",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 7028043) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1380,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "333814125baa7401",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 693976) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 140,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "c536bfd1cf36ab5a",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 574627200) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 180,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "158d1b958d5fc37d",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 25257830) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 220,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "75796fe338fb581d",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 269224832) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 260,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "8db2ad8020b17c89",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_hla",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 762710208) {\n    return null;\n}\n\n\nif (panel === 'hla' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_hla (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 100,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "c57e3f201113b351",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 19994708) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 300,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "909a7796fd275364",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 186939856) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 340,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "678eec6c300a7cf2",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_conn",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 372023) {\n    return null;\n}\n\n\nif (panel === 'conn' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_conn (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 60,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "b8c12ccf4573ad8f",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 4221932) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1130,
        "y": 380,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "9f8190877ed068d6",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1118355) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1130,
        "y": 420,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "106588a5bfc0ecbc",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 55759820) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1580,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "b760233f2a87779c",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 145193) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1540,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "52553b67a1d62989",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 12854937) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1660,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "c420a4f7110dcaff",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 3290683) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1620,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "1580417c05f3dd5d",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 37681616) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1740,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "051770553319fc87",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1149384) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1700,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "f4ce038329b2a992",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm220_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 17033846) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1460,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "8fc8f1322cb8515a",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "tb_pm200_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 234197856) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1500,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "ff794bd3a0ddc3cc",
        "type": "comment",
        "z": "db5a070f843fb6e9",
        "name": "chcd id nya tida umum, id pm220 : 4, pm200 : 3",
        "info": "pass tidak sesuai default",
        "x": 420,
        "y": 1380,
        "wires": []
    },
    {
        "id": "087be8257034ac61",
        "type": "function",
        "z": "db5a070f843fb6e9",
        "name": "update_layout_otics_1",
        "func": "// ============================================\n// FUNCTION NODE: build dynamic update query\n// input  : msg.payload = [panel, power_meter, value]\n// contoh : [\"cr1\", \"pm_200\", 12345.67]\n// output : msg.topic, msg.payload -> ke mysql node\n// ============================================\n\nconst TABLE_NAME = \"tb_layout_otics_1\";\n\n// whitelist panel yang memang ada di parser / DB\nconst ALLOWED_PANELS = new Set([\n    \"bs1\", \"bs2\",\n    \"cc1\", \"cc234\",\n    \"chab\", \"chcd\", \"chef\",\n    \"chsaa\", \"chsab\", \"chsac\",\n    \"conn\",\n    \"cr1\", \"cr2\", \"cr3\", \"cr4\", \"cr5\", \"cr6\",\n    \"cr7\", \"cr8\", \"cr9\", \"cr10\", \"cr11\", \"cr12\",\n    \"ct\", \"hla\", \"ra\", \"ret\"\n]);\n\n// whitelist power meter\nconst ALLOWED_METERS = {\n    \"pm_200\": \"pm200\",\n    \"pm_220\": \"pm220\"\n};\n\n// validasi payload\nif (!Array.isArray(msg.payload) || msg.payload.length < 3) {\n    node.warn(\"Payload tidak sesuai format [panel, power_meter, value]\");\n    return null;\n}\n\nlet panel = String(msg.payload[0] || \"\").trim().toLowerCase();\nlet power_meter = String(msg.payload[1] || \"\").trim().toLowerCase();\nlet value = Number(msg.payload[2]);\n\nif (!ALLOWED_PANELS.has(panel)) {\n    node.warn(\"Panel tidak dikenal: \" + panel);\n    return null;\n}\n\nif (!ALLOWED_METERS[power_meter]) {\n    node.warn(\"Power meter tidak dikenal: \" + power_meter);\n    return null;\n}\n\nif (!isFinite(value)) {\n    node.warn(\"Value bukan angka valid: \" + msg.payload[2]);\n    return null;\n}\n\n// bentuk nama kolom otomatis\n// contoh:\n// panel = cr1, power_meter = pm_200 -> tb_pm200_cr1_value\n// panel = cr1, power_meter = pm_220 -> tb_pm220_cr1_value\nconst meterKey = ALLOWED_METERS[power_meter];\nconst columnName = `tb_${meterKey}_${panel}_value`;\n\n// query update baris terakhir\nmsg.topic = `\n    UPDATE ${TABLE_NAME}\n    SET ${columnName} = ?\n    ORDER BY id DESC\n    LIMIT 1\n`;\n\nmsg.payload = [value];\n\n// info tambahan untuk debug\nmsg.columnName = columnName;\nmsg.panel = panel;\nmsg.power_meter = power_meter;\nmsg.value = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 120,
        "wires": [
            [
                "51cf8c2e88f7c6ef"
            ]
        ]
    },
    {
        "id": "d67f894743a6c081",
        "type": "debug",
        "z": "db5a070f843fb6e9",
        "name": "debug 17",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 700,
        "y": 80,
        "wires": []
    },
    {
        "id": "9bd744819649d54c",
        "type": "mqtt out",
        "z": "db5a070f843fb6e9",
        "name": "",
        "topic": "kub_listrik",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "f0213c0bde6bee50",
        "x": 420,
        "y": 220,
        "wires": []
    },
    {
        "id": "d46f1bcf1e5ff5f1",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
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
        "responsetimeout": "10000"
    },
    {
        "id": "c17db8c320f9fd49",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy",
        "tz": "",
        "charset": "UTF8"
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
        "id": "66bbdf3188c2f96b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_area_compressor",
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
        "id": "ef478a640b21a7b3",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-node-mysql": "3.0.0",
            "node-red-contrib-string": "1.0.0"
        }
    }
]
