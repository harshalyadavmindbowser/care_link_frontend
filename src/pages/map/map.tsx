import { useState } from 'react'
import LocationSearch from '../../components/LocationSearch'
import Map from '../../components/Map'
import type { Place } from "../../api/place";


function MapPage() {
    const [place, setPlace] = useState<Place | null>(null);
    const [radius, setRadius] = useState<number>(10);

    return (
        <div className="grid grid-cols-12 w-full gap-4 px-4 mt-24">
            <div className="col-span-3">
                <LocationSearch onPlaceClick={(p) => setPlace(p)} onRadiusChange={(r) => setRadius(r)} />

            </div>
            <div className="col-span-9">
                <Map place={place} radius={radius}/>
            </div>
        </div>

    )
}

export default MapPage