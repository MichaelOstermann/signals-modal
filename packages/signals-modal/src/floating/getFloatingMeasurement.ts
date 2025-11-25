import { Rect } from "@monstermann/fn"
import { $floatingMeasurements } from "./internals"

export function getFloatingMeasurement(key: string): Rect {
    return $floatingMeasurements().get(key) ?? Rect.origin
}
