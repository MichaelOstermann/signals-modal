import { getGroupsForModal } from "./getGroupsForModal"

export function isModalInGroup(key: string, group: string): boolean {
    return getGroupsForModal(key).has(group)
}
