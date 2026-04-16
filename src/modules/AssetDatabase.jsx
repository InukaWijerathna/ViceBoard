import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle, Box, Plus, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';
import { getAssetUrl } from '../utils/paths';

const AssetDatabase = () => {
  const { heatLevel } = useStore();
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'White Ferrari Testarossa',
      value: '$180,000',
      heat: 8,
      status: 'Active',
      image: getAssetUrl('asset_ferrari.png'),
    },
    {
      id: 2,
      name: 'Scarab Speedboat',
      value: '$240,000',
      heat: 5,
      status: 'Active',
      image: getAssetUrl('asset_speedboat.png'),
    },
    {
      id: 3,
      name: 'Brickell Safehouse',
      value: '$1,200,000',
      heat: 2,
      status: 'Active',
      image: getAssetUrl('asset_safehouse.png'),
    },
    {
      id: 4,
      name: 'Ocean Drive Loft',
      value: '$850,000',
      heat: 4,
      status: 'Seized',
      image: getAssetUrl('asset_loft.png'),
    },
    {
      id: 5,
      name: 'Black Ferrari Daytona',
      value: '$140,000',
      heat: 6,
      status: 'Active',
      image: getAssetUrl('asset_daytona.png'),
    },
    {
      id: 6,
      name: 'St. Vitus\' Dance',
      value: '$350,000',
      heat: 1,
      status: 'Active',
      image: getAssetUrl('asset_sailboat.png'),
    },
    {
      id: 7,
      name: 'Gold Coast Warehouse',
      value: '$2,500,000',
      heat: 0,
      status: 'Active',
      image: getAssetUrl('asset_warehouse.png'),
    },
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
        <button 
          className="btn-80s px-4 py-2 border rounded-none transition-colors text-sm font-mono border-charcoal/20 text-charcoal hover:bg-charcoal/5"
        >
          <Plus size={16} className="mr-2" />
          ACQUIRE NEW
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {assets.map((asset, index) => (
            <Motion.div
              key={asset.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card relative overflow-hidden group flex flex-col"
            >
              {/* Heat bar */}
              <div
                className="absolute top-0 left-0 h-1 z-10 transition-all duration-500"
                style={{
                  width: `${asset.heat * 10}%`,
                  backgroundColor: asset.heat > 7 ? '#FF007F' : '#00FFFF',
                }}
              />

              {/* Image thumbnail */}
              <div className="relative h-40 overflow-hidden flex-shrink-0">
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    filter: asset.status === 'Seized' ? 'grayscale(60%) brightness(0.75)' : 'brightness(0.85)',
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Status badge over image */}
                <span
                  className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-none text-[10px] font-mono font-bold tracking-widest z-10 ${
                    asset.status === 'Seized'
                      ? 'bg-red-500/80 text-white'
                      : 'bg-flamingo/80 text-white'
                  }`}
                >
                  {asset.status.toUpperCase()}
                </span>
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <Box className={`w-5 h-5 ${asset.status === 'Seized' ? 'text-red-500' : 'text-flamingo'}`} />
                  <button
                    onClick={() => removeAsset(asset.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-charcoal/5 rounded-none"
                  >
                    <Trash2 size={14} className="text-charcoal/40" />
                  </button>
                </div>

                <div className="space-y-1 flex-1">
                  <h3 className="font-header font-bold italic text-base leading-tight uppercase group-hover:text-flamingo transition-colors text-charcoal">
                    {asset.name}
                  </h3>
                  <p className="text-xl font-mono font-bold text-flamingo/80">{asset.value}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-charcoal/5 flex justify-between items-center text-[10px] font-mono text-charcoal/60 opacity-80">
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={10} />
                    HEAT: {asset.heat}/10
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssetDatabase;
