import React, { useState, useEffect, useRef } from 'react';
import {
  generateRandomFamily,
  BIRTHPLACE_SLIDES,
  LIFE_SIMULATION_TIMELINE,
  calculateGaokaoOutcome,
  evaluate27YearOldLife,
  PARALLEL_LIVES_MILESTONES,
  generateFinalLifetimeVerdict,
  TARGET_COUNTRIES,
  getHealthDesc,
  getHappinessDesc,
  getCognitionDesc,
  getSocialDesc,
  getIndependenceDesc,
  getKinshipDesc,
  getResilienceDesc,
  getFatherDynamicStatus,
  getMotherDynamicStatus,
  getSiblingDynamicStatus
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
  Sparkles,
  ArrowRight,
  HeartPulse,
  Brain,
  Smile,
  Users,
  Coins,
  Shield,
  Home,
  GraduationCap,
  Plane,
  Building,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  Compass
} from 'lucide-react';

interface LifeSimulatorProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
}

interface ChronicleLogEntry {
  id: string;
  age: number;
  year: number;
  stageName: string;
  title: string;
  scene: string;
  type: 'natural' | 'choice' | 'milestone';
  chosenOptionText?: string;
  chosenReaction?: string;
  statDelta?: Partial<CharacterAttributes>;
  tagsAdded?: string[];
}

export const LifeSimulator: React.FC<LifeSimulatorProps> = ({
  onNavigateToSubclasses,
  onNavigateToDIY
}) => {
  // Gameplay View Modes:
  // 'setup' -> Birthplace Reel & Family Card
  // 'cockpit' -> 3-column interactive simulation (Ages 0 to 27)
  // 'diagnosis_27' -> 27yo Life Evaluation Dossier
  // 'parallel' -> Ages 28 to 63 Dual-track parallel comparison
  // 'verdict' -> Age 63 Retirement dossier
  const [gamePhase, setGamePhase] = useState<
    'setup' | 'cockpit' | 'diagnosis_27' | 'parallel' | 'verdict'
  >('setup');

  // Mobile layout switcher for 3 columns: 'profile' | 'log' | 'family'
  const [mobileTab, setMobileTab] = useState<'profile' | 'log' | 'family'>('log');

  // Character & Family State
  const [charData, setCharData] = useState(() => generateRandomFamily());
  const birthYear = 1998;

  // Cinematic Birthplace Reel Animator
  const [isSpinning, setIsSpinning] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 4 Core Attributes + Latent Traits
  const [attrs, setAttrs] = useState<CharacterAttributes>(() => ({
    health: 85,
    happiness: 80,
    cognition: 25,
    social: 25,
    savings: charData.family.initialSavings,
    inferiority: 20,
    academicCapital: 20,
    kinshipGuilt: 25,
    rebellion: 25,
    resilience: 25
  }));

  const [tags, setTags] = useState<string[]>([]);

  // Chronicle Log Feed
  const [logEntries, setLogEntries] = useState<ChronicleLogEntry[]>([]);
  const [timelineIndex, setTimelineIndex] = useState(0);

  // Auto-scroll anchor for middle column
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const feedBottomRef = useRef<HTMLDivElement>(null);

  const scrollToFeedBottom = () => {
    setTimeout(() => {
      feedBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  // Age 18 Gaokao Calculated Outcome state
  const [gaokaoCalc, setGaokaoCalc] = useState<GaokaoCalculation | null>(null);
  const [showGaokaoModal, setShowGaokaoModal] = useState(false);

  // Age 27 Diagnosis & Decision state
  const [diagnosis, setDiagnosis] = useState<LifeDiagnosis | null>(null);
  const [chosenPath, setChosenPath] = useState<'stay' | 'emigrate'>('stay');
  const [chosenCountry, setChosenCountry] = useState<CountryOption>(TARGET_COUNTRIES[0]);

  // Parallel Lives State (Ages 28~63)
  const [parallelStageIdx, setParallelStageIdx] = useState(0);
  const [parallelNotes, setParallelNotes] = useState<string[]>([]);

  // Copy success state
  const [copied, setCopied] = useState(false);

  // Derived current age
  const currentAge =
    gamePhase === 'setup'
      ? 0
      : gamePhase === 'parallel'
      ? PARALLEL_LIVES_MILESTONES[parallelStageIdx]?.age || 28
      : gamePhase === 'verdict'
      ? 63
      : LIFE_SIMULATION_TIMELINE[timelineIndex]?.age ?? 27;

  // Dynamic Family Statuses
  const fatherStatus = getFatherDynamicStatus(
    charData.family.fatherAge,
    currentAge,
    charData.family.fatherTrait
  );
  const motherStatus = getMotherDynamicStatus(
    charData.family.motherAge,
    currentAge,
    charData.family.motherTrait
  );
  const siblingStatus = getSiblingDynamicStatus(charData.family.siblings, currentAge);

  const currentNode = LIFE_SIMULATION_TIMELINE[timelineIndex] || LIFE_SIMULATION_TIMELINE[0];
  const isChoiceNode = currentNode.type === 'choice' && currentNode.choices && currentNode.choices.length > 0;
  const lastLogEntry = logEntries[logEntries.length - 1];
  const waitingForChoice = isChoiceNode && lastLogEntry && !lastLogEntry.chosenOptionText;

  // =========================================================================
  // BIRTHPLACE REEL ANIMATION CONTROLLERS
  // =========================================================================
  const spinReel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    let speed = 60;
    let iterations = 0;
    const maxIterations = 24 + Math.floor(Math.random() * 8);

    const step = () => {
      setSlideIndex((prev) => (prev + 1) % BIRTHPLACE_SLIDES.length);
      iterations++;

      if (iterations < maxIterations) {
        if (iterations > maxIterations - 10) {
          speed += 35;
        }
        spinTimerRef.current = setTimeout(step, speed);
      } else {
        const fresh = generateRandomFamily();
        setCharData(fresh);
        const matchIdx = BIRTHPLACE_SLIDES.findIndex((s) => s.region === fresh.family.region);
        if (matchIdx !== -1) setSlideIndex(matchIdx);
        setIsSpinning(false);
      }
    };

    spinTimerRef.current = setTimeout(step, speed);
  };

  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    };
  }, []);

  // Smoothly anchor scroll inside middle feed container on entry or choice update
  useEffect(() => {
    if (gamePhase === 'cockpit') {
      scrollToFeedBottom();
    }
  }, [logEntries.length, waitingForChoice, gamePhase]);

  // =========================================================================
  // START SIMULATION FROM 0 YEARS OLD
  // =========================================================================
  const startSimulation = () => {
    const initialAttrs: CharacterAttributes = {
      health: 85,
      happiness: 80,
      cognition: 25,
      social: 25,
      savings: charData.family.initialSavings,
      inferiority: 20,
      academicCapital: 20,
      kinshipGuilt: 25,
      rebellion: 25,
      resilience: 25
    };
    setAttrs(initialAttrs);
    setTags(['初临人间']);

    // Age 0 initial log
    const age0Node = LIFE_SIMULATION_TIMELINE[0];
    const initialLog: ChronicleLogEntry = {
      id: age0Node.id,
      age: 0,
      year: birthYear,
      stageName: age0Node.stageName,
      title: age0Node.title,
      scene: age0Node.scene,
      type: 'natural',
      statDelta: age0Node.naturalDelta,
      tagsAdded: age0Node.naturalTags
    };

    setLogEntries([initialLog]);
    setTimelineIndex(0);
    setGamePhase('cockpit');
    setMobileTab('log');
    scrollToFeedBottom();
  };

  // Helper to apply attribute deltas safely
  const applyDelta = (delta: Partial<CharacterAttributes>) => {
    setAttrs((prev) => ({
      health: Math.min(100, Math.max(0, prev.health + (delta.health || 0))),
      happiness: Math.min(100, Math.max(0, prev.happiness + (delta.happiness || 0))),
      cognition: Math.min(100, Math.max(0, prev.cognition + (delta.cognition || 0))),
      social: Math.min(100, Math.max(0, prev.social + (delta.social || 0))),
      savings: prev.savings + (delta.savings || 0),
      inferiority: Math.min(100, Math.max(0, prev.inferiority + (delta.inferiority || 0))),
      academicCapital: Math.min(100, Math.max(0, prev.academicCapital + (delta.academicCapital || 0))),
      kinshipGuilt: Math.min(100, Math.max(0, prev.kinshipGuilt + (delta.kinshipGuilt || 0))),
      rebellion: Math.min(100, Math.max(0, prev.rebellion + (delta.rebellion || 0))),
      resilience: Math.min(100, Math.max(0, prev.resilience + (delta.resilience || 0)))
    }));
  };

  // =========================================================================
  // ADVANCE NATURAL TIMELINE STEP
  // =========================================================================
  const handleNextNaturalYear = () => {
    const nextIdx = timelineIndex + 1;
    if (nextIdx >= LIFE_SIMULATION_TIMELINE.length) {
      // Reached Age 27 final milestone
      triggerAge27Diagnosis();
      return;
    }

    const nextNode = LIFE_SIMULATION_TIMELINE[nextIdx];

    // Check if Age 18 milestone trigger
    if ((nextNode.age >= 18 || currentNode.age === 17) && !gaokaoCalc) {
      const calc = calculateGaokaoOutcome(attrs, tags);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
      return;
    }

    // Apply natural deltas if present
    if (nextNode.naturalDelta) {
      applyDelta(nextNode.naturalDelta);
    }
    if (nextNode.naturalTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(nextNode.naturalTags || [])])));
    }

    const newLog: ChronicleLogEntry = {
      id: nextNode.id,
      age: nextNode.age,
      year: birthYear + nextNode.age,
      stageName: nextNode.stageName,
      title: nextNode.title,
      scene: nextNode.scene,
      type: nextNode.type || 'natural',
      statDelta: nextNode.naturalDelta,
      tagsAdded: nextNode.naturalTags
    };

    setLogEntries((prev) => [...prev, newLog]);
    setTimelineIndex(nextIdx);
    scrollToFeedBottom();
  };

  // =========================================================================
  // SUBMIT PLAYER CHOICE
  // =========================================================================
  const handleSelectChoice = (choice: LifeChoice) => {
    const currentNode = LIFE_SIMULATION_TIMELINE[timelineIndex];

    applyDelta(choice.delta);
    if (choice.addTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(choice.addTags || [])])));
    }

    // Update current log entry with the selected choice and outcome
    setLogEntries((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last && last.id === currentNode.id) {
        last.chosenOptionText = choice.text;
        last.chosenReaction = choice.reaction;
        last.statDelta = choice.delta;
        last.tagsAdded = choice.addTags;
      }
      return updated;
    });

    // Check if next year is 18 (Gaokao trigger)
    const nextIdx = timelineIndex + 1;
    if (currentNode.age === 17) {
      const calc = calculateGaokaoOutcome(attrs, tags);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
      return;
    }

    // If reached end of timeline (Age 27)
    if (nextIdx >= LIFE_SIMULATION_TIMELINE.length) {
      triggerAge27Diagnosis();
      return;
    }

    // Automatically load next natural event or choice
    const nextNode = LIFE_SIMULATION_TIMELINE[nextIdx];
    if (nextNode.naturalDelta) {
      applyDelta(nextNode.naturalDelta);
    }
    if (nextNode.naturalTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(nextNode.naturalTags || [])])));
    }

    const nextLog: ChronicleLogEntry = {
      id: nextNode.id,
      age: nextNode.age,
      year: birthYear + nextNode.age,
      stageName: nextNode.stageName,
      title: nextNode.title,
      scene: nextNode.scene,
      type: nextNode.type || 'natural',
      statDelta: nextNode.naturalDelta,
      tagsAdded: nextNode.naturalTags
    };

    setLogEntries((prev) => [...prev, nextLog]);
    setTimelineIndex(nextIdx);
    scrollToFeedBottom();
  };

  // =========================================================================
  // AGE 18 GAOKAO RESOLUTION
  // =========================================================================
  const handleConfirmGaokaoStep = (option: {
    text: string;
    detail: string;
    delta: Partial<CharacterAttributes>;
    addTags?: string[];
  }) => {
    if (!gaokaoCalc) return;

    applyDelta(option.delta);
    if (option.addTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(option.addTags || [])])));
    }

    const gaokaoLog: ChronicleLogEntry = {
      id: 'gaokao_age_18',
      age: 18,
      year: birthYear + 18,
      stageName: '十八岁 · 高考放榜与成人分流',
      title: gaokaoCalc.title,
      scene: `${gaokaoCalc.scoreText}\n${gaokaoCalc.verdict}`,
      type: 'milestone',
      chosenOptionText: option.text,
      chosenReaction: option.detail,
      statDelta: option.delta,
      tagsAdded: option.addTags
    };

    setLogEntries((prev) => [...prev, gaokaoLog]);
    setShowGaokaoModal(false);

    // Proceed to Age 19
    const age19Idx = LIFE_SIMULATION_TIMELINE.findIndex((n) => n.age === 19);
    if (age19Idx !== -1) {
      const node19 = LIFE_SIMULATION_TIMELINE[age19Idx];
      if (node19.naturalDelta) applyDelta(node19.naturalDelta);
      if (node19.naturalTags) {
        setTags((prev) => Array.from(new Set([...prev, ...(node19.naturalTags || [])])));
      }
      const log19: ChronicleLogEntry = {
        id: node19.id,
        age: 19,
        year: birthYear + 19,
        stageName: node19.stageName,
        title: node19.title,
        scene: node19.scene,
        type: 'natural',
        statDelta: node19.naturalDelta,
        tagsAdded: node19.naturalTags
      };
      setLogEntries((prev) => [...prev, log19]);
      setTimelineIndex(age19Idx);
    }
    scrollToFeedBottom();
  };

  // =========================================================================
  // AGE 27 DIAGNOSIS & BRANCH SELECTION
  // =========================================================================
  const triggerAge27Diagnosis = () => {
    const diag = evaluate27YearOldLife(attrs, tags);
    setDiagnosis(diag);
    setGamePhase('diagnosis_27');
  };

  const handleConfirmAge27Path = (path: 'stay' | 'emigrate', country?: CountryOption) => {
    setChosenPath(path);
    if (country) setChosenCountry(country);
    setParallelStageIdx(0);
    setParallelNotes([]);
    setGamePhase('parallel');
  };

  // Advance parallel life stages (30, 35, 42, 52, 63)
  const handleNextParallelStage = () => {
    const currentStage = PARALLEL_LIVES_MILESTONES[parallelStageIdx];
    const note =
      chosenPath === 'emigrate'
        ? `【${currentStage.age}岁】${currentStage.title} ➔ 出海历练：${currentStage.emigratedReflection}`
        : `【${currentStage.age}岁】${currentStage.title} ➔ 扎根故土：${currentStage.stayedReflection}`;

    setParallelNotes((prev) => [...prev, note]);

    if (parallelStageIdx < PARALLEL_LIVES_MILESTONES.length - 1) {
      setParallelStageIdx((prev) => prev + 1);
    } else {
      setGamePhase('verdict');
    }
  };

  const handleRestart = () => {
    const fresh = generateRandomFamily();
    setCharData(fresh);
    const matchIdx = BIRTHPLACE_SLIDES.findIndex((s) => s.region === fresh.family.region);
    if (matchIdx !== -1) setSlideIndex(matchIdx);
    setGamePhase('setup');
    setGaokaoCalc(null);
    setShowGaokaoModal(false);
    setDiagnosis(null);
    setParallelStageIdx(0);
    setParallelNotes([]);
    setLogEntries([]);
    setTags([]);
  };

  const handleCopyRecord = () => {
    const finalVerdict = generateFinalLifetimeVerdict(chosenPath, attrs, tags);
    const text = `【逃跑计划 · 一生因果纪要档案】
代号/姓名：${charData.name}（${charData.gender}）
出生地：${charData.family.region}（${birthYear}年）
阶层背景：${charData.family.wealthTier}
住房条件：${charData.family.housing}
家庭期待：${charData.family.emotionalTone}

【六十三岁终局判词】
${finalVerdict.summaryTitle}
${finalVerdict.tagline}
${finalVerdict.verdictText}

【成长轨迹与重大抉择】
${logEntries
  .map(
    (e) =>
      `[${e.age}岁·${e.year}年] ${e.title}${
        e.chosenOptionText ? ` ➔ 抉择：${e.chosenOptionText}` : ''
      }`
  )
  .join('\n')}

【平行时空晚年体悟】
${parallelNotes.join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: BIRTHPLACE REEL SETUP SCREEN
  // =========================================================================
  if (gamePhase === 'setup') {
    const currentSlide = BIRTHPLACE_SLIDES[slideIndex] || BIRTHPLACE_SLIDES[0];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs sm:text-sm mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            人生模拟 · 原生家庭档案
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-2.5">
            随机投胎 · 抽取人生底牌
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            人无法自主挑选起点。每一个随机生成的家庭，都对应着一段真实的成长轨迹与社会现实。
          </p>
        </div>

        {/* Slot Reel */}
        <div className="bg-[#12131C] border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-400 mb-4 border-b border-stone-800/80 pb-3">
            <span className="flex items-center gap-2 text-amber-400 font-medium">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full bg-amber-400 ${
                  isSpinning ? 'animate-pulse' : ''
                }`}
              />
              {isSpinning ? '正在随机匹配出生地...' : '出生地已确定'}
            </span>
            <span className="text-stone-300">
              {isSpinning ? '定位中...' : charData.family.region}
            </span>
          </div>

          <div className="relative overflow-hidden h-28 sm:h-32 rounded-xl bg-[#0A0B10] border border-stone-800 flex items-center justify-center">
            <div
              className={`text-center transition-all duration-150 ${
                isSpinning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-1">{currentSlide.icon}</div>
              <div className="text-lg sm:text-xl font-bold text-stone-100 tracking-wide">
                {currentSlide.region}
              </div>
              <div className="text-xs sm:text-sm text-amber-300/80 mt-1">
                {currentSlide.landscape}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-stone-400">
              {isSpinning ? '齿轮飞速运转中...' : '不满意当前出身，可再次摇号投胎'}
            </span>
            <button
              onClick={spinReel}
              disabled={isSpinning}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
              重新投胎摇号
            </button>
          </div>
        </div>

        {/* Dossier Card */}
        <div className="bg-[#12131C] border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                【生平档案编号 · 0岁】
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-3">
                <span>{charData.name}</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 font-normal">
                  {charData.gender} · 1998年生
                </span>
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 block">阶层水位</span>
              <span className="text-xs sm:text-sm font-medium text-amber-300">
                {charData.family.wealthTier}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                父亲：{charData.family.fatherAge}岁 · {charData.family.fatherJob}
              </div>
              <p className="text-stone-300 leading-relaxed text-xs sm:text-[13px]">
                {charData.family.fatherTrait}
              </p>
            </div>

            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                母亲：{charData.family.motherAge}岁 · {charData.family.motherJob}
              </div>
              <p className="text-stone-300 leading-relaxed text-xs sm:text-[13px]">
                {charData.family.motherTrait}
              </p>
            </div>

            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-stone-300 font-semibold flex items-center gap-1.5">
                <Home className="w-4 h-4 text-stone-400" />
                居住环境与家庭资产
              </div>
              <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                {charData.family.housing}
              </p>
              <p className="text-stone-400 text-xs mt-1">{charData.family.wealthDetail}</p>
            </div>

            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-stone-300 font-semibold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-stone-400" />
                同胞与情感底色
              </div>
              <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                {charData.family.siblings} — {charData.family.siblingsDetail}
              </p>
              <p className="text-amber-300/80 text-xs mt-1">{charData.family.emotionalTone}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800 flex justify-end">
            <button
              onClick={startSimulation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 active:scale-[0.99]"
            >
              <span>接受这个出身，从0岁开始探索人生</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 3-COLUMN COCKPIT INTERACTIVE SIMULATION
  // =========================================================================

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0B0F17] text-stone-100 font-sans overflow-hidden">
      {/* Cockpit Top Bar */}
      <header className="h-11 border-b border-stone-800/90 bg-[#10121A] px-4 flex items-center justify-between shrink-0 text-xs text-stone-300">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-100 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            公历 {birthYear + currentAge} 年 · {currentAge} 岁
          </span>
          <span className="hidden sm:inline-block text-stone-500">|</span>
          <span className="hidden sm:inline-block text-stone-400">
            {currentAge <= 11
              ? '第一幕：故土童年'
              : currentAge <= 18
              ? '第二幕：应试分流'
              : '第三幕：步入社会'}
          </span>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden bg-stone-900 p-0.5 rounded-lg border border-stone-800 text-[11px]">
          <button
            onClick={() => setMobileTab('profile')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'profile' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            档案
          </button>
          <button
            onClick={() => setMobileTab('log')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'log' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            日志
          </button>
          <button
            onClick={() => setMobileTab('family')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'family' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            家庭
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <span className="text-stone-400">
            储蓄：
            <span
              className={`font-mono font-semibold ml-1 ${
                attrs.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              ¥{attrs.savings.toLocaleString()}
            </span>
          </span>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors"
            title="重新投胎"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重新投胎</span>
          </button>
        </div>
      </header>

      {/* 3-Column Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================================================================= */}
        {/* LEFT COLUMN: Personal Info & 4 Core Stats                        */}
        {/* ================================================================= */}
        <aside
          className={`${
            mobileTab === 'profile' ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-72 shrink-0 border-r border-stone-800/80 bg-[#111219] p-4 flex-col gap-4 overflow-y-auto`}
        >
          {/* Identity Card */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-stone-100">{charData.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                {charData.gender} · {currentAge}岁
              </span>
            </div>
            <div className="text-xs text-stone-400 space-y-1">
              <div>出生：{charData.family.region}</div>
              <div>阶层：{charData.family.wealthTier}</div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-stone-800/80">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-300">个人现金：</span>
                <span
                  className={`font-mono font-semibold ${
                    attrs.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  ¥{attrs.savings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Core Attributes Meters */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block pb-1 border-b border-stone-800/80">
              四维生命状态
            </span>

            {/* Health */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                  健康
                </span>
                <span className="font-mono text-emerald-400 font-semibold">{attrs.health}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.health}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getHealthDesc(attrs.health)}</div>
            </div>

            {/* Happiness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  幸福
                </span>
                <span className="font-mono text-amber-400 font-semibold">{attrs.happiness}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.happiness}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getHappinessDesc(attrs.happiness)}</div>
            </div>

            {/* Cognition */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-sky-400" />
                  认知
                </span>
                <span className="font-mono text-sky-400 font-semibold">{attrs.cognition}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.cognition}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getCognitionDesc(attrs.cognition)}</div>
            </div>

            {/* Social */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  社交
                </span>
                <span className="font-mono text-purple-400 font-semibold">{attrs.social}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.social}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getSocialDesc(attrs.social)}</div>
            </div>
          </div>

          {/* Latent Traits */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-stone-400 block pb-1 border-b border-stone-800/80">
              潜意识心理特质
            </span>
            <div className="flex justify-between py-0.5">
              <span className="text-stone-400">独立与叛逆：</span>
              <span className="text-rose-400 font-medium">
                {getIndependenceDesc(attrs.rebellion)}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-stone-400">家庭牵绊感：</span>
              <span className="text-amber-400 font-medium">
                {getKinshipDesc(attrs.kinshipGuilt)}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-stone-400">生存抗压韧劲：</span>
              <span className="text-emerald-400 font-medium">
                {getResilienceDesc(attrs.resilience)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-2">
            <span className="text-xs font-semibold text-stone-400 block">成长烙印印记</span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[11px] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ================================================================= */}
        {/* MIDDLE COLUMN: Life Chronicle Log Stream (Independent Scroll)     */}
        {/* ================================================================= */}
        <main
          className={`${
            mobileTab === 'log' ? 'flex' : 'hidden'
          } lg:flex flex-1 bg-[#0E0F14] flex-col h-full min-w-0 relative`}
        >
          {/* Chronicle Feed Container */}
          <div
            ref={feedContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
          >
            {logEntries.map((entry, idx) => (
              <div
                key={entry.id + idx}
                className="bg-[#12131C] border border-stone-800/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5 transition-all"
              >
                {/* Entry Header */}
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/70 pb-2">
                  <span className="font-mono text-amber-400 font-medium">
                    [{entry.age}岁 · {entry.year}年]
                  </span>
                  <span className="text-stone-400">{entry.stageName}</span>
                </div>

                {/* Entry Title */}
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-stone-100">
                  {entry.title}
                </h3>

                {/* Narrative scene */}
                <p className="text-[14px] sm:text-[15px] text-stone-300 leading-relaxed whitespace-pre-line font-sans">
                  {entry.scene}
                </p>

                {/* If Stat Delta present */}
                {entry.statDelta && Object.keys(entry.statDelta).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    {entry.statDelta.health !== undefined && entry.statDelta.health !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.health > 0
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        健康 {entry.statDelta.health > 0 ? `+${entry.statDelta.health}` : entry.statDelta.health}
                      </span>
                    )}
                    {entry.statDelta.cognition !== undefined && entry.statDelta.cognition !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.cognition > 0
                            ? 'bg-sky-950/60 text-sky-400 border border-sky-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        认知 {entry.statDelta.cognition > 0 ? `+${entry.statDelta.cognition}` : entry.statDelta.cognition}
                      </span>
                    )}
                    {entry.statDelta.social !== undefined && entry.statDelta.social !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.social > 0
                            ? 'bg-purple-950/60 text-purple-400 border border-purple-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        社交 {entry.statDelta.social > 0 ? `+${entry.statDelta.social}` : entry.statDelta.social}
                      </span>
                    )}
                    {entry.statDelta.savings !== undefined && entry.statDelta.savings !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.savings > 0
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        现金 {entry.statDelta.savings > 0 ? `+¥${entry.statDelta.savings}` : `-¥${Math.abs(entry.statDelta.savings)}`}
                      </span>
                    )}
                  </div>
                )}

                {/* If a choice was made */}
                {entry.chosenOptionText && (
                  <div className="mt-2.5 pt-2.5 border-t border-stone-800/80 bg-[#0E0F14] p-3 rounded-xl space-y-1">
                    <div className="text-xs text-amber-400 font-medium">
                      抉择：{entry.chosenOptionText}
                    </div>
                    {entry.chosenReaction && (
                      <div className="text-xs sm:text-[13px] text-stone-400 leading-normal">
                        {entry.chosenReaction}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Active Choice Card (if waiting for choice) */}
            {waitingForChoice && currentNode.choices && (
              <div className="bg-[#151722] border-2 border-amber-800/70 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300">
                  <Compass className="w-4 h-4 text-amber-400" />
                  人生关隘抉择 · 面对当前境况，你的抉择是：
                </div>
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {currentNode.choices.map((choice, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSelectChoice(choice)}
                      className="p-3 sm:p-3.5 rounded-xl border border-stone-800 bg-[#0E0F14] hover:border-amber-500/60 hover:bg-amber-950/20 text-left transition-all active:scale-[0.99] group"
                    >
                      <div className="text-xs sm:text-sm font-medium text-stone-100 group-hover:text-amber-300 flex items-center justify-between">
                        <span>{choice.text}</span>
                        <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <div className="text-xs text-stone-400 mt-1 leading-normal">
                        {choice.detail}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Sentinel */}
            <div ref={feedBottomRef} className="h-2" />
          </div>

          {/* Action Bar at Bottom of Middle Column */}
          <div className="p-3 sm:p-4 border-t border-stone-800/90 bg-[#10121A] flex items-center justify-between shrink-0">
            <span className="text-xs text-stone-400">
              {waitingForChoice ? '请在上方卡片做出你的选择' : '当前年份纪实已沉淀'}
            </span>

            {!waitingForChoice && (
              <button
                onClick={handleNextNaturalYear}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-900/20 active:scale-[0.99]"
              >
                <span>
                  {timelineIndex >= LIFE_SIMULATION_TIMELINE.length - 1
                    ? '展开27岁人生命运解构书'
                    : `迈入下一岁（${currentAge + 1}岁）`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: Family Tree & Kinship Ecosystem                     */}
        {/* ================================================================= */}
        <aside
          className={`${
            mobileTab === 'family' ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-72 shrink-0 border-l border-stone-800/80 bg-[#111219] p-4 flex-col gap-4 overflow-y-auto`}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block pb-1 border-b border-stone-800/80">
            原生家庭与血缘生态
          </span>

          {/* Father Dynamic Card */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                父亲：{fatherStatus.age}岁
              </span>
              <span className="text-stone-400 font-normal">{charData.family.fatherJob}</span>
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed pt-1">
              {fatherStatus.status}
            </div>
            <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-800/70">
              性格：{charData.family.fatherTrait}
            </div>
          </div>

          {/* Mother Dynamic Card */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                母亲：{motherStatus.age}岁
              </span>
              <span className="text-stone-400 font-normal">{charData.family.motherJob}</span>
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed pt-1">
              {motherStatus.status}
            </div>
            <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-800/70">
              性格：{charData.family.motherTrait}
            </div>
          </div>

          {/* Siblings */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="text-stone-300 font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-stone-400" />
              同胞现状（{charData.family.siblings}）
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed pt-1">
              {siblingStatus}
            </div>
          </div>

          {/* Housing & Family Assets */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="text-stone-300 font-semibold flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-stone-400" />
              家庭居所与月度压力
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed">
              {charData.family.housing}
            </div>
            <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-800/70">
              {charData.family.wealthDetail}
            </div>
          </div>
        </aside>
      </div>

      {/* ================================================================= */}
      {/* MODAL: 18yo GAOKAO CALCULATED OUTCOME MODAL                       */}
      {/* ================================================================= */}
      {showGaokaoModal && gaokaoCalc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14151E] border border-amber-700/80 rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="text-center pb-4 border-b border-stone-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/50 text-xs mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                十八岁 · 高考放榜与学业结算
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">
                {gaokaoCalc.title}
              </h2>
              <div className="text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-950/30 inline-block px-3.5 py-1 rounded-full border border-emerald-800/40">
                {gaokaoCalc.scoreText}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0E0F14] p-4 rounded-xl border border-stone-800">
              {gaokaoCalc.verdict}
            </p>

            <div className="text-xs text-stone-400 space-y-1">
              <div>【学业资本】{gaokaoCalc.academicCapitalDesc}</div>
              <div>【心理画像】{gaokaoCalc.psychologicalDossier}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="text-xs font-semibold text-amber-300 block">
                {gaokaoCalc.firstStepChoice.prompt}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {gaokaoCalc.firstStepChoice.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleConfirmGaokaoStep(opt)}
                    className="p-3 rounded-xl border border-stone-800 bg-[#0E0F14] hover:border-amber-500/70 hover:bg-amber-950/20 text-left transition-all active:scale-[0.99]"
                  >
                    <div className="text-xs sm:text-sm font-medium text-stone-100 mb-1">
                      {opt.text}
                    </div>
                    <div className="text-xs text-stone-400 leading-normal">{opt.detail}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: 27yo LIFE EVALUATION DOSSIER (Stay vs Emigrate)            */}
      {/* ================================================================= */}
      {gamePhase === 'diagnosis_27' && diagnosis && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14151F] border border-stone-700 rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-8">
            <div className="text-center pb-4 border-b border-stone-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs mb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                走向社会第五年 · 二十七岁人生命运解构书
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">
                {diagnosis.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed mt-2">
                {diagnosis.portrait}
              </p>
            </div>

            {/* Analysis details */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-[#0E0F14] p-3.5 rounded-xl border border-stone-800">
                <span className="text-amber-400 font-semibold block mb-1">
                  家庭顾念与情感牵绊：
                </span>
                <span className="text-stone-300 leading-relaxed">
                  {diagnosis.kinshipEvaluation}
                </span>
              </div>

              <div className="bg-[#0E0F14] p-3.5 rounded-xl border border-stone-800">
                <span className="text-sky-400 font-semibold block mb-1">
                  体制依附与现实权衡：
                </span>
                <span className="text-stone-300 leading-relaxed">
                  {diagnosis.systemEvaluation}
                </span>
              </div>

              <div className="bg-[#0E0F14] p-3.5 rounded-xl border border-stone-800">
                <span className="text-stone-200 font-semibold block mb-1">
                  人生研判与核心结论：
                </span>
                <span className="text-stone-300 leading-relaxed">
                  「{diagnosis.fateVerdict}」
                </span>
              </div>
            </div>

            {/* The Big Fork Decision */}
            <div className="pt-3 border-t border-stone-800 space-y-3">
              <span className="text-xs font-semibold text-stone-200 block text-center">
                站在二十七岁的分水岭，你的关键决断：
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleConfirmAge27Path('stay')}
                  className="p-4 rounded-xl border border-stone-800 bg-[#0E0F14] hover:border-amber-500/70 hover:bg-amber-950/20 text-left transition-all active:scale-[0.99] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-amber-400 mb-1">
                      <Building className="w-4 h-4" />
                      留在国内深耕发展
                    </div>
                    <div className="text-xs text-stone-400 leading-relaxed">
                      接受本土熟人网络与安稳秩序，在体制内外按部就班扎根，陪伴父母老去。
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-medium mt-3 flex items-center gap-1">
                    选择此生路 ➔
                  </span>
                </button>

                <button
                  onClick={() => handleConfirmAge27Path('emigrate', TARGET_COUNTRIES[0])}
                  className="p-4 rounded-xl border border-stone-800 bg-[#0E0F14] hover:border-sky-500/70 hover:bg-sky-950/20 text-left transition-all active:scale-[0.99] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-sky-400 mb-1">
                      <Plane className="w-4 h-4" />
                      启程出海，开拓异邦
                    </div>
                    <div className="text-xs text-stone-400 leading-relaxed">
                      放下沉没成本与熟人目光，带着技能与积蓄跨洋远行，追求更宽广的个人空间。
                    </div>
                  </div>
                  <span className="text-xs text-sky-400 font-medium mt-3 flex items-center gap-1">
                    选择出海路 ➔
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* VIEW 3: PARALLEL TRAJECTORIES TO RETIREMENT (Ages 28~63)          */}
      {/* ================================================================= */}
      {gamePhase === 'parallel' && (
        <div className="fixed inset-0 z-50 bg-[#0B0F17] overflow-y-auto flex flex-col p-4 sm:p-8">
          <div className="max-w-4xl mx-auto w-full my-auto space-y-6">
            {/* Header */}
            <div className="text-center pb-4 border-b border-stone-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs mb-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                双轨平行对映 · {PARALLEL_LIVES_MILESTONES[parallelStageIdx].title}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-stone-100">
                {PARALLEL_LIVES_MILESTONES[parallelStageIdx].theme}
              </h2>
            </div>

            {/* Side-by-side Trajectory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Emigrated Path */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  chosenPath === 'emigrate'
                    ? 'border-sky-600/80 bg-sky-950/15 ring-1 ring-sky-500/30'
                    : 'border-stone-800/80 bg-[#12131C] opacity-75'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-bold text-sky-400 mb-2">
                  <Plane className="w-4 h-4" />
                  海外轨迹 · {chosenCountry.name}
                  {chosenPath === 'emigrate' && (
                    <span className="ml-auto text-[11px] px-2 py-0.5 rounded bg-sky-900/60 text-sky-300">
                      你当前选择
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-3">
                  {PARALLEL_LIVES_MILESTONES[parallelStageIdx].emigratedScene}
                </p>
                <div className="text-xs text-sky-300/80 pt-2 border-t border-stone-800/80">
                  体悟：{PARALLEL_LIVES_MILESTONES[parallelStageIdx].emigratedReflection}
                </div>
              </div>

              {/* Stayed Path */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  chosenPath === 'stay'
                    ? 'border-amber-600/80 bg-amber-950/15 ring-1 ring-amber-500/30'
                    : 'border-stone-800/80 bg-[#12131C] opacity-75'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-2">
                  <Building className="w-4 h-4" />
                  留土轨迹 · 故土深耕
                  {chosenPath === 'stay' && (
                    <span className="ml-auto text-[11px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-300">
                      你当前选择
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-3">
                  {PARALLEL_LIVES_MILESTONES[parallelStageIdx].stayedScene}
                </p>
                <div className="text-xs text-amber-300/80 pt-2 border-t border-stone-800/80">
                  体悟：{PARALLEL_LIVES_MILESTONES[parallelStageIdx].stayedReflection}
                </div>
              </div>
            </div>

            {/* Advance Button */}
            <div className="flex justify-end pt-4 border-t border-stone-800">
              <button
                onClick={handleNextParallelStage}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-900/20 active:scale-[0.99]"
              >
                <span>
                  {parallelStageIdx < PARALLEL_LIVES_MILESTONES.length - 1
                    ? `迈入下一阶段（${PARALLEL_LIVES_MILESTONES[parallelStageIdx + 1].age}岁）`
                    : '查看六十三岁法定退休终局'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* VIEW 4: AGE 63 RETIREMENT LIFETIME VERDICT                        */}
      {/* ================================================================= */}
      {gamePhase === 'verdict' && (
        <div className="fixed inset-0 z-50 bg-[#0B0F17] overflow-y-auto flex flex-col p-4 sm:p-8">
          <div className="max-w-2xl mx-auto w-full my-auto space-y-6">
            {(() => {
              const finalVerdict = generateFinalLifetimeVerdict(chosenPath, attrs, tags);

              return (
                <div className="bg-[#12131C] border border-stone-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    六十三岁 · 法定退休一生手记
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {finalVerdict.summaryTitle}
                  </h2>
                  <div className="text-xs sm:text-sm text-stone-400 font-serif">
                    {finalVerdict.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0E0F14] p-5 rounded-xl border border-stone-800 text-left">
                    {finalVerdict.verdictText}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleCopyRecord}
                      className="flex-1 py-3 px-4 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>已复制生平手记</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>一键复制一生档案</span>
                        </>
                      )}
                    </button>

                    {chosenPath === 'emigrate' && (
                      <button
                        onClick={() => onNavigateToSubclasses(chosenCountry.id)}
                        className="py-3 px-4 rounded-xl border border-sky-800 bg-sky-950/40 hover:bg-sky-900/50 text-sky-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Compass className="w-4 h-4" />
                        <span>查看{chosenCountry.name}职业矩阵</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onNavigateToDIY(chosenCountry.id)}
                      className="py-3 px-4 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>DIY落地指南</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleRestart}
                      className="py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>开启下一世</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
