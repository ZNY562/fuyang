/* js/skill.js：详情页控制器，读取 URL 参数并渲染匹配技能或友好提示 */
(function () {
  "use strict";

  const siteData = window.SITE_DATA;
  const skills = siteData.SKILLS;
  const detailRoot = document.getElementById("skill-detail");
  const statusPanel = document.getElementById("status-panel");
  const statusTitle = document.getElementById("status-title");
  const statusText = document.getElementById("status-text");

  /* 通用节点工厂：所有动态内容都通过 textContent 写入 */
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

  /* 优先用 URLSearchParams 取参；附带手动解析兼容旧浏览器和 file:// 场景 */
  function readSkillId() {
    const query = window.location.search.replace(/^\?/, "");
    if (!query) {
      return "";
    }

    if (typeof window.URLSearchParams === "function") {
      const params = new window.URLSearchParams(query);
      return (params.get("id") || "").trim().toLowerCase();
    }

    const pairs = query.split("&");
    for (let index = 0; index < pairs.length; index += 1) {
      const pair = pairs[index].split("=");
      const key = decodeURIComponent(pair[0] || "");
      if (key === "id") {
        try {
          return decodeURIComponent((pair[1] || "").replace(/\+/g, " ")).trim().toLowerCase();
        } catch (error) {
          return "";
        }
      }
    }
    return "";
  }

  /* 找不到记录时隐藏详情容器，显示带返回入口的提示 */
  function showStatus(title, message) {
    detailRoot.hidden = true;
    detailRoot.textContent = "";
    statusPanel.hidden = false;
    statusTitle.textContent = title;
    statusText.textContent = message;
    document.title = title + " | 技能详情";
  }

  function createStat(label, value) {
    const stat = createElement("div", "stat");
    stat.appendChild(createElement("span", "stat__label", label));
    stat.appendChild(createElement("span", "stat__value", value));
    return stat;
  }

  function createSection(title) {
    const section = createElement("section", "detail-section");
    section.appendChild(createElement("h2", "", title));
    return section;
  }

  function createList(className, items) {
    const list = createElement("ul", className);
    items.forEach(function (item) {
      list.appendChild(createElement("li", "", item));
    });
    return list;
  }

  /* 命中 id 后，依次生成标题区、概述、能力、工具和实践记录 */
  function renderSkill(skill) {
    /* 可选的单卷覆盖：未提供 detail 字段时沿用默认栏目标题与统计框 */
    const detail = skill.detail || {};
    const labels = detail.sections || {};

    statusPanel.hidden = true;
    detailRoot.hidden = false;
    detailRoot.textContent = "";
    document.title = skill.name + " | 技能详情";

    const hero = createElement("header", "detail-hero");
    const symbol = createElement("div", "detail-symbol", skill.glyph);
    symbol.setAttribute("aria-hidden", "true");
    hero.appendChild(symbol);

    const heroBody = createElement("div", "detail-hero__body");
    heroBody.appendChild(createElement("p", "eyebrow", "SKILL ARCHIVE / " + skill.category));
    heroBody.appendChild(createElement("h1", "detail-title", skill.name));
    heroBody.appendChild(createElement("p", "detail-lead", skill.summary));

    if (detail.showStats !== false) {
      const stats = createElement("div", "detail-stats");
      stats.appendChild(createStat("调性", skill.level));
      stats.appendChild(createStat("存续", skill.experience));
      heroBody.appendChild(stats);
    }
    hero.appendChild(heroBody);
    detailRoot.appendChild(hero);

    const overview = createSection(labels.overview || "能力概述");
    skill.description.forEach(function (paragraph) {
      overview.appendChild(createElement("p", "", paragraph));
    });
    detailRoot.appendChild(overview);

    const highlights = createSection(labels.highlights || "核心能力");
    highlights.appendChild(createList("highlight-list", skill.highlights));
    detailRoot.appendChild(highlights);

    /* 数据里配置 showTools: false 时隐藏整栏（含标题与全部胶囊） */
    if (detail.showTools !== false) {
      const tools = createSection(labels.tools || "常用工具");
      tools.appendChild(createList("tool-list", skill.tools));
      detailRoot.appendChild(tools);
    }

    const projects = createSection(labels.projects || "实践记录");
    const projectList = createElement("div", "project-list");
    skill.projects.forEach(function (project) {
      const card = createElement("article", "project");
      card.appendChild(createElement("h3", "", project.title));
      const desc = createElement("p", "");
      /* 带 link 的条目显示为外链；未配置时仍为普通描述文字，兼容另外两卷 */
      if (project.link) {
        const link = createElement("a", "project__link", project.linkText || "金山文档 · 点击打开 ↗");
        link.href = project.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = "在新窗口打开金山文档";
        desc.appendChild(link);
      } else {
        desc.textContent = project.description;
      }
      card.appendChild(desc);
      projectList.appendChild(card);
    });
    projects.appendChild(projectList);
    detailRoot.appendChild(projects);
  }

  /* 页面入口：取参、查找、分流到详情或错误提示 */
  const skillId = readSkillId();
  const matchedSkill = skills.find(function (skill) {
    return skill.id === skillId;
  });

  if (!skillId) {
    showStatus("尚未选择技能", "这个详情页需要通过 ?id=技能id 指定内容。请返回主页，从技能卡片进入。");
  } else if (!matchedSkill) {
    showStatus("未找到这份档案", "编号“" + skillId + "”没有对应的技能。它可能已改名或拼写有误，请返回主页重新选择。");
  } else {
    renderSkill(matchedSkill);
  }
})();
