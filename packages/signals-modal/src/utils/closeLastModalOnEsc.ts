import { findParentElement } from "../internals/findParentElement"
import { closeModal } from "../status/closeModal"
import { $openedModals } from "../status/internals"

export function closeLastModalOnEsc(): void {
    document.addEventListener("keydown", (evt) => {
        if (evt.key !== "Escape") return

        const key = Array.from($openedModals()).at(-1)
        if (!key) return

        const target = evt.target as HTMLElement
        const shouldSkip = target.nodeName === "INPUT"
            || target.nodeName === "TEXTAREA"
            || findParentElement(target, el => el.getAttribute("contenteditable") === "true")

        if (!shouldSkip) closeModal(key)
    })
}
