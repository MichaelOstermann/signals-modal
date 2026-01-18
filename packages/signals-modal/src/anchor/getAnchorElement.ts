import { $anchorElements } from "./internals"

/**
 * # getAnchorElement
 *
 * <Badge type="tip">Reactive</Badge>
 *
 * ```ts
 * function getAnchorElement(key: string): HTMLElement | undefined;
 * ```
 *
 * Retrieves the current anchor element for the given `key`.
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
export function getAnchorElement(key: string): HTMLElement | undefined {
    return $anchorElements().get(key)?.() ?? undefined
}
