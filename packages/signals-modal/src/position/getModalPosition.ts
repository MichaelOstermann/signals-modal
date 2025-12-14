import type { ModalPosition } from "./withPosition"
import { $positions } from "./internals"

export function getModalPosition(key: string): ModalPosition | undefined {
    return $positions().get(key)?.()
}
