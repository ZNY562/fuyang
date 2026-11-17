/* js/home.js：首页控制器，根据 SITE_DATA 填充资料并动态生成技能卡片 */
(function () {
  "use strict";

  const siteData = window.SITE_DATA;
  const profile = siteData.PROFILE;
  const skills = siteData.SKILLS;

  /* 通用节点工厂：统一创建元素、类名和文本，避免拼接 HTML 字符串 */
  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined && text !== null) {
      element.textContent = text;
    }
    return element;
  }

  /* 填充姓名、身份、简介、头像替代文字与资料标签 */
  function renderProfile() {
    document.title = profile.name + " | 个人资料";
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-title").textContent = profile.title;
    document.getElementById("profile-bio").textContent = profile.bio;
    document.getElementById("profile-avatar").alt = profile.avatarAlt;

    const metaList = document.getElementById("profile-meta");
    profile.facts.forEach(function (fact) {
      const item = createElement("li", "meta-item");
      const label = createElement("strong", "", fact.label);
      item.appendChild(label);
      item.appendChild(document.createTextNode(fact.value));
      metaList.appendChild(item);
    });
  }

  /* 创建一张卡片；卡片本身是链接，href 携带经过编码的技能 id */
  function createSkillCard(skill) {
    const card = createElement("a", "skill-card");
    card.href = "skill.html?id=" + encodeURIComponent(skill.id);
    card.setAttribute("aria-label", "查看" + skill.name + "技能详情");

    const top = createElement("div", "skill-card__top");
    const sigil = createElement("span", "skill-card__sigil", skill.glyph);
    sigil.setAttribute("aria-hidden", "true");
    top.appendChild(sigil);
    top.appendChild(createElement("span", "skill-card__level", skill.level));

    card.appendChild(top);
    card.appendChild(createElement("p", "skill-card__category", skill.category));
    card.appendChild(createElement("h3", "skill-card__title", skill.name));
    card.appendChild(createElement("p", "skill-card__summary", skill.summary));
    card.appendChild(createElement("span", "skill-card__action", "展阅卷宗"));
    return card;
  }

  /* 遍历数据数组，把卡片追加到首页网格 */
  function renderSkillCards() {
    const grid = document.getElementById("skill-grid");
    skills.forEach(function (skill) {
      grid.appendChild(createSkillCard(skill));
    });
  }

  renderProfile();
  renderSkillCards();
})();
