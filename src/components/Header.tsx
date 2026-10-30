import React from 'react';
import { Gamepad2, BookOpen, Calculator, CheckSquare, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'sim' | 'subclasses' | 'reality' | 'diy';
  setActiveTab: (tab: 'sim' | 'subclasses' | 'reality' | 'diy') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme = 'dark',
  onToggleTheme
}) => {
  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 ${
        isLight
          ? 'bg-white/90 border-b border-stone-200 text-stone-900 shadow-xs'
          : 'bg-[#0B0F17]/85 border-b border-slate-800 text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('sim')}>
            <span
              className={`text-2xl p-2 rounded-xl border shadow-sm ${
                isLight ? 'bg-amber-50 border-amber-200' : 'bg-amber-500/10 border-amber-500/20'
              }`}
            >
              🧭
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-500 bg-clip-text text-transparent">
                  EscapePlan
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-stone-100 text-stone-700 border-stone-300'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  逃跑计划
                </span>
              </div>
              <p className={`text-[11px] hidden sm:block ${isLight ? 'text-stone-500' : 'text-slate-400'}`}>
                面向大众的全球移居双城生活手记与手搓 DIY 路线图
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => setActiveTab('sim')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'sim'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Gamepad2 className={`w-4 h-4 ${activeTab === 'sim' ? 'text-white' : 'text-amber-500'}`} />
              <span>人生模拟</span>
            </button>

            <button
              onClick={() => setActiveTab('subclasses')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'subclasses'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'subclasses' ? 'text-white' : 'text-sky-500'}`} />
              <span>政策与算分</span>
            </button>

            <button
              onClick={() => setActiveTab('reality')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'reality'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Calculator className={`w-4 h-4 ${activeTab === 'reality' ? 'text-white' : 'text-amber-500'}`} />
              <span>税后沙盒</span>
            </button>

            <button
              onClick={() => setActiveTab('diy')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'diy'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <CheckSquare className={`w-4 h-4 ${activeTab === 'diy' ? 'text-white' : 'text-emerald-500'}`} />
              <span>手搓路线</span>
            </button>
          </nav>

          {/* Right GitHub & Privacy Badge & Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  isLight
                    ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300 shadow-2xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title={isLight ? '切换为深色古砚墨香模式' : '切换为浅色素雅宣纸模式'}
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden sm:inline">深色</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">浅色</span>
                  </>
                )}
              </button>
            )}

            <div
              className={`hidden xl:flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded-full border ${
                isLight
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>本地运算 · 零上传</span>
            </div>

            <a
              href="https://github.com/b1n9bna/EscapePlan"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="在 GitHub 上关注并给个 Star"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">Star on GitHub</span>
              <span className="sm:hidden">Star</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
