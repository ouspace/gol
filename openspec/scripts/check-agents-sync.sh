#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

CANON_ROLES="$ROOT_DIR/openspec/roles"
CANON_WORKFLOWS="$ROOT_DIR/.agent/workflows"
CANON_TEMPLATES="$ROOT_DIR/openspec/schemas/enterprise/templates"
CANON_EXAMPLES="$ROOT_DIR/openspec/examples"

print_usage() {
  cat <<USAGE
Usage:
  openspec/scripts/check-agents-sync.sh [--domain <name>] [--all]

Options:
  --domain <name>  Check one domain mirror at openspec/specs/<name>/09-ai-agents
  --all            Check all domains found under openspec/specs/*/09-ai-agents

Default:
  --domain ui
USAGE
}

MODE="single"
DOMAIN="ui"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain)
      MODE="single"
      DOMAIN="${2:-}"
      if [[ -z "$DOMAIN" ]]; then
        echo "[ERROR] --domain requires a value" >&2
        exit 2
      fi
      shift 2
      ;;
    --all)
      MODE="all"
      shift
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    *)
      echo "[ERROR] Unknown argument: $1" >&2
      print_usage
      exit 2
      ;;
  esac
done

status=0

check_pair() {
  local left="$1"
  local right="$2"
  local label="$3"
  local domain="$4"

  if [[ ! -d "$left" ]]; then
    echo "[ERROR][$domain] Missing canonical directory: $left"
    status=1
    return
  fi

  if [[ ! -d "$right" ]]; then
    echo "[OK][$domain] $label (strict mode: no mirror directory)"
    return
  fi

  if ! diff -ru "$left" "$right" > /dev/null; then
    echo "[DRIFT][$domain] $label"
    diff -ru "$left" "$right" || true
    status=1
  else
    echo "[OK][$domain] $label"
  fi
}

check_domain() {
  local domain="$1"
  local spec_base="$ROOT_DIR/openspec/specs/$domain/09-ai-agents"
  local spec_roles="$spec_base/roles"
  local spec_workflows="$spec_base/workflows"
  local spec_templates="$spec_base/templates"
  local spec_examples="$spec_base/examples"

  check_pair "$CANON_ROLES" "$spec_roles" "roles" "$domain"
  check_pair "$CANON_WORKFLOWS" "$spec_workflows" "workflows" "$domain"
  check_pair "$CANON_TEMPLATES" "$spec_templates" "templates" "$domain"
  check_pair "$CANON_EXAMPLES" "$spec_examples" "examples" "$domain"
}

if [[ "$MODE" == "single" ]]; then
  check_domain "$DOMAIN"
else
  domains_found=0
  while IFS= read -r domain; do
    [[ -z "$domain" ]] && continue
    domains_found=1
    check_domain "$domain"
  done <<EOF_DOMAINS
$(find "$ROOT_DIR/openspec/specs" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort)
EOF_DOMAINS

  if [[ "$domains_found" -eq 0 ]]; then
    echo "[ERROR] No domains found under openspec/specs" >&2
    exit 1
  fi
fi

exit $status
