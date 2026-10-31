// ============================================================================
// ESCAPEPLAN LIFE SIMULATION ENGINE
// 逃跑计划 · 中国式命运交互电影数据模型 (三段式驾驶舱 + 0~63岁全周期因果链)
// ============================================================================

import { getProvincialGaokaoOptions } from './provincial_routes';
import { REGION_ECOSYSTEMS } from './provincial_ecosystems';
export * from './soul_imprints';
export * from './provincial_routes';
export * from './provincial_ecosystems';
export * from './adult_branches';

export interface FamilyOrigin {
  region: string;
  province?: string;
  provinceGroup?: string;
  regionDetail: string;
  hospitalName: string; // 降生医院全称（与地域严格一致，绝不串台）
  primarySchoolName: string; // 当地小学名称
  highSchoolName: string; // 当地高中名称
  cityOrCounty: string; // "地级市生活区" / "县城" / "乡镇"
  birthScene?: string; // 专属初临人间与第一声啼哭叙事（绝不千篇一律）
  fatherAge: number; // 降生时父亲年龄（如28~32）
  fatherJob: string;
  fatherTrait: string;
  motherAge: number; // 降生时母亲年龄（如26~30）
  motherJob: string;
  motherTrait: string;
  housing: string;
  wealthTier: string;
  wealthDetail: string;
  siblingType: 'only_child' | 'elder_sister' | 'elder_brother' | 'younger_brother' | 'younger_sister' | 'middle_child';
  siblingAgeOffset: number;
  siblings: string; // 0岁建档时同胞描述（严格符合出生时点，无时空悖论）
  siblingsDetail: string;
  emotionalTone: string;
  toneDetail: string;
  backgroundStory: string;
  initialSavings: number;
  initialFamilySavings: number;
}

export interface CharacterAttributes {
  // 4 Core Attributes (0~100)
  health: number; // 健康 (0: 极度虚弱, 100: 极其健壮)
  happiness: number; // 幸福与心态 (0: 极度抑郁, 100: 积极豁达)
  cognition: number; // 认知与学习手腕 (0: 混沌蒙昧, 100: 见解独到/应试顶尖)
  social: number; // 社交与人情圈层 (0: 孤立内敛, 100: 八面玲珑)
  savings: number; // 个人现金储蓄/可支配资金 (RMB)
  familySavings: number; // 原生家庭存款储备池 (RMB)

  // 潜意识心理特质
  inferiority: number; // 自卑与敏感 (0: 坦荡从容, 100: 极度敏感)
  academicCapital: number; // 做题应试资本 (0: 毫无兴趣, 100: 顶尖水平)
  kinshipGuilt: number; // 家庭牵绊与愧疚 (0: 毫无包袱, 100: 负重极高)
  rebellion: number; // 独立与叛逆 (0: 规矩温顺, 100: 独立自主)
  resilience: number; // 生存抗压韧劲 (0: 脆弱娇嫩, 100: 踏实耐磨)
}

export interface LifeChoice {
  text: string;
  detail: string;
  reaction: string;
  delta: Partial<CharacterAttributes>;
  addTags?: string[];
  trackTrigger?: "vocational" | "academic";
  stanceBadge?: string;
  tradeOffHint?: string;
}

export interface CrisisWarning {
  type: string;
  title: string;
  desc: string;
}

export interface LifeDiagnosis {
  type: string;
  title: string;
  portrait: string;
  kinshipEvaluation: string;
  systemEvaluation: string;
  fateVerdict: string;
  recommendation: string;
}

export interface LifeEventNode {
  id: string;
  age: number;
  stageName: string;
  title: string;
  scene: string;
  type?: "natural" | "choice" | "milestone" | "destiny" | "mortality";
  naturalDelta?: Partial<CharacterAttributes>;
  naturalTags?: string[];
  choices?: LifeChoice[];
  reflection?: string;
}

export interface DualTrackStage {
  age: number;
  title: string;
  theme: string;
  emigratedScene: string;
  stayedScene: string;
  emigratedReflection: string;
  stayedReflection: string;
  choice?: {
    text: string;
    detail: string;
    reaction: string;
  };
  statsDeltaStayed?: Partial<CharacterAttributes>;
  statsDeltaEmigrated?: Partial<CharacterAttributes>;
}

export interface CountryOption {
  id: string;
  name: string;
  flag: string;
  cost: string;
  timeline: string;
  difficulty: "低" | "中" | "高";
  suitabilityScore: number;
  summary: string;
  recommendReason: string;
  matchRate: number;
}

export const TARGET_COUNTRIES: CountryOption[] = [
  {
    id: "japan",
    name: "日本 (Japan)",
    flag: "🇯🇵",
    cost: "¥10万 - 25万",
    timeline: "6 - 12 个月",
    difficulty: "低",
    suitabilityScore: 92,
    summary: "高度人才/特定技能/IT派遣通道清晰，文化与饮食适应成本极低，适合低成本启动。",
    recommendReason: "对普通做题家极其友好，IT与蓝领技能缺口巨大，治安极佳且离故土航程近。",
    matchRate: 94
  },
  {
    id: "germany",
    name: "德国 (Germany)",
    flag: "🇩🇪",
    cost: "¥12万 - 30万",
    timeline: "8 - 18 个月",
    difficulty: "中",
    suitabilityScore: 86,
    summary: "新机会卡 (Chancenkarte) 与欧盟蓝卡，免学费公立教育与扎实社会福利。",
    recommendReason: "工科底色匹配度高，技术人享有尊严，公费育儿与医疗能彻底卸下后顾之忧。",
    matchRate: 88
  },
  {
    id: "canada",
    name: "加拿大 (Canada)",
    flag: "🇨🇦",
    cost: "¥30万 - 60万",
    timeline: "1 - 3 年",
    difficulty: "高",
    suitabilityScore: 78,
    summary: "EE 联邦技术移民与省提名 (PNP)，传统移民大国，护照含金量极高。",
    recommendReason: "多元包容度最高，适合愿意深度融入英语社会、追求子女广阔空间的家庭。",
    matchRate: 75
  },
  {
    id: "thailand",
    name: "泰国 (Thailand)",
    flag: "🇹🇭",
    cost: "¥5万 - 15万",
    timeline: "1 - 3 个月",
    difficulty: "低",
    suitabilityScore: 89,
    summary: "LTR 长期居留/精英签证/DTV 数字游民签证，低成本慢节奏旅居中继站。",
    recommendReason: "低物价生活成本仅为一线城市的1/3，气候温暖阳光充沛，适合调养身心。",
    matchRate: 90
  }
];

export interface BirthplaceSlide {
  id?: string;
  province?: string;
  provinceGroup?: string;
  region: string;
  landscape: string;
  tagline: string;
  icon: string;
}

export interface ProvinceGroupItem {
  group: string;
  provinces: {
    id: string;
    province: string;
    shortLabel: string;
    icon: string;
  }[];
}

export interface HotProvinceItem {
  id: string;
  province: string;
  shortLabel: string;
  icon: string;
  highlightBadge: string;
  tagline: string;
}

// 🔥 热门特色省份榜首阵容：湖湘霸蛮、中原麦浪、南粤出海、齐鲁重器、苏南太保...
export const HOT_PROVINCES: HotProvinceItem[] = [
  {
    id: "hunan",
    province: "湖南省",
    shortLabel: "马栏山文创 · 三一中联 · 五一广场新消费",
    icon: "🌶️",
    highlightBadge: "霸蛮火辣 · 长沙顶流",
    tagline: "敢为人先吃得苦霸得蛮，星城顶流文创与大国重器，猛火湘菜红火出圈"
  },
  {
    id: "henan",
    province: "河南省",
    shortLabel: "千万考生 · 麦浪淘金 · 郑州富士康",
    icon: "🌾",
    highlightBadge: "高考地狱 · 麦浪淘金",
    tagline: "百万做题家独木桥，中原粮仓沉浮，进厂出海逆天改命"
  },
  {
    id: "guangdong",
    province: "广东省",
    shortLabel: "世界工厂 · 宗族围村 · 跨境弄潮",
    icon: "🏮",
    highlightBadge: "改开前沿 · 务实搏杀",
    tagline: "宗族人情与工业轰鸣，喝早茶搞钱出海，不问出处唯看手腕"
  },
  {
    id: "shandong",
    province: "山东省",
    shortLabel: "体制考公 · 胶东大厂 · 大国重器",
    icon: "🍎",
    highlightBadge: "体制巅峰 · 齐鲁重器",
    tagline: "考公考编家族至高荣光，青烟大厂工业硬核，踏实规矩厚重"
  },
  {
    id: "jiangsu",
    province: "江苏省",
    shortLabel: "十三太保 · 模具五金 · 考卷内卷",
    icon: "🚢",
    highlightBadge: "苏南霸主 · 十三太保",
    tagline: "县域经济神话，南通泰州卷王题海，五金精密与外企高地"
  },
  {
    id: "sichuan",
    province: "四川省",
    shortLabel: "少不入川 · 盆地茶馆 · 火锅江湖",
    icon: "🍵",
    highlightBadge: "天府之国 · 豁达安逸",
    tagline: "江风茶馆与大厂副业，巴适安逸与川商闯荡，安贫乐道大天地"
  },
  {
    id: "zhejiang",
    province: "浙江省",
    shortLabel: "义乌搏杀 · 阿里电商 · 民营高地",
    icon: "⚙️",
    highlightBadge: "民营高地 · 义乌出海",
    tagline: "白天当老板晚上睡地板，全球买卖跨境电商，草根财富神话"
  },
  {
    id: "beijing",
    province: "北京市",
    shortLabel: "部委选调 · 中关村算法 · 皇城根胡同",
    icon: "🚲",
    highlightBadge: "部委中枢 · 科技心脏",
    tagline: "红墙柳荫与算法加班，顶层设计与海淀鸡娃，阶层跃迁修罗场"
  },
  {
    id: "shanghai",
    province: "上海市",
    shortLabel: "外资量化 · 先进制程 · 石库门里弄",
    icon: "🏙️",
    highlightBadge: "金融魔都 · 国际规则",
    tagline: "契约分明精致体面，外资量化与半导体，咖啡香里的残酷竞争"
  },
  {
    id: "chongqing",
    province: "重庆市",
    shortLabel: "山城单轨 · 赛博立体 · 老火锅江湖",
    icon: "🌶️",
    highlightBadge: "赛博重镇 · 豪爽耿直",
    tagline: "梯坎棒棒与摩天高楼，雾都两江与汽车重工，敢爱敢恨仗义人生"
  },
  {
    id: "shaanxi",
    province: "陕西省",
    shortLabel: "古都三秦 · 军工航天 · 关中面食",
    icon: "🏺",
    highlightBadge: "军工硬核 · 华夏厚度",
    tagline: "航空航天重工扎堆，十三朝古都历史回响，安稳踏实科研人生"
  },
  {
    id: "liaoning",
    province: "辽宁省",
    shortLabel: "共和国长子 · 战机重工 · 东北往事",
    icon: "🏭",
    highlightBadge: "长子风骨 · 铁骨柔情",
    tagline: "大国战机航母摇篮，下岗阵痛与热血重生，黑土地上的幽默与执着"
  }
];

export const PROVINCE_GROUPS: ProvinceGroupItem[] = [
  {
    group: "华北",
    provinces: [
      { id: "beijing", province: "北京市", shortLabel: "皇城根胡同", icon: "🚲" },
      { id: "tianjin", province: "天津市", shortLabel: "海河化工厂", icon: "🚢" },
      { id: "hebei", province: "河北省", shortLabel: "环京大钢厂", icon: "🏗️" },
      { id: "shanxi", province: "山西省", shortLabel: "晋北煤海铁道", icon: "🚂" },
      { id: "neimenggu", province: "内蒙古自治区", shortLabel: "草原风沙牧场", icon: "🐎" }
    ]
  },
  {
    group: "东北",
    provinces: [
      { id: "liaoning", province: "辽宁省", shortLabel: "铁西老工业区", icon: "🏭" },
      { id: "jilin", province: "吉林省", shortLabel: "长白山林区", icon: "🌲" },
      { id: "heilongjiang", province: "黑龙江省", shortLabel: "北大荒雪原", icon: "❄️" }
    ]
  },
  {
    group: "华东",
    provinces: [
      { id: "shanghai", province: "上海市", shortLabel: "石库门里弄", icon: "🏙️" },
      { id: "jiangsu", province: "江苏省", shortLabel: "运河题海县中", icon: "🚢" },
      { id: "zhejiang", province: "浙江省", shortLabel: "民营五金作坊", icon: "⚙️" },
      { id: "anhui", province: "安徽省", shortLabel: "皖北平原粮仓", icon: "🌾" },
      { id: "fujian", province: "福建省", shortLabel: "闽南渔港侨乡", icon: "⚓" },
      { id: "jiangxi", province: "江西省", shortLabel: "赣中红壤瓷都", icon: "🏺" },
      { id: "shandong", province: "山东省", shortLabel: "齐鲁大棚考公", icon: "🍎" }
    ]
  },
  {
    group: "华中",
    provinces: [
      { id: "henan", province: "河南省", shortLabel: "中原平原麦浪", icon: "🌾" },
      { id: "hubei", province: "湖北省", shortLabel: "江汉排涝水乡", icon: "🐟" },
      { id: "hunan", province: "湖南省", shortLabel: "马栏山文创 · 三一重工 · 星城烟火", icon: "🌶️" }
    ]
  },
  {
    group: "华南",
    provinces: [
      { id: "guangdong", province: "广东省", shortLabel: "珠三角宗族围村", icon: "🏮" },
      { id: "guangxi", province: "广西壮族自治区", shortLabel: "喀斯特蔗田", icon: "🎋" },
      { id: "hainan", province: "海南省", shortLabel: "琼南胶林椰海", icon: "🥥" }
    ]
  },
  {
    group: "西南",
    provinces: [
      { id: "chongqing", province: "重庆市", shortLabel: "山城索道棒棒", icon: "🌶️" },
      { id: "sichuan", province: "四川省", shortLabel: "盆地茶馆江风", icon: "🍵" },
      { id: "guizhou", province: "贵州省", shortLabel: "乌蒙险峰苗寨", icon: "⛰️" },
      { id: "yunnan", province: "云南省", shortLabel: "高原坝子花农", icon: "🌸" },
      { id: "xizang", province: "西藏自治区", shortLabel: "雪域神山青稞", icon: "🏔️" }
    ]
  },
  {
    group: "西北",
    provinces: [
      { id: "shaanxi", province: "陕西省", shortLabel: "黄土塬军工院", icon: "🏺" },
      { id: "gansu", province: "甘肃省", shortLabel: "河西走廊戈壁", icon: "🏜️" },
      { id: "qinghai", province: "青海省", shortLabel: "柴达木盐湖", icon: "🧂" },
      { id: "ningxia", province: "宁夏回族自治区", shortLabel: "塞上贺兰山阙", icon: "🍇" },
      { id: "xinjiang", province: "新疆维吾尔自治区", shortLabel: "天山兵团农垦", icon: "🍈" }
    ]
  },
  {
    group: "港澳台",
    provinces: [
      { id: "hongkong", province: "香港特别行政区", shortLabel: "深水埗唐楼劏房", icon: "🏙️" },
      { id: "macau", province: "澳门特别行政区", shortLabel: "氹仔旧街坊", icon: "🎰" },
      { id: "taiwan", province: "台湾省", shortLabel: "眷村骑楼机车", icon: "🛵" }
    ]
  }
];

// 全中国34个省级行政区全覆盖多生态矩阵（已模块化移至 ./provincial_ecosystems.ts，共107套深度地域剧本）

export const BIRTHPLACE_SLIDES: BirthplaceSlide[] = REGION_ECOSYSTEMS.map(e => ({
  id: e.id,
  province: e.province,
  provinceGroup: e.provinceGroup,
  region: e.region,
  landscape: e.landscape,
  tagline: e.tagline,
  icon: e.icon
}));

const WEALTH_TIERS = [
  {
    tier: "入不敷出（靠民间借贷周转）",
    detail: "家里常年夹着几本红色借条，逢年过节有债主登门喝茶，父母说话总低人一头。"
  },
  {
    tier: "紧绷温饱（经不起任何风浪）",
    detail: "月收入仅够柴米油盐与学杂费，家庭总存款不足三万，一人大病即刻全家致贫。"
  },
  {
    tier: "小康微有结余（血汗钱按月积攒）",
    detail: "父母起早贪黑省吃俭用，存折上有十万定期，指望给你凑齐未来县城买房的首付。"
  },
  {
    tier: "留守匮乏（靠微薄汇款苦熬）",
    detail: "父母在外打工长年按月汇回千把块，全家老小精打细算，一分钱掰成两半花。"
  }
];

// 同胞时序真实模型（彻底杜绝0岁出现3岁弟弟的时空悖论）
const SIBLINGS_OPTIONS = [
  {
    type: "only_child" as const,
    siblings: "独生子女（独享亦独扛）",
    detail: "父母将全部关爱与资源倾注在你身上；未来老人的照护、医疗和养老没有任何同胞分担。",
    ageOffset: 0
  },
  {
    type: "elder_sister" as const,
    siblings: "有姐姐（现年4岁，比你大4岁）",
    detail: "姐姐从小懂事，比你年长4岁，放学后常牵着你的手，未来能替你分担家庭照顾。",
    ageOffset: 4
  },
  {
    type: "elder_brother" as const,
    siblings: "有哥哥（现年3岁，比你大3岁）",
    detail: "哥哥比你大3岁，在街坊大院里野跑玩耍，遇到外面孩子欺负总替你出头。",
    ageOffset: 3
  },
  {
    type: "younger_brother" as const,
    siblings: "目前独生（母亲正怀二胎，3岁时弟弟降生）",
    detail: "此时你是家中独苗；三年后将迎来二胎弟弟，全家的关爱与资源将面临重新分配。",
    ageOffset: -3
  },
  {
    type: "younger_sister" as const,
    siblings: "目前独生（母亲正怀二胎，3岁时妹妹降生）",
    detail: "此时你是家中独苗；三年后将迎来二胎妹妹，家里将添一份温柔的欢声笑语。",
    ageOffset: -3
  },
  {
    type: "middle_child" as const,
    siblings: "夹心层（上有长姐，下有幼弟）",
    detail: "上有年长姐姐，下有年幼弟弟，你夹在中间最早就学会了察言观色与独自消化委屈。",
    ageOffset: 0
  }
];

const EMOTIONAL_TONES = [
  {
    tone: "严格期望型（“我们受苦全是为了你出人头地”）",
    detail: "每一次关照都伴随着沉甸甸的期许，让你一旦松懈就背负道德压力。"
  },
  {
    tone: "同辈攀比型（“你看大舅家表哥今年又考上编制了”）",
    detail: "家里的餐桌常常是对照台，你的价值往往被拿来与邻里同辈比较。"
  },
  {
    tone: "朴素关怀型（“家里没本事，全靠你自己争气了”）",
    detail: "父母朴讷善良，给不了你太多关系与捷径，只能把热饭默默放在你碗里。"
  },
  {
    tone: "务实生计型（“踏实掌握手艺，比什么都强”）",
    detail: "家里凡事以现实利益与风险为先，早早叮嘱你要走稳妥踏实的路。"
  },
  {
    tone: "忙碌放养型（“能吃饱穿暖就行，我们管不了那么多”）",
    detail: "父母忙于生计无暇过问你的精神世界，你在野草般的自由中早熟自立。"
  }
];

const FIRST_NAMES = ["陈", "李", "王", "张", "刘", "黄", "周", "徐", "林", "吴"];
const GIVEN_NAMES_MALE = ["浩然", "宇航", "家辉", "志伟", "建国", "子轩", "博文", "俊杰", "天明"];
const GIVEN_NAMES_FEMALE = ["晓芸", "婷婷", "佳欣", "若涵", "思敏", "燕妮", "梦洁", "雅琴", "静波"];

export function generateRandomFamily(targetProvinceOrRegion?: string): {
  name: string;
  gender: "男" | "女";
  family: FamilyOrigin;
} {
  const gender: "男" | "女" = Math.random() > 0.5 ? "男" : "女";
  const sur = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const given =
    gender === "男"
      ? GIVEN_NAMES_MALE[Math.floor(Math.random() * GIVEN_NAMES_MALE.length)]
      : GIVEN_NAMES_FEMALE[Math.floor(Math.random() * GIVEN_NAMES_FEMALE.length)];
  const name = `${sur}${given}`;

  // 1. 抽取地域生态（支持指定具体剧本，或按省份随机抽取该省多样化平行剧本）
  let candidateEcos = REGION_ECOSYSTEMS;
  if (targetProvinceOrRegion) {
    const cleanTarget = targetProvinceOrRegion.trim();
    const exactRegionMatch = REGION_ECOSYSTEMS.filter((e) => e.region === cleanTarget);
    if (exactRegionMatch.length > 0) {
      candidateEcos = exactRegionMatch;
    } else {
      const matched = REGION_ECOSYSTEMS.filter(
        (e) =>
          e.province === cleanTarget ||
          e.id === cleanTarget ||
          cleanTarget.includes(e.province) ||
          e.province.includes(cleanTarget) ||
          e.region.includes(cleanTarget)
      );
      if (matched.length > 0) {
        candidateEcos = matched;
      }
    }
  }
  const eco = candidateEcos[Math.floor(Math.random() * candidateEcos.length)];

  // 2. 严格从该生态中抽取原生父母与居住条件（彻底避免“地级市出生却去县医院工作”的荒谬串台）
  const parent = eco.parents[Math.floor(Math.random() * eco.parents.length)];
  const housing = parent.housing;
  const wealth = WEALTH_TIERS[parent.wealthIndex];

  // 3. 抽取同胞配置（时序真实）
  const sibConfig = SIBLINGS_OPTIONS[Math.floor(Math.random() * SIBLINGS_OPTIONS.length)];
  const tone = EMOTIONAL_TONES[Math.floor(Math.random() * EMOTIONAL_TONES.length)];

  // 原生家庭总存款池：严格契合阶层叙事设定
  // 0: 入不敷出（民间借条周转负债） -> -15,000元
  // 1: 紧绷温饱（家庭总存款不足三万） -> 28,000元
  // 2: 小康微有结余（存折上有十万定期） -> 105,000元
  // 3: 留守匮乏（靠微薄汇款苦熬） -> 8,000元
  const initialFamilySavingsMap = [-15000, 28000, 105000, 8000];
  const initialFamilySavings = initialFamilySavingsMap[parent.wealthIndex] ?? 28000;

  // 个人初始零花钱（未成年期孩子手头的真实零散现金与压岁钱）
  const initialPersonalSavingsMap = [0, 10, 50, 5];
  const initialSavings = initialPersonalSavingsMap[parent.wealthIndex] ?? 10;

  return {
    name,
    gender,
    family: {
      region: eco.region,
      province: eco.province,
      provinceGroup: eco.provinceGroup,
      regionDetail: `${eco.landscape} | ${eco.tagline}`,
      hospitalName: eco.hospitalName,
      primarySchoolName: eco.primarySchoolName,
      highSchoolName: eco.highSchoolName,
      cityOrCounty: eco.cityOrCounty,
      birthScene: eco.birthScene,
      fatherAge: parent.fatherAge,
      fatherJob: parent.fatherJob,
      fatherTrait: parent.fatherTrait,
      motherAge: parent.motherAge,
      motherJob: parent.motherJob,
      motherTrait: parent.motherTrait,
      housing,
      wealthTier: wealth.tier,
      wealthDetail: wealth.detail,
      siblingType: sibConfig.type,
      siblingAgeOffset: sibConfig.ageOffset,
      siblings: sibConfig.siblings,
      siblingsDetail: sibConfig.detail,
      emotionalTone: tone.tone,
      toneDetail: tone.detail,
      backgroundStory: `你出生于${eco.region}。父亲当时${parent.fatherAge}岁，是一名${parent.fatherJob}；母亲${parent.motherAge}岁，从事${parent.motherJob}。一家人挤在${housing}。`,
      initialSavings,
      initialFamilySavings
    }
  };
}

// ============================================================================
// 状态与家庭网络动态辅助函数
// ============================================================================

export function getHealthDesc(val: number): string {
  if (val >= 80) return "体魄硬朗 · 精力充沛";
  if (val >= 60) return "体质尚可 · 偶有疲劳";
  if (val >= 40) return "亚健康 · 偶发小恙";
  return "透支严重 · 身体报警";
}

export function getHappinessDesc(val: number): string {
  if (val >= 80) return "充盈豁达 · 乐观从容";
  if (val >= 60) return "情绪平稳 · 随遇而安";
  if (val >= 40) return "心力交瘁 · 精神内耗";
  return "重度焦虑 · 压抑疲惫";
}

export function getCognitionDesc(val: number): string {
  if (val >= 80) return "见解独到 · 应试拔尖";
  if (val >= 60) return "领悟扎实 · 踏实开窍";
  if (val >= 40) return "循规蹈矩 · 平平稳稳";
  return "思维混沌 · 缺乏主见";
}

export function getSocialDesc(val: number): string {
  if (val >= 80) return "八面玲珑 · 圈层融洽";
  if (val >= 60) return "进退有度 · 熟稔人情";
  if (val >= 40) return "内敛寡言 · 圈子狭窄";
  return "被动孤立 · 不善应酬";
}

export function getFatherDynamicStatus(baseAge: number, currentAge: number, _trait: string): {
  age: number;
  status: string;
} {
  const age = baseAge + currentAge;
  let status = "";
  if (currentAge < 6) {
    status = "年富力强，每日在工作与家庭间忙碌奔波，对你的到来满怀期待。";
  } else if (currentAge < 12) {
    status = "正值壮年，常为日常开销与学杂费精打细算，话虽不多但默默撑起这个家。";
  } else if (currentAge < 18) {
    status = "两鬓渐生白发，单位竞争激烈，常在阳台抽闷烟，叮嘱你要用功念书。";
  } else if (currentAge < 23) {
    status = "年过半百，体力大不如前，患有腰腿慢性酸痛，盼着你早日毕业工作稳定。";
  } else if (currentAge < 30) {
    status = "已退居二线或打零工，头发花白，开始经常打电话催促你成家立业。";
  } else if (currentAge < 50) {
    status = "步入古稀之年，健康状况需密切照看，经常坐在老藤椅上看着旧相册发呆。";
  } else {
    status = "已走完平凡而操劳的人间一程，长眠在故土的松柏之间。";
  }
  return { age, status };
}

export function getMotherDynamicStatus(baseAge: number, currentAge: number, _trait: string): {
  age: number;
  status: string;
} {
  const age = baseAge + currentAge;
  let status = "";
  if (currentAge < 6) {
    status = "操持全家家务与一日三餐，常抱着你哄睡，细心呵护你的健康成长。";
  } else if (currentAge < 12) {
    status = "精打细算每一笔菜钱与衣物，常为你的作业与成绩操碎了心。";
  } else if (currentAge < 18) {
    status = "更年期情绪多变，每日清晨早起为你热饭熬粥，期盼你能考上好学校。";
  } else if (currentAge < 23) {
    status = "经常打电话问寒问暖，叮嘱你在外别舍不得吃穿，身体偶有心慌乏力。";
  } else if (currentAge < 30) {
    status = "患有高血压与关节酸痛，最担心你在外漂泊无依，常劝你回老家安顿。";
  } else if (currentAge < 50) {
    status = "年逾花甲，行动渐缓，每次你回家都会提前几天把被褥晒得暖融融。";
  } else {
    status = "已安详走完操劳的一生，留给后辈的是无尽的温厚与思念。";
  }
  return { age, status };
}

// 严格时序同胞状态函数（彻底杜绝 0~2 岁就出现 3 岁弟弟的逻辑悖论，且绝不使用“弟弟/妹妹”这种斜杠AI味文案）
export function getSiblingDynamicStatus(
  siblingType: string,
  currentAge: number
): { label: string; status: string } {
  if (siblingType === "only_child") {
    return {
      label: "独生子女",
      status:
        currentAge < 18
          ? "独生子女，独享父母全部关爱与家庭资源，也独自承载着全家沉甸甸的期望。"
          : "独生子女，未来父母的看护、医疗与养老责任全由你一人承担，经不起大的闪失。"
    };
  }

  if (siblingType === "younger_brother") {
    if (currentAge < 3) {
      return {
        label: "尚无同胞（母亲正怀二胎）",
        status: "此时你是家中独苗，独享父母全部关照；母亲腹中正怀着二胎弟弟。"
      };
    }
    if (currentAge === 3) {
      return {
        label: "弟弟（刚满月）",
        status: "弟弟刚刚降生不久，全家人围着襁褓团团转，父母反复叮嘱你要懂事让着弟弟。"
      };
    }
    const broAge = currentAge - 3;
    if (currentAge < 12) {
      return {
        label: `弟弟（现年${broAge}岁）`,
        status: `弟弟今年${broAge}岁，正在读小学，每天跟在你身后，父母常嘱咐你凡事多让着弟弟。`
      };
    }
    if (currentAge < 18) {
      return {
        label: `弟弟（现年${broAge}岁）`,
        status: `弟弟今年${broAge}岁，正在读初中，家里的零食和学费开支逐渐向弟弟倾斜。`
      };
    }
    if (currentAge < 25) {
      return {
        label: `弟弟（现年${broAge}岁）`,
        status: `弟弟今年${broAge}岁，面临求职起步与成人择业，父母常在电话里盼着你在外多帮衬指点。`
      };
    }
    if (currentAge < 40) {
      return {
        label: `弟弟（现年${broAge}岁）`,
        status: `弟弟今年${broAge}岁，已在老家或省城成家立业，时常与你通电话互诉成年人的冷暖与谋生不易。`
      };
    }
    if (currentAge < 55) {
      return {
        label: `弟弟（现年${broAge}岁）`,
        status: `弟弟今年${broAge}岁，步入中年，共同分担着照顾年迈长辈的医疗与探望责任，逢年过节彼此守望。`
      };
    }
    return {
      label: `弟弟（现年${broAge}岁）`,
      status: `弟弟亦是白发苍苍步入退休之年，偶尔电话长谈，回忆起小时候的许多往事与故土炊烟。`
    };
  }

  if (siblingType === "younger_sister") {
    if (currentAge < 3) {
      return {
        label: "尚无同胞（母亲正怀二胎）",
        status: "此时你是家中独苗，独享父母全部关照；母亲腹中正怀着二胎妹妹。"
      };
    }
    if (currentAge === 3) {
      return {
        label: "妹妹（刚满月）",
        status: "妹妹刚刚降生不久，全家人围着襁褓细心照看，家里平添了许多欢声笑语。"
      };
    }
    const sisAge = currentAge - 3;
    if (currentAge < 12) {
      return {
        label: `妹妹（现年${sisAge}岁）`,
        status: `妹妹今年${sisAge}岁，乖巧可爱，常常拉着你的衣角要你带她玩。`
      };
    }
    if (currentAge < 18) {
      return {
        label: `妹妹（现年${sisAge}岁）`,
        status: `妹妹今年${sisAge}岁，正在念初中，父母时常督促你要给她树立一个好榜样。`
      };
    }
    if (currentAge < 25) {
      return {
        label: `妹妹（现年${sisAge}岁）`,
        status: `妹妹今年${sisAge}岁，步入职场独立生活，与你在异地经常通电话互诉心事与小秘密。`
      };
    }
    if (currentAge < 40) {
      return {
        label: `妹妹（现年${sisAge}岁）`,
        status: `妹妹今年${sisAge}岁，已成家立业有了自己的小家庭，时常寄来当地特产，惦记着彼此。`
      };
    }
    if (currentAge < 55) {
      return {
        label: `妹妹（现年${sisAge}岁）`,
        status: `妹妹今年${sisAge}岁，人到中年愈发体谅亲情珍贵，常回老家帮衬照料长辈身体。`
      };
    }
    return {
      label: `妹妹（现年${sisAge}岁）`,
      status: `妹妹已是慈祥温厚的老太太，逢年过节儿孙满堂，仍亲切地唤着你当年的乳名。`
    };
  }

  if (siblingType === "elder_sister") {
    const sisAge = currentAge + 4;
    if (currentAge < 12) {
      return {
        label: `姐姐（现年${sisAge}岁）`,
        status: `姐姐比你大4岁（现年${sisAge}岁），每天放学后默默帮你检查作业、带你回家。`
      };
    }
    if (currentAge < 18) {
      return {
        label: `姐姐（现年${sisAge}岁）`,
        status: `姐姐已初中/高中毕业外出务工，每月将微薄工资寄回家贴补家用，时常嘱咐你安心念书。`
      };
    }
    if (currentAge < 40) {
      return {
        label: `姐姐（现年${sisAge}岁）`,
        status: `姐姐在老家成家立业，在父母身边尽孝，替你在故乡分担着照顾老人的操劳与牵挂。`
      };
    }
    if (currentAge < 55) {
      return {
        label: `姐姐（现年${sisAge}岁）`,
        status: `姐姐步入中老年，始终是你最温暖的避风港，只要回老家总有她为你热好的一桌饭菜。`
      };
    }
    return {
      label: `姐姐（现年${sisAge}岁）`,
      status: `姐姐年近古稀，身体略有小恙，拉着你的手总有说不完的嘱托与温情。`
    };
  }

  if (siblingType === "elder_brother") {
    const broAge = currentAge + 3;
    if (currentAge < 12) {
      return {
        label: `哥哥（现年${broAge}岁）`,
        status: `哥哥比你大3岁（现年${broAge}岁），带着你在街坊和大院里玩耍，在外头替你出头。`
      };
    }
    if (currentAge < 18) {
      return {
        label: `哥哥（现年${broAge}岁）`,
        status: `哥哥正在读高中或职校，性格逐渐沉稳，开始分担家里的体力活。`
      };
    }
    if (currentAge < 40) {
      return {
        label: `哥哥（现年${broAge}岁）`,
        status: `哥哥在老家或省城成家打拼，做事稳重，共同承担起未来长辈的赡养义务。`
      };
    }
    if (currentAge < 55) {
      return {
        label: `哥哥（现年${broAge}岁）`,
        status: `哥哥步入中年，是老家顶梁柱，替你操持着家乡的诸多人情往来与老人看护。`
      };
    }
    return {
      label: `哥哥（现年${broAge}岁）`,
      status: `哥哥步入花甲之年，两鬓斑白，常在电话里与你回忆年轻时的酸甜岁月。`
    };
  }

  // 默认 / 夹心层
  return {
    label: "夹心层同胞",
    status:
      currentAge < 15
        ? "上有比你年长的哥姐，下有年幼的弟妹，你在中间最早就学会了察言观色与自我独立。"
        : "兄弟姐妹各自成家立业，逢年过节在父母家相聚回忆当年的艰辛。"
  };
}

// 用户认可的 5 维心智与社会特质定性评语（左侧状态仪表板使用）
export function getInferiorityDesc(val: number): string {
  if (val >= 60) return "深刻自卑敏感";
  if (val >= 35) return "自尊内敛";
  return "坦荡从容";
}

export function getAcademicDesc(val: number): string {
  if (val >= 60) return "应试做题拔尖";
  if (val >= 35) return "普高普通水平";
  return "侧重实用技能";
}

export function getKinshipDesc(val: number): string {
  if (val >= 60) return "家庭包袱重";
  if (val >= 35) return "隐性牵挂";
  return "自我独立";
}

export function getIndependenceDesc(val: number): string {
  if (val >= 60) return "高度叛逆独立";
  if (val >= 35) return "清醒游离";
  return "规矩顺从";
}

export function getResilienceDesc(val: number): string {
  if (val >= 60) return "生存能力极强";
  if (val >= 35) return "踏实耐磨";
  return "抗压偏弱";
}

export const AGE_EVENT_POOLS: Record<number, LifeEventNode[]> = {
  // --------------------------------------------------------------------------
  // 0岁 · 降生（3 种不同地理与阶层背景的降生画卷）
  // --------------------------------------------------------------------------
  0: [
    {
      id: "age_0_county",
      age: 0,
      stageName: "婴儿期 · 0岁",
      title: "初临人间与第一声啼哭",
      scene:
        "秋风渐起的黄昏，你出生在{hospital}泛黄的被单上。助产士轻轻拍打你的后背，你发出第一声响亮的啼哭。父亲在产房外来回踱步，手里捏着被汗水浸湿的缴费单；母亲虚弱地将你揽入怀中，为你取下伴随一生的名字。这一年，你正式来到{cityOrCounty}。",
      type: "natural",
      naturalDelta: { health: 5, happiness: 5 },
      naturalTags: ["初临人间", "乡土落脚"]
    },
    {
      id: "age_0_industrial",
      age: 0,
      stageName: "婴儿期 · 0岁",
      title: "雪夜红砖病房与机器轰鸣",
      scene:
        "大雪漫天的隆冬清晨，你出生在{hospital}的老旧病房里。窗外红砖大烟囱喷出滚滚白汽，供热蒸汽管道不时发出轰鸣。接生大夫向门外报喜，全车间的叔伯工友凑了几个红包与一篮红鸡蛋。你在{cityOrCounty}落户人间。",
      type: "natural",
      naturalDelta: { health: 5, happiness: 5 },
      naturalTags: ["初临人间", "工矿血脉"]
    },
    {
      id: "age_0_immigrant",
      age: 0,
      stageName: "婴儿期 · 0岁",
      title: "南方多雨之夜与握手楼租屋",
      scene:
        "南方闷热多雨的午夜，你在{hospital}呱呱坠地。隔壁冲压车间的震动隔着薄墙传来。父亲骑着借来的三轮车载着母亲和你穿过狭窄的握手楼巷道。在异乡漂泊的茫然中，你的到来成了这间出租屋里唯一的期盼。",
      type: "natural",
      naturalDelta: { health: 5, happiness: 5 },
      naturalTags: ["初临人间", "异乡客籍"]
    }
  ],

  // --------------------------------------------------------------------------
  // 1岁 · 幼芽期（学步与生活痕迹）
  // --------------------------------------------------------------------------
  1: [
    {
      id: "age_1_steps",
      age: 1,
      stageName: "幼芽期 · 1岁",
      title: "摇晃的脚步与学步的晨光",
      scene:
        "在老旧木门槛与水磨石地面之间，你松开母亲的手，摇摇晃晃迈开了人生的第一步。阳光斜照进简朴的堂屋，院落里传来邻居家炒菜的滋滋声与远处的市井人声。你摔倒了又自己爬起来，引得疲惫归家的父亲脸上露出了难得的笑意。",
      type: "natural",
      naturalDelta: { health: 5, cognition: 5, resilience: 5 },
      naturalTags: ["周岁学步"]
    },
    {
      id: "age_1_scar",
      age: 1,
      stageName: "幼芽期 · 1岁",
      title: "门槛磕绊与母亲手心的草木灰",
      scene:
        "刚学会踉跄迈步的你，被高高的老木门槛绊倒，下巴重重磕在水泥地上淌血。家里没有碘酒，母亲含着眼泪找了点草木灰按在伤口上，把你紧紧抱在怀里哄了一下午。下巴那道浅浅的疤痕，成了你身上最初的生命印记。",
      type: "natural",
      naturalDelta: { resilience: 10, kinshipGuilt: 5 },
      naturalTags: ["顽强学步", "粗粝磨砺"]
    },
    {
      id: "age_1_quarrel",
      age: 1,
      stageName: "幼芽期 · 1岁",
      title: "学步车转动与摔碎的搪瓷碗",
      scene:
        "你在塑料学步车里蹬着腿打转。父母因为下个月的房租与化肥钱在厨房轻声争吵，母亲抹着眼泪摔了搪瓷碗。碎瓷片滑到你脚边，你吓得哇哇大哭起来，争吵声骤停，父亲默默蹲在地上把碎片一片片捡走。",
      type: "natural",
      naturalDelta: { inferiority: 5, resilience: 5, happiness: -5 },
      naturalTags: ["生计早识"]
    }
  ],

  // --------------------------------------------------------------------------
  // 2岁 · 启言期（言语与世相）
  // --------------------------------------------------------------------------
  2: [
    {
      id: "age_2_bike",
      age: 2,
      stageName: "启言期 · 2岁",
      title: "牙牙学语与二八大杠自行车",
      scene:
        "你开始口齿不清地学会喊‘爸爸、妈妈’。每天傍晚，你坐在父亲二八大杠自行车的斜梁小藤椅上吹着晚风。街边煤炉上水壶冒着白汽，老旧收音机里放着那个年代的歌，父亲的大手握着车把，背影宽厚而踏实。",
      type: "natural",
      naturalDelta: { happiness: 5, social: 5 }
    },
    {
      id: "age_2_stall",
      age: 2,
      stageName: "启言期 · 2岁",
      title: "菜市场纸皮箱里的童年天地",
      scene:
        "父母在集贸市场摆摊理货，你坐在摊位下的废纸箱里玩塑料瓶盖，听着周围讨价还价的喧闹声。过路的熟客随手塞给你一块水果糖，你含在嘴里甜了一整天，早早习惯了市井人间的吵闹与烟火气。",
      type: "natural",
      naturalDelta: { social: 10, resilience: 5 }
    },
    {
      id: "age_2_duck",
      age: 2,
      stageName: "启言期 · 2岁",
      title: "田埂泥泞与追逐灰鸭",
      scene:
        "你迈着小短腿跟在奶奶身后去菜地挑野菜，在田埂上摇晃追逐一只灰鸭子，跌在软泥里成了泥娃娃。奶奶没有骂你，坐在田埂边洗去你脚上的泥巴，塞给你一颗蒸热的红薯，满嘴香甜。",
      type: "natural",
      naturalDelta: { happiness: 10, health: 5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 3岁 · 启蒙期（初识集体与别离）
  // --------------------------------------------------------------------------
  3: [
    {
      id: "age_3_nursery",
      age: 3,
      stageName: "启蒙期 · 3岁",
      title: "托儿所铁栅栏与最初的集体生活",
      scene:
        "你被送到了街道托儿所。铁栅栏门合上的瞬间，你哭得撕心裂肺。在一屋子抽泣的同龄孩子中，你第一次发现世界并非围绕自己旋转。你学会了用小铁勺吃蒸蛋，排队在小木床上午睡，初次感知到家庭之外的规则。",
      type: "natural",
      naturalDelta: { social: 10, cognition: 10, happiness: -5 },
      naturalTags: ["初识集体"]
    },
    {
      id: "age_3_leftbehind",
      age: 3,
      stageName: "启蒙期 · 3岁",
      title: "村口尘土与远去的大巴车",
      scene:
        "过完春节，父母背上大编织袋准备南下打工。村口的大巴车发动前，母亲红着眼眶塞给你一包小饼干，把你托付给爷爷奶奶。大巴车喷出浓黑的尾气开远，你含着泪站在扬起的黄色尘土里用力挥手。",
      type: "natural",
      naturalDelta: { kinshipGuilt: 10, resilience: 10, happiness: -10 },
      naturalTags: ["留守守望"]
    },
    {
      id: "age_3_workshop",
      age: 3,
      stageName: "启蒙期 · 3岁",
      title: "裁缝铺布堆里的捉迷藏",
      scene:
        "家里没人看管，母亲只能偷偷把你带到工作的小裁缝铺。你趴在裁缝台底下的布碎堆里搭积木，缝纫机的嗒嗒声成了你幼年最熟悉的背景音。客人们逗你玩，你眨巴着眼睛学着大人的腔调说话。",
      type: "natural",
      naturalDelta: { social: 10, cognition: 5, resilience: 5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 4岁 · 疾苦与意外
  // --------------------------------------------------------------------------
  4: [
    {
      id: "age_4_fever",
      age: 4,
      stageName: "疾苦期 · 4岁",
      title: "深夜暴雨与医院急诊的吊水",
      scene:
        "一场突如其来的急性肺炎让你高烧到近四十度。深夜暴雨如注，父亲披着破塑料布骑车推着你，母亲坐在后座死死护住你的前额，连夜赶往{hospital}急诊。冰凉的药水在玻璃瓶里一滴滴落入血管，你第一次对病痛与家庭的无助有了朦胧的感知。",
      type: "natural",
      naturalDelta: { health: -5, kinshipGuilt: 10, resilience: 5 }
    },
    {
      id: "age_4_coin",
      age: 4,
      stageName: "疾苦期 · 4岁",
      title: "吞咽硬币与倒提拍背的惊魂",
      scene:
        "玩耍时你误吞了一枚生锈的硬币卡在喉咙，憋得满脸通红。父亲吓得脸色惨白，一把倒提着你的双脚用力拍打后背。硬币当啷一声吐在地板上，父母瘫坐在地上抱头痛哭，整整一周都不敢让你离开视线。",
      type: "natural",
      naturalDelta: { resilience: 10, kinshipGuilt: 5 }
    },
    {
      id: "age_4_fight",
      age: 4,
      stageName: "疾苦期 · 4岁",
      title: "抢铁皮青蛙与弄堂妇女的舌战",
      scene:
        "你在院子里和邻居家大孩子抢铁皮青蛙被推倒磕破了手肘。母亲冲出来护着你，和邻居妇人站在窄巷里尖声理论了半天。你躲在母亲发抖的围裙后面，第一次体会到成人世界为了尊严与孩子的寸土不让。",
      type: "natural",
      naturalDelta: { social: 5, inferiority: 5, resilience: 5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 5岁 · 学前清晰记忆
  // --------------------------------------------------------------------------
  5: [
    {
      id: "age_5_watermelon",
      age: 5,
      stageName: "学前期 · 5岁",
      title: "弄堂水门汀与最早的清晰记忆",
      scene:
        "你拥有了这一生最早能够长久保留的清晰记忆：夏天的傍晚，水泥地面被泼上凉水散发出特有的泥土气息。头顶吊扇嘎吱作响，母亲在厨房切开西瓜，父亲在门边修理自行车链条。你蹲在门槛上看蚂蚁搬家，以为日子会一直这样从容平静。",
      type: "natural",
      naturalDelta: { happiness: 10, cognition: 5 }
    },
    {
      id: "age_5_factory_visit",
      age: 5,
      stageName: "学前期 · 5岁",
      title: "父亲汗湿的工装与机床火花",
      scene:
        "父亲牵着你的手第一次走进他干活的机加工车间。高耸的天车、飞溅的金属火花和刺鼻的切削油味让你既害怕又新奇。工头路过拍了拍父亲的肩膀，父亲弯着腰赔笑递烟。你第一次发现，每天给你带包子的父亲，在外面竟是如此辛苦而隐忍。",
      type: "natural",
      naturalDelta: { cognition: 10, kinshipGuilt: 10 }
    },
    {
      id: "age_5_five_cents",
      age: 5,
      stageName: "学前期 · 5岁",
      title: "跑腿换来的平整五毛纸币",
      scene:
        "帮杂货铺邻居跑腿送了一趟醋，老板奖给你一张平整的五毛钱纸币。你紧紧攥在手心里，手心全是汗。站在小卖部门口的大玻璃罐前挑了半天，终于买下一支七彩冰棒。你第一次尝到靠自己劳动换来报酬的自豪感。",
      type: "natural",
      naturalDelta: { happiness: 5, social: 5, savings: 1 }
    }
  ],

  // --------------------------------------------------------------------------
  // 6岁 · 小学一年级（重大抉择关隘 · 3 种不同情境）
  // --------------------------------------------------------------------------
  6: [
    {
      id: "age_6_pioneers",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "第一批少先队入队仪式与大红领巾",
      scene:
        "新学期少先队入队仪式在全校操场隆重举行。高年级的大队长手捧鲜红的红领巾走到第一排，全班只有五个表现最优异的名额能第一批戴上红领巾，所有人的目光都聚焦在主席台前。",
      type: "choice",
      choices: [
        {
          stanceBadge: "苦修争优",
          text: "挺起胸膛目不斜视大声宣誓，如愿第一批戴上大红领巾立志拔尖！",
          detail: "把宣誓词背得滚瓜烂熟，在掌声中戴上荣誉，暗自立下要做体制内第一标兵的雄心。",
          reaction: "你把红领巾叠得整整齐齐，但为了保持这种拔尖的姿态，你过早告别了无忧无虑的玩耍。",
          delta: { academicCapital: 8, cognition: 6, health: -5, happiness: -5 },
          addTags: ["少年志气", "争先争优"]
        },
        {
          stanceBadge: "草莽仗义",
          text: "将多带的一支铅笔借给旁边急哭的同学，并悄悄教他系红领巾！",
          detail: "比起台上的虚名荣誉，你更看重身边同伴的难处，用朴素的善良赢得最铁的挚友。",
          reaction: "同学破涕为笑，老师投来赞许的目光，你们成了形影不离的一生莫逆之交。",
          delta: { social: 12, happiness: 10, inferiority: -10 },
          addTags: ["善良同理", "童年挚友"]
        },
        {
          stanceBadge: "旷野哲思",
          text: "站在后排微风中，专心看操场老白杨树上的花喜鹊筑巢，波澜不惊！",
          detail: "过早拥有一份超越同龄人的超脱与淡然，不热衷于仪式化的追捧，在天地微风中自得其乐。",
          reaction: "你在属于自己的角落里默默观察集体规则，保全了一份难能可贵的通透与松弛神性。",
          delta: { resilience: 8, rebellion: 8, happiness: 10, cognition: 6 },
          addTags: ["从容内省", "清醒独处"]
        }
      ]
    },
    {
      id: "age_6_chalkboard",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "黑板粉笔字与被叫上讲台做算术题",
      scene:
        "数学课上，老师在黑板上用红色粉笔写下一道带进位的十以内加减法，目光扫过全班每个缩着脑袋的新生：‘谁敢上来写？’全班鸦雀无声，同桌紧张得连呼吸都放慢了。",
      type: "choice",
      choices: [
        {
          stanceBadge: "考场锋芒",
          text: "高高举手快步上台，不仅算对更推导出双重乘除简便解法！",
          detail: "在全班惊叹的目光中展露出惊人的数字敏感与做题天赋，当场拿下免修特权。",
          reaction: "数学老师在作业本上画了大红花，任命你为课代表，你稳稳跨出了应试做题第一步。",
          delta: { academicCapital: 10, cognition: 8, happiness: 10, health: -5 },
          addTags: ["算术天才", "展露头角"]
        },
        {
          stanceBadge: "商感萌芽",
          text: "在课桌下自编算盘口诀，教前后桌快速心算并换取麦芽糖与弹珠！",
          detail: "极早发现知识交换的商业价值，建立起自己在小团体里的技术壁垒与人望。",
          reaction: "前后桌同学心算飞速进步，你每天课桌抽屉里都堆满了小伙伴孝敬的零食与小玩意。",
          delta: { savings: 20, social: 10, cognition: 8, happiness: 8 },
          addTags: ["商业启蒙", "孩子王"]
        },
        {
          stanceBadge: "旷野创想",
          text: "在课本空白处画出精彩幽默的连环四格漫画，逗得全班憋笑！",
          detail: "天马行空的艺术想象力与松弛天性，自小构筑了丰饶独特的精神乐园。",
          reaction: "连数学老师课后看了你的画本也忍不住笑出声，夸你‘思维极其活跃，必有大创造力’。",
          delta: { happiness: 12, social: 8, rebellion: 6, cognition: 6 },
          addTags: ["艺术灵动", "松弛乐天"]
        }
      ]
    },
    {
      id: "age_6_snack_shop",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "校门口小卖部贴纸与五毛零花钱诱惑",
      scene:
        "校门口小卖部门前挤满了小学生，彩色玻璃罐里的酸梅粉、大白兔奶糖和闪光孙悟空贴纸让人挪不开眼。同桌掏出两张纸币买了一大堆零食，你在旁边捏着母亲给买橡皮的五毛硬币。",
      type: "choice",
      choices: [
        {
          stanceBadge: "自律积蓄",
          text: "咽下口水快步走开，去文具摊买下实用橡皮擦，余钱小心存入铁罐！",
          detail: "用稚嫩的自制力抵御即时享乐，早早树立起克制自律与长期积蓄的习惯。",
          reaction: "看着铁罐里叮当响的硬币，你体会到掌控自己欲望的踏实感，心性坚定。",
          delta: { resilience: 8, cognition: 6, savings: 5 },
          addTags: ["克制自律", "早熟自持"]
        },
        {
          stanceBadge: "市井博弈",
          text: "和同伴在泥地跳格子打赌，凭高超手艺不花一分钱赢回一大把稀有贴纸！",
          detail: "凭身手和聪明敏捷在街坊孩童中站稳脚跟，成为校门口公认的游戏霸主。",
          reaction: "全班同学纷纷拜你为师学技巧，你甚至开始用贴纸换取铅笔，商道大开！",
          delta: { social: 12, resilience: 8, savings: 15, happiness: 8 },
          addTags: ["身手敏捷", "街头霸主"]
        },
        {
          stanceBadge: "率真童趣",
          text: "买下最霸气的西游记大圣闪光贴纸贴在胸口，尽情享受纯粹的童年欢愉！",
          detail: "‘童年就这一次，我也想拥有一张属于自己的漂亮贴纸！’率性豁达不内耗。",
          reaction: "小伙伴们围着你羡慕不已，你昂首挺胸扮演齐天大圣，收获了一整天的阳光！",
          delta: { happiness: 14, social: 8, health: 10 },
          addTags: ["纯真童乐", "阳光天性"]
        }
      ]
    },
    {
      id: "age_6_rain",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "暴雨天校门外水洼飞溅与破油纸伞",
      scene:
        "放学时天空骤变，倾盆大雨倾泻而下。校门口站满了打着漂亮大黑伞接孩子的家长，城里同学一个个被牵着手接走。你没有雨伞，裤脚被泥水溅得湿透，站在屋檐下看着天色渐晚。",
      type: "choice",
      choices: [
        {
          stanceBadge: "野草骨气",
          text: "把书包紧紧护在胸前，冒着暴雨在积水路上一路狂奔，书本滴水未湿！",
          detail: "像一棵任凭风吹雨打的野草，不怨天尤人，靠双脚冲破风雨，守护求学的课本。",
          reaction: "虽然浑身湿透，但课本一尘不染，母亲心疼地熬姜汤为你裹进棉被，你眼神无比坚毅。",
          delta: { resilience: 10, academicCapital: 6, health: -5, happiness: 10 },
          addTags: ["风雨兼程", "野草骨气"]
        },
        {
          stanceBadge: "豁达乐观",
          text: "邀请同样没伞的同学一起在门卫传达室避雨，开讲三国连环画故事！",
          detail: "天性豁达开朗，无论身处何种窘境都能找到生活的乐趣，聚集起满满的温情。",
          reaction: "看门大爷听得入迷还给你们泡了热麦乳精，凄风苦雨变成了温暖一生的避风港记忆。",
          delta: { social: 12, happiness: 12, cognition: 8 },
          addTags: ["逆境生花", "豁达融洽"]
        },
        {
          stanceBadge: "深情依恋",
          text: "坐在父亲顶雨赶来的二八大杠雨衣怀里，贴着温热胸膛听雨声！",
          detail: "看着父亲湿透的双肩与混合汗水的雨水，体会到父爱如山沉甸甸的安全感。",
          reaction: "你紧紧抱住父亲粗壮的腰，贫瘠的家庭因为至真至浓的亲情而坚不可摧。",
          delta: { kinshipGuilt: 10, happiness: 10, health: 10 },
          addTags: ["父爱如山", "家庭温情"]
        }
      ]
    },
    {
      id: "age_6_comics",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "课桌抽屉里的三国连环画与故事大王",
      scene:
        "你在废品收购站淘到一本残破但画风精美的《三国演义》连环画，用旧挂历纸细心包好了书皮。课间休息时，你的课桌周围挤满了探头探脑想要借看的同学。",
      type: "choice",
      choices: [
        {
          stanceBadge: "走廊评书",
          text: "在课桌上摆水杯开讲长坂坡赵子龙单骑救主，口若悬河聚拢全班！",
          detail: "极强的表达欲与公众演说口才展露无遗，迅速成为全班公认的‘故事大王’。",
          reaction: "全班同学听得如痴如醉，连班主任也驻足带头鼓掌，你的人气如日中天！",
          delta: { social: 14, cognition: 8, happiness: 10 },
          addTags: ["演说领袖", "故事大王"]
        },
        {
          stanceBadge: "图书出租",
          text: "每次外借收取一分钱或一颗水果糖，三天回本并扩充成班级图书角！",
          detail: "敏锐发现精神消费的商业逻辑，以微薄资本撬动图书流转，建立起校园小图书馆。",
          reaction: "你成了班里最有书读且零钱不断的小能手，连高年级同学都慕名前来借书！",
          delta: { savings: 50, cognition: 10, social: 10 },
          addTags: ["商业启蒙", "图书管家"]
        },
        {
          stanceBadge: "闭门临摹",
          text: "躲在窗边拿薄纸细致临摹关公绣像与刀法，自学工笔白描透视！",
          detail: "耐得住寂寞，把喧嚣关在门外，在黑白线条与传统画法中沉潜钻研，领悟美学。",
          reaction: "老师将你的白描画作贴在教室后黑板展示，夸你‘少年心性定，必有大造诣’。",
          delta: { academicCapital: 8, cognition: 10, resilience: 8, happiness: 6 },
          addTags: ["书画入微", "沉潜钻研"]
        }
      ]
    },
    {
      id: "age_6_lunchbox",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "校门口的午餐盒与方言窃笑",
      scene:
        "开学第一周，周围城里的同桌掏出印着卡通图案的双层不锈钢保温饭盒，里面是切好的水果和煎肉饼；而你书包里是用旧塑料罐改装的饭盒，装着母亲炒好的咸菜土豆丝。班主任点名时，你浓重的乡音引来全班一阵窃笑。",
      type: "choice",
      choices: [
        {
          stanceBadge: "傲骨发愤",
          text: "嚼粗粮不慕虚华，抓紧午休时间把当天的生字帖工整练完！",
          detail: "把匮乏化作磨砺自尊的磨刀石，坚信唯有满分卷面才能赢得真正的体面与敬重。",
          reaction: "期末你的字帖贴在年级大黑板展出，老师夸你‘心性坚韧，定成大器’，自尊傲立。",
          delta: { academicCapital: 8, cognition: 6, resilience: 8, happiness: -5 },
          addTags: ["自尊傲骨", "发奋图强"]
        },
        {
          stanceBadge: "市井豪迈",
          text: "筷子一插大方把秘制咸菜分给全班：“我家自腌的，比肉还香！”",
          detail: "坦荡无畏，用纯正的人格魅力与豪爽击碎冷嘲热讽，在欢笑声中结交一群死党。",
          reaction: "城里同桌吃得满嘴流油直呼过瘾，第二天纷纷带自家好菜与你互换，融成一片！",
          delta: { social: 12, happiness: 10, resilience: 8, inferiority: -8 },
          addTags: ["坦荡大方", "草莽豪情"]
        },
        {
          stanceBadge: "商业调配",
          text: "用自家爽脆酱瓜跟同桌换来稀罕的进口威化饼与画本，资源互通！",
          detail: "敏锐察觉各自所需，用信息差和资源调配化解尴尬，初尝以物易物的商业甜头。",
          reaction: "你成了班级物资调配小能手，不仅天天吃上新鲜零食，还攒下了一笔铅笔文具储备。",
          delta: { savings: 30, cognition: 10, social: 8, happiness: 8 },
          addTags: ["资源调配", "商业嗅觉"]
        }
      ]
    },
    {
      id: "age_6_seats",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "讲台前排座与第一任班干部竞选",
      scene:
        "开学排座次，班主任站在黑板前审视着每一个新生，准备挑出第一批班干部。城里干部子弟穿戴整齐坐在前排跃跃欲试，你坐在中间位置，心跳如擂鼓，手心里满是细汗。",
      type: "choice",
      choices: [
        {
          stanceBadge: "主动争先",
          text: "鼓起勇气高高举手，大声背诵唐诗自荐当学习委员！",
          detail: "渴望通过过硬的才学表现赢取老师关注，用成绩打破出身的局限与偏见。",
          reaction: "老师非常惊喜，当场任命你为常任学习委员，你第一次体会到凭实力赢得尊重的喜悦。",
          delta: { academicCapital: 10, cognition: 8, resilience: 6, inferiority: -10 },
          addTags: ["领头拔尖", "做题苗子"]
        },
        {
          stanceBadge: "操场霸主",
          text: "拿出从家里带来的五彩弹珠，课间迅速聚拢全班呼朋引伴称兄道弟！",
          detail: "比起规规矩矩的体制班干部，你更喜欢在操场旷野上当指挥若定的孩子王。",
          reaction: "下课铃一响全班男生都围着你转，你成了校园里声望最高的领袖，老师对你又爱又敬！",
          delta: { social: 14, happiness: 10, resilience: 8 },
          addTags: ["操场霸主", "豪气天成"]
        },
        {
          stanceBadge: "窗边沉思",
          text: "选靠窗倒数第二排安坐，享受自由看杂书、看天边飞鸟的独立精神领地！",
          detail: "不热衷于世俗权力的争夺，在角落里自得其乐，构筑起独立而丰饶的精神世界。",
          reaction: "你拥有了别人羡慕不来的从容闲暇，课外杂书读了一本又一本，眼界远超同龄孩童。",
          delta: { happiness: 12, cognition: 10, rebellion: 8 },
          addTags: ["窗边沉思", "精神自足"]
        }
      ]
    },
    {
      id: "age_6_fee",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "借读费未清与办公室门外的等待",
      scene:
        "因为户口不在学区，借读费差了三百块没缴齐。报到当天，班主任将你和母亲拦在了教研室门外。母亲手里攥着布包，在过往老师好奇的目光中涨红了脸，不住地躬身赔笑说好话。",
      type: "choice",
      choices: [
        {
          stanceBadge: "书生骨气",
          text: "站在母亲身旁朗声背诵课文，以出类拔萃的才学打动主任特批缓缴！",
          detail: "用清脆响亮的读书声为窘迫的母亲筑起尊严的防线，展现出无可挑剔的求学天资。",
          reaction: "教导主任路过赞叹‘这娃是个读书的料’，大笔一挥特批免除借读滞纳金缓交入学！",
          delta: { academicCapital: 10, cognition: 8, resilience: 8, inferiority: -10 },
          addTags: ["以读卫尊", "神童资质"]
        },
        {
          stanceBadge: "手艺抵资",
          text: "掏出自己雕刻的精美木刻生肖和帮门卫修好的手电筒折抵勤工！",
          detail: "“老师，我能帮学校修课桌修理水龙头！”超常的动手天赋让校领导赞叹不已破格录用。",
          reaction: "校长当场宣布让你担任红领巾劳动标兵，免除了全部借读费，母亲含泪欣慰不已！",
          delta: { savings: 50, social: 10, resilience: 10, cognition: 8 },
          addTags: ["动手立身", "巧手破局"]
        },
        {
          stanceBadge: "旷野温情",
          text: "紧紧牵着母亲的手在夕阳台阶温声安慰，成为母亲最坚实的依靠！",
          detail: "“妈，咱不丢人，我往后一定出息让你过上好日子！”用稚嫩却坚定的怀抱温暖母亲。",
          reaction: "母亲抹去眼泪紧紧搂住你，家庭的凝聚力与深情在患难中被淬炼得无坚不摧！",
          delta: { happiness: 14, familySavings: 1000, resilience: 10, health: 10 },
          addTags: ["孝道暖炉", "深情淬炼"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 7岁 · 小学二年级
  // --------------------------------------------------------------------------
  7: [
    {
      id: "age_7_scores",
      age: 7,
      stageName: "小学二年级 · 7岁",
      title: "期末双百与斑驳石灰墙上的体面",
      scene:
        "期末考试你考了双百，班主任把大红奖状发到你手中。回到家，父亲默默找来浆糊，小心翼翼把奖状贴在客厅最显眼的石灰墙上。那晚饭桌上破天荒多了一盘煎荷包蛋。你第一次体会到‘成绩能为贫寒的家庭换来体面’。",
      type: "natural",
      naturalDelta: { cognition: 10, academicCapital: 10, happiness: 10 },
      naturalTags: ["奖状记忆"]
    },
    {
      id: "age_7_cards",
      age: 7,
      stageName: "小学二年级 · 7岁",
      title: "泥地上拍洋画与满手黑灰",
      scene:
        "放学后的泥土地上，一群男孩子趴在地上拍洋画。你用硬纸壳自制的卡片无往不利，赢了厚厚一大摞塞在铁皮铅笔盒里。回家时衣服前胸全磨蹭黑了，母亲拧着你耳朵骂你皮猴，但晚饭依然把最大块的排骨夹到你碗里。",
      type: "natural",
      naturalDelta: { social: 10, happiness: 10, health: 5 }
    },
    {
      id: "age_7_tv",
      age: 7,
      stageName: "小学二年级 · 7岁",
      title: "二手显像管彩电与满屋西游记",
      scene:
        "家里咬牙买了一台二手显像管黑白/彩色电视机，大屁股电视架在木柜上。傍晚一开播《西游记》，邻居家的小孩挤了满满一屋子，连门槛上都坐满了人。你成了院里最受羡慕的孩子，心里充满了小小的虚荣与骄傲。",
      type: "natural",
      naturalDelta: { social: 10, happiness: 10 }
    }
  ],

  // --------------------------------------------------------------------------
  // 8岁 · 小学三年级 (Choice) - 班费、校服与贫穷的第一次当众示众
  // --------------------------------------------------------------------------
  8: [
    {
      id: "age_8_fees_uniform",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "班费、新校服与贫穷的第一次当众示众",
      scene:
        "班主任在讲台上敲着黑板擦点名：“全班统一定制春季运动服和实验教辅，八十五块钱，明早收齐。谁没交，周一升旗仪式就不用排进队伍了。”放学回家，土灶台前母亲正在数毛票，父亲在为下个月的化肥钱跟舅舅低三下四打电话。你捏着那张皱巴巴的缴费通知单，站在厨房门槛边，脚趾把单薄的塑料凉鞋抠得紧紧的。",
      type: "choice",
      choices: [
        {
          stanceBadge: "虚荣防卫",
          text: "硬着头皮向家里要钱，哭闹说‘不交老师要在全班点名罚站’！",
          detail: "儿童天然的羞耻防卫本能。你本能地害怕在六十个同龄人面前被当众剥光尊严。",
          reaction: "母亲叹了口气，当晚把你补身体的鸡蛋钱抠了出来给你凑齐。你在学校保住了面子，但清晨你看见母亲就着白开水吞干馒头。",
          delta: { happiness: 5, inferiority: 10, kinshipGuilt: 6, familySavings: -85 },
          addTags: ["内疚型虚荣", "面子羁绊"]
        },
        {
          stanceBadge: "习惯低头",
          text: "把缴费单揉碎藏在床底下，对老师谎称‘家里忘了，过几天交’",
          detail: "早熟的懂事与心疼父母。‘爸妈已经够难了，我不能再给家里添乱。’",
          reaction: "周一升旗仪式，全班同学都穿着簇新的蓝色校服，只有你穿着洗得发白、袖口短了一截的旧衣服罚站队伍最末尾，全校目光如针扎。",
          delta: { inferiority: 6, resilience: 8, happiness: -10, kinshipGuilt: -5 },
          addTags: ["习惯性低头", "早熟隐忍"]
        },
        {
          stanceBadge: "野草生存",
          text: "每天放学在废弃铁轨和垃圾堆翻易拉罐、捡废铁自筹班费！",
          detail: "倔强到近乎残忍的自尊。‘我不给家里要钱，我也不在学校丢人，我自己搞定！’",
          reaction: "弄得浑身黑泥，三天凑出了三十块钱。但因太晚回家，母亲拿着竹条在村口哭着用力抽你的小腿，骂你‘不学好是不是去偷了’。",
          delta: { resilience: 12, rebellion: 10, health: -8, happiness: -5, savings: 30 },
          addTags: ["野草生存力", "自力更生"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 9岁 · 小学四年级
  // --------------------------------------------------------------------------
  9: [
    {
      id: "age_9_magazine",
      age: 9,
      stageName: "小学四年级 · 9岁",
      title: "邮局旧书摊翻到残破画报",
      scene:
        "放学后的时光属于泥土地上的弹珠与自制纸牌。偶然一次，你在镇邮局旁的旧书摊翻到一本残破的少年百科杂志。你坐在台阶上看得入神，直到暮色降临，老板挥手说‘送你了，小娃多看书好’。那本书成了你窥探远方世界的窗口。",
      type: "natural",
      naturalDelta: { cognition: 10, happiness: 5 }
    },
    {
      id: "age_9_swim",
      age: 9,
      stageName: "小学四年级 · 9岁",
      title: "水库野泳遇险与父亲的皮带",
      scene:
        "酷暑夏日，你偷瞒着家里跟同伴去水库后山野泳，踩进深水淤泥差点呛水溺亡，被岸边放牛老人捞起。回家后浑身湿透，得知真相的父亲气得浑身发抖，抽出身上的皮带狠狠抽了你一顿，随后抱着你大哭了一场。",
      type: "natural",
      naturalDelta: { health: -5, resilience: 10, kinshipGuilt: 10 }
    },
    {
      id: "age_9_renovate",
      age: 9,
      stageName: "小学四年级 · 9岁",
      title: "老屋翻修瓦片与沙堆城堡",
      scene:
        "家里攒了两年钱翻修漏风漏雨的老屋瓦顶。你帮着工人们搬运轻便的红砖，小手上磨起了硬茧。工间休息时，你蹲在水泥沙堆里用瓦片搭出了一座高耸的城堡，第一次对‘家’与‘避风港’有了实感的依恋。",
      type: "natural",
      naturalDelta: { resilience: 10, happiness: 5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 10岁 · 小学五年级
  // --------------------------------------------------------------------------
  10: [
    {
      id: "age_10_key",
      age: 10,
      stageName: "小学五年级 · 10岁",
      title: "挂在胸前的红毛线钥匙",
      scene:
        "随着父母加班愈发频繁，一根红毛线穿起的铁钥匙挂在了你的胸前。放学后你独自回家开门、淘米生火热饭，在昏暗的日光灯下写作业。同龄人还在撒娇的年纪，你已经习惯了空荡荡的房间和独自对抗夜色的寂静。",
      type: "natural",
      naturalDelta: { resilience: 6, health: 5, social: -5 },
      naturalTags: ["钥匙儿童"]
    },
    {
      id: "age_10_cooking",
      age: 10,
      stageName: "小学五年级 · 10岁",
      title: "带蛋壳的番茄炒蛋与父母归来",
      scene:
        "十岁生日那天父母加班到深夜。你踩着板凳生火，磕磕绊绊炒出了一大碗番茄炒蛋。深夜十一点父母拖着疲惫身躯推开家门，看到桌上早已凉透但摆得整整齐齐的饭菜。虽然蛋壳没剥净，但父母吃得一滴不剩，眼里闪烁着泪花。",
      type: "natural",
      naturalDelta: { happiness: 10, kinshipGuilt: 10, resilience: 10 },
      naturalTags: ["早熟温情"]
    },
    {
      id: "age_10_banquet",
      age: 10,
      stageName: "小学五年级 · 10岁",
      title: "亲戚喜宴上被起哄表演背诗",
      scene:
        "大伯家儿子考上中专办酒席。席间长辈们推杯换盏喝高了，突然把你拉到酒席正中央起哄：‘来，背个出师表给大家助助兴！’你看着满桌泛着油光的红脸与醉醺醺的起哄声，在早熟的尴尬中体会到了熟人社会的酒桌规则。",
      type: "natural",
      naturalDelta: { social: 10, inferiority: 5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 11岁 · 小学六年级
  // --------------------------------------------------------------------------
  11: [
    {
      id: "age_11_parents_aging",
      age: 11,
      stageName: "小学六年级 · 11岁",
      title: "第一次注意到父母在老去",
      scene:
        "小学毕业前的那个冬天格外漫长。某天傍晚，你突然注意到父亲蹲在地上修插头时，后脑勺冒出了成片的白发；母亲洗碗时，双手关节粗大发红、布满冻疮裂口。你突然意识到，一直为你遮风挡雨的父母，正在迅速老去。",
      type: "natural",
      naturalDelta: { kinshipGuilt: 10, cognition: 5, happiness: -5 }
    },
    {
      id: "age_11_peer_dropout",
      age: 11,
      stageName: "小学六年级 · 11岁",
      title: "隔壁同伴退学南下的背影",
      scene:
        "自幼和你一起泥地长大的伙伴突然收拾了编织袋，被他舅舅领着南下东莞制鞋厂当学徒。校门口告别时，他把仅剩的半盒铁皮弹珠全倒给了你。你第一次清晰地意识到：在这片土地上，并不是所有孩子都能平平稳稳地坐在教室里念书。",
      type: "natural",
      naturalDelta: { cognition: 10, resilience: 10 }
    },
    {
      id: "age_11_rankings",
      age: 11,
      stageName: "小学六年级 · 11岁",
      title: "小升初摸底考大榜前的人头攒动",
      scene:
        "小升初摸底考试全镇联考大榜公布。红纸黑字张贴在镇中心校的砖墙上，家长和学生将校道围得水泄不通。考前五十名被圈上了醒目的红圈，后排的学生默默低头散去。应试筛选的无情分水岭，在这一刻提前向你露出了獠牙。",
      type: "natural",
      naturalDelta: { cognition: 10, academicCapital: 10, inferiority: 5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 12岁 · 初中一年级 (Choice) - 奥数选拔、择校赞助费与母亲的弯腰
  // --------------------------------------------------------------------------
  12: [
    {
      id: "age_12_fast_class",
      age: 12,
      stageName: "初中一年级 · 12岁",
      title: "奥数选拔、两万块择校赞助费与母亲的低头",
      scene:
        "县一中初中部地下奥数选拔，你在没上过昂贵补习班的情况下自学考进前五十名！然而通知书下来：因户口在农村乡镇，属于‘跨片区借读’，必须一次性缴纳两万块‘建校赞助费’，否则名额顺延给关系户。而回对口的乡镇中学读书一分钱不收，但升学率常年倒数第一。",
      type: "choice",
      choices: [
        {
          stanceBadge: "认命止血",
          text: "体恤家庭绝境，主动把择校通知书撕掉，回对口乡镇中学读书",
          detail: "‘两万块是全家三年的纯收入，我不能为了自己的好学校让全家背饥荒。’",
          reaction: "乡镇中学里充满了厌学、抽烟、打架的气息。曾经灵动的奥数天赋在嘈杂破败的教室里被环境迅速同化，成绩一点点滑向平庸。",
          delta: { kinshipGuilt: -6, resilience: 10, academicCapital: -8, cognition: -5, happiness: -8 },
          addTags: ["天花板认命", "自我牺牲"]
        },
        {
          stanceBadge: "目睹卑微",
          text: "默默看着母亲拎着两只老母鸡和存折，走进县教育局亲戚家门求情",
          detail: "‘我想走出去，我想去最好的学校。如果这是唯一的门票，我只能看着大人去弯腰。’",
          reaction: "你站在门厅甚至不敢踩脏表舅家的红木地板。母亲陪着笑脸被对方冷淡敷衍，那是你第一次直视成人世界中‘特权与人情’的刺鼻气味。",
          delta: { inferiority: 7, academicCapital: 12, kinshipGuilt: 6, familySavings: -15000 },
          addTags: ["权贵窥视者", "负疚求学"]
        },
        {
          stanceBadge: "绝境孤勇",
          text: "在重点中学门外连续蹲守一周，找到当年主抓招生的老校长实名自荐！",
          detail: "‘凭什么有钱有户口的能上，我考了前五十却不能上？我要凭卷子上的满分说话！’",
          reaction: "老校长破例动用贫困特批指标免除了一万五，但全校大会上你成了‘特批旁听生’，城里同学当面喊你‘叫花子’，你在孤立中日夜苦读。",
          delta: { rebellion: 6, resilience: 6, social: -6, academicCapital: 6, inferiority: 8 },
          addTags: ["绝境狂徒", "孤立苦读"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 13岁 · 初中二年级
  // --------------------------------------------------------------------------
  13: [
    {
      id: "age_13_voice",
      age: 13,
      stageName: "初中二年级 · 13岁",
      title: "发育抽条期的敏感与磨损的旧球鞋",
      scene:
        "身体悄然拔高抽条，声音与身形都有了微妙变化。你开始格外在意周围同学的目光和自己有些发旧的球鞋。班上有家境优渥的同学穿上了新潮名牌运动鞋，你悄悄把双脚往课桌底下缩了缩。青春期的自尊与敏感在悄然生长。",
      type: "natural",
      naturalDelta: { inferiority: 10, social: 5 }
    },
    {
      id: "age_13_letter",
      age: 13,
      stageName: "初中二年级 · 13岁",
      title: "课本深处折成爱心的小纸条",
      scene:
        "整理数学作业本时，突然发现里面夹着一张折成精致心形的小纸条，上面是娟秀的字迹相约周末去新华书店。你心跳骤然加速，手足无措地把纸条藏进铁皮盒最深处，整整三天上课神思不属。",
      type: "natural",
      naturalDelta: { happiness: 10, cognition: -5 }
    },
    {
      id: "age_13_wuxia",
      age: 13,
      stageName: "初中二年级 · 13岁",
      title: "手电筒下的快意江湖与侠客梦",
      scene:
        "班里悄悄传阅租来的金庸古龙武侠小说。熄灯后的宿舍被窝里，你借着微弱手电光一口气读完了整套《笑傲江湖》。仗剑天涯、快意恩仇的远方世界，成了你对抗平庸压抑现实的避难所。",
      type: "natural",
      naturalDelta: { rebellion: 10, happiness: 10 }
    }
  ],

  // --------------------------------------------------------------------------
  // 14岁 · 初中三年级 (Choice) - 自行车棚围堵、少年的第一次道德大考
  // --------------------------------------------------------------------------
  14: [
    {
      id: "age_14_bike_shed",
      age: 14,
      stageName: "初中三年级 · 14岁",
      title: "自行车棚围堵、少年的第一次道德大考",
      scene:
        "同桌是个同村哑巴木匠的儿子，因常年穿着洗不干净的旧汗衫成了班里几个富商与干部子弟日常戏弄的对象。傍晚放学，昏暗的车棚拐角，三个混混把同桌堵在死角强迫他跪在碎煤渣上学狗叫，甚至拿燃着的烟头去烫他的破球鞋。你正好推着掉了链子的老二八自行车经过。",
      type: "choice",
      choices: [
        {
          stanceBadge: "冷眼自保",
          text: "低下头假装没看见，把车链子迅速套上快步离开，回家疯狂做题",
          detail: "最现实的底层避险本能。‘我惹不起他们，多管闲事全家遭殃，我的出路是卷子。’",
          reaction: "同桌第三天退学南下打工，离开前穿过人群看了你一眼，那绝望的眼神你记了一辈子；往后每当有人夸你善良，你脊梁骨都隐隐发凉。",
          delta: { resilience: 8, academicCapital: 8, inferiority: 12, happiness: -10 },
          addTags: ["冷眼旁观者", "自保生存"]
        },
        {
          stanceBadge: "血性暴烈",
          text: "抄起沉甸甸的铸铁车锁狂吼着冲上去，打破带头混混的头死磕到底！",
          detail: "少年最滚烫的血性。‘如果连身边朋友被践踏都能视而不见，读再多书也是窝囊废！’",
          reaction: "你打破了混混的头，自己被打成轻微脑震荡。次日对方带干部家长到校长室施压，你亲眼看着做工人的父亲弯腰递烟被一把推在地上。",
          delta: { rebellion: 7, resilience: 12, health: -12, kinshipGuilt: 7, familySavings: -3000 },
          addTags: ["暴烈抗争", "义薄云天"]
        },
        {
          stanceBadge: "虚张声势",
          text: "退回教学楼大喊‘教导主任带着派出所民警巡查车棚’驱散混混",
          detail: "早熟的策略家。‘硬碰硬只会自取其辱，用成人的规则去威慑他们。’",
          reaction: "混混四散而逃，但事后他们查出是你喊的，你被小团体扣上‘阴险告密者’恶名，在接下来的初中里被冷暴力孤立，抽屉常有死青蛙。",
          delta: { cognition: 10, social: -6, resilience: 10, inferiority: 8 },
          addTags: ["暗夜孤狼", "防备深沉"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 15岁 · 初中三年级毕业 (Choice) - 中考五五分流与家庭止血抉择
  // --------------------------------------------------------------------------
  15: [
    {
      id: "age_15_split",
      age: 15,
      stageName: "初三中考分流 · 15岁",
      title: "中考五五分流与家庭止血抉择",
      scene:
        "父亲在沙场被违章传送带绞断双腿，黑心老板跑路，每天ICU账单三千，亲戚避之唯恐不及。你的中考成绩刚好高出县一中自费录取线3分，但三年学杂费要四万，父亲手术缺口十万。手中的中考志愿表是全家唯一的止血带。",
      type: "choice",
      choices: [
        {
          stanceBadge: "孤注一掷",
          text: "咬紧牙关坚持报考县一中！全家砸锅卖铁借高利贷也要赌一把名校希望！",
          detail: "‘认命读职校三代都烂在泥里，名校是把全家拉上来的唯一杠杆，这是救赎战！’",
          reaction: "母亲当着你的面给姨夫下跪借择校费；父亲为了省钱偷偷停掉抗生素导致骨髓炎慢性恶化。你每次翻开练习册，耳边都是母亲磕头的闷响。",
          delta: { academicCapital: 7, cognition: 8, health: -10, kinshipGuilt: 10, inferiority: 6 },
          trackTrigger: "academic",
          addTags: ["弑亲感驱动", "负罪冲锋"]
        },
        {
          stanceBadge: "卖身止血",
          text: "签约县二中‘宏志贫困特长班’，当场拿两万现金救命钱为父亲手术！",
          detail: "‘爸的腿等不起三年。我用自己的脑子换父亲的命，不欠任何人情。’",
          reaction: "拿到两万元救命钱，三年全免学费；但二中将你立为苦难展品，三年参加数十场赞助答谢会穿着旧校服在台上流泪；二中师资匮乏，名校梦生生折断。",
          delta: { familySavings: 20000, resilience: 12, inferiority: 8, academicCapital: 5 },
          trackTrigger: "academic",
          addTags: ["标价自尊", "展品人格"]
        },
        {
          stanceBadge: "血肉筑坝",
          text: "走读普通高中，凌晨3点在水产码头冰库扛冰搬鱼自筹生活费！",
          detail: "‘我既不吸父母骨髓，也不出卖自己尊严。只要我没倒下，这个家就没塌！’",
          reaction: "每天在零下冰库搬运死鱼，手指大关节变形受寒；严重缺觉直接钝化了高级脑力，曾经敏锐的理科成绩滑落到二本边缘，但守住了男儿骨气。",
          delta: { resilience: 7, health: -6, savings: 500, academicCapital: -5, rebellion: 10 },
          trackTrigger: "academic",
          addTags: ["早衰苦力", "血肉硬骨"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 16岁 · 高中一年级 (Choice) - 高一文理分科与做题竞赛的残酷淘汰
  // --------------------------------------------------------------------------
  16: [
    {
      id: "age_16_major_choice",
      age: 16,
      stageName: "高一文理分科 · 16岁",
      title: "高一文理分科与做题竞赛的残酷淘汰",
      scene:
        "高中文理分科大会。你文科才情出众、历史政治全校第一，但家里亲戚和班主任异口同声：‘穷人家孩子学文科毕业就是饿死，只有理科工科才能吃上一口技术饱饭！’走廊里，同桌因为数学做不出导数大题蹲在地上嚎啕大哭。",
      type: "choice",
      choices: [
        {
          stanceBadge: "现实低头",
          text: "压抑内心对文学与历史的全部热爱，违心选择物理化学生存赛道",
          detail: "‘活着比体面重要。我要吃饱饭，哪怕变成做题机器也在所不惜。’",
          reaction: "你在理化生题海里痛苦挣扎，数学压轴题常常让你失眠；但你的工科就业底盘锁死了，家庭对你松了一口气。",
          delta: { academicCapital: 12, resilience: 8, happiness: -6, cognition: 5 },
          addTags: ["工具人妥协", "做题机器"]
        },
        {
          stanceBadge: "风骨坚守",
          text: "顶住全家压力坚决报考文科历史班，誓要在人文社科走出自己的大道！",
          detail: "‘人不是流水线螺丝钉！如果连自己的志趣都要出卖，读书还有什么意义？’",
          reaction: "文科成绩全校领跑，在省级中学生作文大赛斩获一等奖；但逢年过节亲戚聚餐，长辈总当面摇头‘这孩子废了，以后找不到工作’。",
          delta: { cognition: 6, happiness: 10, rebellion: 12, inferiority: 8, social: -5 },
          addTags: ["文人傲骨", "甘受非议"]
        },
        {
          stanceBadge: "偏锋兼修",
          text: "选理科保底就业，业余时间通宵研读文史哲学与社会学杂书！",
          detail: "理智与野性的双重分裂。白天在公式与试管间做题，深夜在被窝打手电读鲁迅与王小波。",
          reaction: "拥有了理科的逻辑骨架与文科的深刻灵魂，但每天只睡4小时导致深度近视加深了两百度，身体处于慢性疲劳。",
          delta: { cognition: 7, academicCapital: 8, health: -12, resilience: 10 },
          addTags: ["文理兼修", "双重灵魂"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 17岁 · 高三/职高毕业冲刺 (Choice)
  // --------------------------------------------------------------------------
  17: [
    {
      id: "age_17_sprint",
      age: 17,
      stageName: "冲刺阶段 · 17岁",
      title: "高三冲刺倒计时与身心生理极限",
      scene:
        "黑板上的倒计时逼近最后六十天，晚自习教室里空气闷热沉重。早晨五点半顶着寒风晨读，晚上洗脸池边全是揉碎的湿纸巾。同桌因严重贫血在讲台前晕倒，你看着课桌上垒得比头还高的模拟卷，面临身心最后的调整抉择。",
      type: "choice",
      choices: [
        {
          stanceBadge: "苦修透支",
          text: "每天只睡4小时狂饮浓茶红牛，将题海战术推到肉身生理极限！",
          detail: "‘既然没有背景退路，那就把每一秒都压榨在试卷上！’大冬天用冷水浇头，风油精擦在太阳穴。",
          reaction: "你的模拟考分数一路暴涨冲入全校前列，但频繁出现心悸盗汗与偏头痛，桌角摆满了去痛片。",
          delta: { academicCapital: 12, cognition: 8, health: -10, happiness: -8, resilience: 6 },
          addTags: ["透支冲顶", "绝境狂奔"]
        },
        {
          stanceBadge: "方法破局",
          text: "钻研历年高考命题逻辑与赋分标准，搭建错题复盘归纳系统",
          detail: "拒绝盲目内耗死刷，精准识别高频考点与思维盲区，将精力集中在提分性价比最高的压轴题型上。",
          reaction: "解题思维愈发清晰敏锐，模拟考发挥稳定性大幅提升，在极度内卷的高三守住了清醒节奏。",
          delta: { cognition: 10, academicCapital: 8, resilience: 8, inferiority: -10 },
          addTags: ["方法破局", "专项攻坚"]
        },
        {
          stanceBadge: "身心自洽",
          text: "保持每天7小时基础睡眠与傍晚慢跑，用健康的体魄对抗焦虑",
          detail: "‘若通关的代价是彻底崩溃，我宁可做一个身心健全的普通人。’顶住同侪压力，保障充足精力。",
          reaction: "身边同学神情枯槁哈欠连天，你面色红润步伐沉稳，以最佳的生理与心理状态迎接终极决战。",
          delta: { health: 10, happiness: 10, resilience: 6, academicCapital: -5 },
          addTags: ["身心自洽", "从容备战"]
        }
      ]
    },
    {
      id: "age_17_recommendation",
      age: 17,
      stageName: "冲刺阶段 · 17岁",
      title: "自主招生与保送加分资格的风波",
      scene:
        "高考前夕，省重点高校在{highSchool}投放了三个自招降分名额。原本按照摸底排名稳稳有你一个，但红榜公布时你的名字被县领导的关系户悄悄顶替了。班主任把你叫到办公室，叹了口气劝你‘顾全大局，别给学校添乱’。全班死一般沉寂。",
      type: "choice",
      choices: [
        {
          stanceBadge: "刷题硬刚",
          text: "咽下委屈化作彻夜刷题的狠劲，誓要在裸分考场上用绝对实力赢回尊严！",
          detail: "‘既然潜规则夺走了捷径，那就在纯粹的考场上把他们踩在脚下！’每天拼命刷穿十年真题，誓死一搏。",
          reaction: "模拟考分数一路暴涨突破640分，但长期自虐式的熬夜让你落下了顽固偏头痛，神经紧绷到了极致。",
          delta: { academicCapital: 12, resilience: 8, health: -8, happiness: -6, inferiority: 10 },
          addTags: ["刷题狠劲", "硬核应试"]
        },
        {
          stanceBadge: "实名申诉",
          text: "搜集历次排名证据，向市教育纪检实名申诉硬碰硬，绝不吞下窝囊气！",
          detail: "骨子里天生硬骨头，绝不容许暗箱潜规则践踏寒门青春！当晚整理出详实对比凭据递交纪检信箱。",
          reaction: "引起上级暗访调查，对方的违规加分被叫停；但学校领导怒斥你‘不顾集体大局’，你在全校冷眼中孤军奋战。",
          delta: { rebellion: 14, resilience: 10, social: -12, kinshipGuilt: 12, health: -10 },
          addTags: ["硬骨抗争", "孤立无援"]
        },
        {
          stanceBadge: "隐忍谋略",
          text: "暗度陈仓留存证据，表面服软，把全部能量聚焦于最后60天冲刺",
          detail: "展现出超越同龄人的深沉定力与城府。悄悄将所有原始证据复印留档，不打草惊蛇，待放榜后再做计议。",
          reaction: "你的心态波澜不惊，排除一切外界杂音，把全部能量收敛于考场，深沉老练。",
          delta: { cognition: 10, resilience: 10, academicCapital: 6, inferiority: -10 },
          addTags: ["深沉内敛", "大心脏"]
        }
      ]
    },
    {
      id: "age_17_mock_down",
      age: 17,
      stageName: "冲刺阶段 · 17岁",
      title: "三模严重失常与班主任的保底劝诫",
      scene:
        "三模放榜，理综答题卡因铅笔太淡被机器漏扫，全校排名暴跌120名。班主任在走廊抽烟长叹：‘以你家里的经受力，千万不能赌一本了，服从调剂填报省内公费定向师范或者专科吧，包分配稳妥！’客厅里父母相对垂泪。",
      type: "choice",
      choices: [
        {
          stanceBadge: "死磕不退",
          text: "推翻保底劝诫，死咬牙关重做三模全部错题，第一志愿依然锁死重点大学！",
          detail: "经得起大风大浪，绝不在黎明前向恐惧低头，把所有知识死角地毯式排查。",
          reaction: "你把每一个丢分漏洞彻底吃透，心理素质在恐惧中被淬炼成钢，神经紧绷到了极致。",
          delta: { academicCapital: 10, resilience: 10, health: -6, inferiority: 6 },
          addTags: ["逆风攻坚", "背水一战"]
        },
        {
          stanceBadge: "求稳自保",
          text: "体恤家庭经受力，认真将定向师范/公办二本纳入保底考虑，换取确定性",
          detail: "理解父母一辈子的艰辛与贫困经不起风浪，放下虚浮的骄傲，务实接纳稳妥的托底方案。",
          reaction: "卸下了必须冲名校的沉重包袱，家庭气氛缓和下来，父母长舒了一口气。",
          delta: { kinshipGuilt: -8, happiness: 8, resilience: 6, academicCapital: 10 },
          addTags: ["求稳自保", "体恤双亲"]
        },
        {
          stanceBadge: "身心调节",
          text: "反思单一应试内耗，每天坚持慢跑半小时，以最佳生理巅峰迎接终极考验",
          detail: "不打疲劳战，将身心调整到最佳临战状态，坚信身心清醒才是考场第一利器。",
          reaction: "身体疲惫彻底消除，头脑恢复了罕见的敏锐与定力，步伐沉稳走向考场。",
          delta: { health: 10, happiness: 10, resilience: 6, academicCapital: -5 },
          addTags: ["身心巅峰", "松弛应战"]
        }
      ]
    }
  ],

};

// ============================================================================
// 动态多剧情时间线生成引擎（深度融合地域、医院、学校与时序同胞因果）
// ============================================================================

export function generateTimelineForCharacter(
  family: FamilyOrigin,
  gender: "男" | "女"
): LifeEventNode[] {
  const result: LifeEventNode[] = [];

  const resolveText = (str: string) => {
    let s = str
      .replace(/\{hospital\}/g, family.hospitalName)
      .replace(/\{cityOrCounty\}/g, family.cityOrCounty)
      .replace(/\{primarySchool\}/g, family.primarySchoolName)
      .replace(/\{highSchool\}/g, family.highSchoolName);

    if (family.region.includes("市") || family.region.includes("矿") || family.region.includes("区")) {
      s = s
        .replace(/县医院/g, family.hospitalName)
        .replace(/县重点高中/g, family.highSchoolName)
        .replace(/县一中/g, family.highSchoolName)
        .replace(/县中/g, family.highSchoolName)
        .replace(/县城中学/g, "市重点中学")
        .replace(/县实验小学/g, family.primarySchoolName)
        .replace(/镇卫生院/g, `${family.hospitalName}急诊`);
    } else {
      s = s
        .replace(/镇卫生院/g, family.hospitalName);
    }

    const resolvedSiblingName = family.siblingType.includes("brother")
      ? "弟弟"
      : family.siblingType.includes("sister")
      ? "妹妹"
      : "同胞";
    s = s.replace(/\{sibling\}/g, resolvedSiblingName);
    return s;
  };

  // 仅生成 0 ~ 18 岁（童年到高考）：19~27岁成人职场由高考分流引擎精准赋予，彻底杜绝混入错误分轨剧本！
  for (let age = 0; age <= 18; age++) {
    // 0岁：严格契合出生地独特风貌与时代印记（每个出生地拥有独一无二的初临人间与第一声啼哭！）
    if (age === 0) {
      const matchedEco = REGION_ECOSYSTEMS.find((e) => e.region === family.region);
      const birthScene = family.birthScene || matchedEco?.birthScene || (
        `秋风渐起的午后，你出生在${family.hospitalName}泛黄的被单上。助产士轻轻拍打你的后背，你发出第一声响亮的啼哭。产房外走廊里，父亲来回踱步，手里捏着汗湿的缴费单；母亲虚弱地将你揽入怀中，为你取下伴随一生的名字。这一年，你正式来到${family.cityOrCounty}。`
      );

      result.push({
        id: `age_0_${family.region}`,
        age: 0,
        stageName: "婴儿期 · 0岁",
        title: "初临人间与第一声啼哭",
        scene: birthScene,
        type: "natural",
        naturalDelta: { health: 5, happiness: 5 },
        naturalTags: ["初临人间"]
      });
      continue;
    }

    // 1岁：【摇晃学步与晨昏人间】纯自然成长纪实，彻底告别刻意的人工暗示抓周
    if (age === 1) {
      result.push({
        id: `age_1_steps_${family.region}`,
        age: 1,
        stageName: "幼芽期 · 1岁",
        title: "摇晃的学步与最初的人间温度",
        scene: `在${family.housing.split('（')[0]}的门槛前，你松开母亲粗糙温暖的双手，摇摇晃晃迈开了人生的第一步。屋外是熟悉的${family.regionDetail.split('|')[0].trim()}，锅灶里翻滚着粗茶淡饭的香气。你摔倒在地上没有哭闹，扶着长板凳站起来，引得疲惫归家的父母脸上露出了难得的宽慰笑容。这一年，你慢慢看清了身边大人的喜怒哀乐。`,
        type: "natural",
        naturalDelta: { health: 5, resilience: 5, happiness: 5 }
      });
      continue;
    }

    // 3岁：手足降生或手足互动抉择（彻底吻合家庭同胞设置与角色性别）
    if (age === 3) {
      if (family.siblingType === "younger_brother") {
        result.push({
          id: "age_3_younger_brother",
          age: 3,
          stageName: "幼儿期 · 3岁",
          title: "添弟之喜与悄然倾斜的天平",
          scene: `三岁这年深秋，母亲在${family.hospitalName}为你添了一个弟弟。家里围满了道喜的亲友，父亲在走廊分发红鸡蛋。母亲将你揽在床边轻声叮嘱：“你做${gender === "男" ? "哥哥" : "姐姐"}了，以后要多懂事，好吃的先紧着弟弟。”你看着襁褓里那个通红的小婴儿，第一次隐约体会到了重心的转移。`,
          type: "choice",
          choices: [
            {
              text: "乖乖点头，把自己兜里舍不得吃的半块饼干轻轻放到摇篮边",
              detail: "过早学会了迎合大人的懂事期待，把委屈与隐忍藏在心底深处。",
              reaction: `长辈们纷纷夸你‘${gender === "男" ? "长兄有担当" : "长姐有担当"}’，但你的内心悄悄多了一层懂事的拘谨。`,
              delta: { kinshipGuilt: 20, inferiority: 10, resilience: 15 },
              addTags: ["早熟懂事", gender === "男" ? "兄长担当" : "长姐担当"]
            },
            {
              text: "抱紧父母的大腿哭闹委屈，不许他们抱别的孩子",
              detail: "勇敢表达自己的不安与失落，绝不委屈自己的天然情感。",
              reaction: "虽然被父亲轻轻训斥了几句，但母亲心疼地把你抱在怀里温声安慰，护住了你的自尊。",
              delta: { rebellion: 20, inferiority: -10, happiness: 10 },
              addTags: ["捍卫关爱", "天性自我"]
            },
            {
              text: "好奇地伸手戳戳弟弟粉嫩的小脸，自己搬小板凳去门口搭积木",
              detail: "自得其乐，不依赖大人的时刻关注，展现出强大的自洽能力。",
              reaction: "你沉浸在自己的小世界里，从小就习惯了独立自足的生活节奏。",
              delta: { cognition: 15, happiness: 15, resilience: 10 },
              addTags: ["自得其乐", "独立自洽"]
            }
          ]
        });
        continue;
      }

      if (family.siblingType === "younger_sister") {
        result.push({
          id: "age_3_younger_sister",
          age: 3,
          stageName: "幼儿期 · 3岁",
          title: "添妹之喜与手足初啼",
          scene: `三岁这年深秋，母亲在${family.hospitalName}为你添了一个妹妹。小小的病房里摆满了婴儿衣物，母亲虚弱地将妹妹抱给你看：“看，这是你的小妹妹，以后你们手足要互相照应。”`,
          type: "choice",
          choices: [
            {
              text: "主动伸出小手牵着妹妹软绵绵的小拇指，咯咯笑起来",
              detail: "天性温厚，发自内心地接纳新生命的到来，手足情深初萌芽。",
              reaction: "妹妹也停止了啼哭，小小的手抓着你的手指，病房里满是温情暖意。",
              delta: { happiness: 20, social: 15, kinshipGuilt: 10 },
              addTags: ["手足情深", "温厚纯良"]
            },
            {
              text: "把家里分给自己的水果糖偷偷藏在小抽屉里，警惕看着新成员",
              detail: "对家庭资源的变化有着超乎年龄的警觉，自我防御意识极强。",
              reaction: "你默默守护自己的小天地，更早地体会到了人间的竞争与生存本能。",
              delta: { resilience: 15, inferiority: 5, savings: 50 },
              addTags: ["早熟警觉", "自我防御"]
            },
            {
              text: "开心地拿出自己最喜欢的玩具塞进摇篮跟她分享",
              detail: "乐于分享与付出，天生具备温暖周围人的感染力与亲和力。",
              reaction: `全家人看着你们${gender === "女" ? "两姐妹" : "兄妹俩"}相视而笑，家庭氛围变得格外温馨舒缓。`,
              delta: { happiness: 25, social: 20 },
              addTags: ["慷慨分享", "乐天温情"]
            }
          ]
        });
        continue;
      }

      if (family.siblingType === "elder_sister") {
        result.push({
          id: "age_3_elder_sister",
          age: 3,
          stageName: "幼儿期 · 3岁",
          title: "姐姐牵着的小手与大院里的庇护",
          scene: `三岁这年，七岁的姐姐每天放学牵着你的手在${family.cityOrCounty}家属区的大院里玩。有跑得飞快的大孩子想抢你的小饼干，姐姐立刻张开胳膊把你护在身后。长辈们路过都夸姐姐懂事会疼${gender === "女" ? "妹妹" : "弟弟"}。`,
          type: "choice",
          choices: [
            {
              text: "紧紧拉着姐姐的衣角，把手里的饼干掰了一大半塞进姐姐嘴里",
              detail: "懂得感恩与回报，自小与姐姐建立了深厚的手足信赖。",
              reaction: "姐姐嚼着饼干冲你笑得眉眼弯弯，手足情深成为童年最温暖的底色。",
              delta: { happiness: 20, kinshipGuilt: 10, social: 15 },
              addTags: ["手足情深", "知恩懂报"]
            },
            {
              text: "从姐姐身后探出头，捡起地上的小树枝壮着胆子挥舞",
              detail: "天生硬气，在家庭庇护下更添一份敢于反抗的勇气。",
              reaction: "对方被你们俩的气势震住走开，大院里的大人纷纷夸这小家伙‘人小骨气硬’。",
              delta: { resilience: 20, rebellion: 15, inferiority: -10 },
              addTags: ["骨气刚烈", "敢爱敢恨"]
            },
            {
              text: "蹲在姐姐脚边专心看砖缝里的一串红蚂蚁搬家",
              detail: "不为外界纷扰所动，沉浸在自我的宁静世界中。",
              reaction: "你的淡定自若引得周围人发笑，从小展现出强大的专注力与定力。",
              delta: { cognition: 15, happiness: 15, inferiority: -5 },
              addTags: ["专注沉静", "波澜不惊"]
            }
          ]
        });
        continue;
      }

      if (family.siblingType === "elder_brother") {
        result.push({
          id: "age_3_elder_brother",
          age: 3,
          stageName: "幼儿期 · 3岁",
          title: "哥哥的二八斜梁与大院里的小跟班",
          scene: `三岁这年，六岁的哥哥在大院里玩泥巴跑得飞起，你成了哥哥最忠实的小跟班。哥哥从兜里摸出一颗皱巴巴的水果糖塞进你嘴里：“嘘，别让妈知道，快吃！”`,
          type: "choice",
          choices: [
            {
              text: "把糖含在嘴里甜得眯起眼睛，寸步不离跟在哥哥屁股后面当小帮手",
              detail: "信赖哥哥的庇护，甘心当个快乐的小尾巴，家庭氛围融洽温馨。",
              reaction: "哥哥得意地拍拍胸脯说以后罩着你，你体会到了有兄长庇佑的踏实安全感。",
              delta: { happiness: 25, social: 15, kinshipGuilt: 5 },
              addTags: ["兄友弟恭", "天伦暖意"]
            },
            {
              text: "偏不听哥哥的指挥，自己迈着小短腿去追大院花坛边的小花猫",
              detail: "不愿屈从于任何人的意志，展现出强烈的独立自主天性。",
              reaction: "哥哥吓得一路小跑跟在后面护着你，长辈们都笑你‘主意真大’。",
              delta: { rebellion: 20, resilience: 15, happiness: 10 },
              addTags: ["自主意识", "胆大心细"]
            },
            {
              text: "跑去厨房悄悄告诉母亲：“哥哥给我吃糖啦！”",
              detail: "心思单纯诚实，恪守家庭规矩，天然依恋父母权威。",
              reaction: "母亲笑着摸摸你的头，又奖了你一小把炒南瓜子，哥哥无奈地冲你做鬼脸。",
              delta: { kinshipGuilt: 15, social: 10, inferiority: -5 },
              addTags: ["天真诚恳", "依恋父母"]
            }
          ]
        });
        continue;
      }

      if (family.siblingType === "middle_child") {
        result.push({
          id: "age_3_middle_child",
          age: 3,
          stageName: "幼儿期 · 3岁",
          title: "夹心层的饭桌与悄然学会的察言观色",
          scene: `三岁这年，饭桌上的好菜长辈习惯先紧着刚出生的小弟，新衣服是长姐穿小了改下来的旧布衣。夹在中间的你，坐在小马扎上默默喝着碗里的米汤，比同龄孩子更早学会了看大人的脸色。`,
          type: "choice",
          choices: [
            {
              text: "主动帮母亲把空碗收进水槽，安安静静不哭不闹",
              detail: "过早学会了用懂事与顺用来换取大人的注意与夸奖。",
              reaction: "母亲疲惫的脸上露出一丝欣慰：“就数这娃最省心。”但你的眼底多了一丝讨好的拘谨。",
              delta: { kinshipGuilt: 20, inferiority: 10, resilience: 15 },
              addTags: ["察言观色", "夹心懂事"]
            },
            {
              text: "趁大人不注意，伸出小勺舀了一大勺肉汤浇在自己碗里大口扒饭",
              detail: "深知凡事不靠恩赐靠自取，骨子里有着极强的生存争夺本能。",
              reaction: "长辈们愣了一下哈哈大笑：“这娃机灵，饿不着！”你凭本能填饱了肚子。",
              delta: { resilience: 20, rebellion: 15, cognition: 10 },
              addTags: ["机变争先", "不甘居后"]
            },
            {
              text: "吃完饭自己搬小马扎去院门口看连环画，沉浸在自己的小世界里",
              detail: "不争不抢，向内寻找精神的自足与丰盈，天生具备强大的精神自洽力。",
              reaction: "外界的偏心与冷落丝毫伤害不到你，你从小就构建了坚固的精神避难所。",
              delta: { cognition: 20, happiness: 15, inferiority: -10 },
              addTags: ["精神自洽", "淡泊超然"]
            }
          ]
        });
        continue;
      }

      // only_child 独生子女
      result.push({
        id: "age_3_only_child",
        age: 3,
        stageName: "幼儿期 · 3岁",
        title: "水泥地坝上的滑板车与地盘之争",
        scene: `三岁这年，你在${family.cityOrCounty}生活区的水泥地上骑着塑料小三轮。邻居家大两岁的小孩猛冲过来推搡你，想要抢走你的车把。周围大人在一旁闲聊看着。`,
        type: "choice",
        choices: [
          {
            text: "死死抓紧车把不松手，瞪圆眼睛大声喊‘这是我的！’",
            detail: "虽小但骨气硬，绝不轻易向强权与退让妥协，死守阵地。",
            reaction: "对方被你的气势震住讪讪走开，邻里长辈都夸这小家伙‘骨头真硬’。",
            delta: { resilience: 20, rebellion: 15, inferiority: -10 },
            addTags: ["寸步不让", "天生硬骨"]
          },
          {
            text: "扭头跑回母亲身后，拉着母亲的衣角寻求庇护",
            detail: "懂得借力与规避无谓的冲突，在家庭的羽翼下安全成长。",
            reaction: "母亲走过来温声化解了争执，你感受到了家庭作为庇护所的安全感。",
            delta: { kinshipGuilt: 15, happiness: 10, resilience: 5 },
            addTags: ["家风温软", "趋利避害"]
          },
          {
            text: "松开塑料车，蹲在路边专心致志看砖缝里的大黑蚂蚁搬家",
            detail: "对世俗的争抢漠不关心，拥有独特的观察视角与精神自足。",
            reaction: "抢车的小孩觉得没趣自讨没趣地骑走了，你沉浸在微观世界里。",
            delta: { cognition: 20, happiness: 15, inferiority: -5 },
            addTags: ["微观哲思", "淡泊自得"]
          }
        ]
      });
      continue;
    }

    // 18岁：高考与成人分流门槛节点
    if (age === 18) {
      result.push({
        id: "age_18_gaokao_prep",
        age: 18,
        stageName: "十八岁 · 少年与成人的分水岭",
        title: "十八岁 · 高考放榜与成人分流",
        scene: `这一年盛夏，你在${family.highSchoolName}考点走出最后一门考场。教室黑板上的倒计时终于归零，桌椅被搬空，漫天碎纸在窗外飞舞。几周后，邮递员顶着烈日按响车铃，将那封决定你未来几年乃至半生命运的信封送到了手中。`,
        type: "natural"
      });
      continue;
    }

    const pool = AGE_EVENT_POOLS[age];
    if (!pool || pool.length === 0) continue;

    // 每次投胎全年龄段真随机抽取
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex] || pool[0];

    // 全文动态置换（标题、场景、选项及反馈全面适配）
    const resolvedChoices = selected.choices?.map((c) => ({
      ...c,
      text: resolveText(c.text),
      detail: resolveText(c.detail),
      reaction: resolveText(c.reaction)
    }));

    result.push({
      ...selected,
      title: resolveText(selected.title),
      scene: resolveText(selected.scene),
      choices: resolvedChoices
    });
  }

  return result;
}

// ============================================================================
// 19 ~ 27 岁：基于高考与教育阶层的专属人生分轨事件库（彻底告别985去进外包/卖菜的荒谬）
// ============================================================================


// ============================================================================
// 职高失足青年专属命运救赎长卷（19 ~ 27 岁：严密接驳看守所、母亲白发、刑释冷眼与28岁冷库扛肉）
// 彻底消灭“涉足灰产又跑去考公务员/当模范技工”的严重常识漏洞！
// ============================================================================

export const STREET_REFORM_TIMELINE_NODES: Record<number, LifeEventNode[]> = {
  19: [
    {
      id: "age_19_street_crime",
      age: 19,
      stageName: "泥潭失足 · 19岁",
      title: "台球厅的二手烟与地下水房快钱",
      scene:
        "十九岁，职高辍学后混迹在老城网吧与台球厅。社会上的‘猴哥’开着二手宝马扔给你两千块：“小兄弟，拿你身份证办张卡帮哥走两笔流水，一天净赚八百，比进厂强一百倍！”廉价香烟的青烟弥漫，屏幕上跳动的转账数字刺激着少年焦躁的神经。",
      type: "choice",
      choices: [
        {
          text: "【深陷快钱泥潭，天天帮人‘跑分’转账】：沉迷于灰色快钱的虚幻繁荣，夜夜笙歌",
          detail: "来钱太快，彻底荒废了心智，沉迷在网吧包厢与花天酒地中，不知深渊已近。",
          reaction: "兜里有了几万块花天酒地的黑钱，但你的眼神变得空洞阴冷，被警察列入经侦布控名单。",
          delta: { savings: 25000, rebellion: 30, inferiority: 20, health: -10 },
          addTags: ["涉足灰产", "泥潭渐深"]
        },
        {
          text: "【看着银行卡被冻结的警告信惊肉跳，隐隐感到不安，想退又怕得罪社会人】",
          detail: "骨子里良知未泯，看着老母亲辛辛苦苦卖菜的背影，内心备受道德煎熬。",
          reaction: "你开始躲避猴哥的催促，但脚上的泥浆已经深陷，想抽身却已身不由己。",
          delta: { resilience: 20, kinshipGuilt: 25, inferiority: 15 },
          addTags: ["心惊胆战", "进退两难"]
        }
      ]
    }
  ],
  20: [
    {
      id: "age_20_street_romance",
      age: 20,
      stageName: "红尘微光 · 20岁",
      title: "后巷路边摊的温热砂锅与心动之人",
      scene:
        "二十岁这年深夜，在城中村大排档避雨时，在隔壁饺子馆打工的年轻姑娘/小伙看到你浑身湿透，热心地端来一碗热汤：“夜里凉，快喝点暖暖胃。”雨水顺着屋檐滴落，在肮脏冰冷的社会泥潭里，你第一次感受到了人间的温度。",
      type: "choice",
      choices: [
        {
          text: "【真诚告白 · 彼此取暖】：‘等我攒够十万块就彻底洗手不干，咱们租个小门面踏实过日子！’",
          detail: "向对方倾吐心迹，在漆黑夜色中牵起了那双粗糙温暖的手，渴望被温暖救赎。",
          reaction: "对方眼眶微红答应了你，你暗暗发誓一定要洗干净双手，给对方一个堂堂正正的未来！",
          delta: { happiness: 35, resilience: 30, kinshipGuilt: -10, savings: -3000 },
          addTags: ["心有所属", "相濡以沫"]
        },
        {
          text: "【独身自立 · 锁紧心扉】：自知干的是刀口舔血的见不得光营生，不能连累无辜的好人，强忍悸动退回阴影",
          detail: "喝完热汤放下十块钱快步离开，逼迫自己硬起心肠，不把别人拖入自己的深渊。",
          reaction: "转身走入暴雨中，清冷彻骨，你紧紧咬着牙关，把所有软弱埋葬在心底深处。",
          delta: { resilience: 30, cognition: 20, inferiority: 20 },
          addTags: ["独身自立", "锁紧心扉"]
        }
      ]
    }
  ],
  21: [
    {
      id: "age_21_street_arrest",
      age: 21,
      stageName: "雷霆天降 · 21岁",
      title: "经侦雷霆收网与看守所第一夜",
      scene:
        "二十一岁盛夏凌晨，出租屋铁门轰然被破开！‘别动！警察！’冰冷坚硬的手铐瞬间扣在手腕上，警灯刺破夜空。看守所高墙铁门在身后哐当落锁，剃光头发、换上黄色号服，坐在冷硬的通铺上背诵监规。高墙小窗外只有一角凄冷的残月，泪水第一次不可遏制地涌出眼眶。",
      type: "choice",
      choices: [
        {
          text: "【如实彻底坦白全部非法资金链路，认罪悔罪争取宽大】：绝不再心存半点侥幸！",
          detail: "不再抵抗狡辩，将上线猴哥与全部银行卡流向原原本本写成自白书，彻底认罪。",
          reaction: "办案民警严肃指出你的悔罪表现将写入起诉意见书，你在铁窗下体会到良知的苏醒。",
          delta: { resilience: 35, inferiority: 30, health: -15, savings: -20000 },
          addTags: ["悔罪坦白", "高墙自省"]
        }
      ],
      reflection: "手铐锁住的不止是双手，更是走偏的半生。贪图快钱的代价，是自由的剥夺。"
    }
  ],
  22: [
    {
      id: "age_22_street_prison_shoes",
      age: 22,
      stageName: "高墙缝纫 · 22岁",
      title: "高墙劳动与老母亲托人送来的千层底布鞋",
      scene:
        "二十二岁，在看守所参加缝纫机劳作。管教民警把你叫进谈话室，递给你一双包裹在旧报纸里的千层底棉布鞋和一封信。信是老母亲托居委会写来的，信纸上布满了干涸的泪痕：“儿啊，妈在老家好好的，你在里面听管教的话好好改造，妈天天算着日子等你回家……”你抱着那双密密麻麻千层底的布鞋，在管教面前跪在地上嚎啕大哭。",
      type: "choice",
      choices: [
        {
          text: "【立誓脱胎换骨！拼命磨练缝纫与机修手艺，积极挣分减刑】：用汗水洗刷身上的罪孽！",
          detail: "每天第一个进车间最后一个离开，把缝纫机修得飞快，成为监区里的劳动改造标兵。",
          reaction: "管教干警在考核表上为你记大功一次，母亲的布鞋被你整整齐齐叠放在枕边，成了你的命根子。",
          delta: { resilience: 40, kinshipGuilt: -30, inferiority: -10 },
          addTags: ["洗心革面", "脱胎换骨"]
        }
      ],
      reflection: "母亲用一针一线缝出的鞋底，垫起了你重新做人的骨气。"
    }
  ],
  23: [
    {
      id: "age_23_street_verdict",
      age: 23,
      stageName: "法庭宣判 · 23岁",
      title: "法庭审判与探监室双层玻璃外母亲的满头白发",
      scene:
        "二十三岁，法院正式开庭宣判。鉴于系从犯、且认罪坦白退缴违法所得，依法被判处有期徒刑两年缓刑/或刑满折抵。走出法庭押解室，隔着双层隔音玻璃，你看到了坐在旁听席最末排的老母亲——两年前原本满头青丝的母亲，如今头发全白了，拄着一根褪色的竹拐棍，颤巍巍把枯瘦的手掌紧紧贴在冰冷的玻璃上。",
      type: "choice",
      choices: [
        {
          text: "【隔着玻璃给老母亲长跪重重磕了三个响头：‘妈，儿子对不起您，出来一定给您尽孝！’】：誓死痛改前非！",
          detail: "眼泪砸在水泥地上，痛彻心扉的愧疚彻底击碎了少年时代的一切浮夸与荒唐。",
          reaction: "母亲在玻璃对面泣不成声，法警也为之动容，你把这一幕刻入骨髓，誓死不再犯罪！",
          delta: { resilience: 45, kinshipGuilt: -20, social: -20 },
          addTags: ["长跪谢罪", "铁骨尽孝"]
        }
      ],
      reflection: "世上最大的痛莫过于让母亲白头。走出这一道坎，这辈子唯有干干净净做人。"
    }
  ],
  24: [
    {
      id: "age_24_street_release",
      age: 24,
      stageName: "重回人世 · 24岁",
      title: "迈出高墙大门 · 居委会老书记递来的一杯热茶",
      scene:
        "二十四岁，沉重铁门吱呀打开，你穿上母亲送来的干净布鞋，昂头迈出看守所。回到老城厢，身上有了案底污点，找工作屡屡被招工办和保安白眼唾弃。街坊邻里指指点点中，居委会老书记把你拉进办公室，倒了一杯热茶塞到你手里：“小伙子，走过弯路不怕，只要肯出力气，地上泥巴里也能抠出干净馒头！”",
      type: "choice",
      choices: [
        {
          text: "【向老书记深深鞠躬，咬牙发誓：‘大娘，我绝不给咱街坊丢人，脏活累活我都干！’】：不畏冷眼！",
          detail: "放下一切虚荣面子，主动登记社区低保公益岗位，哪怕去通下水道、清扫垃圾也绝不退缩。",
          reaction: "老书记眼眶湿润拍了拍你的肩膀，你迎着阳光走回小巷，脊梁骨挺得笔直！",
          delta: { resilience: 40, inferiority: -20, savings: 5000 },
          addTags: ["坦荡自新", "硬气求存"]
        }
      ],
      reflection: "有人吐你唾沫，也有人递你热茶。人世间的冷暖，从此成了你脚下最结实的泥土。"
    }
  ],
  25: [
    {
      id: "age_25_street_clean_labor",
      age: 25,
      stageName: "汗水洗尘 · 25岁",
      title: "农贸批发市场凌晨三点扛大葱与卸土豆",
      scene:
        "二十五岁，在农贸批发市场做起了装卸临时工。每天凌晨两点半顶着刺骨寒风推车进场，一千斤一车的大葱土豆麻袋，全靠肩膀往上扛。汗水湿透了棉袄又被寒风吹干，肩膀磨破的皮黏在秋衣上，撕下来带着血痂。但当你在月底领到厚厚一叠带着泥土气息的干净工钱时，你把钱全部塞进母亲手里，心里是从未有过的坦荡踏实！",
      type: "choice",
      choices: [
        {
          text: "【咬碎牙关拼命出苦力，用诚实拼命赢得批发部老掌柜的敬重与长包合同】：干净挣饭吃！",
          detail: "从不偷懒短秤，帮雇主把货垛码得齐齐整整，老板逢人便夸‘这小伙子有把子死力气，靠得住！’",
          reaction: "每月拿到三千多干净血汗钱，老母亲给你做了一碗滚烫的手擀面，眼泪掉进面汤里，全是甜的。",
          delta: { resilience: 45, savings: 25000, inferiority: -25 },
          addTags: ["汗水洗尘", "干干净净"]
        }
      ],
      reflection: "每一滴血汗都是洗洁精，洗去了浮躁，洗出了堂堂正正的脊梁。"
    }
  ],
  26: [
    {
      id: "age_26_street_mother_ill",
      age: 26,
      stageName: "绝境重担 · 26岁",
      title: "母亲积劳成疾重病住院 · 十五万自费缺口如泰山压顶",
      scene:
        "二十六岁这年冬天，多年为你担惊受怕的老母亲终于倒下了，突发重度脑梗塞伴随心衰被送进{hospital}急救抢救！医生开出十四万手术自费与药物治疗账单。居委会和老街坊凑了两万块，缺口依然高达十二万！黑夜里你守在抢救室走廊，看着病床上戴着氧气面罩的枯瘦母亲，眼眶裂痛：“妈……哪怕把我这条命卖了，我也要把您救回来！”",
      type: "choice",
      choices: [
        {
          text: "【签下还款血书并向民间亲友借款十五万：‘大夫，全力抢救！我有一身骨肉，天大的债我一个人还！’】：至孝担当！",
          detail: "在急救协议上按下鲜红的手印，挨家挨户敲开亲友大门下跪借钱，誓死护住母亲的生命微光。",
          reaction: "母亲从死亡线上抢救回来转入重症监护，你满身是汗瘫坐在台阶上，肩上压上了十五万巨额债务！",
          delta: { savings: -150000, kinshipGuilt: -40, resilience: 50 },
          addTags: ["负重背债", "至孝担当", "血汗还债"]
        },
        {
          text: "【配合医生保守统筹治疗，不向民间恶性借贷低头，日夜守护在病榻前尽孝】：量力而行！",
          detail: "深知若借高利贷全家都将万劫不复，坚决用合法医保与双手照顾母亲，端屎端尿寸步不离。",
          reaction: "母亲病情逐步平稳，紧紧攥着你的手流泪，你在苦难中撑起了这个摇摇欲坠的家。",
          delta: { savings: -30000, kinshipGuilt: 20, resilience: 30 },
          addTags: ["理性止损", "守住底线"]
        }
      ],
      reflection: "当年母亲救了你的灵魂，今天你拼尽全力也要护住母亲的生命。"
    }
  ],
  27: [
    {
      id: "age_27_street_redemption",
      age: 27,
      stageName: "二十七岁 · 人生关隘",
      title: "二十七岁人生评估与终极命运抉择",
      scene:
        "二十七岁，从少年辍学涉灰、高墙铁窗下痛哭长跪，到靠一双手在农贸市场扛大葱卸土豆。你用五年血汗洗净了污泥，母亲病情平稳，你迎来了彻底改写后半生命运的重大转折点：",
      type: "choice",
      choices: [
        {
          text: "【深耕市井大排档 · 从冷库扛冻猪肉做起】：‘老子从此堂堂正正做人，每一分钱都要干干净净！’",
          detail: "接驳市井底层大排档，凌晨三点扛冻猪肉挣辛苦钱，誓在人间烟火里自强自立！",
          reaction: "你重新找回了身为人的脊梁骨，堂堂正正走向人生的下半场！",
          delta: { resilience: 40, savings: 20000, inferiority: -20 },
          addTags: ["浪子回头", "大排档自立"]
        },
        {
          text: "【绝境孤注 · 签下黑中介劳务合同飞赴海外沙漠出苦力还债】：为了还清母亲抢救欠下的巨债，远赴海外工地搏命！",
          detail: "为了还清十五万医药费，签下严苛的劳务合同飞往中东波斯湾五十度沙漠工地绑扎钢筋！",
          reaction: "登机远行，背负着全家的生死存亡，誓在黄沙烈日下用血汗为家族凿出一条生路！",
          delta: { savings: 20000, resilience: 35, health: -15, rebellion: 20 },
          addTags: ["海外苦力", "血汗还债"]
        },
        {
          text: "【在老街盘下一间五金实体维修铺，靠真手艺安稳立足】：用诚实厚道赢得街坊信赖",
          detail: "虚心向老修车师傅学手艺，在熟人社会里一步一个脚印，做稳自己的生计营生。",
          reaction: "老街坊谁家工具坏了都来找你，你靠真本领赢得了人人的敬重！",
          delta: { savings: 30000, social: 20, resilience: 25 },
          addTags: ["实体门市", "安稳自立"]
        }
      ]
    }
  ]
};

export const CAREER_EVENTS_BY_TRACK: Record<
  "985_211" | "double_non" | "junior_college",
  Record<number, LifeEventNode[]>
> = {
  // --------------------------------------------------------------------------
  // 1. 985/211 顶尖名校阶层（大厂正规研发校招 / 基层选调锻炼 / 重点实验室研读）
  // --------------------------------------------------------------------------
  "985_211": {
    19: [
      {
        id: "age_19_985_lab",
        age: 19,
        stageName: "名校大一/大二 · 19岁",
        title: "国家重点实验室科研大创与学术起步",
        scene:
          "名校大一期末，你的专业绩点进入全系前5%，被选拔进入学院重点科研梯队。面对全英文学术文献与复杂算法模型，导师递给你一把自习室钥匙：“好好做实验，把基础打扎实，未来保研直博才有你的位置。”",
        type: "choice",
        choices: [
          {
            text: "泡在实验室跑仿真洗数据，协助师兄整理课题文献，争取本科发表论文",
            detail: "耐得住枯燥，一遍遍调整模型参数，展现出扎实的理工钻研底子。",
            reaction: "你的第一篇参与会议论文顺利收录，导师对你的严谨态度点头赞许。",
            delta: { cognition: 20, academicCapital: 20, inferiority: -10 },
            addTags: ["扎实科研", "学术苗子"]
          },
          {
            text: "组队备战大学生程序设计竞赛(ACM/蓝桥杯)，踏踏实实刷算法真题",
            detail: "与名校室友通宵刷LeetCode和Codeforces，把数据结构与算法练到条件反射。",
            reaction: "团队在区域赛斩获一等奖，你在校招提前批面试中有了实打实的硬履历。",
            delta: { cognition: 25, academicCapital: 15, social: 10 },
            addTags: ["算法竞赛", "技术底子"]
          },
          {
            text: "申请高校全额公派海外短期暑校，赴欧洲/北美顶尖高校交换研学",
            detail: "走出本土内卷语境，去看看国际一流大学的学术生态与生活节奏。",
            reaction: "开阔了眼界，打破了单一应试评价体系的执念，心胸更加坦荡从容。",
            delta: { cognition: 15, rebellion: 20, social: 15 },
            addTags: ["短期交流", "开阔视野"]
          }
        ]
      },
      {
        id: "age_19_985_civil",
        age: 19,
        stageName: "名校大一/大二 · 19岁",
        title: "模拟政协社团、基层民生调研与政务视野",
        scene:
          "名校大一期间，凭借沉稳作风与过硬的公文笔头，你担任了学院学生法学社团骨干，并带队赴省内县区开展‘城乡公共服务与基层治理’田野调研。看着老百姓真实的诉求与期盼，你的公共服务抱负不再是空泛口号。",
        type: "choice",
        choices: [
          {
            text: "扎实撰写基层民生调研报告并获省直机关优秀调研立项，公文逻辑愈发老练",
            detail: "白天深入村居走访座谈，夜晚整理台账数据，写出三万字政策建言报告受到专家高度评价。",
            reaction: "调研报告被省直智库刊发内参，学院党委特批专项科研奖学金，政务笔杆声名鹊起。",
            delta: { social: 25, cognition: 20, savings: 5000 },
            addTags: ["调研骨干", "笔头扎实"]
          },
          {
            text: "竞选担任学院分团委与学生会骨干，统筹大型青年志愿服务，磨炼协调手腕",
            detail: "周全处理校院两级日常事务，学会了在组织纪律与多元诉求之间寻找平衡最大公约数。",
            reaction: "辅导员与分管书记对你交口称赞，你展现出超越同龄人的政治站位与协调定力。",
            delta: { social: 30, resilience: 15, rebellion: -10 },
            addTags: ["学生骨干", "组织统筹"]
          },
          {
            text: "辅修法学与涉外政策第二学位，考取普通话一级与法律职业资格前置基础",
            detail: "苦读行政法与公共政策经典，打牢法治思维与综合政策分析的底层框架。",
            reaction: "专业绩点名列前茅，你在理论素养与综合素质上建立了牢固的竞争壁垒。",
            delta: { academicCapital: 25, cognition: 20, savings: 2000 },
            addTags: ["法学素养", "综合拔尖"]
          }
        ]
      },
      {
        id: "age_19_985_acad",
        age: 19,
        stageName: "名校大一/大二 · 19岁",
        title: "基础学科拔尖计划与前沿学术精读",
        scene:
          "入选名校基础理科拔尖人才培养梯队，由长江学者一对一担任学业导师。面对浩繁的英文原版专著与前沿科学猜想，你耐得住板凳十年冷，在图书馆与研讨室沉潜求索。",
        type: "choice",
        choices: [
          {
            text: "沉浸于基础理论文献精读与数学物理推导，在讨论班上作精彩前沿主旨报告",
            detail: "一遍遍验证理论定理，展现出纯粹的科学求知欲与扎实的学术基本功。",
            reaction: "导师赞叹你的理论悟性，直接将你纳为国家重点基础课题的核心助理。",
            delta: { academicCapital: 25, cognition: 25, inferiority: -10 },
            addTags: ["潜心求索", "学术骨干"]
          },
          {
            text: "申请高校公派海外知名学府短期研修，与国际顶尖学者面对面研讨学术课题",
            detail: "走出本土单一语境，去看看国际一流学术机构的科研氛围与生活节奏。",
            reaction: "学术视野大开，打破了狭隘的做题思维，立志攀登人类科学的高峰。",
            delta: { cognition: 25, rebellion: 20, social: 15 },
            addTags: ["国际视野", "前沿触觉"]
          }
        ]
      }
    ],
    20: [
      {
        id: "age_20_985_romance",
        age: 20,
        stageName: "红尘初动 · 20岁",
        title: "自习室走廊的微光与心动之人",
        scene: "名校大三这一年，在图书馆深夜自习室外的走廊、或大厂实习工位的转角，你遇见了那个让你心跳加速的人。雨夜同撑的一把伞，自习室偷偷递来的一盒温牛奶，让在庞大城市里独行的你，第一次体会到了心安的温度。",
        type: "choice",
        choices: [
          {
            text: "【主动表白 · 执手风雨】：‘未来无论在哪个城市，我都想和你一起扛。’ 确定恋爱关系",
            detail: "将心意毫无保留地倾诉，两人相拥在校园银杏树下，约定在毕业大考与现实风雨中同甘共苦、相濡以沫。",
            reaction: "有了相守一生的依靠，漂泊的内心有了根基，下自习后看到对方等在楼下的身影，满心都是暖意！",
            delta: { happiness: 35, resilience: 25, kinshipGuilt: -10, savings: -3000 },
            addTags: ["心有所属", "相濡以沫"]
          },
          {
            text: "【以学业与前途为重 · 锁紧心扉】：自知出身平凡、前途未定，不敢轻易许诺，克制退回朋友界限",
            detail: "将全部悸动深埋心底，逼迫自己专注在学术论文与硬核代码上，立志先在省城拿到立足的饭碗。",
            reaction: "虽然夜深人静时有一丝清冷，但你保持了绝对的自立与清醒，把全部精力投注于自身蜕变！",
            delta: { cognition: 20, academicCapital: 20, resilience: 15, inferiority: 10 },
            addTags: ["独身自立", "锁紧心扉"]
          }
        ]
      },
      {
        id: "age_20_985_intern",
        age: 20,
        stageName: "名校大二/大三 · 20岁",
        title: "大厂日常研发实习与校园生活",
        scene:
          "大三暑期，凭借985学历优势与笔试高分，你通过正规校招通道进入一线科技企业或外企研发中心实习，日薪两百多元，第一次领到带有工号牌的工卡，挤在早高峰的科技园地铁里。",
        type: "choice",
        choices: [
          {
            text: "在业务组认真接需求、修底层缺陷，把日常代码规范练到标准严谨",
            detail: "不图虚名，虚心向带教资深工程师请教架构设计，踏实解决每一个工程小问题。",
            reaction: "带教导师对你的踏实肯干非常认可，期末实习答辩获评优秀，提前拿到转正意向书。",
            delta: { cognition: 20, resilience: 15, savings: 8000, inferiority: -10 },
            addTags: ["大厂正规实习", "稳步转正"]
          },
          {
            text: "在学院担任学生会骨干与党支部支委，协助辅导员处理行政事务",
            detail: "做事周全细致，学会了在体制与组织体系中协调各方人际关系与日常事务。",
            reaction: "受到学院领导和老师的信任，被列入选调生骨干重点培养考察名单。",
            delta: { social: 25, cognition: 10, rebellion: -10 },
            addTags: ["学生干部", "选调生苗子"]
          },
          {
            text: "利用业余时间系统自学开源系统与全栈开发，搭建独立的个人技术博客",
            detail: "保持极客好奇心，钻研底层原理，写下数十篇深入浅出的高质量技术解析。",
            reaction: "博客访问量破万，GitHub收到了来自同行的赞赏与关注，技术视野大开。",
            delta: { rebellion: 20, cognition: 20, savings: 3000 },
            addTags: ["开源探索", "极客精神"]
          }
        ]
      },
      {
        id: "age_20_985_civil",
        age: 20,
        stageName: "名校大二/大三 · 20岁",
        title: "省直/市直机关政务暑期实习与选调生前置培养",
        scene:
          "大三暑期，凭借名校推荐与过硬综合素质，你进入省直部门或市直行政审批服务中心开展为期两个月的政务暑期实习。每天协助处室整理案卷台账、草拟会议纪要与调研专报，第一次近距离触摸公共权力运行的脉搏与体制规矩。",
        type: "choice",
        choices: [
          {
            text: "协助处室起草全省民生实事重点督办简报，格式严谨条理清晰，受处长重点嘉奖",
            detail: "细致严谨，不厌其烦校对公文每一处数据与措辞，展现出极为扎实的政务综合素质。",
            reaction: "分管厅领导在简报上圈阅批示，处室领导主动为你向省委组织部推荐选调重点考察培养。",
            delta: { social: 25, cognition: 20, savings: 6000 },
            addTags: ["政务骨干", "选调青睐"]
          },
          {
            text: "主动轮岗到政务服务便民一线窗口，帮办事群众解决审批堵点，收到多封群众表扬信",
            detail: "扑下身子为老百姓办实事，设身处地化解企业与群众办事痛点，作风朴实真诚。",
            reaction: "大厅领导通报表扬你的务实为民作风，你深切体会到全心全意为人民服务的真正尊严。",
            delta: { social: 30, resilience: 20, happiness: 15 },
            addTags: ["扎根一线", "群众口碑"]
          },
          {
            text: "系统研读历年省委定向选调生招录策论，每晚在自习室刷真题磨砺申论与行政素养",
            detail: "把握政策导向，将专业知识与国家宏观治理大政方针融会贯通，申论功底如火纯青。",
            reaction: "模拟测试成绩稳居全校前三，你对大四选调生选拔考试胜券在握。",
            delta: { academicCapital: 25, cognition: 20, savings: 2000 },
            addTags: ["申论拔尖", "选调储备"]
          }
        ]
      },
      {
        id: "age_20_985_acad",
        age: 20,
        stageName: "名校大二/大三 · 20岁",
        title: "国家级大创重点攻关与保研学术论文",
        scene:
          "大三学年，你作为项目负责人主持的国家级大学生创新科研课题进入攻坚期。在国家重点实验室经过数百次仿真计算与理论修正，成功取得突破性成果，准备在学术年会上作英文分论坛口头报告。",
        type: "choice",
        choices: [
          {
            text: "全力以赴冲刺国际权威SCI/SSCI一区论文收录，提前锁定名校保研直博资格",
            detail: "耐得住枯燥寂寞，反复打磨论文逻辑与实验图表，审稿专家给出高度正面评价。",
            reaction: "论文被权威期刊正式录用，导师提前为你保留了国家重点实验室免试直博名额。",
            delta: { academicCapital: 30, cognition: 25, savings: 8000 },
            addTags: ["顶刊一作", "保研直博"]
          },
          {
            text: "参与重大产学研协同攻关项目，打通学术算法在现代化高端产业中的工程落地",
            detail: "既追求理论高度，又关注现实应用，带领团队成功将算法落地在产业装备中。",
            reaction: "合作企业开出高额课题奖金，你的学术实践能力在全校研究生院提前传为佳话。",
            delta: { cognition: 25, savings: 18000, social: 20 },
            addTags: ["产学融合", "复合英才"]
          }
        ]
      }
    ],
    21: [
      {
        id: "age_21_985_offers",
        age: 21,
        stageName: "名校大四秋招 · 21岁",
        title: "毕业去向大抉择：大厂研发、基层选调与保研深造",
        scene:
          "大四秋招，名校的底蕴为你赢得了多样而体面的入场券：大厂正规初级工程师校招录用函、省委定向选调生名额，以及重点实验室保研录取通知书，摆在你的书桌上。",
        type: "choice",
        choices: [
          {
            text: "签约科技公司正规研发工程师校招Offer（年薪22W~28W，白领工位与五险一金）",
            detail: "凭自己的专业脑力自立自强，踏踏实实开启一线城市的白领职业生涯。",
            reaction: "拿到正式录用签约，每月有一份体面安稳的收入，终于不再需要向家里伸手要钱。",
            delta: { savings: 25000, cognition: 20, resilience: 15, inferiority: -15 },
            addTags: ["正规校招", "职场起航"]
          },
          {
            text: "签约省委定向选调生，入职为试用期选调生，准备赴基层一线锻炼两年",
            detail: "选择进入公共服务体系，按照规定从乡镇/街道基层做起，走群众路线。",
            reaction: "父母在老家倍感安心与光荣，亲友称赞你走上了稳健有前途的正规仕途大道。",
            delta: { kinshipGuilt: 20, social: 20, savings: 8000, rebellion: -10 },
            addTags: ["定向选调", "基层锻炼"]
          },
          {
            text: "接下名校国家重点实验室免试保研资格，攻读工学硕士学位继续深造",
            detail: "渴望在专业领域沉淀更深的技术壁垒，不急于过早投入职场内卷。",
            reaction: "国家与导师助研津贴能够覆盖日常开销，你留校开启了为期三年的硕士学术长跑。",
            delta: { academicCapital: 25, cognition: 25, inferiority: -10 },
            addTags: ["名校保研", "学术深造"]
          }
        ]
      }
    ],
    22: [
      {
        id: "age_22_985_launch",
        age: 22,
        stageName: "步入社会/研一 · 22岁",
        title: "职场新人的合租日常与基层的泥土气",
        scene:
          "二十二岁这年，你真正步入了成人社会的真实轨道：或是在城市科技园区附近跟同事合租单间、按部就班打卡上班；或是在乡镇基层穿着旧夹克走村入户整理台账；或在实验室帮导师做实验写开题报告。",
        type: "choice",
        choices: [
          {
            text: "在大厂做初级研发：熟悉业务代码，日常接需求写单测，在周报与OKR中迅速成长",
            detail: "虽有偶尔的版本上线通宵值班，但大平台的规范流程让你受益匪浅，做事实事求是。",
            reaction: "顺利通过半年试用期转正，定级为正式中级工程师，月薪小幅上浮，生活安定。",
            delta: { cognition: 20, resilience: 15, savings: 18000 },
            addTags: ["大厂转正", "扎实业务"]
          },
          {
            text: "在选调基层一线：走村入户调解矛盾、整理乡村振兴台账，褪去名校学生的清高",
            detail: "学会了和老百姓打成一片，学会了讲当地方言和递烟倒水，经受了基层的真切洗礼。",
            reaction: "乡镇老书记拍着你的肩膀夸赞‘名校娃娃能扑下身子干实事’，群众口碑极好。",
            delta: { social: 20, resilience: 20, kinshipGuilt: 10 },
            addTags: ["贴近基层", "接地气"]
          },
          {
            text: "研一实验室深造：研读前沿英文顶会论文，帮导师打磨自然科学基金申报书",
            detail: "耐得住板凳十年冷，在繁复枯燥的学术数据与组会汇报中磨砺学术心智。",
            reaction: "研究方向顺利通过学院中期答辩，导师对你的理论基本功给予高度肯定。",
            delta: { academicCapital: 20, cognition: 20, savings: 5000 },
            addTags: ["课题攻坚", "学术沉潜"]
          }
        ]
      }
    ],
    23: [
      {
        id: "age_23_985_scale",
        age: 23,
        stageName: "职场第2年/研二 · 23岁",
        title: "独立负责业务模块与业务熟手",
        scene:
          "工作第二年（或研二开题阶段），你不再是那个手忙脚乱的初学者。大厂里你能独立负责一个完整业务子系统的交付；机关里你成了科长最得力的笔杆子；实验室里你开始带低年级师弟做实验。",
        type: "choice",
        choices: [
          {
            text: "在大厂独立承担核心模块重构优化，按期交付，年终考核拿到良好绩效(B+/A)",
            detail: "业务熟练，为人靠谱，在组里赢得了‘靠谱交付者’的好口碑，月薪达到2万元左右。",
            reaction: "年终拿到三个月年终奖，存折上的存款第一次突破了六位数，感到由衷的踏实。",
            delta: { savings: 35000, cognition: 15, resilience: 15 },
            addTags: ["靠谱交付", "中级工程师"]
          },
          {
            text: "基层锻炼期满合格，正式调回市直/县直机关业务科室，承担主要公文材料起草",
            detail: "作风沉稳严谨，公文写作条理分明，成了科室里干活最麻利的一级科员业务骨干。",
            reaction: "分管副局长经常点名让你列席重要业务协调会，成为单位重点考察的年轻骨干。",
            delta: { social: 20, cognition: 15, kinshipGuilt: 15, savings: 10000 },
            addTags: ["机关骨干", "作风扎实"]
          },
          {
            text: "硕士科研攻关突破，在国际权威期刊上以第一作者录用高质量学术论文",
            detail: "经历了上百次实验失败后终于取得理想成果，论文审稿人给出了高度正面评价。",
            reaction: "获得国家研究生一等奖学金，受邀在全国学术年会上做分论坛学术汇报。",
            delta: { academicCapital: 25, cognition: 20, inferiority: -15, savings: 12000 },
            addTags: ["顶刊一作", "学术嘉奖"]
          }
        ]
      }
    ],
    24: [
      {
        id: "age_24_985_peak",
        age: 24,
        stageName: "职场第3年 · 24岁",
        title: "大厂寒冬收缩、机关清苦坚守与存折十五万",
        scene:
          "二十四岁这一年，大环境风云突变。科技行业迎来刺骨寒冬，同组资深员工突然被HR约谈领离职大礼包，工位上一夜之间空出大片；体制内也面临繁重考核台账与下沉迎检，食堂里老同志低声议论着紧缩的津贴。存折上的十五万元是你日夜熬出来的底牌。深夜下班走在西二旗天桥上，寒风刺骨，你第一次真切看清了时代的残酷褶皱。",
        type: "choice",
        choices: [
          {
            text: "死磕底层系统稳定性，通宵排查高并发链路，在行业裁员风暴中保住核心盘",
            detail: "放弃一切虚幻泡沫，用最严谨过硬的代码与交付战功证明不可替代性，年薪稳步调至30W出头。",
            reaction: "在部门缩编中顺利挺过答辩，存折稳稳迈过十五万大关，但你深知在大厂螺丝钉体系中随时要面对风浪。",
            delta: { savings: 45000, cognition: 20, resilience: 20 },
            addTags: ["业务中坚", "风雨求存"]
          },
          {
            text: "体制内任职定级为一级科员（硕士二级主任科员），扑下身子做基层经办",
            detail: "食堂早中餐两块钱，接下防汛迎检脏活累活，在公文与台账中磨砺政治定力。",
            reaction: "父母逢人便夸你工作安稳体面，你在时代的风浪中守住了一叶相对平静的孤舟。",
            delta: { kinshipGuilt: 20, happiness: 15, savings: 15000, resilience: 15 },
            addTags: ["安稳经办", "扎实基层"]
          },
          {
            text: "清醒察觉到行业年龄焦虑，业余自学雅思/托福，悄悄了解海外正规技术移民政策",
            detail: "不甘心一辈子在单一考核体系里疲于奔命，趁着年轻为自己悄悄留下一条后路。",
            reaction: "首战雅思拿下7.0分，你惊喜地发现自己的名校学历在海外紧缺人才列表里名列前茅。",
            delta: { rebellion: 25, cognition: 20, savings: -5000 },
            addTags: ["自学备考", "谋求后路"]
          }
        ]
      }
    ],
    25: [
      {
        id: "age_25_985_crossroads",
        age: 25,
        stageName: "走向成熟 · 25岁",
        title: "资深工程师带新人、机关骨干与三十岁前夕的思考",
        scene:
          "走向社会的第四个年头，二十五岁的你成为了组里经验丰富、能带实习生的资深工程师(Senior)，或机关科室里不可或缺的业务中坚。看着大环境的波动与身边人沉重的房贷，你开始认真规划下一个五年。",
        type: "choice",
        choices: [
          {
            text: "在职场升为资深技术骨干(Senior)，带两名应届生，年薪稳步调至35W左右",
            detail: "技术全面，能够跨部门协调复杂接口，但深刻体会到技术岗向上走的天花板。",
            reaction: "年终绩效平稳，存折上的活期存款积攒到了二十五万元，拥有了抵御失业的铠甲。",
            delta: { savings: 50000, cognition: 15, resilience: 15 },
            addTags: ["资深骨干", "积攒底牌"]
          },
          {
            text: "机关科室年度考核获评优秀，承担重点综合性专项汇报工作，生活平稳体面",
            detail: "作风沉稳老练，在体制内圈层积累了良好的人缘与口碑，安顿好老家父母的就医体检。",
            reaction: "在老家省城按揭看中了一套通勤便利的小户型，家庭关系和睦融洽，现世安稳。",
            delta: { kinshipGuilt: 20, social: 20, savings: 20000 },
            addTags: ["单位中坚", "现世安稳"]
          },
          {
            text: "正式准备好海外技术工签/高校二硕申请全套文书，锁定海外求职与签证通道",
            detail: "经过两年的调研与准备，你拿着雅思成绩与名校成绩单，坦然开启向外看的步伐。",
            reaction: "海外雇主面试反馈积极，你收到了第一封正式海外工作签证资格确认函。",
            delta: { rebellion: 30, cognition: 20, savings: -15000 },
            addTags: ["拿到工签意向", "踏出第一步"]
          }
        ]
      }
    ],
    26: [
      {
        id: "age_26_985_anxiety",
        age: 26,
        stageName: "天命关卡 · 26岁",
        title: "家庭天命大病与ICU走廊的长椅",
        scene:
          "二十六岁这年深秋，深夜两点刺耳的电话铃声骤然划破宁静——老家父亲突发急性脑梗伴大面积心肌梗死，被120急救车呼啸送进{hospital}重症监护室(ICU)。你连夜请假冲上最早一班高铁赶回老家。ICU门外弥漫着刺鼻的来苏水味，主治医生递出病危通知书：“每天自费进口药物与监护上万元，做急诊搭桥与支架自费缺口至少十五万，家属得马上筹钱拿主意。”",
        type: "choice",
        choices: [
          {
            text: "【倾尽积蓄并向亲友高利借债十五万：‘大夫，用最好的药，誓死抢回我爸！’】：至孝救赎",
            detail: "毫不犹豫掏空多年打拼积攒下的全部存款，并签下沉甸甸的十五万借款条据，红着眼守在ICU长椅上。",
            reaction: "父亲从生死关头艰难抢救过来转入普通病房，母亲抱着你痛哭，但你瞬间背上了十五万巨额债务，深感肩头万钧重负！",
            delta: { savings: -150000, kinshipGuilt: -35, resilience: 40, health: -10 },
            addTags: ["负重背债", "至孝担当", "血汗还债"]
          },
          {
            text: "【动用医保统筹额度维持保守稳妥治疗，量力而行，坚决不背负无力偿还的民间债务】：理性克制",
            detail: "深知家里底子薄弱，理性配合医生走医保目录内保守溶栓方案，在现实与孝心的煎熬中做出苦涩平衡。",
            reaction: "父亲病情逐步稳定出院休养，虽然落下轻微行动不便，但家庭财务防线没有崩塌，你在愧疚与理性中坚强成熟。",
            delta: { savings: -40000, kinshipGuilt: 25, resilience: 20 },
            addTags: ["理性止损", "守住底线"]
          },
          {
            text: "【父亲病情经保守治疗平稳化解，你把积攒的三十万现金握紧在手，坚决不跟风高位接盘期房】：从容底牌",
            detail: "虚惊一场，父母体检指标恢复平稳。看着身边同事被三十年房贷掏空，你坚决握紧现金流抵御周期风浪。",
            reaction: "内心获得了前所未有的笃定与从容，手握三十万流动现金安全垫，拥有随时转型的自由！",
            delta: { rebellion: 25, resilience: 25, savings: 40000 },
            addTags: ["清醒理智", "握紧现金"]
          }
        ]
      }
    ],
    27: [
      {
        id: "age_27_985_dossier",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene:
          "二十七岁这一年，你在省城出租屋阳台上俯瞰着万家灯火。名校十二年的艰苦长跑与毕业五年的沉稳积累，让你在这一年拥有了为自己人生掌舵的全部底气与从容。面对人生下半场，你的抉择是：",
        type: "choice",
        choices: [
          {
            text: "【顺势深耕 · 平台与体制中坚】：在核心企业或公职机关稳扎稳打，承担家庭责任",
            detail: "陪伴父母在侧，在熟人社会与庞大国内市场中守住现世安稳与人间烟火，步步为营成为中流砥柱。",
            reaction: "你在熟悉的土壤上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
            delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
            addTags: ["深耕故土", "挑起大梁"]
          },
          {
            text: "【自立门户 · 创业办厂与自主工坊】：凭借积累的技术与人脉脱离打工体系，自主创业",
            detail: "敢想敢拼，不甘于平庸螺丝钉。创办属于自己的科技工作室、实体工坊或商贸公司。",
            reaction: "从给别人打工走向为自己负责，虽然承担风浪，但人生的方向盘彻底握在自己手中！",
            delta: { rebellion: 35, resilience: 30, savings: -20000 },
            addTags: ["自立门户", "商海搏击"]
          },
          {
            text: "【旷野退守 · 小城自洽与返乡安家】：看透一线高压内卷，带着积蓄回退二三线过松弛生活",
            detail: "不为虚浮攀比买单，回到生活节奏舒缓的宜居小城，买一套无贷款小房，追求真实的幸福与安详。",
            reaction: "彻底卸下了年龄与内卷焦虑，下班做饭散步，在热气腾腾的烟火里找到了内心的宁静。",
            delta: { happiness: 40, resilience: 25, savings: 20000 },
            addTags: ["小城自洽", "烟火人间"]
          },
          {
            text: "【绝境孤注 · 签下黑中介劳务合同飞赴海外出苦力还债】：债务催逼走投无路，出苦力救家",
            detail: "为了还清家里的重病巨债与高利贷，签下严苛的劳务合同，抵押护照飞往中东/非洲工地搏命换汇！",
            reaction: "登机远行，背负着全家的生死存亡，誓在黄沙烈日下用血汗为家族凿出一条生路！",
            delta: { savings: 20000, resilience: 35, health: -15, rebellion: 20 },
            addTags: ["海外苦力", "血汗还债"]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. 双非综合院校（普通本科实干 / 考研读研 / 稳健立足）
  // --------------------------------------------------------------------------
  "double_non": {
    19: [
      {
        id: "age_19_dn_library",
        age: 19,
        stageName: "双非大一/大二 · 19岁",
        title: "大学图书馆抢座与四六级刷分长跑",
        scene:
          "双非普本的资源相对有限，你深知不能随波逐流。每天清晨六点半在图书馆门前排队占座，背单词刷真题，在平淡的大学日常中寻找突围方向。",
        type: "choice",
        choices: [
          {
            text: "雷打不动每日自习八小时，主攻英语四六级与专业核心课，立志考研洗学历",
            detail: "用勤恳自律弥补起点劣势，把专业绩点刷到全系前10%，坚信知识能够改写未来。",
            reaction: "你的四六级高分一次性通过，成了宿舍里有名的自律狂人，专业课成绩扎实。",
            delta: { cognition: 15, academicCapital: 20, resilience: 15 },
            addTags: ["考研备战", "苦读自律"]
          },
          {
            text: "竞选学生会干部与社团骨干，锻炼日常沟通与活动组织手腕",
            detail: "深知社会规则看重人情练达，主动磨练自己的组织协调能力与公文撰写基础。",
            reaction: "你成为辅导员离不开的得力助手，在校内积累了良好的人际关系与处事手腕。",
            delta: { social: 20, cognition: 10, rebellion: -5 },
            addTags: ["人情练达", "学生骨干"]
          },
          {
            text: "兼职做家教与课外辅导，大学四年生活费完全自给自足",
            detail: "体恤父母挣钱不易，用自己的双手早早实现经济独立，踏实能吃苦。",
            reaction: "不仅没向家里要过零花钱，卡里还攒下了几千块应急资金，做人体面硬气。",
            delta: { savings: 6000, resilience: 15, inferiority: -10 },
            addTags: ["勤工俭学", "早早自立"]
          }
        ]
      },
      {
        id: "age_19_dn_civil",
        age: 19,
        stageName: "双非大一/大二 · 19岁",
        title: "图书馆抢座备战教资与团总支骨干磨砺",
        scene:
          "双非综合高校里，你早早明确了求稳的追求。每天清晨在图书馆占座，背诵普通话与教育学法学规范，同时担任班级与团总支骨干，锻炼公文写作与沟通能力。",
        type: "choice",
        choices: [
          {
            text: "踏实考取高级教师资格证与普通话一级，公文与综合成绩名列全系前茅",
            detail: "不混日子，大学期间早早拿下求职硬通票，为未来体制内招聘打下坚固基础。",
            reaction: "教资考试一次性高分通过，心里有了第一块踏实的就业压舱石。",
            delta: { cognition: 15, academicCapital: 20, savings: 2000 },
            addTags: ["教资在手", "踏实底牌"]
          },
          {
            text: "担任学院团总支主要学生骨干，协助辅导员处理各类行政杂务，锻炼周全处事手腕",
            detail: "认真梳理各类通知台账，磨炼公文撰写和待人接物的细致度，深受老师赞许。",
            reaction: "被学院评为优秀共青团干部，提前适应了体制行政的规矩与节奏。",
            delta: { social: 25, cognition: 10, rebellion: -10 },
            addTags: ["学生骨干", "处事周全"]
          },
          {
            text: "兼职辅导中小学生功课，生活费自给自足，体会到靠知识自立的踏实",
            detail: "体谅父母挣钱不易，用自己的双手早早实现经济独立，踏实能吃苦。",
            reaction: "不仅没向家里伸手，卡里还攒下了小额应急资金，做人体面硬气。",
            delta: { savings: 6000, resilience: 15, inferiority: -10 },
            addTags: ["勤工俭学", "早熟自立"]
          }
        ]
      },
      {
        id: "age_19_dn_biz",
        age: 19,
        stageName: "双非大一/大二 · 19岁",
        title: "校园商贸试水与沿海市场初探",
        scene:
          "你天生对商业流转有着敏锐嗅觉。在校期间敏锐捕捉到学生换季与二手交易需求，合伙搭建起校园物流与转转社群，利用课余时间跑批发市场与物流点。",
        type: "choice",
        choices: [
          {
            text: "靠诚信与薄利多销将校园物流代理做大，大学第一年便赚取了人生第一笔两万元净利润",
            detail: "不怕脏不怕累，起早贪黑搬运收发，靠口碑和信誉成为整栋宿舍楼的掌柜。",
            reaction: "年底存折上有了两万多元结余，你彻底告别了对家庭的生活费依赖。",
            delta: { savings: 20000, social: 20, resilience: 15 },
            addTags: ["小有斩获", "商业起步"]
          },
          {
            text: "苦练商务英语与数字营销运营，在跨境电商独立站中成功试单",
            detail: "把外语和市场知识转化为实际订单，早早融入市场真实商业运作。",
            reaction: "收到来自海外客户的第一笔外币汇款，你的商业视野大为开阔。",
            delta: { cognition: 20, resilience: 15, savings: 8000 },
            addTags: ["跨境试水", "数字商务"]
          }
        ]
      }
    ],
    20: [
      {
        id: "age_20_dn_romance",
        age: 20,
        stageName: "红尘初动 · 20岁",
        title: "实习下班的地铁站台与路边摊取暖",
        scene: "双非大三这一年，在考研自习室固定的桌位前，或是晚高峰挤地铁的站台口，你结识了一位同样在认真打拼的同龄人。两人常在路边摊分吃一碗热气腾腾的砂锅米线，互相打气鼓劲，交换着对未来的忐忑与憧憬。",
        type: "choice",
        choices: [
          {
            text: "【真诚告白 · 彼此取暖】：在平凡岁月里认定彼此，共同承担考研与求职的悲喜",
            detail: "眼里容不下世俗算计，在最一无所有的年纪牵起了对方的手，约定一起在二线省会按揭小家。",
            reaction: "寒风中有了相互取暖的怀抱，彼此成为对方最坚实的后盾，生活有了热气腾腾的奔头！",
            delta: { happiness: 35, resilience: 25, kinshipGuilt: -10, savings: -2000 },
            addTags: ["心有所属", "相濡以沫"]
          },
          {
            text: "【专注自身突围 · 暂锁心扉】：自知起点普通，发誓先在社会上站稳脚跟，不谈儿女情长",
            detail: "婉拒对方的好感，把所有业余时间压在考证与实习转正上，坚信只有自己强大了才能谈未来。",
            reaction: "你斩断了杂念，心无旁骛地在职场中拼杀，树立了极强的事业心与独立自立底色！",
            delta: { academicCapital: 20, resilience: 20, cognition: 15 },
            addTags: ["独身自立", "锁紧心扉"]
          }
        ]
      },
      {
        id: "age_20_dn_intern",
        age: 20,
        stageName: "双非大二/大三 · 20岁",
        title: "成长型民企日常实习与职业资格考证",
        scene:
          "大三上学期，你向多家民营企业和本地机构投递简历，进入省会一家成长型科技公司担任技术/业务日常实习生，日薪一百多元，踏踏实实从打杂学起。",
        type: "choice",
        choices: [
          {
            text: "全力以赴备战考研，把所有业余时间投入专业课与数学真题复习",
            detail: "‘既然第一学历普通，那我就一定要拿下重点大学研究生这张硬通票！’",
            reaction: "每天复习到深夜，模拟考成绩逐渐稳定在报考院校的分数线上。",
            delta: { academicCapital: 20, cognition: 15, health: -5 },
            addTags: ["专注考研", "求学翻盘"]
          },
          {
            text: "在民营企业踏踏实实从初级测试/技术支持做起，主动向老员工学实战经验",
            detail: "放平心态，不图虚名，在具体的业务开发与实操中积累宝贵经验。",
            reaction: "带教主管非常喜欢你的踏实肯干，主动为你争取了毕业后全职留用转正指标。",
            delta: { cognition: 15, resilience: 15, savings: 6000 },
            addTags: ["脚踏实地", "实干留用"]
          },
          {
            text: "报考高级中学教师资格证与地方招教基础课，为将来回老家当老师铺路",
            detail: "崇尚生活节奏与寒暑假的稳定，早早规划体面安稳的体制教职。",
            reaction: "顺利一次性拿下高级中学教师资格证，心里多了一块结实的求稳压舱石。",
            delta: { cognition: 15, kinshipGuilt: 15, social: 10 },
            addTags: ["教职压舱", "稳健规划"]
          }
        ]
      },
      {
        id: "age_20_dn_civil",
        age: 20,
        stageName: "双非大二/大三 · 20岁",
        title: "基层街道/政务大厅便民实习与省考行测备战",
        scene:
          "大三暑期，你申请到老家地级市政务服务中心或街道办事处开展为期两个月的实习。白天耐心接待办事群众、整理档案台账，晚上在自习室刷申论真题，早早为公务员省考与事业编制铺路。",
        type: "choice",
        choices: [
          {
            text: "踏踏实实刷完近十年省考国考行测与申论真题，模考成绩稳步突破135分",
            detail: "归纳总结题型规律，把申论大作文练到行文工整、立意深刻，应试功底深厚。",
            reaction: "辅导机构名师批改模考卷赞不绝口，你对毕业考编上岸底气十足。",
            delta: { academicCapital: 25, cognition: 15, resilience: 10 },
            addTags: ["考公冲刺", "刷题有成"]
          },
          {
            text: "在政务大厅窗口耐心接待群众、整理档案案卷，受到街道领导赞扬表彰",
            detail: "热心细致，不厌其烦解答老年人与企业办证难题，展现出务实本色。",
            reaction: "街道领导在总结会上点名肯定，你深切体会到为民解忧的踏实成就感。",
            delta: { social: 25, resilience: 15, savings: 5000 },
            addTags: ["基层口碑", "务实能干"]
          },
          {
            text: "参与基层社区矛盾纠纷排查志愿服务，深入掌握熟人社会人情世故与群众工作方法",
            detail: "学会了如何跟社区老百姓交心交底，说话通俗亲切，人情练达。",
            reaction: "居委会老书记夸你‘有灵性、能扛事’，你在本地社会积累了深厚群众基础。",
            delta: { social: 25, cognition: 15, kinshipGuilt: 10 },
            addTags: ["人情练达", "群众基础"]
          }
        ]
      },
      {
        id: "age_20_dn_biz",
        age: 20,
        stageName: "双非大二/大三 · 20岁",
        title: "进出口商贸公司业务跟单实习与供应链摸爬",
        scene:
          "大三阶段，你进入沿海一家进出口外贸公司担任业务跟单实习生。从核对发票、跟进海关报关到与海外客户邮件沟通，早早摸清了真实商业流转的底层密码。",
        type: "choice",
        choices: [
          {
            text: "凭借细致负责独立跟进三笔海外客商订单，拿到转正底薪与丰厚提成",
            detail: "不畏琐碎，认真把控出货质检与物流节点，为公司挽回数万元延误损失。",
            reaction: "外贸主管直接为你开出了大四提前留用转正的合同，月薪可观。",
            delta: { savings: 18000, social: 20, resilience: 15 },
            addTags: ["外贸熟手", "业务破局"]
          },
          {
            text: "掌握国内优质货源直供渠道，利用信息差试水自营小额分销",
            detail: "敏锐发现产业带工厂与终端市场的利润差，自己搭建独立供销渠道。",
            reaction: "流水滚滚而来，存折资金突破五万元，提前拥有了自立门户的商业底气。",
            delta: { savings: 25000, cognition: 20, rebellion: 15 },
            addTags: ["自立渠道", "商海初啼"]
          }
        ]
      }
    ],
    21: [
      {
        id: "age_21_dn_jobs",
        age: 21,
        stageName: "双非大四秋招 · 21岁",
        title: "招聘会人潮、考研与考公的大决选",
        scene:
          "双非高校的综合招聘会上，人潮涌动。手里捏着厚厚一沓简历，面对着各方岗位的激烈角逐，你迎来了人生的关键转折点：",
        type: "choice",
        choices: [
          {
            text: "考研初试发挥出色，以优异成绩考取省属重点大学硕士研究生（读研深造）！",
            detail: "数千个日夜的汗水终于兑现，成功拿到全日制研究生录取通知书，提升了学历门槛。",
            reaction: "导师在拟录取名单上签字确认，你在家里扬眉吐气，安心准备读研新生活。",
            delta: { academicCapital: 25, cognition: 20, inferiority: -15, happiness: 25 },
            addTags: ["考研上岸", "读研深造"]
          },
          {
            text: "签约二线省会成长型科技民企正式研发/业务技术岗，月薪7000~9000+五险一金",
            detail: "先在二线城市落脚站稳，靠自己的双手开启独立打拼的第一步，踏实务实。",
            reaction: "虽然租房通勤辛苦，但你拥有了正规民企的正式工号与稳定的现金流，自立自强。",
            delta: { savings: 12000, resilience: 15, rebellion: 10 },
            addTags: ["民企立足", "踏实起跑"]
          },
          {
            text: "报名老家县城事业单位与三支一扶考试，以优异面试成绩考取基层正式编制",
            detail: "顺应家庭期待，在父母熟悉的熟人社会中寻求安稳体面与长远保障。",
            reaction: "顺利通过体检政审，成为全家引以为傲的体制内正式工作人员，父母心安。",
            delta: { kinshipGuilt: 20, social: 15, savings: 6000, rebellion: -10 },
            addTags: ["事业编制", "故土安顿"]
          }
        ]
      }
    ],
    22: [
      {
        id: "age_22_dn_entry",
        age: 22,
        stageName: "步入社会/研一 · 22岁",
        title: "合租公寓的柴米油盐与职场初体验",
        scene:
          "毕业这年，你在二线省会城市租了一个朝北的普通单间，或是步入了研究生院继续念书。每天早起挤地铁公交，在最平凡的日子里认真生活。",
        type: "choice",
        choices: [
          {
            text: "在民企认真接需求写业务，肯吃苦能加班，提前两个月通过试用期转正",
            detail: "用踏实靠谱的态度赢得同事信任，把手头每一个杂活都落到实处，月薪稳步调整。",
            reaction: "主管在月度例会上点名表扬你‘学习能力强，交代的事能兜底’，工作彻底稳定。",
            delta: { resilience: 20, savings: 12000, cognition: 10 },
            addTags: ["民企骨干", "踏实肯干"]
          },
          {
            text: "研一阶段专心跟导师做课题，打磨专业技能，并自学Python与外语工具",
            detail: "珍惜研究生三年的宝贵时光，持续给自己增加硬实力筹码。",
            reaction: "独立完成了一篇省级学术期刊论文投稿，科研基本功得到了扎实训练。",
            delta: { cognition: 15, academicCapital: 15, savings: 3000 },
            addTags: ["读研打磨", "厚积薄发"]
          },
          {
            text: "在事业单位负责科室日常业务，熟悉红头文件运转流程，生活规律作息良好",
            detail: "按时上下班，在单位食堂吃早中饭，每月存下一半工资，生活踏实安详。",
            reaction: "父母在老家倍感宽慰，逢年过节亲朋好友夸赞你工作安稳体面。",
            delta: { social: 15, kinshipGuilt: 15, savings: 8000 },
            addTags: ["体制安顿", "规律作息"]
          }
        ]
      }
    ],
    23: [
      {
        id: "age_23_dn_growth",
        age: 23,
        stageName: "职场第2年/研二 · 23岁",
        title: "业务熟练、带新手与小幅度涨薪",
        scene:
          "工作第二年（或研二阶段），你不再是那个战战兢兢的应届菜鸟。在民企你成了能独立负责小项目业务的熟手；体制内你也对各项审批经办业务轻车熟路。",
        type: "choice",
        choices: [
          {
            text: "民企主管离职，你凭借任劳任怨与技术稳定被任命为项目小组长，月薪调至1.1W",
            detail: "带两名新来的实习生，开始学习如何统筹进度与向上汇报，职场迈上一小级台阶。",
            reaction: "虽然责任更重了，但每月到手的薪资切实增加，存折里悄悄攒下了三万块钱。",
            delta: { social: 15, cognition: 15, savings: 18000 },
            addTags: ["升任组长", "踏实积累"]
          },
          {
            text: "考取行业中级专业技术资格或注册执业证书，为今后跳槽增加硬底牌",
            detail: "不沉迷于下班后的短视频消遣，下班后关在房间刷题学习，持续提升自我价值。",
            reaction: "顺利通过执业考试，公司每月额外给你发放500元职称补贴，心里踏实。",
            delta: { cognition: 15, resilience: 15, savings: 8000 },
            addTags: ["专业证书", "持续提升"]
          }
        ]
      }
    ],
    24: [
      {
        id: "age_24_dn_savings",
        age: 24,
        stageName: "职场第3年 · 24岁",
        title: "二线民企裁员风浪、存折八万元与生计坚守",
        scene:
          "工作第三年，二线城市许多中小民企遭遇订单缩减与降薪裁员，身边不少同行被迫转行跑外卖。存折里的八万元是你省吃俭用一点一滴抠出来的救命钱。父母在电话里关切你的生计，生活的现实重担悄然压在肩头。",
        type: "choice",
        choices: [
          {
            text: "顶住风浪，把八万元作为自己的独立防守金，坚决不盲目跟风背负高位房贷",
            detail: "清醒理性，坚信在经济波动面前现金流才是普通人唯一的盔甲，保持自由转身权。",
            reaction: "虽然外界风浪不断，但手里有存款心里有底气，你稳稳守住了个人的财务安全线。",
            delta: { rebellion: 20, resilience: 20, savings: 20000 },
            addTags: ["守住底气", "理智自立"]
          },
          {
            text: "在公司业务一线主动多扛重担，踏实肯干，争取到稳定加薪与年终留用",
            detail: "不怨天尤人，用超出常人的勤勉与细心赢得客户信赖，成为部门不可替代的业务骨干。",
            reaction: "薪水稳步提升，你在二线城市扎稳了脚跟，每月能给老家父母汇去两千元生活费。",
            delta: { resilience: 25, kinshipGuilt: 15, savings: 25000 },
            addTags: ["实干扎根", "家庭支柱"]
          }
        ]
      }
    ],
    25: [
      {
        id: "age_25_dn_midlife",
        age: 25,
        stageName: "走向社会第3年 · 25岁",
        title: "二线城市的房贷现实与自学谋求新路",
        scene:
          "二十五岁，身边的朋友纷纷被房贷和生活琐事填满。你看着二线城市高昂的房价与每月固定的支出，开始深度思考未来的长远退路。",
        type: "choice",
        choices: [
          {
            text: "利用业余时间自学外语与海外紧缺技能认证，探索低门槛出海打工/留工路径",
            detail: "不愿将一辈子束缚在一眼望尽的重复琐事中，主动为自己开辟新的可能性。",
            reaction: "通过了初级语言等级考试，你发现自己的计算机/工程技能在海外依然有用武之地。",
            delta: { rebellion: 25, cognition: 15, resilience: 15 },
            addTags: ["自学外语", "谋求新路"]
          },
          {
            text: "留在这座二线城市继续深耕本职工作，靠勤奋攒钱，承担起家庭主心骨的责任",
            detail: "踏踏实实做一颗坚忍勤勉的螺丝钉，陪伴父母慢慢变老，守住属于普通人的小日子。",
            reaction: "在单位业务上驾轻就熟，存折存款突破十二万元，成为全家最坚强的依靠。",
            delta: { kinshipGuilt: 20, social: 15, savings: 25000 },
            addTags: ["家庭支柱", "落地生根"]
          }
        ]
      }
    ],
    26: [
      {
        id: "age_26_dn_decision",
        age: 26,
        stageName: "天命关卡 · 26岁",
        title: "家庭天命大病与ICU十五万缺口",
        scene:
          "二十六岁，手里本已积攒下十余万血汗积蓄。谁料天有不测风云，父亲在老家突发急性重病，急救车连夜送进{hospital}ICU抢救。医生面色凝重：“急性重度梗死合并呼吸衰竭，抢救加手术自费缺口至少十五万，家属得赶紧筹钱拿主意。”",
        type: "choice",
        choices: [
          {
            text: "【倾尽手头全部积蓄并向亲戚民间周转十五万：‘大夫，全力抢救，钱我想办法！’】：至孝救赎",
            detail: "掏出所有积蓄，厚着脸皮借遍所有亲朋好友，签下十五万借款条据，誓把父亲从鬼门关拉回来。",
            reaction: "抢救成功，父亲转危为安，但全家瞬间债台高筑，催债电话开始接踵而至，你咬紧牙关决定用双肩扛下一切！",
            delta: { savings: -150000, kinshipGuilt: -35, resilience: 40, health: -10 },
            addTags: ["负重背债", "至孝担当", "血汗还债"]
          },
          {
            text: "【按医保目录进行保守稳妥抢救，量力而行，不让全家陷入万劫不复的债务深渊】：理性克制",
            detail: "痛苦权衡，坚决不沾染利滚利的民间借贷，尽最大努力配合医院规范治疗。",
            reaction: "父亲病情逐渐平稳出院休养，你精打细算保全了家庭的基本生存防线，心智愈发成熟沧桑。",
            delta: { savings: -40000, kinshipGuilt: 20, resilience: 20 },
            addTags: ["理性止损", "守住底线"]
          },
          {
            text: "【父亲病情平稳化解，你手握十五万血汗积蓄，认真审视人生下半场的十字路口】：稳健从容",
            detail: "虚惊一场，父亲身体并无大碍。面对未来的不确定性，你拥有了完全属于自己的决断权。",
            reaction: "存折上的十五万是你最坚固的铠甲，面对社会的内卷与风浪，你活得从容坦荡。",
            delta: { happiness: 20, resilience: 20, savings: 20000 },
            addTags: ["从容自立", "积攒底牌"]
          }
        ]
      }
    ],
    27: [
      {
        id: "age_27_dn_dossier",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene:
          "二十七岁，你走过大学的迷茫，熬过了初入社会的青涩与坎坷。五年打拼让你拥有了普通青年的坚毅与从容，迎来了人生命运的重大转折点：",
        type: "choice",
        choices: [
          {
            text: "【顺势深耕 · 平台与体制中坚】：在熟悉的企业或单位稳扎稳打，承担家庭责任",
            detail: "陪伴长辈老去，在熟人社会与庞大国内市场中守住现世安稳与人间烟火，步步为营。",
            reaction: "你在熟悉的街道漫步，生活踏实安详，走稳属于普通人的每一道坎，成为小家的坚固支柱。",
            delta: { kinshipGuilt: 25, social: 25, savings: 20000 },
            addTags: ["深耕故土", "安稳岁月"]
          },
          {
            text: "【自立门户 · 创业办厂与自主工坊】：脱离打工体系，在商海开创属于自己的实体",
            detail: "拿出多年积蓄与经验，开办自己的商贸门市或小微工作室，为自己拼一把！",
            reaction: "从螺丝钉变成了掌舵人，生活有了无限的自主性与拼劲！",
            delta: { rebellion: 30, resilience: 30, savings: -15000 },
            addTags: ["自立门户", "商海搏击"]
          },
          {
            text: "【旷野退守 · 小城自洽与返乡安家】：看透大城市内卷，回退二三线过松弛烟火日子",
            detail: "陪伴父母在侧，在小城买一套舒心小房，柴米油盐皆是安详。",
            reaction: "告别了攀比焦虑，生活充满了真实温暖的烟火气。",
            delta: { happiness: 35, resilience: 20, savings: 15000 },
            addTags: ["小城自洽", "烟火人间"]
          },
          {
            text: "【绝境孤注 · 签下黑中介劳务合同飞赴海外出苦力还债】：债务催逼走投无路，出苦力救家",
            detail: "为了还清家里的重病巨债与高利贷，签下严苛的劳务合同，抵押护照飞往中东/非洲工地搏命换汇！",
            reaction: "登机远行，背负着全家的生死存亡，誓在黄沙烈日下用血汗为家族凿出一条生路！",
            delta: { savings: 20000, resilience: 35, health: -15, rebellion: 20 },
            addTags: ["海外苦力", "血汗还债"]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. 专科高职阶层（实用技能工匠 · 实体创业掌柜 · 稀缺技艺海外高薪）
  // --------------------------------------------------------------------------
  "junior_college": {
    19: [
      {
        id: "age_19_jc_workshop",
        age: 19,
        stageName: "专科大一/大二 · 19岁",
        title: "实训车间机床实操与技能打磨",
        scene:
          "在公办职业技术学院实训中心里，机油的味道混合着切削液的清凉。面对数控机床与实训图纸，你沉下心来，踏踏实实跟着师傅学技术。",
        type: "choice",
        choices: [
          {
            text: "苦练数控机床操作与编程，誓要把工艺尺寸公差卡在标准范围内",
            detail: "不为虚浮文凭所困，坚信在任何时代，真正有一手过硬技术的工人都能吃饱饭。",
            reaction: "在全系技能比武中拿到前三名，实训指导老师对你的踏实作风赞赏有加。",
            delta: { cognition: 15, resilience: 20, inferiority: -10 },
            addTags: ["技能扎实", "实操好手"]
          },
          {
            text: "备战全日制‘专升本’考试，在自习室里默默啃英语与高数基础",
            detail: "渴望用学历证明自己，誓要拿到全日制本科学历证书。",
            reaction: "你的模拟考试成绩稳步上升，辅导员鼓励你‘保持劲头，争取考上公办本科’。",
            delta: { academicCapital: 20, resilience: 15, kinshipGuilt: 10 },
            addTags: ["专升本备考", "学历突围"]
          },
          {
            text: "利用周末在老家汽修厂和设备维修队当学徒兼职，提前接触一线实活",
            detail: "不怕脏不怕累，不仅赚够了自己的生活费，还积累了丰富的一线排障经验。",
            reaction: "带徒师傅夸你‘眼里有活、手脚麻利’，卡里悄悄存下了五千块应急钱。",
            delta: { savings: 6000, resilience: 15, social: 10 },
            addTags: ["学徒自立", "一线经验"]
          }
        ]
      }
    ],
    20: [
      {
        id: "age_20_jc_romance",
        age: 20,
        stageName: "红尘初动 · 20岁",
        title: "车间食堂的护手霜与朴实爱人",
        scene: "顶岗实习的大三这一年，在厂区食堂的靠窗角落，或是老街租住的隔壁，你结识了一个踏实勤快的姑娘/小伙。对方看到你下班手上洗不净的机油不仅不嫌弃，还常悄悄给你备好护手霜与热包子，眼神里满是理解与体贴。",
        type: "choice",
        choices: [
          {
            text: "【真诚告白 · 携手相伴】：认准了对方的善良朴实，买下一对银戒指，相约一起存钱成家",
            detail: "没有虚浮的浪漫誓言，只有柴米油盐的真诚。约定一起在县城买一套小房，过安稳日子。",
            reaction: "伴侣的体贴与爱护彻底驱散了你骨子里的自卑，洗净手上的机油，心里全是甜的！",
            delta: { happiness: 40, resilience: 30, kinshipGuilt: -10, savings: -2000 },
            addTags: ["心有所属", "相濡以沫"]
          },
          {
            text: "【独闯江湖 · 暂锁心扉】：一心想先把手艺练精、多攒下本钱，婉拒长辈和工友的好心撮合",
            detail: "感觉自己手头微薄，不想拖累别人。发誓先成为车间一把刀，多存些本钱再说。",
            reaction: "一人吃饱全家不饿，你把全部心血倾注在机床与焊枪上，手艺突飞猛进！",
            delta: { resilience: 25, savings: 6000, cognition: 15 },
            addTags: ["独身自立", "锁紧心扉"]
          }
        ]
      },
      {
        id: "age_20_jc_intern",
        age: 20,
        stageName: "专科大二/大三 · 20岁",
        title: "工业园顶岗实习与考取中高级工技能证",
        scene:
          "大三顶岗实习季，你进入工业园区机械制造厂。面对车间里飞速运转的产线设备，你作为实战派技术人员，跟着老师傅每天排查设备故障，处理一线难题。",
        type: "choice",
        choices: [
          {
            text: "虚心向车间老师傅学排障经验，掌握机械与电气故障的排查绝招",
            detail: "不怕脏不怕累，经常钻到机床底部排查线路，成为车间里公认能顶事的年轻徒弟。",
            reaction: "车间主任主动为你争取了提前全职留用指标，每月工资调到五千元以上包吃住。",
            delta: { cognition: 15, resilience: 15, savings: 8000, inferiority: -10 },
            addTags: ["车间熟手", "排障好手"]
          },
          {
            text: "成功考取数控机床或特种焊接中高级工职业资格证书",
            detail: "拿下含金量极高的国家职业技能资质，为将来求职或自主承接工程打下硬底子。",
            reaction: "证书录入人社部门数据库，每月享受厂里的紧缺工种技能补贴。",
            delta: { academicCapital: 15, resilience: 15, savings: 5000 },
            addTags: ["持证技工", "资质过硬"]
          }
        ]
      }
    ],
    21: [
      {
        id: "age_21_jc_jobs",
        age: 21,
        stageName: "毕业分水岭 · 21岁",
        title: "正规技工入职、专升本录取与自立门面",
        scene:
          "毕业季，身怀硬核实操手艺的你迎来了务实的落脚点：签约制造企业正规技工、专升本考取本科继续读，或是回老家跟着师傅干实体维修。",
        type: "choice",
        choices: [
          {
            text: "签约机械制造企业正式数控技工/维修技术员岗位（月薪5500~7000，包吃住）",
            detail: "用自己的双手踏踏实实赚钱，不慕虚荣，在实体制造业一线立足。",
            reaction: "第一个月到手工资五千多，你给父母买了一台全自动洗衣机，父母欣慰踏实。",
            delta: { savings: 15000, resilience: 15, inferiority: -10 },
            addTags: ["正式技工", "靠手艺自立"]
          },
          {
            text: "收到省属公办大学专升本录取通知书，昂首迈入本科院校继续攻读两年",
            detail: "用汗水洗刷起点劣势，手握高级手艺与全日制本科文凭双重底气。",
            reaction: "父母在老家倍感自豪，亲戚们对你的学业毅力由衷佩服。",
            delta: { academicCapital: 20, kinshipGuilt: 15, happiness: 20 },
            addTags: ["专升本录取", "本科深造"]
          },
          {
            text: "回到老家县城工业区，合伙盘下一间小门面，开办汽修/五金加工实体维修铺",
            detail: "自己做小老板，凭借做事地道、手艺过硬，在街坊邻里熟人圈子里慢慢积攒客源。",
            reaction: "当年除去开支净结余两万块，邻里谁家车辆机械出毛病都来找你，人缘极佳。",
            delta: { savings: 20000, social: 15, rebellion: 10 },
            addTags: ["实体门市", "自立门户"]
          }
        ]
      }
    ],
    22: [
      {
        id: "age_22_jc_work",
        age: 22,
        stageName: "实干起航 · 22岁",
        title: "熟练技工的日常与实体铺子起步",
        scene:
          "二十二岁这年，你用一双手在真实的物质世界里打下了扎实的根据地。每天下班洗净手上的机油，吃上一碗热气腾腾的面条，日子踏实而安稳。",
        type: "choice",
        choices: [
          {
            text: "在工厂里成为班组不可或缺的排障骨干，带一两个新学徒，月薪调至七八千元",
            detail: "熟悉车间每台设备的脾性，说话有分量，深得工友和车间负责人的信赖。",
            reaction: "年终拿到厂里评选的优秀技术员工奖金，存折上存下了三万块钱。",
            delta: { resilience: 15, savings: 20000, social: 10 },
            addTags: ["车间骨干", "踏实熟手"]
          },
          {
            text: "实体维修铺子添置了一台二手高精度车床，扩大业务范围，客源稳步增加",
            detail: "凭着收费公道、做工细致，不仅接散客活，还承接了周边小工厂的外协加工件。",
            reaction: "年底还清了开店的借款，手里有了两万多元结余，生意渐渐走上正轨。",
            delta: { savings: 25000, social: 15, resilience: 15 },
            addTags: ["小店步入正轨", "实体掌柜"]
          }
        ]
      }
    ],
    23: [
      {
        id: "age_23_jc_wealth",
        age: 23,
        stageName: "积累沉淀 · 23岁",
        title: "手艺熟练、添置代步车与成家打算",
        scene:
          "二十三岁，你在老家县城或工业区小有名气。手里握着实打实的现金积蓄，父母笑口常开，你靠双手劳动赢得了最踏实的家庭尊严。",
        type: "choice",
        choices: [
          {
            text: "全款购置了一辆皮实耐用的大空间二手皮卡/SUV，方便日常拉货与家庭出行",
            detail: "靠自己的双手解决出行问题，再也不用风里雨里骑电动车，父母倍感体面。",
            reaction: "车子开回老家院子，街坊邻居纷纷夸赞你‘这娃能吃苦、有本事’。",
            delta: { kinshipGuilt: 15, happiness: 20, savings: -20000 },
            addTags: ["买车代步", "孝顺体面"]
          },
          {
            text: "利用业余时间自学外语与海外职业技术要求，为未来海外高薪工签打基础",
            detail: "清醒察觉到海外技术工人的高薪待遇，利用晚上自学基础外语和专业词汇。",
            reaction: "白天干活晚上看书，你的上进心让身边长辈和师傅刮目相看。",
            delta: { cognition: 15, rebellion: 20, resilience: 15 },
            addTags: ["自学出海", "跨国谋划"]
          }
        ]
      }
    ],
    24: [
      {
        id: "age_24_jc_prestige",
        age: 24,
        stageName: "实干立足 · 24岁",
        title: "制造业外协波动与一身硬手艺立足",
        scene:
          "二十四岁这一年，存折里的数字摸到了十万元大关。然而周边不少小型五金机械作坊因环保与成本停产关门。凭借一手无可替代的精密数控与管道焊接硬功夫，你不仅没有失业，反而成了老街周边工厂排队请去排障抢修的台柱子。",
        type: "choice",
        choices: [
          {
            text: "实体维修铺子扩建，招了两名年轻学徒，成为老街上受人信赖的靠谱老师傅",
            detail: "做事公道讲良心，客户源源不断，当年净利润突破五万元。",
            reaction: "父母逢人便讲你手艺好、靠得住，在熟人社会里受尽亲邻敬重。",
            delta: { savings: 35000, social: 15, resilience: 15 },
            addTags: ["老街名匠", "实体掌柜"]
          },
          {
            text: "通过正规海外特定技能技术考核，收到海外制造企业正式技术聘用意向（时薪折合国内数倍）",
            detail: "凭借过硬的技术实操，成功通过国际雇主面试，出海通道顺利打通。",
            reaction: "外企为你办理正规工作签证手续，你的人生有了跨出国门看世界的机会。",
            delta: { rebellion: 25, savings: 25000, happiness: 20 },
            addTags: ["海外工签意向", "技艺出海"]
          }
        ]
      }
    ],
    25: [
      {
        id: "age_25_jc_abroad",
        age: 25,
        stageName: "走向社会第3年 · 25岁",
        title: "海外技术工签与实体基业稳固",
        scene:
          "二十五岁，过硬的手艺成了你在任何地方都能自立自强的硬通票。无论是飞赴异邦赚取体面外币，还是留守老家做稳实体铺子，你都拥有了坚实的底牌。",
        type: "choice",
        choices: [
          {
            text: "登上飞往海外的国际客机，在尊重技能工人的异邦开启高薪蓝领生活",
            detail: "不用看学历脸色，靠一身扎实技术赚取体面报酬，工作生活严格规范。",
            reaction: "在当地工厂受到工友尊重，下班有完全属于自己的时间，月结余折合近两万元。",
            delta: { rebellion: 35, savings: 50000, happiness: 25 },
            addTags: ["异邦立足", "高薪蓝领"]
          },
          {
            text: "在老家县城买下临街正规商铺门面，稳扎稳打经营自己的机械维修厂",
            detail: "在熟悉的故土上做大做强，陪伴在年迈父母身边，做父母随叫随到的坚实后盾。",
            reaction: "生意红红火火，你在老家赢得了堂堂正正的尊严与安顿的生活。",
            delta: { kinshipGuilt: 20, social: 20, savings: 30000 },
            addTags: ["老街门面", "故土基业"]
          }
        ]
      }
    ],
    26: [
      {
        id: "age_26_jc_freedom",
        age: 26,
        stageName: "天命关卡 · 26岁",
        title: "家庭天命重病与ICU巨额医药费",
        scene:
          "二十六岁，手里握着多年汗水换来的十万块积蓄。老家父亲在工地上突发重伤合并心梗，被紧急送进{hospital}重症监护室。骨折手术与心脏抢救自费缺口达十五万，工友们凑了几千块杯水车薪，医生催促家属尽快凑齐手术款救命。",
        type: "choice",
        choices: [
          {
            text: "【掏空全部积蓄并向老乡工友借高利欠条十五万：‘先救我爸！我有一双手，砸锅卖铁也还清！’】：至孝担当",
            detail: "掏出全部积蓄压在收费处，写下沉甸甸的十五万借款欠条，红着眼睛守在急救室外。",
            reaction: "父亲手术成功保住了性命，但你瞬间背上了十五万沉重债务，你暗暗发誓就算脱一层皮也要还清干干净净！",
            delta: { savings: -150000, kinshipGuilt: -35, resilience: 45, health: -10 },
            addTags: ["负重背债", "至孝担当", "血汗还债"]
          },
          {
            text: "【动用工伤基本垫付与医保保守救治，量力而行，守住家庭基本生计】：理性克制",
            detail: "奔走申请工伤补助与医保统筹，坚决不沾染民间利滚利黑洞，精打细算渡过难关。",
            reaction: "父亲病情稳定出院，虽然需要长期服药，但你守住了小家庭没有崩盘，心如坚铁。",
            delta: { savings: -40000, kinshipGuilt: 20, resilience: 25 },
            addTags: ["理性止损", "守住底线"]
          },
          {
            text: "【父亲病情平稳化解，你手里握着积蓄与一身硬手艺，活得踏实坦荡】：通透从容",
            detail: "虚惊一场，父亲身体平安无虞。你不慕虚荣，把每一个清晨与黄昏都过得从容自足。",
            reaction: "内心安宁坦荡，你活出了普通劳动者最踏实自尊的境界。",
            delta: { happiness: 25, resilience: 20, inferiority: -20 },
            addTags: ["通透坦荡", "从容自足"]
          }
        ]
      }
    ],
    27: [
      {
        id: "age_27_jc_dossier",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene:
          "二十七岁，你用一把焊枪、一台机床或一间门店，赤手空拳在残酷的人世间凿出了属于自己的宽阔天地。你迎来了人生命运的重大转折点：",
        type: "choice",
        choices: [
          {
            text: "【顺势深耕 · 平台与工匠中坚】：在国有大厂或工业骨干企业精进数控绝活，晋升特级技师",
            detail: "深耕制造业一线，靠着不可替代的手艺绝活成为厂里台柱子，踏实而有尊严。",
            reaction: "你在车间里说话举足轻重，靠硬核手艺赢得了全厂工友与领导的最高敬重！",
            delta: { social: 30, resilience: 30, savings: 25000 },
            addTags: ["深耕故土", "工匠底子"]
          },
          {
            text: "【自立门户 · 创业办厂与实体工坊】：在老街盘下门面开办汽修或精密模具加工厂",
            detail: "自己当老板，凭借做事地道、手艺过硬，在街坊邻里熟人圈子里慢慢做成知名老字号。",
            reaction: "逢年过节门庭若市，你靠真本事挣下了人人称赞的好名声，无愧人间一程！",
            delta: { savings: 35000, social: 25, resilience: 25 },
            addTags: ["自立门户", "实体掌柜"]
          },
          {
            text: "【旷野退守 · 小城自洽与返乡安家】：看透大城市内卷，在老家小城开杂货铺过悠闲日子",
            detail: "陪伴在年迈父母身边，做父母随叫随到的坚实后盾，柴米油盐踏实安详。",
            reaction: "生活从容安乐，父母老有所依，过上了普通人最向往的现世安稳。",
            delta: { happiness: 35, kinshipGuilt: 20, savings: 20000 },
            addTags: ["小城自洽", "烟火人间"]
          },
          {
            text: "【绝境孤注 · 签下黑中介劳务合同飞赴海外出苦力还债】：债务催逼走投无路，出苦力救家",
            detail: "为了还清家里的重病巨债与高利贷，签下严苛的劳务合同，抵押护照飞往中东/非洲工地搏命换汇！",
            reaction: "登机远行，背负着全家的生死存亡，誓在黄沙烈日下用血汗为家族凿出一条生路！",
            delta: { savings: 20000, resilience: 35, health: -15, rebellion: 20 },
            addTags: ["海外苦力", "血汗还债"]
          }
        ]
      }
    ]
  }
};


// ============================================================================
// 动态因果分流：根据 21 岁秋招抉择（大厂研发 / 选调体制 / 读研深造）定制 22~27 岁人生！
// 彻底杜绝“本科毕业打拼两年突然又硕士毕业签约”的严重逻辑矛盾！
// ============================================================================

export function getTailoredCareerSubtrackNodes(
  degreeTrack: "985_211" | "double_non" | "junior_college",
  choiceText: string,
  _family: FamilyOrigin,
  allTags: string[] = []
): LifeEventNode[] {
  // ★★★ 优先判定：失足青年专属 22~27 岁看守所刑释与救赎长卷 ★★★
  if (
    allTags.some((t) => ["涉足灰产", "混迹街头", "灰色快钱"].some((k) => t.includes(k))) ||
    choiceText.includes("灰产") ||
    choiceText.includes("混迹街头")
  ) {
    const reformNodes: LifeEventNode[] = [];
    for (let a = 22; a <= 27; a++) {
      const list = STREET_REFORM_TIMELINE_NODES[a];
      if (list && list.length > 0) {
        reformNodes.push(list[0]);
      }
    }
    return reformNodes.map((n) => ({
      ...n,
      scene: n.scene
        .replace(/\{hospital\}/g, _family.hospitalName || "市职工总院")
        .replace(/\{cityOrCounty\}/g, _family.cityOrCounty || "地级市")
    }));
  }

  // --------------------------------------------------------------------------
  // 1. 985/211 名校分流
  // --------------------------------------------------------------------------
  if (degreeTrack === "985_211") {
    // 1-A: 保研硕博学术深造路线（象牙塔的残酷竞争）
    if (choiceText.includes("保研") || choiceText.includes("深造") || choiceText.includes("硕士") || choiceText.includes("读研") || choiceText.includes("学术")) {
      return [
        {
          id: "age_22_985_acad",
          age: 22,
          stageName: "研一学术长跑 · 22岁",
          title: "研一开题风波与导师强占一作危机",
          scene: "保研进入国家重点实验室后，你熬了三个月撰写出一篇极具突破性的理论模型论文。导师把你叫进办公室，笑眯眯地暗示：‘小陈啊，这篇论文把我正在评职称的女儿放一作，你当通讯二作，以后毕业和申请出国我都全力保你。’",
          type: "choice",
          choices: [
            {
              text: "【隐忍妥协让出一作换取毕业护航】：含泪答应导师要求，换取课题组内部生存空间与毕业承诺",
              detail: "深知导师手握毕业大权，硬顶可能被延毕或撤换课题，只能将苦涩咽入腹中，委曲求全。",
              reaction: "导师自此对你关照有加，论文顺利发表并获部级奖项，但你第一次体会到学术光环下的世俗算计。",
              delta: { academicCapital: 25, savings: 10000, inferiority: 20, resilience: 10 },
              addTags: ["学术妥协", "委曲求存"]
            },
            {
              text: "【严词拒绝并向学术道德委员会申诉】：坚守学术独立底线，向学院与校学术委员会实名申诉！",
              detail: "眼里容不得沙子！不惜押上学业前途，誓死捍卫属于青年学者的第一作者尊严。",
              reaction: "事情引发院系震动，导师被迫收回要求，但自此将你冷冻边缘化，甚至拒绝提供实验经费。",
              delta: { rebellion: 35, resilience: 30, social: -30, inferiority: -20 },
              addTags: ["学术硬骨", "冷冻边缘"]
            },
            {
              text: "【另起炉灶独辟蹊径，自力更生开辟全新分支】：表面应承，暗中另开全新课题独立投稿！",
              detail: "展现深沉城府。表面不与导师正面冲突，业余时间自费租用算力服务器，独立攻克全新方向。",
              reaction: "半年后你的独立新论文在国际顶刊直接录用，导师惊诧莫名却再也无法染指你的成果。",
              delta: { cognition: 30, academicCapital: 30, savings: -8000, resilience: 20 },
              addTags: ["自立门户", "前沿突围"]
            }
          ]
        },
        {
          id: "age_23_985_acad",
          age: 23,
          stageName: "研二科研 · 23岁",
          title: "实验核心数据异常与顶刊发表诱惑",
          scene: "研二关键攻坚期，你的核心实验数据出现微小矛盾偏差。同门师兄悄悄告诉你：‘只要在绘图软件里删掉两个异常点，拟合度立刻拉满，下个月就能冲刺Nature子刊顺利达标毕业；如果老实重做，起码延毕一年！’",
          type: "choice",
          choices: [
            {
              text: "【坚守学术求真底线，推翻实验老实延期重做】：绝不伪造任何数据，哪怕延毕一年也无愧良心",
              detail: "求真求实是科学家的生命线。你坚决拒绝粉饰太平，宁可承受延期毕业的残酷代价。",
              reaction: "你重做数百组对照实验，虽然延毕数月，但彻底夯实了理论根基，论文被国际同行盛赞为扎实之作。",
              delta: { academicCapital: 30, resilience: 30, inferiority: -25, happiness: -15 },
              addTags: ["学术求真", "问心无愧"]
            },
            {
              text: "【深挖异常数据点背后的深层物理机制】：不粉饰也不盲目重做，把异常点作为全新突破口深入死磕！",
              detail: "拥有敏锐的科学嗅觉，坚信异常正是未知规律的呼唤。日夜死磕异常数据，推导全新修正模型。",
              reaction: "奇迹发生！异常数据竟然推翻了传统假设，揭示出全新反应机理，你的论文被Nature正刊特邀发表！",
              delta: { cognition: 35, academicCapital: 35, resilience: 25, savings: 15000 },
              addTags: ["重大突破", "顶级学者"]
            }
          ]
        },
        {
          id: "age_24_985_acad",
          age: 24,
          stageName: "硕士毕业抉择 · 24岁",
          title: "国内青椒‘非升即走’悬剑 vs 跨洋全奖博士后",
          scene: "硕士毕业在即，你手握顶刊论文。国内顶尖高校向你开出助理教授/特聘研究员待遇，但合同里白纸黑字写着‘六年非升即走，不达标无条件解聘’；与此同时，海外顶尖名校发来全额奖学金博士后Offer，但父母体弱多病，泣不成声盼你留在身边。",
          type: "choice",
          choices: [
            {
              text: "【接受国内名校聘用，直面非升即走残酷考核】：留在国内陪伴父母，签署六年非升即走军令状",
              detail: "体恤双亲养老期盼，毅然留守国内高校，准备在青年学者最残酷的晋升熔炉里厮杀出一条血路。",
              reaction: "父母在老家倍感自豪安心，你获得了独立带课题组的资格，但头顶悬着六年倒计时的达摩克利斯之剑。",
              delta: { kinshipGuilt: -30, social: 25, academicCapital: 25, resilience: -15 },
              addTags: ["青椒起航", "非升即走"]
            },
            {
              text: "【决然跨洋奔赴国际学府，在学术殿堂攀登世界顶峰】：告别故土羁绊，投身国际一流科研生态",
              detail: "追求纯粹宽松的全球科研氛围，割舍沉没成本，誓在国际科学界树立中国学者的旗帜。",
              reaction: "登机远行，异国浓郁平等的学术氛围让你如鱼得水，海外导师给予你极高的科研自主权。",
              delta: { rebellion: 35, cognition: 30, academicCapital: 30, kinshipGuilt: 25 },
              addTags: ["跨洋学者", "全球求索"]
            }
          ]
        },
        {
          id: "age_25_985_acad",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "首项国家青年基金申报与评审圈子博弈",
          scene: "二十五岁这年，你首次申报国家自然科学/社会科学青年基金。同院老教授私下提醒你：‘现在的基金全看圈子和人脉，评审大牛手里握着生杀大权。你若不跟着我去京城拜码头送送材料，本子写得再好也注定被毙！’",
          type: "choice",
          choices: [
            {
              text: "【跟着老教授赴京拜会圈子大牛，融入学术江湖】：备好伴手礼参加行业研讨会，向评审专家递交投名状",
              detail: "学会向现实低头，利用前人铺就的人脉资源为自己的科研项目争取最大概率的立项通关。",
              reaction: "项目在评审会上获得全A评级顺利拿下，但你看着酒桌上推杯换盏的学阀面孔，内心泛起一阵厌恶。",
              delta: { social: 30, savings: -20000, academicCapital: 25, inferiority: 20 },
              addTags: ["圈子破局", "学术江湖"]
            },
            {
              text: "【拒不拜码头，单凭过硬本子实力硬刚盲审】：把精力全部倾注在研究方案的创新性与论证严密上！",
              detail: "不愿将纯洁的学术追求沦为人情交易的附庸，坚信用最扎实无可挑剔的技术方案打动盲审专家。",
              reaction: "同行盲审专家对你天马行空又脚踏实地的方案拍案叫绝，项目逆势高票通过，树立了清正声誉！",
              delta: { resilience: 30, cognition: 30, academicCapital: 30, inferiority: -20 },
              addTags: ["清流风骨", "硬核立项"]
            }
          ]
        },
        {
          id: "age_26_985_acad",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "重大成果被大牛署名侵占与学界反抗",
          scene: "二十六岁这一年，你独立主导的重大研究项目取得颠覆性突破。领域内某位位高权重的院士学阀突然向学校施压，要求将他的名字列为共同第一作者并挂名通讯，否则将动用资源封杀你的后续职称评审！",
          type: "choice",
          choices: [
            {
              text: "【坚决捍卫署名权，向国家自然科学基金委监督委员会硬核举报】：宁为玉碎不为瓦全！",
              detail: "绝不容许学阀强盗行径玷污真理！拿出完整的实验操作日志与代码提交国家监督委与主流学术打假平台。",
              reaction: "引发学术界轰动地震，学阀被迫收手并接受公开调查，你赢得了青年一代的由衷敬重，但也成为保守势力的眼中钉。",
              delta: { rebellion: 40, resilience: 35, social: -25, academicCapital: 25 },
              addTags: ["学术硬骨", "名动学界"]
            },
            {
              text: "【忍辱负重顺水推舟，借学阀通天人脉为课题组换取亿级平台】：权衡利弊，将屈辱转化为巨大资源",
              detail: "深谙现实残酷法则，借院士名望拿下国家级重点实验室重点课题，把团队推向顶级平台。",
              reaction: "你破格提拔为学科带头人并手握千万经费，但夜深人静时，你深知自己也沾染了江湖的泥浆。",
              delta: { social: 35, savings: 50000, academicCapital: 30, inferiority: 25 },
              addTags: ["借力权衡", "学术巨鳄"]
            }
          ]
        },
        {
          id: "age_27_985_acad",
          age: 27,
          stageName: "二十七岁 · 人生关隘",
          title: "二十七岁人生评估与终极命运抉择",
          scene: "二十七岁这一年，名校本硕博长跑与学术残酷洗礼，让你彻底褪去了学生的稚嫩。手握丰厚科研积累，你在实验室窗前俯瞰着万家灯火，迎来了人生方向的终极决断：",
          type: "choice",
          choices: [
            {
              text: "坚定选择出海通道：开启全球终身教职轨，在自由学术殿堂安顿一生",
              detail: "带着扎实的理论功底与多年积蓄走向世界，摆脱圈子内卷与人情繁琐，完完整整为科学而活。",
              reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，你在国际学术界开启了属于自己的全新维度。",
              delta: { rebellion: 40, happiness: 35, resilience: 25 },
              addTags: ["奔赴异邦", "广阔天地"]
            },
            {
              text: "扎根故土成为高校中坚，在熟悉的规则中攀登国家学术顶峰",
              detail: "选择陪伴父母在侧，深耕本土高校学科平台，立志成为国家战略科技的中流砥柱。",
              reaction: "你在熟悉的土地上站稳了脚跟，承担起带领团队与守护家庭的双重重任，风骨凛然。",
              delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
              addTags: ["深耕故土", "挑起大梁"]
            }
          ]
        }
      ];
    }

    // 1-B: 选调生体制路线（政治现实与机关暗流）
    if (choiceText.includes("选调") || choiceText.includes("基层") || choiceText.includes("体制") || choiceText.includes("公职") || choiceText.includes("机关")) {
      return [
        {
          id: "age_22_985_civil",
          age: 22,
          stageName: "选调基层锻炼 · 22岁",
          title: "基层驻村试炼与酒桌人情规训",
          scene: "作为省委定向选调生，你被分配至偏远乡镇驻村。欢迎宴上，老书记端着满杯高度散装包谷烧推到你面前：“小陈，名校出来的金凤凰，看得起我们乡下人，就把这杯酒干了！不喝，就是心里瞧不起老同志！”包厢里十几双眼睛死死盯在你身上。",
          type: "choice",
          choices: [
            {
              text: "【硬着头皮一饮而尽交投名状】：咬牙一口闷下，当晚急性胃黏膜出血送县医院洗胃",
              detail: "深知人在矮檐下不得不低头的规矩，用身体健康的惨痛代价换取融入基层干部的圈子。",
              reaction: "老书记在全镇例会上公开夸赞‘这娃接地气、能吃苦’，但你第一次体会到身体被规训的屈辱与残酷。",
              delta: { social: 25, savings: 5000, health: -20, inferiority: 15 },
              addTags: ["酒桌投名状", "委屈求存"]
            },
            {
              text: "【端杯婉拒以茶代酒硬顶到底】：不卑不亢站立敬茶：‘老书记，身体有恙，工作上我出死力’",
              detail: "骨子里天生硬骨头，绝不向陋习下跪！哪怕得罪所有人，也坚守自己做人的底线。",
              reaction: "酒桌瞬间死寂，老书记冷笑一声把酒泼在地上。此后两年你被扔去管最繁琐的信访与防汛值班，孤立无援。",
              delta: { resilience: 25, happiness: 20, social: -25, kinshipGuilt: 15 },
              addTags: ["骨头硬", "坐冷板凳"]
            },
            {
              text: "【借力打力巧妙周旋，避实就虚】：微笑着借口县委组织部明早有汇报材料，顺水推舟敬给老乡贤",
              detail: "展现深沉城府与政务情商，抬出上级名号巧妙解围，既给足老书记面子又全身而退。",
              reaction: "在场老干部无不对你的机敏练达暗自佩服，你既保全了身体，又在夹缝中立住了阵脚。",
              delta: { cognition: 20, social: 20, resilience: 15 },
              addTags: ["人情练达", "避实就虚"]
            }
          ]
        },
        {
          id: "age_23_985_civil",
          age: 23,
          stageName: "选调第2年 · 23岁",
          title: "前任二十万烂账审批地雷与良知抉择",
          scene: "镇上一笔二十万的违规修路账目卡在财务无法核销，新任镇长深夜把你叫到办公室，递上一支烟：“小陈，都是为了乡里修路发展，你在经办人栏盖个章走个过场。下个月县委组织部考察，副科级名额，领导心里有数。”",
          type: "choice",
          choices: [
            {
              text: "【顺从签字交出投名状换取提拔】：在违规单据上签下名字，绑上领导战车",
              detail: "经受不住仕途提拔的诱惑，说服自己‘大家都是这么干的’，踩入灰色泥潭。",
              reaction: "镇长满脸堆笑把你列为优先提拔对象，但你知道这份签字终身负责，如定时炸弹悬在头顶。",
              delta: { social: 30, savings: 15000, inferiority: 25, resilience: -10 },
              addTags: ["上了贼船", "隐形雷包"]
            },
            {
              text: "【坚决拒签，照章办事并在备忘录明确标注瑕疵】：绝不拿纪律红线当儿戏！",
              detail: "秉公执纪，哪怕面临打击报复也绝不当违规资金的签字傀儡，守住底线。",
              reaction: "镇长脸色铁青拂袖而去，随后你被调离核心业务，发配至乡镇档案室坐冷板凳，全镇干部笑你‘没眼色’。",
              delta: { resilience: 30, happiness: 25, social: -30, savings: -5000 },
              addTags: ["秉公守拙", "边缘闲差"]
            }
          ]
        },
        {
          id: "age_24_985_civil",
          age: 24,
          stageName: "机关转正定级 · 24岁",
          title: "处室核心专报被副主任截胡冒名顶替",
          scene: "你调回市直机关，熬了七个通宵撰写的三万字全省农业改革调研专报，被处室有深厚背景的副主任悄悄删去你的名字，换成他自己的名字上报给分管副市长，获得主要领导长篇批示嘉奖。副主任笑眯眯地塞给你五百块购物卡：“年轻人多锻炼，以后机会多的是。”",
          type: "choice",
          choices: [
            {
              text: "【忍辱负重暗中留痕，把屈辱化作蓄力筹码】：微笑道谢接过购物卡，暗中封存所有修改底稿",
              detail: "深知在羽翼未丰前决不可轻易翻脸，像猎手一样隐忍蛰伏，将证据牢牢攥在手心。",
              reaction: "你在机关里表现得愈发沉稳内敛，副主任放松了对你的戒备，而你正暗暗等待一击必杀的时机。",
              delta: { cognition: 25, resilience: 20, inferiority: 15, savings: 5000 },
              addTags: ["城府深沉", "蓄力待发"]
            },
            {
              text: "【直接敲开分管局长办公室实名申诉决裂】：拿着底稿直接找一把手抗辩，誓死讨回公道！",
              detail: "血气方刚，决不容忍窃取心血的卑劣行径！将两份对比文档当面拍在局长桌上！",
              reaction: "事情引发机关震动，副主任被通报批评退居二线，但整个机关都视你为‘极端刺头’，无人再敢重用你。",
              delta: { rebellion: 35, resilience: 25, social: -35, happiness: 15 },
              addTags: ["硬碰硬", "机关刺头"]
            }
          ]
        },
        {
          id: "age_25_985_civil",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "副科级差额提拔遭遇市委领导亲戚刺刀见红",
          scene: "单位空出一个副科级实职名额，候选人是你和市委某常委的亲侄子。民主测评在即，各方暗流汹涌。老领导暗示你：‘光靠业务好没用，人家家里早就各方打点好了，你若不去找找关系，就是陪跑。’",
          type: "choice",
          choices: [
            {
              text: "【拿出积蓄托人情走动打点，在熟人泥潭里拼死一搏】：深夜敲开老领导家门求助",
              detail: "放下文人的清高，动用全家所有积蓄打通关系关节，为了改变命运不得不融入现实游戏。",
              reaction: "民主推荐票数平分秋色，你艰难涉险过关提任副科，但全家欠下数万元人情债务，身心俱疲。",
              delta: { social: 25, savings: -30000, inferiority: 20, kinshipGuilt: 20 },
              addTags: ["人情请托", "借力钻营"]
            },
            {
              text: "【主动请缨下派最苦脱贫村驻村第一书记两年】：避开内耗泥潭，靠不可磨灭的硬实绩突围！",
              detail: "不愿在机关办公室搞钻营斗法，主动申请到全县最苦的偏远山村扎根，誓靠真抓实干赢得无可挑剔的资历。",
              reaction: "带领村民硬生生修通盘山公路发展特色茶园，村民敲锣打鼓送万民伞，市委书记点名特批提拔重用！",
              delta: { resilience: 35, cognition: 20, savings: -10000, health: -15 },
              addTags: ["主动下沉", "硬核实绩"]
            }
          ]
        },
        {
          id: "age_26_985_civil",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "新老领导换届大清洗与站队生死局",
          scene: "提拔你的老局长到龄退休，新空降一把手新官上任三把火，开始严厉清算老局长派系。新局长找你深夜谈话，扔给你一份纪检函件，要你交出老局长当年签字批复的某重大工程原始材料，以此作为留在核心科室的‘投名状’。",
          type: "choice",
          choices: [
            {
              text: "【坚守道义咬死不交材料，承担被打入冷宫的代价】：绝不做出卖老领导的卑劣行径！",
              detail: "做人讲良心和风骨。你咬紧牙关顶住新领导的威逼利诱，坚决不落井下石，守住做人底线。",
              reaction: "老领导保全了晚节老泪纵横，但新局长当周便将你免去科室职务，发配至边缘闲散协会坐冷板凳。",
              delta: { resilience: 35, happiness: 30, social: -30, inferiority: -20 },
              addTags: ["忠信有守", "冷宫雪藏"]
            },
            {
              text: "【识时务者为俊杰，交出材料向新一把手递交投名状】：顺应权力更迭，保全个人仕途",
              detail: "深谙体制内人走茶凉的残酷现实，为了自己的前途咬牙选择背叛旧主，交出关键复印件。",
              reaction: "新局长对你大加赏识并委以重任，但单位老同事纷纷在背后啐骂你‘白眼狼’，道德重负如影随形。",
              delta: { social: 30, savings: 20000, inferiority: 30, kinshipGuilt: 25 },
              addTags: ["改换门庭", "名声有损"]
            }
          ]
        },
        {
          id: "age_27_985_civil",
          age: 27,
          stageName: "二十七岁 · 人生关隘",
          title: "二十七岁人生评估与终极命运抉择",
          scene: "二十七岁这一年，名校十二年长跑与体制内五年的沉稳历练，让你彻底看清了熟人社会的冷酷与逼仄。手握多年积蓄与沉稳手腕，你在省城出租屋阳台上俯瞰着万家灯火，迎来了命运的终极决断：",
          type: "choice",
          choices: [
            {
              text: "坚定选择出海通道：辞去体制铁饭碗，奔赴全球广阔天地为自己活一次",
              detail: "带着名校底蕴与扎实的综合能力走向世界，摆脱内卷与繁琐规则，开启清爽生活。",
              reaction: "飞机冲破云层，故土的琐碎与攀比渐行渐远，辽阔的世界向你敞开怀抱，活出全新生命维度。",
              delta: { rebellion: 40, happiness: 35, resilience: 25 },
              addTags: ["奔赴异邦", "广阔天地"]
            },
            {
              text: "扎根体制故土深耕：在熟悉的规则中厮杀立足，挑起家族与事业千钧大梁",
              detail: "选择陪伴父母在侧，在熟人社会与本土平台中守住现世安稳与人间烟火，承担全部风浪。",
              reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
              delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
              addTags: ["深耕故土", "挑起大梁"]
            }
          ]
        }
      ];
    }

    // 1-C: 大厂正规研发工程师路线（职场丛林法则与大厂内卷）
    return [
      {
        id: "age_22_985_tech",
        age: 22,
        stageName: "步入职场第一年 · 22岁",
        title: "核心系统重大线上故障与甩锅陷阱",
        scene: "大四毕业进入大厂核心研发组，半年试用期答辩前夕，组内负责的支付核心网关突发重大线上故障，造成数十万元损失。带教资深组长悄悄找到你，暗示：‘小陈，你在复盘报告上承认是你配置写错了，你是应届生公司不会真开除你；要是把责任算在组里，大家年终奖全没了。’",
        type: "choice",
        choices: [
          {
            text: "【连夜追查代码日志查清真相，坚决不背黑锅】：拿出Git历史与日志证据自证清白！",
            detail: "绝不当糊涂替罪羊！通宵排查所有日志，证明故障是老组长半年前留下的底层死锁引发。",
            reaction: "高管亲自介入免除了你的责任，但老组长怀恨在心，联合老员工在组内彻底将你孤立冷暴凌。",
            delta: { resilience: 25, cognition: 20, social: -25, happiness: -15 },
            addTags: ["拒绝背锅", "组内孤立"]
          },
          {
            text: "【忍辱负重替组里揽下次要责任换取人情】：在复盘会上当众做检讨，保全团队利益",
            detail: "权衡利弊，深知刚入职得罪老员工难以为继，选择低头替团队抗雷，换取老员工的好感。",
            reaction: "老组长私下对你感激涕零，在后续考核中极力为你争取，但你因此被扣除半年绩效奖金。",
            delta: { social: 25, savings: -15000, inferiority: 20, resilience: 10 },
            addTags: ["忍痛替罪", "换取人脉"]
          }
        ]
      },
      {
        id: "age_23_985_tech",
        age: 23,
        stageName: "职场第2年 · 23岁",
        title: "年终绩效打C淘汰危机与同僚背刺",
        scene: "工作第二年，大厂推行严格的10%末位强制淘汰制。平时与你称兄道弟合租同住的室友同事，为了抢占保命指标，在主管面前打小报告揭发你‘上班时间偶尔浏览考公论坛’。主管在季度例会上冷冷宣布给你打低绩效(C等)。",
        type: "choice",
        choices: [
          {
            text: "【奋起反击！连夜开发核心自动化工具证明不可替代性】：用降维的技术战功打主管的脸！",
            detail: "绝不坐以待毙！连续两周泡在工位，独立开发出全团队依赖的智能运维中枢，效率提升三倍。",
            reaction: "技术委员会专家直接跨级介入推翻了主管的低绩效，你一战封神，但也累得当场在卫生间呕吐胆汁。",
            delta: { cognition: 30, resilience: 25, health: -20, savings: 25000 },
            addTags: ["技术封神", "拼命反杀"]
          },
          {
            text: "【看透大厂恶性踩踏，果断抱走补偿跳槽初创独角兽】：主动拿N+1离职补偿，奔赴新天地",
            detail: "拒绝在畸形内卷的泥潭里彼此噬咬，拿着名校背书与大厂光环，跳槽到发展强劲的初创企业。",
            reaction: "虽然初创公司加班更多，但远离了办公室恶性政治，你获得了核心架构师的重任与丰厚期权。",
            delta: { rebellion: 30, savings: 35000, social: 15, happiness: 15 },
            addTags: ["果断止损", "转战独角兽"]
          }
        ]
      },
      {
        id: "age_24_985_tech",
        age: 24,
        stageName: "职场第3年 · 24岁",
        title: "竞对三倍高薪挖角与窃密商业间谍诱惑",
        scene: "工作第三年，你在核心分布式架构领域崭露头角。竞对公司猎头深夜约你在高档茶室碰面，开出年薪80万加巨额签字费的诱人筹码，前提是‘需要你带走原公司核心高并发网关的架构源码与客户白皮书’。",
        type: "choice",
        choices: [
          {
            text: "【严守职业道德红线，断然拒绝窃密诱惑】：君子爱财取之有道，绝不触碰法律雷区！",
            detail: "清醒理智，深知出卖商业机密是随时进监狱的致命毒药，坚决拒绝拷贝任何非开源核心资产。",
            reaction: "猎头碰了一鼻子灰退场。你守住了做人的底线与职业声誉，继续在原岗位稳扎稳打钻研底层技术。",
            delta: { resilience: 25, happiness: 25, inferiority: -15, savings: 20000 },
            addTags: ["职业操守", "底线分明"]
          },
          {
            text: "【利用竞对Offer作为筹码，要求原公司大幅升职加薪】：高超商业博弈，反向逼宫高管！",
            detail: "既不犯法做商业间谍，又巧妙利用猎头报价向原公司总监施压，展现出过人的职场博弈手腕。",
            reaction: "总监为了防止核心骨干流失，破格为你提前晋升资深研发专家(P7)，年薪成功跨过45万大关！",
            delta: { cognition: 30, savings: 50000, social: 20, resilience: 15 },
            addTags: ["博弈上位", "年薪飞跃"]
          }
        ]
      },
      {
        id: "age_25_985_tech",
        age: 25,
        stageName: "走向成熟 · 25岁",
        title: "突发急性胃黏膜出血与大厂黄金枷锁",
        scene: "二十五岁这年，在连续通宵备战双十一大促的第三个深夜，你突然剧烈腹痛呕吐鲜血，被救护车紧急送往ICU抢救。病床上医生下达严肃通牒：‘严重胃溃疡穿孔加颈椎重度压迫神经，再这么熬下去随时可能猝死！’而电脑里是总监催促版本上线的十条夺命弹窗。",
        type: "choice",
        choices: [
          {
            text: "【生命第一！立刻申请长假休养并转岗低压技术支持】：主动卸下黄金枷锁，保命要紧",
            detail: "在死亡边缘捡回一条命后彻底顿悟，拒绝为了虚浮的百万期权透支肉身，主动申请调往边缘清闲部门。",
            reaction: "虽然年终奖大幅缩水，但作息规律后身体指标全面回暖，后视镜里找回了久违的阳光与健康。",
            delta: { health: 35, happiness: 35, savings: -30000, social: -15 },
            addTags: ["身心顿悟", "保命退守"]
          },
          {
            text: "【吞下止痛药拔掉针头重返工位，咬死牙关守住阵地】：贫穷让我经不起退缩，誓死冲顶！",
            detail: "想起老家穷困的父母与高昂的省城房价，你逼迫自己吞下胃药重返战场，誓要把自己的名字刻在战功榜上。",
            reaction: "大促系统零故障平稳通关，你获颁公司年度功勋员工大奖与三十万股票，但你的头发大把脱落。",
            delta: { savings: 80000, resilience: 25, health: -30, inferiority: 15 },
            addTags: ["亡命狂奔", "金钱代价"]
          }
        ]
      },
      {
        id: "age_26_985_tech",
        age: 26,
        stageName: "人生十字路口 · 26岁",
        title: "大厂三十大清洗与亲手裁掉同门师弟",
        scene: "二十六岁这一年，行业遭遇严重资本寒冬，公司高管下达全员裁员30%的硬性指标。部门总监把你叫进办公室，将两份裁员协议推到你面前：“小陈，这两个名额必须由你来谈。一个是刚结婚贷款买房的师弟，一个是怀孕五个月的资深测试。你必须亲手干掉一个。”",
        type: "choice",
        choices: [
          {
            text: "【拒绝当冷酷刽子手，主动申请将自己裁掉换取高额赔偿】：把生存机会留给有家室的同门！",
            detail: "骨子里拥有做人的良知与担当。既然手握积蓄与名校资本，宁可牺牲自己也不去砸别人的饭碗。",
            reaction: "你坦然在裁员单上签下自己的名字，拿着N+3丰厚补偿潇洒离开，师弟师妹全员起立抱头痛哭相送。",
            delta: { happiness: 35, resilience: 30, savings: 60000, inferiority: -25 },
            addTags: ["大义担当", "从容退场"]
          },
          {
            text: "【冷酷执行公司裁决，化身职业杀手向管理层交差】：职场只有利益没有私情，果断谈话",
            detail: "深谙商业丛林物竞天择的残酷规则，收起廉价的同情心，按部就班约谈下属完成指标。",
            reaction: "总监高度赞赏你的职业冷酷与执行力，将你破格提拔为技术总监，但深夜里你看着师弟离去的背影夜不能寐。",
            delta: { social: 35, savings: 50000, inferiority: 35, kinshipGuilt: 25 },
            addTags: ["冷酷执剑", "良心重负"]
          }
        ]
      },
      {
        id: "age_27_985_tech",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene: "二十七岁这一年，名校十二年长跑与大厂五年残酷厮杀，让你在二十七岁手握数十万真金白银。站在三十岁的人生门槛前，看着身边同事被三十年高杠杆房贷套牢而不敢喘息的模样，你迎来了终极决断：",
        type: "choice",
        choices: [
          {
            text: "坚定选择出海通道：开启全球技术移居与简单从容生活新篇章",
            detail: "带着扎实的工程技能与多年储蓄走向世界，彻底摆脱年龄焦虑与内卷，完完整整为自己活一次。",
            reaction: "飞机冲破云层，故乡的琐碎与攀比渐行渐远，辽阔的世界向你敞开怀抱，活出全新生命维度。",
            delta: { rebellion: 40, happiness: 35, resilience: 25 },
            addTags: ["奔赴异邦", "广阔天地"]
          },
          {
            text: "扎根故土成为行业中坚，在熟悉的规则与亲情中安顿一生",
            detail: "选择陪伴父母在侧，在熟人社会与庞大市场中守住现世安稳与人间烟火，承担起守护家庭的千钧重任。",
            reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
            delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
            addTags: ["深耕故土", "挑起大梁"]
          }
        ]
      }
    ];
  }

  // --------------------------------------------------------------------------
  // 2. 双非综合本科分流（现实的大多数与泥泞中突围）
  // --------------------------------------------------------------------------
  if (degreeTrack === "double_non") {
    // 2-A: 双非考研读研路线
    if (choiceText.includes("考研") || choiceText.includes("硕士") || choiceText.includes("读研")) {
      return [
        {
          id: "age_22_dn_postgrad",
          age: 22,
          stageName: "研一逆袭 · 22岁",
          title: "双非第一学历歧视与实验室杂役冷眼",
          scene: "逆袭考入省属重点大学研究生后，你发现同门的985本科同学早已抱团承接核心课题，而导师直接把你打发去整理发票与清洗实验仪器：“小陈，你本科基础薄弱，先给师兄打好杂。”",
          type: "choice",
          choices: [
            {
              text: "【咽下冷眼默默苦练，在通宵自习室把专业技能刷到全院第一】：用无可挑剔的实操反抗偏见！",
              detail: "不抱怨不低头，每天泡在机房自学顶会前沿算法与数据仿真，把每一篇文献吃透到骨髓。",
              reaction: "在全院盲审答辩中你以惊艳的理论模型震撼全场，导师当众向你道歉并拨发专项课题。",
              delta: { academicCapital: 30, cognition: 25, resilience: 25, inferiority: -15 },
              addTags: ["逆流破壁", "实战实力"]
            },
            {
              text: "【不与象牙塔较劲，早早利用研究生身份在校外大厂日常实习】：脚踏实地积累硬核经验",
              detail: "深谙学历贬值现实，不与导师死板较劲，利用课余时间去省会成长型企业做实战开发积累资本。",
              reaction: "早早赚到了每月数千元实习薪资，卡里存下两万结余，积累了丰富的商业实操经验。",
              delta: { savings: 20000, resilience: 20, social: 20, academicCapital: -5 },
              addTags: ["务实早飞", "积累底牌"]
            }
          ]
        },
        {
          id: "age_23_dn_postgrad",
          age: 23,
          stageName: "研二科研 · 23岁",
          title: "同门横向经费洗钱地雷与签字风波",
          scene: "研二阶段，同门师兄为了套取横向科研经费两万元，私下找来一批虚假餐饮和耗材发票，要求你在报销单上作为经办人签字分成：“小陈，大家都是这么报的，签个字分你五千块生活费。”",
          type: "choice",
          choices: [
            {
              text: "【坚决拒绝签字，并严肃提醒师兄纪律审计红线】：宁可穷死也绝不触碰财务违规！",
              detail: "清醒自立，深知虚假发票是随时毁掉一生的财务红线，哪怕得罪同门也绝不妥协签字。",
              reaction: "师兄恼羞成怒摔门而去，自此联合同门孤立你，但半年后学校财务大审计，该师兄被严肃通报处分，你安然无恙。",
              delta: { resilience: 25, happiness: 20, social: -20, inferiority: -15 },
              addTags: ["守正避雷", "问心无愧"]
            },
            {
              text: "【顺从签字分得五千块救命钱缓解家庭贫困】：在单据上签字，给病弱母亲汇去医药费",
              detail: "家里父亲农具坏了拿不出维修费，迫于生计的残酷撕咬，你最终还是在单据上签了字。",
              reaction: "母亲在电话里哭着夸你懂事，但你整整三个月担惊受怕，唯恐审计查到自己头上。",
              delta: { savings: 5000, kinshipGuilt: 20, inferiority: 25, resilience: -10 },
              addTags: ["生计妥协", "暗中自责"]
            }
          ]
        },
        {
          id: "age_24_dn_postgrad",
          age: 24,
          stageName: "硕士毕业秋招 · 24岁",
          title: "秋招简历遭遇‘第一学历双非一票否决’",
          scene: "二十四岁硕士毕业秋招，你手握两篇省部级论文去名企面试，HR却当面礼貌微笑：“同学，我们大厂核心岗第一学历要求985/211，系统初筛过不去，只能调剂去外包岗位。”全场鸦雀无声。",
          type: "choice",
          choices: [
            {
              text: "【拒绝去外包当二等公民，签约省会成长型高新企业核心技术主管】：凭真本事说话！",
              detail: "不为虚浮的名头当外包螺丝钉，选择在重视实操的成长型民企担任核心技术骨干，拥有完全自主权。",
              reaction: "虽然平台名气小一些，但你被列为重点骨干亲自带项目，月薪稳稳破万，生活踏实。",
              delta: { savings: 30000, cognition: 20, resilience: 20, inferiority: -10 },
              addTags: ["民企中坚", "拒绝外包"]
            },
            {
              text: "【屈服现实进入大厂外包，试图靠拼命加班熬过考核转正】：忍受同工不同酬的落差",
              detail: "渴望一线大厂的履历光环，抱着‘只要我足够拼命总能转正’的幻想踏入外包队伍。",
              reaction: "工卡与正式员工颜色不同，食堂没有补贴，每天加班到深夜却被告知‘今年没有转正名额’，内心备受摧残。",
              delta: { savings: 40000, health: -20, inferiority: 35, resilience: -15 },
              addTags: ["外包之痛", "隐形歧视"]
            }
          ]
        },
        {
          id: "age_25_dn_postgrad",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "省会成家立业的现实逼仄与三十万首付",
          scene: "工作走向平稳，二十五岁的你成为了部门不可或缺的骨干。对象父母来到省会考察，看着你租住的朝北单间，冷冷提出：“三十万首付必须年底到位，买不起房就不准领证。”而老家父母为了供你念书，存折上只剩一万两千元。",
          type: "choice",
          choices: [
            {
              text: "【坚守底线绝不向父母敲骨吸髓，理性推迟婚期或和平分手】：不能为了面子毁了父母晚年！",
              detail: "清醒自立，深知不能拿父母一生的棺材本去满足虚荣婚姻，断然拒绝高杠杆借贷成家。",
              reaction: "虽然感情破裂痛彻心扉，但你保全了父母的尊严与家庭底线，手里攥着自己的十万积蓄，一身轻松。",
              delta: { resilience: 30, happiness: -20, inferiority: -20, kinshipGuilt: -20 },
              addTags: ["清醒决断", "保全家庭"]
            },
            {
              text: "【业余疯狂承接外包私活打两份工，日夜透支赚取首付款】：每天只睡五小时硬扛拼命！",
              detail: "为了爱情与世俗体面豁出命去，白天在单位打卡，晚上在出租屋接单敲代码到凌晨三点。",
              reaction: "一年下来卡里硬生生攒出十五万元，顺利凑齐首付买下刚需小两居，但你累出了严重的腰肌劳损。",
              delta: { savings: 80000, health: -25, resilience: 20, kinshipGuilt: 15 },
              addTags: ["硬汉攒钱", "负重前行"]
            }
          ]
        },
        {
          id: "age_26_dn_postgrad",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "二十万独立积蓄的从容 vs 出海工签的抉择",
          scene: "二十六岁这一年，存折里的数字终于摸到了二十万元大关。看着身边同事被三十年沉重房贷压得不敢请假、不敢跳槽的模样，你庆幸自己保持了极佳的财务流动性与人身自由。",
          type: "choice",
          choices: [
            {
              text: "坚守二线省会工作与小家庭，在熟人温情中过安稳踏实的市井烟火日子",
              detail: "陪伴父母双亲，在烟火人间里安家立业，柴米油盐皆是踏实安详。",
              reaction: "家庭和睦融洽，你在二线城市扎下了坚固的基业，成为全家的顶梁柱。",
              delta: { kinshipGuilt: 25, happiness: 25, savings: 25000 },
              addTags: ["市井温情", "安居乐业"]
            },
            {
              text: "正式签署海外工作合同与技术工签申请，准备迈向广阔天地",
              detail: "勇敢斩断内卷循环，跨越大洋去过清爽简单的新生活，完完整整为自己活一次。",
              reaction: "拿到正式工签，带着多年积蓄打包行囊，登机远行，天地辽阔。",
              delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -15000 },
              addTags: ["整装待发", "告别故土"]
            }
          ]
        },
        {
          id: "age_27_dn_postgrad",
          age: 27,
          stageName: "二十七岁 · 人生关隘",
          title: "二十七岁人生评估与终极命运抉择",
          scene: "二十七岁这一年，双非起跑、考研突围与社会五年泥泞摸爬，让你拥有了为自己人生掌舵的全部底气与从容：",
          type: "choice",
          choices: [
            {
              text: "坚定选择出海通道：开启全球移居与从容生活新篇章",
              detail: "带着专业技能与多年积蓄走向世界，摆脱内卷，完完整整为自己活一次。",
              reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，活出全新的生命维度。",
              delta: { rebellion: 40, happiness: 35, resilience: 25 },
              addTags: ["奔赴异邦", "广阔天地"]
            },
            {
              text: "扎根故土成为家庭与企业中坚，在熟悉的规则与亲情中安顿一生",
              detail: "选择陪伴父母在侧，在熟人社会与本土平台中守住现世安稳与人间烟火。",
              reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
              delta: { kinshipGuilt: 30, social: 25, savings: 25000 },
              addTags: ["深耕故土", "挑起大梁"]
            }
          ]
        }
      ];
    }

    // 2-B: 基层事业单位路线（基层熟人社会的明枪暗箭）
    if (choiceText.includes("编制") || choiceText.includes("事业单位") || choiceText.includes("三支一扶") || choiceText.includes("体制") || choiceText.includes("考公")) {
      return [
        {
          id: "age_22_dn_inst",
          age: 22,
          stageName: "步入体制第一年 · 22岁",
          title: "事业单位科室报到与老员工甩锅危机",
          scene: "毕业后你按期去老家事业单位报到。入职第一周，科室里有背景的老油条员工便把全科室最繁琐的信访台账、窗口维稳和打杂跑腿全甩给你：“年轻人多锻炼，我们年纪大了眼睛不好。”而年底考核优秀指标早已内定给局长的小舅子。",
          type: "choice",
          choices: [
            {
              text: "【默默承受全部杂活，把每一道业务规范做到极致】：吃亏是福，在杂务中摸透所有流程",
              detail: "不抱怨不反驳，把所有信访案卷整理得井井有条，成为全科室业务最扎实的核心经办人。",
              reaction: "分管副局长暗中看在眼里，遇到关键突发任务点名让你操办，你成了不可或缺的干将。",
              delta: { resilience: 25, social: 20, savings: 10000, inferiority: 10 },
              addTags: ["勤恳老黄牛", "业务基石"]
            },
            {
              text: "【不卑不亢按章办事，坚决拒绝份外不合规杂务】：树立个人边界，绝不当受气包！",
              detail: "严格对照岗位职责清单办事，超出职责的违规杂活当场礼貌推回，守住自己的尊严。",
              reaction: "老油条员工自讨没趣不敢再放肆欺生，你在单位里赢得了‘原则强、不好惹’的威信。",
              delta: { rebellion: 25, resilience: 20, happiness: 15, social: -15 },
              addTags: ["界限清晰", "不好惹"]
            }
          ]
        },
        {
          id: "age_23_dn_inst",
          age: 23,
          stageName: "体制第2年 · 23岁",
          title: "单位集资房摇号黑幕与领导关系户插队",
          scene: "工作第二年，单位拿出最后一批工薪福利集资房按工龄与打分摇号。按打分你名列前三，稳拿一套两居室。但公示时，局长的亲侄子名字赫然顶替了你。母亲在电话里得知后痛哭流涕，劝你‘胳膊拧不过大腿，千万别闹’。",
          type: "choice",
          choices: [
            {
              text: "【搜集积分原始凭据向市纪委驻局纪检组实名反映】：绝不容许特权剥夺全家遮风挡雨的屋檐！",
              detail: "当晚整理出清晰的工龄分对照表，实名向纪检组递交核查申请，誓死保卫属于自己的正当权益。",
              reaction: "纪检组介入彻查，违规插队被叫停，你拿回了属于自己的选房资格，但局长自此对你冷若冰霜。",
              delta: { rebellion: 35, resilience: 30, social: -25, happiness: 20 },
              addTags: ["敢于较真", "夺回应得"]
            },
            {
              text: "【顺从大局接受调剂补偿，换取领导承诺的中级职称】：向权力低头，用房子换取仕途顺畅",
              detail: "听从母亲劝告不撕破脸，接受局长私下许诺的‘明年评中级职称优先照顾’与五千元安抚金。",
              reaction: "局长满脸欣慰夸你‘识大体顾大局’，次年顺利评上中级职称，但你每次路过集资楼都心如刀绞。",
              delta: { social: 25, savings: 15000, inferiority: 25, resilience: -10 },
              addTags: ["顾全大局", "委屈妥协"]
            }
          ]
        },
        {
          id: "age_24_dn_inst",
          age: 24,
          stageName: "体制第3年 · 24岁",
          title: "市直机关公开遴选考第一遭遇差额考察被黑",
          scene: "工作第三年，你凭借疯狂刷题以全省笔试第一名入围市委核心部门公开遴选。然而在二选一的差额考察环节，排名第二的候选人是该部门某处长的亲外甥。老科长叹息：‘小陈啊，差额考察考察的是综合背景，你懂的。’",
          type: "choice",
          choices: [
            {
              text: "【精心准备调研答辩，用碾压级的政务实绩打动考察组】：背水一战，用绝对实绩逼退暗箱！",
              detail: "通宵梳理全市痛点调研与改革方案，在考察面谈中条理分明、洞见深刻，令考察组成员肃然起敬。",
              reaction: "考察组主要领导拍板录用你，力排众议完成调动！你凭借无可匹敌的业务能力强行逆袭！",
              delta: { cognition: 30, resilience: 30, social: 25, savings: 10000 },
              addTags: ["硬核遴选", "实力逆袭"]
            },
            {
              text: "【看清体制天花板，坦然留在县城事业单位深耕副业】：不再盲目钻营，把精力还给自己与生活",
              detail: "释怀了对高层权力的执念，在县城守住稳定的铁饭碗，业余自学法律与外语接单，小日子过得滋润从容。",
              reaction: "下班后有了大把闲暇，陪伴父母种花喝茶，手里攥着五万元活期积蓄，心安神定。",
              delta: { happiness: 35, health: 25, kinshipGuilt: -20, social: 15 },
              addTags: ["县城清闲", "知足常乐"]
            }
          ]
        },
        {
          id: "age_25_dn_inst",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "单位一把手贪腐暴雷前的深夜拉拢串供",
          scene: "二十五岁这年，单位一把手因涉嫌工程贪腐被上级纪委暗中调查。深夜一把手把你叫到私家车上，掏出一个装有十万元现金的文件袋塞进你怀里：“小陈，纪委明天找你谈话，当年那个绿化工程的验收单，你就说是集体开会研究同意的，明白吗？”",
          type: "choice",
          choices: [
            {
              text: "【严词拒收现金，次日如实向纪检如实反映情况】：立身端正，绝不做违法犯罪的殉葬品！",
              detail: "当场把现金推回，明确表态绝不作伪证！次日面对纪委谈话实事求是陈述事实。",
              reaction: "一把手当场被双规立案，纪委领导肯定你廉洁守纪作风，你清清白白洗脱所有牵连，心境坦荡如砥。",
              delta: { resilience: 35, happiness: 30, inferiority: -20, social: 15 },
              addTags: ["刚正廉明", "风清气正"]
            },
            {
              text: "【虚与委蛇表面答应，暗中把谈话录音与单据完整上交纪检】：高超政治自保，立于不败之地！",
              detail: "不当面激怒困兽犹斗的一把手防遭人身报复，暗中录音留证，天亮第一秒直接走进纪委办公室报案。",
              reaction: "纪检部门大获全胜，案件迅速突破，你因协助破案有功被记三等功，老家父母在全县扬眉吐气！",
              delta: { cognition: 35, social: 30, savings: 15000, resilience: 25 },
              addTags: ["机智自保", "立功受奖"]
            }
          ]
        },
        {
          id: "age_26_dn_inst",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "县城熟人社会的安详 vs 辞职出海的冒险",
          scene: "二十六岁这一年，手握充足积蓄与稳定编制，你在老家县城拥有了极为稳固的社会地位。父母开始操办相亲安家，但在体制内看尽了风浪与平庸重复，你内心深处的旷野之火仍在燃烧。",
          type: "choice",
          choices: [
            {
              text: "扎根故土守护家庭，在熟人温情与人间烟火中安度一生",
              detail: "陪伴父母双亲，在熟悉的地方尽孝安老，过平淡热腾的一生。",
              reaction: "生活稳如磐石，你在本地社会建立了不可动摇的幸福防线。",
              delta: { kinshipGuilt: 30, happiness: 25, savings: 20000 },
              addTags: ["深耕故土", "挑起大梁"]
            },
            {
              text: "勇敢办理停薪留职或辞职出国，开启跨洋生活新冒险",
              detail: "趁年轻走出舒适区，带着积蓄去世界上体验全新的人生节奏，完完整整为自己活一次。",
              reaction: "收拾行囊踏上征途，故乡渐行渐远，天地辽阔任由驰骋。",
              delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -15000 },
              addTags: ["整装待发", "告别故土"]
            }
          ]
        },
        {
          id: "age_27_dn_inst",
          age: 27,
          stageName: "二十七岁 · 人生关隘",
          title: "二十七岁人生评估与终极命运抉择",
          scene: "二十七岁这一年，你在老家县城或省城出租屋阳台上，看着眼前这条一眼望得到头却无比安稳的道路。你迎来了人生命运的最后决断：",
          type: "choice",
          choices: [
            {
              text: "坚定选择出海通道：开启全球移居与从容生活新篇章",
              detail: "带着专业技能与多年积蓄走向世界，完完整整为自己活一次。",
              reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，活出全新的生命维度。",
              delta: { rebellion: 40, happiness: 35, resilience: 25 },
              addTags: ["奔赴异邦", "广阔天地"]
            },
            {
              text: "扎根故土成为家庭与企业中坚，在熟悉的规则与亲情中安顿一生",
              detail: "选择陪伴父母在侧，在熟人社会与本土平台中守住现世安稳与人间烟火。",
              reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
              delta: { kinshipGuilt: 30, social: 25, savings: 25000 },
              addTags: ["深耕故土", "挑起大梁"]
            }
          ]
        }
      ];
    }

    // 2-C: 双非科技民企 / 市场商务（商海生存与民企残酷）
    return [
      {
        id: "age_22_dn_market",
        age: 22,
        stageName: "步入职场第一年 · 22岁",
        title: "试用期最后一天遭遇民企老板借故克扣工资",
        scene: "毕业进入省会一家成长型商贸/软件民企。试用期最后一天，老板把你叫进办公室，借口‘大环境不好、试用期代码产出一般’，要求你降薪20%才能转正，并且拒绝为你补缴试用期的社保。",
        type: "choice",
        choices: [
          {
            text: "【搜集打卡与代码产出证据，申请劳动仲裁硬刚索赔到底！】：绝不受资本家窝囊气！",
            detail: "熟悉劳动法武器，拿出详实的加班打卡记录与邮件证据直奔劳动监察大队！",
            reaction: "仲裁胜诉拿到全额两倍赔偿与社保补缴，老板被迫掏钱和解，你为普通打工人争了一口恶气！",
            delta: { rebellion: 35, resilience: 25, savings: 15000, social: -15 },
            addTags: ["法条维权", "一身硬气"]
          },
          {
            text: "【隐忍签下转正合同，把公司当作跳板狂刷实战项目与客户资源】：骑驴找马，暗度陈仓",
            detail: "深谙生存之道，暂不撕破脸，利用公司的真实业务疯狂磨砺实战经验，积累跳槽资本。",
            reaction: "半年后凭借独立负责的大型客户项目，你被省城知名高新企业高薪挖角，华丽跳槽！",
            delta: { cognition: 25, savings: 20000, resilience: 20, inferiority: 10 },
            addTags: ["韬光养晦", "华丽跳槽"]
          }
        ]
      },
      {
        id: "age_23_dn_market",
        age: 23,
        stageName: "职场第2年 · 23岁",
        title: "负责的商贸项目被大客户恶意拖欠尾款赖账",
        scene: "工作第二年，你独立跟进的重大商贸订单遭遇大客户无赖拖欠二十万元尾款。老板暴跳如雷，放话‘收不回尾款扣发全组半年提成’，同事们把所有怨气发泄在你身上。",
        type: "choice",
        choices: [
          {
            text: "【堵在欠款大客户公司门口三天三夜，斗智斗勇追回欠款】：吃尽人间冷暖，逼出经商狠劲！",
            detail: "带着合同与公章天天蹲守客户董事长，软磨硬泡连哄带吓，甚至帮忙解决客户仓储痛点。",
            reaction: "客户最终佩服你的韧劲，将二十万尾款连本带利全额打入公司账户，全组提成到手，你一战封神！",
            delta: { social: 30, resilience: 35, savings: 25000, inferiority: -20 },
            addTags: ["死磕到底", "经商狠人"]
          },
          {
            text: "【主动拉上法务申请财产保全，走诉讼程序干净利落冻结资产】：用现代商业规则说话！",
            detail: "不搞低效人肉纠缠，连夜委托律师向法院申请诉前财产保全，精准冻结对方银行基本账户。",
            reaction: "对方账目被冻结后急得连夜求饶结清欠款，老板当场为你颁发重大贡献奖金！",
            delta: { cognition: 30, savings: 30000, social: 25, resilience: 15 },
            addTags: ["法务铁拳", "商业操盘"]
          }
        ]
      },
      {
        id: "age_24_dn_market",
        age: 24,
        stageName: "职场第3年 · 24岁",
        title: "初具项目经验遭遇合伙人卷款跑路风险",
        scene: "二十四岁这一年，你与两位行业朋友合伙创立小微工作室。年终盘点，你意外发现大股东私设个人小金库，正准备转移二十万现金流跑路，把债务全甩给你一人兜底！",
        type: "choice",
        choices: [
          {
            text: "【先发制人！联合银行与经侦连夜封锁账户，将合伙人堵在机场】：商业无情，雷霆手段！",
            detail: "展现出惊人的危机处置速度与果决手腕，保全全团队的血汗钱，将图谋不轨的合伙人踢出公司。",
            reaction: "成功挽回全部资金并全盘接管工作室，你在省城商业圈树立了‘手腕狠辣、账目清白’的强者威名！",
            delta: { cognition: 35, resilience: 35, savings: 50000, social: 20 },
            addTags: ["雷霆手腕", "商业领袖"]
          },
          {
            text: "【谈判和解拿回属于自己的本金与分成，退出合伙重返大公司】：见好就收，规避无限连带责任",
            detail: "深知小作坊合伙的人性险恶，不与其玉石俱焚，凭借协议拿回自己的五万元分成，果断抽身。",
            reaction: "带着真金白银安然退场，避免了可能背负的连带债务，你的商业认知大幅飞跃。",
            delta: { savings: 35000, resilience: 20, happiness: 15, inferiority: -10 },
            addTags: ["及时抽身", "见好就收"]
          }
        ]
      },
      {
        id: "age_25_dn_market",
        age: 25,
        stageName: "走向成熟 · 25岁",
        title: "行业寒冬降薪30%与父母生病急用钱的死局",
        scene: "二十五岁这年，民企遭遇资本严冬，全员降薪30%。偏偏此时老家母亲在农田劳作时被农机绞伤右腿，急需四万元手术自费押金！一边是缩水的薪水，一边是母亲痛苦的呻吟。",
        type: "choice",
        choices: [
          {
            text: "【拿出全部个人积蓄垫付母亲医药费，下班兼职跑代驾跑外卖】：咬碎牙齿也要扛起全家生计！",
            detail: "真正的男子汉/孝顺儿女在苦难面前从不下跪！白天受气上班，夜晚骑着电瓶车在寒风中穿街走巷。",
            reaction: "母亲手术极为成功顺利出院，你虽然累脱了一层皮，但在狂风暴雨中彻底磨成了铁骨脊梁！",
            delta: { kinshipGuilt: -35, resilience: 40, savings: -35000, health: -15 },
            addTags: ["铁骨脊梁", "至孝担当"]
          },
          {
            text: "【利用周末与行业资源开创独立自媒体与副业渠道】：用脑子破局，打造多渠道抗风险现金流！",
            detail: "绝不只靠出卖低级体力，总结行业干货做专业咨询，第一单便收到了两万元急救咨询费。",
            reaction: "不仅平稳解决了母亲的医疗危机，还意外跑通了自己的个人商业模式，收入反超主业！",
            delta: { cognition: 35, savings: 30000, resilience: 25, social: 20 },
            addTags: ["商业嗅觉", "多维造血"]
          }
        ]
      },
      {
        id: "age_26_dn_market",
        age: 26,
        stageName: "人生十字路口 · 26岁",
        title: "二十万积蓄的自由底牌 vs 人生终极抉择",
        scene: "二十六岁这一年，在残酷的商海竞争中厮杀五年，存折里的数字终于稳稳突破二十万元大关。你拥有了随时可以掀桌子的底气与自信。",
        type: "choice",
        choices: [
          {
            text: "守好二线省会工作与小家庭，在熟人温情中过安稳踏实的市井日子",
            detail: "陪伴父母双亲，在烟火人间里安家立业，柴米油盐皆是安详。",
            reaction: "家庭和睦融洽，你在二线城市扎下了安稳的基业。",
            delta: { kinshipGuilt: 25, happiness: 25, savings: 25000 },
            addTags: ["市井温情", "安居乐业"]
          },
          {
            text: "正式签署海外工作合同与技术工签申请，准备迈向广阔天地",
            detail: "勇敢斩断内卷循环，跨越大洋去过清爽简单的新生活，完完整整为自己活一次。",
            reaction: "拿到正式工签，带着多年积蓄打包行囊，登机远行。",
            delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -15000 },
            addTags: ["整装待发", "告别故土"]
          }
        ]
      },
      {
        id: "age_27_dn_market",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene: "二十七岁这一年，双非起跑与商海残酷厮杀，让你在这一年拥有了为自己人生掌舵的全部底气与从容：",
        type: "choice",
        choices: [
          {
            text: "坚定选择出海通道：开启全球移居与从容生活新篇章",
            detail: "带着专业技能与多年积蓄走向世界，完完整整为自己活一次。",
            reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，活出全新的生命维度。",
            delta: { rebellion: 40, happiness: 35, resilience: 25 },
            addTags: ["奔赴异邦", "广阔天地"]
          },
          {
            text: "扎根故土成为家庭与企业中坚，在熟悉的规则与亲情中安顿一生",
            detail: "选择陪伴父母在侧，在熟人社会与本土平台中守住现世安稳与人间烟火。",
            reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
            delta: { kinshipGuilt: 30, social: 25, savings: 25000 },
            addTags: ["深耕故土", "挑起大梁"]
          }
        ]
      }
    ];
  }

  // --------------------------------------------------------------------------
  // 3. 高职大专 / 蓝领工匠分流（一技之长与市井江湖）
  // --------------------------------------------------------------------------
  return [
    {
      id: "age_22_jc_craft",
      age: 22,
      stageName: "车间学徒第一年 · 22岁",
      title: "车间老油条师傅克扣工时与重大安全隐患",
      scene: "进入大型机械制造厂车间第一年，带教师傅把繁重危险的冲压活全推给你，自己去休息室喝茶，甚至在工时结算单上克扣你的计件工资。更要命的是，你发现某台重型冲压机床的安全光栅传感器已被师傅违规短接屏蔽，随时可能发生断指惨剧！",
      type: "choice",
      choices: [
        {
          text: "【拒绝违规开机！当场拉下总电闸并向厂安全科实名上报】：安全大于天，绝拿命换钱！",
          detail: "严格遵守安全生产红线，顶住老油条师傅的破口大骂，坚决不违规作业。",
          reaction: "安监科突击检查确认重大安全隐患，老师傅被全厂通报扣罚，你获评‘青年安全卫士’树立硬骨威信！",
          delta: { resilience: 30, social: 15, health: 15, inferiority: -15 },
          addTags: ["安全卫士", "铁面匠人"]
        },
        {
          text: "【私下自费买烟向师傅赔笑，暗中修复接线并偷学独门数控绝活】：委曲求全，偷学真本事",
          detail: "深谙底层师徒江湖潜规则，用软手段稳住师傅，趁机偷学他从不外传的精密数控微调绝活。",
          reaction: "老师傅被你服侍得舒坦，终于把压箱底的特种参数调试教给了你，你技术突飞猛进。",
          delta: { cognition: 25, savings: 8000, inferiority: 15, resilience: 15 },
          addTags: ["隐忍偷艺", "手艺突破"]
        }
      ]
    },
    {
      id: "age_23_jc_craft",
      age: 23,
      stageName: "技术骨干 · 23岁",
      title: "特种工艺考核破格与学历受限的悲哀",
      scene: "工作第二年，全厂举办数控技能大赛，你凭借过硬手艺力压全厂老师傅斩获第一名。厂长原本想直接提拔你为车间工程师，人力资源部却拿着红头文件泼下一盆冷水：“大专学历连工程师评审门槛都够不上，最多只能算个高级工技师。”",
      type: "choice",
      choices: [
        {
          text: "【报名国家开放大学非全日制专升本，誓要拿下本科学位】：用业余时间补齐学历短板！",
          detail: "不服输！白天在机床前流汗，夜晚在宿舍自考大专升本科，誓要打破学历壁垒。",
          reaction: "两年苦读拿下全科合格证书，你成为全厂罕见‘既有高级技师证又有本科学历’的复合骨干！",
          delta: { academicCapital: 25, cognition: 20, savings: -6000, resilience: 20 },
          addTags: ["升本补拙", "破壁逆袭"]
        },
        {
          text: "【不迷信一纸文凭，凭借稀缺特种焊接绝活向私企外企高薪竞聘】：靠硬本事吃四方饭！",
          detail: "看透学历泡沫，将时间全部投入到国际特种焊接与高压容器认证上，考取国际互认证书。",
          reaction: "沿海德资外企开出月薪一万五加十三薪的高薪挖角，你靠一身硬核本事赢得了蓝领尊严！",
          delta: { savings: 35000, resilience: 25, inferiority: -20 },
          addTags: ["特种大工", "手艺吃四方"]
        }
      ]
    },
    {
      id: "age_24_jc_craft",
      age: 24,
      stageName: "实干丰收 · 24岁",
      title: "带领工友抗议工厂违规取消工伤医疗津贴",
      scene: "二十四岁这一年，厂里新换的管理层单方面削减一线工人的高温补贴与职业病体检待遇。同车间的老工友敢怒不敢言。你作为车间青年技术骨干，站到了风口浪尖。",
      type: "choice",
      choices: [
        {
          text: "【牵头撰写联名建议书，依规与工会管理层开展集体劳动协商】：为工友发声，义字当头！",
          detail: "懂法律懂技术，带领全体工友据理力争，通过正规协商机制迫使资方恢复合理劳动保障。",
          reaction: "管理层被迫妥协补发全额津贴，你在全体工人中赢得了至高无上的声望，被选举为职工代表！",
          delta: { social: 35, resilience: 30, rebellion: 25, inferiority: -20 },
          addTags: ["职工代表", "工友领袖"]
        },
        {
          text: "【独善其身辞职自立门户，在老街盘下门面开汽修加工工坊】：远离是非，自立当老板！",
          detail: "看透给资本家打工的无奈，拿出多年攒下的五万元积蓄，盘下老家门面自己当老板。",
          reaction: "起早贪黑诚信经营，你的维修工坊成了老街招牌，当年纯利润突破八万元！",
          delta: { savings: 45000, resilience: 25, happiness: 20, social: 15 },
          addTags: ["自立掌柜", "实体突破"]
        }
      ]
    },
    {
      id: "age_25_jc_craft",
      age: 25,
      stageName: "走向成熟 · 25岁",
      title: "老街实体工坊遭遇同行恶意低价竞争与地痞挑衅",
      scene: "二十五岁这年，你的实体工坊生意红火，引来整条街同行老油条的联合抵制。邻近两家店故意降价倾销，并找来当地地痞流氓三天两头借故挑衅堵门，威胁让你‘在这条街混不下去’。",
      type: "choice",
      choices: [
        {
          text: "【硬碰硬！安装全方位监控，搜集寻衅滋事证据直接报警扫黑】：法治社会，绝不向恶势力低头！",
          detail: "不怕恶霸恐吓，固定所有骚扰与威胁录音视频，联合周边商户直接向市公安局扫黑办递交线索。",
          reaction: "公安雷霆出击拘留涉案地痞，敲山震虎，整条老街同行对你肃然起敬，铺子经营稳如泰山！",
          delta: { resilience: 35, social: 25, inferiority: -25, savings: 20000 },
          addTags: ["刚烈立足", "街坊敬重"]
        },
        {
          text: "【不争低端价格战，全面转型高端进口车型精密维修与定制改装】：降维打击，靠技术壁垒胜出！",
          detail: "不与地痞老店在烂泥里缠斗，自费采购数控电脑解码器与德国诊断仪，专接别人修不了的高难度活。",
          reaction: "全市豪车车主与改装玩家纷纷慕名而来，客单价翻了四倍，年利润直接突破十五万元大关！",
          delta: { cognition: 30, savings: 60000, resilience: 20 },
          addTags: ["技术壁垒", "高端转型"]
        }
      ]
    },
    {
      id: "age_26_jc_craft",
      age: 26,
      stageName: "人生十字路口 · 26岁",
      title: "存折上的第一个二十万与海外蓝领工签的召唤",
      scene: "二十六岁这一年，存折里的数字终于摸到了二十万元大关。父母在老家县城逢人便夸你手艺好、能干自立。海外中介打来电话：“小陈，凭借你的高级数控技师证，澳洲/德国蓝领工签只要雅思通过，年薪折合60万人民币！”",
      type: "choice",
      choices: [
        {
          text: "扎根故土做实体老板，守在父母身边，在熟人温情中安顿一生",
          detail: "陪伴父母在侧，在老街上安家立业，柴米油盐皆是踏实的人间烟火。",
          reaction: "生活稳如磐石，你在本地社会建立了不可动摇的幸福防线，父母笑逐颜开。",
          delta: { kinshipGuilt: 30, happiness: 25, savings: 30000 },
          addTags: ["深耕故土", "挑起大梁"]
        },
        {
          text: "报名外语培训班，凭借过硬手艺走向世界，开启跨洋大工匠传奇",
          detail: "趁年轻去世界的旷野闯一闯，让真才实学换回两层小楼与真正的劳工尊严。",
          reaction: "收拾行囊踏上征途，故土渐行渐远，世界大工匠传奇向你敞开怀抱。",
          delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -15000 },
          addTags: ["整装待发", "告别故土"]
        }
      ]
    },
    {
      id: "age_27_jc_craft",
      age: 27,
      stageName: "二十七岁 · 人生关隘",
      title: "二十七岁人生评估与终极命运抉择",
      scene: "二十七岁这一年，一身过硬实操绝活与五年江湖摸爬，让你在这一年拥有了为自己人生掌舵的全部底气与从容：",
      type: "choice",
      choices: [
        {
          text: "坚定选择出海通道：开启全球移居与从容生活新篇章",
          detail: "凭真本事走向世界，完完整整为自己活一次。",
          reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，活出全新的生命维度。",
          delta: { rebellion: 40, happiness: 35, resilience: 25 },
          addTags: ["奔赴异邦", "广阔天地"]
        },
        {
          text: "扎根故土成为家庭与企业中坚，在熟悉的规则与亲情中安顿一生",
          detail: "陪伴父母在侧，在熟人社会中守住现世安稳与人间烟火。",
          reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
          delta: { kinshipGuilt: 30, social: 25, savings: 25000 },
          addTags: ["深耕故土", "挑起大梁"]
        }
      ]
    }
  ];
}

export type CareerSubtrackType =
  | "civil"
  | "tech"
  | "academic"
  | "commercial"
  | "artisan"
  | "hardship_labor"
  | "street_reformed";

export function getCareerSubtrack(
  tags: string[] = []
): CareerSubtrackType {
  // 1. 苦命海外劳工优先级（时运不济 · 黑中介苦力还债）
  if (
    tags.some((t) =>
      ["海外苦力", "血汗还债", "黑中介", "苦工还债", "苦命打工", "时运不济"].some((k) =>
        t.includes(k)
      )
    )
  ) {
    return "hardship_labor";
  }

  // 2. 职高辍学涉灰 / 浪子回头优先级
  if (
    tags.some((t) =>
      ["铁窗悔恨", "浪子回头", "灰产跑分", "涉足灰产", "看守所", "洗心革面", "大排档自立"].some((k) =>
        t.includes(k)
      )
    )
  ) {
    return "street_reformed";
  }

  if (
    tags.some((t) =>
      [
        "选调",
        "体制",
        "机关",
        "事业编",
        "公职",
        "公共治理",
        "基层政法",
        "省直机关",
        "单位中坚",
        "作风扎实",
        "群众口碑",
        "接地气",
        "政治学",
        "公服栋梁",
        "政务骨干",
        "选调生苗子"
      ].some((k) => t.includes(k))
    )
  ) {
    return "civil";
  }

  if (
    tags.some((t) =>
      [
        "学术",
        "科研",
        "读研",
        "保研",
        "考研",
        "顶刊",
        "硕博",
        "课题",
        "高校教职",
        "学术苗子",
        "纯粹求索",
        "保研直博"
      ].some((k) => t.includes(k))
    )
  ) {
    return "academic";
  }

  if (
    tags.some((t) =>
      ["工匠", "手艺", "技工", "机修", "数控", "大工匠", "高级工", "大专实用", "特级大工", "车间骨干"].some((k) =>
        t.includes(k)
      )
    )
  ) {
    return "artisan";
  }

  if (
    tags.some((t) =>
      ["实体", "商贸", "掌柜", "生意", "商业", "店铺", "经管商贸", "商业敏锐", "外贸熟手", "自立门户", "商海搏击"].some((k) =>
        t.includes(k)
      )
    )
  ) {
    return "commercial";
  }

  return "tech";
}

export function generateCareerTimeline(
  family: FamilyOrigin,
  degreeTrack: "985_211" | "double_non" | "junior_college",
  extraTags: string[] = []
): LifeEventNode[] {
  // ★★★ 职高失足青年专属因果分流：直通看守所、母亲白发与救赎时间线！★★★
  const isStreetCrime = extraTags.some((t) =>
    ["涉足灰产", "混迹街头", "灰色快钱"].some((k) => t.includes(k))
  );

  const trackPool = isStreetCrime
    ? STREET_REFORM_TIMELINE_NODES
    : (CAREER_EVENTS_BY_TRACK[degreeTrack] || CAREER_EVENTS_BY_TRACK["double_non"]);
  const result: LifeEventNode[] = [];

  const isCivil = extraTags.some((t) =>
    ["选调", "体制", "公职", "公共治理", "基层政法", "省直机关", "公服", "政务"].some((k) =>
      t.includes(k)
    )
  );
  const isAcad = extraTags.some((t) =>
    ["学术", "科研", "求索", "基科", "学者"].some((k) => t.includes(k))
  );
  const isBiz = extraTags.some((t) =>
    ["商贸", "商业", "经管"].some((k) => t.includes(k))
  );

  for (let age = 19; age <= 27; age++) {
    const ageEvents = trackPool[age];
    if (!ageEvents || ageEvents.length === 0) continue;

    let selected = ageEvents[0];
    if (age === 20) {
      // 20岁必出结识爱人 · 红尘相遇里程碑！
      const romance = ageEvents.find((e) => e.id.includes("romance"));
      if (romance) selected = romance;
      else selected = ageEvents[0];
    } else if (age === 19) {
      if (isCivil) {
        const found = ageEvents.find((e) => e.id.includes("civil"));
        if (found) selected = found;
      } else if (isAcad) {
        const found = ageEvents.find((e) => e.id.includes("acad"));
        if (found) selected = found;
      } else if (isBiz) {
        const found = ageEvents.find((e) => e.id.includes("biz"));
        if (found) selected = found;
      } else {
        selected = ageEvents[0];
      }
    } else {
      const randomIndex = Math.floor(Math.random() * ageEvents.length);
      selected = ageEvents[randomIndex] || ageEvents[0];
    }

    // 动态置换场景变量
    let resolvedScene = selected.scene
      .replace(/\{hospital\}/g, family.hospitalName)
      .replace(/\{cityOrCounty\}/g, family.cityOrCounty)
      .replace(/\{primarySchool\}/g, family.primarySchoolName)
      .replace(/\{highSchool\}/g, family.highSchoolName);

    result.push({
      ...selected,
      scene: resolvedScene
    });
  }

  return result;
}


export const LIFE_SIMULATION_TIMELINE: LifeEventNode[] = generateTimelineForCharacter(
  {
    region: "华北重工业地级市生活区",
    regionDetail: "钢厂子弟校 · 泛灰白杨树 · 家属大院 | 空气里常年有微尘",
    hospitalName: "市职工总院产科",
    primarySchoolName: "钢厂子弟第一小学",
    highSchoolName: "市第一高级中学",
    cityOrCounty: "地级市工矿生活区",
    fatherAge: 30,
    fatherJob: "钢厂热轧车间机修电工",
    fatherTrait: "老烟枪，性格木讷严肃，双手常有机油味",
    motherAge: 28,
    motherJob: "市自来水公司抄表员",
    motherTrait: "精打细算持家，掌管家里存折",
    housing: "老重工国企职工集资筒子楼（52㎡）",
    wealthTier: "紧绷温饱（经不起任何风浪）",
    wealthDetail: "月收入仅够柴米油盐与学杂费",
    siblingType: "only_child",
    siblingAgeOffset: 0,
    siblings: "独生子女（独享亦独扛）",
    siblingsDetail: "父母将所有关注倾注在你身上",
    emotionalTone: "务实生计型",
    toneDetail: "家里凡事以现实利益与风险为先",
    backgroundStory: "",
    initialSavings: 10,
    initialFamilySavings: 28000
  },
  "男"
);

export const K12_EVENTS = LIFE_SIMULATION_TIMELINE.slice(6, 18);
export const CAREER_EVENTS = LIFE_SIMULATION_TIMELINE.slice(18);


export interface GaokaoCalculation {
  degreeTrack: "985_211" | "double_non" | "junior_college";
  title: string;
  scoreText: string;
  verdict: string;
  academicCapitalDesc: string;
  psychologicalDossier: string;
  firstStepChoice: {
    prompt: string;
    options: {
      text: string;
      detail: string;
      delta: Partial<CharacterAttributes>;
      addTags?: string[];
    }[];
  };
}

export function calculateGaokaoOutcome(
  attrs: CharacterAttributes,
  tags: string[] = [],
  family?: FamilyOrigin
): GaokaoCalculation {
  const province = family?.province;

  // If Vocational / Artisan Track from 0~17
  if (tags.includes("职教蓝领") || tags.includes("手艺人底色") || tags.includes("早期打工")) {
    const provOptions = getProvincialGaokaoOptions(province, "junior_college");
    return {
      degreeTrack: "junior_college",
      title: province ? `【${province}公办全日制大专 · 实用技能定向】` : "【公办全日制大专 · 实用技能定向】",
      scoreText: "对口高职高考考分 488 分，被省内公办职业技术学院王牌工科/护理专业录取",
      verdict:
        "你在十五岁那年没有挤上普高的独木桥，避开了三年无休止的题海折磨。在实训机床和实操图纸前，你练就了一双带老茧的双手。虽然亲友聚会时长辈总爱念叨‘专科到底不如本科’，但你早已学会靠具体手艺自立。",
      academicCapitalDesc: "实用技能在身，虽然学历门槛受限，但你在蓝领与一线操作岗位拥有极强的生存韧性。",
      psychologicalDossier: `生存韧劲：${attrs.resilience}%，自卑创伤：${attrs.inferiority}%。你更早接触了社会的冷暖，骨子里少了一份文人的清高，多了一份现实的生存嗅觉。`,
      firstStepChoice: {
        prompt: `面对${province ? province : "大专"}三年的时光，你的核心规划是：`,
        options: (provOptions && provOptions.length > 0) ? provOptions : [
          {
            text: "扎根实训基地苦练数控机床与精密维保绝活，考取高级工职业资格，靠手艺硬核立足",
            detail: "不再向家里伸手要生活费，利用一切实训与假期在工厂一线打磨不可替代的实操硬功夫。",
            delta: { resilience: 25, savings: 6000, cognition: 15 },
            addTags: ["大专实用", "手艺人底色", "早熟自立"]
          },
          {
            text: "报名‘专升本’培训班，咬紧牙关再战两年，誓要在二十岁拿到全日制本科学位",
            detail: "你依然无法放下被社会学历筛选歧视的屈辱，试图通过专升本长跑洗刷起点劣势。",
            delta: { academicCapital: 25, kinshipGuilt: 15, savings: -4000 },
            addTags: ["专升本执念", "逆袭渴望"]
          },
          {
            text: "职高辍学混迹街头，跟社会上的‘大哥’在台球厅和网吧混，贪图赚快钱涉足灰产",
            detail: "厌恶学校与枯燥说教，结识社会青年帮人‘跑分转账’或‘催收水货’，沉迷于灰色快钱。",
            delta: { rebellion: 35, savings: 15000, inferiority: 20, health: -10 },
            addTags: ["涉足灰产", "混迹街头", "灰色快钱"]
          }
        ]
      }
    };
  }

  // Standard Gaokao Weighted Scoring (750 Points Standard)
  // 更加严谨真实的高考分流算力：名校985/211是千里挑一的独木桥，必须兼备做题本钱、心智沉着与身心耐力
  let rawScore = 320;
  // 应试做题本钱是主力（满权重约 200 分，70本钱可得175分）
  rawScore += (attrs.academicCapital || 0) * 2.5;
  // 综合认知与理解力（满权重约 75 分）
  rawScore += (attrs.cognition || 0) * 1.0;
  // 心理素质与抗压抗挫韧劲（满权重约 30 分）
  rawScore += (attrs.resilience || 0) * 0.4;
  // 考前体魄健康折损（若透支过甚体魄低于30，考场虚脱直接扣分）
  if ((attrs.health || 0) < 30) {
    rawScore -= (30 - (attrs.health || 0)) * 1.5;
  }
  // 自卑/紧张扣分（最多扣 25 分）
  rawScore -= (attrs.inferiority || 0) * 0.25;

  // 关键特质与高中抉择标签修正
  const scoreBonuses: Record<string, number> = {
    "全省模考拔尖": 20,
    "刷题狠劲": 15,
    "做题拔尖": 15,
    "自律自强": 10,
    "题海苦读": 10,
    "稳扎稳打": 8,
    "考前焦虑": -18,
    "精神内耗": -22,
    "厌学逃避": -35
  };
  tags.forEach((t) => {
    for (const [k, bonus] of Object.entries(scoreBonuses)) {
      if (t.includes(k)) rawScore += bonus;
    }
  });

  const finalScore = Math.round(Math.min(698, Math.max(310, rawScore)));

  // Tier 1: 985/211 重点大学 (全省排名前1.2%，必须同时满足总分>=635、做题资本>=75、见识认知>=65，且身体未被透支崩溃)
  if (finalScore >= 620 && (attrs.academicCapital || 0) >= 68 && (attrs.cognition || 0) >= 55 && (attrs.health || 0) >= 28) {
    const provOptions = getProvincialGaokaoOptions(province, "985_211");
    return {
      degreeTrack: "985_211",
      title: province ? `【${province}顶尖重点高校 · 录取榜首】` : "【985/211重点大学 · 顶尖高校录取】",
      scoreText: `高考总分 ${finalScore} 分（全省排位前 1.2%），稳稳斩获顶尖重点大学录取通知书！`,
      verdict:
        "你在长达十二年的应试长跑中脱颖而出！红榜挂在校门前，校长和老师亲自送来喜报与奖学金，亲友们把你看作改写门楣的骄傲。你用十二年的极致自律与做题硬功夫换来了这张稀缺门票，未来不同赛道的宏大版图正向你展开。",
      academicCapitalDesc: "重点大学文凭到手，拥有顶尖校友网络与各行业核心选拔入场券，同时也承载着整个家庭更沉重的期许。",
      psychologicalDossier: `家庭牵绊：${attrs.kinshipGuilt}%，应试底盘：${attrs.academicCapital}%。你赢下了最艰难的第一道独木桥，骨子里充满底气。`,
      firstStepChoice: {
        prompt: `面对${province ? `${province}本省及全国` : "名校"}王牌志愿与未来赛道，你的根本立志是：`,
        options: (provOptions && provOptions.length > 0) ? provOptions : [
          {
            text: "攻读重点大学王牌计算机/电子信息工程专业，立志用技术硬实力在市场立足",
            detail: "名校理工硬核底蕴，面向前沿科技与高端研发，毕业后立志用代码与工程能力改变家庭阶层。",
            delta: { resilience: 20, academicCapital: 25, savings: 10000 },
            addTags: ["重点大学光环", "大厂做题家", "重点工科"]
          },
          {
            text: "报考重点大学法学/公共管理专业，锁定省委定向选调与体制内公共服务直通车",
            detail: "听从父母与内心对稳定秩序的向往，志在公共治理与民生建设，为全家换取铁饭碗安全感。",
            delta: { kinshipGuilt: 25, rebellion: -20, social: 20, savings: 8000 },
            addTags: ["重点大学光环", "体制预备役", "公共治理"]
          },
          {
            text: "选择基础数学/理论物理/人文社科专业，耐得住十年冷板凳，立志投身纯粹学术研究",
            detail: "不被短期世俗功利捆绑，追求真理与深层认知，立志本硕博连读攀登科学与学术殿堂。",
            delta: { cognition: 30, academicCapital: 25, rebellion: 15, savings: 5000 },
            addTags: ["重点大学光环", "学术苗子", "纯粹求索"]
          }
        ]
      }
    };
  }

  // Tier 2: 普通公办本科（双非本一/二本，490~634分，绝大多数本科生的真实天地）
  if (finalScore >= 490) {
    const provOptions = getProvincialGaokaoOptions(province, "double_non");
    return {
      degreeTrack: "double_non",
      title: province ? `【${province}公办本科（双非一本/二本） · 真实而厚重的大多数】` : "【沿海普通公办本科（双非一本/二本） · 真实而厚重的大多数】",
      scoreText: `高考总分 ${finalScore} 分（超省控公办本科线），被二线省会公办综合性大学录取`,
      verdict:
        "不高不低的分数，折射出你十二年来既不甘摆烂又未曾彻底疯狂的真实写照。你跨过了全日制本科的门槛，没有名校天生光环加持，但也免去了高处不胜寒的重压。未来的路，全看你在大学四年的主动突围。",
      academicCapitalDesc: "正规公办本科文凭，够得着绝大多数企业与体制内考编的基本门槛，关键在于个人专业与实操积累。",
      psychologicalDossier: `独立倾向：${attrs.rebellion}%，抗压韧劲：${attrs.resilience}%。你深知自己是一介凡人，必须更早找准立足社会的生态位。`,
      firstStepChoice: {
        prompt: `迈入${province ? province : "大学"}校园，你为自己确立的突围支点是：`,
        options: (provOptions && provOptions.length > 0) ? provOptions : [
          {
            text: "选择实用型软件工程与智能物联专业，大学四年疯狂自学做项目，靠硬实战经验突围",
            detail: "深知学历并非王牌，早早泡在机房与开源社区，通过真实企业项目锤炼专业实操技能。",
            delta: { resilience: 25, cognition: 20, rebellion: 15, savings: 6000 },
            addTags: ["双非应用工科", "主动破局", "实战技术"]
          },
          {
            text: "选择公共管理与法学教育，主攻普通话、法考与省考事业编，早早规划编制保障",
            detail: "顺应家庭求稳期待，大学四年系统研习行测申论与法律知识，瞄准体制内的稳定与安详。",
            delta: { kinshipGuilt: 25, social: 20, rebellion: -15, savings: 5000 },
            addTags: ["双非基层政法", "体制预备役", "公职考编"]
          },
          {
            text: "选择国际贸易与数字商务，在沿海二线城市兼职跑业务，早早融入市场流转与商业实操",
            detail: "发挥商业嗅觉与人情练达，不被死板书本局限，通过具体的商贸流转与供应链摸爬滚打。",
            delta: { social: 25, resilience: 20, savings: 8000 },
            addTags: ["双非经管商贸", "商业敏锐", "早早自立"]
          }
        ]
      }
    };
  }

  // Tier 3: 公办高等职业技术学院 / 专科定向 (< 490 分)
  const provOptions = getProvincialGaokaoOptions(province, "junior_college");
  return {
    degreeTrack: "junior_college",
    title: province ? `【${province}普通公办大专 · 现实的冷水与重新出发】` : "【省会普通公办大专 · 现实的冷水与重新出发】",
    scoreText: `高考总分 ${finalScore} 分（未达本科省控线），录取至省属公办职业技术学院`,
    verdict:
      "出分那一晚，客厅里一片沉寂。父母在阳台上长吁短叹，十二年的应试长跑在这一刻画上了句号。你意识到自己在死板做题应试上并不占优，但也终于放下了虚浮的执念，开始思考最务实的谋生出路。",
    academicCapitalDesc: "大专文凭，在遍地本科生的时代稍显单薄，但只要练就一身过硬的独门手艺，照样能在社会稳稳立足。",
    psychologicalDossier: `生存韧性：${attrs.resilience}%，心理压力：${attrs.inferiority + 15}%。家人的叹息如针扎，但你也彻底放下了应试的沉重包袱。`,
    firstStepChoice: {
      prompt: `拿着${province ? province : "大专"}通知书，你的第一步打算：`,
      options: (provOptions && provOptions.length > 0) ? provOptions : [
        {
          text: "坦然接纳现实：大专学一门实用精密数控或维保手艺，周末打工自给自足不再要钱",
          detail: "贫穷和挫败不再能轻易击垮你，你把身段放到最低，在具体的工业与社会泥土里摸爬滚打。",
          delta: { resilience: 35, inferiority: -10, savings: 5000 },
          addTags: ["大专实用", "手艺人底色", "早熟自立"]
        },
        {
          text: "报名‘专升本’长跑班，誓要用大专三年的苦行僧生活洗刷高考失利的阴影",
          detail: "骨子里憋着一口恶气，哪怕在专科宿舍里也要天天早起背英语做真题，誓死突围学历天花板。",
          delta: { academicCapital: 30, kinshipGuilt: 20, savings: -5000, resilience: 20 },
          addTags: ["专升本执念", "逆境狂奔"]
        },
        {
          text: "职高辍学混迹街头，跟社会上的‘大哥’在台球厅和网吧混，贪图赚快钱涉足灰产",
          detail: "厌恶学校与枯燥说教，结识社会青年帮人‘跑分转账’或‘催收水货’，沉迷于灰色快钱。",
          delta: { rebellion: 35, savings: 15000, inferiority: 20, health: -10 },
          addTags: ["涉足灰产", "混迹街头", "灰色快钱"]
        }
      ]
    }
  };
}

export function evaluate27YearOldLife(
  attrs: CharacterAttributes,
  tags: string[] = []
): LifeDiagnosis {
  const savingsNote =
    attrs.savings >= 50000
      ? `手头累积结余约 ¥${attrs.savings.toLocaleString()}，具备初步抵御失业与启动出海的本金底气。`
      : attrs.savings >= 0
      ? `手头结余约 ¥${attrs.savings.toLocaleString()}，日常抗风险能力偏弱，经不起生病或失业。`
      : `个人账户处于负债状态（¥${Math.abs(attrs.savings).toLocaleString()}），现金流极其紧绷。`;

  // 1. 蓝领实干型出海
  if (tags.includes("职教蓝领") || tags.includes("手艺人底色") || tags.includes("蓝领实干")) {
    return {
      type: "blue_collar_abroad",
      title: "【技艺立身 · 蓝领破壁者】",
      portrait: `你在十五六岁就看清了应试学历的泡沫，早早掌握了车床、维修、护理或烹饪等具体手艺。社会前五年你虽然没有白领的光鲜，但你几乎从未失业。${savingsNote}`,
      kinshipEvaluation: `家庭牵绊度：${attrs.kinshipGuilt}/100。你对老家亲戚的攀比早已脱敏，你明白能靠一双手吃饱饭比虚浮的体面更重要。`,
      systemEvaluation: `体制依附度：极低。你天生不需要体制喂饭，市场经济的一线是你生存的坚固底盘。`,
      fateVerdict: `你非常适合走向海外（如日本、德国、澳洲等体力与技术价值被高度尊重的国度）。在异国，你的手艺能换回两层小楼与体面收入，彻底甩掉国内二等公民的偏见。`,
      recommendation: `尽早拿下日语N2/德语B1或攻读紧缺工种职业评估，带上工具箱果断出走。`
    };
  }

  // 2. 深度深陷房贷与孝道的负责型留下
  if (tags.includes("三十年房奴") || (attrs.kinshipGuilt >= 60 && tags.includes("家庭牵绊"))) {
    return {
      type: "stay_exhausted",
      title: "【负责守家 · 家庭核心支柱】",
      portrait: `你是典型的负责任好儿女，也是默默背负家庭全部压力的脊梁。房贷、老人的医药费、家人的指望，沉甸甸地压在你的肩头。${savingsNote}`,
      kinshipEvaluation: `家庭顾念度：${attrs.kinshipGuilt}/100（高度牵绊）。家人的健康与期待是你无法割舍的责任，离开这片土地对你而言有着深重的心理负担。`,
      systemEvaluation: `体制与稳定依附度：较高。你需要持续稳定的现金流来保障全家开支，经不起大的动荡。`,
      fateVerdict: `你选择了对家庭负责，承受起生活的全部重担。你是这片土地上最坚韧的基石，平凡却令人敬重。虽然疲惫常伴，但在亲人心中，你是全家不可或缺的依靠。`,
      recommendation: `留下来，认认真真搞钱防守，学会在亲族面前建立财务底线，谨防被无底洞拖垮。`
    };
  }

  // 3. 独立自主型出海
  if (attrs.rebellion >= 55 || tags.includes("断脐出海") || tags.includes("划清界限") || tags.includes("主动破局")) {
    return {
      type: "emigrate_autonomous",
      title: "【独立远行 · 精神自主者】",
      portrait: `你对按部就班的传统生活模式有着天然的疏离。那些被常人视作“标准答案”的考编、买房、熟人应酬，常常让你感到束缚与精神内耗。${savingsNote}`,
      kinshipEvaluation: `家庭边界感：${attrs.kinshipGuilt}/100（边界清晰）。你能够理性看待代际关系，不愿被过度的宗族期望绑架，渴望属于自己的人生节奏。`,
      systemEvaluation: `体制依附度：较低。你更看重规则透明与个人空间，反感过度的人情社交与年龄壁垒。`,
      fateVerdict: `你非常适合走向海外。尽管异国文化需要适应、语言需要磨砺，但只要摆脱了过度的人情压力与年龄焦虑，你就能凭借独立自主的性格找到内心的安宁。`,
      recommendation: `果断割舍沉没成本，带上你的技能与存款，奔赴异邦。`
    };
  }

  // 4. 体制内舒适/如鱼得水型留下
  if (attrs.kinshipGuilt >= 40 && attrs.rebellion < 40) {
    return {
      type: "stay_comfortable",
      title: "【深耕本土 · 熟人网络型】",
      portrait: `你在人情网络与传统秩序中长大。虽然你有时也反感繁琐的礼节与应酬，但你深谙熟人社会的运行规则，善于在体制与圈层中寻找支撑。${savingsNote}`,
      kinshipEvaluation: `家庭紧密度：${attrs.kinshipGuilt}/100（紧密相连）。逢年过节的走动、长辈的人脉积累、关键时刻的亲友帮衬，正是你抗击未知风浪的重要屏障。`,
      systemEvaluation: `体制依附度：高。你更适应确定性的保障与集体归属感。`,
      fateVerdict: `不要盲目追求出海。你的资源优势与生存智慧扎根在本土熟人网络中，留下来深耕本地圈层与职业道路，是你最稳妥的选择。`,
      recommendation: `考编、进体制、或在省城成熟企业按部就班，借力打力安稳过一生。`
    };
  }

  // 5. 名校探索突围型
  if (tags.includes("重点大学光环") && attrs.rebellion < 50) {
    return {
      type: "lost_scholar",
      title: "【名校转型 · 探索突围者】",
      portrait: `你凭借出色的应试能力考入重点高校，但步入社会后发现，象牙塔里的光环并不能自动兑换成现实的从容。在大城市的职场竞争中，你开始重新审视人生的真正追求。${savingsNote}`,
      kinshipEvaluation: `家庭期待度：${attrs.kinshipGuilt}/100。你承载着家人的厚望，但也因此在面对现实落差时感到更为沉重。`,
      systemEvaluation: `体制依附度：中等权衡。你渴望更有尊严与创造力的工作，同时也在现实的安全感与理想之间反复权衡。`,
      fateVerdict: `你正处在关键的自我重构期。或是利用扎实的专业功底前往海外深造开拓视野，或是调整预期在体制内外找到适合自己的长远生态位。`,
      recommendation: `若出海，选择高性价比技术移民或二硕跳板；若留，尽早考取带编制岗位。`
    };
  }

  // 6. 飞渡候鸟型（两头兼顾）
  return {
    type: "migrant_bird",
    title: "【跨界迁徙 · 务实候鸟型】",
    portrait: `你既注重现实收益，也顾及亲情温度。你看得清不同环境的优势与弊端，善于根据人生不同阶段的重心做出灵活务实的调整。${savingsNote}`,
    kinshipEvaluation: `家庭顾念度：${attrs.kinshipGuilt}/100（张弛有度）。你在意亲人，但拥有清晰的个人界限，懂得用适度的物理距离维持彼此的尊重与体面。`,
    systemEvaluation: `体制依附度：审慎。你注重个人技能的通用性与长期抗风险能力。`,
    fateVerdict: `去海外闯荡数年，积累技能壁垒与储蓄基础。当你沉淀了足够的阅历与底气，无论未来选择留在异邦还是适时回国，你都将掌握人生的主动权。`,
    recommendation: `出境打工或进修，设定明确的撤退或跳板时间表。`
  };
}


// ============================================================================
// 成人中后期宏大人生里程碑生成引擎（28 ~ 63 岁：完全契合学历、羁绊与命运选择）
// ============================================================================

import { generateAdultMilestones as generateAdultMilestonesImpl } from "./adult_branches";

export function generateAdultMilestones(
  track: "985_211" | "double_non" | "junior_college",
  chosenPath: "emigrate" | "stay",
  family: FamilyOrigin,
  careerSubtrack: any = "tech",
  allTags: string[] = []
): LifeEventNode[] {
  return generateAdultMilestonesImpl(track, chosenPath, family, careerSubtrack, allTags);
}

export function detectCrisisWarning(
  attrs: CharacterAttributes,
  tags: string[] = [],
  currentAge: number = 18
): CrisisWarning | null {
  if (attrs.health < 35 && !tags.includes("已化解健康危机")) {
    return {
      type: "health",
      title: "【身体红灯警报】过度透支，体能逼近极限",
      desc: "长期高压劳碌使你的抵抗力跌破警戒线，频现偏头痛与关节劳损。若继续透支，恐在重要关隘引发连锁反应！"
    };
  }
  // 个人财务赤字危机（仅在成年独立后，个人现金告负才触发个人透支）
  if (currentAge >= 18 && attrs.savings < 0 && !tags.includes("已化解债务危机")) {
    return {
      type: "poverty",
      title: "【个人财务赤字警报】现金告急，生活拮据",
      desc: "个人账面资金跌入负数，房租日常与债务开销步步紧逼，需要尽快稳住个人现金流阵脚！"
    };
  }
  // 原生家庭借贷危机（家庭总存款池告负，显示父母借贷压力）
  if (attrs.familySavings < 0 && !tags.includes("已化解家庭债务")) {
    return {
      type: "poverty",
      title: "【原生家庭借贷危机】家徒四壁，靠借贷度日",
      desc: "家庭总存款池已见底转负，父母欠下民间借条周转。家中任何风吹草动都可能引发连锁生存危机！"
    };
  }
  if (attrs.inferiority > 75 && !tags.includes("已打破自卑枷锁")) {
    return {
      type: "inferiority",
      title: "【心魔暗生警报】严重自卑与配得感缺失",
      desc: "同辈攀比与熟人社会的审视让你心理负荷过载，在关键机遇面前往往本能地退缩内耗。"
    };
  }
  return null;
}

// ============================================================================
// 16 种终局图鉴系统 (Ending Codex) 与评析引擎
// ============================================================================

export interface EndingDef {
  id: string; // ED-01 ~ ED-16
  number: number;
  title: string;
  tagline: string;
  rarity: "SSR" | "SR" | "R";
  trackHint: string;
  description: string;
  unlockCondition: string;
}

export const ENDING_CODEX_DEFS: EndingDef[] = [
  {
    id: "ED-01",
    number: 1,
    title: "【全球卓越 · 拓疆智者】",
    tagline: "“以才智立身四海，天地辽阔，皆为舞台。”",
    rarity: "SSR",
    trackHint: "985/211 + 国际前沿",
    description: "你凭借顶尖的名校才识与硬核技术，在国际前沿工程中勇挑重担。积攒下丰厚资产，远离狭窄赛道的内卷与年龄焦虑，用一生的从容与豁达为自己和后代开辟了一条宽广无比的人生航道。",
    unlockCondition: "985学历 + 国际前沿 + 认知>=60"
  },
  {
    id: "ED-02",
    number: 2,
    title: "【学术长青 · 杏坛归鸿】",
    tagline: "“守得书斋冷与热，桃李天涯，学问自成。”",
    rarity: "SR",
    trackHint: "985/211 + 高校科研",
    description: "你不为浮躁的名利所动，在重点高校与国家重点实验室深耕前沿科学。晚年桃李满天下，弟子遍布四海，赢得了知识分子最崇高的清誉与尊严。",
    unlockCondition: "985学历 + 学术标签"
  },
  {
    id: "ED-03",
    number: 3,
    title: "【省府中坚 · 治世栋梁】",
    tagline: "“深耕厚土成大器，泽被家族，无愧今生。”",
    rarity: "SSR",
    trackHint: "体制中枢 + 公共治理",
    description: "你深耕生你养你的厚重土地。凭借卓越实干与廉洁风骨，在体制与公共事业中步步为营，成为造福一方的中流砥柱。你为家庭提供了最坚固的庇护，在父母病榻前尽到了至孝，问心无愧。",
    unlockCondition: "体制公职 + 社交>=50"
  },
  {
    id: "ED-04",
    number: 4,
    title: "【硬核架构 · 稳健立足】",
    tagline: "“一行代码一砖石，手握真功，风雨不动安如山。”",
    rarity: "SR",
    trackHint: "大厂研发 + 底层架构",
    description: "在瞬息万变的商业浪潮中，你凭借扎实过硬的技术壁垒稳坐中军。不炒房、不盲目杠杆，在省城有房有车手握大额安全垫，过上了最稳当、最体面的工程师人生。",
    unlockCondition: "科技研发 + 储蓄>=20万"
  },
  {
    id: "ED-05",
    number: 5,
    title: "【大国工匠 · 技压群雄】",
    tagline: "“一技在手走天下，靠真本领赢得无上尊重。”",
    rarity: "SSR",
    trackHint: "专科职教 + 技能巅峰",
    description: "你在年轻时就认准了实用手艺的千钧力量。凭借微米级精密装配绝活突破国外垄断，荣膺大国工匠年度人物。你的一双手创造了真金白银，彻底击碎了学历牢笼，活出了中国产业工人的至高尊严！",
    unlockCondition: "大国工匠 + 特级技师"
  },
  {
    id: "ED-06",
    number: 6,
    title: "【实业领袖 · 白手起家】",
    tagline: "“商道酬信富而有德，一双手打下浩荡基业。”",
    rarity: "SSR",
    trackHint: "商业实体 + 白手起家",
    description: "从老街门面骑破三轮送货，到执掌数亿规模的现代化制造产业园。面对诱惑你坚守诚信底线，不碰高利盘与虚妄泡沫，回馈桑梓扶弱济困，富而有德，赢尽天下敬仰！",
    unlockCondition: "商业掌柜 + 储蓄>=30万"
  },
  {
    id: "ED-07",
    number: 7,
    title: "【市井梁柱 · 踏实无悔】",
    tagline: "“肩挑岁月风雨，脚踏实地，自有人间至味。”",
    rarity: "SR",
    trackHint: "普通本科 + 坚实自立",
    description: "你留在了这片熟人温厚的土地上。面对生活的每一次风雨挑战，你用普通人最可贵的勤勉与韧性稳稳接招。你在职场中守住了尊严，在父母身边尽到了孝心，在柴米油盐中守护了小家的温暖。",
    unlockCondition: "韧劲>=40 + 踏实自立"
  },
  {
    id: "ED-08",
    number: 8,
    title: "【小康安乐 · 岁月静好】",
    tagline: "“一生平安无大浪，柴米油盐皆温情。”",
    rarity: "R",
    trackHint: "小城安家 + 人间烟火",
    description: "没有波澜壮阔的史诗，只有热气腾腾的家常便饭。在二线小城与相濡以沫的家人相守，老人安康、儿女成才，平平安安就是最大的福分。",
    unlockCondition: "幸福>=60 + 现世安稳"
  },
  {
    id: "ED-09",
    number: 9,
    title: "【浪子回头 · 金玉其质】",
    tagline: "“一身烟火一身胆，浪子回头金不换，赢尽人间真尊严。”",
    rarity: "SSR",
    trackHint: "职高辍学涉灰 + 痛定思痛自强",
    description: "从职高辍学涉灰、看守所高墙下痛哭长跪，到靠一双手、一口炒锅在残酷市井中凿出一条光明大道。你斩断恶缘、诚信做人、帮扶失足后辈，用三十年的勇毅救赎换来了三代人的体面与幸福！",
    unlockCondition: "获得浪子回头标签"
  },
  {
    id: "ED-10",
    number: 10,
    title: "【血汗苦尽 · 沧桑归乡】",
    tagline: "“一身硬骨撑天地，血汗还清千钧债，人间至苦终成金。”",
    rarity: "SR",
    trackHint: "时运不济 + 海外苦工救家",
    description: "毕业时运不济遭遇家庭重病巨债，被迫远赴海外中东五十度高温沙漠出苦力。在漫漫黄沙中忍受非人剥削，拼出一条血路还清债务回国开店。虽千磨万击，你用一腔铁骨彻底挽救了崩塌的家庭！",
    unlockCondition: "获得血汗还债/海外苦力标签"
  },
  {
    id: "ED-11",
    number: 11,
    title: "【老街独客 · 孤身自洽】",
    tagline: "“独来独往一身轻，心安何处不故乡，窗明几净抚闲猫。”",
    rarity: "SR",
    trackHint: "一生独身 + 极高独立自主",
    description: "你拒绝了世俗催婚与攀比的无尽消耗，一生未婚无子，独门独户。下班看书烹茶，与收养的流浪猫相伴。虽偶尔有清冷之感，但内心浩瀚从容，活出了属于自己的大自在与大纯粹。",
    unlockCondition: "独身自立 + 自主>=50"
  },
  {
    id: "ED-12",
    number: 12,
    title: "【通透隐逸 · 自足长乐】",
    tagline: "“不汲汲于富贵，不戚戚于贫贱，心宽天地自宽。”",
    rarity: "SSR",
    trackHint: "极高心智境界",
    description: "你早早参透了东亚社会的比较牢笼，主动退出了无休无止的虚荣踩踏。身心安宁、不卑不亢，在自己喜欢的一方天地里自适其适，活出了常人穷极一生也难以企及的生命大通透。",
    unlockCondition: "幸福>=85 + 自卑<=15"
  },
  {
    id: "ED-13",
    number: 13,
    title: "【血脉相依 · 至孝担当】",
    tagline: "“父母在，人生尚有来处；床前尽孝，无愧青天。”",
    rarity: "SR",
    trackHint: "家庭托底核心",
    description: "在人生的每一次十字路口，你始终把家人放在最深厚的位置。当疾病与晚年风雨来临时，你用宽阔的肩膀与实打实的付出为父母撑起了完整的晴空。你这一生至情至性，问心无愧。",
    unlockCondition: "亲缘负疚<=10 + 获得至孝标签"
  },
  {
    id: "ED-14",
    number: 14,
    title: "【星陨子夜 · 过劳长眠】",
    tagline: "“一行代码一城堡，然黎明破晓前，长眠于子夜。”",
    rarity: "SSR",
    trackHint: "大厂研发 + 38岁心梗过劳猝死",
    description: "三十八岁这年，核心系统重大故障抢修连续奋战四十八小时。在绿色正常指标亮起的那一刻，急性心肌梗死骤然发作倒在键盘上。生命在最璀璨的年华燃尽，全行业为你亮起悲壮的悼念烛光。",
    unlockCondition: "获得心梗猝死标签"
  },
  {
    id: "ED-15",
    number: 15,
    title: "【浩气长存 · 殉职英烈】",
    tagline: "“三十载生命虽短，然化作长堤，护佑万千安澜。”",
    rarity: "SSR",
    trackHint: "基层公职 + 32岁抗洪舍己救人",
    description: "三十二岁盛夏流域性特大洪峰漫堤，决口数丈。身为突击队长第一个跳入咆哮漩涡打桩堵决口，用血肉之躯筑起水下人墙，保全下游数千群众脱险，英勇牺牲。省委追授人民英雄，浩气长存！",
    unlockCondition: "获得抗洪殉职/殉职英烈标签"
  },
  {
    id: "ED-16",
    number: 16,
    title: "【血汗洗尘 · 苦尽魂归】",
    tagline: "“生如蒲柳韧如钢，血汗还清天下债，安详合眼无愧天。”",
    rarity: "SR",
    trackHint: "海外苦工 + 45岁矽肺病故",
    description: "当年在海外深井地下粉尘中日夜搏杀落下的晚期矽肺终究发作。债务十年前早已还清，家人守在床前泣不成声。四十五载虽千磨万击，你用铮铮铁骨换来了全家的重生，在安详释怀中合上双眼。",
    unlockCondition: "获得矽肺病故标签"
  },
  {
    id: "ED-17",
    number: 17,
    title: "【青灯古佛 · 遁入空门】",
    tagline: "“浮生若梦，何处惹尘埃；放下万缘，松风吹古寺。”",
    rarity: "SR",
    trackHint: "看破红尘 + 42岁名山出家",
    description: "四十二岁经历半生繁华与人情冷暖，深感世俗名利皆如梦幻泡影。将资产妥善安置给家庭后，背上一袭布纳登上终南山古刹剃度出家。古卷青灯，晨钟暮鼓，获得了前所未有的大超脱与大安宁。",
    unlockCondition: "获得遁入空门/青灯古佛标签"
  },
  {
    id: "ED-18",
    number: 18,
    title: "【高墙铁窗 · 残生孤叹】",
    tagline: "“贪念一动深渊起，铁窗空对月明中，悔恨泪尽两鬓霜。”",
    rarity: "R",
    trackHint: "深陷电诈园区 + 50岁遣返服刑",
    description: "轻信暴利偏门被骗至境外封闭电诈园区遭受毒打拘禁。五十岁多国联合执法解救遣返，因巨额犯罪被依法判刑十五年。铁窗之内，母亲早已含恨离世，抚摸着铁窗悔恨的泪水纵横交错，半生荒芜。",
    unlockCondition: "获得铁窗残生/高墙铁窗标签"
  }
];

// ============================================================================
// 12 大人生徽章成就系统 (Achievements)
// ============================================================================

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  iconName: string;
  rarity: "gold" | "purple" | "blue";
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: "ach_early_steps",
    title: "初涉人间",
    description: "在故土门槛前稳稳迈开人生的第一步",
    iconName: "Sparkles",
    rarity: "blue"
  },
  {
    id: "ach_985",
    title: "金榜题名",
    description: "高考成功考入 985/211 顶尖名校阶层",
    iconName: "GraduationCap",
    rarity: "gold"
  },
  {
    id: "ach_artisan",
    title: "大工匠心",
    description: "公办职教毕业，凭一手过硬实操绝活在社会站稳脚跟",
    iconName: "Wrench",
    rarity: "purple"
  },
  {
    id: "ach_double_pillar",
    title: "务实中坚",
    description: "双非学子在市井风浪中杀出重围成为业务骨干",
    iconName: "Briefcase",
    rarity: "purple"
  },
  {
    id: "ach_first_pot",
    title: "第一桶金",
    description: "青年期个人流动现金储蓄突破 10 万元",
    iconName: "Coins",
    rarity: "blue"
  },
  {
    id: "ach_millionaire",
    title: "仓廪充实",
    description: "退休前个人结余储蓄突破 50 万元",
    iconName: "Landmark",
    rarity: "gold"
  },
  {
    id: "ach_break_cycle",
    title: "斩断代际",
    description: "自卑值降至 15 以下，活出完全的坦荡与松弛",
    iconName: "Smile",
    rarity: "gold"
  },
  {
    id: "ach_filial",
    title: "至孝担当",
    description: "在四十二岁面对双亲风浪时完成深情托底",
    iconName: "HeartHandshake",
    rarity: "gold"
  },
  {
    id: "ach_wild",
    title: "奔赴旷野",
    description: "二十七岁决然选择跨洋出海开拓新生活",
    iconName: "Compass",
    rarity: "purple"
  },
  {
    id: "ach_roots",
    title: "扎根厚土",
    description: "二十七岁决然选择深耕故土守护亲情",
    iconName: "Home",
    rarity: "purple"
  },
  {
    id: "ach_crisis_survivor",
    title: "逆风破茧",
    description: "曾克服严重的身体或财务赤字危机并顽强前行",
    iconName: "ShieldAlert",
    rarity: "blue"
  },
  {
    id: "ach_retire_grand",
    title: "功德圆满",
    description: "顺利抵达六十三岁法定退休并留下生平手记",
    iconName: "Award",
    rarity: "gold"
  }
];

// ============================================================================
// 终局判词与徽章计算引擎 (Evaluation Helpers)
// ============================================================================

export interface LifetimeVerdict {
  summaryTitle: string;
  verdictText: string;
  tagline: string;
  ending: EndingDef;
  achievements: AchievementDef[];
  radar: {
    wealth: number;
    health: number;
    cognition: number;
    autonomy: number;
    kinship: number;
  };
}

export function evaluateLifetimeEnding(
  _track: "985_211" | "double_non" | "junior_college",
  _path: "emigrate" | "stay",
  attrs: CharacterAttributes,
  tags: string[] = []
): EndingDef {
  // 1. 致命悲壮/悲剧提前终局判定（最高优先级）
  if (tags.some((t) => t.includes("抗洪殉职") || t.includes("殉职英烈"))) {
    return ENDING_CODEX_DEFS[14]; // ED-15 浩气长存
  }
  if (tags.some((t) => t.includes("心梗猝死") || t.includes("星陨子夜") || t.includes("过劳长眠"))) {
    return ENDING_CODEX_DEFS[13]; // ED-14 星陨子夜
  }
  if (tags.some((t) => t.includes("矽肺病故") || t.includes("血汗洗尘") || t.includes("苦尽魂归"))) {
    return ENDING_CODEX_DEFS[15]; // ED-16 血汗洗尘
  }
  if (tags.some((t) => t.includes("遁入空门") || t.includes("青灯古佛"))) {
    return ENDING_CODEX_DEFS[16]; // ED-17 青灯古佛
  }
  if (tags.some((t) => t.includes("铁窗残生") || t.includes("高墙残生") || t.includes("高墙铁窗"))) {
    return ENDING_CODEX_DEFS[17]; // ED-18 高墙铁窗
  }

  // 2. 特殊专属人生轨迹终局
  if (tags.some((t) => t.includes("浪子回头") || t.includes("大排档自立") || t.includes("立誓自新"))) {
    return ENDING_CODEX_DEFS[8]; // ED-09 浪子回头
  }
  if (tags.some((t) => t.includes("海外苦力") || t.includes("血汗还债") || t.includes("苦工还债") || t.includes("血汗苦尽"))) {
    return ENDING_CODEX_DEFS[9]; // ED-10 血汗苦尽
  }
  if (tags.some((t) => t.includes("独身自立") || t.includes("清醒自足")) && !tags.some((t) => t.includes("相濡以沫") || t.includes("心有所属") || t.includes("成家"))) {
    if ((attrs.rebellion || 0) >= 45 || (attrs.cognition || 0) >= 60) {
      return ENDING_CODEX_DEFS[10]; // ED-11 老街独客
    }
  }

  // 3. 隐藏至高境界终局
  if (attrs.happiness >= 85 && attrs.inferiority <= 15) {
    return ENDING_CODEX_DEFS[11]; // ED-12 通透隐逸
  }
  if (attrs.kinshipGuilt <= 10 && tags.some((t) => t.includes("至孝") || t.includes("至德"))) {
    return ENDING_CODEX_DEFS[12]; // ED-13 血脉相依
  }

  // 4. 大赛道常规终局判定
  if (tags.some((t) => t.includes("大国工匠") || t.includes("特级技师") || t.includes("全国金奖"))) {
    return ENDING_CODEX_DEFS[4]; // ED-05 大国工匠
  }
  if (tags.some((t) => t.includes("实业领袖") || t.includes("商道酬信") || t.includes("商海搏击") || t.includes("商界新星"))) {
    return ENDING_CODEX_DEFS[5]; // ED-06 实业领袖
  }
  if (tags.some((t) => t.includes("省府中坚") || t.includes("治世栋梁") || t.includes("选调") || t.includes("体制") || t.includes("公职"))) {
    return ENDING_CODEX_DEFS[2]; // ED-03 省府中坚
  }
  if (tags.some((t) => t.includes("硬核架构") || t.includes("技术壁垒") || t.includes("首席架构"))) {
    return ENDING_CODEX_DEFS[3]; // ED-04 硬核架构
  }
  if (tags.some((t) => t.includes("学术") || t.includes("科研") || t.includes("顶刊"))) {
    return ENDING_CODEX_DEFS[1]; // ED-02 学术长青
  }

  // 5. 双非与大专普适终局
  if (attrs.resilience >= 40) {
    return ENDING_CODEX_DEFS[6]; // ED-07 市井梁柱
  }
  return ENDING_CODEX_DEFS[7]; // ED-08 小康安乐
}

export function evaluateLifetimeAchievements(
  track: "985_211" | "double_non" | "junior_college",
  path: "emigrate" | "stay",
  attrs: CharacterAttributes,
  tags: string[] = [],
  logEntries: any[] = []
): AchievementDef[] {
  const earned: AchievementDef[] = [];

  // ach_early_steps
  if (logEntries.some(e => e.age <= 1)) {
    earned.push(ACHIEVEMENT_DEFS[0]);
  }
  // Track achievements
  if (track === "985_211") earned.push(ACHIEVEMENT_DEFS[1]);
  if (track === "junior_college") earned.push(ACHIEVEMENT_DEFS[2]);
  if (track === "double_non") earned.push(ACHIEVEMENT_DEFS[3]);

  // First pot
  if (attrs.savings >= 100000 || logEntries.some(e => e.statDelta?.savings >= 80000)) {
    earned.push(ACHIEVEMENT_DEFS[4]);
  }
  // Half million / Millionaire
  if (attrs.savings >= 400000) {
    earned.push(ACHIEVEMENT_DEFS[5]);
  }
  // Break cycle
  if (attrs.inferiority <= 15) {
    earned.push(ACHIEVEMENT_DEFS[6]);
  }
  // Filial
  if (tags.some(t => t.includes("尽孝") || t.includes("托底") || t.includes("反哺"))) {
    earned.push(ACHIEVEMENT_DEFS[7]);
  }
  // Path
  if (path === "emigrate") earned.push(ACHIEVEMENT_DEFS[8]);
  if (path === "stay") earned.push(ACHIEVEMENT_DEFS[9]);

  // Crisis survivor
  if (attrs.health < 35 || attrs.savings < 0 || attrs.inferiority > 75) {
    earned.push(ACHIEVEMENT_DEFS[10]);
  }

  // Grand retire
  if (logEntries.some(e => e.age >= 63)) {
    earned.push(ACHIEVEMENT_DEFS[11]);
  }

  return earned;
}

export function calculateLifetimeRadar(attrs: CharacterAttributes) {
  const combinedWealth = attrs.savings + Math.max(0, attrs.familySavings * 0.4);
  return {
    wealth: Math.min(98, Math.max(18, Math.round((combinedWealth + 50000) / 7000))),
    health: Math.min(98, Math.max(18, attrs.health)),
    cognition: Math.min(98, Math.max(18, attrs.cognition)),
    autonomy: Math.min(98, Math.max(18, Math.round((attrs.rebellion * 0.6) + ((100 - attrs.inferiority) * 0.4)))),
    kinship: Math.min(98, Math.max(18, Math.round((attrs.social * 0.5) + ((100 - attrs.kinshipGuilt * 0.6) * 0.5))))
  };
}

export function generateFinalLifetimeVerdict(
  path: "emigrate" | "stay",
  track: "985_211" | "double_non" | "junior_college" = "double_non",
  attrs: CharacterAttributes,
  tags: string[] = [],
  logEntries: any[] = []
): LifetimeVerdict {
  const ending = evaluateLifetimeEnding(track, path, attrs, tags);
  const achievements = evaluateLifetimeAchievements(track, path, attrs, tags, logEntries);
  const radar = calculateLifetimeRadar(attrs);

  return {
    summaryTitle: ending.title,
    verdictText: ending.description,
    tagline: ending.tagline,
    ending,
    achievements,
    radar
  };
}

// Legacy export for compatibility
export const PARALLEL_LIVES_MILESTONES = [];
