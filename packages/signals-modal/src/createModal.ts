import type { MaybeDispose } from "@monstermann/signals"
import { context, disposer, emitter, isDisposed, SILENT } from "@monstermann/signals"
import { closeModal } from "./status/closeModal"
import { isModalClosed } from "./status/isModalClosed"
import { onModalClosed } from "./status/onModalClosed"

export interface ModalContext {
    key: string
    dispose: () => void
    isDisposed: () => boolean
    onDispose: (dispose: MaybeDispose) => void
}

const modalCtx = context<ModalContext>()

export const onModalDisposed = emitter<string>(SILENT)

export function currentModal(): ModalContext {
    const ctx = modalCtx()
    if (!ctx) throw new Error("`currentModal` called outside of `createModal` context.")
    return ctx
}

export function createModal<T extends object>(
    key: string,
    setup: () => T,
): ModalContext & T {
    const dispose = disposer()
    const nextCtx: ModalContext = {
        key,
        onDispose: dispose,
        isDisposed: () => isDisposed(dispose),
        dispose() {
            if (isModalClosed(key)) {
                dispose()
                onModalDisposed(key)
            }
            else {
                onModalClosed(k => k === key && this.dispose())
                closeModal(key)
            }
        },
    }
    const prevCtx = modalCtx(nextCtx)

    try {
        const result = setup()
        return { ...nextCtx, ...result }
    }
    finally {
        modalCtx(prevCtx)
    }
}
