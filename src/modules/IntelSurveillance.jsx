import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Info, Users, Zap } from 'lucide-react';
import { getAssetUrl } from '../utils/paths';

const PERSONNEL = [
  { name: 'JAMES CROCKETT', alias: 'SONNY', role: 'Detective', status: 'UNDERCOVER', img: getAssetUrl('personnel/crockett.png') },
  { name: 'RICARDO TUBBS', alias: 'RICO', role: 'Detective', status: 'UNDERCOVER', img: getAssetUrl('personnel/tubbs.png') },
  { name: 'MARTIN CASTILLO', alias: 'LIEUTENANT', role: 'Command', status: 'HQ', img: getAssetUrl('personnel/castillo.png') },
  { name: 'GINA CALABRESE', alias: 'GINA', role: 'Detective', status: 'FIELD', img: getAssetUrl('personnel/gina.png') },
  { name: 'TRUDY JOPLIN', alias: 'PRO-ACTIVE', role: 'Detective', status: 'FIELD', img: getAssetUrl('personnel/trudy.png') },
  { name: 'STANLEY SWITEK', alias: 'STAN', role: 'Surveillance', status: 'HQ', img: getAssetUrl('personnel/switek.png') },
  { name: 'LAWRENCE ZITO', alias: 'LARRY', role: 'Surveillance', status: 'HQ', img: getAssetUrl('personnel/zito.png') },
];

const CONTACTS = [
  { name: 'IZZY MORENO', role: 'Informant', status: 'ACTIVE' },
  { name: 'NOOGIE LAMONT', role: 'Informant', status: 'ACTIVE' },
  { name: 'ESTEBAN CALDERONE', role: 'Target', status: 'WANTED' },
];

const IntelSurveillance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 opacity-50">
        <Users size={18} />
        <h2 className="text-xs font-mono uppercase tracking-[0.4em]">Intel Surveillance</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personnel Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-header italic font-extrabold text-charcoal">VICE PERSONNEL</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PERSONNEL.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-4 flex flex-col justify-between group hover:border-flamingo/20 transition-all duration-300"
              >
                <div className="flex gap-4 mb-3">
                  {/* Surveillance Photo */}
                  <div className="relative w-16 h-16 flex-shrink-0 bg-charcoal/10 rounded-none overflow-hidden border border-charcoal/20">
                    <img 
                      src={person.img} 
                      alt={person.name}
                      className="w-full h-full object-cover grayscale contrast-200 brightness-75 scale-110"
                    />
                    {/* Censored Bar */}
                    <div className="absolute top-[35%] left-0 w-full h-[15%] bg-charcoal z-10 shadow-[0_0_5px_rgba(0,0,0,0.5)]" />
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/10 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-header font-bold italic text-sm group-hover:text-flamingo transition-colors leading-tight">
                      {person.name}
                    </h4>
                    <p className="text-[9px] font-mono text-charcoal/50 uppercase tracking-tighter mt-1">
                      ID: {person.alias} // {person.role}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-charcoal/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-none ${
                      person.status === 'UNDERCOVER' ? 'bg-flamingo animate-pulse' : 
                      person.status === 'HQ' ? 'bg-cyan-400' : 'bg-green-400'
                    }`} />
                    <span className="text-[9px] font-mono font-bold tracking-widest text-charcoal/60">
                      {person.status}
                    </span>
                  </div>
                  <Shield size={12} className="text-charcoal/20 group-hover:text-flamingo/40 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Informants & Targets */}
        <section className="space-y-4">
          <h3 className="text-xl font-header italic font-extrabold text-charcoal">FIELD INTEL</h3>
          <div className="space-y-3">
            {CONTACTS.map((contact, idx) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-4 flex items-center justify-between group hover:bg-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-none transition-colors ${
                    contact.status === 'WANTED' ? 'bg-red-500/10 text-red-500' : 'bg-charcoal/5 text-charcoal/40'
                  }`}>
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-header font-bold italic text-sm">{contact.name}</h4>
                    <p className="text-[9px] font-mono text-charcoal/50 uppercase">{contact.role}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-none font-mono text-[9px] font-bold tracking-widest ${
                  contact.status === 'WANTED' ? 'bg-red-500 text-white animate-pulse' : 'bg-charcoal/10 text-charcoal/60'
                }`}>
                  {contact.status}
                </div>
              </motion.div>
            ))}
            
            {/* System Status Mock */}
            <div className="p-4 border border-dashed border-charcoal/10 rounded-none bg-charcoal/[0.02]">
              <div className="flex items-center gap-2 mb-2 text-charcoal/30">
                <Zap size={14} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Live Surveillance Feed</span>
              </div>
              <div className="h-1 bg-charcoal/5 rounded-none overflow-hidden">
                <motion.div 
                  className="h-full bg-flamingo/30"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntelSurveillance;
