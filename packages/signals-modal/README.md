<div align="center">

<h1>signals-modal</h1>

![Minified](https://img.shields.io/badge/Minified-41.12_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-8.77_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**Composable modal management.**

[Documentation](https://MichaelOstermann.github.io/signals-modal)

</div>

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

## Anchor

### getAnchorElement

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getAnchorElement(key: string): HTMLElement | undefined;
```

Retrieves the current anchor element for the given `key`.

#### Example

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

### getAnchorMeasurement

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getAnchorMeasurement(key: string): Rect;
```

Retrieves the current result of `withAnchorMeasurement` or `withMouseAnchor`, falling back to an empty `Rect`.

#### Example

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

### setAnchorElement

```ts
function setAnchorElement(key: string, element: HTMLElement | null): void;
```

Sets the current anchor element for the given `key`.

#### Example

```ts
import {
    createModal,
    withAnchorElement,
    getAnchorElement,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withAnchorElement();
});

setAnchorElement("key", document.querySelector(".anchor"));
```

### withAnchorElement

```ts
function withAnchorElement(
    anchorElement?: HTMLElement,
): Signal<HTMLElement | null>;
```

Assigns an anchor element to the current modal. This function must be called inside a `createModal` callback.

#### Example

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

### withAnchorMeasurement

```ts
function withAnchorMeasurement(options: {
    $anchorElement: Reactive<HTMLElement | null>;
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

Takes an anchor element and continuously measures its position while the modal is visible, to be used to position eg. a popover next to an element. This function must be called inside a `createModal` callback.

The optional `transform` option can be used to eg. make the anchor bigger, resulting with a margin between the anchor and floating popover.

#### Example

```ts
import {
    createModal,
    withAnchorElement,
    withModalStatus,
    withAnchorMeasurement,
    setAnchorElement,
    setModalStatus,
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

setAnchorElement("key", document.querySelector(".anchor"));
setModalStatus("key", "opened");
```

### withMouseAnchor

```ts
function withMouseAnchor(options: {
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

This can be used to make the mouse cursor the anchor, instead of an element. This function must be called inside a `createModal` callback.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    withMouseAnchor,
    setModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    // Memo({ top: number, left: number, width: number, height: number })
    const $anchorMeasurement = withMouseAnchor({ $status });
});

// Updates $anchorMeasurement to the current mouse coordinates (once).
setModalStatus("key", "opened");
```

## Core

### createModal

```ts
function createModal(
    key: string,
    setup: () => T,
): T & {
    key: string;
    dispose: () => void;
    isDisposed: () => boolean;
    onDispose: (dispose: MaybeDispose) => void;
};
```

Creates a new modal.

#### Example

```ts
import { createModal } from "@monstermann/signals-modal";

const modal = createModal("key", () => ({}));
modal.key;
modal.dispose();
modal.onDispose(callback);
```

### currentModal

```ts
function currentModal(): {
    key: string;
    dispose: () => void;
    onDispose: (dispose: MaybeDispose) => void;
};
```

Retrieves the current modal.

#### Example

```ts
import { createModal, currentModal } from "@monstermann/signals-modal";

createModal(() => {
    const modal = currentModal();
});
```

### onModalDisposed

```ts
const onModalDisposed: Emitter<string>;
```

An emitter that fires when a modal gets disposed. The emitted value is the modal key.

#### Example

```ts
import { createModal, onModalDisposed } from "@monstermann/signals-modal";

const modal = createModal("key", () => {});

const stopListening = onModalDisposed((key) => {
    console.log(`Modal ${key} disposed`);
});

modal.dispose();

stopListening();
```

## Floating

### getFloatingElement

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getFloatingElement(key: string): HTMLElement | undefined;
```

Retrieves the current floating element for the given `key`.

#### Example

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

### getFloatingMeasurement

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getFloatingMeasurement(key: string): Rect;
```

Retrieves the current result of `withFloatingMeasurement`, falling back to an empty `Rect`.

#### Example

```ts
import {
    createModal,
    withFloatingElement,
    withModalStatus,
    withFloatingMeasurement,
    getFloatingMeasurement,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $floatingElement = withFloatingElement();
    // Memo({ top: number, left: number, width: number, height: number })
    const $floatingMeasurement = withFloatingMeasurement({
        $status,
        $floatingElement,
    });
});

// { top: number, left: number, width: number, height: number }
getFloatingMeasurement("key");
```

### setFloatingElement

```ts
function setFloatingElement(key: string, element: HTMLElement | null): void;
```

Sets the current floating element for the given `key`.

#### Example

```ts
import {
    createModal,
    withFloatingElement,
    getFloatingElement,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withFloatingElement();
});

setFloatingElement("key", document.querySelector(".floating"));
```

### withFloatingElement

```ts
function withFloatingElement(
    floatingElement?: HTMLElement,
): Signal<HTMLElement | null>;
```

Assigns an floating element to the current modal. This function must be called inside a `createModal` callback.

#### Example

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

### withFloatingMeasurement

```ts
function withFloatingMeasurement(options: {
    $floatingElement: Reactive<HTMLElement | null>;
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

Takes an floating element and continuously measures its position while the modal is visible, to be used to position eg. a popover next to an element. This function must be called inside a `createModal` callback.

#### Example

```ts
import {
    createModal,
    withFloatingElement,
    withModalStatus,
    withFloatingMeasurement,
    setFloatingElement,
    setModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $floatingElement = withFloatingElement();
    // Memo({ top: number, left: number, width: number, height: number })
    const $floatingMeasurement = withFloatingMeasurement({
        $status,
        $floatingElement,
    });
});

setFloatingElement("key", document.querySelector(".floating"));
setModalStatus("key", "opened");
```

## Groups

### getDialogs

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getDialogs(): ReadonlySet<string>;
```

Returns all dialog keys from the `modalGroups.dialog` group.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    getDialogs,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.dialog]);
});

getDialogs(); // Set(["key"])
```

### getGroupsForModal

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getGroupsForModal(key: string): ReadonlySet<string>;
```

Returns all groups the given `key` belongs to.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    getGroupsForModal,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.dialog]);
});

getGroupsForModal("key"); // Set(["dialog"])
```

### getModalsForGroup

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getModalsForGroup(group: string): ReadonlySet<string>;
```

Returns all keys the given `group` belongs to.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    getModalsForGroup,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.dialog]);
});

getModalsForGroup(modalGroups.dialog); // Set(["key"])
```

### getPopovers

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getPopovers(): ReadonlySet<string>;
```

Returns all popover keys from the `modalGroups.popover` group.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    getPopovers,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.popover]);
});

getPopovers(); // Set(["key"])
```

### getTooltips

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getTooltips(): ReadonlySet<string>;
```

Returns all tooltip keys from the `modalGroups.tooltip` group.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    getTooltips,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.tooltip]);
});

getTooltips(); // Set(["key"])
```

### isDialog

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isDialog(key: string): boolean;
```

Returns a boolean indicating whether the given `key` belongs to the `modalGroups.dialog` group.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    isDialog,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.popover]);
});

isDialog("key"); // true
```

### isModalInGroup

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalInGroup(key: string, group: string): boolean;
```

Returns a boolean indicating whether the given `key` belongs to the `group`.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    isModalInGroup,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.popover]);
});

isModalInGroup("key", modalGroups.popover); // true
```

### isPopover

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isPopover(key: string): boolean;
```

Returns a boolean indicating whether the given `key` belongs to the `modalGroups.popover` group.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    isPopover,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.popover]);
});

isPopover("key"); // true
```

### isTooltip

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isTooltip(key: string): boolean;
```

Returns a boolean indicating whether the given `key` belongs to the `modalGroups.tooltip` group.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    modalGroups,
    isTooltip,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups([modalGroups.popover]);
});

isTooltip("key"); // true
```

### modalGroups

```ts
const modalGroups = {
    dialog: "dialog",
    popover: "popover",
    tooltip: "tooltip",
};
```

A record containing common modal groups.

### withModalGroups

```ts
function withModalGroups(groups: Iterable<string>): Memo<ReadonlySet<string>>;
```

Assigns the current modal to a list of groups. Can be used to for example mark the modal as a dialog/popover/tooltip. This function must be called inside a `createModal` callback.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    getDialogs,
    getGroupsForModal,
    getModalsForGroup,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalGroups(["dialog"]);
});

getGroupsForModal("key"); // Set(["dialog"])
getModalsForGroup("dialog"); // Set(["key"])
```

## Position

### getModalPlacement

```ts
function getModalPlacement(key: string): ModalPlacement | undefined;
```

Returns the current placement for the given `key`.

#### Example

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
    getModalPlacement,
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

getModalPlacement("key"); // up-center | down-center
```

### getModalPosition

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getModalPosition(key: string): ModalPosition | undefined;
```

Returns the current result of `withPosition`.

#### Example

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

### withBoundary

```ts
function withBoundary(options: {
    $status: Reactive<ModalStatus>;
    transform?: (rect: Rect) => Rect;
}): Memo<Rect>;
```

Constructs a `Rect` resembling the window dimensions, to be fed into `withPlacement` and `withPosition`, used to constrain the floating element to be within the window boundary. This function must be called inside a `createModal` callback.

The optional `transform` option can be used to eg. make the `Rect` smaller, increasing the distance between the floating element and the edges of the window.

#### Example

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

### withPlacement

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

#### Example

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

### withPosition

```ts
function withPosition(options: {
    $boundary: () => Rect;
    $placement: () => ModalPlacement;
    $anchorMeasurement: () => Rect;
    $floatingMeasurement: () => Rect;
    transform?: (rect: Rect) => Rect;
}): Memo<{
    floatingX: number;
    floatingY: number;
    maxHeight: number;
    maxWidth: number;
    originX: number;
    originY: number;
}>;
```

Consumes a range of measurements and calculates the final position for the floating element. This function must be called inside a `createModal` callback.

#### Example

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
```

## Scroll

### withCloseOnScroll

```ts
function withCloseOnScroll(options: {
    $anchorElement: Reactive<HTMLElement | null>;
    $status: Reactive<ModalStatus>;
}): void;
```

Automatically closes the modal when any scrollable ancestor of the anchor element is scrolled. This function must be called inside a `createModal` callback.

The function listens for scroll events on all scrollable parent elements of the anchor element and triggers a close when scrolling occurs. Scroll listeners are only active when the modal is opening or opened (not when closing or closed).

#### Example

```ts
import {
    createModal,
    withModalStatus,
    withAnchorElement,
    withCloseOnScroll,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    const $anchorElement = withAnchorElement();

    withCloseOnScroll({
        $status,
        $anchorElement,
    });
});
```

## Status

### closeAllModals

```ts
function closeAllModals(): void;
```

Closes all modals by setting their status to `"closing"`. Skips modals that are already `"closing"` or `"closed"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    closeAllModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus();
});

openModal("modal1");
openModal("modal2");
closeAllModals();
```

### closeLastModal

```ts
function closeLastModal(): void;
```

Closes the last opened modal by setting its status to `"closing"`.

#### Example

```ts
import { closeLastModal } from "@monstermann/signals-modal";

closeLastModal();
```

### closeModal

```ts
function closeModal(key: string): void;
```

Closes a modal by setting its status to `"closing"`. Does nothing if the modal is already `"closing"` or `"closed"`, or if the modal doesn't exist.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    closeModal,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

openModal("key");
closeModal("key");
```

### getClosedModals

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getClosedModals(): string[];
```

Returns an array of all modal keys with status `"closed"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    getClosedModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus();
});

getClosedModals(); // ["modal1", "modal2"]
```

### getClosingModals

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getClosingModals(): string[];
```

Returns an array of all modal keys with status `"closing"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    closeModal,
    getClosingModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus("opened");
});

createModal("modal2", () => {
    withModalStatus("opened");
});

closeModal("modal1");
closeModal("modal2");

getClosingModals(); // ["modal1", "modal2"]
```

### getModalStatus

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getModalStatus(key: string): ModalStatus;
```

Retrieves the current status of a modal. Returns `"closed"` if the modal doesn't exist.

**ModalStatus** can be one of: `"closed"`, `"opening"`, `"opened"`, or `"closing"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    getModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

getModalStatus("key"); // "closed"
```

### getOpenedModals

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getOpenedModals(): string[];
```

Returns an array of all modal keys with status `"opened"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    getOpenedModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus("opened");
});

createModal("modal2", () => {
    withModalStatus("opened");
});

getOpenedModals(); // ["modal1", "modal2"]
```

### getOpeningModals

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getOpeningModals(): string[];
```

Returns an array of all modal keys with status `"opening"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    getOpeningModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus();
});

openModal("modal1");
openModal("modal2");

getOpeningModals(); // ["modal1", "modal2"]
```

### getOpenModals

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getOpenModals(): string[];
```

Returns an array of all modal keys with status `"opening"` or `"opened"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    getOpenModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus("opening");
});

createModal("modal2", () => {
    withModalStatus("opened");
});

createModal("modal3", () => {
    withModalStatus("closed");
});

getOpenModals(); // ["modal1", "modal2"]
```

### getVisibleModals

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function getVisibleModals(): string[];
```

Returns an array of all modal keys that are visible (not `"closed"`). This includes `"opening"`, `"opened"`, and `"closing"` statuses.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    getVisibleModals,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus();
});

openModal("modal1");
openModal("modal2");

getVisibleModals(); // ["modal1", "modal2"]
```

### isAnyModalClosed

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isAnyModalClosed(): boolean;
```

Returns `true` if any modal has status `"closed"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    isAnyModalClosed,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus("opened");
});

isAnyModalClosed(); // true
```

### isAnyModalClosing

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isAnyModalClosing(): boolean;
```

Returns `true` if any modal has status `"closing"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    closeModal,
    isAnyModalClosing,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus("opened");
});

createModal("modal2", () => {
    withModalStatus();
});

closeModal("modal1");

isAnyModalClosing(); // true
```

### isAnyModalOpen

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isAnyModalOpen(): boolean;
```

Returns `true` if any modal has status `"opening"` or `"opened"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    isAnyModalOpen,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus("opened");
});

isAnyModalOpen(); // true
```

### isAnyModalOpened

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isAnyModalOpened(): boolean;
```

Returns `true` if any modal has status `"opened"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    isAnyModalOpened,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus("opened");
});

isAnyModalOpened(); // true
```

### isAnyModalOpening

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isAnyModalOpening(): boolean;
```

Returns `true` if any modal has status `"opening"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    isAnyModalOpening,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus();
});

openModal("modal1");

isAnyModalOpening(); // true
```

### isAnyModalVisible

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isAnyModalVisible(): boolean;
```

Returns `true` if any modal is visible (not `"closed"`). This includes `"opening"`, `"opened"`, and `"closing"` statuses.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    isAnyModalVisible,
} from "@monstermann/signals-modal";

createModal("modal1", () => {
    withModalStatus();
});

createModal("modal2", () => {
    withModalStatus("opened");
});

isAnyModalVisible(); // true
```

### isModalClosed

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalClosed(key: string): boolean;
```

Returns `true` if the modal's status is `"closed"` or if the modal doesn't exist.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    isModalClosed,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

isModalClosed("key"); // true
```

### isModalClosing

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalClosing(key: string): boolean;
```

Returns `true` if the modal's status is `"closing"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    closeModal,
    isModalClosing,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    $status("opened");
});

closeModal("key");
isModalClosing("key"); // true
```

### isModalOpen

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalOpen(key: string): boolean;
```

Returns `true` if the modal's status is `"opening"` or `"opened"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    isModalOpen,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus("opening");
});

isModalOpen("key"); // true
```

### isModalOpened

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalOpened(key: string): boolean;
```

Returns `true` if the modal's status is `"opened"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    isModalOpened,
} from "@monstermann/signals-modal";

createModal("key", () => {
    const { $status } = withModalStatus();
    $status("opened");
});

isModalOpened("key"); // true
```

### isModalOpening

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalOpening(key: string): boolean;
```

Returns `true` if the modal's status is `"opening"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    isModalOpening,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

openModal("key");
isModalOpening("key"); // true
```

### isModalVisible

![Reactive](https://img.shields.io/badge/Reactive-blue?style=flat-square&color=%2369a1ff)

```ts
function isModalVisible(key: string): boolean;
```

Returns `true` if the modal is visible (not `"closed"`). This includes `"opening"`, `"opened"`, and `"closing"` statuses.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
    isModalVisible,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

openModal("key");
isModalVisible("key"); // true
```

### onModalClosed

```ts
const onModalClosed: Emitter<string>;
```

An emitter that fires when a modal transitions to the `"closed"` status. The emitted value is the modal key.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    onModalClosed,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

const stopListening = onModalClosed((key) => {
    console.log(`Modal ${key} closed`);
});

stopListening();
```

### onModalClosing

```ts
const onModalClosing: Emitter<string>;
```

An emitter that fires when a modal transitions to the `"closing"` status. The emitted value is the modal key.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    onModalClosing,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

const stopListening = onModalClosing((key) => {
    console.log(`Modal ${key} closing`);
});

stopListening();
```

### onModalOpened

```ts
const onModalOpened: Emitter<string>;
```

An emitter that fires when a modal transitions to the `"opened"` status. The emitted value is the modal key.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    onModalOpened,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

const stopListening = onModalOpened((key) => {
    console.log(`Modal ${key} opened`);
});

stopListening();
```

### onModalOpening

```ts
const onModalOpening: Emitter<string>;
```

An emitter that fires when a modal transitions to the `"opening"` status. The emitted value is the modal key.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    onModalOpening,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

const stopListening = onModalOpening((key) => {
    console.log(`Modal ${key} opening`);
});

stopListening();
```

### openModal

```ts
function openModal(key: string): void;
```

Opens a modal by setting its status to `"opening"`. Does nothing if the modal is already `"opening"` or `"opened"`, or if the modal doesn't exist.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    openModal,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

openModal("key");
```

### setModalStatus

```ts
function setModalStatus(key: string, status: ModalStatus): void;
```

Sets the status of a modal. Does nothing if the modal doesn't exist.

**ModalStatus** can be one of: `"closed"`, `"opening"`, `"opened"`, or `"closing"`.

#### Example

```ts
import {
    createModal,
    withModalStatus,
    setModalStatus,
} from "@monstermann/signals-modal";

createModal("key", () => {
    withModalStatus();
});

setModalStatus("key", "opened");
```

### withModalStatus

```ts
function withModalStatus(status: ModalStatus = "closed"): {
    $status: Signal<ModalStatus>;
    $isOpen: Memo<boolean>;
    close: () => void;
    open: () => void;
};
```

Creates and returns a status signal for the current modal. This function must be called inside a `createModal` callback.

The optional `status` parameter sets the initial status of the modal (defaults to `"closed"`).

**ModalStatus** can be one of: `"closed"`, `"opening"`, `"opened"`, or `"closing"`.

#### Example

```ts
import { createModal, withModalStatus } from "@monstermann/signals-modal";

// Default to "closed"
createModal("modal1", () => {
    const { $status } = withModalStatus();
    console.log($status()); // "closed"
});

// Start with a different initial status
createModal("modal2", () => {
    const { $status } = withModalStatus("opened");
    console.log($status()); // "opened"

    // Update the status
    $status("closing");
});
```

## Utils

### closeLastModalOnClickOutside

```ts
function closeLastModalOnClickOutside(): void;
```

Sets up a global `mousedown` listener that closes the last opened modal when clicked outside the floating element.

#### Example

```ts
import { closeLastModalOnClickOutside } from "@monstermann/signals-modal";

closeLastModalOnClickOutside();
```

### closeLastModalOnEsc

```ts
function closeLastModalOnEsc(): void;
```

Sets up a global `keydown` listener that closes the last opened modal when `esc` is pressed, unless the target was an editable element such as `<input>`.

#### Example

```ts
import { closeLastModalOnEsc } from "@monstermann/signals-modal";

closeLastModalOnEsc();
```

### syncModalGroupsToBody

```ts
function syncModalGroupsToBody(): void;
```

Sets up a global `Effect` that adds `has-${group}` class names to `document.body` for opened modals.

#### Example

```ts
import {
    createModal,
    withModalGroups,
    withModalStatus,
    syncModalGroupsToBody,
    openModal,
    closeModal,
} from "@monstermann/signals-modal";

syncModalGroupsToBody();

const modal = createModal("key", () => {
    const $groups = withModalGroups(["dialog"]);
    const { $status } = withModalStatus();
    return { $groups, $status };
});

document.body.classList; // []
openModal("key");
document.body.classList; // ["has-dialog"]
closeModal("key");
document.body.classList; // []
```
