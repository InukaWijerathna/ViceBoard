import { motion as Motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const VLogo = () => {
  return (
    <Motion.div 
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
    </Motion.div>
  );
};

export default VLogo;
