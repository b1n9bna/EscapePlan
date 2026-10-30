import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  SIM_COUNTRIES,
  DIARY_STORIES,
  getRandomProfile
} from '../data/simulation';
import type {
  SimProfile,
  SimChoice,
  SimDiaryEntry
} from '../data/simulation';
import {
  RotateCcw,
  BookOpen,
  RefreshCw,
  MapPin,
  GraduationCap,
  Wallet,
  Calendar,
  CheckSquare,
  Heart,
  Smile,
  Brain,
  Users,
  Globe2,
  Copy,
  Check,
  TrendingUp
} from 'lucide-react';

interface LifeSimulatorProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
}

export const LifeSimulator: React.FC<LifeSimulatorProps> = ({
  onNavigateToSubclasses,
  onNavigateToDIY
}) => {
  // States: 'setup' | 'reading' | 'outcome' | 'summary'
  const [gameState, setGameState] = useState<'setup' | 'reading' | 'outcome' | 'summary'>('setup');
  const [profile, setProfile] = useState<SimProfile>(() => getRandomProfile());
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // 1in8b Four Life Metrics + Cash
  const [health, setHealth] = useState<number>(profile.baseHealth);
  const [happiness, setHappiness] = useState<number>(profile.baseHappiness);
  const [language, setLanguage] = useState<number>(profile.baseLanguage);
  const [belonging, setBelonging] = useState<number>(profile.baseBelonging);
  const [currentSavings, setCurrentSavings] = useState<number>(profile.initialSavingsRMB);

  // In-diary progression
  const [currentEntryIdx, setCurrentEntryIdx] = useState<number>(0);
  const [historyNotes, setHistoryNotes] = useState<{ year: number; title: string; choice: string; narrative: string }[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<{ choice: SimChoice; narrative: string } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeStories: SimDiaryEntry[] =
    DIARY_STORIES[profile.targetCountryId] || DIARY_STORIES['japan'];
  const currentEntry: SimDiaryEntry | undefined = activeStories[currentEntryIdx];
  const activeCountryObj =
    SIM_COUNTRIES.find((c) => c.id === profile.targetCountryId) || SIM_COUNTRIES[0];

  const handleRollNewLife = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newLife = getRandomProfile();
      setProfile(newLife);
      setCurrentSavings(newLife.initialSavingsRMB);
      setHealth(newLife.baseHealth);
      setHappiness(newLife.baseHappiness);
      setLanguage(newLife.baseLanguage);
      setBelonging(newLife.baseBelonging);
      setIsRolling(false);
    }, 150);
  };

  const handleStartDiary = () => {
    setCurrentSavings(profile.initialSavingsRMB);
    setHealth(profile.baseHealth);
    setHappiness(profile.baseHappiness);
    setLanguage(profile.baseLanguage);
    setBelonging(profile.baseBelonging);
    setCurrentEntryIdx(0);
    setHistoryNotes([]);
    setGameState('reading');
  };

  const handleChoose = (choice: SimChoice) => {
    setCurrentSavings((prev) => prev + choice.fundsDelta);
    if (choice.healthDelta) setHealth((prev) => Math.min(100, Math.max(10, prev + choice.healthDelta!)));
    if (choice.happinessDelta) setHappiness((prev) => Math.min(100, Math.max(10, prev + choice.happinessDelta!)));
    if (choice.languageDelta) setLanguage((prev) => Math.min(100, Math.max(10, prev + choice.languageDelta!)));
    if (choice.belongingDelta) setBelonging((prev) => Math.min(100, Math.max(10, prev + choice.belongingDelta!)));

    const newNote = {
      year: currentEntry ? currentEntry.year : currentEntryIdx + 1,
      title: currentEntry ? currentEntry.sceneTitle : `第 ${currentEntryIdx + 1} 年`,
      choice: choice.text,
      narrative: choice.narrative
    };
    setHistoryNotes([...historyNotes, newNote]);
    setSelectedOutcome({ choice, narrative: choice.narrative });
    setGameState('outcome');
  };

  const handleNextEntry = () => {
    if (currentEntryIdx < activeStories.length - 1) {
      setCurrentEntryIdx(currentEntryIdx + 1);
      setGameState('reading');
    } else {
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      setGameState('summary');
    }
  };

  const handleCopySummary = () => {
    const text = `【80 亿分之一的移居手记 · 档案 #${profile.id.toUpperCase()}-${profile.targetCountryId.toUpperCase()}】
角色：${profile.name} (${profile.age}岁 · ${profile.gender} · ${profile.profession.name})
起点：${profile.hometown}
终点：${activeCountryObj.name} (${activeCountryObj.city})
五维生存指标：
- ❤️ 健康韧性: ${health}/100
- 🌟 生活自洽: ${happiness}/100
- 🧠 语言融入: ${language}/100
- 🤝 归属联结: ${belonging}/100
- 💰 结余存款: ¥${currentSavings.toLocaleString()} RMB
全球 80 亿人坐标：
- 财富位次：超越全球 ${profile.globalWealthPercentile}% 的成年人
- 跨国流动：属于全球仅 3.6% 的跨国定居者
五年生活手记结语：
五年过去了，没有发大财，银行卡里依然只有几万块钱。但在这个陌生的角落，踏踏实实地安顿好了整颗心。
来自开源项目 EscapePlan · 80亿分之一移居模拟器`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: 1 IN 8 BILLION - BIRTH GACHA & DEMOGRAPHIC LOTTERY
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 1in8b Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs mb-3 border border-slate-700/60 font-mono">
            <Globe2 className="w-3.5 h-3.5 text-blue-400" />
            <span>1 IN 8 BILLION · 80 亿分之一的生存底牌</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-2">
            如果这就是你领到的人生命运
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            基于真实世界统计数据。出生从来无法自定义，看看全球 80 亿人中的这一张普通底牌，能在异国他乡过出怎样的柴米油盐。
          </p>
        </div>

        {/* Life Card */}
        <div className={`bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-200 ${isRolling ? 'opacity-50' : 'opacity-100'}`}>
          {/* File Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xl font-bold text-white tracking-wide">{profile.name}</span>
                <span className="text-xs text-slate-400 font-mono">
                  {profile.age} 岁 · {profile.gender}
                </span>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  #8B-{profile.id.toUpperCase()}-2026
                </span>
              </div>
              <p className="text-xs text-blue-400 font-medium">
                {profile.profession.name}
              </p>
            </div>
            <span className="text-3xl p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              {profile.profession.icon}
            </span>
          </div>

          <p className="text-xs text-slate-400 my-4 leading-relaxed bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800/60 font-serif">
            {profile.profession.backgroundDesc}
          </p>

          {/* Demographic Data Slice (1in8b Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-500 block text-[11px] mb-1">🌍 全球出生统计概率</span>
              <span className="text-slate-300 font-medium leading-snug block">
                {profile.globalBirthRank}
              </span>
            </div>
            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-500 block text-[11px] mb-1">💰 全球财富百分位 (世界银行)</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-emerald-400 font-semibold text-sm">
                  Top {100 - profile.globalWealthPercentile}%
                </span>
                <span className="text-[11px] text-slate-400">
                  积蓄 ¥{profile.initialSavingsRMB.toLocaleString()}，超全球 {profile.globalWealthPercentile}% 成年人
                </span>
              </div>
            </div>
          </div>

          {/* Mundane attributes */}
          <div className="space-y-2 text-xs text-slate-300 my-4 border-t border-slate-800/60 pt-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">学历情况：</span>
              <span>{profile.education}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">老家起点：</span>
              <span>{profile.hometown}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 ml-5">外语底子：</span>
              <span className="text-slate-300">{profile.englishLevel}</span>
            </div>
          </div>

          {/* Initial 4-Meters Preview */}
          <div className="border-t border-slate-800/60 pt-3 pb-1">
            <span className="text-[11px] text-slate-500 block mb-2 font-mono">
              初始生存属性 (受开局与环境塑造)：
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="flex items-center space-x-1.5 bg-[#0B0F17] px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Heart className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span className="text-slate-400">健康:</span>
                <span className="font-mono text-slate-200 font-medium">{profile.baseHealth}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#0B0F17] px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Smile className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-slate-400">幸福:</span>
                <span className="font-mono text-slate-200 font-medium">{profile.baseHappiness}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#0B0F17] px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Brain className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">融入:</span>
                <span className="font-mono text-slate-200 font-medium">{profile.baseLanguage}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#0B0F17] px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Users className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-400">归属:</span>
                <span className="font-mono text-slate-200 font-medium">{profile.baseBelonging}</span>
              </div>
            </div>
          </div>

          {/* Destination Selector */}
          <div className="pt-4 mt-3 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">
                目标目的地 (命运带他/她前往)：
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {activeCountryObj.city}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {SIM_COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setProfile((p) => ({ ...p, targetCountryId: c.id }))}
                  className={`p-2.5 rounded-xl border text-xs text-left transition ${
                    c.id === profile.targetCountryId
                      ? 'bg-blue-600/20 border-blue-500 text-white font-medium'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block text-base mb-0.5">{c.flag}</span>
                  <span className="truncate block font-semibold">{c.name}</span>
                </button>
              ))}
            </div>

            {/* Target Macro Country Real Stats */}
            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">🩺 预期寿命</span>
                <span className="text-slate-200 font-semibold">{activeCountryObj.lifeExpectancy} 岁</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">☀️ 年均日照</span>
                <span className="text-slate-200 font-semibold">{activeCountryObj.annualSunshineHours} 小时</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">👥 移民人口比</span>
                <span className="text-slate-200 font-semibold">{activeCountryObj.immigrantSharePercent}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">💵 中位月薪</span>
                <span className="text-emerald-400 font-semibold">{activeCountryObj.medianMonthlyWageRMB}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-7 flex gap-3">
            <button
              onClick={handleRollNewLife}
              disabled={isRolling}
              className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRolling ? 'animate-spin' : ''}`} />
              <span>重新投胎 (换个人)</span>
            </button>

            <button
              onClick={handleStartDiary}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20"
            >
              <span>开启移居手记 ➜</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 1IN8B IMMERSIVE SCENE (DATA SLICE + PARALLEL MOMENT)
  // =========================================================================
  if (gameState === 'reading' && currentEntry) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Top 4-Dimension Metric Dashboard */}
        <div className="bg-[#111722] border border-slate-800 rounded-2xl p-4 mb-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-base">{activeCountryObj.flag}</span>
              <span className="text-slate-200 font-medium">{profile.name} · {activeCountryObj.name}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono font-medium">¥{currentSavings.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentEntry.timeLabel}</span>
            </div>
          </div>

          {/* Dynamic 4 Attribute Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" /> 健康
                </span>
                <span className="font-mono text-rose-300 font-medium">{health}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, health))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Smile className="w-3 h-3 text-amber-400" /> 幸福
                </span>
                <span className="font-mono text-amber-300 font-medium">{happiness}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, happiness))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-blue-400" /> 融入
                </span>
                <span className="font-mono text-blue-300 font-medium">{language}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, language))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" /> 归属
                </span>
                <span className="font-mono text-emerald-300 font-medium">{belonging}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, belonging))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Diary Content Card */}
        <div className="bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 mb-3.5 leading-snug">
            {currentEntry.sceneTitle}
          </h2>

          {/* Documentary Narrative */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B0F17] p-5 rounded-xl border border-slate-800/60 mb-4 whitespace-pre-line font-serif">
            {currentEntry.sceneText}
          </p>

          {/* 1in8b Style: Real World Statistical Slice */}
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-[11px] text-blue-300/90 leading-relaxed mb-3 flex items-start space-x-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-300 font-semibold mr-1">真实数据切片:</strong>
              <span>{currentEntry.worldFact}</span>
            </div>
          </div>

          {/* 1in8b Signature: Parallel World 8-Billion Contrast */}
          <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed mb-6 font-serif italic flex items-start space-x-2">
            <Globe2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5 not-italic" />
            <div>{currentEntry.parallelWorldMoment}</div>
          </div>

          <span className="text-xs text-slate-500 block mb-3 font-mono">
            接下来，你做出怎样的选择？
          </span>

          <div className="space-y-3">
            {currentEntry.choices.map((choice, idx) => (
              <div
                key={idx}
                onClick={() => handleChoose(choice)}
                className="p-4 rounded-xl border border-slate-800 bg-[#0B0F17] hover:border-slate-600 hover:bg-slate-900/60 cursor-pointer transition text-left group"
              >
                <div className="flex items-start justify-between">
                  <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-blue-300 leading-snug">
                    {choice.text}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {choice.detail}
                </p>

                {/* Micro Effect Preview Badges */}
                <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-850/60 text-[10px] font-mono">
                  {choice.fundsDelta !== 0 && (
                    <span className={choice.fundsDelta > 0 ? 'text-emerald-400' : 'text-slate-400'}>
                      💰 {choice.fundsDelta > 0 ? `+¥${choice.fundsDelta}` : `-¥${Math.abs(choice.fundsDelta)}`}
                    </span>
                  )}
                  {choice.healthDelta ? (
                    <span className={choice.healthDelta > 0 ? 'text-rose-400' : 'text-slate-500'}>
                      ❤️ {choice.healthDelta > 0 ? `+${choice.healthDelta}` : choice.healthDelta}
                    </span>
                  ) : null}
                  {choice.happinessDelta ? (
                    <span className={choice.happinessDelta > 0 ? 'text-amber-400' : 'text-slate-500'}>
                      🌟 {choice.happinessDelta > 0 ? `+${choice.happinessDelta}` : choice.happinessDelta}
                    </span>
                  ) : null}
                  {choice.languageDelta ? (
                    <span className={choice.languageDelta > 0 ? 'text-blue-400' : 'text-slate-500'}>
                      🧠 {choice.languageDelta > 0 ? `+${choice.languageDelta}` : choice.languageDelta}
                    </span>
                  ) : null}
                  {choice.belongingDelta ? (
                    <span className={choice.belongingDelta > 0 ? 'text-emerald-400' : 'text-slate-500'}>
                      🤝 {choice.belongingDelta > 0 ? `+${choice.belongingDelta}` : choice.belongingDelta}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: OUTCOME TRANSITION
  // =========================================================================
  if (gameState === 'outcome' && selectedOutcome) {
    const isEnd = currentEntryIdx >= activeStories.length - 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <span className="text-[11px] font-mono text-slate-500 uppercase block mb-2">
            生活的小注脚 · 随笔手记
          </span>

          <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-serif mb-6 whitespace-pre-line">
            {selectedOutcome.narrative}
          </div>

          <button
            onClick={handleNextEntry}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20"
          >
            <span>{isEnd ? '查看最终人生结算卡 ➜' : '日子继续往前过 ➜'}</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: 1IN8B ICONIC LIFE SETTLEMENT CARD (人生结算卡)
  // =========================================================================
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Settlement Certificate Card */}
      <div className="bg-[#111722] border-2 border-slate-800 rounded-2xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
        {/* Subtle Watermark Stamp */}
        <div className="absolute top-4 right-4 border border-blue-500/30 bg-blue-950/20 text-blue-400/80 px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase">
          RECORDED · 8B-ARCHIVE
        </div>

        {/* Card Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <span className="text-3xl mb-2 block">{activeCountryObj.flag}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
            80 亿分之一的生存样本 · 档案报告
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            编号：#8B-{profile.id.toUpperCase()}-{profile.targetCountryId.toUpperCase()}-2026
          </p>
          <p className="text-xs text-slate-500 mt-1 font-serif">
            {profile.name} · {profile.age} 岁 · {profile.profession.name} · 起点：{profile.hometown}
          </p>
        </div>

        {/* 1in8b Five-Dimension Final Radar */}
        <div className="my-6">
          <span className="text-[11px] font-mono text-slate-500 block mb-3 uppercase tracking-wider">
            最终五维生存指标 (Five-Dimension Balance)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" /> 健康韧性
                </span>
                <span className="font-mono text-rose-300 font-semibold">{health}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(5, health))}%` }} />
              </div>
            </div>

            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Smile className="w-3 h-3 text-amber-400" /> 生活自洽
                </span>
                <span className="font-mono text-amber-300 font-semibold">{happiness}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(5, happiness))}%` }} />
              </div>
            </div>

            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-blue-400" /> 语言融入
                </span>
                <span className="font-mono text-blue-300 font-semibold">{language}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(5, language))}%` }} />
              </div>
            </div>

            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" /> 归属联结
                </span>
                <span className="font-mono text-emerald-300 font-semibold">{belonging}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(5, belonging))}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" /> 最终结余流动资产：
            </span>
            <span className="font-mono text-emerald-400 font-semibold text-sm">
              ¥{currentSavings.toLocaleString()} RMB
            </span>
          </div>
        </div>

        {/* 1in8b Signature: Global Percentile Coordinates (全球坐标) */}
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800/80 mb-6 text-xs space-y-2">
          <span className="text-[11px] font-mono text-blue-400 block mb-1">
            🌐 全球 80 亿人坐标定位 (Global Demographics)：
          </span>
          <div className="flex items-center space-x-2 text-slate-300">
            <span>• 财富位次：</span>
            <span className="text-slate-400 font-serif">
              超越全球约 <strong className="text-white font-mono">{profile.globalWealthPercentile}%</strong> 的成年人资产基准
            </span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span>• 空间流动：</span>
            <span className="text-slate-400 font-serif">
              位列全球仅 <strong className="text-white font-mono">3.6%</strong> 的跨国定居者群体
            </span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span>• 生存评定：</span>
            <span className="text-emerald-400 font-medium">
              {happiness >= 75 ? '平淡安宁 · 精神高度自洽' : '踏实生根 · 适应异乡节拍'}
            </span>
          </div>
        </div>

        {/* Quiet Timeline Recap */}
        <div className="my-6 space-y-3.5">
          <span className="text-[11px] font-mono text-slate-500 block uppercase tracking-wider">
            岁月手记 (Five-Year Footprints)
          </span>
          {historyNotes.map((note, idx) => (
            <div key={idx} className="text-xs leading-relaxed border-l-2 border-slate-800 pl-4 py-1">
              <span className="text-slate-500 font-mono block text-[11px] mb-0.5">
                第 {note.year} 年 · {note.title}
              </span>
              <p className="text-slate-400 font-serif">{note.narrative}</p>
            </div>
          ))}
        </div>

        {/* Closing Calm Note */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 font-serif leading-relaxed mb-6">
          五年过去了，你没有发大财，银行卡里依然只有几万块钱。但在这个陌生的角落，你有一辆二手车或自行车，熟悉了下班路上的每一个路口。生活没有宏大叙事，但你在这颗拥有 80 亿人的星球上，踏踏实实地安顿好了自己的整颗心。
        </div>

        {/* Action Footers */}
        <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
          <div className="flex gap-2.5">
            <button
              onClick={handleCopySummary}
              className="flex-1 py-2.5 rounded-xl font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center justify-center space-x-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? '已复制手记简报' : '复制人生手记简报'}</span>
            </button>

            <button
              onClick={() => {
                handleRollNewLife();
                setGameState('setup');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-2.5 rounded-xl font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center justify-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>重新投胎 (体验另一生)</span>
            </button>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => onNavigateToSubclasses(profile.targetCountryId)}
              className="flex-1 py-2.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center justify-center space-x-1.5 shadow-sm shadow-blue-600/20"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>查看该国真实签证政策</span>
            </button>

            <button
              onClick={() => onNavigateToDIY(profile.targetCountryId)}
              className="flex-1 py-2.5 rounded-xl font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition flex items-center justify-center space-x-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>手搓避坑清单</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
