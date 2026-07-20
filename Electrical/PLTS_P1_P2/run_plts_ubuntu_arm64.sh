#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_BIN="${PYTHON_BIN:-python}"

if [[ -z "${OTICS_USER:-}" ]]; then
    read -r -p "Username Otics: " OTICS_USER
    export OTICS_USER
fi
if [[ -z "${OTICS_PASS:-}" ]]; then
    read -r -s -p "Password Otics: " OTICS_PASS
    echo
    export OTICS_PASS
fi
if [[ -z "${HUAWEI_USER:-}" ]]; then
    read -r -p "Username Huawei: " HUAWEI_USER
    export HUAWEI_USER
fi
if [[ -z "${HUAWEI_PASS:-}" ]]; then
    read -r -s -p "Password Huawei: " HUAWEI_PASS
    echo
    export HUAWEI_PASS
fi

export HEADLESS="${HEADLESS:-1}"
exec "$PYTHON_BIN" "$SCRIPT_DIR/plts_main_ubuntu_arm64.py"
