import { isModalOpened } from "./isModalOpened"
import { isModalOpening } from "./isModalOpening"

export function isModalOpen(key: string): boolean {
    return isModalOpening(key)
        || isModalOpened(key)
}
