# withPlacement

```ts
function withPlacement(options: {
    placement: ModalPlacementOption;
    $boundary: () => Rect;
    $anchorMeasurement: () => Rect;
    $floatingMeasurement: () => Rect;
}): Memo<ModalPlacement>;

type ModalPlacementOption =
    | "vertical-center"
    | "vertical-left"
    | "vertical-right"
    | "horizontal-center"
    | "horizontal-up"
    | "horizontal-down"
    | "up-center"
    | "down-center"
    | "left-down"
    | "right-down";

type ModalPlacement =
    | "down-center"
    | "down-left"
    | "down-right"
    | "left-center"
    | "left-down"
    | "left-up"
    | "right-center"
    | "right-down"
    | "right-up"
    | "up-center"
    | "up-left"
    | "up-right";
```

Takes a `ModalPlacementOption` and resolves it to `ModalPlacement`, picking whichever side has more space. This function must be called inside a `createModal` callback.

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
});
```
