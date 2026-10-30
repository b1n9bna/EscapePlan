// ============================================================================
// ESCAPEPLAN LIFE SIMULATION ENGINE
// 逃跑计划 · 中国式命运交互电影数据模型
// ============================================================================

export interface FamilyOrigin {
  region: string;
  regionDetail: string;
  fatherAge: number;
  fatherJob: string;
  fatherTrait: string;
  motherAge: number;
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
  inferiority: number; // 自卑创伤 (0: 极其坦荡, 100: 极度自卑敏感)
  academicCapital: number; // 做题应试资本 (0: 毫无兴趣, 100: 顶尖做题机器)
  kinshipGuilt: number; // 宗族愧疚与重负 (0: 毫无包袱, 100: 负罪爆表)
  rebellion: number; // 独立与叛逆 (0: 规矩温顺, 100: 独立自主)
  resilience: number; // 生存韧劲与手腕 (0: 脆弱娇嫩, 100: 野草百炼成钢)
  savings: number; // 现金储蓄 (RMB)
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
  choices: LifeChoice[];
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
    cultureDistance: "东亚文化同源，表面冷漠客气，适合不喜社交的个体"
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
    cultureDistance: "老牌移民国，包容度高，耐得住寂寞与暴雪"
  },
  {
    id: "thailand",
    name: "泰国",
    flag: "🇹🇭",
    city: "清迈 · 宁曼路周边",
    tagline: "低成本避风港、慢节奏疗愈、长期签证需技巧、适合自由职业",
    costDesc: "初始启动金约 3~5 万 RMB",
    cultureDistance: "佛教包容文化，物价低廉，不能直接打普通工"
  }
];

// ============================================================================
// 原生家庭多轴矩阵数据库
// ============================================================================

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
    region: "闽南沿海侨乡商贸镇",
    landscape: "金碧辉煌祖祠 · 渔港码头 · 走私旧闻",
    tagline: "满街小洋楼，暗地里比拼谁家寄回来的外汇存折多",
    icon: "⚓"
  },
  {
    region: "中西部省会边缘工薪区",
    landscape: "老破小步梯顶楼 · 补习班招牌 · 菜市场喧闹",
    tagline: "两代人按揭一套老房子，极其害怕孩子阶层跌落",
    icon: "🏢"
  },
  {
    region: "超一线城市城中村窄巷",
    landscape: "握手楼潮湿隔断 · 空调外机滴水 · 霓虹倒影",
    tagline: "抬头是CBD摩天玻璃，脚下是见不到阳光的潮湿握手楼",
    icon: "🌆"
  }
];

const HOUSING_TEMPLATES = [
  "县农机局家属院步梯5楼顶层，68㎡老两居，下雨天楼道泛潮渗水，窗外正对着街道喧闹的粮油小卖部。",
  "村头自建两层红砖半毛坯平房，院里堆着麦秸秆与农用三轮车，冬日无暖气全靠堂屋生蜂窝煤炉子。",
  "重工业老厂区建于1986年的筒子楼单间，32㎡公用卫生间与水房，楼道里常年弥漫着各家炸花椒油的刺鼻烟气。",
  "浙东工业强镇自建带底商的三层小楼，底层堆满注塑塑料粒子和包装纸箱，二层是油腻逼仄的家庭起居室。",
  "中西部省城郊区按揭购入的步梯顶楼老破小，54㎡两室一厅，墙皮局部剥落，父母长年舍不得开空调。",
  "超一线城中村握手楼夹层单间，不见阳光，窗户推开距离隔壁邻居墙壁不足一米，整夜听着水管噪音。",
  "沿海渔村依山而建的老石屋，海风带着咸湿腐蚀着老旧木窗，逢台风天全家人必须拿沙袋堵门。"
];

const WEALTH_TIERS = [
  {
    tier: "紧绷脆弱（经不起老人一场大病）",
    detail: "家里平时能勉强吃饱穿暖，但活期存折上常年不足两万元，全靠父母手停口停的零工按月维持。"
  },
  {
    tier: "体制微薄稳定（安稳但无大钱）",
    detail: "双亲每月有固定薪水与医保托底，过年能分到粮油米面，但供完柴米油盐与人情走动后所剩无几。"
  },
  {
    tier: "现金流尚可（但极易被风浪吞噬）",
    detail: "家里做着微薄小生意或开摊档，手头有几万块周转现金，但一旦遭遇拆迁、行情下跌或三角债便面临破产。"
  },
  {
    tier: "留守匮乏（靠微薄汇款苦熬）",
    detail: "父母在外打工长年按月汇回八百一千块，全家老小精打细算，一分钱掰成两半花。"
  }
];

const PARENT_PROFILES = [
  {
    fatherJob: "县自然资源局普通科员",
    fatherAge: 42,
    fatherTrait: "老烟枪，性格木讷，信奉仕途与编制，最恨子女做出格出格的事",
    motherJob: "公立小学语文高级教师",
    motherAge: 39,
    motherTrait: "掌管家里账本，精打细算，习惯推行高压军事化背诵与作息",
    housingIndex: 0,
    wealthIndex: 1
  },
  {
    fatherJob: "农贸市场生肉摊档主",
    fatherAge: 45,
    fatherTrait: "满手刀茧与冻疮，说话大嗓门，信奉真金白银与实利，鄙夷读死书",
    motherJob: "农贸市场活禽摊打理人",
    motherAge: 43,
    motherTrait: "腰椎长年劳损，起早贪黑理零钞，一分钱都想留给孩子念书",
    housingIndex: 1,
    wealthIndex: 2
  },
  {
    fatherJob: "东莞五金模具厂冲压工",
    fatherAge: 40,
    fatherTrait: "手指缺了半截指甲，长年住工厂铁架床，每次打电话只懂问‘钱够不够’",
    motherJob: "同厂流水线质检员",
    motherAge: 38,
    motherTrait: "逢年过节才拎着特产回乡，满怀无法陪伴你的愧疚与小心翼翼",
    housingIndex: 1,
    wealthIndex: 3
  },
  {
    fatherJob: "下岗自谋职业开黑车/跑网约车",
    fatherAge: 46,
    fatherTrait: "头发花白，经历了老国企破产的阵痛，一身烟酒气与未竟翻盘的执念",
    motherJob: "清晨早市油炸面点摊摊主",
    motherAge: 44,
    motherTrait: "凌晨三点揉面炸油条，双手满是烫痕，逢人便夸你‘脑子好使一定能翻身’",
    housingIndex: 2,
    wealthIndex: 0
  },
  {
    fatherJob: "乡镇卫生院全科内科大夫",
    fatherAge: 44,
    fatherTrait: "一身洗得发白的白大褂，性情清贫高傲，把名声和家族体面看得比命还大",
    motherJob: "乡初中初二英语教导员",
    motherAge: 42,
    motherTrait: "极度严格，容不得试卷上出现任何一处粗心红叉，同辈压力极大",
    housingIndex: 0,
    wealthIndex: 1
  },
  {
    fatherJob: "破产服装厂前老板（现开菜鸟驿站）",
    fatherAge: 47,
    fatherTrait: "见过上百万的现金体面，后来背了债务缩在库房理件，总爱吹嘘当年人脉",
    motherJob: "社区团购团长兼杂货店店主",
    motherAge: 43,
    motherTrait: "疲于奔命对账，整天被缺货催单电话逼得焦头烂额，脾气极度急躁",
    housingIndex: 4,
    wealthIndex: 0
  },
  {
    fatherJob: "建筑工地铁架泥瓦工师傅",
    fatherAge: 43,
    fatherTrait: "风湿骨痛，年底最怕包工头卷款跑路，逢年过节坐在门槛上闷头抽烟袋",
    motherJob: "老家留守务农母亲",
    motherAge: 41,
    motherTrait: "一人操持四亩麦田与几头猪，省吃俭用把全家鸡蛋全塞给你带去学校",
    housingIndex: 1,
    wealthIndex: 3
  },
  {
    fatherJob: "省城高校后勤水电维修班长",
    fatherAge: 42,
    fatherTrait: "见惯了象牙塔教授名流的优渥，深知阶层落差，逼你必须考进重点高校",
    motherJob: "市立三甲医院合同制护士长",
    motherAge: 40,
    motherTrait: "三班倒常年缺觉，说话干脆利落但带着神经性焦虑，催你‘争气点’",
    housingIndex: 4,
    wealthIndex: 1
  }
];

const SIBLINGS_PROFILES = [
  {
    siblings: "独生子女（独享亦独扛）",
    detail: "父母将所有关注与资源倾注在你身上，但未来老人的照护、医疗和养老没有任何同胞替你分担。"
  },
  {
    siblings: "重男轻女家庭的长姐（下有小5岁的弟弟）",
    detail: "从小被灌输“做姐姐要有担当”，过年新衣服永远优先弟弟，心里常年扎着一根不被看见的刺。"
  },
  {
    siblings: "夹心层的二儿子/二女儿",
    detail: "老大备受器重，老幺备受娇宠，你夹在中间如同隐形人，最早就学会了察言观色与独自消化委屈。"
  },
  {
    siblings: "长兄为父（下有正读中学的妹妹）",
    detail: "母亲常年病弱，父亲在外打工，你早早就学会了做饭和照看妹妹，习惯了压抑自己的欲望。"
  },
  {
    siblings: "重组家庭（父母离异各自再婚，由祖父母抚养）",
    detail: "过年不知该去哪个家，在爷爷奶奶漏风的老平房里长大，骨子里极度渴望拥有属于自己的固定锚点。"
  }
];

const EMOTIONAL_TONES = [
  {
    tone: "窒息控制型（“我们这辈子受苦全是为了你”）",
    detail: "每一次关怀都伴随着情感勒索，让你一旦产生独立念头就背负沉重的道德负罪感。"
  },
  {
    tone: "严苛攀比型（“你看大舅家表哥今年又考上编制了”）",
    detail: "家里的餐桌就是公开处刑台，你的价值只取决于你带回的分数、文凭和工资数字。"
  },
  {
    tone: "温厚匮乏型（“家里没本事，全靠你自己争气了”）",
    detail: "父母朴讷善良，给不了你任何关系与财富，只能把唯一的土鸡蛋剥好默默放在你碗里。"
  },
  {
    tone: "务实铜臭型（“读死书有什么用，能换几个钱？”）",
    detail: "家里凡事以现实利益衡量，鄙夷一切虚浮的风花雪月，早早逼你面对生活的账本。"
  },
  {
    tone: "疲惫放养型（“能吃饱穿暖就行，我们管不了那么多”）",
    detail: "父母忙于生计无暇过问你的精神世界，你在野草般的自由中早熟，但也早早体会孤立无援。"
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
  const par = PARENT_PROFILES[Math.floor(Math.random() * PARENT_PROFILES.length)];
  const sib = SIBLINGS_PROFILES[Math.floor(Math.random() * SIBLINGS_PROFILES.length)];
  const tone = EMOTIONAL_TONES[Math.floor(Math.random() * EMOTIONAL_TONES.length)];

  const housing = HOUSING_TEMPLATES[par.housingIndex % HOUSING_TEMPLATES.length];
  const wealth = WEALTH_TIERS[par.wealthIndex % WEALTH_TIERS.length];

  const initialSavings = Math.floor(18000 + Math.random() * 45000);

  const backgroundStory = `你出生在${slide.region}。父亲${par.fatherAge}岁做${par.fatherJob}，母亲${par.motherAge}岁做${par.motherJob}。全家挤在${housing}家中${sib.detail}在这个屋檐下，${tone.detail}`;

  return {
    name,
    gender,
    family: {
      region: slide.region,
      regionDetail: `${slide.landscape}。${slide.tagline}`,
      fatherAge: par.fatherAge,
      fatherJob: par.fatherJob,
      fatherTrait: par.fatherTrait,
      motherAge: par.motherAge,
      motherJob: par.motherJob,
      motherTrait: par.motherTrait,
      housing,
      wealthTier: wealth.tier,
      wealthDetail: wealth.detail,
      siblings: sib.siblings,
      siblingsDetail: sib.detail,
      emotionalTone: tone.tone,
      toneDetail: tone.detail,
      backgroundStory,
      initialSavings
    }
  };
}

// ============================================================================
// 前半链：K-12 应试与分流（6 ~ 17 岁关隘选择）
// ============================================================================

export const K12_EVENTS: LifeEventNode[] = [
  // 1. 小学一年级 · 6岁
  {
    id: "k12_age_6",
    age: 6,
    stageName: "小学一年级 · 6岁",
    title: "校门口的午餐盒与方言",
    scene:
      "开学第一周，周围城里的同桌掏出印着卡通图案的双层不锈钢保温饭盒，里面是切好的苹果和煎肉饼。你书包里是用旧油漆塑料桶改装的饭罐，装着母亲早起炒好的咸菜土豆丝。老师在讲台上用普通话点名，你一张嘴带出的浓重乡音引来全班一阵窃笑。",
    choices: [
      {
        text: "低头不语，午饭时悄悄躲到操场乒乓球台底下吃完",
        detail: "你早早学会了用自尊裹紧自己的贫瘠，把自卑磨成了内敛的硬壳。",
        reaction: "你开始学着城里同学的语调一字一句纠正发音，夜里在被窝里练普通话咬字。",
        delta: { inferiority: 20, academicCapital: 10, resilience: 10 },
        addTags: ["自卑敏感", "早熟自尊"]
      },
      {
        text: "大方把咸菜分给同桌：‘我家自己腌的，尝尝很香’",
        detail: "你身上带着野草般的坦荡，贫穷没有第一时间压弯你的腰。",
        reaction: "同桌吃了一口被辣得直吸气，反倒和你成了下课一起拍卡片的朋友。",
        delta: { inferiority: -15, resilience: 25, rebellion: 10 },
        addTags: ["草莽坦荡", "野生韧劲"]
      },
      {
        text: "回家赌气摔饭盒，逼母亲一定要给你买商场里那个45块钱的保温桶",
        detail: "母亲叹着气数出抽屉里带折痕的零钱，父亲在院子里重重抽了一口旱烟。",
        reaction: "第二天你如愿拿到了新饭盒，但母亲接下来整整两周每顿饭只就着白菜汤咽冷馍。",
        delta: { inferiority: 15, kinshipGuilt: 25, savings: -45 },
        addTags: ["愧疚阴影", "面子执念"]
      }
    ]
  },

  // 2. 小学三年级 · 8岁
  {
    id: "k12_age_8",
    age: 8,
    stageName: "小学三年级 · 8岁",
    title: "走廊罚站与没交的校服费",
    scene:
      "学校统一征订秋季校服，每套80块钱。家里刚好要交下半年的电费和农药钱，母亲推说明天交，一拖就是一周。早操集会前，班主任当着全班的面把你留在了教室外走廊：‘全班就差你一个人了，什么时候交齐什么时候进教室听课。’",
    choices: [
      {
        text: "在走廊笔直站着，拿出课本默默把课文全篇背了下来",
        detail: "你没有哭，但那些路过同学投来的探寻目光，让你深切体会到了自尊被刺痛的滋味。",
        reaction: "从那天起，你暗暗发誓要用成绩证明自己。期末考试你考了年级第一名。",
        delta: { academicCapital: 25, inferiority: 15, resilience: 15 },
        addTags: ["要强自尊", "发奋苦读"]
      },
      {
        text: "中午趁老师不注意，跑去学校后山水沟里抓小龙虾和小泥鳅卖给菜市场小贩凑钱",
        detail: "满身泥浆，指甲缝里全是黑泥，但你真的用塑料袋换回了皱巴巴的八张十元纸币。",
        reaction: "当你把钱交到讲台上时，班主任有些诧异。你第一次体会到靠自己的双手换来尊严的底气。",
        delta: { resilience: 30, rebellion: 25, inferiority: -10, savings: 80 },
        addTags: ["江湖野性", "商业萌芽"]
      },
      {
        text: "放学回家趴在床上大哭，母亲四处找隔壁二婶借钱，换来二婶夹枪带棒的冷嘲热讽",
        detail: "你听着厨房里母亲向邻里陪笑讨好的低三下四，第一次痛恨自己家里的无能与贫穷。",
        reaction: "钱交上了，但你开始恐惧一切需要交费的集体活动，在班级里变得愈发沉默寡言。",
        delta: { inferiority: 25, kinshipGuilt: 20, savings: -80 },
        addTags: ["自卑创伤", "亲邻冷眼"]
      }
    ]
  },

  // 3. 小学六年级 · 11岁
  {
    id: "k12_age_11",
    age: 11,
    stageName: "小升初抉择 · 11岁",
    title: "实验中学的借读费与父母深夜吵架",
    scene:
      "小升初划片，你的学区只能分到风气极差的城南公立普通初中（每年考上普高的不到三成）。唯一的生路是跨片考入区重点实验初中，但需要托关系递条子，还得交一万两千元的借读赞助费。深夜，父母隔着薄薄的木门压低声音剧烈争吵，母亲哭着说‘砸锅卖铁也得给娃读’，父亲拍桌子说‘家里账上总共只有七千块’。",
    choices: [
      {
        text: "推门进去平静地说：‘爸妈，我不去实验中学，我去普通初中照样能考第一’",
        detail: "你替父母解了围，也替自己挑上了一副重担。你亲手掐断了家里借高利贷的可能。",
        reaction: "父亲眼里闪过复杂的愧疚与如释重负。三年后在城南初中的恶劣环境里，你成了淤泥里唯一的独苗。",
        delta: { resilience: 30, academicCapital: 15, kinshipGuilt: 10, rebellion: 10 },
        addTags: ["懂事担当", "逆境狂草"]
      },
      {
        text: "父母最终去向城里做建材的舅舅借了一万二，低三下四给对方递软中华送土特产",
        detail: "你顺利拿到了实验中学的录取通知书，但舅舅家表弟从此可以在任何场合肆意嘲弄你。",
        reaction: "你背负着全家的体面与债务跨入重点初中，每一次考试掉出前五十名你都会胃疼失眠。",
        delta: { academicCapital: 25, kinshipGuilt: 30, inferiority: 15, savings: -12000 },
        addTags: ["负债读书", "寄人篱下"]
      }
    ]
  },

  // 4. 初中二年级 · 13岁
  {
    id: "k12_age_13",
    age: 13,
    stageName: "初二青春期 · 13岁",
    title: "课桌下的早恋纸条与全校通报",
    scene:
      "初二荷尔蒙涌动。前桌那个笑起来有酒窝的女孩悄悄在你的数学课本里夹了一张蓝色信纸，约你周末去县图书馆看书。然而还没到周末，纸条被巡查的教导主任当场搜出。周一升旗仪式后的晨会上，教导主任在全校麦克风里公开宣读‘整顿男女不正当交往不良风气’，虽未点名但所有人都知道那是你。",
    choices: [
      {
        text: "在班主任办公室一口咬定是自己单方面骚扰对方，把所有处分一个人全扛下来",
        detail: "你被罚在教学楼前扫地两周，父母被叫到学校当面训话，父亲回家抽了你两皮带。",
        reaction: "女孩在放学路上偷偷塞给你一块大白兔奶糖，你第一次在残酷的应试铁幕下体会到了人性的温存与义气。",
        delta: { rebellion: 30, resilience: 20, kinshipGuilt: 10 },
        addTags: ["义气担当", "看透虚伪"]
      },
      {
        text: "顺从老师的威逼利诱，把纸条推给同班起哄的混混同学，当场写下深刻检讨划清界限",
        detail: "老师表扬你‘知错就改、思想纯洁’，但那个女孩从此再也没多看你一眼。",
        reaction: "你保全了自己的三好学生指标，但你在镜子里看着自己谄媚的笑脸，感到一阵深深的厌恶。",
        delta: { academicCapital: 10, inferiority: 20, rebellion: -20 },
        addTags: ["自保妥协", "顺民规训"]
      }
    ]
  },

  // 5. 初三上学期 · 14岁
  {
    id: "k12_age_14",
    age: 14,
    stageName: "初三上学期 · 14岁",
    title: "快慢班与铁丝网的优劣淘汰",
    scene:
      "初三开学，学校将全年级强行拆分为两个‘火箭重点班’和六个‘平行慢班’。慢班的桌椅是挑剩下的破木头，老师上课照本宣科，后排天天有人打牌睡觉；火箭班则享受全市特级教师配给，周六日全天补课。你因期末发挥失常，卡在慢班的第一名。",
    choices: [
      {
        text: "绝不摆烂：自费买全套奥赛拔高卷，下课拿着错题硬闯重点班办公室堵特级老师问问题",
        detail: "慢班的混混同学嘲笑你‘装什么逼’，重点班的学生对你侧目而视，你全然不顾。",
        reaction: "期中统考，你以慢班学生的身份杀进了全校前八名，校长亲自把你特批调回火箭班。",
        delta: { academicCapital: 30, resilience: 30, inferiority: -10, savings: -200 },
        addTags: ["狠人底色", "逆风破局"]
      },
      {
        text: "心灰意冷，开始跟着同桌去校外黑网吧通宵打反恐精英和传奇，在烟味中麻醉自己",
        detail: "黑网吧昏暗的荧光幕和敲击键盘的快感，填补了被学校体制定为‘次品’的巨大落差。",
        reaction: "你的模拟考成绩一路下滑，但你在游戏公会里成了大哥，开始见识到学校围墙外的混乱生态。",
        delta: { academicCapital: -35, rebellion: 25, resilience: 15, savings: -500 },
        addTags: ["网瘾逃避", "体制边缘"]
      }
    ]
  },

  // 6. 初三中考分水岭 · 15岁 (决定是职高技校还是普高)
  {
    id: "k12_age_15",
    age: 15,
    stageName: "中考普职分流 · 15岁",
    title: "50%分流刀下的协议书",
    scene:
      "中考模拟考放榜，全校只有前48%的学生能上普通高中，剩下的面临被‘普职分流’。晚自习班主任把你叫到办公室，桌上摊着一份《中职技术学校直升保底协议》：免收前两年学费，直升汽修/护理/数控，附赠定向就业推荐。如果不签，一旦中考落榜连职校的好专业都挑不上。",
    choices: [
      {
        text: "咬死不签：‘我要考普高，哪怕只能去最差的普高借读’",
        detail: "你拒绝了提前认命。接下来的三个月，你每天嚼风油精提神，草稿纸写满了整整两大编织袋。",
        reaction: "中考放榜那天，你的分数压过了县三中普高录取线，你守住了通往高考的独木桥！",
        delta: { academicCapital: 25, resilience: 25, rebellion: 15 },
        addTags: ["守住普高", "拼命做题家"],
        trackTrigger: "academic"
      },
      {
        text: "在协议书上签字：选了免学费的公办中专技术方向（汽修/护理/机械）",
        detail: "家里实在经不起继续供书的折腾，你决定提早三年学一门能果腹的硬核手艺。",
        reaction: "父母松了一口气。邻里议论你‘没出息’，但你看着手上的扳手与实训室，心里异常踏实。",
        delta: { resilience: 35, academicCapital: -20, inferiority: 10, savings: 1000 },
        addTags: ["职教蓝领", "手艺人底色"],
        trackTrigger: "vocational"
      },
      {
        text: "父母掏出养老钱走关系托人，交了两万八赞助费进私立高价高中",
        detail: "这笔巨款让家里接下来一年连肉都不敢买，老旧冰箱空空荡荡。",
        reaction: "走入私立高中的第一天，你背上的书包如同装满了铅块，你知道自己没有资格考砸一次。",
        delta: { kinshipGuilt: 40, inferiority: 20, savings: -28000 },
        addTags: ["巨额学债", "心理重负"],
        trackTrigger: "academic"
      }
    ]
  },

  // 7. 高中分流 · 16岁
  {
    id: "k12_age_16",
    age: 16,
    stageName: "高中分流阶段 · 16岁",
    title: "专业分科与现实算盘",
    scene:
      "如果是普高生，你面临文理分科：热爱文史却被父亲痛斥‘文科出来要饭，必须学理！’\n如果是职高技校生，你面临实训选组：是去流水线顶岗实习，还是留在机房钻研高级数控与电气线路？",
    choices: [
      {
        text: "普高选理科埋葬爱好 / 职高选硬核电气数控技术",
        detail: "你把个人的浪漫彻底杀死，把自己打磨成这个工业体系最需要的一颗标准螺丝钉。",
        reaction: "虽然痛苦枯燥，但你的专业/理综成绩步步爬升，成为同批人中最具工具价值的一个。",
        delta: { academicCapital: 25, resilience: 20, rebellion: -15 },
        addTags: ["硬核工具人", "埋葬爱好"]
      },
      {
        text: "普高坚持选文科 / 职高选择服务类与外语辅助自学",
        detail: "‘我自己的三年我自己过。’哪怕未来没有靠山，你也想保全一双能看清社会规则的眼睛。",
        reaction: "你在文史/语言领域如鱼得水，深刻理解了社会的运行潜规则，反叛之火愈烧愈旺。",
        delta: { rebellion: 30, resilience: 15, academicCapital: 10 },
        addTags: ["文史通透", "清醒反叛"]
      }
    ]
  },

  // 8. 高三冲刺 · 17岁
  {
    id: "k12_age_17",
    age: 17,
    stageName: "高三/职高毕业冲刺 · 17岁",
    title: "高三冲刺倒计时与生理极限",
    scene:
      "进入冲刺之年。普高黑板上‘距高考还有88天’的倒计时一天天迫近，早晨5点半跑操背单词，晚自习教室里充斥着压抑的翻书声与焦虑的叹息；\n职高这边，校企合作工厂的大巴车已经开到校门口，班主任催促大家签三方顶岗实习协议，只有极少数人还在坚持准备对口高职高考。",
    choices: [
      {
        text: "把自己变成一台毫无感情的做题机器 / 考前疯狂刷题冲刺对口大专高职",
        detail: "你用极度的自律封锁了所有脆弱，大冬天洗冷水脸，风油精擦在眼皮底下。",
        reaction: "你的模拟考成绩锁死在第一梯队，但慢性浅表性胃炎和偏头痛成了甩不掉的附骨之疽。",
        delta: { academicCapital: 30, resilience: 25, inferiority: -5 },
        addTags: ["冷血做题机", "自律苦修"]
      },
      {
        text: "保持最低底线学习，每天晚自习抽出半小时去操场看黄昏晚霞与云朵",
        detail: "‘如果通关的前提是变成疯子，那我宁可做一个心智健全的普通人。’",
        reaction: "班主任批评你‘缺乏冲刺的狼性’，但你保全了内心的完整与松弛，成绩处于中常水平。",
        delta: { rebellion: 30, inferiority: -20, resilience: 15 },
        addTags: ["精神完整", "松弛防线"]
      }
    ]
  }
];

// ============================================================================
// 18岁 高考出分系统裁决（依据过去12年积累自动计算命运！）
// ============================================================================

export interface GaokaoCalculation {
  degreeTrack: "985_211" | "double_non" | "junior_college" | "vocational_work";
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
  tags: string[]
): GaokaoCalculation {
  // If user went into vocational track earlier
  if (tags.includes("职教蓝领") || tags.includes("手艺人底色")) {
    return {
      degreeTrack: "junior_college",
      title: "【高等职业技术学院 · 实用大专技能生】",
      scoreText: "对口升学统考通过，录取至省属公办职业技术学院（机电/护理/工程）",
      verdict:
        "你在十五岁那年提前脱离了应试内卷的绞肉机。你没有考上体面的本科，但你避开了昂贵的学费和眼高手低的做题家通病。一门扎实的硬手艺，是你面对未来唯一的饭碗。",
      academicCapitalDesc: "学历在白领简历里常被无视，但实操能力远超普通本科生，没有背负巨额学债。",
      psychologicalDossier: `自卑创伤：${attrs.inferiority}%。曾因中专职高出身在亲戚聚会里抬不起头，但也早早看透了社会的虚浮。`,
      firstStepChoice: {
        prompt: "面对大专三年的时光，你的规划是：",
        options: [
          {
            text: "在实训车间把高级电工/汽修/护士资格证全部考到手，周末在校外门店跟老师傅打零工攒钱",
            detail: "放弃虚无的专升本幻想，把技能磨到无可挑剔，手里积攒下真金白银。",
            delta: { resilience: 30, savings: 8000, inferiority: -10 },
            addTags: ["蓝领实干", "硬核技能"]
          },
          {
            text: "心有不甘，在图书馆天天早起背英语单词，准备全力冲刺专升本考试",
            detail: "你受够了被人轻视的眼神，你无论如何也想穿一次本科学位服。",
            delta: { academicCapital: 20, inferiority: 15, resilience: 15 },
            addTags: ["专升本执念", "逆袭渴望"]
          }
        ]
      }
    };
  }

  // If Academic Track: calculate based on Academic Capital
  if (attrs.academicCapital >= 60) {
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
            text: "选最赚钱、最内卷的硬核计算机/电子信息/金融专业，一心只想搞钱改变阶层",
            detail: "你深知家里毫无背景，唯有最热门的专业能让你在毕业五年内换回真金白银。",
            delta: { resilience: 20, academicCapital: 20, savings: 10000 },
            addTags: ["重点大学光环", "大厂做题家"]
          },
          {
            text: "选省内公费师范/定向选调苗子专业，服从分配，为全家换取铁饭碗安全感",
            detail: "听从父母的苦苦劝说，用名校文凭下沉换取县城或地级市最高的体制内地位。",
            delta: { kinshipGuilt: 25, rebellion: -20, savings: 8000 },
            addTags: ["重点大学光环", "体制预备役"]
          }
        ]
      }
    };
  }

  if (attrs.academicCapital >= 30) {
    return {
      degreeTrack: "double_non",
      title: "【沿海普通公办本科（双非） · 夹缝里的大多数】",
      scoreText: "高考总分 518 分（超一本线12分），录取至沿海二线城市普通公办综合大学",
      verdict:
        "不高不低的分数，折射出你十二年来既不甘摆烂又未曾彻底发疯的真实写照。你跨入了本科的门槛，但没有名校光环加持，你必须在接下来的四年里独自面对更加残酷的丛林法则。",
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

  // Low academic capital in academic track -> Ordinary junior college
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
          text: "全家凑出三万块复读费，去隔壁市高考集中营复读一年，背水一战",
          detail: "你承受不起同辈和亲友异样的眼光，你决定再拿一年的青春在题海里赌一把。",
          delta: { academicCapital: 25, kinshipGuilt: 30, savings: -30000 },
          addTags: ["复读背水", "巨额学债"]
        }
      ]
    }
  };
}

// ============================================================================
// 后半链：象牙塔到社会前五年（20 ~ 27 岁）
// ============================================================================

export const CAREER_EVENTS: LifeEventNode[] = [
  // 20岁 大二/大三 象牙塔里的阶层见闻
  {
    id: "career_age_20",
    age: 20,
    stageName: "大学阶段 · 20岁",
    title: "宿舍夜谈与苹果全家桶",
    scene:
      "大二这年，同寝室本地家庭的同学换了最新款的苹果笔记本，正讨论暑假去欧洲交流或去券商大厂实习；而你刚用做家教兼职攒下的钱，换了一部屏幕有划痕的二手红米手机。晚上熄灯后，大家谈起未来的出路，有人打算靠家里在二线全款买房，有人已经联系好了海外留学的导师。",
    choices: [
      {
        text: "周末兼职打三份工（发传单、奶茶店、周末家教），拼命存下每一个铜板",
        detail: "你用肉身的疲惫置换金钱的安全感，两年来没有参加过任何一次超过人均50块的聚餐。",
        reaction: "银行卡上的数字终于破了五位数。虽然在寝室聚会里你是最沉默的那一个，但你有底气不再向家里要一分钱。",
        delta: { resilience: 25, savings: 8000, inferiority: -10, rebellion: 10 },
        addTags: ["拼命攒钱", "边缘独行"]
      },
      {
        text: "泡在图书馆和自习室：拼国家奖学金、考雅思/专业硬核证书",
        detail: "你相信只要把专业实力磨到极致，社会的规则就不会轻易将你埋没。",
        reaction: "你的专业绩点冲到年级前三，拿下了八千块国奖，但体检时发现腰椎已经开始出现生理曲度变直。",
        delta: { academicCapital: 25, savings: 8000, resilience: 15 },
        addTags: ["硬核做题", "自律苦修"]
      },
      {
        text: "参与社团学生会，学习酒桌应酬与组织材料，积极争取入党推优",
        detail: "你敏锐察觉到了规则的运行逻辑，开始学着把棱角磨平，学着讲得体的套话与场面话。",
        reaction: "辅导员对你越来越赞许，甚至在年底的留校与推优指标上留了你的名字。你感到自己正在成为机器的一部分。",
        delta: { rebellion: -25, kinshipGuilt: 15, resilience: 15, savings: 1000 },
        addTags: ["体制圆滑", "熟稔规则"]
      }
    ]
  },

  // 22岁 毕业大十字路口
  {
    id: "career_age_22",
    age: 22,
    stageName: "毕业十字路口 · 22岁",
    title: "六月毕业季的离校大迁徙",
    scene:
      "毕业答辩结束，室友的行李箱在走廊滚出嘈杂的声响。招聘会的大厅挤满了穿廉价西装的应届生，上万份简历在地上被踩得满是泥印。你必须选择毕业后的第一块落脚点：",
    choices: [
      {
        text: "回老家备战考编/三支一扶/县城事业单位，全职脱产啃老二战",
        detail: "回到熟悉的县城房间，每天在母亲做饭的油烟味中刷行测与申论，不敢出门见高中同学。",
        reaction: "父母对外宣布你在‘备战国家大事’，但你感到自己的青春正像一盆放置在背阴处的冷水，一天天蒸发。",
        delta: { kinshipGuilt: 30, rebellion: -25, savings: -5000, inferiority: 15 },
        addTags: ["脱产考编", "深陷故土"]
      },
      {
        text: "拎着编织袋直奔一线城市城中村（深圳城中村/北京回龙观/上海松江），进入私企/大厂外包996",
        detail: "住在隔断出来的单间，窗外对着邻居家的空调外机，每天通勤三个小时挤在窒息的地铁早高峰。",
        reaction: "第一个月拿到转正工资七千五，扣除房租和杂费只剩一半。你第一次真正感知到什么是被城市榨取。",
        delta: { rebellion: 25, resilience: 20, savings: 3500 },
        addTags: ["大城市漂流", "996螺丝钉"]
      },
      {
        text: "靠一门硬技术/专业执照入行（汽修技师、医疗护工、咖啡连锁管培、独立手艺）",
        detail: "不图虚名，用体力与具体的专业技能换取现钱，每天下班手上都带着机油或消毒水味道。",
        reaction: "没有白领的光鲜，但你几乎没有失业焦虑。看着手里一点点积攒起来的硬通货，你感到一种粗粝的安全感。",
        delta: { resilience: 30, rebellion: 15, savings: 6000, inferiority: -10 },
        addTags: ["蓝领实干", "硬核技能"]
      }
    ]
  },

  // 23岁 职场第1年
  {
    id: "career_age_23",
    age: 23,
    stageName: "走向社会 · 第1年",
    title: "试用期最后一周的裁撤谈话",
    scene:
      "年底经济形势下行，公司突击宣布裁减30%新人指标。在试用期的第5个月零20天，HR在玻璃隔间约谈你，桌上放着一份主动辞职协议，理由是‘业务结构调整，人岗匹配度不足’，暗示如果不签不仅没有证明还会影响档案背调。",
    choices: [
      {
        text: "录音取证，据理力争：‘不给N+1合法补偿，我明天就去劳动仲裁大厅立案’",
        detail: "你没有像同批同事那样哭着签字走人。你在冷风里骑车去劳动局打印材料，连打了三天热线。",
        reaction: "HR最终妥协，多赔了一个月工资把你打发走。虽然丢了工作，但你第一次发现规则并非不可撼动。",
        delta: { rebellion: 30, resilience: 25, savings: 8500 },
        addTags: ["硬骨头仲裁", "识破职场"]
      },
      {
        text: "忍气吞声签字走人，并在当晚电话里对父母报喜不报忧：‘公司很好，年终还有奖金’",
        detail: "挂断电话，你在零下五度的天桥上把冷掉的煎饼果子一口口咽下去，眼泪掉在塑料袋里。",
        reaction: "你把所有苦难咽进胃里化作慢性浅表性胃炎。为了省钱，你把出租屋退掉，搬进了不见天日的地下室隔间。",
        delta: { inferiority: 20, kinshipGuilt: 15, savings: -2000 },
        addTags: ["报喜不报忧", "隐忍硬扛"]
      }
    ]
  },

  // 24岁 职场第2年
  {
    id: "career_age_24",
    age: 24,
    stageName: "走向社会 · 第2年",
    title: "高中死党结婚与老家人情索命",
    scene:
      "十月国庆，老家高中同桌要在县城最大酒店办婚礼。微信群里大家都在起哄随礼，体制内的同学起步就是1000块红包，还晒出单位发的过节粮油。而你刚交完下个季度的押一付三房租，卡里只剩可怜的1350元。",
    choices: [
      {
        text: "刷信用卡套现随礼1000元，并坐夜班绿皮车回老家参加婚礼",
        detail: "酒席上，二叔和七姑八大姨拉着你的手盘问：‘在大城市一个月挣多少？买房没有？有没有编制？’",
        reaction: "你在敬酒的假笑中耗尽了所有的社交能量。回程火车上，你看着下个月账单，发誓三年内绝不再回老家过节。",
        delta: { kinshipGuilt: 25, inferiority: 15, savings: -2500 },
        addTags: ["人情透支", "亲戚压力"]
      },
      {
        text: "装作工作脱不开身，微信私发200元红包与祝福，拒绝回乡",
        detail: "同桌收了红包回了客套的表情，但高中群里关于你的讨论悄悄冷落下来，母亲打电话骂你‘不知人情冷暖’。",
        reaction: "你彻底被老家的核心熟人圈除名了。但那个长假，你在出租屋里安安静静看完了两本外语原版书，感到从未有过的清静。",
        delta: { rebellion: 35, kinshipGuilt: -30, savings: -200 },
        addTags: ["斩断故交", "精神离土"]
      }
    ]
  },

  // 25岁 职场第3年
  {
    id: "career_age_25",
    age: 25,
    stageName: "走向社会 · 第3年",
    title: "体检报告的4A红字与无休加班",
    scene:
      "年终体检中心寄来报告单：甲状腺结节TI-RADS 4A类（建议随访穿刺）、轻度脂肪肝、心律不齐。同周，部门总监召集开会宣布：‘全行业都在降本增效，下季度全面取消周末双休，拥抱攻坚状态。’",
    choices: [
      {
        text: "去医院做穿刺检查，请假一周，开始把作息硬性切回11点前睡觉，拒绝无意义摸鱼加班",
        detail: "总监在周会上当众点名批评你‘缺乏创业狼性，对待团队没有奉献精神’，并将你从核心项目踢出。",
        reaction: "虽然绩效被打了C，但结节复查为良性。你站在深夜空无一人的天桥上，看着满城霓虹，心里嘲笑他们的狂热。",
        delta: { rebellion: 25, resilience: 20, savings: -1500 },
        addTags: ["保命哲学", "看破内卷"]
      },
      {
        text: "把报告收进抽屉假装没看见，吞两颗止痛片继续在深夜熬夜赶项目材料",
        detail: "‘大家都这么熬，我如果停下来，下个月的房租和老家父母的降压药钱谁来出？’",
        reaction: "年底你拿到了‘卓越奋斗者’奖杯和一万二奖金，但你发现自己晨起时心慌手抖的次数越来越频繁。",
        delta: { rebellion: -20, kinshipGuilt: 20, savings: 12000 },
        addTags: ["透支健康", "高压奉献"]
      }
    ]
  },

  // 26岁 职场第4年
  {
    id: "career_age_26",
    age: 26,
    stageName: "走向社会 · 第4年",
    title: "二线城市的六个钱包与三十年房贷",
    scene:
      "春节回家，父母突然关上房门，把一张存折放在桌上：‘我和你爸把老平房抵押，加上半辈子养老金，一共凑了60万。你在省会看好了一套期房，首付我们包了，每月房贷8200元你自己供，不买房哪个姑娘肯跟你结婚？’",
    choices: [
      {
        text: "接过存折按揭签字，背上30年房贷，完成全家族的阶层跨越执念",
        detail: "签完字那一刻，你看着红色的购房合同，感到这辈子的人生路径已经被打上了水泥钢筋。",
        reaction: "从此你不敢轻易离职、不敢生病。每个月工资一到账就自动划扣8200元，你整个人被牢牢绑定在城市的按揭齿轮上。",
        delta: { kinshipGuilt: 40, rebellion: -40, savings: -20000, resilience: -15 },
        addTags: ["三十年房奴", "背负重资产"]
      },
      {
        text: "坚决推开存折：‘你们把老房抵押了，万一生大病住哪？我绝不为了所谓面子买高位期房’",
        detail: "父亲气得浑身发抖，拍桌子怒吼‘你这是大逆不道！我们在亲戚面前头都抬不起来！’",
        reaction: "母亲抹着眼泪叹气。你背上背包连夜坐车返回出租屋，两代人在生活选择与风险承受力上的巨大分歧，在这一晚显露无遗。",
        delta: { rebellion: 45, kinshipGuilt: -35, resilience: 25 },
        addTags: ["划清界限", "理性止损"]
      }
    ]
  },

  // 27岁 职场第5年（关键抉择之年）
  {
    id: "career_age_27",
    age: 27,
    stageName: "走向社会 · 第5年",
    title: "母亲的急症住院与海外签证批准",
    scene:
      "五月中旬，老家县医院打来电话：母亲突发急性胆管炎并发心衰，医生语气凝重：‘我们县里医疗条件有限，你必须尽快想办法转院到省城大医院，最好找熟人联系床位……’\n\n就在同一天的同一小时，你手机邮箱里弹出了一封通知：你一年前悄悄递交的海外打工签证/留工资格获得了初步批准，要求在30天内核验资金与启程时间。",
    choices: [
      {
        text: "托尽所有同乡同学和关系，带着全部存款赶回省城医院陪护病床",
        detail: "你用尽了所有的脸面托到了一张加床。你在充满消毒水味道的走廊里陪护了两周，细心照料母亲，放弃了海外出走的机会。",
        reaction: "母亲的手在输液管下枯瘦苍白。看着窗外的灰蒙天空，你心里清楚，家庭的责任终究让你留在了这片熟悉的土地上。",
        delta: { kinshipGuilt: 45, rebellion: -30, savings: -35000 },
        addTags: ["家庭牵绊", "回归安顿"]
      },
      {
        text: "把手里攒下的积蓄大半汇回老家托亲友照看，自己咬牙办理出国公证与离境手续",
        detail: "‘如果我也留在这里，全家最终不过是一起沉入泥潭。我必须在外面踩出一块浮木。’",
        reaction: "在去往机场的大巴上，看着后视镜里越来越小的故乡地平线，眼泪止不住地涌出，你成为了家族名义上的逃兵。",
        delta: { rebellion: 50, kinshipGuilt: -20, savings: -25000, resilience: 35 },
        addTags: ["断脐出海", "背负骂名"]
      }
    ]
  }
];

// ============================================================================
// 27 岁五年社会大清算：命运解构书（6大画像）
// ============================================================================

export interface LifeDiagnosis {
  type: "stay_comfortable" | "stay_exhausted" | "emigrate_autonomous" | "emigrate_craftsman" | "migrant_bird" | "lost_scholar";
  title: string;
  portrait: string;
  kinshipEvaluation: string;
  systemEvaluation: string;
  fateVerdict: string;
  recommendation: string;
}

export function evaluate27YearOldLife(
  attrs: CharacterAttributes,
  tags: string[]
): LifeDiagnosis {
  const savingsNote =
    attrs.savings > 20000
      ? `你手握约 ¥${attrs.savings.toLocaleString()} 元结余，这是你唯一的盘缠底牌。`
      : `你手中几乎没有流动现金积蓄，只能靠纯粹的体力或决绝走险。`;

  // 1. 蓝领手艺/实干型出海
  if (tags.includes("职教蓝领") || tags.includes("手艺人底色") || tags.includes("蓝领实干")) {
    return {
      type: "emigrate_craftsman",
      title: "【草莽工匠 · 降维拓荒者】",
      portrait: `你在国内常常处于学历鄙视链底层，被呼来喝去，受尽体面社会的隐性歧视。但你拥有一双不惧脏累、能修理世界的手。${savingsNote}`,
      kinshipEvaluation: `宗族愧疚度：${attrs.kinshipGuilt}/100。你很早就懂得替家里扛事，但故乡除了吸血无法给你任何体面。`,
      systemEvaluation: `体制依附度：极低。你从不迷信办公室白领神话，你深知汗水在哪都能换面包。`,
      fateVerdict: `你天生属于海外蓝领高收入国度（澳洲/德国双元/日本技工）。去那些尊重技艺与体力劳动的土地，你的一双手能买下一栋带花园的平房，彻底实现阶层倒挂。`,
      recommendation: `果断申请蓝领工签、WHV或双元制，在体力红利市场完成降维打击。`
    };
  }

  // 2. 深度深陷房贷与孝道的透支型留下
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
      systemEvaluation: `体制依附度：较低。你更看重规则透明与个人空间，反感过度的人情社交与年龄壁垒。` ,
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
      "在异邦（以当地打工或小企业为例），你通过了初级语言考试，换了正式的工作签证，租下离市中心电车40分钟的一居室。除夕这天晚上，你下班后在华人超市买了一包冷冻水饺，房东老太太敲门送了你一块自家烤的苹果派，祝你新年好。虽然没有鞭炮和红白人情，但你卡里的外币存款第一次折合超过了15万人民币。",
    stayedScene:
      "在省会城市，你在父母资助下咬牙上车了郊区期房，每月还贷7800元。周五晚上你在饭局上给分管领导敬酒，喝到急性胃痉挛，吐在地下商场的洗手池里。周末高中同学聚会，大家一边吹嘘谁换了奔驰，一边心照不宣地打听谁能弄到重点小学的学位房指标。",
    emigratedReflection:
      "你尝到了无菌的自由，但也第一次体会到大年三十异国街道落雪时的绝对孤寂。",
    stayedReflection:
      "你在人情世故里八面玲珑，但深夜看着手机银行自动扣划房贷的短信，感到自己像被钉死在十字架上。",
    choice: {
      text: "这一年，你给国内的家里寄了第一笔外汇 / 咬牙还了第一笔大额本金",
      detail: "不管是哪种人生，你都在为三十岁的生活缴足了昂贵的入场券。",
      reaction: "两边的天空都在变暗，但你选择的路已经没有回头草可吃。"
    }
  },

  // 35岁
  {
    age: 35,
    title: "35岁 · 职场枯荣线",
    theme: "工会与钓鱼 vs 大厂优化大潮",
    emigratedScene:
      "当地法律没有‘35岁红线’这种说法。你所在的蓝领车间或当地小公司下午4点准时锁门下班。你买了一辆二手皮卡，后备箱放着渔具，周末带着保温杯去海边钓鱼。但你依然听不懂本地同事在茶歇时聊起的橄榄球笑话，在他们眼里，你是一个勤勉、安静、从不找事的‘黄皮肤局外人’。",
    stayedScene:
      "国内大厂迎来第三轮‘优化降本’。你所在的业务线整批裁撤，HR拿着N+1赔偿协议找你谈话。你投出去两百份简历，只要年龄填了35岁，系统全部自动拦截未读。家里二胎刚满两岁，奶粉与早教班账单叠在茶几上，你在车库里坐了整整四十分钟，抽了三根烟才敢上楼。",
    emigratedReflection:
      "你避开了35岁的断头台，但你深知自己这辈子永远无法融入主流文化的核心。",
    stayedReflection:
      "你在黄金年龄被市场当成耗材吐了出来，你不得不去注册滴滴和同城闪送账号补贴家用。",
    choice: {
      text: "面对中年危机的重击，你硬生生用肩膀扛了下来",
      detail: "人在三十五岁，所有浪漫主义的幻想都被生活剥得干干净净。",
      reaction: "你不再和任何人争辩对错，因为生存本身就是唯一的正义。"
    }
  },

  // 42岁
  {
    age: 42,
    title: "42岁 · 四海一家的生老病死",
    theme: "跨洋转机来不及送终 vs 走廊陪护床前的最后尽孝",
    emigratedScene:
      "凌晨两点手机疯狂震动，是老家亲戚打来的微信语音：‘你爸不行了，在ICU抢救，医生让家属准备后事，你快回来看最后一眼！’你发疯一样查机票，转机加签证核酸最快也要32个小时。三天后当你提着沾满雨水的行李箱跪在老家县城灵堂前时，看到的只有一张黑白照片和一盒冰冷的骨灰。你母亲哭晕在你怀里，骂你是个没良心的逃兵。",
    stayedScene:
      "父亲确诊肺部恶性肿瘤。整整两个月，你托了高中当副院长的老同学才弄到一张加床。你白天上班，夜里在充满消毒水和呼噜声的走廊折叠床上陪护，翻身、吸痰、擦拭身体。在父亲闭上眼睛的那一刻，他的手紧紧握着你的手掌。你身心俱疲，但你问心无愧地陪他走完了人间的最后一程。",
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

    // 2. 彻底断脐/独立自由
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
