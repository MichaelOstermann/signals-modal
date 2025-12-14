import type { Memo, Reactive } from "@monstermann/signals"
import type { ModalStatus } from "../status/types"
import { Rect } from "@monstermann/fn"
import { effect, INTERNAL, memo, peek, signal } from "@monstermann/signals"
import { $mouseX, $mouseY } from "@monstermann/signals-web"
import { currentModal } from "../createModal"
import { $anchorMeasurements } from "./internals"

export function withMouseAnchor(options: {
    $status: Reactive<ModalStatus>
    transform?: (rect: Rect) => Rect
}): Memo<Rect> {
    const modal = currentModal()

    const $rect = signal(Rect.origin, {
        equals: Rect.isEqual,
        internal: true,
    })

    const $measurement = memo(() => options.transform
        ? options.transform($rect())
        : $rect(), INTERNAL)

    modal.onDispose(effect(() => {
        if (options.$status() === "closed") {
            $rect(Rect.origin)
        }
        else if (Rect.isOrigin($rect())) {
            $rect({
                height: 0,
                left: peek($mouseX()),
                top: peek($mouseY()),
                width: 0,
            })
        }
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
