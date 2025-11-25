# closeLastModalOnClickOutside

```ts
function closeLastModalOnClickOutside(): void;
```

Sets up a global `mousedown` listener that closes the last opened modal when clicked outside the floating element.

## Example

```ts
import { closeLastModalOnClickOutside } from "@monstermann/signals-modal";

closeLastModalOnClickOutside();
```
