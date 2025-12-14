import type { Memo, Reactive } from "@monstermann/signals"
import type { ModalStatus } from "../status/types"
import { Rect } from "@monstermann/fn"
import { effect, INTERNAL, memo, signal } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { observeDimensions } from "../internals/observeDimensions"
import { $floatingMeasurements } from "./internals"

export function withFloatingMeasurement(options: {
    $floatingElement: Reactive<HTMLElement | null>
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
        const element = options.$floatingElement()
        const status = options.$status()
        if (!element) return
        if (status === "closed") return
        const bounds = Rect.fromElement(element)
        $rect({
            height: bounds.height,
            left: 0,
            top: 0,
            width: bounds.width,
        })
        return observeDimensions(element, bounds => $rect({
            height: bounds.height,
            left: 0,
            top: 0,
            width: bounds.width,
        }))
    }, INTERNAL))

    $floatingMeasurements(map => map.set(modal.key, $rect))

    modal.onDispose(() => {
        $floatingMeasurements((map) => {
            map.delete(modal.key)
            return map
        })
    })

    return $measurement
}
