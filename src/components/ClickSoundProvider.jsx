import React, { useEffect } from 'react';
import clickSoundFile from '../assets/click_sound.mp3';

let clickAudio;

const ClickSoundProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !clickAudio) {
      clickAudio = new Audio(clickSoundFile);
      clickAudio.preload = "auto";
    }

    const handleInteraction = (e) => {
      // Avoid firing on modifier keys alone
      if (e.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      
      // Do not play global click sound if user is typing in an input (Dashboard handles specialized key sound)
      if (e.type === 'keydown' && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      
      if (clickAudio) {
        clickAudio.currentTime = 0;
        clickAudio.play().catch(e => console.log('Audio playback prevented by auto-play policy:', e));
      }
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    
    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return <>{children}</>;
};

export default ClickSoundProvider;
