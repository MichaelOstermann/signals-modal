# createModal

```ts
function createModal(
    key: string,
    setup: () => T,
): T & {
    key: string;
    dispose: () => void;
    isDisposed: () => boolean;
    onDispose: (dispose: MaybeDispose) => void;
};
```

Creates a new modal.

## Example

```ts
import { createModal } from "@monstermann/signals-modal";

const modal = createModal("key", () => ({}));
modal.key;
modal.dispose();
modal.onDispose(callback);
```
