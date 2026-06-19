/* ─── REFS ─────────────────────────────────────────────── */
  const svg        = document.getElementById('mascot-svg');
  const bodyGrp    = document.getElementById('body-group');
  const shadow     = document.getElementById('shadow');
  const blinkL     = document.getElementById('blink-l');
  const blinkR     = document.getElementById('blink-r');
  const pupilL     = document.getElementById('pupil-l');
  const pupilR     = document.getElementById('pupil-r');
  const armL       = document.getElementById('arm-left');
  const armR       = document.getElementById('arm-right');
  const bubble     = document.getElementById('bubble');
  const cheekL     = document.getElementById('cheek-l');
  const cheekR     = document.getElementById('cheek-r');
  const zzz        = document.getElementById('zzz');
  const sleepyLids = document.getElementById('sleepy-lids');

  const mouths = {
    happy:     document.getElementById('mouth-happy'),
    sad:       document.getElementById('mouth-sad'),
    surprised: document.getElementById('mouth-surprised'),
    excited:   document.getElementById('mouth-excited'),
    sleepy:    document.getElementById('mouth-sleepy'),
  };
  // extra el de teeth (comparte estado con excited)
  const teethLine = document.getElementById('teeth-line');

  /* ─── STATE ─────────────────────────────────────────────── */
  let currentState = 'happy';
  let isJumping    = false;

  /* ─── SHOW MOUTH ─────────────────────────────────────────── */
  function showMouth(name) {
    Object.keys(mouths).forEach(k => mouths[k].classList.remove('active'));
    if (mouths[name]) mouths[name].classList.add('active');
    // teeth acompañan a excited
    teethLine.classList.toggle('active', name === 'excited');
  }

  /* ─── SET STATE ──────────────────────────────────────────── */
  const bubbleTexts = {
    happy:    '¡Hola! 😊',
    sad:      'Me da tristeza... 😢',
    excited:  '¡WOOOO! 🎉',
    sleepy:   'zzz... 😴',
  };

  const cheekColors = {
    happy:   '#FF9580',
    sad:     '#9BAAF0',
    excited: '#FFD93D',
    sleepy:  '#C4B5E8',
  };

  function setState(state) {
    currentState = state;
    showMouth(state);

    // Cheeks color
    cheekL.setAttribute('fill', cheekColors[state] || '#FF9580');
    cheekR.setAttribute('fill', cheekColors[state] || '#FF9580');

    // Sleepy extras
    const isSleepy = state === 'sleepy';
    zzz.style.opacity        = isSleepy ? '1' : '0';
    sleepyLids.style.opacity = isSleepy ? '1' : '0';

    // Excited shake
    if (state === 'excited') {
      bodyGrp.classList.add('shake');
      setTimeout(() => bodyGrp.classList.remove('shake'), 420);
    }

    // Bubble
    showBubble(bubbleTexts[state] || '');
  }

  /* ─── BUBBLE ─────────────────────────────────────────────── */
  let bubbleTimer = null;
  function showBubble(text) {
    clearTimeout(bubbleTimer);
    bubble.textContent = text;
    bubble.classList.add('visible');
    bubbleTimer = setTimeout(() => bubble.classList.remove('visible'), 2400);
  }

  /* ─── BLINK ──────────────────────────────────────────────── */
  function doBlink() {
    if (currentState === 'sleepy') return; // ya tiene ojos semi-cerrados
    svg.classList.add('blinking');
    setTimeout(() => svg.classList.remove('blinking'), 130);
    // siguiente parpadeo aleatorio
    setTimeout(doBlink, 2000 + Math.random() * 3500);
  }
  // Arrancar con delay inicial
  setTimeout(doBlink, 1200 + Math.random() * 1200);

  /* ─── PUPILS SIGUEN EL CURSOR ────────────────────────────── */
  // Centros de los ojos en coordenadas del viewBox (0 0 220 220)
  const eyeCenters = {
    l: { x: 88, y: 105 },
    r: { x: 132, y: 105 },
  };
  const MAX_OFFSET = 4; // px máx en el viewBox

  document.addEventListener('mousemove', e => {
    const rect  = svg.getBoundingClientRect();
    // ratio de posición del cursor relativo al SVG
    const rx    = (e.clientX - rect.left)  / rect.width;
    const ry    = (e.clientY - rect.top)   / rect.height;
    // convertir a coords del viewBox
    const mx    = rx * 220;
    const my    = ry * 220;

    ['l','r'].forEach(side => {
      const cx = eyeCenters[side].x;
      const cy = eyeCenters[side].y;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;
      const ox = (dx / dist) * Math.min(MAX_OFFSET, dist * 0.15);
      const oy = (dy / dist) * Math.min(MAX_OFFSET, dist * 0.15);
      const el = side === 'l' ? pupilL : pupilR;
      el.setAttribute('transform', `translate(${ox.toFixed(2)},${oy.toFixed(2)})`);
    });
  });

  // Resetear cuando el cursor sale de la ventana
  document.addEventListener('mouseleave', () => {
    pupilL.setAttribute('transform', 'translate(0,0)');
    pupilR.setAttribute('transform', 'translate(0,0)');
  });

  /* ─── WAVE ───────────────────────────────────────────────── */
  function doWave() {
    armL.classList.remove('waving');
    armR.classList.remove('waving');
    void armL.offsetWidth; // reflow para reiniciar animación
    void armR.offsetWidth;
    armL.classList.add('waving');
    armR.classList.add('waving');
    showBubble('¡Hola! 👋');
    setTimeout(() => {
      armL.classList.remove('waving');
      armR.classList.remove('waving');
    }, 1520);
  }

  /* ─── JUMP ───────────────────────────────────────────────── */
  function doJump() {
    if (isJumping) return;
    isJumping = true;

    // Guardar estado actual de boca y cambiar a surprised
    const prev = currentState;
    showMouth('surprised');

    // Pausar idle, aplicar jump
    bodyGrp.classList.add('jumping');
    shadow.classList.add('jumping');
    bodyGrp.classList.add('jump-anim');
    shadow.classList.add('shadow-jump');

    setTimeout(() => {
      bodyGrp.classList.remove('jumping', 'jump-anim');
      shadow.classList.remove('jumping', 'shadow-jump');
      // Restaurar boca
      showMouth(prev);
      isJumping = false;
    }, 580);

    showBubble('¡Wee! 🚀');
  }

  /* ─── CLICK en la mascota ────────────────────────────────── */
  svg.addEventListener('click', () => {
    if (!isJumping) doJump();
  });

  /* ─── INIT ───────────────────────────────────────────────── */
  showMouth('happy');
  // Burbuja de bienvenida
  setTimeout(() => showBubble('¡Hola! 😊'), 500);
