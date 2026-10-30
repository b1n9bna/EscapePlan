import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, PERSONA_RESULTS } from '../data/quiz';
import type { PersonaResult } from '../data/quiz';
import { ArrowRight, ArrowLeft, RotateCcw, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuizSectionProps {
  onNavigateToSubclasses: (countryId?: string) => void;
  onNavigateToDIY: (countryId?: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onNavigateToSubclasses,
  onNavigateToDIY
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<PersonaResult | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    let totalLaozhong = 0;
    let totalIntrovert = 0;
    let totalGrinder = 0;
    let totalNomad = 0;
    let totalPragmatist = 0;

    finalAnswers.forEach((ansIndex, qIndex) => {
      const q = QUIZ_QUESTIONS[qIndex];
      const opt = q.options[ansIndex];
      if (opt) {
        totalLaozhong += opt.scores.laozhong;
        totalIntrovert += opt.scores.introvert;
        totalGrinder += opt.scores.grinder;
        totalNomad += opt.scores.nomad;
        totalPragmatist += opt.scores.pragmatist;
      }
    });

    let personaKey = 'native-laozhong';

    // If laozhong score is overwhelmingly high (>= 60)
    if (totalLaozhong >= 60) {
      personaKey = 'native-laozhong';
    } else {
      // Find the highest among others
      const scoreMap: Record<string, number> = {
        'east-asia-grinder': totalGrinder,
        'nordic-introvert': totalIntrovert,
        'cyber-nomad': totalNomad,
        'hardcore-pragmatist': totalPragmatist
      };

      let maxVal = -999;
      for (const [key, val] of Object.entries(scoreMap)) {
        if (val > maxVal) {
          maxVal = val;
          personaKey = key;
        }
      }

      // If still very high laozhong even with other interests
      if (totalLaozhong > 40 && personaKey !== 'east-asia-grinder') {
        personaKey = 'east-asia-grinder';
      }
    }

    const calculatedPersona = PERSONA_RESULTS[personaKey] || PERSONA_RESULTS['native-laozhong'];
    setResult(calculatedPersona);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  // ---------------- Render Results ----------------
  if (result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow accent */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top header badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Diagnostic Report
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-blue-400 font-medium">移居精神生存体检单</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${result.badgeColor}`}>
              {result.tag}
            </div>
          </div>

          {/* Persona Main Title */}
          <div className="my-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              {result.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-medium">
              {result.subtitle}
            </p>
          </div>

          {/* Scores Meters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-medium">老中体质纯度指数</span>
                <span className={`font-bold ${result.laozhongIndex > 70 ? 'text-red-400' : 'text-slate-300'}`}>
                  {result.laozhongIndex}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${
                    result.laozhongIndex > 70
                      ? 'bg-gradient-to-r from-amber-500 to-red-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${result.laozhongIndex}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {result.laozhongIndex > 70
                  ? '⚠️ 极度依赖国内便利服务与熟人热闹社交，出国易抑郁'
                  : '已具备极强精神独立抗性与文化耐受度'}
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-medium">全球移居适配综合分</span>
                <span className="font-bold text-emerald-400">{result.suitabilityScore} / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                  style={{ width: `${result.suitabilityScore}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                基于抗寂寞力、规则理解力与海外生存画像加权测算
              </p>
            </div>
          </div>

          {/* Roast Section */}
          <div className="my-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>毒舌诊断 (The Brutal Roast)</span>
            </div>
            <div className="text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
              {result.roast}
            </div>
          </div>

          {/* Prescription */}
          <div className="my-6 p-5 rounded-xl bg-blue-950/20 border border-blue-800/30">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>给你的理智处方建议</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {result.prescription}
            </p>
          </div>

          {/* Recommended Destinations */}
          <div className="my-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              🎯 最契合你当前画像的通道推荐
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.recommendedCountries.map((country, idx) => (
                <div
                  key={idx}
                  className="bg-[#0B0F17] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h4 className="text-base font-bold text-white">{country.name}</h4>
                      <span className="text-xs text-blue-400 font-medium">{country.route}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal mb-3">
                    {country.reason}
                  </p>
                  <div className="flex space-x-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => onNavigateToSubclasses()}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      查看签证细则 ➜
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      onClick={() => onNavigateToDIY()}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      查看手搓指南 ➜
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Action Footers */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新测试</span>
            </button>

            <button
              onClick={() => onNavigateToSubclasses()}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition"
            >
              <span>我不服，去看看官方签证政策与算分</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Render Question Flow ----------------
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>移居自测罗盘 · 第 {currentStep + 1} / {QUIZ_QUESTIONS.length} 题</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          {currentQuestion.category}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {currentQuestion.subtitle}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-6 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed mb-6">
          {currentQuestion.title}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentStep] === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-600 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div>
                    <p className={`text-sm sm:text-base font-medium leading-snug ${
                      isSelected ? 'text-blue-200' : 'text-slate-200'
                    }`}>
                      {option.text}
                    </p>
                    {option.subtext && (
                      <p className="text-xs text-slate-400 mt-1">
                        {option.subtext}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation bottom buttons */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>上一题</span>
          </button>

          <span className="text-xs text-slate-500 font-mono">
            {currentStep + 1} / {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>
    </div>
  );
};
