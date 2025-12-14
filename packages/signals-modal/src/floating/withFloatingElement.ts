import type { Signal } from "@monstermann/signals"
import { INTERNAL, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $floatingElements } from "./internals"

export function withFloatingElement(anchorElement?: HTMLElement | null): Signal<HTMLElement | null> {
    const modal = currentModal()
    const $anchorElement = signal(anchorElement ?? null, INTERNAL)

    $floatingElements(map => map.set(modal.key, $anchorElement))

    modal.onDispose(() => {
        $floatingElements((map) => {
            map.delete(modal.key)
            return map
        })
    })

    return $anchorElement
}
