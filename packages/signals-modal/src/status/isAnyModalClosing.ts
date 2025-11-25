import { getClosingModals } from "./getClosingModals"

export function isAnyModalClosing(): boolean {
    return getClosingModals().length > 0
}
