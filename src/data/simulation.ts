// ============================================================================
// ESCAPEPLAN LIFE SIMULATION ENGINE
// 逃跑计划 · 中国式命运交互电影数据模型 (三段式驾驶舱 + 0~63岁全周期因果链)
// ============================================================================

export interface FamilyOrigin {
  region: string;
  regionDetail: string;
  fatherAge: number; // 降生时父亲年龄（如28~32）
  fatherJob: string;
  fatherTrait: string;
  motherAge: number; // 降生时母亲年龄（如26~30）
  motherJob: string;
  motherTrait: string;
  housing: string;
  wealthTier: string;
  wealthDetail: string;
  siblings: string;
  siblingsDetail: string;
  emotionalTone: string;
  toneDetail: string;
  backgroundStory: string;
  initialSavings: number;
}

export interface CharacterAttributes {
  // 4 Core Attributes (0~100)
  health: number; // 健康 (0: 极度虚弱, 100: 极其健壮)
  happiness: number; // 幸福与心态 (0: 极度抑郁, 100: 积极豁达)
  cognition: number; // 认知与学习手腕 (0: 混沌蒙昧, 100: 见解独到/应试顶尖)
  social: number; // 社交与人情圈层 (0: 孤立内敛, 100: 八面玲珑)
  savings: number; // 现金储蓄 (RMB)

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
}

export interface LifeEventNode {
  id: string;
  age: number;
  stageName: string;
  title: string;
  scene: string;
  type?: "natural" | "choice";
  naturalDelta?: Partial<CharacterAttributes>;
  naturalTags?: string[];
  choices?: LifeChoice[];
}

export interface DualTrackStage {
  age: number;
  title: string;
  theme: string;
  emigratedScene: string;
  stayedScene: string;
  emigratedReflection: string;
  stayedReflection: string;
  choice: {
    text: string;
    detail: string;
    reaction: string;
  };
}

export interface CountryOption {
  id: string;
  name: string;
  flag: string;
  city: string;
  tagline: string;
  costDesc: string;
  cultureDistance: string;
}

export const TARGET_COUNTRIES: CountryOption[] = [
  {
    id: "japan",
    name: "日本",
    flag: "🇯🇵",
    city: "东京 · 荒川区",
    tagline: "治安极佳、极度原子化、少子老龄化缺工、语言门槛明确",
    costDesc: "初始启动金约 6~10 万 RMB",
    cultureDistance: "东亚文化同源，表面客气疏离，适合不喜复杂社交的个体"
  },
  {
    id: "australia",
    name: "澳大利亚",
    flag: "🇦🇺",
    city: "墨尔本 · 西区",
    tagline: "蓝领收入极高、阳光海洋、严格打分制与WHV青年跳板",
    costDesc: "初始启动金约 10~15 万 RMB",
    cultureDistance: "多元移民社会，工会强劲，体力劳动受尊重"
  },
  {
    id: "germany",
    name: "德国",
    flag: "🇩🇪",
    city: "杜塞尔多夫 · 北威州",
    tagline: "工匠双元制、免学费、劳动法严苛、重视规则与秩序",
    costDesc: "自保金约 8~12 万 RMB",
    cultureDistance: "生活节奏严谨，德语要求硬核，社会福利托底坚实"
  },
  {
    id: "spain",
    name: "西班牙",
    flag: "🇪🇸",
    city: "瓦伦西亚",
    tagline: "生活成本欧洲最低梯队、阳光地中海、非盈利/数字游民友好",
    costDesc: "初始启动金约 8~15 万 RMB",
    cultureDistance: "热情松弛，午休文化浓厚，适合低欲望慢节奏生活"
  },
  {
    id: "canada",
    name: "加拿大",
    flag: "🇨🇦",
    city: "卡尔加里 / 温尼伯",
    tagline: "地广人稀、医疗教育托底、省提名红利与漫长严冬",
    costDesc: "初始启动金约 12~18 万 RMB",
    cultureDistance: "老牌移民国，包容度高，耐得住寂寞与严寒"
  },
  {
    id: "thailand",
    name: "泰国",
    flag: "🇹🇭",
    city: "清迈 · 宁曼路周边",
    tagline: "低成本避风港、慢节奏疗愈、长期签证需技巧、适合自由职业",
    costDesc: "初始启动金约 3~5 万 RMB",
    cultureDistance: "包容文化，物价低廉，不能直接打普通工"
  }
];

// ============================================================================
// 原生家庭多轴矩阵数据库
// ============================================================================

export interface BirthplaceSlide {
  region: string;
  landscape: string;
  tagline: string;
  icon: string;
}

export const BIRTHPLACE_SLIDES: BirthplaceSlide[] = [
  {
    region: "豫东平原农耕大县",
    landscape: "平原麦浪 · 窑厂红砖 · 宗祠香火",
    tagline: "全县七十万人，全靠县一中题海杀向省城",
    icon: "🌾"
  },
  {
    region: "浙东民营制造百强县",
    landscape: "轰鸣注塑作坊 · 模具五金 · 货运卡车",
    tagline: "崇尚宗族抱团经商发财，不读书就早早进厂接单",
    icon: "⚙️"
  },
  {
    region: "东北老重工业收缩矿城",
    landscape: "熄灭的红砖大烟囱 · 铁道扳道房 · 筒子楼",
    tagline: "年轻人跑光，整座小城靠老人的买断退休金维持体面",
    icon: "🏭"
  },
  {
    region: "湘西丘陵丘壑农业镇",
    landscape: "梯田柑橘树 · 吊脚旧楼 · 泥泞机耕路",
    tagline: "父母常年留守珠三角制鞋厂，留给家里的是老屋柴火烟",
    icon: "🍊"
  },
  {
    region: "华北重工业地级市生活区",
    landscape: "钢厂子弟校 · 泛灰白杨树 · 家属大院",
    tagline: "空气里常年有微尘，看病求职全靠几十年的高中同学网",
    icon: "🏗️"
  },
  {
    region: "川渝盆地边缘山水县城",
    landscape: "茶馆竹椅 · 麻将脆响 · 嘉陵江雾气",
    tagline: "火锅油碟与安逸哲学，但年轻人只能去成渝或南下打工",
    icon: "🍵"
  },
  {
    region: "苏北运河畔平原农工县",
    landscape: "纵横运河驳船 · 农药厂排污渠 · 麦茬地",
    tagline: "极度崇尚读书做官，应试竞争激烈到令人窒息",
    icon: "🚢"
  },
  {
    region: "岭南宗族聚居近郊大村",
    landscape: "祠堂青砖 · 舞狮红榜 · 自建握手楼出租房",
    tagline: "宗族人情盘根错节，分红虽有但祖训如铁，出省即视为背叛",
    icon: "🏮"
  }
];

const HOUSING_CONDITIONS = [
  "老旧破产国企职工集资筒子楼（52㎡，公用水房，灰墙脱落）",
  "农贸市场后街自建红砖三层平房（底层潮湿杂物间，顶层晒干菜）",
  "县城九十年代步梯房顶楼（无保温层，冬冷夏热，墙皮渗水）",
  "城中村紧挨电线杆的逼仄握手楼（终年不见天日，推开窗是对面油烟机）",
  "地级市边缘安置房小区（绿化带种满大葱，电梯常年停运故障）"
];

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

const PARENT_PROFILES = [
  {
    fatherJob: "县自然资源局普通科员",
    fatherAge: 29,
    fatherTrait: "老烟枪，性格木讷严肃，信奉仕途与编制，最在意外界评价与体面",
    motherJob: "公立小学语文教师",
    motherAge: 27,
    motherTrait: "掌管家里账本，精打细算，习惯推行严格的规律作息",
    housingIndex: 0,
    wealthIndex: 1
  },
  {
    fatherJob: "农贸市场生肉水产摊档主",
    fatherAge: 30,
    fatherTrait: "满手刀茧，说话大嗓门，信奉真金白银与实利，为人坦率豪爽",
    motherJob: "农贸市场摊位打理人",
    motherAge: 28,
    motherTrait: "起早贪黑整理零钞，一分钱都想省下来留给你念书",
    housingIndex: 1,
    wealthIndex: 2
  },
  {
    fatherJob: "沿海模具五金厂冲压工",
    fatherAge: 28,
    fatherTrait: "长年在外打工住铁架宿舍，每次打电话只懂问‘钱够不够花’",
    motherJob: "同厂流水线装配工",
    motherAge: 26,
    motherTrait: "逢年过节才拎着特产回乡，满怀无法时刻陪伴你的愧疚与小心翼翼",
    housingIndex: 1,
    wealthIndex: 3
  },
  {
    fatherJob: "下岗工人（开出租/跑货运）",
    fatherAge: 32,
    fatherTrait: "经历了单位改制转型的阵痛，一身烟酒气与不服输的硬骨头",
    motherJob: "清晨早市油炸面点摊摊主",
    motherAge: 30,
    motherTrait: "凌晨三点揉面炸油条，双手满是烫痕，总盼着你能靠读书出人头地",
    housingIndex: 2,
    wealthIndex: 0
  },
  {
    fatherJob: "乡镇卫生院全科内科大夫",
    fatherAge: 31,
    fatherTrait: "一身洗得发白的白大褂，性情清贫认真，把家族名声与操守看得极重",
    motherJob: "乡初中英语教师",
    motherAge: 29,
    motherTrait: "极度严格，容不得学习上粗心大意，同辈教育压力大",
    housingIndex: 0,
    wealthIndex: 1
  },
  {
    fatherJob: "个体服装批发商（后转开快递驿站）",
    fatherAge: 33,
    fatherTrait: "经历过早期做生意的起落，背着小额贷款，常谈及人脉与市场",
    motherJob: "社区杂货店店主兼配送",
    motherAge: 30,
    motherTrait: "疲于奔命进货理账，整天应付催单电话，脾气偶显急躁",
    housingIndex: 4,
    wealthIndex: 0
  },
  {
    fatherJob: "建筑工地铁架泥瓦工师傅",
    fatherAge: 29,
    fatherTrait: "长年在脚手架上流汗，年底最担心工钱拖欠，沉默朴实",
    motherJob: "老家留守务农母亲",
    motherAge: 27,
    motherTrait: "操持几亩麦田与家禽，省吃俭用把最好的伙食留给你",
    housingIndex: 1,
    wealthIndex: 3
  },
  {
    fatherJob: "省城高校后勤水电维修工",
    fatherAge: 30,
    fatherTrait: "见惯了大学里教授名流的优渥，深知阶层落差，逼你必须用功考大学",
    motherJob: "市立医院合同制护工/护士",
    motherAge: 28,
    motherTrait: "三班倒常年缺觉，说话干脆利落但带着焦虑，催你争气",
    housingIndex: 4,
    wealthIndex: 1
  }
];

const SIBLINGS_PROFILES = [
  {
    siblings: "独生子女（独享亦独扛）",
    detail: "父母将所有关注与资源倾注在你身上，未来老人的照护、医疗和养老没有任何同胞分担。"
  },
  {
    siblings: "有姐姐（比你大4岁）",
    detail: "姐姐从小被灌输照顾家庭，比你早几年进入社会，偶尔默默寄钱贴补家用。"
  },
  {
    siblings: "有弟弟（比你小3岁）",
    detail: "家里对弟弟格外关切，资源常有偏向，你很早就习惯了凡事靠自己。"
  },
  {
    siblings: "夹心层二儿子/二女儿",
    detail: "老大备受器重，老幺备受娇宠，你夹在中间如同隐形人，最早就学会了察言观色与独自消化委屈。"
  },
  {
    siblings: "重组家庭（由祖父母照看）",
    detail: "在爷爷奶奶的老平房里长大，骨子里极度渴望拥有属于自己的固定锚点。"
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

export function generateRandomFamily(): {
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

  const slide = BIRTHPLACE_SLIDES[Math.floor(Math.random() * BIRTHPLACE_SLIDES.length)];
  const parent = PARENT_PROFILES[Math.floor(Math.random() * PARENT_PROFILES.length)];
  const housing = HOUSING_CONDITIONS[parent.housingIndex];
  const wealth = WEALTH_TIERS[parent.wealthIndex];
  const sibling = SIBLINGS_PROFILES[Math.floor(Math.random() * SIBLINGS_PROFILES.length)];
  const tone = EMOTIONAL_TONES[Math.floor(Math.random() * EMOTIONAL_TONES.length)];

  const initialSavingsMap = [0, 200, 800, 1500];
  const initialSavings = initialSavingsMap[parent.wealthIndex] || 200;

  return {
    name,
    gender,
    family: {
      region: slide.region,
      regionDetail: `${slide.landscape} | ${slide.tagline}`,
      fatherAge: parent.fatherAge,
      fatherJob: parent.fatherJob,
      fatherTrait: parent.fatherTrait,
      motherAge: parent.motherAge,
      motherJob: parent.motherJob,
      motherTrait: parent.motherTrait,
      housing,
      wealthTier: wealth.tier,
      wealthDetail: wealth.detail,
      siblings: sibling.siblings,
      siblingsDetail: sibling.detail,
      emotionalTone: tone.tone,
      toneDetail: tone.detail,
      backgroundStory: `你出生于${slide.region}。父亲当时${parent.fatherAge}岁，是一名${parent.fatherJob}；母亲${parent.motherAge}岁，从事${parent.motherJob}。一家人挤在${housing}。`,
      initialSavings
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
  if (val >= 80) return "敏锐通透 · 善思善断";
  if (val >= 60) return "思维清晰 · 踏实好学";
  if (val >= 40) return "按部就班 · 中规中矩";
  return "经验局限 · 认知盲区";
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

export function getSiblingDynamicStatus(siblingsType: string, currentAge: number): string {
  if (siblingsType.includes("独生")) {
    if (currentAge < 18) return "独自享受父母全部关爱，也独自承担两代人全部期望。";
    if (currentAge < 30) return "独生子女，未来的家庭养老与照护重担全落在你一人肩上。";
    return "独生子女，独自面对长辈的老去与生老病死。";
  }
  if (siblingsType.includes("姐")) {
    if (currentAge < 12) return "姐姐在上中学，放学后经常帮你检查作业或带着你玩。";
    if (currentAge < 20) return "姐姐已在沿海工厂/商场务工，每月寄钱补贴家用。";
    if (currentAge < 30) return "姐姐在老家或省城成家立业，时常照看父母日常。";
    return "姐姐步入晚年，与你共同分担着老人的照护与操持。";
  }
  if (siblingsType.includes("弟") || siblingsType.includes("妹")) {
    if (currentAge < 12) return "弟弟/妹妹年纪尚小，父母常嘱咐你多照看让着他们。";
    if (currentAge < 20) return "弟弟/妹妹正在上学，家庭日常开销与学费支出偏紧。";
    if (currentAge < 30) return "弟弟/妹妹步入社会，开始面临就业与婚房压力。";
    return "兄弟姐妹各自成家，逢年过节相聚回忆当年的艰辛。";
  }
  return "与亲族同辈保持着传统的走动与联系。";
}

// ============================================================================
// 统一生命纪元时间线（0 ~ 27 岁：自然事件流 + 关键抉择）
// ============================================================================\n\n// ============================================================================
// 用户认可的 5 维心智与社会特质定性评语（左侧状态仪表板使用）
// ============================================================================

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

// ============================================================================
// 动态多剧情事件池引擎（0 ~ 27 岁：告别单一剧本，多支线海量丰富）
// ============================================================================

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
        "秋风渐起的黄昏，你出生在县医院泛黄的被单上。助产士轻轻拍打你的后背，你发出第一声响亮的啼哭。父亲在产房外来回踱步，手里捏着被汗水浸湿的缴费单；母亲虚弱地将你揽入怀中，为你取下伴随一生的名字。这一年，你正式来到人间。",
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
        "大雪漫天的隆冬清晨，你出生在职工医院的老旧病房里。窗外红砖大烟囱喷出滚滚白汽，供热蒸汽管道不时发出轰鸣。接生大夫向门外报喜，全车间的叔伯工友凑了几个红包与一篮红鸡蛋。你在工业小城的余晖中落户人间。",
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
        "南方闷热多雨的午夜，你在出租屋邻近的私立小诊所呱呱坠地。隔壁冲压车间的震动隔着薄墙传来。父亲骑着借来的三轮车载着母亲和你穿过狭窄的握手楼巷道。在异乡漂泊的茫然中，你的到来成了这间出租屋里唯一的期盼。",
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
      id: "age_1_zhuazhou",
      age: 1,
      stageName: "幼芽期 · 1岁",
      title: "摇晃的脚步与周岁抓周",
      scene:
        "在老旧木门槛与水泥地之间，你松开母亲的手，摇摇晃晃迈开了人生的第一步。周岁抓周礼上，八仙桌上铺着大红方布，亲戚们围在四周看热闹。你在旧算盘、发黄的书本、生锈的螺丝刀与零钞之间好奇张望，一把抓住了生锈的螺丝刀，惹得满屋大人发出欢笑。",
      type: "natural",
      naturalDelta: { health: 5, cognition: 5, resilience: 5 },
      naturalTags: ["周岁学步", "螺丝手艺"]
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
      title: "深夜暴雨与镇卫生院的吊水",
      scene:
        "一场突如其来的急性肺炎让你高烧到近四十度。深夜暴雨如注，父亲披着破塑料布骑车推着你，母亲坐在后座死死护住你的前额，连夜赶往镇卫生院。冰凉的药水在玻璃瓶里一滴滴落入血管，你第一次对病痛与家庭的无助有了朦胧的感知。",
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
      id: "age_6_lunchbox",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "校门口的午餐盒与方言窃笑",
      scene:
        "开学第一周，周围城里的同桌掏出印着卡通图案的双层不锈钢保温饭盒，里面是切好的水果和煎肉饼；而你书包里是用旧塑料罐改装的饭盒，装着母亲炒好的咸菜土豆丝。班主任点名时，你浓重的乡音引来全班一阵窃笑。",
      type: "choice",
      choices: [
        {
          text: "低头不语，午饭时悄悄躲到操场乒乓球台底下吃完",
          detail: "你早早学会了用自尊裹紧自己的贫瘠，把敏感磨成了内敛的硬壳。",
          reaction: "你开始学着城里同学的语调一字一句纠正发音，夜里在被窝里练普通话咬字。",
          delta: { inferiority: 15, cognition: 10, social: -10 },
          addTags: ["自尊敏感", "早熟好强"]
        },
        {
          text: "大方把咸菜分给同桌：‘我家自己腌的，尝尝很香’",
          detail: "你身上带着野草般的坦荡，贫穷没有第一时间压弯你的腰。",
          reaction: "同桌吃了一口被辣得直吸气，反倒和你成了下课一起拍卡片的朋友。",
          delta: { social: 15, happiness: 10, inferiority: -10, resilience: 10 },
          addTags: ["坦荡大方", "草莽韧劲"]
        },
        {
          text: "吵着要买商场45元保温盒，母亲叹气数零钱",
          detail: "母亲叹着气数出抽屉里带折痕的零钱，父亲在院子里重重抽了一口旱烟。",
          reaction: "第二天你如愿拿到了新饭盒，但母亲接下来整整两周每顿饭只就着白菜汤咽冷馍。",
          delta: { kinshipGuilt: 20, happiness: -10, savings: -45 },
          addTags: ["内疚阴影", "好面子"]
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
          text: "鼓起勇气高高举手，大声背诵唐诗自荐当学习委员",
          detail: "你渴望通过优秀表现赢取老师的关注，用成绩打破家庭出身的界限。",
          reaction: "老师有些意外，赞赏了你的胆量，让你当上了小组长，你第一次感到被认可。",
          delta: { cognition: 15, social: 10, academicCapital: 10 },
          addTags: ["积极争先", "做题苗子"]
        },
        {
          text: "默默低头把手缩进袖子里，甘愿留在角落安静翻书",
          detail: "你习惯了不起眼的安全感，不想成为目光焦点的众矢之的。",
          reaction: "你被分到了靠窗倒数第二排，虽然被忽略，但你拥有了自由发呆和看杂书的天地。",
          delta: { happiness: 10, inferiority: 5, rebellion: 5 },
          addTags: ["内敛隐形", "安静独处"]
        },
        {
          text: "拿出从家里带来的五彩弹珠，课间迅速聚拢了一大帮同桌玩伴",
          detail: "比起规规矩矩的班干部，你更喜欢在操场上呼朋引伴称兄道弟。",
          reaction: "你很快成了班里的孩子王，大家下课都围着你转，老师拿你哭笑不得。",
          delta: { social: 20, happiness: 15, academicCapital: -5 },
          addTags: ["孩子王", "外向好客"]
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
          text: "笔直站在母亲身旁，拿出新发下的语文书大声朗读课文",
          detail: "你用专注的读书声为尴尬的母亲筑起尊严的防线。",
          reaction: "年级主任路过夸你‘这娃心性好，是个念书的料’，特批缓交一个月入学。",
          delta: { cognition: 15, resilience: 15, inferiority: 5 },
          addTags: ["要强争气", "以读卫尊"]
        },
        {
          text: "懂事地拉了拉母亲衣角：‘妈，咱不念了，回家放羊吧’",
          detail: "过早察觉到了贫困的刺痛，不忍心看着母亲在陌生人面前低三下四。",
          reaction: "母亲眼圈一红，狠狠搂住你说‘砸锅卖铁也得让你把书念完！’",
          delta: { kinshipGuilt: 25, happiness: -10, resilience: 10 },
          addTags: ["心疼双亲", "懂事沉重"]
        },
        {
          text: "默默去走廊洗手池打水，帮老师把办公室外的花坛擦得干干净净",
          detail: "早熟敏锐，懂得用具体的眼力见与勤快博取成人世界的好感。",
          reaction: "班主任有些动容，叹了口气领着你进了教室安排在中间好座位。",
          delta: { social: 15, resilience: 10, inferiority: 5 },
          addTags: ["察言观色", "勤勉早熟"]
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
  // 8岁 · 小学三年级 (Choice)
  // --------------------------------------------------------------------------
  8: [
    {
      id: "age_8_uniform",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "走廊罚站与没交的校服费",
      scene:
        "学校统一征订秋季校服，每套80块钱。家里刚好要交下半年的电费和买化肥，母亲推说明天交，一拖就是一周。早操集会前，班主任当着全班的面把你留在了教室外走廊：‘全班就差你一个人了，什么时候交齐什么时候进教室听课。’",
      type: "choice",
      choices: [
        {
          text: "在走廊笔直站着，拿出课本默默把课文全篇背了下来",
          detail: "你没有哭，但那些路过同学投来的探寻目光，让你深切体会到了自尊被刺痛的滋味。",
          reaction: "从那天起，你暗暗发誓要用成绩证明自己。期末考试你考了年级第一名。",
          delta: { academicCapital: 15, cognition: 15, inferiority: 10 },
          addTags: ["要强自尊", "发奋苦读"]
        },
        {
          text: "中午趁老师不注意，跑去学校后山水沟里抓小龙虾和小泥鳅卖给菜市场小贩凑钱",
          detail: "满身泥浆，指甲缝里全是黑泥，但你真的用塑料袋换回了皱巴巴的八张十元纸币。",
          reaction: "当你把钱交到讲台上时，班主任有些诧异。你第一次体会到靠自己的双手换来尊严的底气。",
          delta: { social: 10, resilience: 15, savings: 50, cognition: -5 },
          addTags: ["早早谋生", "市井生存"]
        },
        {
          text: "默默哭着跑回家，让母亲去邻居家借钱凑齐",
          detail: "母亲在抽屉翻找无果，叹着气去隔壁借了钱，领着你回学校交齐。",
          reaction: "你回到了座位，但母亲低头给老师赔笑脸的模样，成了你心中沉重的一道烙印。",
          delta: { kinshipGuilt: 15, happiness: -15, savings: -80 },
          addTags: ["愧疚沉重"]
        }
      ]
    },
    {
      id: "age_8_pen_lost",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "失窃的英雄钢笔与全班怀疑目光",
      scene:
        "前排家境优渥的班长丢了一支崭新的英雄金笔。不知道是谁在后面嘀咕了一句‘他家里穷，今天早上就他在教室擦黑板’。班主任皱着眉走到你课桌前，示意你站起来。",
      type: "choice",
      choices: [
        {
          text: "一把抓起书包当众倒扣在桌上，连铅笔盒都摔开证明清白",
          detail: "你眼含热泪浑身发抖，哪怕鱼死网破也绝不受平白诬陷。",
          reaction: "书包里除了发旧的课本别无他物。不久后班长在自己大衣兜里找到了笔，全班向你道歉。",
          delta: { rebellion: 15, resilience: 15, inferiority: 5 },
          addTags: ["刚烈自证", "硬骨头"]
        },
        {
          text: "咬紧牙关低下头，默默任由班主任搜查书包抽屉",
          detail: "你过早地学会了吞下委屈，明白底层在权威面前辩解的苍白。",
          reaction: "搜查一无所获，老师尴尬地拍拍你肩膀让你坐下，但那种屈辱感久久挥之不去。",
          delta: { inferiority: 20, kinshipGuilt: 5, resilience: 10 },
          addTags: ["隐忍屈辱", "自尊内敛"]
        },
        {
          text: "冷静指出漏洞：‘我今天早上和劳动委员一起进门的，他能作证’",
          detail: "不卑不亢，用逻辑和目击证人化解风波。",
          reaction: "劳动委员站出来证实了你的说法，班主任赞赏了你的条理清晰，风波平息。",
          delta: { cognition: 15, social: 10, resilience: 10 },
          addTags: ["沉着冷静", "机敏自护"]
        }
      ]
    },
    {
      id: "age_8_pressure",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "鸡毛掸子与每晚错题不过关的罚站",
      scene:
        "升入三年级有了英语和乘除法，父母的焦虑陡然上升。饭桌被改成了书桌，父亲手握鸡毛掸子坐在旁边监督，背错一句口诀手背上就是一道红印，客厅里充满压抑的气息。",
      type: "choice",
      choices: [
        {
          text: "咬牙死磕，把错题本抄写三遍，直到全部滚瓜烂熟",
          detail: "顺从父母的高压管束，用完美的卷面换取家庭里少得可怜的温和。",
          reaction: "你次次考第一，但你开始有了梦中被抽打惊醒的心慌毛病。",
          delta: { academicCapital: 20, cognition: 15, happiness: -15, health: -5 },
          addTags: ["高压顺从", "完美做题"]
        },
        {
          text: "把武侠小说和故事书藏在课本底下，偷偷在被窝里看",
          detail: "‘既然现实这么窒息，那我就在想象的世界里翱翔。’",
          reaction: "虽然常被抓包挨训，但你保全了自己的灵气与想象力，作文常常拿满分。",
          delta: { rebellion: 20, cognition: 10, happiness: 10 },
          addTags: ["暗中叛逆", "精神逃逸"]
        },
        {
          text: "放下笔跟父亲认真谈：‘爸，你越打我越记不住’",
          detail: "鼓起勇气打破家庭暴力的沉闷闭环，试图建立平等对话。",
          reaction: "父亲愣了半天，手里的掸子慢慢放下了，那晚他叹着气默默去阳台抽了一根烟。",
          delta: { rebellion: 15, kinshipGuilt: -10, resilience: 15 },
          addTags: ["勇敢直言", "破冰代沟"]
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
      naturalDelta: { resilience: 15, health: 5, social: -5 },
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
  // 12岁 · 初中一年级 (Choice)
  // --------------------------------------------------------------------------
  12: [
    {
      id: "age_12_fast_class",
      age: 12,
      stageName: "初中一年级 · 12岁",
      title: "重点火箭班与普通班的分流博弈",
      scene:
        "小升初摸底考成绩出炉。县城中学按成绩将学生分入快慢班。快班是冲刺重点高中的摇篮，但周末需加课补习且收费不菲；普通班管理松散，放学早。全家人围在饭桌旁等你的决断。",
      type: "choice",
      choices: [
        {
          text: "咬牙进入火箭班，挑灯夜读跟上高压节奏",
          detail: "你每天只睡5个半小时，床头贴满错题卡，在严酷的分数排位中艰难前行。",
          reaction: "你的期末排位稳固在年级前列，但深度近视和偏头痛也悄然找上了你。",
          delta: { cognition: 20, academicCapital: 20, health: -10, happiness: -10 },
          addTags: ["快班高压", "做题机器"]
        },
        {
          text: "进普通平行班，保全作息，自学课外知识",
          detail: "你拒绝无休止的机械刷题，下课后在旧书摊和图书馆看杂书，保持身心健康。",
          reaction: "虽然成绩处于中游，但你保留了独立的思考能力与健全的体魄。",
          delta: { cognition: 10, happiness: 15, rebellion: 10 },
          addTags: ["心态平稳", "自由探索"]
        },
        {
          text: "结识镇上做买卖和外向的同学，课余学做小生意",
          detail: "你帮小卖部倒卖文具和二手漫画，第一次体会到现金流转带来的现实快乐。",
          reaction: "成绩退到中后段，但你在同龄人中人缘极佳，早早摸清了街头生存规则。",
          delta: { social: 20, savings: 200, academicCapital: -10 },
          addTags: ["商业嗅觉", "市井朋友"]
        }
      ]
    },
    {
      id: "age_12_dormitory",
      age: 12,
      stageName: "初中一年级 · 12岁",
      title: "八人寝大通铺与首月生活费断档",
      scene:
        "初中住校，八人间铁架床锈迹斑斑。入冬后家里寄的生活费迟迟没到，身上只剩最后十块钱，离周末还有整整四天。舍友们在铺位上吃着香肠和热泡面，你捧着发干的冷馒头。",
      type: "choice",
      choices: [
        {
          text: "帮成绩差的舍友辅导作业打扫宿舍，换取零食与饭票",
          detail: "放下身段用脑力与勤快解决温饱，不向家里诉苦。",
          reaction: "你赢得了舍友们的尊重与照顾，甚至成了寝室的主心骨。",
          delta: { social: 15, resilience: 15, savings: 50 },
          addTags: ["自立自强", "宿舍领袖"]
        },
        {
          text: "就着白开水咽完干馒头，泡在自习室看书忘记饥饿",
          detail: "把一切生理匮乏压制在精神深处，靠自尊心苦撑。",
          reaction: "你熬过了艰难的四天，但落下了偶尔胃痉挛的病根。",
          delta: { resilience: 20, health: -10, inferiority: 10 },
          addTags: ["苦行忍耐", "坚硬内敛"]
        },
        {
          text: "去公用电话亭给老家打电话，听到母亲声音那一刻哭了出来",
          detail: "依然是那个依恋家庭的孩子，无法完全独自消化贫困。",
          reaction: "母亲连夜向邻居借了钱汇给你，电话里满是自责与叹息。",
          delta: { kinshipGuilt: 20, happiness: -10, savings: 100 },
          addTags: ["家庭牵挂"]
        }
      ]
    },
    {
      id: "age_12_internet_bar",
      age: 12,
      stageName: "初中一年级 · 12岁",
      title: "后街黑网吧烟雾与CS枪炮声",
      scene:
        "学校后门的防空洞边新开了一家黑网吧，两块钱一小时。同桌拉着你的衣角神神秘秘带你走进去。阴暗嘈杂的包间里充斥着劣质烟味、泡面香与CS对战的呼喊声，那是你从未见过的全新感官世界。",
      type: "choice",
      choices: [
        {
          text: "坚决转身离开：‘我还要去自习室复习英语’",
          detail: "抵御诱惑，死守应试底线，不碰任何脱轨的事物。",
          reaction: "同桌嘲笑你是个‘胆小鬼书呆子’，但你的英语成绩稳居第一。",
          delta: { academicCapital: 15, cognition: 10, social: -10 },
          addTags: ["自律如铁", "避开诱惑"]
        },
        {
          text: "省下一顿饭钱打满两个小时，在联机对战中找到极致快乐",
          detail: "尝到了叛逆与虚拟世界带来的巨大宣泄快感。",
          reaction: "虽然通关了反恐精英，但第二天上课打瞌睡被班主任罚站一整节课。",
          delta: { happiness: 15, rebellion: 15, academicCapital: -10, savings: -10 },
          addTags: ["网吧浪游", "初试叛逆"]
        },
        {
          text: "向网管请教电脑系统原理，帮网管修键盘换取免费上网时间",
          detail: "对计算机背后的技术机制产生了强烈好奇与自学冲动。",
          reaction: "你早早掌握了装系统、局域网调试和基本的代码操作，成了同龄人眼里的电脑高手。",
          delta: { cognition: 20, resilience: 15, savings: 0 },
          addTags: ["极客启蒙", "动手能手"]
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
      title: "变声期的敏感与磨损的旧球鞋",
      scene:
        "喉结开始突出，声音变得沙哑粗糙。你开始格外在意异性同学的目光和自己有些发旧的球鞋。班上有家境优渥的同学穿上了名牌运动鞋，你悄悄把双脚往课桌底下缩了缩。青春期的自尊与敏感在悄然生长。",
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
  // 14岁 · 初中二年级下
  // --------------------------------------------------------------------------
  14: [
    {
      id: "age_14_layoff",
      age: 14,
      stageName: "初中二年级 · 14岁",
      title: "地方老厂减员与饭桌上的长叹",
      scene:
        "父亲所在的地方老厂效益急转直下，迎来人员分流。饭桌上的荤菜肉眼可见地变少，父母在卧室关起门轻声商量着如何找亲戚周转。那一夜你躺在床上听着外面的虫鸣，清楚地意识到自己必须尽快长大。",
      type: "natural",
      naturalDelta: { resilience: 15, kinshipGuilt: 10, happiness: -5 }
    },
    {
      id: "age_14_surgery",
      age: 14,
      stageName: "初中二年级 · 14岁",
      title: "母亲手术走廊外的背诵与陪护",
      scene:
        "母亲因常年操劳突发重病住院手术。整整三周，你放学后奔波在学校与医院之间，在充满来苏水气味的走廊加床旁给母亲擦身喂药，借着走廊灯光背诵中考要考的文言文。你在疲惫中快速褪去了稚气。",
      type: "natural",
      naturalDelta: { resilience: 20, kinshipGuilt: 15, health: -5 }
    },
    {
      id: "age_14_debt",
      age: 14,
      stageName: "初中二年级 · 14岁",
      title: "深夜砸门的讨债声与大人的眼泪",
      scene:
        "家里给亲戚担保的借款暴雷，深夜有几个粗壮汉子砸门索债。父亲站在门后低声下气赔不是，母亲在屋内捂着嘴无声痛哭。你抓着书包带站在阴暗处死死盯着门外，深深体会到金钱对一个家庭体面的残酷剥夺。",
      type: "natural",
      naturalDelta: { inferiority: 15, resilience: 20, happiness: -15 }
    }
  ],

  // --------------------------------------------------------------------------
  // 15岁 · 初三中考五五分水岭 (Choice)
  // --------------------------------------------------------------------------
  15: [
    {
      id: "age_15_split",
      age: 15,
      stageName: "初中三年级 · 15岁",
      title: "初三中考五五分流的关键抉择",
      scene:
        "初三分流动员大会。普高升学率仅50%，职业技术学校的老师到班级分发宣传单，宣称‘定向实习、早毕业早就业’。班主任私下找你谈话，根据你目前的成绩和家境评估走向。",
      type: "choice",
      choices: [
        {
          text: "咬紧牙关备战中考，无论如何要冲进普高",
          detail: "哪怕全家节衣缩食，你也坚信唯有传统高考文凭才能改变命运。",
          reaction: "你每天刷完三套模拟卷，顺利拿到县重点高中的录取通知书，但家里的存折已见底。",
          delta: { academicCapital: 25, cognition: 20, health: -10, kinshipGuilt: 15 },
          trackTrigger: "academic",
          addTags: ["普高冲刺", "学术路径"]
        },
        {
          text: "选择公办中专/高职学机电/护理实用技术",
          detail: "务实早熟，深知家里无力支撑漫长的大学教育，选择能早日自食其力的道路。",
          reaction: "班主任有些惋惜，但你在实训车间掌握了扎实的操作技能，早早独立生活。",
          delta: { resilience: 25, savings: 500, academicCapital: -10, cognition: -5 },
          trackTrigger: "vocational",
          addTags: ["职教蓝领", "手艺人底色"]
        },
        {
          text: "辍学跟随同乡前往沿海服装厂当学徒",
          detail: "不愿再向父母伸手要钱，提着编织袋踏上南下的绿皮火车。",
          reaction: "十六岁你在轰鸣的缝纫车间熬夜赶工，虽然早早有了收入，但未来的路变窄了。",
          delta: { savings: 2500, health: -15, social: 15, cognition: -20 },
          addTags: ["早期打工", "过早谋生"]
        }
      ]
    },
    {
      id: "age_15_art_gamble",
      age: 15,
      stageName: "初中三年级 · 15岁",
      title: "艺考特长生与高昂培训费的赌局",
      scene:
        "文化课成绩卡在普高线边缘。美术老师找你谈话，认为你很有构图天赋，建议走美术艺考降分考高中，但集训画室和画材费第一年就要花掉家里一万多块钱。",
      type: "choice",
      choices: [
        {
          text: "求家里支持走美术艺考，发誓考不上全额退学退还学费",
          detail: "父母拿出压箱底的养老积蓄为你报名。你每天在画室画石膏像到手指抽筋。",
          reaction: "你以全县专业第一的成绩拿到降分指标考入重点普高艺术班。",
          delta: { academicCapital: 15, kinshipGuilt: 25, savings: -12000, resilience: 15 },
          trackTrigger: "academic",
          addTags: ["艺术曲折", "举家豪赌"]
        },
        {
          text: "坚决放弃艺考念头，在普通文化课上玩命死磕到底",
          detail: "‘家里经不起这样的折腾，我只能靠纯文化课考出来。’",
          reaction: "你把作息压缩到极限，最终以超普高线3分的惊险成绩压线入读普通高中。",
          delta: { academicCapital: 20, resilience: 20, health: -10 },
          trackTrigger: "academic",
          addTags: ["压线逆袭", "硬骨头"]
        },
        {
          text: "报考三年制公费五年一贯制大专（师范定向/幼师）",
          detail: "免学费包住宿，毕业后直接回乡任教或就业，为家里减负。",
          reaction: "你在安稳的师范校园里安顿下来，提前锁定了体制内定向生态位。",
          delta: { kinshipGuilt: 10, rebellion: -20, savings: 2000 },
          trackTrigger: "vocational",
          addTags: ["公费师范", "安稳求生"]
        }
      ]
    },
    {
      id: "age_15_family_stop",
      age: 15,
      stageName: "初中三年级 · 15岁",
      title: "父母劝阻读书与老家摊位的交接",
      scene:
        "家里生意亏损严重，父亲在饭桌上拍桌子叹气：‘念那么多书有什么用，还不如早点跟着我跑货车/看档口，家里弟弟妹妹还要开销！’母亲在旁边抹泪不说话。",
      type: "choice",
      choices: [
        {
          text: "坚决不从，拿着自己挣的奖学金和零花钱搬进学校自习室",
          detail: "‘哪怕要饭我也要把书念完，你们拦不住我！’",
          reaction: "班主任和校长亲自上门做你父母的思想工作，学校为你免除了学杂费。",
          delta: { rebellion: 35, academicCapital: 20, kinshipGuilt: -15, resilience: 20 },
          trackTrigger: "academic",
          addTags: ["破门求学", "逆流而上"]
        },
        {
          text: "接管家里摊位，白天出摊卖货，夜里自考中专/大专学历",
          detail: "体恤父母的难处，把家庭责任扛在肩上，但并未彻底放弃读书。",
          reaction: "你成了集贸市场里最年轻有文化的摊主，账目理得清清楚楚。",
          delta: { resilience: 25, kinshipGuilt: 20, savings: 3000, academicCapital: -5 },
          trackTrigger: "vocational",
          addTags: ["负重孝子", "半工半读"]
        },
        {
          text: "收拾包裹连夜坐大巴投奔在沿海打工的表哥",
          detail: "彻底与原生家庭决裂，奔赴南方大都市寻找自己的命运。",
          reaction: "在深圳工业区的轰鸣声中，你开启了早熟的打工漂流记。",
          delta: { rebellion: 40, kinshipGuilt: -30, savings: 1500, resilience: 25 },
          addTags: ["少年离家", "异乡漂流"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 16岁 · 高中/职校阶段
  // --------------------------------------------------------------------------
  16: [
    {
      id: "age_16_rankings_cut",
      age: 16,
      stageName: "高中/职校阶段 · 16岁",
      title: "普高月考大榜排名如刀割",
      scene:
        "普高教室走廊上挂满了大红排位榜，每次月考名次上下浮动几名都牵动着全家人的神经。同桌在晚自习因为做不出最后一道导数大题号啕大哭被家长接回家。你看着漆黑的窗外，体会到了独木桥的冷酷。",
      type: "natural",
      naturalDelta: { cognition: 10, academicCapital: 10, health: -5 }
    },
    {
      id: "age_16_lathe_work",
      age: 16,
      stageName: "高中/职校阶段 · 16岁",
      title: "实训车间机床车出的第一枚螺母",
      scene:
        "在职业中专的金属切削实训车间，你戴着护目镜在车床前站了整整一个下午。当千分尺卡准尺寸的那一刻，一根光洁标准的金属螺栓在机油中成型。实训师傅点头夸你有悟性，你体会到了把控具体物质的踏实感。",
      type: "natural",
      naturalDelta: { resilience: 15, cognition: 5, savings: 200 }
    },
    {
      id: "age_16_assembly_line",
      age: 16,
      stageName: "高中/职校阶段 · 16岁",
      title: "两班倒流水线上的第一份整千工资",
      scene:
        "沿海电子厂流水线上，八小时两班倒，手指机械地贴着手机盖板防尘膜。月底银行卡上到账了第一笔两千四百块工资。你第一次在ATM机前看着吐出的钞票，给家里汇了一半，另一半紧紧贴在内衣口袋。",
      type: "natural",
      naturalDelta: { resilience: 15, savings: 1200, kinshipGuilt: 10 }
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
      title: "高三冲刺倒计时与生理极限",
      scene:
        "普高黑板上的倒计时一天天迫近，早晨5点半晨读，晚自习满是翻书声与叹息；职高那边校企合作大巴已停在校门口。面对身心极限，你做出最终调整。",
      type: "choice",
      choices: [
        {
          text: "全力自律刷题，把作息压榨到生理极限",
          detail: "你用极度的自律封锁了所有脆弱，大冬天洗冷水脸，风油精擦在眼皮底下。",
          reaction: "你的模拟考成绩锁死在第一梯队，但慢性浅表性胃炎和偏头痛成了甩不掉的毛病。",
          delta: { cognition: 25, academicCapital: 25, health: -15, resilience: 15 },
          addTags: ["冷血做题机", "自律苦修"]
        },
        {
          text: "保持平和心态，每天散步排解焦虑保全心智",
          detail: "‘如果通关的前提是彻底崩溃，那我宁可做一个身心健全的普通人。’",
          reaction: "虽然没有拔尖，但你保全了内心的完整与松弛，成绩处于中常水平。",
          delta: { happiness: 20, health: 10, cognition: 5 },
          addTags: ["精神完整", "松弛防线"]
        },
        {
          text: "职高深钻实操技能，拿下职业资格证",
          detail: "把所有课余时间投在车床机修和电气布线上，手上的机油成了你的底气。",
          reaction: "校企实习面试你拔得头筹，工厂师傅对你的实操规范赞不绝口。",
          delta: { resilience: 30, savings: 1000, cognition: 10 },
          addTags: ["技能立身", "实干底色"]
        }
      ]
    },
    {
      id: "age_17_recommendation",
      age: 17,
      stageName: "冲刺阶段 · 17岁",
      title: "自主招生与保送加分资格的风波",
      scene:
        "高考前夕，省重点高校在县中投放了三个自招降分名额。原本按照摸底排名稳稳有你一个，但红榜公布时你的名字被县领导亲属顶替了。全班死一般沉寂。",
      type: "choice",
      choices: [
        {
          text: "咽下所有委屈，把愤怒化为刷题狠劲，誓要裸分赢回尊严",
          detail: "‘既然潜规则不让我走近道，我就用硬实力把他们碾碎！’",
          reaction: "高考最后冲刺你每天只睡四个小时，模拟考分数一路暴涨突破640分。",
          delta: { academicCapital: 30, resilience: 25, inferiority: -10 },
          addTags: ["裸分硬核", "发愤图强"]
        },
        {
          text: "向省教育考试院实名写信并提交复核申诉材料",
          detail: "骨子里拥有坚不可摧的原则感，绝不容许潜规则践踏自己的青春。",
          reaction: "调查组入驻核查，顶替者被取消资格，名额公正归还，你成了全校传奇。",
          delta: { rebellion: 35, resilience: 20, social: 15 },
          addTags: ["硬骨正气", "维权斗士"]
        },
        {
          text: "心态大崩，借酒浇愁破罐破摔放弃最后复习",
          detail: "第一次深刻体会到现实的不公，对所谓应试公平产生了幻灭感。",
          reaction: "成绩出现断崖式滑坡，跌入普通本科或大专批次。",
          delta: { academicCapital: -20, happiness: -20, rebellion: 25 },
          addTags: ["幻灭受挫", "青春阵痛"]
        }
      ]
    },
    {
      id: "age_17_mock_down",
      age: 17,
      stageName: "冲刺阶段 · 17岁",
      title: "三模严重失常与班主任的保底劝诫",
      scene:
        "三模放榜，理综答题卡涂错答卷，分数暴跌80分。班主任在走廊抽烟长叹：‘以你家里的经受力，千万不能赌一本了，服从调剂填报省内公费定向师范或者专科警校吧，包分配！’",
      type: "choice",
      choices: [
        {
          text: "推翻班主任的保守方案，坚信真实水准，依然主报985/211硬核工科",
          detail: "经得起大风大浪，拥有顶尖高手的定力与自信。",
          reaction: "高考正试你发挥神勇，彻底洗刷三模耻辱，斩获重点大学录取通知书。",
          delta: { resilience: 30, academicCapital: 20, rebellion: 20 },
          addTags: ["大心脏", "逆风翻盘"]
        },
        {
          text: "顺从接受现实，修改志愿为包分配的省内定向师范/公费警校",
          detail: "深知家里经不起复读和大城市的失业风险，将稳妥安全感置于一切之上。",
          reaction: "稳稳拿到了体制包分配的敲门砖，全家人松了一大口气。",
          delta: { kinshipGuilt: 20, rebellion: -25, savings: 5000 },
          addTags: ["求稳扎根", "体制预备"]
        },
        {
          text: "坦然接纳分数，主报沿海普通公办大学软件/外贸专业，准备去海边闯荡",
          detail: "不留恋老家，一心只想借着大学的跳板远离内陆熟人池塘。",
          reaction: "虽然文凭不算顶尖，但沿海广阔的市场和实习机会为你打开了全新天地。",
          delta: { rebellion: 25, resilience: 20, social: 15 },
          addTags: ["奔赴沿海", "跳出故土"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 19岁 · 大学/职场起步
  // --------------------------------------------------------------------------
  19: [
    {
      id: "age_19_campus",
      age: 19,
      stageName: "大学/职场起步 · 19岁",
      title: "跨入新天地与独立生活费的打理",
      scene:
        "你提着行李箱走进大学校门或职工宿舍。没有了高中的管束，第一笔一个月八百块的生活费攥在手里。食堂的打菜窗口、第一次办理的银行卡，你开始真正作为成年人独立打理日常开支。",
      type: "natural",
      naturalDelta: { social: 10, cognition: 10, rebellion: 10 }
    },
    {
      id: "age_19_contract_worker",
      age: 19,
      stageName: "大学/职场起步 · 19岁",
      title: "穿上发硬的蓝色工装正式打卡入职",
      scene:
        "在工业园区的车间打卡机前，你领到了属于自己的工牌与两套蓝色长袖工装。没有象牙塔的漫游，十九岁的你直接跨入社会机器，在轰鸣的生产线旁开始了按月领薪的劳动生涯。",
      type: "natural",
      naturalDelta: { resilience: 15, savings: 3000, social: 5 }
    },
    {
      id: "age_19_repeater",
      age: 19,
      stageName: "大学/职场起步 · 19岁",
      title: "复读班阴暗教室里的二次背水一战",
      scene:
        "交了三万块高额复读赞助费，你坐在复读集中营最后一排。周围全是复读二战甚至三战的苦行僧。早晨5点进班，桌上厚厚的五年高考三年模拟把视线挡得严严实实，你发誓明年一定要杀出去。",
      type: "natural",
      naturalDelta: { academicCapital: 20, resilience: 15, health: -10, savings: -15000 }
    }
  ],

  // --------------------------------------------------------------------------
  // 20岁 · 大学阶段 (Choice)
  // --------------------------------------------------------------------------
  20: [
    {
      id: "age_20_apple",
      age: 20,
      stageName: "大学阶段 · 20岁",
      title: "宿舍夜谈与苹果全家桶的阶层落差",
      scene:
        "大二这年，同寝室本地家庭的同学换了最新款的苹果电脑，讨论去欧洲交流；而你刚用做家教兼职攒下的钱，换了一部二手手机。熄灯后大家谈论出路：有人家里准备全款买房，有人已经联系好了海外留学的导师。",
      type: "choice",
      choices: [
        {
          text: "周末兼职打三份工拼命存下每一个铜板",
          detail: "你用肉身的疲惫置换金钱的安全感，两年来没有参加过任何一次超过人均50块的聚餐。",
          reaction: "银行卡上的数字终于破了五位数。虽然在聚会里你最沉默，但你有底气不再向家里要钱。",
          delta: { resilience: 20, savings: 8000, inferiority: -10, health: -5 },
          addTags: ["拼命攒钱", "边缘独行"]
        },
        {
          text: "泡在图书馆和自习室：拼国家奖学金与专业硬核证书",
          detail: "你相信只要把专业实力磨到极致，社会的规则就不会轻易将你埋没。",
          reaction: "你的专业绩点冲到年级前三，拿下了八千块国奖，但体检时发现腰椎开始曲度变直。",
          delta: { cognition: 20, academicCapital: 20, savings: 8000 },
          addTags: ["硬核做题", "自律苦修"]
        },
        {
          text: "参与社团学生会，学习规则与应酬",
          detail: "你敏锐察觉到了规则的运行逻辑，开始学着把棱角磨平，学着讲得体的套话与场面话。",
          reaction: "老师对你越来越赞许，在留校与推优指标上留了你的名字。你感到自己正在成为机器的一部分。",
          delta: { social: 20, cognition: 10, rebellion: -15 },
          addTags: ["体制圆滑", "熟稔规则"]
        }
      ]
    },
    {
      id: "age_20_love_class",
      age: 20,
      stageName: "大学阶段 · 20岁",
      title: "跨越阶层的校园初恋与现实撕裂",
      scene:
        "你喜欢上了同系一个家境优渥的姑娘/男孩。周末对方约你去高档日料店聚餐，人均四百元是你半个月的伙食费。对方父母开着奔驰来校门口接送，谈笑间是省城人脉与未来出国安排。",
      type: "choice",
      choices: [
        {
          text: "自卑退缩，找借口逐渐冷淡，主动掐灭这段不对等的感情",
          detail: "深知两家家境犹如天堑，不想让自己和父母在现实面前受辱。",
          reaction: "你把所有时间扑在代码和专业书里，深夜操场跑步时泪流满面。",
          delta: { inferiority: 15, resilience: 15, academicCapital: 10 },
          addTags: ["理性退避", "阶层刺痛"]
        },
        {
          text: "坦然相告家庭实况，带对方去吃自己最拿手的大排档与苍蝇馆子",
          detail: "不打肿脸充胖子，用真诚和骨气面对两人的差异。",
          reaction: "对方被你的坦率与自立打动，两人度过了一段最真挚清贫的校园时光。",
          delta: { happiness: 20, social: 15, inferiority: -15 },
          addTags: ["坦荡真诚", "真挚情感"]
        },
        {
          text: "办信用卡套现硬撑体面，逢年过节赠送昂贵礼物维护关系",
          detail: "极度自尊敏感，哪怕债务缠身也不肯在对方面前矮上一头。",
          reaction: "信用卡账单利滚利欠下一万多，月底被催款电话逼得整夜失眠。",
          delta: { kinshipGuilt: 15, savings: -12000, inferiority: 20 },
          addTags: ["死要面子", "消费透支"]
        }
      ]
    },
    {
      id: "age_20_professor_pie",
      age: 20,
      stageName: "大学阶段 · 20岁",
      title: "系主任的大饼与实验室免费杂工",
      scene:
        "系里颇有声望的教授找到你，许诺‘只要帮我做完这个横向项目，明年保研和大厂推荐全包’。进组后你发现自己成了全天候打杂苦力，写报销发票、取快递、熬夜洗数据，毫无学术指导。",
      type: "choice",
      choices: [
        {
          text: "任劳任怨当好全职苦力，把棱角藏起来换取体制敲门砖",
          detail: "深谙人情社会的交换法则，只要能拿到推荐信，受点委屈算不了什么。",
          reaction: "教授年底确实在重要推荐名单上签了字，你提前锁定了核心保研通道。",
          delta: { social: 20, rebellion: -20, kinshipGuilt: 10 },
          addTags: ["深谙人情", "隐忍换利"]
        },
        {
          text: "坚决拒绝无休止的画饼打杂，果断退组自己海投校外大厂实习",
          detail: "信奉市场价值大于象牙塔权威，不甘沦为导师的私人仆从。",
          reaction: "教授脸色铁青将你除名，但你在校外头部私企斩获了极具含金量的实战经验。",
          delta: { rebellion: 30, resilience: 20, savings: 4000 },
          addTags: ["反抗画饼", "市场立身"]
        },
        {
          text: "联合被压榨的同门师兄，搜集财务报销违规材料匿名向学院纪委反映",
          detail: "骨子里拥有强烈的正义感，绝不姑息学术流氓行径。",
          reaction: "院内引起震动，教授被通报批评停招研究生，整个实验室风气为之一肃。",
          delta: { rebellion: 40, resilience: 25, social: -10 },
          addTags: ["学术维权", "孤胆破局"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 21岁 · 大三下/毕业前夕
  // --------------------------------------------------------------------------
  21: [
    {
      id: "age_21_recruitment",
      age: 21,
      stageName: "大三/职场深耕 · 21岁",
      title: "招聘会前的旧西装与考研自习室长队",
      scene:
        "走廊里弥漫着求职的焦虑。考研自习室凌晨排起长队，招聘宣讲会上的企业开始设定严格的学历与年龄初筛。你站在人流涌动的广场前，感受到社会的齿轮正在加速运转。",
      type: "natural",
      naturalDelta: { cognition: 10, resilience: 10 }
    },
    {
      id: "age_21_lead_worker",
      age: 21,
      stageName: "大三/职场深耕 · 21岁",
      title: "车间骨干技工与带徒弟的踏实",
      scene:
        "经过两年摸爬滚打，你已经成了车间核心机台最年轻的带班师傅，带了第一批来自家乡的新实习生。月底领到技能骨干津贴，你给老家汇款一万块，父亲在电话里第一次用平等的成年人语气和你商量家里的事。",
      type: "natural",
      naturalDelta: { resilience: 20, savings: 6000, inferiority: -10 }
    },
    {
      id: "age_21_rejection_emails",
      age: 21,
      stageName: "大三/职场深耕 · 21岁",
      title: "上百封石沉大海的求职简历与冷雨",
      scene:
        "网申系统投出的上百份简历大多在第一轮初筛中石沉大海。偶尔收到的感谢信冰冷礼貌。在冬夜寒雨中，你裹紧外套走出招聘大厅，第一次真切体会到应届生在经济下行周期里的渺小。",
      type: "natural",
      naturalDelta: { resilience: 15, inferiority: 10, happiness: -5 }
    }
  ],

  // --------------------------------------------------------------------------
  // 22岁 · 毕业大十字路口 (Choice)
  // --------------------------------------------------------------------------
  22: [
    {
      id: "age_22_graduation",
      age: 22,
      stageName: "毕业十字路口 · 22岁",
      title: "六月毕业季的离校大迁徙",
      scene:
        "毕业答辩结束，室友的行李箱在走廊滚出嘈杂的声响。招聘会的大厅挤满了穿廉价西装的应届生，上万份简历在地上被踩得满是泥印。你必须选择毕业后的第一块落脚点：",
      type: "choice",
      choices: [
        {
          text: "回老家备战考编/三支一扶/县城事业单位，全职脱产备考",
          detail: "回到熟悉的县城房间，每天在母亲做饭的油烟味中刷行测与申论，不敢出门见高中同学。",
          reaction: "父母对外宣布你在‘备战体制’，但你感到自己的青春正像一盆放置在背阴处的冷水，一天天蒸发。",
          delta: { kinshipGuilt: 25, rebellion: -20, savings: -5000, inferiority: 10 },
          addTags: ["脱产考编", "深陷故土"]
        },
        {
          text: "拎着行李直奔一线城市城中村，进入私企/大厂外包996",
          detail: "住在隔断出来的单间，窗外对着邻居家空调外机，每天通勤三个小时挤在窒息的地铁早高峰。",
          reaction: "第一个月拿到转正工资七千五，扣除房租和杂费只剩一半。你第一次真正感知到城市的现实。",
          delta: { rebellion: 25, resilience: 20, savings: 3500 },
          addTags: ["大城市漂流", "996螺丝钉"]
        },
        {
          text: "靠一门硬技术/专业执照入行（汽修技师、医疗护工、独立手艺）",
          detail: "不图虚名，用体力与具体的专业技能换取现钱，每天下班手上都带着机油或消毒水味道。",
          reaction: "没有白领的光鲜，但你几乎没有失业焦虑。看着手里一点点积攒起来的硬通货，感到踏实的安全感。",
          delta: { resilience: 25, rebellion: 15, savings: 6000, inferiority: -10 },
          addTags: ["蓝领实干", "硬核技能"]
        }
      ]
    },
    {
      id: "age_22_foreign_vs_soe",
      age: 22,
      stageName: "毕业十字路口 · 22岁",
      title: "一线知名外企offer与老家国企托人安置岗",
      scene:
        "手里捏着两个截然不同的录用通知：一个是上海头部外企的高薪项目专员，前景辽阔但完全靠绩效说话；另一个是父亲托尽老战友关系在县城水利局安排的事业编制聘用工。",
      type: "choice",
      choices: [
        {
          text: "撕掉老家的关系安置表，提上行李箱奔赴大都会外企",
          detail: "渴望见证更广阔的世界，拒绝在二十二岁就一眼望尽这辈子退休的模样。",
          reaction: "外企节奏飞快，英文会议和KPI逼得你飞速蜕变，你成了朋友圈最光鲜的都市白领。",
          delta: { rebellion: 30, cognition: 20, savings: 8000, kinshipGuilt: -15 },
          addTags: ["外企精英", "向外闯荡"]
        },
        {
          text: "听从父母苦劝回老家县城，穿上夹克进入国企安稳过日子",
          detail: "‘在大城市干到35岁也是被开除，老家旱涝保收有编制才是正道。’",
          reaction: "父母喜笑颜开逢人便夸，你在办公室学着看报泡茶写公文，生活波澜不惊。",
          delta: { kinshipGuilt: 25, rebellion: -30, savings: 3000 },
          addTags: ["体制安顿", "守土承欢"]
        },
        {
          text: "两个都不去，与大学同学合伙在二线城市搞电商/自媒体创业",
          detail: "不愿意给人打工，想趁着年轻没有家庭包袱狠狠搏一把时代风口。",
          reaction: "住在商住两用公寓里没日没夜通宵剪视频测品，第一季度流水突破十万。",
          delta: { rebellion: 35, resilience: 30, savings: 15000 },
          addTags: ["青年创业", "搏击风口"]
        }
      ]
    },
    {
      id: "age_22_unemployed_delivery",
      age: 22,
      stageName: "毕业十字路口 · 22岁",
      title: "断崖式毕业季与城中村黄色骑手服",
      scene:
        "恰逢行业大裁员，校招offer在毕业前一周被企业单方面违约撕毁。没有积蓄交下月房租，父母在电话里不停追问‘找到工作没有’。你看着城中村电线杆上的招聘广告陷入绝境。",
      type: "choice",
      choices: [
        {
          text: "租一辆二手电动车，穿上黄色反光马甲，开始跑全城同城外卖",
          detail: "放下读书人的所谓面子，在生存面前先让自己活下来。",
          reaction: "风里来雨里去，一个月骑行三千公里，你存下六千块，眼神里多了一份硬汉的凶狠。",
          delta: { resilience: 35, savings: 6000, inferiority: -5 },
          addTags: ["骑手求生", "放下面子"]
        },
        {
          text: "刷信用卡两万块报名大厂转码/全栈技术特训班，背水一战",
          detail: "深信专业技能是唯一的逃生通道，愿意借债重构核心竞争力。",
          reaction: "整整五个月每天刷算法题写开源项目，半年后你斩获二线大厂开发岗位补录。",
          delta: { cognition: 25, resilience: 20, savings: -18000 },
          addTags: ["逆境转码", "背水翻盘"]
        },
        {
          text: "灰溜溜收拾铺盖回老家农贸市场，接管父母的摊位卖水果蔬菜",
          detail: "在残酷的市场现实面前败下阵来，选择回归最原始的家庭堡垒。",
          reaction: "亲友邻居私下议论‘大学生还不是回来卖菜’，但你让家里的摊位月流水翻了一倍。",
          delta: { kinshipGuilt: 15, inferiority: 15, savings: 4000 },
          addTags: ["回乡掌舵", "市井务实"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 23岁 · 走向社会第1年 (Choice)
  // --------------------------------------------------------------------------
  23: [
    {
      id: "age_23_probation",
      age: 23,
      stageName: "走向社会 · 第1年",
      title: "试用期最后一周的裁撤谈话",
      scene:
        "年底经济形势下行，公司突击宣布裁减新人指标。在试用期的第5个月零20天，HR在玻璃隔间约谈你，桌上放着一份主动辞职协议，理由是‘业务结构调整，人岗匹配度不足’，暗示如果不签不仅没有证明还会影响档案背调。",
      type: "choice",
      choices: [
        {
          text: "录音取证，据理力争：‘不给N+1合法补偿，我明天就去劳动仲裁大厅立案’",
          detail: "你没有像同批同事那样哭着签字走人。你在冷风里骑车去劳动局打印材料，连打了三天热线。",
          reaction: "HR最终妥协，多赔了一个月工资把你打发走。虽然丢了工作，但你第一次发现规则并非不可抗争。",
          delta: { rebellion: 30, resilience: 25, savings: 8500 },
          addTags: ["硬骨头仲裁", "识破职场"]
        },
        {
          text: "忍气吞声签字走人，并在当晚电话里对父母报喜不报忧：‘公司很好，年终还有奖金’",
          detail: "挂断电话，你在零下五度的天桥上把冷掉的煎饼果子一口口咽下去，眼泪掉在塑料袋里。",
          reaction: "你把所有苦难咽进胃里。为了省钱，你把出租屋退掉，搬进了不见天日的地下室隔间。",
          delta: { inferiority: 20, kinshipGuilt: 15, savings: -2000 },
          addTags: ["报喜不报忧", "隐忍硬扛"]
        }
      ]
    },
    {
      id: "age_23_scapegoat",
      age: 23,
      stageName: "走向社会 · 第1年",
      title: "重大项目线上事故与直属总监的推诿",
      scene:
        "核心系统因为老员工遗留代码在双十一出现故障造成损失。分管副总裁大发雷霆，你的直属总监在私聊里暗示你：‘你是新人，认个过失记个警告就过去了，年终奖我私下补给你。’",
      type: "choice",
      choices: [
        {
          text: "拒绝背黑锅，在全员复盘大会上拿出Git版本提交记录与聊天证据自证清白",
          detail: "绝不容许他人用自己的职业声誉做垫脚石，敢于当众掀翻暗箱操作。",
          reaction: "总监当场颜面扫地被调职，副总裁赏识你的专业严谨，破格将你提拔为小组骨干。",
          delta: { rebellion: 25, resilience: 25, cognition: 15 },
          addTags: ["刚正自守", "职场破局"]
        },
        {
          text: "咬牙认下过失当了总监的挡箭牌，换取其死党圈子的信任",
          detail: "深谙办公室政治的阴暗面，选择把良心暂时按在水底换取靠山庇护。",
          reaction: "绩效被打了D，但总监随后在内部核心项目中处处偏向你，你成了他的心腹嫡系。",
          delta: { social: 25, rebellion: -25, kinshipGuilt: 10 },
          addTags: ["站队借势", "权术老练"]
        },
        {
          text: "忍无可忍，当晚将辞职信摔在总监桌上裸辞走人",
          detail: "骨子里眼里揉不得沙子，宁可在冬天重新找工作也不与蝇营狗苟为伍。",
          reaction: "虽然断了社保和收入，但走出大厦那一刻，寒风中的你感到呼吸从未有过的自由。",
          delta: { rebellion: 35, resilience: 20, savings: -4000 },
          addTags: ["快意恩仇", "宁折不弯"]
        }
      ]
    },
    {
      id: "age_23_gray_commission",
      age: 23,
      stageName: "走向社会 · 第1年",
      title: "采购回扣信封与行业潜规则的抉择",
      scene:
        "作为采购/质检员，供应商老总在请客饭局后塞给你一个厚厚的信封，里面装有一万元现金，请求对一批有微瑕的物料睁一只眼闭一只眼。老员工私下告诉你‘大家都在拿，不拿就是不合群’。",
      type: "choice",
      choices: [
        {
          text: "当面将信封推回，次日一早如实出具检验不合格报告",
          detail: "恪守职业底线，不因眼前小利而给人生埋下随时爆炸的定时炸弹。",
          reaction: "虽然被部分老油条孤立，但公司法务与内审介入后，你成了全集团的合规标杆。",
          delta: { resilience: 25, rebellion: 15, savings: 0 },
          addTags: ["恪守底线", "风骨坚挺"]
        },
        {
          text: "收下信封藏在床底下，默许物料入库，随波逐流融入灰色圈子",
          detail: "看着老家父母的药费催款，终于向生活的现实诱惑妥协认命。",
          reaction: "手里多了一笔私房钱，但每逢集团通报反腐警示时，你都心惊肉跳夜不能寐。",
          delta: { savings: 10000, inferiority: 15, kinshipGuilt: 10 },
          addTags: ["潜规则随波", "心怀惴惴"]
        },
        {
          text: "拒收信封并暗中搜集完整证据链，跳槽至行业竞品头部企业",
          detail: "机智老练，既不让自己深陷烂泥，又将行业洞察作为跳槽的绝佳谈判筹码。",
          reaction: "新公司以双倍薪资挖你过去负责质控体系，你完成了漂亮的职业生涯跃迁。",
          delta: { cognition: 25, social: 15, savings: 12000 },
          addTags: ["机智借力", "华丽跳槽"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 24岁 · 走向社会第2年 (Choice)
  // --------------------------------------------------------------------------
  24: [
    {
      id: "age_24_wedding",
      age: 24,
      stageName: "走向社会 · 第2年",
      title: "高中同桌婚礼与人情礼金",
      scene:
        "国庆假期，高中群里弹出请柬：当年坐在你后排的同学结婚，新郎是县住建局副局长的儿子。全班同学纷纷在群里报礼单。你卡里只剩三千块，扣掉下月房租后所剩无几。",
      type: "choice",
      choices: [
        {
          text: "刷信用卡套现随礼1000元，并坐夜班绿皮车回老家参加婚礼",
          detail: "酒席上，亲戚和老同学拉着你的手盘问：‘在大城市一个月挣多少？买房没有？有没有编制？’",
          reaction: "你在敬酒的假笑中耗尽了社交能量。回程火车上，你看着下个月账单，感到深深的疲惫。",
          delta: { kinshipGuilt: 20, inferiority: 15, savings: -2500 },
          addTags: ["人情透支", "亲戚压力"]
        },
        {
          text: "装作工作脱不开身，微信私发200元红包与祝福，拒绝回乡",
          detail: "同学收了红包回了客套的表情，但高中群里关于你的讨论悄悄冷落下来，母亲打电话怪你‘不知人情往来’。",
          reaction: "你渐渐脱离了老家的核心熟人圈。但那个长假，你在出租屋里安安静静看完了两本书，感到从未有过的清静。",
          delta: { rebellion: 35, kinshipGuilt: -20, savings: -200 },
          addTags: ["斩断故交", "精神离土"]
        }
      ]
    },
    {
      id: "age_24_blind_date",
      age: 24,
      stageName: "走向社会 · 第2年",
      title: "老家县城茶楼的相亲流水席",
      scene:
        "春节被母亲硬拽到县城茶楼相亲。对面坐着县农商行有编制的姑娘/局长家儿子及其父母。对方母亲开门见山：‘小陈在大城市一个月税后多少？首付买得起哪的房？家里父母有没有社保？’",
      type: "choice",
      choices: [
        {
          text: "平静坦白现实：‘我在一线租房打拼，暂时买不起房，全靠自己’",
          detail: "拒绝迎合小城编制攀比的价值观，不卑不亢守住个人边界。",
          reaction: "对方父母撇了撇嘴找借口离席，母亲气得一路掉泪骂你‘死脑筋不会吹嘘’。",
          delta: { rebellion: 25, inferiority: 10, kinshipGuilt: -15 },
          addTags: ["拒绝迎合", "冷眼相亲"]
        },
        {
          text: "吹嘘大城市年薪与期权前景，把对方唬得一愣一愣",
          detail: "深谙人性弱点，用大厂光环与专业术语掩盖银行卡余额的窘迫。",
          reaction: "对方全家对你刮目相看热络夹菜，但你心里清楚自己撒的谎随时会穿帮。",
          delta: { social: 20, inferiority: 15, savings: -500 },
          addTags: ["装点门面", "虚荣自护"]
        },
        {
          text: "听从父母摆布，同意妥协定亲，换取对方家庭在本地的资源提携",
          detail: "向世俗秩序彻底低头，用婚姻作为阶层落地和资产结盟的快速通道。",
          reaction: "两家迅速敲定婚期，你感到一根无形的传统缰绳牢牢套在了自己脖子上。",
          delta: { kinshipGuilt: 30, rebellion: -35, savings: 30000 },
          addTags: ["宗族联姻", "交出自由"]
        }
      ]
    },
    {
      id: "age_24_headhunt_risk",
      age: 24,
      stageName: "走向社会 · 第2年",
      title: "竞品两倍年薪挖角与保密协议阴影",
      scene:
        "猎头打来电话：行业头部竞品开出月薪两万五+期权挖你带队，但原公司合同里签有极为苛刻的竞业限制协议，一旦被起诉可能面临高达三十万的违约索赔。",
      type: "choice",
      choices: [
        {
          text: "富贵险中求！换马甲借用亲属银行卡入职竞品，搏一把阶层跃迁",
          detail: "‘既然在这个行业，畏畏缩缩一辈子也攒不够首付！’",
          reaction: "收入实现跨越式增长，你给父母换了新家电，但每天上班都戴着口罩防前同事认出。",
          delta: { rebellion: 30, savings: 25000, resilience: 20 },
          addTags: ["铤而走险", "收入暴增"]
        },
        {
          text: "以竞品offer为筹码找现任大领导摊牌加薪晋升",
          detail: "聪明而务实，用外部市场行情撬动内部沉睡资源。",
          reaction: "大领导为你申请了30%涨薪并升为资深主管，你稳妥化解了竞业风险。",
          delta: { cognition: 20, social: 15, savings: 10000 },
          addTags: ["职场博弈", "稳健加薪"]
        },
        {
          text: "拒绝竞品诱惑，留守原职踏实磨炼全套底层技术架构",
          detail: "不为短期浮财迷眼，深知把核心技术学到手里才是自己永远搬不走的资产。",
          reaction: "你在原团队成了不可替代的系统架构台柱，声誉在行业圈内广为流传。",
          delta: { cognition: 25, academicCapital: 15, rebellion: -10 },
          addTags: ["深积跬步", "技术定力"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 25岁 · 走向社会第3年 (Choice)
  // --------------------------------------------------------------------------
  25: [
    {
      id: "age_25_health_4a",
      age: 25,
      stageName: "走向社会 · 第3年",
      title: "体检报告的4A红字与无休加班",
      scene:
        "年终体检中心寄来报告单：甲状腺结节TI-RADS 4A类（建议随访穿刺）、轻度脂肪肝、心律不齐。同周，部门总监召集开会宣布：‘全行业都在降本增效，下季度全面取消周末双休，拥抱攻坚状态。’",
      type: "choice",
      choices: [
        {
          text: "去医院做穿刺检查，请假一周，开始把作息硬性切回11点前睡觉，拒绝无意义摸鱼加班",
          detail: "总监在周会上当众点名批评你‘缺乏奉献精神’，并将你从核心项目调出。",
          reaction: "虽然绩效被打了C，但结节复查为良性。你站在深夜空无一人的天桥上，看着满城霓虹，心里多了一分释然。",
          delta: { rebellion: 25, resilience: 20, health: 10, savings: -1500 },
          addTags: ["保命哲学", "看破内卷"]
        },
        {
          text: "把报告收进抽屉假装没看见，吞两颗止痛片继续在深夜熬夜赶项目材料",
          detail: "‘大家都这么熬，我如果停下来，下个月的房租和老家父母的药钱谁来出？’",
          reaction: "年底你拿到了‘优秀员工’奖杯和一万二奖金，但你发现自己晨起时心慌手抖的次数越来越频繁。",
          delta: { rebellion: -20, kinshipGuilt: 20, health: -15, savings: 12000 },
          addTags: ["透支健康", "高压奉献"]
        }
      ]
    },
    {
      id: "age_25_credit_stolen",
      age: 25,
      stageName: "走向社会 · 第3年",
      title: "空降关系户抢走重大项目核心一作",
      scene:
        "你熬了整整大半年的创新业务线大获成功，眼看就要迎来全员升职加薪。大领导突然将分管局长的内侄空降过来担任项目第一负责人，并在庆功宴上将主要功劳全归于其麾下。",
      type: "choice",
      choices: [
        {
          text: "整理半年来所有的设计稿与代码提交底稿，实名向集团高管与工会申诉",
          detail: "‘我流的血汗，绝不容许任何寄生虫平白窃取！’",
          reaction: "申诉引起轩然大波，高层平衡各方，补发给你专项功勋奖金与期权补偿。",
          delta: { rebellion: 35, resilience: 20, savings: 20000 },
          addTags: ["硬刚霸权", "捍卫成果"]
        },
        {
          text: "彻底看破职场权贵逻辑，开始表面顺从、暗中摸鱼兼职搞副业",
          detail: "不再为公司卖命，把精力投入到个人资产和独立咨询业务的构建中。",
          reaction: "白天按时下班，晚上做独立开发和接单，副业收入很快超过了本职薪资。",
          delta: { rebellion: 25, savings: 25000, health: 5 },
          addTags: ["看破摸鱼", "副业突围"]
        },
        {
          text: "强忍委屈陪着笑脸给空降领导敬酒，博取其好感换取资源倾斜",
          detail: "现实主义者，信奉‘既然打不过，那就加入他们分一杯羹’。",
          reaction: "空降领导视你为最能干的靠山副手，带着你出入高端酒局，你在体制外借上了体制的东风。",
          delta: { social: 25, rebellion: -25, kinshipGuilt: 10 },
          addTags: ["借力权贵", "圆滑借势"]
        }
      ]
    },
    {
      id: "age_25_demolition_strife",
      age: 25,
      stageName: "走向社会 · 第3年",
      title: "老家拆迁款风波与至亲撕破脸皮",
      scene:
        "老家祖宅划入城际铁路拆迁范围，赔偿八十万现金和两套安置房。原本和睦的姑姑、二叔和舅舅突然撕破脸皮天天上门砸门争家产，甚至把老太太推倒在地，母亲哭得昏厥过去。",
      type: "choice",
      choices: [
        {
          text: "请假请律师回老家，拿起法律武器帮父母打赢确权官司保全全套房产",
          detail: "成为家庭最硬核的法律和主心骨，彻底打碎亲族吃绝户的妄想。",
          reaction: "官司胜诉，父母顺利拿到属于全家的一套房与四十万现金，亲戚虽反目但家庭底气大增。",
          delta: { resilience: 30, kinshipGuilt: 20, savings: 40000 },
          addTags: ["家族脊梁", "法律御敌"]
        },
        {
          text: "向父母建议主动让出部分利益息事宁人：‘亲情闹成这样不值当’",
          detail: "不愿家庭深陷官司泥潭，选择以妥协和退让换取清净。",
          reaction: "亲戚们拿钱散去，老家归于平静，但父母常常看着分薄的存折长吁短叹。",
          delta: { kinshipGuilt: 10, inferiority: 10, savings: 10000 },
          addTags: ["息事宁人", "退让安顿"]
        },
        {
          text: "劝父母把老宅全部变现，彻底离开老家小城，来你工作的二线城市买房定居",
          detail: "借此机会彻底拔掉老家宗族盘根错节的毒瘤，实现全家物理大迁徙。",
          reaction: "父母卖掉老宅在省城付了全款，全家彻底跳出了熟人社会的泥淖。",
          delta: { rebellion: 35, savings: 50000, kinshipGuilt: -10 },
          addTags: ["连根拔起", "全家迁徙"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 26岁 · 走向社会第4年 (Choice)
  // --------------------------------------------------------------------------
  26: [
    {
      id: "age_26_mortgage",
      age: 26,
      stageName: "走向社会 · 第4年",
      title: "二线城市的六个钱包与三十年房贷",
      scene:
        "春节回家，父母突然关上房门，把一张存折放在桌上：‘我和你爸把老平房抵押，加上半辈子养老金，一共凑了60万。你在省会看好了一套期房，首付我们包了，每月房贷8200元你自己供，不买房哪个姑娘肯跟你结婚？’",
      type: "choice",
      choices: [
        {
          text: "接过存折按揭签字，背上30年房贷，完成全家族的落脚执念",
          detail: "签完字那一刻，你看着红色的购房合同，感到这辈子的人生路径已经被打上了水泥钢筋。",
          reaction: "从此你不敢轻易离职、不敢生病。每个月工资一到账就自动划扣8200元，你整个人被牢牢绑定在城市的按揭齿轮上。",
          delta: { kinshipGuilt: 35, rebellion: -30, savings: -20000, resilience: -10 },
          addTags: ["三十年房奴", "背负重资产"]
        },
        {
          text: "坚决推开存折：‘你们把老房抵押了，万一生大病住哪？我绝不为了所谓面子买高位期房’",
          detail: "父亲气得浑身发抖，拍桌子怒吼‘大逆不道！我们在亲戚面前头都抬不起来！’",
          reaction: "母亲抹着眼泪叹气。你背上背包连夜坐车返回出租屋，两代人在生活选择与风险承受力上的巨大分歧，在这一晚显露无遗。",
          delta: { rebellion: 45, kinshipGuilt: -30, resilience: 20 },
          addTags: ["划清界限", "理性止损"]
        }
      ]
    },
    {
      id: "age_26_marriage_price",
      age: 26,
      stageName: "走向社会 · 第4年",
      title: "谈婚论嫁的八十万彩礼与房产证加名谈判",
      scene:
        "相恋三年的对象到了谈婚论嫁阶段。双方家长在包厢坐定，对方父母态度坚决：必须在省城全款或按揭一套房且只写女方名字，外加38.8万彩礼，否则绝不松口领证。父母坐在对面局促得满头大汗。",
      type: "choice",
      choices: [
        {
          text: "当着全家人的面握紧对方的手，坚决表明态度：‘婚姻不是买卖，若按这个条件我结不起’",
          detail: "拒绝将自己和父母的骨髓榨干去迎合畸形的面子规则。",
          reaction: "谈判不欢而散，恋人哭着离去，不久后两人和平分手。你痛苦万分，但也避免了全家破产的绝境。",
          delta: { resilience: 30, rebellion: 35, kinshipGuilt: -15 },
          addTags: ["断舍离", "拒绝收割"]
        },
        {
          text: "四处找亲戚借贷、办信用贷凑齐彩礼首付，咬碎牙关答应条件成家",
          detail: "‘大家都这么过来的，为了能成个家，多大的苦我也得咽下去。’",
          reaction: "婚礼办得风风光光，但在洞房花烛夜，你看着手机里欠下的六十万债务账单，背脊发凉。",
          delta: { kinshipGuilt: 35, rebellion: -30, savings: -50000 },
          addTags: ["掏空六个钱包", "负债累累"]
        },
        {
          text: "说服恋人和你一起冲破双方家庭阻力，拿着户口本裸婚登记领证",
          detail: "两个人高度同频独立，坚信只要彼此相爱奋斗，租房也能过出有尊严的日子。",
          reaction: "两本红本到手，你们在路边吃了一碗牛肉面，发誓携手打拼属于自己的天地。",
          delta: { happiness: 30, rebellion: 40, resilience: 25 },
          addTags: ["裸婚携手", "超越世俗"]
        }
      ]
    },
    {
      id: "age_26_industry_black_swan",
      age: 26,
      stageName: "走向社会 · 第4年",
      title: "行业黑天鹅暴雷与连续三月欠薪",
      scene:
        "所处行业突遭政策重拳或暴雷清算，公司资金链断裂，全员停发工资已满三个月。老板每天在群里画饼承诺重组，房东已经在门口贴了停水停电催缴搬家通知。",
      type: "choice",
      choices: [
        {
          text: "牵头成立维权委员会，带着全套劳动合同和银行流水前往劳动监察大队申请财产保全",
          detail: "冷静沉着，不被任何画饼忽悠，用专业法律手段抢先锁定赔偿顺位。",
          reaction: "经过两个月艰苦拉锯，法院拍卖公司固定资产，你顺利拿回了全部欠薪与补偿款。",
          delta: { resilience: 30, rebellion: 25, savings: 15000 },
          addTags: ["维权先锋", "化险为夷"]
        },
        {
          text: "果断止损离职，白天去批发市场进货摆地摊卖夜宵，赚取快钱渡过难关",
          detail: "极强的生存韧劲，哪怕脱下西装当街头小贩也绝不让自己坐以待毙。",
          reaction: "你的烤冷面和炒米粉摊位成了夜市爆款，一个月净利润过万，第一次发现体制外的生猛天地。",
          delta: { resilience: 35, savings: 20000, inferiority: -10 },
          addTags: ["市井生存", "野蛮生长"]
        },
        {
          text: "抱有侥幸心理继续苦等，刷信用卡度日，坚信公司能绝处逢生",
          detail: "沉没成本心理作祟，缺乏果断止损的魄力与勇气。",
          reaction: "老板最终卷款失联，办公室人去楼空，你不仅分文未得还背负了数万元生活负债。",
          delta: { savings: -15000, inferiority: 20, resilience: -15 },
          addTags: ["受骗负债", "沉没代价"]
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 27岁 · 走向社会第5年 (Critical Choice 命运十字路口)
  // --------------------------------------------------------------------------
  27: [
    {
      id: "age_27_hospital_vs_visa",
      age: 27,
      stageName: "走向社会 · 第5年",
      title: "母亲急症住院与海外签证批准",
      scene:
        "五月中旬，老家县医院打来电话：母亲突发急性胆管炎并发心衰，医生语气凝重：‘我们县里医疗条件有限，你必须尽快想办法转院到省城大医院，最好找熟人联系床位……’\n\n就在同一天的同一小时，你手机邮箱里弹出了一封通知：你一年前悄悄递交的海外打工签证/留工资格获得了初步批准，要求在30天内核验资金与启程时间。",
      type: "choice",
      choices: [
        {
          text: "托尽所有同乡同学和关系，带着全部存款赶回省城医院陪护病床",
          detail: "你用尽了所有的脸面托到了一张加床。你在充满消毒水味道的走廊里陪护了两周，细心照料母亲，放弃了海外出走的机会。",
          reaction: "母亲的手在输液管下枯瘦苍白。看着窗外的灰蒙天空，你心里清楚，家庭的责任终究让你留在了这片熟悉的土地上。",
          delta: { kinshipGuilt: 40, rebellion: -25, savings: -35000 },
          addTags: ["家庭牵绊", "回归安顿"]
        },
        {
          text: "给老家亲戚汇款三万元拜托照料，按期兑换外币、收拾行囊准备登机",
          detail: "父亲在电话那头嘶吼‘如果你这次走了，以后就别再回这个家！’你含着眼泪死死挂断了电话。",
          reaction: "在深夜起飞的国际航班舷窗外，故土的万家灯火渐渐缩成一片微弱的星芒。你深知这一步踏出，已无回头路。",
          delta: { rebellion: 45, kinshipGuilt: 20, savings: -15000, resilience: 25 },
          addTags: ["断脐出海", "破门远行"]
        }
      ]
    },
    {
      id: "age_27_dispatch_vs_cadre",
      age: 27,
      stageName: "走向社会 · 第5年",
      title: "海外三年外派高薪与老家体制内副科遴选公示",
      scene:
        "二十七岁这年，你同时迎来了命运的两个巅峰：公司派驻德国/日本开拓新市场的三年外派合同，包吃住且薪资折合年薪四十万；而老家全省公务员遴选名单公示，你成功进入了老家县发改委副科级后备干部考察名单。",
      type: "choice",
      choices: [
        {
          text: "毫不犹豫签下海外外派合同，登上去往海外的客机",
          detail: "渴望借着外企平台开拓全球化视野，攒下人生第一桶可观的外币资产。",
          reaction: "在海外规范透明的职场里，你的专业技术突飞猛进，三年后卡里的结余折合超过了一百万人民币。",
          delta: { rebellion: 35, savings: 80000, cognition: 25 },
          addTags: ["外派出海", "资本原始积累"]
        },
        {
          text: "放弃外派，回老家办理公务员入职手续，穿上行政夹克",
          detail: "父母欢天喜地在县城最好的饭店摆了三桌。你成了家族里最有前途的年轻后生。",
          reaction: "在人情稠密与文件审批的流转中，你如鱼得水，成了家乡熟人池塘里备受尊重的体制支柱。",
          delta: { kinshipGuilt: 30, rebellion: -30, social: 25, savings: 5000 },
          addTags: ["体制新星", "熟土扎根"]
        }
      ]
    },
    {
      id: "age_27_self_funded_abroad",
      age: 27,
      stageName: "走向社会 · 第5年",
      title: "语言学校自保金存齐与全家哭劝留守",
      scene:
        "省吃俭用工作五年，你的个人存折上终于积攒了八万块钱——刚好够支付日本语言学校半年学费或澳洲打工度假初次验资。临行前夜，父母和亲戚坐满了一屋子，母亲拉着你的手老泪纵横，劝你不要去异国受苦吃苦。",
      type: "choice",
      choices: [
        {
          text: "向父母深深鞠躬：‘我想去外面看看不一样的世界’，毅然踏上旅程",
          detail: "不为安稳的温水煮青蛙所困，哪怕去异邦端盘子刷碗也要掌握自己人生的航向。",
          reaction: "成田机场大厅的冷风迎面吹来，你提着沉重的行囊，第一次踏在异国的土地上，自由而孤独。",
          delta: { rebellion: 50, resilience: 30, savings: -40000 },
          addTags: ["破釜沉舟", "自费启程"]
        },
        {
          text: "看着双亲斑白的头发和哭泣的眼眸，长叹一声将机票退订留在家乡",
          detail: "亲情的软肋最终击穿了远行的羽翼，选择顺从地守在两代人的屋檐下老去。",
          reaction: "母亲破涕为笑给你煮了一碗热面。第二天你拿着积蓄在老家县城付了首付，正式安顿下来。",
          delta: { kinshipGuilt: 40, rebellion: -40, savings: -30000 },
          addTags: ["血脉留守", "孝道归顺"]
        }
      ]
    }
  ]
};

// ============================================================================
// 智能动态时间线生成器（根据角色地域、阶层、性别与随机种子，生成完全独一无二的28岁人生旅程）
// ============================================================================

export function generateTimelineForCharacter(
  family: FamilyOrigin,
  gender: "男" | "女"
): LifeEventNode[] {
  const result: LifeEventNode[] = [];

  // Deterministic or randomized seed based on family details
  const seed = (family.region.length * 7 + family.fatherAge * 3 + (gender === "男" ? 1 : 2)) % 3;

  for (let age = 0; age <= 27; age++) {
    const pool = AGE_EVENT_POOLS[age];
    if (!pool || pool.length === 0) continue;

    // Pick variant:
    // If region contains specific keywords, prioritize matching scenario
    let selected = pool[0];

    if (age === 0) {
      if (family.region.includes("工") || family.region.includes("东北") || family.region.includes("华北")) {
        selected = pool[1] || pool[0];
      } else if (family.region.includes("浙东") || family.region.includes("岭南") || family.region.includes("城中村")) {
        selected = pool[2] || pool[0];
      } else {
        selected = pool[0];
      }
    } else if (age === 6) {
      if (family.wealthTier.includes("入不敷出") || family.wealthTier.includes("留守")) {
        selected = pool[2] || pool[0];
      } else if (family.region.includes("百强") || family.region.includes("地级市")) {
        selected = pool[1] || pool[0];
      } else {
        selected = pool[0];
      }
    } else if (age === 15) {
      if (family.wealthTier.includes("小康") || family.fatherJob.includes("科员") || family.fatherJob.includes("大夫")) {
        selected = pool[1] || pool[0];
      } else if (family.wealthTier.includes("入不敷出")) {
        selected = pool[2] || pool[0];
      } else {
        selected = pool[0];
      }
    } else if (age === 22) {
      if (family.fatherJob.includes("科员") || family.fatherJob.includes("高校")) {
        selected = pool[1] || pool[0];
      } else if (family.wealthTier.includes("入不敷出")) {
        selected = pool[2] || pool[0];
      } else {
        selected = pool[0];
      }
    } else if (age === 27) {
      if (family.fatherJob.includes("科员") || family.motherJob.includes("教师")) {
        selected = pool[1] || pool[0];
      } else if (family.wealthTier.includes("小康") || family.initialSavings >= 800) {
        selected = pool[2] || pool[0];
      } else {
        selected = pool[0];
      }
    } else {
      // For other ages, sample based on seed + age to ensure rich multi-flavor diversity
      const idx = (seed + age) % pool.length;
      selected = pool[idx];
    }

    result.push(selected);
  }

  return result;
}

// 默认兜底预设时间线
export const LIFE_SIMULATION_TIMELINE: LifeEventNode[] = generateTimelineForCharacter(
  {
    region: "豫东平原农耕大县",
    regionDetail: "",
    fatherAge: 29,
    fatherJob: "县自然资源局普通科员",
    fatherTrait: "",
    motherAge: 27,
    motherJob: "公立小学语文教师",
    motherTrait: "",
    housing: "",
    wealthTier: "紧绷温饱",
    wealthDetail: "",
    siblings: "独生子女",
    siblingsDetail: "",
    emotionalTone: "",
    toneDetail: "",
    backgroundStory: "",
    initialSavings: 200
  },
  "男"
);

export const K12_EVENTS = LIFE_SIMULATION_TIMELINE.slice(6, 18);
export const CAREER_EVENTS = LIFE_SIMULATION_TIMELINE.slice(18);

// ============================================================================
// 18岁：高考出分系统因果裁定
// ============================================================================

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
  tags: string[] = []
): GaokaoCalculation {
  // If Vocational Track
  if (tags.includes("职教蓝领") || tags.includes("手艺人底色") || tags.includes("早期打工")) {
    return {
      degreeTrack: "junior_college",
      title: "【公办全日制大专 · 实用技能定向】",
      scoreText: "对口高职高考考分 488 分，被省内公办职业技术学院王牌工科/护理专业录取",
      verdict:
        "你在十五岁那年没有挤上普高的独木桥，避开了三年无休止的题海折磨。在实训机床和实操图纸前，你练就了一双带老茧的双手。虽然亲友聚会时长辈总爱念叨‘专科到底不如本科’，但你早已学会靠具体手艺自立。",
      academicCapitalDesc: "实用技能在身，虽然学历门槛受限，但你在蓝领与一线操作岗位拥有极强的生存韧性。",
      psychologicalDossier: `生存韧劲：${attrs.resilience}%，自卑创伤：${attrs.inferiority}%。你更早接触了社会的冷暖，骨子里少了一份文人的清高，多了一份现实的生存嗅觉。`,
      firstStepChoice: {
        prompt: "面对大专三年的时光，你的核心规划是：",
        options: [
          {
            text: "周末去校外兼职打工、自考职业技能高级证书，尽可能积攒启动资金",
            detail: "不再向家里伸手要生活费，利用一切假期在维修厂或门店积累实操经验。",
            delta: { resilience: 20, savings: 5000, cognition: 10 },
            addTags: ["大专实用", "早熟自立"]
          },
          {
            text: "报名‘专升本’培训班，咬紧牙关再战两年，誓要拿到全日制本科学位",
            detail: "你依然无法放下被社会学历筛选歧视的屈辱，试图通过专升本洗刷起点劣势。",
            delta: { academicCapital: 20, kinshipGuilt: 15, savings: -4000 },
            addTags: ["专升本执念", "逆袭渴望"]
          }
        ]
      }
    };
  }

  // Academic Track: Top universities (985/211)
  if (attrs.cognition >= 65 || attrs.academicCapital >= 60) {
    return {
      degreeTrack: "985_211",
      title: "【985/211重点大学 · 顶尖高校录取】",
      scoreText: "高考总分 642 分（全省排位前 1.2%），稳稳斩获重点大学王牌硬核理工/经管专业！",
      verdict:
        "你在长达十二年的应试长跑中脱颖而出！红榜挂在校门前，校长和老师亲自送来喜报与奖学金，亲友们把你看作改写门楣的榜样。你用十二年的自律苦读换来了这张录取通知书，但未来更大的考验才刚刚开始。",
      academicCapitalDesc: "重点大学文凭到手，拥有优质校友网络与校招核心入场券，同时也承载着整个家庭更沉重的期许。",
      psychologicalDossier: `家庭牵绊：${attrs.kinshipGuilt}%，心理压力：${attrs.inferiority}%。你虽然赢得了考试，但深知未来依然不能松懈。`,
      firstStepChoice: {
        prompt: "面对名校志愿与专业，你的最后决断：",
        options: [
          {
            text: "选最热门的计算机/电子信息/金融专业，一心只想通过技术改变家庭阶层",
            detail: "你深知家里毫无背景，唯有最热门的专业能让你在毕业五年内换回真金白银。",
            delta: { resilience: 20, academicCapital: 20, savings: 10000 },
            addTags: ["重点大学光环", "大厂做题家"]
          },
          {
            text: "选省内公费师范/定向选调专业，服从分配，为全家换取铁饭碗安全感",
            detail: "听从父母的劝说，用名校文凭换取县城或地级市最高的体制内稳定地位。",
            delta: { kinshipGuilt: 25, rebellion: -20, savings: 8000 },
            addTags: ["重点大学光环", "体制预备役"]
          }
        ]
      }
    };
  }

  // Ordinary double-non university
  if (attrs.cognition >= 45 || attrs.academicCapital >= 35) {
    return {
      degreeTrack: "double_non",
      title: "【沿海普通公办本科（双非） · 夹缝里的大多数】",
      scoreText: "高考总分 518 分（超一本线12分），录取至沿海二线城市普通公办综合大学",
      verdict:
        "不高不低的分数，折射出你十二年来既不甘摆烂又未曾彻底发疯的真实写照。你跨入了本科的门槛，但没有名校光环加持，你必须在接下来的四年里独自面对更加现实的市场竞争。",
      academicCapitalDesc: "普通本科文凭，够得着大多数企业的投简历门槛，但无法在简历初筛中脱颖而出。",
      psychologicalDossier: `独立倾向：${attrs.rebellion}%，心理压力：${attrs.inferiority}%。你渴望大城市的广阔空间，但现实资本尚显不足。`,
      firstStepChoice: {
        prompt: "进入大学校园，你的生存重心定为：",
        options: [
          {
            text: "瞒着家里在沿海城市疯狂兼职实习、自学敲代码和外语，早早融入市场求生",
            detail: "不靠死板的书本，在大学四年就通过社会真实需求锤炼自己的专业与实践技能。",
            delta: { resilience: 30, rebellion: 20, savings: 5000 },
            addTags: ["双非文理", "主动破局"]
          },
          {
            text: "踏实考教资、考普通话、备战考研二战三战，试图通过二次升学翻盘",
            detail: "你不敢轻易涉足社会风浪，把所有精力投在象牙塔考研自习室的厚厚书本里。",
            delta: { academicCapital: 25, kinshipGuilt: 15 },
            addTags: ["双非文理", "考研执念"]
          }
        ]
      }
    };
  }

  // Junior college
  return {
    degreeTrack: "junior_college",
    title: "【省会普通公办大专 · 现实的冷水】",
    scoreText: "高考总分 412 分，未达本科线，被省城一所老牌专科院校录取",
    verdict:
      "出分那一晚，客厅里一片沉寂。父母在阳台上长吁短叹，十二年的应试长跑在这一刻画上了句号。你意识到自己在做题应试上并不占优，但也终于放下了执念，开始思考更务实的出路。",
    academicCapitalDesc: "大专文凭，在遍地本科生的时代显得有些单薄，唯有硬核技能能防身。",
    psychologicalDossier: `心理压力：${attrs.inferiority + 20}%。家人的叹息如针扎，但你也彻底放下了应试的包袱。`,
    firstStepChoice: {
      prompt: "拿着大专通知书，你的第一步打算：",
      options: [
        {
          text: "坦然接纳现实：大专学一门实用护理/软件开发手艺，周末打三份兼职不再向家里要钱",
          detail: "贫穷和挫败不再能轻易击垮你，你把身段放到最低，在社会泥土里摸爬滚打。",
          delta: { resilience: 35, inferiority: -10, savings: 3000 },
          addTags: ["大专实用", "早熟自立"]
        },
        {
          text: "全家凑出三万块复读费，去隔壁市高考补习学校复读一年，背水一战",
          detail: "你承受不起同辈和亲友异样的眼光，你决定再拿一年的青春在题海里拼一把。",
          delta: { academicCapital: 25, kinshipGuilt: 30, savings: -30000 },
          addTags: ["复读背水", "巨额学债"]
        }
      ]
    }
  };
}

// ============================================================================
// 27岁 人生命运解构书（六大当代社会画像）
// ============================================================================

export interface LifeDiagnosis {
  type: string;
  title: string;
  portrait: string;
  kinshipEvaluation: string;
  systemEvaluation: string;
  fateVerdict: string;
  recommendation: string;
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
// 28 ~ 63 岁：双轨平行对映（Parallel Trajectories to Retirement）
// ============================================================================

export const PARALLEL_LIVES_MILESTONES: DualTrackStage[] = [
  // 30岁
  {
    age: 30,
    title: "30岁 · 立与不立",
    theme: "异邦立足 vs 房贷围城",
    emigratedScene:
      "在异邦，你通过了语言考试，换了正式的工作签证，租下离市中心电车40分钟的一居室。除夕这天晚上，你下班后在华人超市买了一包冷冻水饺，房东老太太敲门送了你一块自家烤的苹果派，祝你新年好。虽然没有鞭炮和复杂的红白人情，但你卡里的外币存款第一次折合超过了15万人民币。",
    stayedScene:
      "在省会城市，你在父母资助下咬牙上车了郊区期房，每月还贷7800元。周五晚上你在饭局上给分管领导敬酒，喝到急性胃痉挛，吐在地下商场的洗手池里。周末高中同学聚会，大家一边吹嘘谁换了新车，一边心照不宣地打听谁能弄到重点小学的学位房指标。",
    emigratedReflection:
      "虽然偶尔会有‘独在异乡为异客’的落寞，但在这个尊重契约的社会里，没人打听你的存款与婚否，你拥有了完全属于自己的周日。",
    stayedReflection:
      "你坐在未通天然气的毛坯房水泥地上抽完了一支烟。你被房贷死死钉在了这座城市，但看着房本上的红章，你安慰自己‘终于在城里站稳了脚跟’。",
    choice: {
      text: "三十而立这一夜，你咽下了属于成年人的第一口苦酒",
      detail: "无论是异国冷清的公寓，还是国内酒气熏天的饭局，你都在各自的轨道上全速狂奔。",
      reaction: "你看着镜子里略显沧桑的面孔，知道青春期的幻想正式退潮，现实的重力已经无处可逃。"
    }
  },

  // 35岁
  {
    age: 35,
    title: "35岁 · 三十五岁分水岭",
    theme: "海外平权劳动 vs 职场优化断头台",
    emigratedScene:
      "35岁生日这天，你作为熟练技术工按时下午5点打卡下班。工会代表刚刚上门给你送来了法定带薪年假调整表。你开着二手丰田皮卡，后备箱装着在二手店淘来的皮划艇，周末准备带全家去国家公园露营。在当地，没有人会把‘35岁’和‘职业淘汰’联系在一起，工龄越长反而时薪越高。",
    stayedScene:
      "部门新换了98年的总监，第一刀就切向了团队里35岁以上的‘老黄牛’。人力资源总监把一份调岗至异地边缘业务线的确认函推到你面前：‘要么接受降薪转岗，要么走人’。你下班坐在车库里不敢回家，手机里是这个月的房贷催款短信，以及孩子幼小衔接昂贵的国际私塾账单。",
    emigratedReflection:
      "你终于理解了为什么那些蓝领工人能在阳光下笑得那么舒坦——体制对劳动者的基本尊重，胜过一切虚妄的宏大叙事。",
    stayedReflection:
      "你看着车窗上的雾气，突然明白所谓‘大厂螺丝钉’的体面不过是一场幻觉。35岁这道坎，像极了当年的高考分流。",
    choice: {
      text: "你深深叹了一口气，默默签下了改变命运的确认单",
      detail: "留在国内的你选择低头接受降薪留任；在海外的你考下了本地高级工匠/永久居留评估。",
      reaction: "生活的两极在这一刻彻底撕裂开来，再无交汇的可能。"
    }
  },

  // 42岁
  {
    age: 42,
    title: "42岁 · 四海一家的生老病死",
    theme: "跨洋转机来不及送终 vs 走廊陪护床前的最后尽孝",
    emigratedScene:
      "凌晨两点手机震动，老家亲戚打来微信语音：‘你爸不行了，在ICU抢救，医生让家属准备后事，快回来看最后一眼！’你发疯一样查机票，转机加签证核酸最快也要30多个小时。三天后当你提着沾满雨水的行李箱赶到老家县城灵堂前时，看到的只有一张黑白照片和一盒冰冷的骨灰。你母亲哭晕在你怀里，叹息你常年在外的缺席。",
    stayedScene:
      "父亲确诊重病。整整两个月，你托了高中当副院长的老同学才弄到一张加床。你白天上班，夜里在充满消毒水和呼噜声的走廊折叠床上陪护，翻身、吸痰、擦拭身体。在父亲闭上眼睛的那一刻，他的手紧紧握着你的手掌。你身心俱疲，但你问心无愧地陪他走完了人间的最后一程。",
    emigratedReflection:
      "那一刻你站在老家空落的房间里，深切感受到了生离死别的沉重。血亲的离去让你明白，老家已经变成了永远的回忆与牵挂。",
    stayedReflection:
      "你为父亲办了一场体面的丧礼，尽到了人子最后的孝道。你在疲惫中感到一种踏实的尽心与释怀。",
    choice: {
      text: "在生离死别的灵堂前，你深深鞠了三个躬",
      detail: "曾经的摩擦、代际的代沟与执念，都在这一刻化作了平静的告别。",
      reaction: "你终于意识到：人到中年，故土不再只是那个温暖的避风港，也是父母长眠的所在。"
    }
  },

  // 52岁
  {
    age: 52,
    title: "52岁 · 下一代的归属与裂痕",
    theme: "跨文化代沟 vs 高考陪读",
    emigratedScene:
      "你的孩子在当地公立学校长大，讲一口纯正无口音的流利外语，中文只能结结巴巴说几句日常词汇。晚餐桌上，他直呼你的名字，反驳你的中式传统观念，甚至抗拒跟你去唐人街。你看着眼前这个完全本地化成长的下一代，突然意识到：你用一生的奋斗为他换来了自由的选择，但两代人之间的文化隔阂也在所难免。",
    stayedScene:
      "孩子高三，你在县城一中对面租了一套陪读房。每天早晨5点半起床做早餐，夜里11点半等孩子晚自习归来。为了让孩子能安心备考，你在生活细节上谨小慎微。你把对生活未竟的期许，无形中寄托在了这个十七岁少年的肩膀上。",
    emigratedReflection:
      "你为下一代赢得了更宽松的发展空间，但也体会到了跨代际文化差异带来的疏离。",
    stayedReflection:
      "两代人的轨迹在这一刻仿佛重叠：你发现自己也背负着当年父母同样沉重的焦虑与期盼。",
    choice: {
      text: "你默默收回了过多干预的手，学着尊重他们的独立成长",
      detail: "一代人有一代人的道路，你无法替他们走完全部旅程。",
      reaction: "白发爬上了你的鬓角，你开始习惯在黄昏的余晖里独自散步沉思。"
    }
  },

  // 63岁
  {
    age: 63,
    title: "63岁 · 法定退休终局",
    theme: "海外养老与社区平静 vs 熟人社会含饴弄孙",
    emigratedScene:
      "你按期办理了当地政府的法定养老金，住在市郊带有一小片草坪的独栋平房里。每周有社区家庭医生按时上门随访体检。你偶尔去当地华人超市买些家乡调料。回望这一生：没有大富大贵，但你避开了过早的职场年龄歧视、房贷重压与无休止的人情应酬。你在平静规律的生活中安度晚年，窗外是广阔的异邦暮色。",
    stayedScene:
      "全国法定退休落地，你终于在63岁这年领到了第一笔退休养老金。早晨去公园散步打太极，下午骑着电动车穿过熟悉的菜市场接送孙子放学。周末老同事聚餐，谈天说地回忆当年的岁月。你这一生平稳度过，在熟悉的生活圈里安然步入晚年。",
    emigratedReflection:
      "你用漫长的适应换回了内心的宁静——在熟人社会的注视与评价之外，从容安排属于自己的每一天。",
    stayedReflection:
      "你融入了这片庞大而温暖的熟人生活圈。虽然平凡，但也拥有最踏实的市井烟火。",
    choice: {
      text: "这一生走到终点，你合上了这本六十余载的人生手记",
      detail: "世上本无完美的选择，所有被你舍弃的可能，都是人生独特的注脚。",
      reaction: "风停了，日光照在泛黄的纸页上，一切归于从容和平静。"
    }
  }
];

// ============================================================================
// 63 岁终局一生判词（6~8 大终极归宿）
// ============================================================================

export interface LifetimeVerdict {
  summaryTitle: string;
  verdictText: string;
  tagline: string;
}

export function generateFinalLifetimeVerdict(
  path: "emigrate" | "stay",
  attrs: CharacterAttributes,
  tags: string[] = []
): LifetimeVerdict {
  if (path === "emigrate") {
    // 1. 蓝领技艺在海外大放异彩
    if (tags.includes("职教蓝领") || tags.includes("手艺人底色") || tags.includes("蓝领实干")) {
      return {
        summaryTitle: "【技能立身 · 异邦扎根】",
        tagline: "“手上有手艺，心中有底气，四海皆可安家。”",
        verdictText:
          "你在二十七岁那年做出了果断的选择——带着一套过硬的实用技能走向海外。在尊重劳动与专业技艺的环境里，你用汗水浇灌出属于自己的独立居所与安稳生活。你没有名校光环，却活出了最踏实的尊严。虽然乡音渐远，但在异邦的夕阳下，你的一双手为家庭打下了扎实的基础。"
      };
    }

    // 2. 彻底独立自由
    if (attrs.rebellion >= 50 || tags.includes("断脐出海")) {
      return {
        summaryTitle: "【跨洋独立 · 豁达从容】",
        tagline: "“生为客，行于途，天地之间求一份心安。”",
        verdictText:
          "你在二十七岁那年选择了追求真正的独立与自主。随后的岁月里，你走过了异乡的清冷，承受过文化与语言的孤独，但也赢得了最为珍贵的一份安宁——摆脱了无休止的攀比与熟人社会的评价束缚，完完整整为自己活了一次。虽然偶有孤寂，但内心开阔自由。"
      };
    }

    // 3. 候鸟两栖型
    return {
      summaryTitle: "【跨界迁徙 · 历练归来】",
      tagline: "“看遍万水千山，最安心的依然是人间烟火。”",
      verdictText:
        "你在海外打拼了半生，积累了扎实的技能与储蓄底气。你既看过了世界的广阔，也体会过异乡的疏离。中年以后，你带着丰富的阅历回到故土或气候宜人的地方，心平气和地安顿生活。你没有被单一的环境所局限，把世界走成了自己的人生课堂。"
    };
  } else {
    // 留在国内的分支
    // 4. 房贷与家庭重担型
    if (tags.includes("三十年房奴") || tags.includes("背负重资产") || tags.includes("全家锁死")) {
      return {
        summaryTitle: "【负重一生 · 默默支撑】",
        tagline: "“倾尽心血，为家人遮风挡雨。”",
        verdictText:
          "二十七岁那年你接下了那份按揭合同，承担起了全家的重任。你背负着房贷、孩子的教育和父母的医疗，像老黄牛一样勤勉了一辈子。六十三岁退休这一年，你看着逐渐长大的下一代和安稳的居所，心中百感交集。你这一生负重前行，用自己的肩膀托起了整个家庭。"
      };
    }

    // 5. 体制与熟人安稳型
    if (attrs.kinshipGuilt >= 40) {
      return {
        summaryTitle: "【深耕故土 · 现世安稳】",
        tagline: "“大隐隐于市，在熟土里安顿一生。”",
        verdictText:
          "你选择留在这片熟悉的土地上。虽然经历过职场的内卷与人情的纷扰，但每逢除夕万家灯火，满桌的饭菜和亲友的嘘寒问暖，依然给予你真实的归属感。六十三岁退休，你在公园散步，照料第三代。你在熟悉的环境里走完了平稳安宁的一生。"
      };
    }

    // 6. 市井实干型
    return {
      summaryTitle: "【市井韧草 · 踏实前行】",
      tagline: "“踏实求生，自有筋骨。”",
      verdictText:
        "你没有大富大贵，也没有体制内的稳定。你在普通人的生活激流中踏踏实实打拼了一辈子，靠着勤奋和韧劲站稳了脚跟。你见证了时代的变迁，也守住了自己的生活节奏。你这一生活得真诚、踏实而有尊严。"
    };
  }
}
