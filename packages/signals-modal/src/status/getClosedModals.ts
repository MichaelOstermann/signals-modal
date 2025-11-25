import { $keysToStatus } from "./internals"

export function getClosedModals(): string[] {
    const result: string[] = []
    const map = $keysToStatus()
    for (const [key, $status] of map) {
        if ($status() === "closed") result.push(key)
    }
    return result
}
