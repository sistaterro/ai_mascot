(function (global) {
  'use strict';

  const VERSION = '0.1.0';
  const STYLE_ID = 'mascot-widget-styles';

  const TEMPLATE = `<div class="mascot-widget__stage">

  <!-- Speech bubble -->
  <div class="mascot-widget__bubble" id="bubble">Hello! 👋</div>

  <!-- ── SVG MASCOT ─────────────────────────────────────── -->
  <svg id="mascot-svg" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">

    <!-- SHADOW -->
    <ellipse id="shadow" cx="110" cy="214" rx="44" ry="9" fill="#334155"/>

    <!-- BODY GROUP — everything that bounces -->
    <g id="body-group">

      <!-- ── EARS (behind the body) -->
      <g id="ear-left">
        <!-- left ear: rounded tip -->
        <ellipse cx="71" cy="68" rx="18" ry="24" fill="#FF6B35" transform="rotate(-10 71 68)"/>
        <ellipse cx="71" cy="70" rx="11" ry="16" fill="#FF8C5A" transform="rotate(-10 71 70)"/>
      </g>
      <g id="ear-right">
        <ellipse cx="149" cy="68" rx="18" ry="24" fill="#FF6B35" transform="rotate(10 149 68)"/>
        <ellipse cx="149" cy="70" rx="11" ry="16" fill="#FF8C5A" transform="rotate(10 149 70)"/>
      </g>

      <!-- ── ARMS ──────────────────────────────────────── -->
      <!-- Left arm -- rotation origin at 72,138 -->
      <g id="arm-left">
        <ellipse cx="72" cy="148" rx="14" ry="10" fill="#FF6B35" transform="rotate(-20 72 148)"/>
        <!-- small hand -->
        <circle cx="62" cy="155" r="9" fill="#FF6B35"/>
        <circle cx="56" cy="151" r="5" fill="#FF8C5A"/>
        <circle cx="55" cy="158" r="5" fill="#FF8C5A"/>
        <circle cx="61" cy="162" r="5" fill="#FF8C5A"/>
      </g>
      <!-- Right arm -->
      <g id="arm-right">
        <ellipse cx="148" cy="148" rx="14" ry="10" fill="#FF6B35" transform="rotate(20 148 148)"/>
        <circle cx="158" cy="155" r="9" fill="#FF6B35"/>
        <circle cx="164" cy="151" r="5" fill="#FF8C5A"/>
        <circle cx="165" cy="158" r="5" fill="#FF8C5A"/>
        <circle cx="159" cy="162" r="5" fill="#FF8C5A"/>
      </g>

      <!-- ── BODY (main body) ────────────────────── -->
      <ellipse cx="110" cy="158" rx="52" ry="48" fill="#FF6B35"/>

      <!-- ── HEAD ──────────────────────────────────────── -->
      <circle cx="110" cy="108" r="58" fill="#FF6B35"/>

      <!-- ── CHEEKS ─────────────────────────────────────── -->
      <ellipse id="cheek-l" cx="74"  cy="118" rx="13" ry="9"  fill="#FF9580" opacity=".6"/>
      <ellipse id="cheek-r" cx="146" cy="118" rx="13" ry="9"  fill="#FF9580" opacity=".6"/>

      <!-- ── BELLY patch ──────────────────────────────── -->
      <ellipse cx="110" cy="160" rx="35" ry="30" fill="#FF8C5A" opacity=".55"/>

      <!-- ── EYE LEFT ───────────────────────────────────── -->
      <g id="eye-l">
        <!-- eye white -->
        <ellipse cx="88"  cy="105" rx="18" ry="20" fill="white"/>
        <!-- pupil -->
        <g id="pupil-l">
          <circle cx="88" cy="106" r="11" fill="#1E293B"/>
          <!-- brillo -->
          <circle cx="93" cy="101" r="4"  fill="white"/>
          <circle cx="84" cy="109" r="2"  fill="white" opacity=".5"/>
        </g>
        <!-- eyelid -- covers the eye while blinking -->
        <g id="blink-l" style="transform-origin: 88px 96px;">
          <ellipse cx="88" cy="105" rx="18.5" ry="20.5" fill="#FF6B35"/>
        </g>
      </g>

      <!-- ── EYE RIGHT ──────────────────────────────────── -->
      <g id="eye-r">
        <ellipse cx="132" cy="105" rx="18" ry="20" fill="white"/>
        <g id="pupil-r">
          <circle cx="132" cy="106" r="11" fill="#1E293B"/>
          <circle cx="137" cy="101" r="4"  fill="white"/>
          <circle cx="128" cy="109" r="2"  fill="white" opacity=".5"/>
        </g>
        <g id="blink-r" style="transform-origin: 132px 96px;">
          <ellipse cx="132" cy="105" rx="18.5" ry="20.5" fill="#FF6B35"/>
        </g>
      </g>

      <!-- ── NOSE ───────────────────────────────────────── -->
      <ellipse cx="110" cy="120" rx="6" ry="4" fill="#CC4400" opacity=".4"/>

      <!-- ── MOUTHS (one visible at a time) ─────────────── -->
      <!-- happy (default) -->
      <path id="mouth-happy" class="mouth-path active"
            d="M 93 132 Q 110 148 127 132"
            stroke="#CC4400" stroke-width="3.5" stroke-linecap="round"
            fill="none" opacity=".7"/>

      <!-- sad -->
      <path id="mouth-sad" class="mouth-path"
            d="M 93 142 Q 110 130 127 142"
            stroke="#6B8CFF" stroke-width="3.5" stroke-linecap="round"
            fill="none"/>

      <!-- surprised — "O" -->
      <ellipse id="mouth-surprised" class="mouth-path"
               cx="110" cy="136" rx="10" ry="12"
               fill="#CC4400" opacity=".5"/>

      <!-- excited — big grin with teeth -->
      <path id="mouth-excited" class="mouth-path"
            d="M 88 130 Q 110 152 132 130"
            stroke="#CC4400" stroke-width="3.5" stroke-linecap="round"
            fill="none" opacity=".7"/>
      <!-- teeth line -->
      <line id="teeth-line" class="mouth-path"
            x1="97" y1="135" x2="123" y2="135"
            stroke="#CC4400" stroke-width="2" opacity=".4"/>

      <!-- sleepy — flat line + zzz -->
      <path id="mouth-sleepy" class="mouth-path"
            d="M 98 136 Q 110 138 122 136"
            stroke="#9B8EC4" stroke-width="3" stroke-linecap="round"
            fill="none"/>

      <!-- ── SLEEPY ZZZ ─────────────────────────────────── -->
      <g id="zzz" style="opacity:0; transition: opacity .3s;">
        <text x="148" y="88" font-size="13" font-weight="800" fill="#9B8EC4" font-family="system-ui">z</text>
        <text x="158" y="78" font-size="10" font-weight="800" fill="#9B8EC4" font-family="system-ui" opacity=".7">z</text>
        <text x="166" y="70" font-size="8"  font-weight="800" fill="#9B8EC4" font-family="system-ui" opacity=".4">z</text>
      </g>

      <!-- ── HALF-CLOSED EYES for sleepy ───────────────── -->
      <g id="sleepy-lids" style="opacity:0; transition: opacity .3s; pointer-events:none;">
        <!-- cover upper half of the left eye -->
        <rect x="70" y="86" width="36" height="18" fill="#FF6B35" rx="2"/>
        <!-- cover upper half of the right eye -->
        <rect x="114" y="86" width="36" height="18" fill="#FF6B35" rx="2"/>
      </g>

    </g><!-- /body-group -->
  </svg>
</div>`;
  const CSS = `.mascot-widget, .mascot-widget * { box-sizing: border-box; }
.mascot-widget { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; font-family: system-ui, sans-serif; user-select: none; opacity: 1; transform: translateY(0) scale(1); filter: blur(0); transition: opacity .22s ease, transform .22s ease, filter .22s ease; }
.mascot-widget.is-hidden { opacity: 0; transform: translateY(14px) scale(.9); filter: blur(2px); pointer-events: none; }

  /* ── STAGE ────────────────────────────────────────────── */
.mascot-widget .mascot-widget__stage {
    position: relative;
    width: 260px;
    height: 260px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  /* ── SVG mascot wrapper ───────────────────────────────── */
.mascot-widget #mascot-svg {
    width: 220px;
    height: 220px;
    cursor: pointer;
    overflow: visible;
  }

  /* ── IDLE BOUNCE (full body) ───────────────────── */
.mascot-widget #body-group {
    animation: mascot-idle-bounce 2.2s cubic-bezier(.45,.05,.55,.95) infinite;
    transform-origin: 110px 200px;
  }

  @keyframes mascot-idle-bounce {
    0%,100% { transform: translateY(0px)    scaleY(1)    scaleX(1); }
    45%      { transform: translateY(-14px)  scaleY(1.04) scaleX(.97); }
    55%      { transform: translateY(-14px)  scaleY(1.04) scaleX(.97); }
    85%      { transform: translateY(2px)    scaleY(.95)  scaleX(1.03); }
  }

  /* When jumping, the animation pauses and JS takes control */
.mascot-widget #body-group.jumping {
    animation: none;
  }

  /* ── SHADOW ───────────────────────────────────────────── */
.mascot-widget #shadow {
    animation: mascot-idle-shadow 2.2s cubic-bezier(.45,.05,.55,.95) infinite;
    transform-origin: 110px 216px;
  }

  @keyframes mascot-idle-shadow {
    0%,100% { transform: scaleX(1);    opacity: .25; }
    45%      { transform: scaleX(.65); opacity: .12; }
    55%      { transform: scaleX(.65); opacity: .12; }
    85%      { transform: scaleX(1.1); opacity: .3;  }
  }
.mascot-widget #shadow.jumping { animation: none; }

  /* ── ARMS ────────────────────────────────────────────── */
.mascot-widget #arm-left {
    transform-origin: 72px 138px;
    animation: mascot-arm-idle-l 2.2s cubic-bezier(.45,.05,.55,.95) infinite;
  }
.mascot-widget #arm-right {
    transform-origin: 148px 138px;
    animation: mascot-arm-idle-r 2.2s cubic-bezier(.45,.05,.55,.95) infinite;
  }

  @keyframes mascot-arm-idle-l {
    0%,100% { transform: rotate(0deg);   }
    50%      { transform: rotate(-8deg);  }
  }
  @keyframes mascot-arm-idle-r {
    0%,100% { transform: rotate(0deg);   }
    50%      { transform: rotate(8deg);   }
  }

  /* Wave — aplicado como clase desde JS */
.mascot-widget #arm-left.waving {
    animation: mascot-wave-l .5s ease-in-out 3;
  }
.mascot-widget #arm-right.waving {
    animation: mascot-wave-r .5s ease-in-out 3;
  }

  @keyframes mascot-wave-l {
    0%,100% { transform: rotate(0deg);   }
    50%      { transform: rotate(-35deg); }
  }
  @keyframes mascot-wave-r {
    0%,100% { transform: rotate(0deg);   }
    50%      { transform: rotate(35deg);  }
  }

  /* ── EARS (wiggle on hover) ──────────────────────────── */
.mascot-widget #ear-left {
    transform-origin: 72px 70px;
    transition: transform .2s;
  }
.mascot-widget #ear-right {
    transform-origin: 148px 70px;
    transition: transform .2s;
  }
.mascot-widget #mascot-svg:hover #ear-left  { animation: mascot-ear-wiggle-l .4s ease-in-out 2; }
.mascot-widget #mascot-svg:hover #ear-right { animation: mascot-ear-wiggle-r .4s ease-in-out 2; }

  @keyframes mascot-ear-wiggle-l {
    0%,100% { transform: rotate(0deg);  }
    40%      { transform: rotate(-12deg); }
  }
  @keyframes mascot-ear-wiggle-r {
    0%,100% { transform: rotate(0deg); }
    40%      { transform: rotate(12deg); }
  }

  /* ── BLINK ───────────────────────────────────────────── */
.mascot-widget #blink-l, .mascot-widget #blink-r {
    transform-origin: center;
    transform: scaleY(0);
    transition: transform .06s ease-in;
  }
.mascot-widget .blinking #blink-l,
.mascot-widget .blinking #blink-r {
    transform: scaleY(1);
  }

  /* ── PUPILS ──────────────────────────────────────────── */
.mascot-widget #pupil-l, .mascot-widget #pupil-r {
    transition: transform .12s ease-out;
  }

  /* ── MOUTH STATES ────────────────────────────────────── */
.mascot-widget .mouth-path {
    transition: d .25s ease, opacity .2s;
  }
  /* All hidden by default, JS toggles .active */
.mascot-widget .mouth-path          { opacity: 0; }
.mascot-widget .mouth-path.active   { opacity: 1; }

  /* ── CHEEKS ──────────────────────────────────────────── */
.mascot-widget #cheek-l, .mascot-widget #cheek-r {
    transition: opacity .3s;
  }

  /* ── JUMP ─────────────────────────────────────────────── */
.mascot-widget .jump-anim {
    animation: mascot-jump-seq .55s cubic-bezier(.28,.84,.44,1) forwards !important;
    transform-origin: 110px 200px;
  }
  @keyframes mascot-jump-seq {
    0%   { transform: translateY(0)    scaleY(1)    scaleX(1); }
    20%  { transform: translateY(4px)  scaleY(.88)  scaleX(1.1); }
    45%  { transform: translateY(-38px) scaleY(1.06) scaleX(.95); }
    70%  { transform: translateY(-38px) scaleY(1.06) scaleX(.95); }
    85%  { transform: translateY(4px)  scaleY(.9)   scaleX(1.08); }
    100% { transform: translateY(0)    scaleY(1)    scaleX(1); }
  }
.mascot-widget .shadow-jump {
    animation: mascot-shadow-jump-seq .55s ease forwards !important;
    transform-origin: 110px 216px;
  }
  @keyframes mascot-shadow-jump-seq {
    0%   { transform: scaleX(1);    opacity: .25; }
    20%  { transform: scaleX(1.12); opacity: .3;  }
    50%  { transform: scaleX(.5);   opacity: .1;  }
    85%  { transform: scaleX(1.12); opacity: .3;  }
    100% { transform: scaleX(1);    opacity: .25; }
  }

  /* ── EXCITED SHAKE ───────────────────────────────────── */
.mascot-widget .shake {
    animation: mascot-shake .4s ease !important;
    transform-origin: 110px 160px;
  }
  @keyframes mascot-shake {
    0%,100% { transform: rotate(0deg);  }
    20%     { transform: rotate(-6deg); }
    40%     { transform: rotate(6deg);  }
    60%     { transform: rotate(-5deg); }
    80%     { transform: rotate(5deg);  }
  }

  /* ── CONTROL PANEL ───────────────────────────────────── */
.mascot-widget .panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
.mascot-widget .panel-label {
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #94A3B8;
  }
.mascot-widget .btn-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
.mascot-widget .btn {
    padding: 9px 18px;
    border: none;
    border-radius: 999px;
    font-size: .875rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform .1s, opacity .1s;
    letter-spacing: .01em;
  }
.mascot-widget .btn:hover  { opacity: .88; }
.mascot-widget .btn:active { transform: scale(.95); }
.mascot-widget .btn--happy    { background: #FF6B35; color: #fff; }
.mascot-widget .btn--sad      { background: #6B8CFF; color: #fff; }
.mascot-widget .btn--excited  { background: #FFD93D; color: #1a1a1a; }
.mascot-widget .btn--sleepy   { background: #9B8EC4; color: #fff; }
.mascot-widget .btn--wave     { background: #4ECB71; color: #fff; }
.mascot-widget .btn--jump     { background: #FF6B6B; color: #fff; }

  /* ── SPEECH BUBBLE ───────────────────────────────────── */
.mascot-widget .mascot-widget__bubble {
    position: absolute;
    top: 0; right: -20px;
    background: #fff;
    border-radius: 16px;
    padding: 8px 14px;
    font-size: .85rem;
    font-weight: 600;
    color: #334155;
    box-shadow: 0 4px 20px rgba(0,0,0,.1);
    white-space: nowrap;
    opacity: 0;
    transform: translateY(6px) scale(.92);
    transition: opacity .22s ease, transform .22s ease;
    pointer-events: none;
  }
.mascot-widget .mascot-widget__bubble.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
.mascot-widget .mascot-widget__bubble.speaking {
    animation: mascot-bubble-pop .34s ease;
  }
  @keyframes mascot-bubble-pop {
    0%   { transform: translateY(8px) scale(.86); }
    60%  { transform: translateY(-3px) scale(1.08); }
    100% { transform: translateY(0) scale(1); }
  }
  /* tail */
.mascot-widget .mascot-widget__bubble::after {
    content: '';
    position: absolute;
    bottom: -7px; left: 20px;
    width: 0; height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 8px solid #fff;
  }

  /* ── CODE HINT ───────────────────────────────────────── */
.mascot-widget .hint {
    font-size: .7rem;
    color: #94A3B8;
    font-family: monospace;
    background: #E2E8F0;
    border-radius: 6px;
    padding: 6px 12px;
    max-width: 300px;
    text-align: center;
    line-height: 1.6;
  }`;

  const DEFAULT_MOOD = 'happy';
  const BUBBLE_TEXTS = {
    happy: 'Hello! \ud83d\ude0a',
    sad: 'I am sad... \ud83d\ude22',
    excited: 'WOOOO! \ud83c\udf89',
    sleepy: 'zzz... \ud83d\ude34',
    thinking: 'Thinking...',
    listening: 'I am listening',
    success: 'Done!',
    error: 'Oops, something happened',
  };

  const CHEEK_COLORS = {
    happy: '#FF9580',
    sad: '#9BAAF0',
    excited: '#FFD93D',
    sleepy: '#C4B5E8',
    thinking: '#FFD93D',
    listening: '#6B8CFF',
    success: '#4ECB71',
    error: '#FF6B6B',
  };

  const MOUTH_BY_MOOD = {
    happy: 'happy',
    sad: 'sad',
    excited: 'excited',
    sleepy: 'sleepy',
    thinking: 'surprised',
    listening: 'happy',
    success: 'excited',
    error: 'sad',
  };

  const EYE_CENTERS = {
    l: { x: 88, y: 105 },
    r: { x: 132, y: 105 },
  };
  const MAX_EYE_OFFSET = 4;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function resolveTarget(target) {
    if (typeof target === 'string') {
      const found = document.querySelector(target);
      if (!found) throw new Error(`MascotWidget target not found: ${target}`);
      return found;
    }

    if (target instanceof Element) return target;
    throw new TypeError('MascotWidget.mount(target) expects a selector or Element.');
  }

  class MascotController {
    constructor(target, options = {}) {
      this.target = resolveTarget(target);
      this.options = options;
      this.currentMood = options.mood || DEFAULT_MOOD;
      this.isJumping = false;
      this.isDestroyed = false;
      this.bubbleTimer = null;
      this.speechPulseTimer = null;
      this.blinkTimer = null;
      this.timeouts = new Set();
      this.events = new Map();

      injectStyles();
      this.mount();
      this.bindEvents();
      this.setMood(this.currentMood, { silent: true });
      this.scheduleBlink(1200 + Math.random() * 1200);

      if (options.welcome !== false) {
        this.setManagedTimeout(() => this.say(BUBBLE_TEXTS[this.currentMood] || 'Hello! \ud83d\ude0a'), 500);
      }
    }

    mount() {
      this.root = document.createElement('div');
      this.root.className = 'mascot-widget';
      this.root.innerHTML = TEMPLATE;
      this.target.appendChild(this.root);

      const find = selector => this.root.querySelector(selector);
      this.svg = find('#mascot-svg');
      this.bodyGroup = find('#body-group');
      this.shadow = find('#shadow');
      this.pupilL = find('#pupil-l');
      this.pupilR = find('#pupil-r');
      this.armL = find('#arm-left');
      this.armR = find('#arm-right');
      this.bubble = find('.mascot-widget__bubble');
      this.cheekL = find('#cheek-l');
      this.cheekR = find('#cheek-r');
      this.zzz = find('#zzz');
      this.sleepyLids = find('#sleepy-lids');
      this.teethLine = find('#teeth-line');
      this.mouths = {
        happy: find('#mouth-happy'),
        sad: find('#mouth-sad'),
        surprised: find('#mouth-surprised'),
        excited: find('#mouth-excited'),
        sleepy: find('#mouth-sleepy'),
      };
    }

    bindEvents() {
      this.handleMouseMove = event => this.handlePointerLook(event.clientX, event.clientY);
      this.handleMouseLeave = () => this.resetLook();
      this.handleClick = () => {
        this.emit('click');
        this.jump();
      };

      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseleave', this.handleMouseLeave);
      this.svg.addEventListener('click', this.handleClick);
    }

    setMood(mood, options = {}) {
      if (this.isDestroyed) return this;

      const nextMood = MOUTH_BY_MOOD[mood] ? mood : DEFAULT_MOOD;
      this.currentMood = nextMood;
      this.showMouth(MOUTH_BY_MOOD[nextMood]);

      const cheekColor = CHEEK_COLORS[nextMood] || CHEEK_COLORS.happy;
      this.cheekL.setAttribute('fill', cheekColor);
      this.cheekR.setAttribute('fill', cheekColor);

      const isSleepy = nextMood === 'sleepy';
      this.zzz.style.opacity = isSleepy ? '1' : '0';
      this.sleepyLids.style.opacity = isSleepy ? '1' : '0';

      if (nextMood === 'excited' || nextMood === 'success') this.shake();
      if (!options.silent) this.say(BUBBLE_TEXTS[nextMood] || '');
      this.emit('moodchange', nextMood);
      return this;
    }

    say(text, options = {}) {
      if (this.isDestroyed) return this;
      if (options.mood) this.setMood(options.mood, { silent: true });

      clearTimeout(this.bubbleTimer);
      clearTimeout(this.speechPulseTimer);
      this.show();
      this.bubble.textContent = text;
      this.bubble.classList.remove('speaking');
      void this.bubble.offsetWidth;
      this.bubble.classList.add('visible', 'speaking');
      this.speechPulseTimer = this.setManagedTimeout(() => {
        this.bubble.classList.remove('speaking');
      }, 360);

      const duration = options.duration === undefined ? 2400 : options.duration;
      if (duration > 0) {
        this.bubbleTimer = this.setManagedTimeout(() => {
          this.clearSpeech();
          this.emit('speechend');
        }, duration);
      }
      return this;
    }

    clearSpeech() {
      if (this.isDestroyed) return this;
      clearTimeout(this.bubbleTimer);
      clearTimeout(this.speechPulseTimer);
      this.bubbleTimer = null;
      this.speechPulseTimer = null;
      this.bubble.classList.remove('visible', 'speaking');
      return this;
    }

    wave() {
      if (this.isDestroyed) return this;

      this.armL.classList.remove('waving');
      this.armR.classList.remove('waving');
      void this.armL.offsetWidth;
      void this.armR.offsetWidth;
      this.armL.classList.add('waving');
      this.armR.classList.add('waving');
      this.say('Hello! \ud83d\udc4b');

      this.setManagedTimeout(() => {
        this.armL.classList.remove('waving');
        this.armR.classList.remove('waving');
      }, 1520);
      return this;
    }

    jump() {
      if (this.isDestroyed || this.isJumping) return this;
      this.isJumping = true;

      const previousMood = this.currentMood;
      this.showMouth('surprised');
      this.bodyGroup.classList.add('jumping', 'jump-anim');
      this.shadow.classList.add('jumping', 'shadow-jump');
      this.say('Wee! \ud83d\ude80');

      this.setManagedTimeout(() => {
        this.bodyGroup.classList.remove('jumping', 'jump-anim');
        this.shadow.classList.remove('jumping', 'shadow-jump');
        this.showMouth(MOUTH_BY_MOOD[previousMood]);
        this.isJumping = false;
      }, 580);
      return this;
    }

    lookAt(x, y) {
      if (this.isDestroyed) return this;
      this.moveEyes(x, y);
      return this;
    }

    show() {
      if (this.isDestroyed) return this;
      this.root.classList.remove('is-hidden');
      this.emit('show');
      return this;
    }

    hide() {
      if (this.isDestroyed) return this;
      this.clearSpeech();
      this.root.classList.add('is-hidden');
      this.emit('hide');
      return this;
    }

    on(eventName, handler) {
      if (!this.events.has(eventName)) this.events.set(eventName, new Set());
      this.events.get(eventName).add(handler);
      return this;
    }

    off(eventName, handler) {
      if (this.events.has(eventName)) this.events.get(eventName).delete(handler);
      return this;
    }

    destroy() {
      if (this.isDestroyed) return;
      this.isDestroyed = true;
      clearTimeout(this.bubbleTimer);
      clearTimeout(this.blinkTimer);
      clearTimeout(this.speechPulseTimer);
      this.timeouts.forEach(timeout => clearTimeout(timeout));
      this.timeouts.clear();
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseleave', this.handleMouseLeave);
      this.svg.removeEventListener('click', this.handleClick);
      this.root.remove();
      this.events.clear();
    }

    showMouth(name) {
      Object.keys(this.mouths).forEach(key => this.mouths[key].classList.remove('active'));
      if (this.mouths[name]) this.mouths[name].classList.add('active');
      this.teethLine.classList.toggle('active', name === 'excited');
    }

    shake() {
      this.bodyGroup.classList.add('shake');
      this.setManagedTimeout(() => this.bodyGroup.classList.remove('shake'), 420);
    }

    scheduleBlink(delay) {
      this.blinkTimer = this.setManagedTimeout(() => this.blink(), delay);
    }

    blink() {
      if (this.isDestroyed) return;
      if (this.currentMood !== 'sleepy') {
        this.svg.classList.add('blinking');
        this.setManagedTimeout(() => this.svg.classList.remove('blinking'), 130);
      }
      this.scheduleBlink(2000 + Math.random() * 3500);
    }

    handlePointerLook(clientX, clientY) {
      if (this.isDestroyed || this.root.classList.contains('is-hidden')) return;
      const rect = this.svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((clientX - rect.left) / rect.width) * 220;
      const y = ((clientY - rect.top) / rect.height) * 220;
      this.moveEyes(x, y);
    }

    moveEyes(x, y) {
      [
        ['l', this.pupilL],
        ['r', this.pupilR],
      ].forEach(([side, element]) => {
        const center = EYE_CENTERS[side];
        const dx = x - center.x;
        const dy = y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const ox = (dx / distance) * Math.min(MAX_EYE_OFFSET, distance * 0.15);
        const oy = (dy / distance) * Math.min(MAX_EYE_OFFSET, distance * 0.15);
        element.setAttribute('transform', `translate(${ox.toFixed(2)},${oy.toFixed(2)})`);
      });
    }

    resetLook() {
      if (this.isDestroyed) return;
      this.pupilL.setAttribute('transform', 'translate(0,0)');
      this.pupilR.setAttribute('transform', 'translate(0,0)');
    }

    emit(eventName, detail) {
      if (!this.events.has(eventName)) return;
      this.events.get(eventName).forEach(handler => handler(detail));
    }

    setManagedTimeout(callback, delay) {
      const timeout = setTimeout(() => {
        this.timeouts.delete(timeout);
        callback();
      }, delay);
      this.timeouts.add(timeout);
      return timeout;
    }
  }

  global.MascotWidget = {
    version: VERSION,
    mount(target, options) {
      return new MascotController(target, options);
    },
  };
})(window);
