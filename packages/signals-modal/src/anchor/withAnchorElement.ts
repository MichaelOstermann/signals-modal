import type { Signal } from "@monstermann/signals"
import { INTERNAL, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $anchorElements } from "./internals"

export function withAnchorElement(anchorElement?: HTMLElement | null): Signal<HTMLElement | null> {
    const modal = currentModal()
    const $anchorElement = signal(anchorElement ?? null, INTERNAL)

    $anchorElements(map => map.set(modal.key, $anchorElement))

    modal.onDispose(() => {
        $anchorElements((map) => {
            map.delete(modal.key)
            return map
        })
    })

    return $anchorElement
}
