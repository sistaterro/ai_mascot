# AI Mascot

AI Mascot is a tiny embeddable web mascot project. The goal is to turn the current animated SVG mascot into a single-file JavaScript widget that can be dropped into any HTML page and controlled through a small public API.

It is designed as a friendly character layer for chatbots, AI assistants, onboarding flows, dashboards, learning tools, support pages, or any interface that benefits from lightweight animated feedback.

![AI Mascot preview](assets/mascot%2001.png)

## Product Direction

This project should behave like a reusable widget, not like a standalone page. A host page should be able to load one script, mount the mascot, and control it without knowing anything about the internal SVG, CSS classes, or animation details.

## Add The Widget To Any HTML

1. Copy `mascot-widget.js` into your project.
2. Add an empty element where the mascot should appear.
3. Load the widget script.
4. Mount the widget and keep the returned controller.

```html
<div id="mascot"></div>

<script src="mascot-widget.js"></script>
<script>
  const mascot = MascotWidget.mount("#mascot", {
    mood: "happy",
    welcome: true,
    size: 260,
  });

  mascot.say("Hello from my page");
  mascot.wave();
</script>
```

The controller can be called from any page interaction:

```html
<button id="help-button">Need help?</button>

<script>
  document.querySelector("#help-button").addEventListener("click", () => {
    mascot
      .setMood("listening", { silent: true })
      .say("I am listening", { duration: 3000 });
  });
</script>
```

The widget injects its own markup and styles, so the host page only needs the container and `mascot-widget.js`.

Target integration:

```html
<div id="mascot"></div>
<script src="mascot-widget.js"></script>
<script>
  const mascot = MascotWidget.mount("#mascot");

  mascot.say("Hello, I am your assistant");
  mascot.setMood("happy");
  mascot.wave();
</script>
```

## Planned API

The first public API should stay small and predictable:

```js
const mascot = MascotWidget.mount("#mascot", {
  mood: "happy",
  size: 260,
  mode: "inline",
  placement: "bottom-right",
  offset: 24,
  primaryColor: "#FF6B35",
  accentColor: "#FF8C5A",
  welcome: true,
  welcomeText: "Hello!",
  messages: {
    error: "Something needs attention",
  },
});

mascot.setMood("happy");
mascot.say("Processing...", { duration: 3000 });
mascot.clearSpeech();
mascot.wave();
mascot.jump();
mascot.lookAt(x, y);
mascot.show();
mascot.hide();
mascot.destroy();
```

Useful mount options:

- `mood`: initial mood.
- `size`: widget size in pixels.
- `mode`: `"inline"` for normal layout or `"fixed"` for viewport placement.
- `placement`: `"top-left"`, `"top-right"`, `"bottom-left"`, or `"bottom-right"` when `mode` is `"fixed"`.
- `offset`: fixed placement offset in pixels or any CSS length.
- `primaryColor` and `accentColor`: basic mascot color theme.
- `welcome`: show or skip the initial speech bubble.
- `welcomeText`: override the initial speech bubble.
- `messages`: override built-in mood messages.

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

- `mascot-widget.js` is the first embeddable widget build. It injects the mascot markup, scoped styles, and behavior from one script.
- `mascot-widget.js` is the canonical implementation until this project introduces a build step.
- `mascot.html` is now the main integration demo. It mounts the widget and controls it through the public API.
- `examples/chatbot-host.html` shows the widget inside a regular chatbot-like host page.
- `tests/browser-smoke.html` is a browser-run smoke test for mounting, API calls, multi-instance behavior, and cleanup.
- `examples/original.html` preserves the original self-contained prototype.
- The next major step is hardening the widget API and improving configurability.

## Suggested Milestones

1. Keep `examples/original.html` as the untouched visual reference.
2. Maintain `mascot-widget.js` as the embeddable single-file widget and source of truth.
3. Keep demos and examples as consumers or historical references.
4. Harden the minimal public API: `mount`, `setMood`, `say`, `wave`, `jump`, `show`, `hide`, `destroy`.
5. Add configuration options for position, initial mood, welcome message, and size.
6. Add a second demo HTML that shows integration into an arbitrary host page.
