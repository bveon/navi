#!/usr/bin/env bash

# shellcheck disable=SC2034

set -o errexit
set -o nounset
set -o pipefail

readonly MAIN_BRANCH='main'
readonly REMOTE_ORIGIN='origin'
readonly WIP_COMMIT_MSG='chore: work in progress'
readonly WIP_PREFIX='wip'

readonly PROTECTED_BRANCHES='
main
'

readonly GITHUB_GPG_KEY_IDS='
B5690EEEBB952194
'

readonly VALID_GPG_KEY_IDS='
595FA87400AA7FA5
74BF3B8F934FADA9
'

git_assert_branch() {
  local ref="$1"

  git show-ref --verify --quiet "${ref}"
}

git_assert_commit_exists() {
  local oid="$1"

  local zero_oid=''

  zero_oid="$(
    git hash-object --stdin <'/dev/null' \
      | tr '0-9a-f' '0'
  )"

  [[ "${oid}" != "${zero_oid}" ]]
}

git_assert_no_force_push() {
  local remote_oid="$1"
  local local_oid="$2"

  git merge-base --is-ancestor "${remote_oid}" "${local_oid}"
}

git_assert_no_whitespace_errors() {
  local oid="$1"

  git diff-index --cached --check "${oid}"
}

git_assert_unprotected_branch() {
  local ref="$1"

  local branch=''

  if [[ -z "${PROTECTED_BRANCHES}" ]]; then
    return 0
  fi

  for branch in ${PROTECTED_BRANCHES}; do
    if [[ "${ref}" =~ ^${branch}$ ]]; then
      return 1
    fi
  done
}

git_assert_valid_commit_signature() {
  local gpg_key_id="$1"
  local type="$2"

  local gpg_key_ids=''

  local key_id=''

  gpg_key_ids="$(
    printf '%s\n%s\n' \
      "${GITHUB_GPG_KEY_IDS}" \
      "${VALID_GPG_KEY_IDS}" \
      | sed '/^[[:space:]]*$/d'
  )"

  if [[ -z "${gpg_key_ids}" ]]; then
    return 0
  fi

  if printf '%s\n' "${type}" \
    | grep --quiet --regexp 'G$'; then
    return 0
  fi

  if printf '%s\n' "${type}" \
    | grep --quiet --regexp 'E$'; then
    for key_id in ${gpg_key_ids}; do
      if [[ "${gpg_key_id}" == "${key_id}" ]]; then
        return 0
      fi
    done
  fi

  return 1
}
