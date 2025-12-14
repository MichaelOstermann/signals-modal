import type { Memo, Reactive } from "@monstermann/signals"
import type { ModalStatus } from "../status/types"
import { Rect } from "@monstermann/fn"
import { effect, INTERNAL, memo, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { observePosition } from "../internals/observePosition"
import { $anchorMeasurements } from "./internals"

export function withAnchorMeasurement(options: {
    $anchorElement: Reactive<HTMLElement | null>
    $status: Reactive<ModalStatus>
    transform?: (rect: Rect) => Rect
}): Memo<Rect> {
    const modal = currentModal()

    const $rect = signal<Rect>(Rect.origin, {
        equals: Rect.isEqual,
        internal: true,
    })

    const $measurement = memo(() => options.transform
        ? options.transform($rect())
        : $rect(), INTERNAL)

    modal.onDispose(effect(() => {
        const element = options.$anchorElement()
        const status = options.$status()
        if (!element) return
        if (status === "closed") return
        $rect(Rect.fromElement(element))
        return observePosition(element, bounds => $rect(Rect.fromDOMRect(bounds)))
    }, INTERNAL))

    $anchorMeasurements(map => map.set(modal.key, $rect))

    modal.onDispose(() => {
        $anchorMeasurements((map) => {
            map.delete(modal.key)
            return map
        })
    })

    return $measurement
}
