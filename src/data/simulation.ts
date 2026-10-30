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

export function getIndependenceDesc(val: number): string {
  if (val >= 65) return "高度独立 · 崇尚自由";
  if (val >= 40) return "精神独立 · 行为克制";
  return "遵循秩序 · 规矩顺从";
}

export function getKinshipDesc(val: number): string {
  if (val >= 65) return "家庭重担 · 顾念至深";
  if (val >= 40) return "心系双亲 · 隐性牵挂";
  return "边界清晰 · 独立负责";
}

export function getResilienceDesc(val: number): string {
  if (val >= 65) return "百炼成钢 · 能抗大风浪";
  if (val >= 40) return "踏实耐磨 · 能吃常人苦";
  return "抗压偏弱 · 历练尚浅";
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
// ============================================================================

export const LIFE_SIMULATION_TIMELINE: LifeEventNode[] = [
  // 0岁 · 降生
  {
    id: "age_0",
    age: 0,
    stageName: "婴儿期 · 0岁",
    title: "初临人间与第一声啼哭",
    scene:
      "秋风渐起的午后，你出生在县医院泛黄的被单上。助产士轻轻拍打你的后背，你发出第一声响亮的啼哭。父亲在产房外来回踱步，手里捏着被汗水浸湿的缴费单；母亲虚弱地将你揽入怀中，为你取下伴随一生的名字。这一年，你正式来到人间。",
    type: "natural",
    naturalDelta: { health: 5, happiness: 5 },
    naturalTags: ["初临人间"]
  },

  // 1岁 · 幼芽期
  {
    id: "age_1",
    age: 1,
    stageName: "幼芽期 · 1岁",
    title: "摇晃的脚步与周岁抓周",
    scene:
      "在老旧木门槛与水泥地之间，你松开母亲的手，摇摇晃晃迈开了人生的第一步。周岁抓周礼上，八仙桌上铺着大红方布，亲戚们围在四周看热闹。你在旧算盘、发黄的书本、生锈的螺丝刀与零钞之间好奇张望，一把抓住了生锈的螺丝刀，惹得满屋大人发出欢笑。",
    type: "natural",
    naturalDelta: { health: 5, cognition: 5, resilience: 5 },
    naturalTags: ["周岁学步"]
  },

  // 2岁 · 启言期
  {
    id: "age_2",
    age: 2,
    stageName: "启言期 · 2岁",
    title: "牙牙学语与二八大杠自行车",
    scene:
      "你开始口齿不清地学会喊‘爸爸、妈妈’。每天傍晚，你坐在父亲二八大杠自行车的斜梁小藤椅上吹着晚风。街边煤炉上水壶冒着白汽，老旧收音机里放着那个年代的歌，父亲的大手握着车把，背影宽厚而踏实。",
    type: "natural",
    naturalDelta: { happiness: 5, social: 5 }
  },

  // 3岁 · 启蒙期
  {
    id: "age_3",
    age: 3,
    stageName: "启蒙期 · 3岁",
    title: "托儿所铁栅栏与最初的集体生活",
    scene:
      "你被送到了街道托儿所。铁栅栏门合上的瞬间，你哭得撕心裂肺。在一屋子抽泣的同龄孩子中，你第一次发现世界并非围绕自己旋转。你学会了用小铁勺吃蒸蛋，排队在小木床上午睡，初次感知到家庭之外的规则。",
    type: "natural",
    naturalDelta: { social: 10, cognition: 10, happiness: -5 },
    naturalTags: ["初识集体"]
  },

  // 4岁 · 疾苦期
  {
    id: "age_4",
    age: 4,
    stageName: "疾苦期 · 4岁",
    title: "深夜暴雨与镇卫生院的吊水",
    scene:
      "一场突如其来的急性肺炎让你高烧到近四十度。深夜暴雨如注，父亲披着破塑料布骑车推着你，母亲坐在后座死死护住你的前额，连夜赶往镇卫生院。冰凉的药水在玻璃瓶里一滴滴落入血管，你第一次对病痛与家庭的无助有了朦胧的感知。",
    type: "natural",
    naturalDelta: { health: -5, kinshipGuilt: 10, resilience: 5 }
  },

  // 5岁 · 学前期
  {
    id: "age_5",
    age: 5,
    stageName: "学前期 · 5岁",
    title: "弄堂水门汀与最早的清晰记忆",
    scene:
      "你拥有了这一生最早能够长久保留的清晰记忆：夏天的傍晚，水泥地面被泼上凉水散发出特有的泥土气息。头顶吊扇嘎吱作响，母亲在厨房切开西瓜，父亲在门边修理自行车链条。你蹲在门槛上看蚂蚁搬家，以为日子会一直这样从容平静。",
    type: "natural",
    naturalDelta: { happiness: 10, cognition: 5 }
  },

  // 6岁 · 小学一年级 (Choice)
  {
    id: "age_6",
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
        text: "回家赌气摔饭盒，逼母亲一定要买商场里那个45块钱的保温桶",
        detail: "母亲叹着气数出抽屉里带折痕的零钱，父亲在院子里重重抽了一口旱烟。",
        reaction: "第二天你如愿拿到了新饭盒，但母亲接下来整整两周每顿饭只就着白菜汤咽冷馍。",
        delta: { kinshipGuilt: 20, happiness: -10, savings: -45 },
        addTags: ["内疚阴影", "好面子"]
      }
    ]
  },

  // 7岁 · 小学二年级
  {
    id: "age_7",
    age: 7,
    stageName: "小学二年级 · 7岁",
    title: "奖状与斑驳石灰墙上的体面",
    scene:
      "期末考试你考了双百，班主任把大红奖状发到你手中。回到家，父亲默默找来浆糊，小心翼翼把奖状贴在客厅最显眼的石灰墙上。那晚饭桌上破天荒多了一盘煎荷包蛋。你第一次体会到‘成绩能为贫寒的家庭换来体面’。",
    type: "natural",
    naturalDelta: { cognition: 10, academicCapital: 10, happiness: 10 },
    naturalTags: ["奖状记忆"]
  },

  // 8岁 · 小学三年级 (Choice)
  {
    id: "age_8",
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

  // 9岁 · 小学四年级
  {
    id: "age_9",
    age: 9,
    stageName: "小学四年级 · 9岁",
    title: "弄堂弹珠与旧书摊的借阅",
    scene:
      "放学后的时光属于泥土地上的弹珠与自制纸牌。偶然一次，你在镇邮局旁的旧书摊翻到一本残破的少年百科杂志。你坐在台阶上看得入神，直到暮色降临，老板挥手说‘送你了，小娃多看书好’。那本书成了你窥探远方世界的窗口。",
    type: "natural",
    naturalDelta: { cognition: 10, happiness: 5 }
  },

  // 10岁 · 小学五年级
  {
    id: "age_10",
    age: 10,
    stageName: "小学五年级 · 10岁",
    title: "挂在胸前的红毛线钥匙",
    scene:
      "随着父母加班愈发频繁，一根红毛线穿起的铁钥匙挂在了你的胸前。放学后你独自回家开门、淘米生火热饭，在昏暗的日光灯下写作业。同龄人还在撒娇的年纪，你已经习惯了空荡荡的房间和独自对抗夜色的寂静。",
    type: "natural",
    naturalDelta: { resilience: 15, health: 5, social: -5 },
    naturalTags: ["钥匙儿童"]
  },

  // 11岁 · 小学六年级
  {
    id: "age_11",
    age: 11,
    stageName: "小学六年级 · 11岁",
    title: "第一次注意到父母在老去",
    scene:
      "小学毕业前的那个冬天格外漫长。某天傍晚，你突然注意到父亲蹲在地上修插头时，后脑勺冒出了成片的白发；母亲洗碗时，双手关节粗大发红、布满冻疮裂口。你突然意识到，一直为你遮风挡雨的父母，正在迅速老去。",
    type: "natural",
    naturalDelta: { kinshipGuilt: 10, cognition: 5, happiness: -5 }
  },

  // 12岁 · 初中一年级 (Choice)
  {
    id: "age_12",
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

  // 13岁 · 初中二年级
  {
    id: "age_13",
    age: 13,
    stageName: "初中二年级 · 13岁",
    title: "变声期的敏感与青春期萌动",
    scene:
      "喉结开始突出，声音变得沙哑粗糙。你开始格外在意异性同学的目光和自己有些发旧的球鞋。班上有家境优渥的同学穿上了名牌运动鞋，你悄悄把双脚往课桌底下缩了缩。青春期的自尊与敏感在悄然生长。",
    type: "natural",
    naturalDelta: { inferiority: 10, social: 5 }
  },

  // 14岁 · 初中二年级
  {
    id: "age_14",
    age: 14,
    stageName: "初中二年级 · 14岁",
    title: "地方老厂减员与饭桌上的长叹",
    scene:
      "父亲所在的地方老厂效益急转直下，迎来人员分流。饭桌上的荤菜肉眼可见地变少，父母在卧室关起门轻声商量着如何找亲戚周转。那一夜你躺在床上听着外面的虫鸣，清楚地意识到自己必须尽快长大。",
    type: "natural",
    naturalDelta: { resilience: 15, kinshipGuilt: 10, happiness: -5 }
  },

  // 15岁 · 初中三年级 (Choice)
  {
    id: "age_15",
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

  // 16岁 · 高一/中职二年级
  {
    id: "age_16",
    age: 16,
    stageName: "高中/职校阶段 · 16岁",
    title: "新校园的阶层见闻与同窗离校",
    scene:
      "新的学期，身边的人开始剧烈分化。普高教室里挂满了‘只要学不死就往死里学’的横幅，有人受不了高压退学；职校那边，工厂的校招宣讲已经开进礼堂。你望着校门外来来往往的车流，体会到了人生的第一重分流。",
    type: "natural",
    naturalDelta: { cognition: 10, resilience: 10 }
  },

  // 17岁 · 高三/职高冲刺 (Choice)
  {
    id: "age_17",
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

  // 19岁 · 大学/职场起步
  {
    id: "age_19",
    age: 19,
    stageName: "大学/职场起步 · 19岁",
    title: "跨入新天地与独立生活费的打理",
    scene:
      "你提着行李箱走进大学校门或职工宿舍。没有了高中的管束，第一笔一个月八百块的生活费攥在手里。食堂的打菜窗口、第一次办理的银行卡，你开始真正作为成年人独立打理日常开支。",
    type: "natural",
    naturalDelta: { social: 10, cognition: 10, rebellion: 10 }
  },

  // 20岁 · 大学阶段 (Choice)
  {
    id: "age_20",
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

  // 21岁 · 临近毕业季
  {
    id: "age_21",
    age: 21,
    stageName: "大三/职场深耕 · 21岁",
    title: "招聘会前的旧西装与考研自习室长队",
    scene:
      "走廊里弥漫着求职的焦虑。考研自习室凌晨排起长队，招聘宣讲会上的企业开始设定严格的学历与年龄初筛。你站在人流涌动的广场前，感受到社会的齿轮正在加速运转。",
    type: "natural",
    naturalDelta: { cognition: 10, resilience: 10 }
  },

  // 22岁 · 毕业十字路口 (Choice)
  {
    id: "age_22",
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

  // 23岁 · 职场第1年 (Choice)
  {
    id: "age_23",
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

  // 24岁 · 职场第2年 (Choice)
  {
    id: "age_24",
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

  // 25岁 · 职场第3年 (Choice)
  {
    id: "age_25",
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

  // 26岁 · 职场第4年 (Choice)
  {
    id: "age_26",
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

  // 27岁 · 职场第5年 (Critical Choice)
  {
    id: "age_27",
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
  }
];

// Compatibility exports
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
