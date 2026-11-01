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
  // 1. 日本 (Japan)
  {
    id: "japan",
    name: "日本",
    englishName: "Japan",
    flag: "🇯🇵",
    tagline: "东亚文化同温层，极高法治与治安，高度人才积分制最快 1 年拿永住",
    badge: "最快 1 年永住 · IT 紧缺",
    overallFriendliness: "友好",
    languageRequirement: "入职需 N2~N1，部分外资/乐天/Mercari 仅需纯英语沟通",
    capital: "东京 (Tokyo)",
    medianTechSalary: "650万 ~ 1,100万 日元 (约 30万~52万 RMB)",
    subclasses: [
      {
        id: "japan-hsp-1b",
        name: "高度专门职 1号(b) - 技术·人文·国际",
        englishName: "Highly Skilled Professional (i)(b)",
        type: "point_based",
        difficulty: "中等",
        processingTime: "1 ~ 2 个月（享受优先加急审批）",
        prSpeed: "70分住满 3 年换永住；80分住满 1 年直通永久居留！",
        summary: "日本出入国在留管理厅设立的积分优待政策。通过学历、工作年限、年收入、日语能力、加分证书等维度量化打分。满 80 分仅需在日工作纳税 1 年即可申请永住。",
        annualCostEst: "单人启动建议准备 5万~8万 RMB (含前期押金租房与抵日过渡)",
        officialLink: "https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00016.html",
        requirements: [
          "与日本企事业单位签署正式聘用合同（年薪不低于 300 万日元硬门槛）",
          "在出入国在留管理厅的高度人才积分表中自测达到 70 分以上",
          "品行优良，无犯罪记录，按时足额缴纳厚生年金与健康保险"
        ],
        pros: [
          "最快 1 年拿永住，告别签证续签烦恼，维持中国国籍",
          "配偶可在日全职就劳，无打工每周 28 小时严格限制",
          "家庭年收入达 800 万日元且家有 7 岁以下幼童时，允许接父母来日同住照看",
          "享受入国管理局专属绿色加急通道，在留资格认定 10 天至 1 个月内出签"
        ],
        cons: [
          "签证绑定特定受雇雇主，跳槽需重新向入管局申报申请在留资格变更",
          "日元当前汇率处于相对历史低位"
        ],
        pointCalculator: {
          threshold: 70,
          fastTrackThreshold: 80,
          thresholdLabel: "合格基准线：70分（3年申永住）",
          fastTrackLabel: "极速永住线：80分（1年申永住）",
          rules: [
            {
              id: "degree",
              name: "最高学术学历",
              category: "academic",
              options: [
                { label: "博士学位 (Doctor)", points: 30 },
                { label: "硕士学位 (Master)", points: 20 },
                { label: "学士学位 / 双学位 (Bachelor)", points: 10 },
                { label: "大专 / 无学位", points: 0 }
              ]
            },
            {
              id: "experience",
              name: "相关行业实务经验",
              category: "experience",
              options: [
                { label: "7 年及以上实务工作经验", points: 15 },
                { label: "5 年 ~ 7 年实务经验", points: 10 },
                { label: "3 年 ~ 5 年实务经验", points: 5 },
                { label: "3 年以下经验", points: 0 }
              ]
            },
            {
              id: "age",
              name: "申请时实际年龄",
              category: "age",
              options: [
                { label: "29 周岁以下", points: 15 },
                { label: "30 ~ 34 周岁", points: 10 },
                { label: "35 ~ 39 周岁", points: 5 },
                { label: "40 周岁及以上", points: 0 }
              ]
            },
            {
              id: "salary",
              name: "日本在职合同保证年收入 (日元)",
              category: "income",
              options: [
                { label: "年收 1,000 万日元以上 (~47万RMB)", points: 40 },
                { label: "年收 900 万 ~ 1,000 万日元", points: 35 },
                { label: "年收 800 万 ~ 900 万日元", points: 30 },
                { label: "年收 700 万 ~ 800 万日元", points: 25 },
                { label: "年收 600 万 ~ 700 万日元", points: 20 },
                { label: "年收 500 万 ~ 600 万日元", points: 15 },
                { label: "年收 400 万 ~ 500 万日元", points: 10 },
                { label: "400 万日元以下", points: 0 }
              ]
            },
            {
              id: "japanese",
              name: "日语语言能力 (JLPT)",
              category: "bonus",
              options: [
                { label: "JLPT N1 合格 或 海外大学日语专修", points: 15 },
                { label: "JLPT N2 合格", points: 10 },
                { label: "无日语等级证书", points: 0 }
              ]
            },
            {
              id: "special_bonus",
              name: "特别加分项 (中日资格互认 / 世界百强大学)",
              category: "bonus",
              options: [
                { label: "拥有中国计算机软考中级/高级证书 (互认加分)", points: 5 },
                { label: "毕业于 QS/THE/ARWU 世界排名前 300 名校", points: 10 },
                { label: "日本大学/大学院毕业取得学位", points: 10 },
                { label: "无加分证书", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "japan-work-general",
        name: "技术·人文知识·国际业务（普通就劳签）",
        englishName: "Engineer / Specialist in Humanities / International Services",
        type: "job_offer",
        difficulty: "低",
        processingTime: "1 ~ 3 个月",
        prSpeed: "在日合法工作连续满 10 年（且其中就劳签证满 5 年）可申请永住",
        summary: "赴日工作最普遍的签证类型。只要有全日制大专及以上学历且专业对口，获得日本本土企业录用 Offer 即可下签，不限配额，中途可自由离职跳槽换同类工作。",
        annualCostEst: "前期中介费 0 元（正规企业直接发 Offer），仅需准备赴日机票与头月房租约 3万~5万 RMB",
        officialLink: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html",
        requirements: [
          "拥有中国教育部承认的全日制大专及以上学历（专科专业需与岗位强相关，本科以上不限）",
          "获得日本合法存续公司出具的就职聘任合同，薪资待遇与日本本土员工同工同酬",
          "无在日不良滞留或违法记录"
        ],
        pros: [
          "不设繁琐的积分门槛，只要雇主正规且专业对口，下签率极高",
          "换工作自由，跳槽后只需在 14 天内向入管局线上申报，无需重新申办在留资格",
          "全家享受国民健康保险（报销 70%，大病医疗费用封顶）"
        ],
        cons: [
          "普通转永住需要熬满 10 年时间，比高度人才慢很多",
          "配偶若持家族滞在签证，每周打工时间受严格限制在 28 小时以内"
        ]
      },
      {
        id: "japan-dnv",
        name: "日本数字游民签证 (DNV)",
        englishName: "Digital Nomad Visa (Designated Activities)",
        type: "digital_nomad",
        difficulty: "低",
        processingTime: "1 个月内",
        prSpeed: "单次最长 6 个月（不能直接转永住，到期后离境半年可再申）",
        summary: "日本 2024 年全新推出的特定活动数字游民签证。面向年薪 1,000 万日元以上的远程工作者、自由职业者与数字游民，允许携带配偶子女在日本逗留工作长达 6 个月。",
        annualCostEst: "单人月生活费约 1.2万~1.8万 RMB (非东京地区更低)",
        officialLink: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html",
        requirements: [
          "属于日本免签协定国或地区公民，或持特定国家税收协定护照",
          "年收入折合不低于 1,000 万日元 (约 47万 RMB) 的客观完税或银行流水证据",
          "持有保额 1,000 万日元以上的海外民间医疗旅行保险"
        ],
        pros: [
          "官方合法允许远程办公，享受日本优质自然风景、美食与极高安全度",
          "免除日本当地居民税与复杂社会保险登记",
          "可合法携带配偶与子女一同旅居"
        ],
        cons: [
          "最长仅限 6 个月，不可在日境内直接续签，不可与日本本土公司发生劳动雇佣",
          "停留期不计入永住居住年限"
        ]
      }
    ]
  },

  // 2. 澳大利亚 (Australia)
  {
    id: "australia",
    name: "澳大利亚",
    englishName: "Australia",
    flag: "🇦🇺",
    tagline: "阳光海滩大草坪，蓝领时薪世界天花板，打工度假(WHV)与独立技术移民首选",
    badge: "蓝领尊贵 · 气候宜人",
    overallFriendliness: "友好",
    languageRequirement: "日常英语流利；技术移民通常需雅思 4 个 7 或 PTE 65+ (七炸)",
    capital: "堪培拉 / 悉尼 / 墨尔本",
    medianTechSalary: "90,000 ~ 140,000 澳币 (时薪普遍 $35~$65/小时，约43万~67万 RMB)",
    subclasses: [
      {
        id: "aus-skilled-priority",
        name: "独立与州担保技术移民 (189 / 190 / 491)",
        englishName: "Skilled Independent / Nominated Visa (Subclass 189/190/491)",
        type: "point_based",
        difficulty: "中等",
        processingTime: "获邀后 6 ~ 12 个月",
        prSpeed: "189/190 批签即是一步到位澳大利亚永久居留绿卡 (PR)！",
        summary: "澳大利亚技术移民 SkillSelect 积分制体系。紧缺职业（幼教、护理、工程、IT、技工）通过职业评估后，EOI 打分满 65 分即可入池。190 获州政府担保额外加 5 分，491 偏远地区担保额外加 15 分。",
        annualCostEst: "签证主申请费约 4,770 澳币 + 职业评估约 1,000 澳币",
        officialLink: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect",
        requirements: [
          "职业位于澳大利亚紧缺职业清单 (MLTSSL / STSOL / 州担保清单)",
          "通过对应评估机构技术认证 (如 ACS 计算机、Engineers Australia 工程、AITSL 教师、ANMAC 护士)",
          "雅思 4 个 6 分以上基础门槛（实际获邀建议 PTE 65 或 79 分）",
          "EOI 算分系统达到 65 分基准线"
        ],
        pros: [
          "一步到位拿全家 PR 绿卡，终身享受 Medicare 免费全民公立医疗",
          "子女享受从小学至高中的全免费公立教育",
          "住满 4 年（其中最后 1 年持 PR）即可申请入籍并申领澳洲护照"
        ],
        cons: [
          "近年 IT 与商业分析分数水涨船高，非紧缺专业竞争激烈",
          "大城市租房周薪制且空置率紧张"
        ],
        pointCalculator: {
          threshold: 65,
          fastTrackThreshold: 85,
          thresholdLabel: "入池基准线：65分",
          fastTrackLabel: "高概率获邀线：85分+",
          rules: [
            {
              id: "aus_age",
              name: "申请人年龄段",
              category: "age",
              options: [
                { label: "25 ~ 32 周岁 (满分黄金期)", points: 30 },
                { label: "18 ~ 24 周岁", points: 25 },
                { label: "33 ~ 39 周岁", points: 25 },
                { label: "40 ~ 44 周岁", points: 15 },
                { label: "45 周岁及以上 (无资格)", points: 0 }
              ]
            },
            {
              id: "aus_english",
              name: "英语水平 (PTE / 雅思)",
              category: "language",
              options: [
                { label: "Superior 卓越水平 (PTE 79分四炸 / 雅思4个8)", points: 20 },
                { label: "Proficient 熟练水平 (PTE 65分四炸 / 雅思4个7)", points: 10 },
                { label: "Competent 基础水平 (雅思4个6 / PTE 50)", points: 0 }
              ]
            },
            {
              id: "aus_education",
              name: "最高学历资格",
              category: "education",
              options: [
                { label: "博士学位 (PhD / Doctorate)", points: 20 },
                { label: "硕士学位或本科学士学位 (Master / Bachelor)", points: 15 },
                { label: "澳洲专科文凭或行业认证 Trade Qualification", points: 10 },
                { label: "无符合认证的学历", points: 0 }
              ]
            },
            {
              id: "aus_experience_overseas",
              name: "澳洲境外相关工作经验 (通过职业评估)",
              category: "experience",
              options: [
                { label: "8 年及以上工作经验", points: 15 },
                { label: "5 年 ~ 7 年工作经验", points: 10 },
                { label: "3 年 ~ 4 年工作经验", points: 5 },
                { label: "3 年以下工作经验", points: 0 }
              ]
            },
            {
              id: "aus_nomination",
              name: "州领地政府担保加分",
              category: "bonus",
              options: [
                { label: "获得 491 偏远地区州担保 / 亲属担保", points: 15 },
                { label: "获得 190 州政府提名担保", points: 5 },
                { label: "申请 189 独立技术移民 (无州担保加分)", points: 0 }
              ]
            },
            {
              id: "aus_partner",
              name: "配偶技能状况 / 单身加分",
              category: "partner",
              options: [
                { label: "单身申请人 (无需拖累，直接加满)", points: 10 },
                { label: "配偶持同职业评估且雅思达 4 个 6", points: 10 },
                { label: "配偶仅达到 Competent 英语水平", points: 5 },
                { label: "配偶无英语成绩且非 PR/公民", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "aus-whv-462",
        name: "打工度假签证 (WHV Subclass 462)",
        englishName: "Work and Holiday Visa (Subclass 462)",
        type: "job_offer",
        difficulty: "低",
        processingTime: "抽签后 1 ~ 4 周出签",
        prSpeed: "单次 1 年；在特定区域打工可续二签、三签，最长呆满 3 年！",
        summary: "专为 18~30 岁中国年轻人定制的人生探索神签。可在澳合法全职工作、旅行、上短期语言班。每年对中国大陆开放 5,000 个配额，通过移民局官网公开抽签摇号。",
        annualCostEst: "启动仅需约 5,000 澳币存款证明 (约2.4万RMB)，到澳第一周即可自给自足",
        officialLink: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462",
        requirements: [
          "递交时年满 18 周岁，且未满 31 周岁",
          "持有中国护照，具备高等教育学历（大专毕业或本科读完前2年）",
          "基础英语证明：雅思 4.5 分以上，或 PTE 30 分以上",
          "银行存款 5,000 澳币及往返机票资金证明"
        ],
        pros: [
          "全澳任何雇主均可合法雇佣，不限行业（咖啡馆、农场、办公室、酒店）",
          "时薪极高（法定最低时薪超 $24.10 澳币，农场肉厂周薪常破 $1,500 澳币）",
          "年轻人的全球化探索跳板，可转学生签、技工学签或雇主担保"
        ],
        cons: [
          "受限于‘为同一雇主工作不得超过 6 个月’的规则",
          "每年配额需通过移民局官网抽签，存在概率运气成分"
        ]
      }
    ]
  },

  // 3. 新西兰 (New Zealand)
  {
    id: "newzealand",
    name: "新西兰",
    englishName: "New Zealand",
    flag: "🇳🇿",
    tagline: "南半球纯净之境，全球独一份永久回头签，6分制技术移民与绿色清单快速永居",
    badge: "终身免移民监 · 永久回头签",
    overallFriendliness: "友好",
    languageRequirement: "雅思 G 类 6.5 分 / PTE Academic 58 分",
    capital: "惠灵顿 / 奥克兰",
    medianTechSalary: "90,000 ~ 130,000 新西兰元 (约 39万~56万 RMB)",
    subclasses: [
      {
        id: "nz-smc-6points",
        name: "6分制技术移民居民签 (SMC 6 Points)",
        englishName: "Skilled Migrant Category Resident Visa",
        type: "point_based",
        difficulty: "中等",
        processingTime: "6 ~ 9 个月",
        prSpeed: "获批即得居民签 (Resident Visa)；住满 2 年直接换领全球唯一的【永久回头签 (Permanent Resident Visa)】，终身无需再坐移民监！",
        summary: "新西兰 2023 年全新实施的 6 分制技术移民。申请人只需在【职业注册】、【学历资格】或【高薪资】三大技能支柱中任选一项获取 3~6 分，再加上新西兰本地工作经验 1~3 分，合计凑满 6 分即可直接递交居民签！",
        annualCostEst: "新西兰移民局官方申请费约 4,880 NZD",
        officialLink: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/skilled-migrant-category-resident-visa",
        requirements: [
          "年龄在 55 周岁及以下",
          "英语雅思 G 类总分不低于 6.5 分（或 PTE 58 分）",
          "拥有一份由新西兰认证雇主 (Accredited Employer) 提供的全职工作 Offer，薪资不低于新西兰中位数时薪 ($31.61 NZD/时)",
          "在 SMC 积分表中累计达到 6 分"
        ],
        pros: [
          "获得永久回头签 (PRV) 后，哪怕回国居住 10 年 20 年，新西兰绿卡终生有效，绝不失效！",
          "配偶可获得完全开放式工作签证 (Open Work Visa)，随行子女免费就读公立中小学",
          "职场推崇极致的 Work-Life Balance，自然风光极其震撼"
        ],
        cons: [
          "新西兰国内市场规模较小，顶级高薪研发岗位数量相对有限",
          "奥克兰住房租金及物价处于历史较高位"
        ],
        pointCalculator: {
          threshold: 6,
          thresholdLabel: "合格基准线：6分（达标即可受邀直接申请居民签）",
          rules: [
            {
              id: "nz_skill_pillar",
              name: "第一大类：三大技能支柱（三选一，不可叠加，取最高分）",
              category: "education",
              options: [
                { label: "新西兰认可的博士学位 (Level 10)", points: 6 },
                { label: "薪资达到新西兰中位数薪资 3 倍 ($94.83/时)", points: 6 },
                { label: "新西兰认可的硕士学位 (Level 9)", points: 5 },
                { label: "荣誉学士学位 / 研究生文凭 (Level 8)", points: 4 },
                { label: "薪资达到新西兰中位数薪资 2 倍 ($63.22/时)", points: 4 },
                { label: "正规本科学士学位 (Level 7)", points: 3 },
                { label: "薪资达到新西兰中位数薪资 1.5 倍 ($47.41/时)", points: 3 },
                { label: "大专或无符合上述资质", points: 0 }
              ]
            },
            {
              id: "nz_work_experience",
              name: "第二大类：新西兰本地技能工作经验加分",
              category: "experience",
              options: [
                { label: "3 年及以上新西兰本地技能全职工作经验", points: 3 },
                { label: "2 年新西兰本地技能全职工作经验", points: 2 },
                { label: "1 年新西兰本地技能全职工作经验", points: 1 },
                { label: "尚无新西兰本地工作经验", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "nz-green-list",
        name: "绿色清单快速居留签 (Green List Straight to Residence)",
        englishName: "Green List Straight to Residence Visa",
        type: "job_offer",
        difficulty: "中等",
        processingTime: "3 ~ 6 个月",
        prSpeed: "Tier 1 紧缺职业直接一步到位拿居民签",
        summary: "新西兰为解决关键劳动力短缺设立的绿色通道。包括软件工程师、ICT 项目经理、土木电气机械工程师、注册护士、全科医生等。只要拿到认证雇主对口 Offer，无需参与 6 分制繁琐打分，直通绿卡！",
        annualCostEst: "移民局申请费约 4,880 NZD",
        officialLink: "https://www.immigration.govt.nz/new-zealand-visas/preparing-a-visa-application/working-in-nz/qualifications-for-work/green-list-occupations",
        requirements: [
          "职位列于新西兰官方【Green List Tier 1】极度紧缺清单",
          "获得新西兰认证雇主 (Accredited Employer) 提供的全职聘用合同，薪资达到中位数或指定标准",
          "满足对应职位的学历或行业资格认证要求（如工程专业通常需 Washington Accord 认证学历）"
        ],
        pros: [
          "免去打分与漫长池内等待，审理周期最快 3 个月",
          "全家直接落袋居民签，享受新西兰国民免费医疗福利",
          "2 年后同样无缝换领全球唯一的【永久回头签 (PRV)】"
        ],
        cons: [
          "职位要求与专业背景必须严丝合缝匹配",
          "通常需要海外直接面试或通过打工度假/探访入境完成技术面试"
        ]
      },
      {
        id: "nz-whv",
        name: "新西兰打工度假签 (WHV)",
        englishName: "China Working Holiday Visa",
        type: "job_offer",
        difficulty: "低",
        processingTime: "1 ~ 2 个月",
        prSpeed: "1 年有效，境内找到认证雇主可转 AEWV 工签或 6分制居民签",
        summary: "新西兰每年向中国公民开放 1,000 个打工度假名额。年龄 18~30 周岁、高中以上学历、雅思 5.5 分即可申请。是低成本肉身登陆新西兰、在地面试找工的绝佳实战翘板。",
        annualCostEst: "约 450 NZD 申请费 + 4,200 NZD 资金证明 (约2.2万 RMB)",
        officialLink: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/china-working-holiday-visa",
        requirements: [
          "中国大陆常住公民，年龄 18 ~ 30 周岁",
          "拥有高中及以上学历（需学信网认证）",
          "基础英语雅思 5.5 分以上或 PTE 对应成绩",
          "银行存款折合 4,200 新西兰元以上证明"
        ],
        pros: [
          "门槛极低，年轻白领、应届生零中介即可自行在官网抢名额",
          "肉身在地找工作，直接面对雇主打破海外信息差",
          "农场、文职、酒店、IT 均可自由体验"
        ],
        cons: [
          "每年 1,000 名额需要官网抢号",
          "单次仅限 1 年，必须在到期前衔接工签或学签"
        ]
      }
    ]
  },

  // 4. 加拿大 (Canada)
  {
    id: "canada",
    name: "加拿大",
    englishName: "Canada",
    flag: "🇨🇦",
    tagline: "传统移民大国，完善的双语社会与包容文化，Express Entry 与省提名技术扶持",
    badge: "大国绿卡 · 全家医疗教育免费",
    overallFriendliness: "卷",
    languageRequirement: "英语雅思 G 类建议 8777 (CLB 9) 或 思培 CELPIP 9分+",
    capital: "渥太华 / 温哥华 / 多伦多",
    medianTechSalary: "95,000 ~ 140,000 加币 (约 49万~73万 RMB)",
    subclasses: [
      {
        id: "canada-ee-crs",
        name: "联邦快速通道 Express Entry (FSW / CEC)",
        englishName: "Federal Skilled Worker / Canadian Experience Class",
        type: "point_based",
        difficulty: "中等",
        processingTime: "获邀后 6 个月内出枫叶卡",
        prSpeed: "一步到位全家直接发放加拿大永久居民 (PR 枫叶卡)",
        summary: "加拿大联邦最权威的在线积分制移民系统。通过 Comprehensive Ranking System (CRS) 对申请人的年龄、学历、语言水平（CLB 等级）、工作经验进行综合评分。无需中介，池内高分者直接获得邀请递交 PR。",
        annualCostEst: "联邦申请费 1,525 加币/人 + 登陆费 575 加币",
        officialLink: "https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp",
        requirements: [
          "在过去 10 年内有至少 1 年连续的 TEER 0/1/2/3 类全职专业工作经验",
          "语言成绩达到 CLB 7 基础底线（实际池内获邀通常需要 CLB 9 即雅思听力8/读写说7）",
          "通过加拿大 WES 学历中英文对等认证 (ECA)"
        ],
        pros: [
          "审批极其高效透明，获邀后 6 个月内全家拿到枫叶卡",
          "在加拿大境内无居住省份限制，自由迁徙居住与工作",
          "全家享受免费全民基础医疗体系，随行子女公立学费全免"
        ],
        cons: [
          "近年 CRS 分数线高企（全类别常年 500 分以上），海外单凭学历工作需语言极高或法语加分",
          "每 5 年内需在加拿大住满 730 天（2年）以保住枫叶卡"
        ],
        pointCalculator: {
          threshold: 490,
          fastTrackThreshold: 520,
          thresholdLabel: "定向类别获邀线：约 490 分",
          fastTrackLabel: "全类别稳获邀线：520 分+",
          rules: [
            {
              id: "ca_age",
              name: "申请人年龄 (单身核心分数)",
              category: "age",
              options: [
                { label: "20 ~ 29 周岁 (满分黄金期)", points: 110 },
                { label: "30 周岁", points: 105 },
                { label: "31 周岁", points: 99 },
                { label: "32 周岁", points: 94 },
                { label: "33 周岁", points: 88 },
                { label: "35 周岁", points: 77 },
                { label: "40 周岁", points: 50 },
                { label: "45 周岁及以上", points: 0 }
              ]
            },
            {
              id: "ca_education",
              name: "最高学历 (ECA 认证对等后)",
              category: "education",
              options: [
                { label: "博士学位 (Doctoral)", points: 150 },
                { label: "硕士学位 / 职业专业学位 (Master)", points: 135 },
                { label: "双学历 (本科学士 + 至少一年研文/专科)", points: 128 },
                { label: "三年制或四年制本科学士 (Bachelor)", points: 120 },
                { label: "两年制大专文凭", points: 98 },
                { label: "高中及以下", points: 0 }
              ]
            },
            {
              id: "ca_language",
              name: "第一官方语言 CLB 等级 (雅思G类 / 思培)",
              category: "language",
              options: [
                { label: "CLB 10 及以上 (雅思 8.5/8/7.5/7.5)", points: 136 },
                { label: "CLB 9 黄金线 (雅思 8777 - 听8说7读7写7)", points: 124 },
                { label: "CLB 8 (雅思 7.5/6.5/6.5/6.5)", points: 92 },
                { label: "CLB 7 基础合格线 (雅思 6/6/6/6)", points: 68 },
                { label: "低于 CLB 7", points: 0 }
              ]
            },
            {
              id: "ca_cross_skills",
              name: "技能交叉加分项 (学历与语言结合 / 海外工作)",
              category: "bonus",
              options: [
                { label: "高学历(硕博/双学历) + CLB 9语言 顶格加满", points: 50 },
                { label: "三年海外工作经验 + CLB 9语言 顶格加满", points: 50 },
                { label: "高学历 + CLB 7语言 / 1~2年海外经验", points: 25 },
                { label: "无技能交叉加分", points: 0 }
              ]
            },
            {
              id: "ca_canadian_bonus",
              name: "加拿大本地加分项 (省提名 / LMIA工签 / 本地留学)",
              category: "bonus",
              options: [
                { label: "获得加拿大省政府提名函 (PNP 额外保送加分！)", points: 600 },
                { label: "获得合规雇主 LMIA 批准的高管工作 Offer (TEER 0)", points: 200 },
                { label: "获得合规雇主 LMIA 批准的专业技术工作 Offer (TEER 1/2/3)", points: 50 },
                { label: "加拿大本地 1~2 年以上专科/研文毕业", points: 15 },
                { label: "加拿大本地 3 年以上本科/硕士毕业", points: 30 },
                { label: "无加拿大本土加分项", points: 0 }
              ]
            }
          ]
        }
      },
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
  },

  // 5. 美国 (United States)
  {
    id: "usa",
    name: "美国",
    englishName: "United States",
    flag: "🇺🇸",
    tagline: "全球资本与顶尖科技中心，薪资天花板，NIW国家利益豁免与EB职业移民阶梯",
    badge: "薪资天花板 · 职业绿卡",
    overallFriendliness: "卷",
    languageRequirement: "流利商务与专业英语沟通，具备独立工作汇报能力",
    capital: "华盛顿 / 硅谷 / 纽约 / 西雅图",
    medianTechSalary: "140,000 ~ 230,000 美元 (含Base+股票RSU，约 100万~165万 RMB)",
    subclasses: [
      {
        id: "usa-eb2-niw",
        name: "EB-2 NIW 国家利益豁免 (免雇主直申绿卡)",
        englishName: "EB-2 National Interest Waiver",
        type: "point_based",
        difficulty: "中等",
        processingTime: "加急 45 天出 I-140 结果；排期约 3 ~ 4 年",
        prSpeed: "I-140 获批锁定优先日 (PD)；排期到达后递交 I-485 直接换美国永久绿卡",
        summary: "美国职业移民第二优先中极具性价比的黄金路线。根据判例（Matter of Dhanasar），申请人只要证明自身从事的领域具有重大国家级利益与实质价值，即可彻底豁免美国雇主赞助、豁免劳工部 PERM 复杂审核，独立向移民局递交绿卡申请！",
        annualCostEst: "USCIS 官方申请费 $715 + 庇护附加费 $300 (手搓零律师费)",
        officialLink: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2",
        requirements: [
          "拥有硕士及以上高等学历，或本科学士学位外加 5 年以上相关行业渐进性实务经验",
          "满足 Dhanasar 判例三大审理要件：事业具备国家级实质利益、具备推进该事业的专业能力、豁免劳工证有利于美国",
          "拥有客观行业背书（如同行评审、顶会论文引用、核心专利、开源项目被广泛使用、或行业媒体深度报道）"
        ],
        pros: [
          "无需美国雇主出面担保，换工作、辞职、自由创业完全不影响绿卡流程与优先日锁定",
          "人在国内即可直接向美国移民局 (USCIS) 递交申请，获批后在广领馆面签登陆即拿绿卡",
          "一人申请，配偶及 21 周岁以下未婚子女同步获得美国绿卡"
        ],
        cons: [
          "中国大陆出生（Mainland China Born）存在法定全球移民配额排期",
          "需系统性整理专业客观证据链，请愿信 (Petition Letter) 需具备极高逻辑说服力"
        ]
      },
      {
        id: "usa-h1b-eb23",
        name: "H-1B 专业技术工签 + EB-2/3 雇主担保绿卡",
        englishName: "H-1B Specialty Occupation & PERM EB-2/3",
        type: "job_offer",
        difficulty: "困难",
        processingTime: "每年 3 月抽签，10 月 1 日生效；绿卡全流程约 4 ~ 6 年",
        prSpeed: "PERM 劳工证 -> I-140 获批 -> 排期到达递交 I-485 换绿卡",
        summary: "赴美留学与硅谷高科技企业就职的正统路线。F-1 学生签证毕业后享有 1~3 年 STEM OPT 工作许可。在此期间由雇主出资赞助抽签 H-1B，并启动劳工部 PERM 市场打广告招聘流程，最终递交绿卡申请。",
        annualCostEst: "抽签电子注册费 $215；法律与申请费用依法全额由美国雇主强制承担",
        officialLink: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations",
        requirements: [
          "拥有美国或海外受认可的本科学士或以上学位，专业与工作岗位高度对口",
          "获得美国合格企业出具的专业职位聘书，薪资达到劳工部公布的 Prevailing Wage 现行工资标准",
          "中签后由雇主向移民局正式递交 I-129 申请材料"
        ],
        pros: [
          "硅谷及美国大厂薪资处于全球绝对顶峰，RSU 股票流动性极高",
          "持有 H-1B 期间 I-140 获批后，可突破 6 年最长工作限制无限期续签，配偶可申领 H-4 EAD 合法工作",
          "极佳的国际化职业背书与全球技术视野"
        ],
        cons: [
          "受制于每年 85,000 张配额抽签机制（中签率约 15%~25%），存在极大约束性",
          "被裁员后必须在 60 天宽限期 (Grace Period) 内找到新雇主接盘或转换身份"
        ]
      },
      {
        id: "usa-l1-transferee",
        name: "L-1 跨国高管 / 核心技术人员调派 (转 EB-1C 绿卡)",
        englishName: "L-1 Intracompany Transferee (L-1A / L-1B)",
        type: "entrepreneur",
        difficulty: "中等",
        processingTime: "15 天加急审批 (Premium Processing)",
        prSpeed: "L-1A 高管转 EB-1C 绿卡通常无排期或排期极短，1~2 年内全家绿卡",
        summary: "避开 H-1B 抽签恶性竞争的最优企业通道。只要在过去 3 年内在跨国公司的中国母公司连续担任经理/高管（L-1A）或核心专业技术人员（L-1B）满 1 年，即可直接调派至美国关联公司全职工作，L-1A 享有快速转 EB-1C 绿卡特权。",
        annualCostEst: "USCIS 官方申请费 + 加急审理费 $2,805",
        officialLink: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager",
        requirements: [
          "在过去 3 年内，在跨国母公司连续全职工作至少满 1 年",
          "在中方公司担任管理职务或掌握公司专有核心技术/算法/架构",
          "中美两家实体公司之间存在真实的母子、分公司或合资控股关联"
        ],
        pros: [
          "完全无需参与残酷的 H-1B 抽签，全年随时递交，加急 15 天内出审批结果",
          "配偶可直接申请 L-2S 工卡，在美国自由受雇于任何企业打工",
          "L-1A 转 EB-1C 绿卡免去复杂的 PERM 劳工部打广告程序，拿绿卡速度极快"
        ],
        cons: [
          "必须受雇于具备跨国实体关联的企业，中小微初创公司对商业计划书审核极其严格",
          "首次签证通常给 1~3 年，需在美保持实际运营方可续签"
        ]
      }
    ]
  },

  // 6. 泰国 (Thailand)
  {
    id: "thailand",
    name: "泰国",
    englishName: "Thailand",
    flag: "🇹🇭",
    tagline: "东南亚性价比天花板，全新 5 年期 DTV 数字游民签证，低成本旅居与身心彻底充盈",
    badge: "5年数字游民 · 消费降维",
    overallFriendliness: "极高",
    languageRequirement: "简单日常英语即可畅行；生活融入掌握基础泰语更有趣味",
    capital: "曼谷 / 清迈 / 普吉岛",
    medianTechSalary: "适合远程赚取离岸美金/人民币/欧元，在泰享受 1/3 生活成本降维打击",
    subclasses: [
      {
        id: "thailand-dtv",
        name: "目的地泰国签证 (DTV - 5年期数字游民签)",
        englishName: "Destination Thailand Visa (DTV)",
        type: "digital_nomad",
        difficulty: "低",
        processingTime: "5 ~ 10 个工作日（电子签证系统全流程线上出签）",
        prSpeed: "5 年多次往返；每次入境最长停留 180 天，境内可额外延期 180 天",
        summary: "泰国 2024 年官方正式出台的数字游民签证。面向远程工作者、自由职业者与泰拳/烹饪/医疗文化学员。只需 50 万泰铢（约 10 万 RMB）银行存款证明，即可获得 5 年期多次往返合法居留许可！",
        annualCostEst: "官方签证规费仅需 10,000 泰铢 (约 2,000 RMB，5年有效！)",
        officialLink: "https://www.thaievisa.go.th/",
        requirements: [
          "年满 20 周岁",
          "银行个人账户拥有不低于 50 万泰铢 (或等值约 1.5 万美元 / 10.5 万 RMB) 的存款流水证明",
          "雇佣合同、海外远程工作在职证明或自由职业者项目合同组合"
        ],
        pros: [
          "规费极其便宜：仅约 2,000 RMB 即可拿下长达 5 年的合法旅居许可，官方手续极简",
          "单次入境可合法居住 180 天，到期可在泰境内移民局延期 180 天，几乎相当于常驻",
          "配偶与 20 周岁以下子女可一同申请随行签证",
          "房租物价极其感人：清迈 2,500 RMB 即可整租带大泳池高档公寓，天天泰式按摩与精品咖啡"
        ],
        cons: [
          "不提供直接转泰国永居或入籍通道（属长期旅居签证类别）",
          "不可受雇于泰国本土企业打工（需为海外离岸公司远程服务）"
        ]
      }
    ]
  },

  // 7. 西班牙 (Spain)
  {
    id: "spain",
    name: "西班牙",
    englishName: "Spain",
    flag: "🇪🇸",
    tagline: "欧洲气候最好的海滨度假天堂，非盈利居留存钱即可移居，生活极度松弛",
    badge: "非盈利首选 · 慢生活之都",
    overallFriendliness: "极高",
    languageRequirement: "无需英语或西语考试即可下签！生活需掌握基础西语",
    capital: "马德里 / 巴塞罗那 / 瓦伦西亚",
    medianTechSalary: "适合带被动收入/储蓄前往，或远程赚欧元美金 (月生活费 1,000~1,800 欧非常宽裕)",
    subclasses: [
      {
        id: "spain-non-lucrative",
        name: "西班牙非盈利性居留 (No Lucrativa)",
        englishName: "Non-Lucrative Residence Visa",
        type: "entrepreneur",
        difficulty: "低",
        processingTime: "1 ~ 3 个月",
        prSpeed: "居留满 5 年可申请西班牙永久居留 (PR)；满 10 年可入籍申领欧盟护照",
        summary: "性价比极高的欧洲合法移居通道。不要求买房、不要求投资、不要求做题考语言！只要证明银行有足够的合法存款或被动收入维持在西生活即可获发居留许可。",
        annualCostEst: "单人要求银行存款证明约 2.8万 欧元 (约22万 RMB) 以上即可",
        officialLink: "https://www.exteriores.gob.es/Consulados/pekin/zh/ServiciosConsulares/Paginas/index.aspx?scco=China&scd=230&scca=Visados&scdt=Visado+de+residencia+no+lucrativa",
        requirements: [
          "主申请人证明每月拥有不低于西班牙 IPREM 指数 400% 的非工资性收入或流动存款 (年备约 28,800 欧)",
          "购买西班牙全额商业医疗保险",
          "无犯罪记录证明 (经中国涉外公证与海牙认证 Apostille)",
          "提供符合要求的健康体检证明"
        ],
        pros: [
          "零门槛：不限年龄、不考语言、不要求投资几十万买房",
          "可携带配偶及未成年子女一同移居，孩子可免费就读西班牙优质公立学校",
          "最高法院判决已废除每年住满 183 天的硬性移民监，进出极度自由",
          "畅行申根区 29 个欧洲国家"
        ],
        cons: [
          "持该签证期间不可以受雇于西班牙本土公司打工（但可在海外有远程/投资收入）",
          "第一张签证给 1 年，续签为 2+2 年模式"
        ]
      }
    ]
  },

  // 8. 新加坡 (Singapore)
  {
    id: "singapore",
    name: "新加坡",
    englishName: "Singapore",
    flag: "🇸🇬",
    tagline: "亚洲金融与亚太总部中心，COMPASS积分制透明评估，顶尖双语环境与极低税率",
    badge: "华人主场 · 零时差 · 超低税",
    overallFriendliness: "友好",
    languageRequirement: "中英双语流利（职场全英文汇报与书写）",
    capital: "新加坡 (City-State)",
    medianTechSalary: "90,000 ~ 150,000 新币 (月薪 7,500 ~ 12,500 SGD，约 48万~81万 RMB)",
    subclasses: [
      {
        id: "singapore-ep-compass",
        name: "COMPASS 评估框架就业准证 (Employment Pass - EP)",
        englishName: "Employment Pass (COMPASS Framework)",
        type: "point_based",
        difficulty: "中等",
        processingTime: "10 ~ 20 个工作日",
        prSpeed: "持 EP 连续纳税 1 ~ 2 年后可向移民局 (ICA) 申请新加坡永久居民 (PR)",
        summary: "新加坡人力部 (MOM) 实施的 COMPASS 互补专才评估框架。申请人不仅需达到最低月薪门槛（5,600 SGD 起，金融业 6,200 SGD 起），而且在 COMPASS 的薪水、学历、员工国籍多元化、本地聘用率四项基础指标中累计满 40 分即可合规获批。",
        annualCostEst: "MOM 官方申请费 105 SGD + 发证费 225 SGD",
        officialLink: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility",
        requirements: [
          "获得新加坡合规注册企业的全职录用聘书",
          "月薪达到最低门槛（非金融 5,600 SGD 起，40岁以上最高至 10,700 SGD）",
          "在 COMPASS 互补专才积分框架中累计评估至少 40 分"
        ],
        pros: [
          "全球个人所得税洼地（最高边际税率仅 22%~24%，无资本利得税，无遗产税）",
          "零时差，饮食文化与生活习惯完全吻合华人，子女双语基础极佳",
          "月薪满 6,000 SGD 即可为配偶及子女办理家属准证 (DP)，一人工作全家赴坡"
        ],
        cons: [
          "新加坡 PR 绿卡审批由 ICA 主导，审理机制为综合考量的不公开‘黑盒’",
          "男性第二代获得 PR 后，年满 18 周岁需依法服 2 年新加坡国民兵役 (National Service)"
        ],
        pointCalculator: {
          threshold: 40,
          thresholdLabel: "合格基准线：40分（满40分即通过人力部 COMPASS 准证核发）",
          rules: [
            {
              id: "sg_salary",
              name: "C1 薪资分位数（与同行业同龄本地 PMET 水平对比）",
              category: "salary",
              options: [
                { label: "达到行业同龄前 10% 分位", points: 20 },
                { label: "处于行业同龄 65% ~ 90% 分位", points: 10 },
                { label: "低于行业同龄 65% 分位", points: 0 }
              ]
            },
            {
              id: "sg_education",
              name: "C2 学历资格（MOM 顶级学府清单）",
              category: "education",
              options: [
                { label: "顶级名校 (清华/北大/复旦/交大/NUS/NTU/常春藤/百强大学)", points: 20 },
                { label: "正规全日制本科学士学位", points: 10 },
                { label: "无本科学士学位", points: 0 }
              ]
            },
            {
              id: "sg_diversity",
              name: "C3 雇主国籍多元化（申请人国籍在雇主 PMET 中的占比）",
              category: "diversity",
              options: [
                { label: "申请人国籍占比低于 5% (极高多元化加分)", points: 20 },
                { label: "申请人国籍占比 5% ~ 25%", points: 10 },
                { label: "申请人国籍占比高于 25%", points: 0 }
              ]
            },
            {
              id: "sg_local_share",
              name: "C4 雇主支持本地就业（企业员工中新加坡公民/PR 比例）",
              category: "bonus",
              options: [
                { label: "本地员工比例位于同行业前 50% 分位", points: 20 },
                { label: "本地员工比例位于同行业 20% ~ 50% 分位", points: 10 },
                { label: "本地员工比例偏低", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "singapore-one-pass",
        name: "顶级专才准证 (ONE Pass)",
        englishName: "Overseas Networks & Expertise Pass",
        type: "digital_nomad",
        difficulty: "极高",
        processingTime: "4 周内",
        prSpeed: "5 年超长免绑定准证，自由申请 PR 绿卡",
        summary: "新加坡针对全球顶尖企业领袖与技术权威推出的顶格准证。申请人月薪达 30,000 SGD（或在科技/学术领域有世界级公认成就），即可获得 5 年期完全不绑定雇主的自由工作许可，可同时任职、开公司、做顾问。",
        annualCostEst: "MOM 申请与签发费",
        officialLink: "https://www.mom.gov.sg/passes-and-permits/overseas-networks-and-expertise-pass",
        requirements: [
          "固定月薪达到 30,000 SGD（约合 16万 RMB/月）以上，或在科技、艺术、体育、学术领域取得公认非凡成就",
          "在海外知名企业工作满 1 年且企业市值超 5 亿美元或年营收超 2 亿美元"
        ],
        pros: [
          "5 年期准证，彻底不绑定单一雇主，可随时在新加坡自由创业、投资或受雇",
          "配偶可获得人力部认可的同意书 (LOC)，直接在新加坡合法全职就职",
          "社会地位尊贵，直通新加坡绿卡"
        ],
        cons: [
          "门槛极高，针对极高净值或顶级高管设计"
        ]
      }
    ]
  },

  // 9. 德国 (Germany)
  {
    id: "germany",
    name: "德国",
    englishName: "Germany",
    flag: "🇩🇪",
    tagline: "欧洲最大经济体，工匠与工程研发重镇，机会卡积分制找工与欧盟蓝卡 21 个月永居",
    badge: "机会卡 6分找工 · 蓝卡极速永居",
    overallFriendliness: "友好",
    languageRequirement: "技术岗位英语普遍通行；日常生活与融入需 A2~B1 德语",
    capital: "柏林 / 慕尼黑 / 法兰克福",
    medianTechSalary: "65,000 ~ 95,000 欧元 (约 51万~74万 RMB)",
    subclasses: [
      {
        id: "germany-chancenkarte",
        name: "机会卡积分制找工签证 (Chancenkarte)",
        englishName: "Opportunity Card (Chancenkarte)",
        type: "point_based",
        difficulty: "低",
        processingTime: "1 ~ 2 个月",
        prSpeed: "找到全职工作转欧盟蓝卡，最快 21 个月拿德国永居",
        summary: "德国 2024 年 6 月实施的划时代积分制找工签证。满 6 分即可直接拿到为期 1 年的德国居留签证，肉身直飞柏林慕尼黑实地找工！期间允许每周合法兼职工作 20 小时赚取生活费。",
        annualCostEst: "需在德国开立保证金账户 (Sperrkonto)，存入约 12,324 欧元法定生活保证金",
        officialLink: "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card",
        requirements: [
          "拥有受德国认可的至少 2 年全日制职业培训或海外正规大学学位（学信网可认证）",
          "具备基础德语 A1 或 英语 B2（雅思 5.5~6.0 / 托福 72+）证书",
          "在机会卡积分自测系统中累计获得至少 6 分",
          "提供在德期间的生活资金自给证明（保证金账户或试工兼职合同）"
        ],
        pros: [
          "无需国内盲投远程面试，直接肉身飞抵德国与雇主面对面，成功率翻倍",
          "找工期间每周允许合法兼职打工 20 小时，并允许长达两周的试工（Probebeschäftigung）",
          "找到符合专业的工作后，可直接在德国境内无缝转换为工作签证或欧盟蓝卡"
        ],
        cons: [
          "需要在德意志银行或 Expatrio 冻结约 1.2 万欧元作为生活保证金",
          "在德寻找合规住房（Anmeldung 户籍登记）有一定竞争压力"
        ],
        pointCalculator: {
          threshold: 6,
          thresholdLabel: "合格基准线：6分（满足即可递签入境德国找工）",
          rules: [
            {
              id: "de_education",
              name: "学历与职业资质资格",
              category: "education",
              options: [
                { label: "海外大学学位获得德国 Anabin 机构 H+ 完全对等认证", points: 4 },
                { label: "具备部分对等或两年正规高等职业资格证书", points: 3 },
                { label: "德国本地大学毕业学位", points: 4 },
                { label: "仅有基础学历，未认证", points: 0 }
              ]
            },
            {
              id: "de_experience",
              name: "过去 7 年内专业工作实操经验",
              category: "experience",
              options: [
                { label: "过去 7 年内有 5 年以上与学历对口的工作经验", points: 3 },
                { label: "过去 5 年内有 2 年以上对口工作经验", points: 2 },
                { label: "工作经验不足 2 年", points: 0 }
              ]
            },
            {
              id: "de_shortage",
              name: "是否属于德国紧缺行业职业 (Bottleneck Occupations)",
              category: "shortage",
              options: [
                { label: "属于紧缺职业 (IT工程师、软件开发、电气/机械工程、医生、护理)", points: 1 },
                { label: "非紧缺职业", points: 0 }
              ]
            },
            {
              id: "de_language",
              name: "语言能力等级 (德语 / 英语)",
              category: "language",
              options: [
                { label: "德语 B2 级及以上", points: 3 },
                { label: "德语 B1 级", points: 2 },
                { label: "德语 A2 级", points: 1 },
                { label: "英语 C1 级 (流利母语级)", points: 1 },
                { label: "仅具备德语 A1 或 英语 B2 基础", points: 0 }
              ]
            },
            {
              id: "de_age",
              name: "申请人年龄段",
              category: "age",
              options: [
                { label: "35 周岁及以下", points: 2 },
                { label: "36 ~ 40 周岁", points: 1 },
                { label: "41 周岁及以上", points: 0 }
              ]
            },
            {
              id: "de_partner",
              name: "配偶资质加分",
              category: "bonus",
              options: [
                { label: "配偶同时满足机会卡基本门槛条件一同申请", points: 1 },
                { label: "单身申请或配偶不符合条件", points: 0 }
              ]
            }
          ]
        }
      },
      {
        id: "germany-blue-card",
        name: "欧盟蓝卡 (EU Blue Card)",
        englishName: "EU Blue Card (Blaue Karte EU)",
        type: "job_offer",
        difficulty: "中等",
        processingTime: "1 ~ 2 个月",
        prSpeed: "德语达到 B1 最快 21 个月拿永居；德语 A1 满 27 个月拿永居！",
        summary: "高技能技术移民标杆签证。持有德国认可大学学位，获得德国企业年薪达标的聘用意向合同即可申请。2024 年全新降低门槛，IT 紧缺行业年薪底线仅需约 41,041 欧元，且放宽至认可 3 年实操经验无需学历。",
        annualCostEst: "无中介费用，前期准备约 2万~3万 RMB 签证公证与差旅",
        officialLink: "https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/MigratRat/BlaueKarte/blauekarte-node.html",
        requirements: [
          "德国正规大学毕业，或海外学位在 Anabin 数据库中被评估为 H+ 对等",
          "获得德国雇主全职聘任合同，普通行业年薪不低于 45,300 欧，IT/数学/工程/医学等紧缺行业年薪不低于 41,041 欧",
          "工作内容与专业技能匹配"
        ],
        pros: [
          "全欧洲最快的永居通道：德语学到 B1 仅需 21 个月直接换取德国永久居留权 (Niederlassungserlaubnis)",
          "配偶随行可无限制自由工作，无需提前考取德语 A1 证书",
          "在德国连续居住满 5 年（新国籍法甚至缩短至 3~5 年）即可申请加入德国国籍并保留原护照"
        ],
        cons: [
          "德国税率较高（单身 1 类税卡个税加社保总扣除比例约 38%~42%）",
          "融入德国社会与官僚行政打交道对德语有长远要求"
        ]
      }
    ]
  }
];
