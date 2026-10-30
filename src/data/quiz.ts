export interface QuizOption {
  text: string;
  subtext?: string;
  scores: {
    laozhong: number;      // 老中依赖度
    introvert: number;     // 社恐/极客孤独抗性
    grinder: number;       // 东亚现代卷王属性
    nomad: number;         // 数字游民/赛博吉普赛
    pragmatist: number;    // 动手蓝领硬汉属性
  };
}

export interface QuizQuestion {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface PersonaResult {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  roast: string;
  prescription: string;
  recommendedCountries: {
    name: string;
    flag: string;
    reason: string;
    route: string;
  }[];
  suitabilityScore: number; // 0 - 100 润学适配指数
  laozhongIndex: number;    // 0 - 100 纯种老中指数
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "饮食与生活便利度",
    title: "异国他乡凌晨 1 点，你刚肝完代码饥肠辘辘。整座城市所有餐馆全关门了，街上只有冷风吹着垃圾袋。你的第一心理反应是？",
    subtitle: "检验你对国内极致便利服务的精神依赖度",
    options: [
      {
        text: "“生活失去了意义！没有热气腾腾的羊肉串、麻辣烫、螺蛳粉，这破地方是一天都呆不下去了！”",
        subtext: "无法忍受夜生活归零与冰冷外卖",
        scores: { laozhong: 35, introvert: -15, grinder: 10, nomad: -10, pragmatist: -10 }
      },
      {
        text: "默默叹口气，回屋泡一包老坛酸菜泡面，下决心明天必须开车去华人超市扫货囤干粮。",
        subtext: "痛苦但能用老中智慧对付活着",
        scores: { laozhong: 15, introvert: 5, grinder: 15, nomad: 5, pragmatist: 10 }
      },
      {
        text: "熟练地从冰箱掏出自制酸酵面包、煎两片培根，或者吨吨吨喝杯燕麦蛋白粉倒头就睡。",
        subtext: "白人冷餐与极客糊口已完全生理自洽",
        scores: { laozhong: -20, introvert: 25, grinder: 5, nomad: 20, pragmatist: 20 }
      },
      {
        text: "狂喜！看着窗外空无一人的静谧街道，终于没有楼下烧烤摊的油烟和大声划拳的噪音了，太治愈了。",
        subtext: "对安静无打扰的生活环境拥有极致渴求",
        scores: { laozhong: -30, introvert: 35, grinder: -5, nomad: 25, pragmatist: 15 }
      }
    ]
  },
  {
    id: 2,
    category: "社交与孤独耐受力",
    title: "周五下午 4:30 准时下班，一直到周日晚上这 52 小时里：没有商场KTV、没有洗脚捏脚，窗外只有大草坪和阴天，你：",
    subtitle: "海外“好山好水好无聊”的真实精神体检",
    options: [
      {
        text: "感觉被流放宁古塔，抓着手机疯狂敲微信：“在吗？打瓦吗？上号吗？有人出来说句话吗？！”",
        subtext: "极度依赖熟人社会与高频社交刺激",
        scores: { laozhong: 30, introvert: -30, grinder: 0, nomad: -20, pragmatist: -15 }
      },
      {
        text: "有点空虚，但已经在各大华人论坛里疯狂搜刮附近的华人羽毛球群、桌游局或火锅聚会。",
        subtext: "肉身虽在海外，生活依旧要复刻国内华人圈",
        scores: { laozhong: 20, introvert: -10, grinder: 15, nomad: -5, pragmatist: 5 }
      },
      {
        text: "狂喜！关门拼乐高、在车库修自行车、Steam 刷时长、写开源代码，两整天不用跟人类说一句话太幸福了。",
        subtext: "天然自带北欧冷峻基因，社恐晚期救赎",
        scores: { laozhong: -25, introvert: 40, grinder: 10, nomad: 20, pragmatist: 25 }
      },
      {
        text: "套上始祖鸟冲锋衣，冒着细雨去森林徒步 20 公里，回来壁炉烤火喝精酿，享受自然原生态。",
        subtext: "户外爱好者，天然适应欧美澳新生活方式",
        scores: { laozhong: -30, introvert: 20, grinder: -10, nomad: 20, pragmatist: 35 }
      }
    ]
  },
  {
    id: 3,
    category: "行政效率高血压抗性",
    title: "去当地市政厅办居留卡，办事员慢悠悠喝着咖啡告诉你：“下个月才有名额，请带纸质材料预约，周五下午我们不办公哦。”",
    subtitle: "直面海外政府部门与水管工的“树懒式效率”",
    options: [
      {
        text: "血压瞬间拉满：“这效率在我们国内早就被政务大厅投诉下岗了！一群懒汉！叫你们主管出来！”",
        subtext: "习惯了国内秒级政务APP，无法承受磨叽",
        scores: { laozhong: 35, introvert: -10, grinder: 15, nomad: -15, pragmatist: -10 }
      },
      {
        text: "表面陪笑说 Thank you，转头在小红书发 1500 字小作文怒喷官僚主义，并发誓考过身份后一定要投诉。",
        subtext: "被恶心到了但为了绿卡不得不暂时忍气吞声",
        scores: { laozhong: 15, introvert: 0, grinder: 25, nomad: 0, pragmatist: 5 }
      },
      {
        text: "深吸一口气：“行吧，这就是生活 (C'est la vie)”，反正下周也没事，溜达到公园长椅晒太阳喂鸽子。",
        subtext: "反向接受松弛感，精神欧洲人已就位",
        scores: { laozhong: -25, introvert: 25, grinder: -15, nomad: 30, pragmatist: 20 }
      },
      {
        text: "翻出当地法条打印了三份，用流利外语指着条例解释豁免通道，用对方的官僚规矩倒逼办事员现场办结。",
        subtext: "硬核规则研究狂魔，专治各种摆烂",
        scores: { laozhong: -10, introvert: 15, grinder: 35, nomad: 15, pragmatist: 30 }
      }
    ]
  },
  {
    id: 4,
    category: "内卷基因与下一代教育观",
    title: "假设你有小孩，下午3点放学在泥巴里抓蚯蚓，满脸泥巴回来说：“爸爸，我数学考了50分，但我长大想当水管工开小皮卡！”",
    subtitle: "做题家潜意识与阶级滑落焦虑测试",
    options: [
      {
        text: "眼前一黑差点晕厥，连夜上网查“当地排名前五的私立学校在哪”、“华人奥数补习班”、“如何转去顶级公立学区”。",
        subtext: "东亚鸡娃做题家灵魂不可磨灭",
        scores: { laozhong: 40, introvert: -10, grinder: 30, nomad: -20, pragmatist: -25 }
      },
      {
        text: "嘴上微笑着说宝宝好棒，暗地里规定从明天开始每天必须刷 30 道数学题，不能落后于华人同龄人。",
        subtext: "披着快乐教育外皮的隐性内卷",
        scores: { laozhong: 20, introvert: -5, grinder: 25, nomad: -10, pragmatist: -10 }
      },
      {
        text: "立刻查了查本地水管工/电工的时薪（发现时薪 120 欧且不用熬夜看监控），认真点头：“儿啊，这行真比敲代码香，收徒吗？”",
        subtext: "看透现代白领牛马本质，拥抱实用蓝领尊严",
        scores: { laozhong: -25, introvert: 15, grinder: -10, nomad: 20, pragmatist: 40 }
      },
      {
        text: "单身主义 / 丁克，买房生娃对我而言是上古封印，我只关心我明天的代码和去哪个国家潜水冲浪。",
        subtext: "完全脱离家庭式卷款链条",
        scores: { laozhong: -30, introvert: 25, grinder: -15, nomad: 40, pragmatist: 15 }
      }
    ]
  },
  {
    id: 5,
    category: "税收拔毛与福利社会认同",
    title: "发薪日打开工资单，税前明明有 7,000 欧 / 80 万日元，结果所得税+医疗+年金+介护大刀阔斧扣掉将近 40%，你的心情：",
    subtitle: "考验你对“高税收福利社会”的真实心理承受度",
    options: [
      {
        text: "心在滴血！感觉自己被合法洗劫了，天天在论坛痛骂“高税收养懒汉，努力干活的人像冤大头！”",
        subtext: "崇尚按劳分配与绝对留存，极度排斥大锅饭福利",
        scores: { laozhong: 35, introvert: -5, grinder: 20, nomad: -15, pragmatist: -10 }
      },
      {
        text: "肉疼，但看看自己生病不用塞红包的医疗卡、没有雾霾的空气和不用担惊受怕的食品，咬咬牙忍了。",
        subtext: "认可社会契约，拿部分财务自由置换安全感",
        scores: { laozhong: -10, introvert: 20, grinder: 15, nomad: 10, pragmatist: 25 }
      },
      {
        text: "完全无所谓，我赚的本来就是远程美元/加密货币，注册低税区个体户，哪家税率低我就在哪飘着。",
        subtext: "国际游牧法务大师，合法规避重税",
        scores: { laozhong: -30, introvert: 20, grinder: 5, nomad: 45, pragmatist: 10 }
      },
      {
        text: "本身算好收入阈值，刚好卡在政府退税和儿童牛奶金补贴线以内，甚至倒薅了一把资本主义羊毛。",
        subtext: "精明钻研社会福利规则的极限玩家",
        scores: { laozhong: 5, introvert: 10, grinder: 30, nomad: 15, pragmatist: 30 }
      }
    ]
  }
];

export const PERSONA_RESULTS: Record<string, PersonaResult> = {
  "native-laozhong": {
    id: "native-laozhong",
    title: "纯度 100% 的原生老中",
    subtitle: "退订机票，建议原地安心摸鱼",
    tag: "老中胃晚期 · 极度怕无聊 · 离不开顺丰外卖",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    roast: "老老实实呆着吧，赶紧把机票退了！你根本不是真的想移居，你只是昨晚加班被傻逼领导恶心到了，或者刷了几篇小红书中介软文在上头。\n\n你骨子里离不开半夜 2 点的外卖、周末人声鼎沸的海底捞、以及 3 天必达的淘宝顺丰。真要去了国外，不出两个月你就会在日记里写满‘好山好水好无聊，我想回国吃螺蛳粉’。一旦水管漏水叫个工人要花你半个月工资，你当场就会怀疑人生。",
    prescription: "今晚下楼找个地道路边摊，点一盆小龙虾和两瓶冰啤酒，明天安安心心在工位上当个摸鱼的快乐打工人。国内的高铁和美食才是你的安乐窝。",
    recommendedCountries: [
      {
        name: "中国 · 现住地",
        flag: "🇨🇳",
        reason: "拥有全球最顶级的深夜外卖生态、最便捷的快递与最热闹的烟火气，治愈你的一切精神内耗。",
        route: "周末坐高铁去成都/长沙/顺德吃两天即可彻底自愈"
      },
      {
        name: "泰国 (清迈/曼谷)",
        flag: "🇹🇭",
        reason: "如果你真想体验海外，这里物价低、满街中餐热火朝天、夜市开到凌晨，是老中胃唯一的海外平替天堂。",
        route: "DTV 数字游民签 (5年多次，存款仅需10万RMB)"
      }
    ],
    suitabilityScore: 22,
    laozhongIndex: 98
  },
  "east-asia-grinder": {
    id: "east-asia-grinder",
    title: "精神东亚现代卷王",
    subtitle: "要法治与边界，但绝不接受摆烂效率",
    tag: "靠实力说话 · 24h便利店依赖 · 秩序强迫症",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    roast: "你既渴望法治文明、清爽的人际边界与没有PUA的职场，但你骨子里又是个习惯了现代高效运转的东亚做题家。\n\n去欧美你受不了修个宽带等三周、下午4点商场全关门的树懒节奏；去东南亚你又嫌基础设施不够现代。你最适合一个既有24小时全家便利店、干净整洁的地下铁、又能让你凭借技术和打分‘靠规则直接通关’的地方。",
    prescription: "不用折腾大洋彼岸。办一本护照，靠学历和工作年限算分，一两年就能拿到永住或绿卡，想回国探亲买张打折机票3小时直达。",
    recommendedCountries: [
      {
        name: "日本 (Tokyo/Osaka)",
        flag: "🇯🇵",
        reason: "亚洲治安天花板，极高密度的便利店与美食，高度人才打分达到80分最快仅需1年即可申请永久居留（绿卡）。",
        route: "高度人才专门职 1号(高专·技) 70/80分制"
      },
      {
        name: "新加坡",
        flag: "🇸🇬",
        reason: "无缝中文沟通环境，低税率金融中心，适合高薪IT架构师与管理层通过 COMPASS 积分框架落地。",
        route: "Employment Pass (EP) / Tech.Pass"
      }
    ],
    suitabilityScore: 84,
    laozhongIndex: 45
  },
  "nordic-introvert": {
    id: "nordic-introvert",
    title: "精神北欧人 / 重度社恐极客",
    subtitle: "灵魂出厂设置就是低温、静音、免打扰",
    tag: "零社交渴求 · 车库极客 · 讨厌人挤人",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    roast: "你天生拥有抗击极夜的冷酷基因。对你而言，电梯里邻居不跟你打招呼不是冷漠，而是最高尚的礼貌。\n\n你受够了国内饭局上的推杯换盏和无意义的客套寒暄。下班后没有任何工作群艾特你、周末在自己的小车库里修修木头打打代码，对你来说就是天堂。你不在乎少存点钱，你只想要属于自己的安静空间和绝对不用社交的尊严。",
    prescription: "买一套始祖鸟冲锋衣，挑一个冬天漫长、人烟稀少的国家，拥抱属于你的绝对自由吧。",
    recommendedCountries: [
      {
        name: "德国 (Berlin/Munich)",
        flag: "🇩🇪",
        reason: "工会强大绝无加班，严格遵循劳动法，IT人才通过‘机会卡’或‘欧盟蓝卡’降门槛拿身份极其稳定。",
        route: "机会卡 (Chancenkarte) 6分制 / 欧盟蓝卡"
      },
      {
        name: "加拿大 (温哥华/卡尔加里)",
        flag: "🇨🇦",
        reason: "地广人稀，好山好水天然氧吧，适合户外徒步与自给自足的安静生活。",
        route: "BC PNP Tech 科技通道 / Express Entry"
      }
    ],
    suitabilityScore: 91,
    laozhongIndex: 12
  },
  "cyber-nomad": {
    id: "cyber-nomad",
    title: "赛博吉普赛 / 数字游牧狂徒",
    subtitle: "拒绝为任何单一国家的土地接盘买单",
    tag: "一台MacBook行天下 · 追求低税海滩 · 自由主义",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    roast: "长期办移民拿绿卡？在异国他乡当房奴生娃？交40%的税去养别人的养老金？在你看来看简直是自寻枷锁！\n\n你的资产在链上或者远程美金账户里，一台 M3 MacBook 就是你全部的生产资料。你更愿意在清迈的咖啡馆喝40泰铢的拿铁，在巴厘岛的海滩看日落敲代码，在西班牙吃海鲜饭。哪里网速快、阳光足、生活成本低，哪里就是你的祖国。",
    prescription: "办齐两到三个国家的数字游民长期签证，保持轻资产与高流动性，做这个时代真正的全球公民。",
    recommendedCountries: [
      {
        name: "泰国 (曼谷/清迈/普吉)",
        flag: "🇹🇭",
        reason: "2024最新神签 DTV：5年有效每次呆180天，10万存款门槛，生活成本不到北上一半。",
        route: "Destination Thailand Visa (DTV)"
      },
      {
        name: "西班牙 (瓦伦西亚/巴塞罗那)",
        flag: "🇪🇸",
        reason: "欧洲气候最好的海滨国家，西班牙数字游民签（DNV）享受贝克汉姆法案 24% 封顶所得税优惠。",
        route: "Spain Digital Nomad Visa (DNV)"
      }
    ],
    suitabilityScore: 95,
    laozhongIndex: 8
  },
  "hardcore-pragmatist": {
    id: "hardcore-pragmatist",
    title: "蓝领实用主义开拓者",
    subtitle: "受够了写无意义PPT，用双手赢得真正尊严",
    tag: "动手能力MAX · 蓝领高薪向往 · 阳光大草坪",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    roast: "你受够了写假大空的周报、画毫无卵用的架构PPT和应付各种部门墙的内耗。你甚至宁愿去大农场开拖拉机、在草坪修篱笆，或者考个执照当电工水管工。\n\n你深知在发达国家，真正受到高薪敬重的从来不是初级白领，而是靠过硬手艺和体力解决现实问题的人。你想要真正的阳光、宽敞的皮卡、以及一分耕耘一分收获的踏实感。",
    prescription: "放弃在格子间跟AI抢饭碗的执念，去一个崇尚蓝领、人工昂贵的大陆，用双手打造你的城堡。",
    recommendedCountries: [
      {
        name: "澳大利亚 (墨尔本/布里斯班)",
        flag: "🇦🇺",
        reason: "技工与工程专业时薪世界一流，严格保证工时与安全，阳光明媚，蓝领社会地位极高。",
        route: "189/190 独立技术移民 / 482 雇主担保"
      },
      {
        name: "加拿大偏远省份 (阿尔伯塔/曼省)",
        flag: "🇨🇦",
        reason: "门槛低、政策友好，适合愿意去非一线城市踏实做技术支持与实用工作的开拓者。",
        route: "Alberta Tech Pathway / 省提名政策"
      }
    ],
    suitabilityScore: 86,
    laozhongIndex: 28
  }
};
