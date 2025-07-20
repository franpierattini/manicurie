"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

interface MapaContactoProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  nombre: string;
}
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapaContacto({
  lat,
  lng,
  zoom = 15,
  height = "400px",
  nombre,
}: MapaContactoProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({});

      const map = L.map(mapContainer.current).setView([lat, lng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Crear marcador
      const marker = L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(nombre).openPopup();

      marker.on("click", () => {
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, "_blank");
      });

      return () => {
        map.remove();
      };
    }
  }, [lat, lng, zoom, nombre]);

  return (
    <div className="rounded-lg overflow-hidden z-0">
      <div
        ref={mapContainer}
        style={{
          height,
          zIndex: 0,
        }}
        className="z-0"
      />
    </div>
  );
}
