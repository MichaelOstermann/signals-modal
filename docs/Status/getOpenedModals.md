# getOpenedModals

<Badge type="tip">Reactive</Badge>

```ts
function getOpenedModals(): string[];
```

Returns an array of all modal keys with status `"opened"`.

## Example

```ts
import {
    createModal,
    withModalStatus,
    getOpenedModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus("opened");
});

createModal("modal2", () => {
    withModalStatus("opened");
});

getOpenedModals(); // ["modal1", "modal2"]
```
