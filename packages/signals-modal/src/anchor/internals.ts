import type { Rect } from "@monstermann/fn"
import type { Signal } from "@monstermann/signals"
import { signal, SILENT } from "@monstermann/signals"

export const $anchorElements = signal<ReadonlyMap<string, Signal<HTMLElement | null>>>(new Map(), SILENT)
export const $anchorMeasurements = signal<ReadonlyMap<string, Rect>>(new Map(), SILENT)
