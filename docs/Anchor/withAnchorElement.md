# withAnchorElement

```ts
function withAnchorElement(
    anchorElement?: HTMLElement,
): Signal<HTMLElement | null>;
```

Assigns an anchor element to the current modal. This function must be called inside a `createModal` callback.

## Example

```ts
import {
    createModal,
    withAnchorElement,
    setAnchorElement,
    getAnchorElement,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withAnchorElement();
});

setAnchorElement("key", document.querySelector(".anchor"));
getAnchorElement("key"); // HTMLElement
```
