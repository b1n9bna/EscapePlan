import type { CharacterAttributes, FamilyOrigin } from './simulation';

export interface SoulImprint {
  slot: 1 | 2 | 3;
  phaseName: string; // "少年精神底色" (0~18岁) | "青年代价与执念" (19~35岁) | "岁月终局归宿" (36~63岁)
  unlockedAge: number;
  isUnlocked: boolean;
  title: string;
  subtitle: string;
  icon: string;
  quote: string;
  rarity: 'gold' | 'purple' | 'amber' | 'emerald' | 'cyan';
}

/**
 * 3-Slot Soul Imprint Evaluator
 * Replaces noisy micro-tags with 3 definitive, literary soul badges:
 * Slot 1: 0~18 少年精神底色 (定格于18岁成年礼)
 * Slot 2: 19~35 青年代价与执念 (定格于35岁而立之年)
 * Slot 3: 36~63 岁月终局归宿 (定格于60~63岁终局定格)
 */
export function evaluateSoulImprints(
  currentAge: number,
  attrs: CharacterAttributes,
  tags: string[] = [],
  chosenPath: string = 'stay',
  currentTrack: string = '',
  _careerSubtrack?: string,
  _family?: FamilyOrigin
): SoulImprint[] {
  const result: SoulImprint[] = [];

  // =========================================================================
  // SLOT 1: 少年精神底色 (0~18岁)
  // =========================================================================
  if (currentAge < 18) {
    result.push({
      slot: 1,
      phaseName: "少年精神底色",
      unlockedAge: 18,
      isUnlocked: false,
      title: "【少年底色 · 孕育沉淀】",
      subtitle: "将在十八岁成年成人礼时定格",
      icon: "🌱",
      quote: "万卷书山、泥土工坊、柴米炊烟……少年的骨骼与心性，正在故土晨昏的风霜与温热中悄然定型。",
      rarity: "emerald"
    });
  } else {
    // Determine Slot 1 Imprint
    if (
      (attrs.academicCapital || 0) >= 65 ||
      tags.some((t) => t.includes("做题") || t.includes("题海") || t.includes("重点高中") || t.includes("榜样") || t.includes("模考"))
    ) {
      result.push({
        slot: 1,
        phaseName: "少年精神底色",
        unlockedAge: 18,
        isUnlocked: true,
        title: "【小镇做题家的金榜与心魔】",
        subtitle: "以万张试卷考破寒门，却终生不敢停下狂奔的脚步",
        icon: "📜",
        quote: "你用整整十二年刷穿了数千套试卷，考出了故土，但那股生怕落后于人的紧绷与要强，已渗入你的骨髓。",
        rarity: "gold"
      });
    } else if (
      (attrs.kinshipGuilt || 0) >= 55 ||
      (attrs.inferiority || 0) >= 55 ||
      tags.some((t) => t.includes("懂事") || t.includes("省吃俭用") || t.includes("帮工") || t.includes("清贫"))
    ) {
      result.push({
        slot: 1,
        phaseName: "少年精神底色",
        unlockedAge: 18,
        isUnlocked: true,
        title: "【过早懂事的寒门当家幼苗】",
        subtitle: "在别家孩子嬉闹的年纪，你早已学会看懂父母深沉的叹息",
        icon: "🎒",
        quote: "泛黄的账本、发愁的药单，让你过早收起了少年任性。你用超乎年龄的懂事与隐忍，护住了家的温度。",
        rarity: "purple"
      });
    } else if (
      (attrs.rebellion || 0) >= 55 ||
      tags.some((t) => t.includes("旷野") || t.includes("叛逆") || t.includes("不羁") || t.includes("出格") || t.includes("野性"))
    ) {
      result.push({
        slot: 1,
        phaseName: "少年精神底色",
        unlockedAge: 18,
        isUnlocked: true,
        title: "【离经叛道的旷野野草】",
        subtitle: "从翻过故乡土墙的那一刻起，你便注定不属于驯化的温室",
        icon: "⚡",
        quote: "世俗与规训视你为异类，但只有你自己清楚，那颗渴望广阔苍穹的滚烫火种，任谁也休想扑灭。",
        rarity: "cyan"
      });
    } else if (
      (attrs.resilience || 0) >= 60 ||
      (attrs.savings || 0) >= 4000 ||
      tags.some((t) => t.includes("商感") || t.includes("市井") || t.includes("手艺") || t.includes("地摊") || t.includes("实操"))
    ) {
      result.push({
        slot: 1,
        phaseName: "少年精神底色",
        unlockedAge: 18,
        isUnlocked: true,
        title: "【市井泥土浸润的草根商魂】",
        subtitle: "不信教条不信虚妄，只信双手的力气与账本的流水",
        icon: "🌾",
        quote: "在菜市喧嚣与走街串巷中泡大，你不惧冷眼与脏累，靠一身野蛮生长的硬骨头，在泥土里刨出尊严。",
        rarity: "amber"
      });
    } else {
      result.push({
        slot: 1,
        phaseName: "少年精神底色",
        unlockedAge: 18,
        isUnlocked: true,
        title: "【大院铁篱下的温良长子】",
        subtitle: "在体面规矩与亲友目光中长成，温和谨慎如父辈",
        icon: "🏢",
        quote: "红砖院落的广播与长辈的叮咛筑起了你最初的安全感，也悄悄剪平了你所有任性的锋芒。",
        rarity: "emerald"
      });
    }
  }

  // =========================================================================
  // SLOT 2: 青年代价与执念 (19~35岁)
  // =========================================================================
  if (currentAge < 35) {
    result.push({
      slot: 2,
      phaseName: "青年代价与执念",
      unlockedAge: 35,
      isUnlocked: false,
      title: "【青年代价 · 抉择搏杀】",
      subtitle: "将在三十五岁而立之年定格",
      icon: "⏳",
      quote: "房贷、婚配、体制、风口、远方……青年时代的每一次下注，都在暗中标好了不可逆的命运筹码。",
      rarity: "amber"
    });
  } else {
    if (
      (attrs.kinshipGuilt || 0) >= 60 ||
      tags.some((t) => t.includes("顶梁柱") || t.includes("大病") || t.includes("反哺") || t.includes("还债") || t.includes("房贷长跑") || t.includes("结婚"))
    ) {
      result.push({
        slot: 2,
        phaseName: "青年代价与执念",
        unlockedAge: 35,
        isUnlocked: true,
        title: "【撑起一家两代的沉默脊梁】",
        subtitle: "你替所有人抵挡了风雨，唯独把自己淋了个透湿",
        icon: "🛡️",
        quote: "在父母重病与至亲急难的关头，你默默咽下所有的委屈，把自己的热血熬成了支撑全家的月供与药费。",
        rarity: "gold"
      });
    } else if (
      currentTrack.includes("体制") ||
      tags.some((t) => t.includes("选调") || t.includes("公职") || t.includes("编制") || t.includes("机关") || t.includes("上岸") || t.includes("政法"))
    ) {
      result.push({
        slot: 2,
        phaseName: "青年代价与执念",
        unlockedAge: 35,
        isUnlocked: true,
        title: "【深院高墙的体面与驯化】",
        subtitle: "三十年谨言慎行换来一世体面，回首半生却未曾任性活过一天",
        icon: "🏛️",
        quote: "茶杯、公文、敬酒与会议，你在体制的经纬度里活成了家族最大的骄傲，但也悄悄告别了曾经锋芒毕露的少年。",
        rarity: "purple"
      });
    } else if (
      currentTrack.includes("商海") ||
      currentTrack.includes("实业") ||
      tags.some((t) => t.includes("经商") || t.includes("外贸") || t.includes("创业") || t.includes("暴富") || t.includes("破产") || t.includes("借贷") || t.includes("档口"))
    ) {
      result.push({
        slot: 2,
        phaseName: "青年代价与执念",
        unlockedAge: 35,
        isUnlocked: true,
        title: "【时代风口的跌宕淘金客】",
        subtitle: "见过千万流水的潮起，也尝过深夜天台的刺骨寒风",
        icon: "🌊",
        quote: "在经济浪潮的狂风巨浪里几度沉浮，亏光过老本也打过翻身仗，你这一生从不甘平庸，一身硬骨从未认输。",
        rarity: "amber"
      });
    } else if (
      chosenPath === "overseas" ||
      chosenPath === "emigrate" ||
      tags.some((t) => t.includes("出海") || t.includes("留学") || t.includes("移民") || t.includes("异邦") || t.includes("绿卡"))
    ) {
      result.push({
        slot: 2,
        phaseName: "青年代价与执念",
        unlockedAge: 35,
        isUnlocked: true,
        title: "【断绝规训的异邦重塑者】",
        subtitle: "斩断了代际债务与熟人评价，在异国黄昏里重塑自我",
        icon: "🕊️",
        quote: "跨越重洋，在无人认识你的异乡街头洗去了一身紧绷。虽然孤独如影随形，但你的灵魂终于只属于你自己。",
        rarity: "cyan"
      });
    } else if (
      currentTrack.includes("技术") ||
      tags.some((t) => t.includes("大厂") || t.includes("代码") || t.includes("加班") || t.includes("程序员") || t.includes("工位") || t.includes("工程师"))
    ) {
      result.push({
        slot: 2,
        phaseName: "青年代价与执念",
        unlockedAge: 35,
        isUnlocked: true,
        title: "【高塔格子间的工位困兽】",
        subtitle: "用十二小时的工位荧光，在千万人口的都会换得立锥之地",
        icon: "💻",
        quote: "体检单上的异常指标红了一行又一行，高薪与房产证背后，是你用滚烫青春换来的新中产入场券。",
        rarity: "purple"
      });
    } else {
      result.push({
        slot: 2,
        phaseName: "青年代价与执念",
        unlockedAge: 35,
        isUnlocked: true,
        title: "【市井深处的平淡守望者】",
        subtitle: "没有宏大的时代叙事，只有柴米油盐里的踏实温热",
        icon: "🍲",
        quote: "不争朝夕虚名，早起开门支摊，傍晚数着零钱归家，你把平淡的岁月经营成风雨不惊的港湾。",
        rarity: "emerald"
      });
    }
  }

  // =========================================================================
  // SLOT 3: 岁月终局归宿 (36~63岁)
  // =========================================================================
  if (currentAge < 60) {
    result.push({
      slot: 3,
      phaseName: "岁月终局归宿",
      unlockedAge: 60,
      isUnlocked: false,
      title: "【岁月归宿 · 尘埃落定】",
      subtitle: "将在终局甲子年岁定格",
      icon: "🍂",
      quote: "千帆过尽，潮水退去。这一生沉淀下来的，究竟是通透从容的自洽，还是长夜难眠的遗恨？",
      rarity: "cyan"
    });
  } else {
    if ((attrs.happiness || 0) >= 65 && (attrs.inferiority || 0) <= 40) {
      result.push({
        slot: 3,
        phaseName: "岁月终局归宿",
        unlockedAge: 60,
        isUnlocked: true,
        title: "【万事皆允的精神自洽翁】",
        subtitle: "历经半生悲欢聚散，终于同那个笨拙努力的自己握手言和",
        icon: "☀️",
        quote: "放下了所有的功名执念，看云卷云舒，听松涛阵阵。你终于明白，认真活过、爱过、尽力过，便是最大的人间圆满。",
        rarity: "gold"
      });
    } else if ((attrs.savings || 0) >= 40000 && (attrs.social || 0) >= 60) {
      result.push({
        slot: 3,
        phaseName: "岁月终局归宿",
        unlockedAge: 60,
        isUnlocked: true,
        title: "【深谙世故的桑梓余晖翁】",
        subtitle: "历尽风霜威望具存，成为亲友晚辈心中最后的定海神针",
        icon: "👑",
        quote: "数十载风雨浮沉，你用一生的精明与手腕积累了沉甸甸的家底，走在故土的石板路上，任谁都要尊称你一声先生。",
        rarity: "purple"
      });
    } else if (
      (attrs.rebellion || 0) >= 55 ||
      ((chosenPath === "overseas" || chosenPath === "emigrate") && (attrs.happiness || 0) >= 50)
    ) {
      result.push({
        slot: 3,
        phaseName: "岁月终局归宿",
        unlockedAge: 60,
        isUnlocked: true,
        title: "【孤舟蓑笠的旷野独行客】",
        subtitle: "没有故土可以回望，没有锁链能够束缚，活成天地间一阵风",
        icon: "🦅",
        quote: "一生漂泊无定，但也因此见识了寻常人未曾见过的星辰大海。无人为你立碑，但风雪长空早已刻下了你的名字。",
        rarity: "cyan"
      });
    } else if ((attrs.happiness || 0) >= 45) {
      result.push({
        slot: 3,
        phaseName: "岁月终局归宿",
        unlockedAge: 60,
        isUnlocked: true,
        title: "【粗茶淡饭的人间知足者】",
        subtitle: "儿孙绕膝瓦灶温热，平生无大志，但得一世安",
        icon: "🍵",
        quote: "没有大起大落的传奇，只有年年岁岁的平淡真切。坐在门前老槐树下，你微笑着看着人间烟火代代相传。",
        rarity: "emerald"
      });
    } else {
      result.push({
        slot: 3,
        phaseName: "岁月终局归宿",
        unlockedAge: 60,
        isUnlocked: true,
        title: "【未曾释怀的时代遗恨客】",
        subtitle: "那些未曾言说的遗憾与未选之路，在冬夜风里隐隐作痛",
        icon: "🌧️",
        quote: "你这一生走得太累太用力，却总觉得命运未曾对你温柔以待。在深夜的叹息里，你依然会想起当年那个意气风发的少年。",
        rarity: "amber"
      });
    }
  }

  return result;
}
