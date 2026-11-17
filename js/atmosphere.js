/* js/atmosphere.js：五幕底图统一控制器
 * 首页与详情页都引入本文件，保证两页的背景行为、节奏与风格完全一致。
 * 不依赖框架、模块或 fetch，file:// 双击打开也能正常工作。
 */
(function () {
  "use strict";

  var SCENES = [
    { chapter: "壹", name: "蓝夜百合" },
    { chapter: "贰", name: "月下花庭" },
    { chapter: "叁", name: "雨璃折光" },
    { chapter: "肆", name: "霜叶回响" },
    { chapter: "伍", name: "水镜涟漪" }
  ];
  var DURATION = 9000;

  var scenes = Array.prototype.slice.call(document.querySelectorAll(".atmosphere__scene"));
  if (scenes.length === 0) {
    return;
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var total = scenes.length;
  var current = 0;
  var timer = null;

  /* 切换器：五个竖条对应五张底图，可键盘操作 */
  var nav = document.createElement("nav");
  nav.className = "scene-nav";
  nav.setAttribute("aria-label", "切换背景底图");

  var indexEl = document.createElement("span");
  indexEl.className = "scene-nav__index";
  var items = document.createElement("div");
  items.className = "scene-nav__items";
  var nameEl = document.createElement("span");
  nameEl.className = "scene-nav__name";

  var dots = SCENES.slice(0, total).map(function (scene, i) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "scene-nav__dot" + (i === 0 ? " is-active" : "");
    button.title = scene.chapter + " · " + scene.name;
    button.setAttribute("aria-label", "切换到第" + scene.chapter + "幕：" + scene.name);
    button.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    button.addEventListener("click", function () {
      show(i);
      restart();
    });
    items.appendChild(button);
    return button;
  });

  nav.appendChild(indexEl);
  nav.appendChild(items);
  nav.appendChild(nameEl);
  document.body.appendChild(nav);

  function show(index) {
    current = (index + total) % total;
    scenes.forEach(function (scene, i) {
      scene.classList.toggle("is-active", i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === current);
      dot.setAttribute("aria-pressed", i === current ? "true" : "false");
    });
    var scene = SCENES[current] || SCENES[0];
    indexEl.textContent = scene.chapter + " / " + SCENES[total - 1].chapter;
    nameEl.textContent = scene.name;
  }

  function restart() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
    if (reduceMotion) {
      return; /* 尊重系统的减少动态效果设置：保留手动切换 */
    }
    timer = window.setInterval(function () {
      if (!document.hidden) {
        show(current + 1);
      }
    }, DURATION);
  }

  nav.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      show(current + (event.key === "ArrowRight" ? 1 : -1));
      restart();
      dots[current].focus();
    }
  });

  show(0);
  restart();
})();
