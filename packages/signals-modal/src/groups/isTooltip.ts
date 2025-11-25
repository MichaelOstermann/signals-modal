import { getGroupsForModal } from "./getGroupsForModal"
import { modalGroups } from "./modalGroups"

export function isTooltip(key: string): boolean {
    return getGroupsForModal(key).has(modalGroups.tooltip)
}
