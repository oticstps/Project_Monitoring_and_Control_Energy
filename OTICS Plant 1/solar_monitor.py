# python solar_monitor.py
# pip install -r requirements.txt


#!/usr/bin/env python3
"""
Solar Panel Dashboard Monitor
- Pilih area deteksi di layar (bisa lebih dari 1)
- Screenshot setiap 1 menit
- OCR untuk membaca teks dari area tersebut
- Simpan ke media/update_area_N.jpg dan media/update_area_N.json
"""

import tkinter as tk
from tkinter import ttk, messagebox
import threading
import time
import os
import json
import re
from datetime import datetime
from PIL import Image, ImageTk, ImageGrab, ImageDraw, ImageFilter
import pytesseract
import mss
import mss.tools


# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
MEDIA_DIR = "media"
INTERVAL_SECONDS = 60  # 1 menit


# ─────────────────────────────────────────────
# AREA SELECTOR WINDOW
# ─────────────────────────────────────────────
class AreaSelector(tk.Toplevel):
    """Overlay transparan untuk drag-pilih area di layar."""

    def __init__(self, parent, callback):
        super().__init__(parent)
        self.callback = callback
        self.start_x = self.start_y = 0
        self.rect = None

        self.attributes("-fullscreen", True)
        self.attributes("-alpha", 0.35)
        self.attributes("-topmost", True)
        self.configure(bg="black", cursor="crosshair")

        self.canvas = tk.Canvas(self, bg="black", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)

        info = self.canvas.create_text(
            self.winfo_screenwidth() // 2, 40,
            text="🖱  Drag untuk pilih area • ESC untuk batal",
            fill="#00FF88", font=("Courier New", 18, "bold")
        )

        self.canvas.bind("<ButtonPress-1>", self.on_press)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)
        self.bind("<Escape>", lambda e: self.destroy())

    def on_press(self, event):
        self.start_x = event.x
        self.start_y = event.y
        if self.rect:
            self.canvas.delete(self.rect)

    def on_drag(self, event):
        if self.rect:
            self.canvas.delete(self.rect)
        self.rect = self.canvas.create_rectangle(
            self.start_x, self.start_y, event.x, event.y,
            outline="#00FF88", width=2, fill="#00FF88", stipple="gray12"
        )

    def on_release(self, event):
        x1 = min(self.start_x, event.x)
        y1 = min(self.start_y, event.y)
        x2 = max(self.start_x, event.x)
        y2 = max(self.start_y, event.y)
        self.destroy()
        if (x2 - x1) > 10 and (y2 - y1) > 10:
            self.callback(x1, y1, x2, y2)


# ─────────────────────────────────────────────
# MAIN APP
# ─────────────────────────────────────────────
class SolarMonitorApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("☀  Solar Panel Area Monitor")
        self.geometry("860x680")
        self.resizable(True, True)
        self.configure(bg="#0A0E1A")

        self.areas = []          # list of (x1,y1,x2,y2)
        self.previews = []       # list of ImageTk
        self.running = False
        self.monitor_thread = None
        self.capture_count = 0

        os.makedirs(MEDIA_DIR, exist_ok=True)
        self._build_ui()

    # ── UI ────────────────────────────────────
    def _build_ui(self):
        # Header
        hdr = tk.Frame(self, bg="#0A0E1A")
        hdr.pack(fill="x", padx=20, pady=(18, 4))

        tk.Label(hdr, text="☀ SOLAR PANEL MONITOR",
                 font=("Courier New", 20, "bold"),
                 fg="#FFD700", bg="#0A0E1A").pack(side="left")

        self.status_dot = tk.Label(hdr, text="●", font=("Arial", 20),
                                   fg="#333355", bg="#0A0E1A")
        self.status_dot.pack(side="right", padx=6)
        self.status_lbl = tk.Label(hdr, text="IDLE",
                                   font=("Courier New", 11, "bold"),
                                   fg="#555577", bg="#0A0E1A")
        self.status_lbl.pack(side="right")

        # Separator
        tk.Frame(self, bg="#1E2540", height=2).pack(fill="x", padx=20)

        # Button bar
        btn_frame = tk.Frame(self, bg="#0A0E1A")
        btn_frame.pack(fill="x", padx=20, pady=10)

        self._btn(btn_frame, "＋ Tambah Area", "#1A6B4A", "#00FF88", self.add_area).pack(side="left", padx=4)
        self._btn(btn_frame, "✕ Hapus Area Terakhir", "#5A1A1A", "#FF6B6B", self.remove_last_area).pack(side="left", padx=4)
        tk.Frame(btn_frame, bg="#0A0E1A", width=20).pack(side="left")
        self.start_btn = self._btn(btn_frame, "▶ Mulai Monitor", "#1A4A6B", "#4DC3FF", self.start_monitor)
        self.start_btn.pack(side="left", padx=4)
        self.stop_btn = self._btn(btn_frame, "■ Stop", "#4A3A1A", "#FFB347", self.stop_monitor, state="disabled")
        self.stop_btn.pack(side="left", padx=4)

        # Interval
        intv_frame = tk.Frame(self, bg="#0A0E1A")
        intv_frame.pack(fill="x", padx=22, pady=(0, 8))
        tk.Label(intv_frame, text="Interval (detik):", fg="#7788AA",
                 bg="#0A0E1A", font=("Courier New", 10)).pack(side="left")
        self.interval_var = tk.IntVar(value=INTERVAL_SECONDS)
        spin = tk.Spinbox(intv_frame, from_=10, to=3600,
                          textvariable=self.interval_var, width=6,
                          bg="#141829", fg="#FFD700", insertbackground="#FFD700",
                          font=("Courier New", 11), relief="flat",
                          buttonbackground="#1E2540")
        spin.pack(side="left", padx=8)
        tk.Label(intv_frame, text="(default 60 = 1 menit)", fg="#445566",
                 bg="#0A0E1A", font=("Courier New", 9)).pack(side="left")

        # Area list + preview
        mid = tk.Frame(self, bg="#0A0E1A")
        mid.pack(fill="both", expand=True, padx=20, pady=(0, 8))

        # Left: area list
        left = tk.Frame(mid, bg="#0D1220", bd=0)
        left.pack(side="left", fill="y", padx=(0, 10))

        tk.Label(left, text="AREA TERDAFTAR", fg="#445577",
                 bg="#0D1220", font=("Courier New", 9, "bold")).pack(pady=(8, 2))

        self.area_listbox = tk.Listbox(
            left, bg="#0D1220", fg="#00FF88", selectbackground="#1A4030",
            font=("Courier New", 11), width=28, relief="flat",
            highlightthickness=1, highlightbackground="#1E2540",
            activestyle="none"
        )
        self.area_listbox.pack(fill="both", expand=True, padx=6, pady=(0, 6))

        # Right: log
        right = tk.Frame(mid, bg="#0A0E1A")
        right.pack(side="left", fill="both", expand=True)

        tk.Label(right, text="LOG AKTIVITAS", fg="#445577",
                 bg="#0A0E1A", font=("Courier New", 9, "bold")).pack(anchor="w")

        log_frame = tk.Frame(right, bg="#0D1220", highlightbackground="#1E2540",
                             highlightthickness=1)
        log_frame.pack(fill="both", expand=True)

        self.log_text = tk.Text(
            log_frame, bg="#0D1220", fg="#A0C4FF",
            font=("Courier New", 10), relief="flat",
            state="disabled", wrap="word",
            insertbackground="#A0C4FF"
        )
        self.log_text.pack(side="left", fill="both", expand=True, padx=4, pady=4)
        scroll = tk.Scrollbar(log_frame, command=self.log_text.yview,
                              bg="#1E2540", troughcolor="#0D1220")
        scroll.pack(side="right", fill="y")
        self.log_text.configure(yscrollcommand=scroll.set)

        # Tag warna
        self.log_text.tag_config("ts", foreground="#445577")
        self.log_text.tag_config("ok", foreground="#00FF88")
        self.log_text.tag_config("err", foreground="#FF6B6B")
        self.log_text.tag_config("info", foreground="#FFD700")

        # Footer
        self.footer_lbl = tk.Label(
            self, text=f"📁 Output → {os.path.abspath(MEDIA_DIR)}",
            fg="#334455", bg="#0A0E1A", font=("Courier New", 9)
        )
        self.footer_lbl.pack(pady=(0, 8))

        self._log("Selamat datang! Klik '＋ Tambah Area' lalu drag area di layar.", "info")
        self._log(f"File output tersimpan di: {os.path.abspath(MEDIA_DIR)}", "info")

    def _btn(self, parent, text, bg, fg, cmd, state="normal"):
        return tk.Button(
            parent, text=text, command=cmd, state=state,
            bg=bg, fg=fg, activebackground=fg, activeforeground=bg,
            font=("Courier New", 10, "bold"), relief="flat",
            padx=12, pady=6, cursor="hand2",
            disabledforeground="#333355"
        )

    # ── LOGGING ───────────────────────────────
    def _log(self, msg, tag="info"):
        ts = datetime.now().strftime("%H:%M:%S")
        self.log_text.configure(state="normal")
        self.log_text.insert("end", f"[{ts}] ", "ts")
        self.log_text.insert("end", msg + "\n", tag)
        self.log_text.see("end")
        self.log_text.configure(state="disabled")

    # ── AREA MANAGEMENT ──────────────────────
    def add_area(self):
        self.withdraw()
        time.sleep(0.3)  # beri waktu window hilang dulu
        AreaSelector(self, self._on_area_selected)

    def _on_area_selected(self, x1, y1, x2, y2):
        self.deiconify()
        idx = len(self.areas) + 1
        self.areas.append((x1, y1, x2, y2))
        self.area_listbox.insert("end", f"  Area {idx}: ({x1},{y1}) → ({x2},{y2})")
        self._log(f"Area {idx} ditambahkan: ({x1},{y1}) → ({x2},{y2})", "ok")

    def remove_last_area(self):
        if not self.areas:
            return
        self.areas.pop()
        self.area_listbox.delete("end")
        self._log(f"Area terakhir dihapus. Total: {len(self.areas)}", "info")

    # ── MONITOR ──────────────────────────────
    def start_monitor(self):
        if not self.areas:
            messagebox.showwarning("Belum ada area!", "Tambahkan minimal 1 area terlebih dahulu.")
            return
        self.running = True
        self.capture_count = 0
        self.start_btn.configure(state="disabled")
        self.stop_btn.configure(state="normal")
        self.status_dot.configure(fg="#00FF88")
        self.status_lbl.configure(fg="#00FF88", text="RUNNING")
        self._log(f"Monitor dimulai — {len(self.areas)} area, interval {self.interval_var.get()}s", "ok")

        self.monitor_thread = threading.Thread(target=self._monitor_loop, daemon=True)
        self.monitor_thread.start()

    def stop_monitor(self):
        self.running = False
        self.start_btn.configure(state="normal")
        self.stop_btn.configure(state="disabled")
        self.status_dot.configure(fg="#333355")
        self.status_lbl.configure(fg="#555577", text="IDLE")
        self._log("Monitor dihentikan.", "info")

    def _monitor_loop(self):
        while self.running:
            self.capture_count += 1
            self._do_capture(self.capture_count)
            # countdown
            interval = self.interval_var.get()
            for i in range(interval):
                if not self.running:
                    break
                remaining = interval - i
                self.after(0, lambda r=remaining: self.status_lbl.configure(
                    text=f"NEXT: {r}s"
                ))
                time.sleep(1)

    def _do_capture(self, cycle):
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.after(0, lambda: self._log(f"── Siklus #{cycle} @ {ts} ──", "info"))

        with mss.mss() as sct:
            for idx, (x1, y1, x2, y2) in enumerate(self.areas, start=1):
                # Screenshot
                region = {"top": y1, "left": x1, "width": x2 - x1, "height": y2 - y1}
                try:
                    shot = sct.grab(region)
                    img = Image.frombytes("RGB", shot.size, shot.bgra, "raw", "BGRX")
                except Exception as e:
                    self.after(0, lambda e=e, i=idx: self._log(f"Area {i} screenshot gagal: {e}", "err"))
                    continue

                # Simpan gambar
                img_path = os.path.join(MEDIA_DIR, f"update_area_{idx}.jpg")
                img.save(img_path, "JPEG", quality=92)

                # OCR
                text_result = self._ocr(img)

                # Simpan JSON
                data = {
                    "area_index": idx,
                    "coordinates": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
                    "timestamp": ts,
                    "cycle": cycle,
                    "raw_text": text_result,
                    "parsed": self._parse_solar_values(text_result),
                    "image_path": img_path
                }
                json_path = os.path.join(MEDIA_DIR, f"update_area_{idx}.json")
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)

                preview_text = text_result[:60].replace("\n", " ") if text_result else "(kosong)"
                self.after(0, lambda i=idx, p=preview_text: self._log(
                    f"  Area {i} ✓ → \"{p}...\"", "ok"
                ))

    def _ocr(self, img: Image.Image) -> str:
        """OCR dengan preprocessing untuk dashboard angka."""
        # Scale up
        w, h = img.size
        img_large = img.resize((w * 2, h * 2), Image.LANCZOS)

        # Tingkatkan kontras
        from PIL import ImageEnhance
        img_large = ImageEnhance.Contrast(img_large).enhance(1.8)
        img_large = ImageEnhance.Sharpness(img_large).enhance(2.0)

        # Grayscale
        gray = img_large.convert("L")

        try:
            # Config khusus untuk angka & teks dashboard
            config = "--psm 6 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,:/%() -+"
            text = pytesseract.image_to_string(gray, config=config)
            return text.strip()
        except Exception as e:
            return f"[OCR Error: {e}]"

    def _parse_solar_values(self, text: str) -> dict:
        """Coba ekstrak nilai-nilai umum dari dashboard solar panel."""
        parsed = {}
        if not text:
            return parsed

        patterns = {
            "power_w":    r"(\d+(?:\.\d+)?)\s*W(?:att)?",
            "power_kw":   r"(\d+(?:\.\d+)?)\s*kW",
            "energy_kwh": r"(\d+(?:\.\d+)?)\s*kWh",
            "voltage_v":  r"(\d+(?:\.\d+)?)\s*V(?:olt)?",
            "current_a":  r"(\d+(?:\.\d+)?)\s*A(?:mp)?",
            "percent":    r"(\d+(?:\.\d+)?)\s*%",
            "temperature":r"(\d+(?:\.\d+)?)\s*°?[Cc]",
        }

        for key, pattern in patterns.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                parsed[key] = [float(m) for m in matches]

        # Lines mentah
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        parsed["lines"] = lines

        return parsed


# ─────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────
if __name__ == "__main__":
    app = SolarMonitorApp()
    app.mainloop()
