# withCloseOnScroll

```ts
function withCloseOnScroll(options: {
    $anchorElement: Reactive<HTMLElement | null>;
    $status: Reactive<ModalStatus>;
}): void;
```

Automatically closes the modal when any scrollable ancestor of the anchor element is scrolled. This function must be called inside a `createModal` callback.

The function listens for scroll events on all scrollable parent elements of the anchor element and triggers a close when scrolling occurs. Scroll listeners are only active when the modal is opening or opened (not when closing or closed).

## Example

```ts
import {
    createModal,
    withModalStatus,
    withAnchorElement,
    withCloseOnScroll,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $anchorElement = withAnchorElement();

    withCloseOnScroll({
        $status,
        $anchorElement,
    });
});
```
