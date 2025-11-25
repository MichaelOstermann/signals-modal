# currentModal

```ts
function currentModal(): {
    key: string;
    dispose: () => void;
    onDispose: (dispose: MaybeDispose) => void;
};
```

Retrieves the current modal.

## Example

```ts
import { createModal, currentModal } from "@monstermann/signals-modal";

createModal(() => {
    const modal = currentModal();
});
```
