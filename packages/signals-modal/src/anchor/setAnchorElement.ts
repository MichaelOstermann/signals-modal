import { $anchorElements } from "./internals"

/**
 * # setAnchorElement
 *
 * ```ts
 * function setAnchorElement(key: string, element: HTMLElement | null): void;
 * ```
 *
 * Sets the current anchor element for the given `key`.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withAnchorElement,
 *     getAnchorElement,
 * } from "@monstermann/signals-modal";
 *
 * createModal("key", () => {
 *     withAnchorElement();
 * });
 *
 * setAnchorElement("key", document.querySelector(".anchor"));
 * ```
 *
 */
export function setAnchorElement(key: string, element: HTMLElement | null): void {
    $anchorElements().get(key)?.(element)
}
