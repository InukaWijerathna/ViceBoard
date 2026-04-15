import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Droplets, Clock, Satellite, RefreshCw, ChevronDown, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import keySoundFile from '../assets/key_sound.mp3';

let keyAudio;
if (typeof window !== 'undefined') {
  keyAudio = new Audio(keySoundFile);
  keyAudio.preload = "auto";
}

const playKeySound = () => {
  if (keyAudio) {
    keyAudio.currentTime = 0;
    keyAudio.play().catch(e => console.log('Audio playback prevented:', e));
  }
};

const INITIAL_CITY = { 
  id: 'miami', 
  name: 'MIAMI', 
  lat: 25.7617, 
  lon: -80.1918, 
  timezone: 'America/New_York',
  country: 'United States'
};

const Dashboard = () => {
  const [localTime, setLocalTime] = useState(new Date());
  const { selectedArea, setSelectedArea, triggerIntelRefresh } = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [tempUnit, setTempUnit] = useState('F');
  
  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Initializing...',
    humidity: '--',
    location: selectedArea.name,
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
      const humidity = data.hourly?.relative_humidity_2m?.[0] || '--';

      setWeather({
        temp: current.temperature,
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

  // Geocoding Search Logic
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=en&format=json`
        );
        const data = await response.json();
        if (data.results) {
          setSuggestions(data.results.map(res => ({
            id: res.id,
            name: res.name.toUpperCase(),
            lat: res.latitude,
            lon: res.longitude,
            timezone: res.timezone,
            country: res.country,
            admin1: res.admin1
          })));
          setIsDropdownOpen(true);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      try {
        const local = new Date(new Date().toLocaleString("en-US", { timeZone: selectedArea.timezone }));
        setLocalTime(local);
      } catch (e) {
        setLocalTime(new Date());
      }
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
      <div className="relative max-w-md">
        <div className="flex items-center gap-4 px-4 py-1 rounded-none border bg-white/40 border-charcoal/10 focus-within:border-flamingo/50 transition-all duration-300">
          <Search size={14} className="text-charcoal/40" />
          <input
            type="text"
            value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
                playKeySound();
              }}
              onFocus={() => {
                if (suggestions.length > 0) setIsDropdownOpen(true);
              }}
              placeholder={selectedArea.name}
              className="flex-1 bg-transparent py-2.5 outline-none font-mono text-[10px] tracking-[0.3em] text-charcoal placeholder:text-charcoal/80 uppercase"
            />
            {isSearching && (
              <Loader2 size={14} className="animate-spin text-flamingo" />
            )}
          </div>

        <AnimatePresence>
          {isDropdownOpen && suggestions.length > 0 && (
            <>
              {/* Backdrop for closing */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)} 
              />
              
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 mt-1 w-full z-50 glass-card border border-charcoal/10 shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col py-1 max-h-[300px] overflow-y-auto">
                  {suggestions.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedArea(city);
                        setSearchTerm('');
                        setSuggestions([]);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-3 text-left font-mono text-[10px] tracking-widest transition-all duration-200 border-l-2 group ${
                        selectedArea.id === city.id
                          ? 'bg-flamingo/10 text-flamingo border-flamingo'
                          : 'text-charcoal/60 border-transparent hover:bg-white/80 hover:text-charcoal hover:border-charcoal/20'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{city.name}</span>
                        <span className="text-[8px] opacity-40 group-hover:opacity-70 transition-opacity">
                          {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
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
              {localTime.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </span>
            <p className="text-[10px] font-mono mt-2 tracking-widest text-charcoal/60">
              {selectedArea.timezone} // STATUS: OPERATIONAL
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
              <h2 className="text-2xl font-header italic font-extrabold text-charcoal uppercase"></h2>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  fetchWeather(selectedArea);
                  triggerIntelRefresh();
                }} 
                className={`btn-80s w-8 h-8 flex items-center justify-center rounded-none group hover:border-flamingo transition-colors duration-300 ${weather.loading ? 'border-flamingo bg-flamingo/5' : ''}`}
                title="Sync Atmospheric Downlink"
              >
                <RefreshCw className={`w-4 h-4 transition-all duration-500 ${weather.loading ? 'animate-spin text-flamingo' : 'text-charcoal group-hover:rotate-180 group-hover:text-flamingo'}`} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between">
            <div>
              <span 
                className="text-6xl font-mono font-bold tracking-tighter text-charcoal cursor-pointer hover:text-flamingo transition-colors"
                onClick={() => setTempUnit(prev => prev === 'F' ? 'C' : 'F')}
                title="Toggle Temperature Unit"
              >
                {weather.temp !== '--' ? Math.round(tempUnit === 'F' ? (weather.temp * 9/5 + 32) : weather.temp) : '--'}°{tempUnit}
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
