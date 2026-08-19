#!/usr/bin/env bash
set -euo pipefail

sudo apt update
sudo apt install -y chromium-browser chromium-chromedriver

python -m pip install --upgrade pip selenium

echo
echo "Arsitektur: $(uname -m)"
echo "Chromium:   $(command -v chromium-browser || command -v chromium || true)"
echo "Driver:     $(command -v chromedriver || command -v chromium.chromedriver || true)"

(chromium-browser --version 2>/dev/null || chromium --version 2>/dev/null || true)
(chromedriver --version 2>/dev/null || chromium.chromedriver --version 2>/dev/null || true)

echo
echo "Instalasi selesai. Salin plts_main_ubuntu_arm64.py ke folder proyek lalu jalankan melalui run_plts_ubuntu_arm64.sh."
