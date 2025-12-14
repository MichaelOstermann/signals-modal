import type { ModalPlacement } from "./withPlacement"
import { $placements } from "./internals"

export function getModalPlacement(key: string): ModalPlacement | undefined {
    return $placements().get(key)?.()
}
