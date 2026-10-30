export interface Profession {
  id: string;
  name: string;
  icon: string;
  category: "tech" | "creative" | "service" | "blue_collar" | "education" | "general";
  initialSalaryLevel: "low" | "medium" | "high";
  description: string;
}

export interface SimProfile {
  name: string;
  age: number;
  gender: "男" | "女" | "保密";
  profession: Profession;
  initialFundsRMB: number; // 启动资金
  englishLevel: "零基础纯靠比划" | "四六级哑巴英语" | "日常无障碍/雅思6分" | "精通/雅思7.5+";
  targetCountryId: string;
}

export interface SimEventChoice {
  text: string;
  subtext?: string;
  effects: {
    healthDelta?: number;        // 心理与生理健康 (-50 ~ +50)
    fundsDeltaRMB?: number;      // 资金变化
    languageDelta?: number;      // 语言熟练度 (+0 ~ +30)
    prProgressDelta?: number;    // 身份/永居进度 (+0% ~ +30%)
    laozhongDelta?: number;      // 老中依赖度
  };
  outcomeNarrative: string;      // 抉择后的真实故事反馈
}

export interface SimYearEvent {
  year: number; // 1 ~ 5
  title: string;
  scenario: string;
  tags?: string[];
  choices: SimEventChoice[];
}

export interface SimEnding {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  summary: string;
  keyStatsSummary: string;
  quote: string;
}

export const PROFESSIONS: Profession[] = [
  {
    id: "software_dev",
    name: "程序员 / IT开发者",
    icon: "💻",
    category: "tech",
    initialSalaryLevel: "high",
    description: "具备代码能力，海外IT缺口大但面试卷算法与语言。"
  },
  {
    id: "designer",
    name: "视觉设计师 / 自由插画师",
    icon: "🎨",
    category: "creative",
    initialSalaryLevel: "medium",
    description: "靠作品集说话，审美无国界，适合远程或文化创意岗位。"
  },
  {
    id: "barista_baker",
    name: "咖啡师 / 烘焙甜品师",
    icon: "☕",
    category: "service",
    initialSalaryLevel: "medium",
    description: "生活技能点满，澳新日加咖啡馆刚需，社交圈子极易打开。"
  },
  {
    id: "nurse_caregiver",
    name: "护士 / 康复养老护理员",
    icon: "🏥",
    category: "service",
    initialSalaryLevel: "medium",
    description: "全球老龄化严重，欧美澳新紧缺绿色通道，身份通过率最高。"
  },
  {
    id: "technician",
    name: "电工 / 水管工 / 汽修技师",
    icon: "🔧",
    category: "blue_collar",
    initialSalaryLevel: "high",
    description: "西方蓝领时薪天花板，靠过硬手艺打天下，不用熬夜画PPT。"
  },
  {
    id: "educator",
    name: "幼教老师 / 国际中文教师",
    icon: "📚",
    category: "education",
    initialSalaryLevel: "medium",
    description: "澳洲加拿大紧缺优先，耐心有爱心，适合有教育背景的人群。"
  },
  {
    id: "marketing_ops",
    name: "市场运营 / 跨境电商运营",
    icon: "📦",
    category: "general",
    initialSalaryLevel: "medium",
    description: "熟悉国际供应链与海外社交媒体，适合出海或跨国商贸。"
  },
  {
    id: "fresh_grad",
    name: "应届毕业生 / 迷茫青年",
    icon: "🎓",
    category: "general",
    initialSalaryLevel: "low",
    description: "年轻就是最大资本！适合打工度假 (WHV) 或语言学校探索世界。"
  },
  {
    id: "digital_nomad",
    name: "自由职业 / 数字游民",
    icon: "🧘",
    category: "creative",
    initialSalaryLevel: "medium",
    description: "赚远程美金或被动收入，一台电脑即工位，海滩咖啡馆常驻。"
  }
];

export const FUND_OPTIONS = [
  { label: "破釜沉舟穷游 (5万 RMB)", value: 50000, desc: "精打细算，下飞机第一天就得找打工生计" },
  { label: "工薪稳健启动金 (20万 RMB)", value: 200000, desc: "能够应付第一年学费/押金与基础开销" },
  { label: "中产从容准备 (60万 RMB)", value: 600000, desc: "有较强抗风险缓冲期，可支持过渡期租房与培训" },
  { label: "富足底气基金 (150万 RMB+)", value: 1500000, desc: "适合直接非盈利居留、投资或买房定居" }
];

export const SIM_COUNTRIES = [
  {
    id: "japan",
    name: "日本 (Tokyo/Osaka)",
    flag: "🇯🇵",
    desc: "治安无敌、24小时便利店、语言学校或特定技能低门槛快速启航",
    difficulty: "中等",
    costLevel: "¥¥"
  },
  {
    id: "australia",
    name: "澳大利亚 (Sydney/Melbourne)",
    flag: "🇦🇺",
    desc: "阳光大草坪、蓝领时薪天花板、打工度假(WHV)与护理技工移民圣地",
    difficulty: "中等",
    costLevel: "¥¥¥"
  },
  {
    id: "thailand",
    name: "泰国 (Chiang Mai/Bangkok)",
    flag: "🇹🇭",
    desc: "物价极低、美食丰富、DTV 5年多次游民签、老中生活降维神仙天堂",
    difficulty: "极低",
    costLevel: "¥"
  },
  {
    id: "germany",
    name: "德国 (Berlin/Munich)",
    flag: "🇩🇪",
    desc: "工会强大绝无加班、机会卡6分制赴德、公立大学免学费、欧洲中心",
    difficulty: "困难",
    costLevel: "¥¥"
  },
  {
    id: "spain",
    name: "西班牙 (Valencia/Barcelona)",
    flag: "🇪🇸",
    desc: "气候最好、非盈利居留有存款即可住、海鲜饭与地中海松弛人生",
    difficulty: "低",
    costLevel: "¥¥"
  },
  {
    id: "china_stay",
    name: "中国 · 现住地 (平行时空对照组)",
    flag: "🇨🇳",
    desc: "如果留下来继续当打工人会发生什么？最真实的平行宇宙对照！",
    difficulty: "熟悉",
    costLevel: "¥¥"
  }
];

export const RANDOM_NAMES = ["李想", "王星", "林深", "张宁", "周舟", "陈默", "安娜", "赵云", "沈越", "姜来"];

export const SIM_YEAR_EVENTS: Record<string, SimYearEvent[]> = {
  japan: [
    {
      year: 1,
      title: "初来乍到：租房审查与第一笔生计",
      scenario: "你拉着两个大行李箱走出成田机场。虽然满街便利店让你备感亲切，但中介带你看房时，房东一听是初次赴日外国人连连摆手；同时你的启动资金正以每天几百人民币的速度缩水。",
      choices: [
        {
          text: "咬牙付 2 个月礼金+押金+担保公司费，租下山手线沿线独立小公寓，省下通勤时间全力学语言找工。",
          subtext: "前期烧钱，但生活品质与效率有保证",
          effects: { fundsDeltaRMB: -35000, healthDelta: 10, languageDelta: 15, prProgressDelta: 20, laozhongDelta: -10 },
          outcomeNarrative: "你搬进了虽然只有 18 平米但麻雀虽小五脏俱全的单身公寓。每天下班去全家买便当，日语听力在便利店店员的礼貌客套话中飞速长进。"
        },
        {
          text: "选择华人合租房 (Share House)，先去中华料理店或便利店夜班打工糊口，把生活成本压到最低。",
          subtext: "极致省钱，但室友矛盾多且老中圈子扎堆",
          effects: { fundsDeltaRMB: -12000, healthDelta: -10, languageDelta: 5, prProgressDelta: 10, laozhongDelta: 20 },
          outcomeNarrative: "房租省下了一大半，但每天在合租屋厨房听室友痛骂日本西瓜太贵。你在便利店扫码熟练得让人心疼，存款没怎么掉，但有点怀疑出国的意义。"
        }
      ]
    },
    {
      year: 2,
      title: "除夕之夜：老中胃大爆发与会社文化洗礼",
      scenario: "转眼到了第二年春节，国内群里全在晒热腾腾的年夜饭与除夕晚会。而东京大雪纷飞，你下班走在静悄悄的新宿街头，会社领导下班硬拉着你去居酒屋开‘忘年会’喝酒敬酒，你已经连续三个月没吃到地道羊肉串了。",
      choices: [
        {
          text: "推掉应酬！直奔池袋或者高田马场，找家东北铁锅炖，豪掷一万日元狂炫，回屋跟家里视频。",
          subtext: "老中胃大满足，狠狠治愈精神内耗",
          effects: { fundsDeltaRMB: -8000, healthDelta: 25, languageDelta: 0, prProgressDelta: 10, laozhongDelta: 25 },
          outcomeNarrative: "热气腾腾的铁锅炖酸菜粉条下肚那一刻，你的眼泪差点掉下来。你明白自己无论跑多远，骨子里那颗中国胃永远在叫嚣。"
        },
        {
          text: "跟着日本同事去居酒屋‘二次会’喝清酒，硬着头皮练习敬语，借机向课长争取转正与涨薪机会。",
          subtext: "融入当地社会，忍受社畜客套",
          effects: { fundsDeltaRMB: 15000, healthDelta: -15, languageDelta: 25, prProgressDelta: 25, laozhongDelta: -20 },
          outcomeNarrative: "喝到半夜两点吐在车站卫生间，但课长拍着你肩膀说‘君は本当に頑張っている’。下个月你的工资单涨了 4 万日元，签证续签了 3 年！"
        }
      ]
    },
    {
      year: 3,
      title: "立足与蜕变：考级加分还是跳槽外资？",
      scenario: "在日第三年，你已经对垃圾分类熟记于心，看病报销70%的健保卡让你彻底没有了就医恐慌。你发现自己的积分刚好卡在 65 分尴尬期，差 5 分就能达到高度人才 70 分快速永住门槛。",
      choices: [
        {
          text: "挑灯夜战！报名半年后的 JLPT N1 考试，并利用周末备战中国软考高级资格证（中日互认+5分）。",
          subtext: "做题家传统艺能发动！靠应试硬实力强行通关",
          effects: { fundsDeltaRMB: -5000, healthDelta: -5, languageDelta: 20, prProgressDelta: 30, laozhongDelta: 0 },
          outcomeNarrative: "做题家基因觉醒！你半年刷完三大本红宝书，N1 拿到 140 高分，加上软考系统分析师证书，总分狂飙到 80 分！直接解锁‘1年拿永住’的绿色通道！"
        },
        {
          text: "跳槽去六本木的纯英语外资企业，工资翻倍，告别日本传统年功序列制。",
          subtext: "高薪高回报，但外资稳定性略逊",
          effects: { fundsDeltaRMB: 60000, healthDelta: 15, languageDelta: 10, prProgressDelta: 20, laozhongDelta: -15 },
          outcomeNarrative: "你的年薪突破了 850 万日元，开会全英文沟通，平时下班再也不用假装加班等领导先走了。你在东京的周末开始变得有滋有味。"
        }
      ]
    },
    {
      year: 4,
      title: "安家抉择：低利率零首付买房还是去地方小城？",
      scenario: "日本房贷利率低至 0.4%~0.7%（近乎白借）。你在东京看了一套晴海旗两居室塔楼，首付甚至只要几十万日元；同时你的朋友劝你搬去福冈或冲绳，享受阳光海风与大房子。",
      choices: [
        {
          text: "趁着低利率，在东京或神奈川上车一套次新公寓，正式扎根日本核心资产区。",
          subtext: "成为有产阶级，资产抗通胀",
          effects: { fundsDeltaRMB: -40000, healthDelta: 10, languageDelta: 10, prProgressDelta: 25, laozhongDelta: -10 },
          outcomeNarrative: "拿到了超低息银行贷款，每月房贷比以前租房还便宜 3 万日元！你站在阳台俯瞰东京塔的夜景，终于在这个繁华冷峻的国度有了自己的避风港。"
        },
        {
          text: "拒绝房奴！开启远程工作模式，搬去海滨城市镰仓或京都租传统町屋，养一只柴犬过惬意慢生活。",
          subtext: "生活松弛感拉满，远离都市高压",
          effects: { fundsDeltaRMB: 20000, healthDelta: 35, languageDelta: 15, prProgressDelta: 15, laozhongDelta: -20 },
          outcomeNarrative: "每天推开木格窗就是紫阳花与江之电电车叮叮当当经过。你的精神内耗彻底治愈，整个人松弛得像变了一个人。"
        }
      ]
    },
    {
      year: 5,
      title: "命运终审：永住绿卡下发的那一天",
      scenario: "你在日本已经整整生活了五年。你手里的在留卡换成了闪闪发光的‘永住者’审查结果通知书；或者你正在纠结是入籍拿到免签190国的护照，还是保留中国国籍两头跑。",
      choices: [
        {
          text: "正式领取日本永久居留卡 (PR)，保留中国护照，获得在日永久工作与社会福利资格！",
          subtext: "最完美的留退自如状态",
          effects: { fundsDeltaRMB: 30000, healthDelta: 30, languageDelta: 15, prProgressDelta: 50, laozhongDelta: 10 },
          outcomeNarrative: "品川入管局窗口前，那张印着‘永住者’字样的卡片递到你手上。从此你不需要依附于任何雇主，在日本全境进退自如，天高任鸟飞。"
        },
        {
          text: "打包五年攒下的积蓄与流利的双语能力，选择回国发展或调任新加坡，把这段经历变成人生勋章。",
          subtext: "海归精锐，历练完成战略收割",
          effects: { fundsDeltaRMB: 80000, healthDelta: 20, languageDelta: 10, prProgressDelta: 10, laozhongDelta: 40 },
          outcomeNarrative: "你坐在回国的成田航班上，看着机翼下的富士山渐渐变小。你战胜了孤独，学会了独处，看清了世界，无论去哪里你都是不可战胜的成熟大人了。"
        }
      ]
    }
  ],
  australia: [
    {
      year: 1,
      title: "阳光大荒原：打工度假与肉厂/农场开局",
      scenario: "手握 WHV 打工度假签踏上悉尼。你原本以为落地就是海滩冲浪，结果发现悉尼单间房租高达每周 400 澳币！为了集齐第二年续签资格，你必须决定是先去偏远农场摘草莓，还是在城里找咖啡馆打工。",
      choices: [
        {
          text: "去昆士兰农场摘蓝莓或肉厂剃骨，虽然每天凌晨4点起床累到散架，但每周到手 1,500 澳币纯存！",
          subtext: "体力爆肝，快速攒下第一桶金",
          effects: { fundsDeltaRMB: 50000, healthDelta: -10, languageDelta: 10, prProgressDelta: 20, laozhongDelta: -15 },
          outcomeNarrative: "虽然手上磨出了老茧，但两个月你的澳洲联邦银行卡里多了 8,000 澳币！看着落日下的红色袋鼠，你感受到了纯体力劳动换来厚厚钞票的踏实感。"
        },
        {
          text: "留在墨尔本咖啡馆做 Barista 或奶茶店打工，在市区练习地道 Aussie 英语并融入多元社群。",
          subtext: "生活优雅舒适，但存钱速度相对平缓",
          effects: { fundsDeltaRMB: 10000, healthDelta: 20, languageDelta: 25, prProgressDelta: 10, laozhongDelta: 0 },
          outcomeNarrative: "你学会了用浓郁的澳洲口音向顾客问候‘G'day mate, how's it going?’。你的拿铁拉花技艺飞涨，周末常和世界各地的背包客去大洋路露营。"
        }
      ]
    },
    {
      year: 2,
      title: "人工刺客震撼：修水管收费 $350 带来的世界观重置",
      scenario: "你合租屋的马桶下水管爆了，叫来一个开着小卡车、满身纹身的澳洲水管工小哥，拧了两下螺丝换了个胶圈，用时 15 分钟，刷卡机敲出 $350 澳币。你当场被西方人工费的尊贵程度彻底震撼。",
      choices: [
        {
          text: "重塑职业信仰！利用打工攒的学费申请澳洲 TAFE 技工学校（电工/汽修/西厨），准备靠手艺拿 PR！",
          subtext: "蓝领逆袭之路，澳洲永远的缺人刚需",
          effects: { fundsDeltaRMB: -40000, healthDelta: 15, languageDelta: 20, prProgressDelta: 30, laozhongDelta: -25 },
          outcomeNarrative: "你脱下了格子衬衫，穿上了荧光黄的反光背心。看着身边的澳洲同学，你意识到在这里当个手艺精湛的技工，社会地位和收入绝不输写字楼白领。"
        },
        {
          text: "决定转战护理或幼教紧缺专业，走 189/190 独立技术移民绿色通道，享受联邦高额优先打分。",
          subtext: "文科与服务业的最稳移民捷径",
          effects: { fundsDeltaRMB: -50000, healthDelta: 10, languageDelta: 25, prProgressDelta: 35, laozhongDelta: -15 },
          outcomeNarrative: "你在养老院的实习非常顺利，老人们都夸你耐心温柔。州政府将你的职业列为优先获邀第一梯队，PR 邀请信已经在路上。"
        }
      ]
    },
    {
      year: 3,
      title: "偏远地区生活：阿德莱德或珀斯的慢时光",
      scenario: "为了州担保移民加分，你告别了喧嚣的悉尼，搬到了南澳阿德莱德或西澳珀斯。这里没有早高峰人挤人，街道宽阔，下班就能看到海边火烧云海豚跃出海面。",
      choices: [
        {
          text: "买了辆二手丰田 Hilux 皮卡，周末带上折叠椅和烧烤架去海滩钓盲槽鱼，彻底融入土澳生活。",
          subtext: "阳光开朗大男孩，户外属性封神",
          effects: { fundsDeltaRMB: -20000, healthDelta: 40, languageDelta: 20, prProgressDelta: 20, laozhongDelta: -30 },
          outcomeNarrative: "你晒成了健康的小麦色，以前国内的偏头痛和失眠全不治而愈。每天看着蓝天白云，你终于懂了什么是生活本该有的模样。"
        },
        {
          text: "在华人圈里做兼职代购、小红书旅拍，同时在本地私立诊所打工，双线开花猛存首付。",
          subtext: "勤劳老中特质在低压澳洲形成降维暴富",
          effects: { fundsDeltaRMB: 70000, healthDelta: 10, languageDelta: 10, prProgressDelta: 20, laozhongDelta: 15 },
          outcomeNarrative: "澳洲本地人下班都去喝酒晒太阳，而你利用业余时间把自媒体和小生意做得风生水起，不知不觉手里已经存了 10 万澳币现金！"
        }
      ]
    },
    {
      year: 4,
      title: "EOI 捞人季：雅思 4 个 8 的最后决战",
      scenario: "澳洲移民局公布最新配额，技术移民打分水涨船高。你目前积分为 85 分，只要能把英语考到 PTE 八炸（相当于雅思 4 个 8），就能稳获本州 190 永居提名！",
      choices: [
        {
          text: "开启做题家狂暴模式！闭门刷 PTE 机经一个月，每天狂练口语跟读与机改写作，必须拿下八炸！",
          subtext: "冲刺巅峰！不破楼兰终不还",
          effects: { fundsDeltaRMB: -6000, healthDelta: -10, languageDelta: 30, prProgressDelta: 40, laozhongDelta: 0 },
          outcomeNarrative: "成绩单弹出来那一刻，四个 85+！你狂吼一声惊动了邻居家的鹦鹉。当晚州政府移民局系统直接向你下发了 Pre-invite 获邀信！"
        },
        {
          text: "寻找优质雇主走 482 雇主担保签证，不硬卷 PTE 分数，用过硬的工作表现锁定担保。",
          subtext: "靠职场口碑与实际工作业绩破局",
          effects: { fundsDeltaRMB: 10000, healthDelta: 15, languageDelta: 15, prProgressDelta: 25, laozhongDelta: -10 },
          outcomeNarrative: "你的诊所老板或雇主对你的敬业大加赞赏，主动为你承担了雇主担保的律师费。你稳稳锁定了工作与身份的双保险。"
        }
      ]
    },
    {
      year: 5,
      title: "澳洲绿卡落定：在海滩举行露天 BBQ",
      scenario: "第 5 年初夏，你收到了移民局发来的终签准签信 (Visa Grant Notice)。你拥有了在这片阳光充沛的大陆永久居住、享受全民公费医疗 Medicare 与养老金的全部权利。",
      choices: [
        {
          text: "在邦迪海滩 (Bondi Beach) 支起烧烤炉，召集五湖四海的朋友举杯庆祝，正式开启澳洲新篇章！",
          subtext: "彻底扎根南半球新家园",
          effects: { fundsDeltaRMB: -5000, healthDelta: 50, languageDelta: 10, prProgressDelta: 50, laozhongDelta: -20 },
          outcomeNarrative: "金色的阳光洒在大海上，袋鼠在远处草坪跳跃。你看着手里的准签信，回想刚来时在农场手上磨出的水泡，你知道这一切都值得。"
        },
        {
          text: "带着在澳洲赚到的丰厚外汇与健全的体魄，回国成立出海留学咨询工作室，做两边通吃的自由人。",
          subtext: "跨国资源整合大师",
          effects: { fundsDeltaRMB: 90000, healthDelta: 30, languageDelta: 15, prProgressDelta: 20, laozhongDelta: 30 },
          outcomeNarrative: "你保留着澳洲永居绿卡，每年冬天去南半球避寒冲浪，夏天回国内陪伴父母。你活成了所有人羡慕的无国界自由模样。"
        }
      ]
    }
  ],
  thailand: [
    {
      year: 1,
      title: "降维天堂：清迈的 2000 块无边泳池公寓",
      scenario: "持 DTV 5年数字游民签证抵达清迈。在宁曼路附近只花了 10,000 泰铢 (约 2,000 RMB)，就租到了一套带大无边泳池、全景健身房的网红公寓。楼下一杯精品冰美式只要 50 泰铢，夜市芒果糯米饭只要 60 泰铢。",
      choices: [
        {
          text: "过上神仙躺平生活！每天早上在泳池边敲两小时键盘，下午去泰式按摩，晚上逛夜市吃大排档。",
          subtext: "幸福感瞬间爆棚，生活成本比国内少一半",
          effects: { fundsDeltaRMB: 30000, healthDelta: 45, languageDelta: 10, prProgressDelta: 20, laozhongDelta: 20 },
          outcomeNarrative: "你每个月的总花费甚至不到 5,000 人民币，而你赚的远程收入稳稳留在账上。你开始觉得以前在写字楼里焦虑内耗的自己简直像个傻瓜。"
        },
        {
          text: "积极参加清迈与曼谷的 Web3 / 数字游民 Co-working 活动，搭建自己的跨境独立站与海外客户群。",
          subtext: "以低生活成本为跳板，孵化个人高收入业务",
          effects: { fundsDeltaRMB: 50000, healthDelta: 25, languageDelta: 25, prProgressDelta: 20, laozhongDelta: -10 },
          outcomeNarrative: "你在共享空间认识了德国程序员和美国自由设计师，合伙接单做独立产品，美元流水节节攀升！"
        }
      ]
    },
    {
      year: 2,
      title: "四月烟霾考验：泰北烧山季大迁徙",
      scenario: "每年 3~4 月，清迈周边农田传统焚烧，PM2.5 偶尔破表。看着街头黄蒙蒙的天空，你意识到世界上没有百分之百完美的乌托邦。",
      choices: [
        {
          text: "像候鸟一样迁徙！买张廉航机票直接飞普吉岛或苏梅岛，住在海景别墅里潜水避烟。",
          subtext: "游民终极形态：哪里气候好就去哪里",
          effects: { fundsDeltaRMB: -8000, healthDelta: 30, languageDelta: 10, prProgressDelta: 20, laozhongDelta: -10 },
          outcomeNarrative: "在安达曼海澄澈的玻璃海里浮潜，看着小丑鱼在身边游弋，你明白数字游民的最大特权就是：有腿随时能走。"
        },
        {
          text: "买个顶级空气净化器在公寓闭门打游戏、肝代码，顺便飞回国内探亲吃一个月火锅烧烤。",
          subtext: "回国满血复活，游民生活张弛有度",
          effects: { fundsDeltaRMB: -15000, healthDelta: 20, languageDelta: 0, prProgressDelta: 10, laozhongDelta: 30 },
          outcomeNarrative: "回国跟朋友吃串喝啤酒，朋友们看到你红润的脸色和松弛的状态，纷纷围着你问‘到底怎么润泰国的？’。"
        }
      ]
    },
    {
      year: 3,
      title: "无国界自由：第 5 年依然年轻的赛博吉普赛",
      scenario: "在泰国的几年里，你没有买房背债，没有为了绿卡委曲求全去熬移民监。你存款厚实，精通泰英双语，熟知东南亚每一家顶尖咖啡馆的 WiFi 密码。",
      choices: [
        {
          text: "继续续签 DTV 签证，或者加办马来西亚第二家园 (MM2H)，做一辈子的国际游牧神仙！",
          subtext: "无拘无束，人间逍遥客",
          effects: { fundsDeltaRMB: 80000, healthDelta: 50, languageDelta: 20, prProgressDelta: 40, laozhongDelta: 0 },
          outcomeNarrative: "你坐在海滩酒吧，吹着暖风看着夕阳沉入海平线。你对绿卡和身份彻底祛魅，你知道全世界早已都是你的后花园。"
        }
      ]
    }
  ],
  china_stay: [
    {
      year: 1,
      title: "工位风云：大饼与凌晨一点的打车报销",
      scenario: "你决定不折腾出国，安心在原来的城市继续奋斗。年初领导在开年大会上慷慨激昂画了大饼，给你加了 10% 的绩效指标。深夜 11 点，你拖着疲惫的身躯打车回家，路过楼下熟悉的烧烤摊。",
      choices: [
        {
          text: "下车！点一打烤生蚝、两串羊肉、开一瓶冰啤酒！老中深夜的人间烟火气瞬间洗刷一整天的疲惫。",
          subtext: "虽然累，但胃和灵魂得到了终极抚慰",
          effects: { fundsDeltaRMB: -3000, healthDelta: 15, languageDelta: 0, prProgressDelta: 0, laozhongDelta: 30 },
          outcomeNarrative: "热气腾腾的生蚝咽下去，你打了个饱嗝。你心想‘什么欧美澳洲好山好水，哪有楼下大排档实在？老子就爱这人间烟火！’"
        },
        {
          text: "咽下口水直接回家，洗个热水澡，打开电脑看海外公开课，默默提高自己的核心竞争力。",
          subtext: "拒绝麻痹，暗中蓄力",
          effects: { fundsDeltaRMB: 10000, healthDelta: 5, languageDelta: 15, prProgressDelta: 10, laozhongDelta: -10 },
          outcomeNarrative: "你在疲惫中保持清醒，专业技能在团队中逐渐成为中流砥柱，年底拿到了不错的年终奖。"
        }
      ]
    },
    {
      year: 2,
      title: "风暴来袭：部门优化与一人顶两人的现实",
      scenario: "行业周期震荡，隔壁组被整体裁撤，你们组的预算砍了 30%，但项目交付期反而提前了。你被迫一个人承担起原来两个人的工作量，微信群消息从早响到深夜。",
      choices: [
        {
          text: "启动【摸鱼防御机制】！精通‘已收到但在开会’话术，准点打卡下班，周末去公园发呆露营。",
          subtext: "把工作当成纯领薪水的工具，保护身心健康",
          effects: { fundsDeltaRMB: 20000, healthDelta: 25, languageDelta: 0, prProgressDelta: 0, laozhongDelta: 10 },
          outcomeNarrative: "你放下了升职加薪的执念，反而拥有了极高的心理抗压阈值。周末和朋友去爬山野营，过得比谁都滋润。"
        },
        {
          text: "硬着头皮顶上！狂卷项目上线，在管理层面前证明自己的不可替代性，争取拿到组长岗位。",
          subtext: "迎难而上，卷赢这场淘汰赛",
          effects: { fundsDeltaRMB: 40000, healthDelta: -25, languageDelta: 0, prProgressDelta: 0, laozhongDelta: 20 },
          outcomeNarrative: "项目成功上线，你成功升职为技术负责人。虽然发际线后移了两厘米，但银行卡数字的跳动让你获得了短暂的安全感。"
        }
      ]
    },
    {
      year: 5,
      title: "大彻大悟：守住安稳也是一种非凡的胜利",
      scenario: "五年过去，身边的朋友有的去了日本、有的去了澳洲，在群里吐槽着无聊或发着海滩照片。而你在熟悉的城市里，熟悉每一个路口的美食，父母在侧，三五老友随时能约出火锅局。",
      choices: [
        {
          text: "举起酒杯敬自己一杯！世界上只有一种真正的英雄主义，那就是认清生活的真相后依然热爱生活。",
          subtext: "原地自洽，幸福圆满",
          effects: { fundsDeltaRMB: 60000, healthDelta: 40, languageDelta: 0, prProgressDelta: 0, laozhongDelta: 50 },
          outcomeNarrative: "你彻底和生活和解了。你不再羡慕别人镜头里的远方，你在自己熟悉的热土上，把每一碗热汤面、每一次老友聚会，过成了最踏实幸福的黄金岁月。"
        }
      ]
    }
  ]
};
