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
  Wallet,
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
    const text = `【双城生存手记 · 离土者的五年】
人物档案：${profile.name} (${profile.age}岁 · ${profile.gender} · ${profile.profession.name})
老家原籍：${profile.hometown} (${profile.familyRole})
移居终点：${activeCountryObj.name} · ${activeCountryObj.city}

双维坐标：
- 现代个体独立度：${individualSovereignty}% (摆脱宗族凝视，建立自我边界)
- 故土宗族羁绊度：${soilKinshipTies}% (血缘牵绊与远距离孝道)
- 最终结余积蓄：¥${savings.toLocaleString()} RMB

社会学观察手记：
五年过去了，没有发大财，银行卡里依然只有几万块钱。但你终于成了一个“离土自洽”的现代人。
你脱离了老家那张密不透风、既温暖又窒息的熟人差序网，获得了属于自己的辽阔与安宁；而故土的那抹炊烟与父母眼角的白发，终于退成了一枚安静守候的文化胎记。
——摘自 EscapePlan《双城生活手记》`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: IDENTITY CARD & LITERARY ORIGIN (WARM EDITORIAL PARCHMENT)
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Literary Header */}
        <div className="text-center mb-10">
          <p className="text-sm sm:text-base font-serif tracking-widest text-amber-500/90 uppercase mb-2">
            从乡土中国走出的离土之人
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            抽一张普通人的底牌
          </h1>
          <p className="text-base sm:text-lg text-stone-400 max-w-xl mx-auto font-serif leading-relaxed">
            生活从来没有自定义难度。每个离土远行的人，身后都系着一片濡湿稠密的故土。翻开这本五年手记，看异邦的柴米油盐，如何与老家的人情差序隔洋呼应。
          </p>
        </div>

        {/* Paper-like Dossier Card */}
        <div
          className={`bg-[#17171A] border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-200 ${
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

          {/* Mundane Profession Background */}
          <p className="text-base sm:text-lg text-stone-300 my-5 font-serif leading-relaxed bg-[#121215] p-5 rounded-2xl border border-stone-800/70">
            {profile.profession.backgroundDesc}
          </p>

          {/* Fei Xiaotong Kinship Context */}
          <div className="bg-[#1C1715] border border-amber-900/30 rounded-2xl p-5 my-5 space-y-2">
            <span className="text-amber-400 font-serif font-semibold text-sm sm:text-base block">
              🌾 原生乡土差序格局特征：
            </span>
            <p className="text-stone-200 font-serif text-base sm:text-lg leading-relaxed">
              {profile.soilTiesDesc}
            </p>
          </div>

          {/* Hard Attributes Grid (Readable & Clean) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 pt-4 border-t border-stone-800 text-sm sm:text-base text-stone-300 font-serif">
            <div>
              <span className="text-stone-500 block text-xs sm:text-sm mb-1">学历背景</span>
              <span className="text-stone-200 font-medium">{profile.education}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs sm:text-sm mb-1">老家起点</span>
              <span className="text-stone-200 font-medium">{profile.hometown}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-xs sm:text-sm mb-1">初始积蓄</span>
              <span className="text-emerald-400 font-semibold font-sans text-base sm:text-lg">
                ¥{profile.initialSavingsRMB.toLocaleString()} 元
              </span>
            </div>
          </div>

          {/* Destination Selector */}
          <div className="pt-6 border-t border-stone-800 mt-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
              <span className="text-base text-stone-300 font-serif font-semibold">
                目标移居地 (离土之后的落脚点)：
              </span>
              <span className="text-sm text-stone-400 font-serif">
                {activeCountryObj.city}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
              {SIM_COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setProfile((p) => ({ ...p, targetCountryId: c.id }))}
                  className={`p-3.5 rounded-2xl border text-sm sm:text-base text-left transition-all ${
                    c.id === profile.targetCountryId
                      ? 'bg-amber-950/30 border-amber-500 text-amber-100 font-medium shadow-md shadow-amber-950/20'
                      : 'bg-[#121215] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className="block text-xl mb-1">{c.flag}</span>
                  <span className="font-serif block font-semibold">{c.name}</span>
                </button>
              ))}
            </div>

            <div className="bg-[#121215] p-4 rounded-2xl border border-stone-800 text-sm sm:text-base text-stone-400 font-serif leading-relaxed">
              <strong className="text-stone-200 mr-2 font-sans">文化距离：</strong>
              {activeCountryObj.culturalDistance}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRollNewLife}
              disabled={isRolling}
              className="px-6 py-4 rounded-2xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 text-base font-medium transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 text-stone-400 ${isRolling ? 'animate-spin' : ''}`} />
              <span className="font-serif">重新抽签 (换个人)</span>
            </button>

            <button
              onClick={handleStartDiary}
              className="flex-1 py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-base sm:text-lg font-serif font-semibold transition flex items-center justify-center space-x-2 shadow-lg shadow-amber-700/20"
            >
              <span>翻开双城五年手记 ➜</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DUAL-COLUMN SPLIT SCENE (READABLE & LITERARY ESSAY STYLE)
  // =========================================================================
  if (gameState === 'reading' && currentEntry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Clean Reading Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 mb-6 gap-2 text-sm sm:text-base font-serif">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">{activeCountryObj.flag}</span>
            <span className="text-stone-100 font-bold">{profile.name}</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400">{profile.familyRole}</span>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400 font-sans font-medium">
              结余 ¥{savings.toLocaleString()}
            </span>
          </div>

          <div className="text-stone-400 font-serif">
            {currentEntry.timeLabel}
          </div>
        </div>

        {/* Phase Title (Big & Dignified) */}
        <div className="mb-6">
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
            <div className="mt-5 pt-3.5 border-t border-stone-800/80 text-xs sm:text-sm text-stone-500 font-serif">
              独立生活：自力更生、柴米油盐、个人边界
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
            <div className="mt-5 pt-3.5 border-t border-amber-900/20 text-xs sm:text-sm text-amber-500/80 font-serif">
              乡土回响：人情礼数、宗族血缘、亲情羁绊
            </div>
          </div>
        </div>

        {/* Middle: Fei Xiaotong Book Excerpt Blockquote */}
        <div className="bg-[#151413] border-l-4 border-amber-600/70 border-r border-t border-b border-stone-800 rounded-r-2xl p-5 sm:p-6 mb-7">
          <p className="text-base sm:text-lg font-serif italic text-stone-200 leading-relaxed">
            {currentEntry.sociologicalFootnote}
          </p>
        </div>

        {/* Dual Choices (Comfortable, Large Reading Cards) */}
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

                {/* Subtle Delta Hints */}
                <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-stone-800/50 text-xs sm:text-sm font-serif text-stone-500">
                  {choice.fundsDelta !== 0 && (
                    <span className={choice.fundsDelta > 0 ? 'text-emerald-400 font-sans' : 'text-stone-400 font-sans'}>
                      结余 {choice.fundsDelta > 0 ? `+¥${choice.fundsDelta}` : `-¥${Math.abs(choice.fundsDelta)}`}
                    </span>
                  )}
                  <span className={choice.individualSovereigntyDelta > 0 ? 'text-stone-300' : 'text-stone-500'}>
                    个体独立度 {choice.individualSovereigntyDelta > 0 ? `+${choice.individualSovereigntyDelta}` : choice.individualSovereigntyDelta}%
                  </span>
                  <span className={choice.soilKinshipTiesDelta > 0 ? 'text-amber-300' : 'text-stone-500'}>
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
  // VIEW 3: OUTCOME TRANSITION (BOOKISH ESSAY PAGE)
  // =========================================================================
  if (gameState === 'outcome' && selectedOutcome) {
    const isEnd = currentEntryIdx >= activeStories.length - 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-14">
        <div className="bg-[#17171A] border border-stone-800 rounded-3xl p-7 sm:p-10 shadow-2xl">
          <p className="text-xs sm:text-sm font-serif text-amber-500/90 tracking-widest uppercase mb-3">
            内心的回响 · 岁月注脚
          </p>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-stone-800/80 text-base sm:text-lg text-stone-200 leading-loose font-serif mb-8 whitespace-pre-line">
            {selectedOutcome.reaction}
          </div>

          <button
            onClick={handleNextEntry}
            className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-base sm:text-lg font-serif font-semibold transition flex items-center justify-center space-x-2 shadow-lg shadow-amber-700/20"
          >
            <span>{isEnd ? '查看五年双城手记总结 ➜' : '时光继续向前流淌 ➜'}</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: FINAL MEMOIR (SERIOUS & RESPECTFUL RETROSPECTIVE)
  // =========================================================================
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#17171A] border-2 border-stone-800 rounded-3xl p-7 sm:p-12 shadow-2xl relative">
        {/* Title & Metadata */}
        <div className="text-center pb-8 border-b border-stone-800">
          <span className="text-4xl mb-3 block">{activeCountryObj.flag}</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight mb-2">
            双城生存手记 · 离土者的五年
          </h2>
          <p className="text-base text-stone-400 font-serif">
            {profile.name} · {profile.age} 岁 · {profile.profession.name} · 原籍：{profile.hometown} ({profile.familyRole})
          </p>
        </div>

        {/* Dual Dimension Balance Cards */}
        <div className="my-8">
          <span className="text-sm font-serif text-amber-500/90 block mb-3 uppercase tracking-wider">
            双维平衡定位
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-base font-serif">
            <div className="bg-[#121215] p-5 rounded-2xl border border-stone-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-300 font-semibold">🌊 现代个体独立度</span>
                <span className="font-sans text-stone-100 font-bold text-lg">{individualSovereignty}%</span>
              </div>
              <p className="text-sm text-stone-400 font-serif leading-relaxed">
                脱离乡土熟人社会的凝视，在异邦建立属于自己的清爽边界与生活主权。
              </p>
            </div>

            <div className="bg-[#121215] p-5 rounded-2xl border border-stone-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-amber-200 font-semibold">🌾 故土差序羁绊度</span>
                <span className="font-sans text-amber-300 font-bold text-lg">{soilKinshipTies}%</span>
              </div>
              <p className="text-sm text-stone-400 font-serif leading-relaxed">
                跨越半个地球的血缘牵绊，那些寄不出的腊肠、除夕夜的屏幕与隔洋转账。
              </p>
            </div>
          </div>

          <div className="bg-[#121215] p-4.5 rounded-2xl border border-stone-800 text-base font-serif flex justify-between items-center">
            <span className="text-stone-300 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" /> 五年最终结余资产：
            </span>
            <span className="font-sans text-emerald-400 font-bold text-lg">
              ¥{savings.toLocaleString()} RMB
            </span>
          </div>
        </div>

        {/* Timeline Footprints */}
        <div className="my-8 space-y-5">
          <span className="text-sm font-serif text-amber-500/90 block uppercase tracking-wider">
            五年岁月双城印记
          </span>
          {historyNotes.map((note, idx) => (
            <div key={idx} className="text-base leading-relaxed border-l-2 border-stone-700 pl-5 py-1">
              <span className="text-stone-500 font-serif block text-sm mb-1">
                第 {note.year} 年 · {note.phaseTitle}
              </span>
              <strong className="text-stone-200 font-serif block mb-1.5">{note.choiceText}</strong>
              <p className="text-stone-400 font-serif leading-relaxed">{note.reaction}</p>
            </div>
          ))}
        </div>

        {/* Fei Xiaotong Sociological Closing Summary */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-stone-800 text-base sm:text-lg text-stone-200 font-serif leading-loose mb-8">
          <p className="mb-3">
            五年过去了，你没有发大财，银行卡里依然只有几万块钱。但你终于成了一个“离土自洽”的现代人。
          </p>
          <p className="text-stone-400">
            你脱离了老家那张密不透风、既温暖又窒息的熟人差序网，在异邦获得了属于自己的辽阔与安宁；而故土的那抹炊烟与父母眼角的白发，终于退成了一枚安静守候的文化胎记。在此处生根，在记忆中止息。
          </p>
        </div>

        {/* Action Footers */}
        <div className="space-y-3 pt-6 border-t border-stone-800 text-base font-serif">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopySummary}
              className="flex-1 py-3.5 rounded-2xl font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 transition flex items-center justify-center space-x-2 border border-stone-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-400" />}
              <span>{copied ? '已复制双城手记' : '复制五年双城手记'}</span>
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
              <span>重新抽签 (体验另一生)</span>
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
  );
};
