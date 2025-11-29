---
aside: true
---

# signals-modal

<Badge type="info" class="size">
    <span>Minified</span>
    <span>29.46 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>6.34 KB</span>
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

const anchor = document.querySelector(".anchor");
const floating = document.querySelector(".popover");

// Directly access the returned properties:
modal.$anchor(anchor);
modal.$floating(floating);
modal.$status("opened");
const { floatingX, floatingY, maxHeight, maxWidth } = modal.$position();

// Or use the global utilities:
setAnchorElement("key", anchor);
setFloatingElement("key", floating);
setModalStatus("key", "opened");
const { floatingX, floatingY, maxHeight, maxWidth } = getModalPosition("key");
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
