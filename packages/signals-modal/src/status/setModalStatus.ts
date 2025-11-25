import type { ModalStatus } from "./types"
import { $keysToStatus } from "./internals"

export function setModalStatus(key: string, status: ModalStatus): void {
    $keysToStatus().get(key)?.(status)
}
