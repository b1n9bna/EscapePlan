export interface Profession {
  id: string;
  name: string;
  icon: string;
  backgroundDesc: string;
}

export interface SimProfile {
  id: string;
  name: string;
  age: number;
  gender: "男" | "女";
  profession: Profession;
  education: string;
  hometown: string;
  initialSavingsRMB: number;
  englishLevel: string;
  targetCountryId: string;
  // 1in8b Global Demographic Stats
  globalBirthRank: string;
  globalWealthPercentile: number; // 超过全球百分之多少的人口
  baseHealth: number;
  baseHappiness: number;
  baseLanguage: number;
  baseBelonging: number;
}

export interface SimChoice {
  text: string;
  detail: string;
  narrative: string;
  fundsDelta: number;
  healthDelta?: number;
  happinessDelta?: number;
  languageDelta?: number;
  belongingDelta?: number;
}

export interface SimDiaryEntry {
  year: number;
  timeLabel: string;
  sceneTitle: string;
  sceneText: string;
  worldFact: string; // 联合国/WHO/OECD真实统计学切片
  parallelWorldMoment: string; // 此时此刻，地球上80亿人的另一秒
  choices: SimChoice[];
}

export interface SimCountry {
  id: string;
  name: string;
  flag: string;
  city: string;
  livingCostDesc: string;
  // 1in8b Demographic Real-World Stats
  lifeExpectancy: number; // 预期寿命
  annualSunshineHours: number; // 年均日照时数
  immigrantSharePercent: string; // 移民人口占比
  medianMonthlyWageRMB: string; // 真实全职中位数月薪
}

export const PROFESSIONS: Profession[] = [
  {
    id: "clerk",
    name: "二线城市普通文员 / 客服",
    icon: "📄",
    backgroundDesc: "日常处理表格与客户琐事，月薪四五千，存不下什么钱但也相对稳定。"
  },
  {
    id: "barista",
    name: "连锁店咖啡师 / 烘焙学徒",
    icon: "☕",
    backgroundDesc: "站一整天拉花打奶泡，手上常有被蒸汽烫到的小伤口，熟悉服务业日常。"
  },
  {
    id: "nurse",
    name: "普通医院护士 / 养老院护理",
    icon: "🏥",
    backgroundDesc: "倒班三班倒，看惯了生老病死与家长里短，耐心好、不怕脏和累。"
  },
  {
    id: "technician",
    name: "汽修工 / 家电维修小哥",
    icon: "🔧",
    backgroundDesc: "懂一点电路和机械，指甲缝里总有点洗不净的机油，擅长动手解决问题。"
  },
  {
    id: "teacher",
    name: "幼儿园老师 / 辅导班老师",
    icon: "📚",
    backgroundDesc: "带小朋友有耐心，嗓子常年有点哑，性格温和内向。"
  },
  {
    id: "dev",
    name: "普通外包程序员 / 运维",
    icon: "💻",
    backgroundDesc: "写普通的业务代码，常年久坐腰不太好，不擅长人际应酬。"
  },
  {
    id: "freelancer",
    name: "刚毕业两年的迷茫年轻人",
    icon: "🎒",
    backgroundDesc: "换过两三份工作，不知道未来要做什么，想换个环境看看世界。"
  }
];

export const SIM_COUNTRIES: SimCountry[] = [
  {
    id: "japan",
    name: "日本",
    flag: "🇯🇵",
    city: "东京郊区 / 大阪",
    livingCostDesc: "生活成本适中，物价精细，满街便利店与自行车道。",
    lifeExpectancy: 84.6,
    annualSunshineHours: 1950,
    immigrantSharePercent: "2.4%",
    medianMonthlyWageRMB: "约 1.8 万 RMB"
  },
  {
    id: "australia",
    name: "澳大利亚",
    flag: "🇦🇺",
    city: "悉尼郊区 / 维州农场小镇",
    livingCostDesc: "阳光充沛，草坪宽阔，人工极贵，靠体力劳动能自给自足。",
    lifeExpectancy: 83.3,
    annualSunshineHours: 2630,
    immigrantSharePercent: "29.8%",
    medianMonthlyWageRMB: "约 2.6 万 RMB"
  },
  {
    id: "germany",
    name: "德国",
    flag: "🇩🇪",
    city: "柏林郊区 / 杜伊斯堡",
    livingCostDesc: "生活节奏严谨，严格八小时下班，周日全城闭店安宁。",
    lifeExpectancy: 81.0,
    annualSunshineHours: 1620,
    immigrantSharePercent: "28.7%",
    medianMonthlyWageRMB: "约 2.4 万 RMB"
  },
  {
    id: "spain",
    name: "西班牙",
    flag: "🇪🇸",
    city: "瓦伦西亚 / 阿利坎特",
    livingCostDesc: "气候温暖日照长，物价宜人，漫步地中海海滩与街巷。",
    lifeExpectancy: 83.9,
    annualSunshineHours: 2800,
    immigrantSharePercent: "17.2%",
    medianMonthlyWageRMB: "约 1.5 万 RMB"
  },
  {
    id: "canada",
    name: "加拿大",
    flag: "🇨🇦",
    city: "卡尔加里 / 温哥华郊区",
    livingCostDesc: "雪山广阔，多元包容，冬日炉火与暖咖啡的漫长岁月。",
    lifeExpectancy: 82.8,
    annualSunshineHours: 2050,
    immigrantSharePercent: "23.0%",
    medianMonthlyWageRMB: "约 2.3 万 RMB"
  },
  {
    id: "thailand",
    name: "泰国",
    flag: "🇹🇭",
    city: "清迈宁曼路旁的小巷",
    livingCostDesc: "物价低廉，空气里有香茅草味道，生活节奏慢得像停滞了。",
    lifeExpectancy: 77.2,
    annualSunshineHours: 2650,
    immigrantSharePercent: "5.2%",
    medianMonthlyWageRMB: "约 4,500 RMB"
  },
  {
    id: "china_stay",
    name: "留在原来的城市 (平行对照)",
    flag: "🇨🇳",
    city: "老家省会 / 现住地",
    livingCostDesc: "熟悉的路口，熟悉的外卖，家人在身边，平淡而琐碎的生活。",
    lifeExpectancy: 78.6,
    annualSunshineHours: 2000,
    immigrantSharePercent: "0.1%",
    medianMonthlyWageRMB: "约 6,500 RMB"
  }
];

export const RANDOM_PROFILES: Omit<SimProfile, 'targetCountryId'>[] = [
  {
    id: "p1",
    name: "周若雨",
    age: 26,
    gender: "女",
    profession: PROFESSIONS[0], // 文员
    education: "普通全日制大专",
    hometown: "江西某县城，在杭州打工三年",
    initialSavingsRMB: 38000,
    englishLevel: "普通高中英语底子，能听懂简单单词",
    globalBirthRank: "全球每 100 个人中，约有 17 人出生在东亚这片热土",
    globalWealthPercentile: 51,
    baseHealth: 82,
    baseHappiness: 62,
    baseLanguage: 30,
    baseBelonging: 45
  },
  {
    id: "p2",
    name: "陈浩",
    age: 29,
    gender: "男",
    profession: PROFESSIONS[3], // 汽修
    education: "职业中专汽修专业",
    hometown: "山东潍坊农村，干了七年汽修",
    initialSavingsRMB: 52000,
    englishLevel: "只会认仪表盘上的英文故障码",
    globalBirthRank: "全球每 100 个人中，约有 28 人从事基层制造与技术维修",
    globalWealthPercentile: 58,
    baseHealth: 88,
    baseHappiness: 58,
    baseLanguage: 20,
    baseBelonging: 40
  },
  {
    id: "p3",
    name: "林小满",
    age: 24,
    gender: "女",
    profession: PROFESSIONS[1], // 咖啡师
    education: "民办三本新闻系",
    hometown: "湖南株洲，毕业后在成都做咖啡",
    initialSavingsRMB: 26000,
    englishLevel: "日常打招呼还行，语速一快就发懵",
    globalBirthRank: "全球 80 亿人中，约有 4.2 亿服务业青年和你拥有相似的积蓄",
    globalWealthPercentile: 44,
    baseHealth: 80,
    baseHappiness: 65,
    baseLanguage: 35,
    baseBelonging: 50
  },
  {
    id: "p4",
    name: "张建国",
    age: 34,
    gender: "男",
    profession: PROFESSIONS[5], // 程序员
    education: "普通省属大学计算机本科",
    hometown: "河南洛阳，在武汉外包公司工作八年",
    initialSavingsRMB: 110000,
    englishLevel: "能看懂英文技术文档，开不了口",
    globalBirthRank: "全球受过全日制高等教育的人口比例仅为 7.2%",
    globalWealthPercentile: 72,
    baseHealth: 68,
    baseHappiness: 50,
    baseLanguage: 40,
    baseBelonging: 35
  },
  {
    id: "p5",
    name: "王婷",
    age: 27,
    gender: "女",
    profession: PROFESSIONS[2], // 护士
    education: "医学院护理专科",
    hometown: "江苏徐州，在公立医院做了四年合同制护士",
    initialSavingsRMB: 45000,
    englishLevel: "考过护士英语，专业词汇还算熟悉",
    globalBirthRank: "全球医疗护理人员缺口超过 600 万人",
    globalWealthPercentile: 55,
    baseHealth: 76,
    baseHappiness: 56,
    baseLanguage: 45,
    baseBelonging: 42
  }
];

export function getRandomProfile(): SimProfile {
  const base = RANDOM_PROFILES[Math.floor(Math.random() * RANDOM_PROFILES.length)];
  const countries = SIM_COUNTRIES.filter(c => c.id !== "china_stay");
  const randomCountry = countries[Math.floor(Math.random() * countries.length)].id;
  return {
    ...base,
    targetCountryId: randomCountry
  };
}

export const DIARY_STORIES: Record<string, SimDiaryEntry[]> = {
  japan: [
    {
      year: 1,
      timeLabel: "初抵 · 第 1 年",
      sceneTitle: "那间空荡荡的单身公寓，与晚上八点的超市",
      sceneText: "第一天搬进单身公寓，房间里空得能听见回音，没有床，连天花板上的吸顶灯泡都要自己去买。窗帘太贵舍不得买，你拿带过来的两件厚羽绒服夹在窗框上挡光。晚上 7 点 50 分，你站在超市熟食区旁边假装看酸奶，眼睛一直瞟着那个穿围裙的理货员——等他掏出红色‘半额（半价）’贴纸贴在炸猪排便当上的一瞬间，你伸手拿了一盒，心算了一下：才 260 日元，合人民币 13 块钱。",
      worldFact: "据 OECD 数据，东京单身独居率高达 50.2%，超过 45% 的年轻工薪族习惯购买晚间超市打折餐品度日。",
      parallelWorldMoment: "此时此刻：在埃及开罗，一个年轻人正把刚出炉的皮塔饼装进纸袋；在老家县城，你妈正把吃剩的红烧肉用保鲜膜封好放进冰箱。",
      choices: [
        {
          text: "去百元店买两个塑料收纳箱倒扣着当桌子，去二手店淘了个 40 块钱掉漆的旧电饭煲。",
          detail: "虽然简陋，但屋子里第一次飘出了热米饭的香气。",
          narrative: "第一锅米饭煮好的时候，米香飘满了十几平米的小房间。你坐在地板上，就着一罐拌饭海苔吃了一大碗。吃完把碗洗得干干净净，忽然觉得日子好像能过下去了。",
          fundsDelta: -1200,
          healthDelta: 2,
          happinessDelta: 8,
          languageDelta: 2,
          belongingDelta: -4
        },
        {
          text: "找同在东京的华人转租群，花更少钱搬去跟别人合租，分摊掉水电与网络费。",
          detail: "省下了宝贵的押金，但得习惯隔壁屋半夜打电话的声音。",
          narrative: "合租屋的厨房有点油腻，室友是个在中华料理店打工的同胞。晚上你们在狭窄的过道擦肩而过，互相客气地点头打个招呼，各自端着泡面回屋关门。",
          fundsDelta: -600,
          healthDelta: -2,
          happinessDelta: 3,
          languageDelta: 0,
          belongingDelta: 6
        }
      ]
    },
    {
      year: 2,
      timeLabel: "立足 · 第 2 年",
      sceneTitle: "那家 1200 日元的快剪店，与藏在枕头底下的感冒药",
      sceneText: "头发长长了，你实在没办法，硬着头皮走进车站旁 1200 日元的快剪理发店。理发师傅问了一长串话，你一句没听懂，耳朵涨得通红，只能掏出手机翻出两年前在老家拍的照片递过去。剪完后你习惯性低头说了声‘对不起’，对方愣了一下，笑着递给你一块热毛巾。入冬的时候你发烧到了 38 度 5，不敢叫救护车怕贵，裹着被子发汗。晚上妈妈突然打微信视频过来，你慌慌张张把床头的药盒塞到枕头底下，用手抹了抹脸，笑着说‘妈，这边暖和着呢，刚喝了热汤有点出汗’。",
      worldFact: "全球 2.8 亿跨国移民中，超过 70% 曾在前两年经历过语言隔阂导致的就医恐惧与报喜不报忧。",
      parallelWorldMoment: "此时此刻：在墨尔本的海边，晨光刚把天际染成金黄；在老家客厅里，电视里正放着天气预报的背景音乐。",
      choices: [
        {
          text: "买了一辆前车篮掉了一小块漆的二手自行车，下班开始自己骑车去更远的廉价蔬菜超市。",
          detail: "不用再每次提着两袋大米走 20 分钟坡路了。",
          narrative: "推着那辆旧车走下坡道的时候，天边有一大片粉红色的晚霞。风吹在脸上有点凉，但你第一次觉得这个城市的声音没有那么刺耳了。",
          fundsDelta: -300,
          healthDelta: 5,
          happinessDelta: 7,
          languageDelta: 3,
          belongingDelta: 2
        },
        {
          text: "周末去附近的便利店兼职做收银，硬着头皮每天重复几百遍‘欢迎光临’和找零用语。",
          detail: "每天站六个小时，但日语听力和口语在实战中慢慢脱敏。",
          narrative: "最开始老是找错硬币，急得满头大汗。三个月后，你已经能闭着眼睛辨别 100 日元和 50 日元的重量了。下班店长塞给你两个快过期的饭团，说辛苦了。",
          fundsDelta: 3500,
          healthDelta: -4,
          happinessDelta: 4,
          languageDelta: 16,
          belongingDelta: 6
        }
      ]
    },
    {
      year: 3,
      timeLabel: "日常 · 第 3 年",
      sceneTitle: "厨房水槽堵塞的下午，与那个笑出来的瞬间",
      sceneText: "周六下午水槽突然堵了，冒出一股发酸的脏水。查了一下请疏通师傅上门要花两万多日元，你心疼得肉跳。一个人在网上搜‘下水道堵塞自己修’，去百元店买了根十块钱的简易塑料管道条，跪在厨房冰凉的瓷砖地上捅了半个小时。头发和污垢哗啦一声排走、水流打着旋漏下去的那一刻，你瘫坐在地上，两手都是黑色的油污，看着被修好的水槽，忍不住一个人在屋里苦笑了一声。",
      worldFact: "日本蓝领熟练工上门服务人工费位列亚洲榜首，单次家庭下水管上门疏通中位数为 18,500 日元（约合 880 RMB）。",
      parallelWorldMoment: "此时此刻：在伦敦的冬雨中，双层红色巴士缓缓驶过大桥；在你十几平米的小房间里，一碗热腾腾的牛肉饭正散发着浓郁的洋葱香气。",
      choices: [
        {
          text: "去吉野家吃了碗大份牛肉饭，多要了一份温泉蛋，奖励自己一下。",
          detail: "生活里极微小、却真真切切属于自己的成就感。",
          narrative: "店里静悄悄的，旁边的上班族大叔低着头大口扒饭，电视里放着无聊的综艺。你把蛋黄戳破裹着米饭吞下去，胃里暖呼呼的。",
          fundsDelta: -45,
          healthDelta: 3,
          happinessDelta: 10,
          languageDelta: 2,
          belongingDelta: 3
        },
        {
          text: "冲了个热水澡，把屋子彻底拖了一遍，换上晒干带阳光味的干净被套。",
          detail: "慢慢把这个租来的小窝打理得越来越像一个家。",
          narrative: "被子上带着淡淡的洗衣液清香。你坐在窗边看着外面的电线杆和飞过去的乌鸦，心里忽然有一块悬着的地方落了地。",
          fundsDelta: 0,
          healthDelta: 4,
          happinessDelta: 9,
          languageDelta: 1,
          belongingDelta: 5
        }
      ]
    },
    {
      year: 4,
      timeLabel: "习惯 · 第 4 年",
      sceneTitle: "不再看导航的回家路，与隔壁老太太的打招呼",
      sceneText: "你已经能熟练地在周二早上把可燃垃圾绑好放进收集网，再也没有被贴过黄色的警告贴纸。去区役所更新地址，工作人员说了一串专业术语，你虽然语速慢，但已经能拿出印章和在留卡一件件办妥，手心不再像以前那样冒冷汗。下楼倒垃圾碰见隔壁牵着柴犬的日本老太太，对方微笑着冲你道早安，你下意识自然地回了句‘おはようございます’，两个人微微躬身，擦肩而过。",
      worldFact: "跨国移居者通常在第 3.5 年前后跨越本地基础行政与社区融入门槛，孤独感曲线开始显著回升。",
      parallelWorldMoment: "此时此刻：地球上有 1.4 亿人正堵在各自城市的晚高峰车流里；而你正提着两颗卷心菜，慢悠悠踩着单车下坡。",
      choices: [
        {
          text: "给家里寄了一万块钱，给爸妈在网上买了件保暖羽绒服和一台自动洗脚盆。",
          detail: "虽然存款没很多，但终于有能力给家里添置点东西了。",
          narrative: "妈妈发来微信语音，声音里带着点心疼又带着点自豪：‘自己在那边多吃点好的，别老省着。’你听完按了锁屏键，把头靠在窗玻璃上。",
          fundsDelta: -10000,
          healthDelta: 0,
          happinessDelta: 14,
          languageDelta: 0,
          belongingDelta: 12
        },
        {
          text: "在河边的二手书店淘了两本带插图的生活散文，周末一个人坐在河堤草坪上看书发呆。",
          detail: "不再焦虑每天必须学多少单词，生活节奏慢了下来。",
          narrative: "几个日本初中生骑着自行车从河堤上呼啸而过，笑声洒了一路。河水在阳光下泛着细碎的金光，你闭上眼睛晒了半个小时太阳。",
          fundsDelta: -50,
          healthDelta: 6,
          happinessDelta: 11,
          languageDelta: 6,
          belongingDelta: 4
        }
      ]
    },
    {
      year: 5,
      timeLabel: "回望 · 第 5 年",
      sceneTitle: "五年在留卡换下来的那一天",
      sceneText: "窗口递出来的塑料卡片上，在留期限一栏印着‘5年’。走出入管局大楼，电车开往熟悉的品川站。你没有发财，银行卡里依然只有几万块钱；你依然习惯在晚上八点去超市看一眼打折贴纸；你依然经常想念老家那碗热腾腾的牛肉面。但你已经不用靠手机翻译过日子，你有了自己熟悉的理发师，你在这个陌生的异国角落，踏踏实实地活了下来。",
      worldFact: "全球 80 亿人中，仅有 3.6% 的人能够合法跨越出生国国境并在异国长期定居满五年。",
      parallelWorldMoment: "此时此刻：荒川大桥上的电车发出沉闷的铁轨摩擦声，车窗倒映着你平静的眼睛；生活没有大起大落，但你已经安顿好了自己。",
      choices: [
        {
          text: "在回程的电车上发了条仅自己可见的朋友圈：‘今天第五年，下班回家。’",
          detail: "没有任何口号，只是一张电车车窗外普通街景的照片。",
          narrative: "列车缓缓驶过荒川大桥，夕阳把河面染得通红。你收起手机插进大衣口袋，准备下车去站前的小面包房买明天的早餐。",
          fundsDelta: 0,
          healthDelta: 5,
          happinessDelta: 15,
          languageDelta: 5,
          belongingDelta: 10
        }
      ]
    }
  ],
  australia: [
    {
      year: 1,
      timeLabel: "落地 · 第 1 年",
      sceneTitle: "维州小镇的铁皮屋宿舍，与手上磨出的老茧",
      sceneText: "下了飞机一路转火车和大巴，到了维州一个以苹果和农场出名的小镇。合租的铁皮屋里住了四个不同国家的年轻人，水龙头拧开带着一股轻微的铁锈味。第一天在包装厂打工，站了八个半小时给橘子分类装箱，腰酸得晚上翻个身都要倒吸凉气，手掌内侧磨起了两颗晶莹的水泡。晚上坐在门前台阶上，天黑得特别透彻，南半球的银河像一条银色的河横在头顶，偶尔能听到远处树林里袋鼠跳过的沙沙声。",
      worldFact: "澳大利亚农业严重依赖季节工与打工度假者，蓝领包装工中位数时薪为 28.2 澳币（约合 135 RMB/小时）。",
      parallelWorldMoment: "此时此刻：在孟买的清晨，成千上万的上班族正挤进没有车门的火车；而你坐在维州铁皮宿舍台阶上，头顶是南半球璀璨无垠的银河。",
      choices: [
        {
          text: "去镇上的 Kmart 买了双 25 刀的工装厚袜子和两卷透气胶布，把水泡挑破缠好，第二天继续上工。",
          detail: "普通人的韧劲全在这些咬着牙的细节里。",
          narrative: "第二个星期，手上的水泡变成了硬硬的茧子。领到第一周 950 澳币的周薪支票时，看着银行卡里真真切切的数字，你觉得手掌没那么疼了。",
          fundsDelta: 4500,
          healthDelta: -2,
          happinessDelta: 8,
          languageDelta: 5,
          belongingDelta: 0
        },
        {
          text: "跟同屋的爱尔兰背包客学着用简易咖啡壶煮黑咖啡，下班一起坐在草地上啃刚烤好的大面包。",
          detail: "语言在磕磕绊绊的日常里飞速长进。",
          narrative: "你学会了用浓郁的澳洲俚语说‘No worries mate’。晚上听他们讲在各地农场的见闻，你忽然觉得世界上原来有这么多人都在这么朴素地流浪。",
          fundsDelta: 0,
          healthDelta: 3,
          happinessDelta: 11,
          languageDelta: 12,
          belongingDelta: 7
        }
      ]
    },
    {
      year: 2,
      timeLabel: "谋生 · 第 2 年",
      sceneTitle: "二手面包车，与墨尔本阴天的咖啡香",
      sceneText: "农场的工期结束，你攒了 8000 澳币，花 2200 刀买了辆开了 19 万公里的旧丰田凯美瑞。车窗升降有点卡顿，但它能带你去任何地方。你搬到了墨尔本郊区的一个小镇，在一家当地人开的街角咖啡馆找了份服务生的活。每天早上 6 点开门，满屋子都是浓郁的深烘咖啡香气。常客是个每天点一杯 Flat White 的退休老头，看你英语卡壳，会慢吞吞地跟你开玩笑，纠正你的发音。",
      worldFact: "在澳洲，熟练护理人员与街区蓝领服务业的就业稳定性，长期显著高于普通初级文职岗位。",
      parallelWorldMoment: "此时此刻：在老家写字楼里，前同事们正在微信群里敲着‘收到收到’；而你在咖啡机喷涌的奶泡蒸汽里，给常客递上一杯 Flat White。",
      choices: [
        {
          text: "自己带饭去上班，买了一大块冷冻牛肉和打折土豆，分装成五个玻璃饭盒冻在冰箱里。",
          detail: "外食太贵，自己做饭是省钱的不二法宝。",
          narrative: "午休的时候在休息室热土豆炖牛肉，老板闻到香味探头说‘Smells delicious!’，顺手给你倒了一杯刚做好的拿铁。",
          fundsDelta: -200,
          healthDelta: 4,
          happinessDelta: 6,
          languageDelta: 4,
          belongingDelta: 3
        },
        {
          text: "报名了周末的急救证书 (First Aid) 培训课程，想为以后转做养老护理员做准备。",
          detail: "在澳洲，护理和蓝领是永远踏实的饭碗。",
          narrative: "教室里坐着各个年龄段的人，你认真地在塑料假人身上按压心肺复苏。拿到证书的那天，你把它整整齐齐夹在了护照夹里。",
          fundsDelta: -180,
          healthDelta: 2,
          happinessDelta: 8,
          languageDelta: 10,
          belongingDelta: 6
        }
      ]
    },
    {
      year: 3,
      timeLabel: "沉淀 · 第 3 年",
      sceneTitle: "一个人看日落的海滩，与那通报喜不报忧的电话",
      sceneText: "周日傍晚，你开着那辆老丰田去了海边。澳洲的海滩永远空旷干净，海浪一层层涌上来拍在沙滩上。你把折叠椅撑在沙子里，手里拿着一罐两块钱的超市气泡水。手机震动，是家里的微信视频。你整理了一下被海风吹乱的头发，接通视频。老家客厅里电视机声音很大，爸爸问你‘今天吃的啥？’你指了指前面的落日和大海：‘在海边玩呢，这边挺好的，刚吃完烤肉。’",
      worldFact: "南半球海洋性气候使澳大利亚常年在联合国幸福指数排名中高居前十，户外活动参与率超过 82%。",
      parallelWorldMoment: "此时此刻：在东京拥挤的地铁车厢里，无数低头族正在刷着手机；而你把折叠椅撑在空旷的白沙滩上，看着落日沉入印度洋。",
      choices: [
        {
          text: "挂断电话后，一个人默默坐在椅子上看太阳落进海平线，把罐子里的最后一口水喝完。",
          detail: "异乡人的孤独，在这一刻变得无比平静与柔和。",
          narrative: "天色渐渐变成深蓝色，远处有小狗在海浪里奔跑。你深吸了一口带着咸味的湿润空气，心里那股长久以来的漂泊感，慢慢平复了下来。",
          fundsDelta: 0,
          healthDelta: 6,
          happinessDelta: 10,
          languageDelta: 0,
          belongingDelta: -2
        }
      ]
    },
    {
      year: 5,
      timeLabel: "扎根 · 第 5 年",
      sceneTitle: "准签信来的时候，你正跪在后院拔杂草",
      sceneText: "手机在口袋里震了一下，是一封来自移民局的自动邮件，通知你的永居签证获批了。你戴着沾满泥土的花园手套，站在小出租屋后院的柠檬树下，把那封全英文的信从头到尾看了三遍。没有激动的大喊大叫，也没有开香槟。你只是摘下脏手套，回屋喝了一大杯自来水，然后去附近的华人超市买了一盒平时舍不得买的草莓和一袋速冻水饺，煮了一大碗。",
      worldFact: "全球 80 亿人中，仅有不到 0.05% 的人能在 35 岁前凭借自身技能与体力劳动获得大洋洲永久居留权。",
      parallelWorldMoment: "此时此刻：后院柠檬树下的泥土散发着温热的气息，厨房的水烧开了；你撕开一袋速冻水饺倒进锅里，水花静静翻滚。",
      choices: [
        {
          text: "就着老干妈把一盘热气腾腾的水饺吃完，窗外是南半球晴朗的蓝天。",
          detail: "普通的开局，普通的经过，普通的生活。",
          narrative: "你坐在木椅子上，看着窗台上的阳光慢慢移动。你还是那个普通的自己，但在这个阳光广袤的大陆上，你终于不用再担心下个月该去哪里了。",
          fundsDelta: -80,
          healthDelta: 5,
          happinessDelta: 16,
          languageDelta: 4,
          belongingDelta: 10
        }
      ]
    }
  ],
  germany: [
    {
      year: 1,
      timeLabel: "初抵 · 第 1 年",
      sceneTitle: "那个永远刷不到预约的市政厅，与周日下午空无一人的大街",
      sceneText: "在柏林郊区租到一个 14 平米的小单间，为了办户籍登记 (Anmeldung)，你每天早晨 6 点定闹钟刷新市政厅退号网页，刷了整整三周才抢到一个下个月的号。第一个周日你想去买洗发水，走上街才发现全城商店超市大门紧闭，街上安静得能听见自己的脚步声。你在冷风里裹紧大衣，最后在加油站小卖部花 4 欧买了块干硬的面包和一瓶水。",
      worldFact: "德国《周日休息法》自 1919 年写入宪法，全德 95% 以上零售商店周日依法强制闭店，保障劳动者休息权。",
      parallelWorldMoment: "此时此刻：国内三里屯和太古里正是人潮拥挤的星期天下午；而你站在柏林空无一人的冷风街角，提着加油站买的一袋面包走在石子路上。",
      choices: [
        {
          text: "去 Lidl 买了两大袋 1.2 欧的便宜土豆和一袋洋葱，周末自己在厨房炖了一大锅土豆牛肉汤。",
          detail: "虽然单调，但热腾腾的汤能抵御漫长干冷的冬天。",
          narrative: "汤炖得软烂香浓，你盛在深碗里，就着烤得焦脆的黑面包吃完。窗外下着细雨，你看着窗玻璃上的水珠，心里慢慢安定下来。",
          fundsDelta: -150,
          healthDelta: 3,
          happinessDelta: 7,
          languageDelta: 1,
          belongingDelta: 2
        },
        {
          text: "找同楼的留学生借了辆旧自行车，顺着运河骑了十公里，两岸的落叶铺了厚厚一层。",
          detail: "德国的大自然不需要门票，安静又开阔。",
          narrative: "踩着吱呀作响的踏板，冷风吹得脸颊发麻。两旁的榉树叶子金黄灿烂，你停下车拍了一张照片发给爸妈，说‘这边空气特别好’。",
          fundsDelta: 0,
          healthDelta: 6,
          happinessDelta: 9,
          languageDelta: 2,
          belongingDelta: 3
        }
      ]
    },
    {
      year: 2,
      timeLabel: "磨砺 · 第 2 年",
      sceneTitle: "下午四点就全黑的天空，与那张多算了 300 欧的暖气账单",
      sceneText: "入冬后的德国，下午四点天就彻底黑透了，阴雨连绵几个月见不到太阳，你开始每天老老实实吞一粒维生素 D。房东寄来去年的暖气物业结算单 (Nebenkosten)，要求补缴 300 欧。你硬着头皮戴着眼镜，一边用翻译软件查德语专业生词，一边列出每个月的用量明细给房东写邮件申诉，来回发了四轮，最后房东退让了 180 欧。",
      worldFact: "据德国联邦统计局数据，中北欧冬季日照匮乏，超过 60% 的新移居者会经历季节性情绪低落 (SAD)。",
      parallelWorldMoment: "此时此刻：在热带的新加坡，工人们正顶着 32 度的高温浇筑混凝土；而在你微暗的书桌前，宜家小台灯散发着一小圈暖黄色的光。",
      choices: [
        {
          text: "去宜家花 12 欧买了个暖黄色光芒的小台灯，晚上放在床头看书，屋里一下子温暖了。",
          detail: "学会给漫长的冬夜制造属于自己的微小光源。",
          narrative: "暖黄色的光晕映在白墙上。你泡了一杯薄荷茶，戴上耳机听喜欢的歌，不再觉得四点天黑是一件让人恐慌的事情。",
          fundsDelta: -90,
          healthDelta: 2,
          happinessDelta: 8,
          languageDelta: 0,
          belongingDelta: 3
        },
        {
          text: "报名了每周两晚的民众夜校 (VHS) 德语 B1 班，虽然舌头经常打结，但认识了一起磕绊学德语的朋友。",
          detail: "在笨拙的开口中，慢慢击碎异国语言的壁垒。",
          narrative: "班上有叙利亚医生、土耳其厨师和波兰货车司机。大家德语都很破，互相用手势比划着哈哈大笑。下课一起站在校门口抽烟告别，你觉得生活有了点烟火气。",
          fundsDelta: -1600,
          healthDelta: 1,
          happinessDelta: 6,
          languageDelta: 15,
          belongingDelta: 8
        }
      ]
    },
    {
      year: 3,
      timeLabel: "平静 · 第 3 年",
      sceneTitle: "五点准时熄灯的办公室，与森林里捡到的两颗松果",
      sceneText: "你在一家当地小物流公司找了份操作员/文员的工作。下午 4 点 55 分，同事们已经开始互相道“Schönen Feierabend”（下班愉快），5 点一到办公室灯光全熄，手机周末从没有过工作消息。周六去附近的黑森林边缘徒步，踩着松软的泥土，你弯腰捡了两颗掉在地上的小松果揣在大衣口袋里，迎面走来牵着大金毛的德国老爷爷，微笑着对你点头：“Hallo”。",
      worldFact: "德国劳动法严格限制每日法定工时，雇员年均实际工作时间仅为 1,341 小时，位列 OECD 最低工时国家。",
      parallelWorldMoment: "此时此刻：在国内科技园区的深夜，大楼依然灯火通明；而在黑森林边缘的泥土小径上，金毛犬摇着尾巴从你身边擦身而过。",
      choices: [
        {
          text: "在林子里长长呼出一口白气，心跳放得极慢，整周的疲劳似乎都被高大的冷杉林吸收了。",
          detail: "没有无休止的加班和群消息，生活归还给了你自己。",
          narrative: "踩着厚厚的松针往回走，夕阳穿透树冠洒下光柱。你摸了摸口袋里圆滚滚的松果，忽然明白了为什么德国人如此热爱树林和漫步。",
          fundsDelta: 0,
          healthDelta: 8,
          happinessDelta: 12,
          languageDelta: 3,
          belongingDelta: 5
        }
      ]
    },
    {
      year: 5,
      timeLabel: "扎根 · 第 5 年",
      sceneTitle: "拿到永居卡的那天，坐在施普雷河边喝了杯淡啤酒",
      sceneText: "外管局窗口递出来那张蓝色的居留卡。走出红砖老建筑，微风吹拂着河面。你依然常常抱怨德国火车的晚点、嫌弃周日连个买创可贴的地方都没有。但你已经习惯了这里的界限感，习惯了不被打扰的周末，习惯了把一双徒步鞋穿上好几年。",
      worldFact: "全球 80 亿人中，欧盟蓝卡持有者满期永居批准率达到 94.2%，是全球最受法律条文刚性保护的移民路径之一。",
      parallelWorldMoment: "此时此刻：施普雷河水在脚下静静流淌，一艘载着木材的驳船拉响了汽笛；你把黑麦面包掰成小块，不再为任何未读消息心惊肉跳。",
      choices: [
        {
          text: "在河边的木长椅上坐下，看一艘货船慢悠悠划开水波。生活很平淡，但也足够安宁。",
          detail: "告别了狂奔与焦虑，把日子过成了一汪波澜不惊的湖水。",
          narrative: "夕阳把河面染得金黄。你从书包里拿出一块黑麦面包慢慢嚼着，不慌不忙地等半小时一班的轻轨回家。",
          fundsDelta: -30,
          healthDelta: 6,
          happinessDelta: 15,
          languageDelta: 5,
          belongingDelta: 8
        }
      ]
    }
  ],
  spain: [
    {
      year: 1,
      timeLabel: "初抵 · 第 1 年",
      sceneTitle: "移民局门口的那句“明天再说”，与一欧元的鲜榨橙汁",
      sceneText: "在瓦伦西亚办居留绿卡，早上七点在移民局门口排长队，工作人员看了看材料耸耸肩说系统坏了：“Mañana, por favor（明天再来吧）”。换作以前你早就急躁上火了，但看着窗外灿烂得不讲道理的大太阳，你忽然没了脾气。走出大厅，在街角小店花 1 欧元买了一大杯鲜榨橙汁，酸甜冰凉，海风吹过来，满街都是盛开的紫薇花。",
      worldFact: "西班牙是欧盟平均预期寿命最高国家（83.9岁），地中海饮食与充沛阳光使心脑血管发病率处于极低区间。",
      parallelWorldMoment: "此时此刻：在国内早高峰的地铁站里，安检口排着长长的人龙；而你坐在地中海阳光下，手里端着 1 欧元的鲜榨橙汁，看鸽子在喷泉边啄食。",
      choices: [
        {
          text: "在阳光下慢吞吞走回租住的老平房，顺路去烘焙房买了一根刚出炉的热法棍。",
          detail: "生活节奏一下子被地中海的阳光拉得极慢极长。",
          narrative: "回到家把橙汁倒进玻璃杯，就着热乎乎脆香的法棍吃饱。你坐在阳台的帆布椅上晒着太阳打盹，第一次不用惦记闹钟。",
          fundsDelta: -25,
          healthDelta: 6,
          happinessDelta: 11,
          languageDelta: 2,
          belongingDelta: 3
        },
        {
          text: "坐在街心喷泉旁边的石凳上，看着鸽子抢面包屑，给国内的朋友发了张万里无云的蓝天。",
          detail: "没有雾霾，没有焦躁，阳光不要钱似地倾泻下来。",
          narrative: "国内的朋友秒回：‘天好蓝啊，真羡慕’。你收起手机笑了笑，看着身边推着婴儿车散步的老夫妇，脚步自然而然慢了下来。",
          fundsDelta: 0,
          healthDelta: 4,
          happinessDelta: 9,
          languageDelta: 2,
          belongingDelta: 4
        }
      ]
    },
    {
      year: 2,
      timeLabel: "慢调 · 第 2 年",
      sceneTitle: "下午三点的闭店关门，与晚上十点才开始的露天晚餐",
      sceneText: "你彻底适应了西班牙的“迟钝”。下午两点到五点，街上几乎所有店铺全部关门午休；晚上九点多天色才刚擦黑，广场上的露天餐馆才刚摆出桌椅。你学会了就着炸小青椒和番茄面包慢慢嚼，听着旁边一家三代人热热闹闹地大声说笑，小孩子们踩着滑板车一直疯跑到深夜十一点。",
      worldFact: "西班牙非一线城市完整保留着两至三小时的 Siesta（午休）习惯，夜间社交多集中于 21:00 至深夜。",
      parallelWorldMoment: "此时此刻：地球另一侧的大多数人已经进入了梦乡；而小广场的石板路上，老人们正围着小圆桌喝着咖啡，小孩在旁边踢着足球。",
      choices: [
        {
          text: "学着用当地土法在小铁锅里煮了一盘海鲜饭，藏红花的香气飘满了小巷。",
          detail: "在异国的小厨房里，找到了属于自己的灶台温度。",
          narrative: "米饭带着微焦的锅巴，虾肉紧实甜嫩。你倒了小半杯廉价但爽口的白葡萄酒，一个人安安静静把整锅吃得干干净净。",
          fundsDelta: -60,
          healthDelta: 5,
          happinessDelta: 12,
          languageDelta: 4,
          belongingDelta: 5
        },
        {
          text: "傍晚去海边木栈道慢跑三十分钟，看着夕阳一点点把地中海染成金红色。",
          detail: "不用花钱，就能享受整个大自然的温柔怀抱。",
          narrative: "海浪拍打着细软的沙滩，海鸥在头顶盘旋。跑完步出了一身透汗，你坐在防波堤上甩着双腿，整个人轻快得像一片羽毛。",
          fundsDelta: 0,
          healthDelta: 9,
          happinessDelta: 12,
          languageDelta: 3,
          belongingDelta: 4
        }
      ]
    },
    {
      year: 5,
      timeLabel: "自洽 · 第 5 年",
      sceneTitle: "亲戚问你国外发财了没，你看着窗外三百天的晴天笑了笑",
      sceneText: "第五年换到了长期居留。老家表哥发微信问你：“在那边赚大钱了吧？买大奔了吗？”你低头看了看自己穿了两年的人字拖，和刚刚在菜市场花 5 欧买的一大袋新鲜无花果，笑着回了句：“没发财，打工糊口。就是这里一年有三百天是大晴天，心情挺好。”",
      worldFact: "全球 80 亿人中，西班牙护照免签全球 194 个国家，合法全职或非盈利定居满 5 年可申请欧盟长居。",
      parallelWorldMoment: "此时此刻：表哥发来老家下大雪的视频；你咬了一口从菜市场买回来的无花果，海风吹动了阳台上的薄纱窗帘。",
      choices: [
        {
          text: "靠在阳台铁栏杆上吃了一颗清甜的无花果，阳光晒在手臂上暖洋洋的。",
          detail: "人生的度量衡，从来不只有存折上的数字。",
          narrative: "微风吹起白色薄纱窗帘，巷子里传来吉他弹奏的欢快旋律。你洗了洗手，回屋准备今晚的晚餐，心里满当当的都是踏实。",
          fundsDelta: -35,
          healthDelta: 7,
          happinessDelta: 16,
          languageDelta: 5,
          belongingDelta: 9
        }
      ]
    }
  ],
  canada: [
    {
      year: 1,
      timeLabel: "初抵 · 第 1 年",
      sceneTitle: "大雪没过膝盖的清晨，与 Tim Hortons 的两块钱咖啡",
      sceneText: "十一月的加拿大，推开门积雪直接淹到了小腿肚。零下十几度，你拿着一把红色的塑料大雪铲，吭哧吭哧在门前车道铲雪，睫毛上结了一层细细的白霜。手脚冻得发麻时，你走去街角的 Tim Hortons，花两块加币买了杯 Double-Double 热咖啡和一个热乎乎的蜂蜜甜甜圈，双手捧着纸杯，热气扑在脸上，感觉整个人又活过来了。",
      worldFact: "加拿大全境年均降雪期长达 5-6 个月，全职居民家庭平均每年除雪耗时约 65 小时。",
      parallelWorldMoment: "此时此刻：在广州的大街上，人们还穿着短袖喝着凉茶；而你在零下十五度的暴雪中捧着热咖啡，睫毛上挂着晶莹的白霜。",
      choices: [
        {
          text: "去二手超市 Value Village 挑了一件厚实的二手羊毛大衣，套上后暖和极了。",
          detail: "在异国他乡，实用与温暖比面子重要一万倍。",
          narrative: "虽然样式朴素，但质地扎实。裹上大衣走在雪地里，脚下发出咯吱咯吱的清脆声响，你第一次觉得北国的雪景其实很美。",
          fundsDelta: -180,
          healthDelta: 3,
          happinessDelta: 7,
          languageDelta: 3,
          belongingDelta: 3
        },
        {
          text: "认识了隔壁也在铲雪的华人大叔，互相借了除雪盐，大叔教你冬天怎么给车胎防冻。",
          detail: "海外普通华人之间最朴素的互帮互助。",
          narrative: "大叔操着东北口音笑着说‘小伙子多穿点，刚来都这样，习惯就好了’。一把热盐撒在水泥地上，积雪慢慢融化露出灰色的地面。",
          fundsDelta: -50,
          healthDelta: 1,
          happinessDelta: 8,
          languageDelta: 1,
          belongingDelta: 9
        }
      ]
    },
    {
      year: 2,
      timeLabel: "立足 · 第 2 年",
      sceneTitle: "换了雪胎的旧斯巴鲁，与华人超市里的一袋老干妈",
      sceneText: "考下了当地驾照，买了一辆十年前的二手四驱斯巴鲁，换上了抓地力强的雪胎。周末开半小时车去大统华华人超市，买了一袋挂面、一瓶老干妈和两颗大白菜，结账时收银阿姨用熟悉的乡音说了句“一共 32 块”。坐在车里听着雨刮器推开挡风玻璃上的积雪，你忽然觉得，即便在地球的另一端，日子也能过出自己的味道。",
      worldFact: "加拿大拥有全球最多元包容的移民环境，大多伦多及大温哥华地区可见少数族裔比例超过 50%。",
      parallelWorldMoment: "此时此刻：雨刮器推开挡风玻璃上的厚雪，车里正放着熟悉的中文民谣；后备箱里放着大统华买的大白菜和老干妈。",
      choices: [
        {
          text: "回家在小电炉上热热地煮了一锅热汤面，拌上两勺辣椒酱，吃得额头冒汗。",
          detail: "胃安顿好了，漂泊的心也就安顿了一大半。",
          narrative: "热气腾腾的白气在窗户上结了一层水雾。你一边哧溜哧溜吃面，一边看着窗外静静飘落的雪花，屋里温暖如春。",
          fundsDelta: -80,
          healthDelta: 4,
          happinessDelta: 9,
          languageDelta: 2,
          belongingDelta: 7
        },
        {
          text: "夏天开去落基山脚下的湖边露营，湖水蓝得像宝石一样透亮。",
          detail: "广阔的天地，让人自然而然放下所有执念。",
          narrative: "支起帐篷生起小营火，晚风吹过松树林带来松脂的清香。坐在折叠椅上看繁星漫天，你心想，人这辈子能这样看看世界，真好。",
          fundsDelta: -300,
          healthDelta: 7,
          happinessDelta: 14,
          languageDelta: 4,
          belongingDelta: 4
        }
      ]
    },
    {
      year: 5,
      timeLabel: "扎根 · 第 5 年",
      sceneTitle: "枫叶卡寄到信箱里的那个雨天",
      sceneText: "信箱里躺着印着枫叶的水印信封，厚厚的硬质塑料卡片。五年了，你度过了五个漫长的冬天，也见证了五个美得惊心动魄的夏天。你没有像那些社交网络上的成功人士一样住进海边豪宅，但你有一份踏实的手艺，一台能在暴风雪里平稳前行的老车，和一个属于自己的温暖壁炉。",
      worldFact: "联合国人类发展指数常年将加拿大列入前十，移民定居五年后归属感指标平均达到 86.4%。",
      parallelWorldMoment: "此时此刻：枫树上的红叶带着雨滴落进草坪；厨房里的牛肉汤正小火咕嘟冒泡，壁炉的火苗在玻璃后轻轻跳动。",
      choices: [
        {
          text: "把信件整整齐齐收进抽屉，去厨房给小火慢炖的牛肉汤加了一小把黑胡椒。",
          detail: "平凡生活里的最大幸运，莫过于心安即是归处。",
          narrative: "汤在锅里咕嘟咕嘟翻滚着香气。你靠在灶台边喝了一口热茶，窗外是一排排挂着雨滴的红枫树。生活平淡而长久地向前延展。",
          fundsDelta: 0,
          healthDelta: 5,
          happinessDelta: 16,
          languageDelta: 4,
          belongingDelta: 9
        }
      ]
    }
  ],
  thailand: [
    {
      year: 1,
      timeLabel: "初抵 · 第 1 年",
      sceneTitle: "巷子里两千块的单身公寓，与楼下 40 泰铢的鸡肉饭",
      sceneText: "走出清迈机场，一股热带潮湿而温暖的香茅草气息扑面而来。在宁曼路背后的小巷子里，你租下了一间带着小阳台的单身公寓，月租 9000 泰铢（不到两千人民币）。楼下就是个卖海南鸡肉饭的小摊，老奶奶总是多给你舀一勺热腾腾的冬瓜鸡汤。生活成本低得不可思议，你第一次不需要算计买一杯冰咖啡要花掉多大比例的月薪。",
      worldFact: "清迈连续多年位居全球数字游民热门地，单人月度生活开销中位数仅为 800 至 1,200 美元（约合 5,800~8,700 RMB）。",
      parallelWorldMoment: "此时此刻：在深圳的高新园，外卖骑手正飞速冲进写字楼电梯；而你骑着二手踏板车绕着古城护城河，风把衬衫吹得鼓了起来。",
      choices: [
        {
          text: "花 300 块钱买了一辆二手机车，每天傍晚骑车绕着古城的护城河慢悠悠兜风。",
          detail: "热带的暖风吹在身上，治愈了国内常年的偏头痛。",
          narrative: "护城河边的鸽子扑棱棱飞起来，落日把素贴山染成了金黄色。你把车停在路边，买了袋切好的冰镇菠萝，第一次体会到什么叫‘没心没肺的松弛’。",
          fundsDelta: -300,
          healthDelta: 9,
          happinessDelta: 15,
          languageDelta: 4,
          belongingDelta: 3
        }
      ]
    },
    {
      year: 3,
      timeLabel: "慢调 · 第 3 年",
      sceneTitle: "雨季下午的咖啡馆屋檐下",
      sceneText: "清迈的雨季，暴雨总是毫无预兆地倾盆而下。你被困在一间木头搭建的小咖啡馆屋檐下，雨水从瓦片边缘哗啦啦像瀑布一样挂下来。街上的摩托车全停在骑楼下避雨，没有人按喇叭催促，大家都在安静地看雨。你点了一杯 50 泰铢的手冲咖啡，打开手提电脑，敲完今天最后一部分给远程客户的活。",
      worldFact: "热带季风气候午后暴雨通常在 1 小时内迅速散去，当地人视雨天为大自然赠送的自然休整时段。",
      parallelWorldMoment: "此时此刻：老家同学群里正为了孩子的补习班焦虑争吵；而你坐在木檐下听着暴雨倾盆，手里是一杯 50 泰铢的手冲咖啡。",
      choices: [
        {
          text: "合上电脑，坐在木头长凳上听了四十分钟雨声，直到天边重新透出阳光。",
          detail: "你终于不再催促自己‘必须做点什么有用的人’。",
          narrative: "雨停了，空气里带着泥土和青草的清新香气。你骑上车穿过湿漉漉的街道，路面积水倒映着蓝天白云，生活简单得像一汪清水。",
          fundsDelta: -10,
          healthDelta: 8,
          happinessDelta: 14,
          languageDelta: 2,
          belongingDelta: 4
        }
      ]
    },
    {
      year: 5,
      timeLabel: "自在 · 第 5 年",
      sceneTitle: "没有大富大贵，但身体和失眠彻底好了",
      sceneText: "五年过去，你没有成为身家千万的老板，也没有买下什么豪宅。你的家当依然只有一个大行李箱和一台旧笔记本。但你学会了泰语数字和买菜砍价，你的失眠彻底不药而愈，体检指标全恢复了正常。你明白人生也许不需要那么多宏大的目标，简简单单地活在一个阳光充沛的地方，本身就是一种莫大的福气。",
      worldFact: "全球 80 亿人中，超过 90% 的人终其一生未曾离开过出生国，也从未体验过彻底放下竞争压力的生活。",
      parallelWorldMoment: "此时此刻：夜市看门的大爷双手合十冲你道谢；清迈的晚风穿堂而过，失眠彻底成了上辈子的遥远记忆。",
      choices: [
        {
          text: "在夜市买了两盒芒果糯米饭，一盒留给自己，一盒送给楼下看门的老大爷。",
          detail: "踏踏实实的烟火日常。",
          narrative: "大爷双手合十冲你笑着道谢。你踩着人字拖慢吞吞地走上楼梯，清迈的晚风穿堂而过，吹得窗台上的风铃叮当作响。",
          fundsDelta: -20,
          healthDelta: 10,
          happinessDelta: 16,
          languageDelta: 6,
          belongingDelta: 8
        }
      ]
    }
  ],
  china_stay: [
    {
      year: 1,
      timeLabel: "原地 · 第 1 年",
      sceneTitle: "晚上下班的那碗热汤面，老板多给了一勺牛肉",
      sceneText: "你没有走。依然住在二环边上租的小屋里，每天挤着 2 号线早高峰。周五晚上加班到快九点，浑身发沉走下天桥。路过常去的那家清真拉面馆，店里飘着浓浓的牛骨汤香气。你点了一碗细面，老板认出你是熟客，往你碗里多舀了一大勺带筋的牛肉块。热汤下肚，浑身的寒气一下子散开了。",
      worldFact: "中国拥有全球最高密度的即时配送与平价餐饮生态，城市居民 300 米生活圈餐饮覆盖率全球第一。",
      parallelWorldMoment: "此时此刻：在东京的某个出租屋里，一个同龄人正一个人就着凉水吃泡面；而拉面馆老板把一勺热腾腾的牛肉舀进了你的碗里。",
      choices: [
        {
          text: "吃完顺路去超市买了两袋打折的大米和一卷垃圾袋，提着走回出租屋。",
          detail: "老家的烟火气，虽然琐碎，但也最踏实。",
          narrative: "推开屋门，屋子里暖烘烘的。你把大米倒进米桶，换上舒适的棉拖鞋，打开电视看地方新闻。那一刻，你觉得留在熟悉的地方也没什么不好。",
          fundsDelta: -120,
          healthDelta: 1,
          happinessDelta: 8,
          languageDelta: 0,
          belongingDelta: 12
        }
      ]
    },
    {
      year: 3,
      timeLabel: "原地 · 第 3 年",
      sceneTitle: "周日早晨陪父母去早市买菜",
      sceneText: "周末睡到自然醒，坐公交车回父母家。早上陪妈妈去露天早市，摊贩们大声吆喝着刚从地里拔出来的新鲜白菜。妈妈跟卖鱼的熟人讲了半天价，省了三块钱，脸上笑开了花。回家路上你两手提着沉甸甸的菜篮子，妈妈在旁边絮絮叨叨说着亲戚邻居的闲话。",
      worldFact: "熟人社会网络与原生家庭支持，是中国城市工薪阶层抵御生活未知风险最根本的心理缓冲垫。",
      parallelWorldMoment: "此时此刻：海外的移居者正在对着手机屏幕报喜不报忧；而你正坐在父母家的小方桌前，蘸着老陈醋吃刚出锅的韭菜饺子。",
      choices: [
        {
          text: "中午帮爸爸一起在厨房包韭菜猪肉馅饺子，吃了满满两大盘。",
          detail: "亲情在身边，是任何异国他乡都换不来的温度。",
          narrative: "一家三口围在小方桌前蘸着醋吃饺子，电视里播着家长里短的肥皂剧。看着父母眼角越来越多的白发，你心想，至少这一刻，你随时都能陪在他们身边。",
          fundsDelta: 0,
          healthDelta: 4,
          happinessDelta: 12,
          languageDelta: 0,
          belongingDelta: 18
        }
      ]
    },
    {
      year: 5,
      timeLabel: "原地 · 第 5 年",
      sceneTitle: "给朋友圈点了个赞，继续拖地做饭",
      sceneText: "偶尔在朋友圈里，看到当年高中同学发在异国海滩或雪山的照片。你停下手指看了两秒，随手点了个赞，然后放下手机，转身把洗好的衣服挂在阳台晾衣绳上。水珠顺着裤脚滴在瓷砖上，楼下传来小孩子放学追逐嬉闹的声音，厨房里小火炖着的排骨汤咕嘟咕嘟冒着热气。生活像流水一样静静向前流淌，平平淡淡，也是一种真正的圆满。",
      worldFact: "全球幸福感大规模调研显示，内心的秩序与安顿，往往取决于是否能在方寸之地找到生活的自洽。",
      parallelWorldMoment: "此时此刻：飞机划破夜空飞往异国他乡；你给朋友圈里出国老同学的照片点了个赞，关掉手机，把炖好的排骨汤盛进了白瓷碗里。",
      choices: [
        {
          text: "盛了一碗热气腾腾的排骨汤，坐在沙发上慢慢喝完。",
          detail: "认清生活的真相后，依然安于自己脚下的方寸之地。",
          narrative: "夕阳透过阳台照在地板上，把一切镀上了一层柔和的金边。不用去任何远方，你已经在自己的生活里，安顿好了整颗心。",
          fundsDelta: 0,
          healthDelta: 3,
          happinessDelta: 15,
          languageDelta: 0,
          belongingDelta: 15
        }
      ]
    }
  ]
};
