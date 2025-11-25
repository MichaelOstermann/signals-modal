# syncModalGroupsToBody

```ts
function syncModalGroupsToBody(): void;
```

Sets up a global `Effect` that adds `has-${group}` class names to `document.body` for opened modals.

## Example

```ts
import {
    createModal,
    withModalGroups,
    withModalStatus,
    syncModalGroupsToBody,
    openModal,
    closeModal,
} from "@monstermann/signals-modal";

syncModalGroupsToBody();

const modal = createModal("key", () => {
    const $groups = withModalGroups(["dialog"]);
    const $status = withModalStatus();
    return { $groups, $status };
});

document.body.classList; // []
openModal("key");
document.body.classList; // ["has-dialog"]
closeModal("key");
document.body.classList; // []
```
