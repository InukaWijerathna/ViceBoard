import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const VLogo = () => {
  return (
    <motion.div 
      className="w-24 h-24"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={logoImg} 
        alt="VICE-BOARD" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default VLogo;
