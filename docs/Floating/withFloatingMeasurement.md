# withFloatingMeasurement

```ts
function withFloatingMeasurement(options: {
    $floatingElement: Reactive<HTMLElement | null>;
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

Takes an floating element and continuously measures its position while the modal is visible, to be used to position eg. a popover next to an element. This function must be called inside a `createModal` callback.

## Example

```ts
import {
    createModal,
    withFloatingElement,
    withModalStatus,
    withFloatingMeasurement,
    setFloatingElement,
    setModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $floatingElement = withFloatingElement();
    // Memo({ top: number, left: number, width: number, height: number })
    const $floatingMeasurement = withFloatingMeasurement({
        $status,
        $floatingElement,
    });
});

setFloatingElement("key", document.querySelector(".floating"));
setModalStatus("key", "opened");
```
