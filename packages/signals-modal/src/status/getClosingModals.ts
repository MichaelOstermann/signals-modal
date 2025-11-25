import { $keysToStatus } from "./internals"

export function getClosingModals(): string[] {
    const result: string[] = []
    const map = $keysToStatus()
    for (const [key, $status] of map) {
        if ($status() === "closing") result.push(key)
    }
    return result
}
