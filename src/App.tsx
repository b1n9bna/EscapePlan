import { useState } from 'react';
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
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'sim' && (
          <LifeSimulator
            onNavigateToSubclasses={handleNavigateToSubclasses}
            onNavigateToDIY={handleNavigateToDIY}
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
      <Footer />
    </div>
  );
}

export default App;
