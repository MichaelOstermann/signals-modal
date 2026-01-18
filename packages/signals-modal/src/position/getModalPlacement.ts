import type { ModalPlacement } from "./withPlacement"
import { $placements } from "./internals"

/**
 * # getModalPlacement
 *
 * ```ts
 * function getModalPlacement(key: string): ModalPlacement | undefined;
 * ```
 *
 * Returns the current placement for the given `key`.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withModalStatus,
 *     withAnchorElement,
 *     withAnchorMeasurement,
 *     withFloatingElement,
 *     withFloatingMeasurement,
 *     withBoundary,
 *     withPlacement,
 *     getModalPlacement,
 * } from "@monstermann/signals-modal";
 *
 * createModal("key", () => {
 *     const { $status } = withModalStatus();
 *     const $anchorElement = withAnchorElement();
 *     const $floatingElement = withFloatingElement();
 *     const $anchorMeasurement = withAnchorMeasurement({
 *         $status,
 *         $anchorElement,
 *     });
 *     const $floatingMeasurement = withFloatingMeasurement({
 *         $status,
 *         $floatingElement,
 *     });
 *     const $boundary = withBoundary({ $status });
 *     const $placement = withPlacement({
 *         placement: "vertical-center",
 *         $boundary,
 *         $anchorMeasurement,
 *         $floatingMeasurement,
 *     });
 * });
 *
 * getModalPlacement("key"); // up-center | down-center
 * ```
 *
 */
export function getModalPlacement(key: string): ModalPlacement | undefined {
    return $placements().get(key)?.()
}
