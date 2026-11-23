/* 独立主页控制器：读取主页资料与原创示例动态。 */
(function () {
  "use strict";

  const siteData = window.SITE_DATA;
  const profile = siteData.PROFILE;
  const moments = siteData.MOMENTS;

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  }

  function renderProfile() {
    document.title = profile.name + " | 个人主页";
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-title").textContent = profile.title;
    document.getElementById("profile-bio").textContent = profile.bio;
    document.getElementById("profile-avatar").alt = profile.avatarAlt;

    const facts = document.getElementById("profile-meta");
    profile.facts.forEach(function (fact) {
      const item = createElement("li", "profile-fact");
      item.appendChild(createElement("span", "profile-fact__label", fact.label));
      item.appendChild(createElement("span", "profile-fact__value", fact.value));
      facts.appendChild(item);
    });
  }

  function createMoment(moment, index) {
    const article = createElement("article", "moment-card");
    const rail = createElement("div", "moment-rail");
    rail.appendChild(createElement("span", "moment-rail__dot"));
    rail.appendChild(createElement("span", "moment-rail__line"));
    article.appendChild(rail);

    const content = createElement("a", "moment-card__content");
    content.href = moment.url;
    content.setAttribute("aria-label", "打开动态 0" + (index + 1) + "：" + moment.title);
    const meta = createElement("div", "moment-card__meta");
    meta.appendChild(createElement("span", "moment-card__index", "NOTE 0" + (index + 1)));
    meta.appendChild(createElement("span", "moment-card__category", moment.category));
    content.appendChild(meta);
    content.appendChild(createElement("h3", "moment-card__title", moment.title));
    content.appendChild(createElement("p", "moment-card__summary", moment.summary));

    if (moment.quote) {
      const quote = createElement("p", "moment-card__quote", moment.quote);
      quote.setAttribute("aria-label", "风格摘录");
      content.appendChild(quote);
    }

    const footer = createElement("div", "moment-card__footer");
    const tag = createElement("span", "moment-card__tag", "# " + moment.tag);
    const stamp = createElement("span", "moment-card__stamp", "打开动态 ↗");
    footer.appendChild(tag);
    footer.appendChild(stamp);
    content.appendChild(footer);
    article.appendChild(content);
    return article;
  }

  function renderMoments() {
    const feed = document.getElementById("moments-feed");
    moments.forEach(function (moment, index) {
      feed.appendChild(createMoment(moment, index));
    });
    document.getElementById("moment-count").textContent = String(moments.length).padStart(2, "0") + " NOTES";
  }

  renderProfile();
  renderMoments();
})();
