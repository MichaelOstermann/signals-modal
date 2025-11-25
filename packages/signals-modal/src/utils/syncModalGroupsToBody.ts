import { effect, INTERNAL } from "@monstermann/signals"
import { getGroupsForModal } from "../groups/getGroupsForModal"
import { getVisibleModals } from "../status/getVisibleModals"

export function syncModalGroupsToBody(): void {
    effect(() => {
        const modals = getVisibleModals()
        const clx = new Set<string>()
        for (const modal of modals) {
            for (const group of getGroupsForModal(modal)) {
                clx.add(`has-${group}`)
            }
        }
        document.body.classList.add(...clx)
        return () => {
            document.body.classList.remove(...clx)
        }
    }, INTERNAL)
}
