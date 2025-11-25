import { getModalsForGroup } from "./getModalsForGroup"
import { modalGroups } from "./modalGroups"

export function getTooltips(): ReadonlySet<string> {
    return getModalsForGroup(modalGroups.tooltip)
}
