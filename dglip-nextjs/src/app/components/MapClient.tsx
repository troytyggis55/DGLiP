"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface MapClientProps {
  apiKey: string;
  position: { lat: number; lng: number };
}

export default function MapClient({ apiKey, position }: MapClientProps) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        center={position}
        zoom={10}
        style={{ width: "100%", height: "400px" }}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

