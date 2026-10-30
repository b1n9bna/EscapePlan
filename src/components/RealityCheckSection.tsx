import React, { useState } from 'react';
import { CITY_BENCHMARKS } from '../data/realityCheck';
import type { CityCostBenchmark } from '../data/realityCheck';
import { Calculator, Wallet, TrendingUp } from 'lucide-react';

export const RealityCheckSection: React.FC = () => {
  const [selectedCityKey, setSelectedCityKey] = useState<string>('tokyo');
  const [userGrossAnnual, setUserGrossAnnual] = useState<number>(
    CITY_BENCHMARKS['tokyo'].grossAnnualDefault
  );

  const city: CityCostBenchmark = CITY_BENCHMARKS[selectedCityKey] || CITY_BENCHMARKS['tokyo'];

  const handleCityChange = (key: string) => {
    setSelectedCityKey(key);
    setUserGrossAnnual(CITY_BENCHMARKS[key].grossAnnualDefault);
  };

  // Calculations
  const monthlyGross = Math.round(userGrossAnnual / 12);
  const taxAndDeductionMonthly = Math.round(monthlyGross * city.taxAndInsuranceRate);
  const netTakeHomeMonthly = monthlyGross - taxAndDeductionMonthly;
  const netSavingsMonthly = netTakeHomeMonthly - city.medianRent1BedMonthly - city.foodAndLivingMonthly;
  
  // Net savings in RMB
  const netSavingsRMB = Math.round(netSavingsMonthly * city.currencyRateToRMB);
  const netTakeHomeRMB = Math.round(netTakeHomeMonthly * city.currencyRateToRMB);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          💰 现实推演沙盒：算清海外真实税后与生活品质
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          拒绝“海外十万年薪”的汇率滤镜。精准扣除海外沉重的所得税、国民医保、年金与房租物价，看清每月真实能存下多少钱。
        </p>
      </div>

      {/* City Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {Object.entries(CITY_BENCHMARKS).map(([key, data]) => {
          const isSelected = key === selectedCityKey;
          return (
            <button
              key={key}
              onClick={() => handleCityChange(key)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#121824] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {data.city}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Side: Inputs & Sliders */}
        <div className="lg:col-span-5 bg-[#121824] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span>输入当地预估税前年薪</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>税前年薪 ({city.currency})</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">
                {userGrossAnnual.toLocaleString()} {city.currency}
              </span>
            </div>
            <input
              type="number"
              value={userGrossAnnual}
              onChange={(e) => setUserGrossAnnual(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 text-white font-mono text-base focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              折合人民币约 {(userGrossAnnual * city.currencyRateToRMB).toLocaleString(undefined, { maximumFractionDigits: 0 })} 元/年
            </p>
          </div>

          {/* Fixed Benchmark Costs breakdown */}
          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">预估所得税+社会保险综合扣率</span>
              <span className="font-semibold text-red-400">
                -{(city.taxAndInsuranceRate * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">单人中位数租房成本 (月均)</span>
              <span className="font-mono text-slate-200">
                {city.medianRent1BedMonthly.toLocaleString()} {city.currency}/月
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">基础伙食与生活开销 (月均)</span>
              <span className="font-mono text-slate-200">
                {city.foodAndLivingMonthly.toLocaleString()} {city.currency}/月
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Real-time Cashflow Breakdown */}
        <div className="lg:col-span-7 bg-[#121824] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">每月实际真金白银到手 (Net Take-home)</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
                    {netTakeHomeMonthly.toLocaleString()} {city.currency}
                  </span>
                  <span className="text-xs text-slate-500">
                    (约 ¥{netTakeHomeRMB.toLocaleString()}/月)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-0.5">扣减税费与社保</span>
                <span className="text-xs font-mono font-semibold text-red-400">
                  -{taxAndDeductionMonthly.toLocaleString()} {city.currency}
                </span>
              </div>
            </div>

            {/* Monthly Net Savings Hero Card */}
            <div className="my-6 p-5 rounded-xl bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                    🌟 每月实打实净储蓄 (扣除房租和开销后)
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-300 font-mono">
                      {netSavingsMonthly.toLocaleString()} {city.currency}
                    </span>
                    <span className="text-sm text-emerald-400/80 font-semibold">
                      (约合人民币 ¥{netSavingsRMB.toLocaleString()} 元)
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
                <span>个人月储蓄率</span>
                <span className="font-bold text-emerald-300">
                  {monthlyGross > 0 ? ((netSavingsMonthly / monthlyGross) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>

            {/* Equivalent Domestic Quality of Life */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-indigo-300 block mb-0.5">国内一线生活品质等价值对冲</span>
                在 {city.city} 拿这笔收入的日常宽裕程度、购买力与综合体验，约相当于在<strong>上海/北京每月税后净入 ¥{city.domesticEquivalentMonthlyRMB.toLocaleString()} 元</strong>。
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pros & Cons for This City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            💎 {city.city} 真实生活福利亮点
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {city.pros.map((p, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
            ⚠️ {city.city} 真实生活隐形成本与痛点
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {city.cons.map((c, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
