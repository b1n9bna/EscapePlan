import { useState, useEffect } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { Header } from './components/Header';
import { LifeSimulator } from './components/LifeSimulator';
import { EscapeGuide } from './components/EscapeGuide';
import { Footer } from './components/Footer';

export function App() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'sim' | 'guide'>('sim');
  const [guideCountry, setGuideCountry] = useState<string>('japan');

  // 全局明暗主题系统（浅色素雅宣纸模式 ☀️ / 深色古砚墨香模式 🌙）
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('escapeplan_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('escapeplan_theme', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleTabChange = (tab: 'sim' | 'guide') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToGuide = (countryId?: string) => {
    if (countryId) {
      setGuideCountry(countryId);
    }
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`min-h-screen ${
          theme === 'light' ? 'bg-[#F5F4F0] text-stone-900' : 'bg-[#0B0F17] text-slate-100'
        } flex flex-col font-sans selection:bg-amber-500 selection:text-white transition-colors duration-200`}
      >
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'sim' && (
            <LifeSimulator
              onNavigateToSubclasses={handleNavigateToGuide}
              onNavigateToDIY={handleNavigateToGuide}
              theme={theme}
            />
          )}

          {activeTab === 'guide' && (
            <EscapeGuide
              initialCountryId={guideCountry}
              theme={theme}
            />
          )}
        </main>

        {/* Global Footer */}
        {activeTab !== 'sim' && <Footer />}
      </div>
    </MotionConfig>
  );
}

export default App;
