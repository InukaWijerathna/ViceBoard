import React from 'react';
import useStore from '../store/useStore';

const VhsOverlay = () => {
  const { vhsMode } = useStore();

  if (!vhsMode) return null;

  return (
    <>
      <div className="vhs-overlay" />
      <div className="vhs-scanline" />
      <div className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay opacity-20 bg-[#ff007f] animate-pulse" 
           style={{ animationDuration: '4s' }} />
    </>
  );
};

export default VhsOverlay;
