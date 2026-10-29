import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function LocationPickerMap({ coords, onCoordsChange }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView(coords, 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      const pinIcon = L.divIcon({
        className: 'picker-pin',
        html: `
          <div style="background-color: #9A1B2F; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(154,27,47,0.4); border: 2px solid white;">
            <span class="material-symbols-outlined" style="font-size: 20px;">home_pin</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker(coords, {
        icon: pinIcon,
        draggable: true
      }).addTo(map);

      marker.on('dragend', (e) => {
        const pos = e.target.getLatLng();
        onCoordsChange([pos.lat, pos.lng]);
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        onCoordsChange([e.latlng.lat, e.latlng.lng]);
      });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;

      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    } else {
      if (markerInstanceRef.current) {
        markerInstanceRef.current.setLatLng(coords);
      }
      mapInstanceRef.current.setView(coords);
    }
  }, [coords, onCoordsChange]);

  return (
    <div className="rounded-2xl border border-outline-variant overflow-hidden">
      <div className="bg-surface-container px-4 py-2 flex items-center justify-between text-xs">
        <span className="font-bold text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-secondary text-[16px]">pin_drop</span>
          <span>Drag Pin to Pinpoint Doorstep Location</span>
        </span>
        <span className="text-[11px] font-mono text-outline">
          Lat: {coords[0].toFixed(4)}°, Long: {coords[1].toFixed(4)}°
        </span>
      </div>
      <div ref={mapContainerRef} className="h-44 w-full bg-surface-container-high z-10" />
    </div>
  );
}
