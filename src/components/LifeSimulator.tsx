import React, { useState, useEffect, useRef } from 'react';
import {
  generateRandomFamily,
  BIRTHPLACE_SLIDES,
  generateTimelineForCharacter,
  generateCareerTimeline,
  calculateGaokaoOutcome,
  generateAdultMilestones,
  getTailoredCareerSubtrackNodes,
  getCareerSubtrack,
  generateFinalLifetimeVerdict,
  detectCrisisWarning,
  ENDING_CODEX_DEFS,
  getHealthDesc,
  getHappinessDesc,
  getCognitionDesc,
  getSocialDesc,
  getInferiorityDesc,
  getAcademicDesc,
  getIndependenceDesc,
  getKinshipDesc,
  getResilienceDesc,
  getFatherDynamicStatus,
  getMotherDynamicStatus,
  getSiblingDynamicStatus
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
  ExternalLink,
  ChevronRight,
  Calendar,
  Compass,
  Play,
  Pause,
  FastForward,
  Gauge,
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
  onNavigateToSubclasses,
  onNavigateToDIY,
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
  const [mobileTab, setMobileTab] = useState<'profile' | 'log' | 'family'>('log');

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
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const feedBottomRef = useRef<HTMLDivElement>(null);

  const scrollToFeedBottom = () => {
    setTimeout(() => {
      feedBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
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
      scrollToFeedBottom();
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
    setMobileTab('log');
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
      const calc = calculateGaokaoOutcome(attrs, tags);
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
      const calc = calculateGaokaoOutcome(attrs, tags);
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
      const calc = calculateGaokaoOutcome(attrs, tags);
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
      const calc = calculateGaokaoOutcome(attrs, tags);
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

  const handleRestart = () => {
    confettiFiredRef.current = false;
    setIsAutoPlaying(false);
    const fresh = generateRandomFamily();
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
    const text = `【逃跑计划 · 一生因果纪要档案】
代号/姓名：${charData.name}（${charData.gender}）
出生地：${charData.family.region}（${birthYear}年）
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

          <div className={`mt-4 pt-3 border-t flex items-center justify-between font-reading-sans ${
            isLight ? "border-stone-200 text-stone-600" : "border-white/[0.06] text-stone-400"
          }`}>
            <span className="text-xs sm:text-sm">
              {isSpinning ? "齿轮飞速运转中..." : "不满意当前出身，可随时重新投胎"}
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
                重新投胎
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

  return (
    <div className={`h-[calc(100vh-64px)] flex flex-col font-reading-sans overflow-hidden transition-colors duration-200 ${
      isLight ? "bg-[#F4F3EF] text-stone-900" : "bg-[#0A0B0E] text-stone-100"
    }`}>
      {/* Cockpit Top Bar */}
      <header className={`h-12 border-b px-4 sm:px-6 flex items-center justify-between shrink-0 text-xs transition-colors duration-200 ${
        isLight ? "bg-white border-stone-200 text-stone-700 shadow-2xs" : "bg-[#0E1017] border-white/[0.07] text-stone-300"
      }`}>
        <div className="flex items-center gap-3">
          <span className={`font-semibold flex items-center gap-2 font-narrative-serif text-sm ${
            isLight ? "text-stone-900" : "text-stone-100"
          }`}>
            <span className="w-6 h-6 rounded-lg bg-[#D4A359]/15 border border-[#D4A359]/30 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-[#E0B26A]" />
            </span>
            公历 {birthYear + currentAge} 年 · {currentAge} 岁
          </span>
          <span className="hidden sm:inline-block text-stone-600">|</span>
          <span className="hidden sm:inline-block text-stone-400 font-narrative-serif">
            {currentAge <= 11
              ? '第一幕：故土童年'
              : currentAge <= 18
              ? '第二幕：应试分流'
              : '第三幕：步入社会'}
          </span>
        </div>

        {/* Mobile Tab Switcher */}
        <div className={`flex lg:hidden p-0.5 rounded-lg border text-[11px] ${
          isLight ? "bg-stone-100 border-stone-300" : "bg-[#13151F] border-white/[0.08]"
        }`}>
          <button
            onClick={() => setMobileTab('profile')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'profile'
                ? "bg-gradient-to-r from-[#D4A359] to-[#C29348] text-stone-950 font-bold shadow-xs"
                : isLight ? "text-stone-600 font-medium" : "text-stone-400"
            }`}
          >
            档案
          </button>
          <button
            onClick={() => setMobileTab('log')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'log'
                ? "bg-gradient-to-r from-[#D4A359] to-[#C29348] text-stone-950 font-bold shadow-xs"
                : isLight ? "text-stone-600 font-medium" : "text-stone-400"
            }`}
          >
            日志
          </button>
          <button
            onClick={() => setMobileTab('family')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'family'
                ? "bg-gradient-to-r from-[#D4A359] to-[#C29348] text-stone-950 font-bold shadow-xs"
                : isLight ? "text-stone-600 font-medium" : "text-stone-400"
            }`}
          >
            家庭
          </button>
          <button
            onClick={() => setShowCodexModal(true)}
            className={`px-2 py-1 rounded-md flex items-center gap-1 border-l ml-0.5 font-medium ${
              isLight
                ? "text-amber-900 hover:text-amber-950 border-stone-300"
                : "text-[#D4A359] hover:text-[#E0B26A] border-white/[0.08]"
            }`}
            title="结局图鉴"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{unlockedEndings.length}/16</span>
          </button>
          <button
            onClick={() => handleSetFontSize(readerFontSize === 'normal' ? 'large' : readerFontSize === 'large' ? 'huge' : 'normal')}
            className={`px-2 py-1 rounded-md flex items-center gap-1 border-l ml-0.5 text-xs font-semibold transition-colors ${
              isLight
                ? "text-stone-800 border-stone-300"
                : "text-amber-400 border-white/[0.08]"
            }`}
            title="点击切换字号（标准 / 大 / 特大）"
          >
            <Type className="w-3.5 h-3.5" />
            <span>{readerFontSize === 'normal' ? '标准' : readerFontSize === 'large' ? '大字' : '特大'}</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setShowCodexModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-reading-sans transition-all shadow-2xs ${
              isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                : "bg-[#13151F] hover:bg-[#181B26] border-white/[0.08] hover:border-[#D4A359]/50 text-[#D4A359]"
            }`}
            title="查看一生结局图鉴"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E0B26A]" />
            <span>结局图鉴 ({unlockedEndings.length}/16)</span>
          </button>

          {/* Reader Font Size Selector */}
          <div
            className={`flex items-center rounded-lg border text-xs font-reading-sans overflow-hidden ${
              isLight ? "bg-stone-100 border-stone-300" : "bg-[#13151F] border-white/[0.08]"
            }`}
            title="调节推演正文与选项字号大小"
          >
            <div className={`px-2 py-1 text-[11px] flex items-center gap-1 border-r font-medium ${
              isLight ? "border-stone-300 text-stone-600" : "border-white/[0.08] text-stone-400"
            }`}>
              <Type className="w-3 h-3 text-amber-500" />
              <span>字号</span>
            </div>
            <button
              onClick={() => handleSetFontSize('normal')}
              className={`px-2.5 py-1 text-xs transition-colors ${
                readerFontSize === 'normal'
                  ? isLight ? "bg-amber-200 text-amber-950 font-bold" : "bg-[#D4A359]/25 text-[#D4A359] font-bold"
                  : isLight ? "text-stone-600 hover:text-stone-900" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              标准
            </button>
            <button
              onClick={() => handleSetFontSize('large')}
              className={`px-2.5 py-1 text-xs border-l transition-colors ${
                isLight ? "border-stone-300" : "border-white/[0.08]"
              } ${
                readerFontSize === 'large'
                  ? isLight ? "bg-amber-200 text-amber-950 font-bold" : "bg-[#D4A359]/25 text-[#D4A359] font-bold"
                  : isLight ? "text-stone-600 hover:text-stone-900" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              大字
            </button>
            <button
              onClick={() => handleSetFontSize('huge')}
              className={`px-2.5 py-1 text-xs border-l transition-colors ${
                isLight ? "border-stone-300" : "border-white/[0.08]"
              } ${
                readerFontSize === 'huge'
                  ? isLight ? "bg-amber-200 text-amber-950 font-bold" : "bg-[#D4A359]/25 text-[#D4A359] font-bold"
                  : isLight ? "text-stone-600 hover:text-stone-900" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              特大
            </button>
          </div>

          {/* Dual Financial Badges: Personal Cash vs Family Savings */}
          <div
            className={`flex items-center gap-2.5 px-3 py-1 rounded-lg border text-xs ${
              isLight ? "bg-stone-100 border-stone-300" : "bg-[#13151F] border-white/[0.08]"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                {currentAge < 18 ? "个人零花" : "个人现金"}：
              </span>
              <span
                className={`font-mono-num font-semibold ${
                  attrs.savings >= 0
                    ? isLight ? "text-amber-800" : "text-amber-300"
                    : "text-rose-500"
                }`}
              >
                ¥{attrs.savings.toLocaleString()}
              </span>
            </div>
            <span className={isLight ? "text-stone-300" : "text-stone-600"}>|</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                {currentAge < 23 ? "家庭储蓄" : "老家父母储蓄"}：
              </span>
              <span
                className={`font-mono-num font-semibold ${
                  attrs.familySavings >= 0
                    ? isLight ? "text-teal-700" : "text-teal-300"
                    : "text-rose-500"
                }`}
              >
                ¥{attrs.familySavings.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Quick Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-reading-sans transition-all ${
              isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                : "bg-[#13151F] hover:bg-[#181B26] border-white/[0.08] text-stone-300 hover:text-white"
            }`}
            title={isLight ? "切换为深色古砚墨香模式" : "切换为浅色素雅宣纸模式"}
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
            onClick={handleRestart}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-reading-sans group transition-all ${
              isLight
                ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                : "bg-[#13151F] hover:bg-[#181B26] border-white/[0.08] text-stone-300 hover:text-white"
            }`}
            title="重新投胎"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-all duration-300" />
            <span>重新投胎</span>
          </button>
        </div>
      </header>

      {/* 3-Column Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================================================================= */}
        {/* LEFT COLUMN: Personal Info & 4 Core Stats                        */}
        {/* ================================================================= */}
        <aside
          className={`${
            mobileTab === 'profile' ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-72 shrink-0 border-r p-4 flex-col gap-4 overflow-y-auto transition-colors ${
            isLight ? "border-stone-200 bg-[#FAF9F6] text-stone-800" : "border-white/[0.07] bg-[#0D0F15] text-stone-100"
          }`}
        >
          {/* Identity Card */}
          <div className={`border rounded-xl p-4 space-y-2.5 shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#13151F] border-white/[0.07] text-stone-100"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-base font-bold font-narrative-serif ${isLight ? "text-stone-900" : "text-stone-100"}`}>
                {charData.name}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded border font-reading-sans ${
                isLight ? "bg-stone-100 border-stone-300 text-stone-800 font-medium" : "bg-[#181B26] border-white/[0.08] text-stone-300"
              }`}>
                {charData.gender} · {currentAge}岁
              </span>
            </div>
            <div className={`text-xs space-y-1.5 font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>
              <div>出生：{charData.family.region}</div>
              <div>阶层：{charData.family.wealthTier}</div>
              <div className={`pt-2 border-t space-y-1.5 ${isLight ? "border-stone-200" : "border-white/[0.06]"}`}>
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-2 ${isLight ? "text-stone-800 font-medium" : "text-stone-300"}`}>
                    <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Coins className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <span>{currentAge < 18 ? "个人零花现金：" : "个人可支配资产："}</span>
                  </span>
                  <span
                    className={`font-mono-num font-semibold text-sm ${
                      attrs.savings >= 0
                        ? isLight ? "text-amber-800 font-bold" : "text-amber-300"
                        : "text-rose-500 font-bold"
                    }`}
                  >
                    ¥{attrs.savings.toLocaleString()}
                  </span>
                </div>
                <div className={`flex items-center justify-between text-[11px] pl-8 ${isLight ? "text-stone-500 font-medium" : "text-stone-400"}`}>
                  <span>{currentAge < 18 ? "平时零花与跑腿零钱" : "个人薪资与日常结余"}</span>
                  <span className={`${isLight ? "text-stone-600" : "text-stone-500"} font-narrative-serif`}>
                    {currentAge < 18 ? "学杂由家庭托底" : "独立自负盈亏"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Crisis Alert Banner in Left Panel */}
          {crisisWarning && (
            <div className={`rounded-xl p-3 flex items-start gap-2.5 animate-pulse text-xs border ${
              isLight
                ? "bg-rose-50 border-rose-300 text-rose-900"
                : "bg-rose-950/40 border-rose-800/80 text-rose-200"
            }`}>
              <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? "text-rose-600" : "text-rose-400"}`} />
              <div>
                <div className={`font-semibold text-[11px] font-narrative-serif ${isLight ? "text-rose-900" : "text-rose-300"}`}>
                  {crisisWarning.title}
                </div>
                <div className={`text-[10px] mt-0.5 leading-snug font-reading-sans ${isLight ? "text-rose-700" : "text-stone-300"}`}>
                  {crisisWarning.desc}
                </div>
              </div>
            </div>
          )}

          {/* 4 Core Attributes Meters */}
          <div className={`border rounded-xl p-4 space-y-3 shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#13151F] border-white/[0.07] text-stone-100"
          }`}>
            <span className={`text-xs font-semibold uppercase tracking-wider block pb-1 border-b font-narrative-serif ${
              isLight ? "text-amber-900 border-stone-200" : "text-[#D4A359] border-white/[0.06]"
            }`}>
              四维生命状态
            </span>

            {/* Health */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-reading-sans">
                <span className={`flex items-center gap-2 font-medium ${isLight ? "text-stone-800" : "text-stone-200"}`}>
                  <div className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <HeartPulse className="w-3 h-3 text-emerald-500" />
                  </div>
                  体魄
                </span>
                <span className={`font-mono-num font-semibold ${isLight ? "text-emerald-700 font-bold" : "text-emerald-400"}`}>
                  {attrs.health}%
                </span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? "bg-stone-200" : "bg-[#1C1F2B]"}`}>
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, attrs.health))}%` }}
                />
              </div>
              <div className={`text-[11px] font-reading-sans pl-7 font-medium ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                {getHealthDesc(attrs.health)}
              </div>
            </div>

            {/* Happiness */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-reading-sans">
                <span className={`flex items-center gap-2 font-medium ${isLight ? "text-stone-800" : "text-stone-200"}`}>
                  <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Smile className="w-3 h-3 text-amber-500" />
                  </div>
                  心境
                </span>
                <span className={`font-mono-num font-semibold ${isLight ? "text-amber-800 font-bold" : "text-amber-400"}`}>
                  {attrs.happiness}%
                </span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? "bg-stone-200" : "bg-[#1C1F2B]"}`}>
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, attrs.happiness))}%` }}
                />
              </div>
              <div className={`text-[11px] font-reading-sans pl-7 font-medium ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                {getHappinessDesc(attrs.happiness)}
              </div>
            </div>

            {/* Cognition */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-reading-sans">
                <span className={`flex items-center gap-2 font-medium ${isLight ? "text-stone-800" : "text-stone-200"}`}>
                  <div className="w-5 h-5 rounded-md bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                    <Brain className="w-3 h-3 text-sky-500" />
                  </div>
                  见识
                </span>
                <span className={`font-mono-num font-semibold ${isLight ? "text-sky-700 font-bold" : "text-sky-400"}`}>
                  {attrs.cognition}%
                </span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? "bg-stone-200" : "bg-[#1C1F2B]"}`}>
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, attrs.cognition))}%` }}
                />
              </div>
              <div className={`text-[11px] font-reading-sans pl-7 font-medium ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                {getCognitionDesc(attrs.cognition)}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-reading-sans">
                <span className={`flex items-center gap-2 font-medium ${isLight ? "text-stone-800" : "text-stone-200"}`}>
                  <div className="w-5 h-5 rounded-md bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Users className="w-3 h-3 text-purple-500" />
                  </div>
                  人脉
                </span>
                <span className={`font-mono-num font-semibold ${isLight ? "text-purple-700 font-bold" : "text-purple-400"}`}>
                  {attrs.social}%
                </span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? "bg-stone-200" : "bg-[#1C1F2B]"}`}>
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, attrs.social))}%` }}
                />
              </div>
              <div className={`text-[11px] font-reading-sans pl-7 font-medium ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                {getSocialDesc(attrs.social)}
              </div>
            </div>
          </div>

          {/* 5 Distinct Qualitative Mental & Social States */}
          <div className={`border rounded-xl p-4 space-y-2 text-xs shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#13151F] border-white/[0.07] text-stone-100"
          }`}>
            <span className={`font-semibold uppercase tracking-wider block pb-1 border-b font-narrative-serif ${
              isLight ? "text-amber-900 border-stone-200" : "text-[#D4A359] border-white/[0.06]"
            }`}>
              核心心智与特质
            </span>
            <div className="flex justify-between items-center py-0.5 font-reading-sans">
              <span className={isLight ? "text-stone-700 font-medium" : "text-stone-400"}>自卑度：</span>
              <span className={`font-medium font-reading-sans ${isLight ? "text-rose-700 font-semibold" : "text-rose-400"}`}>
                {getInferiorityDesc(attrs.inferiority)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 font-reading-sans">
              <span className={isLight ? "text-stone-700 font-medium" : "text-stone-400"}>做题本钱：</span>
              <span className={`font-medium font-reading-sans ${isLight ? "text-sky-700 font-semibold" : "text-sky-400"}`}>
                {getAcademicDesc(attrs.academicCapital)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 font-reading-sans">
              <span className={isLight ? "text-stone-700 font-medium" : "text-stone-400"}>宗族羁绊：</span>
              <span className={`font-medium font-reading-sans ${isLight ? "text-amber-800 font-semibold" : "text-[#D4A359]"}`}>
                {getKinshipDesc(attrs.kinshipGuilt)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 font-reading-sans">
              <span className={isLight ? "text-stone-700 font-medium" : "text-stone-400"}>反叛心气：</span>
              <span className={`font-medium font-reading-sans ${isLight ? "text-violet-700 font-semibold" : "text-violet-400"}`}>
                {getIndependenceDesc(attrs.rebellion)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 font-reading-sans">
              <span className={isLight ? "text-stone-700 font-medium" : "text-stone-400"}>抗压韧劲：</span>
              <span className={`font-medium font-reading-sans ${isLight ? "text-emerald-700 font-semibold" : "text-emerald-400"}`}>
                {getResilienceDesc(attrs.resilience)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className={`border rounded-xl p-4 space-y-2 shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800" : "bg-[#13151F] border-white/[0.07] text-stone-100"
          }`}>
            <span className={`text-xs font-semibold block font-narrative-serif ${
              isLight ? "text-amber-900" : "text-[#D4A359]"
            }`}>
              成长烙印印记
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-0.5 rounded border text-[11px] font-reading-sans ${
                    isLight ? "bg-stone-100 border-stone-300 text-stone-800 font-medium" : "bg-[#181B26] border-white/[0.08] text-stone-300"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ================================================================= */}
        {/* MIDDLE COLUMN: Life Chronicle Log Stream (Independent Scroll)     */}
        {/* ================================================================= */}
        <main
          className={`${
            mobileTab === 'log' ? 'flex' : 'hidden'
          } lg:flex flex-1 ${
            isLight ? "bg-[#F8F7F4] text-stone-900" : "bg-[#0A0B0E] text-stone-100"
          } font-scale-${readerFontSize} flex-col h-full min-w-0 relative transition-colors`}
        >
          {/* Chronicle Feed Container */}
          <div
            ref={feedContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
          >
            {/* Centered reading column wrapper - optimized comfortable reading width */}
            <div className="max-w-[720px] mx-auto w-full space-y-4 sm:space-y-5">
            {/* Crisis Toast Alert inside Chronicle Feed */}
            {crisisWarning && !logEntries.some((e) => e.age === 63) && (
              <div className={`rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-lg animate-pulse border-2 ${
                isLight
                  ? "bg-rose-50 border-rose-300 text-rose-950"
                  : "bg-rose-950/40 border-rose-800/80 text-rose-200"
              }`}>
                <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? "text-rose-600" : "text-rose-400"}`} />
                <div className="space-y-1">
                  <h4 className={`text-base font-bold font-narrative-serif ${isLight ? "text-rose-900" : "text-rose-300"}`}>
                    {crisisWarning.title}
                  </h4>
                  <p className={`text-xs sm:text-sm leading-relaxed font-reading-sans ${isLight ? "text-rose-800" : "text-rose-200/90"}`}>
                    {crisisWarning.desc}
                  </p>
                </div>
              </div>
            )}
            {logEntries.map((entry, idx) => (
              <div
                key={entry.id + idx}
                className={`border rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5 transition-all animate-year-enter ${
                  isLight
                    ? "bg-white border-stone-200/90 hover:border-stone-300 text-stone-900 shadow-stone-200/50"
                    : "bg-[#12141C] border-white/[0.07] hover:border-white/[0.12] text-stone-100"
                }`}
              >
                {/* Entry Header */}
                <div className={`flex items-center justify-between text-xs sm:text-[14px] border-b pb-2.5 font-mono-num ${
                  isLight ? "border-stone-200 text-stone-600" : "border-white/[0.06] text-stone-400"
                }`}>
                  <span className={`font-semibold tracking-[0.06em] ${isLight ? "text-amber-800 font-bold" : "text-[#D4A359]"}`}>
                    [{entry.age}岁 · {entry.year}年]
                  </span>
                  <span className={`font-reading-sans tracking-[0.05em] ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>
                    {entry.stageName}
                  </span>
                </div>

                {/* Entry Title */}
                <h3 className={`text-lg sm:text-[21px] font-bold font-narrative-serif tracking-[0.04em] leading-snug ${
                  isLight ? "text-stone-900" : "text-stone-100"
                }`}>
                  {entry.title}
                </h3>

                {/* Narrative scene */}
                <p className={`prose-reading whitespace-pre-line ${isLight ? "text-stone-800 font-normal" : "text-stone-200"}`}>
                  {entry.scene}
                </p>

                {/* If Stat Delta present */}
                {entry.statDelta && Object.keys(entry.statDelta).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 text-xs sm:text-[13px]">
                    {entry.statDelta.health !== undefined && entry.statDelta.health !== 0 && (
                      <span
                        className={`font-mono-num px-2.5 py-0.5 rounded-md border tracking-wide ${
                          entry.statDelta.health > 0
                            ? isLight
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-medium'
                              : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                            : isLight
                            ? 'bg-rose-50 text-rose-800 border-rose-300 font-medium'
                            : 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                        }`}
                      >
                        体魄 {entry.statDelta.health > 0 ? `+${entry.statDelta.health}` : entry.statDelta.health}
                      </span>
                    )}
                    {entry.statDelta.cognition !== undefined && entry.statDelta.cognition !== 0 && (
                      <span
                        className={`font-mono-num px-2.5 py-0.5 rounded-md border tracking-wide ${
                          entry.statDelta.cognition > 0
                            ? isLight
                              ? 'bg-sky-50 text-sky-800 border-sky-300 font-medium'
                              : 'bg-sky-950/60 text-sky-400 border-sky-800/40'
                            : isLight
                            ? 'bg-rose-50 text-rose-800 border-rose-300 font-medium'
                            : 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                        }`}
                      >
                        见识 {entry.statDelta.cognition > 0 ? `+${entry.statDelta.cognition}` : entry.statDelta.cognition}
                      </span>
                    )}
                    {entry.statDelta.social !== undefined && entry.statDelta.social !== 0 && (
                      <span
                        className={`font-mono-num px-2.5 py-0.5 rounded-md border tracking-wide ${
                          entry.statDelta.social > 0
                            ? isLight
                              ? 'bg-purple-50 text-purple-800 border-purple-300 font-medium'
                              : 'bg-purple-950/60 text-purple-400 border-purple-800/40'
                            : isLight
                            ? 'bg-rose-50 text-rose-800 border-rose-300 font-medium'
                            : 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                        }`}
                      >
                        人脉 {entry.statDelta.social > 0 ? `+${entry.statDelta.social}` : entry.statDelta.social}
                      </span>
                    )}
                    {entry.statDelta.savings !== undefined && entry.statDelta.savings !== 0 && (
                      <span
                        className={`font-mono-num px-2.5 py-0.5 rounded-md border tracking-wide ${
                          entry.statDelta.savings > 0
                            ? isLight
                              ? 'bg-amber-50 text-amber-900 border-amber-300 font-medium'
                              : 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                            : isLight
                            ? 'bg-rose-50 text-rose-800 border-rose-300 font-medium'
                            : 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                        }`}
                      >
                        {entry.age < 18 ? "个人零花" : "个人现金"} {entry.statDelta.savings > 0 ? `+¥${entry.statDelta.savings}` : `-¥${Math.abs(entry.statDelta.savings)}`}
                      </span>
                    )}
                    {entry.statDelta.familySavings !== undefined && entry.statDelta.familySavings !== 0 && (
                      <span
                        className={`font-mono-num px-2.5 py-0.5 rounded-md border tracking-wide ${
                          entry.statDelta.familySavings > 0
                            ? isLight
                              ? 'bg-teal-50 text-teal-900 border-teal-300 font-medium'
                              : 'bg-teal-950/60 text-teal-300 border-teal-800/40'
                            : isLight
                            ? 'bg-orange-50 text-orange-900 border-orange-300 font-medium'
                            : 'bg-orange-950/60 text-orange-400 border-orange-800/40'
                        }`}
                      >
                        家庭储蓄 {entry.statDelta.familySavings > 0 ? `+¥${entry.statDelta.familySavings}` : `-¥${Math.abs(entry.statDelta.familySavings)}`}
                      </span>
                    )}
                  </div>
                )}

                {/* If a choice was made */}
                {entry.chosenOptionText && (
                  <div className={`mt-3 pt-3 border-t p-3.5 sm:p-4 rounded-xl space-y-2 ${
                    isLight
                      ? "bg-amber-50/70 border border-amber-200/80 text-stone-800"
                      : "border-white/[0.06] bg-[#161822] text-stone-100"
                  }`}>
                    <div className={`text-sm sm:text-[15px] font-semibold flex items-center gap-1.5 font-reading-sans tracking-[0.05em] ${
                      isLight ? "text-amber-900 font-bold" : "text-[#D4A359]"
                    }`}>
                      <span>抉择印记：</span>
                      <span>{entry.chosenOptionText}</span>
                    </div>
                    {entry.chosenReaction && (
                      <div className={`text-[13.5px] sm:text-[14.5px] leading-relaxed pl-3.5 border-l-2 font-reading-sans tracking-[0.055em] ${
                        isLight ? "text-stone-700 border-amber-500/60 font-normal" : "text-stone-300 border-[#D4A359]/40"
                      }`}>
                        {entry.chosenReaction}
                      </div>
                    )}
                  </div>
                )}

                {/* If milestone reflection present */}
                {entry.reflection && (
                  <div className={`mt-2.5 text-[13.5px] sm:text-[14.5px] pt-2.5 border-t flex items-start gap-2 p-3.5 rounded-xl font-reading-sans leading-relaxed tracking-[0.055em] ${
                    isLight
                      ? "bg-amber-100/70 text-amber-950 border border-amber-300 font-medium"
                      : "text-[#D4A359]/90 border-white/[0.06] bg-[#D4A359]/10"
                  }`}>
                    <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? "text-amber-700" : "text-[#D4A359]"}`} />
                    <span>体悟：{entry.reflection}</span>
                  </div>
                )}
              </div>
            ))}

            {/* ★★★ 六十三岁法定退休：重磅终局卡片（五维雷达图 + 16终局图鉴 + 成就徽章） ★★★ */}
            {logEntries.some((e) => e.age === 63) && (() => {
              const currentTrack = gaokaoCalc?.degreeTrack || 'double_non';
              const finalVerdict = generateFinalLifetimeVerdict(chosenPath, currentTrack, attrs, tags, logEntries);

              return (
                <div className={`border-2 rounded-2xl p-6 sm:p-8 space-y-6 animate-year-enter transition-colors ${
                  isLight
                    ? "bg-white border-amber-600/40 text-stone-900 shadow-xl"
                    : "bg-[#13151E] border-[#D4A359]/70 text-stone-100 shadow-2xl"
                }`}>
                  {/* Badge & Title */}
                  <div className={`text-center pb-4 border-b space-y-2.5 ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded font-mono-num shadow-sm ${
                          finalVerdict.ending.rarity === 'SSR'
                            ? 'bg-gradient-to-r from-[#D4A359] to-[#C29348] text-stone-950 font-bold'
                            : finalVerdict.ending.rarity === 'SR'
                            ? 'bg-purple-600 text-stone-100 font-bold'
                            : isLight
                            ? 'bg-stone-200 text-stone-800'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {finalVerdict.ending.rarity}
                      </span>
                      <span className={`text-xs font-mono-num font-semibold ${isLight ? "text-amber-800" : "text-[#D4A359]/90"}`}>
                        终局 No.{finalVerdict.ending.number < 10 ? '0' : ''}{finalVerdict.ending.number} / 16
                      </span>
                    </div>

                    <h2 className={`text-2xl sm:text-3xl font-bold tracking-normal font-narrative-serif ${
                      isLight ? "text-stone-900" : "text-[#D4A359]"
                    }`}>
                      {finalVerdict.summaryTitle}
                    </h2>
                    <div className={`text-xs sm:text-sm font-narrative-serif italic max-w-xl mx-auto ${
                      isLight ? "text-stone-600 font-medium" : "text-stone-300"
                    }`}>
                      {finalVerdict.tagline}
                    </div>
                  </div>

                  {/* 2-Column: Radar Chart + Key Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <RadarChart radar={finalVerdict.radar} isLight={isLight} />

                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`p-3 rounded-xl border ${
                          isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                        }`}>
                          <span className={`block text-[11px] font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>姓名 / 性别</span>
                          <span className={`font-medium font-narrative-serif ${isLight ? "text-stone-900" : "text-stone-100"}`}>{charData.name} · {charData.gender}</span>
                        </div>
                        <div className={`p-3 rounded-xl border ${
                          isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                        }`}>
                          <span className={`block text-[11px] font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>出生地背景</span>
                          <span className={`font-medium truncate block font-reading-sans ${isLight ? "text-stone-900" : "text-stone-100"}`}>{charData.family.region}</span>
                        </div>
                        <div className={`p-3 rounded-xl border ${
                          isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                        }`}>
                          <span className={`block text-[11px] font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>求学分流</span>
                          <span className={`font-semibold truncate block font-reading-sans ${isLight ? "text-amber-800" : "text-[#D4A359]"}`}>
                            {currentTrack === '985_211'
                              ? '985/211 核心精英'
                              : currentTrack === 'junior_college'
                              ? '公办职教 实用工匠'
                              : '普通双非 务实骨干'}
                          </span>
                        </div>
                        <div className={`p-3 rounded-xl border ${
                          isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                        }`}>
                          <span className={`block text-[11px] font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>终局个人资产</span>
                          <span className={`font-mono-num font-bold ${
                            attrs.savings >= 0
                              ? isLight ? "text-amber-800" : "text-amber-300"
                              : "text-rose-500"
                          }`}>
                            ¥{attrs.savings.toLocaleString()}
                          </span>
                        </div>
                        <div className={`p-3 rounded-xl border ${
                          isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                        }`}>
                          <span className={`block text-[11px] font-reading-sans ${isLight ? "text-stone-600 font-medium" : "text-stone-400"}`}>老家父母储备</span>
                          <span className={`font-mono-num font-bold ${
                            attrs.familySavings >= 0
                              ? isLight ? "text-teal-800" : "text-teal-300"
                              : "text-rose-500"
                          }`}>
                            ¥{attrs.familySavings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Earned Achievements Shelf */}
                      <div className={`p-3.5 rounded-xl border space-y-2 ${
                        isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                      }`}>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className={`flex items-center gap-1.5 font-narrative-serif ${isLight ? "text-amber-900 font-bold" : "text-[#D4A359]"}`}>
                            <Award className={`w-3.5 h-3.5 ${isLight ? "text-amber-700" : "text-[#D4A359]"}`} />
                            斩获人生成就 ({finalVerdict.achievements.length}/12)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {finalVerdict.achievements.map((ach) => (
                            <div
                              key={ach.id}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] border font-reading-sans ${
                                ach.rarity === 'gold'
                                  ? isLight
                                    ? 'bg-amber-100/70 border-amber-300 text-amber-950 font-semibold'
                                    : 'bg-[#D4A359]/15 border-[#D4A359]/40 text-[#D4A359]'
                                  : ach.rarity === 'purple'
                                  ? isLight
                                    ? 'bg-purple-100/70 border-purple-300 text-purple-950 font-semibold'
                                    : 'bg-purple-950/40 border-purple-600/50 text-purple-200'
                                  : isLight
                                  ? 'bg-stone-100 border-stone-300 text-stone-800 font-medium'
                                  : 'bg-[#181B26] border-white/[0.08] text-stone-300'
                              }`}
                              title={ach.description}
                            >
                              {renderAchievementIcon(ach.iconName)}
                              <span className="font-medium">{ach.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Literary Verdict Prose */}
                  <div className={`p-5 sm:p-6 rounded-xl border prose-reading whitespace-pre-line ${
                    isLight ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-[#161822] border-white/[0.06]"
                  }`}>
                    {finalVerdict.verdictText}
                  </div>

                  {/* Life Tags Badges */}
                  <div className="space-y-1.5">
                    <span className={`text-xs font-semibold block font-narrative-serif ${
                      isLight ? "text-stone-700 font-bold" : "text-stone-400"
                    }`}>
                      六十三载岁月烙印
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-reading-sans border ${
                            isLight
                              ? "bg-stone-100 text-stone-800 border-stone-300 font-medium"
                              : "bg-[#181B26] text-stone-300 border-white/[0.08]"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`pt-3 border-t flex flex-col sm:flex-row gap-2.5 font-reading-sans ${
                    isLight ? "border-stone-200" : "border-white/[0.07]"
                  }`}>
                    <button
                      onClick={handleCopyRecord}
                      className={`flex-1 py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                        isLight
                          ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                          : "border-white/[0.08] bg-[#181B26] hover:bg-[#1E2230] text-stone-100"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>已复制生平手记</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>一键复制一生档案</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowCodexModal(true)}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
                        isLight
                          ? "border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold"
                          : "border-[#D4A359]/30 bg-[#D4A359]/10 hover:bg-[#D4A359]/20 text-[#D4A359]"
                      }`}
                    >
                      <BookOpen className={`w-4 h-4 ${isLight ? "text-amber-700" : "text-[#D4A359]"}`} />
                      <span>查看16大结局图鉴</span>
                    </button>

                    {chosenPath === 'emigrate' && (
                      <button
                        onClick={() => onNavigateToSubclasses()}
                        className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
                          isLight
                            ? "border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-900 font-semibold"
                            : "border-sky-800/60 bg-sky-950/40 hover:bg-sky-900/50 text-sky-200"
                        }`}
                      >
                        <Compass className="w-4 h-4" />
                        <span>出海参考</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onNavigateToDIY()}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
                        isLight
                          ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                          : "border-white/[0.08] bg-[#181B26] hover:bg-[#1E2230] text-stone-300"
                      }`}
                    >
                      <span>DIY指南</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleRestart}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-950/40 active:scale-[0.99] font-narrative-serif"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>重新投胎</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Active Choice Card (if waiting for choice) */}
            {waitingForChoice && currentNode.choices && (
              <div className={`rounded-2xl p-4 sm:p-6 shadow-lg space-y-4 animate-year-enter transition-colors border ${
                isLight
                  ? "bg-stone-50/95 border-stone-300 text-stone-900 shadow-stone-200/50"
                  : "bg-[#11131B] border-stone-700/80 text-stone-100 shadow-stone-950/60"
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className={`flex items-center gap-2 text-sm sm:text-base font-bold ${isLight ? "text-amber-900" : "text-amber-400"}`}>
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                    <span className="tracking-[0.06em]">宿命抉择时刻 · 请斟酌你的人生航道</span>
                  </div>
                  {isAutoPlaying && (
                    <span className={`text-xs font-normal flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${
                      isLight
                        ? "bg-amber-100/70 text-amber-900 border-amber-300"
                        : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLight ? "bg-amber-600" : "bg-amber-400"}`} />
                      自动流转挂起中 · 选定后自动继续
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:gap-4 pt-1">
                  {currentNode.choices.map((choice, cIdx) => {
                    const p = getChoicePresentation(choice, cIdx);

                    return (
                      <button
                        key={cIdx}
                        onClick={() => handleSelectChoice(choice)}
                        className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-150 active:scale-[0.99] group shadow-sm flex flex-col gap-2.5 sm:gap-3 relative ${
                          isLight
                            ? "bg-white hover:bg-amber-50/40 border-stone-200 hover:border-amber-400 text-stone-900"
                            : "bg-[#161824] hover:bg-[#1D2030] border-stone-800 hover:border-amber-500/50 text-stone-100"
                        }`}
                      >
                        {/* Top row: Number + Stance Badge + TradeOff Pills */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-6 h-6 rounded-md border font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 ${
                              isLight
                                ? "bg-stone-100 text-stone-800 border-stone-300"
                                : "bg-stone-800 text-stone-200 border-stone-700"
                            }`}>
                              {cIdx + 1}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs sm:text-[13px] font-semibold border tracking-[0.06em] ${
                              isLight
                                ? "bg-amber-50 text-amber-900 border-amber-200"
                                : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                            }`}>
                              <span>【{p.stance}】</span>
                            </span>
                          </div>

                          {/* Trade-off Lens Pills */}
                          <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                            {p.tradeOffs.map((to, toIdx) => {
                              let pillColor = isLight
                                ? "bg-stone-100 text-stone-700 border-stone-200"
                                : "bg-stone-800/80 text-stone-300 border-stone-700/60";
                              if (to.tone === 'danger') {
                                pillColor = isLight
                                  ? "bg-rose-50 text-rose-800 border-rose-200"
                                  : "bg-rose-950/40 text-rose-300 border-rose-800/40";
                              } else if (to.tone === 'cash') {
                                pillColor = isLight
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : "bg-emerald-950/40 text-emerald-300 border-emerald-800/40";
                              }
                              return (
                                <span
                                  key={toIdx}
                                  className={`text-[11.5px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full border tracking-[0.04em] ${pillColor}`}
                                >
                                  {to.label}
                                </span>
                              );
                            })}
                            <span className={`hidden sm:inline-block text-xs font-mono ml-1 opacity-60 ${
                              isLight ? "text-stone-500" : "text-stone-400"
                            }`}>
                              [{cIdx + 1}]
                            </span>
                            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 transition-transform group-hover:translate-x-1 shrink-0 ml-1" />
                          </div>
                        </div>

                        {/* Main Action Text - clear, upright, prominent font size, generous letter-spacing & line-height */}
                        <div
                          style={{
                            fontSize: 'var(--choice-title-size, 17px)',
                            letterSpacing: 'var(--choice-letter-spacing, 0.09em)',
                            lineHeight: '1.76'
                          }}
                          className={`font-semibold ${
                            isLight ? "text-stone-900 group-hover:text-amber-950" : "text-stone-100 group-hover:text-white"
                          }`}
                        >
                          {p.cleanText}
                        </div>

                        {/* Detail text - clean, upright, generous letter-spacing & line-height */}
                        {p.detail && (
                          <div
                            style={{
                              fontSize: 'var(--choice-desc-size, 14px)',
                              letterSpacing: 'var(--choice-desc-letter-spacing, 0.08em)',
                              lineHeight: '1.82'
                            }}
                            className={`line-clamp-3 pt-0.5 ${
                              isLight ? "text-stone-600" : "text-stone-400"
                            }`}
                          >
                            “{p.detail}”
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Sentinel */}
            <div ref={feedBottomRef} className="h-2" />
            </div>
          </div>

          {/* Action Bar at Bottom of Middle Column */}
          {!waitingForChoice && (
            <div
              className={`py-2.5 px-4 sm:px-6 border-t ${
                isLight ? "bg-white border-stone-200 shadow-md" : "bg-[#0E1017] border-white/[0.07]"
              } flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 font-reading-sans relative min-h-[58px] transition-colors`}
            >
              {logEntries.some((e) => e.age === 63) ? (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span
                    className={`text-xs font-medium flex items-center gap-1.5 font-narrative-serif ${
                      isLight ? "text-amber-800" : "text-[#D4A359]"
                    }`}
                  >
                    <Check className="w-4 h-4 text-emerald-500" />
                    一生沧桑已成卷 · 六十三岁功德圆满
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyRecord}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isLight
                          ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800"
                          : "bg-[#181B26] hover:bg-[#1E2230] border-white/[0.08] text-stone-200"
                      }`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "已复制生平" : "一键复制一生档案"}</span>
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-950/30 active:scale-[0.98]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>开启下一世</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Left Controls: Auto-Play Toggle, Volume-style Speed Slider & Skip to Choice */}
                  <div className="flex items-center gap-2 sm:gap-2.5 z-10 w-full sm:w-auto justify-between sm:justify-start">
                    {/* Auto-Play Toggle */}
                    <button
                      onClick={() => setIsAutoPlaying((prev) => !prev)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all active:scale-[0.98] ${
                        isAutoPlaying
                          ? isLight
                            ? "bg-amber-100 border-amber-500 text-amber-900 shadow-2xs"
                            : "bg-[#D4A359]/20 border-[#D4A359] text-[#D4A359] shadow-sm shadow-amber-950/40"
                          : isLight
                          ? "bg-stone-100 border-stone-300 hover:bg-stone-200 text-stone-700"
                          : "bg-[#181B26] border-white/[0.08] hover:border-white/[0.16] text-stone-200"
                      }`}
                      title="自动推进时光流转 (快捷键: A)"
                    >
                      {isAutoPlaying ? (
                        <>
                          <Pause className={`w-3.5 h-3.5 fill-current ${isLight ? "text-amber-700" : "text-[#D4A359]"}`} />
                          <span>暂停</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] animate-ping ml-0.5" />
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                          <span>自动流转</span>
                        </>
                      )}
                    </button>

                    {/* Speed Slider (Volume-Slider Style) */}
                    <div
                      className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border ${
                        isLight ? "bg-stone-100 border-stone-300" : "bg-[#13151F] border-white/[0.08]"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <Gauge className="w-3 h-3 text-amber-600 dark:text-amber-300" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] whitespace-nowrap hidden sm:inline ${isLight ? "text-stone-600" : "text-stone-300"}`}>流速</span>
                        <input
                          type="range"
                          min="0.5"
                          max="3.0"
                          step="0.1"
                          value={autoPlaySpeed}
                          onChange={(e) => setAutoPlaySpeed(parseFloat(e.target.value))}
                          className={`w-14 sm:w-20 h-1 rounded-lg appearance-none cursor-pointer accent-[#D4A359] ${
                            isLight ? "bg-stone-300" : "bg-[#1C1F2B]"
                          }`}
                          title={`流转间隔：${autoPlaySpeed} 秒/岁（拖动左右调节快慢）`}
                        />
                        <span className={`text-[11px] font-mono-num w-8 text-right font-medium ${isLight ? "text-amber-800" : "text-amber-300"}`}>
                          {autoPlaySpeed.toFixed(1)}s
                        </span>
                      </div>
                    </div>

                    {/* Skip Directly to Next Choice */}
                    <button
                      onClick={handleSkipToNextDecision}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all active:scale-[0.98] ${
                        isLight
                          ? "bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700"
                          : "bg-[#181B26] hover:bg-[#1E2230] border-white/[0.08] hover:border-white/[0.16] text-stone-200"
                      }`}
                      title="跳过平稳过渡年，一键直达下一个人生关键抉择或高考分流"
                    >
                      <FastForward className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
                      <span className="hidden sm:inline">直达抉择</span>
                    </button>
                  </div>

                  {/* ★★★ CENTERED PRIMARY STEP BUTTON (绝对居中 / 视觉焦点) ★★★ */}
                  <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center w-full sm:w-auto z-10 py-1 sm:py-0">
                    <button
                      onClick={handleNextNaturalYear}
                      className="w-full sm:w-auto px-8 sm:px-10 py-3 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#C29348] hover:from-[#E0B26A] hover:to-[#CF9F52] text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-950/30 hover:shadow-lg active:scale-[0.98] font-narrative-serif tracking-[0.06em]"
                    >
                      <span>
                        {!gaokaoCalc && (currentNode.age === 17 || currentAge === 17)
                          ? "十八岁 · 高考放榜与成人分流"
                          : timeline[timelineIndex + 1]
                          ? timeline[timelineIndex + 1].age === 18
                            ? "十八岁 · 高考放榜与成人分流"
                            : timeline[timelineIndex + 1].age > currentAge + 1
                            ? `迈向${timeline[timelineIndex + 1].age}岁（${timeline[timelineIndex + 1].title}）`
                            : `迈入下一岁（${currentAge + 1}岁）`
                          : currentNode.age === 27 && !logEntries.some((e) => e.age === 63)
                          ? "迈向三十岁（而立之年）"
                          : "继续前行"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Right: Keyboard Shortcut Pills */}
                  <div className={`hidden xl:flex items-center gap-2 text-[11px] font-reading-sans z-10 ${isLight ? "text-stone-500" : "text-stone-400"}`}>
                    <span className="flex items-center gap-1">
                      <kbd className={`px-1.5 py-0.5 rounded border font-mono-num text-[10px] ${
                        isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-[#181B26] border-white/[0.12] text-stone-300"
                      }`}>Space</kbd>
                      推进
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <kbd className={`px-1.5 py-0.5 rounded border font-mono-num text-[10px] ${
                        isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-[#181B26] border-white/[0.12] text-stone-300"
                      }`}>1~4</kbd>
                      选支
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <kbd className={`px-1.5 py-0.5 rounded border font-mono-num text-[10px] ${
                        isLight ? "bg-stone-100 border-stone-300 text-stone-700" : "bg-[#181B26] border-white/[0.12] text-stone-300"
                      }`}>A</kbd>
                      自动
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </main>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: Family Tree & Kinship Ecosystem                     */}
        {/* ================================================================= */}
        <aside
          className={`${
            mobileTab === 'family' ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-72 shrink-0 border-l p-4 flex-col gap-4 overflow-y-auto transition-colors ${
            isLight ? "border-stone-200 bg-[#FAF9F6] text-stone-800" : "border-white/[0.07] bg-[#0D0F15] text-stone-100"
          }`}
        >
          <span className={`text-xs font-semibold uppercase tracking-wider block pb-1 border-b font-narrative-serif ${
            isLight ? "text-amber-900 border-stone-200" : "text-[#D4A359] border-white/[0.06]"
          }`}>
            原生家庭与血缘生态
          </span>

          {/* Father Dynamic Card */}
          <div className={`border rounded-xl p-3.5 space-y-2 text-xs shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800 hover:border-stone-300" : "bg-[#13151F] border-white/[0.07] text-stone-100 hover:border-white/[0.12]"
          }`}>
            <div className="flex items-center justify-between font-reading-sans">
              <span className={`flex items-center gap-2 font-semibold ${isLight ? "text-amber-900 font-bold" : "text-amber-300"}`}>
                <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <User className={`w-3.5 h-3.5 ${isLight ? "text-amber-600" : "text-amber-300"}`} />
                </div>
                父亲：{fatherStatus.age}岁
              </span>
              <span className={`font-normal ${isLight ? "text-stone-700 font-medium" : "text-stone-400"}`}>{charData.family.fatherJob}</span>
            </div>
            <div className={`text-[12px] leading-relaxed font-reading-sans pl-8 ${isLight ? "text-stone-800 font-normal" : "text-stone-300"}`}>
              {fatherStatus.status}
            </div>
            <div className={`text-[11px] pt-1.5 border-t font-reading-sans ${isLight ? "text-stone-600 border-stone-200 font-medium" : "text-stone-400 border-white/[0.06]"}`}>
              性格：{charData.family.fatherTrait}
            </div>
          </div>

          {/* Mother Dynamic Card */}
          <div className={`border rounded-xl p-3.5 space-y-2 text-xs shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800 hover:border-stone-300" : "bg-[#13151F] border-white/[0.07] text-stone-100 hover:border-white/[0.12]"
          }`}>
            <div className="flex items-center justify-between font-reading-sans">
              <span className={`flex items-center gap-2 font-semibold ${isLight ? "text-rose-800 font-bold" : "text-rose-300"}`}>
                <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <User className={`w-3.5 h-3.5 ${isLight ? "text-rose-600" : "text-rose-300"}`} />
                </div>
                母亲：{motherStatus.age}岁
              </span>
              <span className={`font-normal ${isLight ? "text-stone-700 font-medium" : "text-stone-400"}`}>{charData.family.motherJob}</span>
            </div>
            <div className={`text-[12px] leading-relaxed font-reading-sans pl-8 ${isLight ? "text-stone-800 font-normal" : "text-stone-300"}`}>
              {motherStatus.status}
            </div>
            <div className={`text-[11px] pt-1.5 border-t font-reading-sans ${isLight ? "text-stone-600 border-stone-200 font-medium" : "text-stone-400 border-white/[0.06]"}`}>
              性格：{charData.family.motherTrait}
            </div>
          </div>

          {/* Siblings */}
          <div className={`border rounded-xl p-3.5 space-y-2 text-xs shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800 hover:border-stone-300" : "bg-[#13151F] border-white/[0.07] text-stone-100 hover:border-white/[0.12]"
          }`}>
            <div className={`font-semibold flex items-center justify-between font-reading-sans ${isLight ? "text-sky-800" : "text-sky-300"}`}>
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Shield className={`w-3.5 h-3.5 ${isLight ? "text-sky-600" : "text-sky-300"}`} />
                </div>
                同胞：{siblingStatus.label}
              </span>
            </div>
            <div className={`text-[12px] leading-relaxed font-reading-sans pl-8 ${isLight ? "text-stone-800 font-normal" : "text-stone-300"}`}>
              {siblingStatus.status}
            </div>
          </div>

          {/* Housing & Family Assets */}
          <div className={`border rounded-xl p-3.5 space-y-2 text-xs shadow-sm transition-colors ${
            isLight ? "bg-white border-stone-200 text-stone-800 hover:border-stone-300" : "bg-[#13151F] border-white/[0.07] text-stone-100 hover:border-white/[0.12]"
          }`}>
            <div className={`font-semibold flex items-center justify-between font-reading-sans ${isLight ? "text-teal-800" : "text-teal-300"}`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Home className={`w-3.5 h-3.5 ${isLight ? "text-teal-600" : "text-teal-300"}`} />
                </div>
                <span>{currentAge < 23 ? "家庭居所与家庭储备" : "老家宅居与父母储备"}</span>
              </div>
              <span className={`font-mono-num font-semibold text-sm ${
                attrs.familySavings >= 0
                  ? isLight ? "text-teal-800 font-bold" : "text-teal-300"
                  : "text-rose-500 font-bold"
              }`}>
                ¥{attrs.familySavings.toLocaleString()}
              </span>
            </div>
            <div className={`text-[12px] leading-relaxed font-reading-sans pl-8 ${isLight ? "text-stone-800 font-normal" : "text-stone-300"}`}>
              {charData.family.housing}
            </div>
            <div className={`text-[11px] pt-1.5 border-t font-reading-sans flex items-center justify-between ${
              isLight ? "text-stone-600 border-stone-200 font-medium" : "text-stone-400 border-white/[0.06]"
            }`}>
              <span>{charData.family.wealthDetail}</span>
              <span className={attrs.familySavings < 0 ? (isLight ? "text-rose-600 font-semibold" : "text-rose-400 font-medium") : (isLight ? "text-stone-600 font-medium" : "text-stone-500")}>
                {attrs.familySavings < 0 ? "⚠️ 原生家庭借债负数" : "原生家庭底资"}
              </span>
            </div>
          </div>
        </aside>
      </div>

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

    </div>
  );
};