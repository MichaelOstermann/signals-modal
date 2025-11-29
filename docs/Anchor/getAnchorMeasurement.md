# getAnchorMeasurement

<Badge type="tip">Reactive</Badge>

```ts
function getAnchorMeasurement(key: string): Rect;
```

Retrieves the current result of [`withAnchorMeasurement`](./withAnchorMeasurement) or [`withMouseAnchor`](./withMouseAnchor), falling back to an empty `Rect`.

## Example

```ts
import {
    createModal,
    withAnchorElement,
    withModalStatus,
    withAnchorMeasurement,
    getAnchorMeasurement,
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

// { top: number, left: number, width: number, height: number }
getAnchorMeasurement("key");
```
