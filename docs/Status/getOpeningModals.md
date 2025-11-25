# getOpeningModals

<Badge type="tip">Reactive</Badge>

```ts
function getOpeningModals(): string[];
```

Returns an array of all modal keys with status `"opening"`.

## Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    getOpeningModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus();
});

openModal("modal1");
openModal("modal2");

getOpeningModals(); // ["modal1", "modal2"]
```
