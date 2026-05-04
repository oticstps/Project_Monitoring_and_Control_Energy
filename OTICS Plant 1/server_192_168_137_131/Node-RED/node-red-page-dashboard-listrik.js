[
    {
        "id": "4d79608c1e492853",
        "type": "string",
        "z": "f891412b813130ad",
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
        "x": 370,
        "y": 1780,
        "wires": [
            [
                "d7db69351766f4fe",
                "4783114f57e53d24",
                "d904ce603b556a95"
            ]
        ]
    },
    {
        "id": "dbe4b191f010cc3f",
        "type": "debug",
        "z": "f891412b813130ad",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 460,
        "y": 160,
        "wires": []
    },
    {
        "id": "89ed6483117d68ec",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 1940,
        "wires": [
            []
        ]
    },
    {
        "id": "4ad2c2db92e3227f",
        "type": "string",
        "z": "f891412b813130ad",
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
        "x": 390,
        "y": 900,
        "wires": [
            [
                "89ed6483117d68ec",
                "e2129b4fee189d41",
                "d84cbddec93210e6",
                "433bc0b856a09fc5",
                "2aacad471108c628",
                "055e5c559991363f",
                "41251834df47aaec",
                "6514c777090554c5",
                "c3aac4da8d2b035b",
                "9f1fae5363be2962",
                "115c6e02557f948a",
                "3899837553509bb4",
                "f788b915cbb0ab41",
                "18592fa1682123cc",
                "8cc0aaebcb8de878",
                "1d732ffca671fdc3",
                "b9da725c93ce5653",
                "d0868b58477f9fff",
                "3f0f4d3fa37d9254",
                "65b7afba5e043fc3",
                "6d7fbc649a4069b6",
                "6f84ca7fb9227e9e",
                "4ccae15c0f509b98",
                "97cbbd1fe92d0e21",
                "2aa566767e7e5860",
                "e991756424eff759",
                "7ffab4c29e79f8f0",
                "6aae198c7667c526",
                "a6230c2fc06ef3cf",
                "e641d5cf291856e5",
                "33cbc24d0eacf9b1",
                "b60f3fe989d7f63c",
                "d13489cccde9fa9b",
                "d33b5e2ea5835014",
                "5c6ea6f0e1bbf880",
                "583ae513ddc14912",
                "55e1f65bd400528f",
                "f289c948bc2371f8",
                "e31606a5af1985e7"
            ]
        ]
    },
    {
        "id": "8e391926d57fdf3d",
        "type": "string",
        "z": "f891412b813130ad",
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
        "x": 870,
        "y": 1975,
        "wires": [
            [
                "89ed6483117d68ec"
            ]
        ]
    },
    {
        "id": "d7db69351766f4fe",
        "type": "debug",
        "z": "f891412b813130ad",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 1740,
        "wires": []
    },
    {
        "id": "e2129b4fee189d41",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1900,
        "wires": [
            []
        ]
    },
    {
        "id": "4783114f57e53d24",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 1780,
        "wires": [
            [
                "b8fe36001d9fedbd"
            ]
        ]
    },
    {
        "id": "d904ce603b556a95",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1810,
        "wires": [
            []
        ]
    },
    {
        "id": "d84cbddec93210e6",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1930,
        "wires": [
            [
                "8e391926d57fdf3d"
            ]
        ]
    },
    {
        "id": "2aacad471108c628",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1990,
        "wires": [
            []
        ]
    },
    {
        "id": "055e5c559991363f",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 2020,
        "wires": [
            []
        ]
    },
    {
        "id": "433bc0b856a09fc5",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1960,
        "wires": [
            []
        ]
    },
    {
        "id": "6514c777090554c5",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 2080,
        "wires": [
            []
        ]
    },
    {
        "id": "41251834df47aaec",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 2050,
        "wires": [
            []
        ]
    },
    {
        "id": "c3aac4da8d2b035b",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_bs1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 420,
        "wires": [
            [
                "628fd176b6950504"
            ]
        ]
    },
    {
        "id": "9f1fae5363be2962",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_bs2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 450,
        "wires": [
            [
                "009823438ae1c967"
            ]
        ]
    },
    {
        "id": "e991756424eff759",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_chab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH' && pm === 'PM-200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1180,
        "wires": [
            [
                "769d5ec253fdf23e"
            ]
        ]
    },
    {
        "id": "7ffab4c29e79f8f0",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_chcd",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH-CD' && pm === 'PM-3F') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1210,
        "wires": [
            [
                "c778c1ae06deef31"
            ]
        ]
    },
    {
        "id": "6aae198c7667c526",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_chef",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_EF' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1240,
        "wires": [
            [
                "eeedbb275945fc1f"
            ]
        ]
    },
    {
        "id": "a6230c2fc06ef3cf",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_chsaa",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAA' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1270,
        "wires": [
            [
                "9d1cab6d94ed0912"
            ]
        ]
    },
    {
        "id": "e641d5cf291856e5",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_chsab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAB' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1300,
        "wires": [
            [
                "ce506a298b094cde"
            ]
        ]
    },
    {
        "id": "33cbc24d0eacf9b1",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_chsac",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_SAC' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1330,
        "wires": [
            [
                "4d2d367b9bac1928"
            ]
        ]
    },
    {
        "id": "18592fa1682123cc",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_cr1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_1' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 720,
        "wires": [
            [
                "1b8013e54362c1c2"
            ]
        ]
    },
    {
        "id": "8cc0aaebcb8de878",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_cr2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 750,
        "wires": [
            [
                "675b5a33d3103dfe"
            ]
        ]
    },
    {
        "id": "1d732ffca671fdc3",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr3",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_3' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 780,
        "wires": [
            [
                "789977bae58208f2"
            ]
        ]
    },
    {
        "id": "b9da725c93ce5653",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr4",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_4' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 810,
        "wires": [
            [
                "fde6b57b27ae3a85"
            ]
        ]
    },
    {
        "id": "d0868b58477f9fff",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr5",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_5' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 840,
        "wires": [
            [
                "93ac2e6a99e61d84"
            ]
        ]
    },
    {
        "id": "3f0f4d3fa37d9254",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr6",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_6' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 870,
        "wires": [
            [
                "f26c377beec55070"
            ]
        ]
    },
    {
        "id": "65b7afba5e043fc3",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr7",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'cr7' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 900,
        "wires": [
            [
                "bd108b4f24a7c635"
            ]
        ]
    },
    {
        "id": "6d7fbc649a4069b6",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr8",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_8' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 930,
        "wires": [
            [
                "e958794c7f0c38ee"
            ]
        ]
    },
    {
        "id": "6f84ca7fb9227e9e",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr9",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_9' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 960,
        "wires": [
            [
                "5defd6b8e9df890f"
            ]
        ]
    },
    {
        "id": "4ccae15c0f509b98",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr10",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_10' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 990,
        "wires": [
            [
                "91c8e1333c60a055"
            ]
        ]
    },
    {
        "id": "97cbbd1fe92d0e21",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr11",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_11' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 1020,
        "wires": [
            [
                "baabdbead6384ab5"
            ]
        ]
    },
    {
        "id": "2aa566767e7e5860",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr12",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_12' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 1050,
        "wires": [
            [
                "b250123a161fd854"
            ]
        ]
    },
    {
        "id": "115c6e02557f948a",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_hla",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'HLA' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 480,
        "wires": [
            [
                "06eb225e5eadf894"
            ]
        ]
    },
    {
        "id": "3899837553509bb4",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_ra",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'roller_arm' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 510,
        "wires": [
            [
                "f12778f3af9c8bfa"
            ]
        ]
    },
    {
        "id": "f788b915cbb0ab41",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_ret",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'RET' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 540,
        "wires": [
            [
                "37dd4f8e425ae04f"
            ]
        ]
    },
    {
        "id": "b60f3fe989d7f63c",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cc1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1360,
        "wires": [
            [
                "06bdfcde0daacea1"
            ]
        ]
    },
    {
        "id": "d13489cccde9fa9b",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cc234",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC234' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1390,
        "wires": [
            [
                "f31cc2f8fe21c5f8"
            ]
        ]
    },
    {
        "id": "d33b5e2ea5835014",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1840,
        "wires": [
            []
        ]
    },
    {
        "id": "5c6ea6f0e1bbf880",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1870,
        "wires": [
            []
        ]
    },
    {
        "id": "96123ff901e36710",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_bs1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 420,
        "wires": [
            [
                "47eafa6ce6e00611"
            ]
        ]
    },
    {
        "id": "ad023a3865e2ded1",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_bs2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 450,
        "wires": [
            [
                "3e8a0f1ec4aa1fe5"
            ]
        ]
    },
    {
        "id": "0f59bb3b99a5186f",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_chab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH' && pm === 'PM-220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1180,
        "wires": [
            [
                "7de6888cbe10b07d"
            ]
        ]
    },
    {
        "id": "f843b520f9ebb503",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_chcd",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH-CD' && pm === 'PM-1F') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1210,
        "wires": [
            [
                "6bf8ed012ddfdc41"
            ]
        ]
    },
    {
        "id": "bd47f595d4c9ac88",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_chef",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_EF' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1240,
        "wires": [
            [
                "77cc5bf6e2b45dd7"
            ]
        ]
    },
    {
        "id": "ae31960e71fe2402",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_chsaa",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAA' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1270,
        "wires": [
            [
                "f252591f3b0a790b"
            ]
        ]
    },
    {
        "id": "b8e768b5f54d4404",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_chsab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAB' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1300,
        "wires": [
            [
                "4c36bf093c1a2be3"
            ]
        ]
    },
    {
        "id": "1608acaa41f8d867",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_chsac",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_SAC' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1330,
        "wires": [
            [
                "f392e69856235312"
            ]
        ]
    },
    {
        "id": "3094470c73e22570",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 720,
        "wires": [
            [
                "9cf6aefc97254832"
            ]
        ]
    },
    {
        "id": "2c2d454721158d61",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_2' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 750,
        "wires": [
            [
                "197ae8fe3003b480"
            ]
        ]
    },
    {
        "id": "5d6654262a4929f6",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr3",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_3' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 780,
        "wires": [
            [
                "ad98a03cbc05fe53"
            ]
        ]
    },
    {
        "id": "028cd1353cad3c5e",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr4",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_4' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 810,
        "wires": [
            [
                "25be8760f516bba3"
            ]
        ]
    },
    {
        "id": "1266f15dc79503b8",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr5",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_5' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 840,
        "wires": [
            [
                "f39df40b28a766e8"
            ]
        ]
    },
    {
        "id": "a28a8de5e64cd67d",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr6",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_6' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 870,
        "wires": [
            [
                "0203c5c197932e05"
            ]
        ]
    },
    {
        "id": "66994545664fb558",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr7",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'cr7' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 900,
        "wires": [
            [
                "ffa581bf771aa7e9"
            ]
        ]
    },
    {
        "id": "b2db4a092a270603",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr8",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_8' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 930,
        "wires": [
            [
                "731ae64dc2832c4e"
            ]
        ]
    },
    {
        "id": "33ab1737d49ac7ae",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr9",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_9' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 960,
        "wires": [
            [
                "f3ed8d37aa6bdeba"
            ]
        ]
    },
    {
        "id": "f0de8bd2fe17ce24",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr10",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_10' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 990,
        "wires": [
            [
                "a2de678859b7c7a7"
            ]
        ]
    },
    {
        "id": "94b5b424b9b20990",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr11",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_11' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 1020,
        "wires": [
            [
                "95d210bec75fb1c9"
            ]
        ]
    },
    {
        "id": "f22d94905d673104",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_cr12",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_12' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 1050,
        "wires": [
            [
                "19733efd0ec39292"
            ]
        ]
    },
    {
        "id": "e1e5ab319668ad6c",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_ra",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'roller_arm' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 510,
        "wires": [
            [
                "9cb9c8bab1af868f"
            ]
        ]
    },
    {
        "id": "d7374c45c08db373",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_ret",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'RET' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 540,
        "wires": [
            [
                "3ab8c99179430c32"
            ]
        ]
    },
    {
        "id": "0a2dd05c4b556570",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_cc1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC1' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1360,
        "wires": [
            [
                "898adcd096e409dd"
            ]
        ]
    },
    {
        "id": "4baa89241bea51ae",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_cc234",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC234' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1390,
        "wires": [
            [
                "b7417fe553d0bd5b"
            ]
        ]
    },
    {
        "id": "55e1f65bd400528f",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 2110,
        "wires": [
            []
        ]
    },
    {
        "id": "583ae513ddc14912",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 2140,
        "wires": [
            []
        ]
    },
    {
        "id": "e88b6402b6e8d4b2",
        "type": "string",
        "z": "f891412b813130ad",
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
        "x": 390,
        "y": 280,
        "wires": [
            [
                "96123ff901e36710",
                "ad023a3865e2ded1",
                "e1e5ab319668ad6c",
                "d7374c45c08db373",
                "3094470c73e22570",
                "2c2d454721158d61",
                "5d6654262a4929f6",
                "028cd1353cad3c5e",
                "1266f15dc79503b8",
                "a28a8de5e64cd67d",
                "66994545664fb558",
                "b2db4a092a270603",
                "33ab1737d49ac7ae",
                "f0de8bd2fe17ce24",
                "94b5b424b9b20990",
                "f22d94905d673104",
                "0f59bb3b99a5186f",
                "f843b520f9ebb503",
                "bd47f595d4c9ac88",
                "ae31960e71fe2402",
                "b8e768b5f54d4404",
                "1608acaa41f8d867",
                "0a2dd05c4b556570",
                "4baa89241bea51ae"
            ]
        ]
    },
    {
        "id": "b8fe36001d9fedbd",
        "type": "debug",
        "z": "f891412b813130ad",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 900,
        "y": 1780,
        "wires": []
    },
    {
        "id": "1b8013e54362c1c2",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "4af9321e3ade111b",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 660,
        "wires": [
            []
        ]
    },
    {
        "id": "9cf6aefc97254832",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "4af9321e3ade111b",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 665,
        "wires": [
            []
        ]
    },
    {
        "id": "675b5a33d3103dfe",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "1cfc47961784accc",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 700,
        "wires": [
            []
        ]
    },
    {
        "id": "197ae8fe3003b480",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "1cfc47961784accc",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 705,
        "wires": [
            []
        ]
    },
    {
        "id": "ad98a03cbc05fe53",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "01af6d6519920725",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 745,
        "wires": [
            []
        ]
    },
    {
        "id": "25be8760f516bba3",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "cb3e6c1f356f4c40",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 785,
        "wires": [
            []
        ]
    },
    {
        "id": "f39df40b28a766e8",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "37bd8f1ea26da68a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 825,
        "wires": [
            []
        ]
    },
    {
        "id": "0203c5c197932e05",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "c6d44745f0cdf3a4",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 865,
        "wires": [
            []
        ]
    },
    {
        "id": "ffa581bf771aa7e9",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "d7442e27936d1fd5",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 905,
        "wires": [
            []
        ]
    },
    {
        "id": "731ae64dc2832c4e",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "5792e416bf98caf2",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 945,
        "wires": [
            []
        ]
    },
    {
        "id": "f3ed8d37aa6bdeba",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "cddc76b40154c524",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 985,
        "wires": [
            []
        ]
    },
    {
        "id": "a2de678859b7c7a7",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "9c7acbf8ae7bbfdf",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 1025,
        "wires": [
            []
        ]
    },
    {
        "id": "95d210bec75fb1c9",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "3c17029fe6139c89",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 1065,
        "wires": [
            []
        ]
    },
    {
        "id": "19733efd0ec39292",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "5227a158b35eb96b",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 1105,
        "wires": [
            []
        ]
    },
    {
        "id": "789977bae58208f2",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "01af6d6519920725",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 740,
        "wires": [
            []
        ]
    },
    {
        "id": "fde6b57b27ae3a85",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "cb3e6c1f356f4c40",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 780,
        "wires": [
            []
        ]
    },
    {
        "id": "93ac2e6a99e61d84",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "37bd8f1ea26da68a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 820,
        "wires": [
            []
        ]
    },
    {
        "id": "f26c377beec55070",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "c6d44745f0cdf3a4",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 860,
        "wires": [
            []
        ]
    },
    {
        "id": "bd108b4f24a7c635",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "d7442e27936d1fd5",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 900,
        "wires": [
            []
        ]
    },
    {
        "id": "e958794c7f0c38ee",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "5792e416bf98caf2",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 940,
        "wires": [
            []
        ]
    },
    {
        "id": "5defd6b8e9df890f",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "cddc76b40154c524",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 980,
        "wires": [
            []
        ]
    },
    {
        "id": "91c8e1333c60a055",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "9c7acbf8ae7bbfdf",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 1020,
        "wires": [
            []
        ]
    },
    {
        "id": "baabdbead6384ab5",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "3c17029fe6139c89",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 1060,
        "wires": [
            []
        ]
    },
    {
        "id": "b250123a161fd854",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "5227a158b35eb96b",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 1100,
        "wires": [
            []
        ]
    },
    {
        "id": "f289c948bc2371f8",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm200_conn",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CONN' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 580,
        "wires": [
            [
                "cd4e15e150ea8f2a"
            ]
        ]
    },
    {
        "id": "e31606a5af1985e7",
        "type": "function",
        "z": "f891412b813130ad",
        "name": "tb_pm220_conn",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CONN' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 580,
        "wires": [
            []
        ]
    },
    {
        "id": "628fd176b6950504",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "3a908c62f868440c",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "009823438ae1c967",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "0f7afa53ab66cb06",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 220,
        "wires": [
            []
        ]
    },
    {
        "id": "06eb225e5eadf894",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "249658a4a069f2b7",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 260,
        "wires": [
            []
        ]
    },
    {
        "id": "f12778f3af9c8bfa",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "da60a025b5ac4c1a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "37dd4f8e425ae04f",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "e54720ebbda2dca2",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "cd4e15e150ea8f2a",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "595578c378291a3e",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "47eafa6ce6e00611",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "3a908c62f868440c",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "3e8a0f1ec4aa1fe5",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "0f7afa53ab66cb06",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "9cb9c8bab1af868f",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "da60a025b5ac4c1a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 480,
        "wires": [
            []
        ]
    },
    {
        "id": "3ab8c99179430c32",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "e54720ebbda2dca2",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 540,
        "wires": [
            []
        ]
    },
    {
        "id": "769d5ec253fdf23e",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "60bba1d1e4626b5f",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1480,
        "wires": [
            []
        ]
    },
    {
        "id": "c778c1ae06deef31",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "6dd25643698beb36",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1520,
        "wires": [
            []
        ]
    },
    {
        "id": "eeedbb275945fc1f",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "a6ca4ded655ed5cc",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1560,
        "wires": [
            []
        ]
    },
    {
        "id": "9d1cab6d94ed0912",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "e280f9525742f33a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1600,
        "wires": [
            []
        ]
    },
    {
        "id": "ce506a298b094cde",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "2559c2aeefb9f512",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1640,
        "wires": [
            []
        ]
    },
    {
        "id": "4d2d367b9bac1928",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "a53ec80a3a501519",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1680,
        "wires": [
            []
        ]
    },
    {
        "id": "06bdfcde0daacea1",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "dfd109b84c211806",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1720,
        "wires": [
            []
        ]
    },
    {
        "id": "f31cc2f8fe21c5f8",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "50b11a0408a87105",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1760,
        "wires": [
            []
        ]
    },
    {
        "id": "7de6888cbe10b07d",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "60bba1d1e4626b5f",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1180,
        "wires": [
            []
        ]
    },
    {
        "id": "6bf8ed012ddfdc41",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "6dd25643698beb36",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1220,
        "wires": [
            []
        ]
    },
    {
        "id": "77cc5bf6e2b45dd7",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "a6ca4ded655ed5cc",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1260,
        "wires": [
            []
        ]
    },
    {
        "id": "f252591f3b0a790b",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "e280f9525742f33a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1300,
        "wires": [
            []
        ]
    },
    {
        "id": "4c36bf093c1a2be3",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "2559c2aeefb9f512",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1340,
        "wires": [
            []
        ]
    },
    {
        "id": "f392e69856235312",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "a53ec80a3a501519",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1380,
        "wires": [
            []
        ]
    },
    {
        "id": "898adcd096e409dd",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "dfd109b84c211806",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1420,
        "wires": [
            []
        ]
    },
    {
        "id": "b7417fe553d0bd5b",
        "type": "ui_template",
        "z": "f891412b813130ad",
        "group": "50b11a0408a87105",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1460,
        "wires": [
            []
        ]
    },
    {
        "id": "053cfa4f980fda86",
        "type": "ui_button",
        "z": "f891412b813130ad",
        "name": "",
        "group": "add9e19d5fffef5d",
        "order": 1,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Kalibrasi",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "-1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 800,
        "y": 1480,
        "wires": [
            [
                "628fd176b6950504",
                "009823438ae1c967",
                "06eb225e5eadf894",
                "f12778f3af9c8bfa",
                "37dd4f8e425ae04f",
                "cd4e15e150ea8f2a",
                "47eafa6ce6e00611",
                "3e8a0f1ec4aa1fe5",
                "9cb9c8bab1af868f",
                "3ab8c99179430c32",
                "1b8013e54362c1c2",
                "675b5a33d3103dfe",
                "789977bae58208f2",
                "fde6b57b27ae3a85",
                "93ac2e6a99e61d84",
                "f26c377beec55070",
                "bd108b4f24a7c635",
                "e958794c7f0c38ee",
                "5defd6b8e9df890f",
                "91c8e1333c60a055",
                "baabdbead6384ab5",
                "b250123a161fd854",
                "9cf6aefc97254832",
                "197ae8fe3003b480",
                "ad98a03cbc05fe53",
                "25be8760f516bba3",
                "f39df40b28a766e8",
                "0203c5c197932e05",
                "ffa581bf771aa7e9",
                "731ae64dc2832c4e",
                "f3ed8d37aa6bdeba",
                "a2de678859b7c7a7",
                "95d210bec75fb1c9",
                "19733efd0ec39292",
                "7de6888cbe10b07d",
                "6bf8ed012ddfdc41",
                "77cc5bf6e2b45dd7",
                "f252591f3b0a790b",
                "4c36bf093c1a2be3",
                "f392e69856235312",
                "898adcd096e409dd",
                "b7417fe553d0bd5b",
                "769d5ec253fdf23e",
                "c778c1ae06deef31",
                "eeedbb275945fc1f",
                "9d1cab6d94ed0912",
                "ce506a298b094cde",
                "4d2d367b9bac1928",
                "06bdfcde0daacea1",
                "f31cc2f8fe21c5f8"
            ]
        ]
    },
    {
        "id": "cb5cc321add752ae",
        "type": "link in",
        "z": "f891412b813130ad",
        "name": "link in 2",
        "links": [
            "03c659c6a1802bfe"
        ],
        "x": 125,
        "y": 240,
        "wires": [
            [
                "4d79608c1e492853",
                "dbe4b191f010cc3f",
                "4ad2c2db92e3227f",
                "e88b6402b6e8d4b2"
            ]
        ]
    },
    {
        "id": "4af9321e3ade111b",
        "type": "ui_group",
        "name": "CR1",
        "tab": "2675590d0b180447",
        "order": 2,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "1cfc47961784accc",
        "type": "ui_group",
        "name": "CR2",
        "tab": "2675590d0b180447",
        "order": 3,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "01af6d6519920725",
        "type": "ui_group",
        "name": "CR3",
        "tab": "2675590d0b180447",
        "order": 4,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "cb3e6c1f356f4c40",
        "type": "ui_group",
        "name": "CR4",
        "tab": "2675590d0b180447",
        "order": 5,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "37bd8f1ea26da68a",
        "type": "ui_group",
        "name": "CR5",
        "tab": "2675590d0b180447",
        "order": 6,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "c6d44745f0cdf3a4",
        "type": "ui_group",
        "name": "CR6",
        "tab": "2675590d0b180447",
        "order": 7,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "d7442e27936d1fd5",
        "type": "ui_group",
        "name": "CR7",
        "tab": "2675590d0b180447",
        "order": 8,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "5792e416bf98caf2",
        "type": "ui_group",
        "name": "CR8",
        "tab": "2675590d0b180447",
        "order": 9,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "cddc76b40154c524",
        "type": "ui_group",
        "name": "CR9",
        "tab": "2675590d0b180447",
        "order": 10,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9c7acbf8ae7bbfdf",
        "type": "ui_group",
        "name": "CR10",
        "tab": "2675590d0b180447",
        "order": 11,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "3c17029fe6139c89",
        "type": "ui_group",
        "name": "CR11",
        "tab": "2675590d0b180447",
        "order": 12,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "5227a158b35eb96b",
        "type": "ui_group",
        "name": "CR12",
        "tab": "2675590d0b180447",
        "order": 13,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "3a908c62f868440c",
        "type": "ui_group",
        "name": "BS1",
        "tab": "2675590d0b180447",
        "order": 14,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "0f7afa53ab66cb06",
        "type": "ui_group",
        "name": "BS2",
        "tab": "2675590d0b180447",
        "order": 15,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "249658a4a069f2b7",
        "type": "ui_group",
        "name": "HLA",
        "tab": "2675590d0b180447",
        "order": 19,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "da60a025b5ac4c1a",
        "type": "ui_group",
        "name": "ROLLER ARM",
        "tab": "2675590d0b180447",
        "order": 18,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "e54720ebbda2dca2",
        "type": "ui_group",
        "name": "RET",
        "tab": "2675590d0b180447",
        "order": 16,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "595578c378291a3e",
        "type": "ui_group",
        "name": "CONN",
        "tab": "2675590d0b180447",
        "order": 17,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "60bba1d1e4626b5f",
        "type": "ui_group",
        "name": "CHAB",
        "tab": "2675590d0b180447",
        "order": 20,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "6dd25643698beb36",
        "type": "ui_group",
        "name": "CHCD",
        "tab": "2675590d0b180447",
        "order": 21,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "a6ca4ded655ed5cc",
        "type": "ui_group",
        "name": "CHEF",
        "tab": "2675590d0b180447",
        "order": 22,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "e280f9525742f33a",
        "type": "ui_group",
        "name": "CHSAA",
        "tab": "2675590d0b180447",
        "order": 23,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "2559c2aeefb9f512",
        "type": "ui_group",
        "name": "CHSAB",
        "tab": "2675590d0b180447",
        "order": 24,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "a53ec80a3a501519",
        "type": "ui_group",
        "name": "CHSAC",
        "tab": "2675590d0b180447",
        "order": 25,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "dfd109b84c211806",
        "type": "ui_group",
        "name": "CC1",
        "tab": "2675590d0b180447",
        "order": 26,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "50b11a0408a87105",
        "type": "ui_group",
        "name": "CC234",
        "tab": "2675590d0b180447",
        "order": 27,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "add9e19d5fffef5d",
        "type": "ui_group",
        "name": "Kalibrasi",
        "tab": "2675590d0b180447",
        "order": 1,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "2675590d0b180447",
        "type": "ui_tab",
        "name": "Otics Monitoring Energy Listrik",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "57b1ccd09cc0953d",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-dashboard": "3.6.6"
        }
    }
]
