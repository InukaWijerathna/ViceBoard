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
  const timerRef                    = useRef(null);

  const fireGlitch = useCallback(() => {
    const preset = pickIntensity();
    setIntensity(preset);
    setGlitching(true);
    document.body.classList.add('vhs-glitch-active');

    setTimeout(() => {
      setGlitching(false);
      document.body.classList.remove('vhs-glitch-active');
    }, preset.duration);
  }, []);

  const scheduleNext = useCallback(() => {
    // Random interval: 3–12 seconds between glitches
    const delay = 3000 + Math.random() * 9000;
    timerRef.current = setTimeout(() => {
      fireGlitch();
      scheduleNext();
    }, delay);
  }, [fireGlitch]);

  useEffect(() => {
    if (!vhsMode) {
      clearTimeout(timerRef.current);
      setGlitching(false);
      document.body.classList.remove('vhs-glitch-active');
      return;
    }

    // Small initial delay so it doesn't fire immediately on mount
    timerRef.current = setTimeout(() => {
      fireGlitch();
      scheduleNext();
    }, 2000 + Math.random() * 3000);

    return () => {
      clearTimeout(timerRef.current);
      document.body.classList.remove('vhs-glitch-active');
    };
  }, [vhsMode, fireGlitch, scheduleNext]);

  if (!vhsMode) return null;

  return (
    <>
      {/* Always-on layers */}
      <div className="vhs-overlay" />
      <div className="vhs-scanline" />

      {/* Ambient pink pulse (unchanged) */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay opacity-[0.06] bg-[#ff007f] animate-pulse"
        style={{ animationDuration: '4s' }}
      />

      {/* Random glitch layers — only mount during a glitch event */}
      {glitching && (
        <>
          {/* Layer 1: horizontal tear */}
          <div
            className="vhs-glitch-tear"
            style={{ animationDuration: `${intensity.duration}ms` }}
          />

          {/* Layer 2: RGB chromatic split */}
          <div
            className="vhs-glitch-rgb"
            style={{ animationDuration: `${intensity.duration + 20}ms` }}
          />

          {/* Layer 3: static noise burst */}
          <div
            className="vhs-glitch-static"
            style={{ animationDuration: `${intensity.duration + 40}ms` }}
          />

          {/* Layer 4: bright horizontal tear line at random Y position */}
          <div
            className="fixed left-0 right-0 pointer-events-none z-[10004]"
            style={{
              top: `${10 + Math.random() * 80}%`,
              height: `${1 + Math.random() * 4}px`,
              background: `linear-gradient(90deg, transparent, rgba(${
                Math.random() > 0.5 ? '0,255,255' : '255,0,127'
              }, 0.8), transparent)`,
              animationDuration: `${intensity.duration}ms`,
              boxShadow: '0 0 6px 1px rgba(0,255,255,0.4)',
            }}
          />
        </>
      )}
    </>
  );
};

export default VhsOverlay;
