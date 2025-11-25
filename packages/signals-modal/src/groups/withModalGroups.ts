import type { Memo } from "@monstermann/signals"
import { Map, Set } from "@monstermann/fn"
import { INTERNAL, memo } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { getGroupsForModal } from "./getGroupsForModal"
import { $keysToGroups } from "./internals"

export function withModalGroups(groups: Iterable<string>): Memo<ReadonlySet<string>> {
    const modal = currentModal()

    $keysToGroups((keys) => {
        return Map.mapOrElse(
            keys,
            modal.key,
            set => Set.addAll(set, groups),
            map => Map.set(map, modal.key, Set.create(groups)),
        )
    })

    modal.onDispose(() => {
        $keysToGroups(keys => Map.remove(keys, modal.key))
    })

    return memo(() => getGroupsForModal(modal.key), INTERNAL)
}
