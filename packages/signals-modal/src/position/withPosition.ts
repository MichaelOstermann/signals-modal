import type { Memo } from "@monstermann/signals"
import type { ModalPlacement } from "./withPlacement"
import { pipe, Rect } from "@monstermann/fn"
import { INTERNAL, memo } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { roundByDPR } from "../internals/roundByDPR"
import { $positions, getBoundaryDown, getBoundaryLeft, getBoundaryRight, getBoundaryUp } from "./internals"

export interface ModalPosition {
    floatingX: number
    floatingY: number
    maxHeight: number
    maxWidth: number
    originX: number
    originY: number
}

interface PositionResolver {
    (options: {
        anchor: Rect
        boundary: Rect
        floating: Rect
        transform: (rect: Rect) => Rect
    }): ModalPosition
}

type PositionResolvers = Record<ModalPlacement, PositionResolver>

const positionResolvers: PositionResolvers = {
    "down-center": function (o) {
        const boundary = getBoundaryDown(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignCenterX(o.anchor),
            Rect.snapBelow(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.centerX(o.anchor) - Rect.left(floating)
        const originY = 0
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "down-left": function (o) {
        const boundary = getBoundaryDown(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignRight(o.anchor),
            Rect.snapBelow(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.right(o.anchor) - Rect.left(floating)
        const originY = 0
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "down-right": function (o) {
        const boundary = getBoundaryDown(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignLeft(o.anchor),
            Rect.snapBelow(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = 0
        const originY = 0
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "left-center": function (o) {
        const boundary = getBoundaryLeft(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignCenterY(o.anchor),
            Rect.snapLeftOf(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.width(floating)
        const originY = Rect.centerY(o.anchor) - Rect.top(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "left-down": function (o) {
        const boundary = getBoundaryLeft(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignTop(o.anchor),
            Rect.snapLeftOf(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.width(floating)
        const originY = Rect.centerY(o.anchor) - Rect.top(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "left-up": function (o) {
        const boundary = getBoundaryLeft(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignBottom(o.anchor),
            Rect.snapLeftOf(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.width(floating)
        const originY = Rect.centerY(o.anchor) - Rect.top(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "right-center": function (o) {
        const boundary = getBoundaryRight(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignCenterY(o.anchor),
            Rect.snapRightOf(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = 0
        const originY = Rect.centerY(o.anchor) - Rect.top(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "right-down": function (o) {
        const boundary = getBoundaryRight(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignTop(o.anchor),
            Rect.snapRightOf(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = 0
        const originY = Rect.centerY(o.anchor) - Rect.top(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "right-up": function (o) {
        const boundary = getBoundaryRight(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignBottom(o.anchor),
            Rect.snapRightOf(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = 0
        const originY = Rect.centerY(o.anchor) - Rect.top(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "up-center": function (o) {
        const boundary = getBoundaryUp(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignCenterX(o.anchor),
            Rect.snapAbove(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.centerX(o.anchor) - Rect.left(floating)
        const originY = Rect.height(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "up-left": function (o) {
        const boundary = getBoundaryUp(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignRight(o.anchor),
            Rect.snapAbove(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = Rect.right(o.anchor) - Rect.left(floating)
        const originY = Rect.height(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
    "up-right": function (o) {
        const boundary = getBoundaryUp(o.boundary, o.anchor)
        const floating = pipe(
            o.floating,
            Rect.alignLeft(o.anchor),
            Rect.snapAbove(o.anchor),
            Rect.clamp(boundary),
            Rect.transform(roundByDPR),
            o.transform,
        )
        const originX = 0
        const originY = Rect.height(floating)
        return {
            floatingX: Rect.left(floating),
            floatingY: Rect.top(floating),
            maxHeight: Rect.height(boundary),
            maxWidth: Rect.width(boundary),
            originX,
            originY,
        }
    },
}

export function withPosition(options: {
    $anchorMeasurement: () => Rect
    $boundary: () => Rect
    $floatingMeasurement: () => Rect
    $placement: () => ModalPlacement
    transform?: (rect: Rect) => Rect
}): Memo<ModalPosition> {
    const modal = currentModal()

    const $position = memo(() => {
        return positionResolvers[options.$placement()]({
            anchor: options.$anchorMeasurement(),
            boundary: options.$boundary(),
            floating: options.$floatingMeasurement(),
            transform: options.transform ?? (r => r),
        })
    }, INTERNAL)

    $positions(p => p.set(modal.key, $position))

    modal.onDispose(() => {
        $positions((p) => {
            p.delete(modal.key)
            return p
        })
    })

    return $position
}
