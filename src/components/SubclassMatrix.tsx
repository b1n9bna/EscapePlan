import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/countries';
import type { CountryData, VisaSubclass } from '../data/countries';
import { Calculator, ExternalLink, Check, AlertCircle, Award, Sparkles } from 'lucide-react';

interface SubclassMatrixProps {
  initialCountryId?: string;
  onNavigateToDIY: (countryId: string) => void;
}

export const SubclassMatrix: React.FC<SubclassMatrixProps> = ({
  initialCountryId = 'japan',
  onNavigateToDIY
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId);
  const [selectedSubclassId, setSelectedSubclassId] = useState<string>('');
  
  // Point calculator selections state: ruleId -> selectedOptionPoints
  const [calcSelections, setCalcSelections] = useState<Record<string, number>>({});

  const country: CountryData =
    COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[0];

  const currentSubclass: VisaSubclass =
    country.subclasses.find((s) => s.id === selectedSubclassId) || country.subclasses[0];

  // Calculate current point total
  const currentTotalPoints = Object.values(calcSelections).reduce((acc, val) => acc + val, 0);

  const handleCountryChange = (id: string) => {
    setSelectedCountryId(id);
    const newCountry = COUNTRIES_DATA.find((c) => c.id === id) || COUNTRIES_DATA[0];
    setSelectedSubclassId(newCountry.subclasses[0].id);
    setCalcSelections({});
  };

  const handleSelectRuleOption = (ruleId: string, points: number) => {
    setCalcSelections((prev) => ({
      ...prev,
      [ruleId]: points
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          📚 全球主流签证 Subclass 深度图谱与算分
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          拒绝中介模糊话术与黑盒垄断。官方准入门槛、永住绿卡周期、全套打分细则与提分捷径全透明公开。
        </p>
      </div>

      {/* Country Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {COUNTRIES_DATA.map((c) => {
          const isSelected = c.id === selectedCountryId;
          return (
            <button
              key={c.id}
              onClick={() => handleCountryChange(c.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#121824] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-xl">{c.flag}</span>
              <span>{c.name}</span>
              <span className="text-xs opacity-75 hidden sm:inline">({c.englishName})</span>
            </button>
          );
        })}
      </div>

      {/* Country Overview Banner */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{country.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {country.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{country.tagline}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToDIY(country.id)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition"
          >
            查看 {country.name} 手搓 DIY 路线图 ➜
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block mb-0.5">IT 开发者中位数年薪参考</span>
            <span className="font-semibold text-emerald-400">{country.medianTechSalary}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">语言门槛要求</span>
            <span className="font-medium text-slate-200">{country.languageRequirement}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">首选核心落地城市</span>
            <span className="font-medium text-slate-200">{country.capital}</span>
          </div>
        </div>
      </div>

      {/* Subclasses Tabs */}
      <div className="mb-6">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
          选择具体签证 Subclass 通道：
        </h3>
        <div className="flex flex-wrap gap-2">
          {country.subclasses.map((s) => {
            const isSelected = s.id === currentSubclass.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSubclassId(s.id);
                  setCalcSelections({});
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-blue-500 text-blue-400 shadow-sm'
                    : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subclass Detail Card */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        {/* Subclass Title & Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">{currentSubclass.name}</h3>
              <span className="text-xs text-slate-500 font-mono">({currentSubclass.englishName})</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {currentSubclass.summary}
            </p>
          </div>
          <a
            href={currentSubclass.officialLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 transition flex-shrink-0"
          >
            <span>官方移民局条例</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-500 block mb-1">审理下签周期</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              {currentSubclass.processingTime}
            </span>
          </div>
          <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-500 block mb-1">永住 / 绿卡拿取速度</span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-400">
              {currentSubclass.prSpeed}
            </span>
          </div>
          <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-500 block mb-1">资金成本与门槛要求</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-300">
              {currentSubclass.annualCostEst}
            </span>
          </div>
        </div>

        {/* Requirements */}
        <div className="my-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            📋 准入硬性条件
          </h4>
          <ul className="space-y-2">
            {currentSubclass.requirements.map((req, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-900/30">
            <h5 className="text-xs font-semibold text-emerald-400 mb-2 flex items-center space-x-1.5">
              <span>✅ 核心优势</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentSubclass.pros.map((p, idx) => (
                <li key={idx}>• {p}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-red-950/15 border border-red-900/30">
            <h5 className="text-xs font-semibold text-red-400 mb-2 flex items-center space-x-1.5">
              <span>⚠️ 现实短板与避坑</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentSubclass.cons.map((c, idx) => (
                <li key={idx}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ Interactive Point Calculator (If Available) ============ */}
        {currentSubclass.pointCalculator && (
          <div className="mt-8 pt-8 border-t border-slate-800">
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="w-5 h-5 text-blue-400" />
              <h4 className="text-base sm:text-lg font-bold text-white">
                交互式官方算分器 ({currentSubclass.name})
              </h4>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              请根据你的实际情况勾选以下打分项，系统将实时计算当前综合得分并给出提分通关建议。
            </p>

            {/* Sticky/Fixed Score Summary Banner */}
            <div className="bg-[#0B0F17] border border-blue-500/30 rounded-xl p-4 sm:p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">你当前的估算得分</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                    {currentTotalPoints}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">分</span>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {currentSubclass.pointCalculator.fastTrackThreshold &&
                currentTotalPoints >= currentSubclass.pointCalculator.fastTrackThreshold ? (
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>🌟 突破 {currentSubclass.pointCalculator.fastTrackLabel}！</span>
                  </div>
                ) : currentTotalPoints >= currentSubclass.pointCalculator.threshold ? (
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                    <Check className="w-4 h-4 text-blue-400" />
                    <span>✅ 已达到 {currentSubclass.pointCalculator.thresholdLabel}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>
                      距离达标门槛 ({currentSubclass.pointCalculator.threshold}分) 还差{' '}
                      {currentSubclass.pointCalculator.threshold - currentTotalPoints} 分
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Questions/Rules */}
            <div className="space-y-6">
              {currentSubclass.pointCalculator.rules.map((rule) => {
                const currentRulePoints = calcSelections[rule.id] ?? 0;
                return (
                  <div
                    key={rule.id}
                    className="p-4 sm:p-5 rounded-xl bg-[#0B0F17] border border-slate-800/90"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {rule.category}
                        </span>
                        <h5 className="text-sm font-semibold text-slate-200">{rule.name}</h5>
                      </div>
                      <span className="text-xs text-blue-400 font-bold">
                        当前项得分: {currentRulePoints} 分
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {rule.options.map((opt, oIdx) => {
                        const isChosen = calcSelections[rule.id] === opt.points;
                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectRuleOption(rule.id, opt.points)}
                            className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                              isChosen
                                ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                                : 'bg-[#121824] border-slate-800/80 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium">{opt.label}</span>
                              <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                                isChosen ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                              }`}>
                                +{opt.points}分
                              </span>
                            </div>
                            {opt.description && (
                              <p className="text-[11px] text-slate-400 mt-1">
                                {opt.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Advice Box */}
            <div className="mt-6 p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-blue-300 block mb-1">💡 官方政策提分秘笈</span>
                • <strong>日本高度人才</strong>：若本科学历仅有 10 分，通过考取 <strong>JLPT N1 (+15分)</strong> 或持有一项中国国家人社部 <strong>软考高级证书 (+5分)</strong>，即可低成本拉高 20 分！<br />
                • <strong>德国机会卡</strong>：IT 紧缺职业天然自带 1 分瓶颈职业加分；若德语考到 B1 还能直接加 2 分。
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
