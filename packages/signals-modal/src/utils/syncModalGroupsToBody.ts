import { effect, INTERNAL, memo } from "@monstermann/signals"
import { getGroupsForModal } from "../groups/getGroupsForModal"
import { getVisibleModals } from "../status/getVisibleModals"

const $classes = memo(() => {
    const modals = getVisibleModals()
    const clx = new Set<string>()
    for (const modal of modals) {
        for (const group of getGroupsForModal(modal)) {
            clx.add(`has-${group}`)
        }
    }
    return Array.from(clx).sort().join(" ")
}, INTERNAL)

/**
 * # syncModalGroupsToBody
 *
 * ```ts
 * function syncModalGroupsToBody(): void;
 * ```
 *
 * Sets up a global `Effect` that adds `has-${group}` class names to `document.body` for opened modals.
 *
 * ## Example
 *
 * ```ts
 * import {
 *     createModal,
 *     withModalGroups,
 *     withModalStatus,
 *     syncModalGroupsToBody,
 *     openModal,
 *     closeModal,
 * } from "@monstermann/signals-modal";
 *
 * syncModalGroupsToBody();
 *
 * const modal = createModal("key", () => {
 *     const $groups = withModalGroups(["dialog"]);
 *     const { $status } = withModalStatus();
 *     return { $groups, $status };
 * });
 *
 * document.body.classList; // []
 * openModal("key");
 * document.body.classList; // ["has-dialog"]
 * closeModal("key");
 * document.body.classList; // []
 * ```
 *
 */
export function syncModalGroupsToBody(): void {
    effect(() => {
        if (!$classes()) return
        const classes = $classes().split(" ")
        document.body.classList.add(...classes)
        return () => {
            document.body.classList.remove(...classes)
        }
    }, INTERNAL)
}
