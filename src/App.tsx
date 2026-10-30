import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LifeSimulator } from './components/LifeSimulator';
import { SubclassMatrix } from './components/SubclassMatrix';
import { RealityCheckSection } from './components/RealityCheckSection';
import { DIYGuideSection } from './components/DIYGuideSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<'sim' | 'subclasses' | 'reality' | 'diy'>('sim');
  const [initialSubclassCountry, setInitialSubclassCountry] = useState<string>('japan');
  const [initialDIYCountry, setInitialDIYCountry] = useState<string>('japan');

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
  }, [theme]);

  const handleNavigateToSubclasses = (countryId?: string) => {
    if (countryId) {
      setInitialSubclassCountry(countryId);
    }
    setActiveTab('subclasses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDIY = (countryId?: string) => {
    if (countryId) {
      setInitialDIYCountry(countryId);
    }
    setActiveTab('diy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'light' ? 'bg-[#F5F4F0] text-stone-900' : 'bg-[#0B0F17] text-slate-100'
      } flex flex-col font-sans selection:bg-amber-500 selection:text-white transition-colors duration-200`}
    >
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'sim' && (
          <LifeSimulator
            onNavigateToSubclasses={handleNavigateToSubclasses}
            onNavigateToDIY={handleNavigateToDIY}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}

        {activeTab === 'subclasses' && (
          <SubclassMatrix
            initialCountryId={initialSubclassCountry}
            onNavigateToDIY={handleNavigateToDIY}
          />
        )}

        {activeTab === 'reality' && <RealityCheckSection />}

        {activeTab === 'diy' && (
          <DIYGuideSection initialCountryId={initialDIYCountry} />
        )}
      </main>

      {/* Global Footer */}
      {activeTab !== 'sim' && <Footer />}
    </div>
  );
}

export default App;
