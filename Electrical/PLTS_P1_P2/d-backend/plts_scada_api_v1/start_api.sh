#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export PORT="${PORT:-3001}"
export HOST="${HOST:-0.0.0.0}"
export DATA_DIR="${DATA_DIR:-$SCRIPT_DIR}"
export SCADA_TIME_ZONE="${SCADA_TIME_ZONE:-Asia/Jakarta}"
export ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-*}"
export MAX_HISTORY_LIMIT="${MAX_HISTORY_LIMIT:-5000}"

exec npm start
