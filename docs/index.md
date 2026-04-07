---
aside: true
---

# signals-modal

<Badge type="info" class="size">
    <span>Minified</span>
    <span>41.12 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>8.77 KB</span>
</Badge>

**Composable modal management.**

## Example

```ts
const modal = createModal("key", () => {
    const { $status } = withModalStatus();

    const $anchorElement = withAnchorElement();
    const $anchorMeasurement = withAnchorMeasurement({
        $anchorElement,
        $status,
    });

    const $floatingElement = withFloatingElement();
    const $floatingMeasurement = withFloatingMeasurement({
        $floatingElement,
        $status,
    });

    const $boundary = withBoundary({
        $status,
        transform: (rect) => rect,
    });

    const $placement = withPlacement({
        placement: "down-center",
        $anchorMeasurement,
        $boundary,
        $floatingMeasurement,
    });

    const $position = withPosition({
        $anchorMeasurement,
        $boundary,
        $floatingMeasurement,
        $placement,
    });

    return {
        $anchorElement,
        $floatingElement,
        $position,
        $status,
    };
});
```

## Installation

::: code-group

```sh [npm]
npm install @monstermann/signals-modal
```

```sh [pnpm]
pnpm add @monstermann/signals-modal
```

```sh [yarn]
yarn add @monstermann/signals-modal
```

```sh [bun]
bun add @monstermann/signals-modal
```

:::
