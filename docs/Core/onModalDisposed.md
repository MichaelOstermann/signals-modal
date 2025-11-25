# onModalDisposed

```ts
const onModalDisposed: Emitter<string>;
```

An emitter that fires when a modal gets disposed. The emitted value is the modal key.

## Example

```ts
import { createModal, onModalDisposed } from "@monstermann/signals-modal";

const modal = createModal("key", () => {});

const stopListening = onModalDisposed((key) => {
    console.log(`Modal ${key} disposed`);
});

modal.dispose();

stopListening();
```
