import { untrack } from "@monstermann/signals"
import { $keysToStatus } from "./internals"

export function openModal(key: string): void {
    untrack(() => {
        const $status = $keysToStatus().get(key)
        if (!$status) return
        if ($status() === "opening") return
        if ($status() === "opened") return
        $status("opening")
    })
}
