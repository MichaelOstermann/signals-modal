# withAnchorMeasurement

```ts
function withAnchorMeasurement(options: {
    $anchorElement: Reactive<HTMLElement | null>;
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

Takes an anchor element and continuously measures its position while the modal is visible, to be used to position eg. a popover next to an element. This function must be called inside a `createModal` callback.

The optional `transform` option can be used to eg. make the anchor bigger, resulting with a margin between the anchor and floating popover.

## Example

```ts
import {
    createModal,
    withAnchorElement,
    withModalStatus,
    withAnchorMeasurement,
    setAnchorElement,
    setModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $anchorElement = withAnchorElement();
    // Memo({ top: number, left: number, width: number, height: number })
    const $anchorMeasurement = withAnchorMeasurement({
        $status,
        $anchorElement,
    });
});

setAnchorElement("key", document.querySelector(".anchor"));
setModalStatus("key", "opened");
```
