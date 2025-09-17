import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import { useEffect } from "react";

// 🔥 Heatmap component using leaflet.heat
function HeatmapLayer() {
  const map = useMap();

  useEffect(() => {
    const points = [
      [28.6139, 77.209],   // Delhi
      [19.076, 72.8777],   // Mumbai
      [13.0827, 80.2707],  // Chennai
      [22.5726, 88.3639],  // Kolkata
      [12.9716, 77.5946],  // Bangalore
    ];

    const markers: L.CircleMarker[] = [];

    points.forEach(([lat, lng]) => {
      const marker = L.circleMarker([lat, lng], {
        radius: 8,              // size of the dot
        color: 'red',           // border color
        fillColor: 'red',       // fill color
        fillOpacity: 0.6,       // fully visible
        weight: 0,              // no border thickness
      }).addTo(map);

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => map.removeLayer(marker));
    };
  }, [map]);

  return null;
}


export default function MapView() {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center of India
      zoom={5}
      scrollWheelZoom
      className="h-96 w-full rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer />
    </MapContainer>
  );
}
