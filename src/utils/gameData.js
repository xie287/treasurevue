export const adventureData = {
  forest: [
    { text: "你在森林深处发现一张神秘的藏宝图碎片。", effect: "🗺️" },
    { 
      text: "你遇到一只会说话的松鼠，它问你：森林里最高的树叫什么？", 
      effect: "🐿️", 
      quiz: {
        question: "森林里最高的树叫什么？",
        options: ["橡树", "杉树", "松树", "榕树"],
        answer: 1,
        correctMsg: "松鼠开心地跳了起来，带你找到一棵奇怪的大树！",
        wrongMsg: "松鼠摇摇头：再想想吧！"
      }
    },
    { text: "你在树洞里找到一把金色钥匙！", effect: "🔑" }
  ],
  mountain: [
    { text: "你在山顶俯瞰四周，发现远处有闪光。", effect: "🔭" },
    { 
      text: "一块石碑上刻着谜语：什么东西越洗越脏？", 
      effect: "🪨",
      quiz: {
        question: "什么东西越洗越脏？",
        options: ["水", "衣服", "毛巾", "手"],
        answer: 0,
        correctMsg: "石碑发出光芒，出现一颗神秘宝石！",
        wrongMsg: "答案不对，石碑没有反应。"
      }
    },
    { text: "你获得一颗神秘宝石！", effect: "💎" }
  ],
  beach: [
    { text: "你在沙滩上发现一串奇怪的脚印。", effect: "👣" },
    { 
      text: "你挖到一个瓶子，瓶子里有纸条：什么动物永远不会淹死？", 
      effect: "🍾",
      quiz: {
        question: "什么动物永远不会淹死？",
        options: ["鱼", "青蛙", "鸭子", "鲸鱼"],
        answer: 0,
        correctMsg: "你获得藏宝线索！",
        wrongMsg: "纸条模糊了，看不清楚。"
      }
    },
    { text: "你获得藏宝线索！", effect: "📜" }
  ]
}

export const locationThemes = {
  forest: {
    name: "神秘森林",
    icon: "🌲",
    background: "linear-gradient(135deg, #2e8b57 0%, #a8e063 100%)",
    color: "#43a047"
  },
  mountain: {
    name: "高山之巅", 
    icon: "⛰️",
    background: "linear-gradient(135deg, #283e51 0%, #485563 100%)",
    color: "#1e88e5"
  },
  beach: {
    name: "阳光海滩",
    icon: "🏖️", 
    background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    color: "#ffd700"
  }
}