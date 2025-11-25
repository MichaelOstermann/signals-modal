import { $floatingElements } from "./internals"

export function setFloatingElement(key: string, element: HTMLElement | null): void {
    $floatingElements().get(key)?.(element)
}
