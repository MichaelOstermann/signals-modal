import { $floatingElements } from "./internals"

/**
 * # getFloatingElement
 *
 * <Badge type="tip">Reactive</Badge>
 *
 * ```ts
 * function getFloatingElement(key: string): HTMLElement | undefined;
 * ```
 *
 * Retrieves the current floating element for the given `key`.
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
export function getFloatingElement(key: string): HTMLElement | undefined {
    return $floatingElements().get(key)?.() ?? undefined
}
