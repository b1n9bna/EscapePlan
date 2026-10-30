import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  PROFESSIONS,
  FUND_OPTIONS,
  SIM_COUNTRIES,
  RANDOM_NAMES,
  SIM_YEAR_EVENTS
} from '../data/simulation';
import type {
  Profession,
  SimProfile,
  SimEventChoice,
  SimYearEvent
} from '../data/simulation';
import {
  Sparkles,
  Dices,
  Heart,
  Wallet,
  Globe2,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Flame
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

  // Character Profile
  const [name, setName] = useState<string>('李想');
  const [age, setAge] = useState<number>(27);
  const [gender, setGender] = useState<'男' | '女' | '保密'>('男');
  const [selectedProf, setSelectedProf] = useState<Profession>(PROFESSIONS[0]);
  const [fundsRMB, setFundsRMB] = useState<number>(200000);
  const [englishLevel, setEnglishLevel] = useState<SimProfile['englishLevel']>('四六级哑巴英语');
  const [targetCountryId, setTargetCountryId] = useState<string>('japan');

  // In-Game Live Metrics
  const [currentYearIdx, setCurrentYearIdx] = useState<number>(0);
  const [health, setHealth] = useState<number>(85);
  const [currentFundsRMB, setCurrentFundsRMB] = useState<number>(200000);
  const [languageSkill, setLanguageSkill] = useState<number>(30);
  const [prProgress, setPrProgress] = useState<number>(0);
  const [laozhongIndex, setLaozhongIndex] = useState<number>(60);

  // History Log of choices made
  const [timelineLogs, setTimelineLogs] = useState<{ year: number; eventTitle: string; choiceText: string; narrative: string }[]>([]);
  const [currentOutcome, setCurrentOutcome] = useState<{ narrative: string; choice: SimEventChoice } | null>(null);

  // Random Life generator (Inspired by 1in8b.life)
  const handleRandomRoll = () => {
    const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    const randomAge = Math.floor(Math.random() * 18) + 22; // 22 ~ 39
    const randomGender: '男' | '女' = Math.random() > 0.5 ? '男' : '女';
    const randomProf = PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)];
    const randomFund = FUND_OPTIONS[Math.floor(Math.random() * FUND_OPTIONS.length)].value;
    const randomCountry = SIM_COUNTRIES[Math.floor(Math.random() * SIM_COUNTRIES.length)].id;
    const engLevels: SimProfile['englishLevel'][] = [
      '零基础纯靠比划',
      '四六级哑巴英语',
      '日常无障碍/雅思6分',
      '精通/雅思7.5+'
    ];
    const randomEng = engLevels[Math.floor(Math.random() * engLevels.length)];

    setName(randomName);
    setAge(randomAge);
    setGender(randomGender);
    setSelectedProf(randomProf);
    setFundsRMB(randomFund);
    setTargetCountryId(randomCountry);
    setEnglishLevel(randomEng);

    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  // Start the 5-year journey
  const handleStartSim = () => {
    setCurrentFundsRMB(fundsRMB);
    setHealth(85);
    setPrProgress(0);
    setLaozhongIndex(65);
    setCurrentYearIdx(0);
    setTimelineLogs([]);

    // Language base based on initial English level
    let initLang = 20;
    if (englishLevel === '日常无障碍/雅思6分') initLang = 50;
    if (englishLevel === '精通/雅思7.5+') initLang = 75;
    setLanguageSkill(initLang);

    setGameState('simulating');
  };

  // Get active country's events
  const countryEvents: SimYearEvent[] = SIM_YEAR_EVENTS[targetCountryId] || SIM_YEAR_EVENTS['japan'];
  const currentEvent: SimYearEvent | undefined = countryEvents[currentYearIdx];

  // Handle a choice
  const handleMakeChoice = (choice: SimEventChoice) => {
    // Apply stat deltas
    setHealth((prev) => Math.min(100, Math.max(0, prev + (choice.effects.healthDelta || 0))));
    setCurrentFundsRMB((prev) => prev + (choice.effects.fundsDeltaRMB || 0));
    setLanguageSkill((prev) => Math.min(100, Math.max(0, prev + (choice.effects.languageDelta || 0))));
    setPrProgress((prev) => Math.min(100, Math.max(0, prev + (choice.effects.prProgressDelta || 0))));
    setLaozhongIndex((prev) => Math.min(100, Math.max(0, prev + (choice.effects.laozhongDelta || 0))));

    // Record timeline log
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
      // Game Over -> Ending
      setGameState('ending');
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const currentCountryObj = SIM_COUNTRIES.find((c) => c.id === targetCountryId) || SIM_COUNTRIES[0];

  // =========================================================================
  // VIEW 1: CHARACTER SETUP & DESTINY ROLL
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>灵感源自《80亿分之一》· 纯本地运算保护隐私</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            🎮 平行人生：全球移居与生存模拟器
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            不只是程序员！咖啡师、幼教、设计师、护士、电工技工、或是刚毕业的年轻人。
            输入你的背景（或随机开局），开启一段充满现实抉择的 5 年移居推演。
          </p>

          <button
            onClick={handleRandomRoll}
            className="mt-5 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/50 hover:to-purple-600/50 border border-indigo-500/40 text-indigo-200 text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10"
          >
            <Dices className="w-4 h-4 text-indigo-400" />
            <span>🎲 随机抽取一个平行人生 (Random Life Roll)</span>
          </button>
        </div>

        {/* Character Creator Card */}
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800">
            第一步：设定你的角色画像
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">代号 / 姓名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">年龄 ({age} 岁)</label>
              <input
                type="range"
                min="20"
                max="50"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-blue-500 mt-2"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">性别</label>
              <div className="flex space-x-2">
                {(['男', '女', '保密'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border ${
                      gender === g
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Profession Selection */}
          <div className="mb-6">
            <label className="text-xs font-medium text-slate-400 block mb-2">
              当前职业与专业背景 (点击选择)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PROFESSIONS.map((prof) => {
                const isSelected = prof.id === selectedProf.id;
                return (
                  <div
                    key={prof.id}
                    onClick={() => setSelectedProf(prof)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                        : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">{prof.icon}</span>
                      <span className="text-xs font-bold truncate">{prof.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {prof.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Funds & English */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">
                可支配启动金储备
              </label>
              <select
                value={fundsRMB}
                onChange={(e) => setFundsRMB(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                {FUND_OPTIONS.map((f, i) => (
                  <option key={i} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">
                当前外语掌握水平
              </label>
              <select
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value as SimProfile['englishLevel'])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="零基础纯靠比划">零基础纯靠比划 (手势交流)</option>
                <option value="四六级哑巴英语">四六级哑巴英语 (能读懂，口语卡壳)</option>
                <option value="日常无障碍/雅思6分">日常无障碍 / 雅思 6.0 分水平</option>
                <option value="精通/雅思7.5+">母语级精通 / 雅思 7.5+ / 掌握二外</option>
              </select>
            </div>
          </div>

          {/* Destination Selection */}
          <div className="mb-8">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-800">
              第二步：选择你想移居的目的地 (或平行时空对照组)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SIM_COUNTRIES.map((c) => {
                const isSelected = c.id === targetCountryId;
                return (
                  <div
                    key={c.id}
                    onClick={() => setTargetCountryId(c.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/15'
                        : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{c.name}</h4>
                        <span className="text-[10px] text-blue-400 font-mono">门槛：{c.difficulty}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={handleStartSim}
            className="w-full py-4 rounded-xl text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-xl shadow-blue-500/25 transition flex items-center justify-center space-x-2"
          >
            <span>🚀 踏上平行移居旅程 (开启第 1 年)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentCountryObj.flag}</span>
              <div>
                <span className="font-bold text-white text-sm">{name}</span>
                <span className="text-slate-400 text-xs ml-2">
                  {age + currentYearIdx} 岁 · {selectedProf.name}
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
                  <span>语言能力</span>
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
            【{name} 的平行移居史诗】
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            原身份：{selectedProf.name} · 初始资金 ¥{(fundsRMB / 10000).toFixed(0)}万
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
              {prProgress >= 80 ? '永久居留 (PR)' : prProgress >= 40 ? '长期工签' : '体验完毕'}
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
              setGameState('setup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>换个身份重新模拟</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => onNavigateToSubclasses(targetCountryId)}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>查看真实的 {currentCountryObj.name} 政策</span>
            </button>
            <button
              onClick={() => onNavigateToDIY(targetCountryId)}
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
