import React, { useState, useEffect } from 'react';
import { Monitor, Tv } from 'lucide-react';
import useStore from './store/useStore';

import VLogo from './components/VLogo';
import VhsOverlay from './components/VhsOverlay';
import ClickSoundProvider from './components/ClickSoundProvider';

// Modules
import Dashboard from './modules/Dashboard';
import InteractiveMap from './modules/InteractiveMap';
import CentralIntelligence from './modules/CentralIntelligence';

function App() {
  const { selectedArea } = useStore();
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const tick = () => setUtcTime(new Date().toUTCString().slice(17, 25));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ClickSoundProvider>
      <div className="min-h-screen bg-linen text-charcoal transition-colors duration-1000">
        <VhsOverlay />

        {/* Navigation Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md border-b border-charcoal/10 bg-linen/80 p-0">
          <div className="flex justify-between items-center px-6 py-0">
            <div className="flex items-center gap-4">
              <VLogo />
            </div>

            <nav className="flex items-center gap-4">
              <div className="font-mono text-[10px] tracking-widest text-charcoal/50 hidden sm:flex items-center gap-2">
                <span className="text-flamingo/60">{selectedArea.name}</span>
                <span className="text-charcoal/20">//</span>
                <span>UTC {utcTime}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-none border border-flamingo/30 text-flamingo/80 bg-flamingo/5 font-mono text-[10px] font-bold tracking-widest">
                <Tv size={14} className="animate-pulse" />
                VHS FEED ACTIVE
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Hero Section */}
          <section id="dashboard" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 opacity-50">
              <Monitor size={18} />
              <h2 className="text-xs font-mono uppercase tracking-[0.4em]">Operations Center</h2>
            </div>
            <Dashboard />
          </section>

          {/* Central Intelligence Section */}
          <section id="central-intel" className="scroll-mt-24">
            <CentralIntelligence />
          </section>

          {/* Map Section */}
          <section id="map" className="scroll-mt-24">
            <InteractiveMap />
          </section>


        </main>

        {/* Footer */}
        <footer className="py-10 border-t border-charcoal/10 font-mono text-[10px] tracking-widest text-charcoal/50 max-w-4xl mx-auto px-6">
          <div className="space-y-2">
            <p><span className="text-flamingo/70">&gt;</span> OBJECTIVE: Real-time global dashboard — clock, meteorological, and tactical news telemetry.</p>
            <p><span className="text-sky-400/70">&gt;</span> OPERATE: Set jurisdiction via search field. All modules recalibrate automatically.</p>
            <p><span className="text-charcoal/30">&gt;</span> DISCLAIMER: Non-commercial portfolio project. Miami Vice IP belongs to NBCUniversal. Data via public APIs, as-is.</p>
          </div>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-charcoal/10 opacity-60">
            <span>&copy; {new Date().getFullYear()} <span className="text-flamingo font-bold italic">@InukaWijerathna</span></span>
            <span className="text-charcoal/20">//</span>
            <span>TERMINAL 4.0.0</span>
          </div>
        </footer>

        {/* Background Decor */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-peach/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-teal/15 blur-[100px] rounded-full" />
        </div>
      </div>
    </ClickSoundProvider>
  );
}

export default App;
