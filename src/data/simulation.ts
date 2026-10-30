// ============================================================================
// ESCAPEPLAN LIFE SIMULATION ENGINE
// 逃跑计划 · 中国式命运交互电影数据模型 (三段式驾驶舱 + 0~63岁全周期因果链)
// ============================================================================

export interface FamilyOrigin {
  region: string;
  regionDetail: string;
  hospitalName: string; // 降生医院全称（与地域严格一致，绝不串台）
  primarySchoolName: string; // 当地小学名称
  highSchoolName: string; // 当地高中名称
  cityOrCounty: string; // "地级市生活区" / "县城" / "乡镇"
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
  region: string;
  landscape: string;
  tagline: string;
  icon: string;
}

// 8 大地域生态强绑定（医院、学校、阶层、职业、住宅全方位闭环）
export const REGION_ECOSYSTEMS = [
  {
    region: "华北重工业地级市生活区",
    landscape: "钢厂子弟校 · 泛灰白杨树 · 家属大院",
    tagline: "空气里常年有微尘，看病求职全靠几十年的熟人网络",
    icon: "🏗️",
    hospitalName: "市职工总院产科",
    primarySchoolName: "钢厂子弟第一小学",
    highSchoolName: "市第一高级中学",
    cityOrCounty: "地级市工矿生活区",
    parents: [
      {
        fatherJob: "钢厂热轧车间机修电工",
        fatherAge: 30,
        fatherTrait: "老烟枪，性格木讷严肃，双手常有机油味，信奉踏实手艺",
        motherJob: "市自来水公司抄表员",
        motherAge: 28,
        motherTrait: "精打细算持家，掌管家里存折，常叮嘱你要好好念书考进好单位",
        housing: "老重工国企职工集资筒子楼（52㎡，水磨石地面，推开窗是对面焦化厂高炉）",
        wealthIndex: 1
      },
      {
        fatherJob: "市自然资源局普通科员",
        fatherAge: 31,
        fatherTrait: "性格谨慎规矩，信奉仕途与编制，最在意外界评价与家庭体面",
        motherJob: "市直公立小学语文教师",
        motherAge: 29,
        motherTrait: "极重规矩与早起作息，容不得学习马虎，常拿你与同事孩子比较",
        housing: "地级市九十年代机关家属院两居室（步梯四楼，墙面白灰微有脱落）",
        wealthIndex: 2
      },
      {
        fatherJob: "下岗后开二手出租车师傅",
        fatherAge: 32,
        fatherTrait: "经历过单位改制买断的阵痛，一身烟草味与不服输的市井硬骨头",
        motherJob: "家属区早市面点摊摊主",
        motherAge: 30,
        motherTrait: "凌晨三点起床揉面炸油条，双手满是油花烫痕，最盼着你能出人头地",
        housing: "地级市老旧职工宿舍顶楼（无保温层，冬冷夏热，天花板偶有渗水）",
        wealthIndex: 0
      }
    ]
  },
  {
    region: "豫东平原农耕大县",
    landscape: "平原麦浪 · 窑厂红砖 · 宗祠香火",
    tagline: "全县七十万人，全靠县一中题海杀向省城",
    icon: "🌾",
    hospitalName: "县人民医院妇产科",
    primarySchoolName: "县实验小学",
    highSchoolName: "县第一高级中学",
    cityOrCounty: "平原农耕县城",
    parents: [
      {
        fatherJob: "农贸市场粮油副食批发摊主",
        fatherAge: 29,
        fatherTrait: "满手茧子，说话嗓门大，信奉真金白银与实在，为人豪爽讲义气",
        motherJob: "县农贸市场摊位打理人",
        motherAge: 27,
        motherTrait: "起早贪黑整理零钞，一分钱都精打细算存着给你未来读书用",
        housing: "县城农贸市场后街自建红砖三层平房（底层潮湿堆放杂物，顶层晒干菜）",
        wealthIndex: 2
      },
      {
        fatherJob: "县交通局公路养护段普通职工",
        fatherAge: 30,
        fatherTrait: "平时少言寡语，习惯抽旱烟，最常念叨的是‘考上大学吃国家粮’",
        motherJob: "乡镇小学代课教师",
        motherAge: 28,
        motherTrait: "每天夜里在煤油灯或日光灯下批改作业，对你的字迹要求极严",
        housing: "城关镇老公路局家属平房小院（院里搭着丝瓜架与蜂窝煤棚）",
        wealthIndex: 1
      },
      {
        fatherJob: "平原农耕种粮兼农机修理户",
        fatherAge: 28,
        fatherTrait: "日出而作日落而息，长年在田间地头劳作，背负化肥种子农药赊账",
        motherJob: "留守操持几亩麦田与家禽",
        motherAge: 26,
        motherTrait: "省吃俭用把最好的鸡蛋与白面留给你，双手满是泥土老茧",
        housing: "村口自建红砖平房（土院子，下雨时泥泞不堪）",
        wealthIndex: 0
      }
    ]
  },
  {
    region: "浙东民营制造百强县",
    landscape: "轰鸣注塑作坊 · 模具五金 · 货运卡车",
    tagline: "崇尚宗族抱团经商发财，不读书就早早进厂接单",
    icon: "⚙️",
    hospitalName: "百强县第二人民医院",
    primarySchoolName: "镇中心小学",
    highSchoolName: "县高级中学",
    cityOrCounty: "制造重镇",
    parents: [
      {
        fatherJob: "小型五金注塑作坊小老板",
        fatherAge: 32,
        fatherTrait: "满脑子接单发货与周转账期，手机24小时不静音，崇尚实用买卖",
        motherJob: "作坊出纳兼管伙食采购",
        motherAge: 30,
        motherTrait: "一手理账一手带娃，脾气雷厉风行，常教导你‘算账千万不能亏’",
        housing: "沿街自建四层半贴瓷砖自建楼（一层做作坊，二层堆货，三层自住）",
        wealthIndex: 2
      },
      {
        fatherJob: "模具车间冲压老师傅",
        fatherAge: 30,
        fatherTrait: "技术扎实但收入全靠计件，沉默寡言，常年戴着护目镜与劳保手套",
        motherJob: "同厂电子流水线装配工",
        motherAge: 28,
        motherTrait: "两班倒常年站立操作，下班后腿脚浮肿，一心希望你不用吃这种苦",
        housing: "工业园区边缘安置房步梯六楼（无电梯，楼道里常有塑料焦味）",
        wealthIndex: 1
      }
    ]
  },
  {
    region: "东北老重工业收缩矿城",
    landscape: "熄灭的红砖大烟囱 · 铁道扳道房 · 筒子楼",
    tagline: "年轻人跑光，整座小城靠老人的买断退休金维持体面",
    icon: "🏭",
    hospitalName: "矿务局职工总医院产科",
    primarySchoolName: "矿务局职工第一子弟校",
    highSchoolName: "市第一完全中学",
    cityOrCounty: "工矿收缩城",
    parents: [
      {
        fatherJob: "矿务局选煤厂机修电工",
        fatherAge: 31,
        fatherTrait: "经历了多次改制风波，爱喝二两散装白酒，总把当年矿上的辉煌挂在嘴边",
        motherJob: "矿区医院后勤洗衣房老职工",
        motherAge: 29,
        motherTrait: "患有轻微关节炎，心软热心肠，经常给邻里街坊送自家腌的酸菜",
        housing: "八十年代红砖矿工集资房（暖气管道常年有铁锈味，楼道堆满秋菜）",
        wealthIndex: 1
      },
      {
        fatherJob: "铁道车辆段调度巡检员",
        fatherAge: 33,
        fatherTrait: "一身铁路深蓝工装，为人谨慎严肃，看重生活规律与编制稳定",
        motherJob: "铁路子弟中学后勤管理员",
        motherAge: 30,
        motherTrait: "性格要强，最盼着你通过高考考去关内大城市，不要留在收缩的矿城",
        housing: "铁路分局家属院步梯房（窗外不时传来内燃机车沉闷的鸣笛）",
        wealthIndex: 2
      }
    ]
  },
  {
    region: "岭南宗族聚居近郊大村",
    landscape: "祠堂青砖 · 舞狮红榜 · 自建握手楼出租房",
    tagline: "宗族人情盘根错节，分红虽有但祖训如铁，出省即视为背叛",
    icon: "🏮",
    hospitalName: "区妇幼保健院",
    primarySchoolName: "宗族义资中心小学",
    highSchoolName: "区第一实验中学",
    cityOrCounty: "岭南近郊宗族村",
    parents: [
      {
        fatherJob: "村水产海鲜批发档主兼宗亲会执事",
        fatherAge: 32,
        fatherTrait: "逢年过节主持宗祠祭祀，讲求宗族门面与人情往来，凡事以宗族为先",
        motherJob: "村口早茶档点心师兼出纳",
        motherAge: 30,
        motherTrait: "忙碌精明，说话语速极快，一门心思操心自建房收租与同辈竞争",
        housing: "祠堂背后的自建五层贴马赛克握手楼（底商出租给小吃档，顶层自住）",
        wealthIndex: 2
      },
      {
        fatherJob: "近郊汽配维修档口师傅",
        fatherAge: 29,
        fatherTrait: "满手油污但手艺过硬，平时爱在榕树下喝功夫茶，信奉靠双手吃饭",
        motherJob: "街道便民小超市收银员",
        motherAge: 27,
        motherTrait: "性格温和顺从，每天早起煲老火靓汤，最牵挂你的身体平安",
        housing: "握手楼逼仄二楼（终年不见充足阳光，推窗是对面楼的抽油烟机）",
        wealthIndex: 1
      }
    ]
  },
  {
    region: "湘西丘陵丘壑农业镇",
    landscape: "梯田柑橘树 · 吊脚旧楼 · 泥泞机耕路",
    tagline: "父母常年留守珠三角制鞋厂，留给家里的是老屋柴火烟",
    icon: "🍊",
    hospitalName: "镇中心卫生院",
    primarySchoolName: "镇中心完全小学",
    highSchoolName: "县民族中学",
    cityOrCounty: "山区农业镇",
    parents: [
      {
        fatherJob: "长年在外务工（珠三角制鞋厂切料工）",
        fatherAge: 28,
        fatherTrait: "一年只在春节回家待十天，沉默寡言，手里总是夹着舍不得抽完的便宜烟",
        motherJob: "同厂流水线裁缝女工",
        motherAge: 26,
        motherTrait: "打电话时总忍不住抹泪，满怀亏欠，按月寄回微薄的血汗生活费",
        housing: "半山腰老平房（由年迈祖父母代为照看，门前晒着包谷与红辣椒）",
        wealthIndex: 3
      }
    ]
  },
  {
    region: "川渝盆地边缘山水县城",
    landscape: "茶馆竹椅 · 麻将脆响 · 嘉陵江雾气",
    tagline: "火锅油碟与安逸哲学，但年轻人只能去成渝或南下打工",
    icon: "🍵",
    hospitalName: "县中医院妇产科",
    primarySchoolName: "县实验小学",
    highSchoolName: "县第一中学",
    cityOrCounty: "山水江滨县城",
    parents: [
      {
        fatherJob: "水运码头短途厢式货车司机",
        fatherAge: 31,
        fatherTrait: "性格火爆但心底极软，跑车时常含着胖大海，最爱在茶馆听评书",
        motherJob: "老街临江火锅店采办结账员",
        motherAge: 29,
        motherTrait: "能说会道，善于张罗市井人情，把屋子收拾得利落温馨",
        housing: "沿江坡地九十年代步梯房顶楼（夏热冬湿，推开窗可见江雾与过往轮船）",
        wealthIndex: 1
      }
    ]
  },
  {
    region: "苏北运河畔平原农工县",
    landscape: "纵横运河驳船 · 农药厂排污渠 · 麦茬地",
    tagline: "极度崇尚读书做官，应试竞争激烈到令人窒息",
    icon: "🚢",
    hospitalName: "县第二人民医院产房",
    primarySchoolName: "县直第二实验小学",
    highSchoolName: "县高级中学",
    cityOrCounty: "运河工农县城",
    parents: [
      {
        fatherJob: "运河驳船机修装配工",
        fatherAge: 30,
        fatherTrait: "常年与柴油机和河水打交道，信奉‘万般皆下品惟有读书高’的死理",
        motherJob: "县农药化肥厂质检分析员",
        motherAge: 28,
        motherTrait: "对你的成绩排名盯得极紧，逢期末必定拿奖状贴满堂屋整面灰墙",
        housing: "运河堤坝后街联排自建两层砖楼（门口常停运粮手扶拖拉机）",
        wealthIndex: 1
      }
    ]
  }
];

export const BIRTHPLACE_SLIDES: BirthplaceSlide[] = REGION_ECOSYSTEMS.map(e => ({
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

  // 1. 抽取地域生态（医院、学校、生活区全绑定）
  const eco = REGION_ECOSYSTEMS[Math.floor(Math.random() * REGION_ECOSYSTEMS.length)];

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
      regionDetail: `${eco.landscape} | ${eco.tagline}`,
      hospitalName: eco.hospitalName,
      primarySchoolName: eco.primarySchoolName,
      highSchoolName: eco.highSchoolName,
      cityOrCounty: eco.cityOrCounty,
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
          delta: { academicCapital: 20, cognition: 15, health: -5, happiness: -5 },
          addTags: ["少年志气", "争先争优"]
        },
        {
          stanceBadge: "草莽仗义",
          text: "将多带的一支铅笔借给旁边急哭的同学，并悄悄教他系红领巾！",
          detail: "比起台上的虚名荣誉，你更看重身边同伴的难处，用朴素的善良赢得最铁的挚友。",
          reaction: "同学破涕为笑，老师投来赞许的目光，你们成了形影不离的一生莫逆之交。",
          delta: { social: 30, happiness: 25, inferiority: -10 },
          addTags: ["善良同理", "童年挚友"]
        },
        {
          stanceBadge: "旷野哲思",
          text: "站在后排微风中，专心看操场老白杨树上的花喜鹊筑巢，波澜不惊！",
          detail: "过早拥有一份超越同龄人的超脱与淡然，不热衷于仪式化的追捧，在天地微风中自得其乐。",
          reaction: "你在属于自己的角落里默默观察集体规则，保全了一份难能可贵的通透与松弛神性。",
          delta: { resilience: 20, rebellion: 20, happiness: 25, cognition: 15 },
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
          delta: { academicCapital: 25, cognition: 20, happiness: 10, health: -5 },
          addTags: ["算术天才", "展露头角"]
        },
        {
          stanceBadge: "商感萌芽",
          text: "在课桌下自编算盘口诀，教前后桌快速心算并换取麦芽糖与弹珠！",
          detail: "极早发现知识交换的商业价值，建立起自己在小团体里的技术壁垒与人望。",
          reaction: "前后桌同学心算飞速进步，你每天课桌抽屉里都堆满了小伙伴孝敬的零食与小玩意。",
          delta: { savings: 20, social: 25, cognition: 20, happiness: 20 },
          addTags: ["商业启蒙", "孩子王"]
        },
        {
          stanceBadge: "旷野创想",
          text: "在课本空白处画出精彩幽默的连环四格漫画，逗得全班憋笑！",
          detail: "天马行空的艺术想象力与松弛天性，自小构筑了丰饶独特的精神乐园。",
          reaction: "连数学老师课后看了你的画本也忍不住笑出声，夸你‘思维极其活跃，必有大创造力’。",
          delta: { happiness: 30, social: 20, rebellion: 15, cognition: 15 },
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
          delta: { resilience: 20, cognition: 15, savings: 5 },
          addTags: ["克制自律", "早熟自持"]
        },
        {
          stanceBadge: "市井博弈",
          text: "和同伴在泥地跳格子打赌，凭高超手艺不花一分钱赢回一大把稀有贴纸！",
          detail: "凭身手和聪明敏捷在街坊孩童中站稳脚跟，成为校门口公认的游戏霸主。",
          reaction: "全班同学纷纷拜你为师学技巧，你甚至开始用贴纸换取铅笔，商道大开！",
          delta: { social: 30, resilience: 20, savings: 15, happiness: 20 },
          addTags: ["身手敏捷", "街头霸主"]
        },
        {
          stanceBadge: "率真童趣",
          text: "买下最霸气的西游记大圣闪光贴纸贴在胸口，尽情享受纯粹的童年欢愉！",
          detail: "‘童年就这一次，我也想拥有一张属于自己的漂亮贴纸！’率性豁达不内耗。",
          reaction: "小伙伴们围着你羡慕不已，你昂首挺胸扮演齐天大圣，收获了一整天的阳光！",
          delta: { happiness: 35, social: 20, health: 10 },
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
          delta: { resilience: 25, academicCapital: 15, health: -5, happiness: 10 },
          addTags: ["风雨兼程", "野草骨气"]
        },
        {
          stanceBadge: "豁达乐观",
          text: "邀请同样没伞的同学一起在门卫传达室避雨，开讲三国连环画故事！",
          detail: "天性豁达开朗，无论身处何种窘境都能找到生活的乐趣，聚集起满满的温情。",
          reaction: "看门大爷听得入迷还给你们泡了热麦乳精，凄风苦雨变成了温暖一生的避风港记忆。",
          delta: { social: 30, happiness: 30, cognition: 20 },
          addTags: ["逆境生花", "豁达融洽"]
        },
        {
          stanceBadge: "深情依恋",
          text: "坐在父亲顶雨赶来的二八大杠雨衣怀里，贴着温热胸膛听雨声！",
          detail: "看着父亲湿透的双肩与混合汗水的雨水，体会到父爱如山沉甸甸的安全感。",
          reaction: "你紧紧抱住父亲粗壮的腰，贫瘠的家庭因为至真至浓的亲情而坚不可摧。",
          delta: { kinshipGuilt: 25, happiness: 25, health: 10 },
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
          delta: { social: 35, cognition: 20, happiness: 25 },
          addTags: ["演说领袖", "故事大王"]
        },
        {
          stanceBadge: "图书出租",
          text: "每次外借收取一分钱或一颗水果糖，三天回本并扩充成班级图书角！",
          detail: "敏锐发现精神消费的商业逻辑，以微薄资本撬动图书流转，建立起校园小图书馆。",
          reaction: "你成了班里最有书读且零钱不断的小能手，连高年级同学都慕名前来借书！",
          delta: { savings: 50, cognition: 25, social: 25 },
          addTags: ["商业启蒙", "图书管家"]
        },
        {
          stanceBadge: "闭门临摹",
          text: "躲在窗边拿薄纸细致临摹关公绣像与刀法，自学工笔白描透视！",
          detail: "耐得住寂寞，把喧嚣关在门外，在黑白线条与传统画法中沉潜钻研，领悟美学。",
          reaction: "老师将你的白描画作贴在教室后黑板展示，夸你‘少年心性定，必有大造诣’。",
          delta: { academicCapital: 20, cognition: 25, resilience: 20, happiness: 15 },
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
          delta: { academicCapital: 20, cognition: 15, resilience: 20, happiness: -5 },
          addTags: ["自尊傲骨", "发奋图强"]
        },
        {
          stanceBadge: "市井豪迈",
          text: "筷子一插大方把秘制咸菜分给全班：“我家自腌的，比肉还香！”",
          detail: "坦荡无畏，用纯正的人格魅力与豪爽击碎冷嘲热讽，在欢笑声中结交一群死党。",
          reaction: "城里同桌吃得满嘴流油直呼过瘾，第二天纷纷带自家好菜与你互换，融成一片！",
          delta: { social: 30, happiness: 25, resilience: 20, inferiority: -20 },
          addTags: ["坦荡大方", "草莽豪情"]
        },
        {
          stanceBadge: "商业调配",
          text: "用自家爽脆酱瓜跟同桌换来稀罕的进口威化饼与画本，资源互通！",
          detail: "敏锐察觉各自所需，用信息差和资源调配化解尴尬，初尝以物易物的商业甜头。",
          reaction: "你成了班级物资调配小能手，不仅天天吃上新鲜零食，还攒下了一笔铅笔文具储备。",
          delta: { savings: 30, cognition: 25, social: 20, happiness: 20 },
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
          delta: { academicCapital: 25, cognition: 20, resilience: 15, inferiority: -10 },
          addTags: ["领头拔尖", "做题苗子"]
        },
        {
          stanceBadge: "操场霸主",
          text: "拿出从家里带来的五彩弹珠，课间迅速聚拢全班呼朋引伴称兄道弟！",
          detail: "比起规规矩矩的体制班干部，你更喜欢在操场旷野上当指挥若定的孩子王。",
          reaction: "下课铃一响全班男生都围着你转，你成了校园里声望最高的领袖，老师对你又爱又敬！",
          delta: { social: 35, happiness: 25, resilience: 20 },
          addTags: ["操场霸主", "豪气天成"]
        },
        {
          stanceBadge: "窗边沉思",
          text: "选靠窗倒数第二排安坐，享受自由看杂书、看天边飞鸟的独立精神领地！",
          detail: "不热衷于世俗权力的争夺，在角落里自得其乐，构筑起独立而丰饶的精神世界。",
          reaction: "你拥有了别人羡慕不来的从容闲暇，课外杂书读了一本又一本，眼界远超同龄孩童。",
          delta: { happiness: 30, cognition: 25, rebellion: 20 },
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
          delta: { academicCapital: 25, cognition: 20, resilience: 20, inferiority: -10 },
          addTags: ["以读卫尊", "神童资质"]
        },
        {
          stanceBadge: "手艺抵资",
          text: "掏出自己雕刻的精美木刻生肖和帮门卫修好的手电筒折抵勤工！",
          detail: "“老师，我能帮学校修课桌修理水龙头！”超常的动手天赋让校领导赞叹不已破格录用。",
          reaction: "校长当场宣布让你担任红领巾劳动标兵，免除了全部借读费，母亲含泪欣慰不已！",
          delta: { savings: 50, social: 25, resilience: 25, cognition: 20 },
          addTags: ["动手立身", "巧手破局"]
        },
        {
          stanceBadge: "旷野温情",
          text: "紧紧牵着母亲的手在夕阳台阶温声安慰，成为母亲最坚实的依靠！",
          detail: "“妈，咱不丢人，我往后一定出息让你过上好日子！”用稚嫩却坚定的怀抱温暖母亲。",
          reaction: "母亲抹去眼泪紧紧搂住你，家庭的凝聚力与深情在患难中被淬炼得无坚不摧！",
          delta: { happiness: 35, familySavings: 1000, resilience: 25, health: 10 },
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
  // 8岁 · 小学三年级 (Choice)
  // --------------------------------------------------------------------------
  8: [
    {
      id: "age_8_sports",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "校运会六十米短跑与全场加油呐喊",
      scene:
        "春季校运会，没有专业跑鞋的你穿着洗得发白的回力球鞋站在跑道起点。发令枪响那一刻，班级看台上敲着搪瓷盆为你声嘶力竭地喊加油。",
      type: "choice",
      choices: [
        {
          stanceBadge: "搏命夺冠",
          text: "咬紧牙关拼命摆臂冲刺，双膝擦破依然打破校纪录拿下全校第一！",
          detail: "心无旁骛，用顽强的爆发力战胜了所有对手，登上最高领奖台，但大腿韧带严重拉伤。",
          reaction: "班主任和全班同学把你高高抛起，大红奖状印着你的名字贴在黑板正中，但你瘸着腿走了一整周。",
          delta: { academicCapital: 15, resilience: 25, happiness: 15, health: -15 },
          addTags: ["短跑冠军", "拼命三郎"]
        },
        {
          stanceBadge: "偏锋统筹",
          text: "组织场外后勤与拉赞助，摆冰镇白糖水摊为运动员服务大赚零花！",
          detail: "洞悉大型赛事的物资流动，拉拢好友在终点分发糖水与看管衣物，净赚人生第一笔小金库。",
          reaction: "不仅班级后勤井井有条，兜里还塞满了皱巴巴的零钞，老师夸你‘天生有统帅商业大局观’。",
          delta: { social: 30, savings: 150, cognition: 20, happiness: 20 },
          addTags: ["赛事总管", "商业头脑"]
        },
        {
          stanceBadge: "文创采写",
          text: "背着借来的傻瓜相机与速写本记录每个热血瞬间，广播稿催泪全校！",
          detail: "用极其细腻的文字与镜头定格落后同学爬起的感人画面，文采飞扬轰动全校广播站。",
          reaction: "全校师生在广播喇叭下热泪盈眶，校长特批你为学校首席红领巾通讯员！",
          delta: { cognition: 25, happiness: 30, social: 25, academicCapital: 15 },
          addTags: ["金牌采写", "灵魂观察"]
        }
      ]
    },
    {
      id: "age_8_picnic",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "学校春游与塑料袋里装的土鸡蛋",
      scene:
        "学校组织春游，城里同学带了面包、火腿肠和易拉罐健力宝；你书包里装着母亲清晨早起煮好的两个土鸡蛋和几片抹酱馒头。大家在绿油油的草坡上铺开桌布。",
      type: "choice",
      choices: [
        {
          stanceBadge: "坦然自洽",
          text: "向阳树荫下津津有味品尝自家土鸡蛋，顺手清理全场垃圾获全校通报！",
          detail: "内心坦荡，不卑不亢，享受大自然与朴素的美味，用文明与自律赢得全场尊崇。",
          reaction: "带队老师夸你‘心性通透懂事且爱护自然’，在春游总结班会上特别向全校表扬了你。",
          delta: { happiness: 30, health: 15, resilience: 20, inferiority: -15 },
          addTags: ["坦然自洽", "文明风骨"]
        },
        {
          stanceBadge: "爽朗社交",
          text: "大方拿自家土鸡蛋跟同桌交换健力宝与火腿肠，打破物质隔阂结交挚友！",
          detail: "善于人际融通，用真诚大方的性格消弭阶层差异，让城里同学争相品尝农家风味。",
          reaction: "同桌赞叹你家的土鸡蛋比超市买的香得多，两人开怀大笑，成了形影不离的好伙伴。",
          delta: { social: 30, happiness: 25, inferiority: -10 },
          addTags: ["人际大度", "打破壁垒"]
        },
        {
          stanceBadge: "领队担当",
          text: "主动帮老师背负急救医药箱与大水壶，走在队伍最前面当开路领队！",
          detail: "眼里有活，用踏实勤快与大哥哥般的担当赢取大人们的一致赞赏与信赖。",
          reaction: "老师奖励了你一枚小红花特权胸章，任命你为班级常任安全委员。",
          delta: { social: 20, resilience: 20, academicCapital: 15, health: 10 },
          addTags: ["骨干担当", "师长喜爱"]
        }
      ]
    },
    {
      id: "age_8_crayons",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "少儿书画比赛与二十四色水彩笔",
      scene:
        "市里举办少儿书画展，美术老师挑选画得好的同学参赛。你平时只能用铅笔在废纸背面练习，看着同桌桌上展开一整盒耀眼的二十四色双头水彩笔。",
      type: "choice",
      choices: [
        {
          stanceBadge: "铅笔惊艳",
          text: "仅用一支残铅笔精细素描家乡麦浪大透视，力压豪华彩笔斩获特等奖！",
          detail: "不受器材限制，凭借极其敏锐的结构观察力与光影笔触打动全省评委，轰动展馆。",
          reaction: "评委专家对你的素描功力赞不绝口，美术馆出资为你买下一整套专业进口画具并挂出巨幅画作！",
          delta: { academicCapital: 25, cognition: 30, resilience: 25, happiness: 20 },
          addTags: ["素描神童", "凭实力通关"]
        },
        {
          stanceBadge: "商业手绘",
          text: "课间帮同学在书皮上精绘齐天大圣与变形金刚，每张两毛自筹全套彩笔！",
          detail: "把画画天赋迅速转化为商业变现，短短三天桌前排起长队，不仅买回彩笔还结交全班朋友。",
          reaction: "不仅如愿用上了属于自己的高级彩笔，兜里还剩下大笔零花，成了校园公认的‘神笔画师’。",
          delta: { savings: 60, social: 25, cognition: 20, happiness: 20 },
          addTags: ["手艺创富", "校园画师"]
        },
        {
          stanceBadge: "旷野拾萃",
          text: "收集校园金黄落叶与各色花瓣拼贴出微观大地艺术，灵气逼人独树一帜！",
          detail: "跳出千篇一律的填色框框，在大自然中汲取灵感，创造出震撼人心的原生态植物拼贴画。",
          reaction: "你的作品被省少儿美育刊物选作封面，专家赞叹‘这孩子保留了未经规训的纯粹艺术灵魂’。",
          delta: { happiness: 35, cognition: 25, rebellion: 20, social: 20 },
          addTags: ["大地艺术", "灵性自留"]
        }
      ]
    },
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
          stanceBadge: "苦修傲骨",
          text: "在走廊笔直迎风站立背诵完全本课文，下周期末考夺年级第一令全校刮目！",
          detail: "你没有哭，把自尊受挫的剧痛炼成了钢铁般的意志，用绝对分数迫使班主任公开道歉。",
          reaction: "期末颁奖台上，你一人包揽全部三好学生与满分奖状，但自尊心从此多了一层坚硬冰冷的甲胄。",
          delta: { academicCapital: 25, cognition: 20, health: -10, happiness: -10, resilience: 30 },
          addTags: ["要强自尊", "发奋苦读"]
        },
        {
          stanceBadge: "野性创富",
          text: "午休去后山水渠摸两桶小龙虾卖给菜市小贩，堂堂正正凭双手交齐费用！",
          detail: "不怨天尤人，满身泥浆却眼神如狼，靠自己的野性体力和市场交易堂堂正正换回尊严。",
          reaction: "当你把一把带泥腥味的真钞排在讲台上时，全班肃然起敬，你第一次体会到金钱与独立的份量！",
          delta: { savings: 120, social: 20, resilience: 30, health: 15, cognition: 15 },
          addTags: ["野性自立", "草莽生存"]
        },
        {
          stanceBadge: "风骨坦荡",
          text: "旧布衣洗得雪白领口熨平，在阳光下昂首朗诵《少年中国说》全无卑色！",
          detail: "根本不将世俗标签与校服攀比放在眼里，内在的自信与风骨反倒成了校园一道靓丽风景。",
          reaction: "校长路过被你铿锵有力的读书声吸引驻足，当场特批校服款免除，全校掌声雷动！",
          delta: { happiness: 35, resilience: 25, cognition: 25, health: 15 },
          addTags: ["风骨坦荡", "傲然自尊"]
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
          stanceBadge: "逻辑自证",
          text: "调阅早自习值日排班与笔迹勘验，条理分明当场揪出真凶洗刷冤屈！",
          detail: "条理清晰逻辑严密，不仅有理有据证明自身清白，更迫使真正偷藏笔的同学当众认错。",
          reaction: "班主任和全班同学对你的冷静睿智刮目相看，班长满脸通红诚恳向你鞠躬赔罪。",
          delta: { cognition: 25, academicCapital: 20, resilience: 20, happiness: 15 },
          addTags: ["神探逻辑", "沉着自护"]
        },
        {
          stanceBadge: "江湖格局",
          text: "淡定掏出帮街坊修钟表攒下的两张纸币：“若找不到这支我赔！”格局震慑全场！",
          detail: "气吞山河的格局与豪迈气魄瞬间震慑全班，窃贼羞愧自首，你收获了全班无可撼动的尊崇。",
          reaction: "全班为你的胸襟叹服，班长私下买来最好的钢笔送给你当谢礼，你成了班级真正的无冕之王。",
          delta: { social: 35, resilience: 25, cognition: 20, savings: -20 },
          addTags: ["江湖格局", "领袖风范"]
        },
        {
          stanceBadge: "冷眼洞察",
          text: "神色泰然自若，在草稿本写下讽刺群氓偏见的寓言小品，展现过人早熟洞察！",
          detail: "穿透人性中‘有罪推定’与贫富偏见的虚妄，在年幼的心灵里生发出极其深刻的社会观察力。",
          reaction: "你的文章在语文周记课上被老师当范文深读，全班陷入沉思，你完成了思想上的高维蜕变。",
          delta: { cognition: 30, happiness: 25, rebellion: 25, resilience: 20 },
          addTags: ["哲思蜕变", "冷眼观世"]
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
          stanceBadge: "顺从苦修",
          text: "咬牙把错题本抄写五遍做到滚瓜烂熟，换取家庭温和但常有心悸梦惊",
          detail: "顺从父母的高压管束，用近乎完美的卷面换取家庭少得可怜的温和，考了全县第一。",
          reaction: "你次次考第一，但你开始有了梦中被抽打惊醒的心慌毛病，精神始终处于紧绷应激状态。",
          delta: { academicCapital: 25, cognition: 20, health: -15, happiness: -20, resilience: 15 },
          addTags: ["高压做题", "完美主义"]
        },
        {
          stanceBadge: "暗中滋养",
          text: "把武侠小说与科幻故事藏在课本下偷读，保全超凡灵气与文学想象力！",
          detail: "‘既然现实这么窒息，那就在想象的世界里翱翔。’虽然常被抓包挨训，但灵气丝毫未受磨灭。",
          reaction: "你的作文屡屡被推荐到省市报刊发表，独特的文风与想象力成了你一生最宝贵的精神财富。",
          delta: { happiness: 30, cognition: 25, rebellion: 25, social: 15 },
          addTags: ["文学灵气", "精神逃逸"]
        },
        {
          stanceBadge: "破冰沟通",
          text: "平静放下笔与父亲认真对视：“爸，越打我越紧张，教我方法好吗？”",
          detail: "鼓起勇气打破家庭暴力的沉闷闭环，用超越年龄的理性引导父母建立平等的代际对话。",
          reaction: "父亲愣了半天，手里的掸子慢慢放下了，那晚他在阳台抽完烟后，第一次坐下来温和为你讲题。",
          delta: { happiness: 30, kinshipGuilt: -15, resilience: 25, health: 15 },
          addTags: ["破冰代沟", "家庭和解"]
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
        "小升初摸底考成绩出炉。中学按成绩将学生分入快慢班。快班是冲刺重点高中的摇篮，但周末需加课补习且收费不菲；普通班管理松散，放学早。全家人围在饭桌旁等你的决断。",
      type: "choice",
      choices: [
        {
          stanceBadge: "苦修登顶",
          text: "咬牙进入火箭班，挑灯夜读跟上高压节奏，稳居年级前三！",
          detail: "每天只睡5个半小时，床头贴满错题卡，在严酷的分数排位中与尖子生近身肉搏。",
          reaction: "你的期末排位稳固在年级前列，但深度近视和偏头痛也悄然找上了你，少年的笑容渐渐变少。",
          delta: { cognition: 25, academicCapital: 30, health: -20, happiness: -20, resilience: 20 },
          addTags: ["快班高压", "做题机器"]
        },
        {
          stanceBadge: "偏锋商海",
          text: "进普通班保全精力，课余倒腾当红文具与网吧充值卡摸清现金流！",
          detail: "敏锐抓住县城学生消费潮流，帮小卖部代销零食与漫画，手里积攒下可观的私房钱。",
          reaction: "虽然成绩处于中游，但你在同龄人中人缘极佳，早早摸透了市井交易与人情往来的底层逻辑。",
          delta: { social: 30, savings: 800, cognition: 20, academicCapital: -5 },
          addTags: ["市井财商", "人脉亨通"]
        },
        {
          stanceBadge: "旷野自洽",
          text: "留在普通班享受大把闲暇，读遍名著科幻杂书，强健身心与体魄！",
          detail: "拒绝无休止的机械刷题，每天打篮球、游泳、在旧书摊看杂书，保持身心的健全与旺盛生命力。",
          reaction: "你拥有全校最健壮的体魄与通透独立的精神世界，终生免疫应试焦虑与精神内耗！",
          delta: { health: 25, happiness: 35, cognition: 25, resilience: 15 },
          addTags: ["从容通达", "精神旷野"]
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
          stanceBadge: "偏锋领袖",
          text: "帮成绩差的舍友辅导作业答疑，成了全宿舍说一不二的主心骨！",
          detail: "用脑力与人格魅力化解温饱窘境，不仅饭票零食吃不完，更赢得全寝室最深的敬重。",
          reaction: "全寝室的舍友都视你为大哥，多年后各奔前程依然对你随叫随到，积累了一辈子的铁杆人脉。",
          delta: { social: 30, resilience: 20, savings: 150, happiness: 15 },
          addTags: ["宿舍领袖", "江湖声望"]
        },
        {
          stanceBadge: "苦修苦行",
          text: "就着白开水咽完干馒头，泡在自习室把整本英语词典背完忘记饥饿！",
          detail: "把一切生理匮乏压制在精神深处，靠钢铁般的自尊心苦撑，发誓终有一天要靠读书翻盘。",
          reaction: "你熬过了艰难的四天，英语月考斩获全校第一，但胃部偶尔落下了阵痛的病根。",
          delta: { academicCapital: 25, cognition: 20, resilience: 25, health: -15 },
          addTags: ["苦行傲骨", "钢铁意志"]
        },
        {
          stanceBadge: "旷野乐天",
          text: "借来一把旧吉他在走廊带领全楼合唱《童年》，用纯粹的浪漫驱散寒冷！",
          detail: "在最窘迫的寒夜用音乐和欢笑温暖所有人，整栋宿舍楼的窗户都探出脑袋跟着大合唱。",
          reaction: "连查寝的宿管大叔都笑着端来了一大碗热腾腾的面条，清贫的青春变成了永生难忘的浪漫诗篇！",
          delta: { happiness: 40, social: 30, health: 15 },
          addTags: ["浪漫天性", "逆境狂歌"]
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
          stanceBadge: "极客破局",
          text: "向网管死磕Linux系统安装与代码原理，自学软硬件技术与局域网调试！",
          detail: "对计算机背后的技术机制产生了狂热好奇，帮网管修键盘装系统换取免费上网与技术指导。",
          reaction: "你早早掌握了系统装机、网络嗅探和基础代码，成了同龄人仰望的计算机天才，技术启蒙极早！",
          delta: { cognition: 35, rebellion: 25, savings: 300, resilience: 20 },
          addTags: ["极客启蒙", "动手能手"]
        },
        {
          stanceBadge: "电竞领袖",
          text: "在局域网CS对战中战术指挥若定，带领小镇战队拿下全省联赛冠军！",
          detail: "展现出过人的战场洞察力与临场心理博弈，不仅赢得大笔赛事奖金，更在江湖上名声大噪。",
          reaction: "你分到了丰厚的比赛奖金，网吧老板奉你为座上宾，收获了一群生死与共的铁哥们。",
          delta: { social: 35, savings: 1500, happiness: 25, rebellion: 20 },
          addTags: ["战队统帅", "豪爽义气"]
        },
        {
          stanceBadge: "外语探窗",
          text: "戴上耳机借网吧网络收听BBC英语原声广播，在外语世界里寻找远方！",
          detail: "在市井烟雾中守住内心的航标，借互联网之桥聆听大洋彼岸的真实声音，自练地道口音。",
          reaction: "在同龄人还在死记中式英语时，你已经能流利听懂原声电台，为未来的全球化生存埋下神级底牌！",
          delta: { academicCapital: 25, cognition: 30, resilience: 20, happiness: 15 },
          addTags: ["国际视野", "破壁自学"]
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
          stanceBadge: "苦修登顶",
          text: "咬紧牙关拼死冲刺普高，坚信做题是寒门唯一的窄门！",
          detail: "哪怕全家节衣缩食，每天只睡5小时刷烂三套题，也决不向分流低头。",
          reaction: "你顺利拿到{highSchool}录取通知书，但长期熬夜让你的视力跌入高度近视，身心疲惫不堪。",
          delta: { academicCapital: 30, cognition: 20, health: -20, happiness: -15, resilience: 20 },
          trackTrigger: "academic",
          addTags: ["普高冲刺", "学术路径"]
        },
        {
          stanceBadge: "偏锋破局",
          text: "报考公立高级技师数控/自动化实操班，掌握不可替代的硬核手艺！",
          detail: "‘靠一身过硬真本事吃饭，比虚浮的名头结实得多！’免学费并快速进入校企高薪实训。",
          reaction: "你在实训车间掌握了精密机床操作，16岁便能独立带薪实习，极早实现经济自给自足！",
          delta: { resilience: 30, savings: 4000, cognition: 15, health: 15 },
          trackTrigger: "vocational",
          addTags: ["实干底色", "硬核技能"]
        },
        {
          stanceBadge: "偏锋闯荡",
          text: "提早奔赴沿海供应链大厂与特区，从外贸采购与电商打单闯起！",
          detail: "跳出书本的象牙塔，提着行囊踏上南下列车，在最前沿的商业洪流中摸爬滚打。",
          reaction: "你在深圳和东莞的电商与外贸圈迅速摸透市场规则，结交了一帮同甘共苦的生意伙伴，积攒了第一桶金！",
          delta: { savings: 8000, social: 30, resilience: 30, cognition: 20, rebellion: 25 },
          addTags: ["沿海淘金", "商贸嗅觉"]
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
          stanceBadge: "苦修登顶",
          text: "求家里拿出压箱钱全力支持走美术艺考，每天在画室画到手指抽筋！",
          detail: "父母拿出多年攒下的养老积蓄为你报名。你每天在画室临摹石膏像与色彩静物到凌晨。",
          reaction: "你以名列前茅的专业成绩拿到降分指标考入{highSchool}艺术班，背负着全家的期待负重前行。",
          delta: { academicCapital: 20, familySavings: -12000, resilience: 20, health: -10 },
          trackTrigger: "academic",
          addTags: ["艺术曲折", "举家豪赌"]
        },
        {
          stanceBadge: "做题硬骨",
          text: "坚决放弃高昂集训，纯靠普通文化课死磕到底压线逆袭！",
          detail: "‘家里经不起这样的折腾，我只能靠自己一笔一划考出来！’作息压到极致，专攻数学错题。",
          reaction: "你以超普高线5分的惊险战绩压线入读普通高中，省下了上万元救命钱，昂首挺胸！",
          delta: { academicCapital: 25, resilience: 25, health: -15, happiness: 10 },
          trackTrigger: "academic",
          addTags: ["压线逆袭", "硬骨头"]
        },
        {
          stanceBadge: "偏锋破局",
          text: "利用二手板卡自学CG插画与网络商业约稿，靠接单为家里自筹学费！",
          detail: "在网上向职业画师请教，把天赋投入到当红游戏角色插画与同人设计中，赚取真金白银。",
          reaction: "你的画作在插画社区大受欢迎，不仅自筹了全部学杂费，还提前建立了商业插画人脉！",
          delta: { savings: 6000, cognition: 25, rebellion: 25, happiness: 25 },
          trackTrigger: "vocational",
          addTags: ["商业画师", "自力更生"]
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
          stanceBadge: "苦修求索",
          text: "坚决不从，拿着自己挣的奖学金和零花钱搬进学校自习室死磕到底！",
          detail: "‘哪怕喝白开水啃冷馒头我也要把书念完，你们拦不住我！’用绝对成绩赢得全免学费特批。",
          reaction: "班主任和校长亲自上门做你父母的思想工作，学校为你免除学杂费，你成了校园逆流传奇。",
          delta: { rebellion: 35, academicCapital: 25, resilience: 25, health: -10 },
          trackTrigger: "academic",
          addTags: ["破门求学", "逆流而上"]
        },
        {
          stanceBadge: "偏锋商海",
          text: "接管家里摊位，引入批发账目与早市外卖配送，改造成盈利大档口！",
          detail: "体恤父母的难处，但绝不因循守旧。用年轻人的敏锐商业眼光整合进货渠道，拓展周边客源。",
          reaction: "摊位流水翻了整整三倍，不仅帮家里还清了债务，卡里还积攒下了数万元启动资金！",
          delta: { savings: 16000, resilience: 25, social: 25, cognition: 20 },
          trackTrigger: "vocational",
          addTags: ["商业奇才", "挽狂澜者"]
        },
        {
          stanceBadge: "降维出海",
          text: "收拾包裹连夜坐大巴奔赴沿海经济特区，投身外贸供应链浪潮！",
          detail: "‘世界那么大，老家的小池塘容不下我的野心！’奔赴深圳与义乌，在蓬勃的外贸窗口闯荡。",
          reaction: "你在轰鸣的外贸物流港与跨国展会中眼界大开，迅速掌握了涉外沟通与供应链操盘技巧！",
          delta: { savings: 9000, cognition: 35, rebellion: 40, resilience: 25 },
          trackTrigger: "vocational",
          addTags: ["外贸弄潮", "跳出故土"]
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
      title: "高中月考大榜排名如刀割",
      scene:
        "教室走廊上挂满了大红排位榜，每次月考名次上下浮动几名都牵动着全家人的神经。同桌在晚自习因为做不出最后一道导数大题号啕大哭被家长接回家。你看着漆黑的窗外，体会到了独木桥的冷酷。",
      type: "natural",
      naturalDelta: { cognition: 10, academicCapital: 10, health: -5 }
    },
    {
      id: "age_16_dormitory_study",
      age: 16,
      stageName: "高中/职校阶段 · 16岁",
      title: "寄宿高中大通铺与熄灯后手电背单词",
      scene:
        "寄宿高中的多生宿舍，熄灯铃声一响，整个楼道陷入黑暗。为了跟上重点班的快节奏，你缩在被窝里用手电筒照着厚厚的英语词汇手册，默背完最后一页才沉沉睡去。在逼仄的床板上，你暗自下定决心要凭分数改变命运。",
      type: "natural",
      naturalDelta: { academicCapital: 15, resilience: 15, health: -5 }
    },
    {
      id: "age_16_evening_study",
      age: 16,
      stageName: "高中/职校阶段 · 16岁",
      title: "高一晚自习自行车破风与校门口热包子",
      scene:
        "冬夜十点，晚自习下课铃打响。你裹紧有些单薄的校服棉袄，推着破旧自行车迎着刀子般的夜风骑行回家。校门口推车蒸笼热汽腾腾，两块钱买两个大肉包子吞下肚，浑身才有了暖意。书包沉甸甸压着后座，青春在题海与寒风中拔节生长。",
      type: "natural",
      naturalDelta: { resilience: 15, academicCapital: 10, health: -5 }
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
          stanceBadge: "苦修登顶",
          text: "每天只睡4小时狂饮浓茶红牛，将题海战术推到肉身生理极限",
          detail: "‘既然没有退路，那就把每一秒都压榨在试卷上！’大冬天洗冷水脸，风油精擦在眼皮底下。",
          reaction: "你的模拟考分数一路飙升逼近全省前1%，但早起常常心悸胸闷，神经紧绷到了极点。",
          delta: { academicCapital: 30, cognition: 20, health: -25, happiness: -20, resilience: 20 },
          addTags: ["透支冲顶", "绝境狂奔"]
        },
        {
          stanceBadge: "旷野自洽",
          text: "保持每天8小时充足睡眠与下午三公里慢跑，以顶级竞技体魄应考",
          detail: "‘如果通关的前提是彻底崩溃，那我宁可做一个身心健全的自洽者。’用充沛的精力和清晰的脑力迎考。",
          reaction: "考场上其他考生哈欠连天焦躁不安，你思路如泉涌落笔如飞，发挥出惊人的抗压定力！",
          delta: { health: 25, happiness: 30, academicCapital: 20, cognition: 15 },
          addTags: ["身心巅峰", "松弛应战"]
        },
        {
          stanceBadge: "偏锋破局",
          text: "系统复盘历年命题规律与赋分模型，组织班级学习共同体互助押题",
          detail: "用研究性视角破解高考游戏规则，搭建高效答题框架，并为周围好友讲解核心模型。",
          reaction: "不仅自己做题如探囊取物，还带动了整个小群体的分数飞跃，赢得了一批患难知交。",
          delta: { cognition: 25, academicCapital: 20, social: 30, resilience: 20 },
          addTags: ["方法论大师", "众望所归"]
        }
      ]
    },
    {
      id: "age_17_recommendation",
      age: 17,
      stageName: "冲刺阶段 · 17岁",
      title: "自主招生与保送加分资格的风波",
      scene:
        "高考前夕，省重点高校在{highSchool}投放了三个自招降分名额。原本按照摸底排名稳稳有你一个，但红榜公布时你的名字被有背景的关系户顶替了。全班死一般沉寂。",
      type: "choice",
      choices: [
        {
          stanceBadge: "苦修登顶",
          text: "咽下委屈化作彻夜刷题的凶狠，誓要在裸分考场上用实力碾碎特权！",
          detail: "‘既然潜规则剥夺了近道，那就在纯粹的考场上把他们碾得粉碎！’每天只睡4小时，刷穿真题。",
          reaction: "你在狂热的解题冲刺中攻克了所有压轴题，但偏头痛和严重颈椎病也落下了病根。",
          delta: { academicCapital: 35, cognition: 20, health: -20, happiness: -15, resilience: 25 },
          addTags: ["裸分狂徒", "硬核应试"]
        },
        {
          stanceBadge: "法理铁拳",
          text: "搜集完整的学籍与考勤档案，向省教育纪检实名申诉掀翻暗箱交易！",
          detail: "骨子里拥有坚不可摧的正气与抗争胆魄，绝不容许暗箱潜规则践踏寒门青春。",
          reaction: "调查组火速入驻核查，顶替者被当场除名，指标公正归还，你成了全校青年维权传奇！",
          delta: { social: 30, cognition: 25, rebellion: 35, resilience: 25, happiness: 20 },
          addTags: ["铁骨正气", "维权斗士"]
        },
        {
          stanceBadge: "偏锋破局",
          text: "看穿单一应试的虚妄，转战跨境电商、海外独立站与外文编程接单！",
          detail: "老子不在你们封闭的负和游戏里陪跑！利用晚自习自学外语与编程，提前开辟全球市场。",
          reaction: "高考前夕你的独立站迎来了第一个海外爆单，赚取了人生第一笔两万多元外汇，降维打击！",
          delta: { savings: 24000, cognition: 30, rebellion: 35, happiness: 25 },
          addTags: ["商业降维", "极客破局"]
        },
        {
          stanceBadge: "旷野浪游",
          text: "撕掉模考成绩单，背上吉他与速写本奔赴大山深处寻找生命的本真！",
          detail: "拒绝将青春异化为流水线耗材，在雪山与广袤原野中采风创作，灵魂彻底觉醒脱胎换骨。",
          reaction: "你在大山村民的热情与纯净自然中找回了滚烫的生命力，创作出全网疯传的民谣与原生态长文！",
          delta: { happiness: 45, health: 30, social: 25, rebellion: 30 },
          addTags: ["旷野觉醒", "精神丰盈"]
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
          stanceBadge: "苦修登顶",
          text: "推翻保守求稳方案，坚信真实实力，第一志愿依然锁死985硬核理工！",
          detail: "经得起大风大浪，拥有顶尖高手的定力与自信，绝不在黎明前向胆怯投降。",
          reaction: "高考正试你发挥神勇彻底洗刷失常耻辱，斩获重点大学录取通知书！",
          delta: { academicCapital: 30, resilience: 25, rebellion: 20, happiness: 20 },
          addTags: ["大心脏", "逆风翻盘"]
        },
        {
          stanceBadge: "偏锋出海",
          text: "务实报考沿海开放城市公办院校涉外商贸/软件专业，奔赴广阔大市场！",
          detail: "不留恋封闭的熟人老家，一心借着大学跳板拥抱沿海广阔的商业机会与国际流动性。",
          reaction: "文凭虽非顶尖，但沿海蓬勃的民企实习、外资港口与跨境出海为你推开了全新的大门！",
          delta: { rebellion: 25, resilience: 20, social: 25, savings: 3000 },
          addTags: ["奔赴沿海", "跳出故土"]
        },
        {
          stanceBadge: "旷野自洽",
          text: "坦然接受保底方案，报考包分配的省内定向师范/公费警校，稳稳扎根",
          detail: "体恤父母的焦虑与家庭经受力，将安稳底线与生活节奏置于虚名之上，求得现世安好。",
          reaction: "毕业包分配、带编制且无后顾之忧，全家人在老家摆酒庆祝，你拥有了从容的生活。",
          delta: { familySavings: 15000, happiness: 25, resilience: 20, health: 15 },
          addTags: ["求稳扎根", "体制预备"]
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
    // 0岁：严格契合出生地医院与生活区
    if (age === 0) {
      result.push({
        id: `age_0_${family.region}`,
        age: 0,
        stageName: "婴儿期 · 0岁",
        title: "初临人间与第一声啼哭",
        scene: `秋风渐起的午后，你出生在${family.hospitalName}泛黄的被单上。助产士轻轻拍打你的后背，你发出第一声响亮的啼哭。产房外走廊里，父亲来回踱步，手里捏着汗湿的缴费单；母亲虚弱地将你揽入怀中，为你取下伴随一生的名字。这一年，你正式来到${family.cityOrCounty}。`,
        type: "natural",
        naturalDelta: { health: 5, happiness: 5 },
        naturalTags: ["初临人间"]
      });
      continue;
    }

    // 1岁：【周岁抓周礼】告别单调机械连点！第一岁就拥有决定性格底色的高光抉择！
    if (age === 1) {
      result.push({
        id: `age_1_zhuazhou_${family.region}`,
        age: 1,
        stageName: "幼芽期 · 1岁",
        title: "周岁抓周礼与命定信物",
        scene: "八仙桌上铺着大红方布，亲戚街坊围在四周看热闹。母亲把你放在红布中央，桌上摆着旧算盘、发黄的字典、小螺丝刀和一张折叠整齐的纸币。长辈们拍着手催促：“宝宝快抓，看看这辈子奔什么前程！”",
        type: "choice",
        choices: [
          {
            stanceBadge: "偏锋商感",
            text: "一把抓过旧算盘与账本，小手拨弄算珠噼啪作响！",
            detail: "对数字、流水与利益交易天然敏感，引得周围亲友夸赞这娃天生有财商会做买卖。",
            reaction: "长辈们笑得合不拢嘴，父亲把一块珍藏的老银圆塞进了你的贴身荷包当作启动资金。",
            delta: { cognition: 20, savings: 300, happiness: 15 },
            addTags: ["早慧商感", "精打细算"]
          },
          {
            stanceBadge: "苦修书香",
            text: "伸手抱住发黄的新华字典与毛笔，安静翻看纸页！",
            detail: "不哭不闹喜静爱书，眉宇间流露出对文字符号与应试求知的本能好奇与沉稳专注。",
            reaction: "外公推了推老花镜欣慰点头：“是个读书的硬苗子，往后准有大出息！”",
            delta: { academicCapital: 25, cognition: 20, inferiority: -10 },
            addTags: ["书香初萌", "好学幼苗"]
          },
          {
            stanceBadge: "硬核工匠",
            text: "攥住沉甸甸的小扳手与螺丝刀，在木桌缝里专注捣鼓！",
            detail: "专注摆弄机械构件与实体工具，自小展现出过硬的动手实操天性与工匠底色。",
            reaction: "开修理铺的二叔拍腿大笑：“好手艺人！凭真力气吃饭走遍天下都不慌！”",
            delta: { resilience: 25, social: 15, health: 15 },
            addTags: ["工匠天分", "动手实操"]
          },
          {
            stanceBadge: "旷野出海",
            text: "抓起那张花花绿绿的纸币，眼睛直勾勾望着门外飞鸟！",
            detail: "自小对辽阔未知的远方充满向往，天性不受故土温室的规训与拘束，神往世界。",
            reaction: "母亲轻轻把你抱在怀里擦汗：“这孩子心大得很，往后怕是留不住在家门口哟。”",
            delta: { rebellion: 30, happiness: 25, kinshipGuilt: -5 },
            addTags: ["向往辽阔", "天性不羁"]
          }
        ]
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
    // 1-A: 保研硕博学术深造路线
    if (choiceText.includes("保研") || choiceText.includes("深造") || choiceText.includes("硕士")) {
      return [
        {
          id: "age_22_985_acad",
          age: 22,
          stageName: "研一学术长跑 · 22岁",
          title: "研一实验室文献攻坚与开题长跑",
          scene: "名校保研后，你在重点实验室开启了三年的学术深造。面对顶会顶刊的前沿英文文献与繁复的数据仿真，你耐得住板凳十年冷，在组会汇报与开题答辩中磨砺心智。",
          type: "choice",
          choices: [
            {
              text: "泡在实验室跑仿真洗数据，撰写英文开题报告，展现出扎实的理论钻研底子",
              detail: "耐得住枯燥，一遍遍调整模型参数，开题答辩受到全院教授高度好评。",
              reaction: "导师对你的严谨态度点头赞许，把一项省部级重点前沿课题交由你主导实验。",
              delta: { academicCapital: 25, cognition: 20, savings: 8000 },
              addTags: ["扎实科研", "学术苗子"]
            },
            {
              text: "组队参与顶级算法与前沿产学研合作项目，打通学术理论与工业落地的闭环",
              detail: "既搞理论创新又接工业实战，把实验室算法在企业实际场景中跑出标杆表现。",
              reaction: "产学研合作企业开出高额课题津贴，你的工程落地能力在研究生院名列前茅。",
              delta: { cognition: 25, savings: 15000, social: 15 },
              addTags: ["产学研结合", "实战学术"]
            }
          ]
        },
        {
          id: "age_23_985_acad",
          age: 23,
          stageName: "研二科研突破 · 23岁",
          title: "研二科研攻关突破与顶刊学术嘉奖",
          scene: "研二阶段，经历了上百次模型推翻重来后，你在科研攻关中取得了关键性突破，迎来了学术生涯的爆发期。",
          type: "choice",
          choices: [
            {
              text: "在国际权威期刊上以第一作者录用高质量学术论文，荣获国家研究生一等奖学金",
              detail: "审稿人给出极高评价，成为学院当年的学术明星，两万元国奖稳稳落袋。",
              reaction: "学院官网头条报道你的研究成果，导师主动为你撰写海外深造或顶尖求职推荐信。",
              delta: { academicCapital: 30, cognition: 20, savings: 25000, inferiority: -15 },
              addTags: ["顶刊一作", "学术嘉奖"]
            },
            {
              text: "受邀在全国高规格学术年会上做分论坛学术汇报，与行业泰斗和跨国专家举杯畅谈",
              detail: "流利英文演讲震惊四座，在学术与前沿产业圈层积累下了厚重的顶级人脉资本。",
              reaction: "多家跨国科技实验室与高校向你提前发来邀约，学术之路辽阔平坦。",
              delta: { social: 25, cognition: 20, savings: 10000 },
              addTags: ["学者风度", "前沿视野"]
            }
          ]
        },
        {
          id: "age_24_985_acad",
          age: 24,
          stageName: "硕士毕业秋招 · 24岁",
          title: "硕士顺利毕业答辩与秋招求职丰收",
          scene: "二十四岁这一年，你以全优成绩通过硕士学位论文答辩，顺利拿到名校工学硕士学位。手握顶刊论文与名校硕士双重王牌，你在秋招舞台上迎来了真正的收获时节：",
          type: "choice",
          choices: [
            {
              text: "硕士毕业签约头部知名科技企业核心研发Offer（年薪30W~38W，核心研发工位）",
              detail: "凭借985硕士顶尖履历，拿下年薪35W左右的核心研发岗位，在科技园区有了专属工位与稳定社保。",
              reaction: "入职即成为算法与核心业务攻坚骨干，存折上的存款稳步突破十五万元大关。",
              delta: { savings: 45000, cognition: 20, inferiority: -20 },
              addTags: ["名校硕士就业", "稳健入局"]
            },
            {
              text: "通过省直机关高素质人才引进考核，免笔试直接定级为省直部门二级主任科员",
              detail: "以名校高学历人才身份进入体制高起点，在省城核心机关负责政策规划与业务协调。",
              reaction: "父母在老家县城倍感光彩，你在二十四岁就拥有了稳健崇高的社会身份与体面生活。",
              delta: { kinshipGuilt: 25, social: 25, savings: 15000, happiness: 20 },
              addTags: ["二级主任科员", "高起点引才"]
            },
            {
              text: "凭借一作顶刊论文申请到海外名校全额奖学金博士(PhD)录取函，开启跨洋深造",
              detail: "追求纯粹真理与全球视野，彻底走出单一应试内卷，走向世界学术殿堂。",
              reaction: "收到免学费加全额生活费资助录取函，父母虽有不舍，但为你的出息骄傲落泪。",
              delta: { rebellion: 35, cognition: 25, savings: 10000 },
              addTags: ["跨洋读博", "全球学术"]
            }
          ]
        },
        {
          id: "age_25_985_acad",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "硕士高起点研发与走向成熟",
          scene: "硕士毕业走向社会的第二个年头，二十五岁的你凭借更高阶的理论视野，在团队里承担最复杂的算法重构或重要决策，存折存款积攒到了二十五万元。",
          type: "choice",
          choices: [
            {
              text: "主导大厂前沿模型攻坚落地，年终考核拿到A等卓越绩效，年薪突破35W",
              detail: "用理论深度攻克业务长期痛点，受到高管重视，手握二十五万扎实防守资金。",
              reaction: "你在行业内积累了不可动摇的核心竞争力，面对周期风浪神清气爽。",
              delta: { savings: 60000, cognition: 20, resilience: 15 },
              addTags: ["算法核心", "卓越绩效"]
            },
            {
              text: "全面备战海外技术工签与海外岗位投递，准备将才智带向更广阔的全球舞台",
              detail: "不甘心在单一评价体系里疲于奔命，拿着硕士成绩单与顶刊论文锁定海外高薪工签。",
              reaction: "海外科技企业发出正式雇佣意向，你的国际化道路清晰平整。",
              delta: { rebellion: 30, cognition: 20, savings: -10000 },
              addTags: ["拿到工签意向", "踏出第一步"]
            }
          ]
        },
        {
          id: "age_26_985_acad",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "三十万独立积蓄的从容 vs 迈出远行的临行准备",
          scene: "二十六岁这一年，存折里的数字终于摸到了三十万元大关。看着身边同事被高杠杆房贷套牢而不敢请假的模样，你庆幸自己保持了极佳的财务流动性与选择权。",
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
        },
        {
          id: "age_27_985_acad",
          age: 27,
          stageName: "二十七岁 · 人生关隘",
          title: "二十七岁人生评估与终极命运抉择",
          scene: "二十七岁这一年，你在异国机场候机厅或省城出租屋阳台上俯瞰着万家灯火。名校本硕长跑与毕业积累，让你在这一年拥有了为自己人生掌舵的全部底气与从容。",
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
      ];
    }

    // 1-B: 选调生体制路线
    if (choiceText.includes("选调")) {
      return [
        {
          id: "age_22_985_civil",
          age: 22,
          stageName: "选调基层锻炼 · 22岁",
          title: "选调生扎根基层一线与泥土气洗礼",
          scene: "作为省委定向选调生，你按照规定奔赴乡镇基层驻村两年。穿着朴素夹克走村入户整理乡村振兴台账，褪去名校学生的清高，踏踏实实扑下身子干实事。",
          type: "choice",
          choices: [
            {
              text: "走村入户调解矛盾、整理台账，讲当地方言，经受基层的真切洗礼",
              detail: "学会了和老百姓打成一片，递烟倒水拉家常，获得了乡亲与老书记交口称赞。",
              reaction: "乡镇老书记拍着你的肩膀夸赞‘名校娃娃能扑下身子干实事’，群众口碑极好。",
              delta: { social: 20, resilience: 20, kinshipGuilt: 10, savings: 10000 },
              addTags: ["贴近基层", "接地气"]
            },
            {
              text: "协助镇党委起草特色农副产业扶持方案，将名校调查研究功底转化为扎实决策参考",
              detail: "数据详实、论证严密，方案被县委主要领导批示推广，展现出过硬政策文字功底。",
              reaction: "县委组织部领导找你谈话表扬，你在同批选调生中脱颖而出。",
              delta: { cognition: 20, social: 15, savings: 10000 },
              addTags: ["政策笔杆", "年轻骨干"]
            }
          ]
        },
        {
          id: "age_23_985_civil",
          age: 23,
          stageName: "选调期满调回 · 23岁",
          title: "基层锻炼期满合格与调回机关业务科室",
          scene: "两年基层锻炼期满考核为优秀，你正式调回市直/县直核心机关科室，承担主要综合文字与公文材料起草，成为科长手下最得力的勤快笔杆子。",
          type: "choice",
          choices: [
            {
              text: "作风沉稳严谨，公文写作条理分明，承担主要综合大材料起草并列席协调会",
              detail: "吃得下苦、耐得住性子，深水分管领导与局长器重，成为机关里公认的年轻排头兵。",
              reaction: "领导经常在大会上肯定你的敬业作风，存折上的公积金与工资结余稳健上升。",
              delta: { social: 20, cognition: 15, kinshipGuilt: 15, savings: 15000 },
              addTags: ["机关骨干", "作风扎实"]
            },
            {
              text: "牵头优化局内行政审批流转节点，推动便民服务数字化减证便民，受群众好评",
              detail: "不搞形式主义，用数字化手段解决企业与群众办事痛点，实绩硬核。",
              reaction: "项目获评市级微创新优秀案例，你在体制内部积累了广泛的好口碑。",
              delta: { social: 25, resilience: 15, savings: 12000 },
              addTags: ["求真务实", "群众口碑"]
            }
          ]
        },
        {
          id: "age_24_985_civil",
          age: 24,
          stageName: "机关转正定级 · 24岁",
          title: "机关正式定级一级科员与安稳生活",
          scene: "二十四岁这一年，你在机关正式转正定级为一级科员。月工资到手六七千加上足额公积金，食堂早中餐两块钱，工作有条不紊。父母在老家县城逢人便夸你工作安稳体面。",
          type: "choice",
          choices: [
            {
              text: "扎实做好科室业务经办，熟悉各处室流程，下班后拥有完全属于自己的规律闲暇",
              detail: "作息规律，食堂饭菜可口，没有私企的随时下岗焦虑，过上了踏实稳重的安详生活。",
              reaction: "父母在老家格外安心，周末你在公园散步打羽毛球，身心康宁舒畅。",
              delta: { kinshipGuilt: 20, happiness: 20, savings: 18000, health: 15 },
              addTags: ["安稳经办", "规律作息"]
            },
            {
              text: "利用业余时间备战全省公开遴选或自学法律外语，持续拓宽自己的综合知识视野",
              detail: "居安思危，保持学习习惯，不让自己在重复性事务中钝化了头脑。",
              reaction: "多门专业技能考试高分通过，你在体制内有了更大的转圜舞台与晋升储备。",
              delta: { cognition: 25, rebellion: 15, savings: 5000 },
              addTags: ["持续充电", "长远视野"]
            }
          ]
        },
        {
          id: "age_25_985_civil",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "提任科室业务骨干与现世安稳",
          scene: "二十五岁这年，你年度考核获评优秀，成为了科室不可或缺的副科级业务中坚。在老家省城看着身边生活，开始认真规划下一个五年。",
          type: "choice",
          choices: [
            {
              text: "机关科室年度考核获评优秀，在省城按揭看中一套通勤便利小户型，安顿双亲就医",
              detail: "作风沉稳老练，在体制圈层积累了极好的人缘，成为家族在省城引以为傲的依靠。",
              reaction: "小家庭安顿稳固，父母安享晚年，你在熟人社会拥有了人人艳羡的安详生活。",
              delta: { kinshipGuilt: 20, social: 25, savings: 25000 },
              addTags: ["单位中坚", "现世安稳"]
            },
            {
              text: "深思体制内规则，业余悄悄了解涉外机构、国际组织或海外发展政策储备后路",
              detail: "不愿被单一评价完全框定，趁着年轻多看世界，为人生留下多元可能。",
              reaction: "语言与涉外业务能力显著提升，你在体制内外都保留了清醒的自主选择权。",
              delta: { rebellion: 30, cognition: 20, savings: -5000 },
              addTags: ["清醒自持", "谋求后路"]
            }
          ]
        },
        {
          id: "age_26_985_civil",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "机关人情练达的从容 vs 跨洋远行的思考",
          scene: "二十六岁这一年，你在单位里深得上下认可。看着体制内按部就班的漫长晋升台阶，你拥有了极大的定力与选择自主权。",
          type: "choice",
          choices: [
            {
              text: "在体制内踏实做人做事，坚决不盲目借贷消费，保持手头充足的储蓄与良好口碑",
              detail: "行事稳健端方，不贪不争，在熟人网络中建立起了极其受人尊重的可靠品格。",
              reaction: "领导对你委以重任，群众信赖你，你在本地社会建立起了最坚固的基石。",
              delta: { social: 25, resilience: 20, savings: 30000 },
              addTags: ["稳健端方", "口碑载道"]
            },
            {
              text: "正式办理公派研修或辞职远行手续，拿着扎实履历踏上跨洋开拓的新道路",
              detail: "趁年轻去世界的旷野闯一闯，彻底走出舒适圈，为自己探索另一种活法。",
              reaction: "父母理解了你的壮志，你带着满满的祝福与积蓄迈出国门，天地辽阔。",
              delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -15000 },
              addTags: ["整装待发", "告别故土"]
            }
          ]
        },
        {
          id: "age_27_985_civil",
          age: 27,
          stageName: "二十七岁 · 人生关隘",
          title: "二十七岁人生评估与终极命运抉择",
          scene: "二十七岁这一年，名校十二年长跑与体制内五年的沉稳历练，让你在这一年拥有了为自己人生掌舵的全部底气与从容。",
          type: "choice",
          choices: [
            {
              text: "坚定选择出海通道：开启全球移居与简单从容生活新篇章",
              detail: "带着名校底蕴与扎实的综合能力走向世界，完完整整为自己活一次。",
              reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，活出全新的生命维度。",
              delta: { rebellion: 40, happiness: 35, resilience: 25 },
              addTags: ["奔赴异邦", "广阔天地"]
            },
            {
              text: "扎根故土成为单位与家庭中坚，在熟悉的规则与亲情中安顿一生",
              detail: "选择陪伴父母在侧，在熟人社会与本土平台中守住现世安稳与人间烟火。",
              reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
              delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
              addTags: ["深耕故土", "挑起大梁"]
            }
          ]
        }
      ];
    }

    // 1-C: 大厂正规研发工程师路线（默认本科就业）
    return [
      {
        id: "age_22_985_tech",
        age: 22,
        stageName: "步入职场第一年 · 22岁",
        title: "大厂初级研发转正与合租日常",
        scene: "大四毕业后，你来到城市核心科技园区，与同事合租了一间朝南单间。每天早高峰挤着拥挤的地铁，在工位上熟悉代码规范与业务需求，踏踏实实开启了白领生涯。",
        type: "choice",
        choices: [
          {
            text: "在大厂做初级研发：熟悉业务代码，日常接需求写单测，半年试用期顺利转正",
            detail: "虽有偶尔的版本上线通宵值班，但大平台的规范流程让你受益匪浅，做事实事求是。",
            reaction: "顺利通过半年试用期转正，定级为正式中级工程师，月薪小幅上浮，生活安定。",
            delta: { cognition: 20, resilience: 15, savings: 20000 },
            addTags: ["大厂转正", "扎实业务"]
          },
          {
            text: "主动分担团队紧急缺陷修复，自学微服务底层架构，展现出过硬解决问题能力",
            detail: "不挑肥拣瘦，脏活累活抢着干，用踏实负责的技术作风赢得了组长与老员工高度好评。",
            reaction: "年底团队绩效评定获得A等，拿到了满额年终奖，存折有了第一笔丰厚积蓄。",
            delta: { cognition: 25, resilience: 20, savings: 25000 },
            addTags: ["靠谱交付", "业务骨干"]
          }
        ]
      },
      {
        id: "age_23_985_tech",
        age: 23,
        stageName: "职场第2年 · 23岁",
        title: "独立负责核心业务模块与业务熟手",
        scene: "工作第二年，你不再是那个手忙脚乱的应届生。组里把一个完整的业务子系统交由你独立重构和迭代，你开始成为同事眼中的靠谱交付者。",
        type: "choice",
        choices: [
          {
            text: "独立承担核心模块重构优化，按期交付，年终考核拿到良好绩效(B+/A)，存款破十万",
            detail: "业务熟练，为人靠谱，在组里赢得了‘靠谱交付者’的好口碑，月薪达到2万元左右。",
            reaction: "年终拿到三个月年终奖，存折上的存款第一次突破了六位数，感到由衷的踏实。",
            delta: { savings: 40000, cognition: 15, resilience: 15 },
            addTags: ["靠谱交付", "中级工程师"]
          },
          {
            text: "利用业余时间研究开源框架与自动化工具，给团队沉淀了实用工程规范与技术文档",
            detail: "乐于分享与赋能团队，在公司内部技术社区发表多篇高赞干货，崭露头角。",
            reaction: "技术委员会专家对你留下深刻印象，被列为年度重点骨干培养梯队。",
            delta: { cognition: 25, social: 15, savings: 35000 },
            addTags: ["极客分享", "梯队骨干"]
          }
        ]
      },
      {
        id: "age_24_985_tech",
        age: 24,
        stageName: "职场第3年 · 24岁",
        title: "存折上的十五万积蓄与中级工程师晋升答辩",
        scene: "工作第三年，存折里的数字稳稳跨过了十五万元大关。在大厂迎来职级晋升答辩（初级P5提中级P6）。然而伴随而来的，是日复一日的代码与会议带来的疲惫，以及父母在电话里关切的成家买房话题。",
        type: "choice",
        choices: [
          {
            text: "顺利通过中级工程师职级答辩(P5提P6)，年薪稳步调至30W左右，存折破十五万",
            detail: "凭借两年来稳定靠谱的交付战功，顺利晋升中级，成为组里独当一面的核心骨干。",
            reaction: "底薪与公积金上调，存折上的存款稳稳迈过十五万元大关，在城市里扎下了结实的根基。",
            delta: { savings: 50000, cognition: 20, resilience: 15 },
            addTags: ["职级晋升", "业务中坚"]
          },
          {
            text: "清醒察觉到行业年龄焦虑与内卷，业余自学雅思/托福，悄悄了解海外正规技术移民政策",
            detail: "不甘心一辈子在单一考核体系里疲于奔命，趁着年轻为自己悄悄留下一条后路。",
            reaction: "首战雅思拿下7.0分，你惊喜地发现自己的名校学历在海外紧缺人才列表里名列前茅。",
            delta: { rebellion: 25, cognition: 20, savings: -5000 },
            addTags: ["自学备考", "谋求后路"]
          }
        ]
      },
      {
        id: "age_25_985_tech",
        age: 25,
        stageName: "走向成熟 · 25岁",
        title: "资深工程师带新人与手握二十五万铠甲",
        scene: "工作第四个年头，二十五岁的你成为了组里经验丰富、能带实习生的资深研发骨干(Senior)。存折上的流动资金积攒到了二十五万元，拥有了抵御失业的铠甲。",
        type: "choice",
        choices: [
          {
            text: "在职场升为资深技术骨干(Senior)，带两名应届生，年薪稳步调至35W左右",
            detail: "技术全面，能够跨部门协调复杂接口，但深刻体会到技术岗向上走的天花板。",
            reaction: "年终绩效平稳，存折上的活期存款积攒到了二十五万元，生活底气充沛充足。",
            delta: { savings: 55000, cognition: 15, resilience: 15 },
            addTags: ["资深骨干", "积攒底牌"]
          },
          {
            text: "正式准备好海外技术工签申请全套文书，锁定海外求职与签证通道",
            detail: "经过两年的调研与准备，拿着雅思成绩与名校成绩单，坦然开启向外看的步伐。",
            reaction: "海外雇主面试反馈积极，你收到了第一封正式海外工作签证资格确认函。",
            delta: { rebellion: 30, cognition: 20, savings: -15000 },
            addTags: ["拿到工签意向", "踏出第一步"]
          }
        ]
      },
      {
        id: "age_26_985_tech",
        age: 26,
        stageName: "人生十字路口 · 26岁",
        title: "三十万独立积蓄的从容 vs 迈出远行的临行准备",
        scene: "二十六岁这一年，存折里的数字终于摸到了三十万元大关。看着身边同事被高杠杆房贷套牢而不敢请假的模样，你庆幸自己保持了极佳的财务流动性与选择权。",
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
      },
      {
        id: "age_27_985_tech",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene: "二十七岁这一年，名校十二年长跑与大厂五年扎实实战，让你在这一年拥有了为自己人生掌舵的全部底气与从容。",
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
    ];
  }

  // --------------------------------------------------------------------------
  // 2. 双非综合本科分流
  // --------------------------------------------------------------------------
  if (degreeTrack === "double_non") {
    // 2-A: 双非考研读研路线
    if (choiceText.includes("考研") || choiceText.includes("硕士") || choiceText.includes("读研")) {
      return [
        {
          id: "age_22_dn_postgrad",
          age: 22,
          stageName: "研一阶段 · 22岁",
          title: "研一做课题打磨硬实力与自学技能",
          scene: "考取省属重点大学研究生后，你珍惜这宝贵的三年时光。每天扎根自习室与实验室，自学编程与外语工具，给自己增加硬实力筹码。",
          type: "choice",
          choices: [
            {
              text: "专心做课题，协助导师完成省级科研项目申报，打磨扎实的专业基本功",
              detail: "耐得住寂寞，在专业核心期刊发表了第一篇学术论文，科研能力得到极大提高。",
              reaction: "导师对你的勤勉赞不绝口，主动为你推荐了优质企业的实习与研究通道。",
              delta: { cognition: 20, academicCapital: 20, savings: 5000 },
              addTags: ["读研打磨", "厚积薄发"]
            },
            {
              text: "考取行业高级专业资格证书与外语高阶认证，为将来跳过学历门槛做准备",
              detail: "不沉迷于闲暇，把业余时间全部转化为职场不可替代的硬通关证书。",
              reaction: "顺利拿下行业含金量最高的中高级职业资格证，找工作底气大增。",
              delta: { cognition: 20, resilience: 15, savings: 3000 },
              addTags: ["硬核证书", "全面提升"]
            }
          ]
        },
        {
          id: "age_23_dn_postgrad",
          age: 23,
          stageName: "研二科研 · 23岁",
          title: "研二发表论文与提前锁定企业实习",
          scene: "研二阶段，你的硕士论文顺利开题。凭借扎实的功底，你进入二线省会知名企业研发中心开展专业实习。",
          type: "choice",
          choices: [
            {
              text: "在企业研发实习中表现抢眼，独立攻克业务技术瓶颈，提前拿到转正签约函",
              detail: "带教主管非常欣赏你的动手能力和踏实作风，开出了具有竞争力的校招年薪。",
              reaction: "在研二就提前锁定了毕业去向，消除了同龄人普遍的就业焦虑。",
              delta: { savings: 15000, cognition: 15, resilience: 15 },
              addTags: ["提前锁定", "实干过硬"]
            },
            {
              text: "在省级以上核心期刊发表两篇专业学术论文，评获优秀研究生二等奖学金",
              detail: "补齐了第一学历的短板，用硕士阶段过硬的学术成果证明了自己的实力。",
              reaction: "父母在老家扬眉吐气，你体会到了知识改写命运的踏实成就感。",
              delta: { academicCapital: 25, inferiority: -20, savings: 10000 },
              addTags: ["科研嘉奖", "打破自卑"]
            }
          ]
        },
        {
          id: "age_24_dn_postgrad",
          age: 24,
          stageName: "硕士毕业 · 24岁",
          title: "硕士顺利毕业与签约二线优质企业",
          scene: "二十四岁这一年，你顺利通过硕士学位论文答辩，三年苦读圆满修成正果。凭借硕士学历加成，在求职舞台上稳健签约：",
          type: "choice",
          choices: [
            {
              text: "硕士毕业签约省会高新技术民企正式研发主管岗（年薪18W~24W，五险一金）",
              detail: "成功摆脱了本科阶段的普通起点，在二线城市有了体面安稳的专业岗位与稳定社保。",
              reaction: "正式入职，存折上的存款稳步积累，在城市站稳了第一只脚。",
              delta: { savings: 30000, cognition: 20, inferiority: -15 },
              addTags: ["硕士签约", "立足省会"]
            },
            {
              text: "考取省会公办大专或高职院校辅导员/实训教职，享受事业单位编制与寒暑假",
              detail: "生活规律体面，有寒暑假陪伴家人，工作受人尊敬，父母格外心安。",
              reaction: "顺利办理入编手续，父母逢人便夸你工作安稳体面，周末时间完全属于自己。",
              delta: { kinshipGuilt: 20, happiness: 20, social: 15, savings: 12000 },
              addTags: ["高校教职", "现世安稳"]
            }
          ]
        },
        {
          id: "age_25_dn_postgrad",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "硕士业务主管、十五万防守金与房贷考量",
          scene: "工作走向平稳，二十五岁的你成为了部门不可或缺的骨干。存折储蓄突破了十五万元。",
          type: "choice",
          choices: [
            {
              text: "稳健防守，手握十五万现金不盲目高位买房，专心打理职业壁垒",
              detail: "清醒理性，坚守现金流安全垫，给自己保留充足的转圜与选择自由。",
              reaction: "面对大环境波动你毫无慌乱，存折上的资金是你最可靠的底牌。",
              delta: { savings: 35000, resilience: 20, rebellion: 15 },
              addTags: ["稳扎稳打", "理智清醒"]
            },
            {
              text: "业余自学海外技术工签评估政策与外语，利用硕士学历优势探索出海路径",
              detail: "发现自己的硕士学历在海外紧缺职业清单上名列前茅，暗暗下定决心。",
              reaction: "语言成绩一次性通过，海外发展路径变得清晰可见。",
              delta: { rebellion: 25, cognition: 20, savings: -8000 },
              addTags: ["外语备战", "向外探索"]
            }
          ]
        },
        {
          id: "age_26_dn_postgrad",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "二十万积蓄的安全感与出海通道准备",
          scene: "二十六岁这一年，存折里的数字摸到了二十万元。你拥有了随时做出重大人生选择的底气。",
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
              detail: "勇敢斩断内卷循环，跨越大洋去过清爽简单的新生活。",
              reaction: "拿到正式工签，带着多年积蓄打包行囊，登机远行。",
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
          scene: "二十七岁这一年，双非起跑、考研突围与职场磨砺，让你在这一年拥有了为自己人生掌舵的全部底气。",
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

    // 2-B: 基层事业单位路线
    if (choiceText.includes("编制") || choiceText.includes("事业单位")) {
      return [
        {
          id: "age_22_dn_inst",
          age: 22,
          stageName: "步入体制第一年 · 22岁",
          title: "事业单位科室报到与日常业务",
          scene: "毕业后你按期去老家事业单位报到。在科室负责日常业务经办，熟悉红头文件运转流程，生活规律作息良好。",
          type: "choice",
          choices: [
            {
              text: "按部就班做好科室日常经办业务，食堂吃早中饭，每月存下一半工资，生活踏实安详",
              detail: "作风勤勉稳妥，不急功近利，在单位赢得同事和老领导的一致好感。",
              reaction: "父母在老家倍感宽慰，逢年过节亲朋好友夸赞你工作安稳体面。",
              delta: { social: 15, kinshipGuilt: 15, savings: 10000 },
              addTags: ["体制安顿", "规律作息"]
            },
            {
              text: "主动承担单位信息化系统运维与政务服务窗口数字化优化，展现青年人业务锐气",
              detail: "用自己的专业计算机知识解决窗口排队痛点，获得单位表彰。",
              reaction: "单位一把手在年终总结会上公开表扬你，年底考核评定为优秀等次。",
              delta: { cognition: 15, social: 20, savings: 12000 },
              addTags: ["业务骨干", "锐意进取"]
            }
          ]
        },
        {
          id: "age_23_dn_inst",
          age: 23,
          stageName: "体制第2年 · 23岁",
          title: "业务轻车熟路与考取中级专业职称",
          scene: "工作第二年，各项业务轻车熟路。你利用下班后的业余时间，认真备考中级专业技术职称或注册资质。",
          type: "choice",
          choices: [
            {
              text: "顺利考取中级专业技术职称资格，每月获得单位职称津贴，心里格外踏实",
              detail: "不混日子，在体制内也把专业底牌做硬，存折存款稳步迈上五万元台阶。",
              reaction: "同事纷纷向你请教备考经验，你在单位业务骨干地位进一步坐实。",
              delta: { cognition: 15, resilience: 15, savings: 12000 },
              addTags: ["中级职称", "踏实底牌"]
            },
            {
              text: "参与全县综合性文明创建或防汛救灾工作，在急难险重任务中展现担当",
              detail: "扑下身子在一线扛重担，展现出年轻干部的责任感，受群众由衷称赞。",
              reaction: "获得县直机关优秀团员/先进个人表彰，组织对你重点考察培养。",
              delta: { social: 25, resilience: 20, kinshipGuilt: 15 },
              addTags: ["先锋担当", "立足本地"]
            }
          ]
        },
        {
          id: "age_24_dn_inst",
          age: 24,
          stageName: "体制第3年 · 24岁",
          title: "单位骨干经办、作息规律与父母安心",
          scene: "工作第三年，存折里的数字终于摸到了八万元大关。体制内作息规律，周末有充足的闲暇，父母开始在电话里提起相亲安家。",
          type: "choice",
          choices: [
            {
              text: "相亲结识真诚体面的同行伴侣，相濡以沫，共同规划在本地安家立业",
              detail: "回归市井烟火生活，两个人分担日常开销，在熟人社会享受现世安稳。",
              reaction: "家里满是热腾腾的饭菜香，体会到平凡日子里最真实的幸福感。",
              delta: { kinshipGuilt: 15, happiness: 20, savings: -5000 },
              addTags: ["成家立业", "市井烟火"]
            },
            {
              text: "坚决不盲目过早背负房贷，把八万元作为个人防守资金，保持清醒自足",
              detail: "理智自立，手里握有充足流动现金，不让虚荣与攀比绑架生活节奏。",
              reaction: "你活得坦荡从容，下班后养花跑步，身心健康舒展。",
              delta: { rebellion: 20, resilience: 15, savings: 15000 },
              addTags: ["理智自立", "从容清醒"]
            }
          ]
        },
        {
          id: "age_25_dn_inst",
          age: 25,
          stageName: "走向成熟 · 25岁",
          title: "体制内体面生活与本地安家置业",
          scene: "二十五岁这年，你在本地拥有了极为稳固的社会地位与良好人缘。存折储蓄跨过十万元大关。",
          type: "choice",
          choices: [
            {
              text: "在老家市区公积金按揭购置一套宜居品质住房，安顿好父母晚年就医保障",
              detail: "公积金足额对冲月供，毫无私企裁员焦虑，成为亲友圈里人人艳羡的安定楷模。",
              reaction: "父母在老家格外安心踏实，家族长辈赞叹你有孝心、有出息。",
              delta: { social: 25, kinshipGuilt: 20, savings: -30000, happiness: 20 },
              addTags: ["安居置业", "现世安稳"]
            },
            {
              text: "利用业余时间系统自学外语与涉外文书，为人生保留一份随时向外看的旷野视野",
              detail: "虽身处体制之内，但内心始终保持对辽阔世界的好奇，不被条条框框封闭思维。",
              reaction: "外语水平突飞猛进，你在平静的体制生活中保有一颗独立探索的心灵。",
              delta: { rebellion: 25, cognition: 20, savings: -3000 },
              addTags: ["心怀旷野", "清醒独立"]
            }
          ]
        },
        {
          id: "age_26_dn_inst",
          age: 26,
          stageName: "人生十字路口 · 26岁",
          title: "市井安乐与人生从容",
          scene: "二十六岁这一年，手握充足积蓄与稳定编制，你拥有了极佳的人生从容度。",
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
              detail: "趁年轻走出舒适区，带着积蓄去世界上体验全新的人生节奏。",
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
          scene: "二十七岁这一年，你在故土的安详与远方的呼唤之间，迎来了命运的终极话语权。",
          type: "choice",
          choices: [
            {
              text: "坚定选择出海通道：开启全球移居与从容生活新篇章",
              detail: "摆脱内卷，完完整整为自己活一次。",
              reaction: "辽阔的世界向你敞开怀抱，开启了截然不同的精彩征途。",
              delta: { rebellion: 40, happiness: 35, resilience: 25 },
              addTags: ["奔赴异邦", "广阔天地"]
            },
            {
              text: "扎根故土成为家庭与单位中坚，在熟悉的规则与亲情中安顿一生",
              detail: "守住现世安稳与人间烟火，问心无愧度过一生。",
              reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
              delta: { kinshipGuilt: 30, social: 25, savings: 25000 },
              addTags: ["深耕故土", "挑起大梁"]
            }
          ]
        }
      ];
    }

    // 2-C: 默认成长民企实干路线
    return [
      {
        id: "age_22_dn_corp",
        age: 22,
        stageName: "步入职场第一年 · 22岁",
        title: "二线民企研发转正与合租柴米油盐",
        scene: "毕业后你在二线省会成长型民企就职，租了一个朝北单间。每天早起挤地铁，在柴米油盐中认真打拼。",
        type: "choice",
        choices: [
          {
            text: "在民企认真接需求写业务，肯吃苦能加班，提前两个月通过试用期转正",
            detail: "用踏实靠谱的态度赢得同事信任，把手头每一个杂活都落到实处，月薪稳步调整。",
            reaction: "主管在月度例会上点名表扬你‘学习能力强，交代的事能兜底’，工作彻底稳定。",
            delta: { resilience: 20, savings: 15000, cognition: 10 },
            addTags: ["民企骨干", "踏实肯干"]
          },
          {
            text: "下班后自学主流全栈技术与云原生架构，把公司内部项目重构得流畅高效",
            detail: "用技术实力打破唯学历论，展现出甚至超越名校毕业生的实操交付速度。",
            reaction: "被直接提拔为模块核心骨干，月薪直接上调两千元，心里踏实。",
            delta: { cognition: 20, savings: 20000, inferiority: -10 },
            addTags: ["技术突破", "实干致胜"]
          }
        ]
      },
      {
        id: "age_23_dn_corp",
        age: 23,
        stageName: "职场第2年 · 23岁",
        title: "升任项目小组长与业务熟练",
        scene: "工作第二年，你在民企不再是那个战战兢兢的应届菜鸟。凭借任劳任怨与技术稳定被任命为项目小组长，月薪调至1.1W。",
        type: "choice",
        choices: [
          {
            text: "带两名新来的实习生，统筹业务交付进度，在民企树立扎实的好口碑",
            detail: "虽然责任更重了，但每月到手的薪资切实增加，存折里悄悄攒下了五万块钱。",
            reaction: "业务顺利上线，公司年底发放专项项目奖金，你在省会站稳了脚跟。",
            delta: { social: 15, cognition: 15, savings: 25000 },
            addTags: ["升任组长", "踏实积累"]
          },
          {
            text: "考取行业中级专业技术资格或注册执业证书，为今后跳槽增加硬底牌",
            detail: "不沉迷于短视频消遣，下班后关在房间刷题学习，持续提升自我价值。",
            reaction: "顺利通过执业考试，公司每月额外给你发放500元职称补贴，心里踏实。",
            delta: { cognition: 15, resilience: 15, savings: 15000 },
            addTags: ["专业证书", "持续提升"]
          }
        ]
      },
      {
        id: "age_24_dn_corp",
        age: 24,
        stageName: "职场第3年 · 24岁",
        title: "存折上的第一个八万元与催婚电话",
        scene: "工作第三年，存折里的数字终于摸到了八万元大关。然而父母开始在电话里频繁提起同乡发小谁谁又订婚了、同学在省城付了首付，催促你抓紧相亲安家。",
        type: "choice",
        choices: [
          {
            text: "顶住催促压力，把八万元作为自己的独立防守金，坚决不盲目背负沉重房贷",
            detail: "清醒理性，坚信在经济波动面前现金流才是普通人唯一的盔甲，保持自由转身权。",
            reaction: "虽然父母偶尔在电话里叹气，但你牢牢守住了属于自己的财务安全防线。",
            delta: { rebellion: 20, resilience: 15, savings: 25000 },
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
      },
      {
        id: "age_25_dn_corp",
        age: 25,
        stageName: "走向成熟 · 25岁",
        title: "民企业务骨干、十五万防守金与房贷考量",
        scene: "走向社会的第四年，你在企业成为了老资格核心业务骨干，月薪稳步调至1.3W。存折上的独立积蓄摸到了十五万元大关。",
        type: "choice",
        choices: [
          {
            text: "守牢本职业务，利用业余时间接独立外包小单，把存折积蓄推高至二十万元",
            detail: "勤奋刻苦，靠自己的双手为自己搭建起坚实的安全网，不向现实轻易低头。",
            reaction: "存款步步高升，面对任何职场动荡都拥有极高的底气与转圜从容。",
            delta: { savings: 35000, resilience: 20, inferiority: -15 },
            addTags: ["实干致富", "底气充沛"]
          },
          {
            text: "业余时间自学雅思/托福，了解海外技术工签评估通道，为出海做长效准备",
            detail: "不愿在三十五岁魔咒前坐以待毙，趁着年轻多学一门语言，给自己留一条退路。",
            reaction: "英语水平显著提升，你惊喜地发现自己的实战经验在海外非常吃香。",
            delta: { rebellion: 25, cognition: 20, savings: -5000 },
            addTags: ["自学备战", "谋求后路"]
          }
        ]
      },
      {
        id: "age_26_dn_corp",
        age: 26,
        stageName: "人生十字路口 · 26岁",
        title: "二十万积蓄的安全感与出海通道准备",
        scene: "二十六岁这一年，手握二十万元独立现金储蓄。看着身边人疲于奔命的模样，你庆幸自己拥有随时选择的自由。",
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
            detail: "勇敢斩断内卷循环，跨越大洋去过清爽简单的新生活。",
            reaction: "拿到正式工签，带着多年积蓄打包行囊，登机远行。",
            delta: { rebellion: 35, happiness: 25, resilience: 20, savings: -15000 },
            addTags: ["整装待发", "告别故土"]
          }
        ]
      },
      {
        id: "age_27_dn_corp",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene: "二十七岁这一年，普本起点与五年商海摸爬滚打，让你在这一年拥有了为自己人生掌舵的全部底气。",
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
  // 3. 专科/职教分流（蓝领技工 / 专升本 / 实体掌柜）
  // --------------------------------------------------------------------------
  // 3-A: 专升本脱产深造路线
  if (choiceText.includes("专升本")) {
    return [
      {
        id: "age_22_jc_upgrade",
        age: 22,
        stageName: "专升本大三 · 22岁",
        title: "专升本全日制脱产本科攻读与补齐学分",
        scene: "通过全日制专升本选拔后，你进入普通本科院校的大三年级插班就读。你珍惜这来之不易的本科求学机会，每天泡在图书馆与自习室补齐课程。",
        type: "choice",
        choices: [
          {
            text: "苦读专业核心课，拿下全系前10%优秀成绩与英语四六级证书",
            detail: "用加倍的自律弥补起点不足，把本科两年的每一门功课都学到扎实过硬。",
            reaction: "期末综合评定斩获二等奖学金，成功打破了专科时期的自卑阴影。",
            delta: { academicCapital: 20, cognition: 20, inferiority: -20 },
            addTags: ["专升本苦读", "重塑自信"]
          },
          {
            text: "将大专学到的过硬实操手艺与本科的理论设计融会贯通，指导同学实训实验",
            detail: "动手能力远超普通本科生，受到实训指导老师大力赞扬，聘为实验助教。",
            reaction: "既有理论又有实操，你在本科同学中树立了独特威信，被誉为‘全能实战派’。",
            delta: { social: 20, cognition: 15, savings: 5000 },
            addTags: ["理实兼备", "实训助教"]
          }
        ]
      },
      {
        id: "age_23_jc_upgrade",
        age: 23,
        stageName: "本科毕业 · 23岁",
        title: "全日制本科顺利毕业拿到双证与双向优势",
        scene: "二十三岁这一年，你顺利通过本科毕业论文答辩，拿到了国家承认的全日制普通本科毕业证书与学士学位证书！手握全日制本科学历加过硬实操，求职底气大增：",
        type: "choice",
        choices: [
          {
            text: "签约正规高端智能制造企业担任工艺工程师（月薪8000~10000+五险一金）",
            detail: "既能看懂英文图纸又能下车间实操，成为企业最青睐的复合型工程技术骨干。",
            reaction: "正式入职高端研发制造基地，有了属于自己的工程师工号与体面待遇。",
            delta: { savings: 20000, cognition: 20, inferiority: -20 },
            addTags: ["本科工匠", "体面就业"]
          },
          {
            text: "报考老家县市中职院校正式实训教师编制，顺利通过技能测试入围",
            detail: "凭借本科学历与特种技能的双料门槛，在职业教育岗位上谋求体制安稳。",
            reaction: "体检政审顺利通过，成为公办职校正式实训教师，父母倍感骄傲。",
            delta: { kinshipGuilt: 20, social: 20, savings: 10000 },
            addTags: ["职校教师", "编制安顿"]
          }
        ]
      },
      {
        id: "age_24_jc_upgrade",
        age: 24,
        stageName: "职场成熟 · 24岁",
        title: "存折突破十万元与双料优势确立",
        scene: "工作第二年，存折里的数字终于摸到了十万元大关。本科学历加上一身实操硬功夫，让你在行业里站稳了脚跟。",
        type: "choice",
        choices: [
          {
            text: "主导车间精密数控加工流程工艺改造，为企业节省数十万元成本，晋升主管",
            detail: "凭借过硬技术为公司立下大功，月薪调至1.2W，成为技术部中流砥柱。",
            reaction: "厂长当众颁发技术革新奖，存折稳健增长，拥有了买车买房的底气。",
            delta: { savings: 35000, cognition: 20, resilience: 15 },
            addTags: ["工艺革新", "技术主管"]
          },
          {
            text: "业余学习海外技术移民英语，利用本科学历+蓝领技能的双优势申请海外工签",
            detail: "发现自己在海外紧缺职业列表上评分极高，本科学历补齐了所有移民门槛。",
            reaction: "海外雇主对你的双料背景极感兴趣，主动提供担保支持。",
            delta: { rebellion: 30, cognition: 20, savings: -8000 },
            addTags: ["双料优势", "工签在望"]
          }
        ]
      },
      {
        id: "age_25_jc_upgrade",
        age: 25,
        stageName: "走向成熟 · 25岁",
        title: "十五万积蓄的安全感与三十岁前夕的思考",
        scene: "走向社会的第三年，二十五岁的你彻底摆脱了当年的学历枷锁。存折积蓄达到十五万元。",
        type: "choice",
        choices: [
          {
            text: "在二线城市按揭购置电梯品质房，扎根立足，过上幸福安康的安定生活",
            detail: "两代人的努力终于在城市开花结果，父母搬来小住，一家人其乐融融。",
            reaction: "生活稳如泰山，你彻底逆转了人生的最初底牌。",
            delta: { social: 20, kinshipGuilt: 20, savings: -40000, happiness: 25 },
            addTags: ["安家立业", "逆转底牌"]
          },
          {
            text: "锁定海外高端技师工签，准备好全套文书与国际认证，准备登机远行",
            detail: "带着真才实学走向世界，在大洋彼岸寻求更高的时薪与更宽松的土壤。",
            reaction: "正式收到签证批复，开启跨洋大工匠传奇人生。",
            delta: { rebellion: 35, happiness: 25, savings: -15000 },
            addTags: ["整装待发", "告别故土"]
          }
        ]
      },
      {
        id: "age_26_jc_upgrade",
        age: 26,
        stageName: "人生十字路口 · 26岁",
        title: "二十万独立积蓄的从容 vs 迈出远行的临行准备",
        scene: "二十六岁这一年，手握二十万独立现金。看着一路走来的逆袭足迹，你心满意足。",
        type: "choice",
        choices: [
          {
            text: "扎根故土做技术顶梁柱，陪伴父母，守住现世安稳与人间烟火",
            detail: "有房有车有一技之长，热气腾腾过完踏实的一生。",
            reaction: "父母安康，你在熟悉的地方赢得了极高敬重。",
            delta: { kinshipGuilt: 25, happiness: 25, savings: 25000 },
            addTags: ["深耕故土", "挑起大梁"]
          },
          {
            text: "正式签署海外全职合同，订购国际机票，准备开启新生活",
            detail: "走遍天下都不怕，彻底开启异国从容篇章。",
            reaction: "背起行囊，满心笃定，走向辽阔世界。",
            delta: { rebellion: 35, happiness: 25, savings: -15000 },
            addTags: ["整装待发", "告别故土"]
          }
        ]
      },
      {
        id: "age_27_jc_upgrade",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene: "二十七岁这一年，大专起跑、专升本逆袭与五年技术深耕，让你在这一年拥有了为自己人生掌舵的全部底气。",
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

  // 3-B: 老街实体掌柜路线
  if (choiceText.includes("实体") || choiceText.includes("门面") || choiceText.includes("自立")) {
    return [
      {
        id: "age_22_jc_entrep",
        age: 22,
        stageName: "起步创业第一年 · 22岁",
        title: "盘下门面起步与早起晚归诚信经营",
        scene: "在老家汽配或加工街盘下了一间小门面，成立了自己的维修工坊。起早贪黑，靠手艺与信誉立足。",
        type: "choice",
        choices: [
          {
            text: "诚信经营，绝不换假件虚报故障，把每一单活都做实做细，积攒老顾客",
            detail: "口口相传，街坊邻里和周边小车主都认准你做事地道，第一年顺利实现盈利。",
            reaction: "年底结余两万余元，不仅还清了开业借款，还给父母包了大红包。",
            delta: { social: 20, resilience: 20, savings: 25000 },
            addTags: ["诚信掌柜", "起步立足"]
          },
          {
            text: "承接周边工厂的设备急修与夜间抢修业务，24小时随叫随到，吃常人吃不下的苦",
            detail: "凭借过硬手艺快速解决工厂停产危机，与三家企业建立了长期维保合作。",
            reaction: "虽然满手油污，但现金流水滚滚而来，当年纯利润突破五万元。",
            delta: { savings: 45000, resilience: 25, health: -5 },
            addTags: ["硬核拼搏", "实业突破"]
          }
        ]
      },
      {
        id: "age_23_jc_entrep",
        age: 23,
        stageName: "店铺稳固 · 23岁",
        title: "熟客口口相传与店铺稳定盈利",
        scene: "开店第二年，你的小店成了老街上的熟面孔。客户源源不断，生意红红火火。",
        type: "choice",
        choices: [
          {
            text: "添置成套专业数控诊断与焊接设备，扩大维修加工范围，日营业额翻番",
            detail: "紧跟市场需求，升级技术工具，成为整条街技术实力最顶尖的工坊之一。",
            reaction: "年终净利润迈过八万元大关，在老家县城赢得了广泛的好口碑。",
            delta: { savings: 50000, cognition: 15, social: 15 },
            addTags: ["设备升级", "家业稳固"]
          },
          {
            text: "招募带一名年轻小徒弟打下手，传授实操手艺，逐步向统筹管理转变",
            detail: "不再单靠个人体力，靠手艺标准与规矩做生意，效率大幅提升。",
            reaction: "铺子经营有声有色，你有了更多的时间陪伴父母与规划未来。",
            delta: { social: 25, savings: 40000, happiness: 15 },
            addTags: ["带徒传艺", "从容经营"]
          }
        ]
      },
      {
        id: "age_24_jc_entrep",
        age: 24,
        stageName: "实业有成 · 24岁",
        title: "存折结余突破十万元与老街好名声",
        scene: "二十四岁这一年，存折里的净利润稳稳跨过了十万元大关。父母逢人便夸你手艺好、能干，在熟人社会受尽敬重。",
        type: "choice",
        choices: [
          {
            text: "添置一辆实用体面的代步SUV，逢年过节开车载着父母走亲访友，热气腾腾",
            detail: "靠一身真手艺吃遍四方，赢得了最实在的体面与尊严，父母笑逐颜开。",
            reaction: "全家人其乐融融，你用真金白银赢得了邻里亲友的真心钦佩。",
            delta: { kinshipGuilt: 25, happiness: 25, savings: -30000 },
            addTags: ["光耀门楣", "热气腾腾"]
          },
          {
            text: "把十万元利润用于稳健扩张，增加零配件仓库储备，做大本地供应链渠道",
            detail: "目光长远，把实体基业一步步夯实筑牢，成为周边汽配街的实力老板。",
            reaction: "年营业额大幅突破，存折流水滚滚，抗风险能力极强。",
            delta: { savings: 60000, resilience: 20 },
            addTags: ["扩大基业", "实力老板"]
          }
        ]
      },
      {
        id: "age_25_jc_entrep",
        age: 25,
        stageName: "家业扎实 · 25岁",
        title: "在老家县城按揭电梯品质房与家业殷实",
        scene: "走向社会的第四年，二十五岁的你凭借一双勤劳的手，在老家县城付首付按揭了一套宽敞电梯房。存折流动资金充足。",
        type: "choice",
        choices: [
          {
            text: "全家搬入窗明几净的电梯新居，老人就医上下楼方便，小日子过得滋润踏实",
            detail: "靠一身真力气让父母安享晚年，彻底打碎了外界看不起中专大专的偏见。",
            reaction: "父母逢人便夸，逢年过节门庭若市，在老家赢得了崇高名望。",
            delta: { kinshipGuilt: 30, happiness: 30, savings: -50000 },
            addTags: ["安居乐业", "扬眉吐气"]
          },
          {
            text: "了解海外技术工匠移居政策，考虑未来将店铺交由徒弟打理，自己走向世界",
            detail: "身怀过硬绝活，知道技术工人在海外时薪极高，为人生保留另一条开阔赛道。",
            reaction: "多方咨询了解，海外技术移民通道为你敞开大门。",
            delta: { rebellion: 30, cognition: 20, savings: -5000 },
            addTags: ["技高胆大", "向往海外"]
          }
        ]
      },
      {
        id: "age_26_jc_entrep",
        age: 26,
        stageName: "人生十字路口 · 26岁",
        title: "二十万独立积蓄的从容 vs 迈出远行的临行准备",
        scene: "二十六岁这一年，手握二十万独立现金。实体门面成了老街的金字招牌，你拥有了极高的人生掌控权。",
        type: "choice",
        choices: [
          {
            text: "扎根故土做老街金字招牌，陪伴父母，守住现世安稳与人间烟火",
            detail: "有房有车有一技之长，热气腾腾过完踏实的一生。",
            reaction: "父母安康，你在熟悉的地方赢得了极高敬重。",
            delta: { kinshipGuilt: 25, happiness: 25, savings: 35000 },
            addTags: ["深耕故土", "挑起大梁"]
          },
          {
            text: "正式签署海外全职技术工匠合同，订购国际机票，准备开启新生活",
            detail: "一技在手走天下，彻底开启异国从容高薪篇章。",
            reaction: "背起行囊，满心笃定，走向辽阔世界。",
            delta: { rebellion: 35, happiness: 25, savings: -15000 },
            addTags: ["整装待发", "告别故土"]
          }
        ]
      },
      {
        id: "age_27_jc_entrep",
        age: 27,
        stageName: "二十七岁 · 人生关隘",
        title: "二十七岁人生评估与终极命运抉择",
        scene: "二十七岁这一年，一双手打下的扎实基业，让你在这一年拥有了为自己人生掌舵的全部底气。",
        type: "choice",
        choices: [
          {
            text: "坚定选择出海通道：开启全球移居与从容生活新篇章",
            detail: "凭一身真手艺吃遍四方，完完整整为自己活一次。",
            reaction: "飞机冲破云层，辽阔的世界向你敞开怀抱，活出全新的生命维度。",
            delta: { rebellion: 40, happiness: 35, resilience: 25 },
            addTags: ["奔赴异邦", "广阔天地"]
          },
          {
            text: "扎根故土成为家庭与实体中坚，在熟悉的规则与亲情中安顿一生",
            detail: "陪伴父母在侧，在熟人社会中守住现世安稳与人间烟火。",
            reaction: "你在熟悉的土地上站稳了脚跟，承担起守护家庭的千钧重任，踏实而温情。",
            delta: { kinshipGuilt: 30, social: 25, savings: 30000 },
            addTags: ["深耕故土", "挑起大梁"]
          }
        ]
      }
    ];
  }

  // 3-C: 默认工厂一线大工路线
  return [
    {
      id: "age_22_jc_craft",
      age: 22,
      stageName: "车间熟练工 · 22岁",
      title: "车间独立操作与熟练大工起步",
      scene: "进入正规制造工厂车间，凭借过硬实训功底独立操作数控机床或特种焊接，月薪五六千，踏踏实实凭真本事自立自强。",
      type: "choice",
      choices: [
        {
          text: "吃苦耐劳精研数控编程，废品率连续三个月全车间最低，获评优秀操作工",
          detail: "把每一件零件都车削到丝米级精度，展现出大国工匠的严谨钻研作风。",
          reaction: "车间主任主动为你申请了高级岗位津贴，月薪稳步涨至7500元。",
          delta: { resilience: 20, savings: 18000, cognition: 15 },
          addTags: ["车间能手", "工匠精神"]
        },
        {
          text: "报考当地特种操作资格证与安全生产高级证，拓宽职业技能壁垒",
          detail: "不混日子，主动提升职业认证，为今后跳槽或出国储备硬通底牌。",
          reaction: "顺利考下国家特种焊接与高级电工证，身价倍增。",
          delta: { cognition: 20, resilience: 15, savings: 10000 },
          addTags: ["特种资质", "技术硬功"]
        }
      ]
    },
    {
      id: "age_23_jc_craft",
      age: 23,
      stageName: "技术骨干 · 23岁",
      title: "考取高级工技能资格证书与薪资稳步提升",
      scene: "工作第二年，你在厂里成了人人竖大拇指的技术骨干。存折积蓄稳步迈过五万元大关。",
      type: "choice",
      choices: [
        {
          text: "通过官方高级工职业技能考核，晋升为车间年轻工段长，带三个实习生",
          detail: "不仅自己手艺好，还能协调排产与质量抽检，成为厂里的中流砥柱。",
          reaction: "月薪加奖金突破9000元，生活彻底安稳，父母在老家格外宽慰。",
          delta: { social: 20, savings: 30000, resilience: 15 },
          addTags: ["工段长", "手艺立足"]
        },
        {
          text: "报名业余外语夜校，提前了解海外紧缺技术工人工签申请标准与流程",
          detail: "得知海外焊工与数控技工时薪折合近400元人民币，暗暗下定决心学习外语实操词汇。",
          reaction: "英文机械图纸无障碍阅读，海外中介争相为你推荐海外雇主岗位。",
          delta: { rebellion: 25, cognition: 20, savings: -3000 },
          addTags: ["外语备战", "向往海外"]
        }
      ]
    },
    {
      id: "age_24_jc_craft",
      age: 24,
      stageName: "实干丰收 · 24岁",
      title: "存折上的第一个十万元与添置代步车",
      scene: "二十四岁这一年，存折里的数字终于摸到了十万元大关。父母开始在电话里关切你的成家买房问题。",
      type: "choice",
      choices: [
        {
          text: "添置一辆实用代步车，周末回老家看望父母，过热气腾腾的踏实生活",
          detail: "凭真双手挣出的基业最扎实，父母笑逐颜开，体会到平凡日子的踏实温暖。",
          reaction: "家庭和睦融洽，你在老家赢得了人人夸赞的好口碑。",
          delta: { kinshipGuilt: 20, happiness: 25, savings: -20000 },
          addTags: ["孝顺踏实", "市井温情"]
        },
        {
          text: "守牢十万元现金储备，坚决不盲目过早背房贷，保持极高的财务灵活度",
          detail: "理性自立，深知手中有粮心中不慌，为未来出海或自立门户蓄满粮草。",
          reaction: "你活得坦荡从容，面对任何变动都心定神怡。",
          delta: { rebellion: 20, resilience: 20, savings: 30000 },
          addTags: ["手握底气", "理智清醒"]
        }
      ]
    },
    {
      id: "age_25_jc_craft",
      age: 25,
      stageName: "走向成熟 · 25岁",
      title: "车间班组长师傅与手握十五万安全垫",
      scene: "走向社会的第四年，二十五岁的你成为了车间里赫赫有名的老师傅。存折存款积攒到了十五万元。",
      type: "choice",
      choices: [
        {
          text: "升任车间核心班组长，带徒传艺，享受企业特聘技师津贴，稳健安顿",
          detail: "技术全面，备受领导信任与徒弟敬重，成为厂里的不可多得之宝。",
          reaction: "存折稳健增长，拥有了在本地安家成家的全部底牌。",
          delta: { social: 20, savings: 40000, resilience: 15 },
          addTags: ["班组长", "技术大拿"]
        },
        {
          text: "正式拿到海外紧缺技术工人正式雇佣意向书与工签函，准备远行",
          detail: "拿着高级技工证书与外语成绩单，成功锁定海外高薪工签通道。",
          reaction: "海外企业开出高额时薪与全额保险，你的技艺迎来了全球绽放。",
          delta: { rebellion: 30, cognition: 20, savings: -10000 },
          addTags: ["拿到工签意向", "踏出第一步"]
        }
      ]
    },
    {
      id: "age_26_jc_craft",
      age: 26,
      stageName: "人生十字路口 · 26岁",
      title: "二十万独立积蓄的从容 vs 迈出远行的临行准备",
      scene: "二十六岁这一年，存折里的数字终于摸到了二十万元大关。一双手打出的天地最硬实。",
      type: "choice",
      choices: [
        {
          text: "扎根故土做工厂技术大拿，陪伴父母，守住现世安稳与人间烟火",
          detail: "有车有房有一技之长，热气腾腾过完踏实的一生。",
          reaction: "父母安康，你在熟悉的地方赢得了极高敬重。",
          delta: { kinshipGuilt: 25, happiness: 25, savings: 30000 },
          addTags: ["深耕故土", "挑起大梁"]
        },
        {
          text: "正式签署海外全职技术工匠合同，订购国际机票，准备开启新生活",
          detail: "走遍天下都不怕，彻底开启异国从容高薪篇章。",
          reaction: "背起行囊，满心笃定，走向辽阔世界。",
          delta: { rebellion: 35, happiness: 25, savings: -15000 },
          addTags: ["整装待发", "告别故土"]
        }
      ]
    },
    {
      id: "age_27_jc_craft",
      age: 27,
      stageName: "二十七岁 · 人生关隘",
      title: "二十七岁人生评估与终极命运抉择",
      scene: "二十七岁这一年，一身过硬实操本领，让你在这一年拥有了为自己人生掌舵的全部底气。",
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
  tags: string[] = []
): GaokaoCalculation {
  // If Vocational / Artisan Track from 0~17
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
  let rawScore = 330;
  // 应试做题本钱是主力（满权重约 250 分）
  rawScore += (attrs.academicCapital || 0) * 2.5;
  // 综合认知与理解力（满权重约 100 分）
  rawScore += (attrs.cognition || 0) * 1.0;
  // 心理素质与抗压抗挫韧劲（满权重约 45 分）
  rawScore += (attrs.resilience || 0) * 0.45;
  // 自卑/紧张扣分（最多扣 35 分）
  rawScore -= (attrs.inferiority || 0) * 0.35;

  // 关键特质与高中抉择标签修正
  const scoreBonuses: Record<string, number> = {
    "全省模考拔尖": 25,
    "刷题狠劲": 20,
    "做题拔尖": 20,
    "自主招生破局": 15,
    "自律自强": 15,
    "题海苦读": 12,
    "稳扎稳打": 10,
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

  // Tier 1: 985/211 重点大学 (全省前1.5%~2.0%，必须同时满足做题资本>=70与见识认知>=65)
  if (finalScore >= 628 && (attrs.academicCapital || 0) >= 70 && (attrs.cognition || 0) >= 65) {
    return {
      degreeTrack: "985_211",
      title: "【985/211重点大学 · 顶尖高校录取】",
      scoreText: `高考总分 ${finalScore} 分（全省排位前 1.2%），稳稳斩获顶尖重点大学录取通知书！`,
      verdict:
        "你在长达十二年的应试长跑中脱颖而出！红榜挂在校门前，校长和老师亲自送来喜报与奖学金，亲友们把你看作改写门楣的骄傲。你用十二年的极致自律与做题硬功夫换来了这张稀缺门票，未来不同赛道的宏大版图正向你展开。",
      academicCapitalDesc: "重点大学文凭到手，拥有顶尖校友网络与各行业核心选拔入场券，同时也承载着整个家庭更沉重的期许。",
      psychologicalDossier: `家庭牵绊：${attrs.kinshipGuilt}%，应试底盘：${attrs.academicCapital}%。你赢下了最艰难的第一道独木桥，骨子里充满底气。`,
      firstStepChoice: {
        prompt: "面对名校王牌志愿与未来赛道，你的根本立志是：",
        options: [
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

  // Tier 2: 普通公办本科（双非本一/二本，490~627分，绝大多数本科生的真实天地）
  if (finalScore >= 490) {
    return {
      degreeTrack: "double_non",
      title: "【沿海普通公办本科（双非一本/二本） · 真实而厚重的大多数】",
      scoreText: `高考总分 ${finalScore} 分（超省控公办本科线），被二线省会公办综合性大学录取`,
      verdict:
        "不高不低的分数，折射出你十二年来既不甘摆烂又未曾彻底疯狂的真实写照。你跨过了全日制本科的门槛，没有名校天生光环加持，但也免去了高处不胜寒的重压。未来的路，全看你在大学四年的主动突围。",
      academicCapitalDesc: "正规公办本科文凭，够得着绝大多数企业与体制内考编的基本门槛，关键在于个人专业与实操积累。",
      psychologicalDossier: `独立倾向：${attrs.rebellion}%，抗压韧劲：${attrs.resilience}%。你深知自己是一介凡人，必须更早找准立足社会的生态位。`,
      firstStepChoice: {
        prompt: "迈入大学校园，你为自己确立的突围支点是：",
        options: [
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
  return {
    degreeTrack: "junior_college",
    title: "【省会普通公办大专 · 现实的冷水与重新出发】",
    scoreText: `高考总分 ${finalScore} 分（未达本科省控线），录取至省属公办职业技术学院`,
    verdict:
      "出分那一晚，客厅里一片沉寂。父母在阳台上长吁短叹，十二年的应试长跑在这一刻画上了句号。你意识到自己在死板做题应试上并不占优，但也终于放下了虚浮的执念，开始思考最务实的谋生出路。",
    academicCapitalDesc: "大专文凭，在遍地本科生的时代稍显单薄，但只要练就一身过硬的独门手艺，照样能在社会稳稳立足。",
    psychologicalDossier: `生存韧性：${attrs.resilience}%，心理压力：${attrs.inferiority + 15}%。家人的叹息如针扎，但你也彻底放下了应试的沉重包袱。`,
    firstStepChoice: {
      prompt: "拿着大专通知书，你的第一步打算：",
      options: [
        {
          text: "坦然接纳现实：大专学一门实用精密数控或维保手艺，周末打工自给自足不再要钱",
          detail: "贫穷和挫败不再能轻易击垮你，你把身段放到最低，在具体的工业与社会泥土里摸爬滚打。",
          delta: { resilience: 35, inferiority: -10, savings: 5000 },
          addTags: ["大专实用", "手艺人底色", "早熟自立"]
        },
        {
          text: "报名专升本重点培训班，在自习室咬牙再战两年，誓要在二十岁拿到全日制本科学历",
          detail: "你承受不起同辈和亲友异样的眼光，决定拿出全部毅力在图书馆里再拼一次学历突围。",
          delta: { academicCapital: 25, kinshipGuilt: 20, savings: -4000 },
          addTags: ["专升本执念", "逆袭渴望"]
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
// 成人中后期宏大人生里程碑生成引擎（28 ~ 63 岁：完全契合学历与命运选择）
// ============================================================================

// ============================================================================
// 成年篇章：27岁~63岁（打破PPT，中年30岁、35岁、42岁赋予真实关键抉择！）
// ============================================================================

export function generateAdultMilestones(
  track: "985_211" | "double_non" | "junior_college",
  chosenPath: "emigrate" | "stay",
  family: FamilyOrigin,
  careerSubtrack: "civil" | "tech" | "academic" | "commercial" | "artisan" = "tech"
): LifeEventNode[] {
  const city = family.cityOrCounty || "省城";

  // =========================================================================
  // 1. 公职 / 选调 / 机关 / 事业单位赛道 (Civil Subtrack) - 彻底告别大厂IT叙事！
  // =========================================================================
  if (careerSubtrack === "civil") {
    if (chosenPath === "stay") {
      return [
        {
          id: "adult_civil_stay_30",
          age: 30,
          stageName: "三十而立 · 30岁",
          title: "提任正科级业务科长与主政一方业务",
          scene: `凭借选调与机关工作中扎实的公文笔杆、群众作风与过硬政绩，三十岁的你顺利提任为单位最年轻的核心业务科长（或下派挂职副区长/副县长），统筹全区民生保障与重点产业专班。老家父母逢人便骄傲地挺直腰杆，但你深知手中的权责重千钧。面对纷繁复杂的现实诉求：`,
          type: "choice",
          choices: [
            {
              text: "【扑下身子主导民生攻坚专班】带头深入一线化解拆迁难题，推动新城优质公办学校与医院配套落地",
              detail: "不搞形式主义，夜以继日协调十几个部门，把老百姓最关心的实事办到心坎上，打造群众拍手称赞的‘民心工程’。",
              reaction: "工程受到省委主要领导专题批示肯定，你成为市直机关公认‘既懂大局又能啃硬骨头’的年轻顶梁柱。",
              delta: { social: 30, resilience: 20, savings: 25000 },
              addTags: ["民心所向", "政绩硬核"]
            },
            {
              text: "【严守廉洁纪律底线稳扎稳打】公道处事，坚决拒收一切不合规礼金与亲友关系户请托，立身端正",
              detail: "行事稳健端方，滴水不漏，在错综复杂的人际关系网中守住原则，建立起坚如磐石的清廉口碑。",
              reaction: "纪检部门和组织部门对你高度认可，父母虽然帮亲戚碰了壁，但对你风清气正的威信由衷自豪。",
              delta: { resilience: 25, cognition: 20, kinshipGuilt: -20, savings: 20000 },
              addTags: ["清廉自持", "行稳致远"]
            }
          ]
        },
        {
          id: "adult_civil_stay_35",
          age: 35,
          stageName: "三十五岁关隘 · 35岁",
          title: "晋升副处级领导与全省重点改革攻坚",
          scene: `三十五岁生日这周，你通过全省综合考察与组织遴选，正式晋升为副处级领导干部（或重要业务处室处长）。同龄人在私企正面临35岁优化下岗的阵痛，而你正坐在全省重点民生改革协调调度会的中心席位，统筹各部门协同推进重点攻坚。面对盘根错节的利益博弈：`,
          type: "choice",
          choices: [
            {
              text: "【迎难而上啃下最硬的体制改革骨头】牵头推进政务审批全流程阳光化，打破部门利益壁垒",
              detail: "顶住阻力推动政务数字一网通办，把原本需要跑两个月的审批压缩到三天，受到群众与企业极高好评。",
              reaction: "全省改革现场会在你主政区域召开，被省委组织部树为‘担当作为优秀好干部’标杆。",
              delta: { social: 35, resilience: 25, savings: 35000 },
              addTags: ["改革先锋", "担当有为"]
            },
            {
              text: "【协调各方利益护航现世平稳发展】善于把矛盾化解在萌芽状态，统筹兼顾各方诉求，确保大局和谐",
              detail: "为人谦逊沉稳，注重政策平稳过渡，不急功近利，被上下公认为最值得信赖的‘定海神针’。",
              reaction: "班子成员对你心悦诚服，你在单位与地方建立了极高的人望，处事从容自如。",
              delta: { social: 30, cognition: 25, savings: 30000 },
              addTags: ["中流砥柱", "人望所归"]
            }
          ]
        },
        {
          id: "adult_civil_stay_42",
          age: 42,
          stageName: "四十二岁岁月 · 42岁",
          title: "正处长/二级巡视员与家族中流砥柱",
          scene: `四十二岁这年，你已晋升为正处级主要领导（或二级巡视员）。老家父亲年逾古稀突发重疾，你不仅下班后守在病榻前端汤喂药，更凭借多年清廉奉公经营的广泛信誉，协调省城三甲医院专家全力救治，为整个家族撑起了最坚固的依靠。面对病榻前的家庭责任：`,
          type: "choice",
          choices: [
            {
              text: "【孝行感动病榻与树立严正家风】亲自侍奉双亲直至康复，在家族中以身作则树立尊老爱幼、诚实守法的规矩",
              detail: "亲力亲为侍奉床前，公私分明，用至孝真情让年迈双亲感受到最踏实的安全感。",
              reaction: "父亲康复出院时老泪纵横：“你在前头走得正，全家在后头腰杆硬！”家族内外人人赞叹。",
              delta: { kinshipGuilt: -40, happiness: 25, savings: -30000 },
              addTags: ["纯孝传家", "家风严正"]
            },
            {
              text: "【牵头设立宗族教育与扶困帮扶】以身作则资助贫困堂表弟妹考学读书，成为家族人人敬仰的定盘星",
              detail: "不拿公帑谋私，拿自己的工资结余帮扶宗族后辈，成为大家庭中受尽敬重的威望核心。",
              reaction: "宗族子弟纷纷以你为楷模，逢年过节门庭若市，你在故土赢得了崇高的社会声望。",
              delta: { social: 35, savings: -50000, resilience: 20 },
              addTags: ["宗族栋梁", "望族声誉"]
            }
          ]
        },
        {
          id: "adult_civil_stay_52",
          age: 52,
          stageName: "五十二岁荣枯 · 52岁",
          title: "两袖清风与下一代优良家传",
          scene: `五十二岁，你在重要领导岗位上威信隆重，两袖清风，口碑载道。你的孩子在良好家风与你开阔视野的熏陶下，顺利考入一流重点大学，为人谦和正直。两代人的清白立身与家国情怀，在这一刻形成了最坚实的传承。`,
          type: "milestone",
          naturalDelta: { savings: 100000, social: 30, happiness: 30 },
          naturalTags: ["清白传家", "门楣生辉"],
          reflection: "一代人的清廉奉公，两代人的正道传承。你兑现了体制基石的崇高使命。"
        },
        {
          id: "adult_civil_stay_63",
          age: 63,
          stageName: "六十三岁退休 · 63岁",
          title: "干部隆重荣休与无愧苍生",
          scene: `六十三岁这年，组织上为你举行了庄重隆重的退休仪式。老领导、老部下与群众代表依依不舍，送来题有‘清风明月、利国利民’的锦旗。拿着全额保障的离退休待遇与高品质医疗，回望从当年农家/工人子弟一步步走到今日，你一生问心无愧，善始善终。`,
          type: "milestone",
          naturalDelta: { happiness: 35, resilience: 30 },
          naturalTags: ["功成荣休", "无愧苍生"],
          reflection: "在生你养你的土地上奉献一生，清风两袖，泽被乡民，安详圆满。"
        }
      ];
    }

    // civil + emigrate (公共治理/智库出海)
    return [
      {
        id: "adult_civil_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "国际公共政策智库与跨国交流使者",
        scene: `凭借深厚的公共管理底蕴与过硬的外语综合能力，三十岁的你在日内瓦/新加坡国际公共政策智库或涉外机构担任高级项目专员，独立主导跨国公共治理与发展合作。站在三十岁的人生节点：`,
        type: "choice",
        choices: [
          {
            text: "【深耕跨国公共治理】主笔撰写亚太区域民生与减贫合作政策蓝皮书，成为智库骨干",
            detail: "将中国治理实践与国际规则深度结合，为发展中国家提供实战决策参考，享有崇高专业声誉。",
            reaction: "多国代表高度评价你的战略眼光，受邀在联合国教科文分论坛发表主旨演讲。",
            delta: { social: 30, cognition: 25, savings: 150000 },
            addTags: ["智库骨干", "国际声誉"]
          },
          {
            text: "【享受简单规律生活】严格遵循国际组织人性化工时，下午五点关电脑去湖畔散步享受宁静",
            detail: "告别过度的人情羁绊，在清爽透明的国际环境中找回身心的纯粹健康与平衡。",
            reaction: "身心舒展通透，身体指标全面恢复最佳状态，活出了令人向往的松弛与尊严。",
            delta: { happiness: 30, health: 25, inferiority: -20 },
            addTags: ["身心通透", "国际松弛"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "国际组织资深主管与全球援助统筹",
        scene: `三十五岁生日，你升任国际非政府组织驻外资深代表兼项目主管，统筹数千万美元的跨境民生援助项目。国际组织提供免税优厚薪资与全额全球医保，生活安详从容：`,
        type: "choice",
        choices: [
          {
            text: "【统筹大型跨国援助】协调多国政府与基层社区，成功推动跨国乡村清洁饮水与基础医疗援助落地",
            detail: "展现出过硬的跨文化领导力与大局观，援助惠及十万基层群众，获颁国际人道合作勋章。",
            reaction: "联合国驻地协调员高度赞扬你的卓越贡献，你的名字被载入该组织杰出贡献名录。",
            delta: { social: 35, savings: 200000, resilience: 20 },
            addTags: ["跨文化领袖", "大局担当"]
          },
          {
            text: "【兼任国际大学客座专家】在海外名校开设公共治理研讨班，潜心著述与传道授业",
            detail: "将半生治理智慧转化为学术教材，享受知识分子的从容体面与学术尊严。",
            reaction: "来自数十个国家的学生对你敬重有加，你的著作被多所国际知名智库指定为必读参考。",
            delta: { cognition: 30, happiness: 25, social: 20 },
            addTags: ["客座专家", "桃李天下"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "跨洋反哺与双亲至孝托底",
        scene: `老家父亲突发急症住院，你连夜搭乘跨国航班飞回${city}。面对病榻前年迈的双亲：`,
        type: "choice",
        choices: [
          {
            text: "【动用外币储蓄托底】请国内顶尖专家会诊并聘请专业护工，亲自在床前侍奉半月",
            detail: "用雄厚的外币资金与成熟的现代照护为双亲撑起最可靠的屏障，尽到为人儿女的最大孝道。",
            reaction: "父亲度过危险期，拉着你的手老泪纵横：“你在大洋彼岸有大出息，爹这辈子踏实了！”",
            delta: { savings: -60000, kinshipGuilt: -35, happiness: 25 },
            addTags: ["至孝托底", "血脉相守"]
          },
          {
            text: "【接父母海外旅居康养】为父母办理长期探亲签证，接双亲至海外宜居小镇体验田园静养",
            detail: "让辛苦了一辈子的普通工人/农民父母亲眼看看世界的辽阔与你奋斗出的清爽天地。",
            reaction: "父母在异国阳光与微风中舒展欢笑，两代人的代际心结在这一刻彻底冰释。",
            delta: { savings: -40000, kinshipGuilt: -30, happiness: 30 },
            addTags: ["天伦安享", "两地安心"]
          }
        ]
      },
      {
        id: "adult_civil_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "全球治理专家与下一代多元格局",
        scene: `你的孩子在多元国际文化中茁壮成长，精通多国语言，思维敏捷，自信坦荡，以平等包容的视野审视世界。看着眼前这个免受单一内卷摧残的下一代，你深知当年勇敢走向世界的决定，彻底改写了家族的生命维度。`,
        type: "milestone",
        naturalDelta: { savings: 250000, happiness: 30, cognition: 25 },
        naturalTags: ["全球视野", "多元格局"],
        reflection: "以才智服务全球，给下一代换来了不被狭窄评价体系捆绑的辽阔天空。"
      },
      {
        id: "adult_civil_emigrate_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "国际双重年金荣休与云卷云舒",
        scene: `六十三岁这年，你按期办理了国际组织全额退休，享有终身全球顶级医保与双重年金。湖畔微风吹过向阳露台，你偶尔受邀受聘为母校与国际高校的公共治理终身荣誉顾问，游历列国，笑看云卷云舒，一生波澜壮阔，无怨无悔。`,
        type: "milestone",
        naturalDelta: { happiness: 35, resilience: 30 },
        naturalTags: ["国际荣休", "一生无悔"],
        reflection: "走出方寸天地，以天下为己任。风清气朗，一生无憾。"
      }
    ];
  }

  // =========================================================================
  // 2. 学术研究 / 硕博科研 / 高校教职赛道 (Academic Subtrack)
  // =========================================================================
  if (careerSubtrack === "academic") {
    if (chosenPath === "stay") {
      return [
        {
          id: "adult_acad_stay_30",
          age: 30,
          stageName: "三十而立 · 30岁",
          title: "青年学者破格副教授与国家基金攻坚",
          scene: `博士后出站后，凭借多篇高水平学术成果，三十岁的你被省内顶尖高校破格引进为副教授、硕士生导师。独立挂牌青年课题组，手握国家自然科学/国家社科重点青年基金项目：`,
          type: "choice",
          choices: [
            {
              text: "【潜心攻克核心前沿重大课题】带领研究生团队夜以继日跑实验仿真，冲刺国际顶尖期刊主刊封面",
              detail: "耐得住板凳十年冷，不盲目追求横向项目赚快钱，誓在基础科学前沿树立国内学术话语权。",
              reaction: "团队突破性研究成果被国际顶级权威期刊正式录用，你在全国青年学者学术年会上作特邀主旨报告。",
              delta: { academicCapital: 35, cognition: 30, savings: 80000 },
              addTags: ["学术新星", "顶刊突破"]
            },
            {
              text: "【推动产业关键卡脖子技术落地】与国家骨干龙头企业共建产学研联合工程中心，攻坚产业急需",
              detail: "将象牙塔里的理论成果转化为支撑实体工业的硬核算法与工艺，让科研切实造福产业。",
              reaction: "工程技术成果成功通过专家组严苛验收并实现产业化，课题组获得千万元级研发经费支持。",
              delta: { cognition: 25, savings: 150000, social: 25 },
              addTags: ["产学先锋", "卡脖子攻坚"]
            }
          ]
        },
        {
          id: "adult_acad_stay_35",
          age: 35,
          stageName: "三十五岁关隘 · 35岁",
          title: "破格晋升正教授博导与重点实验室挂牌",
          scene: `三十五岁生日这年，你凭借过硬学术贡献破格晋升为学校最年轻的正高级教授与博士生导师，领衔省部级重点实验室建设。面对海内外多所名校的高薪挖角：`,
          type: "choice",
          choices: [
            {
              text: "【扎根母校领衔建设国家级创新团队】拒绝外部挖角，深耕本校学科平台，申报国家级重点创新引智基地",
              detail: "甘为人梯，带领一批年轻博士生成长为骨干，把本学科在全国学科评估中拉升至顶尖A+档位。",
              reaction: "学校特批建立以你名字命名的科学家工作室，你成为学界公认的中生代领军旗帜。",
              delta: { academicCapital: 35, social: 30, savings: 120000 },
              addTags: ["学科旗帜", "国家团队"]
            },
            {
              text: "【担任国家科技重大专项核心专家】入选国家部委战略科学家咨询委员会，参与国家中长期科技规划",
              detail: "站在国家战略高度布局科学技术未来走向，将学术追求深度融入国家复兴的历史进程。",
              reaction: "国家领导人亲切接见重大专项专家组成员，你的建言被写入国家科技战略报告。",
              delta: { cognition: 35, social: 35, savings: 100000 },
              addTags: ["战略科学家", "国家智囊"]
            }
          ]
        },
        {
          id: "adult_acad_stay_42",
          age: 42,
          stageName: "四十二岁岁月 · 42岁",
          title: "国家杰青/长江学者与病榻至孝守望",
          scene: `四十二岁，你顺利当选国家杰出青年科学基金获得者与长江学者特聘教授。老家父亲突发急症住院，你不仅床前侍奉，更凭借广泛的学者声望与积蓄协调顶级医疗资源，尽显至孝。面对家庭与学术的平衡：`,
          type: "choice",
          choices: [
            {
              text: "【亲自床前侍奉尽孝与优良家传】白天处理实验室关键方向，夜晚亲自守候病榻端药喂汤",
              detail: "学者亦是为人儿女，你用温厚纯良的孝行给病榻上的双亲最踏实的宽慰，给子女树立品德榜样。",
              reaction: "老人康复出院时满脸自豪，门生故旧交口称赞‘大先生有真性情、大仁大孝’。",
              delta: { kinshipGuilt: -40, happiness: 30, savings: -40000 },
              addTags: ["仁孝大家", "德艺双馨"]
            },
            {
              text: "【出资设立宗族教育与扶困助学基金】以学者稿酬与奖金设立家族助学奖，激励宗族后辈用知识立身",
              detail: "不忘农家/平民本色，用知识的火种照亮宗族年轻一代的前路，被老家乡亲奉为当代文曲星。",
              reaction: "数名后辈在你的资助鼓励下考入重点高校，宗族门风焕然一新，德泽绵长。",
              delta: { social: 35, savings: -60000, resilience: 20 },
              addTags: ["文曲重光", "耕读传家"]
            }
          ]
        },
        {
          id: "adult_acad_stay_52",
          age: 52,
          stageName: "五十二岁荣枯 · 52岁",
          title: "两院院士评选梯队与桃李满天下",
          scene: `五十二岁，你作为学科元老进入两院院士正式有效候选人名单。三十年学术长跑结出硕果累累，门下走出了数十名活跃在全国高校与国家重点科研院所的教授与青年学者。你的孩子在学术氛围熏陶下品学兼优，两代学者风骨峥嵘。`,
          type: "milestone",
          naturalDelta: { savings: 200000, social: 35, happiness: 30 },
          naturalTags: ["学界泰斗", "桃李满园"],
          reflection: "板凳坐得十年冷，文章不写一句空。你用纯粹的才智铸就了不朽的学问基业。"
        },
        {
          id: "adult_acad_stay_63",
          age: 63,
          stageName: "六十三岁退休 · 63岁",
          title: "资深荣誉教授荣休与学术终身成就",
          scene: `六十三岁这年，高校为你举行隆重的学术终身成就表彰大会。各界门生学者齐聚一堂向你深深致敬。学校授予你终身荣誉资深特聘教授与独立研讨室，享有最高国家专家津贴与医疗待遇。在绿树成荫的校园里著书立说，启迪后学，一生圆满崇高。`,
          type: "milestone",
          naturalDelta: { happiness: 35, resilience: 30 },
          naturalTags: ["先生之风", "山高水长"],
          reflection: "立德立言立功，先生之风，山高水长。"
        }
      ];
    }

    // academic + emigrate (海外教职/学术终身轨)
    return [
      {
        id: "adult_acad_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "海外名校终身教职轨(Tenure-Track)助理教授",
        scene: `凭借名校博士与高水平学术发表，三十岁的你在北美/欧洲顶尖综合性大学拿下终身教职轨道(Tenure-Track)助理教授职位，拥有独立实验室与充足的国际启动科研经费。站在三十岁的人生节点：`,
        type: "choice",
        choices: [
          {
            text: "【潜心学术冲刺重大科学发现】夜以继日带领国际博士生攻克前沿理论，冲击Nature/Science正刊",
            detail: "享受海外纯粹宽松的学术自由探索氛围，在世界科学的最前沿留下中国学者的名字。",
            reaction: "论文被顶级期刊以封面文章发表，全球主流科技媒体争相报道你的突破成果。",
            delta: { academicCapital: 35, cognition: 30, savings: 160000 },
            addTags: ["前沿突破", "国际学者"]
          },
          {
            text: "【追求生活平衡与学者尊严】每年休满三个月学术长假，在山海湖泊之间徒步写作，享受学术从容",
            detail: "告别焦虑与浮躁，把时间还给深思、家庭与纯粹的探索乐趣，活出学者最本真的体面。",
            reaction: "身心清澈通透，后院花草繁盛，你在从容自由中找到了学术与生命的和谐共振。",
            delta: { happiness: 30, health: 25, inferiority: -20 },
            addTags: ["学者从容", "天地自在"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "提前斩获终身教职(Tenure)与讲席教授",
        scene: `三十五岁生日这周，大学校董会全票通过你的终身教职评审，提前锁定终身副教授(Tenured Associate Professor)。彻底摆脱了任何年龄与下岗危机，享有终身科研保障：`,
        type: "choice",
        choices: [
          {
            text: "【领衔组建国际跨学科科学中心】联合欧美多国顶级学者发起国际大科学计划，引领学科潮流",
            detail: "凭借学术威望与全球号召力，成为国际前沿学派的公认旗手，享有崇高国际声誉。",
            reaction: "国际科学理事会授予你青年领军科学家大奖，你的学说被写入国际通行教科书。",
            delta: { social: 35, savings: 220000, cognition: 30 },
            addTags: ["学派宗师", "全球声誉"]
          },
          {
            text: "【专心撰写学术传世经典巨著】推辞多余行政应酬，沉下心来撰写耗时多年的权威理论专著",
            detail: "不为眼前名利所动，追求能经受住时光淘洗的永恒知识，将名字刻在人类思想史上。",
            reaction: "专著由剑桥/哈佛大学出版社全球出版，成为该领域的开山经典之作。",
            delta: { cognition: 35, happiness: 30, resilience: 20 },
            addTags: ["传世经典", "大作问世"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "讲席讲座教授与跨洋孝道托底",
        scene: `四十二岁，你已晋升为冠名讲席讲座教授。老家国内父亲突发重疾，你立即动用国际优质医疗协作与外币积蓄，安排国内最好的专家诊疗手术，并亲自回国陪护：`,
        type: "choice",
        choices: [
          {
            text: "【雄厚外币储蓄医疗托底】支付最好的三甲特需医疗费用与康复护工，床前寸步不离侍奉",
            detail: "用实打实的跨国财力与孝心为父母筑起最坚固的防线，让老家双亲安享无忧晚年。",
            reaction: "父亲度过危险期出院，逢人便夸你‘书读得大，心更孝顺’，全家倍感踏实自豪。",
            delta: { savings: -60000, kinshipGuilt: -35, happiness: 25 },
            addTags: ["至孝托底", "书香传家"]
          },
          {
            text: "【接双亲海外大学城安居小住】为父母办理探亲长住，在宁静绿树成荫的大学城小筑安顿双亲",
            detail: "让辛苦一辈子的普通父母亲身漫步在世界一流学府的大草坪上，享受清澈阳光与安宁天伦。",
            reaction: "双亲身体指标显著好转，看着你受全校师生敬重的模样，脸上洋溢着欣慰笑意。",
            delta: { savings: -40000, kinshipGuilt: -30, happiness: 30 },
            addTags: ["天伦安享", "两地安心"]
          }
        ]
      },
      {
        id: "adult_acad_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "国际权威院士荣誉与下一代从容成长",
        scene: `五十二岁，你当选为国际知名科学院外籍院士。你的孩子在大学城多元浓郁的学术土壤中自由成长，独立自信，勇于探索未知的科学与艺术世界，完全免受同辈压力与畸形内卷的困扰。两代人在知识的天空下各得其乐，生命舒展坦荡。`,
        type: "milestone",
        naturalDelta: { savings: 250000, happiness: 30, cognition: 30 },
        naturalTags: ["国际院士", "书香长流"],
        reflection: "以才智立身全球，以德行启迪后人。人类知识的长河中，有你闪耀的一朵浪花。"
      },
      {
        id: "adult_acad_emigrate_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "荣誉终身教授荣休与著述立说",
        scene: `六十三岁这年，大学授予你荣誉终身教授称号，保留专用工作室与全额终身年金。后院阳光洒在书桌的泛黄原稿上，偶尔受邀在全球顶级学术殿堂讲学交流，一生求索真理，心无旁骛，境界高远，浩然长存。`,
        type: "milestone",
        naturalDelta: { happiness: 35, resilience: 30 },
        naturalTags: ["学问长青", "不朽人生"],
        reflection: "探求真理，启迪蒙昧。一生纯粹，高山仰止。"
      }
    ];
  }

  // =========================================================================
  // 3. 默认轨道（科技研发 / 实业商贸 / 工匠大专）
  // =========================================================================
  if (track === "985_211" && chosenPath === "emigrate") {
    return [
      {
        id: "adult_985_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "海外研发中坚与生活重心的分野",
        scene: `走向海外的第三年，凭借985扎实的技术底蕴与顶级工程能力，你在海外科技枢纽（硅谷/温哥华/慕尼黑）独立负责核心微服务架构。年薪折合45万，手握大额储蓄。站在三十岁门槛上，你面临生活重心的取舍：`,
        type: "choice",
        choices: [
          {
            text: "【深耕硬核架构】主攻底层高并发与开源贡献，冲刺高级主任工程师(Staff)",
            detail: "把精力倾注在技术攻坚上，在开源基金会中留下名字，收入与专业话语权稳步跃升。",
            reaction: "你的技术方案被写入团队最佳实践，海内外猎头纷纷抛来橄榄枝。",
            delta: { savings: 180000, cognition: 25, resilience: 15 },
            addTags: ["架构大拿", "技术护城河"]
          },
          {
            text: "【身心通透松弛】享受严格的工时平衡，下午五点关电脑去海湾划皮划艇",
            detail: "彻底告别单向度内卷，将周末交给自然风光、户外徒步与自制烘焙，找回纯粹的快乐。",
            reaction: "精神焕发，身体亚健康完全消失，你活出了令人羡慕的健康松弛感。",
            delta: { happiness: 30, health: 25, inferiority: -20 },
            addTags: ["身心通透", "自然滋养"]
          }
        ]
      },
      {
        id: "adult_985_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "永久居留获批与中年天花板破局",
        scene: `三十五岁生日这周，你的永久居留资格（绿卡/枫叶卡/欧盟蓝卡）正式获批。国内同龄人正遭遇35岁优化浪潮，而你在异国职场面对华人工程师的玻璃天花板：`,
        type: "choice",
        choices: [
          {
            text: "【突破跨文化管理】主动锻炼公众演讲与跨文化沟通，带多元背景工程团队",
            detail: "走出华人技术舒适圈，主动向资深管理岗位冲刺，赢得跨国同行尊重。",
            reaction: "管理层高度认可你的全局协调力，团队交付质量名列前茅。",
            delta: { social: 25, savings: 250000, resilience: 20 },
            addTags: ["跨文化管理者", "破局领导力"]
          },
          {
            text: "【深耕独立专家】坚持个人贡献者(IC)路线，每年休满带薪假，专注后院花木",
            detail: "不趟人事政治的混水，手握稀缺核心技术，享受无拘无束的专家尊严与家庭陪伴。",
            reaction: "生活宁静惬意，后院栽下的枫树亭亭玉立，你在远离焦虑中自得其乐。",
            delta: { happiness: 25, resilience: 20, health: 15 },
            addTags: ["自在专家", "岁月静好"]
          }
        ]
      },
      {
        id: "adult_985_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "关山难越与双亲重疾托底",
        scene: `老家父亲突发急症住院，你连夜订购跨洋机票飞回${city}。面对病榻前的医疗费用与照护开销：`,
        type: "choice",
        choices: [
          {
            text: "【动用外币储蓄托底】请三甲医院最好的专家手术与顶级护工，并亲自床前侍奉半月",
            detail: "虽远隔重洋有身不由己的遗憾，但你用雄厚的外币财力为双亲撑起了最体面的医疗托底。",
            reaction: "父亲度过危险期，出院时拉着你的手老泪纵横：“你在外面过得硬实，爹就踏实了。”",
            delta: { savings: -80000, kinshipGuilt: -30, resilience: 20 },
            addTags: ["至孝托底", "血脉相守"]
          },
          {
            text: "【置办省城电梯新居】在老家省城全款置办带电梯的高品质适老公寓并购买大额大病保单",
            detail: "彻底解决老旧小区上下楼与医疗看护隐患，为父母晚年构筑长期无忧的养老壁垒。",
            reaction: "老家亲朋好友交口称赞，父母搬入窗明几净的新居，晚年有了最稳固的依靠。",
            delta: { savings: -150000, kinshipGuilt: -35, happiness: 25 },
            addTags: ["长效安老", "光耀故土"]
          }
        ]
      },
      {
        id: "adult_985_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "下一代跨文化成长与超脱心境",
        scene: `你的孩子在海外名校攻读前沿科学，思维敏捷，自信松弛，讲一口纯正母语与流利外语。晚餐桌上，他以平等的姿态与你探讨全球经济与哲学。你看着眼前这个完全免受应试规训的下一代，彻底释怀了东亚家庭过度的代际焦虑，微笑着收回了干涉的手。`,
        type: "milestone",
        naturalDelta: { savings: 250000, happiness: 25, cognition: 20 },
        naturalTags: ["下一代松弛", "跨文化超脱"],
        reflection: "你用一代人的跨洋跋涉，彻底斩断了匮乏与攀比的代际循环，给孩子换来了辽阔的选择权。"
      },
      {
        id: "adult_985_emigrate_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "全球双重年金与无憾生平",
        scene: `六十三岁这年，你按期办理了国际双重年金与海外法定退休。海风拂过宽敞的向阳露台，你卡内折合储蓄充足，享有全额医疗覆盖。偶尔受邀回国给母校学弟学妹开展学术讲座，与旧友举杯畅叙半生沧桑。世界之大，你完完整整走出了属于自己的传奇篇章。`,
        type: "milestone",
        naturalDelta: { happiness: 30, resilience: 30 },
        naturalTags: ["全球荣休", "一生无悔"],
        reflection: "走出方寸之地，以才智立身全球。风定天朗，一生无悔。"
      }
    ];
  }

  if (track === "985_211" && chosenPath === "stay") {
    return [
      {
        id: "adult_985_stay_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "行业中层骨干与省城买房抉择",
        scene: `三十而立，凭借985学历底蕴与扎实的业务交付，你在部门晋升为资深技术骨干或省直机关科室副科级业务中坚。老家父母拿出多年积蓄催促你在${city}置业成家：`,
        type: "choice",
        choices: [
          {
            text: "【顺应期待付首付】用公积金和父母帮衬付首付购置省城温馨品质房，扎根立足",
            detail: "在省城有了自己的户口与砖石屋檐，成为家族中人人羡慕的省城立足栋梁。",
            reaction: "父母逢人便讲你在省城买了房，你的社会资本与家庭安心感大幅提升。",
            delta: { social: 25, kinshipGuilt: -20, savings: -80000 },
            addTags: ["省城扎根", "体面立足"]
          },
          {
            text: "【现金为王拒绝高杠杆】说服父母保留流动现金抵御周期，自己租住高品质公寓",
            detail: "保持极高的财务灵活性与现金流，拒绝将两代人捆绑在沉重的三十年房贷上。",
            reaction: "手里握着充足的现金储备，在职场面对变动时拥有极大的心理底气与转圜空间。",
            delta: { savings: 120000, rebellion: 20, resilience: 20 },
            addTags: ["清醒自持", "现金安全垫"]
          }
        ]
      },
      {
        id: "adult_985_stay_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "行业周期风浪与定海神针",
        scene: `面对经济周期调整与行业降本增效，不少边缘团队被重组裁撤。作为三十五岁的资深业务中坚，你面临职场长线走向的抉择：`,
        type: "choice",
        choices: [
          {
            text: "【主动领衔核心专项】啃下别人不敢碰的底层高难技术攻坚，构筑不可替代壁垒",
            detail: "凭借扎实的理工功底与耐力，逆势主导完成省级产业重点项目，确立不可动摇的地位。",
            reaction: "项目顺利验收，领导当众嘉奖，你在激流之中稳稳立住了阵脚。",
            delta: { resilience: 25, savings: 150000, cognition: 20 },
            addTags: ["定海神针", "核心壁垒"]
          },
          {
            text: "【平稳转轨省直事业单位】通过人才引进转入省属科研院所或高校，求取确定性",
            detail: "牺牲部分市场化高薪，换取稳定体面的作息、充足年假与确定性医疗养老保障。",
            reaction: "作息规律，身体从长年加班中恢复，有了更多时间陪伴家人与子女成长。",
            delta: { health: 25, happiness: 25, social: 15 },
            addTags: ["稳健转轨", "从容体制"]
          }
        ]
      },
      {
        id: "adult_985_stay_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "熟人资源网络与病榻前尽孝",
        scene: `父亲年逾古稀突发重疾，你作为留在身边的核心家庭顶梁柱：`,
        type: "choice",
        choices: [
          {
            text: "【调动省城医疗人脉资源】协调三甲医院专家床位，下班后亲自陪护端汤喂药",
            detail: "亲历亲为侍奉床前，用多年经营的本地人脉让父母感受到最体贴入微的安全感。",
            reaction: "父亲康复出院拉着你的手老泪纵横：“多亏你在跟前撑着，全家这辈子踏实！”",
            delta: { kinshipGuilt: -35, happiness: 25, savings: -40000 },
            addTags: ["床前尽孝", "家族基石"]
          },
          {
            text: "【牵头设立家族互助基金】出资为全家老人购置商业补充医疗险并资助晚辈求学",
            detail: "凭借自身的丰厚储蓄与声望，成为整个大家庭的经济庇护所与威望核心。",
            reaction: "亲友上门请教，你在宗族网络中赢得了极高敬重与德高望重的好名声。",
            delta: { social: 30, savings: -60000, resilience: 20 },
            addTags: ["宗族栋梁", "德高望重"]
          }
        ]
      },
      {
        id: "adult_985_stay_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "认知赋能与下一代名校传承",
        scene: `你的孩子面临高考与大学选拔。得益于你多年在省城积累的深厚认知与精准视野，你为孩子提供了极具前瞻性的学业与志愿规划，孩子顺利保送至顶尖双一流名校。两代人的知识改变命运在这一刻完成闭环，家族阶层稳步夯实。`,
        type: "milestone",
        naturalDelta: { savings: 200000, social: 25, happiness: 25 },
        naturalTags: ["两代名校", "阶层夯实"],
        reflection: "一代人的知识改变命运，两代人的阶层稳步抬升。你兑现了家庭赋予你的所有期待。"
      },
      {
        id: "adult_985_stay_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "德高望重与荣休嘉奖",
        scene: `六十三岁这年，你在单位隆重的退休仪式上接受同事后辈的献花与致敬。拿着最高档次的退休金与医疗保障，在省城绿树成荫的高品质社区安享晚年。偶尔为行业做高级顾问，逢年过节门生故旧登门问候，一生尊荣，实至名归。`,
        type: "milestone",
        naturalDelta: { happiness: 30, resilience: 25 },
        naturalTags: ["德高望重", "荣休安享"],
        reflection: "在熟悉的故土上深耕一生，赢得了人情与体面的极致尊荣。"
      }
    ];
  }

  if (track === "double_non" && chosenPath === "emigrate") {
    return [
      {
        id: "adult_double_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "打破学历枷锁与异邦扎根",
        scene: `在海外综合企业担任业务管理或技术支持，没人打听你的高考分数，只看你的执行力与踏实作风。卡内折合储蓄突破二十万。面对三十岁的长远规划：`,
        type: "choice",
        choices: [
          {
            text: "【考取当地执业资质】精进当地语言，考取行业核心证书，争取核心雇主担保",
            detail: "踏踏实实考证钻研，凭借扎实肯干赢得当地高管高度信赖，锁定长约。",
            reaction: "雇主主动为你办理工作签证延期与永久居留担保，未来彻底稳定下来。",
            delta: { cognition: 20, savings: 100000, resilience: 15 },
            addTags: ["逆风立足", "执业资质"]
          },
          {
            text: "【合伙开创商贸服务】融入当地华人与多元社区，兼职开创中外小额贸易渠道",
            detail: "发挥中国人的勤劳与商业敏感，打通货源链路，多渠道积累个人资本。",
            reaction: "小生意渐渐红火，你赚到了属于自己的第一笔丰厚外币提成。",
            delta: { social: 25, savings: 120000, rebellion: 15 },
            addTags: ["商业敏锐", "异邦弄潮"]
          }
        ]
      },
      {
        id: "adult_double_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "永居落地与摆脱三十五岁魔咒",
        scene: `三十五岁生日，海外永久居留资格顺利落定。没有中年下岗危机，下午五点准时下班：`,
        type: "choice",
        choices: [
          {
            text: "【小镇木屋与旷野生活】在近郊小镇按揭买下一栋带草坪的木屋，享受周末野营",
            detail: "彻底远离内卷焦虑，周围邻里友善互助，在清新的空气与阳光中找回松弛。",
            reaction: "身心舒展坦荡，你终于确信：在这里没有人会因年龄逼迫你下岗。",
            delta: { happiness: 30, health: 20, inferiority: -25 },
            addTags: ["永居落地", "从容松弛"]
          },
          {
            text: "【邀请父母海外旅居】为老家父母办理探亲签证，接他们来体验两个月异国田园",
            detail: "父母看着你窗明几净的大房子和安稳体面的生活，激动落泪，彻底放下了悬着的心。",
            reaction: "全家在后院草坪上野餐合影，两代人的代际心结在这一刻彻底冰释。",
            delta: { kinshipGuilt: -30, happiness: 25, savings: -30000 },
            addTags: ["光照故土", "两地安心"]
          }
        ]
      },
      {
        id: "adult_double_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "关山难越与跨洋亲情托底",
        scene: `国内老家父母上了岁数，面对距离与亲情的考量：`,
        type: "choice",
        choices: [
          {
            text: "【定期大额汇款托底】长期汇款资助国内弟弟妹妹照料父母，并出资全额医疗费",
            detail: "用实打实的外币储蓄作为老家防线，让双亲在亲友面前有了最踏实的底气。",
            reaction: "国内手足齐心协力照料父母，你在大洋彼岸成为了全家最坚强的后盾。",
            delta: { savings: -50000, kinshipGuilt: -25, happiness: 20 },
            addTags: ["跨洋后盾", "血亲托底"]
          },
          {
            text: "【每两年回国长假探亲】每年积攒带薪假回国住满一个月，陪父母走亲访友做体检",
            detail: "弥补距离上的缺憾，亲自把温情与陪伴还给年迈的双亲。",
            reaction: "父母逢年过节拉着你的手舍不得放开，彼此珍惜每一段相处的时光。",
            delta: { kinshipGuilt: -35, happiness: 25, savings: -35000 },
            addTags: ["常伴膝下", "温情相依"]
          }
        ]
      },
      {
        id: "adult_double_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "多元成长与下一代松弛",
        scene: `孩子在当地公立中学健康成长，热爱户外运动与艺术摄影，无需承受千军万马的应试重压。你经营的业务收入稳定，在多元社区里结识了来自各国的挚友，日子过得平静而有滋有味。`,
        type: "milestone",
        naturalDelta: { savings: 150000, happiness: 25 },
        naturalTags: ["家庭和睦", "松弛土壤"],
        reflection: "你用半生的勇敢迁徙，为下一代换取了无需在狭窄赛道里踩踏的从容人生。"
      },
      {
        id: "adult_double_emigrate_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "异邦平静退休与从容晚晴",
        scene: `六十三岁顺利退休，领取当地法定全额养老金。每天在后院打理花草，听着海鸟鸣叫，安享宁静晚年。回望二十七岁那年的孤身出海，你庆幸自己当年勇敢跨出了那一步，在世界一隅找到了心安之所。`,
        type: "milestone",
        naturalDelta: { happiness: 25, resilience: 25 },
        naturalTags: ["异邦归宿", "安然落幕"],
        reflection: "平凡的生命，在辽阔的世界上找到了最心安的归宿。"
      }
    ];
  }

  if (track === "double_non" && chosenPath === "stay") {
    return [
      {
        id: "adult_double_stay_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "民企业务主管与成家立业抉择",
        scene: `在${city}成长型民企升任业务主管或考入事业单位，月薪破万，小有积蓄。面对婚恋成家的现实问题：`,
        type: "choice",
        choices: [
          {
            text: "【按揭首套刚需房成家】在父母帮衬下付了首付买下温馨两居室，步入婚姻",
            detail: "在熟悉的烟火气中安下家来，每月公积金与工资按期还贷，平稳踏实。",
            reaction: "小家庭充满欢声笑语，在熟人社交圈子里过上了安居乐业的市井生活。",
            delta: { happiness: 25, social: 20, savings: -50000 },
            addTags: ["成家立业", "平稳踏实"]
          },
          {
            text: "【稳扎稳打多攒现金】暂缓买房与大额消费，把储蓄放在稳健理财中防身",
            detail: "不让房贷压垮现金流，在企业中踏实积累核心业务客户，提高抗风险壁垒。",
            reaction: "存折储蓄突破十五万，面对生活风浪拥有极高的自主掌控权。",
            delta: { savings: 80000, resilience: 20, inferiority: -10 },
            addTags: ["稳扎稳打", "理性务实"]
          }
        ]
      },
      {
        id: "adult_double_stay_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "中年风浪与家庭主心骨防守",
        scene: `面对35岁职场分水岭，民企面临架构调整，上有老下有小，你成了全家的主心骨：`,
        type: "choice",
        choices: [
          {
            text: "【守住基本盘并拓展副业】下班后与老同学合伙承接线上运营小项目，增加副业收入",
            detail: "起早贪黑勤恳打拼，用两条腿走路的稳健策略为全家筑牢现金防线。",
            reaction: "副业月入数千元，家庭财务抗打击能力大幅增强，从容度过职场阵痛期。",
            delta: { savings: 100000, resilience: 25, health: -5 },
            addTags: ["硬核防守", "中年梁柱"]
          },
          {
            text: "【陪伴家人与孩子教育】守好本职工作，把更多精力投入到陪伴父母与辅导孩子",
            detail: "不盲目攀比富贵，把家常饭菜做热腾，让家庭充满包容与温暖的情感支持。",
            reaction: "后视镜里满是全家周末农家乐的欢声笑语，一家人其乐融融。",
            delta: { happiness: 30, kinshipGuilt: -20, health: 15 },
            addTags: ["家庭温情", "市井知足"]
          }
        ]
      },
      {
        id: "adult_double_stay_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "床前尽孝与手足齐心守望",
        scene: `父亲生病住院，你与兄弟姐妹轮流排班陪护：`,
        type: "choice",
        choices: [
          {
            text: "【手足排班亲自侍奉】白天上班晚上陪床，送汤喂药无微不至，亲力亲为",
            detail: "浓厚的本土手足亲情在这一刻化作最坚实的互助网络，让父母倍感欣慰。",
            reaction: "老人康复出院时全家围坐吃热气腾腾的家常菜，风雨同舟的亲情弥足珍贵。",
            delta: { kinshipGuilt: -35, happiness: 20, resilience: 15 },
            addTags: ["手足互助", "市井深情"]
          },
          {
            text: "【翻新老宅安享晚年】出资牵头将老家老屋改造为舒适的适老化平房，安顿双亲",
            detail: "彻底解决老家水暖与如厕问题，让父母在熟悉的街坊故土上安享清福。",
            reaction: "父母逢人便夸你孝顺懂事，家族长辈皆称赞你有情有义有担当。",
            delta: { savings: -40000, kinshipGuilt: -30, social: 20 },
            addTags: ["老宅重温", "孝悌担当"]
          }
        ]
      },
      {
        id: "adult_double_stay_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "陪考岁月与代际接力",
        scene: `孩子参加高考，你站在考场外的大树下默默等候，递上一瓶温热的矿泉水。恍惚间你想起当年十八岁的自己。孩子懂事地对你笑笑，你感到生命在一代一代踏实地延续。`,
        type: "milestone",
        naturalDelta: { savings: 80000, happiness: 20 },
        naturalTags: ["代际传承", "岁月温情"],
        reflection: "平凡的接力棒稳稳交接，你对得起生活的每一次考验。"
      },
      {
        id: "adult_double_stay_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "市井烟火与含饴弄孙",
        scene: `六十三岁这年办完退休手续，按月领取养老金。清晨去公园遛鸟打拳，傍晚骑着电动车穿过喧闹的菜市场接孙辈放学。邻里街坊熟络亲切，夕阳洒在青石板路上，热气腾腾。`,
        type: "milestone",
        naturalDelta: { happiness: 25, resilience: 20 },
        naturalTags: ["安居乐业", "市井烟火"],
        reflection: "没有惊涛骇浪，只有平凡岁月里的温情与踏实。"
      }
    ];
  }

  if (track === "junior_college" && chosenPath === "emigrate") {
    return [
      {
        id: "adult_college_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "稀缺技术工签立足与蓝领高薪",
        scene: `凭借数控机床、特种焊接或汽修实操绝活，你在海外通过紧缺工种评估拿下高薪技术工签，时薪折合近400元。面对三十岁的长线走向：`,
        type: "choice",
        choices: [
          {
            text: "【冲击特级官方工匠认证】精进数控编程与特种工艺，冲刺当地工会高级技师",
            detail: "成为车间里不可替代的技术权威，享受工会顶级医疗与失业保障。",
            reaction: "厂长当众聘你为年轻技师指导导师，你的收入与地位甚至超过普通白领。",
            delta: { savings: 150000, inferiority: -30, resilience: 20 },
            addTags: ["特级大工", "手艺立足"]
          },
          {
            text: "【组建海外华人施工小队】购置二手工程车与全套设备，承包住宅改装与汽修",
            detail: "凭借中国人能吃苦、讲信誉的特点，在当地华人社区树立过硬口碑，自立门户。",
            reaction: "工程单源源不断，你早早尝到了当实体小老板的甜头，现金滚滚而来。",
            delta: { savings: 180000, social: 25, rebellion: 20 },
            addTags: ["独立匠人", "自立门面"]
          }
        ]
      },
      {
        id: "adult_college_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "独栋平房安居与彻底打破学历偏见",
        scene: `拿下当地官方永久居留权，三十五岁生日，国内曾经看轻专科职教的亲戚打来电话打听近况：`,
        type: "choice",
        choices: [
          {
            text: "【小镇独栋平房置业】在安静的近郊按揭买下带车库的独栋平房，生活规律惬意",
            detail: "下午四点半收工回家修整院子，靠一身真手艺吃遍四方，彻底释怀了学历的包袱。",
            reaction: "邻里工友周末聚在后院喝啤酒烤肉，你活出了蓝领劳动者的最高尊严。",
            delta: { happiness: 30, resilience: 25, inferiority: -30 },
            addTags: ["特级工匠", "扬眉吐气"]
          },
          {
            text: "【兼职技工培训导师】受邀到当地公立职业技术学院兼职授课，传授实操手艺",
            detail: "把中国技工严谨扎实的技术传承下去，赢得了当地学生与社会的广泛赞誉。",
            reaction: "成为受人尊敬的行业导师，社会地位显著提高，打破了所有固化偏见。",
            delta: { social: 30, cognition: 20, happiness: 25 },
            addTags: ["工匠导师", "受人敬仰"]
          }
        ]
      },
      {
        id: "adult_college_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "跨国反哺与老屋重光",
        scene: `老家父母上了年纪，你作为在大洋彼岸站稳脚跟的手艺人：`,
        type: "choice",
        choices: [
          {
            text: "【真金白银反哺故土】汇款十多万元全款翻新老家平房并为父母存足医疗储备金",
            detail: "村里镇上人人提起你都竖大拇指，父母在乡亲面前腰杆挺得笔直。",
            reaction: "父母拿着你的汇款在老家看病修房，晚年衣食无忧，满心都是自豪与宽慰。",
            delta: { savings: -60000, kinshipGuilt: -35, happiness: 25 },
            addTags: ["光耀门楣", "实打实尽孝"]
          },
          {
            text: "【接双亲海外小住体验】为父母办理探亲签证，接他们来异国农场小住半年吹海风",
            detail: "让辛苦了一辈子的普通工人父母亲眼看看世界的辽阔与你奋斗出的宽阔天地。",
            reaction: "父亲摸着你车库里气派的工具车老泪纵横：“好儿女，给老祖宗争脸了！”",
            delta: { savings: -40000, kinshipGuilt: -30, happiness: 30 },
            addTags: ["开阔天伦", "无悔人间"]
          }
        ]
      },
      {
        id: "adult_college_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "技艺传家与下一代从容",
        scene: `孩子在当地公立学校成长，既学会了流利外语，也跟着你在车库里学会了修理机器与动手创作。家庭财务殷实无债，没有课外补习班的疯狂攀比，一家人每年驾车穿越大陆去海滨度假。`,
        type: "milestone",
        naturalDelta: { savings: 200000, happiness: 25 },
        naturalTags: ["技艺传家", "富足无忧"],
        reflection: "双手挣来的基业最坚固，下一代享受着真正自由宽松的成长土壤。"
      },
      {
        id: "adult_college_emigrate_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "悠然工匠荣休与海阔天空",
        scene: `63岁荣休，领着丰厚的工会年金与政府养老金。每天在自家车库里把玩木工和机械，与邻里喝啤酒烤肉，偶尔回国探望老友。一生靠一身真手艺吃遍四方，无愧于天地。`,
        type: "milestone",
        naturalDelta: { happiness: 30, resilience: 30 },
        naturalTags: ["工匠荣休", "传奇生平"],
        reflection: "一技在手，天地皆宽。你用双手铸就了精彩传奇的一生。"
      }
    ];
  }

  // 专科/职教 + 留在国内实体创业
  return [
    {
      id: "adult_college_stay_30",
      age: 30,
      stageName: "三十而立 · 30岁",
      title: "自立门户与实体门店起步",
      scene: `靠着在工厂车间摸爬滚打学到的过硬手艺与良好人缘，你在${city}汽修街或模具街盘下了一间门面。面对起步阶段的运营抉择：`,
      type: "choice",
      choices: [
        {
          text: "【诚信公道做精做细】坚守绝不换假件、价格透明的规矩，扎扎实实做熟客口碑",
          detail: "做事地道公道，虽然起步慢一点，但回头客源源不断，一年下来有了扎实结余。",
          reaction: "老街上的车主和周边工厂都认准你的招牌，铺子经营稳如泰山。",
          delta: { savings: 80000, social: 20, resilience: 20 },
          addTags: ["自立门户", "诚信掌柜"]
        },
        {
          text: "【承接园区批量维保】起早贪黑承接工业园机械设备的巡检与应急抢修外包",
          detail: "吃常人吃不下的苦，24小时随叫随到，快速拿下园区重点企业的定点合作。",
          reaction: "现金流迅速滚大，当年净结余突破十万元，在同行中脱颖而出。",
          delta: { savings: 120000, resilience: 25, health: -5 },
          addTags: ["硬核拼搏", "实业突破"]
        }
      ]
    },
    {
      id: "adult_college_stay_35",
      age: 35,
      stageName: "三十五岁关隘 · 35岁",
      title: "实体老板的底气与乡邻敬重",
      scene: `店铺规模稳步扩大，带了两个技术学徒，在老家县城按揭买了套电梯房，添置了一辆实用的SUV：`,
      type: "choice",
      choices: [
        {
          text: "【传帮带徒扩大产能】系统培养两名技术过硬的徒弟，自己逐步转向统筹与质检",
          detail: "不再单靠出卖个人体力，靠手艺标准与管理把小工坊做成老街排头兵。",
          reaction: "店铺业务从容有序，你的时间更加自由，逢年过节门庭若市备受敬重。",
          delta: { social: 25, savings: 100000, happiness: 20 },
          addTags: ["带徒传艺", "实业有成"]
        },
        {
          text: "【帮扶乡邻排忧解难】老家乡亲谁家机械农具坏了都热心免费调试，积累极佳乡谊",
          detail: "不忘本、接地气，凭借一身好手艺在熟人社会赢得了人人称道的口碑。",
          reaction: "父母逢人便讲你孝顺能干，你在老家赢得了至高声誉与坚实的人情后盾。",
          delta: { social: 30, kinshipGuilt: -25, happiness: 25 },
          addTags: ["乡邻楷模", "积善成德"]
        }
      ]
    },
    {
      id: "adult_college_stay_42",
      age: 42,
      stageName: "四十二岁岁月 · 42岁",
      title: "守在身边的孝道与贴心依靠",
      scene: `父母上了岁数，由于你就在老家开店，只要一个电话，十分钟内就能开车赶到父母身边：`,
      type: "choice",
      choices: [
        {
          text: "【随时在场的床前陪伴】日常就医、买菜、陪护从不假手于人，亲自开车接送照拂",
          detail: "守在故土的最大价值就是风雨来临你在场，给年迈父母最踏实的贴身陪伴。",
          reaction: "父母逢人便欣慰地说：“还是你在身边最贴心，比跑得老远的顶用多了！”",
          delta: { kinshipGuilt: -40, happiness: 25, resilience: 15 },
          addTags: ["贴身尽孝", "寸草春晖"]
        },
        {
          text: "【改善老家全套养老设施】出资为老屋加装全屋适老扶手、地暖、制氧与大额医疗备用金",
          detail: "用自己的双手创造真金白银，让父母晚年生活舒适体面，无后顾之忧。",
          reaction: "父母安享舒适晚年，你用实实在在的手艺饭兑现了对家庭的全部承诺。",
          delta: { savings: -40000, familySavings: 40000, kinshipGuilt: -30, happiness: 25 },
          addTags: ["家业厚实", "至孝担当"]
        }
      ]
    },
    {
      id: "adult_college_stay_52",
      age: 52,
      stageName: "五十二岁荣枯 · 52岁",
      title: "老字号招牌与家业殷实",
      scene: `你的实体门店成了老街上的金字招牌，手艺传给了大徒弟或子女。手里攥着多年积攒的实打实积蓄与稳定客流，生活从容宽裕，喝着茶看店，成了街坊邻里口中人人佩服的老师傅。`,
      type: "milestone",
      naturalDelta: { savings: 150000, social: 25, happiness: 20 },
      naturalTags: ["金字招牌", "家业殷实"],
      reflection: "靠双手挣出的基业最扎实，岁月沉淀下的是踏实的底气。"
    },
    {
      id: "adult_college_stay_63",
      age: 63,
      stageName: "六十三岁退休 · 63岁",
      title: "安享天伦的老街传奇",
      scene: `六十三岁这年，店面正式交给年轻人打理，你在自家小院里摆弄盆景、含饴弄孙。街坊邻里路过都要停下来喊一声“老板好”，递根烟闲聊几句。一生堂堂正正，凭力气吃饭，热热闹闹安享晚年。`,
      type: "milestone",
      naturalDelta: { happiness: 30, resilience: 25 },
      naturalTags: ["老街传奇", "圆满天伦"],
      reflection: "在生你养你的土地上，用一双勤劳的手赢得了人生的圆满与乡邻的尊崇。"
    }
  ];
}

// ============================================================================
// 危机预警检测引擎 (Crisis Detection Engine)
// ============================================================================

export interface CrisisWarning {
  type: "health" | "inferiority" | "poverty";
  title: string;
  desc: string;
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
    id: "ach_zhazhou",
    title: "天命初启",
    description: "在一岁周岁抓周礼上选出你的命定信物",
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

  // ach_zhazhou
  if (tags.some(t => t.includes("抓周") || t.includes("幼苗") || t.includes("商感") || t.includes("工匠天分") || t.includes("天性不羁"))) {
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
