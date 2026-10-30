import React, { useState, useEffect, useRef } from 'react';
import {
  generateRandomFamily,
  BIRTHPLACE_SLIDES,
  K12_EVENTS,
  CAREER_EVENTS,
  calculateGaokaoOutcome,
  evaluate27YearOldLife,
  PARALLEL_LIVES_MILESTONES,
  generateFinalLifetimeVerdict,
  TARGET_COUNTRIES
} from '../data/simulation';
import type {
  CharacterAttributes,
  LifeChoice,
  GaokaoCalculation,
  LifeDiagnosis,
  CountryOption
} from '../data/simulation';
import {
  RotateCcw,
  Compass,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Brain,
  Shield,
  Zap,
  Flame,
  Home,
  Users,
  Coins,
  Sparkles
} from 'lucide-react';

interface LifeSimulatorProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
}

interface LifeHistoryNote {
  age: number;
  stageName: string;
  title: string;
  choiceText: string;
  reaction: string;
}

export const LifeSimulator: React.FC<LifeSimulatorProps> = ({
  onNavigateToSubclasses,
  onNavigateToDIY
}) => {
  // Gameplay Stages:
  // 'setup'
  // ➔ 'growth' (ages 6 to 17)
  // ➔ 'growth_outcome'
  // ➔ 'gaokao_calculated' (Age 18 - system computes outcome based on past choices)
  // ➔ 'growth' (ages 20 to 27)
  // ➔ 'diagnosis' (Age 27 fork)
  // ➔ 'parallel' (ages 30 to 63)
  // ➔ 'verdict' (Age 63 retirement)
  const [gameState, setGameState] = useState<
    'setup' | 'growth' | 'growth_outcome' | 'gaokao_calculated' | 'diagnosis' | 'parallel' | 'verdict'
  >('setup');

  // Player Character & Dynamic Attributes
  const [charData, setCharData] = useState(() => generateRandomFamily());
  
  // Cinematic Birthplace Reel Animator
  const [isSpinning, setIsSpinning] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [attrs, setAttrs] = useState<CharacterAttributes>(() => ({
    inferiority: 35, // 自卑创伤
    academicCapital: 30, // 做题应试资本
    kinshipGuilt: 40, // 宗族愧疚与重负
    rebellion: 30, // 反叛逆鳞
    resilience: 30, // 生存韧劲
    savings: charData.family.initialSavings // 储蓄
  }));

  const [tags, setTags] = useState<string[]>([]);

  // Sequential Events for ages 6 to 27
  const [currentEventIdx, setCurrentEventIdx] = useState(0);

  // Chronicle History (Persistent timeline)
  const [historyNotes, setHistoryNotes] = useState<LifeHistoryNote[]>([]);
  const [currentPendingReaction, setCurrentPendingReaction] = useState<{
    choice: LifeChoice;
    reaction: string;
  } | null>(null);

  // 18yo Calculated Gaokao Outcome
  const [gaokaoCalc, setGaokaoCalc] = useState<GaokaoCalculation | null>(null);

  // Age 27 Diagnosis
  const [diagnosis, setDiagnosis] = useState<LifeDiagnosis | null>(null);
  const [chosenPath, setChosenPath] = useState<'stay' | 'emigrate'>('emigrate');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(TARGET_COUNTRIES[0]);

  // Parallel Lives (ages 28 to 63)
  const [parallelIdx, setParallelIdx] = useState(0);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Clean up spin timer on unmount
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    };
  }, []);

  // Trigger Cinematic Birthplace Carousel / Reel
  const triggerBirthReel = () => {
    setIsSpinning(true);
    let speed = 60;
    let iterations = 0;
    const maxIterations = 20;

    const runReel = () => {
      setSlideIndex((prev) => (prev + 1) % BIRTHPLACE_SLIDES.length);
      iterations++;

      if (iterations < maxIterations) {
        if (iterations > 12) speed += 35;
        spinTimerRef.current = setTimeout(runReel, speed);
      } else {
        const fresh = generateRandomFamily();
        setCharData(fresh);
        setAttrs({
          inferiority: 35,
          academicCapital: 30,
          kinshipGuilt: 40,
          rebellion: 30,
          resilience: 30,
          savings: fresh.family.initialSavings
        });
        setTags([]);
        setIsSpinning(false);
      }
    };

    spinTimerRef.current = setTimeout(runReel, speed);
  };

  // Begin Life at Age 6
  const handleStartLife = () => {
    setAttrs({
      inferiority: 35,
      academicCapital: 30,
      kinshipGuilt: 40,
      rebellion: 30,
      resilience: 30,
      savings: charData.family.initialSavings
    });
    setTags([]);
    setCurrentEventIdx(0);
    setHistoryNotes([]);
    setCurrentPendingReaction(null);
    setGaokaoCalc(null);
    setGameState('growth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to apply attribute deltas
  const applyDeltas = (delta: Partial<CharacterAttributes>) => {
    setAttrs((prev) => ({
      inferiority: Math.min(100, Math.max(0, prev.inferiority + (delta.inferiority || 0))),
      academicCapital: Math.min(100, Math.max(0, prev.academicCapital + (delta.academicCapital || 0))),
      kinshipGuilt: Math.min(100, Math.max(0, prev.kinshipGuilt + (delta.kinshipGuilt || 0))),
      rebellion: Math.min(100, Math.max(0, prev.rebellion + (delta.rebellion || 0))),
      resilience: Math.min(100, Math.max(0, prev.resilience + (delta.resilience || 0))),
      savings: prev.savings + (delta.savings || 0)
    }));
  };

  // User selects an option in the growth phase
  const handleChooseGrowth = (choice: LifeChoice) => {
    const isK12 = currentEventIdx < K12_EVENTS.length;
    const currentEvt = isK12
      ? K12_EVENTS[currentEventIdx]
      : CAREER_EVENTS[currentEventIdx - K12_EVENTS.length];

    applyDeltas(choice.delta);

    const nextTags = choice.addTags
      ? Array.from(new Set([...tags, ...(choice.addTags || [])]))
      : tags;
    setTags(nextTags);

    const note: LifeHistoryNote = {
      age: currentEvt.age,
      stageName: currentEvt.stageName,
      title: currentEvt.title,
      choiceText: choice.text,
      reaction: choice.reaction
    };

    setHistoryNotes((prev) => [...prev, note]);
    setCurrentPendingReaction({ choice, reaction: choice.reaction });
    setGameState('growth_outcome');
  };

  // Move from choice reaction to the next growth node or checkpoint
  const handleNextGrowthNode = () => {
    // If just finished K-12 (index === K12_EVENTS.length - 1, which is Age 17 sprint)
    if (currentEventIdx === K12_EVENTS.length - 1) {
      const outcome = calculateGaokaoOutcome(attrs, tags);
      setGaokaoCalc(outcome);
      setGameState('gaokao_calculated');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const totalEvents = K12_EVENTS.length + CAREER_EVENTS.length;
    if (currentEventIdx < totalEvents - 1) {
      setCurrentEventIdx((prev) => prev + 1);
      setCurrentPendingReaction(null);
      setGameState('growth');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      const diag = evaluate27YearOldLife(attrs, tags);
      setDiagnosis(diag);
      setGameState('diagnosis');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // User makes a follow-up response to their 18yo Gaokao calculated outcome
  const handleGaokaoFollowup = (opt: {
    text: string;
    detail: string;
    delta: Partial<CharacterAttributes>;
    addTags?: string[];
  }) => {
    applyDeltas(opt.delta);
    if (opt.addTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(opt.addTags || [])])));
    }

    const note: LifeHistoryNote = {
      age: 18,
      stageName: "高考成人礼 · 18岁",
      title: gaokaoCalc ? gaokaoCalc.title : "高考放榜",
      choiceText: opt.text,
      reaction: opt.detail
    };
    setHistoryNotes((prev) => [...prev, note]);

    setCurrentEventIdx(K12_EVENTS.length);
    setCurrentPendingReaction(null);
    setGameState('growth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Commit to Age 27 Fork (Stay vs Emigrate)
  const handleDecide27Fork = (path: 'stay' | 'emigrate') => {
    setChosenPath(path);
    setParallelIdx(0);
    setGameState('parallel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Progress through Parallel Lives (30, 35, 42, 52, 63)
  const handleNextParallelMilestone = () => {
    const currentMile = PARALLEL_LIVES_MILESTONES[parallelIdx];
    const note: LifeHistoryNote = {
      age: currentMile.age,
      stageName: currentMile.title,
      title: currentMile.theme,
      choiceText: currentMile.choice.text,
      reaction:
        chosenPath === 'emigrate' ? currentMile.emigratedReflection : currentMile.stayedReflection
    };
    setHistoryNotes((prev) => [...prev, note]);

    if (parallelIdx < PARALLEL_LIVES_MILESTONES.length - 1) {
      setParallelIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setGameState('verdict');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Copy full chronicle
  const handleCopyChronicle = () => {
    const verdict = generateFinalLifetimeVerdict(chosenPath, attrs, tags);
    const text = `【逃跑计划 · 六十三载人生手札】
人物：${charData.name}（${charData.gender}）
籍贯：${charData.family.region}
住房：${charData.family.housing}
父母：父亲(${charData.family.fatherAge}岁 · ${charData.family.fatherJob}) / 母亲(${charData.family.motherAge}岁 · ${charData.family.motherJob})
终生判词：${verdict.summaryTitle}
${verdict.tagline}

人生抉择轨迹：
${historyNotes.map((n) => `[${n.stageName}] ${n.title} ➔ ${n.choiceText}`).join('\n')}

来自 EscapePlan《逃跑计划》中国式命运交互模拟`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helpers for text descriptions of core attributes (all upright, readable, no brackets clutter)
  const getInferiorityDesc = (val: number) => {
    if (val >= 60) return "深刻自卑敏感 · 深恐受人轻视";
    if (val >= 35) return "自尊内敛 · 习惯独自消化";
    return "坦荡野性 · 野草不轻易弯腰";
  };

  const getAcademicDesc = (val: number) => {
    if (val >= 60) return "顶尖做题机器 · 试卷杀出金身";
    if (val >= 35) return "中规中矩 · 普高夹缝求生";
    return "转战具体手艺 · 避开虚浮内卷";
  };

  const getGuiltDesc = (val: number) => {
    if (val >= 60) return "宗族重负 · 父母期待是无形锁链";
    if (val >= 35) return "隐性牵绊 · 始终挂念父母老去";
    return "精神断脐 · 纯粹为自己负责";
  };

  const getRebellionDesc = (val: number) => {
    if (val >= 60) return "逆鳞初成 · 随时准备掀桌";
    if (val >= 35) return "清醒游离 · 身体在场灵魂在逃";
    return "顺从规则 · 信奉集体与秩序";
  };

  const getResilienceDesc = (val: number) => {
    if (val >= 60) return "百炼成钢 · 四海皆可摸爬滚打";
    if (val >= 35) return "粗糙经磨 · 能吃常人苦";
    return "温室幼苗 · 尚未经历风浪";
  };

  // =========================================================================
  // VIEW 1: CINEMATIC BIRTHPLACE REEL & DOSSIER CARD (CLEAN EDITORIAL AESTHETICS)
  // =========================================================================
  if (gameState === 'setup') {
    const activeSlide = BIRTHPLACE_SLIDES[slideIndex];

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 font-serif">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-sm mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            人生底牌 · 天命降生投影
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight mb-3">
            抽一张人生底牌
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto leading-relaxed">
            没有人能自主选择降生的家庭。按下命运齿轮，看你这一世落入哪片泥土与屋檐。
          </p>
        </div>

        {/* Birthplace Carousel Reel (投胎幻灯片/轮盘) */}
        <div className="mb-8 rounded-3xl bg-[#14151B] border border-amber-900/40 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between text-sm text-stone-400 mb-4 border-b border-stone-800/80 pb-3">
            <span className="flex items-center gap-2 text-amber-400 font-medium">
              <span className={`inline-block w-2.5 h-2.5 rounded-full bg-amber-400 ${isSpinning ? 'animate-pulse' : ''}`} />
              {isSpinning ? "正在全中国疆域随机寻址中..." : "出生地已锁定落籍"}
            </span>
            <span className="text-stone-300">
              {isSpinning ? "定位中..." : charData.family.region}
            </span>
          </div>

          {/* Reel Display Card */}
          <div className="py-3">
            <div className="flex items-center gap-5">
              <div className="text-4xl sm:text-5xl p-4 rounded-2xl bg-[#0B0C0E] border border-stone-800 shrink-0">
                {isSpinning ? activeSlide.icon : "📍"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-stone-100 truncate mb-1.5">
                  {isSpinning ? activeSlide.region : charData.family.region}
                </div>
                <div className="text-base sm:text-lg text-amber-300/90 mb-1 leading-normal">
                  {isSpinning ? activeSlide.landscape : charData.family.regionDetail.split("。")[0]}
                </div>
                <div className="text-sm sm:text-base text-stone-400 leading-normal">
                  {isSpinning ? activeSlide.tagline : charData.family.regionDetail.split("。")[1] || charData.family.regionDetail}
                </div>
              </div>
            </div>
          </div>

          {/* Reel Control */}
          <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between">
            <span className="text-sm text-stone-400">
              {isSpinning ? "命运正在飞速翻转..." : "对出生地不满意？可重新抽取"}
            </span>
            <button
              onClick={triggerBirthReel}
              disabled={isSpinning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-stone-950 border border-stone-700 text-stone-200 text-sm sm:text-base transition-colors"
            >
              <RotateCcw className={`w-4 h-4 ${isSpinning ? 'animate-spin text-amber-400' : ''}`} />
              重新摇号投胎
            </button>
          </div>
        </div>

        {/* Detailed Dossier Card (端正、大方、清晰大字排版) */}
        {!isSpinning && (
          <div className="bg-[#16171E] border border-stone-800 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-7 animate-in fade-in duration-200">
            {/* Header: Name, gender, status stamp */}
            <div className="flex items-start justify-between pb-6 border-b border-stone-800">
              <div>
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-stone-100">
                    {charData.name}
                  </span>
                  <span className="text-lg text-stone-300">
                    6 岁 · {charData.gender}
                  </span>
                  <span className="text-sm px-3 py-1 rounded-full bg-amber-950/40 text-amber-200 border border-amber-800/40">
                    {charData.family.siblings}
                  </span>
                </div>
                <p className="text-base text-stone-400">
                  原籍：{charData.family.region}
                </p>
              </div>

              {/* Upright, dignified seal */}
              <div className="border border-rose-700/80 bg-rose-950/30 text-rose-300 px-3.5 py-1.5 rounded-xl text-sm font-bold tracking-wider">
                已落籍 · 六岁
              </div>
            </div>

            {/* Section 1: 住房与居住环境 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-base font-bold">
                <Home className="w-5 h-5 shrink-0" />
                <span>家里的住房条件：</span>
              </div>
              <p className="text-stone-200 text-base sm:text-lg leading-relaxed pl-7">
                {charData.family.housing}
              </p>
            </div>

            {/* Section 2: 父母职业、年龄与性情 */}
            <div className="space-y-3 pt-4 border-t border-stone-800/80">
              <div className="flex items-center gap-2 text-stone-200 text-base font-bold">
                <Users className="w-5 h-5 text-sky-400 shrink-0" />
                <span>父母生计与性情档案：</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-7">
                <div className="bg-[#101116] p-4 rounded-2xl border border-stone-800">
                  <div className="text-sm text-stone-400 mb-1">
                    父亲：{charData.family.fatherAge} 岁
                  </div>
                  <div className="text-base sm:text-lg font-bold text-stone-100 mb-1.5">
                    {charData.family.fatherJob}
                  </div>
                  <div className="text-sm sm:text-base text-stone-300 leading-relaxed">
                    「{charData.family.fatherTrait}」
                  </div>
                </div>

                <div className="bg-[#101116] p-4 rounded-2xl border border-stone-800">
                  <div className="text-sm text-stone-400 mb-1">
                    母亲：{charData.family.motherAge} 岁
                  </div>
                  <div className="text-base sm:text-lg font-bold text-stone-100 mb-1.5">
                    {charData.family.motherJob}
                  </div>
                  <div className="text-sm sm:text-base text-stone-300 leading-relaxed">
                    「{charData.family.motherTrait}」
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: 家境与经济水位 */}
            <div className="space-y-2.5 pt-4 border-t border-stone-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 text-base font-bold">
                  <Coins className="w-5 h-5 shrink-0" />
                  <span>家境与生计水位：</span>
                </div>
                <span className="text-sm font-sans font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-800/40">
                  存折结余约 ¥{charData.family.initialSavings.toLocaleString()} 元
                </span>
              </div>
              <p className="text-stone-200 text-base sm:text-lg leading-relaxed pl-7">
                <span className="font-bold text-amber-200">{charData.family.wealthTier}</span>。
                {charData.family.wealthDetail}
              </p>
              <div className="pl-7 text-sm sm:text-base text-stone-400 leading-relaxed">
                家庭精神氛围：{charData.family.emotionalTone}。{charData.family.toneDetail}
              </div>
            </div>

            {/* Section 4: 降生记忆切片 (Upright, dignified quote) */}
            <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800/80 text-base sm:text-lg text-stone-200 leading-relaxed">
              「{charData.family.backgroundStory}」
            </div>

            {/* Start CTA */}
            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={handleStartLife}
                className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-lg sm:text-xl shadow-xl shadow-amber-950/20 transition-all flex items-center justify-center gap-2.5"
              >
                接受这张底牌，以六岁之躯启程
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-sm text-stone-400 mt-3">
                从小学一年级开始，你的每一个选择都将与这份家庭底色发生剧烈化学反应
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 18-YEAR-OLD GAOKAO CALCULATED OUTCOME (高考出分系统因果裁定)
  // =========================================================================
  if (gameState === 'gaokao_calculated' && gaokaoCalc) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 font-serif">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/50 text-amber-300 border border-amber-800/50 text-sm mb-3">
            <GraduationCap className="w-4 h-4" />
            十八岁 · 高考放榜与成人命运审判
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-2.5">
            十二载因果终局出炉
          </h1>
          <p className="text-base sm:text-lg text-stone-300">
            你无法自选高分，这一刻的成绩单由你过去的十二年亲手铸成
          </p>
        </div>

        <div className="bg-[#16171E] border border-amber-900/60 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-7">
          {/* Headline Result */}
          <div className="text-center pb-6 border-b border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2.5">
              {gaokaoCalc.title}
            </h2>
            <div className="text-base font-sans font-semibold text-emerald-400 mb-4 bg-emerald-950/30 inline-block px-4 py-1.5 rounded-full border border-emerald-800/40">
              {gaokaoCalc.scoreText}
            </div>
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto bg-[#101116] p-5 rounded-2xl border border-stone-800">
              {gaokaoCalc.verdict}
            </p>
          </div>

          {/* Breakdown Dossier */}
          <div className="space-y-4 text-base sm:text-lg text-stone-200 leading-relaxed">
            <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800">
              <span className="text-amber-400 font-bold block mb-1.5">
                学历资产与现实门槛：
              </span>
              <p className="text-stone-200">{gaokaoCalc.academicCapitalDesc}</p>
            </div>

            <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800">
              <span className="text-sky-400 font-bold block mb-1.5">
                心理剖面与代际重荷：
              </span>
              <p className="text-stone-200">{gaokaoCalc.psychologicalDossier}</p>
            </div>
          </div>

          {/* Core Latent Metrics Snapshot */}
          <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800 space-y-2.5 text-sm sm:text-base text-stone-300">
            <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
              <span className="text-stone-400">【自卑与创伤】</span>
              <span className="text-stone-100 font-medium">{getInferiorityDesc(attrs.inferiority)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
              <span className="text-stone-400">【做题应试资本】</span>
              <span className="text-amber-300 font-medium">{getAcademicDesc(attrs.academicCapital)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
              <span className="text-stone-400">【宗族愧疚重荷】</span>
              <span className="text-stone-100 font-medium">{getGuiltDesc(attrs.kinshipGuilt)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
              <span className="text-stone-400">【反叛与逆鳞】</span>
              <span className="text-rose-400 font-medium">{getRebellionDesc(attrs.rebellion)}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-400">【生存韧劲】</span>
              <span className="text-emerald-400 font-medium">{getResilienceDesc(attrs.resilience)}</span>
            </div>
          </div>

          {/* Follow-up Choice based on this concrete outcome */}
          <div className="pt-4 border-t border-stone-800 space-y-3.5">
            <span className="text-base sm:text-lg font-bold text-stone-100 block">
              {gaokaoCalc.firstStepChoice.prompt}
            </span>
            {gaokaoCalc.firstStepChoice.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => handleGaokaoFollowup(opt)}
                className="w-full text-left p-5 rounded-2xl bg-[#1C1D26] hover:bg-[#242532] border border-stone-700/80 hover:border-amber-500/60 transition-all group"
              >
                <div className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-1.5">
                  ➔ {opt.text}
                </div>
                <div className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {opt.detail}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: GROWTH PHASE (6 ~ 27 岁：关隘推进与持续手札)
  // =========================================================================
  if (gameState === 'growth' || gameState === 'growth_outcome') {
    const isK12 = currentEventIdx < K12_EVENTS.length;
    const currentEvent = isK12
      ? K12_EVENTS[currentEventIdx]
      : CAREER_EVENTS[currentEventIdx - K12_EVENTS.length];
    const totalEvents = K12_EVENTS.length + CAREER_EVENTS.length;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 font-serif">
        {/* Top Header Bar with Live Character Dossier */}
        <div className="bg-[#14151B] border border-stone-800 rounded-2xl p-5 mb-6 space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-stone-100">
                {charData.name}
              </span>
              <span className="text-base text-stone-300">
                {currentEvent ? `${currentEvent.age} 岁` : ''} · {charData.family.region}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm text-stone-400 mr-2">现金储备</span>
              <span className="text-emerald-400 font-sans font-bold text-lg">
                ¥{attrs.savings.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Core Psychological State Bar (Clear 14px text) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm pt-1">
            <div className="flex items-center gap-2 text-stone-200">
              <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />
              <span>自卑：{getInferiorityDesc(attrs.inferiority).split(" · ")[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Brain className="w-4 h-4 text-amber-400 shrink-0" />
              <span>做题：{getAcademicDesc(attrs.academicCapital).split(" · ")[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Shield className="w-4 h-4 text-orange-400 shrink-0" />
              <span>宗族：{getGuiltDesc(attrs.kinshipGuilt).split(" · ")[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Flame className="w-4 h-4 text-red-500 shrink-0" />
              <span>反叛：{getRebellionDesc(attrs.rebellion).split(" · ")[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>韧劲：{getResilienceDesc(attrs.resilience).split(" · ")[0]}</span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800/80">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-sm px-2.5 py-0.5 rounded-lg bg-stone-900 text-stone-300 border border-stone-800"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Chronicle History (Scrollable Past Decisions) */}
        {historyNotes.length > 0 && (
          <div className="space-y-3.5 mb-8">
            <span className="text-sm text-stone-400 block tracking-wider uppercase font-medium">
              岁月印记 · 过去的命运转折 ({historyNotes.length} 次)
            </span>
            {historyNotes.map((note, idx) => (
              <div
                key={idx}
                className="bg-[#141419] border border-stone-800 rounded-2xl p-4 text-sm sm:text-base text-stone-300 transition-all"
              >
                <div className="flex items-center justify-between text-sm text-stone-400 mb-1.5">
                  <span className="font-bold text-stone-200">{note.stageName}</span>
                  <span>{note.title}</span>
                </div>
                <p className="text-stone-100 font-medium mb-1.5">
                  ➔ {note.choiceText}
                </p>
                <p className="text-stone-300 text-sm pl-3 border-l-2 border-stone-700 leading-relaxed">
                  {note.reaction}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Current Active Event Card */}
        {currentEvent && (
          <div className="bg-[#16171E] border border-amber-900/40 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3.5">
              <span className="text-amber-400 font-bold text-base sm:text-lg">
                【{currentEvent.stageName}】
              </span>
              <span className="text-sm text-stone-400">
                人生关隘 {currentEventIdx + 1} / {totalEvents}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 leading-snug">
              {currentEvent.title}
            </h2>

            <div className="text-base sm:text-lg text-stone-200 leading-relaxed whitespace-pre-line bg-[#101116] p-5 sm:p-6 rounded-2xl border border-stone-800">
              {currentEvent.scene}
            </div>

            {/* If user hasn't chosen yet */}
            {gameState === 'growth' && (
              <div className="space-y-3.5 pt-2">
                <span className="text-base font-bold text-stone-200 block tracking-wide">
                  做出你的抉择：
                </span>
                {currentEvent.choices.map((choice, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleChooseGrowth(choice)}
                    className="w-full text-left p-5 rounded-2xl bg-[#1D1E28] hover:bg-[#252634] border border-stone-700/80 hover:border-amber-500/60 transition-all group"
                  >
                    <div className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-1.5">
                      {choice.text}
                    </div>
                    <div className="text-sm sm:text-base text-stone-300 leading-relaxed">
                      {choice.detail}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* If user just picked, show immediate emotional aftermath */}
            {gameState === 'growth_outcome' && currentPendingReaction && (
              <div className="space-y-5 pt-2">
                <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5">
                  <span className="text-amber-400 text-sm font-bold block mb-2">
                    生活的回响：
                  </span>
                  <p className="text-base sm:text-lg text-stone-100 leading-relaxed">
                    「{currentPendingReaction.reaction}」
                  </p>
                </div>

                <button
                  onClick={handleNextGrowthNode}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  {currentEventIdx === K12_EVENTS.length - 1
                    ? '高考放榜：查阅系统为你算出的考分与大学'
                    : currentEventIdx < totalEvents - 1
                    ? '走向下一个节点'
                    : '步入二十七岁：人生命运清算'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: DIAGNOSIS AT AGE 27 (五年综合诊断与出逃决断)
  // =========================================================================
  if (gameState === 'diagnosis' && diagnosis) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 font-serif">
        <div className="text-center mb-8">
          <span className="text-sm px-3.5 py-1.5 rounded-full bg-amber-950/50 text-amber-300 border border-amber-800/50 inline-block mb-3">
            二十七岁 · 走向社会第五年
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-2.5">
            人生命运解构书
          </h1>
          <p className="text-base sm:text-lg text-stone-300">
            二十七年的多米诺骨牌在此收拢，你的骨骼成色已现
          </p>
        </div>

        {/* Diagnosis Parchment */}
        <div className="bg-[#16171E] border border-amber-800/50 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-7">
          {/* Headline Verdict */}
          <div className="text-center pb-6 border-b border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2.5">
              {diagnosis.title}
            </h2>
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              {diagnosis.portrait}
            </p>
          </div>

          {/* Deep Narrative Breakdowns */}
          <div className="space-y-4 text-base sm:text-lg text-stone-200 leading-relaxed">
            <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800">
              <span className="text-amber-400 font-bold block mb-1.5">
                故土与血缘审判：
              </span>
              {diagnosis.kinshipEvaluation}
            </div>

            <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800">
              <span className="text-sky-400 font-bold block mb-1.5">
                秩序与体制审查：
              </span>
              {diagnosis.systemEvaluation}
            </div>

            <div className="bg-[#101116] p-5 rounded-2xl border border-stone-800">
              <span className="text-stone-300 font-bold block mb-1.5">
                宿命判词：
              </span>
              「{diagnosis.fateVerdict}」
            </div>
          </div>

          {/* Accumulated Tags */}
          <div>
            <span className="text-sm text-stone-400 block mb-2.5">
              前二十七年铭刻在你身上的烙印：
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-xl bg-stone-900 text-stone-200 text-sm border border-stone-800"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Target Country Selection if Emigrating */}
          <div className="pt-6 border-t border-stone-800">
            <span className="text-base sm:text-lg font-bold text-stone-100 block mb-3.5">
              若选择出海，你的第一站备选：
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TARGET_COUNTRIES.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedCountry.id === country.id
                      ? 'bg-amber-950/40 border-amber-500 text-white'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-base sm:text-lg font-bold mb-1">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  <span className="text-sm text-stone-400 block line-clamp-1">
                    {country.city}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
              {selectedCountry.flag} {selectedCountry.name}（{selectedCountry.city}）：
              {selectedCountry.tagline}。{selectedCountry.costDesc}。
            </p>
          </div>

          {/* The Crucial Fork Buttons */}
          <div className="pt-6 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleDecide27Fork('stay')}
              className="py-4 px-5 rounded-2xl bg-[#201B17] hover:bg-[#28221D] border border-amber-900/50 hover:border-amber-700 text-stone-200 font-bold text-base sm:text-lg transition-all text-center"
            >
              【留在此岸 · 扎根故土】
              <span className="block text-sm font-normal text-stone-400 mt-1 font-sans">
                接纳熟人社会的秩序、房贷与生老病死
              </span>
            </button>

            <button
              onClick={() => handleDecide27Fork('emigrate')}
              className="py-4 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base sm:text-lg transition-all text-center shadow-lg shadow-amber-950/30"
            >
              【断脐出海 · 奔赴{selectedCountry.name}】
              <span className="block text-sm font-normal text-stone-900/80 mt-1 font-sans">
                斩断宗族与内卷，用一生清冷换取个人主权
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 5: PARALLEL LIVES (28 ~ 63 岁：双轨平行世界对映)
  // =========================================================================
  if (gameState === 'parallel') {
    const stage = PARALLEL_LIVES_MILESTONES[parallelIdx];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-serif">
        {/* Top Header */}
        <div className="text-center mb-8">
          <span className="text-sm px-3.5 py-1.5 rounded-full bg-stone-800 text-stone-300 inline-block mb-2.5">
            平行时空对照记 · {parallelIdx + 1} / {PARALLEL_LIVES_MILESTONES.length}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight">
            {stage.title}
          </h1>
          <p className="text-base text-stone-300 mt-1.5">
            命题：{stage.theme}
          </p>
        </div>

        {/* Dual Side-by-Side Reality Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Left Column: Emigrated You */}
          <div
            className={`rounded-3xl p-6 sm:p-7 border transition-all ${
              chosenPath === 'emigrate'
                ? 'bg-[#16171E] border-amber-600/60 shadow-xl ring-1 ring-amber-500/20'
                : 'bg-[#111216] border-stone-800/80 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-800">
              <span className="font-bold text-stone-100 flex items-center gap-2 text-lg sm:text-xl">
                <span>{selectedCountry.flag}</span>
                <span>【在异邦的你】</span>
              </span>
              {chosenPath === 'emigrate' && (
                <span className="text-sm px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  你选择的现实
                </span>
              )}
            </div>

            <p className="text-stone-200 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-5">
              {stage.emigratedScene}
            </p>

            <div className="bg-[#0E0F13] p-4 rounded-xl border border-stone-800 text-sm sm:text-base text-stone-300 leading-relaxed">
              「{stage.emigratedReflection}」
            </div>
          </div>

          {/* Right Column: Stayed in China You */}
          <div
            className={`rounded-3xl p-6 sm:p-7 border transition-all ${
              chosenPath === 'stay'
                ? 'bg-[#16171E] border-amber-600/60 shadow-xl ring-1 ring-amber-500/20'
                : 'bg-[#111216] border-stone-800/80 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-800">
              <span className="font-bold text-stone-100 flex items-center gap-2 text-lg sm:text-xl">
                <span>🇨🇳</span>
                <span>【留在国内的你】</span>
              </span>
              {chosenPath === 'stay' && (
                <span className="text-sm px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  你选择的现实
                </span>
              )}
            </div>

            <p className="text-stone-200 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-5">
              {stage.stayedScene}
            </p>

            <div className="bg-[#0E0F13] p-4 rounded-xl border border-stone-800 text-sm sm:text-base text-stone-300 leading-relaxed">
              「{stage.stayedReflection}」
            </div>
          </div>
        </div>

        {/* Milestone Resolution & Advance */}
        <div className="bg-[#14151B] border border-stone-800 rounded-3xl p-6 sm:p-8 mt-6">
          <div className="text-stone-200 text-base sm:text-lg font-bold leading-relaxed mb-3">
            ➔ {stage.choice.text}
          </div>
          <p className="text-stone-300 text-sm sm:text-base mb-6 leading-relaxed">
            「{stage.choice.detail}」
          </p>

          <button
            onClick={handleNextParallelMilestone}
            className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {parallelIdx < PARALLEL_LIVES_MILESTONES.length - 1
              ? '跨入下一个人生大坎'
              : '步入六十三岁：法定退休与人生终章'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 6: RETIREMENT VERDICT AT AGE 63 (六十三载终局与一生判词)
  // =========================================================================
  if (gameState === 'verdict') {
    const verdict = generateFinalLifetimeVerdict(chosenPath, attrs, tags);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 font-serif">
        <div className="text-center mb-8">
          <span className="text-sm px-3.5 py-1.5 rounded-full bg-stone-800 text-stone-300 inline-block mb-3">
            六十三岁 · 法定退休之年
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-2.5">
            六十三载人生判词
          </h1>
          <p className="text-base sm:text-lg text-stone-300">
            所有的奔赴与逃避，终归于一抔尘土
          </p>
        </div>

        {/* Lifetime Parchment */}
        <div className="bg-[#16171E] border border-amber-900/60 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-7">
          <div className="text-center pb-6 border-b border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2">
              {verdict.summaryTitle}
            </h2>
            <p className="text-stone-300 text-base sm:text-lg mb-4">
              {verdict.tagline}
            </p>
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed text-justify bg-[#101116] p-6 rounded-2xl border border-stone-800">
              {verdict.verdictText}
            </p>
          </div>

          {/* Profile Retrospective */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-2 border-b border-stone-800 text-sm sm:text-base">
            <div>
              <span className="text-stone-400 block text-xs sm:text-sm mb-1">人物原籍</span>
              <span className="text-stone-100 font-medium">{charData.family.region}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-xs sm:text-sm mb-1">最终归宿</span>
              <span className="text-stone-100 font-medium">
                {chosenPath === 'emigrate' ? `${selectedCountry.name} · ${selectedCountry.city}` : '国内故土'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-xs sm:text-sm mb-1">反叛逆鳞</span>
              <span className="text-rose-400 font-sans font-bold">{attrs.rebellion}%</span>
            </div>
            <div>
              <span className="text-stone-400 block text-xs sm:text-sm mb-1">宗族愧疚</span>
              <span className="text-amber-400 font-sans font-bold">{attrs.kinshipGuilt}%</span>
            </div>
          </div>

          {/* Chronicle List */}
          <div className="space-y-3.5 pt-2">
            <span className="text-sm text-stone-400 block uppercase tracking-wider font-medium">
              此生完整轨迹手札
            </span>
            <div className="max-h-72 overflow-y-auto space-y-2.5 pr-2">
              {historyNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-[#101116] p-3.5 rounded-xl border border-stone-800/80 text-sm"
                >
                  <div className="flex justify-between text-stone-400 mb-1">
                    <span className="text-stone-200 font-bold">{note.stageName}</span>
                    <span>{note.title}</span>
                  </div>
                  <p className="text-stone-100">➔ {note.choiceText}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-stone-800 space-y-3.5">
            <button
              onClick={handleCopyChronicle}
              className="w-full py-4 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-stone-200 font-medium text-base transition-all flex items-center justify-center gap-2 border border-stone-700"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  已复制完整六十三载人生手札
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  复制一生手札，分享这一世
                </>
              )}
            </button>

            {chosenPath === 'emigrate' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <button
                  onClick={() => onNavigateToSubclasses(selectedCountry.id)}
                  className="py-3.5 px-4 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-700/50 text-amber-200 text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  查阅{selectedCountry.name}真实签证与算分
                </button>
                <button
                  onClick={() => onNavigateToDIY(selectedCountry.id)}
                  className="py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  查阅{selectedCountry.name}手搓落地清单
                </button>
              </div>
            )}

            <button
              onClick={triggerBirthReel}
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <RotateCcw className="w-5 h-5" />
              换一张底牌，再活一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
