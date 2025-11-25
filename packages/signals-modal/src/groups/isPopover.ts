import { getGroupsForModal } from "./getGroupsForModal"
import { modalGroups } from "./modalGroups"

export function isPopover(key: string): boolean {
    return getGroupsForModal(key).has(modalGroups.popover)
}
