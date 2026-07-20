#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export PORT="${PORT:-3001}"
export HOST="${HOST:-0.0.0.0}"
export DATA_DIR="${DATA_DIR:-$SCRIPT_DIR}"
export ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-*}"

exec npm start
