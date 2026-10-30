// ============================================================================
// ESCAPEPLAN LIFE SIMULATION ENGINE
// 逃跑计划 · 中国式命运交互电影数据模型
// ============================================================================

export interface FamilyOrigin {
  region: string;
  regionDetail: string;
  parents: string;
  parentsDetail: string;
  siblings: string;
  siblingsDetail: string;
  emotionalTone: string;
  toneDetail: string;
  backgroundStory: string;
  initialSavings: number;
}

export interface LifeChoice {
  text: string;
  detail: string;
  reaction: string;
  savingsDelta: number;
  autonomyDelta: number; // 个体主权
  kinshipDelta: number; // 宗族重力
  institutionalDelta: number; // 体制依附
  resilienceDelta: number; // 生存韧劲
  addTags?: string[];
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

const REGIONS = [
  {
    region: "豫东平原农耕大县",
    detail: "麦浪翻滚、宗族红白喜事密集、留守儿童与外出打工潮交织，全县升学全靠县一中题海。",
    savingsRange: [15000, 45000]
  },
  {
    region: "浙东民营制造百强县",
    detail: "满街小作坊与五金注塑厂，崇尚宗族抱团经商发财，读书若考不上重点不如早早接单做生意。",
    savingsRange: [40000, 120000]
  },
  {
    region: "东北资源枯竭型收缩矿城",
    detail: "老国企烟囱已熄灭多年，年轻人外流，整座小城靠老人退休金维系，体制内工作是唯一体面。",
    savingsRange: [20000, 60000]
  },
  {
    region: "湘西丘陵丘壑农业镇",
    detail: "柑橘林与陡峭梯田，父母常年在珠三角制鞋厂打工，老屋里只有老人做饭的柴火青烟。",
    savingsRange: [12000, 35000]
  },
  {
    region: "华北重工业地级市生活区",
    detail: "钢厂子弟校与筒子楼记忆，空气里总有微尘，人情网密不透风，办事看病全靠高中同学群。",
    savingsRange: [30000, 80000]
  },
  {
    region: "闽南沿海侨乡商贸镇",
    detail: "宗祠香火极旺，亲戚多在东南亚或欧美打拼，乡邻聚会总在暗中攀比洋房与谁家寄回的外汇。",
    savingsRange: [35000, 90000]
  },
  {
    region: "中西部省会边缘工薪区",
    detail: "两代人按揭一套老破小，父母拼命加班供房贷，极其害怕子女阶层跌落，校外补习班寸步不让。",
    savingsRange: [25000, 70000]
  },
  {
    region: "超一线城市城中村夹缝",
    detail: "抬头是一线CBD的摩天反光玻璃，脚下是握手楼潮湿的窄巷，看尽了繁华却无一寸属于自己。",
    savingsRange: [18000, 50000]
  }
];

const PARENT_PROFILES = [
  {
    parents: "县自然资源局科员 + 公立小学高级教师",
    detail: "标准体制内中层，恪守本分，信奉“稳定压倒一切”，对你的人生有极强规划与控制欲。",
    institutionalBase: 35,
    kinshipBase: 25
  },
  {
    parents: "农贸市场活禽/生肉摊档夫妻",
    detail: "起早贪黑双手生冻疮，用零钞毛票供你上学，说话门门大嗓门，信奉实利与真金白银。",
    institutionalBase: -15,
    kinshipBase: 20
  },
  {
    parents: "珠三角五金模具厂两栖打工族",
    detail: "长年住工厂铁架床宿舍，逢年过节才拎着年货回老家，总带着未能陪伴你的愧疚与自责。",
    institutionalBase: -10,
    kinshipBase: 30
  },
  {
    parents: "下岗开黑车/跑滴滴 + 早市面点摊",
    detail: "经历过90年代企业买断的创伤，早早白了头发，把所有未能实现的阶层跨越死死寄托在你身上。",
    institutionalBase: 15,
    kinshipBase: 25
  },
  {
    parents: "乡镇卫生院大夫 + 初中教导员",
    detail: "地方上体面受敬重的人家，清贫但讲规矩，最害怕子女“做出格的事”让家族蒙羞。",
    institutionalBase: 30,
    kinshipBase: 20
  },
  {
    parents: "小服装厂破产转型开菜鸟驿站 + 社区团购",
    detail: "曾见过小老板的体面，后来背了债务缩回仓库理快递，每天在货架间疲于奔命。",
    institutionalBase: -5,
    kinshipBase: 15
  },
  {
    parents: "建筑工地铁瓦工师傅 + 守家务农母亲",
    detail: "父亲一身风湿与老茧，每年年底最怕包工头卷款跑路，母亲在老家守着几分责任田。",
    institutionalBase: -20,
    kinshipBase: 35
  },
  {
    parents: "省城高校后勤管理员 + 市立医院护士长",
    detail: "每天见识教授和专家的光鲜，深知文凭是唯一翻盘阶梯，从小对你推行军事化作息。",
    institutionalBase: 25,
    kinshipBase: 15
  }
];

const SIBLINGS_PROFILES = [
  {
    siblings: "独生子女（独享亦独扛）",
    detail: "父母将所有关注与资源倾注在你身上，但未来老人的照护、医疗和养老没有任何同胞替你分担。",
    kinshipBase: 25
  },
  {
    siblings: "重男轻女家庭的长姐（下有小5岁的弟弟）",
    detail: "从小被灌输“做姐姐要有担当”，过年新衣服永远优先弟弟，心里常年扎着一根不被看见的刺。",
    kinshipBase: 40
  },
  {
    siblings: "夹心层的二儿子/二女儿",
    detail: "老大备受器重，老幺备受娇宠，你夹在中间如同隐形人，最早就学会了察言观色与独自消化委屈。",
    kinshipBase: 10
  },
  {
    siblings: "长兄为父（下有正读中学的妹妹）",
    detail: "母亲常年病弱，父亲在外打工，你早早就学会了做饭和照看妹妹，习惯了压抑自己的欲望。",
    kinshipBase: 35
  },
  {
    siblings: "重组家庭（父母离异各自再婚，由祖父母抚养）",
    detail: "过年不知该去哪个家，在爷爷奶奶漏风的老平房里长大，骨子里极度渴望拥有属于自己的固定锚点。",
    kinshipBase: -10
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

  const reg = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  const par = PARENT_PROFILES[Math.floor(Math.random() * PARENT_PROFILES.length)];
  const sib = SIBLINGS_PROFILES[Math.floor(Math.random() * SIBLINGS_PROFILES.length)];
  const tone = EMOTIONAL_TONES[Math.floor(Math.random() * EMOTIONAL_TONES.length)];

  const initialSavings = Math.floor(
    reg.savingsRange[0] + Math.random() * (reg.savingsRange[1] - reg.savingsRange[0])
  );

  const backgroundStory = `你出生在${reg.region}。${par.detail}家里${sib.detail}在这个家里，${tone.detail}`;

  return {
    name,
    gender,
    family: {
      region: reg.region,
      regionDetail: reg.detail,
      parents: par.parents,
      parentsDetail: par.detail,
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
// 前半链：K-12 应试铁笼（6 ~ 18 岁）
// ============================================================================

export const K12_EVENTS: LifeEventNode[] = [
  // 6岁 小学入学
  {
    id: "k12_age_6",
    age: 6,
    stageName: "小学启蒙 · 6岁",
    title: "校门口的午餐盒与方言",
    scene:
      "开学第一周，周围城里的同桌掏出印着卡通图案的双层不锈钢保温饭盒，里面是切好的苹果和煎肉饼。你书包里是用旧油漆塑料桶改装的饭罐，装着母亲早起炒好的咸菜土豆丝。老师在讲台上用普通话点名，你一张嘴带出的浓重乡音引来全班一阵窃笑。",
    choices: [
      {
        text: "低头不语，午饭时悄悄躲到操场乒乓球台底下吃完",
        detail: "你早早学会了用自尊裹紧自己的贫瘠，把自卑磨成了内敛的硬壳。",
        reaction: "你开始学着城里同学的语调一字一句纠正发音，夜里在被窝里练普通话咬字。",
        savingsDelta: 0,
        autonomyDelta: 10,
        kinshipDelta: 5,
        institutionalDelta: 5,
        resilienceDelta: 15,
        addTags: ["自卑敏感", "早熟自尊"]
      },
      {
        text: "大方把咸菜分给同桌：‘我家自己腌的，尝尝很香’",
        detail: "你身上带着野草般的坦荡，贫穷没有第一时间压弯你的腰。",
        reaction: "同桌吃了一口被辣得直吸气，反倒和你成了下课一起拍卡片的朋友。",
        savingsDelta: 0,
        autonomyDelta: 15,
        kinshipDelta: -5,
        institutionalDelta: -5,
        resilienceDelta: 20,
        addTags: ["草莽韧劲", "社交直觉"]
      },
      {
        text: "回家赌气摔饭盒，逼母亲一定要给你买商场里那个45块钱的保温桶",
        detail: "母亲叹着气数出抽屉里带折痕的零钱，父亲在院子里重重抽了一口旱烟。",
        reaction: "第二天你如愿拿到了新饭盒，但母亲接下来整整两周每顿饭只就着白菜汤咽冷馍。",
        savingsDelta: -45,
        autonomyDelta: 5,
        kinshipDelta: 20,
        institutionalDelta: 10,
        resilienceDelta: -10,
        addTags: ["愧疚阴影", "面子执念"]
      }
    ]
  },

  // 10岁 补习与特长
  {
    id: "k12_age_10",
    age: 10,
    stageName: "小学高年级 · 10岁",
    title: "奥数班与少年宫的门票",
    scene:
      "四年级期末家长会，班主任在黑板上画出全区小升初划片指标，语气严厉：‘考不上重点初中实验班，后面高中基本没戏。’走廊里，别的家长都在排队抢报周末的奥数与英语精品小班，一学期学费相当于家里小半年的买菜钱。",
    choices: [
      {
        text: "主动拉着母亲衣角：‘妈我不喜欢数学，不用给我报班’",
        detail: "你懂事地为家里省下了这笔钱，把借来的二手旧习题集一题题抄在草稿纸上。",
        reaction: "母亲摸了摸你的头，眼里满是心疼。你只能靠自己的死磕把课本后所有思考题刷了三遍。",
        savingsDelta: 0,
        autonomyDelta: 15,
        kinshipDelta: 15,
        institutionalDelta: -5,
        resilienceDelta: 20,
        addTags: ["自力更生", "懂事压抑"]
      },
      {
        text: "父母四处找亲戚借钱交了学费，周末你骑破自行车横穿半座城去上课",
        detail: "坐在开着冷气的阶梯教室里，你连笔都不敢掉，唯恐漏听老师讲的任何一个速解口诀。",
        reaction: "你的成绩冲到了全班前五名，父母逢人就说‘我家乐意吃苦，将来是要考大城市的’。",
        savingsDelta: -1200,
        autonomyDelta: -10,
        kinshipDelta: 25,
        institutionalDelta: 25,
        resilienceDelta: 10,
        addTags: ["做题机器", "宗族期待"]
      },
      {
        text: "逃掉自习，跟着街角游戏厅和网吧的职校大孩子混在一起看打拳皇",
        detail: "屏幕上的霓虹闪烁和街机的轰鸣声，比黑板上的分数更让你感到鲜活真实。",
        reaction: "被父亲提着鸡毛掸子追打过两条街，你跪在堂屋地上，心里却第一次萌生了对所谓‘正道’的蔑视。",
        savingsDelta: -50,
        autonomyDelta: 25,
        kinshipDelta: -15,
        institutionalDelta: -30,
        resilienceDelta: 15,
        addTags: ["反叛胚子", "游离体外"]
      }
    ]
  },

  // 14岁 初三 普职分流（50%生死分水岭）
  {
    id: "k12_age_14",
    age: 14,
    stageName: "初三中考分流 · 14岁",
    title: "50%分流刀下的协议书",
    scene:
      "中考模拟考放榜，全校只有前48%的学生能上普通高中，剩下的面临被‘普职分流’。晚自习班主任把你叫到办公室，桌上摊着一份《中职技术学校直升保底协议》：免收前两年学费，直升汽修/护理/电子商务，附赠定向就业推荐。如果不签，一旦中考落榜连职校的好专业都挑不上。",
    choices: [
      {
        text: "咬死不签：‘我要考普高，哪怕只能去最烂的普高’",
        detail: "你拒绝了提前认命。接下来的三个月，你每天嚼风油精提神，草稿纸写满了整整两大编织袋。",
        reaction: "中考放榜那天，你的分数刚好压过县三中普高录取线3分，你攥着准考证在洗手间狠狠哭了一场。",
        savingsDelta: 0,
        autonomyDelta: 20,
        kinshipDelta: 10,
        institutionalDelta: 10,
        resilienceDelta: 25,
        addTags: ["拼命做题家", "守住普高"]
      },
      {
        text: "在协议书上签字：选了免学费的公办中专技术方向（汽修/护理/机械）",
        detail: "家里实在经不起继续供书的折腾，你决定提早三年学一门能果腹的硬核手艺。",
        reaction: "父母松了一口气。邻里七嘴八舌议论你‘没出息’，但你看着手上的扳手与实训室，心里异常踏实。",
        savingsDelta: 1000,
        autonomyDelta: 10,
        kinshipDelta: -10,
        institutionalDelta: -25,
        resilienceDelta: 30,
        addTags: ["职教蓝领", "手艺人底色"]
      },
      {
        text: "父母掏出养老钱走关系托人，交了两万八赞助费进私立高价高中",
        detail: "这笔巨款让家里接下来一年连肉都不敢买，老旧冰箱空空荡荡。",
        reaction: "走入私立高中的第一天，你背上的书包如同装满了铅块，你知道自己没有资格考砸一次。",
        savingsDelta: -28000,
        autonomyDelta: -20,
        kinshipDelta: 35,
        institutionalDelta: 15,
        resilienceDelta: 5,
        addTags: ["巨额学债", "心理重负"]
      }
    ]
  },

  // 17岁 高考志愿与命运终选
  {
    id: "k12_age_17",
    age: 17,
    stageName: "高三高考志愿 · 17岁",
    title: "出分之夜的志愿博弈",
    scene:
      "凌晨查分网站卡顿了半小时终于刷新出来。全家人围在老旧台式电脑前。分数处于一个极其微妙的梯队：可以留在省内保底读一个包分配的师范/警校/铁道专科，或者冒险冲出省外读一个毫无背景的普通综合院校文理科。",
    choices: [
      {
        text: "顺从父亲：填报省内定向/师范类/公费体制苗子专业",
        detail: "‘听爸的，安稳过一辈子，将来考个编制离家近，咱们家经不起任何风浪折腾。’",
        reaction: "录取通知书到了，全家人在县城饭馆摆了一桌，你在亲戚的敬酒声中感到一种平静而温和的窒息。",
        savingsDelta: 0,
        autonomyDelta: -25,
        kinshipDelta: 30,
        institutionalDelta: 35,
        resilienceDelta: -5,
        addTags: ["体制预备役", "安稳宿命"]
      },
      {
        text: "瞒着家里偷偷修改第一志愿：填报沿海城市双非大学工科/软件",
        detail: "你想去离家一千多公里的大海边，哪怕学费更贵、哪怕未来一切都要靠自己去闯。",
        reaction: "父亲得知后把茶杯砸得粉碎，整整一个月没和你说一句话。但你收拾行李箱的双手在兴奋地发抖。",
        savingsDelta: -3000,
        autonomyDelta: 35,
        kinshipDelta: -20,
        institutionalDelta: -15,
        resilienceDelta: 25,
        addTags: ["破门出走", "代码与工具"]
      },
      {
        text: "分数够高，稳稳拿下 211/985 重点院校硬核专业",
        detail: "十几年县中苦读的汗水终于在这一刻兑现，全县红榜上印着你的名字。",
        reaction: "村支书和校长亲自送来五千块奖学金。你成了全族人的荣光，但这枚勋章从此成了你脱不下来的盔甲。",
        savingsDelta: 5000,
        autonomyDelta: 10,
        kinshipDelta: 20,
        institutionalDelta: 20,
        resilienceDelta: 15,
        addTags: ["重点大学光环", "家族脸面"]
      }
    ]
  }
];

// ============================================================================
// 后半链：象牙塔与现实绞杀（18 ~ 27 岁）
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
        savingsDelta: 8000,
        autonomyDelta: 20,
        kinshipDelta: -10,
        institutionalDelta: -10,
        resilienceDelta: 25,
        addTags: ["拼命攒钱", "边缘独行"]
      },
      {
        text: "泡在图书馆和自习室：拼国家奖学金、考雅思/专业硬核证书",
        detail: "你相信只要把专业实力磨到极致，社会的规则就不会轻易将你埋没。",
        reaction: "你的专业绩点冲到年级前三，拿下了八千块国奖，但体检时发现腰椎已经开始出现生理曲度变直。",
        savingsDelta: 8000,
        autonomyDelta: 15,
        kinshipDelta: 10,
        institutionalDelta: 10,
        resilienceDelta: 15,
        addTags: ["硬核做题", "自律苦修"]
      },
      {
        text: "参与社团学生会，学习酒桌应酬与组织材料，积极争取入党推优",
        detail: "你敏锐察觉到了规则的运行逻辑，开始学着把棱角磨平，学着讲得体的套话与场面话。",
        reaction: "辅导员对你越来越赞许，甚至在年底的留校与推优指标上留了你的名字。你感到自己正在成为机器的一部分。",
        savingsDelta: 1000,
        autonomyDelta: -20,
        kinshipDelta: 15,
        institutionalDelta: 35,
        resilienceDelta: 10,
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
        savingsDelta: -5000,
        autonomyDelta: -25,
        kinshipDelta: 30,
        institutionalDelta: 35,
        resilienceDelta: -10,
        addTags: ["脱产考编", "深陷故土"]
      },
      {
        text: "拎着编织袋直奔一线城市城中村（深圳城中村/北京回龙观/上海松江），进入私企/大厂外包996",
        detail: "住在隔断出来的单间，窗外对着邻居家的空调外机，每天通勤三个小时挤在窒息的地铁早高峰。",
        reaction: "第一个月拿到转正工资七千五，扣除房租和杂费只剩一半。你第一次真正感知到什么是被城市榨取。",
        savingsDelta: 3500,
        autonomyDelta: 25,
        kinshipDelta: -15,
        institutionalDelta: -15,
        resilienceDelta: 20,
        addTags: ["大城市漂流", "996螺丝钉"]
      },
      {
        text: "靠一门硬技术/专业执照入行（汽修技师、医疗护工、咖啡连锁管培、独立手艺）",
        detail: "不图虚名，用体力与具体的专业技能换取现钱，每天下班手上都带着机油或消毒水味道。",
        reaction: "没有白领的光鲜，但你几乎没有失业焦虑。看着手里一点点积攒起来的硬通货，你感到一种粗粝的安全感。",
        savingsDelta: 6000,
        autonomyDelta: 20,
        kinshipDelta: -10,
        institutionalDelta: -25,
        resilienceDelta: 30,
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
        savingsDelta: 8500,
        autonomyDelta: 25,
        kinshipDelta: -5,
        institutionalDelta: -20,
        resilienceDelta: 25,
        addTags: ["硬骨头仲裁", "识破职场"]
      },
      {
        text: "忍气吞声签字走人，并在当晚电话里对父母报喜不报忧：‘公司很好，年终还有奖金’",
        detail: "挂断电话，你在零下五度的天桥上把冷掉的煎饼果子一口口咽下去，眼泪掉在塑料袋里。",
        reaction: "你把所有苦难咽进胃里化作慢性浅表性胃炎。为了省钱，你把出租屋退掉，搬进了不见天日的地下室隔间。",
        savingsDelta: -2000,
        autonomyDelta: -10,
        kinshipDelta: 20,
        institutionalDelta: 10,
        resilienceDelta: 10,
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
        savingsDelta: -2500,
        autonomyDelta: -15,
        kinshipDelta: 25,
        institutionalDelta: 15,
        resilienceDelta: -5,
        addTags: ["人情透支", "宗族审判"]
      },
      {
        text: "装作工作脱不开身，微信私发200元红包与祝福，拒绝回乡",
        detail: "同桌收了红包回了客套的表情，但高中群里关于你的讨论悄悄冷落下来，母亲打电话骂你‘不知人情冷暖’。",
        reaction: "你彻底被老家的核心熟人圈除名了。但那个长假，你在出租屋里安安静静看完了两本外语原版书，感到从未有过的清静。",
        savingsDelta: -200,
        autonomyDelta: 30,
        kinshipDelta: -30,
        institutionalDelta: -10,
        resilienceDelta: 20,
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
      "年终体检中心寄来密封报告单：甲状腺结节TI-RADS 4A类（建议穿刺穿检）、轻度脂肪肝、窦性心动过缓。同周，部门总监召集开会宣布：‘全行业都在降本增效，下季度全面取消周末双休，拥抱战时状态。’",
    choices: [
      {
        text: "去医院做穿刺检查，请假一周，开始把作息硬性切回11点前睡觉，拒绝无意义摸鱼加班",
        detail: "总监在周会上当众点名批评你‘缺乏创业狼性，对待团队没有奉献精神’，并将你从核心项目踢出。",
        reaction: "虽然绩效被打了C，但结节复查为良性。你站在深夜空无一人的天桥上，看着满城霓虹，心里嘲笑他们的狂热。",
        savingsDelta: -1500,
        autonomyDelta: 25,
        kinshipDelta: -5,
        institutionalDelta: -25,
        resilienceDelta: 20,
        addTags: ["保命哲学", "看破内卷"]
      },
      {
        text: "把报告塞进抽屉最深处假装没看见，吞两颗止痛片继续在深夜两点写PPT",
        detail: "‘大家都这么熬，我如果停下来，下个月的房租和老家父母的降压药钱谁来出？’",
        reaction: "年底你拿到了‘卓越奋斗者’奖杯和一万二奖金，但你发现自己晨起时心慌手抖的次数越来越频繁。",
        savingsDelta: 12000,
        autonomyDelta: -20,
        kinshipDelta: 15,
        institutionalDelta: 20,
        resilienceDelta: 5,
        addTags: ["肉体燃料", "自毁型奋斗"]
      }
    ]
  },

  // 26岁 职场第4年
  {
    id: "career_age_26",
    age: 26,
    stageName: "走向社会 · 第4年",
    title: "二线城市的六个钱包与三十年绞索",
    scene:
      "春节回家，父母突然关上房门，把一张存折拍在桌上：‘我和你爸把老平房抵押，加上半辈子养老金，一共凑了60万。你在合肥/武汉/郑州看好了一套期房，首付我们包了，每月房贷8200元你自己供，不买房哪个姑娘肯跟你结婚？’",
    choices: [
      {
        text: "接过存折按揭签字，背上30年房贷，完成全家族的阶层跨越执念",
        detail: "签完字那一刻，你看着红色的购房合同，感到这辈子的人生路径已经被打上了水泥钢筋。",
        reaction: "从此你不敢离职、不敢生病、不敢轻易换工作。每个月工资一到账就自动划扣8200元，你彻底被锁死在城市机器上。",
        savingsDelta: -20000,
        autonomyDelta: -35,
        kinshipDelta: 35,
        institutionalDelta: 30,
        resilienceDelta: -15,
        addTags: ["三十年房奴", "全家锁死"]
      },
      {
        text: "坚决推开存折：‘你们把老房抵押了，万一生大病住哪？我绝不为了所谓面子买高位期房’",
        detail: "父亲气得浑身发抖，拍桌子怒吼‘你这是大逆不道！我们在亲戚面前头都抬不起来！’",
        reaction: "母亲抹着眼泪叹气。你背上背包连夜坐车返回出租屋，两代人的鸿沟在这一晚彻底裂成无法弥合的东非大裂谷。",
        savingsDelta: 0,
        autonomyDelta: 40,
        kinshipDelta: -35,
        institutionalDelta: -20,
        resilienceDelta: 25,
        addTags: ["割席决绝", "不当接盘侠"]
      }
    ]
  },

  // 27岁 职场第5年（宿命之年）
  {
    id: "career_age_27",
    age: 27,
    stageName: "走向社会 · 第5年",
    title: "母亲的病危通知与跨洋签证通知",
    scene:
      "五月中旬，老家县医院打来电话：母亲突发急性胆管炎并发心衰，医生语气凝重：‘我们县里设备不行，你必须尽快想办法弄到省协和医院的急诊床位，最好找熟人托关系……’\n\n就在同一天的同一小时，你手机邮箱里弹出了一封通知：你一年前悄悄递交的海外打工签证/留工资格获得了初步批准，要求在30天内核验资金与登机时间。",
    choices: [
      {
        text: "托尽所有高中同学和关系，带着全部存款赶回省城医院陪护病床",
        detail: "你用尽了所有的脸面托到了一张加床。你在充满来苏水味道的走廊里陪护了两周，给母亲端屎端尿，放弃了海外出走的机会。",
        reaction: "母亲的手在输液管下枯瘦泛黄。看着窗外的灰蒙天空，你清楚自己这辈子注定要死死绑在这片泥土里了。",
        savingsDelta: -35000,
        autonomyDelta: -30,
        kinshipDelta: 40,
        institutionalDelta: 25,
        resilienceDelta: 10,
        addTags: ["孝道羁绊", "肉身归巢"]
      },
      {
        text: "把手里攒下的积蓄大半汇回老家托亲友照看，自己咬牙办理出国公证与离境手续",
        detail: "‘如果我也留在这里，全家最终不过是一起沉入泥潭。我必须在外面踩出一块浮木。’",
        reaction: "在去往机场的大巴上，看着后视镜里越来越小的故乡地平线，眼泪止不住地涌出，你成为了家族名义上的逃兵。",
        savingsDelta: -25000,
        autonomyDelta: 45,
        kinshipDelta: -20,
        institutionalDelta: -35,
        resilienceDelta: 35,
        addTags: ["断脐出海", "背负骂名"]
      }
    ]
  }
];

// ============================================================================
// 27 岁命运解构与诊断引擎
// ============================================================================

export interface LifeDiagnosis {
  type: "stay" | "emigrate" | "migrant_bird";
  title: string;
  portrait: string;
  kinshipEvaluation: string;
  systemEvaluation: string;
  fateVerdict: string;
  recommendation: string;
}

export function evaluate27YearOldLife(
  autonomy: number,
  kinship: number,
  institutional: number,
  savings: number,
  tags: string[]
): LifeDiagnosis {
  const savingsNote = savings > 20000 ? `你手握约 ${savings.toLocaleString()} 元结余，这是你唯一的盘缠底牌。` : `你手中几乎没有流动现金积蓄，只能靠纯粹的体力或决绝走险。`;
  // If kinship and institutional are high, naturally suited for staying
  if (kinship >= 50 && institutional >= 20) {
    return {
      type: "stay",
      title: "【宿命之木 · 扎根故土型】",
      portrait: `你在熟人网络与体制安全感中长成。虽然你多次抱怨过它的逼仄与人情盘剥，但你骨子里最离不开的，恰恰是这种稠密的烟火温度。${savingsNote}`,
      kinshipEvaluation: `宗族重力指数：${kinship}/100（极高）。亲人的病痛与期盼会随时拽动你的心脏，离开故土会让你在异国雪夜被内疚彻底风干。`,
      systemEvaluation: `体制依附度：${institutional}/100（高）。你更适应确定的轨道，对异域无依无靠的野蛮丛林缺乏天然免疫力。`,
      fateVerdict: `你的一亩三分地就在这里。认认真真接纳人情社会的人情与责任，在熟悉的熟人圈里建立防线，是你的宿命。`,
      recommendation: `留在国内体制或熟人圈深耕，善用家庭网抵抗风浪。`
    };
  }

  // If autonomy is very high and kinship is low or broken
  if (autonomy >= 55 || tags.includes("断脐出海") || tags.includes("割席决绝")) {
    return {
      type: "emigrate",
      title: "【断脐孤舟 · 肉身出海型】",
      portrait: `你生来长着一副反叛的骨骼。那些被常人视作避风港的亲缘、面子与编制，对你而言是窒息的绞索。`,
      kinshipEvaluation: `宗族重力指数：${kinship}/100（脱敏）。你早已在精神上断脐，能够冷酷地切除毫无边界的情感勒索。`,
      systemEvaluation: `体制依附度：${institutional}/100（极低）。你拒绝成为任何宏大叙事的燃料，宁可在陌生文明做局外人，也不愿在故土被按头审判。`,
      fateVerdict: `你天生适合出海。异国很冷、语言很硬、终生为客，但只要头顶没有宗族的审判与35岁的断头台，你就能在甲板上睡得无比安稳。`,
      recommendation: `果断割舍沉没成本，带上你的技能与存款，奔赴异邦。`
    };
  }

  // Otherwise: Migrant bird (出去淘金/换技能，再回来)
  return {
    type: "migrant_bird",
    title: "【飞渡候鸟 · 渡海借风型】",
    portrait: `你既不是传统的孝道殉道者，也不是决绝的文化背叛者。你是一只极度务实的候鸟，看清了国内的拥挤，但也舍不下熟悉的饭局与根须。`,
    kinshipEvaluation: `宗族重力指数：${kinship}/100（平衡）。你在意亲人，但不愿为无底洞埋葬自己；你需要靠外部的距离维系体面。`,
    systemEvaluation: `体制依附度：${institutional}/100（审慎）。你懂得体制的残酷，因此渴望去海外赚取外币、拿到技能杠杆与免死金牌。`,
    fateVerdict: `去异邦闯荡三到八年，赚回你在国内十年都攒不下的现金与技能壁垒。当你羽翼丰满，带着一身盐霜归来时，你将握有支配人生的主动权。`,
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
      "那一晚你跪在故乡的祠堂前，知道那根连通故土的血缘脐带彻底断了，你成了名副其实的孤魂野鬼。",
    stayedReflection:
      "你为父亲办了一场体面的白事，收回了当年送出去的七万多份子钱。你在疲惫中感到一种宿命的完满。",
    choice: {
      text: "在生离死别的坟茔前，你给这一代父母磕了三个头",
      detail: "所有的恩怨、孝顺与逃避，都在黄土掩埋棺木的那一刻化作了青烟。",
      reaction: "你终于意识到：人到中年，故土不再是那个温暖的窝，而是父母的一座坟。"
    }
  },

  // 52岁
  {
    age: 52,
    title: "52岁 · 下一代的归属与裂痕",
    theme: "香蕉人的代沟 vs 高考陪读军备竞赛",
    emigratedScene:
      "你的孩子在当地公立学校长大，讲一口纯正无口音的流利外语，中文只能结结巴巴说几句日常词汇。晚餐桌上，他直呼你的名字，反驳你的中式道德观念，甚至抗拒跟你去唐人街。你看着眼前这个完全西化的下一代，突然意识到：你用一生的流散换来了他的自由，但他对你来自何方毫不关心。",
    stayedScene:
      "孩子高三，你在县城一中对面租了一套阴暗的陪读房。每天早晨5点半起床熬骨头汤，夜里11点半等孩子自习归来。为了让孩子能通过高考或者考编政审，你甚至不敢和拖欠物业费的邻居大声吵架。你把自己未能实现的阶层跃迁，沉重地压在这个十七岁少年的双肩上。",
    emigratedReflection:
      "你成功切断了家族的贫困循环，但也亲手斩断了文化与代际的香火相传。",
    stayedReflection:
      "中国式父母的宿命在你身上完美闭环：你变成了当年那个逼你读书、让你窒息的父亲。",
    choice: {
      text: "你默默收回了伸向下一代命运的手，学着尊重他们的生长",
      detail: "一代人有一代人的沼泽，你无法替他们排干所有的水。",
      reaction: "白发爬上了你的鬓角，你开始习惯在黄昏的余晖里独自坐上很久。"
    }
  },

  // 63岁
  {
    age: 63,
    title: "63岁 · 法定退休终局",
    theme: "海外养老金与草坪看日落 vs 熟人社会含饴弄孙",
    emigratedScene:
      "你按期办理了当地政府的法定养老金，住在市郊带有一小片草坪的砖木平房里。每周二有社区护工按时上门测量血压与血糖。你偶尔去当地华人超市买一袋临期的榨菜。回望这一生：你没有大富大贵，但你逃脱了35岁危机、房贷死结、酒局人情与无尽的内卷。你在无菌的平静中老去，身边是广袤的异域暮色。",
    stayedScene:
      "全国延迟退休改革落地，你终于在63岁这年领到了第一笔退休社保金。早晨6点去人民公园练太极剑，下午踩着老旧电动车穿过喧闹的菜市场接送孙子放学。周末老同事聚餐，依然在津津乐道当年谁当了处长、谁退居二线。你这一生从未脱轨，被人群簇拥着走过生老病死，你疲惫不堪，但你死在自己的泥土里。",
    emigratedReflection:
      "你用一生的孤独换回了最昂贵的奢侈品——在任何人的注视与评价之外，支配属于自己的每一秒。",
    stayedReflection:
      "你用一生的顺从融入了这片庞大稠密的熟人网络。你没有飞远，但你拥抱了泥土里最真实的炊烟。",
    choice: {
      text: "这一生走到终点，你合上了这本六十余载的命运手记",
      detail: "世上本无完美的选择，所有被你舍弃的风景，都在另一个平行时空盛开。",
      reaction: "风停了，日光照在泛黄的纸页上，一切归于尘埃。"
    }
  }
];

// ============================================================================
// 63 岁终局一生判词（Final Lifetime Verdict）
// ============================================================================

export interface LifetimeVerdict {
  summaryTitle: string;
  verdictText: string;
  tagline: string;
}

export function generateFinalLifetimeVerdict(
  path: "emigrate" | "stay",
  autonomy: number,
  kinship: number
): LifetimeVerdict {
  if (path === "emigrate") {
    const detail = autonomy >= 60 
      ? "你骨子里生来就拥有极高的个体自主渴望，在异国三十余载的清冷与自由中，你终于完完全全活成了自己。"
      : "虽在异邦漂泊，但每逢深夜，老家院子里的那棵枣树仍会偶尔入梦。你以巨大的坚忍平衡了两端。";
    return {
      summaryTitle: "【西行孤舟 · 断脐成神】",
      tagline: "“生为客，死为客，天地之间一微尘。”",
      verdictText:
        `你在二十七岁那年做出了此生最惊心动魄的决断：斩断两代人的伦理脐带，将身家性命押在一张单程机票上。${detail}在异邦的漫长岁月里，你忍受了语言隔阂、无休止的身份排期与文化隔裂，但你赢回了一样这片故土最难赐予的奇迹——你不再是谁的燃料，不再是谁的面子，你完整地成为了你自己。你在异邦的草坪前看着落日，你知道，你无愧于这趟人间的冒险。`
    };
  } else {
    const detail = kinship >= 50
      ? "你对血缘和故土有着天然的深沉依恋，那些烟火气和亲友的絮叨，是你一生最踏实的解药。"
      : "你曾数次想过远走高飞，但终究被现实的引力留在了这片泥土，你在琐碎的生活中修成了另一种豁达。";
    return {
      summaryTitle: "【归巢之木 · 守土安魂】",
      tagline: "“生于斯，长于斯，死于斯，泥土才是最后的归宿。”",
      verdictText:
        `你在二十七岁那年收起了出海的佩剑，选择向你脚下的泥土低头。${detail}随后的岁月里，你被三十年房贷勒过脖子，在35岁危机里咽过苦酒，在医院走廊陪护过老人的生离死别，也把下一代送上了同样的应试天梯。你的一生平凡、琐碎甚至沉重，但你从未真正孤单过。每逢除夕万家灯火，满桌的饭菜和亲人的唠叨是你抵御虚无的唯一铠甲。你以一种古老而庄重的方式，完成了作为一个中国人的生命轮回。`
    };
  }
}
