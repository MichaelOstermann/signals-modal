import { getOpenModals } from "./getOpenModals"

export function isAnyModalOpen(): boolean {
    return getOpenModals().length > 0
}
