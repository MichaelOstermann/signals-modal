import type { Memo, Signal } from "@monstermann/signals"
import type { ModalStatus } from "./types"
import { INTERNAL, memo, signal, watch } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { closeModal } from "./closeModal"
import { $keysToStatus } from "./internals"
import { isModalOpen } from "./isModalOpen"
import { onModalClosed } from "./onModalClosed"
import { onModalClosing } from "./onModalClosing"
import { onModalOpened } from "./onModalOpened"
import { onModalOpening } from "./onModalOpening"
import { openModal } from "./openModal"

export function withModalStatus(status: ModalStatus = "closed"): {
    $isOpen: Memo<boolean>
    $status: Signal<ModalStatus>
    close: () => void
    open: () => void
} {
    const modal = currentModal()
    const $status = signal<ModalStatus>(status, INTERNAL)

    $keysToStatus(keys => keys.set(modal.key, $status))
    modal.onDispose(() => $keysToStatus((keys) => {
        keys.delete(modal.key)
        return keys
    }))

    modal.onDispose(watch($status, (status) => {
        if (status === "closed") onModalClosed(modal.key)
        else if (status === "closing") onModalClosing(modal.key)
        else if (status === "opening") onModalOpening(modal.key)
        else if (status === "opened") onModalOpened(modal.key)
    }, INTERNAL))

    return {
        $isOpen: memo(() => isModalOpen(modal.key)),
        $status,
        close: () => closeModal(modal.key),
        open: () => openModal(modal.key),
    }
}
