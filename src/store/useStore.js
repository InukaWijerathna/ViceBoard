import { create } from 'zustand';

const useStore = create((set) => ({
  vhsMode: true,
  heatLevel: 5,
  
  toggleVhs: () => set((state) => ({ vhsMode: !state.vhsMode })),
  
  setHeatLevel: (level) => set({ heatLevel: level }),
}));

export default useStore;
