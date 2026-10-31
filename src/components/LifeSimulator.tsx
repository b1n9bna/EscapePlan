import React, { useState, useEffect, useRef } from 'react';
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
  type: 'natural' | 'choice' | 'milestone';
  chosenOptionText?: string;
  chosenReaction?: string;
  statDelta?: Partial<CharacterAttributes>;
  tagsAdded?: string[];
  reflection?: string;
}


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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-year-enter">
      <div className={`border rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl transition-colors ${
        isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#0E1017] border-white/[0.08] text-stone-100"
      }`}>
        <div className={`px-5 sm:px-6 py-4 border-b flex items-center justify-between shrink-0 transition-colors ${
          isLight ? "bg-stone-50 border-stone-200" : "bg-[#13151F] border-white/[0.07]"
        }`}>
          <div className="flex items-center gap-2.5">
            <BookOpen className={`w-5 h-5 ${isLight ? "text-amber-700" : "text-[#D4A359]"}`} />
            <div>
              <h2 className={`text-base sm:text-lg font-bold flex items-center gap-2 font-narrative-serif ${
                isLight ? "text-stone-900" : "text-stone-100"
              }`}>
                <span>一生结局图鉴</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono-num font-semibold ${
                  isLight ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-[#D4A359]/15 border border-[#D4A359]/30 text-[#D4A359]"
                }`}>
                  已收集 {unlockedIds.length} / 16
                </span>
              </h2>
              <p className={`text-xs font-reading-sans mt-0.5 ${
                isLight ? "text-stone-600 font-medium" : "text-stone-400"
              }`}>
                探索不同阶层起点、求学分流与出海抉择，集齐全部 16 大宿命篇章
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? "text-stone-500 hover:text-stone-900 hover:bg-stone-200" : "text-stone-400 hover:text-stone-100 hover:bg-[#1E2230]"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
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
                      ? 'bg-white border-stone-200 shadow-2xs'
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

        <div className={`px-6 py-3 border-t flex items-center justify-between text-xs shrink-0 font-reading-sans ${
          isLight ? "bg-stone-50 border-stone-200 text-stone-600" : "bg-[#0E1017] border-white/[0.07] text-stone-400"
        }`}>
          <span>图鉴记录已持久化保存在当前浏览器</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold transition-all shadow-md shadow-amber-950/30"
          >
            返回模拟
          </button>
        </div>
      </div>
    </div>
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
      feedBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const scrollToChoiceCard = () => {
    setTimeout(() => {
      if (choiceCardRef.current) {
        choiceCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        feedBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  // Confetti trigger once at Age 63
  const confettiFiredRef = useRef(false);
  useEffect(() => {
    if (logEntries.some((e) => e.age === 63) && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [logEntries]);


  // Register newly unlocked ending into LocalStorage
  useEffect(() => {
    if (logEntries.some((e) => e.age === 63)) {
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
  }, [logEntries.length, chosenPath, gaokaoCalc, attrs, tags]);

  // Derived current age strictly driven by active timeline node
  const currentAge =
    gamePhase === 'setup'
      ? 0
      : timeline[timelineIndex]?.age ?? (logEntries[logEntries.length - 1]?.age || 0);

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
      if (currentNode.age === 27 && !logEntries.some((e) => e.age === 63)) {
        const track = gaokaoCalc?.degreeTrack || 'double_non';
        const careerSub = getCareerSubtrack(tags);
        const adultMilestones = generateAdultMilestones(track, chosenPath, charData.family, careerSub);
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
    if (logEntries.some((e) => e.age === 63)) return;
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
    if (currentNode.age === 21) {
      const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
      const tailoredNodes = getTailoredCareerSubtrackNodes(
        currentTrack,
        choice.text,
        charData.family
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
        choice.text.includes('异邦') ||
        choice.text.includes('跨国') ||
        choice.text.includes('异国') ||
        (choice.addTags &&
          choice.addTags.some(
            (t) => t.includes('出海') || t.includes('异邦') || t.includes('大工匠')
          ));
      const path: 'emigrate' | 'stay' = isEmigrate ? 'emigrate' : 'stay';
      setChosenPath(path);

      const track = gaokaoCalc?.degreeTrack || 'double_non';
      const allCurrentTags = Array.from(new Set([...tags, ...(choice.addTags || [])]));
      const careerSub = getCareerSubtrack(allCurrentTags);
      const adultMilestones = generateAdultMilestones(track, path, charData.family, careerSub);

      // 将后续30, 35, 42, 52, 63岁里程碑直接串接进时间线，三栏交互彻底统一！
      const currentNodes = timeline.slice(0, timelineIndex + 1);
      setTimeline([...currentNodes, ...adultMilestones]);
    }

    // ★★★ 成年篇章（28~63岁）因果分支拦截：彻底消除“选了大集团维保督导，下一步却变成工坊被查封”等严重逻辑矛盾！★★★
    const allCurrentTags = Array.from(new Set([...tags, ...(choice.addTags || [])]));
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
    // Fully completed at 63 years old
    if (logEntries.some((e) => e.age === 63)) {
      setIsAutoPlaying(false);
      return;
    }
    // Suspend timer while waiting for user choice or Gaokao decision, WITHOUT turning off auto-play!
    if (waitingForChoice || showGaokaoModal) {
      return;
    }

    const timer = setTimeout(() => {
      handleNextNaturalYear();
    }, autoPlaySpeed * 1000);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, autoPlaySpeed, timelineIndex, waitingForChoice, showGaokaoModal, gamePhase, logEntries.length]);

  // =========================================================================
  // GLOBAL KEYBOARD SHORTCUTS (Space: Next / 1-4: Choice / A: Auto-play)
  // =========================================================================
  useEffect(() => {
    if (gamePhase !== 'cockpit') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      // Space / Enter: Advance year or stop auto-play
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        if (isAutoPlaying) {
          setIsAutoPlaying(false);
          return;
        }
        if (!waitingForChoice && !showGaokaoModal && !logEntries.some((entry) => entry.age === 63)) {
          handleNextNaturalYear();
        }
        return;
      }

      // Key 'a' or 'A': Toggle Auto Play
      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (!waitingForChoice && !showGaokaoModal && !logEntries.some((entry) => entry.age === 63)) {
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
  }, [gamePhase, waitingForChoice, showGaokaoModal, isAutoPlaying, timelineIndex, currentNode, gaokaoCalc, logEntries.length]);


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
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-year-enter">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm mb-3 font-narrative-serif ${
            isLight ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-[#13151F] border-white/[0.08] text-stone-300"
          }`}>
            <Sparkles className="w-4 h-4 text-[#D4A359]" />
            人生模拟 · 原生家庭档案
          </div>
          <h1 className={`text-2xl sm:text-4xl font-bold tracking-normal mb-2.5 font-narrative-serif ${
            isLight ? "text-stone-900" : "text-stone-100"
          }`}>
            随机投胎 · 抽取人生底牌
          </h1>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-reading-sans ${
            isLight ? "text-stone-600" : "text-stone-300"
          }`}>
            人无法自主挑选起点。每一个随机生成的家庭，都对应着一段真实的成长轨迹与社会现实。
          </p>
        </div>

        {/* Slot Reel */}
        <div className={`border rounded-2xl p-5 sm:p-7 shadow-xl mb-6 transition-colors ${
          isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#12141C] border-white/[0.07] text-stone-100"
        }`}>
          <div className={`flex items-center justify-between text-xs sm:text-sm mb-4 border-b pb-3 font-reading-sans ${
            isLight ? "text-stone-500 border-stone-200" : "text-stone-400 border-white/[0.06]"
          }`}>
            <span className="flex items-center gap-2 text-[#D4A359] font-medium">
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

          <div className={`relative overflow-hidden h-28 sm:h-32 rounded-xl border flex items-center justify-center ${
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
            <span className="text-xs sm:text-sm">
              {isSpinning ? "齿轮飞速运转中..." : "全国34省级行政区全覆盖 · 107套专属风土人生剧本 · 投胎由命"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTheme}
                className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                  isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-[#181B26] hover:bg-[#1E2230] border-white/[0.08] text-stone-200"
                }`}
                title={isLight ? "切换为深色模式" : "切换为浅色护眼模式"}
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
              </button>
              <button
                onClick={spinReel}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 active:scale-[0.98] ${
                  isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-[#181B26] hover:bg-[#1E2230] border-white/[0.08] text-stone-200"
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 text-amber-400 ${isSpinning ? "animate-spin" : ""}`} />
                随机轮盘
              </button>
            </div>
          </div>
        </div>

        {/* Dossier Card */}
        <div className={`border rounded-2xl p-5 sm:p-7 shadow-xl space-y-5 transition-colors ${
          isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#12141C] border-white/[0.07] text-stone-100"
        }`}>
          <div className={`flex items-center justify-between border-b pb-4 ${
            isLight ? "border-stone-200" : "border-white/[0.06]"
          }`}>
            <div>
              <span className="text-xs font-mono-num text-[#D4A359] uppercase tracking-wider block mb-1">
                【生平档案编号 · 0岁】
              </span>
              <h2 className={`text-xl sm:text-2xl font-bold flex items-center gap-3 font-narrative-serif ${
                isLight ? "text-stone-900" : "text-stone-100"
              }`}>
                <span>{charData.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-md border font-reading-sans font-normal ${
                  isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-[#181B26] border-white/[0.08] text-stone-300"
                }`}>
                  {charData.gender} · 1998年生
                </span>
              </h2>
            </div>
            <div className="text-right">
              <span className={`text-xs block font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>阶层水位 · 家庭底资</span>
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
              <button
                onClick={() => handleRestart(charData.family.province)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1 active:scale-95 ${
                  isLight
                    ? "bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950 shadow-sm font-semibold"
                    : "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300 shadow-sm font-semibold"
                }`}
                title="同省重抽：切换到本省另一个截然不同的出生地、医院与家庭背景"
              >
                <RotateCcw className="w-3 h-3 text-amber-500" />
                <span>换本省剧本</span>
              </button>
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
              <p className={`leading-relaxed text-xs sm:text-[13px] font-reading-sans pl-8 ${
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
              <p className={`leading-relaxed text-xs sm:text-[13px] font-reading-sans pl-8 ${
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
              <p className={`text-xs sm:text-[13px] leading-relaxed font-reading-sans pl-8 ${
                isLight ? "text-stone-700" : "text-stone-300"
              }`}>
                {charData.family.housing}
              </p>
              <p className={`text-xs mt-1 font-reading-sans pl-8 ${
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
                <span>同胞与情感底色</span>
              </div>
              <p className={`text-xs sm:text-[13px] leading-relaxed font-reading-sans pl-8 ${
                isLight ? "text-stone-700" : "text-stone-300"
              }`}>
                {charData.family.siblings} — {charData.family.siblingsDetail}
              </p>
              <p className={`text-xs mt-1 font-reading-sans pl-8 ${
                isLight ? "text-amber-800 font-medium" : "text-[#D4A359]/90"
              }`}>{charData.family.emotionalTone}</p>
            </div>
          </div>

          <div className={`pt-3 border-t flex justify-end ${
            isLight ? "border-stone-200" : "border-white/[0.06]"
          }`}>
            <button
              onClick={startSimulation}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 active:scale-[0.99] font-narrative-serif tracking-wide"
            >
              <span>开启人生</span>
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
    if (currentNode?.age === 27 && !logEntries.some((e) => e.age === 63)) {
      return "迈向三十岁 · 而立之年";
    }
    return "从容启程，迈向下一岁";
  };

  const getChoicePresentation = (choice: LifeChoice, cIdx: number) => {
    let stance = choice.stanceBadge || '';
    let cleanText = choice.text;

    const bracketMatch = choice.text.match(/^【(.*?)】\s*(.*)$/);
    if (bracketMatch) {
      if (!stance) stance = bracketMatch[1];
      cleanText = bracketMatch[2];
    }

    let archetype: 'merit' | 'hustle' | 'zen' | 'global' = 'merit';
    if (stance) {
      if (
        stance.includes('苦修') ||
        stance.includes('登顶') ||
        stance.includes('做题') ||
        stance.includes('考场') ||
        stance.includes('狂徒') ||
        stance.includes('书香') ||
        stance.includes('争优') ||
        stance.includes('硬拼') ||
        stance.includes('透支') ||
        stance.includes('硬骨') ||
        stance.includes('顺从') ||
        stance.includes('夺冠')
      ) {
        archetype = 'merit';
      } else if (
        stance.includes('偏锋') ||
        stance.includes('商') ||
        stance.includes('极客') ||
        stance.includes('法理') ||
        stance.includes('手艺') ||
        stance.includes('野性') ||
        stance.includes('创富') ||
        stance.includes('工匠') ||
        stance.includes('机变') ||
        stance.includes('领袖') ||
        stance.includes('电竞') ||
        stance.includes('统筹')
      ) {
        archetype = 'hustle';
      } else if (
        stance.includes('旷野') ||
        stance.includes('自洽') ||
        stance.includes('浪游') ||
        stance.includes('逍遥') ||
        stance.includes('生活') ||
        stance.includes('哲思') ||
        stance.includes('坦然') ||
        stance.includes('松弛') ||
        stance.includes('科学') ||
        stance.includes('乐天') ||
        stance.includes('温情') ||
        stance.includes('风骨') ||
        stance.includes('草莽')
      ) {
        archetype = 'zen';
      } else if (
        stance.includes('出海') ||
        stance.includes('降维') ||
        stance.includes('世界') ||
        stance.includes('海外') ||
        stance.includes('破局') ||
        stance.includes('外语')
      ) {
        archetype = 'global';
      } else {
        archetype = cIdx === 0 ? 'merit' : cIdx === 1 ? 'hustle' : 'zen';
      }
    } else {
      const d = choice.delta || {};
      const tags = choice.addTags || [];
      if (
        (d.rebellion ?? 0) >= 20 ||
        cleanText.includes('出海') ||
        cleanText.includes('海外') ||
        cleanText.includes('外语')
      ) {
        archetype = 'global';
        stance = '降维出海';
      } else if (
        (d.savings ?? 0) > 80 ||
        tags.some((t) => t.includes('商') || t.includes('市井') || t.includes('手艺') || t.includes('实操'))
      ) {
        archetype = 'hustle';
        stance = '偏锋破局';
      } else if ((d.happiness ?? 0) >= 15 || (d.health ?? 0) >= 10) {
        archetype = 'zen';
        stance = '旷野自洽';
      } else {
        archetype = 'merit';
        stance = '苦修登顶';
      }
    }

    const tradeOffs: { label: string; tone: 'danger' | 'cash' | 'academic' | 'zen' | 'social' | 'global' }[] = [];
    const d = choice.delta || {};

    if ((d.health ?? 0) <= -10 || (d.happiness ?? 0) <= -10) {
      tradeOffs.push({ label: '⚠️ 身心透支', tone: 'danger' });
    }
    if ((d.savings ?? 0) >= 80) {
      tradeOffs.push({ label: `💰 现金 +¥${d.savings}`, tone: 'cash' });
    }
    if ((d.academicCapital ?? 0) >= 15 || (d.cognition ?? 0) >= 20) {
      tradeOffs.push({ label: '📚 学术/应试跃升', tone: 'academic' });
    }
    if ((d.happiness ?? 0) >= 15 || (d.health ?? 0) >= 10) {
      tradeOffs.push({ label: '🌿 充盈自洽', tone: 'zen' });
    }
    if ((d.social ?? 0) >= 15) {
      tradeOffs.push({ label: '🤝 四海人脉', tone: 'social' });
    }
    if ((d.rebellion ?? 0) >= 20 || cleanText.includes('出海') || cleanText.includes('海外')) {
      tradeOffs.push({ label: '🌐 出海潜能', tone: 'global' });
    }

    return { stance, cleanText, detail: choice.detail, archetype, tradeOffs };
  };

// Derived state for 1-in-8-billion (十四亿分之一) single-stage memoir theatre
  const isRetired = logEntries.some((e) => e.age === 63);
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
  const isWaitingCurrentChoice = !isRetired && waitingForChoice;
  const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
  const finalVerdict = isRetired
    ? generateFinalLifetimeVerdict(chosenPath, currentTrack, attrs, tags, logEntries)
    : null;

  const getChapterName = (age: number) => {
    if (age <= 6) return '启蒙韶华';
    if (age <= 12) return '故土童年';
    if (age <= 18) return '应试分流';
    if (age <= 22) return '象牙塔尖';
    if (age <= 30) return '初入社会';
    if (age <= 45) return '中流砥柱';
    if (age <= 55) return '天命不惑';
    return '从心之年';
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
    <div className={`h-[calc(100vh-64px)] flex flex-col font-reading-sans overflow-hidden transition-colors duration-300 relative select-none ${
      isLight ? "bg-[#F7F5F0] text-stone-900" : "bg-[#0A0B0E] text-stone-100"
    }`}>
      {/* ================================================================= */}
      {/* 1. TOP AMBIENT NAVIGATION BAR (顶部微光长廊与全局控制)                */}
      {/* ================================================================= */}
      <header className={`h-13 border-b px-3 sm:px-6 flex items-center justify-between shrink-0 text-xs transition-colors duration-200 z-20 ${
        isLight ? "bg-white/95 border-stone-200 text-stone-700 shadow-2xs backdrop-blur-md" : "bg-[#0E1017]/95 border-white/[0.07] text-stone-300 backdrop-blur-md"
      }`}>
        {/* Left: Brand & Identity Dossier Pill */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#D4A359]/20 to-[#C29348]/10 border border-[#D4A359]/30 text-[#D4A359] font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-narrative-serif tracking-wider text-[11px] sm:text-xs">十四亿分之一</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-reading-sans truncate">
            <span className={`px-2 py-0.5 rounded border ${
              isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-white/[0.04] border-white/[0.08] text-stone-300"
            }`}>
              {charData.family.province || charData.family.region.split('·')[0].trim()} · {charData.family.cityOrCounty}
            </span>
            <span className={`px-2 py-0.5 rounded border ${
              isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-white/[0.04] border-white/[0.08] text-stone-300"
            }`}>
              {charData.gender}
            </span>
            <span className={`px-2 py-0.5 rounded border ${
              isLight ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-[#D4A359]/10 border-[#D4A359]/25 text-[#D4A359]"
            }`}>
              {charData.family.wealthTier}
            </span>
          </div>
        </div>

        {/* Center: Current Year & Chapter */}
        <div className="flex items-center gap-2">
          <span className={`font-semibold flex items-center gap-1.5 font-narrative-serif text-xs sm:text-sm ${
            isLight ? "text-stone-900" : "text-stone-100"
          }`}>
            <Calendar className="w-3.5 h-3.5 text-[#E0B26A]" />
            公历 {birthYear + currentAge} 年 · {currentAge} 岁
          </span>
          <span className={`text-[11px] px-2 py-0.5 rounded font-narrative-serif border ${
            isLight
              ? "bg-stone-100 border-stone-200 text-stone-600"
              : "bg-white/[0.04] border-white/[0.08] text-stone-400"
          }`}>
            {getChapterName(currentAge)}
          </span>
        </div>

        {/* Right: Controls & Memoir Drawer Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Memoir Drawer Trigger */}
          <button
            onClick={() => setShowMemoirDrawer(true)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              isLight
                ? "bg-amber-50/80 hover:bg-amber-100/80 border-amber-300 text-amber-900"
                : "bg-[#D4A359]/15 hover:bg-[#D4A359]/25 border-[#D4A359]/40 text-[#D4A359]"
            }`}
            title="查看完整生平岁月忆录抽屉"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>岁月忆录</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-num font-bold ${
              isLight ? "bg-amber-200 text-amber-950" : "bg-[#D4A359]/30 text-amber-300"
            }`}>
              {logEntries.length}
            </span>
          </button>

          {/* Ending Codex Trigger */}
          <button
            onClick={() => setShowCodexModal(true)}
            className={`px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300"
            }`}
            title="16种终局图鉴"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">终局</span>
            <span className="font-mono-num">{unlockedEndings.length}/16</span>
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={() => handleSetFontSize(readerFontSize === 'normal' ? 'large' : readerFontSize === 'large' ? 'huge' : 'normal')}
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300"
            }`}
            title="切换字号（标准 / 大字 / 特大）"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{readerFontSize === 'normal' ? '标准' : readerFontSize === 'large' ? '大字' : '特大'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300"
            }`}
            title="切换明暗主题"
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
          </button>

          {/* Restart */}
          <button
            onClick={() => handleRestart()}
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isLight
                ? "bg-stone-100 hover:bg-rose-50 border-stone-300 text-stone-700 hover:text-rose-700 hover:border-rose-300"
                : "bg-white/[0.05] hover:bg-rose-950/30 border-white/[0.08] text-stone-300 hover:text-rose-400 hover:border-rose-800/40"
            }`}
            title="重新投胎轮回"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重开</span>
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. 0~63 LIFELINE PROGRESS TRACK (0~63岁生命微光长廊)                */}
      {/* ================================================================= */}
      <div className={`h-7 px-4 sm:px-8 border-b flex items-center gap-3 shrink-0 text-[10px] sm:text-[11px] font-mono-num transition-colors duration-200 z-10 ${
        isLight ? "bg-stone-50 border-stone-200 text-stone-500" : "bg-[#0B0D13] border-white/[0.05] text-stone-400"
      }`}>
        <span className="shrink-0 font-narrative-serif text-[#D4A359]">0岁 降生</span>
        <div className="flex-1 relative flex items-center">
          {/* Base track */}
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${
            isLight ? "bg-stone-200" : "bg-white/[0.08]"
          }`}>
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-[#D4A359] to-[#E0B26A] transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, (currentAge / 63) * 100))}%` }}
            />
          </div>

          {/* Key Milestone Markers */}
          {[
            { age: 18, label: '18岁 成人' },
            { age: 21, label: '21岁 毕业' },
            { age: 27, label: '27岁 岔路' },
            { age: 35, label: '35岁 中流' },
            { age: 52, label: '52岁 知天命' },
          ].map((m) => {
            const leftPct = (m.age / 63) * 100;
            const isPassed = currentAge >= m.age;
            return (
              <div
                key={m.age}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group pointer-events-none"
                style={{ left: `${leftPct}%` }}
              >
                <div
                  className={`w-2 h-2 rounded-full border transition-all ${
                    isPassed
                      ? "bg-amber-400 border-amber-500 scale-110 shadow-xs"
                      : isLight
                        ? "bg-stone-300 border-stone-400"
                        : "bg-stone-700 border-stone-600"
                  }`}
                />
              </div>
            );
          })}

          {/* Current Pinpoint Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none flex flex-col items-center"
            style={{ left: `${Math.min(100, Math.max(0, (currentAge / 63) * 100))}%` }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#D4A359] to-[#F3C87A] border-2 border-white shadow-md flex items-center justify-center animate-pulse" />
          </div>
        </div>
        <span className="shrink-0 font-narrative-serif text-[#D4A359]">63岁 终局</span>
      </div>

      {/* ================================================================= */}
      {/* 3. VITAL ATTRIBUTES AMBIENT RIBBON (生命态势条 HUD)                  */}
      {/* ================================================================= */}
      <div className={`py-1.5 px-3 sm:px-6 border-b flex flex-wrap items-center justify-between gap-y-1 text-xs shrink-0 transition-colors duration-200 z-10 ${
        isLight ? "bg-[#FAF9F5] border-stone-200 text-stone-700" : "bg-[#0D0F16] border-white/[0.05] text-stone-300"
      }`}>
        {/* Core Attributes */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1">
          {/* Health */}
          <div className="flex items-center gap-1.5" title={`体魄 ${attrs.health}/100 · ${getHealthDesc(attrs.health)}`}>
            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px] text-stone-500">体魄</span>
            <span className="font-mono-num font-bold text-xs">{attrs.health}</span>
          </div>

          {/* Cognition */}
          <div className="flex items-center gap-1.5" title={`见识 ${attrs.cognition}/100 · ${getCognitionDesc(attrs.cognition)}`}>
            <Brain className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] text-stone-500">见识</span>
            <span className="font-mono-num font-bold text-xs">{attrs.cognition}</span>
          </div>

          {/* Happiness */}
          <div className="flex items-center gap-1.5" title={`幸福 ${attrs.happiness}/100 · ${getHappinessDesc(attrs.happiness)}`}>
            <Smile className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-stone-500">幸福</span>
            <span className="font-mono-num font-bold text-xs">{attrs.happiness}</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-1.5" title={`人脉 ${attrs.social}/100 · ${getSocialDesc(attrs.social)}`}>
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] text-stone-500">人脉</span>
            <span className="font-mono-num font-bold text-xs">{attrs.social}</span>
          </div>

          {/* Personal Savings */}
          <div className="flex items-center gap-1.5" title="个人当前现金总积蓄">
            <Coins className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px] text-stone-500">个人现金</span>
            <span className={`font-mono-num font-bold text-xs ${
              attrs.savings < 0
                ? "text-rose-500 font-extrabold"
                : isLight ? "text-emerald-800" : "text-emerald-400"
            }`}>
              {formatMoney(attrs.savings)}
            </span>
          </div>

          {/* Family Savings */}
          <div className="flex items-center gap-1.5" title="老家父母节余/底资">
            <Home className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] text-stone-500">原生家庭</span>
            <span className={`font-mono-num font-bold text-xs ${
              attrs.familySavings < 0
                ? "text-rose-500 font-extrabold"
                : isLight ? "text-stone-700" : "text-stone-300"
            }`}>
              {formatMoney(attrs.familySavings)}
            </span>
          </div>
        </div>

        {/* Crisis Warning Banner */}
        {crisisWarning && (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[11px] font-medium animate-pulse">
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>{crisisWarning.title}</span>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* 4. MAIN STAGE THEATRE (核心单幕剧场 · 绝不向下堆叠卡片)               */}
      {/* ================================================================= */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 relative">
        {/* =============================================================== */}
        {/* VIEW A: 终局人生纪念卡 (80亿分之一 标志性生平画卷)                */}
        {/* =============================================================== */}
        {isRetired && finalVerdict ? (
          <div className={`w-full max-w-3xl rounded-3xl border p-6 sm:p-9 space-y-7 shadow-2xl relative transition-all duration-300 my-auto animate-year-enter ${
            isLight
              ? "bg-[#FAF8F5] border-amber-900/25 shadow-amber-950/10 text-stone-900"
              : "bg-[#0F111A] border-[#D4A359]/30 shadow-black/80 text-stone-100"
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
              <span className="text-xs text-stone-500 font-reading-sans">0 ~ 63岁 完整生平盖印</span>
            </div>

            {/* Grand Summary Title & Tagline */}
            <div className="text-center space-y-2">
              <h1 className={`text-2xl sm:text-3xl font-extrabold font-narrative-serif tracking-wide ${
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
            {/* 80-BILLION-STYLE EPITAPH TO ONESELF (终局对自己的寄语 · 朱砂印讫)  */}
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
                    <button
                      onClick={() => setEpitaphConfirmed(false)}
                      className="text-[11px] text-stone-400 hover:text-amber-400 underline transition-colors"
                    >
                      修改寄语
                    </button>
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
                              confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                            } catch {}
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          setEpitaphConfirmed(true);
                          try {
                            confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                          } catch {}
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm font-narrative-serif tracking-wide shadow-md active:scale-95 transition-all shrink-0"
                      >
                        朱砂印讫
                      </button>
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
                        <button
                          key={preset}
                          onClick={() => setEpitaphInput(preset)}
                          className={`px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
                            isLight
                              ? "bg-white hover:bg-stone-100 border-stone-200 text-stone-600"
                              : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-stone-400 hover:text-stone-200"
                          }`}
                        >
                          “{preset}”
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-red-700/50 bg-red-950/30 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-red-400 font-mono-num font-semibold">【朱砂印讫 · 一生圆满】</div>
                      <div className="text-sm sm:text-base font-narrative-serif text-amber-200 italic font-semibold">
                        “{epitaphInput || '不虚此生，无怨无悔。'}”
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg border-2 border-red-600 text-red-500 flex items-center justify-center font-serif text-sm font-bold rotate-6 shrink-0 shadow-inner">
                      印讫
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grand Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleCopyRecord}
                className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                  copied
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-[#181B26] hover:bg-[#202534] border-white/[0.1] text-stone-200"
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{copied ? '生平录已复制' : '复制人生全卷 (含寄语)'}</span>
              </button>

              <button
                onClick={() => setShowMemoirDrawer(true)}
                className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                  isLight
                    ? "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900"
                    : "bg-[#D4A359]/15 hover:bg-[#D4A359]/25 border-[#D4A359]/40 text-[#D4A359]"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>展开生平完整回忆录</span>
              </button>

              <button
                onClick={() => handleRestart()}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all font-narrative-serif"
              >
                <RotateCcw className="w-4 h-4" />
                <span>开启全新轮回</span>
              </button>
            </div>
          </div>
        ) : (
          /* =============================================================== */
          /* VIEW B: 聚焦单卡剧场 (当前岁月 · 零向下堆叠)                    */
          /* =============================================================== */
          <div
            key={`${currentEntry.id}_${currentEntry.age}`}
            className={`w-full max-w-2xl sm:max-w-3xl rounded-3xl border p-5 sm:p-8 lg:p-10 space-y-6 shadow-2xl transition-all duration-300 my-auto animate-year-enter relative ${
              isLight
                ? "bg-white/95 border-amber-900/15 shadow-stone-300/40 text-stone-900"
                : "bg-[#11131C]/95 border-[#D4A359]/25 shadow-black/70 text-stone-100"
            }`}
          >
            {/* Top Stage Header */}
            <div className="flex items-center justify-between border-b pb-4 border-amber-500/20">
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
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold font-narrative-serif tracking-wide ${
              isLight ? "text-stone-900" : "text-stone-100"
            }`}>
              {currentEntry.title}
            </h2>

            {/* Year Scene Story Narrative */}
            <div className={`space-y-3 font-reading-sans ${getFontSizeClass()} ${
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
              <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-dashed border-stone-200 dark:border-white/[0.08]">
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
            {/* INTERACTIVE DILEMMA CHOICES (当前处于待抉择状态)                 */}
            {/* ============================================================= */}
            {isWaitingCurrentChoice && currentNode.choices && (
              <div className={`mt-5 p-4 sm:p-6 rounded-2xl border space-y-4 ${
                isLight ? "bg-amber-50/40 border-amber-300/60" : "bg-[#161824] border-[#D4A359]/40"
              }`}>
                {/* Prompt Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#D4A359] font-narrative-serif flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      重大抉择时刻 · 第 {currentAge} 岁
                    </span>
                    <h3 className={`text-sm sm:text-base font-bold font-narrative-serif ${
                      isLight ? "text-stone-900" : "text-stone-100"
                    }`}>
                      站在人生的分水岭，你需要做出抉择：
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] text-stone-400 font-mono-num">
                    按 1 / 2 / 3 键选定
                  </span>
                </div>

                {/* Option Cards */}
                <div className="grid grid-cols-1 gap-3">
                  {currentNode.choices.map((choice, cIdx) => {
                    const p = getChoicePresentation(choice, cIdx);
                    return (
                      <button
                        key={cIdx}
                        onClick={() => handleSelectChoice(choice)}
                        className={`p-4 sm:p-4.5 rounded-xl border text-left transition-all active:scale-[0.99] group shadow-xs flex items-start justify-between ${
                          isLight
                            ? "border-stone-200 bg-white hover:border-amber-500/80 hover:bg-amber-50/60 text-stone-900"
                            : "border-white/[0.08] bg-[#1C1F2E] hover:border-[#D4A359] hover:bg-[#222638] text-stone-100"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Number badge */}
                          <span className={`w-6 h-6 rounded-md border font-mono-num text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isLight
                              ? "bg-stone-100 border-stone-300 text-stone-800"
                              : "bg-[#11131C] border-white/[0.1] text-[#D4A359]"
                          }`}>
                            {cIdx + 1}
                          </span>

                          <div className="space-y-1.5">
                            {/* Stance Badge & Title */}
                            <div className="flex flex-wrap items-center gap-2">
                              {p.stance && (
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-narrative-serif ${
                                  p.archetype === 'merit'
                                    ? isLight ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : p.archetype === 'hustle'
                                    ? isLight ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : p.archetype === 'global'
                                    ? isLight ? "bg-purple-100 text-purple-900 border border-purple-300" : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : isLight ? "bg-sky-100 text-sky-900 border border-sky-300" : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                }`}>
                                  【{p.stance}】
                                </span>
                              )}
                              <span className={`text-sm sm:text-base font-bold font-reading-sans ${
                                isLight ? "text-stone-900 group-hover:text-amber-900" : "text-stone-100 group-hover:text-[#D4A359]"
                              }`}>
                                {p.cleanText}
                              </span>
                            </div>

                            {/* Detail */}
                            {p.detail && (
                              <p className={`text-xs sm:text-[13px] leading-relaxed font-reading-sans ${
                                isLight ? "text-stone-600" : "text-stone-400"
                              }`}>
                                {p.detail}
                              </p>
                            )}

                            {/* Tradeoff Pills */}
                            {p.tradeOffs.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {p.tradeOffs.map((to, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                                      to.tone === 'danger'
                                        ? isLight ? "bg-rose-50 text-rose-800 border-rose-300" : "bg-rose-950/40 text-rose-400 border-rose-800/40"
                                        : to.tone === 'cash'
                                        ? isLight ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                                        : to.tone === 'academic'
                                        ? isLight ? "bg-amber-50 text-amber-900 border-amber-300" : "bg-amber-950/40 text-amber-400 border-amber-800/40"
                                        : to.tone === 'global'
                                        ? isLight ? "bg-purple-50 text-purple-900 border-purple-300" : "bg-purple-950/40 text-purple-400 border-purple-800/40"
                                        : isLight ? "bg-sky-50 text-sky-900 border-sky-300" : "bg-sky-950/40 text-sky-400 border-sky-800/40"
                                    }`}
                                  >
                                    {to.label}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ml-2 transition-transform group-hover:translate-x-1 ${
                          isLight ? "text-stone-400 group-hover:text-amber-800" : "text-stone-400 group-hover:text-amber-300"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* SEALED CHOICE CONSEQUENCE FEEDBACK (刚做完抉择的岁月反馈)         */}
            {/* ============================================================= */}
            {currentEntry.chosenOptionText && (
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 transition-all ${
                isLight ? "bg-amber-50/70 border-amber-300/80 text-stone-900" : "bg-[#181B28] border-[#D4A359]/40 text-stone-100"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-bold font-narrative-serif text-[#D4A359]">
                    【抉择印讫 · {currentEntry.chosenOptionText}】
                  </span>
                </div>
                {currentEntry.chosenReaction && (
                  <p className={`text-xs sm:text-sm italic font-reading-sans leading-relaxed ${
                    isLight ? "text-stone-700" : "text-stone-300"
                  }`}>
                    “{currentEntry.chosenReaction}”
                  </p>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* PRIMARY NEXT STEP FORWARD BUTTON (推进下一岁，绝无堆叠)           */}
            {/* ============================================================= */}
            {!isWaitingCurrentChoice && (
              <div className="pt-2">
                <button
                  onClick={handleNextNaturalYear}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4A359] via-[#E0B26A] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-950/20 active:scale-[0.99] transition-all font-narrative-serif tracking-wide group"
                >
                  <span>{getNextStepLabel()}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span className="text-[11px] font-normal opacity-75 hidden sm:inline ml-1 font-mono-num">
                    (按空格 Space 推进)
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* 5. BOTTOM FLOATING CONTROL DOCK (底部沉浸控制坞)                     */}
      {/* ================================================================= */}
      <footer className={`h-14 sm:h-15 border-t px-3 sm:px-6 flex items-center justify-between shrink-0 text-xs transition-colors duration-200 z-20 ${
        isLight ? "bg-white/95 border-stone-200 text-stone-700 shadow-2xs backdrop-blur-md" : "bg-[#0E1017]/95 border-white/[0.07] text-stone-300 backdrop-blur-md"
      }`}>
        {/* Left: Auto-play Engine Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              if (!waitingForChoice && !showGaokaoModal && !isRetired) {
                setIsAutoPlaying((prev) => !prev);
              }
            }}
            disabled={waitingForChoice || showGaokaoModal || isRetired}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
              isAutoPlaying
                ? "bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm"
                : isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700 disabled:opacity-40"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-stone-300 disabled:opacity-40"
            }`}
            title="快捷键: A 键切换自动播放"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isAutoPlaying ? '暂停' : '自动流转'}</span>
            <span className="text-[10px] opacity-75 font-mono-num">(A)</span>
          </button>

          {/* Speed Preset Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { val: 2.0, label: '0.8x' },
              { val: 1.2, label: '1.0x' },
              { val: 0.8, label: '1.5x' },
            ].map((sp) => (
              <button
                key={sp.label}
                onClick={() => setAutoPlaySpeed(sp.val)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono-num transition-colors ${
                  Math.abs(autoPlaySpeed - sp.val) < 0.1
                    ? isLight ? "bg-stone-300 text-stone-900 font-bold" : "bg-white/[0.15] text-[#D4A359] font-bold"
                    : isLight ? "text-stone-500 hover:text-stone-800" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Quick Skip to Next Milestone / Decision */}
        <div className="flex items-center justify-center">
          {isWaitingCurrentChoice ? (
            <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-xs animate-pulse font-narrative-serif">
              <Sparkles className="w-3.5 h-3.5" />
              <span>请在上方面板做出你的抉择 (1/2/3 键)</span>
            </div>
          ) : !isRetired ? (
            <button
              onClick={handleSkipToNextDecision}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                isLight
                  ? "bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-700 hover:border-amber-400"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-stone-300 hover:border-[#D4A359]/50"
              }`}
              title="一键直接快进到下一个有分支选择的年龄或高考节点"
            >
              <FastForward className="w-3.5 h-3.5 text-amber-400" />
              <span>直达关键抉择</span>
            </button>
          ) : (
            <div className="text-xs text-[#D4A359] font-narrative-serif">
              ✨ 一生圆满落幕 · 岁月长卷已定格
            </div>
          )}
        </div>

        {/* Right: Memoir Drawer & Keyboard hints */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMemoirDrawer(true)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isLight
                ? "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900"
                : "bg-[#D4A359]/15 hover:bg-[#D4A359]/25 border-[#D4A359]/40 text-[#D4A359]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">岁月忆录</span>
            <span className="font-mono-num font-bold">({logEntries.length})</span>
          </button>
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono-num text-stone-500">
            <span>空格:推进</span>
            <span>·</span>
            <span>1~4:选定</span>
          </div>
        </div>
      </footer>

      {/* ================================================================= */}
      {/* 6. MEMOIR DRAWER (岁月忆录抽屉 · 随时查阅全卷生平)                    */}
      {/* ================================================================= */}
      {showMemoirDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className={`w-full max-w-xl h-full shadow-2xl flex flex-col z-50 transition-colors duration-200 ${
            isLight ? "bg-[#FAF9F5] text-stone-900" : "bg-[#0E1017] text-stone-100"
          }`}>
            {/* Drawer Header */}
            <div className={`h-14 border-b px-5 flex items-center justify-between shrink-0 ${
              isLight ? "bg-white border-stone-200" : "bg-[#12141F] border-white/[0.08]"
            }`}>
              <div className="flex items-center gap-2 font-narrative-serif font-bold text-base">
                <BookOpen className="w-4 h-4 text-[#D4A359]" />
                <span>岁月忆录 · 生平全卷</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono-num ${
                  isLight ? "bg-amber-100 text-amber-900" : "bg-[#D4A359]/20 text-[#D4A359]"
                }`}>
                  {logEntries.length} 轮岁痕
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyRecord}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-white/[0.05] border-white/[0.08] text-stone-300"
                  }`}
                  title="复制全部生平"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">{copied ? '已复制' : '复制'}</span>
                </button>
                <button
                  onClick={() => setShowMemoirDrawer(false)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isLight ? "bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200" : "bg-white/[0.05] border-white/[0.08] text-stone-300 hover:bg-white/[0.1]"
                  }`}
                  title="关闭抽屉"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Body: Origin Dossier + Chronological History */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Family Origin Dossier Card */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs font-reading-sans ${
                isLight ? "bg-white border-stone-200 shadow-2xs" : "bg-[#141622] border-white/[0.08]"
              }`}>
                <div className="text-xs font-bold text-[#D4A359] font-narrative-serif">
                  【命盘起点 · 原生家庭档案】
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
                        ? "bg-white border-stone-200 shadow-2xs"
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
                          <span>【抉择印讫】</span>
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
              <button
                onClick={() => setShowMemoirDrawer(false)}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold font-narrative-serif transition-colors ${
                  isLight
                    ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                    : "bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.1] text-stone-200"
                }`}
              >
                收起岁月忆录
              </button>
            </div>
          </div>
        </div>
      )}

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
      {showGaokaoModal && gaokaoCalc && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 animate-year-enter max-h-[90vh] overflow-y-auto transition-colors ${
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
                  <button
                    key={oIdx}
                    onClick={() => handleConfirmGaokaoStep(opt)}
                    className={`p-4 sm:p-5 rounded-xl border text-left transition-all active:scale-[0.99] group shadow-sm flex items-start justify-between ${
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: 自主指定投胎省份（34省级行政区全覆盖）                      */}
      {/* ================================================================= */}
    </div>
  );
};
