import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { SpringButton, SpringOverlay } from './MotionPrimitives';
import {
  generateRandomFamily,
  BIRTHPLACE_SLIDES,
  generateTimelineForCharacter,
  generateCareerTimeline,
  calculateGaokaoOutcome,
  generateAdultMilestones,
  getTailoredCareerSubtrackNodes,
  getTailoredAdultChoiceBranch,
  getCareerSubtrack,
  generateFinalLifetimeVerdict,
  detectCrisisWarning,
  ENDING_CODEX_DEFS,
  getHealthDesc,
  getHappinessDesc,
  getCognitionDesc,
  getSocialDesc,
  getFatherDynamicStatus,
  getMotherDynamicStatus,
  getSiblingDynamicStatus,
  evaluateSoulImprints
} from '../data/simulation';
import confetti from 'canvas-confetti';
import type {
  CharacterAttributes,
  LifeEventNode,
  LifeChoice,
  GaokaoCalculation
} from '../data/simulation';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  HeartPulse,
  Brain,
  Smile,
  Users,
  User,
  Coins,
  Shield,
  Home,
  GraduationCap,
  Check,
  Copy,
  ChevronRight,
  Calendar,
  Compass,
  Play,
  Pause,
  FastForward,
  BookOpen,
  Award,
  AlertTriangle,
  X,
  Lock,
  Wrench,
  Briefcase,
  Landmark,
  HeartHandshake,
  ShieldAlert,
  Sun,
  Moon,
  Type
} from 'lucide-react';

interface LifeSimulatorProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

interface ChronicleLogEntry {
  id: string;
  age: number;
  year: number;
  stageName: string;
  title: string;
  scene: string;
  type: 'natural' | 'choice' | 'milestone' | 'destiny' | 'mortality';
  chosenOptionText?: string;
  chosenReaction?: string;
  statDelta?: Partial<CharacterAttributes>;
  tagsAdded?: string[];
  reflection?: string;
}

const isPrematureMortality = (entries: ChronicleLogEntry[]) =>
  entries.some(
    (e) =>
      e.type === 'mortality' ||
      e.tagsAdded?.some(
        (t) =>
          t.includes('提前终局') ||
          t.includes('心梗猝死') ||
          t.includes('抗洪殉职') ||
          t.includes('矽肺病故') ||
          t.includes('遁入空门') ||
          t.includes('铁窗残生') ||
          t.includes('境外泥潭')
      )
  );

const isSimulationEnded = (entries: ChronicleLogEntry[]) =>
  entries.some((e) => e.age === 63) || isPrematureMortality(entries);


// ============================================================================
// SVG 5-AXIS RADAR CHART COMPONENT (五维人生格局图)
// ============================================================================
const RadarChart: React.FC<{
  radar: {
    wealth: number;
    health: number;
    cognition: number;
    autonomy: number;
    kinship: number;
  };
  isLight?: boolean;
}> = ({ radar, isLight }) => {
  const size = 200;
  const center = size / 2;
  const radius = 62;

  const axes = [
    { label: '财富充裕', val: radar.wealth },
    { label: '身心康宁', val: radar.health },
    { label: '见识格局', val: radar.cognition },
    { label: '自由旷野', val: radar.autonomy },
    { label: '亲族温度', val: radar.kinship }
  ];

  const getPoint = (idx: number, ratio: number) => {
    const angle = ((idx * 72 - 90) * Math.PI) / 180;
    return {
      x: center + radius * ratio * Math.cos(angle),
      y: center + radius * ratio * Math.sin(angle)
    };
  };

  const getLabelPoint = (idx: number) => {
    const angle = ((idx * 72 - 90) * Math.PI) / 180;
    return {
      x: center + (radius + 18) * Math.cos(angle),
      y: center + (radius + 14) * Math.sin(angle)
    };
  };

  const rings = [0.33, 0.66, 1.0];
  const ringPolygons = rings.map((r) =>
    axes.map((_, i) => {
      const p = getPoint(i, r);
      return `${p.x},${p.y}`;
    }).join(' ')
  );

  const playerPoints = axes.map((a, i) => {
    const p = getPoint(i, Math.min(100, Math.max(15, a.val)) / 100);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-colors ${
      isLight ? "bg-stone-50 border-stone-200" : "bg-[#0B0C12] border-stone-800/80"
    }`}>
      <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
        isLight ? "text-amber-800" : "text-amber-400"
      }`}>
        <Sparkles className="w-3.5 h-3.5" />
        五维人生格局图
      </div>
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={isLight ? "0.45" : "0.5"} />
            <stop offset="100%" stopColor="#b45309" stopOpacity={isLight ? "0.2" : "0.15"} />
          </radialGradient>
        </defs>

        {ringPolygons.map((pts, idx) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke={isLight ? "#e7e5e4" : "#292524"}
            strokeWidth="1"
            strokeDasharray={idx < 2 ? '3,3' : undefined}
          />
        ))}

        {axes.map((_, i) => {
          const p = getPoint(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke={isLight ? "#d6d3d1" : "#292524"}
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={playerPoints}
          fill="url(#radarGrad)"
          stroke="#f59e0b"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {axes.map((a, i) => {
          const p = getPoint(i, Math.min(100, Math.max(15, a.val)) / 100);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#fbbf24"
              stroke={isLight ? "#ffffff" : "#0C0E14"}
              strokeWidth="1.5"
            />
          );
        })}

        {axes.map((a, i) => {
          const lp = getLabelPoint(i);
          return (
            <text
              key={i}
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-[10px] font-sans ${isLight ? "fill-stone-700 font-medium" : "fill-stone-300"}`}
            >
              {a.label}
              <tspan className={`${isLight ? "fill-amber-700 font-bold" : "fill-amber-400"} font-mono font-semibold ml-0.5`}> {a.val}</tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================================
// ACHIEVEMENT ICON HELPER
// ============================================================================
const renderAchievementIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles className="w-4 h-4 text-amber-400" />;
    case 'GraduationCap':
      return <GraduationCap className="w-4 h-4 text-sky-400" />;
    case 'Wrench':
      return <Wrench className="w-4 h-4 text-amber-500" />;
    case 'Briefcase':
      return <Briefcase className="w-4 h-4 text-purple-400" />;
    case 'Coins':
      return <Coins className="w-4 h-4 text-yellow-400" />;
    case 'Landmark':
      return <Landmark className="w-4 h-4 text-emerald-400" />;
    case 'Smile':
      return <Smile className="w-4 h-4 text-amber-400" />;
    case 'HeartHandshake':
      return <HeartHandshake className="w-4 h-4 text-rose-400" />;
    case 'Compass':
      return <Compass className="w-4 h-4 text-sky-400" />;
    case 'Home':
      return <Home className="w-4 h-4 text-teal-400" />;
    case 'ShieldAlert':
      return <ShieldAlert className="w-4 h-4 text-orange-400" />;
    default:
      return <Award className="w-4 h-4 text-amber-400" />;
  }
};

// ============================================================================
// 16 种终局图鉴弹窗 (Ending Codex Modal)
// ============================================================================
const EndingCodexModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  unlockedIds: string[];
  isLight?: boolean;
}> = ({ isOpen, onClose, unlockedIds, isLight }) => {
  return (
    <SpringOverlay open={isOpen} onClose={onClose} label="结局图鉴"
      className={`border rounded-2xl max-w-4xl w-full max-h-[88dvh] flex flex-col overflow-hidden shadow-2xl ${
        isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#0E1017] border-white/[0.08] text-stone-100"
      }`}>
        <div className={`px-5 sm:px-6 py-4 border-b flex items-center justify-between gap-3 shrink-0 transition-colors ${
          isLight ? "bg-stone-50 border-stone-200" : "bg-[#13151F] border-white/[0.07]"
        }`}>
          <div className="flex items-center gap-2.5">
            <BookOpen className={`w-5 h-5 ${isLight ? "text-amber-700" : "text-[#D4A359]"}`} />
            <div>
              <h2 className={`text-base sm:text-lg font-bold flex flex-wrap items-center gap-2 font-narrative-serif ${
                isLight ? "text-stone-900" : "text-stone-100"
              }`}>
                <span>结局图鉴</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono-num font-semibold ${
                  isLight ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-[#D4A359]/15 border border-[#D4A359]/30 text-[#D4A359]"
                }`}>
                  已收集 {unlockedIds.length} / 16
                </span>
              </h2>
            </div>
          </div>
          <SpringButton
            onClick={onClose}
            aria-label="关闭结局图鉴"
            className={`min-h-10 min-w-10 shrink-0 flex items-center justify-center p-1.5 rounded-lg transition-colors ${
              isLight ? "text-stone-500 hover:text-stone-900 hover:bg-stone-200" : "text-stone-400 hover:text-stone-100 hover:bg-[#1E2230]"
            }`}
          >
            <X className="w-5 h-5" />
          </SpringButton>
        </div>

        <div className={`p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1 transition-colors ${
          isLight ? "bg-[#FAF9F6]" : "bg-[#0A0B0E]"
        }`}>
          {ENDING_CODEX_DEFS.map((ed) => {
            const isUnlocked = unlockedIds.includes(ed.id);

            return (
              <div
                key={ed.id}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? ed.rarity === 'SSR'
                      ? isLight
                        ? 'bg-amber-50/70 border-amber-400 shadow-md shadow-amber-900/10'
                        : 'bg-[#191612] border-[#D4A359]/70 shadow-md shadow-amber-950/20'
                      : ed.rarity === 'SR'
                      ? isLight
                        ? 'bg-purple-50/70 border-purple-300'
                        : 'bg-[#161324] border-purple-500/50'
                      : isLight
                      ? 'bg-white border-stone-200 shadow-sm'
                      : 'bg-[#13151F] border-white/[0.08]'
                    : isLight
                    ? 'bg-stone-100/70 border-stone-200 opacity-60'
                    : 'bg-[#0E1016] border-white/[0.05] opacity-55'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono-num ${
                        ed.rarity === 'SSR'
                          ? 'bg-gradient-to-r from-[#D4A359] to-[#C29348] text-stone-950 font-bold'
                          : ed.rarity === 'SR'
                          ? 'bg-purple-600 text-stone-100 font-bold'
                          : isLight
                          ? 'bg-stone-200 text-stone-800'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {ed.rarity}
                    </span>
                    <span className={`text-xs font-mono-num ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>
                      No.{ed.number < 10 ? '0' : ''}{ed.number}
                    </span>
                    <span className={`text-[11px] font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>
                      · {ed.trackHint}
                    </span>
                  </div>
                  {isUnlocked ? (
                    <span className={`text-[11px] font-medium flex items-center gap-1 px-2 py-0.5 rounded-full font-reading-sans ${
                      isLight
                        ? "text-emerald-800 bg-emerald-50 border border-emerald-300"
                        : "text-emerald-300 bg-emerald-950/40 border border-emerald-800/50"
                    }`}>
                      <Check className="w-3 h-3" />
                      已解锁
                    </span>
                  ) : (
                    <span className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded-full font-reading-sans ${
                      isLight
                        ? "text-stone-500 bg-stone-200/80 border border-stone-300"
                        : "text-stone-300 bg-white/[0.05] border border-white/[0.1]"
                    }`}>
                      <Lock className="w-3 h-3" />
                      未解锁
                    </span>
                  )}
                </div>

                <h3 className={`text-sm font-bold mb-1 font-narrative-serif ${
                  isUnlocked
                    ? isLight ? 'text-stone-900' : 'text-stone-100'
                    : isLight ? 'text-stone-500' : 'text-stone-400'
                }`}>
                  {ed.title}
                </h3>
                <div className={`text-[11px] italic font-narrative-serif mb-2 ${
                  isLight ? "text-amber-800 font-medium" : "text-[#D4A359]/90"
                }`}>
                  {ed.tagline}
                </div>

                {isUnlocked ? (
                  <p className={`text-xs leading-relaxed font-reading-sans ${
                    isLight ? "text-stone-700" : "text-stone-300"
                  }`}>
                    {ed.description}
                  </p>
                ) : (
                  <div className={`text-xs p-2.5 rounded-lg border font-reading-sans ${
                    isLight ? "bg-stone-100 border-stone-200 text-stone-600" : "bg-[#12141C] border-white/[0.06] text-stone-400"
                  }`}>
                    <span className={`font-semibold block mb-0.5 ${isLight ? "text-amber-800" : "text-[#D4A359]/90"}`}>解锁线索：</span>
                    {ed.unlockCondition}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`px-6 py-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 font-reading-sans ${
          isLight ? "bg-stone-50 border-stone-200 text-stone-600" : "bg-[#0E1017] border-white/[0.07] text-stone-400"
        }`}>
          <span>记录保存在当前浏览器</span>
          <SpringButton
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold transition-colors shadow-md shadow-amber-950/30"
          >
            返回模拟
          </SpringButton>
        </div>
    </SpringOverlay>
  );
};

export const LifeSimulator: React.FC<LifeSimulatorProps> = ({
  onNavigateToSubclasses: _onNavigateToSubclasses,
  onNavigateToDIY: _onNavigateToDIY,
  theme: propTheme,
  onToggleTheme: propToggleTheme
}) => {
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('escapeplan_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const reduceMotion = useReducedMotion();
  const activeTheme = propTheme || localTheme;
  const isLight = activeTheme === 'light';

  const handleToggleTheme = () => {
    if (propToggleTheme) {
      propToggleTheme();
    } else {
      setLocalTheme((prev) => {
        const next = prev === 'dark' ? 'light' : 'dark';
        localStorage.setItem('escapeplan_theme', next);
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.classList.toggle('light', next === 'light');
        return next;
      });
    }
  };
  // Gameplay View Modes:
  // 'setup' -> Birthplace Reel & Family Card
  // 'cockpit' -> Unified 3-column interactive simulation (Ages 0 to 63!)
  const [gamePhase, setGamePhase] = useState<'setup' | 'cockpit'>('setup');

  // Mobile layout switcher for 3 columns: 'profile' | 'log' | 'family'

  // Character & Family State
  const [charData, setCharData] = useState(() => generateRandomFamily());
  const birthYear = 1998;

  // Cinematic Birthplace Reel Animator
  const [isSpinning, setIsSpinning] = useState(false);
  const [slideIndex, setSlideIndex] = useState(() => {
    const idx = BIRTHPLACE_SLIDES.findIndex((s) => s.region === charData.family.region);
    return idx !== -1 ? idx : Math.floor(Math.random() * BIRTHPLACE_SLIDES.length);
  });
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 4 Core Attributes + Latent Traits + Dual Financial Accounts
  const [attrs, setAttrs] = useState<CharacterAttributes>(() => ({
    health: 55,
    happiness: 50,
    cognition: 20,
    social: 15,
    savings: charData.family.initialSavings,
    familySavings: charData.family.initialFamilySavings,
    inferiority: 25,
    academicCapital: 15,
    kinshipGuilt: 25,
    rebellion: 15,
    resilience: 30
  }));

  const [tags, setTags] = useState<string[]>([]);

  // Dynamic Timeline for the current character
  const [timeline, setTimeline] = useState<LifeEventNode[]>(() =>
    generateTimelineForCharacter(charData.family, charData.gender)
  );

  // Chronicle Log Feed
  const [logEntries, setLogEntries] = useState<ChronicleLogEntry[]>([]);
  const [timelineIndex, setTimelineIndex] = useState(0);

  // Auto-scroll anchor for middle column
  const feedBottomRef = useRef<HTMLDivElement>(null);
  const choiceCardRef = useRef<HTMLDivElement>(null);

  const scrollToFeedBottom = () => {
    setTimeout(() => {
      feedBottomRef.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'nearest' });
    }, 60);
  };

  const scrollToChoiceCard = () => {
    setTimeout(() => {
      if (choiceCardRef.current) {
        choiceCardRef.current.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'center' });
      } else {
        feedBottomRef.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'nearest' });
      }
    }, 80);
  };

  // Age 18 Gaokao Calculated Outcome state
  const [gaokaoCalc, setGaokaoCalc] = useState<GaokaoCalculation | null>(null);
  const [showGaokaoModal, setShowGaokaoModal] = useState(false);

  // Adult Path Selection state ('stay' | 'emigrate')
  const [chosenPath, setChosenPath] = useState<'stay' | 'emigrate'>('stay');

  // Copy success state
  const [copied, setCopied] = useState(false);

  // Unlocked Endings (Persisted in LocalStorage)
  const [unlockedEndings, setUnlockedEndings] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('escape_plan_unlocked_endings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showCodexModal, setShowCodexModal] = useState(false);

  // Auto-play state & Speed control (in seconds per year, volume-slider style)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(1.2);

  // Reader Font Size state ('normal' | 'large' | 'huge'), default to 'large' (comfort eye-care size)
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large' | 'huge'>(() => {
    try {
      return (localStorage.getItem('escape_plan_reader_font_size') as 'normal' | 'large' | 'huge') || 'large';
    } catch {
      return 'large';
    }
  });

  const handleSetFontSize = (size: 'normal' | 'large' | 'huge') => {
    setReaderFontSize(size);
    try {
      localStorage.setItem('escape_plan_reader_font_size', size);
    } catch {}
  };

  // 1in8b.life (80亿分之一) 风格：生平回忆录抽屉与终局对自己的赠言
  const [showMemoirDrawer, setShowMemoirDrawer] = useState(false);
  const [epitaphInput, setEpitaphInput] = useState('');
  const [epitaphConfirmed, setEpitaphConfirmed] = useState(false);

  // 早逝悲歌（抗洪殉职/心梗猝死/矽肺病故等）绝唱谢幕舞台确认状态
  // 彻底杜绝“0毫秒吞没早逝悲歌剧本文本”的心流致命Bug！
  const [mortalityAcknowledged, setMortalityAcknowledged] = useState(false);

  // Derived current age strictly driven by active timeline node
  const currentAge =
    gamePhase === 'setup'
      ? 0
      : timeline[timelineIndex]?.age ?? (logEntries[logEntries.length - 1]?.age || 0);

  // 终局与悲歌绝唱谢幕心流状态衍生（彻底避免早逝高光文本被 0 毫秒吞没）
  const isPremature = isPrematureMortality(logEntries);
  const isShowingMortalityClimax = isPremature && !mortalityAcknowledged;
  const isRetired = isSimulationEnded(logEntries) && (!isPremature || mortalityAcknowledged);

  // Confetti trigger once at Age 63 or non-tragic finale
  const confettiFiredRef = useRef(false);
  useEffect(() => {
    if (isRetired && !confettiFiredRef.current) {
      const isTragic = tags.some(
        (t) =>
          t.includes('心梗猝死') ||
          t.includes('抗洪殉职') ||
          t.includes('矽肺病故') ||
          t.includes('铁窗残生')
      );
      if (!isTragic) {
        confettiFiredRef.current = true;
        try {
          confetti({ disableForReducedMotion: true,
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  }, [isRetired, tags]);


  // Register newly unlocked ending into LocalStorage
  useEffect(() => {
    if (isRetired) {
      const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
      const finalVerdict = generateFinalLifetimeVerdict(chosenPath, currentTrack, attrs, tags, logEntries);
      if (!unlockedEndings.includes(finalVerdict.ending.id)) {
        const updated = [...unlockedEndings, finalVerdict.ending.id];
        setUnlockedEndings(updated);
        try {
          localStorage.setItem('escape_plan_unlocked_endings', JSON.stringify(updated));
        } catch {}
      }
    }
  }, [isRetired, chosenPath, gaokaoCalc, attrs, tags]);

  // 3-Slot Soul Imprints (人生核心灵魂烙印：少年精神底色 · 青年代价与执念 · 岁月终局归宿)
  const soulImprints = React.useMemo(() => {
    const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
    const careerSub = getCareerSubtrack(tags);
    return evaluateSoulImprints(
      currentAge,
      attrs,
      tags,
      chosenPath,
      currentTrack,
      careerSub,
      charData.family
    );
  }, [currentAge, attrs, tags, chosenPath, gaokaoCalc, charData.family]);

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
  const siblingStatus = getSiblingDynamicStatus(
    charData.family.siblingType || 'only_child',
    currentAge
  );

  // Active Crisis Detection
  const crisisWarning = detectCrisisWarning(attrs, tags);

  const currentNode = timeline[timelineIndex] || timeline[0];
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
        setTimeline(generateTimelineForCharacter(fresh.family, fresh.gender));
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
      if (waitingForChoice) {
        scrollToChoiceCard();
      } else {
        scrollToFeedBottom();
      }
    }
  }, [logEntries.length, waitingForChoice, gamePhase]);

  // =========================================================================
  // START SIMULATION FROM 0 YEARS OLD
  // =========================================================================
  const startSimulation = () => {
    const dynamicTimeline = generateTimelineForCharacter(charData.family, charData.gender);
    setTimeline(dynamicTimeline);

    const initialAttrs: CharacterAttributes = {
      health: 55,
      happiness: 50,
      cognition: 20,
      social: 15,
      savings: charData.family.initialSavings,
      familySavings: charData.family.initialFamilySavings,
      inferiority: 25,
      academicCapital: 15,
      kinshipGuilt: 25,
      rebellion: 15,
      resilience: 30
    };
    setAttrs(initialAttrs);
    setTags(['初临人间']);

    // Age 0 initial log
    const age0Node = dynamicTimeline[0];
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
      familySavings: prev.familySavings + (delta.familySavings || 0),
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
    // 1. 如果即将迈向或已处于17/18岁且尚未进行高考分流，优先触发高考结算
    if (!gaokaoCalc && (currentNode.age === 17 || currentAge === 17 || (!timeline[timelineIndex + 1] && currentAge <= 18))) {
      const calc = calculateGaokaoOutcome(attrs, tags, charData.family);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
      return;
    }

    const nextIdx = timelineIndex + 1;
    if (nextIdx >= timeline.length) {
      // 检查27岁是否需要挂载成年里程碑（兜底容错）
      if (currentNode.age === 27 && !isSimulationEnded(logEntries)) {
        const track = gaokaoCalc?.degreeTrack || 'double_non';
        const careerSub = getCareerSubtrack(tags);
        const adultMilestones = generateAdultMilestones(track, chosenPath, charData.family, careerSub, tags);
        const currentNodes = timeline.slice(0, timelineIndex + 1);
        setTimeline([...currentNodes, ...adultMilestones]);
        return;
      }
      // Reached end of simulation (Age 63)
      return;
    }

    const nextNode = timeline[nextIdx];

    // Check if Age 18 milestone trigger
    if ((nextNode.age >= 18 || currentNode.age === 17) && !gaokaoCalc) {
      const calc = calculateGaokaoOutcome(attrs, tags, charData.family);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
      return;
    }

    // Apply natural deltas & parental annual labor savings
    const combinedDelta: Partial<CharacterAttributes> = { ...(nextNode.naturalDelta || {}) };
    // 未成年期（0~17岁），父母在工农岗位持续劳动，每年有微薄家庭节余沉淀（扣除日常柴米油盐学费后）
    if (currentAge < 18 && combinedDelta.familySavings === undefined) {
      const tier = charData.family.wealthTier;
      const annualLaborSavings = tier.includes('小康') ? 5000 : tier.includes('入不敷出') ? -300 : tier.includes('留守') ? 800 : 1800;
      combinedDelta.familySavings = annualLaborSavings;
    }
    if (Object.keys(combinedDelta).length > 0) {
      applyDelta(combinedDelta);
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
      tagsAdded: nextNode.naturalTags,
      reflection: nextNode.reflection
    };

    setLogEntries((prev) => [...prev, newLog]);
    setTimelineIndex(nextIdx);
    scrollToFeedBottom();
  };

  // =========================================================================
  // SKIP DIRECTLY TO NEXT INTERACTIVE DECISION / MAJOR MILESTONE
  // =========================================================================
  const handleSkipToNextDecision = () => {
    if (waitingForChoice) return;
    if (isSimulationEnded(logEntries)) return;
    if (isAutoPlaying) setIsAutoPlaying(false);

    // If currently at 17yo or gaokao not resolved, trigger Gaokao directly
    if (!gaokaoCalc && (currentNode.age === 17 || currentAge === 17 || (!timeline[timelineIndex + 1] && currentAge <= 18))) {
      const calc = calculateGaokaoOutcome(attrs, tags, charData.family);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
      return;
    }

    let targetIdx = timelineIndex + 1;
    const accumulatedLogs: ChronicleLogEntry[] = [];
    let accumulatedDelta: Partial<CharacterAttributes> = {};
    const accumulatedTags: string[] = [];

    while (targetIdx < timeline.length) {
      const node = timeline[targetIdx];

      // Stop if reaching gaokao threshold
      if (!gaokaoCalc && (node.age >= 18 || currentNode.age === 17)) {
        break;
      }

      const isChoice = node.type === 'choice' && node.choices && node.choices.length > 0;
      const isMilestone = node.type === 'milestone' || node.age === 63;

      if (node.naturalDelta) {
        Object.entries(node.naturalDelta).forEach(([k, v]) => {
          accumulatedDelta[k as keyof CharacterAttributes] =
            (accumulatedDelta[k as keyof CharacterAttributes] || 0) + (v || 0);
        });
      }
      if (node.naturalTags) {
        accumulatedTags.push(...node.naturalTags);
      }

      accumulatedLogs.push({
        id: node.id,
        age: node.age,
        year: birthYear + node.age,
        stageName: node.stageName,
        title: node.title,
        scene: node.scene,
        type: node.type || 'natural',
        statDelta: node.naturalDelta,
        tagsAdded: node.naturalTags,
        reflection: node.reflection
      });

      if (isChoice || isMilestone) {
        break;
      }

      targetIdx++;
    }

    if (accumulatedLogs.length > 0) {
      if (Object.keys(accumulatedDelta).length > 0) applyDelta(accumulatedDelta);
      if (accumulatedTags.length > 0) setTags((prev) => Array.from(new Set([...prev, ...accumulatedTags])));
      setLogEntries((prev) => [...prev, ...accumulatedLogs]);
      setTimelineIndex(targetIdx);
      scrollToFeedBottom();
    } else if (!gaokaoCalc && (currentNode.age === 17 || currentAge === 17)) {
      const calc = calculateGaokaoOutcome(attrs, tags, charData.family);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
    }
  };

  // =========================================================================
  // SUBMIT PLAYER CHOICE
  // =========================================================================
  const handleSelectChoice = (choice: LifeChoice) => {
    const currentNode = timeline[timelineIndex];

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

    // ★★★ 二十一岁大四毕业抉择：精准定制后续 22~27 岁专属职场/学术轨迹 ★★★
    // 彻底杜绝“本科工作两年又突然硕士毕业签约”的严重逻辑矛盾！
    const allCurrentTags = Array.from(new Set([...tags, ...(choice.addTags || [])]));
    if (currentNode.age === 21) {
      const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
      const tailoredNodes = getTailoredCareerSubtrackNodes(
        currentTrack,
        choice.text,
        charData.family,
        allCurrentTags
      );
      if (tailoredNodes && tailoredNodes.length > 0) {
        const upTo21 = timeline.slice(0, timelineIndex + 1);
        setTimeline([...upTo21, ...tailoredNodes]);
      }
    }

    // ★★★ 二十七岁关键岔路口抉择：因果无缝延展至 30~63 岁成年篇章 ★★★
    if (currentNode.age === 27) {
      const isEmigrate =
        choice.text.includes('出海') ||
        choice.text.includes('海外') ||
        choice.text.includes('波斯湾') ||
        choice.text.includes('中东') ||
        choice.text.includes('异邦') ||
        choice.text.includes('跨国') ||
        choice.text.includes('异国') ||
        choice.text.includes('劳务') ||
        (choice.addTags &&
          choice.addTags.some(
            (t) =>
              t.includes('出海') ||
              t.includes('海外') ||
              t.includes('异邦') ||
              t.includes('大工匠') ||
              t.includes('血汗还债')
          ));
      const path: 'emigrate' | 'stay' = isEmigrate ? 'emigrate' : 'stay';
      setChosenPath(path);

      const track = gaokaoCalc?.degreeTrack || 'double_non';
      const careerSub = getCareerSubtrack(allCurrentTags);
      const adultMilestones = generateAdultMilestones(track, path, charData.family, careerSub, allCurrentTags);

      // 将后续30, 35, 42, 52, 63岁里程碑直接串接进时间线，三栏交互彻底统一！
      const currentNodes = timeline.slice(0, timelineIndex + 1);
      setTimeline([...currentNodes, ...adultMilestones]);
    }

    // ★★★ 成年篇章（28~63岁）因果分支拦截：彻底消除“选了大集团维保督导，下一步却变成工坊被查封”等严重逻辑矛盾！★★★
    const tailoredAdultNodes = getTailoredAdultChoiceBranch(
      currentNode.id,
      choice.text,
      allCurrentTags,
      charData.family
    );
    if (tailoredAdultNodes && tailoredAdultNodes.length > 0) {
      const currentNodes = timeline.slice(0, timelineIndex + 1);
      setTimeline([...currentNodes, ...tailoredAdultNodes]);
    }

    // 无论哪个年龄段抉择，都让玩家看清抉择反馈与属性变化，统一通过底部操作栏“迈入下一岁”从容前行
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

    // ★★★ 动态因果分轨：根据高考结果(985/双非/大专)重构后续19~27岁人生时间线 ★★★
    const careerNodes = generateCareerTimeline(
      charData.family,
      gaokaoCalc.degreeTrack,
      option.addTags || []
    );

    // 保留0~18岁已走过的历史，把19~27岁换为完全契合学历阶层的专属人生
    const upTo18 = timeline.filter((n) => n.age <= 18);
    const updatedTimeline = [...upTo18, ...careerNodes];
    setTimeline(updatedTimeline);

    // 迈入19岁
    const node19 = careerNodes[0];
    if (node19) {
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
        type: node19.type || 'natural',
        statDelta: node19.naturalDelta,
        tagsAdded: node19.naturalTags
      };
      setLogEntries((prev) => [...prev, log19]);
      const age19Idx = updatedTimeline.findIndex((n) => n.id === node19.id);
      setTimelineIndex(age19Idx !== -1 ? age19Idx : upTo18.length);
    }
    scrollToFeedBottom();
  };

  const handleRestart = (targetProvince?: string | unknown) => {
    confettiFiredRef.current = false;
    setIsAutoPlaying(false);
    const prov = typeof targetProvince === 'string' ? targetProvince : undefined;
    const fresh = generateRandomFamily(prov);
    setCharData(fresh);
    setTimeline(generateTimelineForCharacter(fresh.family, fresh.gender));
    const matchIdx = BIRTHPLACE_SLIDES.findIndex((s) => s.region === fresh.family.region);
    if (matchIdx !== -1) setSlideIndex(matchIdx);
    setAttrs({
      health: 85,
      happiness: 80,
      cognition: 25,
      social: 25,
      savings: fresh.family.initialSavings,
      familySavings: fresh.family.initialFamilySavings,
      inferiority: 20,
      academicCapital: 20,
      kinshipGuilt: 25,
      rebellion: 25,
      resilience: 25
    });
    setGamePhase('setup');
    setGaokaoCalc(null);
    setShowGaokaoModal(false);
    setChosenPath('stay');
    setLogEntries([]);
    setTags([]);
    setEpitaphInput('');
    setEpitaphConfirmed(false);
    setShowMemoirDrawer(false);
    setMortalityAcknowledged(false);
  };

  // =========================================================================
  // AUTO-PLAY ENGINE (PERSISTENT INTENT: SUSPEND ON CHOICE, AUTO-RESUME ON SELECTION)
  // =========================================================================
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (gamePhase !== 'cockpit') {
      setIsAutoPlaying(false);
      return;
    }
    // Fully completed or at mortality climax: suspend immediately
    if (isSimulationEnded(logEntries) || isShowingMortalityClimax) {
      setIsAutoPlaying(false);
      return;
    }
    // Suspend timer while waiting for user choice or Gaokao decision, WITHOUT turning off auto-play!
    if (waitingForChoice || showGaokaoModal || showMemoirDrawer || showCodexModal) {
      return;
    }

    const timer = setTimeout(() => {
      handleNextNaturalYear();
    }, autoPlaySpeed * 1000);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, autoPlaySpeed, timelineIndex, waitingForChoice, showGaokaoModal, gamePhase, logEntries.length, isShowingMortalityClimax, showMemoirDrawer, showCodexModal]);

  // =========================================================================
  // GLOBAL KEYBOARD SHORTCUTS (Space: Next / 1-4: Choice / A: Auto-play)
  // =========================================================================
  useEffect(() => {
    if (gamePhase !== 'cockpit') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showMemoirDrawer || showCodexModal) return;
      // Ignore if user is inside an input/textarea
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'BUTTON' ||
          document.activeElement.tagName === 'A' ||
          document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      // Space / Enter: Advance year or acknowledge mortality or stop auto-play
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        if (isAutoPlaying) {
          setIsAutoPlaying(false);
          return;
        }
        if (isShowingMortalityClimax) {
          setMortalityAcknowledged(true);
          try {
            confetti({ disableForReducedMotion: true, particleCount: 65, spread: 75, origin: { y: 0.6 } });
          } catch {}
          return;
        }
        if (!waitingForChoice && !showGaokaoModal && !isSimulationEnded(logEntries)) {
          handleNextNaturalYear();
        }
        return;
      }

      // Key 'a' or 'A': Toggle Auto Play
      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (!waitingForChoice && !showGaokaoModal && !isSimulationEnded(logEntries) && !isShowingMortalityClimax) {
          setIsAutoPlaying((prev) => !prev);
        }
        return;
      }

      // Number keys 1, 2, 3, 4: Directly pick active choice
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (waitingForChoice && currentNode.choices && currentNode.choices[idx]) {
          e.preventDefault();
          handleSelectChoice(currentNode.choices[idx]);
          return;
        }
        if (showGaokaoModal && gaokaoCalc?.firstStepChoice?.options && gaokaoCalc.firstStepChoice.options[idx]) {
          e.preventDefault();
          handleConfirmGaokaoStep(gaokaoCalc.firstStepChoice.options[idx]);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gamePhase, waitingForChoice, showGaokaoModal, isAutoPlaying, timelineIndex, currentNode, gaokaoCalc, logEntries.length, isShowingMortalityClimax, showMemoirDrawer, showCodexModal]);


  const handleCopyRecord = () => {
    const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
    const finalVerdict = generateFinalLifetimeVerdict(chosenPath, currentTrack, attrs, tags, logEntries);
    const imprintsText = soulImprints
      .filter((i) => i.isUnlocked)
      .map((i) => `🏅 ${i.title}（${i.phaseName}）\n   ${i.subtitle}\n   “${i.quote}”`)
      .join('\n\n');

    const text = `【未走的那条路 · 一生因果纪要档案】
代号/姓名：${charData.name}（${charData.gender}）
出生地：${charData.family.province ? `${charData.family.province} · ` : ""}${charData.family.region}（${birthYear}年）
阶层背景：${charData.family.wealthTier}
求学与职业轨道：${
      currentTrack === '985_211'
        ? '985/211 核心技术与学术精英'
        : currentTrack === 'junior_college'
        ? '公办职教 实用蓝领工匠'
        : '普通双非 务实业务骨干'
    }
人生航道：${chosenPath === 'emigrate' ? '奔赴异邦开拓' : '扎根故土深耕'}
终局个人资产：¥${attrs.savings.toLocaleString()}\n老家父母储备：¥${attrs.familySavings.toLocaleString()}

🏅 六十三载核心灵魂烙印：
${imprintsText}

🏆 达成终局：No.${finalVerdict.ending.number < 10 ? '0' : ''}${finalVerdict.ending.number} ${finalVerdict.ending.title} [${finalVerdict.ending.rarity}]
${finalVerdict.ending.tagline}
${finalVerdict.ending.description}

📊 五维人生格局：
• 财富充裕：${finalVerdict.radar.wealth} / 100
• 身心康宁：${finalVerdict.radar.health} / 100
• 见识格局：${finalVerdict.radar.cognition} / 100
• 自由旷野：${finalVerdict.radar.autonomy} / 100
• 亲族温度：${finalVerdict.radar.kinship} / 100

🎖️ 斩获人生成就：
${finalVerdict.achievements.map((a) => `[${a.title}] ${a.description}`).join('\n')}
${epitaphConfirmed && epitaphInput ? `\n💬 终局对自己的寄语：\n“${epitaphInput}”\n` : ''}
📜 生平关键年轮与抉择轨迹：
${logEntries
  .map(
    (e) =>
      `[${e.age}岁·${e.year}年] ${e.title}${
        e.chosenOptionText ? ` ➔ 抉择：${e.chosenOptionText}` : ''
      }${e.reflection ? ` ➔ 体悟：${e.reflection}` : ''}`
  )
  .join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: BIRTHPLACE REEL SETUP SCREEN
  // =========================================================================
  if (gamePhase === 'setup') {
    const currentSlide = isSpinning
      ? BIRTHPLACE_SLIDES[slideIndex] || BIRTHPLACE_SLIDES[0]
      : BIRTHPLACE_SLIDES.find((s) => s.region === charData.family.region) ||
        BIRTHPLACE_SLIDES[slideIndex] ||
        BIRTHPLACE_SLIDES[0];

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-year-enter">
        <h1 className={`text-xl sm:text-2xl font-semibold mb-6 ${isLight ? "text-stone-900" : "text-stone-100"}`}>
          人生模拟
        </h1>

        {/* Slot Reel */}
        <div className={`border rounded-2xl p-5 sm:p-7 shadow-xl mb-6 transition-colors ${
          isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#12141C] border-white/[0.07] text-stone-100"
        }`}>
          <div className={`flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm mb-4 border-b pb-3 font-reading-sans ${
            isLight ? "text-stone-500 border-stone-200" : "text-stone-400 border-white/[0.06]"
          }`}>
            <span className="flex shrink-0 items-center gap-2 text-[#D4A359] font-medium">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full bg-[#D4A359] ${
                  isSpinning ? "animate-pulse" : ""
                }`}
              />
              {isSpinning ? "正在随机匹配出生地..." : "出生地已确定"}
            </span>
            <span className={`font-narrative-serif font-semibold ${isLight ? "text-stone-800" : "text-stone-200"}`}>
              {isSpinning ? "定位中..." : charData.family.region}
            </span>
          </div>

          <div className={`relative overflow-hidden min-h-[7rem] sm:min-h-[8rem] px-3 py-4 rounded-xl border flex items-center justify-center ${
            isLight ? "bg-stone-50 border-stone-200" : "bg-[#0A0B0E] border-white/[0.08]"
          }`}>
            <div
              className={`text-center transition-all duration-150 ${
                isSpinning ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-1">{currentSlide.icon}</div>
              <div className={`text-lg sm:text-xl font-bold tracking-wide font-narrative-serif ${
                isLight ? "text-stone-900" : "text-stone-100"
              }`}>
                {currentSlide.region}
              </div>
              <div className="text-xs sm:text-sm text-[#D4A359]/90 mt-1 font-narrative-serif">
                {currentSlide.landscape}
              </div>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2.5 font-reading-sans ${
            isLight ? "border-stone-200 text-stone-600" : "border-white/[0.06] text-stone-400"
          }`}>
            <div className="flex items-center gap-2">
              <SpringButton
                onClick={handleToggleTheme}
                className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5  ${
                  isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-[#181B26] hover:bg-[#1E2230] border-white/[0.08] text-stone-200"
                }`}
                title={isLight ? "切换为深色模式" : "切换为浅色模式"}
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>深色</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>浅色</span>
                  </>
                )}
              </SpringButton>
              <SpringButton
                onClick={spinReel}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50  ${
                  isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-[#181B26] hover:bg-[#1E2230] border-white/[0.08] text-stone-200"
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 text-amber-400 ${isSpinning ? "animate-spin" : ""}`} />
                重新生成
              </SpringButton>
            </div>
          </div>
        </div>

        {/* Dossier Card */}
        <div className={`border rounded-2xl p-5 sm:p-7 shadow-xl space-y-5 transition-colors ${
          isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#12141C] border-white/[0.07] text-stone-100"
        }`}>
          <div className={`flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4 ${
            isLight ? "border-stone-200" : "border-white/[0.06]"
          }`}>
            <div>
              <span className="text-xs font-mono-num text-[#D4A359] uppercase tracking-wider block mb-1">
                初始档案 · 0 岁
              </span>
              <h2 className={`text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-3 font-narrative-serif ${
                isLight ? "text-stone-900" : "text-stone-100"
              }`}>
                <span className="whitespace-nowrap">{charData.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-md border font-reading-sans font-normal whitespace-nowrap ${
                  isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-[#181B26] border-white/[0.08] text-stone-300"
                }`}>
                  {charData.gender} · 1998年生
                </span>
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className={`text-xs block font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>家庭资产</span>
              <span className={`text-xs sm:text-sm font-semibold font-narrative-serif ${isLight ? "text-amber-900" : "text-[#D4A359]"}`}>
                {charData.family.wealthTier}
              </span>
              <span className={`text-[11px] font-mono-num block mt-0.5 font-medium ${isLight ? "text-teal-700" : "text-teal-400"}`}>
                家庭初始存款：¥{charData.family.initialFamilySavings.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Birthplace Location Header */}
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-wrap items-center justify-between gap-2 transition-colors ${
            isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06] text-stone-200"
          }`}>
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{currentSlide.icon}</span>
              <div>
                <div className={`font-semibold text-xs sm:text-sm font-reading-sans ${
                  isLight ? "text-stone-900" : "text-stone-100"
                }`}>
                  降生属地：{charData.family.province ? `${charData.family.province} · ` : ""}{charData.family.cityOrCounty}
                </div>
                <div className={`text-[11px] font-reading-sans ${
                  isLight ? "text-stone-500" : "text-stone-400"
                }`}>
                  出生医院：{charData.family.hospitalName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <SpringButton
                onClick={() => handleRestart(charData.family.province)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors flex items-center gap-1  ${
                  isLight
                    ? "bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950 shadow-sm font-semibold"
                    : "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300 shadow-sm font-semibold"
                }`}
                title="同省重抽：切换到本省另一个截然不同的出生地、医院与家庭背景"
              >
                <RotateCcw className="w-3 h-3 text-amber-500" />
                <span>同省重抽</span>
              </SpringButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className={`p-4 rounded-xl border space-y-2 transition-colors ${
              isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
            }`}>
              <div className={`font-semibold flex items-center gap-2.5 font-reading-sans ${
                isLight ? "text-amber-900" : "text-amber-300"
              }`}>
                <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span>父亲：{charData.family.fatherAge}岁 · {charData.family.fatherJob}</span>
              </div>
              <p className={`leading-relaxed text-xs sm:text-[13px] font-reading-sans pl-[34px] ${
                isLight ? "text-stone-700" : "text-stone-300"
              }`}>
                {charData.family.fatherTrait}
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 transition-colors ${
              isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
            }`}>
              <div className={`font-semibold flex items-center gap-2.5 font-reading-sans ${
                isLight ? "text-rose-800" : "text-rose-300"
              }`}>
                <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <span>母亲：{charData.family.motherAge}岁 · {charData.family.motherJob}</span>
              </div>
              <p className={`leading-relaxed text-xs sm:text-[13px] font-reading-sans pl-[34px] ${
                isLight ? "text-stone-700" : "text-stone-300"
              }`}>
                {charData.family.motherTrait}
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 transition-colors ${
              isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
            }`}>
              <div className={`font-semibold flex items-center justify-between font-reading-sans ${
                isLight ? "text-teal-800" : "text-teal-300"
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <Home className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span>居住环境与家庭储备</span>
                </div>
                <span className={`text-xs font-mono-num font-semibold ${
                  isLight ? "text-teal-800" : "text-teal-300"
                }`}>
                  底蓄 ¥{charData.family.initialFamilySavings.toLocaleString()}
                </span>
              </div>
              <p className={`text-xs sm:text-[13px] leading-relaxed font-reading-sans pl-[34px] ${
                isLight ? "text-stone-700" : "text-stone-300"
              }`}>
                {charData.family.housing}
              </p>
              <p className={`text-xs mt-1 font-reading-sans pl-[34px] ${
                isLight ? "text-stone-600" : "text-stone-400"
              }`}>{charData.family.wealthDetail}</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 transition-colors ${
              isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
            }`}>
              <div className={`font-semibold flex items-center gap-2.5 font-reading-sans ${
                isLight ? "text-sky-800" : "text-sky-300"
              }`}>
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <span>家庭成员</span>
              </div>
              <p className={`text-xs sm:text-[13px] leading-relaxed font-reading-sans pl-[34px] ${
                isLight ? "text-stone-700" : "text-stone-300"
              }`}>
                {charData.family.siblings} — {charData.family.siblingsDetail}
              </p>
              <p className={`text-xs mt-1 font-reading-sans pl-[34px] ${
                isLight ? "text-amber-800 font-medium" : "text-[#D4A359]/90"
              }`}>{charData.family.emotionalTone}</p>
            </div>
          </div>

          <div className={`pt-3 border-t flex justify-end ${
            isLight ? "border-stone-200" : "border-white/[0.06]"
          }`}>
            <SpringButton
              onClick={startSimulation}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40  font-narrative-serif tracking-wide"
            >
              <span>开始模拟</span>
              <ArrowRight className="w-4 h-4" />
            </SpringButton>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 3-COLUMN COCKPIT INTERACTIVE SIMULATION
  // =========================================================================

  const getNextStepLabel = () => {
    if (!gaokaoCalc && (currentNode?.age === 17 || currentAge === 17)) {
      return "十八岁 · 高考放榜与成人分流";
    }
    const nextNode = timeline[timelineIndex + 1];
    if (nextNode) {
      if (nextNode.age === 18 && !gaokaoCalc) {
        return "十八岁 · 高考放榜与成人分流";
      }
      const cleanStage = nextNode.stageName ? nextNode.stageName.split('·')[0].trim() : '';
      if (nextNode.age > currentAge + 1) {
        return `迈向 ${nextNode.age} 岁 · ${cleanStage || nextNode.title || '新征途'}`;
      }
      return `迈入下一岁 · ${currentAge + 1} 岁`;
    }
    if (currentNode?.age === 27 && !isSimulationEnded(logEntries)) {
      return "迈向三十岁 · 而立之年";
    }
    return "下一年";
  };

  const getChoicePresentation = (choice: LifeChoice) => {
    return {
      text: choice.text,
      detail: choice.detail,
    };
  };

  // Derived state for 1-in-8-billion (十四亿分之一) single-stage memoir theatre
  const currentEntry: ChronicleLogEntry =
    logEntries[logEntries.length - 1] || {
      id: currentNode?.id || 'age_0',
      age: currentAge,
      year: birthYear + currentAge,
      stageName: currentNode?.stageName || '启蒙之年',
      title: currentNode?.title || '生命的序章',
      scene: currentNode?.scene || '时间的齿轮缓缓转动...',
      type: 'natural'
    };
  const isWaitingCurrentChoice = !isRetired && !isShowingMortalityClimax && waitingForChoice;
  const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
  const finalVerdict = isRetired
    ? generateFinalLifetimeVerdict(chosenPath, currentTrack, attrs, tags, logEntries)
    : null;

  const getChapterName = (age: number) => {
    if (age <= 6) return '启蒙韶华 · 故土暖阳';
    if (age <= 12) return '故土童年 · 金色麦浪';
    if (age <= 18) return '应试青衿 · 寒窗苦读';
    if (age <= 22) return '象牙塔尖 · 青年求索';
    if (age <= 30) return '初入社会 · 奋斗风云';
    if (age <= 48) return '中流砥柱 · 沉浮现实';
    if (age <= 55) return '天命不惑 · 炉火微光';
    return '从心之年 · 暮雪残阳';
  };

  // 时代与心境五大年代动态光影呼吸系统（沉浸烘托时代重量）
  const getEpochAuraStyle = () => {
    if (isShowingMortalityClimax) {
      return isLight
        ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(254,226,226,0.85),rgba(248,244,240,1))]"
        : "bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(65,12,18,0.45),rgba(7,7,12,1))]";
    }
    if (currentAge <= 12) {
      // 0~12 故土暖阳 (Warm Amber Sunlight)
      return isLight
        ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(254,243,199,0.7),rgba(248,245,238,1))]"
        : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(55,38,18,0.45),rgba(8,7,10,1))]";
    }
    if (currentAge <= 18) {
      // 13~18 应试青衿 (Deep Slate & Ink Blue)
      return isLight
        ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(224,242,254,0.7),rgba(245,247,250,1))]"
        : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(18,30,52,0.5),rgba(6,8,14,1))]";
    }
    if (currentAge <= 30) {
      // 19~30 奋斗风云 (Dynamic Career Atmosphere)
      const hasOverseas = tags.some((t) => t.includes('海外') || t.includes('苦力') || t.includes('大工匠'));
      const hasTech = tags.some((t) => t.includes('大厂') || t.includes('研发') || t.includes('算法') || t.includes('做题家'));
      const hasGov = tags.some((t) => t.includes('选调') || t.includes('体制') || t.includes('公职') || t.includes('政务'));

      if (hasOverseas) {
        return isLight
          ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(254,235,200,0.75),rgba(248,242,232,1))]"
          : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(60,36,14,0.5),rgba(12,8,6,1))]";
      }
      if (hasTech) {
        return isLight
          ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(224,231,255,0.65),rgba(246,247,252,1))]"
          : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(18,28,68,0.52),rgba(5,7,14,1))]";
      }
      if (hasGov) {
        return isLight
          ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(254,226,226,0.6),rgba(248,245,242,1))]"
          : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(48,20,22,0.45),rgba(10,7,9,1))]";
      }
      return isLight
        ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(240,243,250,0.7),rgba(248,246,242,1))]"
        : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(22,28,48,0.5),rgba(7,8,14,1))]";
    }
    if (currentAge <= 48) {
      // 31~48 中流砥柱 (Smoky Charcoal & Brass Reality)
      return isLight
        ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(245,240,235,0.8),rgba(245,243,240,1))]"
        : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(32,28,26,0.55),rgba(7,7,8,1))]";
    }
    // 49~63 暮雪残阳 (Twilight Hearth & Winter Embers)
    return isLight
      ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(254,242,242,0.65),rgba(247,245,245,1))]"
      : "bg-[radial-gradient(ellipse_85%_65%_at_50%_40%,rgba(40,30,35,0.45),rgba(8,7,9,1))]";
  };

  const formatMoney = (val: number) => {
    const isNeg = val < 0;
    const abs = Math.abs(val);
    const prefix = isNeg ? '-¥' : '¥';
    if (abs >= 10000) {
      return `${prefix}${(abs / 10000).toFixed(1)}万`;
    }
    return `${prefix}${abs.toLocaleString()}`;
  };

  const getFontSizeClass = () => {
    if (readerFontSize === 'huge') {
      return 'text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose';
    }
    if (readerFontSize === 'large') {
      return 'text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed';
    }
    return 'text-sm sm:text-base md:text-lg leading-normal sm:leading-relaxed';
  };

  return (
    <div className={`simulator-viewport flex flex-col font-reading-sans overflow-hidden transition-colors duration-300 relative select-none ${
      isLight ? "bg-[#FAF8F5] text-stone-900" : "bg-[#06070B] text-stone-100"
    }`}>
      {/* ================================================================= */}
      {/* 1. UNIFIED HORIZON HUD (流光天际线 · 导航与微光长廊与生命态势融为一体)   */}
      {/* ================================================================= */}
      <header className={`simulator-hud shrink-0 text-xs transition-colors duration-200 z-20 relative backdrop-blur-md ${
        isLight ? "bg-white/85 text-stone-700 shadow-sm" : "bg-[#0A0C14]/85 text-stone-300"
      }`}>
        {/* Horizon 0~63 Lifeline Progress Track as Header Bottom Line */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] overflow-visible ${
          isLight ? "bg-stone-200/60" : "bg-white/[0.06]"
        }`}>
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-[#D4A359] to-[#F3C87A] transition-all duration-300 relative shadow-[0_0_8px_rgba(212,163,89,0.5)]"
            style={{ width: `${Math.min(100, Math.max(0, (currentAge / 63) * 100))}%` }}
          >
            {/* Glowing Head Pin */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white dark:ring-stone-900 shadow-md animate-pulse" />
          </div>

          {/* Milestone tick marks along bottom border */}
          {[18, 21, 27, 35, 52].map((age) => {
            const leftPct = (age / 63) * 100;
            const isPassed = currentAge >= age;
            return (
              <span
                key={age}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full pointer-events-none transition-all ${
                  isPassed ? "bg-amber-400 scale-100" : isLight ? "bg-stone-300 scale-75" : "bg-stone-700 scale-75"
                }`}
                style={{ left: `${leftPct}%` }}
              />
            );
          })}
        </div>

        {/* Left: Brand & Identity Dossier Pill */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#D4A359]/20 to-[#C29348]/10 border border-[#D4A359]/30 text-[#D4A359] font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-narrative-serif tracking-wider text-[11px] sm:text-xs">{charData.name}</span>
          </div>

          <div className="hidden min-w-0 lg:flex items-center gap-1.5 text-[11px] font-reading-sans">
            <span title={`${charData.family.province || charData.family.region.split('·')[0].trim()} · ${charData.family.cityOrCounty}`} className={`min-w-0 truncate px-2 py-0.5 rounded-md border ${
              isLight ? "bg-stone-100/80 border-stone-300/80 text-stone-700" : "bg-white/[0.04] border-white/[0.08] text-stone-300"
            }`}>
              {charData.family.province || charData.family.region.split('·')[0].trim()} · {charData.family.cityOrCounty}
            </span>
            <span className={`shrink-0 px-2 py-0.5 rounded-md border ${
              isLight ? "bg-stone-100/80 border-stone-300/80 text-stone-700" : "bg-white/[0.04] border-white/[0.08] text-stone-300"
            }`}>
              {charData.gender}
            </span>
            <span className={`shrink-0 px-2 py-0.5 rounded-md border ${
              isLight ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-[#D4A359]/10 border-[#D4A359]/25 text-[#D4A359]"
            }`}>
              {charData.family.wealthTier}
            </span>
          </div>
        </div>

        {/* Center: Current Year & Integrated Vital Indicators */}
        <div className="simulator-status flex flex-col items-center justify-center gap-0.5">
          <div className="flex items-center gap-2">
            <span className={`font-semibold flex items-center gap-1.5 font-narrative-serif text-xs sm:text-sm ${
              isLight ? "text-stone-900" : "text-stone-100"
            }`}>
              <Calendar className="w-3.5 h-3.5 text-[#E0B26A]" />
              公历 {birthYear + currentAge} 年 · {currentAge} 岁
            </span>
            <span className={`text-[10px] px-1.5 py-[0.05rem] rounded font-narrative-serif border ${
              isLight
                ? "bg-stone-100 border-stone-200 text-stone-600"
                : "bg-white/[0.04] border-white/[0.08] text-stone-400"
            }`}>
              {getChapterName(currentAge)}
            </span>
          </div>

          {/* Micro Ambient Vital Signs Ribbon */}
          <div className="flex items-center gap-x-2.5 sm:gap-x-3.5 text-[10px] sm:text-[11px] font-mono-num text-stone-400">
            <div className="flex items-center gap-1" title={`体魄 ${attrs.health}/100`}>
              <HeartPulse className="w-3 h-3 text-rose-500" />
              <span className="font-semibold text-stone-600 dark:text-stone-300">{attrs.health}</span>
            </div>
            <div className="flex items-center gap-1" title={`见识 ${attrs.cognition}/100`}>
              <Brain className="w-3 h-3 text-sky-400" />
              <span className="font-semibold text-stone-600 dark:text-stone-300">{attrs.cognition}</span>
            </div>
            <div className="flex items-center gap-1" title={`幸福 ${attrs.happiness}/100`}>
              <Smile className="w-3 h-3 text-amber-400" />
              <span className="font-semibold text-stone-600 dark:text-stone-300">{attrs.happiness}</span>
            </div>
            <div className="flex items-center gap-1" title={`人脉 ${attrs.social}/100`}>
              <Users className="w-3 h-3 text-indigo-400" />
              <span className="font-semibold text-stone-600 dark:text-stone-300">{attrs.social}</span>
            </div>
            <div className="flex items-center gap-1" title="个人当前现金">
              <Coins className="w-3 h-3 text-emerald-500" />
              <span className={`font-semibold ${attrs.savings < 0 ? "text-rose-500 font-bold" : "text-emerald-600 dark:text-emerald-400"}`}>
                {formatMoney(attrs.savings)}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1" title="老家父母节余/底资">
              <Home className="w-3 h-3 text-amber-500" />
              <span className="font-semibold text-stone-600 dark:text-stone-300">{formatMoney(attrs.familySavings)}</span>
            </div>

            {/* Crisis Warning Pill */}
            {crisisWarning && (
              <span className="flex items-center gap-1 px-1.5 py-[0.05rem] rounded bg-rose-500/10 text-rose-500 text-[10px] font-sans font-medium animate-pulse">
                <AlertTriangle className="w-2.5 h-2.5" />
                <span>{crisisWarning.title}</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          {/* Ending Codex Trigger */}
          <SpringButton
            onClick={() => setShowCodexModal(true)}
            className={`px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isLight
                ? "bg-stone-100/80 hover:bg-stone-200 border-stone-300 text-stone-700"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300"
            }`}
            title="16种终局图鉴"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">终局</span>
            <span className="font-mono-num">{unlockedEndings.length}/16</span>
          </SpringButton>

          {/* Font Size Toggle */}
          <SpringButton
            onClick={() => handleSetFontSize(readerFontSize === 'normal' ? 'large' : readerFontSize === 'large' ? 'huge' : 'normal')}
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isLight
                ? "bg-stone-100/80 hover:bg-stone-200 border-stone-300 text-stone-700"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300"
            }`}
            title="切换字号（标准 / 大字 / 特大）"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{readerFontSize === 'normal' ? '标准' : readerFontSize === 'large' ? '大字' : '特大'}</span>
          </SpringButton>

          {/* Theme Toggle */}
          <SpringButton
            onClick={handleToggleTheme}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight
                ? "bg-stone-100/80 hover:bg-stone-200 border-stone-300 text-stone-700"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300"
            }`}
            title="切换明暗主题"
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
          </SpringButton>

          {/* Restart */}
          <SpringButton
            onClick={() => handleRestart()}
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isLight
                ? "bg-stone-100/80 hover:bg-rose-50 border-stone-300 text-stone-700 hover:text-rose-700 hover:border-rose-300"
                : "bg-white/[0.05] hover:bg-rose-950/30 border-white/[0.08] text-stone-300 hover:text-rose-400 hover:border-rose-800/40"
            }`}
            title="重新生成角色"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重开</span>
          </SpringButton>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 4. MAIN STAGE THEATRE (核心单幕剧场 · 时代动态光影与宣纸/黑曜材质)     */}
      {/* ================================================================= */}
      <main className={`flex-1 overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8 pt-1 sm:pt-2 pb-48 sm:pb-56 relative transition-colors duration-700 ${getEpochAuraStyle()}`}>
        {/* =============================================================== */}
        {/* VIEW A: 终局人生纪念卡 (80亿分之一 标志性生平画卷)                */}
        {/* =============================================================== */}
        {isRetired && finalVerdict ? (
          <div className={`w-full max-w-3xl rounded-3xl border p-6 sm:p-9 lg:p-10 space-y-7 shadow-2xl relative transition-all duration-300 mt-1 sm:mt-2 mb-8 animate-year-enter overflow-hidden ${
            isLight
              ? "bg-[#FAF8F5]/98 border-amber-900/20 shadow-amber-950/10 text-stone-900"
              : "bg-[#0E1019]/98 border-[#D4A359]/30 shadow-black/90 text-stone-100"
          }`}>
            {/* Top Ornamental Ribbon */}
            <div className="flex items-center justify-between border-b pb-4 border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono-num border ${
                  finalVerdict.ending.rarity === 'SSR'
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                    : finalVerdict.ending.rarity === 'SR'
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    : "bg-sky-500/20 text-sky-400 border-sky-500/40"
                }`}>
                  稀有度 [{finalVerdict.ending.rarity}]
                </span>
                <span className="text-xs font-narrative-serif text-[#D4A359] font-semibold">
                  终局 No.{finalVerdict.ending.number < 10 ? '0' : ''}{finalVerdict.ending.number} · {finalVerdict.ending.title}
                </span>
              </div>
              <span className="text-xs text-stone-500 font-reading-sans">0 ~ {lastLogEntry?.age || currentAge}岁 生平盖印</span>
            </div>

            {/* Grand Summary Title & Tagline */}
            <div className="text-center space-y-2">
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-narrative-serif tracking-wide ${
                isLight ? "text-stone-900" : "text-[#D4A359]"
              }`}>
                “{finalVerdict.summaryTitle}”
              </h1>
              <p className={`text-sm sm:text-base italic font-narrative-serif ${
                isLight ? "text-stone-600" : "text-stone-400"
              }`}>
                {finalVerdict.tagline}
              </p>
            </div>

            {/* Radar Chart & Key Lifetime Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
              <div className="flex flex-col items-center">
                <RadarChart radar={finalVerdict.radar} isLight={isLight} />
                <span className="text-[11px] text-stone-500 mt-1 font-narrative-serif">人生五维格局罗盘</span>
              </div>

              <div className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 text-xs font-reading-sans ${
                isLight ? "bg-white/80 border-stone-200" : "bg-[#141724] border-white/[0.08]"
              }`}>
                <div className="text-xs font-bold text-[#D4A359] border-b pb-1.5 border-amber-500/20 font-narrative-serif">
                  终局关键生平资产
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">终局身价储备：</span>
                  <span className="font-mono-num font-bold text-emerald-500 text-sm">{formatMoney(attrs.savings)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">老家父母底资：</span>
                  <span className="font-mono-num font-bold text-sm">{formatMoney(attrs.familySavings)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">身心康宁：</span>
                  <span className="font-mono-num font-semibold">{attrs.health}/100 ({getHealthDesc(attrs.health)})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">见识格局：</span>
                  <span className="font-mono-num font-semibold">{attrs.cognition}/100 ({getCognitionDesc(attrs.cognition)})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">幸福自洽：</span>
                  <span className="font-mono-num font-semibold">{attrs.happiness}/100 ({getHappinessDesc(attrs.happiness)})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">四海人脉：</span>
                  <span className="font-mono-num font-semibold">{attrs.social}/100 ({getSocialDesc(attrs.social)})</span>
                </div>
              </div>
            </div>

            {/* 3 Soul Imprints */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold text-[#D4A359] font-narrative-serif flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                三项人生核心灵魂烙印
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {soulImprints.map((imp, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                      imp.isUnlocked
                        ? isLight
                          ? "bg-amber-50/60 border-amber-300/70 text-stone-800"
                          : "bg-[#181B28] border-[#D4A359]/30 text-stone-200"
                        : "opacity-40 border-dashed"
                    }`}
                  >
                    <div className="text-[10px] text-[#D4A359] font-narrative-serif">{imp.title}</div>
                    <div className="text-xs font-bold font-narrative-serif">{imp.subtitle}</div>
                    <div className="text-[11px] text-stone-500 leading-snug line-clamp-2">{imp.quote}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {finalVerdict.achievements.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-[#D4A359] font-narrative-serif flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  斩获人生成就 ({finalVerdict.achievements.length}/12)
                </div>
                <div className="flex flex-wrap gap-2">
                  {finalVerdict.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 ${
                        isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#141724] border-white/[0.08] text-stone-200"
                      }`}
                      title={ach.description}
                    >
                      <span>{renderAchievementIcon(ach.iconName)}</span>
                      <span className="font-semibold">{ach.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verdict Text */}
            <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed font-reading-sans ${
              isLight ? "bg-stone-50/90 border-stone-200 text-stone-800" : "bg-[#121520] border-white/[0.08] text-stone-300"
            }`}>
              {finalVerdict.verdictText}
            </div>

            {/* ============================================================= */}
            {/* 80-BILLION-STYLE EPITAPH TO ONESELF (终局对自己的寄语 · 确认)  */}
            {/* ============================================================= */}
            <div className={`p-5 sm:p-6 rounded-2xl border relative overflow-hidden transition-all ${
              epitaphConfirmed
                ? "bg-red-950/20 border-red-800/40 text-red-200 shadow-lg"
                : isLight
                ? "bg-amber-50/50 border-amber-300/60 text-stone-800"
                : "bg-[#181B28] border-[#D4A359]/30 text-stone-200"
            }`}>
              {/* Background Seal Watermark */}
              <div className="absolute -right-4 -bottom-4 text-7xl sm:text-8xl font-serif text-red-600/10 select-none pointer-events-none font-bold">
                印
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-[#D4A359] font-narrative-serif flex items-center gap-1.5">
                    <span>💬</span>
                    <span>走完这波澜壮阔的一生，你可以对这个自己说一句话：</span>
                  </div>
                  {epitaphConfirmed && (
                    <SpringButton
                      onClick={() => setEpitaphConfirmed(false)}
                      className="text-[11px] text-stone-400 hover:text-amber-400 underline transition-colors"
                    >
                      修改寄语
                    </SpringButton>
                  )}
                </div>

                {!epitaphConfirmed ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={epitaphInput}
                        onChange={(e) => setEpitaphInput(e.target.value)}
                        placeholder="留下一句给自己的告别语，例如：不虚此生，万水千山走遍..."
                        maxLength={80}
                        className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all font-reading-sans ${
                          isLight
                            ? "bg-white border-stone-300 text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20"
                            : "bg-[#0E1017] border-white/[0.12] text-stone-100 focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]/20"
                        }`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && epitaphInput.trim()) {
                            setEpitaphConfirmed(true);
                            try {
                              confetti({ disableForReducedMotion: true, particleCount: 60, spread: 60, origin: { y: 0.7 } });
                            } catch {}
                          }
                        }}
                      />
                      <SpringButton
                        onClick={() => {
                          setEpitaphConfirmed(true);
                          try {
                            confetti({ disableForReducedMotion: true, particleCount: 60, spread: 60, origin: { y: 0.7 } });
                          } catch {}
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm font-narrative-serif tracking-wide shadow-md  transition-colors shrink-0"
                      >
                        确认
                      </SpringButton>
                    </div>

                    {/* Quick suggestion tags */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-stone-500 text-[10px]">推荐：</span>
                      {[
                        '平凡亦是英雄',
                        '无悔走过这一遭',
                        '谢谢你一直没有放弃',
                        '此心光明，亦复何言'
                      ].map((preset) => (
                        <SpringButton
                          key={preset}
                          onClick={() => setEpitaphInput(preset)}
                          className={`px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
                            isLight
                              ? "bg-white hover:bg-stone-100 border-stone-200 text-stone-600"
                              : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-stone-400 hover:text-stone-200"
                          }`}
                        >
                          “{preset}”
                        </SpringButton>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-red-700/50 bg-red-950/30 flex items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="text-xs text-red-400 font-narrative-serif font-semibold">已确认</div>
                      <div className="text-sm sm:text-base font-narrative-serif text-amber-200 italic font-semibold">
                        “{epitaphInput || '不虚此生，无怨无悔。'}”
                      </div>
                    </div>
                    <div className="seal-stamp-box w-[52px] h-[52px] rounded-sm flex items-center justify-center text-xs font-black rotate-3 shrink-0 animate-stamp-press animate-ink-bleed select-none">
                      印讫
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grand Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <SpringButton
                onClick={handleCopyRecord}
                className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors  ${
                  copied
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-[#181B26] hover:bg-[#202534] border-white/[0.1] text-stone-200"
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{copied ? '生平录已复制' : '复制人生全卷 (含寄语)'}</span>
              </SpringButton>

              <SpringButton
                onClick={() => setShowMemoirDrawer(true)}
                className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors  ${
                  isLight
                    ? "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900"
                    : "bg-[#D4A359]/15 hover:bg-[#D4A359]/25 border-[#D4A359]/40 text-[#D4A359]"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>展开生平完整回忆录</span>
              </SpringButton>

              <SpringButton
                onClick={() => handleRestart()}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg  transition-colors font-narrative-serif"
              >
                <RotateCcw className="w-4 h-4" />
                <span>开启全新轮回</span>
              </SpringButton>
            </div>
          </div>
        ) : isShowingMortalityClimax ? (
          /* =============================================================== */
          /* VIEW C: 早逝悲歌 · 绝唱谢幕舞台 (浩气长存 / 星陨子夜 / 血汗洗尘)    */
          /* =============================================================== */
          (() => {
            const tragedyTag = currentEntry.tagsAdded?.find(
              (t) =>
                t.includes('抗洪殉职') ||
                t.includes('心梗猝死') ||
                t.includes('矽肺病故') ||
                t.includes('遁入空门') ||
                t.includes('铁窗残生') ||
                t.includes('境外泥潭')
            ) || '提前终局';

            let tragedyWatermark = '绝唱';
            let tragedyBadge = '【绝唱 · 提前终局】';
            let tragedyTribute = '生如夏花之绚烂，死如秋叶之静美。虽未能走至花甲之年，此生傲骨与热血已长留人间。';

            if (tragedyTag.includes('抗洪殉职') || currentEntry.scene.includes('洪水') || currentEntry.scene.includes('决口')) {
              tragedyWatermark = '浩气';
              tragedyBadge = '【浩气长存 · 殉职英烈】';
              tragedyTribute = '“三十载生命虽短，然化作长堤，护佑万千安澜。省委追授人民英雄，英魂不朽，浩气长存！”';
            } else if (tragedyTag.includes('心梗猝死') || currentEntry.scene.includes('心梗') || currentEntry.scene.includes('抢救')) {
              tragedyWatermark = '星陨';
              tragedyBadge = '【星陨子夜 · 过劳长眠】';
              tragedyTribute = '“写字楼深处三十八岁的深夜长眠，全行业为你亮起悼念烛光。燃烧了自己，照亮过时代的微光。”';
            } else if (tragedyTag.includes('矽肺病故') || currentEntry.scene.includes('矽肺') || currentEntry.scene.includes('矿井')) {
              tragedyWatermark = '洗尘';
              tragedyBadge = '【血汗洗尘 · 苦尽魂归】';
              tragedyTribute = '“虽千磨万击，你用铮铮铁骨换来了家族的重生。债已还清，房已盖好，一生硬骨，无愧此世！”';
            } else if (tragedyTag.includes('遁入空门')) {
              tragedyWatermark = '空门';
              tragedyBadge = '【青灯古佛 · 遁入空门】';
              tragedyTribute = '“看破红尘浮华，古刹钟声沉淀平生。自此斩断尘缘，此心安处即是吾乡。”';
            } else if (tragedyTag.includes('铁窗残生') || tragedyTag.includes('境外泥潭') || currentEntry.scene.includes('境外园区') || currentEntry.scene.includes('高墙')) {
              tragedyWatermark = '深渊';
              tragedyBadge = '【境外泥潭 · 铁窗残生】';
              tragedyTribute = '“一念之差误入深渊，高墙铁窗空叹白发。虽为至孝之躯，终成法律之惩。人世沧桑，警钟长鸣。”';
            }

            return (
              <div
                key={`mortality_${currentEntry.id}_${currentEntry.age}`}
                className={`w-full max-w-2xl sm:max-w-3xl rounded-3xl border p-6 sm:p-9 lg:p-11 space-y-7 shadow-2xl transition-all duration-300 mt-1 sm:mt-2 mb-8 animate-year-enter relative overflow-hidden ${
                  isLight
                    ? "bg-[#FFFBF7] border-red-900/30 text-stone-900 shadow-red-950/15"
                    : "bg-[#090A10] border-red-800/40 text-stone-100 shadow-[0_0_80px_rgba(185,28,28,0.25)] animate-elegiac-aura"
                }`}
              >
                {/* Giant Calligraphy Watermark */}
                <div className="absolute top-2 right-4 text-8xl sm:text-9xl md:text-[11rem] font-serif font-black select-none pointer-events-none opacity-[0.06] dark:opacity-[0.08] text-red-600 tracking-tighter">
                  {tragedyWatermark}
                </div>

                {/* Top Stage Header */}
                <div className="flex items-center justify-between border-b pb-4 border-red-500/25 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-narrative-serif bg-red-950/60 border border-red-700/60 text-red-300 shadow-inner">
                      {tragedyBadge}
                    </span>
                    <span className="text-xs text-stone-500 font-narrative-serif">
                      享年 {currentEntry.age} 岁 · 公历 {currentEntry.year} 年
                    </span>
                  </div>
                  <div className="text-xs font-mono-num text-red-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-narrative-serif">生命谢幕绝唱</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-narrative-serif text-red-500 tracking-wide relative z-10">
                  “{currentEntry.title}”
                </h2>

                {/* Scene Narrative */}
                <div className={`space-y-4 font-reading-sans relative z-10 ${getFontSizeClass()} ${
                  isLight ? "text-stone-800" : "text-stone-200"
                }`}>
                  {currentEntry.scene.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Consequence reaction */}
                {(currentEntry.chosenOptionText || currentEntry.chosenReaction) && (
                  <div className="p-4 sm:p-5 rounded-2xl border border-red-800/40 bg-red-950/25 relative z-10 space-y-2">
                    {currentEntry.chosenOptionText && (
                      <div className="text-xs sm:text-sm font-bold font-narrative-serif text-red-400 flex items-center gap-1.5">
                        <span className="seal-stamp-box px-1.5 py-[0.05rem] text-[10px]">决断</span>
                        <span>{currentEntry.chosenOptionText}</span>
                      </div>
                    )}
                    {currentEntry.chosenReaction && (
                      <p className="text-xs sm:text-sm italic font-reading-sans text-amber-100/90 leading-relaxed">
                        “{currentEntry.chosenReaction}”
                      </p>
                    )}
                  </div>
                )}

                {/* Monumental Tribute Quote */}
                <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-950/15 text-center relative z-10">
                  <p className="text-sm sm:text-base font-narrative-serif italic text-amber-200/90 leading-relaxed">
                    {tragedyTribute}
                  </p>
                </div>

                {/* Action: Seal and enter Lifetime Archive */}
                <div className="pt-3 relative z-10">
                  <SpringButton
                    onClick={() => {
                      setMortalityAcknowledged(true);
                      try {
                        confetti({ disableForReducedMotion: true, particleCount: 65, spread: 75, origin: { y: 0.6 } });
                      } catch {}
                    }}
                    className="w-full py-[1.125rem] px-6 rounded-2xl bg-gradient-to-r from-red-800 via-red-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-2xl  transition-colors font-narrative-serif tracking-widest border border-red-500/40 group cursor-pointer"
                  >
                    <div className="seal-stamp-box px-2 py-0.5 text-xs text-white border-white/80">印讫</div>
                    <span>查看结局</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span className="text-[11px] font-normal opacity-75 hidden sm:inline ml-1 font-mono-num">
                      (按空格 Space 盖印)
                    </span>
                  </SpringButton>
                </div>
              </div>
            );
          })()
        ) : (
          /* =============================================================== */
          /* VIEW B: 聚焦单卡剧场 (当前岁月 · 宣纸黑曜双材质与巨型暗印)         */
          /* =============================================================== */
          <div
            key={`${currentEntry.id}_${currentEntry.age}`}
            className={`w-full max-w-2xl sm:max-w-3xl rounded-3xl border p-4 sm:p-6 lg:p-8 space-y-3.5 sm:space-y-4 shadow-2xl transition-all duration-300 mt-1 sm:mt-2 mb-8 animate-year-enter relative overflow-hidden ${
              isLight
                ? "bg-[#FCFAF7]/95 border-amber-900/15 shadow-[0_20px_50px_-10px_rgba(180,140,80,0.12)] text-stone-900"
                : "bg-[#0E1019]/95 border-[#D4A359]/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(212,163,89,0.06)] text-stone-100"
            }`}
          >
            {/* Giant Subtle Watermark of the current Age in the top-right background */}
            <div className="absolute top-1 right-3 text-7xl sm:text-8xl md:text-9xl font-serif font-black select-none pointer-events-none opacity-[0.03] dark:opacity-[0.045] tracking-tighter text-amber-900 dark:text-[#E0B26A]">
              {currentEntry.age}
            </div>

            {/* Top Stage Header */}
            <div className="flex items-center justify-between border-b pb-4 border-amber-500/20 relative z-10">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono-num border ${
                  isLight
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-[#D4A359]/15 border-[#D4A359]/35 text-[#D4A359]"
                }`}>
                  {currentEntry.age} 岁
                </span>
                <span className="text-xs text-stone-500 font-narrative-serif">
                  公历 {currentEntry.year} 年
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-xs font-semibold text-[#D4A359] font-narrative-serif">
                  {currentEntry.stageName}
                </span>
              </div>

              {/* Step indicator in total timeline */}
              <div className="text-[11px] font-mono-num text-stone-500">
                第 {timelineIndex + 1} 幕 / 共 {timeline.length} 幕
              </div>
            </div>

            {/* Year Narrative Title */}
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold font-narrative-serif tracking-wide relative z-10 ${
              isLight ? "text-stone-900" : "text-stone-100"
            }`}>
              {currentEntry.title}
            </h2>

            {/* Year Scene Story Narrative */}
            <div className={`space-y-3 font-reading-sans relative z-10 ${getFontSizeClass()} ${
              isLight ? "text-stone-800" : "text-stone-200"
            }`}>
              {currentEntry.scene.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stat Deltas & Tags Pill */}
            {(currentEntry.statDelta || (currentEntry.tagsAdded && currentEntry.tagsAdded.length > 0)) && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-dashed border-stone-200 dark:border-white/[0.08] relative z-10">
                {currentEntry.statDelta && (
                  <>
                    {currentEntry.statDelta.health !== undefined && (
                      <span className={`text-[11px] px-2 py-0.5 rounded font-mono-num font-semibold ${
                        currentEntry.statDelta.health >= 0
                          ? isLight ? "bg-emerald-50 text-emerald-800 border border-emerald-300" : "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                          : isLight ? "bg-rose-50 text-rose-800 border border-rose-300" : "bg-rose-950/40 text-rose-400 border border-rose-800/40"
                      }`}>
                        体魄 {currentEntry.statDelta.health > 0 ? `+${currentEntry.statDelta.health}` : currentEntry.statDelta.health}
                      </span>
                    )}
                    {currentEntry.statDelta.cognition !== undefined && (
                      <span className={`text-[11px] px-2 py-0.5 rounded font-mono-num font-semibold ${
                        currentEntry.statDelta.cognition >= 0
                          ? isLight ? "bg-sky-50 text-sky-800 border border-sky-300" : "bg-sky-950/40 text-sky-400 border border-sky-800/40"
                          : isLight ? "bg-rose-50 text-rose-800 border border-rose-300" : "bg-rose-950/40 text-rose-400 border border-rose-800/40"
                      }`}>
                        见识 {currentEntry.statDelta.cognition > 0 ? `+${currentEntry.statDelta.cognition}` : currentEntry.statDelta.cognition}
                      </span>
                    )}
                    {currentEntry.statDelta.happiness !== undefined && (
                      <span className={`text-[11px] px-2 py-0.5 rounded font-mono-num font-semibold ${
                        currentEntry.statDelta.happiness >= 0
                          ? isLight ? "bg-amber-50 text-amber-800 border border-amber-300" : "bg-amber-950/40 text-amber-400 border border-amber-800/40"
                          : isLight ? "bg-rose-50 text-rose-800 border border-rose-300" : "bg-rose-950/40 text-rose-400 border border-rose-800/40"
                      }`}>
                        幸福 {currentEntry.statDelta.happiness > 0 ? `+${currentEntry.statDelta.happiness}` : currentEntry.statDelta.happiness}
                      </span>
                    )}
                    {currentEntry.statDelta.social !== undefined && (
                      <span className={`text-[11px] px-2 py-0.5 rounded font-mono-num font-semibold ${
                        currentEntry.statDelta.social >= 0
                          ? isLight ? "bg-indigo-50 text-indigo-800 border border-indigo-300" : "bg-indigo-950/40 text-indigo-400 border border-indigo-800/40"
                          : isLight ? "bg-rose-50 text-rose-800 border border-rose-300" : "bg-rose-950/40 text-rose-400 border border-rose-800/40"
                      }`}>
                        人脉 {currentEntry.statDelta.social > 0 ? `+${currentEntry.statDelta.social}` : currentEntry.statDelta.social}
                      </span>
                    )}
                    {currentEntry.statDelta.savings !== undefined && currentEntry.statDelta.savings !== 0 && (
                      <span className={`text-[11px] px-2 py-0.5 rounded font-mono-num font-semibold ${
                        currentEntry.statDelta.savings >= 0
                          ? isLight ? "bg-emerald-50 text-emerald-800 border border-emerald-300" : "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                          : isLight ? "bg-rose-50 text-rose-800 border border-rose-300" : "bg-rose-950/40 text-rose-400 border border-rose-800/40"
                      }`}>
                        现金 {currentEntry.statDelta.savings > 0 ? `+¥${currentEntry.statDelta.savings}` : `-¥${Math.abs(currentEntry.statDelta.savings)}`}
                      </span>
                    )}
                  </>
                )}
                {currentEntry.tagsAdded && currentEntry.tagsAdded.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-[11px] px-2 py-0.5 rounded border ${
                      isLight ? "bg-stone-100 border-stone-200 text-stone-700" : "bg-white/[0.04] border-white/[0.08] text-stone-300"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ============================================================= */}
            {/* INTERACTIVE DILEMMA CHOICES (命运对决张力 · 鲜明立意光晕)         */}
            {/* ============================================================= */}
            {isWaitingCurrentChoice && currentNode.choices && (
              <div
                ref={choiceCardRef}
                className={`mt-4 sm:mt-5 p-4 sm:p-6 rounded-2xl border space-y-3 sm:space-y-4 relative z-10 transition-all ${
                currentNode.type === 'destiny'
                  ? isLight
                    ? "bg-gradient-to-b from-amber-50/90 via-amber-100/40 to-stone-50 border-2 border-amber-600/60 shadow-xl shadow-amber-950/10 animate-destiny-pulse"
                    : "bg-gradient-to-b from-[#18141F]/95 via-[#120F1A]/95 to-[#0B0912] border-2 border-[#D4A359]/70 shadow-2xl shadow-black animate-destiny-pulse"
                  : isLight
                  ? "bg-amber-50/50 border-amber-300/70"
                  : "bg-[#141724]/90 border-[#D4A359]/40"
              }`}>
                {/* Prompt Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-stone-900" : "text-stone-100"}`}>
                    选择下一步
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[11px] text-[#D4A359] font-mono-num bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      共 {currentNode.choices.length} 项
                    </span>
                    <span className="hidden sm:inline-block text-[11px] text-stone-400 font-mono-num">
                      按 1 / 2 / 3
                    </span>
                  </div>
                </div>

                {/* Option Cards - Explicit scrollable viewport for Mac 13" and mobile */}
                <div
                  className="max-h-[38vh] sm:max-h-[46vh] overflow-y-auto pr-1.5 sm:pr-2 space-y-2.5 sm:space-y-3 overscroll-contain focus:outline-none"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: isLight ? '#D4A359 #F3F4F6' : '#D4A359 #181B26'
                  }}
                >
                  {currentNode.choices.map((choice, cIdx) => {
                    const p = getChoicePresentation(choice);
                    return (
                      <SpringButton
                        key={cIdx}
                        onClick={() => handleSelectChoice(choice)}
                        className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-colors  group shadow-sm flex items-start justify-between cursor-pointer ${
                          isLight
                            ? "border-stone-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 text-stone-900 shadow-stone-900/5"
                            : "border-white/[0.12] bg-[#141724] hover:border-amber-400/80 hover:bg-[#1A1E2E] text-stone-100 shadow-black/40"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Number badge */}
                          <span className={`w-6 h-6 rounded-md border font-mono-num text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isLight
                              ? "bg-stone-100 border-stone-300 text-stone-800 group-hover:border-amber-400 group-hover:bg-amber-100"
                              : "bg-[#11131C] border-white/[0.1] text-stone-300 group-hover:border-amber-400/60 group-hover:text-amber-400"
                          }`}>
                            {cIdx + 1}
                          </span>

                          <div className="space-y-1 flex-1 min-w-0">
                            {/* Choice Headline Text */}
                            <div className={`text-sm sm:text-base font-bold font-reading-sans leading-snug ${
                              isLight ? "text-stone-900 group-hover:text-amber-900" : "text-stone-100 group-hover:text-[#D4A359]"
                            }`}>
                              {p.text}
                            </div>

                            {/* Detail narrative (if present) */}
                            {p.detail && (
                              <p className={`text-xs sm:text-[13px] leading-relaxed font-reading-sans ${
                                isLight ? "text-stone-600" : "text-stone-400"
                              }`}>
                                {p.detail}
                              </p>
                            )}
                          </div>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ml-2 transition-transform group-hover:translate-x-1 ${
                          isLight ? "text-stone-400 group-hover:text-amber-800" : "text-stone-400 group-hover:text-amber-300"
                        }`} />
                      </SpringButton>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* SEALED CHOICE CONSEQUENCE FEEDBACK (确认动效仪式)             */}
            {/* ============================================================= */}
            {currentEntry.chosenOptionText && (
              <div className={`p-4 sm:p-5 rounded-2xl border relative overflow-hidden transition-all duration-300 z-10 flex items-center justify-between gap-4 ${
                isLight ? "bg-red-50/70 border-red-300/80 text-stone-900" : "bg-red-950/20 border-red-800/40 text-stone-100"
              }`}>
                {/* Background Seal Watermark */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl font-serif text-red-600/10 select-none pointer-events-none font-black rotate-12">
                  印讫
                </div>
                <div className="relative z-10 space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-xs font-bold font-narrative-serif text-red-500 tracking-wider">
                      选择已记录
                    </span>
                    <span className="text-xs font-semibold font-narrative-serif text-stone-800 dark:text-stone-200">
                      {currentEntry.chosenOptionText}
                    </span>
                  </div>
                  {currentEntry.chosenReaction && (
                    <p className={`text-xs sm:text-sm italic font-reading-sans leading-relaxed ${
                      isLight ? "text-stone-700" : "text-amber-100/90"
                    }`}>
                      “{currentEntry.chosenReaction}”
                    </p>
                  )}
                </div>

                {/* Classical Square Cinnabar Seal Stamp */}
                <div className="seal-stamp-box w-12 h-12 rounded-sm flex items-center justify-center text-xs font-black rotate-3 shrink-0 animate-stamp-press animate-ink-bleed select-none">
                  印讫
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* 5. ALL-IN-ONE FIXED CAPSULE DOCK (全部功能一网打尽 · 终极固定底栏控制台) */}
      {/* ================================================================= */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className={`simulator-dock flex items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl sm:rounded-full border shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? "bg-white/95 border-stone-200 text-stone-800 shadow-stone-900/15"
            : "bg-[#0E1019]/95 border-white/[0.12] text-stone-200 shadow-black/80"
        }`}>
          {/* PRIMARY ACTION SLOT */}
          {!isRetired && !isShowingMortalityClimax && (
            isWaitingCurrentChoice ? (
              <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 font-narrative-serif tracking-wide shrink-0 animate-pulse select-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>请选择选项（1/2/3）</span>
              </div>
            ) : (
              <SpringButton
                onClick={handleNextNaturalYear}
                disabled={waitingForChoice || showGaokaoModal}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4A359] via-[#E0B26A] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-amber-950/20  transition-colors font-narrative-serif tracking-wide shrink-0 cursor-pointer group disabled:opacity-50"
                title="按空格键 Space 也可推进"
              >
                <span>{getNextStepLabel()}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                <span className="text-[10px] font-normal opacity-75 hidden md:inline ml-0.5 font-mono-num">
                  (空格)
                </span>
              </SpringButton>
            )
          )}

          {!isRetired && !isShowingMortalityClimax && (
            <span className={isLight ? "text-stone-300" : "text-white/[0.15]"}>|</span>
          )}

          {/* Auto-play Engine */}
          <SpringButton
            onClick={() => {
              if (!waitingForChoice && !showGaokaoModal && !isRetired && !isShowingMortalityClimax) {
                setIsAutoPlaying((prev) => !prev);
              }
            }}
            disabled={waitingForChoice || showGaokaoModal || isRetired || isShowingMortalityClimax}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors  ${
              isAutoPlaying
                ? "bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm"
                : isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700 disabled:opacity-40"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300 disabled:opacity-40"
            }`}
            title="快捷键: A 键切换自动播放"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isAutoPlaying ? '暂停' : '流转'}</span>
            <span className="text-[10px] opacity-75 font-mono-num">(A)</span>
          </SpringButton>

          {/* Speed Presets */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { val: 2.0, label: '0.8x' },
              { val: 1.2, label: '1.0x' },
              { val: 0.8, label: '1.5x' },
            ].map((sp) => (
              <SpringButton
                key={sp.label}
                onClick={() => setAutoPlaySpeed(sp.val)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono-num transition-colors ${
                  Math.abs(autoPlaySpeed - sp.val) < 0.1
                    ? isLight ? "bg-stone-300 text-stone-900 font-bold" : "bg-white/[0.18] text-[#D4A359] font-bold"
                    : isLight ? "text-stone-500 hover:text-stone-800" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {sp.label}
              </SpringButton>
            ))}
          </div>

          <span className={isLight ? "text-stone-300" : "text-white/[0.15]"}>|</span>

          {/* Quick Skip or Status prompt */}
          {isShowingMortalityClimax ? (
            <span className="text-red-400 font-bold text-xs flex items-center gap-1.5 animate-pulse font-narrative-serif px-1">
              <span className="seal-stamp-box px-1.5 py-[0.05rem] text-[10px]">绝唱</span>
              <span>请确认结局</span>
            </span>
          ) : !isRetired ? (
            <SpringButton
              onClick={handleSkipToNextDecision}
              disabled={isWaitingCurrentChoice}
              className={`px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors  disabled:opacity-40 ${
                isLight
                  ? "bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-700 hover:border-amber-400"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-stone-300 hover:border-[#D4A359]/50"
              }`}
              title="一键直接快进到下一个有分支选择的年龄或高考节点"
            >
              <FastForward className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">快进抉择</span>
            </SpringButton>
          ) : (
            <span className="text-xs text-[#D4A359] font-narrative-serif px-1">
              模拟结束
            </span>
          )}

          <span className={isLight ? "text-stone-300" : "text-white/[0.15]"}>|</span>

          {/* Memoir Drawer Trigger */}
          <SpringButton
            onClick={() => setShowMemoirDrawer(true)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors  ${
              isLight
                ? "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900"
                : "bg-[#D4A359]/15 hover:bg-[#D4A359]/25 border-[#D4A359]/40 text-[#D4A359]"
            }`}
            title="查看模拟记录"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">模拟记录</span>
            <span className="font-mono-num font-bold">({logEntries.length})</span>
          </SpringButton>

          <span className={isLight ? "text-stone-300" : "text-white/[0.15]"}>|</span>

          {/* Quick Restart in Capsule */}
          <SpringButton
            onClick={() => handleRestart()}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border text-xs font-medium flex items-center gap-1 transition-colors  ${
              isLight
                ? "bg-stone-100 hover:bg-rose-50 border-stone-300 text-stone-600 hover:text-rose-700 hover:border-rose-300"
                : "bg-white/[0.04] hover:bg-rose-950/30 border-white/[0.08] text-stone-400 hover:text-rose-400 hover:border-rose-800/40"
            }`}
            title="重新生成角色"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重开</span>
          </SpringButton>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 6. MEMOIR DRAWER (模拟记录抽屉 · 随时查阅全卷生平)                    */}
      {/* ================================================================= */}
      <SpringOverlay
        open={showMemoirDrawer}
        drawer
        label="模拟记录"
        onClose={() => setShowMemoirDrawer(false)}
        className={`w-full max-w-xl h-full shadow-2xl flex flex-col ${
          isLight ? "bg-[#FAF9F5] text-stone-900" : "bg-[#0E1017] text-stone-100"
        }`}
      >
            {/* Drawer Header */}
            <div className={`min-h-14 border-b px-3 py-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 shrink-0 ${
              isLight ? "bg-white border-stone-200" : "bg-[#12141F] border-white/[0.08]"
            }`}>
              <div className="flex flex-wrap items-center gap-2 font-narrative-serif font-bold text-sm sm:text-base">
                <BookOpen className="w-4 h-4 text-[#D4A359]" />
                <span>模拟记录</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono-num ${
                  isLight ? "bg-amber-100 text-amber-900" : "bg-[#D4A359]/20 text-[#D4A359]"
                }`}>
                  {logEntries.length} 轮岁痕
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SpringButton
                  onClick={handleCopyRecord}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-white/[0.05] border-white/[0.08] text-stone-300"
                  }`}
                  title="复制全部生平"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">{copied ? '已复制' : '复制'}</span>
                </SpringButton>
                <SpringButton
                  onClick={() => setShowMemoirDrawer(false)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isLight ? "bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200" : "bg-white/[0.05] border-white/[0.08] text-stone-300 hover:bg-white/[0.1]"
                  }`}
                  title="关闭抽屉"
                >
                  <X className="w-4 h-4" />
                </SpringButton>
              </div>
            </div>

            {/* Drawer Body: Origin Dossier + Chronological History */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Family Origin Dossier Card */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs font-reading-sans ${
                isLight ? "bg-white border-stone-200 shadow-sm" : "bg-[#141622] border-white/[0.08]"
              }`}>
                <div className="text-xs font-bold text-[#D4A359] font-narrative-serif">
                  初始档案
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-500">
                  <div>出生地域：<span className="text-stone-800 dark:text-stone-200 font-medium">{charData.family.province || charData.family.region.split('·')[0].trim()} · {charData.family.cityOrCounty}</span></div>
                  <div>地貌特征：<span className="text-stone-800 dark:text-stone-200 font-medium">{charData.family.regionDetail}</span></div>
                  <div>父亲背景：<span className="text-stone-800 dark:text-stone-200 font-medium">{charData.family.fatherTrait} ({fatherStatus.age}岁 · {fatherStatus.status})</span></div>
                  <div>母亲背景：<span className="text-stone-800 dark:text-stone-200 font-medium">{charData.family.motherTrait} ({motherStatus.age}岁 · {motherStatus.status})</span></div>
                  <div>家族经济：<span className="text-stone-800 dark:text-stone-200 font-medium">{charData.family.wealthTier}</span></div>
                  <div>同胞情况：<span className="text-stone-800 dark:text-stone-200 font-medium">{siblingStatus.label}</span></div>
                </div>
                <p className="text-[11px] italic text-[#D4A359]/90 pt-1 border-t border-dashed border-stone-200 dark:border-white/[0.06]">
                  “{charData.family.emotionalTone}”
                </p>
              </div>

              {/* Chronological List of Entries */}
              <div className="space-y-3">
                {logEntries.map((entry, eIdx) => (
                  <div
                    key={entry.id || eIdx}
                    className={`p-4 rounded-2xl border space-y-2 transition-all ${
                      entry.chosenOptionText
                        ? isLight
                          ? "bg-amber-50/50 border-amber-300/60"
                          : "bg-[#161926] border-[#D4A359]/30"
                        : isLight
                        ? "bg-white border-stone-200 shadow-sm"
                        : "bg-[#131520] border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] px-2 py-0.5 rounded font-mono-num font-bold ${
                          isLight ? "bg-stone-100 text-stone-800" : "bg-white/[0.06] text-amber-300"
                        }`}>
                          {entry.age} 岁 ({entry.year} 年)
                        </span>
                        <span className="text-xs font-bold font-narrative-serif text-stone-900 dark:text-stone-100">
                          {entry.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-narrative-serif">
                        {entry.stageName}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 font-reading-sans leading-relaxed whitespace-pre-line">
                      {entry.scene}
                    </p>

                    {/* Choice and reaction */}
                    {entry.chosenOptionText && (
                      <div className="pt-1.5 border-t border-dashed border-amber-500/30 space-y-1">
                        <div className="text-[11px] font-bold text-[#D4A359] font-narrative-serif flex items-center gap-1">
                          <span>已选</span>
                          <span>{entry.chosenOptionText}</span>
                        </div>
                        {entry.chosenReaction && (
                          <div className="text-[11px] italic text-stone-500 dark:text-stone-400 font-reading-sans">
                            “{entry.chosenReaction}”
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className={`p-4 border-t flex justify-end shrink-0 ${
              isLight ? "bg-white border-stone-200" : "bg-[#12141F] border-white/[0.08]"
            }`}>
              <SpringButton
                onClick={() => setShowMemoirDrawer(false)}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold font-narrative-serif transition-colors ${
                  isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.1] text-stone-200"
                }`}
              >
                收起模拟记录
              </SpringButton>
            </div>
      </SpringOverlay>

      {/* ================================================================= */}
      {/* 16 种终局图鉴弹窗 (ENDING CODEX MODAL)                            */}
      {/* ================================================================= */}
      <EndingCodexModal
        isOpen={showCodexModal}
        onClose={() => setShowCodexModal(false)}
        unlockedIds={unlockedEndings}
        isLight={isLight}
      />

      {/* ================================================================= */}
      {/* MODAL: 18yo GAOKAO CALCULATED OUTCOME MODAL                       */}
      {/* ================================================================= */}
      {gaokaoCalc && (
        <SpringOverlay open={showGaokaoModal} label="高考放榜与学业结算"
          className={`border rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 max-h-[90dvh] overflow-y-auto ${
            isLight
              ? "bg-white border-amber-600/40 text-stone-900 shadow-stone-900/15"
              : "bg-[#0E1017] border-[#D4A359]/60 text-stone-100 shadow-2xl"
          }`}>
            <div className={`text-center pb-4 border-b ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs mb-2 font-narrative-serif ${
                isLight
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-[#D4A359]/15 text-[#D4A359] border border-[#D4A359]/30"
              }`}>
                <GraduationCap className="w-3.5 h-3.5" />
                十八岁 · 高考放榜与学业结算
              </div>
              {isAutoPlaying && (
                <div className={`text-[11px] font-reading-sans flex items-center justify-center gap-1.5 mb-2 ${
                  isLight ? "text-amber-800" : "text-[#D4A359]"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLight ? "bg-amber-600" : "bg-[#D4A359]"}`} />
                  自动流转挂起中 · 选定去向后自动继续
                </div>
              )}
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 font-narrative-serif ${
                isLight ? "text-stone-900" : "text-[#D4A359]"
              }`}>
                {gaokaoCalc.title}
              </h2>
              <div className={`text-xs sm:text-sm font-semibold inline-block px-3.5 py-1 rounded-full border font-mono-num ${
                isLight
                  ? "text-emerald-900 bg-emerald-50 border-emerald-300 font-bold"
                  : "text-emerald-400 bg-emerald-950/40 border-emerald-800/40"
              }`}>
                {gaokaoCalc.scoreText}
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border font-reading-sans ${
              isLight
                ? "bg-stone-50 border-stone-200 text-stone-800"
                : "bg-[#13151F] border-white/[0.06] text-stone-300"
            }`}>
              {gaokaoCalc.verdict}
            </p>

            <div className={`text-xs space-y-1 font-reading-sans ${
              isLight ? "text-stone-600 font-medium" : "text-stone-400"
            }`}>
              <div>【学业资本】{gaokaoCalc.academicCapitalDesc}</div>
              <div>【心理画像】{gaokaoCalc.psychologicalDossier}</div>
            </div>

            <div className={`space-y-3 pt-3 border-t ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}>
              <span className={`text-sm sm:text-base font-bold block font-narrative-serif tracking-[0.06em] ${
                isLight ? "text-amber-900" : "text-[#D4A359]"
              }`}>
                {gaokaoCalc.firstStepChoice.prompt}
              </span>
              <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
                {gaokaoCalc.firstStepChoice.options.map((opt, oIdx) => (
                  <SpringButton
                    key={oIdx}
                    onClick={() => handleConfirmGaokaoStep(opt)}
                    className={`p-4 sm:p-5 rounded-xl border text-left transition-colors  group shadow-sm flex items-start justify-between ${
                      isLight
                        ? "border-stone-200 bg-stone-50 hover:border-amber-500/70 hover:bg-amber-50/50 text-stone-900"
                        : "border-white/[0.08] bg-[#181B26] hover:border-[#D4A359]/70 hover:bg-[#1E2232] text-stone-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-md border font-mono-num text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isLight
                          ? "bg-stone-200 border-stone-300 text-stone-800"
                          : "bg-[#13151F] border-white/[0.1] text-[#D4A359]"
                      }`}>
                        {oIdx + 1}
                      </span>
                      <div className="space-y-1.5">
                        <div
                          style={{ letterSpacing: '0.085em', lineHeight: '1.75' }}
                          className={`text-sm sm:text-[16px] font-semibold font-reading-sans ${
                            isLight ? "text-stone-900 group-hover:text-amber-900" : "text-stone-100 group-hover:text-[#D4A359]"
                          }`}
                        >
                          {opt.text}
                        </div>
                        <div
                          style={{ letterSpacing: '0.075em', lineHeight: '1.8' }}
                          className={`text-xs sm:text-[13.5px] font-reading-sans ${
                            isLight ? "text-stone-600" : "text-stone-400"
                          }`}
                        >
                          {opt.detail}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ml-3 transition-transform group-hover:translate-x-1 ${
                      isLight ? "text-stone-400 group-hover:text-amber-700" : "text-stone-400 group-hover:text-amber-300"
                    }`} />
                  </SpringButton>
                ))}
              </div>
            </div>
        </SpringOverlay>
      )}

      {/* ================================================================= */}
      {/* MODAL: 自主指定投胎省份（34省级行政区全覆盖）                      */}
      {/* ================================================================= */}
    </div>
  );
};
