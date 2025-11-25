import { Rect } from "@monstermann/fn"
import { $anchorMeasurements } from "./internals"

export function getAnchorMeasurement(key: string): Rect {
    return $anchorMeasurements().get(key) ?? Rect.origin
}
