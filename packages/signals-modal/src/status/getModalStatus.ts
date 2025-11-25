import type { ModalStatus } from "./types"
import { $keysToStatus } from "./internals"

export function getModalStatus(key: string): ModalStatus {
    return $keysToStatus().get(key)?.() ?? "closed"
}
