# withMouseAnchor

```ts
function withMouseAnchor(options: {
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

This can be used to make the mouse cursor the anchor, instead of an element. This function must be called inside a `createModal` callback.

## Example

```ts
import {
    createModal,
    withModalStatus,
    withMouseAnchor,
    setModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    // Memo({ top: number, left: number, width: number, height: number })
    const $anchorMeasurement = withMouseAnchor({ $status });
});

// Updates $anchorMeasurement to the current mouse coordinates (once).
setModalStatus("key", "opened");
```
