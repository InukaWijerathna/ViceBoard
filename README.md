# Vice-Board // Miami Digital Dashboard

Vice-Board is a high-fidelity, interactive "Digital Dashboard" inspired by the 1980s Miami aesthetic. It serves as both a retro-futurist art piece and a functional application featuring real-time telemetry, audio visualization, and interactive surveillance mapping.

## 🌴 Core Concept
Built as a "Digital Terminal" for a high-speed undercover lifestyle, Vice-Board combines **Glassmorphism**, **VHS Distortion**, and **Authentic Soundtracks** to create a premium, immersive environment.

---

## 🚀 Technical Features

### 📡 Real-Time Satellite Downlink
- **Live Telemetry**: Integrated with the **Open-Meteo API** to fetch real-time weather conditions for **South Beach, Miami**.
- **Dynamic Updates**: Automatically polls data every 15 minutes with a "Satellite Locked" UI status indicator.
- **WMO Interpretation**: Custom mapping of World Meteorological Organization codes into "Vice" style descriptors (e.g., "Sky: Pure", "Atmospherics: Rain Matrix").

### 📺 Permanent VHS Aesthetic
- **High-Fidelity Scanlines**: A global CSS overlay simulates CRT scanlines and grainy analog distortion.
- **Analog Glow**: Custom neon glimmer effects and glassmorphic blur intensity that adapts between themes.
- **Theme Engine**: Seamless transition between **Midnight Mode** (Neon/Electric) and **South Beach Mode** (Pastel/Linen/Mint).

### 🎧 Jan Hammer Audio Hub
- **YouTube API Integration**: Streams authentic series soundtracks (e.g., *Crockett's Theme*) directly via a hidden YouTube IFrame player.
- **Tactile Feedback**: Low-latency mechanical mouse click sounds (embedded via Base64) for every dashboard interaction.
- **Mock Visualizer**: A pulsing frequency bar system that acts as a low-fi heartbeat for the dashboard.

### 🗺️ Miami Intelligence Suite
- **Interactive Map**: Built with **React-Leaflet**, featuring custom CSS filters to maintain the VHS look and surveillance pins at key Miami nodes.
- **Asset Database**: A CRUD-capable grid for managing undercover assets, featuring "Heat Level" visualizers and data-ready states.

---

## 🛠️ Tech Stack
- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@theme` directives)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mapping**: [React-Leaflet](https://react-leaflet.js.org/)
- **Audio API**: [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

---

## 🏁 Installation & Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Prod Bundle**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure
- `src/modules/`: Main functional components (Dashboard, AudioHub, Map, etc.)
- `src/store/`: Zustand global state manager (`useStore.js`)
- `src/components/`: Reusable UI elements (VLogo, VhsOverlay, ClickSoundProvider)
- `src/index.css`: Global Tailwind v4 theme and custom VHS distortion effects.

---

*Designed for the digital outrun.* 🏙️🌃🏎️
