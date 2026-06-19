# AGENTS.md

This file is for AI agents working on this repository. Treat it as the handoff document between agents.

## Project Intent

The project is an embeddable AI mascot for HTML pages. The desired architecture is a single JavaScript file, `mascot-widget.js`, that injects all required DOM, SVG, CSS, behavior, and public controls into a host page.

The user likes the direction of making this a reusable widget rather than a standalone mascot page. Preserve that product direction.

## Current Files

- `mascot-widget.js`: first embeddable widget. It injects mascot markup, scoped styles, behavior, and exposes `window.MascotWidget`.
- `mascot.html`: main integration demo. It mounts `MascotWidget` and controls it through the public API.
- `examples/original.html`: preserved copy of the original self-contained prototype.
- `README.md`: human-facing project overview and planned API.
- `AGENTS.md`: this handoff file.

## Implementation Guidance

Prefer a small, dependency-free browser widget.

`mascot-widget.js` is the canonical implementation. Do not change behavior in a separate prototype file unless the same behavior is also changed in the widget, or unless a generation workflow is added first.

The target usage should be close to:

```html
<div id="mascot"></div>
<script src="mascot-widget.js"></script>
<script>
  const mascot = MascotWidget.mount("#mascot");
  mascot.say("Hello");
  mascot.setMood("happy");
</script>
```

Recommended global shape:

```js
window.MascotWidget = {
  mount(target, options) {
    return new MascotController(target, options);
  }
};
```

The controller should expose:

- `setMood(mood)`
- `say(text, options)`
- `clearSpeech()`
- `wave()`
- `jump()`
- `lookAt(x, y)`
- `show()`
- `hide()`
- `destroy()`
- eventually `on(eventName, handler)` and `off(eventName, handler)`

Keep implementation details private. Host pages should not need to know internal element IDs, CSS classes, SVG paths, or animation timing.

## State Rules

Separate persistent moods from temporary actions.

Persistent moods include:

- `happy`
- `sad`
- `excited`
- `sleepy`
- `thinking`
- `listening`
- `success`
- `error`

Temporary actions include:

- `wave`
- `jump`
- `blink`
- `shake`
- `speak`
- `lookAt`

Actions should not permanently overwrite the current mood. For example, `jump()` may briefly show a surprised mouth, but it should restore the previous mood afterward.

## Near-Term Task List

1. Review and harden `mascot-widget.js`.
2. Keep the widget API intentionally small.
3. Add configuration options for size, initial mood, welcome behavior, and placement.
4. Add a second demo page that shows the widget inside an arbitrary host layout.
5. Consider adding a generation workflow only if the single-file widget becomes hard to maintain manually.

## Coding Preferences

- Use plain JavaScript, HTML, CSS, and SVG.
- Avoid dependencies unless the user explicitly asks for them.
- Keep the widget easy to embed in static pages.
- Keep every repository word in English. This includes UI text, examples, comments, docs, commit-facing messages, and preserved prototypes.
- Avoid leaking generic CSS into the host page. Scope selectors under a widget root class.
- Avoid requiring build tools for the initial version.
- Prefer readable code over clever minification.

## Git Notes

This repository was initialized after the original prototype already existed. Be careful not to discard user changes. If the working tree is dirty, inspect changes before editing.
