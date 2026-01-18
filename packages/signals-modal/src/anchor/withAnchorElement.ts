import type { Signal } from "@monstermann/signals"
import { INTERNAL, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $anchorElements } from "./internals"

/**
 * # withAnchorElement
 *
 * ```ts
 * function withAnchorElement(
 *     anchorElement?: HTMLElement,
 * ): Signal<HTMLElement | null>;
 * ```
 *
 * Assigns an anchor element to the current modal. This function must be called inside a `createModal` callback.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withAnchorElement,
 *     setAnchorElement,
 *     getAnchorElement,
 * } from "@monstermann/signals-modal";
 *
 * createModal("key", () => {
 *     withAnchorElement();
 * });
 *
 * setAnchorElement("key", document.querySelector(".anchor"));
 * getAnchorElement("key"); // HTMLElement
 * ```
 *
 */
export function withAnchorElement(anchorElement?: HTMLElement | null): Signal<HTMLElement | null> {
    const modal = currentModal()
    const $anchorElement = signal(anchorElement ?? null, INTERNAL)

    $anchorElements(map => map.set(modal.key, $anchorElement))

    modal.onDispose(() => {
        $anchorElements((map) => {
            map.delete(modal.key)
            return map
        })
    })

    return $anchorElement
}
