import type { Place } from "../api/place";
import "leaflet/dist/leaflet.css";
import { icon, Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from "react-leaflet";
import locations from "../json/location.json"


import "./Map.css"
interface MapProps {
    place: Place | null;
    radius: number
}

const customIcon = icon({
    iconUrl: '../../public/icons/hp.png',
    iconSize: [40, 40],
});

const radiusToZoom = (r: number): number => {
    return Math.max(11, 16 - Math.log2(r));
}

const Map = ({ place, radius }: MapProps) => {
    const mapRef = useRef<LeafletMap | null>(null);
    const [lat, setLatitude] = useState<number>(18.554175348771114);
    const [long, setLongitude] = useState<number>(73.77817977625274);
    const [userMarker, setUserMarker] = useState<[number, number] | null>(null);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const name = position.coords.heading
            console.log('name', name);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, (error) => {
            console.error("Geolocation error: ", error);
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            const zoom = radiusToZoom(radius);
            if (place) {
                mapRef.current.flyTo([place.latitude, place.longitude], zoom);
            } else {
                mapRef.current.flyTo([lat, long], zoom);
            }
        }
    }, [place, lat, long, radius]);

    function MyComponent() {
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                console.log("Clicked location:", lat, lng);
                setUserMarker([lat, lng]);
            },
            // locationfound: (location) => {
            //     const { lat, lng } = location.latlng;
            //     console.log('location found:', lat, lng, location.sourceTarget);
            //     setLatitude(lat);
            //     setLongitude(lng);
            //     setUserMarker([lat, lng]);
            // },
        })
        return null;
    }


    return (
        <MapContainer
            ref={mapRef}
            center={[lat, long]}
            zoom={16}
            scrollWheelZoom
            className="h-[600px] w-full"
        >

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {!place && (
                <Marker position={[lat, long]}>
                    {/* <Popup>MindBowser</Popup> */}
                    <Tooltip>MindBowser</Tooltip>
                </Marker>
            )}

            {locations.map((loc) => (
                <Marker
                    key={loc.id}
                    position={[loc.latitude, loc.longitude]}
                    icon={customIcon}
                >
                    {/* <Popup className="bg-green-300">
                        <strong>
                            {loc.name}
                        </strong>
                    </Popup> */}
                    <Tooltip>
                        <strong className="font-bold">{loc.name}</strong>
                    </Tooltip>
                </Marker>
            ))}

            {place && (
                <Marker position={[place.latitude, place.longitude]}>
                    {/* <Popup>{place.name}</Popup> */}
                    <Tooltip>{place.name}</Tooltip>
                </Marker>
            )}

            <MyComponent />
            {userMarker && (
                <Marker position={userMarker} icon={customIcon}>
                    <Tooltip>
                        <strong>Adding hospital at this location</strong>
                    </Tooltip>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
