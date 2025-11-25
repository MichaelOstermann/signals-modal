import { closeModal } from "./closeModal"
import { $openedModals } from "./internals"

export function closeLastModal(): void {
    const key = Array.from($openedModals()).at(-1)
    if (key) closeModal(key)
}
