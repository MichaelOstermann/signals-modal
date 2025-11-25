import { $keysToStatus } from "./internals"

export function isModalOpening(key: string): boolean {
    return $keysToStatus().get(key)?.() === "opening"
}
