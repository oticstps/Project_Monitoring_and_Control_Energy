[
    {
        "id": "8e243cb8e828177c",
        "type": "link in",
        "z": "d54a88d83243d903",
        "name": "link in 1",
        "links": [
            "cc2109f2a0e5cf4d"
        ],
        "x": 85,
        "y": 140,
        "wires": [
            [
                "70c54ad92914f75b",
                "a104caa93e6f7a69"
            ]
        ]
    },
    {
        "id": "cdfb5ad3b8a35b61",
        "type": "debug",
        "z": "d54a88d83243d903",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 300,
        "y": 40,
        "wires": []
    },
    {
        "id": "03a5847fcf666d17",
        "type": "function",
        "z": "d54a88d83243d903",
        "name": "lpqad_filter",
        "func": "if(msg.payload[0] === 'LPQAD'){\n    return msg\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 370,
        "y": 80,
        "wires": [
            [
                "91b7bac796c1de01",
                "ae8c11271868b9fc"
            ]
        ]
    },
    {
        "id": "643e73ac3163b7e4",
        "type": "function",
        "z": "d54a88d83243d903",
        "name": "lpct_filter",
        "func": "if(msg.payload[0] === 'C_T'){\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 360,
        "y": 120,
        "wires": [
            [
                "5ae3ea9a516cc881"
            ]
        ]
    },
    {
        "id": "91b7bac796c1de01",
        "type": "function",
        "z": "d54a88d83243d903",
        "name": "transfer_lpqad_2",
        "func": "var name_new = 'LPQAD_EXT';\nmsg.payload[0] = name_new;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 80,
        "wires": [
            [
                "bcc3bab6afe5ab8f",
                "be48bbafd07db3bf"
            ]
        ]
    },
    {
        "id": "5ae3ea9a516cc881",
        "type": "function",
        "z": "d54a88d83243d903",
        "name": "transfer_ct_2",
        "func": "var name_new = 'C_T_EXT';\n\nmsg.payload[0] = name_new;\n\n\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 120,
        "wires": [
            [
                "bcc3bab6afe5ab8f",
                "c48d81f844135e94"
            ]
        ]
    },
    {
        "id": "be48bbafd07db3bf",
        "type": "debug",
        "z": "d54a88d83243d903",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 860,
        "y": 60,
        "wires": []
    },
    {
        "id": "ae8c11271868b9fc",
        "type": "debug",
        "z": "d54a88d83243d903",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 620,
        "y": 40,
        "wires": []
    },
    {
        "id": "70c54ad92914f75b",
        "type": "string",
        "z": "d54a88d83243d903",
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
        "x": 190,
        "y": 160,
        "wires": [
            [
                "cdfb5ad3b8a35b61",
                "03a5847fcf666d17",
                "643e73ac3163b7e4"
            ]
        ]
    },
    {
        "id": "bcc3bab6afe5ab8f",
        "type": "serial out",
        "z": "d54a88d83243d903",
        "name": "",
        "serial": "2e997caa1e3410c9",
        "x": 930,
        "y": 160,
        "wires": []
    },
    {
        "id": "c48d81f844135e94",
        "type": "debug",
        "z": "d54a88d83243d903",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 680,
        "y": 300,
        "wires": []
    },
    {
        "id": "a104caa93e6f7a69",
        "type": "debug",
        "z": "d54a88d83243d903",
        "name": "debug 25",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 220,
        "y": 260,
        "wires": []
    },
    {
        "id": "2e997caa1e3410c9",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
        "serialbaud": "9600",
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
        "id": "72314cf10dbd95fc",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-node-serialport": "2.0.3"
        }
    }
]
