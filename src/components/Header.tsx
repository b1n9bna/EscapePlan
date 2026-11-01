import { SpringButton } from './MotionPrimitives';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'sim' | 'guide';
  setActiveTab: (tab: 'sim' | 'guide') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function Header({ activeTab, setActiveTab, theme = 'dark', onToggleTheme }: HeaderProps) {
  const isLight = theme === 'light';
  const controlClass = `flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors ${
    isLight ? 'text-stone-600 hover:bg-stone-100 hover:text-stone-900' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
  }`;

  return (
    <header className={`app-header sticky top-0 z-50 border-b ${
      isLight ? 'bg-[#F5F4F0] border-stone-200' : 'bg-[#0B0F17] border-slate-800'
    }`}>
      <div className="app-header-layout max-w-6xl mx-auto px-4 sm:px-6">
        <nav aria-label="主导航" className="flex min-w-0 items-center gap-1">
          {([
            { id: 'sim', label: '人生模拟' },
            { id: 'guide', label: '出海指北' }
          ] as const).map(({ id, label }) => (
            <SpringButton
              key={id}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === id
                  ? isLight ? 'bg-stone-200 text-stone-950' : 'bg-slate-800 text-slate-100'
                  : isLight ? 'text-stone-500 hover:text-stone-900 hover:bg-stone-100' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <span>{label}</span>
            </SpringButton>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1">
          {onToggleTheme && (
            <SpringButton
              onClick={onToggleTheme}
              className={controlClass}
              aria-label={isLight ? '切换深色模式' : '切换浅色模式'}
              title={isLight ? '切换深色模式' : '切换浅色模式'}
            >
              {isLight ? <Moon aria-hidden="true" className="h-4 w-4" /> : <Sun aria-hidden="true" className="h-4 w-4" />}
            </SpringButton>
          )}
          <a href="https://github.com/b1n9bna/EscapePlan" target="_blank" rel="noreferrer"
            className={controlClass} aria-label="GitHub 仓库" title="GitHub 仓库">
            <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
