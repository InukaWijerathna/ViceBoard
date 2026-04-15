import React, { useState } from 'react';
import YouTube from 'react-youtube';

const AudioHub = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState(null);

  const track = { 
    title: "JAN HAMMER - CROCKETT'S THEME", 
    videoId: "_lAaojqA_08" 
  };

  const onReady = (event) => {
    const p = event.target;
    setPlayer(p);
    p.setVolume(0);
    p.playVideo();

    // Fade in from 0 → 50 over ~3 seconds (60 steps × 50ms)
    const totalSteps = 60;
    const targetVolume = 50;
    let step = 0;
    const fadeInterval = setInterval(() => {
      step++;
      const vol = Math.round((targetVolume / totalSteps) * step);
      p.setVolume(vol);
      if (step >= totalSteps) clearInterval(fadeInterval);
    }, 50);
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        // Fade back in over ~1 second (20 steps × 50ms)
        player.unMute();
        player.setVolume(0);
        const totalSteps = 20;
        let step = 0;
        const fadeInterval = setInterval(() => {
          step++;
          player.setVolume(Math.round((50 / totalSteps) * step));
          if (step >= totalSteps) clearInterval(fadeInterval);
        }, 50);
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const opts = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: track.videoId,
      start: 42,
    },
  };

  return (
    <div className="flex items-center">
      {/* Hidden YouTube Player */}
      <div className="absolute -top-[1000px] left-0 pointer-events-none">
        <YouTube 
          videoId={track.videoId} 
          opts={opts} 
          onReady={onReady} 
        />
      </div>

      {/* Inline Red Dot Control */}
      <button 
        onClick={toggleMute}
        className={`w-4 h-4 rounded-none transition-all duration-500 relative cursor-pointer hover:scale-110 active:scale-95 border border-charcoal/10 ${
          isMuted 
            ? 'bg-zinc-800' 
            : 'bg-red-600 animate-pulse'
        }`}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {!isMuted && <div className="absolute inset-0 rounded-none bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />}
      </button>
    </div>
  );
};

export default AudioHub;
