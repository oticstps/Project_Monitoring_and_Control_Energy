[
    {
        "id": "26c7a87243ebfbc9",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "1,PART,242,0,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "1,PART,242,0,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 240,
        "wires": [
            [
                "173b88ab519ec236"
            ]
        ]
    },
    {
        "id": "4cd12756db3a29c8",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 1,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR1",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3190,
        "wires": []
    },
    {
        "id": "f179c873ba2cea5b",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 2,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR2",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3225,
        "wires": []
    },
    {
        "id": "2b4182e2f2f666e8",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 3,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR3",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3260,
        "wires": []
    },
    {
        "id": "20efc1202858dc23",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 4,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR4",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3295,
        "wires": []
    },
    {
        "id": "6e35f0a67a3a5c5a",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 5,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR5",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3330,
        "wires": []
    },
    {
        "id": "c1628697e0577a0c",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 6,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR6",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3365,
        "wires": []
    },
    {
        "id": "691fc3b86d5bf024",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 7,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR7",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3400,
        "wires": []
    },
    {
        "id": "a8dfa4398153ca69",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 8,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR8",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3435,
        "wires": []
    },
    {
        "id": "363ceea1c7f3600d",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 9,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR9",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3470,
        "wires": []
    },
    {
        "id": "52d0d911d3ef9941",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 10,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR10",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3505,
        "wires": []
    },
    {
        "id": "2a62d796ca48f3db",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 11,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR11",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3540,
        "wires": []
    },
    {
        "id": "5b765acdb2a722a5",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 12,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR12",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 3575,
        "wires": []
    },
    {
        "id": "0a01895990d1175d",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 1,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR1",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1780,
        "wires": []
    },
    {
        "id": "072460d488dcd140",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 2,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR2",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1815,
        "wires": []
    },
    {
        "id": "0f6328bf133cce3c",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 3,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR3",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1850,
        "wires": []
    },
    {
        "id": "3a372867e55b19cf",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 4,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR4",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1885,
        "wires": []
    },
    {
        "id": "97272c1d03e043dc",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 5,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR5",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1920,
        "wires": []
    },
    {
        "id": "358279ed3eac573d",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 6,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR6",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1955,
        "wires": []
    },
    {
        "id": "2ee3fab9e1f2216b",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 7,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR7",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 1990,
        "wires": []
    },
    {
        "id": "a2a955e96b7f306a",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 8,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR8",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 2025,
        "wires": []
    },
    {
        "id": "a8a3ba53b1a8ab34",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 9,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR9",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 2060,
        "wires": []
    },
    {
        "id": "5c5fe4d3a69d734d",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 10,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR10",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 2095,
        "wires": []
    },
    {
        "id": "761799d0142e1d4e",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 11,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR11",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 2130,
        "wires": []
    },
    {
        "id": "19ddb7adf7048a4a",
        "type": "ui_gauge",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 12,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR12",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1430,
        "y": 2165,
        "wires": []
    },
    {
        "id": "dd5e90a9d41182a5",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 1,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR1",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 880,
        "wires": []
    },
    {
        "id": "c0c2a0bbf68d440f",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 3,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR2",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 915,
        "wires": []
    },
    {
        "id": "3382367243be9106",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 5,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR3",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 950,
        "wires": []
    },
    {
        "id": "2da9b9494297b44c",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 7,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR4",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 985,
        "wires": []
    },
    {
        "id": "0ed9452895bb2d8a",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 12,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR12",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1265,
        "wires": []
    },
    {
        "id": "3e287f37413e6815",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 9,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR5",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1020,
        "wires": []
    },
    {
        "id": "2f102623d42d335c",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 10,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR11",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1230,
        "wires": []
    },
    {
        "id": "fba2430c7fccc27a",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 11,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR6",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1055,
        "wires": []
    },
    {
        "id": "45b6c1ae657c8c0a",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 2,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR7",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1090,
        "wires": []
    },
    {
        "id": "d945bf234fea455f",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 4,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR8",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1125,
        "wires": []
    },
    {
        "id": "af6de4e15086b4fe",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 6,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR9",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1160,
        "wires": []
    },
    {
        "id": "3c0f8e6786bfa87d",
        "type": "ui_text",
        "z": "f609497bdd1f4d64",
        "group": "84bdaf9aa3b2d757",
        "order": 8,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR10",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1190,
        "y": 1195,
        "wires": []
    },
    {
        "id": "7835cb82ca44f08e",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR12",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2630,
        "wires": [
            [
                "19ddb7adf7048a4a"
            ]
        ]
    },
    {
        "id": "c085c3446eb24c13",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR11",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2600,
        "wires": [
            [
                "761799d0142e1d4e"
            ]
        ]
    },
    {
        "id": "759c6b77c984c2b5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR10",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2570,
        "wires": [
            [
                "5c5fe4d3a69d734d"
            ]
        ]
    },
    {
        "id": "7657b2792f51b60f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR9",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2540,
        "wires": [
            [
                "a8a3ba53b1a8ab34"
            ]
        ]
    },
    {
        "id": "71a4a499cce1ad6f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR8",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2510,
        "wires": [
            [
                "a2a955e96b7f306a"
            ]
        ]
    },
    {
        "id": "aab98289ea76bd71",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR7",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2480,
        "wires": [
            [
                "2ee3fab9e1f2216b"
            ]
        ]
    },
    {
        "id": "949db088b3075339",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR5",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2420,
        "wires": [
            [
                "97272c1d03e043dc"
            ]
        ]
    },
    {
        "id": "8b32a8df9a63bdc2",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR4",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2390,
        "wires": [
            [
                "3a372867e55b19cf"
            ]
        ]
    },
    {
        "id": "e6e1766d243ef80e",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR6",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2450,
        "wires": [
            [
                "358279ed3eac573d"
            ]
        ]
    },
    {
        "id": "843fc1567fe55f40",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR3",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2360,
        "wires": [
            [
                "0f6328bf133cce3c"
            ]
        ]
    },
    {
        "id": "30b125cb6f385015",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "0",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1420,
        "y": 2300,
        "wires": [
            [
                "0a01895990d1175d"
            ]
        ]
    },
    {
        "id": "4975d3a628aefe06",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR2",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1420,
        "y": 2330,
        "wires": [
            [
                "072460d488dcd140"
            ]
        ]
    },
    {
        "id": "be837bc4e92d37f2",
        "type": "debug",
        "z": "f609497bdd1f4d64",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 360,
        "y": 100,
        "wires": []
    },
    {
        "id": "cd93302ba6d39bf7",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR10",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 550,
        "y": 4740,
        "wires": [
            [
                "5abc962b4b79d1e6",
                "35ad61310ab68fb4",
                "a94921518112b4bf",
                "93dd1b150c9eaa1a",
                "27946dd3927852e2",
                "73a52cefac17f531",
                "c00eb142076ba3e5",
                "eaf376aee4b0b7a3",
                "136c5bb6118fd5a2",
                "aed289865540e428",
                "ee14f807eb31c4b0"
            ]
        ]
    },
    {
        "id": "5abc962b4b79d1e6",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '10'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 4740,
        "wires": [
            []
        ]
    },
    {
        "id": "35ad61310ab68fb4",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 4780,
        "wires": [
            []
        ]
    },
    {
        "id": "9057cec8292efd25",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4820,
        "wires": [
            []
        ]
    },
    {
        "id": "a94921518112b4bf",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '10'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4860,
        "wires": [
            [
                "3c0f8e6786bfa87d"
            ]
        ]
    },
    {
        "id": "93dd1b150c9eaa1a",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 4900,
        "wires": [
            []
        ]
    },
    {
        "id": "27946dd3927852e2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 4940,
        "wires": [
            []
        ]
    },
    {
        "id": "73a52cefac17f531",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4980,
        "wires": [
            []
        ]
    },
    {
        "id": "c00eb142076ba3e5",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5020,
        "wires": [
            []
        ]
    },
    {
        "id": "eaf376aee4b0b7a3",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '10' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '10' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5060,
        "wires": [
            [
                "5c5fe4d3a69d734d",
                "52d0d911d3ef9941"
            ]
        ]
    },
    {
        "id": "136c5bb6118fd5a2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5100,
        "wires": [
            []
        ]
    },
    {
        "id": "aed289865540e428",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 5140,
        "wires": [
            []
        ]
    },
    {
        "id": "ee14f807eb31c4b0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5180,
        "wires": [
            []
        ]
    },
    {
        "id": "7b7d996096fe4c5f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR11_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '11'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5320,
        "wires": [
            []
        ]
    },
    {
        "id": "fe4e30479495fd72",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR11_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '11'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5360,
        "wires": [
            []
        ]
    },
    {
        "id": "ac9ea614307c0afe",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5400,
        "wires": [
            []
        ]
    },
    {
        "id": "b8cb8022ea99c4b5",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR11_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '11'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5440,
        "wires": [
            [
                "2f102623d42d335c"
            ]
        ]
    },
    {
        "id": "3d9c6ce074d736b8",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5480,
        "wires": [
            []
        ]
    },
    {
        "id": "06136f5fc93e2ea3",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 5520,
        "wires": [
            []
        ]
    },
    {
        "id": "8a1c5d8df3fc26c2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5560,
        "wires": [
            []
        ]
    },
    {
        "id": "c1639bf7ce84ec60",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5600,
        "wires": [
            []
        ]
    },
    {
        "id": "a3e3ac7fa39e2c44",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR11_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '11' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '11' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5640,
        "wires": [
            [
                "761799d0142e1d4e",
                "2a62d796ca48f3db"
            ]
        ]
    },
    {
        "id": "5559abe4e149d293",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5680,
        "wires": [
            []
        ]
    },
    {
        "id": "13b4147265678fe0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 5720,
        "wires": [
            []
        ]
    },
    {
        "id": "93393ec3050e9862",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5760,
        "wires": [
            []
        ]
    },
    {
        "id": "58dfc73895dfbe97",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR11",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 550,
        "y": 5320,
        "wires": [
            [
                "7b7d996096fe4c5f",
                "fe4e30479495fd72",
                "ac9ea614307c0afe",
                "b8cb8022ea99c4b5",
                "3d9c6ce074d736b8",
                "06136f5fc93e2ea3",
                "8a1c5d8df3fc26c2",
                "c1639bf7ce84ec60",
                "a3e3ac7fa39e2c44",
                "5559abe4e149d293",
                "13b4147265678fe0",
                "93393ec3050e9862"
            ]
        ]
    },
    {
        "id": "ec94d116f641c60a",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR12_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '12'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 5820,
        "wires": [
            []
        ]
    },
    {
        "id": "76665540c45621f1",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR12_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '12'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5860,
        "wires": [
            []
        ]
    },
    {
        "id": "a95cb975d704157f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5900,
        "wires": [
            []
        ]
    },
    {
        "id": "e9692b9f56167693",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR12_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '12'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5940,
        "wires": [
            [
                "0ed9452895bb2d8a"
            ]
        ]
    },
    {
        "id": "f3c3a5fd650431f7",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 5980,
        "wires": [
            []
        ]
    },
    {
        "id": "ab7afb9a05efb582",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 6020,
        "wires": [
            []
        ]
    },
    {
        "id": "ab65cd2c2f68ce80",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 6060,
        "wires": [
            []
        ]
    },
    {
        "id": "bbd16aaa11a0b178",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 6100,
        "wires": [
            []
        ]
    },
    {
        "id": "2a333d1b83ad02e2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR12_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '12' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '12' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 6140,
        "wires": [
            [
                "19ddb7adf7048a4a",
                "5b765acdb2a722a5"
            ]
        ]
    },
    {
        "id": "f51c0bc44b780a50",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 6180,
        "wires": [
            []
        ]
    },
    {
        "id": "f065339bbf579401",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 6220,
        "wires": [
            []
        ]
    },
    {
        "id": "55bf3df269bf8d40",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 6260,
        "wires": [
            []
        ]
    },
    {
        "id": "f766c7d3d82f23da",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR12",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 550,
        "y": 5820,
        "wires": [
            [
                "ec94d116f641c60a",
                "76665540c45621f1",
                "a95cb975d704157f",
                "e9692b9f56167693",
                "f3c3a5fd650431f7",
                "ab7afb9a05efb582",
                "ab65cd2c2f68ce80",
                "bbd16aaa11a0b178",
                "2a333d1b83ad02e2",
                "f51c0bc44b780a50",
                "f065339bbf579401",
                "55bf3df269bf8d40"
            ]
        ]
    },
    {
        "id": "b17852003d9ef01b",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR9",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 550,
        "y": 4240,
        "wires": [
            [
                "696d6a56fae6e854",
                "4864fa01cb5fa3a0",
                "50e579b7953bbc86",
                "4aedb103821dd780",
                "b250817d55c5727d",
                "cd15819d74360842",
                "588b4a55e7aa8aa0",
                "079d28e430d46fc9",
                "f52b9bb6a0909374",
                "ed5efb161edb6cda",
                "c6b59cef0794c7a1"
            ]
        ]
    },
    {
        "id": "696d6a56fae6e854",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR9_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '9'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4240,
        "wires": [
            []
        ]
    },
    {
        "id": "4864fa01cb5fa3a0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 4280,
        "wires": [
            []
        ]
    },
    {
        "id": "88d67f4fb42e5776",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4320,
        "wires": [
            []
        ]
    },
    {
        "id": "50e579b7953bbc86",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR9_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '9'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4360,
        "wires": [
            [
                "af6de4e15086b4fe"
            ]
        ]
    },
    {
        "id": "4aedb103821dd780",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 4400,
        "wires": [
            []
        ]
    },
    {
        "id": "b250817d55c5727d",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 4440,
        "wires": [
            []
        ]
    },
    {
        "id": "cd15819d74360842",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4480,
        "wires": [
            []
        ]
    },
    {
        "id": "588b4a55e7aa8aa0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 4520,
        "wires": [
            []
        ]
    },
    {
        "id": "079d28e430d46fc9",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR9_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '9' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '9' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4560,
        "wires": [
            [
                "a8a3ba53b1a8ab34",
                "363ceea1c7f3600d"
            ]
        ]
    },
    {
        "id": "f52b9bb6a0909374",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 4600,
        "wires": [
            []
        ]
    },
    {
        "id": "ed5efb161edb6cda",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 4640,
        "wires": [
            []
        ]
    },
    {
        "id": "c6b59cef0794c7a1",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4680,
        "wires": [
            []
        ]
    },
    {
        "id": "a2fc3821ff5bbd75",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR3",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 1160,
        "wires": [
            [
                "6071f8d4d417f77a",
                "0abd9a25c53b9570",
                "62f24c9246857683",
                "bdca77fea60248ce",
                "dd14ce543ae429f0",
                "9365e5d641f97445",
                "77b21d03cf6c132f",
                "8787ca9a38222aa2",
                "5e1b9ee4c7e4ec38",
                "52566933086f259f",
                "d279430739c4d3c7",
                "03f07ce1ef4faf49"
            ]
        ]
    },
    {
        "id": "6071f8d4d417f77a",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR3_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '3'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1160,
        "wires": [
            []
        ]
    },
    {
        "id": "0abd9a25c53b9570",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1200,
        "wires": [
            []
        ]
    },
    {
        "id": "03f07ce1ef4faf49",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1240,
        "wires": [
            []
        ]
    },
    {
        "id": "62f24c9246857683",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR3_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '3'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1280,
        "wires": [
            [
                "3382367243be9106"
            ]
        ]
    },
    {
        "id": "bdca77fea60248ce",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1320,
        "wires": [
            []
        ]
    },
    {
        "id": "dd14ce543ae429f0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 1360,
        "wires": [
            []
        ]
    },
    {
        "id": "9365e5d641f97445",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1400,
        "wires": [
            []
        ]
    },
    {
        "id": "77b21d03cf6c132f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1440,
        "wires": [
            []
        ]
    },
    {
        "id": "8787ca9a38222aa2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR3_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '3' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '3' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1480,
        "wires": [
            [
                "0f6328bf133cce3c",
                "2b4182e2f2f666e8"
            ]
        ]
    },
    {
        "id": "5e1b9ee4c7e4ec38",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1520,
        "wires": [
            []
        ]
    },
    {
        "id": "52566933086f259f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 1560,
        "wires": [
            []
        ]
    },
    {
        "id": "d279430739c4d3c7",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1600,
        "wires": [
            []
        ]
    },
    {
        "id": "173b88ab519ec236",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR1",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 160,
        "wires": [
            [
                "aa119d1562b807ec",
                "051bd77d91be6d9f",
                "2135e7c2a7955073",
                "29f18dcfadb0387f",
                "fb869e1b14ca905c",
                "1717adc311a3dff5",
                "6e74034281096e40",
                "2d469485634716e1",
                "ab2026762ad5e1db",
                "8188fb80603c96ec",
                "eb3a0f4b811ccea0",
                "01b099883648604a",
                "f38fb3df1d38709e"
            ]
        ]
    },
    {
        "id": "aa119d1562b807ec",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR1_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '1'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "051bd77d91be6d9f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 200,
        "wires": [
            []
        ]
    },
    {
        "id": "f38fb3df1d38709e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 240,
        "wires": [
            []
        ]
    },
    {
        "id": "2135e7c2a7955073",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR1_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '1'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 280,
        "wires": [
            [
                "dd5e90a9d41182a5"
            ]
        ]
    },
    {
        "id": "29f18dcfadb0387f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 320,
        "wires": [
            []
        ]
    },
    {
        "id": "fb869e1b14ca905c",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 360,
        "wires": [
            []
        ]
    },
    {
        "id": "1717adc311a3dff5",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 400,
        "wires": [
            []
        ]
    },
    {
        "id": "6e74034281096e40",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "2d469485634716e1",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR1_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '1' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '1' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 480,
        "wires": [
            [
                "0a01895990d1175d",
                "4cd12756db3a29c8"
            ]
        ]
    },
    {
        "id": "ab2026762ad5e1db",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 520,
        "wires": [
            []
        ]
    },
    {
        "id": "8188fb80603c96ec",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 560,
        "wires": [
            []
        ]
    },
    {
        "id": "eb3a0f4b811ccea0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 600,
        "wires": [
            []
        ]
    },
    {
        "id": "c404c88ece0f07fa",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR2",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 660,
        "wires": [
            [
                "40f30d03eab5a546",
                "245a9461d1b651d3",
                "aaa55b4f18ab2ece",
                "7fbb3d2a484ccb73",
                "4a847a3f24e72079",
                "dae5156ad64c6e97",
                "08d06de745f3c608",
                "29987a1a821ccdf0",
                "ea74ee2b19a8abc8",
                "517d99d7056b5309",
                "312947d4ed16a094",
                "76261ade711ed3e7"
            ]
        ]
    },
    {
        "id": "40f30d03eab5a546",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR2_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '2'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 660,
        "wires": [
            []
        ]
    },
    {
        "id": "245a9461d1b651d3",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 700,
        "wires": [
            []
        ]
    },
    {
        "id": "76261ade711ed3e7",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 740,
        "wires": [
            []
        ]
    },
    {
        "id": "aaa55b4f18ab2ece",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR2_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '2'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 780,
        "wires": [
            [
                "c0c2a0bbf68d440f"
            ]
        ]
    },
    {
        "id": "7fbb3d2a484ccb73",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 820,
        "wires": [
            []
        ]
    },
    {
        "id": "4a847a3f24e72079",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 860,
        "wires": [
            []
        ]
    },
    {
        "id": "dae5156ad64c6e97",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 900,
        "wires": [
            []
        ]
    },
    {
        "id": "08d06de745f3c608",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 940,
        "wires": [
            []
        ]
    },
    {
        "id": "29987a1a821ccdf0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR2_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif (line_id === '2' && status === 'START') {\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n} else if (line_id === '2' && status === 'STOP') {\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 980,
        "wires": [
            [
                "072460d488dcd140",
                "f179c873ba2cea5b"
            ]
        ]
    },
    {
        "id": "ea74ee2b19a8abc8",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1020,
        "wires": [
            []
        ]
    },
    {
        "id": "517d99d7056b5309",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 1060,
        "wires": [
            []
        ]
    },
    {
        "id": "312947d4ed16a094",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1100,
        "wires": [
            []
        ]
    },
    {
        "id": "16be6aabbf96eef3",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR4",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 1660,
        "wires": [
            [
                "d93a0fc9d2ea6fe6",
                "c0031d9b631b317e",
                "b1c719ce0d4fe6ab",
                "78ada6236e5208fc",
                "ef1f92ab9c0d2688",
                "cc43c70958b67ffb",
                "17831ce39495b573",
                "16b3d68deaa50358",
                "ec467cdcecf3f236",
                "040ea2e06380eeb3",
                "9c068674f811c6ae",
                "99cec5febe48dab9"
            ]
        ]
    },
    {
        "id": "d93a0fc9d2ea6fe6",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR4_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '4'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1660,
        "wires": [
            []
        ]
    },
    {
        "id": "c0031d9b631b317e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1700,
        "wires": [
            []
        ]
    },
    {
        "id": "99cec5febe48dab9",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1740,
        "wires": [
            []
        ]
    },
    {
        "id": "b1c719ce0d4fe6ab",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR4_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '4'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1780,
        "wires": [
            [
                "2da9b9494297b44c"
            ]
        ]
    },
    {
        "id": "78ada6236e5208fc",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1820,
        "wires": [
            []
        ]
    },
    {
        "id": "ef1f92ab9c0d2688",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 1860,
        "wires": [
            []
        ]
    },
    {
        "id": "cc43c70958b67ffb",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1900,
        "wires": [
            []
        ]
    },
    {
        "id": "17831ce39495b573",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 1940,
        "wires": [
            []
        ]
    },
    {
        "id": "16b3d68deaa50358",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR4_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '4' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '4' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1980,
        "wires": [
            [
                "3a372867e55b19cf",
                "20efc1202858dc23"
            ]
        ]
    },
    {
        "id": "ec467cdcecf3f236",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2020,
        "wires": [
            []
        ]
    },
    {
        "id": "040ea2e06380eeb3",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 2060,
        "wires": [
            []
        ]
    },
    {
        "id": "9c068674f811c6ae",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2100,
        "wires": [
            []
        ]
    },
    {
        "id": "192acfdc46d1ec99",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR5",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 2160,
        "wires": [
            [
                "6d7e939b445064b2",
                "f4bb56de19d3dae1",
                "ab093e4bb7d7de0f",
                "812cc04e7990a312",
                "628f6f7790e63253",
                "8e4256c80970b09d",
                "125f33afcb1d3cf0",
                "8e408b1e3b531a12",
                "36cb9345cd6e7720",
                "d376fed23a7d1a31",
                "42e69025c403c51d",
                "05081e9970e42346"
            ]
        ]
    },
    {
        "id": "6d7e939b445064b2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR5_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '5'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2160,
        "wires": [
            []
        ]
    },
    {
        "id": "f4bb56de19d3dae1",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2200,
        "wires": [
            []
        ]
    },
    {
        "id": "05081e9970e42346",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2240,
        "wires": [
            []
        ]
    },
    {
        "id": "ab093e4bb7d7de0f",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR5_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '5'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2280,
        "wires": [
            [
                "3e287f37413e6815"
            ]
        ]
    },
    {
        "id": "812cc04e7990a312",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2320,
        "wires": [
            []
        ]
    },
    {
        "id": "628f6f7790e63253",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 2360,
        "wires": [
            []
        ]
    },
    {
        "id": "8e4256c80970b09d",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2400,
        "wires": [
            []
        ]
    },
    {
        "id": "125f33afcb1d3cf0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2440,
        "wires": [
            []
        ]
    },
    {
        "id": "8e408b1e3b531a12",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR5_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '5' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '5' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2480,
        "wires": [
            [
                "97272c1d03e043dc",
                "6e35f0a67a3a5c5a"
            ]
        ]
    },
    {
        "id": "36cb9345cd6e7720",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2520,
        "wires": [
            []
        ]
    },
    {
        "id": "d376fed23a7d1a31",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 2560,
        "wires": [
            []
        ]
    },
    {
        "id": "42e69025c403c51d",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2600,
        "wires": [
            []
        ]
    },
    {
        "id": "97da838c9783cf9d",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR6",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 2660,
        "wires": [
            [
                "04ab7c399eb3d12a",
                "8c777ccaf6fc3645",
                "0f14db48930a9bf9",
                "b7d292e81aa20259",
                "9f78d82ddf262c5b",
                "71465be29981262e",
                "011fb408ccf3da54",
                "a263524f66ab69d5",
                "efafa40e32a65f4a",
                "089638c7f8f50d09",
                "da0842634a4471b0",
                "fbf03dc63c75cb04"
            ]
        ]
    },
    {
        "id": "04ab7c399eb3d12a",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR6_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '6'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2660,
        "wires": [
            []
        ]
    },
    {
        "id": "8c777ccaf6fc3645",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2700,
        "wires": [
            []
        ]
    },
    {
        "id": "fbf03dc63c75cb04",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2740,
        "wires": [
            []
        ]
    },
    {
        "id": "0f14db48930a9bf9",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR6_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '6'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2780,
        "wires": [
            [
                "fba2430c7fccc27a"
            ]
        ]
    },
    {
        "id": "b7d292e81aa20259",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2820,
        "wires": [
            []
        ]
    },
    {
        "id": "9f78d82ddf262c5b",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 2860,
        "wires": [
            []
        ]
    },
    {
        "id": "71465be29981262e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2900,
        "wires": [
            []
        ]
    },
    {
        "id": "011fb408ccf3da54",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 2940,
        "wires": [
            []
        ]
    },
    {
        "id": "a263524f66ab69d5",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR6_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '6' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '6' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2980,
        "wires": [
            [
                "358279ed3eac573d",
                "c1628697e0577a0c"
            ]
        ]
    },
    {
        "id": "efafa40e32a65f4a",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3020,
        "wires": [
            []
        ]
    },
    {
        "id": "089638c7f8f50d09",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 3060,
        "wires": [
            []
        ]
    },
    {
        "id": "da0842634a4471b0",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3100,
        "wires": [
            []
        ]
    },
    {
        "id": "3f6270e4bdd414a3",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR7",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 3160,
        "wires": [
            [
                "6615032d87e9ffb6",
                "8773bd3ab2c8f94b",
                "3d0e6d99dc747e93",
                "af0e16b5938ea369",
                "72df5402954c2717",
                "b1629dcd7c0c5671",
                "c0b43f51ab990851",
                "d83717371af8ecc9",
                "cd2da3aaca95e883",
                "819352c7d2869a82",
                "46bdf61e3654275a",
                "76ad9e52cef0c3eb"
            ]
        ]
    },
    {
        "id": "6615032d87e9ffb6",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR7_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '7'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3160,
        "wires": [
            []
        ]
    },
    {
        "id": "8773bd3ab2c8f94b",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3200,
        "wires": [
            []
        ]
    },
    {
        "id": "76ad9e52cef0c3eb",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3240,
        "wires": [
            []
        ]
    },
    {
        "id": "3d0e6d99dc747e93",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR7_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '7'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3280,
        "wires": [
            [
                "45b6c1ae657c8c0a"
            ]
        ]
    },
    {
        "id": "af0e16b5938ea369",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3320,
        "wires": [
            []
        ]
    },
    {
        "id": "72df5402954c2717",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 3360,
        "wires": [
            []
        ]
    },
    {
        "id": "b1629dcd7c0c5671",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3400,
        "wires": [
            []
        ]
    },
    {
        "id": "c0b43f51ab990851",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3440,
        "wires": [
            []
        ]
    },
    {
        "id": "d83717371af8ecc9",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR7_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '7' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '7' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3480,
        "wires": [
            [
                "2ee3fab9e1f2216b",
                "691fc3b86d5bf024"
            ]
        ]
    },
    {
        "id": "cd2da3aaca95e883",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3520,
        "wires": [
            []
        ]
    },
    {
        "id": "819352c7d2869a82",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 3560,
        "wires": [
            []
        ]
    },
    {
        "id": "46bdf61e3654275a",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3600,
        "wires": [
            []
        ]
    },
    {
        "id": "868ae96c9cac9801",
        "type": "string",
        "z": "f609497bdd1f4d64",
        "name": "montiv CR8",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 510,
        "y": 3660,
        "wires": [
            [
                "db1993e9c4ceaaba",
                "a9c450271df61e69",
                "6e4c08f8df1f9e71",
                "3c57f40771979ca6",
                "3d89c3cf4c0dac34",
                "409d354e847b3bf5",
                "c42ad621e671bf92",
                "7c6744b15501b14b",
                "61a9da26cf2db713",
                "f3fc62e0ea1a89f2",
                "254475e22ebabe70",
                "91d52edb168cdf08"
            ]
        ]
    },
    {
        "id": "db1993e9c4ceaaba",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR7_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '7'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3660,
        "wires": [
            []
        ]
    },
    {
        "id": "a9c450271df61e69",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3700,
        "wires": [
            []
        ]
    },
    {
        "id": "91d52edb168cdf08",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3740,
        "wires": [
            []
        ]
    },
    {
        "id": "6e4c08f8df1f9e71",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR8_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '8'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3780,
        "wires": [
            [
                "d945bf234fea455f"
            ]
        ]
    },
    {
        "id": "3c57f40771979ca6",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3820,
        "wires": [
            []
        ]
    },
    {
        "id": "3d89c3cf4c0dac34",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 3860,
        "wires": [
            []
        ]
    },
    {
        "id": "409d354e847b3bf5",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3900,
        "wires": [
            []
        ]
    },
    {
        "id": "c42ad621e671bf92",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 3940,
        "wires": [
            []
        ]
    },
    {
        "id": "7c6744b15501b14b",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR8_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '8' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '8' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3980,
        "wires": [
            [
                "a2a955e96b7f306a",
                "a8dfa4398153ca69"
            ]
        ]
    },
    {
        "id": "61a9da26cf2db713",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4020,
        "wires": [
            []
        ]
    },
    {
        "id": "f3fc62e0ea1a89f2",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 4060,
        "wires": [
            []
        ]
    },
    {
        "id": "254475e22ebabe70",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 4100,
        "wires": [
            []
        ]
    },
    {
        "id": "01b099883648604a",
        "type": "debug",
        "z": "f609497bdd1f4d64",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 650,
        "y": 100,
        "wires": []
    },
    {
        "id": "e4e208b6929e68a4",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR12",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 750,
        "wires": [
            [
                "0ed9452895bb2d8a"
            ]
        ]
    },
    {
        "id": "d2a098861484ce52",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR11",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 720,
        "wires": [
            [
                "2f102623d42d335c"
            ]
        ]
    },
    {
        "id": "c94811c80c12bfcc",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR10",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 690,
        "wires": [
            [
                "3c0f8e6786bfa87d"
            ]
        ]
    },
    {
        "id": "7c8294596b11fb35",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR9",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 660,
        "wires": [
            [
                "af6de4e15086b4fe"
            ]
        ]
    },
    {
        "id": "316321f217c9efd9",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR8",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 630,
        "wires": [
            [
                "d945bf234fea455f"
            ]
        ]
    },
    {
        "id": "857ed657be499907",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR7",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 600,
        "wires": [
            [
                "45b6c1ae657c8c0a"
            ]
        ]
    },
    {
        "id": "ededa01c0cd0e6f7",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR5",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 540,
        "wires": [
            [
                "3e287f37413e6815"
            ]
        ]
    },
    {
        "id": "fb1972b5e9ee3e2e",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR4",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 510,
        "wires": [
            [
                "2da9b9494297b44c"
            ]
        ]
    },
    {
        "id": "080897eb4c8588e9",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR6",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 570,
        "wires": [
            [
                "fba2430c7fccc27a"
            ]
        ]
    },
    {
        "id": "8b883d202faaa297",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR3",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 480,
        "wires": [
            [
                "3382367243be9106"
            ]
        ]
    },
    {
        "id": "14b43acf737acc00",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR1",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 420,
        "wires": [
            [
                "dd5e90a9d41182a5"
            ]
        ]
    },
    {
        "id": "d322e35e23ea26b7",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "CR2",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1190,
        "y": 450,
        "wires": [
            [
                "c0c2a0bbf68d440f"
            ]
        ]
    },
    {
        "id": "49970b2b1222317f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "2,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "2,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 720,
        "wires": [
            [
                "c404c88ece0f07fa"
            ]
        ]
    },
    {
        "id": "33568bd42b654eee",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "3,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "3,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 1220,
        "wires": [
            [
                "a2fc3821ff5bbd75"
            ]
        ]
    },
    {
        "id": "ca8297d40bd74629",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "4,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "4,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 1720,
        "wires": [
            [
                "16be6aabbf96eef3"
            ]
        ]
    },
    {
        "id": "f2342af543f929a3",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "5,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "5,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 2220,
        "wires": [
            [
                "192acfdc46d1ec99"
            ]
        ]
    },
    {
        "id": "c3c5d207115baac2",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "6,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 2720,
        "wires": [
            [
                "97da838c9783cf9d"
            ]
        ]
    },
    {
        "id": "9de98b12ea440c11",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "7,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "7,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 3220,
        "wires": [
            [
                "3f6270e4bdd414a3"
            ]
        ]
    },
    {
        "id": "15ed25a5a6a38e6b",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "8,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "8,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 3720,
        "wires": [
            [
                "868ae96c9cac9801"
            ]
        ]
    },
    {
        "id": "099e3e8d0530a08b",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "9,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "9,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 320,
        "y": 4300,
        "wires": [
            [
                "b17852003d9ef01b"
            ]
        ]
    },
    {
        "id": "871032963bf32f81",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "10,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 330,
        "y": 4800,
        "wires": [
            [
                "cd93302ba6d39bf7"
            ]
        ]
    },
    {
        "id": "ed3f9c8aa6c8d0f5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "11,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "11,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 330,
        "y": 5380,
        "wires": [
            [
                "58dfc73895dfbe97"
            ]
        ]
    },
    {
        "id": "24c7364a02479431",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "12,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "12,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 330,
        "y": 5880,
        "wires": [
            [
                "f766c7d3d82f23da"
            ]
        ]
    },
    {
        "id": "24f3dec1a39fcfd4",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR12",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1650,
        "wires": [
            [
                "19ddb7adf7048a4a"
            ]
        ]
    },
    {
        "id": "82cb808550c18181",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR11",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1620,
        "wires": [
            [
                "761799d0142e1d4e"
            ]
        ]
    },
    {
        "id": "f1e20795c917464c",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR10",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1590,
        "wires": [
            [
                "5c5fe4d3a69d734d"
            ]
        ]
    },
    {
        "id": "9830e950587d5d9f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR9",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1560,
        "wires": [
            [
                "a8a3ba53b1a8ab34"
            ]
        ]
    },
    {
        "id": "82b72fdbe3d9cc5f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR8",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1530,
        "wires": [
            [
                "a2a955e96b7f306a"
            ]
        ]
    },
    {
        "id": "217d58bc8b4751e6",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR7",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1500,
        "wires": [
            [
                "2ee3fab9e1f2216b"
            ]
        ]
    },
    {
        "id": "8d1667e817a64f7c",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR5",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1440,
        "wires": [
            [
                "97272c1d03e043dc"
            ]
        ]
    },
    {
        "id": "5a94aeb70fc4669f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR4",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1410,
        "wires": [
            [
                "3a372867e55b19cf"
            ]
        ]
    },
    {
        "id": "374c0b51f348ab65",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR6",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1470,
        "wires": [
            [
                "358279ed3eac573d"
            ]
        ]
    },
    {
        "id": "eccacfe7f64ec92f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR3",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1380,
        "wires": [
            [
                "0f6328bf133cce3c"
            ]
        ]
    },
    {
        "id": "84730dc4c8f76c2e",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "10",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1420,
        "y": 1320,
        "wires": [
            [
                "0a01895990d1175d"
            ]
        ]
    },
    {
        "id": "f8a23301bccde346",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR2",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 1350,
        "wires": [
            [
                "072460d488dcd140"
            ]
        ]
    },
    {
        "id": "59934dd05256ff09",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "1,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "1,PART,242,0,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 280,
        "wires": [
            [
                "173b88ab519ec236"
            ]
        ]
    },
    {
        "id": "5272e5bc361412d5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "2,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "2,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 760,
        "wires": [
            [
                "c404c88ece0f07fa"
            ]
        ]
    },
    {
        "id": "1425f4fd3eb274af",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "3,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "3,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 1260,
        "wires": [
            [
                "a2fc3821ff5bbd75"
            ]
        ]
    },
    {
        "id": "51d0dcd11dc25eb5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "5,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "5,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 2260,
        "wires": [
            [
                "192acfdc46d1ec99"
            ]
        ]
    },
    {
        "id": "cfc8d8356dd8557b",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "6,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 2760,
        "wires": [
            [
                "97da838c9783cf9d"
            ]
        ]
    },
    {
        "id": "83e544571cb013d5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "7,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "7,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 3260,
        "wires": [
            [
                "3f6270e4bdd414a3"
            ]
        ]
    },
    {
        "id": "72015c0d24e055be",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "8,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "8,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 3760,
        "wires": [
            [
                "868ae96c9cac9801"
            ]
        ]
    },
    {
        "id": "ae567e1d0e7a3848",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "9,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "9,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 320,
        "y": 4340,
        "wires": [
            [
                "b17852003d9ef01b"
            ]
        ]
    },
    {
        "id": "ca951ae35b8a038b",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "10,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 320,
        "y": 4840,
        "wires": [
            [
                "cd93302ba6d39bf7"
            ]
        ]
    },
    {
        "id": "86a51af6c85cb338",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "11,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "11,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 320,
        "y": 5420,
        "wires": [
            [
                "58dfc73895dfbe97"
            ]
        ]
    },
    {
        "id": "3f9d72c737cc3232",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "12,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "12,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 320,
        "y": 5920,
        "wires": [
            [
                "f766c7d3d82f23da"
            ]
        ]
    },
    {
        "id": "0ff8938c899e07af",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR12",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 3070,
        "wires": [
            [
                "5b765acdb2a722a5"
            ]
        ]
    },
    {
        "id": "a5241812ec38fdfb",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR11",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 3040,
        "wires": [
            [
                "2a62d796ca48f3db"
            ]
        ]
    },
    {
        "id": "aa88a6a69bbc7e34",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR10",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 3010,
        "wires": [
            [
                "52d0d911d3ef9941"
            ]
        ]
    },
    {
        "id": "050a082419a0e017",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR9",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2980,
        "wires": [
            [
                "363ceea1c7f3600d"
            ]
        ]
    },
    {
        "id": "940cbedfb9da5b22",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR8",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2950,
        "wires": [
            [
                "a8dfa4398153ca69"
            ]
        ]
    },
    {
        "id": "677f3d47ae7f67bf",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR7",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2920,
        "wires": [
            [
                "691fc3b86d5bf024"
            ]
        ]
    },
    {
        "id": "da52ed6c89ca5d7f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR5",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2860,
        "wires": [
            [
                "6e35f0a67a3a5c5a"
            ]
        ]
    },
    {
        "id": "0e439bc5c1901d4c",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR4",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2830,
        "wires": [
            [
                "20efc1202858dc23"
            ]
        ]
    },
    {
        "id": "428a1e58e85a7a6a",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR6",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2890,
        "wires": [
            [
                "c1628697e0577a0c"
            ]
        ]
    },
    {
        "id": "b25eb24881432907",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR3",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2800,
        "wires": [
            [
                "2b4182e2f2f666e8"
            ]
        ]
    },
    {
        "id": "0e141b54594383d1",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "10",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1420,
        "y": 2740,
        "wires": [
            [
                "4cd12756db3a29c8"
            ]
        ]
    },
    {
        "id": "99acb1b645a9abbb",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "ON CR2",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1420,
        "y": 2770,
        "wires": [
            [
                "f179c873ba2cea5b"
            ]
        ]
    },
    {
        "id": "6cb03fc02b2541ad",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR12",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 4020,
        "wires": [
            [
                "5b765acdb2a722a5"
            ]
        ]
    },
    {
        "id": "88948dd11350031c",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR11",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3990,
        "wires": [
            [
                "2a62d796ca48f3db"
            ]
        ]
    },
    {
        "id": "2b1ec58f5f46b3e5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR10",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3960,
        "wires": [
            [
                "52d0d911d3ef9941"
            ]
        ]
    },
    {
        "id": "92baa3ceae5ec425",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR9",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3930,
        "wires": [
            [
                "363ceea1c7f3600d"
            ]
        ]
    },
    {
        "id": "d1c723743d6a4eb5",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR8",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3900,
        "wires": [
            [
                "a8dfa4398153ca69"
            ]
        ]
    },
    {
        "id": "fa25c42a2461a42f",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR7",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3870,
        "wires": [
            [
                "691fc3b86d5bf024"
            ]
        ]
    },
    {
        "id": "313e169a8cb3c735",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR5",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3810,
        "wires": [
            [
                "6e35f0a67a3a5c5a"
            ]
        ]
    },
    {
        "id": "29d5e96c88f55bfa",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR4",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3780,
        "wires": [
            [
                "20efc1202858dc23"
            ]
        ]
    },
    {
        "id": "1115090e1b5dd448",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR6",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3840,
        "wires": [
            [
                "c1628697e0577a0c"
            ]
        ]
    },
    {
        "id": "044f472080d65400",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR3",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3750,
        "wires": [
            [
                "2b4182e2f2f666e8"
            ]
        ]
    },
    {
        "id": "b20d58c8a16e29fd",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "0",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1440,
        "y": 3690,
        "wires": [
            [
                "4cd12756db3a29c8"
            ]
        ]
    },
    {
        "id": "c8c6f5b793fbfd0a",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "OFF CR2",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1440,
        "y": 3720,
        "wires": [
            [
                "f179c873ba2cea5b"
            ]
        ]
    },
    {
        "id": "57fc6927ec22615a",
        "type": "inject",
        "z": "f609497bdd1f4d64",
        "name": "4,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "4,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 1760,
        "wires": [
            [
                "16be6aabbf96eef3"
            ]
        ]
    },
    {
        "id": "cd52b99e0ffd1ecd",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 13,
        "width": 8,
        "height": 1,
        "passthru": false,
        "label": "Start Reset ALL",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1020,
        "y": 2620,
        "wires": [
            [
                "7d3dd7a837690705"
            ]
        ]
    },
    {
        "id": "6e60a24bfbc30a72",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 13,
        "width": 0,
        "height": 0,
        "passthru": false,
        "label": "Stop Reset ALL",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1020,
        "y": 2660,
        "wires": [
            [
                "227da3d104445cfb"
            ]
        ]
    },
    {
        "id": "227da3d104445cfb",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '0';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 2700,
        "wires": [
            [
                "4cd12756db3a29c8",
                "f179c873ba2cea5b",
                "2b4182e2f2f666e8",
                "20efc1202858dc23",
                "6e35f0a67a3a5c5a",
                "c1628697e0577a0c",
                "691fc3b86d5bf024",
                "a8dfa4398153ca69",
                "363ceea1c7f3600d",
                "52d0d911d3ef9941",
                "2a62d796ca48f3db",
                "5b765acdb2a722a5"
            ]
        ]
    },
    {
        "id": "7d3dd7a837690705",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '0';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 2580,
        "wires": [
            [
                "19ddb7adf7048a4a",
                "761799d0142e1d4e",
                "5c5fe4d3a69d734d",
                "a8a3ba53b1a8ab34",
                "a2a955e96b7f306a",
                "2ee3fab9e1f2216b",
                "358279ed3eac573d",
                "97272c1d03e043dc",
                "3a372867e55b19cf",
                "0f6328bf133cce3c",
                "072460d488dcd140",
                "0a01895990d1175d"
            ]
        ]
    },
    {
        "id": "f272042955bd3a29",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 14,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR1",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 1780,
        "wires": [
            [
                "2fdd2a1e4d217702"
            ]
        ]
    },
    {
        "id": "2fdd2a1e4d217702",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1780,
        "wires": [
            [
                "0a01895990d1175d"
            ]
        ]
    },
    {
        "id": "82f3c8cddcb9c291",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 15,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR2",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 1820,
        "wires": [
            [
                "56a54df75f927c2e"
            ]
        ]
    },
    {
        "id": "56a54df75f927c2e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1820,
        "wires": [
            [
                "072460d488dcd140"
            ]
        ]
    },
    {
        "id": "9915df11dcf42a9b",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 16,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR3",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 1860,
        "wires": [
            [
                "2dc368f777292fd9"
            ]
        ]
    },
    {
        "id": "2dc368f777292fd9",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1860,
        "wires": [
            [
                "0f6328bf133cce3c"
            ]
        ]
    },
    {
        "id": "19e2779edc81970c",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 17,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR4",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 1900,
        "wires": [
            [
                "fcc7a31c78c58140"
            ]
        ]
    },
    {
        "id": "fcc7a31c78c58140",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1900,
        "wires": [
            [
                "3a372867e55b19cf"
            ]
        ]
    },
    {
        "id": "fc6412a5358d3f47",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 18,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR5",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 1940,
        "wires": [
            [
                "d40172fe7aed0cfd"
            ]
        ]
    },
    {
        "id": "d40172fe7aed0cfd",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1940,
        "wires": [
            [
                "97272c1d03e043dc"
            ]
        ]
    },
    {
        "id": "82e621387f3e9a12",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 19,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR6",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 1980,
        "wires": [
            [
                "1a9ced71f90ab684"
            ]
        ]
    },
    {
        "id": "1a9ced71f90ab684",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 1980,
        "wires": [
            [
                "358279ed3eac573d"
            ]
        ]
    },
    {
        "id": "7c16b3ef9e21a72c",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 20,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR7",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 2020,
        "wires": [
            [
                "001d5c4fbac32917"
            ]
        ]
    },
    {
        "id": "001d5c4fbac32917",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2020,
        "wires": [
            [
                "2ee3fab9e1f2216b"
            ]
        ]
    },
    {
        "id": "285cbe3cb45a3cd9",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 21,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR8",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 2060,
        "wires": [
            [
                "793bf990bf3b69e3"
            ]
        ]
    },
    {
        "id": "793bf990bf3b69e3",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2060,
        "wires": [
            [
                "a2a955e96b7f306a"
            ]
        ]
    },
    {
        "id": "3db55ee90626e859",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 22,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR9",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1040,
        "y": 2100,
        "wires": [
            [
                "daa3632c068b93d6"
            ]
        ]
    },
    {
        "id": "daa3632c068b93d6",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2100,
        "wires": [
            [
                "a8a3ba53b1a8ab34"
            ]
        ]
    },
    {
        "id": "6e484d0d10f0e3f4",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 23,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR10",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1050,
        "y": 2140,
        "wires": [
            [
                "35a14203e5547b48"
            ]
        ]
    },
    {
        "id": "35a14203e5547b48",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2140,
        "wires": [
            [
                "5c5fe4d3a69d734d"
            ]
        ]
    },
    {
        "id": "e23bd2ac6289479e",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 24,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR11",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1050,
        "y": 2180,
        "wires": [
            [
                "aa195d686f26cdee"
            ]
        ]
    },
    {
        "id": "aa195d686f26cdee",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2180,
        "wires": [
            [
                "761799d0142e1d4e"
            ]
        ]
    },
    {
        "id": "0349d6b3f9645885",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 25,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR12",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1050,
        "y": 2220,
        "wires": [
            [
                "33b578713282679e"
            ]
        ]
    },
    {
        "id": "33b578713282679e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 2220,
        "wires": [
            [
                "19ddb7adf7048a4a"
            ]
        ]
    },
    {
        "id": "c438c5993045a1a0",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 14,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR1",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3180,
        "wires": [
            [
                "2cdeec4a32174970"
            ]
        ]
    },
    {
        "id": "2cdeec4a32174970",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3180,
        "wires": [
            [
                "4cd12756db3a29c8"
            ]
        ]
    },
    {
        "id": "9e856c918ef68d51",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 15,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR2",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3220,
        "wires": [
            [
                "25fe9e40cf3f75d9"
            ]
        ]
    },
    {
        "id": "25fe9e40cf3f75d9",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3220,
        "wires": [
            [
                "f179c873ba2cea5b"
            ]
        ]
    },
    {
        "id": "f6f3cf1da58b884e",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 16,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR3",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3260,
        "wires": [
            [
                "0e6f4e03d4bb2410"
            ]
        ]
    },
    {
        "id": "0e6f4e03d4bb2410",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3260,
        "wires": [
            [
                "2b4182e2f2f666e8"
            ]
        ]
    },
    {
        "id": "a72d42bab48ff1a9",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 17,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR4",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3300,
        "wires": [
            [
                "d767586d75f0e617"
            ]
        ]
    },
    {
        "id": "d767586d75f0e617",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3300,
        "wires": [
            [
                "20efc1202858dc23"
            ]
        ]
    },
    {
        "id": "d9e56ef068de441c",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 18,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR5",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3340,
        "wires": [
            [
                "72e7620a72b2363e"
            ]
        ]
    },
    {
        "id": "72e7620a72b2363e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3340,
        "wires": [
            [
                "6e35f0a67a3a5c5a"
            ]
        ]
    },
    {
        "id": "13091f426297efc8",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 19,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR6",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3380,
        "wires": [
            [
                "de4a901741455bac"
            ]
        ]
    },
    {
        "id": "de4a901741455bac",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3380,
        "wires": [
            [
                "c1628697e0577a0c"
            ]
        ]
    },
    {
        "id": "43df6086543c7f2e",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 20,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR7",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3420,
        "wires": [
            [
                "727863f8f9b0d991"
            ]
        ]
    },
    {
        "id": "727863f8f9b0d991",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3420,
        "wires": [
            [
                "691fc3b86d5bf024"
            ]
        ]
    },
    {
        "id": "97728964a7566e57",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 21,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR8",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3460,
        "wires": [
            [
                "05e1aacc103e4257"
            ]
        ]
    },
    {
        "id": "05e1aacc103e4257",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3460,
        "wires": [
            [
                "a8dfa4398153ca69"
            ]
        ]
    },
    {
        "id": "c95eeda2ec77599f",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 22,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR9",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1060,
        "y": 3500,
        "wires": [
            [
                "23f448cb6aa6cc95"
            ]
        ]
    },
    {
        "id": "23f448cb6aa6cc95",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3500,
        "wires": [
            [
                "363ceea1c7f3600d"
            ]
        ]
    },
    {
        "id": "6e375c27073eb5b5",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 23,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR10",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1070,
        "y": 3540,
        "wires": [
            [
                "174b0c5f760824aa"
            ]
        ]
    },
    {
        "id": "174b0c5f760824aa",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3540,
        "wires": [
            [
                "52d0d911d3ef9941"
            ]
        ]
    },
    {
        "id": "e4d6cb38ca2b1713",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 24,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR11",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1070,
        "y": 3580,
        "wires": [
            [
                "53347de934eefb7e"
            ]
        ]
    },
    {
        "id": "53347de934eefb7e",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3580,
        "wires": [
            [
                "2a62d796ca48f3db"
            ]
        ]
    },
    {
        "id": "3cd8b99e56b8d2c4",
        "type": "ui_button",
        "z": "f609497bdd1f4d64",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 25,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR12",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1070,
        "y": 3620,
        "wires": [
            [
                "b3a2c81e6bf5e60d"
            ]
        ]
    },
    {
        "id": "b3a2c81e6bf5e60d",
        "type": "function",
        "z": "f609497bdd1f4d64",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 3620,
        "wires": [
            [
                "5b765acdb2a722a5"
            ]
        ]
    },
    {
        "id": "b724fd700a861fe5",
        "type": "link in",
        "z": "f609497bdd1f4d64",
        "name": "link in 1",
        "links": [
            "8aa62f6faa4ca38e"
        ],
        "x": 185,
        "y": 100,
        "wires": [
            [
                "be837bc4e92d37f2",
                "cd93302ba6d39bf7",
                "58dfc73895dfbe97",
                "f766c7d3d82f23da",
                "b17852003d9ef01b",
                "a2fc3821ff5bbd75",
                "173b88ab519ec236",
                "c404c88ece0f07fa",
                "16be6aabbf96eef3",
                "192acfdc46d1ec99",
                "97da838c9783cf9d",
                "3f6270e4bdd414a3",
                "868ae96c9cac9801"
            ]
        ]
    },
    {
        "id": "3ccabc5e5ecb8654",
        "type": "ui_group",
        "name": "ALL_COMMON_RAIL_STOP",
        "tab": "93243cb4efa9a6a9",
        "order": 3,
        "disp": true,
        "width": 8,
        "collapse": false,
        "className": ""
    },
    {
        "id": "b966e997bd61c03b",
        "type": "ui_group",
        "name": "ALL_COMMON_RAIL_START",
        "tab": "93243cb4efa9a6a9",
        "order": 1,
        "disp": true,
        "width": 8,
        "collapse": false,
        "className": ""
    },
    {
        "id": "84bdaf9aa3b2d757",
        "type": "ui_group",
        "name": "ACTUAL PCS",
        "tab": "93243cb4efa9a6a9",
        "order": 2,
        "disp": true,
        "width": 4,
        "collapse": false,
        "className": ""
    },
    {
        "id": "93243cb4efa9a6a9",
        "type": "ui_tab",
        "name": "Otics Monitoring Manhour Start_Stop",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "e0491c88cc61058e",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-dashboard": "3.6.6",
            "node-red-contrib-string": "1.0.0"
        }
    }
]
