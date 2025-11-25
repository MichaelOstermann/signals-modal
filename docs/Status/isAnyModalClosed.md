# isAnyModalClosed

<Badge type="tip">Reactive</Badge>

```ts
function isAnyModalClosed(): boolean;
```

Returns `true` if any modal has status `"closed"`.

## Example

```ts
import {
    createModal,
    withModalStatus,
    isAnyModalClosed,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus("opened");
});

isAnyModalClosed(); // true
```
