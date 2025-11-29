# getOpenModals

<Badge type="tip">Reactive</Badge>

```ts
function getOpenModals(): string[];
```

Returns an array of all modal keys with status `"opening"` or `"opened"`.

## Example

```ts
import {
    createModal,
    withModalStatus,
    getOpenModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus("opening");
});

createModal("modal2", () => {
    withModalStatus("opened");
});

createModal("modal3", () => {
    withModalStatus("closed");
});

getOpenModals(); // ["modal1", "modal2"]
```
