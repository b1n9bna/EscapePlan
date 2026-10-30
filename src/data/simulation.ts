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

export interface CharacterAttributes {
  inferiority: number; // 自卑创伤 (0: 极其坦荡, 100: 极度自卑敏感)
  academicCapital: number; // 做题应试资本 (0: 毫无兴趣, 100: 顶尖做题机器)
  kinshipGuilt: number; // 宗族愧疚与重负 (0: 毫无包袱, 100: 负罪爆表)
  rebellion: number; // 反叛与逆鳞 (0: 规矩温顺, 100: 随时掀翻棋盘)
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
    detail: "标准体制内中层，恪守本分，信奉“稳定压倒一切”，对你的人生有极强规划与控制欲。"
  },
  {
    parents: "农贸市场活禽/生肉摊档夫妻",
    detail: "起早贪黑双手生冻疮，用零钞毛票供你上学，说话门门大嗓门，信奉实利与真金白银。"
  },
  {
    parents: "珠三角五金模具厂两栖打工族",
    detail: "长年住工厂铁架床宿舍，逢年过节才拎着年货回老家，总带着未能陪伴你的愧疚与自责。"
  },
  {
    parents: "下岗开黑车/跑滴滴 + 早市面点摊",
    detail: "经历过90年代企业买断的创伤，早早白了头发，把所有未能实现的阶层跨越死死寄托在你身上。"
  },
  {
    parents: "乡镇卫生院大夫 + 初中教导员",
    detail: "地方上体面受敬重的人家，清贫但讲规矩，最害怕子女“做出格的事”让家族蒙羞。"
  },
  {
    parents: "小服装厂破产转型开菜鸟驿站 + 社区团购",
    detail: "曾见过小老板的体面，后来背了债务缩回仓库理快递，每天在货架间疲于奔命。"
  },
  {
    parents: "建筑工地铁瓦工师傅 + 守家务农母亲",
    detail: "父亲一身风湿与老茧，每年年底最怕包工头卷款跑路，母亲在老家守着几分责任田。"
  },
  {
    parents: "省城高校后勤管理员 + 市立医院护士长",
    detail: "每天见识教授和专家的光鲜，深知文凭是唯一翻盘阶梯，从小对你推行军事化作息。"
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
        detail: "你没有哭，但那些路过同学投来的探寻目光，像小刀一样刻在你的骨髓里。",
        reaction: "从那天起，你暗暗发誓要用成绩让所有人闭嘴。期末考试你考了年级第一名。",
        delta: { academicCapital: 25, inferiority: 15, resilience: 15 },
        addTags: ["骨气自尊", "应试报复心"]
      },
      {
        text: "中午趁老师不注意，跑去学校后山水沟里抓小龙虾和小泥鳅卖给菜市场小贩凑钱",
        detail: "满身泥浆，指甲缝里全是黑泥，但你真的用塑料袋换回了皱巴巴的八张十元纸币。",
        reaction: "当你把钱啪地拍在讲台上时，班主任愣住了。你第一次体会到金钱带来的尊严反击。",
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
    title: "炼钢炉的倒计时与生理极限",
    scene:
      "进入冲刺之年。普高黑板上‘距高考还有88天’如同滴血的刺刀，早晨5点半跑操背单词，同桌在晚自习号啕大哭被退学；\n职高这边，工厂的大巴车已经开到校门口，班主任催促大家签三方顶岗实习协议，只有极少数人还在准备对口高职高考。",
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
      title: "【985/211重点大学 · 顶级做题家金身】",
      scoreText: "高考总分 642 分（全省排位前 1.2%），稳稳斩获重点大学王牌硬核理工/经管专业！",
      verdict:
        "你在长达十二年的应试炼钢炉里杀出了重围！红榜挂满了县城主干道，校长亲自登门送上奖学金，全族人把你看作改写门楣的英雄。你用十二年的自我压抑换来了这枚勋章，但从此你只能往上爬，不能跌下来。",
      academicCapitalDesc: "顶级文凭金身已备，拥有校友网与顶级校招入场券，也是背负两代人全部期望的苦行僧。",
      psychologicalDossier: `宗族负荷：${attrs.kinshipGuilt}%，自卑创伤：${attrs.inferiority}%。你虽然赢得了考试，但骨子里深恐阶层跌落。`,
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
      psychologicalDossier: `反叛指数：${attrs.rebellion}%，自卑创伤：${attrs.inferiority}%。你渴望大城市的自由，但口袋空空。`,
      firstStepChoice: {
        prompt: "进入大学校园，你的生存重心定为：",
        options: [
          {
            text: "瞒着家里在沿海城市疯狂兼职实习、自学敲代码和外语，早早融入市场求生",
            detail: "不靠学校教的书本，在大学四年就用社会真实需求锻造自己的生存獠牙。",
            delta: { resilience: 30, rebellion: 20, savings: 5000 },
            addTags: ["双非文理", "破门出走"]
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
      "出分那一晚，客厅里死一般沉寂。母亲默默抹眼泪，父亲在阳台连续抽了半包劣质烟。你十二年的应试天梯在这一刻提前落下了闸门。你终于承认：自己不是做题的天才。但生活还要继续。",
    academicCapitalDesc: "大专文凭，在遍地本科生的时代显得有些单薄，唯有硬核技能能防身。",
    psychologicalDossier: `自卑创伤：${attrs.inferiority + 20}%。家人的叹息如针扎，但你也彻底放下了做题家的包袱。`,
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
        addTags: ["人情透支", "宗族审判"]
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
      "年终体检中心寄来密封报告单：甲状腺结节TI-RADS 4A类（建议穿刺穿检）、轻度脂肪肝、窦性心动过缓。同周，部门总监召集开会宣布：‘全行业都在降本增效，下季度全面取消周末双休，拥抱战时状态。’",
    choices: [
      {
        text: "去医院做穿刺检查，请假一周，开始把作息硬性切回11点前睡觉，拒绝无意义摸鱼加班",
        detail: "总监在周会上当众点名批评你‘缺乏创业狼性，对待团队没有奉献精神’，并将你从核心项目踢出。",
        reaction: "虽然绩效被打了C，但结节复查为良性。你站在深夜空无一人的天桥上，看着满城霓虹，心里嘲笑他们的狂热。",
        delta: { rebellion: 25, resilience: 20, savings: -1500 },
        addTags: ["保命哲学", "看破内卷"]
      },
      {
        text: "把报告塞进抽屉最深处假装没看见，吞两颗止痛片继续在深夜两点写PPT",
        detail: "‘大家都这么熬，我如果停下来，下个月的房租和老家父母的降压药钱谁来出？’",
        reaction: "年底你拿到了‘卓越奋斗者’奖杯和一万二奖金，但你发现自己晨起时心慌手抖的次数越来越频繁。",
        delta: { rebellion: -20, kinshipGuilt: 20, savings: 12000 },
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
        delta: { kinshipGuilt: 40, rebellion: -40, savings: -20000, resilience: -15 },
        addTags: ["三十年房奴", "全家锁死"]
      },
      {
        text: "坚决推开存折：‘你们把老房抵押了，万一生大病住哪？我绝不为了所谓面子买高位期房’",
        detail: "父亲气得浑身发抖，拍桌子怒吼‘你这是大逆不道！我们在亲戚面前头都抬不起来！’",
        reaction: "母亲抹着眼泪叹气。你背上背包连夜坐车返回出租屋，两代人的鸿沟在这一晚彻底裂成无法弥合的东非大裂谷。",
        delta: { rebellion: 45, kinshipGuilt: -35, resilience: 25 },
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
        delta: { kinshipGuilt: 45, rebellion: -30, savings: -35000 },
        addTags: ["孝道羁绊", "肉身归巢"]
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
  if (tags.includes("三十年房奴") || (attrs.kinshipGuilt >= 60 && tags.includes("孝道羁绊"))) {
    return {
      type: "stay_exhausted",
      title: "【血肉干电池 · 宗族负重者】",
      portrait: `你是典型的“中国好儿女”，但也是被两代人吸得最干的骆驼。房贷、老人的医药费、弟弟妹妹的指望，如同一根根铜丝穿透了你的肩胛骨。${savingsNote}`,
      kinshipEvaluation: `宗族愧疚度：${attrs.kinshipGuilt}/100（重度超标）。离开这片土地对你而言不是地理问题，而是道德受审的死刑。`,
      systemEvaluation: `体制依附度：中高。你需要稳定的现金流来按月止血，不敢有半步差池。`,
      fateVerdict: `你已经交出了自己的佩剑。你属于这片土地的基石，平凡而沉重。你会在漫长的叹息中老去，但在亲族眼里，你是那个用血肉托起全家的圣人。`,
      recommendation: `留下来，认认真真搞钱防守，学会在亲族面前建立财务底线，谨防被无底洞拖垮。`
    };
  }

  // 3. 彻底断脐决绝型出海
  if (attrs.rebellion >= 55 || tags.includes("断脐出海") || tags.includes("割席决绝") || tags.includes("破门出走")) {
    return {
      type: "emigrate_autonomous",
      title: "【断脐孤舟 · 精神异邦人】",
      portrait: `你的骨骼天生无法承受东亚宗族社会的重力。那些被常人视作安全感的“孝道、编制、学区房、老家面子”，对你而言是窒息的绞索。${savingsNote}`,
      kinshipEvaluation: `宗族愧疚度：${attrs.kinshipGuilt}/100（脱敏）。你早已在精神上断脐，能够冷酷地切除毫无边界的情感勒索。`,
      systemEvaluation: `体制依附度：极低。你拒绝成为任何宏大叙事的燃料，宁可在陌生文明做局外人，也不愿在故土被按头审判。`,
      fateVerdict: `你天生适合出海。异国很冷、语言很硬、终生为客，但只要头顶没有宗族的审判与35岁的断头台，你就能在甲板上睡得无比安稳。`,
      recommendation: `果断割舍沉没成本，带上你的技能与存款，奔赴异邦。`
    };
  }

  // 4. 体制内舒适/如鱼得水型留下
  if (attrs.kinshipGuilt >= 40 && attrs.rebellion < 40) {
    return {
      type: "stay_comfortable",
      title: "【宿命之木 · 熟人温室型】",
      portrait: `你在人情网络与体制秩序中长大。虽然你也曾抱怨过它的形式主义与酒局应酬，但你骨子里最得心应手的，恰恰是熟人社会的潜规则。${savingsNote}`,
      kinshipEvaluation: `宗族愧疚度：${attrs.kinshipGuilt}/100（高）。逢年过节的走动、长辈的关系条子、生病时的熟人医生，正是你抗击世界风浪的坚固护甲。`,
      systemEvaluation: `体制依附度：高。你离不开确定的保障与集体的归属。`,
      fateVerdict: `千万不要轻易出逃。把一条热带鱼扔进冰冷深海只会冻死，你属于东亚内陆温暖稠密的人情池塘。留下来，深耕你的人脉网。`,
      recommendation: `考编、进体制、或在省城成熟企业按部就班，借力打力安稳过一生。`
    };
  }

  // 5. 空心名校/大厂做题家迷茫型
  if (tags.includes("重点大学光环") && attrs.rebellion < 50) {
    return {
      type: "lost_scholar",
      title: "【空心做题家 · 进退维谷者】",
      portrait: `你是一路赢上来的天之骄子，但社会的前五年把你的优越感剥得一干二净。在大厂你面临35岁优化，在体制外你没有硬核生存手艺，你被卡在中间不上不下。${savingsNote}`,
      kinshipEvaluation: `宗族愧疚度：${attrs.kinshipGuilt}/100。你承载着家族唯一的面子，因此你最害怕“承认自己不过是个普通人”。`,
      systemEvaluation: `体制依附度：中等摇摆。你既鄙视官僚，又极度渴望一份长期的安全感。`,
      fateVerdict: `你必须完成一次彻底的精神脱胎换骨。要么放下名校身段去异邦重新归零读书/重修技能，要么彻底向体制投降考公回流。`,
      recommendation: `若出海，选择高性价比技术移民或二硕跳板；若留，尽早考取带编制岗位。`
    };
  }

  // 6. 飞渡候鸟型（两头吃）
  return {
    type: "migrant_bird",
    title: "【飞渡候鸟 · 渡海借风型】",
    portrait: `你既不是传统的孝道殉道者，也不是决绝的文化背叛者。你是一只极度务实的候鸟，看清了国内的拥挤，但也舍不下熟悉的饭局与根须。${savingsNote}`,
    kinshipEvaluation: `宗族愧疚度：${attrs.kinshipGuilt}/100（平衡）。你在意亲人，但不愿为无底洞埋葬自己；你需要靠外部的物理距离维系体面。`,
    systemEvaluation: `体制依附度：审慎。你懂得体制的残酷，因此渴望去海外赚取外币、拿到技能杠杆与免死金牌。`,
    fateVerdict: `去异邦闯荡五到八年，赚回你在国内十年都攒不下的现金与技能壁垒。当你羽翼丰满，带着一身盐霜归来时，你将握有支配人生的主动权。`,
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
        summaryTitle: "【异邦大工 · 逆天拓荒】",
        tagline: "“手上有茧，心中有粮，四海皆可为家。”",
        verdictText:
          "你在二十七岁那年做出了最果断的决定——带着一套汽修扳手或护理手艺渡海。在那些尊重体力与技能的国度，你用汗水浇灌出属于自己的两层小楼与草坪。你没有名校金身，却活出了最踏实的尊严。虽然乡音已远，但在异邦的落日下，你的一双手改写了整整三代人的命运。"
      };
    }

    // 2. 彻底断脐孤舟
    if (attrs.rebellion >= 50 || tags.includes("断脐出海")) {
      return {
        summaryTitle: "【西行孤舟 · 断脐成神】",
        tagline: "“生为客，死为客，天地之间一微尘。”",
        verdictText:
          "你在二十七岁那年亲手斩断了故土的所有绳索。随后的岁月里，你吞咽了无尽的白人社会局外人冷清，忍受了双亲离世无法送终的锥心长夜。但你赢回了一样故土无论如何无法给予的至宝——在任何人的注视、评价与道德绑架之外，完完整整做了一回自己。你虽孤独，但你自由如风。"
      };
    }

    // 3. 候鸟两栖型
    return {
      summaryTitle: "【渡海候鸟 · 沧海归巢】",
      tagline: "“借异邦之风，暖人间烟火。”",
      verdictText:
        "你在外海拼杀了半生，拿到了资本与技能的免死金牌。你既看过了世界的辽阔，也看清了西方文明的疏离。晚年的你带着一身海盐回到故土或东南亚暖阳里，心平气和地俯视人间的纷扰。你这辈子没有被任何一种主义困死，你把世界当成了自己的猎场与后花园。"
    };
  } else {
    // 留在国内的分支
    // 4. 房贷与宗族耗尽型
    if (tags.includes("三十年房奴") || tags.includes("全家锁死")) {
      return {
        summaryTitle: "【耗尽之烛 · 宗族燃料】",
        tagline: "“把骨髓熬成油，照亮旁人的路。”",
        verdictText:
          "二十七岁那年你接下了那本按揭合同，从此你的青春被水泥钢筋封死。你扛着全家人的虚荣、孩子的学区房、父母的降压药，像老黄牛一样耕了一辈子。六十三岁这年房贷终于还清，你看着镜子里佝偻苍老的自己，流下了两行浊泪。你这一生苦不堪言，但你撑起了一个家。"
      };
    }

    // 5. 体制与熟人安魂型
    if (attrs.kinshipGuilt >= 40) {
      return {
        summaryTitle: "【归巢之木 · 守土安魂】",
        tagline: "“生于斯，长于斯，死于斯，泥土才是最后的归宿。”",
        verdictText:
          "你选择向脚下的故土低头。虽然你也被内卷与人情社会的琐碎摩擦过，但每逢除夕万家灯火，满桌的饭菜和亲友的嘘寒问暖成了你抵御虚无的唯一铠甲。六十三岁领了退休金，你在人民公园打太极，接送孙子放学。你死在自己的泥土里，子孙在坟前烧纸，你完成了作为一个中国人的古老轮回。"
      };
    }

    // 6. 市井野草型
    return {
      summaryTitle: "【市井狂草 · 扎根乱石】",
      tagline: "“野火烧不尽，春风吹又生。”",
      verdictText:
        "你没有大富大贵，也没有体制铁饭碗。你在中国社会的夹缝与激流中扑腾了一辈子，靠着察言观色和一股子野蛮的生命力活了下来。你见证了大街小巷的变迁，看尽了时代的繁华与荒诞。你这一生活得粗糙、热烈而有韧劲，如同长在老城墙砖缝里的一株野草。"
    };
  }
}
