import React, { useState } from 'react';
import {
  generateRandomFamily,
  K12_EVENTS,
  CAREER_EVENTS,
  evaluate27YearOldLife,
  PARALLEL_LIVES_MILESTONES,
  generateFinalLifetimeVerdict,
  TARGET_COUNTRIES
} from '../data/simulation';
import type {
  LifeChoice,
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
  ChevronRight
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
  // 'setup' -> 'growth' (ages 6 to 27) -> 'growth_outcome' -> 'diagnosis' (age 27 fork) -> 'parallel' (ages 30 to 63) -> 'verdict' (retirement at 63)
  const [gameState, setGameState] = useState<
    'setup' | 'growth' | 'growth_outcome' | 'diagnosis' | 'parallel' | 'verdict'
  >('setup');

  // Player Baseline
  const [charData, setCharData] = useState(() => generateRandomFamily());
  const [isRolling, setIsRolling] = useState(false);

  // Hidden/Manifest Metrics
  const [savings, setSavings] = useState(charData.family.initialSavings);
  const [autonomy, setAutonomy] = useState(50);
  const [kinshipTies, setKinshipTies] = useState(65);
  const [institutional, setInstitutional] = useState(45);
  const [resilience, setResilience] = useState(50);
  const [tags, setTags] = useState<string[]>([]);

  // Sequential Events for ages 6 to 27
  const allGrowthEvents = [...K12_EVENTS, ...CAREER_EVENTS];
  const [currentEventIdx, setCurrentEventIdx] = useState(0);

  // Chronicle History (Persistent timeline)
  const [historyNotes, setHistoryNotes] = useState<LifeHistoryNote[]>([]);
  const [currentPendingReaction, setCurrentPendingReaction] = useState<{
    choice: LifeChoice;
    reaction: string;
  } | null>(null);

  // Age 27 Diagnosis
  const [diagnosis, setDiagnosis] = useState<LifeDiagnosis | null>(null);
  const [chosenPath, setChosenPath] = useState<'stay' | 'emigrate'>('emigrate');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(TARGET_COUNTRIES[0]);

  // Parallel Lives (ages 28 to 63)
  const [parallelIdx, setParallelIdx] = useState(0);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Re-roll character
  const handleRollNewLife = () => {
    setIsRolling(true);
    setTimeout(() => {
      const fresh = generateRandomFamily();
      setCharData(fresh);
      setSavings(fresh.family.initialSavings);
      setAutonomy(50);
      setKinshipTies(65);
      setInstitutional(45);
      setResilience(50);
      setTags([]);
      setIsRolling(false);
    }, 150);
  };

  // Begin Life at Age 6
  const handleStartLife = () => {
    setSavings(charData.family.initialSavings);
    setAutonomy(50);
    setKinshipTies(65);
    setInstitutional(45);
    setResilience(50);
    setTags([]);
    setCurrentEventIdx(0);
    setHistoryNotes([]);
    setCurrentPendingReaction(null);
    setGameState('growth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User selects an option in the 6~27 growth phase
  const handleChooseGrowth = (choice: LifeChoice) => {
    const currentEvt = allGrowthEvents[currentEventIdx];

    setSavings((prev) => prev + choice.savingsDelta);
    setAutonomy((prev) => Math.min(100, Math.max(0, prev + choice.autonomyDelta)));
    setKinshipTies((prev) => Math.min(100, Math.max(0, prev + choice.kinshipDelta)));
    setInstitutional((prev) => Math.min(100, Math.max(0, prev + choice.institutionalDelta)));
    setResilience((prev) => Math.min(100, Math.max(0, prev + choice.resilienceDelta)));

    if (choice.addTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(choice.addTags || [])])));
    }

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

  // Move from choice reaction to the next growth year
  const handleNextGrowthNode = () => {
    if (currentEventIdx < allGrowthEvents.length - 1) {
      setCurrentEventIdx((prev) => prev + 1);
      setCurrentPendingReaction(null);
      setGameState('growth');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      // Finished age 27! Calculate diagnosis
      const diag = evaluate27YearOldLife(autonomy, kinshipTies, institutional, savings, tags);
      setDiagnosis(diag);
      setGameState('diagnosis');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    // Record into history
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
      // Reached 63! Retirement verdict
      setGameState('verdict');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Copy full chronicle
  const handleCopyChronicle = () => {
    const verdict = generateFinalLifetimeVerdict(chosenPath, autonomy, kinshipTies);
    const text = `【逃跑计划 · 六十三载人生手札】
人物：${charData.name}（${charData.gender}）
籍贯：${charData.family.region}
家庭底色：${charData.family.parents} · ${charData.family.siblings}
终生判词：${verdict.summaryTitle}
${verdict.tagline}

人生抉择轨迹：
${historyNotes.map((n) => `[${n.stageName}] ${n.title} ➔ ${n.choiceText}`).join('\n')}

来自 EscapePlan《逃跑计划》中国式命运交互模拟`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: SETUP SCREEN (原生家庭底牌)
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight mb-2">
            抽一张人生底牌
          </h1>
          <p className="text-base text-stone-400 font-serif">
            从六岁开始，体验你无法自选的原生家庭与一生的连锁抉择
          </p>
        </div>

        {/* Character Card */}
        <div
          className={`bg-[#17171A] border border-stone-800 rounded-3xl p-6 sm:p-9 shadow-2xl transition-all duration-200 ${
            isRolling ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-stone-800">
            <div>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                  {charData.name}
                </span>
                <span className="text-base text-stone-400 font-serif">
                  6 岁 · {charData.gender}
                </span>
                <span className="text-xs sm:text-sm font-serif px-2.5 py-0.5 rounded-full bg-amber-950/40 text-amber-200 border border-amber-800/40">
                  {charData.family.siblings}
                </span>
              </div>
              <p className="text-base text-stone-300 font-medium">
                {charData.family.region}
              </p>
            </div>
            <button
              onClick={handleRollNewLife}
              disabled={isRolling}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 text-xs sm:text-sm font-serif transition-colors"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
              重新投胎
            </button>
          </div>

          {/* Regional Reality */}
          <div className="my-4 bg-[#121215] p-4.5 rounded-2xl border border-stone-800/70">
            <span className="text-stone-500 text-xs font-serif block mb-1">
              地缘与生计土壤
            </span>
            <p className="text-base text-stone-200 font-serif leading-relaxed">
              {charData.family.regionDetail}
            </p>
          </div>

          {/* Parents & Kinship */}
          <div className="bg-[#1C1715] border border-amber-900/30 rounded-2xl p-4.5 my-4 space-y-2">
            <div>
              <span className="text-amber-400 font-serif font-semibold text-sm block">
                父母与生计：{charData.family.parents}
              </span>
              <p className="text-stone-300 font-serif text-sm leading-relaxed mt-1">
                {charData.family.parentsDetail}
              </p>
            </div>
            <div className="pt-2 border-t border-amber-950/60">
              <span className="text-stone-400 font-serif text-xs block">
                家庭精神氛围：{charData.family.emotionalTone}
              </span>
              <p className="text-stone-300 font-serif text-sm leading-relaxed mt-0.5">
                {charData.family.toneDetail}
              </p>
            </div>
          </div>

          {/* Opening Narrative */}
          <p className="text-base text-stone-300 my-4 font-serif leading-relaxed italic bg-stone-900/40 p-4 rounded-xl border border-stone-800/40">
            “{charData.family.backgroundStory}”
          </p>

          {/* Initial Baseline */}
          <div className="grid grid-cols-2 gap-4 my-4 pt-4 border-t border-stone-800 text-sm font-serif">
            <div>
              <span className="text-stone-500 block text-xs mb-1">初始家庭存款底子</span>
              <span className="text-emerald-400 font-semibold text-base font-sans">
                ¥{charData.family.initialSavings.toLocaleString()} 元
              </span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">同胞格局</span>
              <span className="text-stone-200">{charData.family.siblings}</span>
            </div>
          </div>

          {/* Start CTA */}
          <div className="pt-6 border-t border-stone-800 mt-2">
            <button
              onClick={handleStartLife}
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-serif font-bold text-lg shadow-xl shadow-amber-950/20 transition-all flex items-center justify-center gap-2"
            >
              以六岁之躯，走入这一生
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-stone-500 font-serif mt-2.5">
              从小学、中考分流、高考到毕业五年，每一次抉择都将塑造你的骨骼
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2 & 3: GROWTH PHASE (6 ~ 27 岁：应试铁笼到社会前五年)
  // =========================================================================
  if (gameState === 'growth' || gameState === 'growth_outcome') {
    const currentEvent = allGrowthEvents[currentEventIdx];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-bold text-stone-100">
                {charData.name}
              </span>
              <span className="text-sm font-serif text-stone-400">
                {currentEvent ? `${currentEvent.age} 岁` : ''} · {charData.family.region}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-serif px-2 py-0.5 rounded bg-stone-800 text-stone-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-500 block font-serif">个人结余</span>
            <span className="text-emerald-400 font-sans font-semibold text-base">
              ¥{savings.toLocaleString()}
            </span>
          </div>
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
                人生关隘 {currentEventIdx + 1} / {allGrowthEvents.length}
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
                  {currentEventIdx < allGrowthEvents.length - 1
                    ? '走向下一年'
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

          {/* Value Dimensions Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121215] p-5 rounded-2xl border border-stone-800">
            <div>
              <span className="text-xs text-stone-500 font-serif block mb-1">
                个体主权 vs 宗族重力
              </span>
              <div className="flex items-center justify-between text-sm font-serif">
                <span className="text-stone-300">主权: {autonomy}%</span>
                <span className="text-amber-400 font-semibold">重力: {kinshipTies}%</span>
              </div>
              <div className="w-full bg-stone-800 h-2 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${kinshipTies}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-xs text-stone-500 font-serif block mb-1">
                体制依附 vs 生存韧劲
              </span>
              <div className="flex items-center justify-between text-sm font-serif">
                <span className="text-stone-300">体制: {institutional}%</span>
                <span className="text-emerald-400 font-semibold">韧劲: {resilience}%</span>
              </div>
              <div className="w-full bg-stone-800 h-2 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${resilience}%` }}
                />
              </div>
            </div>
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
    const verdict = generateFinalLifetimeVerdict(chosenPath, autonomy, kinshipTies);

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
              <span className="text-stone-500 block text-xs mb-1">个体主权度</span>
              <span className="text-amber-400 font-sans font-semibold">{autonomy}%</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">故土重力度</span>
              <span className="text-amber-400 font-sans font-semibold">{kinshipTies}%</span>
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
              onClick={handleRollNewLife}
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
