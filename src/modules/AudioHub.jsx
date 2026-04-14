import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const AudioHub = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState(null);

  const track = { 
    title: "JAN HAMMER - CROCKETT'S THEME", 
    videoId: "_lAaojqA_08" 
  };

  const onReady = (event) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(100);
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
        className={`w-4 h-4 rounded-full transition-all duration-500 relative cursor-pointer hover:scale-110 active:scale-95 border border-charcoal/10 ${
          isMuted 
            ? 'bg-zinc-800' 
            : 'bg-red-600 animate-pulse'
        }`}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {!isMuted && <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />}
      </button>
    </div>
  );
};

export default AudioHub;
