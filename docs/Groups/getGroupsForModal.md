# getGroupsForModal

<Badge type="tip">Reactive</Badge>

```ts
function getGroupsForModal(key: string): ReadonlySet<string>;
```

Returns all groups the given `key` belongs to.

## Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    getGroupsForModal,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.dialog]);
});

getGroupsForModal("key"); // Set(["dialog"])
```
