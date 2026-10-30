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
  type?: "natural" | "choice" | "milestone";
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
        title: "存折上的十五万积蓄与职级晋升答辩",
        scene:
          "二十四岁这一年，存折里的数字稳稳跨过了十五万元大关。在大厂迎来工作满三年的中级职级晋升答辩；体制内也顺利完成一级科员定级。然而伴随而来的，是日复一日的代码与会议带来的疲惫，以及父母在电话里关切的成家买房话题。",
        type: "choice",
        choices: [
          {
            text: "大厂迎来职级晋升答辩(P5升中级P6，年薪调至28W~35W)，存折破十五万",
            detail: "凭借两年来稳定靠谱的交付战功，顺利通过组内中级工程师晋升答辩，成为团队里独当一面的技术骨干。",
            reaction: "底薪与公积金上调，存折上的存款稳稳迈过十五万元大关，在城市里扎下了结实的根基。",
            delta: { savings: 45000, cognition: 20, resilience: 15 },
            addTags: ["职级晋升", "业务中坚"]
          },
          {
            text: "体制内任职定级为一级科员（硕士定二级主任科员），做业务经办，过上规律生活",
            detail: "月工资到手六七千加上足额公积金，食堂早中餐两块钱，工作有条不紊受人羡慕。",
            reaction: "父母在老家县城逢人便夸你工作安稳体面，你在周末有了完全属于自己的闲暇。",
            delta: { kinshipGuilt: 25, happiness: 20, savings: 15000, resilience: 10 },
            addTags: ["安稳经办", "规律作息"]
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
        stageName: "人生十字路口 · 26岁",
        title: "三十万独立积蓄的从容 vs 迈出远行的临行准备",
        scene:
          "二十六岁这一年，存折里的数字终于摸到了三十万元大关。看着身边同事被高杠杆房贷套牢而不敢请假的模样，你庆幸自己保持了极佳的财务流动性与选择权。",
        type: "choice",
        choices: [
          {
            text: "顶住外界浮躁声音，坚决不盲目背负三十年高位房贷，把三十万现金牢牢握在手里",
            detail: "理智清醒，深知在经济周期面前现金储备才是普通人唯一的盔甲，保持随时转身的自由。",
            reaction: "你的内心获得了前所未有的松弛与从容，即使面对职场风浪也心定神怡。",
            delta: { rebellion: 25, resilience: 25, savings: 40000 },
            addTags: ["清醒理智", "握紧现金"]
          },
          {
            text: "正式签署海外正规企业全职合同与工作签证，订购国际机票，准备登机远行",
            detail: "不愿在熟人社会的攀比与内卷中耗尽青春，决定跨越大洋去过清爽简单的新生活。",
            reaction: "开始办理离职交接与行囊打包，母亲为你包了临行前的家乡水饺，心中满是笃定。",
            delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -20000 },
            addTags: ["整装待发", "告别故土"]
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
          "二十七岁这一年，你在异国机场候机厅或省城出租屋阳台上俯瞰着万家灯火。名校十二年的艰苦长跑与毕业五年的沉稳积累，让你在这一年拥有了为自己人生掌舵的全部底气与从容。",
        type: "choice",
        choices: [
          {
            text: "坚定选择出海通道：开启全球技术移居与简单从容生活新篇章",
            detail: "带着扎实的工程技能与多年储蓄走向世界，摆脱内卷，完完整整为自己活一次。",
            reaction: "飞机冲破云层，故乡的琐碎与攀比渐行渐远，辽阔的世界向你敞开怀抱。",
            delta: { rebellion: 40, happiness: 35, resilience: 25 },
            addTags: ["奔赴异邦", "广阔天地"]
          },
          {
            text: "扎根故土成为单位与家庭中坚，在熟悉的规则与亲情中安顿一生",
            detail: "选择陪伴父母在侧，在熟人社会与庞大市场中守住现世安稳与人间烟火。",
            reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
            delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
            addTags: ["深耕故土", "挑起大梁"]
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
        title: "存折上的第一个八万元与催婚电话",
        scene:
          "工作第三年，存折里的数字终于摸到了八万元大关。然而父母开始在电话里频繁提起同乡发小谁谁又订婚了、同学在省城付了首付，催促你抓紧相亲安家。",
        type: "choice",
        choices: [
          {
            text: "顶住催促压力，把八万元作为自己的独立防守金，坚决不盲目背负沉重房贷",
            detail: "清醒理性，坚信在经济波动面前现金流才是普通人唯一的盔甲，保持自由转身权。",
            reaction: "虽然父母偶尔在电话里叹气，但你牢牢守住了属于自己的财务安全防线。",
            delta: { rebellion: 20, resilience: 15, savings: 20000 },
            addTags: ["守住底气", "理智自立"]
          },
          {
            text: "相亲认识了真诚踏实的同行伴侣，两个人精打细算，共同规划在二线城市租房成家",
            detail: "选择回归普通人的烟火生活，两个人分担房租水电，互相扶持应对城市生活的冷暖。",
            reaction: "家里寄来了家乡特产，出租屋里飘着热气腾腾的饭菜香，体会到市井生活的温暖。",
            delta: { kinshipGuilt: 15, happiness: 20, savings: -10000 },
            addTags: ["成家立业", "市井烟火"]
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
        stageName: "走向社会第4年 · 26岁",
        title: "十五万积蓄的铠甲 vs 跨洋出海的通道",
        scene:
          "二十六岁，手里握着多年打拼积攒下的十五万血汗积蓄，父母安稳，职场娴熟。面对时代的十字路口，你拥有了真正属于自己的决断权。",
        type: "choice",
        choices: [
          {
            text: "拿出积蓄申请海外正规工签/语言学校通道，决心跳出无休止的攀比与内卷怪圈",
            detail: "宁可承受异乡语言与文化的清冷，也要赢回属于自己的生活节奏与尊严。",
            reaction: "递签材料审核通过，你看着盖上印章的护照签证，热泪盈眶。",
            delta: { rebellion: 35, resilience: 20, savings: -25000 },
            addTags: ["决意出海", "破茧新生"]
          },
          {
            text: "留在这座熟悉的城市，勤勤恳恳上班赚钱，陪伴父母慢慢变老",
            detail: "把责任扛在肩上，在平凡市井中守住一份难得的人情温暖与平静生活。",
            reaction: "除夕夜全家团聚，虽然偶有琐碎烦恼，但满桌热饭给予你坚实的归宿。",
            delta: { kinshipGuilt: 25, happiness: 15, resilience: 15 },
            addTags: ["孝道守望", "温情归宿"]
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
          "二十七岁，你走过大学的迷茫，熬过了初入社会的青涩与坎坷。五年打拼让你拥有了普通青年的坚毅与从容，迎来了人生命运的重大转折点。",
        type: "choice",
        choices: [
          {
            text: "登机远赴异国他乡：开启跨文化旅居与独立奋斗全新篇章",
            detail: "告别熟人社会的规训与比较，在辽阔天地中追求内心的真正安宁。",
            reaction: "飞机在晨光中升空，你微笑着告别过往，满怀希望地迎接全新的未来。",
            delta: { rebellion: 40, happiness: 30, resilience: 20 },
            addTags: ["断脐出海", "拥抱自由"]
          },
          {
            text: "留在国内故土扎根：在熟悉的人情与体制秩序中安稳生活",
            detail: "接受本土社会的秩序，陪伴长辈老去，过好平凡踏实的每一天。",
            reaction: "你在熟悉的街道漫步，生活踏实安详，走稳属于普通人的每一道坎。",
            delta: { kinshipGuilt: 30, social: 20, resilience: 15 },
            addTags: ["扎根故土", "安稳一生"]
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
        stageName: "技艺大成 · 24岁",
        title: "个人储蓄突破十万元与老街好名声",
        scene:
          "二十四岁这一年，存折里的数字突破了十万元大关。你的手艺到了炉火纯青的地步，做工又快又好，在当地实体圈子里积累了极好的口碑。",
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
        stageName: "走向社会第4年 · 26岁",
        title: "踏实求生的底气与通透人生观",
        scene:
          "二十六岁，手里握着多年汗水积攒下的积蓄与一身真手艺，你活得踏实坦荡，不再被外界浮华的虚名所绑架。",
        type: "choice",
        choices: [
          {
            text: "彻底摆脱熟人社会的虚浮攀比，安安静静享受属于自己的踏实日子",
            detail: "有钱有闲有一技之长，把每一个清晨与黄昏都过得从容自足。",
            reaction: "内心安宁坦荡，你活出了普通人最向往的通透与踏实境界。",
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
          "二十七岁，你用一把焊枪、一台机床或一间门店，赤手空拳在残酷的人世间凿出了属于自己的宽阔天地。你赢得了命运的终极话语权。",
        type: "choice",
        choices: [
          {
            text: "选择跨国技能移居：在海外做一名受人尊敬的高薪技术大工匠",
            detail: "拿着体面的报酬，享受山水与宁静，度过尊严充实的人生。",
            reaction: "异邦的阳光洒在身上，你靠着双手走遍天下，天地辽阔任由驰骋。",
            delta: { rebellion: 35, happiness: 30, savings: 40000 },
            addTags: ["跨洋大工匠", "自由自在"]
          },
          {
            text: "守在家乡老家做实体老板：陪伴亲人，踏踏实实过完热气腾腾的一生",
            detail: "在熟悉的人间烟火中守住基业，让父母老有所依，家庭兴旺平安。",
            reaction: "逢年过节门庭若市，你靠真本事挣下了人人称赞的好名声，无愧人间一程。",
            delta: { kinshipGuilt: 30, social: 25, savings: 35000 },
            addTags: ["市井豪杰", "无悔人间"]
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
  _family: FamilyOrigin
): LifeEventNode[] {

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

export function getCareerSubtrack(
  tags: string[] = []
): "civil" | "tech" | "academic" | "commercial" | "artisan" {
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
      ["工匠", "手艺", "技工", "机修", "数控", "大工匠", "高级工", "大专实用", "特级大工"].some((k) =>
        t.includes(k)
      )
    )
  ) {
    return "artisan";
  }

  if (
    tags.some((t) =>
      ["实体", "商贸", "掌柜", "生意", "商业", "店铺", "经管商贸", "商业敏锐", "外贸熟手"].some((k) =>
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
  const trackPool = CAREER_EVENTS_BY_TRACK[degreeTrack] || CAREER_EVENTS_BY_TRACK["double_non"];
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
    if (age === 19 || age === 20) {
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
// 成人中后期宏大人生里程碑生成引擎（28 ~ 63 岁：完全契合学历与命运选择）
// ============================================================================

// ============================================================================
// 成年篇章：27岁~63岁（打破PPT，中年30岁、35岁、42岁赋予真实关键抉择！）
// ============================================================================

export function generateAdultMilestones(
  _track: "985_211" | "double_non" | "junior_college",
  chosenPath: "emigrate" | "stay",
  _family: FamilyOrigin,
  careerSubtrack: "civil" | "tech" | "academic" | "commercial" | "artisan" = "tech"
): LifeEventNode[] {

  // =========================================================================
  // 1. 公职 / 选调 / 机关 / 事业单位赛道 (Civil Subtrack)
  // =========================================================================
  if (careerSubtrack === "civil") {
    if (chosenPath === "stay") {
      return [
        {
          id: "adult_civil_stay_28",
          age: 28,
          stageName: "二十八岁立足 · 28岁",
          title: "科员提拔副科与老家联姻相亲局",
          scene: "二十八岁，你已在机关摸爬滚打数年，正是由普通科员提拔副科级的关键期。老家父母千方百计张罗了一门亲事——市局老领导的侄女，家庭优渥，明言只要结亲副科提拔便板上钉钉；而你在大学相濡以沫的女友家境清贫，正面临两人按揭买房的沉重压力。两头逼仄，客厅里硝烟弥漫。",
          type: "choice",
          choices: [
            {
              text: "【顺从世俗与领导千金联姻】：接受家庭安排，获取岳家深厚的体制资源与升迁快车道",
              detail: "将婚姻作为阶层跃升与官场护航的筹码，理智而残酷地告别了初恋。婚礼办得风光体面，满堂权贵。",
              reaction: "借岳家之力顺利破格提拔副科长，但在冷冰冰的政治联姻中，你体会到了寄人篱下的压抑与愧疚。",
              delta: { social: 30, savings: 50000, inferiority: 25, kinshipGuilt: -20, happiness: -20 },
              addTags: ["政治联姻", "借势上位"]
            },
            {
              text: "【坚守初心与初恋女友裸婚】：顶住家庭与官场白眼，与心爱之人共担房贷在省城立足",
              detail: "眼里容不下利益买卖，拒绝做攀附权贵的门客。两人在城郊按揭一套小两居，月供掏空了全部工资。",
              reaction: "父母痛骂你‘不争气、死脑筋’，领导也对你的冷淡颇有微词，但下班后亮起的温暖灯火让你心有归宿。",
              delta: { happiness: 30, resilience: 25, savings: -30000, kinshipGuilt: 25, social: -15 },
              addTags: ["纯真爱情", "负重前行"]
            },
            {
              text: "【斩断儿女情长主动申请援派驻村】：婉拒双方，主动申请去贫困山区担任第一书记两年！",
              detail: "看透了早早被婚姻与人情世故套牢的平庸，索性以退为进，下沉最艰苦的一线积累硬核实绩。",
              reaction: "彻底避开了世俗纷争，在泥土里滚打了两年，晒得黝黑干练，被省委组织部作为优秀选调典型重点关注。",
              delta: { resilience: 35, cognition: 25, health: -15, social: 15, kinshipGuilt: 10 },
              addTags: ["下沉一线", "硬核基层"]
            }
          ]
        },
        {
          id: "adult_civil_stay_30",
          age: 30,
          stageName: "三十而立 · 30岁",
          title: "提任正科级业务科长与征地拆迁险情",
          scene: "三十岁的你破格提任重点业务科长，主导城郊重点产业园区的征迁腾挪。一家由带功残疾老兵坐镇的‘钉子户’坚决不搬，直斥评估价格腰斩被开发商中饱私囊。分管副局长在电话里语气严厉：‘三天内必须清表平地，市领导要来奠基，出了问题你拿帽子来顶！’",
          type: "choice",
          choices: [
            {
              text: "【执行雷霆强制清表保政绩考察】：组织多部门联合执法强行推平，限期完成清表任务",
              detail: "官大一级压死人，为了不耽误市级重点工程进度与个人仕途考核，只能冷硬下达清场指令。",
              reaction: "奠基仪式如期举行，领导在大会上表扬你‘执行力极强敢打硬仗’，但老兵悲愤的上访材料成了悬在你头顶的利剑。",
              delta: { social: 30, savings: 30000, inferiority: 20, kinshipGuilt: 20, resilience: 10 },
              addTags: ["铁腕执行", "隐性隐患"]
            },
            {
              text: "【顶住撤职压力驻扎现场协调增补补偿】：自揽责任叫停强拆，连续三天三夜核查评估猫腻",
              detail: "不愿用百姓血泪铺路。冒着得罪副局长的风险彻查评估虚报，为老兵争取到了合规的安置房与伤残抚恤。",
              reaction: "老兵泪流满面送来锦旗，群众口碑爆棚；但副局长在党组会上敲打你‘缺乏大局观、小资产阶级温情’。",
              delta: { resilience: 30, cognition: 20, social: -20, happiness: 15, savings: -10000 },
              addTags: ["群众骨肉", "得罪上司"]
            },
            {
              text: "【明察暗访搜集拆迁办贪腐证据移交纪委】：发现开发商与评估所勾结吃回扣，暗中引纪检巡视",
              detail: "展现深沉城府与反腐手腕。不正面顶撞副局长，而是暗中将贪腐账本直报市纪检巡视组，来一招借刀杀人。",
              reaction: "巡视组雷霆进驻，贪腐团伙一网打尽，你因提供关键线索一战成名，但局内人人对你的城府心生忌惮。",
              delta: { cognition: 30, rebellion: 25, social: -15, inferiority: -15, resilience: 20 },
              addTags: ["官场雷霆", "深沉猎手"]
            }
          ]
        },
        {
          id: "adult_civil_stay_32",
          age: 32,
          stageName: "职场暴风雨 · 32岁",
          title: "民生工程地下车库坍塌与组织背锅要求",
          scene: "三十二岁，分管的一处保障房地下车库因暴雨发生局部坍塌，造成两名工人重伤。该工程的总承包商是已退休老局长的嫡亲内弟。局党组连夜召开秘密碰头会，一把手私下将你叫进密室：‘小陈，施工方资质没有大问题，局里需要你牵头认领一个‘日常监管巡查偶发疏忽’的政务记过，保全大局，三年到处级提拔局里绝对双倍补偿你。’",
          type: "choice",
          choices: [
            {
              text: "【吞下处分签字背锅换取派系庇护】：违心在责任认定书上签字，换取一把手的终身政治结盟",
              detail: "深谙体制内人身依附逻辑。深知胳膊拧不过大腿，选择做派系的‘替罪羊’以图后报。",
              reaction: "你被给予政务警告处分，调任清闲调研室，但一把手私下为你打通了所有关节，两年后暗中重用。",
              delta: { inferiority: 30, social: 25, savings: 40000, health: -15, resilience: -10 },
              addTags: ["替罪进阶", "上了贼船"]
            },
            {
              text: "【拍案而起拒绝签字，封存原始验收造假证据】：绝不替贪官污吏背锅，将偷工减料证据直呈上级！",
              detail: "眼里不揉沙子，宁为玉碎不为瓦全！当夜将施工方使用劣质钢筋与伪造监理签名的原始档案封存上报。",
              reaction: "引爆全省建筑反腐窝案，老局长及一把手双双落马！你被赞为孤勇铁汉，但单位同事私下无人敢与你走近。",
              delta: { rebellion: 35, resilience: 35, social: -35, kinshipGuilt: 20, happiness: 10 },
              addTags: ["铁面硬骨", "体制独行侠"]
            },
            {
              text: "【申请省级权威院所独立复检，切割责任链条】：以专业法理为盾，启动第三方司法质检倒查",
              detail: "高超的制度防御术。不直接与一把手正面冲突，依法依规申请省质监总局入场封存鉴定，将责任死死钉在施工方与监理方。",
              reaction: "凭借严谨的程序防线全身而退，既未背锅也未被直接枪打出头鸟，局内老官僚皆惊叹你的老辣与手段。",
              delta: { cognition: 30, resilience: 25, social: 15, inferiority: -10 },
              addTags: ["滴水不漏", "老辣从容"]
            }
          ]
        },
        {
          id: "adult_civil_stay_35",
          age: 35,
          stageName: "三十五岁生死关 · 35岁",
          title: "副处级年轻干部选拔与父亲突发脑梗ICU",
          scene: "三十五岁，干部年轻化选拔副处级的最后关键节点。市委组织部考察组明日一早进驻单位开展差额竞聘谈话；偏在今夜凌晨，老家父亲突发大面积急性脑梗昏迷推进ICU，医生下达病危通知书，要求直系亲属连夜到场签字并准备十五万急救手术费。对手派系正密切盯着你的一举一动。",
          type: "choice",
          choices: [
            {
              text: "【坚守省城考察答辩，委托老家亲友垫资照料】：强忍撕心裂肺之痛，次日红着眼眶准时步入答辩席",
              detail: "三十五岁仅此一次的仕途龙门！你将全部存折打给老家医院，自己吞下去痛片在考官面前侃侃而谈。",
              reaction: "凭借完美的答辩顺利通过差额考察提任副区长，但父亲术后偏瘫失语，每次面对父亲浑浊的眼神你都心如刀绞。",
              delta: { social: 35, savings: 50000, kinshipGuilt: 45, inferiority: 15, health: -20 },
              addTags: ["断情登顶", "终身抱憾"]
            },
            {
              text: "【弃权答辩连夜冒雨驱车返乡，跪守抢救室门外】：‘官可以不当，爹只有一个！’即刻向组织部请假",
              detail: "人性超越权欲。你连夜驾车三百公里飞奔返乡，在手术承诺书上按下手印，在ICU门外枯坐到天明。",
              reaction: "父亲抢救成功转危为安，但考察组因你缺席按程序取消资格，你彻底错过了干部年轻化的副处班车。",
              delta: { kinshipGuilt: -35, happiness: 25, resilience: 30, social: -25, savings: -150000 },
              addTags: ["至孝纯良", "仕途失速"]
            },
            {
              text: "【动用机关人脉协调省城顶尖神经外科团队远程会诊】：两线作战，求助医疗卫生线校友连夜驰援",
              detail: "展现极限资源调度力。一边借由市直机关资源打通省属三甲医院绿色会诊通道，一边在走廊角落通宵备考。",
              reaction: "父亲在顶级专家指导下脱离生命危险，你满眼血丝却沉稳完成组织考察，双线奇迹突围，但身心彻底透支。",
              delta: { resilience: 35, cognition: 30, health: -25, savings: -80000, social: 20 },
              addTags: ["极限突围", "双线鏖战"]
            }
          ]
        },
        {
          id: "adult_civil_stay_38",
          age: 38,
          stageName: "中年深水区 · 38岁",
          title: "昔日宿敌调任顶头上司与倒查五年暗流",
          scene: "三十八岁，市里区县换届。当年曾被你因原则问题顶撞过的副局长，如今空降成为你的顶头区委常委兼一把手。他履新第一周，便借由巡察整改对你分管的重大专项资金展开‘倒查五年’的专项审计。下属人心浮动，几个昔日心腹悄悄递交辞呈倒戈向新领导纳投名状。",
          type: "choice",
          choices: [
            {
              text: "【伏低做小忍辱负重，将核心项目审批权拱手让出】：深夜登门拜访新领导表态臣服，甘当配角",
              detail: "人在屋檐下不得不低头。交出全部核心财权与人事推荐权，主动承担所有繁重苦活脏活以消弭宿怨。",
              reaction: "新领导见你恭顺至极，终于收起了整肃獠牙，审计草草收场，但你在机关内的威信一落千丈。",
              delta: { inferiority: 30, resilience: -15, social: 15, health: -15, savings: 20000 },
              addTags: ["委曲保位", "忍气吞声"]
            },
            {
              text: "【严防死守自查自纠，以省部级优秀政绩顶格抗衡】：带领核心业务骨干连夜核查所有凭证，打造铁桶账目",
              detail: "身正不怕影子斜！所有资金流转与审批流程滴水不漏，同时力推两个百亿级产业项目落地省里重点督办。",
              reaction: "巡察审计历时三月硬是查不出一丝瑕疵，省委督导组反而对你的项目高度赞赏，宿敌咬碎牙齿却奈何你不得！",
              delta: { resilience: 35, cognition: 30, health: -25, social: 25, inferiority: -20 },
              addTags: ["铁打营盘", "硬核博弈"]
            },
            {
              text: "【主动申请对口援疆/援藏三年，跳出本地内耗泥潭】：‘与其坐困愁城，不如仗剑出塞！’",
              detail: "深谙体制以退为进之道。主动申请去最艰苦的高原边陲挂职主政一方，既避开了宿敌倾轧，又享受高规格提拔政策。",
              reaction: "在边疆大漠主导产业援建声名鹊起，三年期满带着副厅级后备干部的硬核履历荣耀回归，直接平级超车！",
              delta: { resilience: 40, cognition: 30, health: -20, kinshipGuilt: 30, social: 30 },
              addTags: ["援塞突围", "封疆大吏"]
            }
          ]
        },
        {
          id: "adult_civil_stay_42",
          age: 42,
          stageName: "执掌一方 · 42岁",
          title: "掌舵重点市局与老家宗族无底线索求",
          scene: "四十二岁，你已晋升为市级核心大局一把手（或区委副书记），手中统筹数以十亿计的产业基金与项目审批。老家老宅门槛被踏破，宗族族长带着数十名亲友包大巴来到你办公室，堂哥以‘全家族当年供你读书、不帮就是欺祖灭祖’为由，强求将千万级旧城改造项目内定给其挂靠的无资质工程队。",
          type: "choice",
          choices: [
            {
              text: "【大义灭亲铁面依规否决，自掏十万积蓄贴补村里修路】：当场严辞拒绝违规诉求，以公私分明治村",
              detail: "原则绝不退让，但顾及宗族抚育之情。将堂哥清出办公室并报案留档，私下拿出全部年终奖为村小学修操场。",
              reaction: "宗族在老家祠堂痛骂你‘薄情寡义的官迷’，父母在村里抬不起头；但纪检对你的铁骨高度肯定，为你筑牢了最硬防护堤。",
              delta: { resilience: 35, cognition: 25, kinshipGuilt: 35, savings: -100000, inferiority: -20 },
              addTags: ["铁面无私", "大义断亲"]
            },
            {
              text: "【迫于宗族亲情暗开绿灯，打招呼违规分包边缘辅料工程】：默许主管副局长稍作变通照顾老家工程队",
              detail: "终究跨不过千百年乡土人情的大网。自欺欺人地认为‘只要工程不出大事就行’，满足了宗族的贪婪索求。",
              reaction: "老家亲友对你顶礼膜拜大摆流水席，尊你为宗族百年一遇的活菩萨；但日后工程质量问题被匿名信举报，终身受制于人。",
              delta: { social: 30, savings: 60000, inferiority: 25, resilience: -20, kinshipGuilt: -30 },
              addTags: ["宗族陷阱", "受制于人"]
            },
            {
              text: "【引导老家成立正规现代农业合作社，通过阳光招投标脱贫】：不给特权但授人以渔，助全村产业升级",
              detail: "展现高超治理智慧。拒绝低端工程分包，聘请农科院专家指导老家建立万亩特色果蔬基地，入驻政府采购目录。",
              reaction: "乡亲们靠勤劳双手实现了全村户均年增收十万，祖坟立碑颂扬你的惠民功德，被省里作为乡村振兴典范推广！",
              delta: { cognition: 35, social: 35, resilience: 25, savings: 20000, kinshipGuilt: -20 },
              addTags: ["造福桑梓", "治县大略"]
            }
          ]
        },
        {
          id: "adult_civil_stay_48",
          age: 48,
          stageName: "定局之年 · 48岁",
          title: "副厅级选拔末班车与退居二线巡视员抉择",
          scene: "四十八岁，仕途迈入‘定局之年’。全省副厅级领导干部换届考核启动，这是你年龄符合破格提拔的最后末班车。组织找你谈话：其一，去市属重亏老牌国企担任一把手力推破产重组，若成功则破格晋升副厅，若处置不当引发群体性风波则直接引咎辞职；其二，主动申请退居二线转任二级巡视员，安享清闲。",
          type: "choice",
          choices: [
            {
              text: "【搏命一击签军令状接管危局国企】：明知山有虎偏向虎山行，压上毕生仕途押注最后一搏！",
              detail: "血性未凉！不甘心在二线办公室数着日子等退休，亲自下沉到风雨飘摇的万人老厂啃下最硬的硬骨头。",
              reaction: "历经数月惊心动魄的债务重整与职工分流谈判，成功化解百亿坏账引入战略投资！在全省大会上被直接任命为副市长！",
              delta: { social: 40, resilience: 35, health: -25, savings: 80000, inferiority: -20 },
              addTags: ["力挽狂澜", "副厅金榜"]
            },
            {
              text: "【知止不殆主动退居二线，转任二级巡视员】：看淡仕途升迁，主动为年轻干部腾位，退守二线",
              detail: "识时务者为俊杰。深知权力顶峰高处不胜寒，主动退出激烈的存量倾轧，每日临帖品茗，回归家庭生活。",
              reaction: "身心压力骤减，长期困扰的高血压与失眠彻底自愈；面对昔日下属的超车升迁泰然自若，赢得了晚辈一致敬重。",
              delta: { health: 35, happiness: 35, resilience: 20, social: -20, kinshipGuilt: -20 },
              addTags: ["知止长乐", "闲庭信步"]
            }
          ]
        },
        {
          id: "adult_civil_stay_55",
          age: 55,
          stageName: "晚晴暗流 · 55岁",
          title: "退休前夕的最后权力余温与海外信托围猎",
          scene: "五十五岁，距离退线还剩五年，你在市人大/政协或大局分管重要审批终审。昔日私营地产寡头得知你独生女儿正在北美申请绿卡，深夜派专人送来一份价值千万的海外离岸信托契约，承诺‘只要在最后两宗土地性质变更评估上签字认可，女儿下半生财务自由永无后患’。巡视组的暗哨已在城中排查。",
          type: "choice",
          choices: [
            {
              text: "【严词拒绝并向派驻纪检组全程报备】：‘我一生清白，绝不给儿女留带血的不义之财！’",
              detail: "守节如玉！不仅当场将中介请出家门，次日清晨第一件事便是向市纪委主要领导呈交亲笔报备说明。",
              reaction: "地产寡头因涉黑洗钱次月被依法批捕，全案牵扯数十位退休干部；唯有你平安着陆，立身巍然不动，给后代留下清廉门风。",
              delta: { resilience: 35, inferiority: -25, social: 25, happiness: 20, kinshipGuilt: -20 },
              addTags: ["两袖清风", "晚节巍然"]
            },
            {
              text: "【心存侥幸暗中默许，通过境外中介完成代持】：为了儿女在海外扎根立足，违心在评估报告盖章",
              detail: "父母之爱子，则为之计深远。在退休倒计时的贪婪与侥幸心理驱动下，以为境外离岸账户天衣无缝，签下了隐秘协议。",
              reaction: "女儿在温哥华全款买下了海景庄园；然而你每日提心吊胆，听见警笛声便彻夜盗汗失眠，晚景陷入无休止的心魔恐惧。",
              delta: { savings: 300000, inferiority: 40, health: -30, happiness: -30, resilience: -20 },
              addTags: ["晚节暗损", "惊弓之鸟"]
            }
          ]
        },
        {
          id: "adult_civil_stay_63",
          age: 63,
          stageName: "荣休离场 · 63岁",
          title: "门庭冷落人走茶凉与运河畔终极释怀",
          scene: "六十三岁，正式退休满三年。昔日春节大院门外排长队的豪车早已绝迹，昔日鞍前马后的下属路上相逢也只是客气点头匆匆而过。重阳节老干部茶话会上，昔日的政敌与知己皆白发苍苍坐在一处。站在运河大堤上，看着浩荡江水奔流东去，半生仕途与权谋在这一刻彻底归零。",
          type: "choice",
          choices: [
            {
              text: "【彻底放下世俗权柄，潜心整理地方志与传帮带】：将三十年治理经验凝练成书，培育青年才俊",
              detail: "达则兼济天下，穷则独善其身。受聘为地方历史档案馆特邀顾问，带年轻学者寻访运河遗址，精神丰盈自足。",
              reaction: "你的地方志专著成为市域文史传世之作，受到后辈学人极高景仰，晚年生活清宁安详，无愧天地。",
              delta: { cognition: 35, happiness: 40, resilience: 30, health: 25 },
              addTags: ["一代宗匠", "超然物外"]
            },
            {
              text: "【受聘民营商会名誉总顾问，继续周旋政商饭局】：割舍不下前呼后拥的虚荣，继续四处站台穿针引线",
              detail: "习惯了权柄带来的受尊重感，退休后仍穿梭于各大企业宴请，靠残存的人脉替人批条子跑项目。",
              reaction: "每月虽有数万元顾问费进账，但身心疲于应酬再度引发心脑血管疾病，儿女也叹息你‘一辈子活在虚名牢笼里’。",
              delta: { savings: 100000, health: -25, inferiority: 20, happiness: -15, social: 20 },
              addTags: ["权力余恋", "疲于奔命"]
            }
          ]
        }
      ];
    }
    // Civil Emigrate (跨国公共治理 / 驻外外交 / 移民公职 / 国际智库)
    return [
      {
        id: "adult_civil_emigrate_28",
        age: 28,
        stageName: "异邦初涉 · 28岁",
        title: "驻外经贸代表处副代表与隐性外交审查",
        scene: "二十八岁，你通过外事遴选派驻欧洲经贸代表处。由于地缘局势骤紧，当地安全部门对中资机构进行严密监听排查，代表处内部也启动严苛的保密内审。一次跨国经贸准入谈判中，外方故意在非核心条款埋下合规陷阱，上级代表暗示你‘先签下保住两国经贸年报数字’。",
        type: "choice",
        choices: [
          {
            text: "【逐字审核驳回外方陷阱，哪怕面临谈判破裂风险】：连夜对照国际贸易法修正条款，坚守底线",
            detail: "宁可承受考核受损，也绝不在主权经贸文本上退让分毫。展现出沉稳犀利的外交法务素养。",
            reaction: "外方被迫重新让步修改文本，为你赢得代表处全体尊重；但谈判延期一个月，被外事主管部门点名批评进度迟缓。",
            delta: { resilience: 30, cognition: 30, social: 15, kinshipGuilt: 15 },
            addTags: ["外事硬汉", "专业底线"]
          },
          {
            text: "【顺水推舟执行上级意图签下备忘录】：保住代表处当季考评指标，换取提前轮调回国升职",
            detail: "实用主义至上。按照官场惯例将皮球踢给后任，以最快速度完成部委下达的签约指标。",
            reaction: "顺利斩获年度外事先进个人，提前获得回国晋升处长提名；但日后该项目引发跨国仲裁纠纷，隐患暗生。",
            delta: { social: 35, savings: 40000, inferiority: 20, resilience: -10 },
            addTags: ["巧言敏行", "隐性负债"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_30",
        age: 30,
        stageName: "三十立足 · 30岁",
        title: "联合国教科文组织/世界银行区域专员竞聘",
        scene: "三十岁，面临留任体制内驻外使领馆还是跳槽联合国等国际多边组织的十字路口。国际组织薪资优渥且拥有真正全球影响力，但意味着彻底脱离体制编制安全网，全家必须习惯全球无根漂泊。",
        type: "choice",
        choices: [
          {
            text: "【辞去公职投身国际多边组织，成为终身国际雇员】：通过全球严苛差额考试，入职世行或UN",
            detail: "勇敢拥抱全球化大潮。脱下体制紧箍咒，在全球人道援助与跨国基建项目中践行普世公服理念。",
            reaction: "年薪突破十五万美元免税待遇，出入日内瓦与纽约总部；但老家父母为你的‘放弃铁饭碗’痛哭流涕。",
            delta: { savings: 120000, cognition: 35, rebellion: 30, kinshipGuilt: 30 },
            addTags: ["国际公职", "全球视野"]
          },
          {
            text: "【坚守国家外交体制，按部就班谋求一秘晋升】：保持体制忠诚度，在使领馆按年资稳扎稳打",
            detail: "信奉体制确定性与国家后盾。耐得住驻外寂寞，将毕生奉献给国家外事战略。",
            reaction: "父母在县城老家备受邻里羡慕，逢人便夸孩子在使馆当参赞；但面对国际同行的高薪与自由偶尔心生酸楚。",
            delta: { social: 30, kinshipGuilt: -25, resilience: 20, savings: 30000 },
            addTags: ["外事砥柱", "体制守拙"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_32",
        age: 32,
        stageName: "风云突变 · 32岁",
        title: "地缘对抗升级与海外中资撤离撤侨危机",
        scene: "三十二岁，驻在国突发政变与武装冲突，反华浪潮汹涌。机场关闭，数百名中资企业技术人员与侨胞被困内陆工厂。你作为前线危机协调人，通信随时可能中断，武装分子哨卡步步紧逼。",
        type: "choice",
        choices: [
          {
            text: "【只身携外交通行证驱车穿越交火区协调护送】：冒死与当地部族军阀谈判，打通撤侨绿色通道",
            detail: "和平年代真正的英雄主义！在枪林弹雨中凭借过人胆魄与部族长老斡旋，带领全部同胞安全登舰撤离。",
            reaction: "全员零伤亡脱险！你荣立一等功，成为外交部青年榜样；但近距离经历炮火洗礼让你患上中度PTSD。",
            delta: { resilience: 45, social: 35, health: -20, inferiority: -25, happiness: 15 },
            addTags: ["撤侨英雄", "生死淬炼"]
          },
          {
            text: "【按照既定领保安全手册稳妥后撤，组织防空洞固守】：杜绝冒险个人英雄主义，等待联合国维和部队",
            detail: "严格恪守外交安全规程，保全自身与机构核心档案，以程序合规为首要原则组织自卫。",
            reaction: "同胞在坚守五天后由维和装甲车安全接应，虽有惊无险但多名侨民财产蒙受损失，被部分舆论指责‘保守官僚’。",
            delta: { resilience: 20, cognition: 25, social: 10, inferiority: 10 },
            addTags: ["程序合规", "审慎自保"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "驻外总领馆参赞升迁与父母病危无法返乡",
        scene: "三十五岁，你正主导全省对欧战略港口投资仲裁听证会，关乎百亿资产去留。与此同时老家母亲突发心衰病危，因跨国航班管控与外交纪律限制，若此时回国将直接导致仲裁席位弃权让对手不战而胜。",
        type: "choice",
        choices: [
          {
            text: "【强忍剧痛坚守仲裁法庭，打赢百亿跨国资产保卫战】：在法庭上以无懈可击的陈词击碎外方违约指控",
            detail: "忠孝难两全的极致撕裂。听证会大获全胜为国家挽回百亿损失，但回国时母亲已被安葬在北山公墓，长跪不起。",
            reaction: "提拔为最年轻的公使衔参赞，胸前挂满勋章；然而深夜凝望异国星空，你痛觉这一世对母亲永无偿还之日。",
            delta: { social: 40, savings: 80000, kinshipGuilt: 50, health: -25, resilience: 30 },
            addTags: ["国之大者", "痛彻心扉"]
          },
          {
            text: "【毅然交接公文请假返乡，见母亲最后一面】：‘职位丢了可以再争，亲生母亲只有一个！’",
            detail: "放下虚妄的光环，连夜辗转三趟航班返回县城病榻前，握着母亲尚存余温的手陪伴她安详走完最后一程。",
            reaction: "了却人生最大孝道，母亲含笑离世；但仲裁案因临阵换将失利，外交系统高层将你调离一线冷落闲置。",
            delta: { kinshipGuilt: -40, happiness: 20, resilience: 25, social: -30, savings: -50000 },
            addTags: ["至孝大勇", "边缘冷板凳"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_38",
        age: 38,
        stageName: "深水博弈 · 38岁",
        title: "地缘冷战背景下的跨国科技合规与引渡威胁",
        scene: "三十八岁，驻北美经贸科技代表。某国司法部借长臂管辖权扣押我国核心半导体学者并启动引渡程序，对方联邦特工甚至暗中约谈你，以绿卡和政治庇护为诱饵要求你‘提供中资科研清单’，否则将对你提起串谋起诉。",
        type: "choice",
        choices: [
          {
            text: "【严词训斥对方特工，连夜组织律师团发起宪法反诉】：利用驻外外交豁免权与国际媒体公开展开反击",
            detail: "无畏强权！在异邦法庭上聘请顶级人权大律师，将对方政治迫害公之于众，成功阻击非法引渡。",
            reaction: "学者顺利获释回国，你被对方列为‘不受欢迎的人’驱逐出境，回国后受到国安与外交系统英雄般礼遇！",
            delta: { resilience: 45, cognition: 35, social: 35, inferiority: -30 },
            addTags: ["破浪铁汉", "扬我国威"]
          },
          {
            text: "【暗中妥协递交非核心边角资料换取免受起诉】：在重压下心理防线动摇，寻求个人安全自保",
            detail: "异邦孤独与牢狱威胁击垮了心理底线，幻想通过打擦边球两头逢源，却不知早已坠入万劫不复的谍战深渊。",
            reaction: "虽然免受起诉并获得永久居留，但回国通道被永久掐断，日夜生活在被两国情报部门双重监控与清算的恐惧中。",
            delta: { inferiority: 50, savings: 150000, resilience: -30, kinshipGuilt: 50, happiness: -40 },
            addTags: ["变节深渊", "终身梦魇"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_42",
        age: 42,
        stageName: "海外执缰 · 42岁",
        title: "驻发展中国家特命全权大使或跨国公服领袖",
        scene: "四十二岁，荣任驻‘一带一路’重点枢纽国家特命全权大使（或国际红十字会亚太区总干事）。面对当地激烈的党派政争与反华势力鼓噪，如何平衡国家重大港口资产运营与当地劳工民意成为世纪难题。",
        type: "choice",
        choices: [
          {
            text: "【深耕本土民心工程，援建百所学校与职业学院化解敌意】：跳出单纯资本运作，以仁义民生扎根",
            detail: "大国使节的气度与胸怀。推动中资项目将30%利润留在当地改善民生，建立青年技能培训中心，赢得跨党派一致敬仰。",
            reaction: "即便当地政权更迭，新政府依然视中资为不可替代的发展伙伴，大使馆被当地民众奉为和平灯塔。",
            delta: { cognition: 40, social: 40, resilience: 30, savings: 50000 },
            addTags: ["大国使节", "万国景仰"]
          },
          {
            text: "【铁腕结盟军方执政派系，强硬保护基建投资特许权】：采取传统现实主义地缘政治手腕，扶植利益代言人",
            detail: "丛林法则博弈。与现任军政府签署二十年不可撤销特许权协议，以绝对硬实力锁定战略出海口。",
            reaction: "战略目标完美达成，获得国内特批通报表彰；但当地反对派与人权组织不断示威抗议，使馆常年处于高危警戒状态。",
            delta: { social: 35, resilience: 35, health: -20, inferiority: 15 },
            addTags: ["现实主义铁腕", "争议重重"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_48",
        age: 48,
        stageName: "定局全球 · 48岁",
        title: "多边国际条约谈判代表与大国博弈终极裁决",
        scene: "四十八岁，代表发展中国家阵营担任全球气候变化/国际海洋法公约首席谈判代表。面对欧美集团设置的碳关税霸权陷阱，谈判进入长达七天七夜的极限拉锯战，全球数百家媒体聚光灯聚焦于你的发言席。",
        type: "choice",
        choices: [
          {
            text: "【通宵鏖战拆解不平等条款，联合全球南方国家构建同盟】：寸步不让，迫使发达国家建立千亿美元气候补偿基金",
            detail: "大国博弈的巅峰时刻。凭借渊博的国际法功底与绝顶谈判艺术，在最后关头促成历史性公约签署！",
            reaction: "公约以你的名字载入国际法教科书，联合国秘书长亲自为你颁发全球杰出贡献勋章，名动天下！",
            delta: { cognition: 45, social: 45, resilience: 40, inferiority: -30 },
            addTags: ["国士无双", "名垂青史"]
          },
          {
            text: "【接受妥协方案促成折中协议，换取多边组织更高职位】：审时度势，寻求大国均势与个人职涯最大化",
            detail: "成熟老练的外交政客。以适度妥协化解僵局，赢得了西方各方认可，顺利当选联合国副秘书长。",
            reaction: "成为国际舞台上少有的华人高官，享尽荣华与全球礼遇；但部分国内学者批评你在关键利益上留有遗憾。",
            delta: { social: 50, savings: 200000, inferiority: -10, kinshipGuilt: 15 },
            addTags: ["全球政要", "圆融中庸"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_55",
        age: 55,
        stageName: "晚晴沉淀 · 55岁",
        title: "跨国离岸智库创建与二代文化认同断层",
        scene: "五十五岁，卸下公职后在日内瓦或新加坡创办全球治理战略智库。然而多年跨国漂泊导致儿女完全西化，甚至对祖国历史与文化充满偏见与疏离，家庭饭桌上因价值观差异经常不欢而散。",
        type: "choice",
        choices: [
          {
            text: "【停下工作带儿女回祖国开展长达一年的故土寻根之旅】：带孩子回运河老家、长江三峡与延安",
            detail: "用真实的人间烟火与厚重历史缝合两代裂痕。在老宅灶台前、在长城砖石上为孩子讲述家族百年的坚韧奋斗。",
            reaction: "儿女终于读懂了父亲眼里的乡愁与深情，开始主动学习中文并参与中外青年文化交流，家庭重归和睦。",
            delta: { kinshipGuilt: -40, happiness: 40, resilience: 25, savings: -50000 },
            addTags: ["寻根弥合", "家道永续"]
          },
          {
            text: "【尊重儿女独立意志放手任其西化，自己潜心学术著述】：‘两代人有两代人的命，不必强求同频’",
            detail: "超脱执念。将全部心血倾注在《二十一世纪全球南方崛起与世界新秩序》两卷本巨著写作中。",
            reaction: "专著在全球学界引发轰动，被译为八国语言出版；但深夜合上书稿，空旷的洋房里只有日内瓦湖的阵阵冷风。",
            delta: { cognition: 45, savings: 80000, happiness: 15, kinshipGuilt: 25 },
            addTags: ["学术孤峰", "空巢清冷"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_63",
        age: 63,
        stageName: "荣休归根 · 63岁",
        title: "阿尔卑斯山麓的落日与运河故土的呼唤",
        scene: "六十三岁，坐在日内瓦湖畔的木椅上，看着夕阳染红阿尔卑斯雪山。海外漂泊四十年，昔日从苏北小城走出的少年已满头白发。国内母校发来聘书邀请你回国担任高等研究院讲席院长，落叶归根还是终老异邦？",
        type: "choice",
        choices: [
          {
            text: "【毅然变卖海外资产全家回国，将余生奉献给祖国青年学者培养】：‘少小离家老大回，乡音无改鬓毛衰！’",
            detail: "最深沉的家国情怀。放弃海外优渥年金与豪宅，回国主政高端智库，将毕生国际博弈智慧毫无保留传承给后人。",
            reaction: "国内学界高规格迎接，运河故土的老友执手相拥热泪盈眶；晚年桃李满天下，生命在故土泥土中得到终极升华！",
            delta: { happiness: 50, cognition: 35, resilience: 30, kinshipGuilt: -30 },
            addTags: ["叶落归根", "报国丹心"]
          },
          {
            text: "【留在异邦安享宁静晚年，做世界公民与客居隐士】：在湖畔栽花种草，偶尔接受国际媒体连线访谈",
            detail: "选择平淡从容的世界公民身份。不求轰轰烈烈，在清澈的湖光山色中静静品味一生的起伏波澜。",
            reaction: "生活平和恬淡无忧无虑，身体指标保持得极好；只是每次在超市偶然闻到中国老陈醋的味道，眼角总有些湿润。",
            delta: { health: 35, happiness: 35, resilience: 25, inferiority: -10 },
            addTags: ["客居自洽", "世界公民"]
          }
        ]
      }
    ];
  }


  // =========================================================================
  // 2. 科技互联网 / 研发与大厂赛道 (Tech Subtrack)
  // =========================================================================
  if (careerSubtrack === "tech") {
    if (chosenPath === "stay") {
      return [
        {
          id: "adult_tech_stay_28",
          age: 28,
          stageName: "期权大饼 · 28岁",
          title: "核心骨干P7与996急诊室警钟",
          scene: "二十八岁，你已是大厂独当一面的技术骨干（P7/高级工程师）。公司正筹备美股上市，VP给你画下‘三年期权财务自由’的大饼，同时全员推行‘996常态化+大小周’。凌晨一点，你眼前发黑被救护车紧急送往长海医院急诊室，医生拿着心电图严肃警告：‘严重心肌缺血频发室早，再熬命就没了！’而明天上午正是全组决战上线的封板节点。",
          type: "choice",
          choices: [
            {
              text: "【吞下速效救心丸拔掉针头返岗】：为了千万期权与技术负责人的前途，死扛通宵完成上线！",
              detail: "穷苦家庭走出来的做题家没有退路！你把命押在上市的赌桌上，连夜在工位打补丁直到系统稳定运行。",
              reaction: "系统如期上线支撑了千万级流量，VP在全员大会上称你为‘铁血技术基石’，期权额度翻倍；但你自此落下了严重的心律失调。",
              delta: { savings: 80000, social: 30, health: -30, inferiority: -10, resilience: 15 },
              addTags: ["带病鏖战", "期权赌徒"]
            },
            {
              text: "【遵医嘱开具休假证明退出内卷，按时打卡】：‘身体是革命的本钱，拒绝为资本卖命到猝死！’",
              detail: "守住身心底线。将医院诊断书甩给HR，坚决要求休满病假，并在内网技术论坛发表关于理性研发的思考。",
              reaction: "身体逐步恢复健康，但VP在年终考评中给你打了最差的‘绩效C’，期权全部被收回，面临被优化风险。",
              delta: { health: 30, happiness: 25, savings: -20000, social: -25, resilience: 20 },
              addTags: ["健康觉醒", "考评垫底"]
            },
            {
              text: "【利用核心架构壁垒在业余时间自研独立AI产品】：表面维持工作，暗中打造出海爆款第二曲线",
              detail: "高智商极客的破局之道。下班后悄悄开发面向海外创作者的AI微服务应用，上线两个月MRR突破五千美元。",
              reaction: "身心极度疲惫，但你手握随时可以裸辞的被动收入与技术底牌，看大厂PUA的眼神多了一份从容戏谑。",
              delta: { savings: 60000, cognition: 30, resilience: 25, health: -15, rebellion: 25 },
              addTags: ["极客暗渡", "双线突围"]
            }
          ]
        },
        {
          id: "adult_tech_stay_30",
          age: 30,
          stageName: "三十而立 · 30岁",
          title: "初任研发总监与双十一底层架构失火",
          scene: "三十岁，你升任核心业务线技术总监，统管百人研发团队。然而接手的是前任留下的‘意大利面条式’遗留系统，技术债务积重难返。双十一零点大促前一周，高并发压测导致数据库集群主从延迟高达十分钟，随时会雪崩。业务线副总裁咆哮：‘如果敢停机重构耽误百亿大促，你们全组年终奖全部泡汤！’",
          type: "choice",
          choices: [
            {
              text: "【服从业务VP强行打硬编码补丁硬顶大促】：利用内存缓存黑客手段压住延迟，掩盖系统溃烂",
              detail: "典型的实用主义妥协。深知高层只在乎短期GMV数字，用不可持续的技术债换取眼前的商业过关。",
              reaction: "大促勉强过关未出现宕机，公司战报亮眼，你领到了三十万年终大奖；但系统沦为定时炸弹，稍有波动便会彻底毁灭。",
              delta: { savings: 150000, social: 25, inferiority: 15, resilience: -10, health: -15 },
              addTags: ["技术债堆积", "拿钱走钢丝"]
            },
            {
              text: "【冒死直陈董事会立军令状，推迟非核心功能停机重构】：彻底铲除架构毒瘤，通宵带领骨干重写核心中间件",
              detail: "有骨气、有担当的首席技术官风范！敢于对业务部门说‘不’，三天三夜带领攻坚组将核心服务彻底解耦重塑。",
              reaction: "大促在毫秒级极速响应中平稳落地，故障率归零！你一战封神成为大厂技术传奇，但也彻底得罪了业务线副总裁。",
              delta: { cognition: 35, resilience: 35, social: -15, health: -20, inferiority: -20 },
              addTags: ["技术中流砥柱", "树敌高管"]
            }
          ]
        },
        {
          id: "adult_tech_stay_32",
          age: 32,
          stageName: "职场暴风雨 · 32岁",
          title: "资本寒冬降临与亲手裁撤患难兄弟",
          scene: "三十二岁，宏观资本寒冬降临，互联网巨头市值腰斩，全集团推行‘去肥增瘦与残酷活水’。HRD闭门将裁员名单甩到你脸上：你的团队必须裁撤35%，其中包括陪你从草创期通宵吃泡面的老部下，其中一人刚生二胎且背负五百万房贷。HRD冷漠道：‘如果你不签字交人，下周连你一起裁！’",
          type: "choice",
          choices: [
            {
              text: "【狠心执行裁员并为兄弟争取顶格N+3赔偿】：独自一人在小会议室与部下一一闭门深谈",
              detail: "体制与资本齿轮下的残忍现实。你红着眼眶咽下所有骂名，替下属向集团争取到最高的期权变现与离职补偿。",
              reaction: "团队精简后指标达标，你保住了高管席位；但兄弟们摔门而去的背影与绝望眼神，让你连续一个月依赖安眠药才能入睡。",
              delta: { savings: 120000, inferiority: 30, kinshipGuilt: 25, happiness: -25, resilience: 10 },
              addTags: ["冷酷刀手", "良心重负"]
            },
            {
              text: "【怒拍桌子拒绝签字，将裁员配额揽在自己身上降薪】：‘一个都不准少，要砍先砍我的总监薪水！’",
              detail: "义薄云天的技术带头人！在冷冰冰的商业世界里守住了人性的温度，以个人高额薪水折抵团队HC成本。",
              reaction: "团队士气爆发创造出行业顶级开源项目，兄弟们誓死追随；但高层将你视为不服从管理的刺头，逐步剥离核心业务权限。",
              delta: { social: 35, resilience: 35, savings: -80000, rebellion: 25, inferiority: -20 },
              addTags: ["义薄云天", "高层边缘化"]
            },
            {
              text: "【暗中带领核心技术骨干整体跳槽或打包自立门户】：借力外部风投天使轮，集体离职创立新公司",
              detail: "决绝的破局反杀。与其坐以待毙被资本宰割，不如带领核心班底将技术沉淀转化为独立股权。",
              reaction: "获得知名VC千万级天使投资创立硬科技公司，但全员断粮进入创业生死场，现金流压力让你白发丛生。",
              delta: { rebellion: 35, cognition: 30, savings: -100000, resilience: 30, health: -20 },
              addTags: ["揭竿而起", "创业孤注"]
            }
          ]
        },
        {
          id: "adult_tech_stay_35",
          age: 35,
          stageName: "三十五岁生死劫 · 35岁",
          title: "大厂年龄红线危机与高额房贷断供警报",
          scene: "三十五岁生日当天，猎头电话全面停滞，HRBP把你叫进玻璃房委婉递来《转岗协商函》：要么自愿降薪45%调往三线城市维护边缘传统业务，要么签署协议拿补偿离职。家里每月三万二的房贷刚过半，孩子刚进双语幼升小，父母的降压药不能断。三十五岁的魔咒像铁壁合围。",
          type: "choice",
          choices: [
            {
              text: "【吞下屈辱接受降薪转岗下沉三线】：为了每月不断供的房贷与家庭开支，咬牙在下沉业务苟住",
              detail: "中年男人的铠甲与软肋。收起所有傲气与名校光环，每天坐慢速绿皮车往返于省城与三线基地维稳旧系统。",
              reaction: "家庭现金流勉强维系，房贷没有违约；但在老同学聚会上你默默坐在角落，体会到了中年职场断崖的无声悲凉。",
              delta: { savings: 60000, inferiority: 35, happiness: -20, resilience: 15, health: -15 },
              addTags: ["中年苟存", "隐忍负重"]
            },
            {
              text: "【拿完大额N+3赔偿金，开启技术出海独立开发工作室】：全面押注AI海外微服务与独立站变现",
              detail: "彻底击碎大厂依附幻象。用六十万赔偿金作为两年弹药，一人身兼产品、架构与全栈出海变现。",
              reaction: "半年后凭借一款面向拉美市场的AI法律助手实现单月净利润八千美元，彻底逃出国内内卷职场，重获自由！",
              delta: { savings: 200000, cognition: 35, rebellion: 35, resilience: 30, happiness: 25 },
              addTags: ["独立创客", "破茧突围"]
            },
            {
              text: "【聘请顶尖劳动律师打赢期权仲裁，索要数百万权益】：与巨头公开撕破脸，通过法律武器捍卫知识产权与期权",
              detail: "铁骨铮铮的法律极客！整理出完整的劳动记录与发明专利交底书，在劳动仲裁与法庭上寸土必争。",
              reaction: "经过长达一年的司法拉锯，最终全额获赔三百万期权现金；但你在国内大厂HR黑名单上被顶格封杀。",
              delta: { savings: 500000, resilience: 35, social: -30, inferiority: -20, health: -20 },
              addTags: ["法理铁拳", "大厂绝缘体"]
            }
          ]
        },
        {
          id: "adult_tech_stay_38",
          age: 38,
          stageName: "中年深水区 · 38岁",
          title: "硬科技创业对赌协议与房子抵押生死线",
          scene: "三十八岁，你的AI智能制造工业视觉公司进入B轮融资。由于资本环境骤冷，原本承诺注资的国资基金突然叫停，账上现金仅够支撑全公司发薪四十五天。某民营创投大佬把五千万投资协议甩在桌上，但附带一条‘创始人承担无限连带个人回购保证，若三年未申报科创板则赔偿全部本息’。",
          type: "choice",
          choices: [
            {
              text: "【孤注一掷签署个人连带对赌协议】：抵押个人名下全部房产与征信，誓要死磕到敲钟那一天！",
              detail: "真正的赌徒本色与创业狂徒！将老婆孩子的退路全部押在科技赛道上，拿到救命资金全力冲刺客户交付。",
              reaction: "公司靠这笔资金研发出打破国外垄断的高速检测仪，订单翻倍；但每天醒来脑海中都是千万负债的倒计时，夜夜难眠。",
              delta: { savings: 300000, resilience: 40, health: -30, inferiority: -10, social: 25 },
              addTags: ["对赌狂人", "背水狂飙"]
            },
            {
              text: "【断然拒绝自杀式对赌，砍掉70%前沿研发转型保命】：绝不让全家陷入万劫不复，靠接外包脏活苦活自给自足",
              detail: "理智而清醒的企业家。宁可被圈内嘲笑‘格局不够大’，也绝不签署丧权辱国的对赌，转型工业定制软件稳定盈利。",
              reaction: "公司虽然失去了成为百亿独角兽的机会，但稳稳做成了年入千万的隐形现金牛，全家免于破产深渊。",
              delta: { savings: 150000, resilience: 30, cognition: 25, happiness: 20, social: -15 },
              addTags: ["务实存续", "现金为王"]
            }
          ]
        },
        {
          id: "adult_tech_stay_42",
          age: 42,
          stageName: "执掌一方 · 42岁",
          title: "科创板上市敲钟与心肌梗死重度预警",
          scene: "四十二岁，公司在上交所科创板正式鸣锣上市！你手握数亿市值股权，跻身新晋科技新贵。然而在庆功晚宴洗手间，你因急性心前区剧痛瘫软在地，速效救心丸散落一地。抢救医生神情极其凝重：‘三支冠状动脉狭窄达85%，如果不立刻介入搭桥并彻底停工休养，随时可能猝死在工位上！’",
          type: "choice",
          choices: [
            {
              text: "【退居二线转任非执行董事，将经营权交由职业经理人】：‘财富已经足够，下半生我选择活下去！’",
              detail: "在生死关头彻底勘破名利浮云。卸下CEO重担隐居山水，每天打太极散步，陪伴妻子儿女周游世界。",
              reaction: "身体机能奇迹般逐步恢复平稳，家庭重获久违的欢声笑语；尽管职业经理人的平庸决策令股价腰斩，你已波澜不惊。",
              delta: { health: 40, happiness: 45, resilience: 25, savings: 2000000, social: -20 },
              addTags: ["顿悟隐退", "惜命长生"]
            },
            {
              text: "【做完支架手术两周重返一线，继续统帅全球商业扩张】：‘战死在冲锋的阵地上，才是极客的最高荣耀！’",
              detail: "停不下来的工作狂灵魂。随身携带私人医疗小组与急救仪器，强行推进北美与欧洲研发中心布局。",
              reaction: "商业帝国市值冲破百亿，被评为全国十大科技领袖；但在光鲜的聚光灯背后，每一天都在死神刀尖上起舞。",
              delta: { savings: 5000000, social: 45, health: -35, resilience: 35, inferiority: -30 },
              addTags: ["科技寡头", "刀尖起舞"]
            }
          ]
        },
        {
          id: "adult_tech_stay_48",
          age: 48,
          stageName: "定局之年 · 48岁",
          title: "AGI颠覆旧范式与押注后半生的二次革命",
          scene: "四十八岁，新一代通用人工智能与具身智能大爆发，彻底颠覆了你三十年来建立的技术城池。昔日的核心算法护城河在底层模型演进下瞬间化为乌有。面对行业剧变，是躺在上市资产上做个安稳投资人，还是倾尽身家All in全新前沿具身大脑？",
          type: "choice",
          choices: [
            {
              text: "【变现三成股权注入具身智能实验室，亲自坐镇带队攻坚】：‘老兵不死，极客永远在代码前沿！’",
              detail: "骨子里永不熄灭的技术火种。召集全球顶尖二十岁天才学者，在工业级物理仿真与神经动力学领域展开二次创业。",
              reaction: "三年后团队发布世界首个工业级人形机器人运动操作模型，在全球学术与产业界引发滔天巨浪！老夫聊发少年狂！",
              delta: { cognition: 45, resilience: 40, health: -20, social: 35, savings: -1000000 },
              addTags: ["二次涅槃", "一代代宗师"]
            },
            {
              text: "【转型硬科技天使投资人与创业导师，优雅分享行业红利】：不涉身一线，以资本与认知为年轻人铺路",
              detail: "知进退的大资本家智慧。设立十亿规模青年极客扶持基金，赋能上百家初创企业，享有崇高的业界声誉。",
              reaction: "生活从容优雅，出入各大达沃斯论坛与科技峰会，成为后辈极客竞相拜访的行业教父。",
              delta: { savings: 3000000, social: 45, happiness: 35, health: 25, resilience: 20 },
              addTags: ["科技教父", "从容赢家"]
            }
          ]
        },
        {
          id: "adult_tech_stay_55",
          age: 55,
          stageName: "晚晴传承 · 55岁",
          title: "数字家族信托与儿女对代码的彻底叛逆",
          scene: "五十五岁，你打拼下的科技企业与资产进入家族传承期。你精心安排儿女出国攻读斯坦福计算机博士期望接班掌舵；然而儿女却坚决抗拒：‘那是你的野心，不是我的人生！’儿女毅然退学去从事现代雕塑与自然保护，家族饭桌上陷入冰点。",
          type: "choice",
          choices: [
            {
              text: "【彻底放下控制欲，将大部分财富捐赠成立开源公益基金】：尊重儿女的自由生命，财富取之于科技用之于社会",
              detail: "超越狭隘血缘宗族的现代智慧。设立永久性开源极客基金会，资助全球无法支付学费的贫困代码天才。",
              reaction: "儿女在非洲做保护项目时为你感到由衷骄傲，两代人实现世纪大和解；全球开源社区为你立起永久纪念牌。",
              delta: { happiness: 45, cognition: 35, kinshipGuilt: -30, inferiority: -25, social: 30 },
              addTags: ["开源博爱", "超凡格局"]
            },
            {
              text: "【强制要求儿女挂名董事，聘请职业信托机构严加管控】：以严苛的家族契约束缚后代，确保财富不外流",
              detail: "传统中国式家长的控制欲。将所有股权打入离岸不可撤销信托，规定必须按季领取生活费并满足考评指标。",
              reaction: "保全了亿万家族财富永不旁落，但儿女自此视你为暴君，除夕年夜饭再也没有踏入过家门一步。",
              delta: { savings: 4000000, inferiority: 30, kinshipGuilt: 40, happiness: -25 },
              addTags: ["金钱牢笼", "骨肉离心"]
            }
          ]
        },
        {
          id: "adult_tech_stay_63",
          age: 63,
          stageName: "荣休离场 · 63岁",
          title: "三十年前第一行代码与终极数字永生",
          scene: "六十三岁，坐在智能生态玻璃房内，屏幕上静静躺着你三十年前大学宿舍里写下的第一个开源中间件模块。如今该模块已被衍生迭代嵌入全球数十亿台汽车与服务器中。硅谷实验室向你提出终极实验：将你一生的思维日志、代码逻辑与神经记忆完整训练成专属AI分身。",
          type: "choice",
          choices: [
            {
              text: "【微笑合上电脑走向果园，做一个平静种花的凡夫老翁】：‘肉身终将归于尘土，人性的温度在于有限。’",
              detail: "对生命终极规律的深刻敬畏。彻底拔掉网络插头，拿起剪刀在运河畔修剪花木，与老伴晒着暖阳安享余生。",
              reaction: "精神获得前所未有的宁静与自洽，无疾而终的晚年如同一首优美的散文诗，无愧于人世走这一遭。",
              delta: { happiness: 50, health: 35, resilience: 30, inferiority: -20 },
              addTags: ["归真自洽", "安然落幕"]
            },
            {
              text: "【授权启动终极意识上传，将毕生智慧化为全球开源永生模型】：‘我的肉体可以腐烂，但我的算法永驻人间！’",
              detail: "极客浪漫主义的终极绝响。在服务器阵列中留下了一个具有完整性格、哲学与幽默感的数字永生实体。",
              reaction: "百年之后，无数年轻程序员在深夜调试报错时，依然能收到来自你数字灵魂的诙谐指点，传奇永不落幕！",
              delta: { cognition: 50, social: 40, resilience: 35, happiness: 35 },
              addTags: ["数字永生", "极客绝唱"]
            }
          ]
        }
      ];
    }
    // Tech Emigrate (硅谷/欧洲/离岸极客)
    return [
      {
        id: "adult_tech_emigrate_28",
        age: 28,
        stageName: "异邦立足 · 28岁",
        title: "H1B工签抽签风波与温哥华离岸外派",
        scene: "二十八岁，你供职于硅谷一线科技巨头西雅图总部，连续三年H1B抽签未中。公司HR冷酷通知：要么调往加拿大温哥华分部降薪30%走离岸外派，要么卷铺盖回国。而此时你在西雅图按揭的联排小别墅刚交付，加州湾区一家匿名加密货币初创开出两倍高薪但无法提供任何签证担保。",
        type: "choice",
        choices: [
          {
            text: "【接受降薪30%转战温哥华，稳妥积累枫叶卡移民积分】：选择确定性，在湿冷的雨夜打包北上",
            detail: "实用主义生存术。忍受短期收入缩水，稳扎稳打拿到加拿大永居身份，换取长期在北美自由流动的安全感。",
            reaction: "在温哥华顺利拿到枫叶卡，生活节奏慢了下来；但在老同学群里看到国内独角兽高管的造富神话，偶尔感到寂寞。",
            delta: { resilience: 25, health: 20, happiness: 15, savings: -30000, inferiority: 10 },
            addTags: ["枫叶扎根", "从容求稳"]
          },
          {
            text: "【冒险加盟湾区无身份加密初创，以极客技术赌全球自由】：‘规矩是平庸者的枷锁，真正极客自带网络主权！’",
            detail: "狂野的赛博游民！完全依靠去中心化合约发薪，用非凡的技术实力成为全网匿名顶尖协议核心贡献者。",
            reaction: "初创代币暴涨带来数百万美元收益，但无合法身份的生活让你犹如行走在钢丝上的幽灵，每天警惕移民局敲门。",
            delta: { savings: 500000, cognition: 35, rebellion: 40, health: -20, inferiority: 20 },
            addTags: ["赛博亡命徒", "极客暴富"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "硅谷大厂系统架构师与隐形竹子天花板",
        scene: "三十岁，你已成为硅谷知名云原生架构师。然而在Staff/Principal级别晋升评议中，白人总监与印度裔经理联手将唯一的晋升名额给了一个技术平平但擅长PPT宣讲的印度同事。对方拍着你的肩膀：‘Chen, you are the best coder, just keep coding.’",
        type: "choice",
        choices: [
          {
            text: "【隐忍苦干当技术老黄牛，靠不可替代的核心专利稳守阵地】：不争口舌之利，默默将公司核心底层牢牢锁死在自己手中",
            detail: "华人工程师最典型的技术壁垒策略。所有关键调度代码只有你能维护，公司离开你系统就会瘫痪。",
            reaction: "虽然没有虚名头衔，但年薪与股票奖金拿到顶格，成为公司暗中公认不可触碰的‘扫地僧’；但内心深处的憋屈始终未消。",
            delta: { savings: 150000, resilience: 30, inferiority: 20, health: -10, cognition: 25 },
            addTags: ["技术扫地僧", "天花板憋屈"]
          },
          {
            text: "【重金聘请领导力教练，在全员All-hands大会上正面硬刚夺权】：打破东亚人‘沉默好欺’的偏见！",
            detail: "强硬反击职场歧视。以流利犀利的英语在全员大会上揭露对方架构方案的灾难性缺陷，拿出成熟落地白皮书。",
            reaction: "惊艳全场迫使高层不得不重新洗牌，你直接被任命为全球基础架构总监！一举打破硅谷竹子天花板，成为华人工程师标杆！",
            delta: { social: 40, cognition: 35, resilience: 35, inferiority: -30, savings: 200000 },
            addTags: ["破壁硬汉", "硅谷总监"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_32",
        age: 32,
        stageName: "风暴来袭 · 32岁",
        title: "高科技出口管制禁令与华裔忠诚度排查",
        scene: "三十二岁，地缘政治冲突骤然升级，美国商务部出台最严半导体与AI出口管制清单。联邦调查局对硅谷中资背景及华裔核心技术人员展开合规排查，你的门禁卡突然被无故禁用，内审部门要求你交出私人电脑并接受长达八小时的背景盘问。",
        type: "choice",
        choices: [
          {
            text: "【完全配合调查自证清白，签署严格的技术脱钩承诺书】：为了保住在北美的体面生活，割席一切本土技术关联",
            detail: "异邦客居的残酷生存课。退出了所有国内大学校友群，删除了与国内学者的全部学术交流记录，求得自保。",
            reaction: "调查顺利过关重获权限，但内心的屈辱感久久无法平复，你深切体会到无论技术多高超，异邦始终视你为外人。",
            delta: { resilience: 20, inferiority: 35, savings: 80000, happiness: -20 },
            addTags: ["异邦自保", "屈辱割席"]
          },
          {
            text: "【愤而拒绝签署歧视性条款，辞职创立跨国开源无国界社区】：‘算法与数学无国界，绝不充当政治工具！’",
            detail: "硬核极客的尊严！当场交出辞呈，在瑞士和新加坡注册分布式非盈利开源实验室，打造完全去政治化的开源模型。",
            reaction: "全球数万名顶尖开发者响应加入，项目成为全球去中心化AI的灯塔；但你的北美绿卡流程因此中断，全家面临搬迁瑞士。",
            delta: { rebellion: 45, cognition: 40, resilience: 35, savings: -100000, inferiority: -20 },
            addTags: ["开源无疆", "流亡极客"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "硅谷历史级科技裁员与加州山火房贷危局",
        scene: "三十五岁，硅谷爆发二十年罕见的十万人大裁员潮。你所在的公司股价暴跌70%，你被HR通知纳入裁员名单。加州山火逼近你所住的社区，房屋保险被单方面取消，每月一万二美元的巨额房贷催款单如期而至。两个孩子在后院看着泛红的天空哭泣。",
        type: "choice",
        choices: [
          {
            text: "【不挑不拣即刻降级接下二线传统企业维持身份】：哪怕去维护古老Cobol银行系统，也要保住全家饭碗",
            detail: "中年父亲的担当。放下一流大厂的虚荣，以极快速度入职传统保险金融公司IT部门，稳稳维系签证与房贷支出。",
            reaction: "全家顺利渡过裁员寒冬，房产未被法拍；虽然工作枯燥乏味毫无成就感，但平安比任何虚名都真实。",
            delta: { resilience: 35, savings: 40000, happiness: 10, inferiority: 15 },
            addTags: ["逆境求生", "家庭基石"]
          },
          {
            text: "【联合被裁华裔天才在车库创办AI Agent出海初创】：‘寒冬正是巨头衰退、小狼捕食的最佳风口！’",
            detail: "硅谷车库传奇重现。聚集三个顶尖被裁博士，在车库里通宵研发针对中小电商的自动化数字员工系统。",
            reaction: "上线三个月获得Y Combinator顶级孵化器一百万美元种子投资，成为硅谷当季最炙手可热的华人黑马！",
            delta: { rebellion: 40, cognition: 40, savings: 200000, health: -20, social: 30 },
            addTags: ["车库黑马", "YC新星"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_38",
        age: 38,
        stageName: "深水博弈 · 38岁",
        title: "纳斯达克敲钟财富自由与故土母亲空巢离世",
        scene: "三十八岁，你的初创公司在纳斯达克成功挂牌！你的个人身价突破两千万美元。在纽约时代广场巨大的纳斯达克大屏下，闪光灯亮如白昼；然而就在同一时刻，老家姐姐打来跨国电话痛哭：母亲因心梗突发在县医院抢救无效去世，临终前一直念着你的乳名。",
        type: "choice",
        choices: [
          {
            text: "【当即抛下庆功宴包机返乡，在母亲灵前披麻戴孝长跪】：‘千金散尽何足惜，子欲养而亲不待！’",
            detail: "被巨大的悔恨与悲痛击碎。将公司事务全部托付合伙人，连夜跨越太平洋赶回运河老宅，在母亲棺木前头破血流。",
            reaction: "在老家守孝一个月，为全县重修了老年心血管急救中心；虽然纳斯达克股价短期动荡，但你找回了为人子的最后救赎。",
            delta: { kinshipGuilt: 30, savings: -200000, resilience: 35, happiness: -20, health: -15 },
            addTags: ["至孝泣血", "金钱幻灭"]
          },
          {
            text: "【强忍剧痛完成全美投资者路演，汇款百万巨资为母亲修建豪华陵园】：以理智完成世俗职责",
            detail: "将悲伤深深冻结在心底。在华尔街投行与对冲基金经理面前完成一场场完美的财报宣讲，暗中泪流成河。",
            reaction: "公司市值突破十亿美元，奠定了跨国商界巨擘地位；但往后余生，时代广场那场绚烂的烟花成了你终生不愿触碰的创伤。",
            delta: { savings: 2000000, social: 45, inferiority: 20, kinshipGuilt: 50, health: -25 },
            addTags: ["资本铁人", "终生抱憾"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_42",
        age: 42,
        stageName: "海外执缰 · 42岁",
        title: "跨国科技巨头全职合伙人与二代文化鸿沟",
        scene: "四十二岁，你已跻身硅谷最顶尖华人科技合伙人（General Partner）。在帕罗奥图的亿元豪宅里，大儿子却拒绝承认华人身份，甚至因你带有浓重中式口音的英语而感到羞耻，在私立高中竞选中刻意与你保持距离。",
        type: "choice",
        choices: [
          {
            text: "【放下工作带儿子回国参与为期半年的大凉山公益支教】：用最真实的泥土与奉献打破虚浮的优越感",
            detail: "大智慧的父爱重构。带儿子脱离加州富人区的精致利己泡沫，在没有网络与豪华泳池的高山村落里与贫困孩子同吃同住。",
            reaction: "儿子在艰苦劳动中脱胎换骨，痛哭流涕向你道歉，开始由衷尊重父辈那一代赤手空拳跨海打拼的坚韧历史。",
            delta: { kinshipGuilt: -40, happiness: 45, resilience: 30, savings: -100000, social: 20 },
            addTags: ["亲情再造", "精神传承"]
          },
          {
            text: "【全盘接纳儿子的西化选择，将父爱转化为信托资产支持】：‘每个人都有选择自己文化的自由’",
            detail: "现代自由主义的彻底放手。为儿子设立两千万美元独立信托，尊重其完全融入西方主流社会的自主诉求。",
            reaction: "家庭关系维持着客气而礼貌的体面，儿子顺利进入常春藤名校；但在冷清的感恩节餐桌上，缺少了东方的烟火温情。",
            delta: { savings: 1500000, social: 30, inferiority: -10, happiness: 15 },
            addTags: ["体面疏离", "各自安好"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_48",
        age: 48,
        stageName: "定局全球 · 48岁",
        title: "全球算力竞赛与主权AI数据中心抉择",
        scene: "四十八岁，你统帅的算力基金在冰岛与北欧建设全球最大的地热驱动清洁超级算力集群。某国军方开出五倍高溢价要求包揽算力用于自主无人作战模型训练，而联合国人道组织则希望租用算力用于全球罕见病新药分子模拟筛选。",
        type: "choice",
        choices: [
          {
            text: "【坚决拒绝军事合同，将算力全额降价供应全球生物医药开源科研】：‘科技的终极目的是挽救生命而非杀戮！’",
            detail: "伟大人道主义极客的高光抉择。顶住董事会资本压力，将万卡算力阵列无偿捐赠给抗癌药物研发展开全球协作。",
            reaction: "团队助力全球科学家在一年内攻克三种儿童罕见绝症，荣获拉斯克医学特别贡献奖，受到全人类崇高敬仰！",
            delta: { cognition: 50, social: 50, happiness: 50, savings: -500000, inferiority: -30 },
            addTags: ["科技向善", "普世丰碑"]
          },
          {
            text: "【接受军方十亿美元超级大单，实现商业资本与地缘结盟的顶峰】：现实主义的资本暴利逻辑",
            detail: "追求绝对的商业回报与地缘庇护。与军方签署长期排他协议，算力帝国获得国家级最高安防与补贴。",
            reaction: "资本规模冲破五十亿美元，成为不可动摇的跨国深科技军工寡头；但在反战抗议者的标语前，你始终神情凝重。",
            delta: { savings: 10000000, social: 40, inferiority: 25, resilience: 30, happiness: -20 },
            addTags: ["深科技寡头", "冷酷铁幕"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_55",
        age: 55,
        stageName: "晚晴沉淀 · 55岁",
        title: "硅谷华人创投教父与第三世界极客奖学金",
        scene: "五十五岁，退居幕后成为硅谷华人创投圈泰斗。看着一代代年轻华裔工程师面临与你当年相似的职场困境与身份焦虑，你在斯坦福大学与新加坡国立大学设立永久性全额极客奖学金。",
        type: "choice",
        choices: [
          {
            text: "【亲自担任青年极客创业营导师，每年一对一带教三十名寒门学子】：将毕生踩过的雷与破局之策倾囊相授",
            detail: "燃烧自己照亮后人。每周固定拿出两天时间为年轻创业者梳理架构、对接资本，甘做下一代人的铺路天梯。",
            reaction: "门下走出数十家估值过亿的独角兽企业，后辈极客将你奉为精神教父，晚年生活充实而富有无尽意义！",
            delta: { social: 50, happiness: 45, cognition: 40, health: 25 },
            addTags: ["一代宗师", "桃李满园"]
          },
          {
            text: "【纯粹做资金LP托底，隐居夏威夷庄园潜心享受冲浪与天伦】：不再过问世俗纷扰，彻底开启养老模式",
            detail: "功成身退的极致从容。在碧海蓝天中彻底告别算法与终端，享受纯粹的阳光、海浪与悠闲晚年。",
            reaction: "身体状态调理到年轻态，血压血脂恢复如初，真正体会到了财务自由带来的无限宁静。",
            delta: { health: 40, happiness: 45, resilience: 25, inferiority: -20 },
            addTags: ["天海逍遥", "神仙眷侣"]
          }
        ]
      },
      {
        id: "adult_tech_emigrate_63",
        age: 63,
        stageName: "荣休离场 · 63岁",
        title: "太平洋两岸的落日与运河故土的开源代码",
        scene: "六十三岁，坐在加州半月湾的悬崖木屋里，太平洋彼岸正是你当年出生的苏北小城。老家母校新建的现代图书馆落成，校长来信恳请以你的名字命名计算机中心。回望这一生，从运河畔做题少年到全球算力巨擘，人生的大幕渐渐归于从容。",
        type: "choice",
        choices: [
          {
            text: "【全额资助母校数字化实验室，并将毕生代码著作向全球华人永久开源】：‘此心安处是吾乡！’",
            detail: "最深沉的返璞归真。将毕生技术与财富化为润物细无声的甘霖，资助家乡数万名农村少年接触前沿AI技术。",
            reaction: "运河畔的孩子们通过你的实验室看到了浩瀚的星空，你的一生成为苏北平原上传颂百年的精神史诗！",
            delta: { happiness: 50, cognition: 45, resilience: 35, social: 40 },
            addTags: ["大木苍翠", "万世师表"]
          },
          {
            text: "【在半月湾静静写完《硅谷四十年：一个中国极客的生命账簿》后封笔】：将所有的激荡与孤独凝练于白纸黑字",
            detail: "冷静深邃的个人自传。不夸张功绩，不掩饰懦弱与遗憾，给世界留下一份最真实、最震撼的时代个案记录。",
            reaction: "自传出版后迅速登顶全球畅销书榜，无数读者在字里行间读到了一个普通人与命运死磕的伟大尊严！",
            delta: { cognition: 50, happiness: 45, resilience: 30, inferiority: -25 },
            addTags: ["时代史诗", "圆满落幕"]
          }
        ]
      }
    ];
  }


  // =========================================================================
  // 3. 学术科研 / 高校学者与象牙塔赛道 (Academic Subtrack)
  // =========================================================================
  if (careerSubtrack === "academic") {
    if (chosenPath === "stay") {
      return [
        {
          id: "adult_acad_stay_28",
          age: 28,
          stageName: "青椒生死契 · 28岁",
          title: "985特聘副研究员与非升即走对赌",
          scene: "二十八岁，博士毕业留在顶尖985高校。校人事处将《特聘副研究员三年聘用协议》递给你：三年内必须斩获国家自然科学基金青年项目+发表三篇顶刊论文，全系三十位青椒最终差额留校两人，未达标者直接无条件解聘走人。老家二线双非大学此时开出六十万安家费和正规事业编制招揽，是留在名校赌命还是去二线求稳？",
          type: "choice",
          choices: [
            {
              text: "【毅然签下985非升即走协议】：明知九死一生，誓要留在顶级学术平台搏一个未来！",
              detail: "孤勇学者的野心。放弃安家费与编制安稳，住进学校八平米青年公寓，日夜泡在实验室疯狂灌水发论文。",
              reaction: "首篇顶刊论文在熬了无数通宵后顺利送审，但严重的腰椎间盘突出让你每天只能站着写论文。",
              delta: { academicCapital: 30, cognition: 30, health: -25, savings: -10000, resilience: 20 },
              addTags: ["非升即走", "学术赌徒"]
            },
            {
              text: "【接受二线双非大学安家费入编，安稳成家立业】：不再陪跑名校残酷内卷，换取体面与确定性",
              detail: "务实自洽的生存智慧。拿六十万安家费在二线城市全款买房，享受副教授待遇与充足的寒暑假生活。",
              reaction: "家庭生活幸福安康，父母逢人便骄傲地夸耀‘孩子是大学教授’；但看着昔日同窗在国际顶刊发文，偶有不甘。",
              delta: { savings: 600000, happiness: 35, health: 25, academicCapital: -10, inferiority: 10 },
              addTags: ["双非安居", "知足常乐"]
            }
          ]
        },
        {
          id: "adult_acad_stay_30",
          age: 30,
          stageName: "三十而立 · 30岁",
          title: "国家自然科学基金青年项目与学阀恩怨",
          scene: "三十岁，你精心打磨的国自然青年基金项目进入函评。然而可靠消息传来，主审会评专家恰好是当年与你博导发生过激烈学术论战的圈内学阀。同行暗示你：‘若不在本子里主动引用该学阀的边缘学说并由你博导亲自登门敬酒化解，大概率被一票否决。’",
          type: "choice",
          choices: [
            {
              text: "【坚守理论自洽拒不逢迎，用无可辩驳的数据说话】：‘科学讲求真理，绝不在学阀门下屈膝！’",
              detail: "骨子里学者的傲骨！拒不修改引文，将全部实验对照组扩增三倍，用绝对严密的逻辑筑牢抗辩护城河。",
              reaction: "本子在青年学者群体中引发巨大反响破格全A通过！但该学阀在圈内放话‘此子狂妄不可大用’。",
              delta: { academicCapital: 35, resilience: 35, rebellion: 30, social: -20, inferiority: -15 },
              addTags: ["学术傲骨", "学阀宿怨"]
            },
            {
              text: "【委曲求全修正论述并主动登门向学阀请教】：‘人在矮檐下，为了课题组活下去只能低头’",
              detail: "深谙学术江湖潜规则。压下内心反感，在绪论中大篇幅引用其著作，并在博导带领下赴宴陪笑敬酒。",
              reaction: "基金顺利获批拿到三十万科研经费，成功迈过非升即走最险一关；但走出饭店的那一刻，你在洗手间干呕不止。",
              delta: { savings: 80000, academicCapital: 25, inferiority: 25, resilience: -10, social: 20 },
              addTags: ["江湖妥协", "委曲求生"]
            }
          ]
        },
        {
          id: "adult_acad_stay_32",
          age: 32,
          stageName: "职场暴风雨 · 32岁",
          title: "实验室研究生抑郁危局与学科评估压力",
          scene: "三十二岁，你带的研二研究生因长期做不出阳性结果在天台情绪失控企图轻生。学院领导火速赶到现场，事后在办公室严厉训诫你：‘全国学科评估在即，这事绝不能捅出去，马上把他的论文降级放水让他毕业走人，否则撤销你的研究生导师资格！’",
          type: "choice",
          choices: [
            {
              text: "【顶住撤职压力自掏积蓄送医，调整课题方向一对一心理疏导】：‘学生的人命比任何冷冰冰的指标都重！’",
              detail: "医者仁心，学者师德！拒绝院系甩锅，自掏两万元安排学生住院治疗，将繁重课题重构为适合其节奏的理论分析。",
              reaction: "学生半年后康复并顺利完成毕业答辩，一生将你视作救命恩师；但院系因你‘不听招呼’扣发了你当年的岗位绩效。",
              delta: { resilience: 35, happiness: 30, savings: -30000, social: -20, kinshipGuilt: -20 },
              addTags: ["师德如山", "得罪院系"]
            },
            {
              text: "【遵从学院安排息事宁人，修改原始实验数据仓促包装过关】：为了保住导师资格与团队考评被迫妥协",
              detail: "体制高压下的懦弱逃避。为了不影响课题组考核与个人晋升，违心在未经验证的数据报告上签字盖章。",
              reaction: "事件被迅速掩盖，学科评估保住A类，你被评为年度优秀骨干；但在日后漫长的岁月里，学术造假阴影成了永恒的梦魇。",
              delta: { social: 25, academicCapital: 20, inferiority: 35, resilience: -20, health: -15 },
              addTags: ["学术污点", "心魔深种"]
            }
          ]
        },
        {
          id: "adult_acad_stay_35",
          age: 35,
          stageName: "三十五岁生死关 · 35岁",
          title: "非升即走终极评审与突发性耳聋",
          scene: "三十五岁，三年聘期大限截止。全系二十八位副研究员仅留任两人转为长聘副教授。为了最后冲刺一篇Nature子刊，你连续一个月每天只睡三小时，左耳突然剧烈轰鸣彻底失聪。医生诊断为‘突发性感音神经性耳聋，错过最佳黄金抢救期将永久失聪’；而明天就是校学术委员会的闭门终审答辩！",
          type: "choice",
          choices: [
            {
              text: "【拒绝住院单耳带助听器冲上终审答辩席】：‘这辈子已经押上了三十五年，死也要死在讲台上！’",
              detail: "悲壮的学术狂徒！硬吞下大剂量激素压制晕眩，站在三十位评委面前以雷霆万钧之势宣讲自己的理论模型。",
              reaction: "全票通过终审破格晋升长聘副教授！但左耳永久性听力丧失，在雷鸣般的掌声中，你听到的世界永远少了一半声音。",
              delta: { academicCapital: 40, resilience: 35, health: -35, savings: 50000, inferiority: -10 },
              addTags: ["长聘终身", "残躯封神"]
            },
            {
              text: "【立即遵医嘱住院接受高压氧舱抢救，放弃终审竞聘】：‘没有了健康的肉身，再高的职称不过是一张废纸！’",
              detail: "生死边缘的觉醒。当晚推掉答辩住进神经内科病房，接受两周全封闭激素与高压氧抢救，成功保住了听力。",
              reaction: "虽然遗憾被985解聘，但凭借扎实的论文积累顺利转聘至省属重点大学担任正教授，重获宁静而健康的学者生涯。",
              delta: { health: 35, happiness: 30, academicCapital: 20, social: -15, resilience: 25 },
              addTags: ["留得青山", "从容转场"]
            }
          ]
        },
        {
          id: "adult_acad_stay_38",
          age: 38,
          stageName: "中年深水区 · 38岁",
          title: "国家科技进步奖申报与院士第一完成人暗战",
          scene: "三十八岁，你带领团队历时八年攻克的工业催化材料取得重大突破，拟申报国家科技进步二等奖。校领导携本领域权威院士深夜来到实验室，直截了当摊牌：‘申报材料要把院士的名字列为第一完成人，你在第二位。只要拿下大奖，下届国家杰青名额由院士全力保你。’",
          type: "choice",
          choices: [
            {
              text: "【宁可撤回申报也绝不出让第一完成人】：‘这是我与学生八年的心血结晶，寸土不让！’",
              detail: "学术硬骨头！不惜玉石俱焚也绝不给学阀做嫁衣裳，当场拒绝院士要求，并向科技部奖励办提交独立申明。",
              reaction: "申报虽然被迫撤回，但你在青年学术圈威望登峰造极，学生们誓死追随；该项技术随后直接在民营龙头产业化落地！",
              delta: { rebellion: 40, resilience: 40, social: -30, savings: 300000, inferiority: -25 },
              addTags: ["学术硬骨", "产业化破局"]
            },
            {
              text: "【隐忍让出一作换取院士资源，借力直通国家杰青】：将个人名利融入学术门阀联合体",
              detail: "理智而残酷的政治学者。深知在中国学术界单打独斗寸步难行，用一作署名作为投名状彻底依附院士门阀。",
              reaction: "大奖顺利斩获，次年如约获批国家杰青基金，掌控千万级科研经费；但在庆功宴上，你看着学生失落的眼神默默低头。",
              delta: { academicCapital: 45, social: 35, inferiority: 25, savings: 200000, kinshipGuilt: 20 },
              addTags: ["门阀红利", "心债难偿"]
            }
          ]
        },
        {
          id: "adult_acad_stay_42",
          age: 42,
          stageName: "执掌一方 · 42岁",
          title: "国家重点实验室主任与数亿专项评审围猎",
          scene: "四十二岁，你已荣任省部共建国家重点实验室主任兼学院院长。国家启动两百亿重大专项‘卡脖子’攻关评审，你手握关键评审打分权。多方学术大佬与国企高管登门，以千万级横向课题和院士推荐票为筹码，要求你在评审中对某缺陷方案予以‘优先推荐’。",
          type: "choice",
          choices: [
            {
              text: "【铁面无私一票否决缺陷方案，将资金导向真正硬核团队】：坚守国家科技自立自强的良知底线",
              detail: "国士之风！顶住所有利益诱惑与人情威逼，在评审报告中撰写三十页详实论证，彻底否决空头包装项目。",
              reaction: "为国家挽回数十亿无效科研浪费，支持的硬核团队成功突破核心器件！你虽得罪了一批学阀，却筑牢了国士威望。",
              delta: { cognition: 45, resilience: 40, social: 25, inferiority: -30, savings: -50000 },
              addTags: ["一代国士", "科技脊梁"]
            },
            {
              text: "【顺水推舟搞平衡兼顾各方，换取实验室未来十年的稳定经费】：谙熟中国特色科研资源分发艺术",
              detail: "圆融老辣的学术政客。在红线范围内各打五十大板，让各方大佬均分利益蛋糕，确保自身实验室经费长青。",
              reaction: "实验室斩获五千万科研大楼专项拨款，成为省内标杆；但科研成果逐渐沦为平庸的跟风与指标游戏。",
              delta: { savings: 500000, social: 40, academicCapital: 30, inferiority: 15, resilience: -15 },
              addTags: ["学术官僚", "利益平衡术"]
            }
          ]
        },
        {
          id: "adult_acad_stay_48",
          age: 48,
          stageName: "定局之年 · 48岁",
          title: "冲击中国科学院院士与基础科研十年沉潜抉择",
          scene: "四十八岁，你已入选国家重大杰出人才，站在中国科学院院士增选门槛前。面临抉择：其一，继续带领庞大课题组每年量产数十篇高质量论文、高强度拜会院士评委，全力冲刺院士桂冠；其二，彻底放下指标考核，甘坐十年冷板凳，独自攻关困扰全球学界半个世纪的凝聚态微观机理假说。",
          type: "choice",
          choices: [
            {
              text: "【闭门谢客甘坐冷板凳，独自向世纪科学猜想发起总攻】：‘宁做纯粹的探索者，不做虚浮的学阀！’",
              detail: "学者灵魂的最高升华。辞去行政职务，解散虚浮的庞大团队，独自在简陋自习室推演厚达千页的数理方程。",
              reaction: "八年孤独探索终于在微观量子态拓扑理论取得重大突破，被国际理论物理界誉为‘划时代里程碑’，不鸣则已一鸣惊人！",
              delta: { cognition: 50, academicCapital: 50, happiness: 40, social: -25, resilience: 35 },
              addTags: ["纯粹真理", "万世丰碑"]
            },
            {
              text: "【统筹资源全力运作冲刺院士，登顶中国科学界权力顶峰】：追求制度化学术权力的最高殿堂",
              detail: "志在必得的学术战略家。组织全国数十个顶级实验室联合攻关，以无可挑剔的国家重大战略贡献顺利当选院士。",
              reaction: "成为省内最年轻的两院院士，享副部级待遇，出入国家决策中枢；虽然告别了一线科研推演，但成为科学战略帅才。",
              delta: { social: 50, academicCapital: 45, savings: 1000000, inferiority: -30, health: -20 },
              addTags: ["两院院士", "科学帅才"]
            }
          ]
        },
        {
          id: "adult_acad_stay_55",
          age: 55,
          stageName: "晚晴自省 · 55岁",
          title: "后生可畏的新范式挑战与学阀自省",
          scene: "五十五岁，你作为领域泰斗坐在全国学术年会主旨发言席。一位年仅二十八岁的归国年轻博士在分论坛上，利用全新生成式AI与量子算力，直接推翻了你二十年前奠定并写进全国教材的经典反应动力学假说，全场舆论哗然。",
          type: "choice",
          choices: [
            {
              text: "【大度走上演讲台带头鼓掌，当场宣布修改自己教材定论】：‘后生可畏，科学之幸，民族之幸！’",
              detail: "伟大学者的虚怀若谷！不仅没有动用学阀权力打压后辈，反而当场邀请该年轻学者加入国家重大攻关组，亲自为其背书护航。",
              reaction: "全场爆发出长达五分钟的雷鸣般敬意掌声！你的胸襟被全学界传为佳话，赢得了超越学术本身的永恒崇敬。",
              delta: { happiness: 50, social: 45, cognition: 40, resilience: 30, inferiority: -25 },
              addTags: ["虚怀若谷", "一代宗师"]
            },
            {
              text: "【动用权威话语权在学界封杀该异端学说，维护经典权威】：坚信传统实证体系不可撼动",
              detail: "学术权力的守旧反扑。在期刊编委会和项目评审中对该新模型实施冷冻封锁，严厉捍卫自己构建一生的知识帝国。",
              reaction: "虽然短期内压制了异端声音，但五年后随着国际顶刊全面证实新模型，你的学术权威遭遇雪崩式滑铁卢，晚节大损。",
              delta: { inferiority: 40, academicCapital: -30, happiness: -35, social: -20 },
              addTags: ["固步自封", "晚节暗损"]
            }
          ]
        },
        {
          id: "adult_acad_stay_63",
          age: 63,
          stageName: "荣休离场 · 63岁",
          title: "交出实验室钥匙与运河畔手稿入藏国家图书馆",
          scene: "六十三岁，国家重点实验室荣休交接仪式。你亲手将掌管三十五年的实验室钥匙交到关门弟子手中。漫步在梧桐落叶覆满的校园大道上，国家图书馆发来函件，恳请将你一生写就的八十七本科研手稿与日记永久入藏善本馆。",
          type: "choice",
          choices: [
            {
              text: "【将毕生手稿全额无偿捐赠国家，回归故里撰写《中国科学百年札记》】：‘一生求索，无愧天地与人民！’",
              detail: "圆满安详的大儒风范。回到苏北运河畔老家，在清幽的书斋中为民族科学史留下一笔厚重的精神财富。",
              reaction: "国家领导人亲自发来感谢信，晚年桃李满天下，弟子数人已成各学科领军，你平静从容地迎接着生命的最美黄昏。",
              delta: { happiness: 50, cognition: 45, health: 30, resilience: 35 },
              addTags: ["一代大儒", "精神永驻"]
            },
            {
              text: "【受聘民营高科技巨头首席科学家，继续主导百亿工业产线升级】：退而不休，将毕生知识转化为国民经济硬核动力",
              detail: "老骥伏枥志在千里。拒绝安逸养老，在工业智造第一线继续攻关，解决民生急需的重大装备痛点。",
              reaction: "主导建设的自动化超级产线投产为国家创造上百亿产值，生命在火热的工业浪潮中持续迸发璀璨光芒！",
              delta: { savings: 2000000, social: 40, resilience: 35, health: -15 },
              addTags: ["老骥伏枥", "经世致用"]
            }
          ]
        }
      ];
    }
    // Academic Emigrate (海外终身教职/Tenure-track/常青藤学者)
    return [
      {
        id: "adult_acad_emigrate_28",
        age: 28,
        stageName: "异邦漂泊 · 28岁",
        title: "哈佛/马普所博士后与地下室清贫生活",
        scene: "二十八岁，远赴欧美顶尖学府从事博士后研究。微薄的薪资在昂贵的波士顿/慕尼黑仅够租住阴暗潮湿的半地下室。国内母校发来副教授聘书与安家费，而此时你在顶刊的突破性论文正遭遇匿名审稿人的刻意挑刺拖延，妻子看着漏水的屋顶默默垂泪。",
        type: "choice",
        choices: [
          {
            text: "【咬死牙关在地下室再熬三年，誓要打通国际顶尖实验室通道】：宁可在顶尖学术殿堂受苦，也绝不半途而废！",
            detail: "极致的学术求道者。将生活成本压缩到极致，每天骑破自行车往返实验室，硬生生补齐审稿人要求的海量对照实验。",
            reaction: "论文在《科学》(Science)正刊以第一作者封面发表！全球二十余所顶尖名校同时发来助理教授面试邀约！",
            delta: { academicCapital: 40, cognition: 35, health: -25, savings: -30000, resilience: 30 },
            addTags: ["破茧封神", "科学正刊"]
          },
          {
            text: "【接受国内母校高规格引进回国，直接获聘特聘教授与独立实验室】：选择尊严与家庭安定",
            detail: "务实报国之道。带着海外顶尖研究范式回国，获得两百万启动经费与充足研究生资源，迅速组建独立军团。",
            reaction: "家庭生活条件大幅改善，妻子重现笑颜；在本土土壤上迅速生根发芽，成为国内该细分方向青年领军者。",
            delta: { savings: 300000, happiness: 35, academicCapital: 25, social: 25, health: 15 },
            addTags: ["海归新星", "尊严立足"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "北美Tenure-track助理教授长跑与隐形学术壁垒",
        scene: "三十岁，斩获北美前三十名校Tenure-track教职。然而在申请美国国家科学基金(NSF)时，由于没有欧美老派学术世家的人脉背书，你的本子屡遭打压。学院资深白人教授暗示你：‘加入我的大课题组当协作者，我保你Tenure。’",
        type: "choice",
        choices: [
          {
            text: "【拒绝沦为附庸，在预印本平台开源全部理论独创门派】：打破学术封闭壁垒，向全球同行公开求证！",
            detail: "开源时代的学术普罗米修斯！将未发表的重大猜想推演全文上传arXiv，凭借颠覆性的洞见引发全球理论界自发复核与追捧。",
            reaction: "全球两百位顶尖数学家自发为你背书，NSF被迫组织特批听证会为你注资！你以独立学者姿态傲立常春藤！",
            delta: { academicCapital: 45, rebellion: 35, resilience: 35, social: 20, inferiority: -20 },
            addTags: ["开源先锋", "孤胆学者"]
          },
          {
            text: "【加入资深教授课题组合作共赢，换取充沛的实验资源与护航】：学会融入西方建制派学术网络",
            detail: "务实融入策略。以东方人的谦逊与惊人算力赢得上层学术家族认可，作为共同通讯作者连发高分论文。",
            reaction: "六年聘期毫无悬念地平稳度过，顺利斩获常春藤终身教职；但在核心理论署名上，始终留有一份缺憾。",
            delta: { savings: 150000, academicCapital: 30, social: 30, inferiority: 15 },
            addTags: ["终身教职", "融入建制"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_32",
        age: 32,
        stageName: "风云骤变 · 32岁",
        title: "地缘冷战司法调查与华裔科学家‘中国行动计划’风暴",
        scene: "三十二岁，美国司法部‘中国行动计划’席卷高校，数十名顶尖华裔学者遭到突击搜查甚至被捕。联邦调查局特工突然进驻你的办公室，翻查你十年前与国内母校的一切学术邮件与讲学差旅报销记录，大学校方为求自保暂停了你的实验室权限。",
        type: "choice",
        choices: [
          {
            text: "【重金聘请全美顶级宪法民权律师硬碰硬，誓死捍卫学术清白】：‘科学探索无罪，种族政治迫害必须被清算！’",
            detail: "铁骨铮铮！在法庭与国会听证会上大声抗辩，联合全美华裔学者发起集体诉讼，迫使司法部无罪撤诉！",
            reaction: "洗脱全部莫须有罪名，迫使大学公开向你道歉并赔偿五十万美元；你成为华裔学者维权的英雄旗帜！",
            delta: { resilience: 45, cognition: 35, social: 40, savings: -100000, inferiority: -30 },
            addTags: ["维权先锋", "浩然正气"]
          },
          {
            text: "【愤然辞去美方教职，接受欧洲或新加坡顶尖高校橄榄枝搬迁】：‘科学不应被政治绑架，此处不留爷自有留爷处！’",
            detail: "决绝的用脚投票。带领全部研究生与实验设备整建制迁往瑞士苏黎世联邦理工或新加坡国立大学，建立中立堡垒。",
            reaction: "在欧洲中立包容的环境下迎来科研大爆发，三年内连克两项重大工程难题，成为欧洲科学院新星！",
            delta: { academicCapital: 40, happiness: 35, savings: 100000, resilience: 30, rebellion: 25 },
            addTags: ["转战欧罗巴", "中立堡垒"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "终身正教授Tenure终审与老家父亲病危两难",
        scene: "三十五岁，哈佛/MIT终身正教授终审答辩周。同一时刻，运河老家父亲因肺癌晚期弥留病榻，姐姐泣不成声发来视频：‘爸快不行了，一直在念你的名字，你能回来看最后一眼吗？’若离开答辩，终身教职评估将自动顺延并视为放弃。",
        type: "choice",
        choices: [
          {
            text: "【毅然放弃教职答辩连夜赶回中国老宅，跪在父亲病榻前送终】：‘虚名随时可挣，亲爹只有一次！’",
            detail: "至孝的人性觉醒。将名利踩在脚下，跨越一万公里回到运河畔老宅，握着父亲冰冷粗糙的手陪伴其咽下最后一口气。",
            reaction: "在父亲坟头长跪三日，内心得到无尽洗涤；回国后直接加盟国家顶尖实验室，以更深沉的人生定力重铸科研伟业！",
            delta: { kinshipGuilt: -50, happiness: 35, resilience: 40, social: 20, savings: -50000 },
            addTags: ["至孝大仁", "心安归处"]
          },
          {
            text: "【强忍痛断肝肠完成终身教职答辩，全票斩获讲席教席】：以最辉煌的学术成就告慰父亲在天之灵",
            detail: "极致的忍耐与克制。流着血泪在考评委员会前展现惊世才华，获评全美最年轻华人讲席教授，随后在异国公寓嚎啕大哭。",
            reaction: "奠定了国际学术泰斗地位，在父亲老家以其名字设立百万助学基金；但每逢清明，内心的空洞与剧痛永无止息。",
            delta: { academicCapital: 50, social: 45, kinshipGuilt: 50, inferiority: 20, savings: 200000 },
            addTags: ["登顶泰斗", "抱憾终身"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_38",
        age: 38,
        stageName: "深水博弈 · 38岁",
        title: "掌舵欧洲核子中心CERN国际大科学组与诺奖猜想",
        scene: "三十八岁，作为唯一华人科学家出任欧洲核子中心或大型天文台国际合作组首席科学家。你们捕获到了疑似超出标准模型的新玻色子异常信号，是立刻向全球公布分享发现，还是按惯例封锁数据待自己团队彻底确证以锁定诺奖一作？",
        type: "choice",
        choices: [
          {
            text: "【秉持全人类共享精神即刻向全球开源全部原始碰撞数据】：推动全人类物理学界协同破解宇宙密码",
            detail: "大科学家的崇高胸襟！打破狭隘的团队私利，向全球数百个独立科研团队开放全部PB级原始数据。",
            reaction: "全球物理学家在半年内联合证实了超对称粒子假说，你被公认为该世纪发现的灵魂总指挥，受到全人类敬仰！",
            delta: { cognition: 50, academicCapital: 50, social: 45, inferiority: -35 },
            addTags: ["宇宙求索", "全人类先锋"]
          },
          {
            text: "【封锁核心数据三年闭门独自推演，全力冲刺诺贝尔物理学奖独立一作】：以极客狠劲追求个人的科学巅峰",
            detail: "科学史上的狂徒野心。带领核心十二人团队封闭在阿尔卑斯地下掩体内日夜推演，誓要以单一团队锁定历史桂冠。",
            reaction: "团队最终抢先发表确凿证明独享科学突破奖三百万美元大奖，诺奖大热；但在国际合作组内引发了旷日持久的伦理纷争。",
            delta: { savings: 1000000, academicCapital: 45, inferiority: 20, resilience: 30, health: -20 },
            addTags: ["科学巨擘", "争锋争议"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_42",
        age: 42,
        stageName: "海外执缰 · 42岁",
        title: "当选美国国家科学院院士与跨国青年科学家扶持",
        scene: "四十二岁，以全票当选美国国家科学院外籍/正院士及英国皇家学会外籍院士。你站在全球科学权力的最顶端，世界顶尖风投和跨国制药巨头捧着上亿美元支票，希望将你名下的基础理论专利买断进行商业垄断。",
        type: "choice",
        choices: [
          {
            text: "【严词拒绝跨国垄断买断，将核心专利放入全球公共健康公共池】：确保第三世界穷人看得起病吃得起药",
            detail: "真正的科学圣徒！与世卫组织合作建立普惠药品专利池，迫使抗癌新药价格下降95%，拯救全球数百万贫苦患者生命！",
            reaction: "荣获诺贝尔和平奖与生理学奖双提名，被联合国誉为‘当代白求恩与居里夫人’，名垂人类文明史册！",
            delta: { happiness: 50, cognition: 50, social: 50, resilience: 40, savings: -200000 },
            addTags: ["科学圣徒", "普度众生"]
          },
          {
            text: "【接受商业买断建立跨国生物科技巨头并上市敲钟】：将理论转化为现实财富与商业帝国",
            detail: "现代科学资本主义的赢家。创办独角兽纳斯达克挂牌，身价超十亿美元，建立全美最大私人科学研究所。",
            reaction: "坐拥亿万身家，出入私人飞机与游艇，成为科学界的财富神话；但在深夜，偶尔会怀念当年那个纯粹做题的苏北少年。",
            delta: { savings: 5000000, social: 45, academicCapital: 40, inferiority: -10 },
            addTags: ["科学百亿富豪", "资本巨鳄"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_48",
        age: 48,
        stageName: "定局全球 · 48岁",
        title: "普林斯顿高等研究院终身爱因斯坦讲席与理论瓶颈",
        scene: "四十八岁，受聘为普林斯顿高等研究院终身爱因斯坦讲席教授，入驻当年爱因斯坦与哥德尔思考宇宙的办公室。然而，你在这片纯粹的理性圣殿里遭遇了长达五年的研究瓶颈，新一代年轻学者提出了更具颠覆性的量子引力理论。",
        type: "choice",
        choices: [
          {
            text: "【放下过去一切荣誉，以学徒姿态深入钻研年轻一代的全新数学范式】：‘在浩瀚真理面前，我们永远都是孩子！’",
            detail: "大智慧的空杯心态。每天与二十岁的年轻学者同坐草坪讨论，在全新几何分析领域重新点燃智慧火花。",
            reaction: "历经三年融合诞生统一场论关键拼图，再次震惊全球理论界！你的学术生命焕发第二春，超凡入圣！",
            delta: { cognition: 50, academicCapital: 50, happiness: 45, resilience: 35 },
            addTags: ["超凡入圣", "真理赤子"]
          },
          {
            text: "【转向科学哲学与文明反思著述，成为全球思想界一代宗师】：将毕生科学求索升华为人文智慧",
            detail: "从自然科学家走向思想启蒙者。撰写《人类理性边界与宇宙秩序之美》，探讨科技与文明命运。",
            reaction: "专著在全球畅销数千万册，成为多国元首与思想领袖必读书目，享有崇高的全人类精神导师地位。",
            delta: { social: 50, happiness: 45, cognition: 45, savings: 500000 },
            addTags: ["文明导师", "哲学泰斗"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_55",
        age: 55,
        stageName: "晚晴沉淀 · 55岁",
        title: "全球华人科学家联合会创办与跨越冷战的学术桥梁",
        scene: "五十五岁，地缘政治鸿沟进一步加深，东西方学术交流陷入前所未有的冰封。你在中立国瑞士牵头创立全球华人科学家和平科学基金，力求在风暴中维持东西方青年的学术合作纽带。",
        type: "choice",
        choices: [
          {
            text: "【顶住各方政治压力坚持推进联合培养计划，每年资助百位中外博士跨国研学】：以科学作为和平终极桥梁",
            detail: "大无畏的历史担当。多次在国际媒体公开发声反对脱钩，用无可挑剔的声望搭建起唯一的跨国科学避风港。",
            reaction: "成千上万跨国学者因你的庇护得以免受政治波及，被国际学界誉为‘新时代的科学和平使者’！",
            delta: { social: 50, resilience: 45, cognition: 45, happiness: 40 },
            addTags: ["和平使者", "庇护后辈"]
          },
          {
            text: "【在阿尔卑斯山麓建立私立自然哲学冥想庄园，过深居简出的隐士生活】：远离一切世俗政治与纷扰",
            detail: "彻底的隐逸从容。在雪山与冰川的环抱中，每日散步、观星、演奏莫扎特奏鸣曲，与天地精神往来。",
            reaction: "心境达到‘物我两忘’的极致超脱，身体各器官指标逆龄如四十岁，享受至美纯净的晚晴时光。",
            delta: { health: 45, happiness: 50, resilience: 30, inferiority: -30 },
            addTags: ["雪山隐者", "物我两忘"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_63",
        age: 63,
        stageName: "荣休离场 · 63岁",
        title: "普林斯顿林荫道的落日与给故土少年的一封信",
        scene: "六十三岁，正式从普林斯顿大学荣休。收拾书房时，你从抽屉最深处翻出了当年在苏北农村高中用铅笔密密麻麻写满公式的草稿纸。夕阳穿过林荫道洒在桌前，你在羊皮纸上写下一篇给全中国县城寒门少年的公开信：《通往星辰大海的路上，没有一道题是白做的》。",
        type: "choice",
        choices: [
          {
            text: "【将公开信全文发布于全球媒体，设立永久性寒门科学逐梦信托】：‘孩子们，大胆向星空仰望吧，我们曾走过你们的路！’",
            detail: "最动人的生命回响。将一生积蓄设立助学信托，公开信感动了数以千万计的高中生与青年学者，点燃了无数寒门学子的科学梦想。",
            reaction: "全网数亿次转发，故乡老家为你立起‘星汉灿烂’文化石碑，你的一生成为人类文明星河中最璀璨的做题家逆袭史诗！",
            delta: { happiness: 50, cognition: 50, social: 50, resilience: 40 },
            addTags: ["星海灯塔", "圆满丰碑"]
          },
          {
            text: "【将草稿纸烧成灰烬撒入运河寄回的泥土中，合眼静坐】：‘尘归尘，土归土，所有的求索皆已化作内心的宁静。’",
            detail: "大音希声的大智慧。不求任何声名与回响，在寂静的暮色中完成了与自我、与宿命的终极和解。",
            reaction: "精神超脱进入大圆满境地，于无声处听惊雷，在从容中走完波澜壮阔而又归于平淡的一生。",
            delta: { happiness: 50, health: 40, resilience: 40, inferiority: -40 },
            addTags: ["大圆满", "无声史诗"]
          }
        ]
      }
    ];
  }


  // =========================================================================
  // 4. 大国工匠 / 实体商贸 / 技工自立赛道 (Artisan & Commercial Subtrack)
  // =========================================================================
  if (careerSubtrack === "artisan" || careerSubtrack === "commercial") {
    if (chosenPath === "stay") {
      return [
        {
          id: "adult_artisan_stay_28",
          age: 28,
          stageName: "手艺立足 · 28岁",
          title: "全国数控机修大比武与私营老板高薪挖角",
          scene: "二十八岁，你凭借扎实的实操绝活在全国数控精密机修大比武中斩获一等奖，声名大噪。国企单位承诺为你解决中级技师编制，但月薪只有四千五；当地一家民营精密模具老板开着宝马堵在车间门口，直接拍下一张五十万支票与干股分红：‘小兄弟，跟着我干，三年在省城买大平层！’",
          type: "choice",
          choices: [
            {
              text: "【毅然跳槽加盟民企工坊，以技术入股拼搏财富自由】：‘靠自己的双手吃饭，不贪虚浮的铁饭碗！’",
              detail: "敢拼敢闯的蓝领实干家。告别国企死气沉沉的论资排辈，入驻民企车间夜以继日改良模具冲压工艺。",
              reaction: "两年内为工厂攻克数十个高难度订单，分红超百万，在省城全款购入新房；但每天在重金属粉尘中劳作，落下气管炎病根。",
              delta: { savings: 300000, resilience: 30, health: -20, social: 25, inferiority: -20 },
              addTags: ["技术入股", "蓝领新贵"]
            },
            {
              text: "【坚守国企生产一线，稳扎稳打冲刺特级技师与劳模】：信奉大国重器的平台底盘与体制安全感",
              detail: "耐得住寂寞的老黄牛。留在国企核心军工车间，悉心琢磨航天军工关键构件的微米级加工公差。",
              reaction: "虽然工资增长缓慢，但你先后获评省劳动模范与首席青年技师，在重工体系内拥有极高的技术尊严与分房保障。",
              delta: { social: 30, resilience: 25, kinshipGuilt: -20, savings: 30000, academicCapital: 20 },
              addTags: ["大国工匠苗子", "国企中坚"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_30",
          age: 30,
          stageName: "三十而立 · 30岁",
          title: "自立门户创办精密机械厂与下游恶意欠薪风波",
          scene: "三十岁，你带领几名同门师兄弟在城郊工业园创办了精密零部件加工厂。然而接下的一笔五百万上市公司大单，交货后对方却以‘行业惯例’为由恶意拖欠两百八十万货款，承兑汇票全部逾期。年关将至，二十多名工人在厂门口等待发工资回家过年，供货商甚至叫来货车准备拉走你的核心机床抵债。",
          type: "choice",
          choices: [
            {
              text: "【抵押个人房产借高利贷垫资，咬牙全额发清工人工资】：‘哪怕自己破产跳楼，绝不欠工人一分血汗钱！’",
              detail: "震撼人心的企业家风骨！连夜将婚房抵押筹措两百万现金，在大年三十下午将厚厚的工钱一笔笔发到工人手上。",
              reaction: "工人全体痛哭流涕发誓过完年哪怕不要工资也跟着你干到底！工厂信誉一鸣惊人，迎来了生死转机！",
              delta: { resilience: 40, social: 35, savings: -200000, health: -20, inferiority: -25 },
              addTags: ["信义如铁", "患难与共"]
            },
            {
              text: "【带领受害供应商联合申请财产保全，向法院申请强制执行】：依法维权，绝不充当冤大头",
              detail: "成熟理智的商海老手。不盲目扛下全部债务，连夜聘请顶尖商事律师查封上市公司账户与资产，迫使对方在节前签署分期兑付和解。",
              reaction: "成功追回70%货款平息挤兑危机，工厂渡过生死劫；但与大客户彻底撕破脸，面临重新开拓市场的巨大压力。",
              delta: { cognition: 30, savings: 100000, resilience: 30, social: 15 },
              addTags: ["商海搏杀", "沉着应变"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_32",
          age: 32,
          stageName: "职场暴风雨 · 32岁",
          title: "得意门徒被对手高薪挖角窃取核心图纸",
          scene: "三十二岁，你一手带了五年的得意大徒弟，突然在深夜离职并带走了你历时三年调试成功的五轴数控精密曲面切削宏程序与核心客户清单。对手民营大厂凭借偷来的技术低价抢走了你50%的订单，工厂产能骤降濒临停产，徒弟还在行业群里污蔑你‘压榨学徒苛扣提成’。",
          type: "choice",
          choices: [
            {
              text: "【化悲愤为动力闭关两个月，研发全新超精密复合切削算法】：‘能被偷走的都是昨天的技术，老子永远在明天！’",
              detail: "真正手艺大师的降维打击！不与宵小打口水战，闭关在车间吃住两个月，将加工精度从丝级推到亚微米级，形成代差优势。",
              reaction: "全新技术精度提升一个量级，被国内航天院所指定为唯一特许供应商，订单暴涨翻倍，对手低价模仿反而因废品率过高赔光底裤！",
              delta: { cognition: 40, resilience: 40, savings: 400000, health: -25, inferiority: -30 },
              addTags: ["降维打击", "一代神匠"]
            },
            {
              text: "【搜集电子物证依法提请公安立案，以侵犯商业秘密罪铁腕送徒弟入狱】：守住商业法理底线",
              detail: "眼里容不下背叛！调取服务器日志与门禁监控，固定完备的商业秘密侵权链条，依法追究刑事责任。",
              reaction: "背叛者被依法判刑三年，行业震慑效果极佳；虽然夺回了部分赔偿，但亲手将徒弟送进监狱让你内心苍凉落寞。",
              delta: { resilience: 35, savings: 200000, social: 20, happiness: -20, kinshipGuilt: 15 },
              addTags: ["铁面执法", "秋风萧瑟"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_35",
          age: 35,
          stageName: "三十五岁生死劫 · 35岁",
          title: "产业数智化转型生死抉择与两千万重债",
          scene: "三十五岁，传统低端机械加工利润见底，全国数智化转型大浪淘沙。引进德日进口五轴联动加工中心与工业机器人需要贷款两千五百万，年利息高达百万。若不转型，传统订单三年内必然枯竭；若转型失败，全家将永世背负巨额债务沦为老赖。",
          type: "choice",
          choices: [
            {
              text: "【赌上全厂身家签下融资租赁，全力转型军工与医疗精密制造】：‘实业人宁可站着死在冲锋路上，绝不躺着等死！’",
              detail: "英雄般的豪赌！带领二十名骨干通宵钻研进口五轴设备的全英文参数与编程宏指令，连续攻克人工髋关节与航天舵机精密壳体。",
              reaction: "转型大获成功！顺利打入三甲医疗与中国商飞供应链，年产值冲破八千万，跻身国家级‘专精特新小巨人’企业！",
              delta: { savings: 1000000, resilience: 45, social: 35, health: -25, inferiority: -30 },
              addTags: ["专精特新", "绝地逆袭"]
            },
            {
              text: "【保持稳妥拒绝巨额负债，转型做工业机床专业大修与二手翻新维保】：依靠深厚经验吃百家饭",
              detail: "务实自守的匠人定力。看透了资本泡沫，利用精湛的设备诊断与修旧利废手艺，为周边上百家制造企业提供托底服务。",
              reaction: "虽然没有数千万的产值神话，但工厂现金流稳健充沛无一分负债，家庭生活衣食无忧其乐融融。",
              delta: { savings: 300000, happiness: 35, health: 25, resilience: 25, social: 15 },
              addTags: ["稳如泰山", "手艺长青"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_38",
          age: 38,
          stageName: "中年深水区 · 38岁",
          title: "跨国工业巨头溢价三倍恶意收购与卡脖子反抗",
          scene: "三十八岁，你的工厂在微型液压伺服阀制造领域打破国外三十年垄断。德国跨国巨头开出三亿元天价全资收购要约，附加条款是：全额买断所有核心专利并关闭国内自主研发线，聘请你为大中华区名誉顾问。若拒绝，外资将利用全球专利诉讼在海外所有市场围剿你。",
          type: "choice",
          choices: [
            {
              text: "【毅然撕毁收购协议，联合国内高校发起专利反垄断反击战】：‘老祖宗的手艺与工业尊严，三千亿也不卖！’",
              detail: "真正的民族脊梁！拒绝三个亿财富自由诱惑，联合国家知识产权局打赢国际专利持久战，彻底粉碎外资垄断企图。",
              reaction: "伺服阀全面列装国家重大装备工程，你被工信部授予制造业单项冠军示范企业，在人民大会堂受到国家表彰！",
              delta: { resilience: 50, cognition: 40, social: 45, inferiority: -40, savings: 500000 },
              addTags: ["民族脊梁", "单项冠军"]
            },
            {
              text: "【接受收购协议套现三亿离场，转型做高端制造业天使投资人】：财富变现与阶层跃迁的终极通道",
              detail: "冷酷清醒的资本选择。二十年手艺摸爬滚打落下浑身职业病，选择在顶峰套现三个亿，让全家十代人彻底财务自由。",
              reaction: "全家搬入省城湖畔独栋别墅，出入私人高尔夫俱乐部；但在新闻联播看到那款伺服阀被换成外资车标时，内心隐隐作痛。",
              delta: { savings: 15000000, social: 35, health: 25, inferiority: -10, kinshipGuilt: 20 },
              addTags: ["亿万富豪", "资本离场"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_42",
          age: 42,
          stageName: "执掌一方 · 42岁",
          title: "工伤事故重度截指与老家亲戚围堵逼宫",
          scene: "四十二岁，车间一名重度违章操作的冲压工被卷入飞轮不幸截断三根手指。伤者恰好是老家亲舅舅的二儿子。舅舅纠集了老家三十多名亲属冲进厂长办公室打砸设备，索要五百万‘私了赔偿’，扬言‘不给钱就回村挖你家祖坟、断子绝孙’。",
          type: "choice",
          choices: [
            {
              text: "【铁面依规申报工伤走司法鉴定，自掏二十万安排最好假肢康复】：公私分明，决不在恐吓前低头",
              detail: "坚如磐石的现代企业原则。依法启动工伤理赔与司法程序，同时念及亲情自费送表弟去上海华山医院做神经修复手术。",
              reaction: "表弟安装智能仿生手康复后被安排在后勤质检岗，亲属自知理亏作鸟兽散；全厂纪律严明树立起不可动摇的法治威信。",
              delta: { resilience: 40, cognition: 30, kinshipGuilt: 30, savings: -200000, inferiority: -20 },
              addTags: ["铁腕厂长", "恩威并施"]
            },
            {
              text: "【息事宁人按亲情全额私了赔偿，让出部分外包车间给老家亲友管理】：为了宗族和睦选择忍让妥协",
              detail: "被乡土宗族绑架的悲哀。支付天价赔偿并将辅料车间承包给亲戚，换取老家祖坟安宁与父母的名声。",
              reaction: "亲友们变本加厉中饱私囊导致辅料质量严重下滑，险些造成重大产品召回危机，工厂内部管理濒临瓦解。",
              delta: { savings: -1000000, inferiority: 35, resilience: -25, happiness: -25, social: 15 },
              addTags: ["宗族蚕食", "管理溃烂"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_48",
          age: 48,
          stageName: "定局之年 · 48岁",
          title: "中华大国工匠殊荣与神舟飞船超微精密手工研磨",
          scene: "四十八岁，国家重大载人航天工程遭遇瓶颈：返回舱高压微泄漏气动核心组件，其配合曲面粗糙度要求达到纳米级，全球任何顶级数控机床都无法消除微观刀纹。国家航天局八院专机将你接到基地现场：‘陈师傅，全中国的希望都在您这双手上了！’",
          type: "choice",
          choices: [
            {
              text: "【凭借四十年肌肉记忆屏住呼吸，以微米级油石手工研磨攻克极限】：‘用中国手艺护佑英雄航天员平安归来！’",
              detail: "惊天地泣鬼神的巅峰技艺！连续七天七夜在显微镜下用特制研磨膏与天然羊皮手工修正，将光洁度推到物理极限！",
              reaction: "返回舱气密性达到史上最高标准，飞船圆满着陆！中央电视台《大国工匠》为你拍摄专题纪录片，荣获中华技能大奖！",
              delta: { cognition: 50, resilience: 50, social: 50, inferiority: -40, health: -20 },
              addTags: ["大国工匠", "国家功臣"]
            },
            {
              text: "【指导青年技术梯队建立数字化纳米电化学抛光工作站】：将个人玄学经验转化为可标准复制的工业系统",
              detail: "大格局的工业导师。不仅自己操刀，还将手工手感参数化解构为力学传感器算法，打造自动化纳米研磨机器人。",
              reaction: "为国家建立起首条航天超精密构件数字化生产线，荣获国家技术发明二等奖，带领中国工匠团队全面走向世界舞台！",
              delta: { cognition: 50, academicCapital: 40, social: 45, resilience: 40, savings: 500000 },
              addTags: ["一代宗师", "工业智库"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_55",
          age: 55,
          stageName: "晚晴担当 · 55岁",
          title: "实体供应链全球出海与开办免费技工职业学院",
          scene: "五十五岁，中国制造业面临全球贸易壁垒与产能出海。你的智能制造集团在越南和墨西哥建立超级工厂。回望半生奋斗，面对苏北老家无数初中毕业无所事事的年轻后生，你决定在运河畔投资三亿元创办一所全免费的‘大国工匠现代现代学徒制职业学院’。",
          type: "choice",
          choices: [
            {
              text: "【毅然注资三亿建校，亲任终身荣誉院长亲自上讲台授课】：‘让每一个平民子弟靠一身真手艺堂堂正正立足天地间！’",
              detail: "最深沉的桑梓反哺。实行免学费包吃包住包分配，将顶尖五轴机床搬进教室，手把手培育新一代顶尖技术工人。",
              reaction: "学院成为全国职业教育黄埔军校，毕业生被全国高端军工民企抢聘一空！老家全县人民将你奉为当代实业救国楷模！",
              delta: { happiness: 50, social: 50, resilience: 45, cognition: 40, savings: -1000000 },
              addTags: ["功德无量", "职教黄埔"]
            },
            {
              text: "【集中资金在东南亚全面扩张实业版图，打造跨国汽配独角兽】：将全部精力倾注于全球商业征战",
              detail: "老辣的跨国实业巨头。在墨西哥和匈牙利布局八大产业基地，成为特斯拉与大众全球一级核心零部件供应商。",
              reaction: "集团年营业额突破百亿大关，登顶全球行业隐形冠军宝座；虽然远离故土，但打造了中国民营工业出海的闪亮名片。",
              delta: { savings: 20000000, social: 45, resilience: 40, health: -25 },
              addTags: ["全球工业巨头", "实业雄狮"]
            }
          ]
        },
        {
          id: "adult_artisan_stay_63",
          age: 63,
          stageName: "荣休离场 · 63岁",
          title: "黑灯工厂里的油石与运河畔铁树开花",
          scene: "六十三岁，坐在完全由工业AI与机器人自主运转的百亩‘黑灯工厂’二楼控制台。窗外运河波光粼粼，当年十六岁刚学徒时师傅送给你的那块泛黑油石静静躺在天鹅绒盒子里。几位满脸白发的徒弟陪你坐在阳光下，喝着老家大麦茶，听机器有节奏的轰鸣。",
          type: "choice",
          choices: [
            {
              text: "【将那块油石传承给学院最年轻的十八岁优秀学徒】：‘记住，机器再聪明，匠人的良心与温度永远无可替代！’",
              detail: "薪火相传的历史时刻。在全校开学典礼上完成两代工匠的精神授受，现场数千名年轻学子热泪盈眶起立鼓掌。",
              reaction: "内心达到前所未有的纯粹与圆满。一个从苏北运河泥泞里走出的农家子弟，用一双长满老茧的手谱写了无愧天地的辉煌史诗！",
              delta: { happiness: 50, health: 35, resilience: 45, cognition: 45 },
              addTags: ["薪火永传", "圆满大工匠"]
            },
            {
              text: "【微笑合眼在摇椅上安详打盹，听着车间熟悉的轰鸣声安享晚晴】：‘干了一辈子，这一世，值了！’",
              detail: "大巧若拙的至高自洽。不言不语，在工业交响乐中静静品味劳动创造带来的尊严与宁静，平静从容走向人生终局。",
              reaction: "身心彻底放松，享受儿孙绕膝与弟子敬仰的天伦之乐，一生清白坦荡，立德立功立言。",
              delta: { health: 45, happiness: 50, resilience: 40, inferiority: -40 },
              addTags: ["大巧若拙", "此生无悔"]
            }
          ]
        }
      ];
    }
    // Artisan Emigrate (海外技术移民/跨国技工/海外独立工坊)
    return [
      {
        id: "adult_artisan_emigrate_28",
        age: 28,
        stageName: "异邦闯荡 · 28岁",
        title: "澳洲/德国特种机修技工绿卡与语言文化壁垒",
        scene: "二十八岁，你凭借顶尖焊工与数控精密加工技术，通过紧缺技能签证登陆澳大利亚或德国。虽然时薪折合人民币高达四百元，但在纯西人车间里，微小的英语专业俚语误解都会招致当地老技工的白眼与冷嘲热讽。",
        type: "choice",
        choices: [
          {
            text: "【不声不响用一毫米焊缝与零误差工件狠狠打服全场】：‘技术行不行，工件拿到显微镜下一目了然！’",
            detail: "华人工匠的硬核实力反击！用完美如鱼鳞般的氩弧焊缝和毫无瑕疵的复杂构件让所有挑刺的洋工长当场闭嘴惊叹。",
            reaction: "当月被提拔为车间技师带头人，薪资翻倍；当地工会老技工纷纷主动找你递烟请教焊接手法，赢得全场敬重！",
            delta: { resilience: 35, savings: 200000, social: 30, inferiority: -30, health: -15 },
            addTags: ["技惊四座", "赢得尊严"]
          },
          {
            text: "【白天车间干体力，夜晚社区大学疯狂恶补语言融入当地文化】：‘不仅手艺要硬，语言更要成为自己的武器！’",
            detail: "全面融入型奋斗者。耐下性子苦练行业德语/英语，积极参加社区志愿活动，迅速跨越文化壁垒。",
            reaction: "不仅顺利考取当地特级技工最高执业执照，还成为新移民技术援助协会理事，在当地华人社区树立了极高威望。",
            delta: { cognition: 35, social: 35, resilience: 30, savings: 100000, happiness: 20 },
            addTags: ["跨越壁垒", "全面融入"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "斩获欧美红印特级资质与创办独立高端汽修工坊",
        scene: "三十岁，全额斩获欧美最高等级‘红印认证’（Red Seal）大师级执照。面临抉择：是继续在大型矿业重机集团享受年薪二十万澳币的优渥高薪，还是掏空积蓄在墨尔本或多伦多创办属于华人自己的高端精密机械与特种车辆改装工坊？",
        type: "choice",
        choices: [
          {
            text: "【抵押积蓄在城郊创办独立高端改装与精密定制工坊】：‘不做一辈子打工仔，做拥有自己招牌的手艺主人！’",
            detail: "敢于冒险的实业家。引入国内先进的数控机床与激光清洗设备，专攻欧美高端经典老爷车修复与特种越野车重度改装。",
            reaction: "工坊凭借精湛的工艺与极致的性价比引爆全城改装圈，本地老外车主排队预约，首年营业额突破百万美元！",
            delta: { savings: 300000, cognition: 35, resilience: 35, rebellion: 30, inferiority: -25 },
            addTags: ["独立工坊", "商海立足"]
          },
          {
            text: "【留在大集团晋升重型矿山机械首席维保督导】：享受高福利确定性与大把悠闲假期",
            detail: "知足常乐的现代生活方式。每天工作六小时，享受长达四个月的带薪年假，在海边买下大院子钓鱼冲浪。",
            reaction: "生活安逸舒适如神仙眷侣，父母来到澳洲养老夸赞连连；虽然失去了成为亿万富豪的机会，但生活充满了阳光与海风。",
            delta: { health: 35, happiness: 40, savings: 150000, resilience: 20 },
            addTags: ["海风悠闲", "生活赢家"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_32",
        age: 32,
        stageName: "风暴来袭 · 32岁",
        title: "当地工会垄断排挤与反华商业暗算风波",
        scene: "三十二岁，你的工坊规模迅速扩大威胁到了当地西人传统同行的垄断利益。当地工会与质检部门以‘环保排污超标与无证设备改装’为由突击查封你的车间并开出五十万澳元天价罚单，企图迫使你关门破产。",
        type: "choice",
        choices: [
          {
            text: "【聘请顶尖商事律师反告地方工会不正当竞争与种族歧视】：‘法治国家讲证据，华人绝不是待宰的羔羊！’",
            detail: "铁腕维权！搜集当地西人同行同样排污却免罚的双标录像，在主流媒体公开发起抗议，迫使法官判定罚单无效！",
            reaction: "官司大获全胜不仅免除罚款，还获赔十五万名誉损失！你成为当地少数族裔商户竞相敬仰的抗争领袖！",
            delta: { resilience: 45, social: 40, cognition: 30, savings: 150000, inferiority: -30 },
            addTags: ["铁腕反击", "名动社区"]
          },
          {
            text: "【彻底推进绿色全封闭环保升级，将工坊打造成全州模范车间】：以无可挑剔的极致合规令对手哑口无言",
            detail: "大智慧的化解之道。不打无休止的口水战，投资三十万引进世界最顶级的负压除尘除味系统与机器人喷涂线。",
            reaction: "车间被州政府评选为全澳年度绿色制造标杆并获得州长环保特别补贴，对手只能灰溜溜撤诉，声誉攀上顶峰！",
            delta: { cognition: 40, savings: 200000, resilience: 35, social: 30 },
            addTags: ["绿色标杆", "以柔克刚"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "跨国供应链断裂危机与联手国内老家产业自救",
        scene: "三十五岁，全球供应链遭遇地缘海运危机，欧美本土零部件价格暴涨五倍且交期延宕半年。你的数十个改装大单面临巨额违约金追索。此时国内老家苏北精密机械园区正是产能充沛亟待出海。",
        type: "choice",
        choices: [
          {
            text: "【打通老家运河制造基地跨境直通仓，建立定制直供链】：‘引家乡之水，解异邦之渴，互利共赢！’",
            detail: "跨国资源整合的大手笔！回老家与当年的同门师兄弟签署排他协议，将欧美精密图纸发回老家数控群快速打样空运交付。",
            reaction: "成本比本地降低70%，交期缩短三分之二！不仅彻底救活海外工坊，还为老家小镇创造了上百个高薪出口就业岗位！",
            delta: { savings: 600000, cognition: 45, social: 40, kinshipGuilt: -30, resilience: 35 },
            addTags: ["反哺桑梓", "跨境通途"]
          },
          {
            text: "【在异邦收缩规模只接超高客单价顶级豪车定制】：将工坊全面转型为小而美的顶级手工艺术工作室",
            detail: "向艺术品化深耕。不再参与批量改装竞争，专为全球富豪手工打造定制全铝合金超跑底盘，单台溢价数十万美元。",
            reaction: "一年只需完成三个超级订单即可维持数百万净利，出入圆石滩优雅车展，成为全球顶级车坛名匠。",
            delta: { savings: 800000, social: 35, happiness: 35, health: 25 },
            addTags: ["圆石滩名匠", "超逸自足"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_38",
        age: 38,
        stageName: "深水博弈 · 38岁",
        title: "全球顶级改装品牌鸣锣上市与父母拒迁异邦",
        scene: "三十八岁，你的特种机械改装品牌在澳洲/北美成功融资并开启全球连锁扩张。你在悉尼海湾买下两千平米海景庄园，准备接运河老家的父母永久移居享福；然而父母在海景房住了一个月便哭着要回国：‘这里连个说话的人都没有，出门像坐牢，我们要回运河老宅！’",
        type: "choice",
        choices: [
          {
            text: "【顺从父母心愿安排其回国安享晚年，设立全职医疗保姆团队悉心照料】：‘不强加自己的好，孝顺在于顺应亲心’",
            detail: "真正通达的大孝。为老家父母翻建高规格自建养老洋楼，配备两名全职护工和家庭医生，自己每年定期回国长住陪伴。",
            reaction: "父母在老家邻里面前满面红光，逢人便夸儿子懂事体贴；两代人皆得其所，内心再无负疚之累。",
            delta: { kinshipGuilt: -40, happiness: 45, savings: -100000, resilience: 30 },
            addTags: ["顺心大孝", "兼顾两全"]
          },
          {
            text: "【强行将父母留在身边，通过在后院开垦菜地与结识华人排解寂寞】：坚持两代人必须生活在一起",
            detail: "传统中国式聚居执念。在悉尼豪宅草坪上为母亲挖出三亩菜地，天天带父亲去华人超市与唐人街茶馆下象棋。",
            reaction: "父母虽然逐渐适应了环境，但每逢风雨交加之夜，老人对着太平洋的方向长吁短叹，故土难离的根始终在痛。",
            delta: { kinshipGuilt: 25, happiness: -15, resilience: 20, social: 25 },
            addTags: ["乡愁难断", "执念同堂"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_42",
        age: 42,
        stageName: "海外执缰 · 42岁",
        title: "当选全澳机械制造工会首位华人主席",
        scene: "四十二岁，凭借四十年来建立的无懈可击的技术威望与上千名白人、亚裔蓝领雇员的鼎力支持，你作为首位华人候选人竞选全澳机械制造联合工业协会（AMWU）副主席。面临传统保守势力的暗中抹黑与刁难。",
        type: "choice",
        choices: [
          {
            text: "【以无可挑剔的产业法案与跨种族劳工福祉赢得全票当选】：‘技术没有国界，劳动者的尊严与安全至高无上！’",
            detail: "打破历史的华人领袖！亲自撰写保护学徒工待遇与特种作业防尘防爆的国家级行业标准，受到全国蓝领全体拥戴！",
            reaction: "历史性全票当选副主席！多次代表澳大利亚产业工人出席国际劳工组织日内瓦大会，成为载入移民史册的华人劳工领袖！",
            delta: { social: 50, resilience: 45, cognition: 40, inferiority: -35 },
            addTags: ["工会领袖", "华人先驱"]
          },
          {
            text: "【婉拒政治公职，集中精力创办全球手艺人公益跨国联盟】：远离虚浮的工会政争，专注工匠跨国传帮带",
            detail: "纯粹工匠的清醒。设立五百万美元全球工匠基金，资助第三世界贫困青年免费考取国际技能证书自立谋生。",
            reaction: "门下弟子遍布南美、非洲与东南亚，被全球手艺人奉为精神导师，享有崇高的民间无形盛誉！",
            delta: { happiness: 45, social: 45, cognition: 35, savings: -200000 },
            addTags: ["手艺无疆", "大爱普惠"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_48",
        age: 48,
        stageName: "定局全球 · 48岁",
        title: "国际古董车顶级修复大奖与全球手艺宗师",
        scene: "四十八岁，在意大利埃斯特庄园全球古董车优雅竞赛中，你历时五年、仅凭双手手工钣金打造复原的1930年代传奇赛车荣获全场最高总冠军‘最佳战车杯’（Best of Show），成为该赛事近百年历史上唯一问鼎的华人大师。",
        type: "choice",
        choices: [
          {
            text: "【走上领奖台以流利英语与中文深情致辞】：‘这一杯，敬我苏北运河畔修了一辈子农机的大陆老父亲！’",
            detail: "感动全人类的高光谢幕。在全欧洲王室与全球顶级车坛名流面前，将荣耀归于中国运河畔坚韧勤劳的父辈泥土。",
            reaction: "全场欧洲老牌贵族全体起立鼓掌长达十分钟！全球主流媒体头版头条盛赞你为‘用一双手征服西方的东方神工’！",
            delta: { happiness: 50, social: 50, resilience: 45, inferiority: -45 },
            addTags: ["东方神工", "荣耀至极"]
          },
          {
            text: "【拍卖夺冠车辆获利八百万美元，全额捐赠联合国难民署青少年职业教育】：化艺术荣耀为普世甘霖",
            detail: "大慈大悲的大师境界。将毕生手艺巅峰所获的商业财富全额捐出，在战乱地区建立十二所免费铁匠与汽车维保学校。",
            reaction: "无数战乱流民青年因你而免于沦为童兵或极端分子，学会了堂堂正正谋生，你被授予联合国和平勋章！",
            delta: { happiness: 50, cognition: 50, resilience: 40, savings: -500000 },
            addTags: ["功德圣手", "福泽苍生"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_55",
        age: 55,
        stageName: "晚晴沉淀 · 55岁",
        title: "将跨国工坊托付关门弟子与重走全球古道",
        scene: "五十五岁，功成名就。你将掌管三十年的跨国机械集团经营权全部无偿交由最出色的弟子管理。你自己买下一辆手工改装的越野房车，计划用三年时间重走丝绸之路，从罗马开回苏北运河故土。",
        type: "choice",
        choices: [
          {
            text: "【独自一人驾车穿越欧亚大陆两万公里，沿途为穷苦牧民免费维修拖拉机】：‘手艺人最好的归宿，永远在行走的路上’",
            detail: "万里走单骑的现代工匠行者。风餐露宿穿越中亚大草原与帕米尔高原，用一把扳手广结善缘，精神丰盈如浩荡长风。",
            reaction: "跨越千山万水终于将车停在老家运河大堤上，满面风霜却精神矍铄，完成了生命中最壮美的史诗还乡！",
            delta: { health: 40, happiness: 50, resilience: 45, cognition: 45 },
            addTags: ["千里还乡", "长风浩荡"]
          },
          {
            text: "【在墨尔本海滨创办《现代工匠之道》多语种学院与书院】：将实操与哲学升华为传世经典",
            detail: "立言立德。在海边搭建木质工坊书院，著书立说，为全球工业文明写下一部反思过度机器异化的哲学名著。",
            reaction: "著作被译成十几种文字在全球工科大学作为通识教材传颂，晚年出入于天地清风之间，超凡脱俗。",
            delta: { cognition: 50, happiness: 45, social: 40, resilience: 35 },
            addTags: ["工匠哲学", "一代哲宗"]
          }
        ]
      },
      {
        id: "adult_artisan_emigrate_63",
        age: 63,
        stageName: "荣休离场 · 63岁",
        title: "大洋彼岸的晚霞与运河老家的一捧泥土",
        scene: "六十三岁，坐在墨尔本圣基尔达海滩的木长廊上，夕阳将整片大洋染成金红。口袋里装着三十年前离开中国时母亲塞进棉袄里的一小包苏北运河老宅泥土。回望这一生，从一个农家焊工少年，到名扬全球的神工大师，大幕静静合拢。",
        type: "choice",
        choices: [
          {
            text: "【在海边买下一处老庄园，将故土泥土埋在一株老梅树下安详合眼】：‘生如工件千锤百炼，死如晚霞从容归寂！’",
            detail: "极致的安详与大和解。在一生辛勤劳作的充实与自洽中，没有一丝遗憾与恐惧，微笑着闭上双眼，安然进入长眠。",
            reaction: "全澳上千名工匠自发赶来为你扶柩送葬，墓碑上刻着简单一句话：‘这里躺着一个用双手赢得全人类尊重的中国手艺人’。",
            delta: { happiness: 50, health: 35, resilience: 45, inferiority: -50 },
            addTags: ["一代天巧", "千秋安息"]
          },
          {
            text: "【毅然变卖海外一切资产回国定居，在运河畔开一家免费农机修理铺终老】：‘叶落终须归根，余生还做当年那个修车少年！’",
            detail: "洗尽铅华的终极回归。带着千万身家回到苏北小镇，系上蓝布围裙在运河大桥边天天帮老乡修拖拉机，分文不取。",
            reaction: "乡亲们天天送来新鲜土鸡蛋和大葱，晚年在大汗淋漓的人间烟火中笑声不断，生命画上了一个最温暖的圆满句号！",
            delta: { happiness: 50, health: 40, resilience: 40, kinshipGuilt: -40 },
            addTags: ["返璞归真", "圆满句号"]
          }
        ]
      }
    ];
  }


  // 兜底回落至通用科技研发
  return [];
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
    trackHint: "985/211 + 跨洋出海",
    description: "你凭借顶尖的名校才识与硬核技术，勇敢迈出国门。在尊重专注与技术创新的广阔天地中，你主导前沿工程，积攒下丰厚资产，彻底远离了狭窄赛道的内卷与年龄焦虑。用一生的从容与豁达，为自己和后代开辟了一条宽广无比的人生航道。",
    unlockCondition: "985学历 + 跨洋出海 + 认知>=60"
  },
  {
    id: "ED-02",
    number: 2,
    title: "【学术长青 · 杏坛归鸿】",
    tagline: "“守得书斋冷与热，桃李天涯，学问自成。”",
    rarity: "SR",
    trackHint: "985/211 + 出海深造",
    description: "你不为浮躁的名利所动，在海外名校与国际实验室深耕前沿科学。晚年兼任讲座教授，将学术火种带回故土，弟子遍布天下，赢得了知识分子最崇高的清誉与尊严。",
    unlockCondition: "985学历 + 跨洋出海 + 获得学术标签"
  },
  {
    id: "ED-03",
    number: 3,
    title: "【省府中坚 · 治世栋梁】",
    tagline: "“深耕厚土成大器，泽被家族，无愧今生。”",
    rarity: "SSR",
    trackHint: "985/211 + 扎根故土",
    description: "你选择留在生你养你的厚重土地。凭借名校基石与卓越实干，你在行业与体制中步步为营，成为了不可替代的中流砥柱。你为家庭提供了最坚固的庇护，在父母病榻前尽到了至孝，也为下一代搭建了稳固高耸的阶梯。",
    unlockCondition: "985学历 + 扎根故土 + 社交>=50"
  },
  {
    id: "ED-04",
    number: 4,
    title: "【硬核架构 · 稳健立足】",
    tagline: "“一行代码一砖石，手握真功，风雨不动安如山。”",
    rarity: "SR",
    trackHint: "985/211 + 扎根故土",
    description: "在瞬息万变的商业浪潮中，你凭借扎实过硬的技术壁垒稳坐中军。不炒房、不盲目杠杆，在省城有房有车手握大额安全垫，过上了最稳当、最体面的工程师人生。",
    unlockCondition: "985学历 + 扎根故土 + 储蓄>=20万"
  },
  {
    id: "ED-05",
    number: 5,
    title: "【旷野行者 · 异邦松弛】",
    tagline: "“告别狭窄赛道，在辽阔人间找寻真正的自我。”",
    rarity: "SSR",
    trackHint: "双非本科 + 跨洋出海",
    description: "二十七岁那年你毅然斩断了沉闷的内卷循环，跨洋开拓属于自己的生活。在异国多元包容的土地上，你用诚实的工作赢得了体面的住所与内心的松弛。没有了唯学历论的束缚与过度的人情消耗，你活出了真正属于自己的节奏。",
    unlockCondition: "双非学历 + 跨洋出海 + 幸福>=70"
  },
  {
    id: "ED-06",
    number: 6,
    title: "【异邦生根 · 岁月从容】",
    tagline: "“不问出处唯凭实干，他乡亦是心安处。”",
    rarity: "SR",
    trackHint: "双非本科 + 跨洋出海",
    description: "靠着脚踏实地的积累与自考资质，你在异国稳稳拿到永居，买下了带花园的小家。下午五点准时下班，彻底告别了35岁中年危机，用两代人的从容兑现了出海的初心。",
    unlockCondition: "双非学历 + 跨洋出海 + 稳步立足"
  },
  {
    id: "ED-07",
    number: 7,
    title: "【市井梁柱 · 踏实无悔】",
    tagline: "“肩挑岁月风雨，脚踏实地，自有人间至味。”",
    rarity: "SR",
    trackHint: "双非本科 + 扎根故土",
    description: "你留在了这片熟人温厚的土地上。面对生活的每一次风雨挑战，你用普通人最可贵的勤勉与韧性稳稳接招。你在职场中守住了尊严，在父母身边尽到了孝心，在柴米油盐中守护了小家的温暖。",
    unlockCondition: "双非学历 + 扎根故土 + 韧劲>=40"
  },
  {
    id: "ED-08",
    number: 8,
    title: "【小康安乐 · 岁月静好】",
    tagline: "“一生平安无大浪，柴米油盐皆温情。”",
    rarity: "R",
    trackHint: "双非本科 + 扎根故土",
    description: "没有波澜壮阔的史诗，只有热气腾腾的家常便饭。在二线小城与相濡以沫的家人相守，老人安康、儿女成才，平平安安就是最大的福分。",
    unlockCondition: "双非学历 + 扎根故土 + 幸福>=60"
  },
  {
    id: "ED-09",
    number: 9,
    title: "【特级大工 · 异国尊荣】",
    tagline: "“一技在手走天下，靠真本领赢得无上尊重。”",
    rarity: "SSR",
    trackHint: "专科职教 + 跨洋出海",
    description: "你在年轻时就认准了实用手艺的千钧力量。走向海外后，你在尊重技术工人的社会里大放异彩。你的一双手创造了丰厚的外币资产与宽敞的居所，彻底击碎了偏见与学历牢笼。你活出了蓝领劳动者的最高尊严。",
    unlockCondition: "专科职教 + 跨洋出海 + 获得特级工匠"
  },
  {
    id: "ED-10",
    number: 10,
    title: "【跨国技工 · 自强立身】",
    tagline: "“一双手打出真金白银，打破学历枷锁。”",
    rarity: "SR",
    trackHint: "专科职教 + 跨洋出海",
    description: "开着二手皮卡，带着整套工具，在异邦依靠真本事做自己的小老板。不欠外债、不奉迎权贵，凭一身力气吃遍四方，赢得了同行与雇主的真心赞叹。",
    unlockCondition: "专科职教 + 跨洋出海 + 储蓄>=15万"
  },
  {
    id: "ED-11",
    number: 11,
    title: "【实业掌柜 · 乡邻楷模】",
    tagline: "“凭良心做手艺，守在故土，热气腾腾赢尽赞誉。”",
    rarity: "SSR",
    trackHint: "专科职教 + 扎根故土",
    description: "你没有被坐办公室的虚名所累，凭借过硬实操与诚信经营，在生养你的家乡打拼出了属于自己的实体基业。你是老街上人人称道的技术行家，更是父母床前随叫随到的坚强依靠。",
    unlockCondition: "专科职教 + 扎根故土 + 社交>=45"
  },
  {
    id: "ED-12",
    number: 12,
    title: "【市井能人 · 踏实自足】",
    tagline: "“双手挣来衣食饭，堂堂正正过一生。”",
    rarity: "R",
    trackHint: "专科职教 + 扎根故土",
    description: "开着自己的一方门店，靠实打实的技术服务邻里。虽无惊天伟业，但每天有茶喝、有账算、有家人相伴，活出了最接地气的快活自如。",
    unlockCondition: "专科职教 + 扎根故土 + 幸福>=55"
  },
  {
    id: "ED-13",
    number: 13,
    title: "【逆流破壁 · 破局重生】",
    tagline: "“生于泥淖，终于山巅；一代人的跋涉，两代人的破茧。”",
    rarity: "SSR",
    trackHint: "贫寒开局逆袭",
    description: "从一穷二白、甚至经不起任何风浪的原生家庭开局，你靠着非凡的意志与自律一路逆风翻盘。你不仅亲手撕碎了贫困的魔咒，更彻底斩断了代际自卑的枷锁，创造了独属于自己的奇迹。",
    unlockCondition: "拮据/贫寒家境 + 储蓄>=25万 + 自卑<=25"
  },
  {
    id: "ED-14",
    number: 14,
    title: "【通透隐逸 · 自足长乐】",
    tagline: "“不汲汲于富贵，不戚戚于贫贱，心宽天地自宽。”",
    rarity: "SSR",
    trackHint: "极高心智境界",
    description: "你早早参透了东亚社会的比较牢笼，主动退出了无休无止的虚荣踩踏。身心安宁、不卑不亢，在自己喜欢的一方天地里自适其适，活出了常人穷极一生也难以企及的生命大通透。",
    unlockCondition: "幸福>=85 + 自卑<=15"
  },
  {
    id: "ED-15",
    number: 15,
    title: "【血脉相依 · 至孝担当】",
    tagline: "“父母在，人生尚有来处；床前尽孝，无愧青天。”",
    rarity: "SR",
    trackHint: "家庭托底核心",
    description: "在人生的每一次十字路口，你始终把家人放在最深厚的位置。当疾病与晚年风雨来临时，你用宽阔的肩膀与实打实的付出为父母撑起了完整的晴空。你这一生至情至性，问心无愧。",
    unlockCondition: "亲缘负疚<=10 + 获得至孝标签"
  },
  {
    id: "ED-16",
    number: 16,
    title: "【独立独行 · 四海为家】",
    tagline: "“身若流云心似野马，大地山川任由驰骋。”",
    rarity: "SR",
    trackHint: "极高反叛独立",
    description: "你拒绝了熟人社会所有的条条框框，也不受任何传统叙事的绑架。走到哪算哪，干到哪学到哪，把人世间当成一场纯粹的体验与漂泊，活得肆意坦荡、洒脱从容。",
    unlockCondition: "反叛>=70 + 独立自由"
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
  track: "985_211" | "double_non" | "junior_college",
  path: "emigrate" | "stay",
  attrs: CharacterAttributes,
  tags: string[] = []
): EndingDef {
  // 隐藏典藏结局判定
  if (attrs.happiness >= 85 && attrs.inferiority <= 15) {
    return ENDING_CODEX_DEFS[13]; // ED-14 通透隐逸
  }
  if (attrs.rebellion >= 72 && (tags.includes("向往辽阔") || tags.includes("天性不羁"))) {
    return ENDING_CODEX_DEFS[15]; // ED-16 独立独行
  }
  if (attrs.savings >= 250000 && attrs.inferiority <= 20 && tags.includes("初临人间")) {
    if (attrs.kinshipGuilt <= 15 && tags.some(t => t.includes("托底") || t.includes("尽孝"))) {
      return ENDING_CODEX_DEFS[14]; // ED-15 血脉相依
    }
  }

  // 轨道对应常规结局判定
  if (track === "985_211") {
    if (path === "emigrate") {
      return tags.some(t => t.includes("科研") || t.includes("学术"))
        ? ENDING_CODEX_DEFS[1] // ED-02 学术长青
        : ENDING_CODEX_DEFS[0]; // ED-01 全球卓越
    } else {
      return attrs.social >= 50
        ? ENDING_CODEX_DEFS[2] // ED-03 省府中坚
        : ENDING_CODEX_DEFS[3]; // ED-04 硬核架构
    }
  }

  if (track === "junior_college") {
    if (path === "emigrate") {
      return tags.some(t => t.includes("特级"))
        ? ENDING_CODEX_DEFS[8] // ED-09 特级大工
        : ENDING_CODEX_DEFS[9]; // ED-10 跨国技工
    } else {
      return attrs.social >= 45
        ? ENDING_CODEX_DEFS[10] // ED-11 实业掌柜
        : ENDING_CODEX_DEFS[11]; // ED-12 市井能人
    }
  }

  // 双非本科
  if (path === "emigrate") {
    return attrs.happiness >= 70
      ? ENDING_CODEX_DEFS[4] // ED-05 旷野行者
      : ENDING_CODEX_DEFS[5]; // ED-06 异邦生根
  } else {
    return attrs.resilience >= 40
      ? ENDING_CODEX_DEFS[6] // ED-07 市井梁柱
      : ENDING_CODEX_DEFS[7]; // ED-08 小康安乐
  }
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
