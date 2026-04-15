import { create } from 'zustand';

const useStore = create((set) => ({
  vhsMode: true,
  heatLevel: 5,
  selectedArea: { 
    id: 'miami', 
    name: 'MIAMI', 
    lat: 25.7617, 
    lon: -80.1918, 
    timezone: 'America/New_York',
    country: 'United States'
  },
  toggleVhs: () => set((state) => ({ vhsMode: !state.vhsMode })),
  
  setHeatLevel: (level) => set({ heatLevel: level }),

  setSelectedArea: (area) => set({ selectedArea: area }),

  intelRefreshTrigger: 0,
  triggerIntelRefresh: () => set((state) => ({ intelRefreshTrigger: state.intelRefreshTrigger + 1 })),
}));

export default useStore;
