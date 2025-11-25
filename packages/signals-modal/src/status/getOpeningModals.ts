import { $keysToStatus } from "./internals"

export function getOpeningModals(): string[] {
    const result: string[] = []
    const map = $keysToStatus()
    for (const [key, $status] of map) {
        if ($status() === "opening") result.push(key)
    }
    return result
}
