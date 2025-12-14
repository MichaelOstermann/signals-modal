import type { Memo } from "@monstermann/signals"
import { Rect } from "@monstermann/fn"
import { INTERNAL, memo } from "@monstermann/signals"
import { currentModal } from "../createModal"
import { $placements, getBoundaryDown, getBoundaryLeft, getBoundaryRight, getBoundaryUp } from "./internals"

export type ModalPlacementOption =
    | "vertical-center"
    | "vertical-left"
    | "vertical-right"
    | "horizontal-center"
    | "horizontal-up"
    | "horizontal-down"
    | "up-center"
    | "down-center"
    | "left-down"
    | "right-down"

export type ModalPlacement =
    | "down-center"
    | "down-left"
    | "down-right"
    | "left-center"
    | "left-down"
    | "left-up"
    | "right-center"
    | "right-down"
    | "right-up"
    | "up-center"
    | "up-left"
    | "up-right"

interface PlacementResolver {
    (options: { anchor: Rect, boundary: Rect, floating: Rect }): ModalPlacement
}

type PlacementResolvers = Record<ModalPlacementOption, PlacementResolver>

const placementResolvers: PlacementResolvers = {
    "down-center": () => "down-center",
    "left-down": () => "left-down",
    "right-down": () => "right-down",
    "up-center": () => "up-center",
    "horizontal-center": function (o) {
        const left = getBoundaryLeft(o.boundary, o.anchor)
        const right = getBoundaryRight(o.boundary, o.anchor)
        return Rect.width(right) >= Rect.width(left)
            ? "right-center"
            : "left-center"
    },
    "horizontal-down": function (o) {
        const left = getBoundaryLeft(o.boundary, o.anchor)
        const right = getBoundaryRight(o.boundary, o.anchor)
        return Rect.width(right) >= Rect.width(left)
            ? "right-down"
            : "left-down"
    },
    "horizontal-up": function (o) {
        const left = getBoundaryLeft(o.boundary, o.anchor)
        const right = getBoundaryRight(o.boundary, o.anchor)
        return Rect.width(right) >= Rect.width(left)
            ? "right-up"
            : "left-up"
    },
    "vertical-center": function (o) {
        const up = getBoundaryUp(o.boundary, o.anchor)
        const down = getBoundaryDown(o.boundary, o.anchor)
        return Rect.height(down) >= Rect.height(up)
            ? "down-center"
            : "up-center"
    },
    "vertical-left": function (o) {
        const up = getBoundaryUp(o.boundary, o.anchor)
        const down = getBoundaryDown(o.boundary, o.anchor)
        return Rect.height(down) >= Rect.height(up)
            ? "down-left"
            : "up-left"
    },
    "vertical-right": function (o) {
        const up = getBoundaryUp(o.boundary, o.anchor)
        const down = getBoundaryDown(o.boundary, o.anchor)
        return Rect.height(down) >= Rect.height(up)
            ? "down-right"
            : "up-right"
    },
}

export function withPlacement(options: {
    placement: ModalPlacementOption
    $anchorMeasurement: () => Rect
    $boundary: () => Rect
    $floatingMeasurement: () => Rect
}): Memo<ModalPlacement> {
    const modal = currentModal()

    const $placement = memo(() => {
        return placementResolvers[options.placement]({
            anchor: options.$anchorMeasurement(),
            boundary: options.$boundary(),
            floating: options.$floatingMeasurement(),
        })
    }, INTERNAL)

    $placements(p => p.set(modal.key, $placement))

    modal.onDispose(() => {
        $placements((p) => {
            p.delete(modal.key)
            return p
        })
    })

    return $placement
}
