import { getOpenedModals } from "./getOpenedModals"

export function isAnyModalOpened(): boolean {
    return getOpenedModals().length > 0
}
