# closeLastModalOnEsc

```ts
function closeLastModalOnEsc(): void;
```

Sets up a global `keydown` listener that closes the last opened modal when `esc` is pressed, unless the target was an editable element such as `<input>`.

## Example

```ts
import { closeLastModalOnEsc } from "@monstermann/signals-modal";

closeLastModalOnEsc();
```
