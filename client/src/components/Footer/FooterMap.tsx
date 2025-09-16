import { MapContainer, TileLayer,Marker, Popup  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './Footer.css'


type FooterMapProps = {
  lat?: number;
  lng?: number;  
  zoom?: number;
  heightPx?: number; 
};

export default function FooterMap({lat = -34.922714413988174, lng = -57.95624477415776, zoom = 15, heightPx = 160,}: FooterMapProps) {
  const center = [lat, lng] as [number, number];

  return (
    <div className="footer-map" >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: `${heightPx}px`, width: "100%"}}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
            <Popup>Oficina</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
