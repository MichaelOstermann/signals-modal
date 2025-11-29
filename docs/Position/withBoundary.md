# withBoundary

```ts
function withBoundary(options: {
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

Constructs a `Rect` resembling the window dimensions, to be fed into [`withPlacement`](./withPlacement) and [`withPosition`](./withPosition), used to constrain the floating element to be within the window boundary. This function must be called inside a `createModal` callback.

The optional `transform` option can be used to eg. make the `Rect` smaller, increasing the distance between the floating element and the edges of the window.

## Example

```ts
import {
    createModal,
    withModalStatus,
    withBoundary,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $boundary = withBoundary({ $status });
});
```
