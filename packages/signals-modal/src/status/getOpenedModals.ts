import { $keysToStatus } from "./internals"

export function getOpenedModals(): string[] {
    const result: string[] = []
    const map = $keysToStatus()
    for (const [key, $status] of map) {
        if ($status() === "opened") result.push(key)
    }
    return result
}
