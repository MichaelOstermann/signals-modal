import type { Reactive } from "@monstermann/signals"
import type { ModalStatus } from "../status/types"
import { effect, INTERNAL } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { closeModal } from "../status/closeModal"

export function withCloseOnScroll(options: {
    $anchorElement: Reactive<HTMLElement | null>
    $status: Reactive<ModalStatus>
}): void {
    const modal = currentModal()
    const onScroll = () => closeModal(modal.key)
    modal.onDispose(effect(() => {
        const element = options.$anchorElement()
        const status = options.$status()
        if (!element) return
        if (status === "closing" || status === "closed") return

        const overflowElements = getScrollableAncestors(element)

        for (const element of overflowElements)
            element.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            for (const element of overflowElements)
                element.removeEventListener("scroll", onScroll)
        }
    }, INTERNAL))
}

function isOverflowElement(element: Element): boolean {
    const { display, overflow, overflowX, overflowY } = getComputedStyle(element)
    return (
        /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX)
        && !["inline", "contents"].includes(display)
    )
}

function getScrollableAncestors(element: Element): Element[] {
    const scrollableAncestors: Element[] = []
    let pivot = element.parentElement

    while (pivot) {
        if (isOverflowElement(pivot))
            scrollableAncestors.push(pivot)
        pivot = pivot.parentElement
    }

    return scrollableAncestors
}
