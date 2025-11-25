import { untrack } from "@monstermann/signals"
import { $keysToStatus } from "./internals"

export function closeAllModals(): void {
    untrack(() => {
        for (const $status of $keysToStatus().values()) {
            if ($status() === "closed") continue
            if ($status() === "closing") continue
            $status("closing")
        }
    })
}
