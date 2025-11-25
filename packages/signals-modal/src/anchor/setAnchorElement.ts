import { $anchorElements } from "./internals"

export function setAnchorElement(key: string, element: HTMLElement | null): void {
    $anchorElements().get(key)?.(element)
}
