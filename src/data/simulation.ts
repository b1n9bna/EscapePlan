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

  const initialSavingsMap = [0, 200, 800, 1500];
  const initialSavings = initialSavingsMap[parent.wealthIndex] || 200;

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
      id: "age_6_pioneers",
      age: 6,
      stageName: "小学一年级 · 6岁",
      title: "第一批少先队入队仪式与大红领巾",
      scene:
        "新学期少先队入队仪式在全校操场隆重举行。高年级的大队长手捧鲜红的红领巾走到第一排，全班只有五个表现最优异的名额能第一批戴上红领巾，所有人的目光都聚焦在主席台前。",
      type: "choice",
      choices: [
        {
          text: "挺起胸膛目不斜视，大声跟读少先队宣誓词",
          detail: "你把宣誓词背得滚瓜烂熟，如愿第一批戴上大红领巾，全班掌声雷动。",
          reaction: "你小心翼翼把红领巾叠得整整齐齐放进书包，暗自立下了当好学生的志向。",
          delta: { cognition: 15, academicCapital: 15, happiness: 10 },
          addTags: ["少年志气", "争先争优"]
        },
        {
          text: "将多带的一支铅笔借给旁边急哭了的同学",
          detail: "比起台上的荣誉，你更看重身边同伴的难处。",
          reaction: "同学破涕为笑，老师在台下投来赞许的目光，你们成了形影不离的好友。",
          delta: { social: 20, happiness: 15, inferiority: -10 },
          addTags: ["善良同理", "童年挚友"]
        },
        {
          text: "站在队伍最后排安静看着，内心平静波澜不惊",
          detail: "过早拥有了一份超越同龄人的淡然，不热衷于仪式化的追捧。",
          reaction: "你在属于自己的角落里默默观察着集体规则，保全了一份清醒与松弛。",
          delta: { resilience: 10, rebellion: 10, inferiority: -5 },
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
          text: "高高举手快步走上讲台，工整写出答案并算对了附加题",
          detail: "你在全班惊叹的目光中展露出惊人的数字敏感与做题天赋。",
          reaction: "数学老师在你的作业本上画了一朵大红花，当场任命你为数学课代表。",
          delta: { cognition: 20, academicCapital: 20, happiness: 10 },
          addTags: ["算术天才", "展露头角"]
        },
        {
          text: "低头屏住呼吸数手指，暗暗在草稿纸上反复验算",
          detail: "谨慎克制，不愿在成人面前冒任何出错丢脸的风险。",
          reaction: "虽然没有举手，但你在本子上算得全对，内心多了一份笃定的底气。",
          delta: { cognition: 10, resilience: 10, inferiority: 5 },
          addTags: ["沉稳谨慎", "暗中发力"]
        },
        {
          text: "在台下小声把答案告诉了卡壳涨红了脸的同桌",
          detail: "讲义气，懂得在同伴陷入窘境时伸出援手。",
          reaction: "同桌顺利过关，下课后悄悄塞给你一块大白兔奶糖表示感谢。",
          delta: { social: 15, happiness: 10, inferiority: -5 },
          addTags: ["仗义机敏", "结伴同行"]
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
          text: "咽下口水快步走开，去文具摊买下一块带香味的橡皮擦",
          detail: "你用小小的自制力抵御了诱惑，牢牢守住了母亲叮嘱的原则。",
          reaction: "握着干净的新橡皮，你第一次体会到自我克制带来的踏实感。",
          delta: { resilience: 15, cognition: 10, inferiority: -5 },
          addTags: ["克制自律", "早熟自持"]
        },
        {
          text: "买下两张最酷的西游记闪光贴纸贴在课本封面",
          detail: "‘童年就这一次，我也想拥有一张属于自己的漂亮贴纸。’",
          reaction: "课间许多同学凑过来看你的新贴纸，你心里充满小小的雀跃与自豪。",
          delta: { happiness: 15, social: 10, savings: -1 },
          addTags: ["率真童趣", "纯真快乐"]
        },
        {
          text: "和同伴在泥地跳格子打赌，凭高超手艺赢回一大把贴纸",
          detail: "凭身手和聪明劲在街坊孩童中站稳脚跟，不花一分钱。",
          reaction: "你成了校门口的小赢家，同学们纷纷拜你为师学技巧。",
          delta: { social: 20, resilience: 10, happiness: 10 },
          addTags: ["身手敏捷", "街头智慧"]
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
          text: "把书包紧紧护在胸前，冒着暴雨在积水路上一路狂奔回家",
          detail: "像一棵任凭风吹雨打的野草，不怨天尤人，靠双脚冲破风雨。",
          reaction: "虽然浑身湿透，但书包里的课本完好无损。母亲赶紧熬了姜汤把你裹进干棉被里。",
          delta: { resilience: 20, health: -5, happiness: 10 },
          addTags: ["风雨兼程", "野草骨气"]
        },
        {
          text: "邀请同样没伞的同学一起在门卫传达室避雨讲连环画故事",
          detail: "天性豁达开朗，无论身处何种窘境都能找到生活的乐趣。",
          reaction: "看门大爷听得入迷，还给你们倒了两杯热开水，风雨变成了温暖的回忆。",
          delta: { social: 20, happiness: 15, cognition: 10 },
          addTags: ["乐观通达", "逆境生花"]
        },
        {
          text: "父亲顶着暴雨骑着二八大杠赶来，将你塞进雨衣怀里",
          detail: "看着父亲湿透的双肩和雨水混合的汗水，心里充满深深的依恋。",
          reaction: "坐在自行车横梁上贴着父亲温热的胸膛，你感到了无与伦比的安全感。",
          delta: { kinshipGuilt: 15, happiness: 15, health: 5 },
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
          text: "绘声绘色给围拢过来的同学们讲长坂坡单骑救主",
          detail: "表达欲与口才展露无遗，迅速成为全班公认的‘故事大王’。",
          reaction: "同学们听得如痴如醉，连班主任路过也停下脚步笑着听你讲完。",
          delta: { social: 20, cognition: 15, happiness: 15 },
          addTags: ["口才出众", "故事大王"]
        },
        {
          text: "把书收好放回书包，认真把当天的生字笔顺工整抄完",
          detail: "专注克制，把当务之急的学业放在第一位。",
          reaction: "老师将你的字帖贴在教室后黑板展示，夸你‘少年心性定，必成大器’。",
          delta: { academicCapital: 15, cognition: 15, resilience: 10 },
          addTags: ["自律笃定", "严谨求学"]
        },
        {
          text: "大方把连环画借给平日常受冷落孤立的后座同学看",
          detail: "心思细腻，关注着角落里那些沉默的孩子。",
          reaction: "后座同学眼里闪烁着感激的光，默默帮你把弄脏的桌角擦得干干净净。",
          delta: { social: 15, inferiority: -10, happiness: 15 },
          addTags: ["温暖包容", "共情关照"]
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
      id: "age_8_sports",
      age: 8,
      stageName: "小学三年级 · 8岁",
      title: "校运会六十米短跑与全场加油呐喊",
      scene:
        "春季校运会，没有专业跑鞋的你穿着洗得发白的回力球鞋站在跑道起点。发令枪响那一刻，班级看台上敲着搪瓷盆为你声嘶力竭地喊加油。",
      type: "choice",
      choices: [
        {
          text: "咬紧牙关拼命摆臂冲刺，拿下全校第一名为班级争光",
          detail: "心无旁骛，用顽强的爆发力战胜了全校所有的竞争对手。",
          reaction: "班主任和全班同学把你高高抛起，大红奖状印着你的名字贴在黑板正中。",
          delta: { resilience: 20, happiness: 20, health: 10, inferiority: -15 },
          addTags: ["短跑冠军", "扬眉吐气"]
        },
        {
          text: "终点前不慎跌倒擦破手掌，忍痛爬起来坚持跑完全程",
          detail: "就算落后甚至负伤，也绝不在众人注视下放弃退缩。",
          reaction: "全场观众为你响起雷鸣般的掌声，体育老师赞叹‘这孩子有骨气！’",
          delta: { resilience: 25, inferiority: -10, health: -5 },
          addTags: ["坚韧硬骨", "虽败犹荣"]
        },
        {
          text: "赛后把赢来的铅笔奖品分给陪你练全程的同桌好友",
          detail: "把同甘共苦的情谊看得比单打独斗的荣誉更重要。",
          reaction: "好友感动不已，从家里带来珍藏的铁皮青蛙玩具与你分享。",
          delta: { social: 20, happiness: 15 },
          addTags: ["重情重义", "真挚伙伴"]
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
          text: "找了一处向阳的树荫，津津有味吃完并把草地杂物收拾干净",
          detail: "内心坦然，不卑不亢，享受大自然与属于自己的朴素滋味。",
          reaction: "带队老师夸你‘不仅懂事而且爱护环境’，在春游总结班会上特别表扬了你。",
          delta: { happiness: 15, resilience: 15, inferiority: -10 },
          addTags: ["坦然自洽", "文明懂事"]
        },
        {
          text: "大方拿自家土鸡蛋跟同桌交换了一口健力宝尝鲜",
          detail: "善于沟通交流，用大方的性格打破家庭物质的隔阂。",
          reaction: "同桌赞叹你家的土鸡蛋比超市买的香得多，两人开怀大笑。",
          delta: { social: 20, happiness: 15 },
          addTags: ["爽朗大度", "人际融洽"]
        },
        {
          text: "主动帮老师搬运急救医药箱和大水壶，走在队伍最前面领路",
          detail: "眼里有活，用踏实勤快赢取大人们的一致赞赏。",
          reaction: "老师奖励了你一枚小红花胸章，夸你‘是个能担当的大孩子’。",
          delta: { social: 15, resilience: 10, academicCapital: 5 },
          addTags: ["勤快担当", "师长喜爱"]
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
          text: "仅用一支铅笔精细素描出家乡的麦浪与高耸的大烟囱",
          detail: "不受器材限制，凭借极其敏锐的观察力与笔触构图打动评委。",
          reaction: "你的画作斩获市级二等奖并刊登在当地晚报上，全校师生刮目相看。",
          delta: { cognition: 25, academicCapital: 15, inferiority: -15 },
          addTags: ["天生画匠", "以素胜彩"]
        },
        {
          text: "礼貌向同桌借用红黄两色，认真给画里的太阳与小红花着色",
          detail: "进退有度，懂得合理借助外部资源完成目标。",
          reaction: "同桌大方把整盒笔推给你共用，你们共同完成了迎春画卷。",
          delta: { social: 15, happiness: 15, inferiority: -5 },
          addTags: ["进退有度", "协作共赢"]
        },
        {
          text: "利用午休时间主动承担了班级后黑板报的全部插画设计",
          detail: "把画画的才能奉献给集体，把黑板装点得赏心悦目。",
          reaction: "班级在全校黑板报评比中斩获总冠军，你的名字被写在板报落款处。",
          delta: { social: 20, resilience: 15, happiness: 10 },
          addTags: ["班级骨干", "集体荣誉"]
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

};

// ============================================================================
// 动态多剧情时间线生成引擎（深度融合地域、医院、学校与时序同胞因果）
// ============================================================================

export function generateTimelineForCharacter(
  family: FamilyOrigin,
  _gender: "男" | "女"
): LifeEventNode[] {
  const result: LifeEventNode[] = [];

  // 仅生成 0 ~ 18 岁（童年到高考）：19~27岁成人职场由高考分流引擎精准赋予，彻底杜绝混入错误分轨剧本！
  for (let age = 0; age <= 18; age++) {
    // 0岁：严格契合出生地医院与生活区，绝不出现“地级市生活区却在县医院出生”的矛盾
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

    // 3岁：若配置了三年后添弟或添妹，精准在此年龄节点触发降生事件，因果完全闭环！
    if (age === 3 && family.siblingType === "younger_brother") {
      result.push({
        id: "age_3_younger_brother",
        age: 3,
        stageName: "幼儿期 · 3岁",
        title: "添弟之喜与悄然倾斜的天平",
        scene: `三岁这年深秋，母亲在${family.hospitalName}为你添了一个弟弟。全家人围着襁褓团团转，爷爷奶奶笑逐颜开。父亲在走廊给亲友分发红鸡蛋与喜糖；母亲虚弱地揽着你轻声叮嘱：“你做姐姐了，以后要懂事，多让着弟弟。”你踮起脚尖看着摇篮里那个红皱皱的小婴儿，第一次隐约体会到了家里重心的转移。`,
        type: "natural",
        naturalDelta: { inferiority: 10, kinshipGuilt: 15, resilience: 10 },
        naturalTags: ["家中添弟"]
      });
      continue;
    }

    if (age === 3 && family.siblingType === "younger_sister") {
      result.push({
        id: "age_3_younger_sister",
        age: 3,
        stageName: "幼儿期 · 3岁",
        title: "添妹之喜与全家的欢欣",
        scene: `三岁这年深秋，母亲在${family.hospitalName}为你添了一个妹妹。小小的病房里摆满了亲友送来的婴儿衣物，母亲虚弱地将妹妹抱给你看：“看，这是你的小妹妹。”你伸出小手碰了碰她粉嫩的脸蛋，家里从此多了一份轻柔的欢声笑语。`,
        type: "natural",
        naturalDelta: { happiness: 10, kinshipGuilt: 10 },
        naturalTags: ["家中添妹"]
      });
      continue;
    }

    const pool = AGE_EVENT_POOLS[age];
    if (!pool || pool.length === 0) continue;

    // 彻底告别单调剧本！每次投胎全年龄段真随机抽取，保证剧情极其丰富丰富丰富！
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex] || pool[0];

    // 动态置换场景中的医院、学校与具体称谓，保持极致沉浸
    let resolvedScene = selected.scene
      .replace(/\{hospital\}/g, family.hospitalName)
      .replace(/\{cityOrCounty\}/g, family.cityOrCounty)
      .replace(/\{primarySchool\}/g, family.primarySchoolName)
      .replace(/\{highSchool\}/g, family.highSchoolName);

    if (family.region.includes("市") || family.region.includes("矿") || family.region.includes("区")) {
      resolvedScene = resolvedScene
        .replace(/县医院/g, family.hospitalName)
        .replace(/县一中/g, family.highSchoolName)
        .replace(/县实验小学/g, family.primarySchoolName);
    }

    const resolvedSiblingName = family.siblingType.includes("brother")
      ? "弟弟"
      : family.siblingType.includes("sister")
      ? "妹妹"
      : "同胞";
    resolvedScene = resolvedScene.replace(/\{sibling\}/g, resolvedSiblingName);

    result.push({
      ...selected,
      scene: resolvedScene
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
        stageName: "职场第3年/硕士毕业 · 24岁",
        title: "存折上的十多万积蓄与硕士求职丰收",
        scene:
          "二十四岁这一年，存折里的数字稳稳跨过了十五万元大关；硕士生也迎来了秋招顺利签约。然而伴随而来的，是日复一日的代码与会议带来的疲惫，以及父母在电话里关切的成家买房话题。",
        type: "choice",
        choices: [
          {
            text: "硕士毕业签约头部知名科技企业正规研发Offer（年薪30W~38W，核心研发工位）",
            detail: "凭借985硕士学历与扎实科研履历，在竞争激烈的校招中稳稳拿下心仪的正式岗位。",
            reaction: "年终带薪入职，在城市核心科技园区有了属于自己的正式工位与稳定社保。",
            delta: { savings: 40000, cognition: 20, inferiority: -15 },
            addTags: ["名校硕士就业", "稳健入局"]
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

export function generateCareerTimeline(
  family: FamilyOrigin,
  degreeTrack: "985_211" | "double_non" | "junior_college",
  _extraTags: string[] = []
): LifeEventNode[] {
  const trackPool = CAREER_EVENTS_BY_TRACK[degreeTrack] || CAREER_EVENTS_BY_TRACK["double_non"];
  const result: LifeEventNode[] = [];

  for (let age = 19; age <= 27; age++) {
    const ageEvents = trackPool[age];
    if (!ageEvents || ageEvents.length === 0) continue;

    const randomIndex = Math.floor(Math.random() * ageEvents.length);
    const selected = ageEvents[randomIndex] || ageEvents[0];

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
    initialSavings: 200
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
// 成人中后期宏大人生里程碑生成引擎（28 ~ 63 岁：完全契合学历与命运选择）
// ============================================================================

export function generateAdultMilestones(
  track: "985_211" | "double_non" | "junior_college",
  chosenPath: "emigrate" | "stay",
  family: FamilyOrigin
): LifeEventNode[] {
  const city = family.cityOrCounty || "省城";

  if (track === "985_211" && chosenPath === "emigrate") {
    return [
      {
        id: "adult_985_emigrate_30",
        age: 30,
        stageName: "三十而立 · 30岁",
        title: "海外研发核心与全球技术视野",
        scene: `走向海外的第三年，凭借985扎实的技术底蕴与顶级工程能力，你在海外科技枢纽（硅谷/温哥华/慕尼黑）研发中心主导大规模高并发底层架构。年薪换算折合超45万人民币，租下距海湾半小时车程的联排居所。这里没有无意义的繁琐酒局，周末在峡湾边骑行或参与开源社区交流。手头外币储蓄稳步突破五十万大关。`,
        type: "milestone",
        naturalDelta: { savings: 200000, cognition: 25, happiness: 20, resilience: 15 },
        naturalTags: ["海外核心架构", "资本原始积累"],
        reflection: "你脱离了熟人社会的攀比与形式主义，在纯粹的技术与规范契约中找到了专注的从容。"
      },
      {
        id: "adult_985_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "永久居留获批与研发黄金期",
        scene: `三十五岁生日这周，你的永久居留资格（绿卡/枫叶卡/欧盟蓝卡）正式获批，并晋升为资深高级工程师并享有带薪年假。在当地职场文化中，三十五岁正是研发工程师的黄金成熟期，无人以年龄卡人，工龄与经验受到高度敬重。你购置了带花园的永久产权住宅，在暖阳照拂的院子里栽下了第一棵枫树。`,
        type: "milestone",
        naturalDelta: { savings: 400000, resilience: 25, happiness: 25 },
        naturalTags: ["海外永居落地", "免受年龄焦虑"],
        reflection: "当同龄人在国内面临35岁优化焦虑时，你手握稀缺技术与永居身份，拥有了免于恐惧的从容自由。"
      },
      {
        id: "adult_985_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "跨洋牵挂与血亲就医托底",
        scene: `老家父亲突发急症住院，你第一时间请假并订购最快班次的跨洋机票。在${city}三甲医院，你用丰厚的外币积蓄请到了最好的特护与医疗照护，握着父亲枯瘦的手度过了危险期。虽远隔重洋有身不由己的遗憾，但你雄厚的财力为双亲撑起了最体面的托底。父亲出院后轻叹：“你在外面过得硬实，爹就安心了。”`,
        type: "milestone",
        naturalDelta: { savings: -90000, kinshipGuilt: 15, resilience: 20 },
        naturalTags: ["跨洋反哺", "至孝托底"],
        reflection: "跨洋移居终究要面对距离的遗憾，但你用强大的经济实力为双亲撑起了最体面的医疗托底。"
      },
      {
        id: "adult_985_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "下一代跨文化成长与超脱心境",
        scene: `你的孩子在海外名校攻读前沿科学，思维敏捷，自信松弛，讲一口纯正母语与流利外语。晚餐桌上，他以平等的姿态与你探讨全球经济与AI哲学。你看着眼前这个完全免受应试规训的下一代，彻底释怀了东亚家庭过度的代际焦虑，微笑着收回了干涉的手。`,
        type: "milestone",
        naturalDelta: { savings: 350000, happiness: 25, cognition: 20 },
        naturalTags: ["下一代松弛", "跨文化超脱"],
        reflection: "你用一代人的跨洋跋涉，彻底斩断了匮乏与攀比的代际循环，给孩子换来了辽阔的选择权。"
      },
      {
        id: "adult_985_emigrate_63",
        age: 63,
        stageName: "六十三岁退休 · 63岁",
        title: "全球双重年金与无憾生平",
        scene: `六十三岁这年，你按期办理了国际双重年金与海外法定退休。海风拂过宽敞的向阳露台，你卡内折合储蓄超三百万人民币，享有全额医疗覆盖。偶尔受邀回国给母校学弟学妹开展学术讲座，与旧友举杯畅叙半生沧桑。世界之大，你完完整整走出了属于自己的传奇篇章。`,
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
        title: "行业中层核心与省城立足",
        scene: `三十而立，凭借985学历底蕴与踏实的技术业务交付，你在部门晋升为资深技术骨干或在省直机关提任为科室副科级业务中坚。在${city}较好地段用公积金和积蓄付了首付购置了温馨住房。存折结余二十多万元，工作安稳体面，成为父母在亲友面前最放心的依靠。`,
        type: "milestone",
        naturalDelta: { savings: 120000, social: 20, cognition: 20 },
        naturalTags: ["业务中坚", "省城立足"],
        reflection: "熟人社会的规则虽繁复，但凭借过硬的专业能力，你稳稳站住了脚跟。"
      },
      {
        id: "adult_985_stay_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "风浪中的定海神针与硬核壁垒",
        scene: `面对经济周期调整与行业降本增效，不少边缘团队被重组裁撤，而你凭借不可替代的底层核心技术壁垒或扎实政绩稳坐钓鱼台，甚至逆势主导了省级重点产业攻坚专项。老家父母逢人便夸你的出息，亲友街坊上门求助，你处变不惊，展现出领军骨干的沉着。`,
        type: "milestone",
        naturalDelta: { savings: 300000, resilience: 25, inferiority: -20 },
        naturalTags: ["定海神针", "核心壁垒"],
        reflection: "985的金字招牌与多年心血构建了最坚固的护城河，你在激流之中稳稳立住阵脚。"
      },
      {
        id: "adult_985_stay_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "熟人资源网络与病榻前尽孝",
        scene: `父亲年逾古稀突发重疾，你通过多年积累的本地三甲医院医疗网络，迅速协调到了专家病房与顶尖手术团队。下班后你亲自开车在医院照料看护，送汤喂药。父亲拉着你的手老泪纵横：“多亏你在跟前撑着，咱们全家这辈子踏实！”`,
        type: "milestone",
        naturalDelta: { savings: -60000, kinshipGuilt: -25, happiness: 25 },
        naturalTags: ["床前尽孝", "家族基石"],
        reflection: "留在家乡的意义在这一刻尽显：不仅有事业的体面，更能亲手守住亲人的晚年安康。"
      },
      {
        id: "adult_985_stay_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "认知赋能与下一代名校传承",
        scene: `你的孩子面临高考与大学选拔。得益于你多年在省城积累的深厚认知与精准视野，你为孩子提供了极具前瞻性的学业与志愿规划，孩子顺利保送至顶尖双一流名校。两代人的知识改变命运在这一刻完成闭环，家族阶层稳步夯实。`,
        type: "milestone",
        naturalDelta: { savings: 250000, social: 25, happiness: 25 },
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
        title: "跨越学历门槛与第一笔外币储蓄",
        scene: `靠着毕业前几年的自考语言与职业技术认证，你成功在海外换取了正式工作签证。在当地综合企业担任业务管理或技术支持。虽然国内求职常看第一学历，但在这里没人打听你的高考分数，只看你的执行力与踏实作风。卡内外币存款折合超25万人民币。`,
        type: "milestone",
        naturalDelta: { savings: 100000, cognition: 20, happiness: 20 },
        naturalTags: ["打破学历枷锁", "外币立足"],
        reflection: "只要换一个赛道，普通人也能彻底摆脱唯学历论的窒息感。"
      },
      {
        id: "adult_double_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "永居落地与摆脱35岁魔咒",
        scene: `成功拿下海外永久居留身份，在距市中心半小时车程的小镇贷款买下一栋带草坪的木屋。每天下午5点准时下班，后备箱装着露营帐篷。周末带着全家去郊野湖畔野餐，周围邻里友善互助。你终于确信：在这里，没有人会因为你年满35岁就催促你下岗。`,
        type: "milestone",
        naturalDelta: { savings: 160000, resilience: 25, inferiority: -20 },
        naturalTags: ["永居落地", "从容松弛"],
        reflection: "尊重契约与平等的环境，让你重新找回了身为普通劳动者的松弛与尊严。"
      },
      {
        id: "adult_double_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "关山难越与跨洋亲情托底",
        scene: `国内老家父母上了岁数，你定期汇款资助弟弟妹妹照料父母，并每两年回国探亲一次。看着老屋被翻修一新，父母拿着你寄回的外币在亲友面前有了底气。尽管偶尔思乡，但你给两代人撑起了一片新的天空。`,
        type: "milestone",
        naturalDelta: { savings: -50000, kinshipGuilt: 15, happiness: 20 },
        naturalTags: ["跨洋汇款", "两地安心"],
        reflection: "虽然背井离乡，但你的担当让大洋两端都拥有了平静与宽慰。"
      },
      {
        id: "adult_double_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "多元成长与下一代松弛",
        scene: `孩子在当地公立中学健康成长，热爱户外运动与艺术摄影，无需承受中高考模拟考的千军万马重压。你经营的业务收入稳定，在多元社区里结识了来自各国的挚友，日子过得平静而有滋有味。`,
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
        title: "民企业务骨干与成家立业",
        scene: `经过数年职场摸爬滚打，你在${city}民企升任业务主管或考入了市级事业单位。在父母帮衬下按揭了首套房，每月还贷稳稳当当。过年回家拎着大包小包年货，在熟人圈子里过着平稳踏实的日子。`,
        type: "milestone",
        naturalDelta: { savings: 60000, social: 20, resilience: 15 },
        naturalTags: ["成家立业", "平稳踏实"],
        reflection: "虽然免不了日常琐碎，但在熟悉的烟火气里，你找到了属于普通人的确定感。"
      },
      {
        id: "adult_double_stay_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "顶住风浪的中坚防守",
        scene: `面对35岁的职场分水岭，你用多年积累的为人处世经验和勤勉守住了阵地。上有老下有小，你成了全家的主心骨。周末开车载着父母妻儿去郊区农家乐，看着后视镜里的欢声笑语，觉得一切辛苦都值得。`,
        type: "milestone",
        naturalDelta: { savings: 80000, kinshipGuilt: -10, resilience: 20 },
        naturalTags: ["家庭支柱", "中年坚守"],
        reflection: "成年人的世界虽不轻松，但你的肩膀扛起了遮风挡雨的港湾。"
      },
      {
        id: "adult_double_stay_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "床前尽孝与手足互助",
        scene: `父亲生病住院，你与兄弟姐妹轮流排班陪护，送汤喂药，无微不至。同乡医生和老同学帮了不少忙。虽然忙碌得瘦了一圈，但父亲康复出院时，一家人齐聚一堂吃了顿热气腾腾的家常菜。`,
        type: "milestone",
        naturalDelta: { savings: -40000, kinshipGuilt: -25, happiness: 20 },
        naturalTags: ["手足互助", "市井深情"],
        reflection: "本土熟人社会的温情在困难时刻化作了最实打实的支撑。"
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
        title: "稀缺技术工签立足与高薪蓝领",
        scene: `凭借一手过硬的数控机床、特种焊接或汽修实操绝活，你通过紧缺工种评估在海外拿下了高薪技术工签。当地极度紧缺一线熟练技师，时薪折合人民币近400元。开上了二手皮卡，在当地工会受到高度尊重。`,
        type: "milestone",
        naturalDelta: { savings: 180000, inferiority: -30, happiness: 25 },
        naturalTags: ["海外高薪蓝领", "手艺立足"],
        reflection: "在这里，劳动者的双手被真正敬重，你用手艺换来了前所未有的尊严。"
      },
      {
        id: "adult_college_emigrate_35",
        age: 35,
        stageName: "三十五岁关隘 · 35岁",
        title: "特级工匠认证与永久居留",
        scene: `拿下当地官方特级工匠认证与永久居留权，成为车间技术骨干导师。在当地按揭买下一栋安静舒适的独栋平房，生活规律惬意。国内那些曾经看轻专科职教的亲友纷纷投来敬佩的目光。`,
        type: "milestone",
        naturalDelta: { savings: 200000, resilience: 25, happiness: 25 },
        naturalTags: ["特级工匠", "扬眉吐气"],
        reflection: "凭真本事吃饭，走遍天下都不怕。你彻底扭转了人生的底层剧本。"
      },
      {
        id: "adult_college_emigrate_42",
        age: 42,
        stageName: "四十二岁岁月 · 42岁",
        title: "跨国反哺与老屋重光",
        scene: `你给老家父母汇去十多万元积蓄，不仅给父母治好了多年的慢性病，还翻修了老家住房并给父母买了充足的医疗保障。老家村里镇上亲友提起你都竖大拇指，父母在乡亲面前腰杆挺得笔直。`,
        type: "milestone",
        naturalDelta: { savings: -40000, kinshipGuilt: -30, happiness: 25 },
        naturalTags: ["老屋重光", "光宗耀祖"],
        reflection: "远行的游子用实打实的成就，给两代人的故土守望换回了最高的荣光。"
      },
      {
        id: "adult_college_emigrate_52",
        age: 52,
        stageName: "五十二岁荣枯 · 52岁",
        title: "技艺传家与下一代从容",
        scene: `孩子在当地公立学校成长，既学会了流利外语，也跟着你在车库里学会了修理机器与动手创作。家庭财务殷实无债，没有课外补习班的疯狂攀比，一家人每年驾车穿越大陆去海滨度假。`,
        type: "milestone",
        naturalDelta: { savings: 250000, happiness: 25 },
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
      scene: `靠着在工厂车间摸爬滚打学到的过硬手艺与良好人缘，你在${city}汽修街盘下了一间门面，成立了自己的维修工坊或模具实体店。凭着做事地道公道，客户源源不断，一年下来有了稳定扎实的结余。`,
      type: "milestone",
      naturalDelta: { savings: 80000, social: 20, resilience: 20 },
      naturalTags: ["自立门户", "实体老板"],
      reflection: "不做坐吃山空的打工人，自己的一双手就是最稳妥的印钞机。"
    },
    {
      id: "adult_college_stay_35",
      age: 35,
      stageName: "三十五岁关隘 · 35岁",
      title: "实体老板的底气与乡邻敬重",
      scene: `店铺规模稳步扩大，带了两个技术学徒，在老家县城按揭买了套电梯房，添置了一辆实用的SUV。逢年过节门庭若市，亲戚邻里谁家机械车辆有故障都来找你，父母逢人便讲你手艺好、能干，在熟人社会受尽敬重。`,
      type: "milestone",
      naturalDelta: { savings: 100000, inferiority: -25, happiness: 25 },
      naturalTags: ["实体掌柜", "乡邻敬重"],
      reflection: "凭手艺和勤奋站稳脚跟，生活热气腾腾，活出了最接地气的尊严。"
    },
    {
      id: "adult_college_stay_42",
      age: 42,
      stageName: "四十二岁岁月 · 42岁",
      title: "守在身边的孝道与贴心依靠",
      scene: `父母上了岁数，由于你就在老家开店，只要一个电话，十分钟内就能开车赶到父母身边。日常就医、买菜、陪护从不假手于人。父母常欣慰地说：“还是你在身边最贴心，比那些跑得老远的顶用多了。”`,
      type: "milestone",
      naturalDelta: { savings: 60000, kinshipGuilt: -30, happiness: 25 },
      naturalTags: ["贴身尽孝", "知足长乐"],
      reflection: "守在故土的一方天地，给父母最踏实的陪伴，这就是最踏实的幸福。"
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
// 63 岁终局一生判词（深度契合学历阶层与命运抉择）
// ============================================================================

export interface LifetimeVerdict {
  summaryTitle: string;
  verdictText: string;
  tagline: string;
}

export function generateFinalLifetimeVerdict(
  path: "emigrate" | "stay",
  track: "985_211" | "double_non" | "junior_college" = "double_non",
  _attrs: CharacterAttributes,
  _tags: string[] = []
): LifetimeVerdict {
  if (path === "emigrate") {
    if (track === "985_211") {
      return {
        summaryTitle: "【全球卓越 · 拓疆智者】",
        tagline: "“以才智立身四海，天地辽阔，皆为舞台。”",
        verdictText:
          "你凭借顶尖的名校才识与硬核技术，勇敢迈出国门。在尊重专注与技术创新的广阔天地中，你主导前沿工程，积攒下丰厚资产，彻底远离了狭窄赛道的内卷与年龄焦虑。虽偶有跨洋对故土的思念，但你用一生的从容与豁达，为自己和后代开辟了一条宽广无比的人生航道。"
      };
    }
    if (track === "junior_college") {
      return {
        summaryTitle: "【特级工匠 · 异邦尊荣】",
        tagline: "“一技在手走天下，靠真本领赢得无上尊重。”",
        verdictText:
          "你在年轻时就认准了实用手艺的千钧力量。走向海外后，你在尊重技术工人的社会里大放异彩。你的一双手创造了丰厚的外币资产与宽敞的居所，彻底击碎了偏见与学历牢笼。你活出了蓝领劳动者的最高尊严，用一把焊枪与机床在世界上刻下了自豪的名字。"
      };
    }
    return {
      summaryTitle: "【开阔行者 · 自由立身】",
      tagline: "“告别既定轨道，在辽阔人间找寻真正的自我。”",
      verdictText:
        "二十七岁那年你毅然斩断了沉闷的内卷循环，跨洋开拓属于自己的生活。在异国多元包容的土地上，你用诚实的工作赢得了体面的住所与内心的松弛。没有了唯学历论的束缚与过度的人情消耗，你活出了真正属于自己的节奏，平静而丰盈。"
    };
  } else {
    // 留在国内
    if (track === "985_211") {
      return {
        summaryTitle: "【中流砥柱 · 德隆望尊】",
        tagline: "“深耕厚土成大器，泽被家族，无愧今生。”",
        verdictText:
          "你选择留在生你养你的厚重土地。凭借名校基石与卓越实干，你在行业与体制中步步为营，成为了不可替代的中流砥柱。你为家庭提供了最坚固的庇护，在父母病榻前尽到了贴身侍奉的至孝，也为下一代搭建了稳固高耸的阶梯。你这一生深沉厚重，在熟悉的人间烟火中赢得了无上尊严。"
      };
    }
    if (track === "junior_college") {
      return {
        summaryTitle: "【实业掌柜 · 乡邻楷模】",
        tagline: "“凭良心做手艺，守在故土，热气腾腾赢尽赞誉。”",
        verdictText:
          "你没有被坐办公室的虚名所累，凭借过硬实操与诚信经营，在生养你的家乡打拼出了属于自己的实体基业。你是老街上人人称道的技术行家，更是父母床前随叫随到的坚强依靠。你凭一双手挣出了真金白银与堂堂正正的声望，热热闹闹、心满意足地度过了一生。"
      };
    }
    return {
      summaryTitle: "【市井梁柱 · 踏实无悔】",
      tagline: "“肩挑岁月风雨，脚踏实地，自有人间至味。”",
      verdictText:
        "你留在了这片熟人温厚的土地上。面对生活的每一次风雨挑战，你用普通人最可贵的勤勉与韧性稳稳接招。你在职场中守住了尊严，在父母身边尽到了孝心，在柴米油盐中守护了小家的温暖。你这一生平凡而坚韧，热气腾腾，是一切美好生活的坚实脊梁。"
    };
  }
}

// Legacy export for compatibility
export const PARALLEL_LIVES_MILESTONES = [];
