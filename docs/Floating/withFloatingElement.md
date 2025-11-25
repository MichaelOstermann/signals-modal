# withFloatingElement

```ts
function withFloatingElement(
    floatingElement?: HTMLElement,
): Signal<HTMLElement | null>;
```

Assigns an floating element to the current modal. This function must be called inside a `createModal` callback.

## Example

```ts
import {
    createModal,
    withFloatingElement,
    setFloatingElement,
    getFloatingElement,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withFloatingElement();
});

setFloatingElement("key", document.querySelector(".floating"));
getFloatingElement("key"); // HTMLElement
```
