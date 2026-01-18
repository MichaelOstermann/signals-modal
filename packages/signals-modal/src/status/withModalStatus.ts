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

/**
 * # withModalStatus
 *
 * ```ts
 * function withModalStatus(status: ModalStatus = "closed"): {
 *     $status: Signal<ModalStatus>;
 *     $isOpen: Memo<boolean>;
 *     close: () => void;
 *     open: () => void;
 * };
 * ```
 *
 * Creates and returns a status signal for the current modal. This function must be called inside a `createModal` callback.
 *
 * The optional `status` parameter sets the initial status of the modal (defaults to `"closed"`).
 *
 * **ModalStatus** can be one of: `"closed"`, `"opening"`, `"opened"`, or `"closing"`.
 *
 * ## Example
 *
 * ```ts
 * import { createModal, withModalStatus } from "@monstermann/signals-modal";
 *
 * // Default to "closed"
 * createModal("modal1", () => {
 *     const { $status } = withModalStatus();
 *     console.log($status()); // "closed"
 * });
 *
 * // Start with a different initial status
 * createModal("modal2", () => {
 *     const { $status } = withModalStatus("opened");
 *     console.log($status()); // "opened"
 *
 *     // Update the status
 *     $status("closing");
 * });
 * ```
 *
 */
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
