import React, { useEffect, useRef } from 'react';

/**
 * Synthesizes a retro mechanical click using the Web Audio API.
 * No external files — works offline, zero latency.
 *
 * Sound design:
 *  1. Very short white-noise burst (the "click" transient)
 *  2. Low-frequency sine thump (the "thud" body)
 *  Both fade out in ~80ms for a crisp, punchy feel.
 */
function playClick(ctx) {
  const now = ctx.currentTime;

  // --- Noise burst (click transient) ---
  const bufferSize = ctx.sampleRate * 0.05; // 50ms of noise
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  // High-pass filter to shape the noise into a "tick"
  const hpFilter = ctx.createBiquadFilter();
  hpFilter.type = 'highpass';
  hpFilter.frequency.value = 800;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.35, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  noiseSource.connect(hpFilter);
  hpFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);
  noiseSource.stop(now + 0.06);

  // --- Low thump (body) ---
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.4, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.08);
}

const ClickSoundProvider = ({ children }) => {
  const ctxRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      // AudioContext must be created/resumed inside a user gesture
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      playClick(ctx);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return <>{children}</>;
};

export default ClickSoundProvider;
