import React from 'react';
import { getAssetUrl } from '../utils/paths';
import { motion } from 'framer-motion';

const VLogo = () => {
  return (
    <motion.div 
      className="w-24 h-24"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={getAssetUrl('src/assets/logo.png')} 
        alt="VICE-BOARD" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default VLogo;
