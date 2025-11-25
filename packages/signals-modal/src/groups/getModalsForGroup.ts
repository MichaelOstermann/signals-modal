import { $groupsToKeys } from "./internals"

const empty: ReadonlySet<string> = new Set()

export function getModalsForGroup(group: string): ReadonlySet<string> {
    return $groupsToKeys().get(group) ?? empty
}
