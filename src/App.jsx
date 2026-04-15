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
import IntelSurveillance from './modules/IntelSurveillance';
import CentralIntelligence from './modules/CentralIntelligence';

function App() {
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

            <nav className="flex items-center gap-6">
              <AudioHub />
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

          {/* Intel Surveillance Section */}
          <section id="intel" className="scroll-mt-24">
            <IntelSurveillance />
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
        <footer className="py-12 border-t border-charcoal/5 font-mono text-[10px] tracking-widest text-charcoal/60 text-center max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <p className="max-w-2xl mx-auto leading-relaxed">
              This project is a non-commercial fan tribute to the aesthetic and spirit of Miami Vice. 
              All rights to the original series belong to NBCUniversal. Created for educational and design exploration purposes.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 pt-4 opacity-70">
              <span>&copy; {new Date().getFullYear()} <span className="text-flamingo font-bold italic">@InukaWijerathna</span></span>
              <span className="hidden md:inline">//</span>
              <span>TERMINAL 4.0.0</span>
            </div>
          </div>
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
