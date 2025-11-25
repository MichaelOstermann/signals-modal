import { getModalsForGroup } from "./getModalsForGroup"
import { modalGroups } from "./modalGroups"

export function getDialogs(): ReadonlySet<string> {
    return getModalsForGroup(modalGroups.dialog)
}
