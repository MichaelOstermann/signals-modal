import { $keysToStatus } from "./internals"

export function isModalOpened(key: string): boolean {
    return $keysToStatus().get(key)?.() === "opened"
}
