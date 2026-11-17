/* js/data.js：全站唯一数据源；修改个人资料或技能内容只需编辑本文件 */
(function (global) {
  "use strict";

  /* 首页头像旁展示的基础资料；bio 用换行分成三行，由 .lede 的 pre-line 呈现 */
  const PROFILE = {
    name: "京观",
    title: "稳定七无，少中/少御音",
    bio: "主要业务\n病恋，虐恋，病虐教学\n怆然符号的沉默展示，是为京观",
    avatarAlt: "京观的冷蓝头像",
    facts: [
      { label: "属性", value: "LE-T" },
      { label: "星座", value: "狮子座" },
      { label: "MBTI", value: "E/INTP" }
    ]
  };

  /* 三卷共用的详情页布局：隐藏调性/存续统计框，统一四个栏目标题 */
  const DETAIL_LAYOUT = {
    showStats: false,
    sections: {
      overview: "个人",
      highlights: "风格",
      tools: "最近出没",
      projects: "须知话术"
    }
  };

  /* 三卷档案；每项技能对应唯一 id，详情页通过 ?id=xxx 查找同一对象 */
  const SKILLS = [
    {
      id: "binglian",
      glyph: "✦",
      name: "病恋",
      category: "水天一色",
      level: "主调",
      experience: "长期",
      summary: "水与天互为镜像，渡鸦与水母在颠倒的世界中交换维度。",
      detail: DETAIL_LAYOUT,
      description: [
        "京观",
        "22  狮子  XNTP  T 妹感姐",
        "常驻：0号耳书丨鸟妹校服"
      ],
      highlights: [
        "主风格：钓系逻辑恶趣",
        "副风格：剖析精控诱导",
        "剖析精控诱导",
        "喜血暴可注明，除血暴外基本0动描。"
      ],
      tools: ["愚戏", "雾凇", "乌合之众"],
      /* 带 link 的条目在详情页渲染为可点击的金山文档外链，原描述作为悬浮提示保留 */
      projects: [
        {
          title: "游梦",
          description: "以一组静默意象构成可反复展读的短章。",
          link: "https://www.kdocs.cn/l/caQJK82LoYGk"
        },
        {
          title: "水落翼尖",
          description: "把五幕底图与个人资料收进同一套冷蓝视觉。",
          link: "https://www.kdocs.cn/l/cdCVsosLdP4w"
        }
      ]
    },
    {
      id: "nuelian",
      glyph: "☾",
      name: "虐恋",
      category: "未曾言说的遗憾",
      level: "变奏",
      experience: "长期",
      summary: "像封闭的山谷猛然敞开，大风无休无止地刮进来。",
      detail: DETAIL_LAYOUT,
      description: [
        "京观",
        "22｜狮子座｜XNTP｜T",
        "曾用名：段黎｜缪司",
        "常驻：0号耳书丨鸟妹二级白",
        "◐ 混圈时长3年半の上古余孽人 ◐",
        "◐ 历史无瓜0差评の小众养老人 ◐",
        "◐ 出师于多个知名严审团天花板 ◐"
      ],
      highlights: [
        "主风格：剖析丨低无丨钓系丨逻辑丨引导",
        "隐藏风格：文艺｜救赎｜西哲｜人设 | 意识流等",
        "非常规虐恋，无剧情无人设不恨海情天",
        "如果可能出现自带剧情请提前告知",
        "不默认恋人关系，我可能只是一个访客",
        "通常不会涉及贬低，我很在意您的体验"
      ],
      tools: ["愚戏", "雾凇", "乌合之众"],
      /* 带 link 的条目在详情页渲染为可点击的金山文档外链，原描述作为数据回退保留 */
      projects: [
        {
          title: "筹码",
          description: "五张底图按幕次交替，形成缓慢推进的情绪序列。",
          link: "https://www.kdocs.cn/l/cmqiLBM13XuG"
        },
        {
          title: "渴望",
          description: "用拱形卡片承载三段彼此呼应的短档案。",
          link: "https://www.kdocs.cn/l/cfjAmJk27qLm"
        }
      ]
    },
    {
      id: "bingnue",
      glyph: "✧",
      name: "病虐教学",
      category: "爱永远燃烧",
      level: "卷宗",
      experience: "长期",
      summary: "我所有的黑暗，都是因为曾遇到过你。",
      /* 本卷单独定制：沿用共享布局，改两个栏目标题并隐藏「最近出没」整栏 */
      detail: Object.assign({}, DETAIL_LAYOUT, {
        showTools: false,
        sections: Object.assign({}, DETAIL_LAYOUT.sections, {
          highlights: "教学风格",
          projects: "教学详情"
        })
      }),
      description: [
        "京观",
        "22丨狮子座丨Le–T丨XNTP丨七无",
        "◐ 混圈时长5年半の圈内上古余孽人 ◐",
        "◐ 历史无瓜0差评の小众全能养老人 ◐",
        "◐ 师承于两位多个知名严审团天花板 ◐",
        "历史头牌15+ 板评百+ 单量200+",
        "目前所在严审团：愚戏 隐月 墨菲",
        "曾入严审：觅梦岛 集异录 极乐 烬雪 雾山影",
        "目前病永教在学人数11，虐永教2",
        "收够15位关停永教项目，剩余2"
      ],
      highlights: [
        "审团严选+不古板不套路+因材施教",
        "主打一个活人味儿！！！",
        "腾讯会议+线上互练+线下复盘+答疑",
        "过团审就帮做资料+须知卡",
        "严审档毕业保送5w+流水严审团愚戏",
        "制作资料的风格参考此资料即可",
        "1v1教学经济又实惠，速速来报",
        "理论→作业→实战→复盘→理论的循环授课，不写作业的不要报。",
        "下单后3天内可退，但要扣除30%的抽成/课程费用。逾期不退不换"
      ],
      tools: [],
      /* 「主页保留」这行改为金山文档外链；「单一模板」整条（标题 + 描述框）删除 */
      projects: [
        {
          title: "直到你死去，我的爱永远燃烧",
          description: "主页只保留三张对应卡片，页面更轻、更聚焦。",
          link: "https://kdocs.cn/l/cvJwQwobhoRA"
        }
      ]
    }
  ];

  /* 挂到全局对象上，供经典 script 引用；不使用 ES Module 以兼容 file:// */
  global.SITE_DATA = {
    PROFILE: PROFILE,
    SKILLS: SKILLS
  };
})(window);
