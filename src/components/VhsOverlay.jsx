import React, { useState, useEffect, useCallback, useRef } from 'react';
import useStore from '../store/useStore';

// Glitch intensity presets — picked randomly each fire
const INTENSITIES = [
  { duration: 80,  chance: 0.5 },  // micro-flicker  (most common)
  { duration: 140, chance: 0.3 },  // normal glitch
  { duration: 220, chance: 0.15 }, // heavy tear
  { duration: 320, chance: 0.05 }, // full meltdown  (rare)
];

function pickIntensity() {
  const r = Math.random();
  let cumulative = 0;
  for (const preset of INTENSITIES) {
    cumulative += preset.chance;
    if (r < cumulative) return preset;
  }
  return INTENSITIES[0];
}

const VhsOverlay = () => {
  const { vhsMode } = useStore();
  const [glitching, setGlitching]   = useState(false);
  const [intensity, setIntensity]   = useState(INTENSITIES[0]);
  const [glitchConfig, setGlitchConfig] = useState({ top: '20%', height: '2px', color: 'cyan' });
  const timerRef                    = useRef(null);
  const glitchTimeoutRef            = useRef(null);

  const fireGlitch = useCallback(() => {
    const preset = pickIntensity();
    
    // Set random visual configuration for this specific glitch event
    setGlitchConfig({
      top: `${10 + Math.random() * 80}%`,
      height: `${1 + Math.random() * 4}px`,
      color: Math.random() > 0.5 ? 'rgba(0,255,255,0.8)' : 'rgba(255,0,127,0.8)'
    });
    
    setIntensity(preset);
    setGlitching(true);
    document.body.classList.add('vhs-glitch-active');

    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    glitchTimeoutRef.current = setTimeout(() => {
      setGlitching(false);
      document.body.classList.remove('vhs-glitch-active');
      glitchTimeoutRef.current = null;
    }, preset.duration);
  }, []);

  useEffect(() => {
    if (!vhsMode) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      // Avoid sync setState in effect path
      Promise.resolve().then(() => {
        setGlitching(false);
        document.body.classList.remove('vhs-glitch-active');
      });
      return;
    }

    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 9000;
      timerRef.current = setTimeout(() => {
        fireGlitch();
        scheduleNext();
      }, delay);
    };

    // Small initial delay
    timerRef.current = setTimeout(() => {
      fireGlitch();
      scheduleNext();
    }, 2000 + Math.random() * 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      document.body.classList.remove('vhs-glitch-active');
    };
  }, [vhsMode, fireGlitch]);


  if (!vhsMode) return null;

  return (
    <>
      {/* Always-on layers */}
      <div className="vhs-overlay" />
      <div className="vhs-scanline" />

      {/* Ambient pulse */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay opacity-[0.06] bg-[#ff007f] animate-pulse"
        style={{ animationDuration: '4s' }}
      />

      {/* Random glitch layers */}
      {glitching && (
        <>
          <div
            className="vhs-glitch-tear"
            style={{ animationDuration: `${intensity.duration}ms` }}
          />

          <div
            className="vhs-glitch-rgb"
            style={{ animationDuration: `${intensity.duration + 20}ms` }}
          />

          <div
            className="vhs-glitch-static"
            style={{ animationDuration: `${intensity.duration + 40}ms` }}
          />

          {/* Glitch tear line with pre-calculated config */}
          <div
            className="fixed left-0 right-0 pointer-events-none z-[10004]"
            style={{
              top: glitchConfig.top,
              height: glitchConfig.height,
              background: `linear-gradient(90deg, transparent, ${glitchConfig.color}, transparent)`,
              animationDuration: `${intensity.duration}ms`,
              boxShadow: `0 0 6px 1px ${glitchConfig.color.includes('255,255') ? 'rgba(0,255,255,0.4)' : 'rgba(255,0,127,0.4)'}`,
            }}
          />
        </>
      )}
    </>
  );
};

export default VhsOverlay;

