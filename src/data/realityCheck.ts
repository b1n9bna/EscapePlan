export interface CityCostBenchmark {
  city: string;
  country: string;
  currency: string;
  currencyRateToRMB: number;
  grossAnnualDefault: number;
  taxAndInsuranceRate: number; // e.g. 0.25
  medianRent1BedMonthly: number;
  foodAndLivingMonthly: number;
  domesticEquivalentMonthlyRMB: number; // 约等于国内一线税后净入
  pros: string[];
  cons: string[];
}

export const CITY_BENCHMARKS: Record<string, CityCostBenchmark> = {
  tokyo: {
    city: "东京 (Tokyo)",
    country: "日本",
    currency: "JPY",
    currencyRateToRMB: 0.046, // 1 JPY ≈ 0.046 RMB
    grossAnnualDefault: 8000000, // 800万日元
    taxAndInsuranceRate: 0.23, // 约23% (所得税+住民税+厚生日金+健保)
    medianRent1BedMonthly: 95000, // 9.5万日元 1R/1K单人精装公寓
    foodAndLivingMonthly: 70000, // 7万日元
    domesticEquivalentMonthlyRMB: 24000,
    pros: [
      "国民健康险极佳：报销70%，大病有高额疗养费封顶制度，一年自费不会超过几万RMB",
      "育儿福利优渥：东京都免初高中公立学费，每月政府发儿童津贴",
      "公共治安绝对顶尖，夜行安全感满格"
    ],
    cons: [
      "东京租房需要缴纳礼金、敷金（押金）和保证公司费，初期开销较大",
      "日元汇率处于历史低位区间，换回人民币寄回家略显缩水"
    ]
  },
  sydney: {
    city: "悉尼 / 墨尔本 (Sydney/Melbourne)",
    country: "澳大利亚",
    currency: "AUD",
    currencyRateToRMB: 4.8,
    grossAnnualDefault: 105000, // 10.5万澳币年薪 (蓝领/技术/护理常见年薪)
    taxAndInsuranceRate: 0.26, // 约26% (所得税+Medicare税)
    medianRent1BedMonthly: 2300, // 2300澳币/月
    foodAndLivingMonthly: 1200, // 1200澳币/月
    domesticEquivalentMonthlyRMB: 29000,
    pros: [
      "最低时薪全球一流，工作时间受严格法律保护，哪怕做普通服务业也能体面生活",
      "阳光海滩大草坪，户外生活质量极其优渥",
      "Medicare 公民医疗全面保障，育儿补贴优厚"
    ],
    cons: [
      "大城市租房周薪制且竞争激烈，好房往往要竞价提交申请",
      "人工极其昂贵，叫修水管、搬家、换锁必须学会 DIY 自己动手"
    ]
  },
  auckland: {
    city: "奥克兰 / 惠灵顿 (Auckland/Wellington)",
    country: "新西兰",
    currency: "NZD",
    currencyRateToRMB: 4.3, // 1 NZD ≈ 4.3 RMB
    grossAnnualDefault: 100000, // 10万纽币年薪
    taxAndInsuranceRate: 0.24, // 约24% (PAYE个人所得税 + ACC意外赔偿基金)
    medianRent1BedMonthly: 1950, // 1950纽币/月 (市中心单人一房或好区独立套间)
    foodAndLivingMonthly: 950, // 950纽币/月 (超市自煮与日常咖啡)
    domesticEquivalentMonthlyRMB: 25000,
    pros: [
      "全球独一份永久回头签 (PRV)，拿完后回国 10 年绿卡永远不会过期，彻底免除移民监后顾之忧",
      "ACC 意外伤害全面免费包揽：哪怕在路上滑倒骨折，无论本地人还是外籍游客医疗休假全包",
      "社会人际关系极度淳朴扁平，几乎无年龄歧视与容貌焦虑"
    ],
    cons: [
      "孤悬南太平洋，离国内飞行时间长，往返机票成本较高",
      "大宗商品依赖海运进口，数码科技产品与蔬果季节性价格偏高"
    ]
  },
  vancouver: {
    city: "温哥华 / 多伦多 (Vancouver/Toronto)",
    country: "加拿大",
    currency: "CAD",
    currencyRateToRMB: 5.2, // 1 CAD ≈ 5.2 RMB
    grossAnnualDefault: 105000, // 10.5万加币
    taxAndInsuranceRate: 0.29, // 约29% (联邦税+省税+CPP养老+EI)
    medianRent1BedMonthly: 2300, // 2300加币 (1 Bedroom公寓)
    foodAndLivingMonthly: 1100, // 1100加币
    domesticEquivalentMonthlyRMB: 26000,
    pros: [
      "气候温和，没有严冬，华人生活配套极其成熟（大统华、地道川粤菜一应俱全）",
      "全家享受免费基础公共医疗体系 (MSP/OHIP)",
      "文化极其包容多元，几乎感受不到职场排挤"
    ],
    cons: [
      "租房和买房成本高企，近年通胀导致超市物价和外食消费贵",
      "看家庭医生和专科排队周期漫长，小病全靠自愈"
    ]
  },
  seattle: {
    city: "西雅图 / 硅谷 (Seattle/Silicon Valley)",
    country: "美国",
    currency: "USD",
    currencyRateToRMB: 7.2, // 1 USD ≈ 7.2 RMB
    grossAnnualDefault: 165000, // 16.5万美金 (科技工程中位数 Base+Bonus)
    taxAndInsuranceRate: 0.28, // 约28% (联邦税+FICA社保医保，华州无州个税/加州约含州税)
    medianRent1BedMonthly: 2350, // 2350美元 (带车位洗烘1居室公寓)
    foodAndLivingMonthly: 1100, // 1100美元 (Costco生鲜大宗采购与健康伙食)
    domesticEquivalentMonthlyRMB: 48000,
    pros: [
      "全球薪水购买力与技术创新天花板，大厂股票期权（RSU）具备指数级资本跃迁机会",
      "自然资源与户外圣地：雪山、国家公园、海湾帆船周末触手可及",
      "全美优质雇主通常全额报销高阶商业医疗保险 (PPO)，医疗技术全球顶级"
    ],
    cons: [
      "非移民签证阶段身份严重受制于雇主与劳工局，抽签与排期存在心理消耗",
      "大城市核心城区存在无家可归者与治安分化，好学区与治安优良社区溢价极高"
    ]
  },
  singapore: {
    city: "新加坡 (Singapore)",
    country: "新加坡",
    currency: "SGD",
    currencyRateToRMB: 5.4, // 1 SGD ≈ 5.4 RMB
    grossAnnualDefault: 108000, // 10.8万新币 (月薪 9,000 SGD)
    taxAndInsuranceRate: 0.10, // 约10% (全球超低阶梯个税，无社保强扣，前3万免税)
    medianRent1BedMonthly: 2800, // 2800新币 (近地铁1居室 Condo 公寓或合租大主卧)
    foodAndLivingMonthly: 900, // 900新币 (食阁大排档天天吃鸡肉饭肉骨茶仅5~8新币)
    domesticEquivalentMonthlyRMB: 36000,
    pros: [
      "税收天堂：实际到手比例极高，无资本利得税、无遗产税，年薪50万RMB实际税负仅不到5%",
      "无时差，直飞国内4~5小时，周末随时回家探望父母，饮食起居零文化震荡",
      "公共治安与市容整洁全球标杆，夜间独行安全感无懈可击"
    ],
    cons: [
      "住房租金昂贵，买车拥有拥车证 (COE) 成本属世界天花板",
      "常年湿热赤道气候，户外活动时间较受天气限制"
    ]
  },
  chiangmai: {
    city: "清迈 / 曼谷 (Chiang Mai/Bangkok)",
    country: "泰国 (数字游民模式)",
    currency: "USD", // 赚境外美金在泰消费
    currencyRateToRMB: 7.2,
    grossAnnualDefault: 36000, // 年薪3.6万美金 (月薪3000 USD)
    taxAndInsuranceRate: 0.05, // 离岸收入+境外纳税合规约5%
    medianRent1BedMonthly: 450, // 450美金 (约1.6万泰铢，带大泳池健身房网红公寓)
    foodAndLivingMonthly: 450, // 450美金天天大吃大喝泰餐+咖啡
    domesticEquivalentMonthlyRMB: 22000,
    pros: [
      "存钱率爆表：月入 3,000 美金在泰月开销不到 900 美金，每月净存 1.5 万 RMB！",
      "国际化咖啡馆密度极高，全球游民社群氛围活跃",
      "气候常年温暖，SPA按摩天天做，生活幸福指数天花板"
    ],
    cons: [
      "不提供绿卡路径，每5年需重新申请居留或换签",
      "4-5月泰北有传统‘烧山季’空气污染，需迁徙至普吉或曼谷避烟"
    ]
  },
  valencia: {
    city: "瓦伦西亚 / 巴塞罗那 (Valencia/Barcelona)",
    country: "西班牙",
    currency: "EUR",
    currencyRateToRMB: 7.8,
    grossAnnualDefault: 32000, // 3.2万欧 (非盈利存款换算或远程收入)
    taxAndInsuranceRate: 0.20, // 约20% (或数字游民贝克汉姆法案24%)
    medianRent1BedMonthly: 750, // 750欧 (瓦伦西亚市中心舒适公寓)
    foodAndLivingMonthly: 450, // 450欧地中海生鲜美食天天大餐
    domesticEquivalentMonthlyRMB: 21000,
    pros: [
      "物价在全欧洲极其感人：车厘子、海鲜、伊比利亚火腿白菜价，红酒几欧一瓶",
      "气候常年日照超过 300 天，地中海海风与极其松弛的社交节奏",
      "最高法院已取消每年住满 183 天的硬性移民监限制，行动极度自由"
    ],
    cons: [
      "下午 2 点到 5 点 Siesta 午休全城关门，办事效率较慢",
      "在当地找本土高薪工作机会较少，适合自带被动收入或远程工作者"
    ]
  },
  berlin: {
    city: "柏林 / 慕尼黑 (Berlin/Munich)",
    country: "德国",
    currency: "EUR",
    currencyRateToRMB: 7.8, // 1 EUR ≈ 7.8 RMB
    grossAnnualDefault: 75000, // 7.5万欧元
    taxAndInsuranceRate: 0.40, // 约40% (单身1类税卡：所得税+养老+健保+失业)
    medianRent1BedMonthly: 1250, // 1250欧暖租 (含暖气水费)
    foodAndLivingMonthly: 650, // 650欧
    domesticEquivalentMonthlyRMB: 28000,
    pros: [
      "法定年假普遍在 28 ~ 30 天起步，下班严禁发工作邮件，生活节奏极舒适",
      "公立大学全部免学费（每学期仅需缴纳约300欧公交杂费）",
      "失业保险待遇高：被裁可领税后工资 60% 维持长达 1 年"
    ],
    cons: [
      "税收极重：单身被称为‘税牛’，接近 40% 的工资直接进国库",
      "柏林找房地狱难度，看房往往要排几百人递交简历海选"
    ]
  }
};
