# withPosition

```ts
function withPosition(options: {
    $boundary: () => Rect;
    $placement: () => ModalPlacement;
    $anchorMeasurement: () => Rect;
    $floatingMeasurement: () => Rect;
    transform?: (rect: Rect) => Rect;
}): Memo<{
    floatingX: number;
    floatingY: number;
    maxHeight: number;
    maxWidth: number;
    originX: number;
    originY: number;
}>;
```

Consumes a range of measurements and calculates the final position for the floating element. This function must be called inside a `createModal` callback.

## Example

```ts
import {
    createModal,
    withModalStatus,
    withAnchorElement,
    withAnchorMeasurement,
    withFloatingElement,
    withFloatingMeasurement,
    withBoundary,
    withPlacement,
    withPosition,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $anchorElement = withAnchorElement();
    const $floatingElement = withFloatingElement();
    const $anchorMeasurement = withAnchorMeasurement({
        $status,
        $anchorElement,
    });
    const $floatingMeasurement = withFloatingMeasurement({
        $status,
        $floatingElement,
    });
    const $boundary = withBoundary({ $status });
    const $placement = withPlacement({
        placement: "vertical-center",
        $boundary,
        $anchorMeasurement,
        $floatingMeasurement,
    });
    const $position = withPosition({
        $boundary,
        $placement,
        $anchorMeasurement,
        $floatingMeasurement,
    });
});
```
