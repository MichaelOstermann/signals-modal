import { effect, INTERNAL, memo } from "@monstermann/signals"
import { getGroupsForModal } from "../groups/getGroupsForModal"
import { getVisibleModals } from "../status/getVisibleModals"

const $classes = memo(() => {
    const modals = getVisibleModals()
    const clx = new Set<string>()
    for (const modal of modals) {
        for (const group of getGroupsForModal(modal)) {
            clx.add(`has-${group}`)
        }
    }
    return Array.from(clx).sort().join(" ")
}, INTERNAL)

export function syncModalGroupsToBody(): void {
    effect(() => {
        const classes = $classes().split(" ")
        document.body.classList.add(...classes)
        return () => {
            document.body.classList.remove(...classes)
        }
    }, INTERNAL)
}
