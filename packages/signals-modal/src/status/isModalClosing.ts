import { $keysToStatus } from "./internals"

export function isModalClosing(key: string): boolean {
    return $keysToStatus().get(key)?.() === "closing"
}
