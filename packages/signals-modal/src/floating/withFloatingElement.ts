import type { Signal } from "@monstermann/signals"
import { Map } from "@monstermann/fn"
import { effect, INTERNAL, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $floatingElements } from "./internals"

export function withFloatingElement(anchorElement?: HTMLElement | null): Signal<HTMLElement | null> {
    const modal = currentModal()
    const $anchorElement = signal(anchorElement ?? null, INTERNAL)

    modal.onDispose(effect(() => {
        $floatingElements(map => Map.set(map, modal.key, $anchorElement))
    }, INTERNAL))

    modal.onDispose(() => {
        $floatingElements(map => Map.remove(map, modal.key))
    })

    return $anchorElement
}
