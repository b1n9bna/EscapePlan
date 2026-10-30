import React, { useState, useEffect, useRef } from 'react';
import {
  generateRandomFamily,
  BIRTHPLACE_SLIDES,
  generateTimelineForCharacter,
  generateCareerTimeline,
  calculateGaokaoOutcome,
  generateAdultMilestones,
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
  BookOpen,
  Award,
  AlertTriangle,
  X,
  Lock,
  Wrench,
  Briefcase,
  Landmark,
  HeartHandshake,
  ShieldAlert
} from 'lucide-react';

interface LifeSimulatorProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
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
}> = ({ radar }) => {
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
    <div className="flex flex-col items-center justify-center p-3 bg-[#0B0C12] border border-stone-800/80 rounded-2xl">
      <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        五维人生格局图
      </div>
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {ringPolygons.map((pts, idx) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke="#292524"
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
              stroke="#292524"
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
              stroke="#0C0E14"
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
              className="text-[10px] fill-stone-300 font-sans"
            >
              {a.label}
              <tspan className="fill-amber-400 font-mono font-semibold ml-0.5"> {a.val}</tspan>
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
}> = ({ isOpen, onClose, unlockedIds }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12131D] border border-stone-800 rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-5 sm:px-6 py-4 border-b border-stone-800 flex items-center justify-between shrink-0 bg-[#0E0F16]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2">
                <span>一生结局图鉴</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-800/60 text-amber-300 font-mono">
                  已收集 {unlockedIds.length} / 16
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                探索不同阶层起点、求学分流与出海抉择，集齐全部 16 大宿命篇章
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
          {ENDING_CODEX_DEFS.map((ed) => {
            const isUnlocked = unlockedIds.includes(ed.id);

            return (
              <div
                key={ed.id}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? ed.rarity === 'SSR'
                      ? 'bg-amber-950/20 border-amber-500/80 shadow-md shadow-amber-950/30'
                      : ed.rarity === 'SR'
                      ? 'bg-purple-950/20 border-purple-600/70'
                      : 'bg-stone-900/60 border-stone-700/80'
                    : 'bg-[#0A0B10] border-stone-800/70 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        ed.rarity === 'SSR'
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : ed.rarity === 'SR'
                          ? 'bg-purple-600 text-stone-100 font-bold'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {ed.rarity}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      No.{ed.number < 10 ? '0' : ''}{ed.number}
                    </span>
                    <span className="text-[11px] text-stone-400 font-sans">
                      · {ed.trackHint}
                    </span>
                  </div>
                  {isUnlocked ? (
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      已解锁
                    </span>
                  ) : (
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      未解锁
                    </span>
                  )}
                </div>

                <h3 className={`text-sm font-bold mb-1 ${isUnlocked ? 'text-stone-100' : 'text-stone-400'}`}>
                  {ed.title}
                </h3>
                <div className="text-[11px] text-amber-400/90 italic font-serif mb-2">
                  {ed.tagline}
                </div>

                {isUnlocked ? (
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {ed.description}
                  </p>
                ) : (
                  <div className="text-xs text-stone-400 bg-[#0E0F14] p-2.5 rounded-lg border border-stone-800/80">
                    <span className="text-amber-400/90 font-medium block mb-0.5">解锁线索：</span>
                    {ed.unlockCondition}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 border-t border-stone-800 bg-[#0E0F16] flex items-center justify-between text-xs text-stone-400 shrink-0">
          <span>图鉴记录已持久化保存在当前浏览器</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
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
  onNavigateToDIY
}) => {
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

  // 4 Core Attributes + Latent Traits
  const [attrs, setAttrs] = useState<CharacterAttributes>(() => ({
    health: 85,
    happiness: 80,
    cognition: 25,
    social: 25,
    savings: charData.family.initialSavings,
    inferiority: 20,
    academicCapital: 20,
    kinshipGuilt: 25,
    rebellion: 25,
    resilience: 25
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
      health: 85,
      happiness: 80,
      cognition: 25,
      social: 25,
      savings: charData.family.initialSavings,
      inferiority: 20,
      academicCapital: 20,
      kinshipGuilt: 25,
      rebellion: 25,
      resilience: 25
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
    const nextIdx = timelineIndex + 1;
    if (nextIdx >= timeline.length) {
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

    // Apply natural deltas if present
    if (nextNode.naturalDelta) {
      applyDelta(nextNode.naturalDelta);
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

    // Check if next year is 18 (Gaokao trigger)
    const nextIdx = timelineIndex + 1;
    if (currentNode.age === 17) {
      const calc = calculateGaokaoOutcome(attrs, tags);
      setGaokaoCalc(calc);
      setShowGaokaoModal(true);
      return;
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
      const adultMilestones = generateAdultMilestones(track, path, charData.family);

      // 将后续30, 35, 42, 52, 63岁里程碑直接串接进时间线，三栏交互彻底统一！
      const currentNodes = timeline.slice(0, timelineIndex + 1);
      setTimeline([...currentNodes, ...adultMilestones]);
      scrollToFeedBottom();
      return;
    }

    // ★★★ 中年关键抉择 (30, 35, 42岁)：选完后停留在当前年龄看反馈，通过底部按钮跨入下一岁阶段 ★★★
    if (currentNode.age >= 30) {
      scrollToFeedBottom();
      return;
    }

    if (nextIdx >= timeline.length) {
      return;
    }

    // Automatically load next natural event or choice
    const nextNode = timeline[nextIdx];
    if (nextNode.naturalDelta) {
      applyDelta(nextNode.naturalDelta);
    }
    if (nextNode.naturalTags) {
      setTags((prev) => Array.from(new Set([...prev, ...(nextNode.naturalTags || [])])));
    }

    const nextLog: ChronicleLogEntry = {
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

    setLogEntries((prev) => [...prev, nextLog]);
    setTimelineIndex(nextIdx);
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
    const fresh = generateRandomFamily();
    setCharData(fresh);
    setTimeline(generateTimelineForCharacter(fresh.family, fresh.gender));
    const matchIdx = BIRTHPLACE_SLIDES.findIndex((s) => s.region === fresh.family.region);
    if (matchIdx !== -1) setSlideIndex(matchIdx);
    setGamePhase('setup');
    setGaokaoCalc(null);
    setShowGaokaoModal(false);
    setChosenPath('stay');
    setLogEntries([]);
    setTags([]);
  };

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
终局个人储蓄：¥${attrs.savings.toLocaleString()}

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
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs sm:text-sm mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            人生模拟 · 原生家庭档案
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-2.5">
            随机投胎 · 抽取人生底牌
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            人无法自主挑选起点。每一个随机生成的家庭，都对应着一段真实的成长轨迹与社会现实。
          </p>
        </div>

        {/* Slot Reel */}
        <div className="bg-[#12131C] border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-400 mb-4 border-b border-stone-800/80 pb-3">
            <span className="flex items-center gap-2 text-amber-400 font-medium">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full bg-amber-400 ${
                  isSpinning ? 'animate-pulse' : ''
                }`}
              />
              {isSpinning ? '正在随机匹配出生地...' : '出生地已确定'}
            </span>
            <span className="text-stone-300">
              {isSpinning ? '定位中...' : charData.family.region}
            </span>
          </div>

          <div className="relative overflow-hidden h-28 sm:h-32 rounded-xl bg-[#0A0B10] border border-stone-800 flex items-center justify-center">
            <div
              className={`text-center transition-all duration-150 ${
                isSpinning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-1">{currentSlide.icon}</div>
              <div className="text-lg sm:text-xl font-bold text-stone-100 tracking-wide">
                {currentSlide.region}
              </div>
              <div className="text-xs sm:text-sm text-amber-300/80 mt-1">
                {currentSlide.landscape}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-stone-400">
              {isSpinning ? '齿轮飞速运转中...' : '不满意当前出身，可随时重新投胎'}
            </span>
            <button
              onClick={spinReel}
              disabled={isSpinning}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
              重新投胎
            </button>
          </div>
        </div>

        {/* Dossier Card */}
        <div className="bg-[#12131C] border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                【生平档案编号 · 0岁】
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-3">
                <span>{charData.name}</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 font-normal">
                  {charData.gender} · 1998年生
                </span>
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 block">阶层水位</span>
              <span className="text-xs sm:text-sm font-medium text-amber-300">
                {charData.family.wealthTier}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                父亲：{charData.family.fatherAge}岁 · {charData.family.fatherJob}
              </div>
              <p className="text-stone-300 leading-relaxed text-xs sm:text-[13px]">
                {charData.family.fatherTrait}
              </p>
            </div>

            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                母亲：{charData.family.motherAge}岁 · {charData.family.motherJob}
              </div>
              <p className="text-stone-300 leading-relaxed text-xs sm:text-[13px]">
                {charData.family.motherTrait}
              </p>
            </div>

            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-stone-300 font-semibold flex items-center gap-1.5">
                <Home className="w-4 h-4 text-stone-400" />
                居住环境与家庭资产
              </div>
              <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                {charData.family.housing}
              </p>
              <p className="text-stone-400 text-xs mt-1">{charData.family.wealthDetail}</p>
            </div>

            <div className="bg-[#0E0F14] p-4 rounded-xl border border-stone-800/80 space-y-1.5">
              <div className="text-stone-300 font-semibold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-stone-400" />
                同胞与情感底色
              </div>
              <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                {charData.family.siblings} — {charData.family.siblingsDetail}
              </p>
              <p className="text-amber-300/80 text-xs mt-1">{charData.family.emotionalTone}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800 flex justify-end">
            <button
              onClick={startSimulation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 active:scale-[0.99]"
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

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0B0F17] text-stone-100 font-sans overflow-hidden">
      {/* Cockpit Top Bar */}
      <header className="h-11 border-b border-stone-800/90 bg-[#10121A] px-4 flex items-center justify-between shrink-0 text-xs text-stone-300">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-100 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            公历 {birthYear + currentAge} 年 · {currentAge} 岁
          </span>
          <span className="hidden sm:inline-block text-stone-500">|</span>
          <span className="hidden sm:inline-block text-stone-400">
            {currentAge <= 11
              ? '第一幕：故土童年'
              : currentAge <= 18
              ? '第二幕：应试分流'
              : '第三幕：步入社会'}
          </span>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden bg-stone-900 p-0.5 rounded-lg border border-stone-800 text-[11px]">
          <button
            onClick={() => setMobileTab('profile')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'profile' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            档案
          </button>
          <button
            onClick={() => setMobileTab('log')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'log' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            日志
          </button>
          <button
            onClick={() => setMobileTab('family')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mobileTab === 'family' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            家庭
          </button>
          <button
            onClick={() => setShowCodexModal(true)}
            className="px-2 py-1 rounded-md text-amber-400 hover:text-amber-300 flex items-center gap-1 border-l border-stone-800 ml-0.5"
            title="结局图鉴"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{unlockedEndings.length}/16</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setShowCodexModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-700/60 text-amber-300 transition-colors text-xs"
            title="查看一生结局图鉴"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>结局图鉴 ({unlockedEndings.length}/16)</span>
          </button>
          <span className="text-stone-400">
            储蓄：
            <span
              className={`font-mono font-semibold ml-1 ${
                attrs.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              ¥{attrs.savings.toLocaleString()}
            </span>
          </span>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors"
            title="重新投胎"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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
          } lg:flex w-full lg:w-72 shrink-0 border-r border-stone-800/80 bg-[#111219] p-4 flex-col gap-4 overflow-y-auto`}
        >
          {/* Identity Card */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-stone-100">{charData.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                {charData.gender} · {currentAge}岁
              </span>
            </div>
            <div className="text-xs text-stone-400 space-y-1">
              <div>出生：{charData.family.region}</div>
              <div>阶层：{charData.family.wealthTier}</div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-stone-800/80">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-300">个人现金：</span>
                <span
                  className={`font-mono font-semibold ${
                    attrs.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  ¥{attrs.savings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Active Crisis Alert Banner in Left Panel */}
          {crisisWarning && (
            <div className="bg-rose-950/40 border border-rose-800/80 rounded-xl p-3 flex items-start gap-2.5 animate-pulse text-xs text-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-rose-300 text-[11px]">{crisisWarning.title}</div>
                <div className="text-[10px] text-stone-300 mt-0.5 leading-snug">{crisisWarning.desc}</div>
              </div>
            </div>
          )}

          {/* 4 Core Attributes Meters */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block pb-1 border-b border-stone-800/80">
              四维生命状态
            </span>

            {/* Health */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                  健康
                </span>
                <span className="font-mono text-emerald-400 font-semibold">{attrs.health}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.health}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getHealthDesc(attrs.health)}</div>
            </div>

            {/* Happiness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  幸福
                </span>
                <span className="font-mono text-amber-400 font-semibold">{attrs.happiness}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.happiness}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getHappinessDesc(attrs.happiness)}</div>
            </div>

            {/* Cognition */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-sky-400" />
                  认知
                </span>
                <span className="font-mono text-sky-400 font-semibold">{attrs.cognition}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.cognition}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getCognitionDesc(attrs.cognition)}</div>
            </div>

            {/* Social */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  社交
                </span>
                <span className="font-mono text-purple-400 font-semibold">{attrs.social}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-300"
                  style={{ width: `${attrs.social}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400">{getSocialDesc(attrs.social)}</div>
            </div>
          </div>

          {/* 5 Distinct Qualitative Mental & Social States */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-stone-400 block pb-1 border-b border-stone-800/80">
              核心心智与特质
            </span>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-stone-400">自卑：</span>
              <span className="text-rose-400 font-medium font-mono">
                {getInferiorityDesc(attrs.inferiority)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-stone-400">做题：</span>
              <span className="text-sky-400 font-medium font-mono">
                {getAcademicDesc(attrs.academicCapital)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-stone-400">宗族：</span>
              <span className="text-amber-400 font-medium font-mono">
                {getKinshipDesc(attrs.kinshipGuilt)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-stone-400">反叛：</span>
              <span className="text-violet-400 font-medium font-mono">
                {getIndependenceDesc(attrs.rebellion)}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-stone-400">韧劲：</span>
              <span className="text-emerald-400 font-medium font-mono">
                {getResilienceDesc(attrs.resilience)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-2">
            <span className="text-xs font-semibold text-stone-400 block">成长烙印印记</span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[11px] font-mono"
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
          } lg:flex flex-1 bg-[#0E0F14] flex-col h-full min-w-0 relative`}
        >
          {/* Chronicle Feed Container */}
          <div
            ref={feedContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
          >
            {/* Crisis Toast Alert inside Chronicle Feed */}
            {crisisWarning && !logEntries.some((e) => e.age === 63) && (
              <div className="bg-rose-950/40 border-2 border-rose-800/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-lg animate-pulse">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-300">{crisisWarning.title}</h4>
                  <p className="text-xs text-rose-200/90 leading-relaxed">{crisisWarning.desc}</p>
                </div>
              </div>
            )}
            {logEntries.map((entry, idx) => (
              <div
                key={entry.id + idx}
                className="bg-[#12131C] border border-stone-800/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5 transition-all"
              >
                {/* Entry Header */}
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/70 pb-2">
                  <span className="font-mono text-amber-400 font-medium">
                    [{entry.age}岁 · {entry.year}年]
                  </span>
                  <span className="text-stone-400">{entry.stageName}</span>
                </div>

                {/* Entry Title */}
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-stone-100">
                  {entry.title}
                </h3>

                {/* Narrative scene */}
                <p className="text-[14px] sm:text-[15px] text-stone-300 leading-relaxed whitespace-pre-line font-sans">
                  {entry.scene}
                </p>

                {/* If Stat Delta present */}
                {entry.statDelta && Object.keys(entry.statDelta).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    {entry.statDelta.health !== undefined && entry.statDelta.health !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.health > 0
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        健康 {entry.statDelta.health > 0 ? `+${entry.statDelta.health}` : entry.statDelta.health}
                      </span>
                    )}
                    {entry.statDelta.cognition !== undefined && entry.statDelta.cognition !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.cognition > 0
                            ? 'bg-sky-950/60 text-sky-400 border border-sky-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        认知 {entry.statDelta.cognition > 0 ? `+${entry.statDelta.cognition}` : entry.statDelta.cognition}
                      </span>
                    )}
                    {entry.statDelta.social !== undefined && entry.statDelta.social !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.social > 0
                            ? 'bg-purple-950/60 text-purple-400 border border-purple-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        社交 {entry.statDelta.social > 0 ? `+${entry.statDelta.social}` : entry.statDelta.social}
                      </span>
                    )}
                    {entry.statDelta.savings !== undefined && entry.statDelta.savings !== 0 && (
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${
                          entry.statDelta.savings > 0
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        现金 {entry.statDelta.savings > 0 ? `+¥${entry.statDelta.savings}` : `-¥${Math.abs(entry.statDelta.savings)}`}
                      </span>
                    )}
                  </div>
                )}

                {/* If a choice was made */}
                {entry.chosenOptionText && (
                  <div className="mt-2.5 pt-2.5 border-t border-stone-800/80 bg-[#0E0F14] p-3 rounded-xl space-y-1">
                    <div className="text-xs text-amber-400 font-medium">
                      抉择：{entry.chosenOptionText}
                    </div>
                    {entry.chosenReaction && (
                      <div className="text-xs sm:text-[13px] text-stone-400 leading-normal">
                        {entry.chosenReaction}
                      </div>
                    )}
                  </div>
                )}

                {/* If milestone reflection present */}
                {entry.reflection && (
                  <div className="mt-2 text-xs sm:text-[13px] text-amber-300/85 italic pt-2 border-t border-stone-800/60 flex items-start gap-1.5 bg-amber-950/10 p-2.5 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
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
                <div className="bg-[#141622] border-2 border-amber-600/80 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 animate-fadeIn">
                  {/* Badge & Title */}
                  <div className="text-center pb-4 border-b border-stone-800/80 space-y-2.5">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded font-mono shadow-sm ${
                          finalVerdict.ending.rarity === 'SSR'
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : finalVerdict.ending.rarity === 'SR'
                            ? 'bg-purple-600 text-stone-100 font-bold'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {finalVerdict.ending.rarity}
                      </span>
                      <span className="text-xs font-mono text-amber-300/80">
                        终局 No.{finalVerdict.ending.number < 10 ? '0' : ''}{finalVerdict.ending.number} / 16
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">
                      {finalVerdict.summaryTitle}
                    </h2>
                    <div className="text-xs sm:text-sm text-stone-300 font-serif italic max-w-xl mx-auto">
                      {finalVerdict.tagline}
                    </div>
                  </div>

                  {/* 2-Column: Radar Chart + Key Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <RadarChart radar={finalVerdict.radar} />

                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-[#0E0F14] p-2.5 rounded-xl border border-stone-800">
                          <span className="text-stone-400 block text-[11px]">姓名 / 性别</span>
                          <span className="text-stone-100 font-medium">{charData.name} · {charData.gender}</span>
                        </div>
                        <div className="bg-[#0E0F14] p-2.5 rounded-xl border border-stone-800">
                          <span className="text-stone-400 block text-[11px]">出生地背景</span>
                          <span className="text-stone-100 font-medium truncate block">{charData.family.region}</span>
                        </div>
                        <div className="bg-[#0E0F14] p-2.5 rounded-xl border border-stone-800">
                          <span className="text-stone-400 block text-[11px]">求学分流</span>
                          <span className="text-amber-400 font-medium truncate block">
                            {currentTrack === '985_211'
                              ? '985/211 核心精英'
                              : currentTrack === 'junior_college'
                              ? '公办职教 实用工匠'
                              : '普通双非 务实骨干'}
                          </span>
                        </div>
                        <div className="bg-[#0E0F14] p-2.5 rounded-xl border border-stone-800">
                          <span className="text-stone-400 block text-[11px]">终局个人储蓄</span>
                          <span className={`font-mono font-bold ${attrs.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            ¥{attrs.savings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Earned Achievements Shelf */}
                      <div className="bg-[#0E0F14] p-3 rounded-xl border border-stone-800 space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
                          <span className="flex items-center gap-1.5 text-amber-400">
                            <Award className="w-3.5 h-3.5" />
                            斩获人生成就 ({finalVerdict.achievements.length}/12)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {finalVerdict.achievements.map((ach) => (
                            <div
                              key={ach.id}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] border ${
                                ach.rarity === 'gold'
                                  ? 'bg-amber-950/40 border-amber-600/60 text-amber-200'
                                  : ach.rarity === 'purple'
                                  ? 'bg-purple-950/40 border-purple-600/60 text-purple-200'
                                  : 'bg-stone-800/80 border-stone-700 text-stone-300'
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
                  <div className="bg-[#0E0F14] p-4 sm:p-5 rounded-xl border border-stone-800/80 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                    {finalVerdict.verdictText}
                  </div>

                  {/* Life Tags Badges */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-stone-400 block">六十三载岁月烙印</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full bg-stone-800/90 text-stone-300 text-xs font-mono border border-stone-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={handleCopyRecord}
                      className="flex-1 py-3 px-4 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
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
                      className="py-3 px-4 rounded-xl border border-amber-700/60 bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>查看16大结局图鉴</span>
                    </button>

                    {chosenPath === 'emigrate' && (
                      <button
                        onClick={() => onNavigateToSubclasses()}
                        className="py-3 px-4 rounded-xl border border-sky-800/80 bg-sky-950/40 hover:bg-sky-900/50 text-sky-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Compass className="w-4 h-4" />
                        <span>出海参考</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onNavigateToDIY()}
                      className="py-3 px-4 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>DIY指南</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleRestart}
                      className="py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
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
              <div className="bg-[#151722] border-2 border-amber-800/70 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300">
                  <Compass className="w-4 h-4 text-amber-400" />
                  请做出你的抉择
                </div>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {currentNode.choices.map((choice, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSelectChoice(choice)}
                      className="p-3 sm:p-3.5 rounded-xl border border-stone-800 bg-[#0E0F14] hover:border-amber-500/70 hover:bg-amber-950/20 text-left transition-all active:scale-[0.99] group flex items-center justify-between"
                    >
                      <span className="text-xs sm:text-sm font-medium text-stone-100 group-hover:text-amber-300 leading-snug">
                        {choice.text}
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Sentinel */}
            <div ref={feedBottomRef} className="h-2" />
          </div>

          {/* Action Bar at Bottom of Middle Column */}
          {!waitingForChoice && (
            <div className="py-2.5 px-4 border-t border-stone-800/80 bg-[#10121A] flex items-center justify-between shrink-0">
              {logEntries.some((e) => e.age === 63) ? (
                <>
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    一生沧桑已成卷 · 六十三岁功德圆满
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyRecord}
                      className="px-3 py-1.5 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? '已复制生平' : '一键复制一生档案'}</span>
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-[0.99]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>开启下一世</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full flex items-center justify-end">
                  <button
                    onClick={handleNextNaturalYear}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-900/20 active:scale-[0.99]"
                  >
                    <span>
                      {timeline[timelineIndex + 1]
                        ? timeline[timelineIndex + 1].age > currentAge + 1
                          ? `迈向${timeline[timelineIndex + 1].age}岁（${timeline[timelineIndex + 1].title}）`
                          : `迈入下一岁（${currentAge + 1}岁）`
                        : '继续前行'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
          } lg:flex w-full lg:w-72 shrink-0 border-l border-stone-800/80 bg-[#111219] p-4 flex-col gap-4 overflow-y-auto`}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block pb-1 border-b border-stone-800/80">
            原生家庭与血缘生态
          </span>

          {/* Father Dynamic Card */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                父亲：{fatherStatus.age}岁
              </span>
              <span className="text-stone-400 font-normal">{charData.family.fatherJob}</span>
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed pt-1">
              {fatherStatus.status}
            </div>
            <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-800/70">
              性格：{charData.family.fatherTrait}
            </div>
          </div>

          {/* Mother Dynamic Card */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                母亲：{motherStatus.age}岁
              </span>
              <span className="text-stone-400 font-normal">{charData.family.motherJob}</span>
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed pt-1">
              {motherStatus.status}
            </div>
            <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-800/70">
              性格：{charData.family.motherTrait}
            </div>
          </div>

          {/* Siblings */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="text-amber-400 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                同胞：{siblingStatus.label}
              </span>
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed pt-1">
              {siblingStatus.status}
            </div>
          </div>

          {/* Housing & Family Assets */}
          <div className="bg-[#0E0F14] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="text-stone-300 font-semibold flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-stone-400" />
              家庭居所与月度压力
            </div>
            <div className="text-stone-300 text-[12px] leading-relaxed">
              {charData.family.housing}
            </div>
            <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-800/70">
              {charData.family.wealthDetail}
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
      />

      {/* ================================================================= */}
      {/* MODAL: 18yo GAOKAO CALCULATED OUTCOME MODAL                       */}
      {/* ================================================================= */}
      {showGaokaoModal && gaokaoCalc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14151E] border border-amber-700/80 rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="text-center pb-4 border-b border-stone-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/50 text-xs mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                十八岁 · 高考放榜与学业结算
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">
                {gaokaoCalc.title}
              </h2>
              <div className="text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-950/30 inline-block px-3.5 py-1 rounded-full border border-emerald-800/40">
                {gaokaoCalc.scoreText}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0E0F14] p-4 rounded-xl border border-stone-800">
              {gaokaoCalc.verdict}
            </p>

            <div className="text-xs text-stone-400 space-y-1">
              <div>【学业资本】{gaokaoCalc.academicCapitalDesc}</div>
              <div>【心理画像】{gaokaoCalc.psychologicalDossier}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="text-xs font-semibold text-amber-300 block">
                {gaokaoCalc.firstStepChoice.prompt}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {gaokaoCalc.firstStepChoice.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleConfirmGaokaoStep(opt)}
                    className="p-3 rounded-xl border border-stone-800 bg-[#0E0F14] hover:border-amber-500/70 hover:bg-amber-950/20 text-left transition-all active:scale-[0.99]"
                  >
                    <div className="text-xs sm:text-sm font-medium text-stone-100 mb-1">
                      {opt.text}
                    </div>
                    <div className="text-xs text-stone-400 leading-normal">{opt.detail}</div>
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