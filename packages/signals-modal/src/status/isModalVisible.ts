import { isModalClosed } from "./isModalClosed"

export function isModalVisible(key: string): boolean {
    return !isModalClosed(key)
}
