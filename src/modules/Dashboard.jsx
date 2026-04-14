import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Droplets, Clock, Satellite, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const MIAMI_AREAS = [
  { id: 'sth-beach', name: 'SOUTH BEACH', lat: 25.7907, lon: -80.1300 },
  { id: 'brickell', name: 'BRICKELL', lat: 25.7617, lon: -80.1918 },
  { id: 'wynwood', name: 'WYNWOOD', lat: 25.8042, lon: -80.1989 },
  { id: 'ltl-havana', name: 'LITTLE HAVANA', lat: 25.7725, lon: -80.2144 },
  { id: 'cnc-grove', name: 'COCONUT GROVE', lat: 25.7126, lon: -80.2431 },
];

const Dashboard = () => {
  const [miamiTime, setMiamiTime] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState(MIAMI_AREAS[0]);
  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Initializing...',
    humidity: '--',
    location: MIAMI_AREAS[0].name,
    loading: true,
    lastUpdate: null
  });

  const mapWmoCode = (code) => {
    if (code === 0) return "Sky: Pure / Clear";
    if (code >= 1 && code <= 3) return "Sky: Scattered Clouds";
    if (code === 45 || code === 48) return "Vision: Foggy / Low";
    if (code >= 51 && code <= 55) return "Atmospherics: Light Drizzle";
    if (code >= 61 && code <= 65) return "Atmospherics: Rain Matrix";
    if (code >= 80 && code <= 82) return "Atmospherics: Flash Showers";
    if (code >= 95) return "System Alert: Thunderstorm";
    return "Sky: Nominal";
  };

  const fetchWeather = useCallback(async (area = selectedArea) => {
    setWeather(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${area.lat}&longitude=${area.lon}&current_weather=true&hourly=relative_humidity_2m`
      );
      const data = await response.json();
      const current = data.current_weather;
      const humidity = data.hourly.relative_humidity_2m[0];

      setWeather({
        temp: Math.round(current.temperature),
        condition: mapWmoCode(current.weathercode),
        humidity: humidity,
        location: area.name,
        loading: false,
        lastUpdate: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error("Downlink Failed:", error);
      setWeather(prev => ({ ...prev, loading: false, condition: "DOWNLINK ERROR" }));
    }
  }, [selectedArea]);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      const miami = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
      setMiamiTime(miami);
    }, 1000);

    fetchWeather(selectedArea);
    const weatherTimer = setInterval(() => fetchWeather(selectedArea), 900000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(weatherTimer);
    };
  }, [fetchWeather, selectedArea]);

  return (
    <div className="space-y-6">
      {/* Area Selection Row */}
      <div className="flex flex-wrap gap-2">
        {MIAMI_AREAS.map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedArea(area)}
            className={`px-3 py-1.5 rounded-xl font-mono text-[10px] tracking-widest transition-all duration-300 border ${
              selectedArea.id === area.id
                ? 'bg-flamingo text-white border-flamingo shadow-[0_0_15px_rgba(255,0,127,0.4)] scale-105 z-10'
                : 'bg-white/40 text-charcoal/60 border-charcoal/10 hover:bg-white/60 hover:border-charcoal/20'
            }`}
          >
            {area.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Time & Operations Card */}
        <motion.div 
          className="glass-card p-6 flex flex-col justify-between"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-1 text-charcoal/70">Operations Time</h3>
              <h2 className="text-2xl font-header italic font-extrabold text-charcoal shadow-sm">{selectedArea.name}</h2>
            </div>
            <Clock className="text-charcoal w-5 h-5" />
          </div>
          
          <div className="mt-8">
            <span className="text-6xl font-mono font-bold tracking-tighter text-charcoal">
              {miamiTime.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </span>
            <p className="text-[10px] font-mono mt-2 tracking-widest text-charcoal/60">
              UTC-04:00 // STATUS: OPERATIONAL
            </p>
          </div>
        </motion.div>

        {/* Atmospheric Downlink Card */}
        <motion.div 
          className="glass-card p-6 flex flex-col justify-between"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-1 text-charcoal/70">Atmospheric Downlink</h3>
              <h2 className="text-2xl font-header italic font-extrabold text-charcoal uppercase">{selectedArea.name} DATA</h2>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => fetchWeather(selectedArea)} 
                className="btn-80s w-8 h-8 rounded-xl hover:rotate-180 transition-transform duration-500"
              >
                <Sun className="text-charcoal w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between">
            <div>
              <span className="text-6xl font-mono font-bold tracking-tighter text-charcoal">
                {weather.temp}°F
              </span>
              <p className="text-[10px] font-mono mt-2 uppercase tracking-widest text-charcoal/80">
                {weather.condition}
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end gap-2 text-xs font-mono text-charcoal/80">
                <span>{weather.humidity}% HUM</span>
                <Droplets className="w-3 h-3" />
              </div>
              <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-charcoal/60">
                <Satellite className={`w-2.5 h-2.5 ${weather.loading ? 'animate-spin' : ''}`} />
                <span>{weather.loading ? 'LINKING...' : 'LOCKED'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
