# getModalPosition

<Badge type="tip">Reactive</Badge>

```ts
function getModalPosition(key: string): ModalPosition | undefined;
```

Returns the current result of [`withPosition`](./withPosition).

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
    getModalPosition,
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

getModalPosition("key"); // ModalPosition | undefined
```
