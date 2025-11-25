import { $anchorElements } from "./internals"

export function getAnchorElement(key: string): HTMLElement | undefined {
    return $anchorElements().get(key)?.() ?? undefined
}
