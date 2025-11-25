# openModal

```ts
function openModal(key: string): void;
```

Opens a modal by setting its status to `"opening"`. Does nothing if the modal is already `"opening"` or `"opened"`, or if the modal doesn't exist.

## Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

openModal("key");
```
