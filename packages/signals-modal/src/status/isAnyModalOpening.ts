import { getOpeningModals } from "./getOpeningModals"

export function isAnyModalOpening(): boolean {
    return getOpeningModals().length > 0
}
