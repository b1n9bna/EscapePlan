export interface PointRule {
  id: string;
  name: string;
  category: string;
  options: {
    label: string;
    points: number;
    description?: string;
  }[];
}

export interface VisaSubclass {
  id: string;
  name: string;
  englishName: string;
  type: "point_based" | "job_offer" | "digital_nomad" | "entrepreneur";
  difficulty: "低" | "中等" | "困难" | "极高";
  processingTime: string;
  prSpeed: string; // 永住/绿卡速度
  summary: string;
  annualCostEst: string;
  officialLink: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  pointCalculator?: {
    threshold: number;
    fastTrackThreshold?: number;
    thresholdLabel: string;
    fastTrackLabel?: string;
    rules: PointRule[];
  };
}

export interface CountryData {
  id: string;
  name: string;
  englishName: string;
  flag: string;
  tagline: string;
  badge: string;
  overallFriendliness: "极高" | "友好" | "卷" | "严格";
  languageRequirement: string;
  capital: string;
  medianTechSalary: string;
  subclasses: VisaSubclass[];
}

export const COUNTRIES_DATA: CountryData[] = [
  {
    id: "japan",
    name: "日本",
    englishName: "Japan",
    flag: "🇯🇵",
    tagline: "亚洲治安天花板，高度人才打分 80 分仅需 1 年即可拿永久居留",
    badge: "亚洲首选 · 做题家友好",
    overallFriendliness: "友好",
    languageRequirement: "英语可进外资IT，生活与传统企需 JLPT N2",
    capital: "东京 (Tokyo)",
    medianTechSalary: "650万 ~ 1,200万 日元 (约 30万~58万 RMB)",
    subclasses: [
      {
        id: "japan-hsp-1b",
        name: "高度人才专门职 1号(高专·技)",
        englishName: "Highly Skilled Professional (i)(b)",
        type: "point_based",
        difficulty: "中等",
        processingTime: "1 ~ 2 个月 (优先审批)",
        prSpeed: "70分满3年申请永住；80分满1年申请永住！",
        summary: "日本吸引全球高端IT与工程人才的核心法宝。根据学历、工龄、年薪、年龄、日语等级综合打分，达标享受配偶全职工作、父母随行照看幼童等顶级特权。",
        annualCostEst: "生活费单人约 12万~18万 RMB/年",
        officialLink: "https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00016.html",
        requirements: [
          "需获得日本正规企业或外资在日法人的全职 Offer",
          "最低年薪硬性门槛：300万日元以上（一般IT都在450万以上）",
          "总评分达到 70 分（普通通道）或 80 分（急速永住通道）"
        ],
        pros: [
          "全球发达国家中永住（绿卡）速度最快：80分仅需1年",
          "配偶无工作时长限制（免受普通家属每周28小时限制）",
          "年薪超800万日元且有小童时，可带双方父母一人赴日照料",
          "入管局享有优先审查绿色通道"
        ],
        cons: [
          "高度人才签证与雇主绑定，跳槽需重新向入管局申报审核",
          "东京、大阪中心区房租近年有所上涨"
        ],
        pointCalculator: {
          threshold: 70,
          fastTrackThreshold: 80,
          thresholdLabel: "70 分达标（3年拿日本永住）",
          fastTrackLabel: "80 分顶级（仅需 1 年极速拿永住）",
          rules: [
            {
              id: "degree",
              name: "最高学历",
              category: "基础条件",
              options: [
                { label: "博士研究生学位", points: 30 },
                { label: "硕士研究生学位", points: 20 },
                { label: "大学本科学历（学士）", points: 10 },
                { label: "拥有双硕士或双学士学位（额外加分）", points: 5 },
                { label: "大专 / 无学位", points: 0 }
              ]
            },
            {
              id: "experience",
              name: "相关实务工作经验",
              category: "基础条件",
              options: [
                { label: "10 年及以上实务经验", points: 20 },
                { label: "7 年 ~ 9 年实务经验", points: 15 },
                { label: "5 年 ~ 6 年实务经验", points: 10 },
                { label: "3 年 ~ 4 年实务经验", points: 5 },
                { label: "不足 3 年", points: 0 }
              ]
            },
            {
              id: "age",
              name: "申请时实际年龄",
              category: "基础条件",
              options: [
                { label: "29 岁及以下", points: 15 },
                { label: "30 岁 ~ 34 岁", points: 10 },
                { label: "35 岁 ~ 39 岁", points: 5 },
                { label: "40 岁及以上", points: 0 }
              ]
            },
            {
              id: "salary",
              name: "日本雇主提供年收 (日元)",
              category: "经济能力",
              options: [
                { label: "年薪 1,000 万日元以上 (约46万RMB+)", points: 40 },
                { label: "年薪 900 万 ~ 999 万日元", points: 35 },
                { label: "年薪 800 万 ~ 899 万日元", points: 30 },
                { label: "年薪 700 万 ~ 799 万日元", points: 25 },
                { label: "年薪 600 万 ~ 699 万日元", points: 20 },
                { label: "年薪 500 万 ~ 599 万日元", points: 15 },
                { label: "年薪 400 万 ~ 499 万日元", points: 10 },
                { label: "低于 400 万日元", points: 0 }
              ]
            },
            {
              id: "japanese",
              name: "日语能力证明",
              category: "语言能力",
              options: [
                { label: "通过 JLPT N1 或 BJT 480分以上", points: 15 },
                { label: "通过 JLPT N2 或大学日语专业毕业", points: 10 },
                { label: "无日语等级证书", points: 0 }
              ]
            },
            {
              id: "special_bonus",
              name: "特殊加分项 (可多选折算)",
              category: "加分彩蛋",
              options: [
                { label: "毕业于全球三大世界排名(QS/THE/软科)Top300名校", points: 10, description: "国内清北复交浙大中科大武大华科等均在列" },
                { label: "拥有中国国家软考资格证书 (如系统分析师/架构师/网络规划师)", points: 5, description: "中日IT资格互认！单项+5分，两项及以上+10分" },
                { label: "拥有日本本国大学学位", points: 10 },
                { label: "就职企业属于日本创新研发型中小企业", points: 10 },
                { label: "无以上加分项", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "japan-work-general",
        name: "技术·人文知识·国际业务 (普通工签)",
        englishName: "Engineer / Specialist in Humanities / International Services",
        type: "job_offer",
        difficulty: "低",
        processingTime: "1 ~ 3 个月",
        prSpeed: "常规居留满 10 年（含 5 年以上工签）可申请永住；满 5 年可申请归化入籍",
        summary: "最普遍的大多数中国程序员赴日工作的起点工签。不要求打分，只要有正规日本公司聘用、专业对口或有足够工龄即可下签。",
        annualCostEst: "单人约 10万~15万 RMB/年",
        officialLink: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html",
        requirements: [
          "大专或本科学历以上，专业与工作内容相关；或者具备 10 年以上相关工作经验",
          "日本正规法人录用契约（劳动合同）",
          "工资待遇不得低于同岗位日本国民基准"
        ],
        pros: [
          "门槛低，没有苛刻的年龄和打分硬性要求",
          "签证不与具体雇主死绑定，跳槽换公司只需做就劳资格确认",
          "家属可直接随行申请‘家族滞在’签证"
        ],
        cons: [
          "申请永住排队时间较长（通常需要10年）",
          "配偶打工受限于每周 28 小时以内"
        ]
      },
      {
        id: "japan-dnv",
        name: "特定活动 (数字游民 Digital Nomad)",
        englishName: "Designated Activities (Digital Nomad)",
        type: "digital_nomad",
        difficulty: "中等",
        processingTime: "2 ~ 4 周",
        prSpeed: "不计入永住年限（纯临时旅居）",
        summary: "日本 2024 年 4 月全新推行的数字游民专属签证。面向高收入远程技术人，允许携带配偶子女在日本边旅居边远程为海外公司工作。",
        annualCostEst: "生活费自理，需备足存款与保险",
        officialLink: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html",
        requirements: [
          "申请人年收入折合 1,000 万日元以上 (约合 46 万人民币)",
          "受雇于海外企业或拥有海外远程客户业务",
          "拥有覆盖在日本期间、保额不低于 1,000 万日元的商业医疗保险",
          "属于日本免签协定国或地区公民（持有纳税证明）"
        ],
        pros: [
          "合法在日远程打工，避免普通旅游签打工的法律风险",
          "可携配偶和子女一同赴日体验生活",
          "单次最长可停留 6 个月"
        ],
        cons: [
          "不可续签（期满必须离境，间隔 6 个月后方可再次申请）",
          "无法直接衔接工作签证或永住"
        ]
      }
    ]
  },
  {
    id: "germany",
    name: "德国",
    englishName: "Germany",
    flag: "🇩🇪",
    tagline: "欧洲大陆工业与IT心脏，新‘机会卡’6分即可赴德找工作，蓝卡最快 21 个月拿永居",
    badge: "工会强大 · 彻底拒绝加班",
    overallFriendliness: "极高",
    languageRequirement: "柏林/慕尼黑纯英语可胜任大量IT大厂，学德语至 B1 可飞速转永居",
    capital: "柏林 (Berlin)",
    medianTechSalary: "65,000 ~ 95,000 欧元 (约 50万~73万 RMB)",
    subclasses: [
      {
        id: "germany-chancenkarte",
        name: "德国机会卡 (Chancenkarte)",
        englishName: "Opportunity Card (Job Search)",
        type: "point_based",
        difficulty: "低",
        processingTime: "1 ~ 2 个月",
        prSpeed: "找到工作后转为蓝卡或普通工签，蓝卡最快21个月永居",
        summary: "2024年6月德国根据新《技术移民法》重磅推出的计分制找工签证。无需事先拿到德国公司 Offer，只需打分满 6 分，即可直接赴德合法居留 1 年找工作，期间允许每周合法兼职 20 小时。",
        annualCostEst: "需提供约 12,324 欧元的限制性保证金账户 (约9.6万RMB)",
        officialLink: "https://chancenkarte.com/en/",
        requirements: [
          "必须具备前提：基础德语 A1 或 英语 B2；且具备至少 2 年职业培训或外国大学学位",
          "满足前提后，综合打分达到 6 分即可获发签证",
          "自备 1 年期间在德生活保证金（约每月 1,027 欧元）"
        ],
        pros: [
          "无需雇主提前面试和发 Offer，肉身先去德国本土现场面试",
          "允许每周兼职打工 20 小时（试工或补贴生活费）",
          "有效期可长达 1 年（找工期间随时转正式工签）"
        ],
        cons: [
          "需要在德意志银行或 Fintiba 开立限制性资金冻结账户",
          "若 1 年内未能找到专业对口工作，不可无限制延期"
        ],
        pointCalculator: {
          threshold: 6,
          thresholdLabel: "满 6 分达标（可直接申请机会卡赴德）",
          rules: [
            {
              id: "de_education",
              name: "学历与职业资格资格认可",
              category: "核心资质",
              options: [
                { label: "国外学历获得德国中央外国教育办公室 (ZAB) 部分同等认证", points: 4 },
                { label: "普通全日制统招本科及以上学位 (Anabin 认可院校)", points: 3 },
                { label: "未认证的大专或非标学历", points: 0 }
              ]
            },
            {
              id: "de_experience",
              name: "专业领域工作经验",
              category: "工作经历",
              options: [
                { label: "过去 7 年内有 5 年以上专业工作经验", points: 3 },
                { label: "过去 5 年内有 2 年以上专业工作经验", points: 2 },
                { label: "专业工作经验不足 2 年", points: 0 }
              ]
            },
            {
              id: "de_shortage",
              name: "紧缺瓶颈职业 (IT/软件/系统/通信)",
              category: "行业加成",
              options: [
                { label: "从事软件开发、系统架构、通信工程、AI/数据等 IT 紧缺职业", points: 1, description: "德国官方认定的 MINT 紧缺岗位" },
                { label: "非紧缺行业", points: 0 }
              ]
            },
            {
              id: "de_language",
              name: "德语与英语水平",
              category: "语言能力",
              options: [
                { label: "德语达到 B2 或 C1 高级水平", points: 3 },
                { label: "德语达到 B1 水平", points: 2 },
                { label: "德语 A2 水平 或 英语 C1 精通水平", points: 1 },
                { label: "仅具备基础英语 B2 或 德语 A1（满足底线要求但无额外加分）", points: 0 }
              ]
            },
            {
              id: "de_age",
              name: "申请人年龄",
              category: "年龄优势",
              options: [
                { label: "35 岁以下 (含 35 岁)", points: 2 },
                { label: "36 岁 ~ 40 岁", points: 1 },
                { label: "40 岁以上", points: 0 }
              ]
            },
            {
              id: "de_partner",
              name: "配偶加分项",
              category: "家庭加分",
              options: [
                { label: "配偶同时符合机会卡基本申请条件并一同申请", points: 1 },
                { label: "单身或配偶不符合", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "germany-blue-card",
        name: "欧盟蓝卡 (EU Blue Card)",
        englishName: "EU Blue Card (Germany)",
        type: "job_offer",
        difficulty: "中等",
        processingTime: "1 ~ 2 个月",
        prSpeed: "德语达到 B1 最快 21 个月拿永居；德语 A1 需 27 个月",
        summary: "高学历专业技术人才的黄金通道。德国近年大幅降低了 IT 从业者的蓝卡薪资门槛，即便没有大学学位，只要有 3 年以上 IT 经验且薪资达标同样可申请。",
        annualCostEst: "需取得德国公司正式雇佣合同",
        officialLink: "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card",
        requirements: [
          "持有德国大学学位，或在 Anabin 系统中评级为 H+ 的受认可海外本科学历",
          "IT 紧缺行业年薪标准降至 41,041 欧元以上 (约合 32 万人民币)",
          "无学位的 IT 资深开发者：需具备至少 3 年可验证的技术从业经历"
        ],
        pros: [
          "欧洲转永居（绿卡）最快的国家之一：B1 德语 21 个月，A1 德语 27 个月",
          "在德国工作满 18 个月后，可免签流转前往其他欧盟国家工作",
          "配偶随签无语言要求，且享有无限制全职工作许可",
          "彻底远离国内 35 岁危机与无效加班"
        ],
        cons: [
          "德国税率较高（单身所得税及社会综合保险可达 40% 左右）",
          "德国租房市场在柏林、慕尼黑竞争非常激烈，看房需‘海选’"
        ]
      }
    ]
  },
  {
    id: "thailand",
    name: "泰国",
    englishName: "Thailand",
    flag: "🇹🇭",
    tagline: "2024最新全球数字游民神签 DTV：5年多次、每次180天、存款仅需10万RMB",
    badge: "生活成本极低 · 美食丰富",
    overallFriendliness: "极高",
    languageRequirement: "日常英语流利即可无障碍生活，无需泰语",
    capital: "曼谷 (Bangkok)",
    medianTechSalary: "适合赚远程美金/人民币/加密货币（月薪 2k~5k USD 在泰即为人上人）",
    subclasses: [
      {
        id: "thailand-dtv",
        name: "目的地泰国签证 (DTV - 数字游民签)",
        englishName: "Destination Thailand Visa (DTV)",
        type: "digital_nomad",
        difficulty: "低",
        processingTime: "5 ~ 15 个工作日 (电子签出签极快)",
        prSpeed: "纯长期旅居签（不导向永居，但可持有 5 年）",
        summary: "2024年下半年泰国政府为抢夺全球数字游民祭出的超级王炸。只需 50 万泰铢（约合 10 万人民币）的银行活期流水，缴纳约 10,000 泰铢签证费，即可获得 5 年内无限次往返、每次最长住 180 天的居留许可。",
        annualCostEst: "月生活费 6,000 ~ 12,000 RMB 即可租带无边泳池的高级公寓并天天大餐",
        officialLink: "https://thaievisa.go.th/",
        requirements: [
          "银行账户近期存款不低于 500,000 泰铢 (约 10 万人民币 / 1.4 万美元)",
          "远程工作证明：受雇于境外企业的雇佣合同 / 自由职业作品集 / 商业登记证明",
          "年满 20 周岁",
          "配偶与 20 岁以下子女可一同申请依附随签"
        ],
        pros: [
          "资金门槛极低（只需证明有10万块存款，不用把钱转给泰国政府）",
          "有效期长达 5 年，单次可停留 180 天，在境内还可花 1,900 泰铢再延期 180 天",
          "物价极低，咖啡馆遍布，网速居全球前列，美食符合中国胃",
          "完全不用坐任何语言监或做题考核"
        ],
        cons: [
          "不可以受雇于泰国本土企业打工（只能赚境外收入）",
          "不提供直接转泰国永居或入籍通道"
        ]
      }
    ]
  },
  {
    id: "canada",
    name: "加拿大",
    englishName: "Canada",
    flag: "🇨🇦",
    tagline: "传统移民大国，完善的双语社会与包容文化，科技类省提名（PNP）持续定向扶持",
    badge: "大国绿卡 · 全家医疗教育免费",
    overallFriendliness: "卷",
    languageRequirement: "英语雅思 G 类必须达到 7778 (CLB 9) 或 思培 CELPIP 9分+",
    capital: "渥太华 / 温哥华 / 多伦多",
    medianTechSalary: "95,000 ~ 140,000 加币 (约 50万~73万 RMB)",
    subclasses: [
      {
        id: "canada-bcpnp-tech",
        name: "BC省提名科技通道 (BC PNP Tech)",
        englishName: "BC PNP Tech Stream",
        type: "job_offer",
        difficulty: "困难",
        processingTime: "省提名 2~3 个月 + 联邦 PR 约 12~18 个月",
        prSpeed: "拿到省提名后直接加 600 分保送联邦 PR 枫叶卡",
        summary: "加拿大卑诗省（温哥华所在地）为科技行业设立的专门绿色通道。35 个 IT/软件/数据紧缺职业优先邀请，抽分频率高且分数明显低于常规通道。",
        annualCostEst: "温哥华租房与生活费较高，单人建议年储备 20万~25万 RMB",
        officialLink: "https://www.welcomebc.ca/Immigrate-to-B-C/Skills-Immigration#Tech",
        requirements: [
          "获得 BC 省合格雇主提供的至少 1 年的全职工作 Offer",
          "职位属于官方指定的 35 个科技类 NOC 代码（如 21231 软件工程师、21232 软件开发）",
          "英语成绩 CLB 5 ~ 7 以上"
        ],
        pros: [
          "每周定期单独定向抽签，审批享有省政府专员优先处理",
          "成功拿到提名函后，联邦 Express Entry 自动获得 600 分巨额加分，100% 稳获枫叶卡",
          "一人移民，全家同步获得枫叶卡绿卡身份"
        ],
        cons: [
          "温哥华当前 IT 招聘竞争加剧，海外直接盲投难度大，通常需本地学签或工签破局",
          "温哥华房价与生活成本高昂"
        ]
      }
    ]
  }
];
