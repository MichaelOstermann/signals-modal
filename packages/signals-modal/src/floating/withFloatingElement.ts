import type { Signal } from "@monstermann/signals"
import { INTERNAL, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $floatingElements } from "./internals"

/**
 * # withFloatingElement
 *
 * ```ts
 * function withFloatingElement(
 *     floatingElement?: HTMLElement,
 * ): Signal<HTMLElement | null>;
 * ```
 *
 * Assigns an floating element to the current modal. This function must be called inside a `createModal` callback.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withFloatingElement,
 *     setFloatingElement,
 *     getFloatingElement,
 * } from "@monstermann/signals-modal";
 *
 * createModal("key", () => {
 *     withFloatingElement();
 * });
 *
 * setFloatingElement("key", document.querySelector(".floating"));
 * getFloatingElement("key"); // HTMLElement
 * ```
 *
 */
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
