import { getGroupsForModal } from "./getGroupsForModal"
import { modalGroups } from "./modalGroups"

export function isDialog(key: string): boolean {
    return getGroupsForModal(key).has(modalGroups.dialog)
}
