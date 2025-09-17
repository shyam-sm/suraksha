import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// 🗺️ Custom layer with circles and polygons
function ZoneLayer() {
  const map = useMap();

  useEffect(() => {
    // Circle zones
    const circles = [
      L.circle([28.6139, 77.209], {
        radius: 10000,
        color: "red",
        fillColor: "#ffcccc",
        fillOpacity: 0.6,
      }),
      L.circle([19.076, 72.8777], {
        radius: 15000,
        color: "red",
        fillColor: "#ffcccc",
        fillOpacity: 0.6,
      }),
    ];

    // Uneven polygon zones
   const polygons = [
  // Chennai zone — larger and uneven
  L.polygon([
    [13.05, 80.20],
    [13.12, 80.22],
    [13.15, 80.28],
    [13.10, 80.32],
    [13.03, 80.30],
    [13.00, 80.25],
  ], {
    color: "red",
    fillColor: "#ffcccc",
    fillOpacity: 0.6,
  }),

  // Kolkata zone — larger and uneven
  L.polygon([
    [22.55, 88.30],
    [22.60, 88.32],
    [22.63, 88.36],
    [22.61, 88.40],
    [22.56, 88.42],
    [22.52, 88.38],
    [22.50, 88.34],
  ], {
    color: "red",
    fillColor: "#ffcccc",
    fillOpacity: 0.6,
  }),
];


    [...circles, ...polygons].forEach(zone => zone.addTo(map));

    return () => {
      [...circles, ...polygons].forEach(zone => map.removeLayer(zone));
    };
  }, [map]);

  return null;
}

export default function AdminMapView() {
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
      <ZoneLayer />
    </MapContainer>
  );
}
