import type { Signal } from "@monstermann/signals"
import type { ModalStatus } from "./types"
import { Map } from "@monstermann/fn"
import { INTERNAL, signal, watch } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $keysToStatus } from "./internals"
import { onModalClosed } from "./onModalClosed"
import { onModalClosing } from "./onModalClosing"
import { onModalOpened } from "./onModalOpened"
import { onModalOpening } from "./onModalOpening"

export function withModalStatus(status: ModalStatus = "closed"): Signal<ModalStatus> {
    const modal = currentModal()
    const $status = signal<ModalStatus>(status, INTERNAL)

    $keysToStatus(keys => Map.set(keys, modal.key, $status))
    modal.onDispose(() => $keysToStatus(keys => Map.remove(keys, modal.key)))

    modal.onDispose(watch($status, (status) => {
        if (status === "closed") onModalClosed(modal.key)
        else if (status === "closing") onModalClosing(modal.key)
        else if (status === "opening") onModalOpening(modal.key)
        else if (status === "opened") onModalOpened(modal.key)
    }, INTERNAL))

    return $status
}
