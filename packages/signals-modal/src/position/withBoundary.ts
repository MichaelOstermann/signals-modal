import type { Memo, Reactive } from "@monstermann/signals"
import type { ModalStatus } from "../status/types"
import { Rect } from "@monstermann/fn"
import { effect, INTERNAL, memo, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"

export function withBoundary(options: {
    $status: Reactive<ModalStatus>
    transform?: (rect: Rect) => Rect
}): Memo<Rect> {
    const modal = currentModal()

    const $rect = signal(Rect.origin, {
        equals: Rect.isEqual,
        internal: true,
    })

    const $boundary = memo(() => options.transform
        ? options.transform($rect())
        : $rect(), INTERNAL)

    modal.onDispose(effect(() => {
        if (options.$status() === "closed") return
        const ac = new AbortController()
        $rect(Rect.fromWindow())
        window.addEventListener("resize", () => {
            $rect(Rect.fromWindow())
        }, { passive: true, signal: ac.signal })
        return () => ac.abort()
    }, INTERNAL))

    return $boundary
}
