# Vice-Board - Retro-Intelligence Dashboard

**Vice-Board** is a sophisticated **Retro-Intelligence Dashboard** that synthesizes real-world data telemetry with a high-fidelity 1980s aesthetic. It serves as a comprehensive global monitoring system for real-time clocks, meteorological patterns, and tactical intelligence feeds.

---

## 🕹️ System Operation

Designed as a location-aware terminal, the system recalibrates its entire UI based on user search queries.

1. **Geospatial Jurisdiction:** Use the search field at the top of the Operations Center to access the global search override.
2. **Data Calibration:** Entering a city name (e.g., *Hong Kong*, *Paris*, *New York*) triggers a cascading refresh across all intelligence modules.
3. **Intelligence Stream:** The system provides specialized data on:
    - **Operations Time:** Synchronized UTC/Local timezone delta.
    - **Atmospheric Downlink:** Live meteorological telemetry (Temp, Humidity, WMO codes).
    - **Live Intel:** Real-world news events parsed into tactical field intercepts.

---

## ⚙️ Technical Architecture

### 📡 Data Telemetry & APIs
- **Open-Meteo Geocoding & Weather:** Utilizes high-precision GPS coordinates to fetch real-time atmospheric data. Includes custom mapping logic for WMO (World Meteorological Organization) codes into tactical descriptors.
- **Guardian Open News API:** A specialized intelligence engine that autonomously polls for global news, scrubs metadata, and reformats headlines into field-ready "Intercepts" using regex-based sanitization.
- **Asynchronous Loop Protocols:** Implements self-healing retry mechanisms and intelligent debouncing to maintain stable connections under API rate-limiting conditions.

### 📼 Visual Engineering
- **CRT & VHS Simulation:** A deeply layered CSS engine using pseudo-elements to create scanline overlays, grain distortion, and a persistent "analog" glow.
- **Glassmorphism 2.0:** High-blur backdrop filters matched with ultra-thin borders and varying opacity levels to simulate backlit acrylic terminal displays.
- **Audio Sensory Feedback:**
    - **Low-Latency Interactions:** High-frequency click sounds for interface navigation.
    - **Typewriter Engine:** Specialized `key_sound.mp3` triggers for search bar inputs.

### 🧬 Logical Framework
- **State Management:** Powered by **Zustand**, providing a lightweight but rigid reactive core for cross-module synchronization (location changes, refresh triggers).
- **Animation Matrix:** Orchestrated by **Framer Motion** to handle terminal-style layout transitions, tactical list streaming, and UI element entry/exit logic.
- **Path Resolution:** Custom asset utility system to ensure consistent pathing across both local development and GitHub Pages (sub-path) production deployments.

---

## 🛠️ Stack Summary
- **Core**: Vite 8.0, React 19
- **Engine**: Zustand (State Management), Framer Motion (Animations)
- **UI Architecture**: Tailwind CSS v4 (Modern @theme directive system)
- **Mapping**: React-Leaflet (Surveillance Visualizer)

---

## ⚠️ Legal Disclaimer
This is a non-commercial portfolio project for educational and design exploration. Themes and conceptual tributes belong to NBCUniversal. Data is provided "as-is" via public domain APIs.

*Designed for the digital outrun.* 🏙️🌃🏎️
