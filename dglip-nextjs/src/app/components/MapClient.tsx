"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


export default function MapClient({ apiKey, position, className }: {
  apiKey: string;
  position: { lat: number; lng: number };
  className?: string;
}) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={16}
        className={className}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

