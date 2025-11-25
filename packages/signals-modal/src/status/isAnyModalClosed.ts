import { getClosedModals } from "./getClosedModals"

export function isAnyModalClosed(): boolean {
    return getClosedModals().length > 0
}
