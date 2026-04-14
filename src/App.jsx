import React from 'react';
import { Monitor, Tv } from 'lucide-react';

import useStore from './store/useStore';
import VLogo from './components/VLogo';
import VhsOverlay from './components/VhsOverlay';
import ClickSoundProvider from './components/ClickSoundProvider';

// Modules
import Dashboard from './modules/Dashboard';
import AssetDatabase from './modules/AssetDatabase';
import AudioHub from './modules/AudioHub';
import InteractiveMap from './modules/InteractiveMap';

function App() {
  return (
    <ClickSoundProvider>
      <div className="min-h-screen bg-linen text-charcoal transition-colors duration-1000">
        <VhsOverlay />

        {/* Navigation Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md border-b border-charcoal/10 bg-linen/80 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <VLogo />
              <div className="hidden md:block">
                <h1 className="text-xl font-header italic font-extrabold tracking-tighter leading-none text-flamingo">
                  VICE-BOARD
                </h1>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-80">
                  Advanced Digital Dashboard
                </p>
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <AudioHub />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-flamingo/30 text-flamingo/80 bg-flamingo/5 font-mono text-[10px] font-bold tracking-widest">
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

          {/* Map Section */}
          <section id="map" className="scroll-mt-24">
            <InteractiveMap />
          </section>

          {/* Asset Section */}
          <section id="assets" className="scroll-mt-24">
            <AssetDatabase />
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-charcoal/5 font-mono text-[10px] tracking-widest text-charcoal/60 text-center">
          &copy; {new Date().getFullYear()} VICE-BOARD DATA SYSTEMS // TERMINAL 4.0.0
        </footer>

        {/* Background Decor */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-peach/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-mint/30 blur-[100px] rounded-full" />
        </div>
      </div>
    </ClickSoundProvider>
  );
}

export default App;
