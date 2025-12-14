import type { Memo } from "@monstermann/signals"
import { INTERNAL, memo } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { getGroupsForModal } from "./getGroupsForModal"
import { $keysToGroups } from "./internals"

export function withModalGroups(groups: Iterable<string>): Memo<ReadonlySet<string>> {
    const modal = currentModal()

    $keysToGroups((keys) => {
        if (!keys.has(modal.key)) keys.set(modal.key, new Set())
        const g = keys.get(modal.key)!
        for (const group of groups) g.add(group)
        return keys
    })

    modal.onDispose(() => {
        $keysToGroups((keys) => {
            keys.delete(modal.key)
            return keys
        })
    })

    return memo(() => getGroupsForModal(modal.key), INTERNAL)
}
