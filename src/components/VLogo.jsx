import React from 'react';
import { getAssetUrl } from '../utils/paths';
import { motion } from 'framer-motion';

const VLogo = () => {
  return (
    <motion.div 
      className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-white/10 border border-charcoal/5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={getAssetUrl('favicon.ico')} 
        alt="VICE-BOARD" 
        className="w-full h-full object-contain p-1.5"
      />
      
      {/* Subtle Scanline Overlay on Logo */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-charcoal/5 to-transparent h-1/2 animate-scanline opacity-20" />
    </motion.div>
  );
};

export default VLogo;
