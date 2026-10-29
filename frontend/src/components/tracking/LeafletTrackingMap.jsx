import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

export default function LeafletTrackingMap({ activeStage, onStageChange }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const animIntervalRef = useRef(null);

  const [isSimulating, setIsSimulating] = useState(false);

  const kitchenCoords = [18.5173, 73.8398]; // Bhandarkar Road
  const customerCoords = [18.5284, 73.8443]; // FC Road / Shivajinagar
  const waypoints = [
    kitchenCoords,
    [18.5195, 73.8410],
    [18.5220, 73.8425],
    [18.5255, 73.8435],
    customerCoords
  ];

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([18.5230, 73.8420], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    function makeIcon(bgHex, symbolIcon) {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="background-color: ${bgHex}; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.3); border: 2px solid white;">
            <span class="material-symbols-outlined" style="font-size: 20px;">${symbolIcon}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
    }

    // 1. Kitchen Marker
    const kitchenIcon = makeIcon('#9A1B2F', 'storefront');
    L.marker(kitchenCoords, { icon: kitchenIcon })
      .addTo(map)
      .bindPopup('<b>Padmavati Central Kitchen</b><br>Fresh Preparation Hub');

    // 2. Customer Marker
    const customerIcon = makeIcon('#1C6B38', 'home');
    L.marker(customerCoords, { icon: customerIcon })
      .addTo(map)
      .bindPopup('<b>Your Delivery Address</b><br>Customer Destination Point');

    // 3. Polyline Route
    const polyline = L.polyline(waypoints, {
      color: '#D9531E',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8'
    }).addTo(map);

    // 4. Rider Marker
    const riderIcon = makeIcon('#F28C28', 'moped');
    const rider = L.marker([18.5220, 73.8425], { icon: riderIcon })
      .addTo(map)
      .bindPopup('<b>Courier Ramesh Kumar</b><br>Hero Electric Bike • In Transit');

    mapInstanceRef.current = map;
    riderMarkerRef.current = rider;
    polylineRef.current = polyline;

    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, []);

  const centerRoute = () => {
    if (mapInstanceRef.current && polylineRef.current) {
      mapInstanceRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
    }
  };

  const toggleSimulation = () => {
    if (isSimulating) {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      setIsSimulating(false);
    } else {
      setIsSimulating(true);
      let step = 0;
      animIntervalRef.current = setInterval(() => {
        step = (step + 1) % waypoints.length;
        if (riderMarkerRef.current) {
          riderMarkerRef.current.setLatLng(waypoints[step]);
        }
        if (step === waypoints.length - 1) {
          onStageChange?.(4);
        } else {
          onStageChange?.(3);
        }
      }, 1600);
    }
  };

  return (
    <div className="lg:col-span-7 relative h-[420px] lg:h-auto min-h-[440px] w-full">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          className="px-3 py-1.5 rounded-xl bg-surface-bright/95 backdrop-blur-md text-on-surface text-xs font-bold shadow-lg border border-outline-variant/80 flex items-center gap-1 hover:bg-surface-container transition-all cursor-pointer"
          onClick={centerRoute}
        >
          <span className="material-symbols-outlined text-[16px] text-primary">center_focus_strong</span>
          <span>Center Route</span>
        </button>
        <button
          className="px-3 py-1.5 rounded-xl bg-secondary text-white text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-secondary/90 transition-all cursor-pointer"
          onClick={toggleSimulation}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isSimulating ? 'pause' : 'play_arrow'}
          </span>
          <span>{isSimulating ? 'Pause Simulation' : 'Simulate Ride (Demo)'}</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-surface-bright/90 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-semibold shadow border border-outline-variant/80 flex items-center gap-3">
        <span className="flex items-center gap-1 text-[11px] text-primary">
          <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Central Rasoi
        </span>
        <span className="flex items-center gap-1 text-[11px] text-secondary">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Courier Rider
        </span>
        <span className="flex items-center gap-1 text-[11px] text-tertiary">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Your Doorstep
        </span>
      </div>
    </div>
  );
}
