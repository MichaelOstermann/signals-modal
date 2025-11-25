import { getModalsForGroup } from "./getModalsForGroup"
import { modalGroups } from "./modalGroups"

export function getPopovers(): ReadonlySet<string> {
    return getModalsForGroup(modalGroups.popover)
}
