import type { ModalPlacement } from "./withPlacement"
import type { ModalPosition } from "./withPosition"
import { Rect } from "@monstermann/fn"
import { signal, SILENT } from "@monstermann/signals"

export const $positions = signal<ReadonlyMap<string, ModalPosition>>(new Map(), SILENT)
export const $placements = signal<ReadonlyMap<string, ModalPlacement>>(new Map(), SILENT)

export function getBoundaryUp(boundary: Rect, anchor: Rect): Rect {
    return Rect.setBottom(boundary, Rect.top(anchor))
}

export function getBoundaryDown(boundary: Rect, anchor: Rect): Rect {
    return Rect.setTop(boundary, Rect.bottom(anchor))
}

export function getBoundaryLeft(boundary: Rect, anchor: Rect): Rect {
    return Rect.setRight(boundary, Rect.left(anchor))
}

export function getBoundaryRight(boundary: Rect, anchor: Rect): Rect {
    return Rect.setLeft(boundary, Rect.right(anchor))
}
