import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle, Box, Plus, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';

const AssetDatabase = () => {
  const { heatLevel } = useStore();
  const [assets, setAssets] = useState([
    { id: 1, name: 'White Ferrari Testarossa', value: '$180,000', heat: 8, status: 'Active' },
    { id: 2, name: 'Scarab Speedboat', value: '$240,000', heat: 5, status: 'Active' },
    { id: 3, name: 'Brickell Safehouse', value: '$1,200,000', heat: 2, status: 'Active' },
    { id: 4, name: 'Ocean Drive Loft', value: '$850,000', heat: 4, status: 'Seized' },
  ]);

  const removeAsset = (id) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-header italic font-extrabold tracking-tight text-charcoal">ASSET PROCUREMENT</h2>
          <p className="text-xs font-mono uppercase mt-1 tracking-widest text-charcoal opacity-80">Global heat level: {heatLevel}/10</p>
        </div>
        <button className="btn-80s px-4 py-2 border rounded-xl transition-colors text-sm font-mono border-charcoal/20 text-charcoal hover:bg-charcoal/5">
          <Plus size={16} className="mr-2" />
          ACQUIRE NEW
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {assets.map((asset, index) => (
            <motion.div
              key={asset.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 relative overflow-hidden group"
            >
              <div 
                className="absolute top-0 left-0 h-1 transition-all duration-500"
                style={{ 
                  width: `${asset.heat * 10}%`, 
                  backgroundColor: asset.heat > 7 ? '#FF007F' : '#00FFFF' 
                }}
              />

              <div className="flex justify-between items-start mb-4">
                <Box className={`w-5 h-5 ${asset.status === 'Seized' ? 'text-red-500' : 'text-flamingo'}`} />
                <button 
                  onClick={() => removeAsset(asset.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-charcoal/5 rounded"
                >
                  <Trash2 size={14} className="text-charcoal/40" />
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-header font-bold italic text-lg leading-tight uppercase group-hover:text-flamingo transition-colors text-charcoal">
                  {asset.name}
                </h3>
                <p className="text-xl font-mono font-bold text-flamingo/80">{asset.value}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal/5 flex justify-between items-center text-[10px] font-mono text-charcoal/60 opacity-80">
                <div className="flex items-center gap-1">
                  <AlertTriangle size={10} />
                  HEAT: {asset.heat}/10
                </div>
                <span className={`px-2 py-0.5 rounded ${
                  asset.status === 'Seized' ? 'bg-red-500/10 text-red-500' : 'bg-flamingo/10 text-flamingo'
                }`}>
                  {asset.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssetDatabase;
