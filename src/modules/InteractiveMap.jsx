import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Camera } from 'lucide-react';
import L from 'leaflet';

// Fix for missing marker icons in production
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const InteractiveMap = () => {
  // Miami Coordinates
  const center = [25.7617, -80.1918];
  
  const surveillancePoints = [
    { id: 1, name: 'Ocean Drive Entrance', coords: [25.7825, -80.1300], photo: 'Surveillance_01.jpg' },
    { id: 2, name: 'Bayside Marketplace', coords: [25.7743, -80.1856], photo: 'Surveillance_02.jpg' },
    { id: 3, name: 'Port of Miami', coords: [25.7797, -80.1764], photo: 'Surveillance_03.jpg' },
  ];

  return (
    <div className="space-y-6 pb-32">
       <div>
          <h2 className="text-3xl font-header italic font-extrabold tracking-tight text-charcoal">MIAMI SURVEILLANCE</h2>
          <p className="text-xs font-mono uppercase mt-1 tracking-widest text-charcoal opacity-80">Active nodes: {surveillancePoints.length}</p>
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
            {surveillancePoints.map(point => (
              <Marker key={point.id} position={point.coords}>
                <Popup>
                  <div className="p-2 space-y-2">
                    <div className="flex items-center gap-2 text-flamingo font-mono font-bold text-xs uppercase">
                      <Camera size={12} />
                      {point.name}
                    </div>
                    <div className="w-48 h-32 flex items-center justify-center border grayscale bg-zinc-200 border-charcoal/10">
                      <span className="text-[10px] font-mono opacity-50 text-charcoal">GRAINY SURVEILLANCE FEED...</span>
                    </div>
                    <p className="text-[10px] font-mono opacity-50 text-charcoal leading-tight">
                      ID: VP-{point.id * 1024} <br/>
                      COORD: {point.coords[0]}, {point.coords[1]}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Overlay Frame */}
          <div className="absolute inset-0 pointer-events-none border-4 z-[400] border-charcoal/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]" />
          <div className="absolute top-4 right-4 z-[400] font-mono text-[10px] p-2 border text-flamingo bg-white/80 border-flamingo/20">
            RADAR STATUS: ACTIVE<br/>
            SWEEP: NOMINAL
          </div>
        </div>
    </div>
  );
};

export default InteractiveMap;
