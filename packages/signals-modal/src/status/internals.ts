import type { Signal } from "@monstermann/signals"
import type { ModalStatus } from "./types"
import { INTERNAL, signal } from "@monstermann/signals"
import { onModalDisposed } from "../createModal"
import { onModalClosed } from "./onModalClosed"
import { onModalOpened } from "./onModalOpened"
import { onModalOpening } from "./onModalOpening"

export const $keysToStatus = signal<Map<string, Signal<ModalStatus>>>(new Map(), {
    mutable: true,
    silent: true,
})

export const $openedModals = signal<ReadonlySet<string>>(new Set(), INTERNAL)

onModalOpening(key => $openedModals(m => add(m, key)))
onModalOpened(key => $openedModals(m => add(m, key)))
onModalClosed(key => $openedModals(m => remove(m, key)))
onModalDisposed(key => $openedModals(m => remove(m, key)))

function add(set: ReadonlySet<string>, key: string): ReadonlySet<string> {
    if (set.has(key)) return set
    const clone = new Set(set)
    clone.add(key)
    return clone
}

function remove(set: ReadonlySet<string>, key: string): ReadonlySet<string> {
    if (!set.has(key)) return set
    const clone = new Set(set)
    clone.delete(key)
    return clone
}
