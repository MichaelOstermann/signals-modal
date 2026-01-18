import { $floatingElements } from "./internals"

/**
 * # setFloatingElement
 *
 * ```ts
 * function setFloatingElement(key: string, element: HTMLElement | null): void;
 * ```
 *
 * Sets the current floating element for the given `key`.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withFloatingElement,
 *     getFloatingElement,
 * } from "@monstermann/signals-modal";
 *
 * createModal("key", () => {
 *     withFloatingElement();
 * });
 *
 * setFloatingElement("key", document.querySelector(".floating"));
 * ```
 *
 */
export function setFloatingElement(key: string, element: HTMLElement | null): void {
    $floatingElements().get(key)?.(element)
}
