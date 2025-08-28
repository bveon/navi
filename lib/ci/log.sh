#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

error() {
  printf '\033[1;31m[%-5s] %b\033[0m\n' 'ERROR' "$@"
}

info() {
  printf '\033[1;37m[%-5s] %b\033[0m\n' 'INFO' "$@"
}
