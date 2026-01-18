import { closeModal } from "./closeModal"
import { $openedModals } from "./internals"

/**
 * # closeLastModal
 *
 * ```ts
 * function closeLastModal(): void;
 * ```
 *
 * Closes the last opened modal by setting its status to `"closing"`.
 *
 * ## Example
 *
 * ```ts
 * import { closeLastModal } from "@monstermann/signals-modal";
 *
 * closeLastModal();
 * ```
 *
 */
export function closeLastModal(): void {
    const key = Array.from($openedModals()).at(-1)
    if (key) closeModal(key)
}
