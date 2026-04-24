import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const AudioHub = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);
  const fadeIntervalRef = useRef(null);

  const track = { 
    title: "JAN HAMMER - CROCKETT'S THEME", 
    videoId: "_lAaojqA_08" 
  };

  const onReady = (event) => {
    const p = event.target;
    setPlayer(p);
    p.setVolume(0);
    p.mute();
    p.playVideo();
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        // Fade back in over ~1 second (20 steps × 50ms)
        player.unMute();
        player.setVolume(0);
        const totalSteps = 20;
        let step = 0;
        
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          step++;
          player.setVolume(Math.round((15 / totalSteps) * step));
          if (step >= totalSteps) {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }, 50);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

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
