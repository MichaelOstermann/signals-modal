import { Rect } from "@monstermann/geometry"
import { $floatingMeasurements } from "./internals"

/**
 * # getFloatingMeasurement
 *
 * <Badge type="tip">Reactive</Badge>
 *
 * ```ts
 * function getFloatingMeasurement(key: string): Rect;
 * ```
 *
 * Retrieves the current result of `withFloatingMeasurement`, falling back to an empty `Rect`.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withFloatingElement,
 *     withModalStatus,
 *     withFloatingMeasurement,
 *     getFloatingMeasurement,
 * } from "@monstermann/signals-modal";
 *
 * createModal("key", () => {
 *     const { $status } = withModalStatus();
 *     const $floatingElement = withFloatingElement();
 *     // Memo({ top: number, left: number, width: number, height: number })
 *     const $floatingMeasurement = withFloatingMeasurement({
 *         $status,
 *         $floatingElement,
 *     });
 * });
 *
 * // { top: number, left: number, width: number, height: number }
 * getFloatingMeasurement("key");
 * ```
 *
 */
export function getFloatingMeasurement(key: string): Rect {
    return $floatingMeasurements().get(key)?.() ?? Rect.origin
}
