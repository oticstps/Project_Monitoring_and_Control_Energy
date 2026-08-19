#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_BIN="${PYTHON_BIN:-python}"

# ==========================
# AUTO LOGIN CREDENTIAL
# ==========================

export OTICS_USER="otics"
export OTICS_PASS="Listrindo2025!"

export HUAWEI_USER="KemalOTICS"
export HUAWEI_PASS="q495tofa"

# ==========================
# RUN CONFIG
# ==========================

export HEADLESS="${HEADLESS:-1}"

exec "$PYTHON_BIN" "$SCRIPT_DIR/plts_main_ubuntu_arm64.py"
