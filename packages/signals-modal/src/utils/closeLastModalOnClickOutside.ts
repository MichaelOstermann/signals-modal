import { getFloatingElement } from "../floating/getFloatingElement"
import { findParentElement } from "../internals/findParentElement"
import { closeModal } from "../status/closeModal"
import { $openedModals } from "../status/internals"

export function closeLastModalOnClickOutside(): void {
    document.addEventListener("mousedown", (evt) => {
        const key = Array.from($openedModals()).at(-1)
        if (!key) return

        const target = evt.target as HTMLElement
        const floating = getFloatingElement(key)
        if (!floating) return

        const shouldSkip = findParentElement(target, el => el === floating)

        if (!shouldSkip) closeModal(key)
    })
}
