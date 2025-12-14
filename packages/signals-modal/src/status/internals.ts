import type { Signal } from "@monstermann/signals"
import type { ModalStatus } from "./types"
import { Set } from "@monstermann/fn"
import { INTERNAL, signal } from "@monstermann/signals"
import { onModalDisposed } from "../createModal"
import { onModalClosed } from "./onModalClosed"
import { onModalOpened } from "./onModalOpened"
import { onModalOpening } from "./onModalOpening"

export const $keysToStatus = signal<Map<string, Signal<ModalStatus>>>(new Map(), {
    mutable: true,
    silent: true,
})

export const $openedModals = signal<ReadonlySet<string>>(Set.create(), INTERNAL)

onModalOpening(key => $openedModals(m => Set.add(m, key)))
onModalOpened(key => $openedModals(m => Set.add(m, key)))
onModalClosed(key => $openedModals(m => Set.remove(m, key)))
onModalDisposed(key => $openedModals(m => Set.remove(m, key)))
