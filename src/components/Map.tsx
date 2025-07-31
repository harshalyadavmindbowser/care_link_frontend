import type { Place } from "../api/place";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface MapProps {
    place: Place | null;
}

const Map = ({ place }: MapProps) => {
    const mapRef = useRef<LeafletMap | null>(null);
    const [lat, setLatitude] = useState<number>(18.554175348771114);  
    const [long, setLongitude] = useState<number>(73.77817977625274);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, (error) => {
            console.error("Geolocation error: ", error);
        });
    }, []);  

    useEffect(() => {
        if (mapRef.current) {
            if (place) {
                mapRef.current.flyTo([place.latitude, place.longitude], 16);
            } else {
                mapRef.current.flyTo([lat, long], 16);
            }
        }
    }, [place, lat, long]);

    return (
        <MapContainer
            ref={mapRef}
            center={[lat, long]} 
            zoom={16}
            scrollWheelZoom
            className="h-full"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {!place && (
                <Marker position={[lat, long]}>
                    <Popup>MindBowser</Popup>
                </Marker>
            )}

            {place && (
                <Marker position={[place.latitude, place.longitude]}>
                    <Popup>{place.name}</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
