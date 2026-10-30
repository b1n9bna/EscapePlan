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
      if (spinTimerRef.current) clearInterval(spinTimerRef.current);
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
        // Decelerate smoothly
        if (iterations > 12) speed += 35;
        spinTimerRef.current = setTimeout(runReel, speed);
      } else {
        // Settle down on a final random life
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
      // Calculate Gaokao outcome from past choices!
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
      // Finished age 27! Calculate 27yo diagnosis
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

    // Proceed to college (event index for CAREER_EVENTS start)
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

  // Helpers for text descriptions of core attributes
  const getInferiorityDesc = (val: number) => {
    if (val >= 60) return "深刻自卑敏感（深恐被人轻视）";
    if (val >= 35) return "自尊内敛（把贫瘠磨成硬壳）";
    return "坦荡野性（野草不轻易弯腰）";
  };

  const getAcademicDesc = (val: number) => {
    if (val >= 60) return "应试做题机器（杀出名校金身）";
    if (val >= 35) return "中规中矩（普高夹缝求生）";
    return "看淡应试（转战具体手艺生计）";
  };

  const getGuiltDesc = (val: number) => {
    if (val >= 60) return "宗族重负（全家的期望与无形锁链）";
    if (val >= 35) return "隐性愧疚（挂念父母衰老）";
    return "精神断脐（只为自己负责）";
  };

  const getRebellionDesc = (val: number) => {
    if (val >= 60) return "逆鳞初成（随时准备掀桌）";
    if (val >= 35) return "清醒游离（身体在工位灵魂在逃跑）";
    return "顺从规则（信奉集体与秩序）";
  };

  const getResilienceDesc = (val: number) => {
    if (val >= 60) return "百炼成钢（四海皆可摸爬滚打）";
    if (val >= 35) return "粗糙经磨（能吃常人苦）";
    return "温室幼苗（未见大风大浪）";
  };

  // =========================================================================
  // VIEW 1: CINEMATIC BIRTHPLACE REEL & DOSSIER CARD
  // =========================================================================
  if (gameState === 'setup') {
    const activeSlide = BIRTHPLACE_SLIDES[slideIndex];

    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Title & Atmosphere */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-serif mb-3 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            人生开局 · 天命降生投影
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-2.5">
            抽一张人生底牌
          </h1>
          <p className="text-sm sm:text-base text-stone-400 font-serif max-w-lg mx-auto">
            没有人能自主选择降生的家庭。按下命运之轮，看你这一世落入哪片泥土与屋檐。
          </p>
        </div>

        {/* Cinematic Birthplace Carousel Reel (投胎幻灯片/轮盘) */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181E] to-[#121216] border border-amber-900/30 p-6 sm:p-7 shadow-2xl">
          <div className="flex items-center justify-between text-xs font-serif text-stone-500 mb-3 border-b border-stone-800 pb-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 ${isSpinning ? 'block' : 'hidden'}`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {isSpinning ? "正在全中国疆域随机寻址中..." : "出生地已锁定落籍"}
            </span>
            <span className="font-mono text-stone-400">坐标：{charData.family.region}</span>
          </div>

          {/* Reel Display Card */}
          <div className={`transition-all duration-150 transform ${isSpinning ? 'scale-95 opacity-80 blur-[0.5px]' : 'scale-100 opacity-100'}`}>
            <div className="flex items-center gap-4 py-2">
              <div className="text-4xl sm:text-5xl p-3 sm:p-4 rounded-2xl bg-[#0F0F12] border border-stone-800 shadow-inner">
                {isSpinning ? activeSlide.icon : "📍"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl sm:text-3xl font-serif font-bold text-stone-100 truncate mb-1">
                  {isSpinning ? activeSlide.region : charData.family.region}
                </div>
                <div className="text-xs sm:text-sm font-serif text-amber-300/90 truncate mb-1">
                  {isSpinning ? activeSlide.landscape : charData.family.regionDetail.split("。")[0]}
                </div>
                <div className="text-xs font-serif text-stone-400 line-clamp-1">
                  {isSpinning ? activeSlide.tagline : charData.family.regionDetail.split("。")[1] || charData.family.regionDetail}
                </div>
              </div>
            </div>
          </div>

          {/* Trigger Reel Button */}
          <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
            <span className="text-xs font-serif text-stone-500">
              {isSpinning ? "命运正在飞速翻转..." : "对出身不满意？可以重新摇号"}
            </span>
            <button
              onClick={triggerBirthReel}
              disabled={isSpinning}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-stone-950 border border-stone-700 text-stone-200 text-xs sm:text-sm font-serif transition-colors"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin text-amber-400' : ''}`} />
              重新摇号投胎
            </button>
          </div>
        </div>

        {/* Detailed Dossier Card (等停下来的时候出现的完整户籍卡片) */}
        {!isSpinning && (
          <div className="bg-[#17171C] border border-stone-800 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
            {/* Top Identity Row with Red Ink Stamp Effect */}
            <div className="flex items-start justify-between pb-5 border-b border-stone-800">
              <div>
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
                    {charData.name}
                  </span>
                  <span className="text-base text-stone-400 font-serif">
                    6 岁 · {charData.gender}
                  </span>
                  <span className="text-xs font-serif px-2.5 py-0.5 rounded-full bg-amber-950/40 text-amber-200 border border-amber-800/40">
                    {charData.family.siblings}
                  </span>
                </div>
                <p className="text-sm text-stone-400 font-serif">
                  籍贯：{charData.family.region}
                </p>
              </div>

              {/* Red Archival Stamp */}
              <div className="rotate-[-6deg] border-2 border-rose-700/80 text-rose-500 px-3 py-1 rounded-lg text-xs sm:text-sm font-serif font-black tracking-widest uppercase select-none opacity-90 shadow-sm shadow-rose-950">
                已落籍 · 六岁
              </div>
            </div>

            {/* Section 1: 住房与居住环境 */}
            <div className="bg-[#121215] p-4.5 rounded-2xl border border-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-serif text-sm font-semibold">
                <Home className="w-4 h-4 text-amber-400 shrink-0" />
                <span>家里的住房条件：</span>
              </div>
              <p className="text-stone-200 font-serif text-sm sm:text-base leading-relaxed pl-6">
                {charData.family.housing}
              </p>
            </div>

            {/* Section 2: 父母职业、年龄与性情 */}
            <div className="bg-[#141419] p-4.5 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-stone-200 font-serif text-sm font-semibold">
                <Users className="w-4 h-4 text-sky-400 shrink-0" />
                <span>父母生计与性情档案：</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
                <div className="bg-[#0F0F13] p-3 rounded-xl border border-stone-800/80">
                  <div className="text-xs text-stone-500 font-serif mb-1">
                    父亲：{charData.family.fatherAge} 岁
                  </div>
                  <div className="text-sm font-serif font-semibold text-stone-200 mb-1">
                    {charData.family.fatherJob}
                  </div>
                  <div className="text-xs font-serif text-stone-400 leading-relaxed">
                    “{charData.family.fatherTrait}”
                  </div>
                </div>

                <div className="bg-[#0F0F13] p-3 rounded-xl border border-stone-800/80">
                  <div className="text-xs text-stone-500 font-serif mb-1">
                    母亲：{charData.family.motherAge} 岁
                  </div>
                  <div className="text-sm font-serif font-semibold text-stone-200 mb-1">
                    {charData.family.motherJob}
                  </div>
                  <div className="text-xs font-serif text-stone-400 leading-relaxed">
                    “{charData.family.motherTrait}”
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: 家境与经济水位 */}
            <div className="bg-[#1C1715] p-4.5 rounded-2xl border border-amber-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-serif text-sm font-semibold">
                  <Coins className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>家境与生计水位：</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/40">
                  存折结余约 ¥{charData.family.initialSavings.toLocaleString()}
                </span>
              </div>
              <p className="text-stone-300 font-serif text-sm leading-relaxed pl-6">
                <span className="font-semibold text-amber-200">{charData.family.wealthTier}</span>。
                {charData.family.wealthDetail}
              </p>
              <div className="pt-2 border-t border-amber-950/60 pl-6 text-xs font-serif text-stone-400">
                家庭精神氛围：{charData.family.emotionalTone}。{charData.family.toneDetail}
              </div>
            </div>

            {/* Section 4: 降生记忆切片 */}
            <p className="text-sm sm:text-base text-stone-300 font-serif leading-relaxed italic bg-stone-900/40 p-4 rounded-xl border border-stone-800/40">
              “{charData.family.backgroundStory}”
            </p>

            {/* Start CTA */}
            <div className="pt-3 border-t border-stone-800">
              <button
                onClick={handleStartLife}
                className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-serif font-bold text-lg shadow-xl shadow-amber-950/20 transition-all flex items-center justify-center gap-2"
              >
                接受这张底牌，以六岁之躯启程
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-xs text-stone-500 font-serif mt-2.5">
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-serif px-3 py-1 rounded-full bg-amber-950/50 text-amber-300 border border-amber-800/50 inline-flex items-center gap-1.5 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            十八岁 · 高考放榜与成人命运审判
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight mb-2">
            十二载因果终局出炉
          </h1>
          <p className="text-base text-stone-400 font-serif">
            你无法自选高分，这一刻的成绩单由你过去的十二年亲手铸成
          </p>
        </div>

        <div className="bg-[#18181C] border border-amber-900/60 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          {/* Headline Result */}
          <div className="text-center pb-6 border-b border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
              {gaokaoCalc.title}
            </h2>
            <div className="text-sm font-sans font-semibold text-emerald-400 mb-3 bg-emerald-950/30 inline-block px-3 py-1 rounded-full border border-emerald-800/40">
              {gaokaoCalc.scoreText}
            </div>
            <p className="text-stone-300 font-serif text-base sm:text-lg leading-relaxed max-w-xl mx-auto bg-[#131316] p-5 rounded-2xl border border-stone-800">
              {gaokaoCalc.verdict}
            </p>
          </div>

          {/* Breakdown Dossier */}
          <div className="space-y-3 font-serif text-sm sm:text-base text-stone-300 leading-relaxed">
            <div className="bg-[#141417] p-4.5 rounded-2xl border border-stone-800">
              <span className="text-amber-400 font-semibold block mb-1">
                学历资产与现实门槛：
              </span>
              <p className="text-stone-200">{gaokaoCalc.academicCapitalDesc}</p>
            </div>

            <div className="bg-[#141417] p-4.5 rounded-2xl border border-stone-800">
              <span className="text-sky-400 font-semibold block mb-1">
                心理剖面与代际重荷：
              </span>
              <p className="text-stone-200">{gaokaoCalc.psychologicalDossier}</p>
            </div>
          </div>

          {/* Core Latent Metrics Snapshot */}
          <div className="bg-[#121215] p-4.5 rounded-2xl border border-stone-800 space-y-2 text-xs font-serif text-stone-400">
            <div className="flex justify-between">
              <span>【自卑与创伤】</span>
              <span className="text-stone-200">{getInferiorityDesc(attrs.inferiority)}</span>
            </div>
            <div className="flex justify-between">
              <span>【做题应试资本】</span>
              <span className="text-amber-300">{getAcademicDesc(attrs.academicCapital)}</span>
            </div>
            <div className="flex justify-between">
              <span>【宗族愧疚重荷】</span>
              <span className="text-stone-200">{getGuiltDesc(attrs.kinshipGuilt)}</span>
            </div>
            <div className="flex justify-between">
              <span>【反叛与逆鳞】</span>
              <span className="text-rose-400">{getRebellionDesc(attrs.rebellion)}</span>
            </div>
            <div className="flex justify-between">
              <span>【生存韧劲】</span>
              <span className="text-emerald-400">{getResilienceDesc(attrs.resilience)}</span>
            </div>
          </div>

          {/* Follow-up Choice based on this concrete outcome */}
          <div className="pt-4 border-t border-stone-800 space-y-3">
            <span className="text-sm font-serif font-semibold text-stone-200 block">
              {gaokaoCalc.firstStepChoice.prompt}
            </span>
            {gaokaoCalc.firstStepChoice.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => handleGaokaoFollowup(opt)}
                className="w-full text-left p-4 sm:p-5 rounded-2xl bg-[#1D1D22] hover:bg-[#25252C] border border-stone-700/80 hover:border-amber-500/60 transition-all group"
              >
                <div className="text-base sm:text-lg font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors mb-1.5">
                  ➔ {opt.text}
                </div>
                <div className="text-xs sm:text-sm font-serif text-stone-400 leading-relaxed">
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Top Header Bar with Live Character Dossier */}
        <div className="bg-[#151518] border border-stone-800 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-bold text-stone-100">
                {charData.name}
              </span>
              <span className="text-sm font-serif text-stone-400">
                {currentEvent ? `${currentEvent.age} 岁` : ''} · {charData.family.region}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500 font-serif mr-1.5">现金储备</span>
              <span className="text-emerald-400 font-sans font-semibold text-base">
                ¥{attrs.savings.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Core Psychological State Bar (用户核心系统项可视化展示) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-serif pt-1">
            <div className="flex items-center gap-1.5 text-stone-300">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">自卑：{getInferiorityDesc(attrs.inferiority).split("（")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Brain className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">做题：{getAcademicDesc(attrs.academicCapital).split("（")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Shield className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">宗族负荷：{getGuiltDesc(attrs.kinshipGuilt).split("（")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Flame className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">反叛逆鳞：{getRebellionDesc(attrs.rebellion).split("（")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">生存韧劲：{getResilienceDesc(attrs.resilience).split("（")[0]}</span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-stone-800/60">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-serif px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Chronicle History (Scrollable Past Decisions) */}
        {historyNotes.length > 0 && (
          <div className="space-y-3 mb-8">
            <span className="text-xs font-serif text-stone-500 block tracking-wider uppercase">
              岁月印记 ({historyNotes.length} 次命运转折)
            </span>
            {historyNotes.map((note, idx) => (
              <div
                key={idx}
                className="bg-[#141417] border border-stone-800/80 rounded-2xl p-4 text-stone-400 font-serif text-sm transition-all"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-stone-300">{note.stageName}</span>
                  <span>{note.title}</span>
                </div>
                <p className="text-stone-200 font-medium mb-1.5">
                  ➔ {note.choiceText}
                </p>
                <p className="text-stone-400 text-xs italic pl-2.5 border-l-2 border-stone-700">
                  {note.reaction}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Current Active Event Card */}
        {currentEvent && (
          <div className="bg-[#18181C] border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-amber-400 font-serif font-bold text-sm sm:text-base">
                【{currentEvent.stageName}】
              </span>
              <span className="text-xs font-serif text-stone-500">
                人生关隘 {currentEventIdx + 1} / {totalEvents}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 leading-snug">
              {currentEvent.title}
            </h2>

            <div className="text-base sm:text-lg text-stone-200 font-serif leading-relaxed whitespace-pre-line bg-[#131316] p-5 rounded-2xl border border-stone-800">
              {currentEvent.scene}
            </div>

            {/* If user hasn't chosen yet */}
            {gameState === 'growth' && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-serif text-stone-400 block tracking-wider">
                  做出你的抉择：
                </span>
                {currentEvent.choices.map((choice, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleChooseGrowth(choice)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-[#1D1D22] hover:bg-[#25252C] border border-stone-700/80 hover:border-amber-500/60 transition-all group"
                  >
                    <div className="text-base sm:text-lg font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors mb-1.5">
                      {choice.text}
                    </div>
                    <div className="text-xs sm:text-sm font-serif text-stone-400 leading-relaxed">
                      {choice.detail}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* If user just picked, show immediate emotional aftermath */}
            {gameState === 'growth_outcome' && currentPendingReaction && (
              <div className="space-y-4 pt-2">
                <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5">
                  <span className="text-amber-400 font-serif text-xs block mb-1.5">
                    生活的回响：
                  </span>
                  <p className="text-base sm:text-lg text-stone-100 font-serif leading-relaxed italic">
                    “{currentPendingReaction.reaction}”
                  </p>
                </div>

                <button
                  onClick={handleNextGrowthNode}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-serif font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2"
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-serif px-3 py-1 rounded-full bg-amber-950/50 text-amber-300 border border-amber-800/50 inline-block mb-3">
            二十七岁 · 走向社会第五年
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight mb-2">
            人生命运解构书
          </h1>
          <p className="text-base text-stone-400 font-serif">
            二十七年的多米诺骨牌在此收拢，你的骨骼成色已现
          </p>
        </div>

        {/* Diagnosis Parchment */}
        <div className="bg-[#18181C] border border-amber-800/50 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          {/* Headline Verdict */}
          <div className="text-center pb-6 border-b border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
              {diagnosis.title}
            </h2>
            <p className="text-stone-300 font-serif text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              {diagnosis.portrait}
            </p>
          </div>

          {/* Deep Narrative Breakdowns */}
          <div className="space-y-3 font-serif text-sm sm:text-base text-stone-300 leading-relaxed">
            <div className="bg-[#1C1715] p-4 rounded-xl border border-amber-950/80">
              <span className="text-amber-400 font-semibold block mb-1">
                故土与血缘审判：
              </span>
              {diagnosis.kinshipEvaluation}
            </div>

            <div className="bg-[#151719] p-4 rounded-xl border border-stone-800">
              <span className="text-sky-400 font-semibold block mb-1">
                秩序与体制审查：
              </span>
              {diagnosis.systemEvaluation}
            </div>

            <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 italic">
              <span className="text-stone-400 font-semibold block mb-1">
                宿命判词：
              </span>
              “{diagnosis.fateVerdict}”
            </div>
          </div>

          {/* Accumulated Tags */}
          <div>
            <span className="text-xs font-serif text-stone-500 block mb-2">
              前二十七年铭刻在你身上的烙印：
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs font-serif border border-stone-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Target Country Selection if Emigrating */}
          <div className="pt-6 border-t border-stone-800">
            <span className="text-sm font-serif text-stone-300 font-semibold block mb-3">
              若选择出海，你的第一站备选：
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TARGET_COUNTRIES.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-3 rounded-xl border text-left font-serif transition-all ${
                    selectedCountry.id === country.id
                      ? 'bg-amber-950/40 border-amber-500 text-white'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-base font-bold mb-1">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  <span className="text-xs text-stone-500 block line-clamp-1">
                    {country.city}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs font-serif text-stone-400 mt-2">
              {selectedCountry.flag} {selectedCountry.name}（{selectedCountry.city}）：
              {selectedCountry.tagline}。{selectedCountry.costDesc}。
            </p>
          </div>

          {/* The Crucial Fork Buttons */}
          <div className="pt-6 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleDecide27Fork('stay')}
              className="py-4 px-5 rounded-2xl bg-[#221C18] hover:bg-[#2C241F] border border-amber-900/50 hover:border-amber-700 text-stone-200 font-serif font-bold text-base transition-all text-center"
            >
              【留在此岸 · 扎根故土】
              <span className="block text-xs font-normal text-stone-400 mt-1 font-sans">
                接纳熟人社会的秩序、房贷与生老病死
              </span>
            </button>

            <button
              onClick={() => handleDecide27Fork('emigrate')}
              className="py-4 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-base transition-all text-center shadow-lg shadow-amber-950/30"
            >
              【断脐出海 · 奔赴{selectedCountry.name}】
              <span className="block text-xs font-normal text-stone-900/80 mt-1 font-sans">
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Top Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-serif px-3 py-1 rounded-full bg-stone-800 text-stone-400 inline-block mb-2">
            平行时空对照记 · {parallelIdx + 1} / {PARALLEL_LIVES_MILESTONES.length}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            {stage.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-400 font-serif mt-1">
            命题：{stage.theme}
          </p>
        </div>

        {/* Dual Side-by-Side Reality Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Left Column: Emigrated You */}
          <div
            className={`rounded-3xl p-6 border transition-all ${
              chosenPath === 'emigrate'
                ? 'bg-[#18181C] border-amber-600/60 shadow-xl ring-1 ring-amber-500/20'
                : 'bg-[#131316] border-stone-800/80 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
              <span className="font-serif font-bold text-stone-100 flex items-center gap-1.5 text-base sm:text-lg">
                <span>{selectedCountry.flag}</span>
                <span>【在异邦的你】</span>
              </span>
              {chosenPath === 'emigrate' && (
                <span className="text-xs font-serif px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  你选择的现实
                </span>
              )}
            </div>

            <p className="text-stone-200 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line mb-4">
              {stage.emigratedScene}
            </p>

            <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 text-xs sm:text-sm font-serif text-stone-400 italic">
              {stage.emigratedReflection}
            </div>
          </div>

          {/* Right Column: Stayed in China You */}
          <div
            className={`rounded-3xl p-6 border transition-all ${
              chosenPath === 'stay'
                ? 'bg-[#18181C] border-amber-600/60 shadow-xl ring-1 ring-amber-500/20'
                : 'bg-[#131316] border-stone-800/80 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
              <span className="font-serif font-bold text-stone-100 flex items-center gap-1.5 text-base sm:text-lg">
                <span>🇨🇳</span>
                <span>【留在国内的你】</span>
              </span>
              {chosenPath === 'stay' && (
                <span className="text-xs font-serif px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  你选择的现实
                </span>
              )}
            </div>

            <p className="text-stone-200 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line mb-4">
              {stage.stayedScene}
            </p>

            <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 text-xs sm:text-sm font-serif text-stone-400 italic">
              {stage.stayedReflection}
            </div>
          </div>
        </div>

        {/* Milestone Resolution & Advance */}
        <div className="bg-[#17171A] border border-stone-800 rounded-3xl p-6 sm:p-8 mt-6">
          <div className="text-stone-300 font-serif text-base sm:text-lg leading-relaxed mb-4">
            ➔ {stage.choice.text}
          </div>
          <p className="text-stone-400 font-serif text-xs sm:text-sm italic mb-6">
            “{stage.choice.detail}”
          </p>

          <button
            onClick={handleNextParallelMilestone}
            className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-serif font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-serif px-3 py-1 rounded-full bg-stone-800 text-stone-400 inline-block mb-3">
            六十三岁 · 法定退休之年
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight mb-2">
            六十三载人生判词
          </h1>
          <p className="text-base text-stone-400 font-serif">
            所有的奔赴与逃避，终归于一抔尘土
          </p>
        </div>

        {/* Lifetime Parchment */}
        <div className="bg-[#18181C] border border-amber-900/60 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="text-center pb-6 border-b border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
              {verdict.summaryTitle}
            </h2>
            <p className="text-stone-400 font-serif italic text-base sm:text-lg mb-4">
              {verdict.tagline}
            </p>
            <p className="text-stone-200 font-serif text-base sm:text-lg leading-relaxed text-justify bg-[#131316] p-5 rounded-2xl border border-stone-800">
              {verdict.verdictText}
            </p>
          </div>

          {/* Profile Retrospective */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-serif py-2 border-b border-stone-800 text-sm">
            <div>
              <span className="text-stone-500 block text-xs mb-1">人物原籍</span>
              <span className="text-stone-200">{charData.family.region}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">最终归宿</span>
              <span className="text-stone-200">
                {chosenPath === 'emigrate' ? `${selectedCountry.name} · ${selectedCountry.city}` : '国内故土'}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">反叛逆鳞</span>
              <span className="text-rose-400 font-sans font-semibold">{attrs.rebellion}%</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">宗族愧疚</span>
              <span className="text-amber-400 font-sans font-semibold">{attrs.kinshipGuilt}%</span>
            </div>
          </div>

          {/* Chronicle List */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-serif text-stone-500 block uppercase tracking-wider">
              此生完整轨迹手札
            </span>
            <div className="max-h-72 overflow-y-auto space-y-2 pr-2">
              {historyNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-[#121215] p-3 rounded-xl border border-stone-800/80 text-xs font-serif"
                >
                  <div className="flex justify-between text-stone-500 mb-1">
                    <span className="text-stone-300 font-semibold">{note.stageName}</span>
                    <span>{note.title}</span>
                  </div>
                  <p className="text-stone-200">➔ {note.choiceText}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-stone-800 space-y-3">
            <button
              onClick={handleCopyChronicle}
              className="w-full py-3.5 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-stone-200 font-serif font-medium text-base transition-all flex items-center justify-center gap-2 border border-stone-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  已复制完整六十三载人生手札
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制一生手札，分享这一世
                </>
              )}
            </button>

            {chosenPath === 'emigrate' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => onNavigateToSubclasses(selectedCountry.id)}
                  className="py-3 px-4 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-700/50 text-amber-200 font-serif text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  查阅{selectedCountry.name}真实签证与算分
                </button>
                <button
                  onClick={() => onNavigateToDIY(selectedCountry.id)}
                  className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 font-serif text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  查阅{selectedCountry.name}手搓落地清单
                </button>
              </div>
            )}

            <button
              onClick={triggerBirthReel}
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-base transition-all flex items-center justify-center gap-2 mt-2"
            >
              <RotateCcw className="w-4 h-4" />
              换一张底牌，再活一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
