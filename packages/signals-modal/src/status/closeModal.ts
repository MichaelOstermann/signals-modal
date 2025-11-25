import { untrack } from "@monstermann/signals"
import { $keysToStatus } from "./internals"

export function closeModal(key: string): void {
    untrack(() => {
        const $status = $keysToStatus().get(key)
        if (!$status) return
        if ($status() === "closing") return
        if ($status() === "closed") return
        $status("closing")
    })
}
