import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  SIM_COUNTRIES,
  SIM_YEAR_EVENTS,
  generateRandomLife
} from '../data/simulation';
import type {
  SimProfile,
  SimEventChoice,
  SimYearEvent
} from '../data/simulation';
import {
  Sparkles,
  Heart,
  Wallet,
  Globe2,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Flame,
  GraduationCap,
  MapPin,
  RefreshCw
} from 'lucide-react';

interface LifeSimulatorProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
}

export const LifeSimulator: React.FC<LifeSimulatorProps> = ({
  onNavigateToSubclasses,
  onNavigateToDIY
}) => {
  // Game states: 'setup' | 'simulating' | 'outcome_modal' | 'ending'
  const [gameState, setGameState] = useState<'setup' | 'simulating' | 'outcome_modal' | 'ending'>('setup');

  // Pure Random Character Profile (Default rolled on load)
  const [profile, setProfile] = useState<SimProfile>(() => generateRandomLife());
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // In-Game Live Metrics
  const [currentYearIdx, setCurrentYearIdx] = useState<number>(0);
  const [health, setHealth] = useState<number>(85);
  const [currentFundsRMB, setCurrentFundsRMB] = useState<number>(profile.initialFundsRMB);
  const [languageSkill, setLanguageSkill] = useState<number>(30);
  const [prProgress, setPrProgress] = useState<number>(0);
  const [laozhongIndex, setLaozhongIndex] = useState<number>(60);

  // History Log of choices made
  const [timelineLogs, setTimelineLogs] = useState<{ year: number; eventTitle: string; choiceText: string; narrative: string }[]>([]);
  const [currentOutcome, setCurrentOutcome] = useState<{ narrative: string; choice: SimEventChoice } | null>(null);

  // Re-roll random profile
  const handleReRoll = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newLife = generateRandomLife();
      setProfile(newLife);
      setIsRolling(false);
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }, 200);
  };

  // Start the 5-year journey with the rolled character
  const handleStartSim = () => {
    setCurrentFundsRMB(profile.initialFundsRMB);
    setHealth(85);
    setPrProgress(0);
    setCurrentYearIdx(0);
    setTimelineLogs([]);

    // Initial language skill calculation
    let initLang = 20;
    if (profile.englishLevel === '日常无障碍/雅思6分') initLang = 50;
    if (profile.englishLevel === '精通/雅思7.5+') initLang = 75;
    if (profile.education === '重点大学本硕') initLang += 10;
    setLanguageSkill(initLang);

    // Initial laozhong index based on trait
    let initLaozhong = 60;
    if (profile.trait.includes('老中胃')) initLaozhong = 90;
    if (profile.trait.includes('社恐')) initLaozhong = 35;
    if (profile.trait.includes('做题家')) initLaozhong = 70;
    setLaozhongIndex(initLaozhong);

    setGameState('simulating');
  };

  // Get active country's events
  const countryEvents: SimYearEvent[] = SIM_YEAR_EVENTS[profile.targetCountryId] || SIM_YEAR_EVENTS['japan'];
  const currentEvent: SimYearEvent | undefined = countryEvents[currentYearIdx];

  // Handle a choice
  const handleMakeChoice = (choice: SimEventChoice) => {
    setHealth((prev) => Math.min(100, Math.max(0, prev + (choice.effects.healthDelta || 0))));
    setCurrentFundsRMB((prev) => prev + (choice.effects.fundsDeltaRMB || 0));
    setLanguageSkill((prev) => Math.min(100, Math.max(0, prev + (choice.effects.languageDelta || 0))));
    setPrProgress((prev) => Math.min(100, Math.max(0, prev + (choice.effects.prProgressDelta || 0))));
    setLaozhongIndex((prev) => Math.min(100, Math.max(0, prev + (choice.effects.laozhongDelta || 0))));

    const newLogs = [
      ...timelineLogs,
      {
        year: currentEvent ? currentEvent.year : currentYearIdx + 1,
        eventTitle: currentEvent ? currentEvent.title : `第 ${currentYearIdx + 1} 年`,
        choiceText: choice.text,
        narrative: choice.outcomeNarrative
      }
    ];
    setTimelineLogs(newLogs);

    setCurrentOutcome({ narrative: choice.outcomeNarrative, choice });
    setGameState('outcome_modal');
  };

  const handleNextYear = () => {
    if (currentYearIdx < countryEvents.length - 1) {
      setCurrentYearIdx(currentYearIdx + 1);
      setGameState('simulating');
    } else {
      setGameState('ending');
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const currentCountryObj = SIM_COUNTRIES.find((c) => c.id === profile.targetCountryId) || SIM_COUNTRIES[0];

  // =========================================================================
  // VIEW 1: PURE RANDOM BIRTH (GACHA LOTTERY CARD)
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>灵感源自《80亿分之一》· 出生与底牌无法选择</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            🎲 移居命运轮盘：抽取你的初始底牌
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            生活从来没有自定义难度。有人出生在大城市带上百万存款，有人只有大专学历和两三万积蓄。
            在这个无法作弊的模拟器里，看看这副底牌能带你走多远！
          </p>
        </div>

        {/* The Gacha Destiny Card */}
        <div className={`bg-[#121824] border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden transition-all duration-300 ${isRolling ? 'scale-[0.98] blur-[1px]' : 'scale-100'}`}>
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Stamp */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-400 tracking-wider">DESTINY LOTTERY CARD</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
              抽卡结果 · 100% 随机生成
            </span>
          </div>

          {/* Main Character Identity Hero */}
          <div className="my-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-5xl sm:text-6xl p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
                {profile.profession.icon}
              </span>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {profile.age} 岁 · {profile.gender}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-indigo-400">
                  {profile.profession.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {profile.profession.description}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6 text-xs">
            <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
              <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block mb-0.5">学历背景</span>
                <span className="font-semibold text-slate-200">{profile.education}</span>
              </div>
            </div>

            <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block mb-0.5">出生与成长环境</span>
                <span className="font-semibold text-slate-200">{profile.hometown}</span>
              </div>
            </div>

            <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
              <Wallet className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block mb-0.5">初始可用启动金</span>
                <span className="font-bold text-amber-300 font-mono text-sm">
                  ¥{profile.initialFundsRMB.toLocaleString()} 元
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {profile.initialFundsRMB <= 50000 ? '⚠️ 极限破釜沉舟模式' : '拥有基础缓冲防守金'}
                </span>
              </div>
            </div>

            <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
              <Globe2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block mb-0.5">外语初始掌握度</span>
                <span className="font-semibold text-blue-300">{profile.englishLevel}</span>
              </div>
            </div>
          </div>

          {/* Personality Trait Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-300 mb-6">
            <Flame className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-slate-500">隐藏性格底色：</span>
              <strong className="text-slate-200 ml-1">{profile.trait}</strong>
            </div>
          </div>

          {/* Destination Box (Randomly drawn, but can switch) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/20 to-indigo-950/20 border border-blue-500/30 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">
                  🎯 命运将你抛向的目的地
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                可切换下方目标国体验
              </span>
            </div>

            <div className="flex items-center space-x-3 my-2">
              <span className="text-3xl">{currentCountryObj.flag}</span>
              <div>
                <h4 className="text-base font-bold text-white">{currentCountryObj.name}</h4>
                <p className="text-xs text-slate-300">{currentCountryObj.desc}</p>
              </div>
            </div>

            {/* Quick Country Switcher Chips */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
              {SIM_COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setProfile((p) => ({ ...p, targetCountryId: c.id }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    c.id === profile.targetCountryId
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{c.flag} {c.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Two Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReRoll}
              disabled={isRolling}
              className="flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-400 ${isRolling ? 'animate-spin' : ''}`} />
              <span>🎲 不满意？洗牌重抽 (Re-roll)</span>
            </button>

            <button
              onClick={handleStartSim}
              className="flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg shadow-indigo-500/25 transition flex items-center justify-center space-x-2"
            >
              <span>🚀 接受这副底牌，开始 5 年推演！</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE SIMULATION YEAR
  // =========================================================================
  if (gameState === 'simulating' && currentEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Sticky Live Dashboard (Like 1in8b.life) */}
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-4 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="text-2xl">{currentCountryObj.flag}</span>
              <div>
                <span className="font-bold text-white text-sm">{profile.name}</span>
                <span className="text-slate-400 text-xs ml-2">
                  {profile.age + currentYearIdx} 岁 · {profile.profession.name} · {profile.education}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                第 {currentEvent.year} / {countryEvents.length} 年
              </span>
            </div>
          </div>

          {/* 5 Core Status Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span>身心健康</span>
                </span>
                <span className="font-bold text-white font-mono">{health}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-400 h-full transition-all duration-300"
                  style={{ width: `${health}%` }}
                />
              </div>
            </div>

            <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="flex items-center space-x-1">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>现金储备</span>
                </span>
                <span className="font-bold text-emerald-400 font-mono text-[11px]">
                  ¥{(currentFundsRMB / 10000).toFixed(1)}万
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, (currentFundsRMB / 500000) * 100))}%` }}
                />
              </div>
            </div>

            <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="flex items-center space-x-1">
                  <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>语言熟练</span>
                </span>
                <span className="font-bold text-blue-400 font-mono">{languageSkill}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-400 h-full transition-all duration-300"
                  style={{ width: `${languageSkill}%` }}
                />
              </div>
            </div>

            <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>身份进度</span>
                </span>
                <span className="font-bold text-purple-400 font-mono">{prProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-full transition-all duration-300"
                  style={{ width: `${prProgress}%` }}
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>老中胃指数</span>
                </span>
                <span className="font-bold text-amber-400 font-mono">{laozhongIndex}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${laozhongIndex}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Year Event Card */}
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            <span>Year {currentEvent.year} Dilemma</span>
            <span>•</span>
            <span>{currentCountryObj.name}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            {currentEvent.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 bg-[#0B0F17] p-5 rounded-xl border border-slate-800/80">
            {currentEvent.scenario}
          </p>

          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
            你将做出怎样的抉择？
          </h4>

          {/* Choices list */}
          <div className="space-y-4">
            {currentEvent.choices.map((choice, cIdx) => (
              <div
                key={cIdx}
                onClick={() => handleMakeChoice(choice)}
                className="p-5 rounded-xl border border-slate-800 bg-[#0B0F17] hover:border-blue-500 hover:bg-slate-900/60 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    {String.fromCharCode(65 + cIdx)}
                  </span>
                  <div>
                    <h5 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-blue-300 leading-snug">
                      {choice.text}
                    </h5>
                    {choice.subtext && (
                      <p className="text-xs text-slate-400 mt-1.5">
                        {choice.subtext}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: OUTCOME MODAL / TRANSITION
  // =========================================================================
  if (gameState === 'outcome_modal' && currentOutcome) {
    const isFinalYear = currentYearIdx >= countryEvents.length - 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-[#121824] border border-blue-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>命运轮盘结算反馈</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
            第 {currentYearIdx + 1} 年：你的抉择产生了深远影响
          </h3>

          <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 text-sm sm:text-base text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
            {currentOutcome.narrative}
          </div>

          {/* Deltas summary badges */}
          <div className="flex flex-wrap gap-2 mb-8 text-xs font-mono">
            {currentOutcome.choice.effects.healthDelta !== undefined && (
              <span className={`px-2.5 py-1 rounded-lg border ${
                currentOutcome.choice.effects.healthDelta >= 0
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                  : 'bg-red-950/40 border-red-800 text-red-400'
              }`}>
                健康 {currentOutcome.choice.effects.healthDelta > 0 ? `+${currentOutcome.choice.effects.healthDelta}` : currentOutcome.choice.effects.healthDelta}
              </span>
            )}
            {currentOutcome.choice.effects.fundsDeltaRMB !== undefined && (
              <span className={`px-2.5 py-1 rounded-lg border ${
                currentOutcome.choice.effects.fundsDeltaRMB >= 0
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                  : 'bg-red-950/40 border-red-800 text-red-400'
              }`}>
                资金 {currentOutcome.choice.effects.fundsDeltaRMB > 0 ? `+¥${currentOutcome.choice.effects.fundsDeltaRMB.toLocaleString()}` : `-¥${Math.abs(currentOutcome.choice.effects.fundsDeltaRMB).toLocaleString()}`}
              </span>
            )}
            {currentOutcome.choice.effects.languageDelta !== undefined && (
              <span className="px-2.5 py-1 rounded-lg border bg-blue-950/40 border-blue-800 text-blue-400">
                语言 +{currentOutcome.choice.effects.languageDelta}
              </span>
            )}
            {currentOutcome.choice.effects.prProgressDelta !== undefined && (
              <span className="px-2.5 py-1 rounded-lg border bg-purple-950/40 border-purple-800 text-purple-400">
                永居进度 +{currentOutcome.choice.effects.prProgressDelta}%
              </span>
            )}
          </div>

          <button
            onClick={handleNextYear}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition flex items-center justify-center space-x-2"
          >
            <span>{isFinalYear ? '🏆 查看 5 年移居最终命运结算单' : '迈入下一年 ➜'}</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: FINAL MEMORIAL CARD (Like 1in8b.life & Spotify Wrapped)
  // =========================================================================
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Shareable Card Canvas */}
      <div className="bg-[#121824] border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧭</span>
            <span className="font-bold text-white tracking-wider">EscapePlan · 平行人生报告</span>
          </div>
          <span className="font-mono text-slate-500 text-[11px]">RELOCATION MEMORIAL</span>
        </div>

        {/* Character Title & Epitaph */}
        <div className="my-8 text-center">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            {currentCountryObj.name} · 5年生存历练达成
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
            【{profile.name} 的平行移居史诗】
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            原身份：{profile.profession.name} · {profile.education} · 初始底牌 ¥{(profile.initialFundsRMB / 10000).toFixed(0)}万
          </p>
        </div>

        {/* Final Status Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-[#0B0F17] p-3.5 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block mb-1">最终健康值</span>
            <span className="text-base sm:text-lg font-bold text-red-400 font-mono">{health} / 100</span>
          </div>
          <div className="bg-[#0B0F17] p-3.5 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block mb-1">期末净资产</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              ¥{(currentFundsRMB / 10000).toFixed(1)}万
            </span>
          </div>
          <div className="bg-[#0B0F17] p-3.5 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block mb-1">语言熟练度</span>
            <span className="text-base sm:text-lg font-bold text-blue-400 font-mono">{languageSkill} / 100</span>
          </div>
          <div className="bg-[#0B0F17] p-3.5 rounded-2xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block mb-1">身份终态</span>
            <span className="text-base sm:text-lg font-bold text-purple-400 font-mono">
              {prProgress >= 80 ? '永久居留 (PR)' : prProgress >= 40 ? '长期居留工签' : '体验完毕'}
            </span>
          </div>
        </div>

        {/* 5-Year Timeline Highlights */}
        <div className="my-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800">
            📜 五年人生大事件编年史
          </h4>
          <div className="space-y-4">
            {timelineLogs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {log.year}
                </span>
                <div>
                  <strong className="text-slate-200 block mb-0.5">{log.eventTitle}</strong>
                  <p className="text-slate-400 leading-relaxed">{log.narrative}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              handleReRoll();
              setGameState('setup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>🎲 重新投胎再抽一把</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => onNavigateToSubclasses(profile.targetCountryId)}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>查看真实的 {currentCountryObj.name} 政策</span>
            </button>
            <button
              onClick={() => onNavigateToDIY(profile.targetCountryId)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition"
            >
              手搓路线图 ➜
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
