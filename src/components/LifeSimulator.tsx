import React, { useState } from 'react';
import {
  SIM_COUNTRIES,
  DUAL_STORIES,
  getRandomProfile
} from '../data/simulation';
import type {
  SimProfile,
  DualChoice,
  DualDiaryEntry
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
  Copy,
  Check,
  Compass
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

  // Dual metrics (Fei Xiaotong's Xiangtu vs Modern Individual)
  const [savings, setSavings] = useState<number>(profile.initialSavingsRMB);
  const [individualSovereignty, setIndividualSovereignty] = useState<number>(50); // 现代个体独立度
  const [soilKinshipTies, setSoilKinshipTies] = useState<number>(65); // 故土宗族羁绊度

  // In-diary progression
  const [currentEntryIdx, setCurrentEntryIdx] = useState<number>(0);
  const [historyNotes, setHistoryNotes] = useState<{
    year: number;
    phaseTitle: string;
    choiceText: string;
    reaction: string;
  }[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<{
    choice: DualChoice;
    reaction: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeStories: DualDiaryEntry[] =
    DUAL_STORIES[profile.targetCountryId] || DUAL_STORIES['japan'];
  const currentEntry: DualDiaryEntry | undefined = activeStories[currentEntryIdx];
  const activeCountryObj =
    SIM_COUNTRIES.find((c) => c.id === profile.targetCountryId) || SIM_COUNTRIES[0];

  const handleRollNewLife = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newLife = getRandomProfile();
      setProfile(newLife);
      setSavings(newLife.initialSavingsRMB);
      setIndividualSovereignty(50);
      setSoilKinshipTies(65);
      setIsRolling(false);
    }, 150);
  };

  const handleStartDiary = () => {
    setSavings(profile.initialSavingsRMB);
    setIndividualSovereignty(50);
    setSoilKinshipTies(65);
    setCurrentEntryIdx(0);
    setHistoryNotes([]);
    setGameState('reading');
  };

  const handleChoose = (choice: DualChoice) => {
    setSavings((prev) => prev + choice.fundsDelta);
    setIndividualSovereignty((prev) =>
      Math.min(100, Math.max(10, prev + choice.individualSovereigntyDelta))
    );
    setSoilKinshipTies((prev) =>
      Math.min(100, Math.max(10, prev + choice.soilKinshipTiesDelta))
    );

    const newNote = {
      year: currentEntry ? currentEntry.year : currentEntryIdx + 1,
      phaseTitle: currentEntry ? currentEntry.phaseTitle : `第 ${currentEntryIdx + 1} 年`,
      choiceText: choice.text,
      reaction: choice.reaction
    };
    setHistoryNotes([...historyNotes, newNote]);
    setSelectedOutcome({ choice, reaction: choice.reaction });
    setGameState('outcome');
  };

  const handleNextEntry = () => {
    if (currentEntryIdx < activeStories.length - 1) {
      setCurrentEntryIdx(currentEntryIdx + 1);
      setGameState('reading');
    } else {
      setGameState('summary');
    }
  };

  const handleCopySummary = () => {
    const text = `【双城生存手记档案 · 离土者的五年】
档案编号：#8B-${profile.id.toUpperCase()}-${profile.targetCountryId.toUpperCase()}
人物档案：${profile.name} (${profile.age}岁 · ${profile.profession.name})
老家原籍：${profile.hometown} (${profile.familyRole})
移居终点：${activeCountryObj.name} · ${activeCountryObj.city}

双维坐标：
- 现代个体独立度：${individualSovereignty}% (摆脱宗族凝视，建立自我边界)
- 故土宗族羁绊度：${soilKinshipTies}% (血缘牵绊与远距离孝道)
- 结余储蓄现金：¥${savings.toLocaleString()} RMB

社会学手记评语：
你终于成了一个“离土自洽”的现代人。你脱离了老家那张密不透风的熟人差序格局，获得了属于自己的辽阔与安宁；而故土的那抹炊烟，终于退成了一枚安静守候的文化胎记。
——摘自 EscapePlan《双城生活模拟》`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: IDENTITY CARD & SOIL BACKGROUND
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs mb-3 border border-slate-700/60 font-mono">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>乡土中国与离土之人 · 双城对照手记</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-2">
            如果这就是你抽到的人生底牌
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            生活从来没有自定义难度。每个离土远行的人，都有一片濡湿稠密的故土。翻开这本五年手记，看异邦的柴米油盐，如何与老家的人情差序隔洋呼应。
          </p>
        </div>

        {/* Profile Card */}
        <div className={`bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-200 ${isRolling ? 'opacity-50' : 'opacity-100'}`}>
          {/* Header Row */}
          <div className="flex items-start justify-between pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2.5 mb-1.5">
                <span className="text-xl font-bold text-white">{profile.name}</span>
                <span className="text-xs text-slate-400 font-mono">
                  {profile.age} 岁 · {profile.gender}
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {profile.familyRole}
                </span>
              </div>
              <p className="text-xs text-blue-400 font-medium">
                {profile.profession.name}
              </p>
            </div>
            <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
              {profile.profession.icon}
            </span>
          </div>

          {/* Mundane Profession Background */}
          <p className="text-xs text-slate-400 my-4 leading-relaxed bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800/60 font-serif">
            {profile.profession.backgroundDesc}
          </p>

          {/* Fei Xiaotong Soil Background Insight */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4 my-4 space-y-2 text-xs">
            <span className="text-slate-400 font-medium block">
              🌾 原生乡土差序格局特征：
            </span>
            <p className="text-slate-300 font-serif leading-relaxed text-[13px]">
              {profile.soilTiesDesc}
            </p>
          </div>

          {/* Hard Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 pt-3 border-t border-slate-800/60 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">学历背景：</span>
              <span>{profile.education}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">老家起点：</span>
              <span className="truncate">{profile.hometown}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wallet className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">初始积蓄：</span>
              <span className="font-mono text-emerald-400 font-semibold">
                ¥{profile.initialSavingsRMB.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Destination Selector */}
          <div className="pt-4 border-t border-slate-800 mt-2">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs text-slate-400 font-medium">
                目标移居地 (离土之后的落脚点)：
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

            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 font-serif leading-relaxed">
              <strong className="text-slate-300 mr-1.5 font-sans">文化距离：</strong>
              {activeCountryObj.culturalDistance}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex gap-3">
            <button
              onClick={handleRollNewLife}
              disabled={isRolling}
              className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRolling ? 'animate-spin' : ''}`} />
              <span>重新抽签 (换个人)</span>
            </button>

            <button
              onClick={handleStartDiary}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20"
            >
              <span>翻开双城五年手记 ➜</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DUAL-COLUMN SPLIT SCENE (HERE VS THERE)
  // =========================================================================
  if (gameState === 'reading' && currentEntry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Top Minimal Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-800 mb-6 text-xs gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-base">{activeCountryObj.flag}</span>
            <span className="text-slate-200 font-semibold">{profile.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{profile.familyRole}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-mono">结余: ¥{savings.toLocaleString()}</span>
          </div>

          {/* Timeline Label */}
          <div className="flex items-center space-x-1 font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentEntry.timeLabel}</span>
          </div>
        </div>

        {/* Phase Title */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
            {currentEntry.phaseTitle}
          </h2>
        </div>

        {/* Dual Split Columns: Left = HERE (异邦), Right = THERE (故土) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* LEFT: HERE (此岸 · 异邦生活) */}
          <div className="bg-[#111722] border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-3">
                <span className="text-xs font-semibold text-blue-400 flex items-center space-x-1.5">
                  <span>🌊</span>
                  <span>{currentEntry.hereTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  HERE · {activeCountryObj.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed whitespace-pre-line">
                {currentEntry.hereText}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 font-mono">
              生活细节：独立立足、柴米油盐、个人边界
            </div>
          </div>

          {/* RIGHT: THERE (彼岸 · 故土差序) */}
          <div className="bg-[#121620] border border-amber-900/30 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-amber-900/30 mb-3">
                <span className="text-xs font-semibold text-amber-300/90 flex items-center space-x-1.5">
                  <span>🏮</span>
                  <span>{currentEntry.thereTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-amber-500/70 uppercase">
                  THERE · 老家故土
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed whitespace-pre-line">
                {currentEntry.thereText}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-900/20 text-[11px] text-amber-500/80 font-mono">
              乡土回响：人情礼数、宗族血缘、亲情羁绊
            </div>
          </div>
        </div>

        {/* Middle: Fei Xiaotong Sociological Footnote */}
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4 sm:p-4.5 mb-6 text-xs leading-relaxed font-serif text-slate-400">
          <p className="italic text-slate-300">
            {currentEntry.sociologicalFootnote}
          </p>
        </div>

        {/* Dual Choices */}
        <div className="bg-[#111722] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <span className="text-xs text-slate-400 block mb-3 font-medium">
            面对此岸的现实与彼岸的牵引，你做出怎样的回应？
          </span>

          <div className="space-y-3">
            {currentEntry.choices.map((choice, idx) => (
              <div
                key={idx}
                onClick={() => handleChoose(choice)}
                className="p-4 rounded-xl border border-slate-800 bg-[#0B0F17] hover:border-slate-600 hover:bg-slate-900/60 cursor-pointer transition text-left group"
              >
                <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-blue-300 leading-snug">
                  {choice.text}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 font-serif">
                  {choice.detail}
                </p>

                {/* Subtle Delta Hints */}
                <div className="flex gap-3 mt-2 pt-2 border-t border-slate-800/40 text-[10px] font-mono text-slate-500">
                  {choice.fundsDelta !== 0 && (
                    <span className={choice.fundsDelta > 0 ? 'text-emerald-400' : 'text-slate-400'}>
                      结余 {choice.fundsDelta > 0 ? `+¥${choice.fundsDelta}` : `-¥${Math.abs(choice.fundsDelta)}`}
                    </span>
                  )}
                  <span className={choice.individualSovereigntyDelta > 0 ? 'text-blue-400' : 'text-slate-400'}>
                    个体独立度 {choice.individualSovereigntyDelta > 0 ? `+${choice.individualSovereigntyDelta}` : choice.individualSovereigntyDelta}%
                  </span>
                  <span className={choice.soilKinshipTiesDelta > 0 ? 'text-amber-400' : 'text-slate-400'}>
                    故土羁绊 {choice.soilKinshipTiesDelta > 0 ? `+${choice.soilKinshipTiesDelta}` : choice.soilKinshipTiesDelta}%
                  </span>
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
            内心的回响 · 岁月注脚
          </span>

          <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-serif mb-6 whitespace-pre-line">
            {selectedOutcome.reaction}
          </div>

          <button
            onClick={handleNextEntry}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20"
          >
            <span>{isEnd ? '查看五年双城手记总结 ➜' : '时光继续向前流淌 ➜'}</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: FINAL MEMOIR & RECORD (双城生活手记档案)
  // =========================================================================
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#111722] border-2 border-slate-800 rounded-2xl p-6 sm:p-9 shadow-2xl relative">
        {/* Subtle Archival Seal */}
        <div className="absolute top-5 right-5 border border-slate-700/80 bg-slate-900/60 text-slate-400 px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase">
          CHRONICLE · 5 YEARS
        </div>

        {/* Title & Metadata */}
        <div className="text-center pb-6 border-b border-slate-800">
          <span className="text-3xl mb-2 block">{activeCountryObj.flag}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
            双城生存手记档案 · 离土者的五年
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            编号：#8B-{profile.id.toUpperCase()}-{profile.targetCountryId.toUpperCase()}-2026
          </p>
          <p className="text-xs text-slate-500 mt-1 font-serif">
            {profile.name} · {profile.age} 岁 · {profile.profession.name} · 原籍：{profile.hometown} ({profile.familyRole})
          </p>
        </div>

        {/* Dual Dimension Balance */}
        <div className="my-6">
          <span className="text-[11px] font-mono text-slate-500 block mb-3 uppercase tracking-wider">
            双维平衡定位 (Dual-World Position)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
            <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400">🌊 现代个体独立度</span>
                <span className="font-mono text-blue-400 font-semibold">{individualSovereignty}%</span>
              </div>
              <p className="text-[11px] text-slate-500 font-serif">
                脱离乡土熟人社会的凝视，在异邦建立属于自己的清爽边界与生活主权。
              </p>
            </div>

            <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400">🌾 故土差序羁绊度</span>
                <span className="font-mono text-amber-400 font-semibold">{soilKinshipTies}%</span>
              </div>
              <p className="text-[11px] text-slate-500 font-serif">
                跨越半个地球的血缘牵绊，那些寄不出的腊肠、除夕夜的屏幕与隔洋转账。
              </p>
            </div>
          </div>

          <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" /> 五年最终结余资产：
            </span>
            <span className="font-mono text-emerald-400 font-semibold text-sm">
              ¥{savings.toLocaleString()} RMB
            </span>
          </div>
        </div>

        {/* Timeline Footprints */}
        <div className="my-6 space-y-3.5">
          <span className="text-[11px] font-mono text-slate-500 block uppercase tracking-wider">
            五年岁月双城印记 (Chronicle of Five Years)
          </span>
          {historyNotes.map((note, idx) => (
            <div key={idx} className="text-xs leading-relaxed border-l-2 border-slate-800 pl-4 py-1">
              <span className="text-slate-500 font-mono block text-[11px] mb-0.5">
                第 {note.year} 年 · {note.phaseTitle}
              </span>
              <strong className="text-slate-300 block mb-1">{note.choiceText}</strong>
              <p className="text-slate-400 font-serif">{note.reaction}</p>
            </div>
          ))}
        </div>

        {/* Fei Xiaotong Sociological Closing Summary */}
        <div className="p-4.5 rounded-xl bg-[#0B0F17] border border-slate-800 text-xs text-slate-300 font-serif leading-relaxed mb-6">
          <p className="mb-2">
            五年过去了，你没有发大财，银行卡里依然只有几万块钱。但你终于成了一个“离土自洽”的现代人。
          </p>
          <p className="text-slate-400">
            你脱离了老家那张密不透风、既温暖又窒息的熟人差序网，在异邦获得了属于自己的辽阔与安宁；而故土的那抹炊烟与父母眼角的白发，终于退成了一枚安静守候的文化胎记。在此处生根，在记忆中止息。
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
          <div className="flex gap-2.5">
            <button
              onClick={handleCopySummary}
              className="flex-1 py-2.5 rounded-xl font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center justify-center space-x-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? '已复制双城手记' : '复制五年双城手记'}</span>
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
              <span>重新抽签 (换个人体验)</span>
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
