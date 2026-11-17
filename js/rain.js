/* js/rain.js：主页背景雨滴层（HTML5 Canvas 2D + 原生 JavaScript，无依赖）
 * 层级：.atmosphere(-2) < #rain-canvas(-1) < .page-shell(1)
 * 雨滴只在背景层绘制，pointer-events: none，不遮挡正文、不拦截交互。
 * 尊重系统「减少动态效果」偏好：开启时只绘制一帧静态雨丝，不启动动画。
 */
(function () {
  "use strict";

  const canvas = document.getElementById("rain-canvas");
  if (!canvas || !canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  /* 雨滴密度按视口面积缩放；窄屏自动减量，始终留一个下限保证可见 */
  const AREA_PER_DROP = 11000;
  const MIN_DROPS = 40;
  const MAX_DROPS = 220;
  const REDUCE_MOTION = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let drops = [];
  let frameId = 0;
  let lastTime = 0;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  /* fromTop=true 表示从画面上方重新入场（重置到顶部） */
  function makeDrop(fromTop) {
    return {
      x: random(0, width),
      y: fromTop ? random(-height * 0.4, -12) : random(-height * 0.2, height),
      length: random(9, 30),
      speed: random(2.4, 8.5),
      alpha: random(0.10, 0.46),
      lineWidth: Math.random() < 0.18 ? 1.3 : 0.8
    };
  }

  function resetDrop(drop) {
    const fresh = makeDrop(true);
    drop.x = fresh.x;
    drop.y = fresh.y;
    drop.length = fresh.length;
    drop.speed = fresh.speed;
    drop.alpha = fresh.alpha;
    drop.lineWidth = fresh.lineWidth;
  }

  /* 适配高 DPI 屏：位图按 dpr 放大，绘制仍使用 CSS 像素坐标 */
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(
      MIN_DROPS,
      Math.min(MAX_DROPS, Math.round((width * height) / AREA_PER_DROP))
    );
    drops = [];
    for (let i = 0; i < count; i += 1) {
      drops.push(makeDrop(false));
    }
    if (REDUCE_MOTION) {
      paint(false, 1);
    }
  }

  /* advance=false 时只画一帧静态画面（供减少动态效果偏好使用） */
  function paint(advance, delta) {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < drops.length; i += 1) {
      const drop = drops[i];

      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length); /* 纯垂直下落 */
      ctx.lineWidth = drop.lineWidth;
      ctx.strokeStyle = "rgba(176, 212, 255, " + drop.alpha.toFixed(3) + ")";
      ctx.stroke();

      if (advance) {
        drop.y += drop.speed * delta;
        /* 落地 / 超出屏幕后重置到顶部，并重新随机速度、长度与透明度 */
        if (drop.y > height + drop.length) {
          resetDrop(drop);
        }
      }
    }
  }

  function tick(time) {
    /* 以 60fps 为基准换算步长，高刷新率屏幕上速度保持一致 */
    const delta = lastTime ? Math.min((time - lastTime) / 16.67, 2.5) : 1;
    lastTime = time;
    paint(true, delta);
    frameId = window.requestAnimationFrame(tick);
  }

  function start() {
    if (frameId || document.hidden) {
      return;
    }
    lastTime = 0;
    frameId = window.requestAnimationFrame(tick);
  }

  function stop() {
    if (!frameId) {
      return;
    }
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  if (REDUCE_MOTION) {
    paint(false, 1);
  } else {
    start();
  }
})();
