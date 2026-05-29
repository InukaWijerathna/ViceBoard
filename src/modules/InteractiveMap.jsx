import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Camera, Crosshair } from 'lucide-react';
import L from 'leaflet';
import useStore from '../store/useStore';

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 13, { animate: true });
  }, [lat, lon, map]);
  return null;
};

const InteractiveMap = () => {
  const { selectedArea } = useStore();
  const center = [selectedArea.lat, selectedArea.lon];

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-center gap-3 mb-6 opacity-50">
        <Crosshair size={18} />
        <h2 className="text-xs font-mono uppercase tracking-[0.4em]">Surveillance Grid</h2>
      </div>

      <div>
        <h2 className="text-3xl font-header italic font-extrabold tracking-tight text-charcoal">
          {selectedArea.name} SURVEILLANCE
        </h2>
        <p className="text-xs font-mono uppercase mt-1 tracking-widest text-charcoal opacity-80">
          TARGET: {selectedArea.lat.toFixed(4)}, {selectedArea.lon.toFixed(4)} // {selectedArea.country}
        </p>
      </div>

      <div className="h-[400px] w-full glass-card overflow-hidden relative">
        <style>
          {`
            .leaflet-container {
              background: #FDF5E6 !important;
              filter: sepia(20%) contrast(90%) brightness(105%);
            }
            .leaflet-tile {
              opacity: 0.8;
            }
            .leaflet-popup-content-wrapper {
              background: #FDF5E6 !important;
              color: #2D3436 !important;
              border: 1px solid rgba(45, 52, 54, 0.1) !important;
              border-radius: 8px !important;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
            }
            .leaflet-popup-tip {
              background: #FDF5E6 !important;
            }
          `}
        </style>

        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RecenterMap lat={selectedArea.lat} lon={selectedArea.lon} />
          <Marker position={center} icon={customIcon}>
            <Popup>
              <div className="p-2 space-y-2">
                <div className="flex items-center gap-2 text-flamingo font-mono font-bold text-xs uppercase">
                  <Camera size={12} />
                  {selectedArea.name}
                </div>
                <div className="w-48 h-32 flex items-center justify-center border grayscale bg-zinc-200 border-charcoal/10">
                  <span className="text-[10px] font-mono opacity-50 text-charcoal">GRAINY SURVEILLANCE FEED...</span>
                </div>
                <p className="text-[10px] font-mono opacity-50 text-charcoal leading-tight">
                  COORD: {selectedArea.lat.toFixed(4)}, {selectedArea.lon.toFixed(4)}<br />
                  JURISDICTION: {selectedArea.country}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        <div className="absolute inset-0 pointer-events-none border-4 z-[400] border-charcoal/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]" />
        <div className="absolute top-4 right-4 z-[400] font-mono text-[10px] p-2 border text-flamingo bg-white/80 border-flamingo/20">
          RADAR STATUS: ACTIVE<br />
          SWEEP: NOMINAL
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
