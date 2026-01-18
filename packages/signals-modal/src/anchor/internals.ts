import type { Rect } from "@monstermann/geometry"
import type { Signal } from "@monstermann/signals"
import { signal } from "@monstermann/signals"

export const $anchorElements = signal<Map<string, Signal<HTMLElement | null>>>(new Map(), {
    mutable: true,
    silent: true,
})

export const $anchorMeasurements = signal<Map<string, Signal<Rect>>>(new Map(), {
    mutable: true,
    silent: true,
})
