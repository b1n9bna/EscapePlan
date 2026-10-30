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
  CheckSquare,
  Copy,
  Check
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

  // Dual metrics (Modern Individual vs Xiangtu Kinship)
  const [savings, setSavings] = useState<number>(profile.initialSavingsRMB);
  const [individualSovereignty, setIndividualSovereignty] = useState<number>(50);
  const [soilKinshipTies, setSoilKinshipTies] = useState<number>(65);

  // In-diary progression
  const [currentEntryIdx, setCurrentEntryIdx] = useState<number>(0);
  const [historyNotes, setHistoryNotes] = useState<{
    year: number;
    phaseTitle: string;
    choiceText: string;
    reaction: string;
    fundsDelta: number;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      reaction: choice.reaction,
      fundsDelta: choice.fundsDelta
    };
    setHistoryNotes([...historyNotes, newNote]);
    setSelectedOutcome({ choice, reaction: choice.reaction });
    setGameState('outcome');
  };

  const handleNextEntry = () => {
    if (currentEntryIdx < activeStories.length - 1) {
      setCurrentEntryIdx(currentEntryIdx + 1);
      setGameState('reading');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      setGameState('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopySummary = () => {
    const text = `【双城生存手记 · 离土者的五年】
人物：${profile.name} (${profile.age}岁 · ${profile.gender} · ${profile.profession.name})
学历：${profile.education}
原籍：${profile.hometown} (${profile.familyRole})
移居：${activeCountryObj.name} · ${activeCountryObj.city}

五年结余：
- 现代个体独立度：${individualSovereignty}%
- 故土血缘羁绊度：${soilKinshipTies}%
- 结余资金：¥${savings.toLocaleString()} RMB

生平节点：
${historyNotes.map((n) => `第 ${n.year} 年：${n.choiceText}`).join('\n')}

来自 EscapePlan《双城生活模拟》`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: CLEAN & DIRECT START SCREEN (PURE SUBTRACTION)
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Simple, Non-Pretentious Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight mb-2">
            抽一张人生底牌
          </h1>
          <p className="text-base text-stone-400 font-serif">
            普通人的双城五年手记
          </p>
        </div>

        {/* Paper-like Dossier Card */}
        <div
          className={`bg-[#17171A] border border-stone-800 rounded-3xl p-6 sm:p-9 shadow-2xl transition-all duration-200 ${
            isRolling ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-start justify-between pb-6 border-b border-stone-800">
            <div>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                  {profile.name}
                </span>
                <span className="text-base text-stone-400 font-serif">
                  {profile.age} 岁 · {profile.gender}
                </span>
                <span className="text-xs sm:text-sm font-serif px-2.5 py-0.5 rounded-full bg-amber-950/40 text-amber-200 border border-amber-800/40">
                  {profile.familyRole}
                </span>
              </div>
              <p className="text-base text-stone-300 font-medium">
                {profile.profession.name}
              </p>
            </div>
            <span className="text-4xl p-2.5 rounded-2xl bg-stone-900 border border-stone-800">
              {profile.profession.icon}
            </span>
          </div>

          {/* Mundane Background */}
          <p className="text-base text-stone-300 my-4 font-serif leading-relaxed bg-[#121215] p-4.5 rounded-2xl border border-stone-800/70">
            {profile.profession.backgroundDesc}
          </p>

          {/* Family & Kinship Environment */}
          <div className="bg-[#1C1715] border border-amber-900/30 rounded-2xl p-4.5 my-4 space-y-1.5">
            <span className="text-amber-400 font-serif font-semibold text-sm sm:text-base block">
              原生家庭与宗族生态：
            </span>
            <p className="text-stone-200 font-serif text-base leading-relaxed">
              {profile.soilTiesDesc}
            </p>
          </div>

          {/* Core Reality Baseline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 pt-4 border-t border-stone-800 text-sm sm:text-base text-stone-300 font-serif">
            <div>
              <span className="text-stone-500 block text-xs mb-1">学历</span>
              <span className="text-stone-200 font-medium">{profile.education}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">老家</span>
              <span className="text-stone-200 font-medium">{profile.hometown}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs mb-1">初始积蓄</span>
              <span className="text-emerald-400 font-semibold font-sans text-base">
                ¥{profile.initialSavingsRMB.toLocaleString()} 元
              </span>
            </div>
          </div>

          {/* Destination Selection */}
          <div className="pt-5 border-t border-stone-800 mt-2">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-base text-stone-300 font-serif font-semibold">
                目标目的地：
              </span>
              <span className="text-sm text-stone-400 font-serif">
                {activeCountryObj.city}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {SIM_COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setProfile((p) => ({ ...p, targetCountryId: c.id }))}
                  className={`p-3 rounded-2xl border text-sm sm:text-base text-left transition-all ${
                    c.id === profile.targetCountryId
                      ? 'bg-amber-950/30 border-amber-500 text-amber-100 font-medium shadow-sm'
                      : 'bg-[#121215] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className="block text-xl mb-1">{c.flag}</span>
                  <span className="font-serif block font-semibold">{c.name}</span>
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-serif mt-2">
              <strong className="text-stone-300 font-sans mr-1">文化距离：</strong>
              {activeCountryObj.culturalDistance}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRollNewLife}
              disabled={isRolling}
              className="px-6 py-3.5 rounded-2xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 text-base font-medium transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 text-stone-400 ${isRolling ? 'animate-spin' : ''}`} />
              <span className="font-serif">换个人</span>
            </button>

            <button
              onClick={handleStartDiary}
              className="flex-1 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-base sm:text-lg font-serif font-semibold transition flex items-center justify-center space-x-2 shadow-lg shadow-amber-700/20"
            >
              <span>开始人生 ➜</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2 & 3: CONTINUOUS TIMELINE STREAM (PAST YEARS REMAIN VISIBLE!)
  // =========================================================================
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Top Fixed-Style Reading Bar */}
      <div className="sticky top-16 z-20 bg-[#0B0F17]/95 backdrop-blur-md py-3 border-b border-stone-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm sm:text-base font-serif">
        <div className="flex items-center space-x-2.5">
          <span className="text-xl">{activeCountryObj.flag}</span>
          <span className="text-stone-100 font-bold">{profile.name}</span>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400">{profile.education}</span>
          <span className="text-stone-600">•</span>
          <span className="text-emerald-400 font-sans font-medium">
            结余 ¥{savings.toLocaleString()}
          </span>
        </div>

        <div className="text-stone-400 font-serif flex items-center space-x-3 text-xs sm:text-sm">
          <span>独立度 {individualSovereignty}%</span>
          <span className="text-stone-600">|</span>
          <span className="text-amber-400">故土羁绊 {soilKinshipTies}%</span>
        </div>
      </div>

      {/* =====================================================================
          TIMELINE SCROLL: PREVIOUSLY RECORDED YEARS
          ===================================================================== */}
      {historyNotes.length > 0 && (
        <div className="mb-10 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-serif text-amber-500 uppercase tracking-widest pb-1 border-b border-stone-800/60">
            <span>已走过的岁月刻度</span>
          </div>

          <div className="space-y-4">
            {historyNotes.map((note, idx) => (
              <div
                key={idx}
                className="bg-[#141417] border border-stone-800/80 rounded-2xl p-5 sm:p-6 transition-all"
              >
                <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 font-serif mb-2">
                  <span>第 {note.year} 年 · {note.phaseTitle}</span>
                  {note.fundsDelta !== 0 && (
                    <span className={note.fundsDelta > 0 ? 'text-emerald-400' : 'text-stone-400'}>
                      {note.fundsDelta > 0 ? `+¥${note.fundsDelta}` : `-¥${Math.abs(note.fundsDelta)}`}
                    </span>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-stone-200 mb-2">
                  你的抉择：{note.choiceText}
                </h4>
                <p className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
                  {note.reaction}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          ACTIVE SCENE: CURRENT YEAR TO PLAY (OR OUTCOME TRANSITION)
          ===================================================================== */}
      {gameState === 'reading' && currentEntry && (
        <div className="border-t-2 border-stone-800 pt-6">
          {/* Phase Title */}
          <div className="mb-6">
            <span className="text-xs sm:text-sm text-amber-500 font-serif block mb-1">
              {currentEntry.timeLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight leading-snug">
              {currentEntry.phaseTitle}
            </h2>
          </div>

          {/* Dual Split Columns: Left = HERE (此岸), Right = THERE (彼岸) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* LEFT: HERE (此岸 · 异邦生活) */}
            <div className="bg-[#17171B] border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                  <span className="text-base sm:text-lg font-serif font-bold text-stone-100 flex items-center space-x-2">
                    <span>🌊</span>
                    <span>{currentEntry.hereTitle}</span>
                  </span>
                  <span className="text-xs font-serif text-stone-500">
                    此岸 · {activeCountryObj.name}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-stone-200 font-serif leading-loose whitespace-pre-line">
                  {currentEntry.hereText}
                </p>
              </div>
            </div>

            {/* RIGHT: THERE (彼岸 · 故土差序) */}
            <div className="bg-[#1D1714] border border-amber-900/30 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/30 mb-4">
                  <span className="text-base sm:text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
                    <span>🏮</span>
                    <span>{currentEntry.thereTitle}</span>
                  </span>
                  <span className="text-xs font-serif text-amber-500/70">
                    彼岸 · 老家故土
                  </span>
                </div>
                <p className="text-base sm:text-lg text-stone-200 font-serif leading-loose whitespace-pre-line">
                  {currentEntry.thereText}
                </p>
              </div>
            </div>
          </div>

          {/* Choices (Comfortable, Large Reading Cards) */}
          <div className="bg-[#17171A] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <p className="text-base sm:text-lg text-stone-200 font-serif font-semibold mb-4">
              面对此岸的现实与彼岸的牵引，你做出怎样的回应？
            </p>

            <div className="space-y-4">
              {currentEntry.choices.map((choice, idx) => (
                <div
                  key={idx}
                  onClick={() => handleChoose(choice)}
                  className="p-5 rounded-2xl border border-stone-800 bg-[#121215] hover:border-amber-600/60 hover:bg-[#1A1816] cursor-pointer transition text-left group"
                >
                  <p className="text-base sm:text-lg font-serif font-medium text-stone-100 group-hover:text-amber-200 leading-snug">
                    {choice.text}
                  </p>
                  <p className="text-sm sm:text-base text-stone-400 mt-1.5 font-serif leading-relaxed">
                    {choice.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Outcome Step Transition */}
      {gameState === 'outcome' && selectedOutcome && (
        <div className="border-t-2 border-stone-800 pt-6">
          <div className="bg-[#17171A] border border-stone-800 rounded-3xl p-7 sm:p-9 shadow-2xl">
            <span className="text-xs sm:text-sm font-serif text-amber-500 uppercase tracking-widest block mb-3">
              内心的回响 · 岁月注脚
            </span>

            <div className="p-5 sm:p-7 rounded-2xl bg-[#121215] border border-stone-800/80 text-base sm:text-lg text-stone-200 leading-loose font-serif mb-6 whitespace-pre-line">
              {selectedOutcome.reaction}
            </div>

            <button
              onClick={handleNextEntry}
              className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-base sm:text-lg font-serif font-semibold transition flex items-center justify-center space-x-2 shadow-lg shadow-amber-700/20"
            >
              <span>{currentEntryIdx >= activeStories.length - 1 ? '查看五年人生长卷 ➜' : '时光继续向前流淌 ➜'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          FINAL SUMMARY: COMPLETE LIFE MEMOIR (VIEW 4)
          ===================================================================== */}
      {gameState === 'summary' && (
        <div className="border-t-2 border-stone-800 pt-8">
          <div className="bg-[#17171A] border-2 border-stone-800 rounded-3xl p-7 sm:p-10 shadow-2xl">
            <div className="text-center pb-6 border-b border-stone-800">
              <span className="text-4xl mb-2 block">{activeCountryObj.flag}</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight mb-2">
                五年双城手记
              </h2>
              <p className="text-base text-stone-400 font-serif">
                {profile.name} · {profile.age} 岁 · {profile.education} · {profile.profession.name}
              </p>
              <p className="text-sm text-stone-500 font-serif mt-1">
                老家：{profile.hometown} ({profile.familyRole}) · 移居：{activeCountryObj.name}
              </p>
            </div>

            {/* Balance Review */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-base font-serif">
              <div className="bg-[#121215] p-4.5 rounded-2xl border border-stone-800">
                <span className="text-stone-400 block text-xs mb-1">现代个体独立度</span>
                <span className="font-sans text-stone-100 font-bold text-xl">{individualSovereignty}%</span>
              </div>
              <div className="bg-[#121215] p-4.5 rounded-2xl border border-stone-800">
                <span className="text-amber-300 block text-xs mb-1">故土血缘羁绊度</span>
                <span className="font-sans text-amber-200 font-bold text-xl">{soilKinshipTies}%</span>
              </div>
              <div className="bg-[#121215] p-4.5 rounded-2xl border border-stone-800">
                <span className="text-emerald-400 block text-xs mb-1">最终结余流动资产</span>
                <span className="font-sans text-emerald-400 font-bold text-xl">
                  ¥{savings.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Chronological Footprints */}
            <div className="my-6 space-y-4">
              <span className="text-xs sm:text-sm font-serif text-amber-500 uppercase tracking-wider block">
                五年岁月轨迹
              </span>
              {historyNotes.map((note, idx) => (
                <div key={idx} className="text-base leading-relaxed border-l-2 border-stone-700 pl-4 py-1">
                  <span className="text-stone-500 font-serif block text-xs mb-0.5">
                    第 {note.year} 年 · {note.phaseTitle}
                  </span>
                  <strong className="text-stone-200 font-serif block mb-1">{note.choiceText}</strong>
                  <p className="text-stone-400 font-serif text-sm leading-relaxed">{note.reaction}</p>
                </div>
              ))}
            </div>

            {/* Closing Epilogue */}
            <div className="p-6 rounded-2xl bg-[#121215] border border-stone-800 text-base sm:text-lg text-stone-200 font-serif leading-loose mb-8">
              五年过去了，你没有发大财，银行卡里依然只有几万块钱。但在这个陌生的角落，你有一辆二手车或自行车，熟悉了下班路上的每一个路口。生活没有宏大叙事，你终于在自己脚下，安顿好了一整颗心。
            </div>

            {/* Action Footers */}
            <div className="space-y-3 pt-6 border-t border-stone-800 text-base font-serif">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 py-3.5 rounded-2xl font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 transition flex items-center justify-center space-x-2 border border-stone-700"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-400" />}
                  <span>{copied ? '已复制生平手记' : '复制生平手记'}</span>
                </button>

                <button
                  onClick={() => {
                    handleRollNewLife();
                    setGameState('setup');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-3.5 rounded-2xl font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 transition flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4 text-stone-400" />
                  <span>换个人重开</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigateToSubclasses(profile.targetCountryId)}
                  className="flex-1 py-3.5 rounded-2xl font-semibold bg-amber-600 hover:bg-amber-500 text-white transition flex items-center justify-center space-x-2 shadow-sm shadow-amber-600/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>查看该国真实签证政策</span>
                </button>

                <button
                  onClick={() => onNavigateToDIY(profile.targetCountryId)}
                  className="flex-1 py-3.5 rounded-2xl font-semibold bg-stone-800 text-emerald-400 border border-emerald-500/30 hover:bg-stone-700 transition flex items-center justify-center space-x-2"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>手搓避坑清单</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
