#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

# shellcheck disable=SC2155
readonly ROOT="$(
  git rev-parse --show-toplevel
)"

# shellcheck disable=SC2155
readonly SCRIPT="$(
  basename "${BASH_SOURCE[0]}"
)"

if [[ "${PWD}" != "${ROOT}" ]]; then
  printf '\033[1;31m[%-5s] %b\033[0m\n' 'ERROR' \
    "${SCRIPT} must be run from the git root directory"
  exit 1
fi

# shellcheck source=lib/ci/git.sh
source "${ROOT}/lib/ci/git.sh"

# shellcheck source=lib/ci/log.sh
source "${ROOT}/lib/ci/log.sh"

# shellcheck disable=SC2155
readonly REF="$(
  git rev-parse --abbrev-ref 'HEAD'
)"

usage() {
  cat <<EOF
Usage: ${SCRIPT} [<options>...] <command>

Commands:
  merge                   Squash merge a work-in-progress branch into its
                          base branch
  save                    Commit changes and push to a work-in-progress
                          branch
  sync                    Sync the local and remote repositories and delete
                          stale branches

Options:
  --help                  Show this help message and exit
EOF
}

parse_command() {
  local command="${1:-}"

  if [[ -z "${command}" ]]; then
    error 'Command is required'
    usage
    exit 1
  fi

  case "${command}" in
    merge)
      COMMAND='merge'
      ;;
    save)
      COMMAND='save'
      ;;
    sync)
      COMMAND='sync'
      ;;
    *)
      error "Unknown command '${command}'"
      usage
      exit 1
      ;;
  esac
}

parse_args() {
  while getopts ':-:' opt; do
    case "${opt}" in
      -)
        case "${OPTARG}" in
          help)
            usage
            exit 0
            ;;
          *)
            error "Unknown argument '--${OPTARG}'"
            usage
            exit 1
            ;;
        esac
        ;;
      *)
        error "Unknown argument '-${OPTARG}'"
        usage
        exit 1
        ;;
    esac
  done

  shift $((OPTIND - 1))

  parse_command "$@"
}

ci() {
  bash "${ROOT}/scripts/audit-gitattributes.sh"
  pnpm exec turbo run check-types check-format lint
}

pull() {
  local ref="$1"

  git stash push --message "Auto-stash before syncing ${ref}" \
    || info "No local changes to stash for '${ref}'"

  git pull --ff-only "${REMOTE_ORIGIN}" "${ref}" \
    || {
      git stash pop \
        || info 'No stash to pop'
    }

  git stash pop \
    || info 'No stash to pop'
}

merge() {
  local branch=''
  local wip_branch=''
  local wip_branches=()

  if [[ "${REF}" =~ ^${WIP_PREFIX}/(.+)-[a-z0-9]{6}$ ]]; then
    branch="${BASH_REMATCH[1]}"
    wip_branch="${REF}"
  elif [[ "${REF}" =~ ^${WIP_PREFIX}/ ]]; then
    branch="${REF#"${WIP_PREFIX}/"}"
    wip_branch="${REF}"
  else
    branch="${REF}"

    wip_branches=("$(git branch --list "${WIP_PREFIX}/${branch}-??????")")

    if [[ ${#wip_branches[@]} -eq 1 ]]; then
      wip_branch="${wip_branches[0]#\* }"
    elif [[ ${#wip_branches[@]} -gt 1 ]]; then
      error "Multiple work-in-progress branches found for '${branch}': ${wip_branches[*]}"
      exit 1
    else
      wip_branch="${WIP_PREFIX}/${branch}"
    fi
  fi

  # shellcheck disable=SC2310
  if ! git_assert_unprotected_branch "${branch}"; then
    error "Merging into '${branch}' is not permitted"
    exit 1
  fi

  # shellcheck disable=SC2310
  if ! git_assert_branch "refs/heads/${branch}"; then
    error "Branch '${branch}' does not exist"
    exit 1
  fi

  # shellcheck disable=SC2310
  if ! git_assert_branch "refs/heads/${wip_branch}"; then
    error "Work-in-progress branch '${wip_branch}' does not exist"
    exit 1
  fi

  git checkout "${wip_branch}"
  ci
  git checkout "${branch}"
  git merge --squash "${wip_branch}"
  git commit
  git push --set-upstream "${REMOTE_ORIGIN}" "${branch}"
  git branch --delete --force "${wip_branch}"

  # shellcheck disable=SC2310
  if git_assert_branch "refs/remotes/${REMOTE_ORIGIN}/${wip_branch}"; then
    git push --delete "${REMOTE_ORIGIN}" "${wip_branch}"
  fi
}

save() {
  local branch=''
  local code=''
  local wip_branch=''

  if [[ "${REF}" =~ ^${WIP_PREFIX}/(.+)-[a-z0-9]{6}$ ]]; then
    branch="${BASH_REMATCH[1]}"
    wip_branch="${REF}"
  elif [[ "${REF}" =~ ^${WIP_PREFIX}/ ]]; then
    branch="${REF#"${WIP_PREFIX}/"}"
    wip_branch="${REF}"
  else
    branch="${REF}"

    wip_branches=("$(git branch --list "${WIP_PREFIX}/${branch}-??????")")

    if [[ ${#wip_branches[@]} -eq 1 ]]; then
      wip_branch="${wip_branches[0]#\* }"
    elif [[ ${#wip_branches[@]} -gt 1 ]]; then
      error "Multiple work-in-progress branches found for '${branch}': ${wip_branches[*]}"
      exit 1
    else
      wip_branch="${WIP_PREFIX}/${branch}"
    fi
  fi

  # shellcheck disable=SC2310
  if ! git_assert_unprotected_branch "${branch}"; then
    error "Saving to '${wip_branch}' is not permitted"
    exit 1
  fi

  # shellcheck disable=SC2310
  if ! git_assert_branch "refs/heads/${branch}"; then
    error "Branch '${branch}' does not exist"
    exit 1
  fi

  # shellcheck disable=SC2310
  if ! git_assert_branch "refs/heads/${wip_branch}"; then
    code="$(
      uuidgen \
        | tr '[:upper:]' '[:lower:]' \
        | tr -d '-' \
        | head -c 6
    )"

    wip_branch="${wip_branch}-${code}"

    git checkout -b "${wip_branch}"
  else
    git checkout "${wip_branch}"
  fi

  git add --all
  git commit --message "${WIP_COMMIT_MSG}" \
    || true
  git push --set-upstream "${REMOTE_ORIGIN}" "${wip_branch}"
}

sync() {
  local local_refs=''
  local missing_local_refs=''
  local remote_refs=''
  local remote_tracking_refs=''
  local remote_tracking_refs_old=''
  local stale_local_refs=''
  local wip_branch=''

  local ref=''

  remote_tracking_refs_old="$(
    git for-each-ref --format='%(refname:short)' 'refs/remotes/' \
      | sed "s/^${REMOTE_ORIGIN}\///" \
      | grep --invert-match "${REMOTE_ORIGIN}" \
      | sort \
      || true
  )"

  git fetch --all --prune
  git checkout "${MAIN_BRANCH}"
  pull "${MAIN_BRANCH}"

  local_refs="$(
    git for-each-ref --format='%(refname:short)' 'refs/heads/' \
      | sort
  )"

  remote_tracking_refs="$(
    git for-each-ref --format='%(refname:short)' 'refs/remotes/' \
      | sed "s/^${REMOTE_ORIGIN}\///" \
      | grep --invert-match "${REMOTE_ORIGIN}" \
      | sort \
      || true
  )"

  missing_local_refs="$(
    comm -13 \
      <(printf '%s\n' "${local_refs}") \
      <(printf '%s\n' "${remote_tracking_refs}")
  )"

  if [[ -n "${missing_local_refs}" ]]; then
    for ref in ${missing_local_refs}; do
      git branch --track "${ref}" "${REMOTE_ORIGIN}/${ref}"
    done
  fi

  remote_refs="$(
    git ls-remote --refs --branches "${REMOTE_ORIGIN}" \
      | sed -E 's/^[[:xdigit:]]+[[:space:]]+refs\/heads\///' \
      | sort
  )"

  stale_local_refs="$(
    comm -13 \
      <(printf '%s\n' "${remote_refs}") \
      <(printf '%s\n' "${remote_tracking_refs_old}")
  )"

  if [[ -n "${stale_local_refs}" ]]; then
    for ref in ${stale_local_refs}; do
      # shellcheck disable=SC2310
      if git_assert_branch "refs/heads/${ref}"; then
        git branch --delete --force "${ref}"
      fi
    done
  fi

  local_refs="$(
    git for-each-ref --format='%(refname:short)' 'refs/heads/' \
      | sort
  )"

  for ref in ${local_refs}; do
    git checkout "${ref}"
    pull "${ref}"
  done

  wip_branch="$(
    printf '%s\n' "${local_refs}" \
      | grep --extended-regexp "^${WIP_PREFIX}/" \
      | head --lines=1 \
      || true
  )"

  # shellcheck disable=SC2310
  if [[ "${REF}" =~ ^${WIP_PREFIX}/ ]] \
    && git_assert_branch "refs/heads/${REF}"; then
    git checkout "${REF}"
  elif git_assert_branch "refs/heads/${WIP_PREFIX}/${REF}"; then
    git checkout "${WIP_PREFIX}/${REF}"
  elif [[ -n "${wip_branch}" ]] \
    && git_assert_branch "refs/heads/${wip_branch}"; then
    git checkout "${wip_branch}"
  elif git_assert_branch "refs/heads/${REF}"; then
    git checkout "${REF}"
  else
    git checkout "${MAIN_BRANCH}"
  fi
}

main() {
  parse_args "$@"

  # shellcheck disable=SC2249
  case "${COMMAND}" in
    merge)
      merge
      ;;
    save)
      save
      ;;
    sync)
      sync
      ;;
  esac
}

clean_up() {
  local code="$?"

  if [[ "${code}" -ne 0 ]]; then
    error "${SCRIPT} exit ${code}"
    exit "${code}"
  fi
}

trap 'clean_up' EXIT INT TERM

main "$@"
