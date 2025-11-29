# withModalStatus

```ts
function withModalStatus(status: ModalStatus = "closed"): {
    $status: Signal<ModalStatus>;
    $isOpen: Memo<boolean>;
    close: () => void;
    open: () => void;
};
```

Creates and returns a status signal for the current modal. This function must be called inside a `createModal` callback.

The optional `status` parameter sets the initial status of the modal (defaults to `"closed"`).

**ModalStatus** can be one of: `"closed"`, `"opening"`, `"opened"`, or `"closing"`.

## Example

```ts
import { createModal, withModalStatus } from "@monstermann/signals-modal";

// Default to "closed"
createModal("modal1", () => {
    const { $status } = withModalStatus();
    console.log($status()); // "closed"
});

// Start with a different initial status
createModal("modal2", () => {
    const { $status } = withModalStatus("opened");
    console.log($status()); // "opened"

    // Update the status
    $status("closing");
});
```
