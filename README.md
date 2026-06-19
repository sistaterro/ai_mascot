# AI Mascot

AI Mascot is a tiny embeddable web mascot project. The goal is to turn the current animated SVG mascot into a single-file JavaScript widget that can be dropped into any HTML page and controlled through a small public API.

## Product Direction

This project should behave like a reusable widget, not like a standalone page. A host page should be able to load one script, mount the mascot, and control it without knowing anything about the internal SVG, CSS classes, or animation details.

Target integration:

```html
<div id="mascot"></div>
<script src="mascot-widget.js"></script>
<script>
  const mascot = MascotWidget.mount("#mascot");

  mascot.say("Hola, soy tu asistente");
  mascot.setMood("happy");
  mascot.wave();
</script>
```

## Planned API

The first public API should stay small and predictable:

```js
const mascot = MascotWidget.mount("#mascot", {
  mood: "happy",
});

mascot.setMood("happy");
mascot.say("Procesando...", { duration: 3000 });
mascot.clearSpeech();
mascot.wave();
mascot.jump();
mascot.lookAt(x, y);
mascot.show();
mascot.hide();
mascot.destroy();
```

Longer-term events may look like this:

```js
mascot.on("click", () => {});
mascot.on("moodchange", mood => {});
mascot.on("speechend", () => {});
```

## State Model

Separate persistent moods from temporary actions.

Moods:

- `happy`
- `sad`
- `excited`
- `sleepy`
- `thinking`
- `listening`
- `success`
- `error`

Actions:

- `wave`
- `jump`
- `blink`
- `shake`
- `speak`
- `lookAt`

For example, the mascot should be able to remain in `thinking` while briefly performing `wave`, then return to its previous visual state.

## Current State

- `mascot.html` is now the main demo page. It keeps the mascot markup and loads separated CSS and JavaScript.
- `src/mascot.css` contains the current visual styles and animations.
- `src/mascot.js` contains the current behavior: moods, speech bubble, cursor-following pupils, wave, jump, and blink interactions.
- `examples/original.html` preserves the original self-contained prototype.
- The next major step is turning the separated prototype into `mascot-widget.js`, where the widget injects its own markup and styles.

## Suggested Milestones

1. Keep `examples/original.html` as the untouched visual reference.
2. Use `mascot.html`, `src/mascot.css`, and `src/mascot.js` as the working split prototype.
3. Create `mascot-widget.js` with the same visual mascot embedded as a JS widget.
4. Expose the minimal public API: `mount`, `setMood`, `say`, `wave`, `jump`, `show`, `hide`, `destroy`.
5. Update `mascot.html` to consume `mascot-widget.js` instead of depending on page-specific global functions.
6. Add a second demo HTML that shows integration into an arbitrary host page.
