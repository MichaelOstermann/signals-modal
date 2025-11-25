import { $floatingElements } from "./internals"

export function getFloatingElement(key: string): HTMLElement | undefined {
    return $floatingElements().get(key)?.() ?? undefined
}
