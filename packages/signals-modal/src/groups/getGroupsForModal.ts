import { $keysToGroups } from "./internals"

const empty: ReadonlySet<string> = new Set()

export function getGroupsForModal(key: string): ReadonlySet<string> {
    return $keysToGroups().get(key) ?? empty
}
