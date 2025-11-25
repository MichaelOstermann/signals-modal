import { $keysToStatus } from "./internals"

export function isModalClosed(key: string): boolean {
    const $status = $keysToStatus().get(key)
    return $status === undefined || $status() === "closed"
}
