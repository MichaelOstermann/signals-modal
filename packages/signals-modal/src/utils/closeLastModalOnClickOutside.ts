import { getFloatingElement } from "../floating/getFloatingElement"
import { findParentElement } from "../internals/findParentElement"
import { closeModal } from "../status/closeModal"
import { $openedModals } from "../status/internals"

/**
 * # closeLastModalOnClickOutside
 *
 * ```ts
 * function closeLastModalOnClickOutside(): void;
 * ```
 *
 * Sets up a global `mousedown` listener that closes the last opened modal when clicked outside the floating element.
 *
 * ## Example
 *
 * ```ts
 * import { closeLastModalOnClickOutside } from "@monstermann/signals-modal";
 *
 * closeLastModalOnClickOutside();
 * ```
 *
 */
export function closeLastModalOnClickOutside(): void {
    document.addEventListener("mousedown", (evt) => {
        const key = Array.from($openedModals()).at(-1)
        if (!key) return

        const target = evt.target as HTMLElement
        const floating = getFloatingElement(key)
        if (!floating) return

        const shouldSkip = findParentElement(target, el => el === floating)

        if (!shouldSkip) closeModal(key)
    })
}
