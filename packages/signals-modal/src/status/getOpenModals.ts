import { $keysToStatus } from "./internals"

export function getOpenModals(): string[] {
    const result: string[] = []
    const map = $keysToStatus()
    for (const [key, $status] of map) {
        if ($status() === "opening" || $status() === "opened") result.push(key)
    }
    return result
}
