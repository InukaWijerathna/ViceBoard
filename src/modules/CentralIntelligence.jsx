import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, ShieldAlert, History, Activity, Terminal, AlertTriangle } from 'lucide-react';
import useStore from '../store/useStore';

const CRIME_KEYWORDS = [
  "Suspect sighted", "Raid in progress", "Narcotics bust", "Undercover operation", 
  "Surveillance active", "High-speed pursuit", "Illegal cache seized", "Informant pulse detected",
  "Money laundering vector", "Static from perimeter", "BOLO issued", "Case file reopened"
];

const LOCATIONS = [
  "Downtown", "Harbor District", "Industrial Sector", "Suburban Perimeter", "Financial Wing", "Old Town"
];

const CentralIntelligence = () => {
  const { selectedArea, intelRefreshTrigger, triggerIntelRefresh } = useStore();
  const [intelItems, setIntelItems] = useState([]);
  const [caseArchives, setCaseArchives] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    let interval;
    let isMounted = true;
    let timeoutId;

    const fetchRealIntel = async () => {
      try {
        let exactCity = `"${selectedArea.name}"`;
        let query = encodeURIComponent(`${exactCity} AND (police OR arrest OR crime)`);
        let response = await fetch(`https://content.guardianapis.com/search?q=${query}&order-by=newest&api-key=test&page-size=30`);
        let data = await response.json();
        
        let results = data.response?.results;

        // Fallback to strict city search if crime query is too restrictive
        if (!results || results.length === 0) {
          query = encodeURIComponent(exactCity);
          response = await fetch(`https://content.guardianapis.com/search?q=${query}&order-by=newest&api-key=test&page-size=30`);
          data = await response.json();
          results = data.response?.results;
        }

        if (!isMounted) return;

        // If rate limited or completely empty, throw a fake error post to prevent infinite blank screen
        if (!results || results.length === 0) {
          setIntelItems([{
            id: 'SYS-ERR-01',
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            title: 'CONNECTION TIMEOUT: API RATE LIMIT EXCEEDED - RETRYING...',
            rawTitle: 'API RATE LIMIT EXCEEDED',
            detail: 'SEC: NETWORK // ORIGIN: INTERNAL',
            type: 'SYSTEM FAULT',
            priority: 'HIGH'
          }]);
          setCaseArchives([]);
          // Auto-retry connection in 8 seconds
          setTimeout(() => triggerIntelRefresh(), 8000);
          return;
        }

        // Visual feedback to user that it is reloading new data
        setIntelItems([]);
        setCaseArchives([]);

        const parsedHits = results.map(hit => {
          const timestamp = new Date(hit.webPublicationDate).toLocaleTimeString('en-US', { hour12: false });
          let rawTitle = (hit.webTitle || 'UNCLASSIFIED INTEL').toUpperCase();
          rawTitle = rawTitle.replace(/\s*[-|]\s*(THE GUARDIAN|US NEWS|VIDEO|OPINION|EDITORIAL).*/i, '');
          
          const category = (hit.sectionName || 'UNKNOWN SEC').toUpperCase();
          const tacticalPrefixes = ["INTERCEPT:", "FIELD LOG:", "SUBJECT REPORT:", "DISPATCH:"];
          const prefix = tacticalPrefixes[Math.floor(Math.random() * tacticalPrefixes.length)];
          const titleText = `${prefix} ${rawTitle}`;

          return {
            id: hit.id || Math.random().toString(),
            timestamp: timestamp,
            title: titleText.length > 70 ? titleText.substring(0, 67) + '...' : titleText,
            rawTitle: rawTitle.length > 50 ? rawTitle.substring(0, 47) + '...' : rawTitle,
            detail: `SEC: ${category} // ORIGIN: FIELD SENSOR NETWORK`,
            type: hit.sectionId === 'us-news' ? 'HOT INTEL' : 'ARCHIVE',
            priority: hit.sectionId === 'us-news' || rawTitle.includes('POLICE') ? 'HIGH' : 'LOW'
          };
        }).reverse();

        setCaseArchives(parsedHits.slice(0, 3));
        
        const liveHits = parsedHits.slice(3);
        const offsetIndex = Math.floor(Math.random() * Math.max(1, liveHits.length - 10));
        
        setIntelItems(liveHits.slice(offsetIndex, offsetIndex + 5).reverse());
        
        let currentIndex = offsetIndex + 5;
        
        interval = setInterval(() => {
          if (currentIndex < liveHits.length) {
            setIntelItems(prev => {
              return [liveHits[currentIndex], ...prev.slice(0, 19)];
            });
            currentIndex++;
          } else {
            clearInterval(interval);
            // The intel stream array is exhausted. Automatically ping for a fresh payload!
            triggerIntelRefresh();
          }
        }, 6000 + Math.random() * 4000);

      } catch (error) {
        console.error("Intel fetch failed", error);
        if (isMounted) {
          setIntelItems([{
            id: 'SYS-ERR-02',
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            title: 'CONNECTION TIMEOUT: API NO RESPONSE - RETRYING...',
            rawTitle: 'NO RESPONSE - RETRYING',
            detail: 'SEC: NETWORK // ORIGIN: INTERNAL',
            type: 'SYSTEM FAULT',
            priority: 'HIGH'
          }]);
          // Auto-retry connection in 8 seconds
          setTimeout(() => triggerIntelRefresh(), 8000);
        }
      }
    };

    // Debounce to prevent React StrictMode double-mounting from instantly rate-limiting the free API key
    timeoutId = setTimeout(() => {
      fetchRealIntel();
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [selectedArea, intelRefreshTrigger]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [intelItems]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 opacity-50">
          <Terminal size={18} />
          <h2 className="text-xs font-mono uppercase tracking-[0.4em]">Central Intelligence</h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-flamingo/10 border border-flamingo/20 text-flamingo font-mono text-[8px] tracking-[0.2em] animate-pulse">
          <Activity size={10} />
          ENCRYPTED UPLINK ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal Feed View */}
        <div className="lg:col-span-2 glass-card h-[400px] flex flex-col border-sky-400/20 text-sky-400">
          <div className="p-3 border-b border-sky-400/20 flex items-center justify-between">
            <span className="text-[10px] font-mono text-sky-400/50 uppercase tracking-widest">Live Intel // {selectedArea.name}</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-sky-400/30 rounded-none shadow-[0_0_5px_rgba(56,189,248,0.3)]" />
              <div className="w-1.5 h-1.5 bg-sky-400/30 rounded-none" />
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide font-mono"
          >
            <AnimatePresence initial={false}>
              {intelItems.length === 0 && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1, textShadow: '0 0 10px #38bdf8' }} 
                  className="text-[10px] text-sky-400 font-mono italic p-2"
                >
                  ESTABLISHING SECURE LINK...
                </motion.p>
              )}
              {intelItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border-l-2 p-3 ${
                    item.priority === 'HIGH' ? 'border-flamingo' : 'border-sky-400/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[8px] px-1 font-bold ${
                      item.priority === 'HIGH' ? 'bg-flamingo text-white' : 'bg-sky-400/20 text-sky-400'
                    }`}>
                      {item.type} // {item.timestamp}
                    </span>
                    <span className="text-[8px] text-white/20">REF: {item.id}</span>
                  </div>
                  <h4 className={`text-[11px] font-bold tracking-tight ${
                    item.priority === 'HIGH' ? 'text-flamingo' : 'text-sky-400'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-white/40 mt-1 uppercase leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-2 border-t border-sky-400/10 text-[8px] font-mono text-sky-400/30 flex justify-between uppercase">
            <span>Terminal 09-BASED</span>
            <span>SYSTEM NO-OP: STABLE</span>
          </div>
        </div>

        {/* Side Stats / Summaries */}
        <div className="space-y-4">
          <div className="glass-card p-5 border-flamingo/10">
            <div className="flex items-center gap-2 mb-4 text-flamingo/60">
              <ShieldAlert size={16} />
              <h3 className="text-xs font-mono uppercase tracking-widest">Heat Alert Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-mono text-charcoal/40 uppercase">Surveillance Density</span>
                <span className="text-lg font-mono font-bold text-flamingo">HIGH</span>
              </div>
              <div className="h-1 bg-charcoal/5 rounded-none overflow-hidden">
                <motion.div 
                  className="h-full bg-flamingo shadow-[0_0_10px_#FF007F]"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <p className="text-[9px] font-mono text-charcoal/40 uppercase leading-relaxed">
                Heightened police activity reported in the {selectedArea.name} sector. Maintain low profile indices.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 border-flamingo/10">
            <div className="flex items-center gap-2 mb-4 text-flamingo/60">
              <History size={16} />
              <h3 className="text-xs font-mono uppercase tracking-widest">Case Archives</h3>
            </div>
            <div className="space-y-3">
              {caseArchives.map((archive) => (
                <div key={archive.id} className="flex items-start gap-3 p-2 bg-flamingo/[0.02] border-l border-flamingo/20">
                  <div className="mt-1 text-flamingo/40">
                    <AlertTriangle size={10} />
                  </div>
                  <div>
                    <span className="text-[8px] text-flamingo/40 font-mono">CASE FILE #{archive.id.split('/').pop().substring(0, 10).toUpperCase()}</span>
                    <p className="text-[9px] font-mono text-flamingo/60 uppercase">
                      OFFICIAL INVESTIGATION: {archive.rawTitle}
                    </p>
                  </div>
                </div>
              ))}
              {caseArchives.length === 0 && <p className="text-[9px] font-mono text-flamingo/40">FETCHING CLASSIFIED RECORDS...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralIntelligence;
