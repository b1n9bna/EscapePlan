import React, { useState } from 'react';
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
  CheckSquare
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

  // In-diary progression
  const [currentEntryIdx, setCurrentEntryIdx] = useState<number>(0);
  const [currentSavings, setCurrentSavings] = useState<number>(profile.initialSavingsRMB);
  const [historyNotes, setHistoryNotes] = useState<{ year: number; title: string; choice: string; narrative: string }[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<{ choice: SimChoice; narrative: string } | null>(null);

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
      setIsRolling(false);
    }, 150);
  };

  const handleStartDiary = () => {
    setCurrentSavings(profile.initialSavingsRMB);
    setCurrentEntryIdx(0);
    setHistoryNotes([]);
    setGameState('reading');
  };

  const handleChoose = (choice: SimChoice) => {
    setCurrentSavings((prev) => prev + choice.fundsDelta);
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
      setGameState('summary');
    }
  };

  // =========================================================================
  // VIEW 1: ORDINARY LIFE GACHA (PLAIN & HUMAN)
  // =========================================================================
  if (gameState === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Subtle Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs mb-3 border border-slate-700/60">
            <span>普通人的移居记录簿</span>
            <span>•</span>
            <span>没有宏大叙事，只有柴米油盐</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-2">
            抽一张普通人的生活底牌
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            生活从来没有自定义难度。有人兜里只有两三万，有人只会英语打招呼。看看这副底牌，能在异国他乡过出怎样的日子。
          </p>
        </div>

        {/* Life Card */}
        <div className={`bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-200 ${isRolling ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xl font-bold text-white">{profile.name}</span>
                <span className="text-xs text-slate-400">
                  {profile.age} 岁 · {profile.gender}
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

          <p className="text-xs text-slate-400 my-4 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-slate-800/60">
            {profile.profession.backgroundDesc}
          </p>

          {/* Mundane attributes */}
          <div className="space-y-2.5 text-xs text-slate-300 my-5">
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
              <Wallet className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">手里攒下的积蓄：</span>
              <span className="font-mono text-emerald-400 font-medium">
                ¥{profile.initialSavingsRMB.toLocaleString()} 元
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 ml-5">外语基础：</span>
              <span className="text-slate-300">{profile.englishLevel}</span>
            </div>
          </div>

          {/* Destination Selector */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500 block mb-2 font-mono">
              目的地 (命运将他/她带到了)：
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleRollNewLife}
              disabled={isRolling}
              className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRolling ? 'animate-spin' : ''}`} />
              <span>换个人</span>
            </button>

            <button
              onClick={handleStartDiary}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20"
            >
              <span>翻开移居日记 ➜</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PLAIN DIARY SCENE
  // =========================================================================
  if (gameState === 'reading' && currentEntry) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Subtle top indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-2">
            <span>{activeCountryObj.flag}</span>
            <span className="text-slate-300 font-medium">{profile.name} 在 {activeCountryObj.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-mono">余款: ¥{currentSavings.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1 font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentEntry.timeLabel}</span>
          </div>
        </div>

        {/* Diary Content Card */}
        <div className="bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 mb-4 leading-snug">
            {currentEntry.sceneTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B0F17] p-5 rounded-xl border border-slate-800/60 mb-6 whitespace-pre-line font-serif">
            {currentEntry.sceneText}
          </p>

          <span className="text-xs text-slate-500 block mb-3 font-mono">
            接下来，你怎么做？
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
                <p className="text-[11px] text-slate-500 mt-1">
                  {choice.detail}
                </p>
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
            生活的小注脚
          </span>

          <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-serif mb-6 whitespace-pre-line">
            {selectedOutcome.narrative}
          </div>

          <button
            onClick={handleNextEntry}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-medium transition flex items-center justify-center space-x-1.5"
          >
            <span>{isEnd ? '翻到最后一页 ➜' : '日子继续往前过 ➜'}</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: QUIET MEMORIAL & RECAP
  // =========================================================================
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-[#111722] border border-slate-800 rounded-2xl p-6 sm:p-9 shadow-xl">
        <div className="text-center pb-6 border-b border-slate-800">
          <span className="text-2xl mb-2 block">{activeCountryObj.flag}</span>
          <h2 className="text-xl font-bold text-white mb-1">
            {profile.name} 的五年生活手记
          </h2>
          <p className="text-xs text-slate-500">
            起点：{profile.profession.name} · {profile.hometown}
          </p>
        </div>

        {/* Quiet Timeline */}
        <div className="my-6 space-y-4">
          {historyNotes.map((note, idx) => (
            <div key={idx} className="text-xs leading-relaxed border-l-2 border-slate-800 pl-4 py-1">
              <span className="text-slate-500 font-mono block text-[11px] mb-0.5">
                第 {note.year} 年
              </span>
              <strong className="text-slate-200 block mb-1">{note.title}</strong>
              <p className="text-slate-400 font-serif">{note.narrative}</p>
            </div>
          ))}
        </div>

        {/* Closing Calm Note */}
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800/80 text-xs text-slate-400 font-serif leading-relaxed mb-6">
          五年过去了，你没有发大财，银行卡里依然只有几万块钱。但你买了一辆二手自行车，下班骑过河堤，风吹在脸上很舒服。生活没有奇迹，但你在这个陌生的角落，踏踏实实地活了下来。
        </div>

        {/* Action Footers */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => {
              handleRollNewLife();
              setGameState('setup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 py-2.5 rounded-xl font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>换个人重读另一段人生</span>
          </button>

          <button
            onClick={() => onNavigateToSubclasses(profile.targetCountryId)}
            className="flex-1 py-2.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center justify-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>查看签证政策</span>
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
  );
};
