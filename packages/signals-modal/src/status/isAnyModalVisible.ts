import { getVisibleModals } from "./getVisibleModals"

export function isAnyModalVisible(): boolean {
    return getVisibleModals().length > 0
}
