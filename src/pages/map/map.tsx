import { useState } from 'react'
import LocationSearch from '../../components/LocationSearch'
import Map from '../../components/Map'
import type { Place } from "../../api/place";


function MapPage() {
    const [place, setPlace] = useState<Place | null>(null);

    return (
        <div className='relative h-screen w-screen grid grid-cols-12'>
            <div className='col-span-3 p-2'>
                <LocationSearch onPlaceClick={(p) => setPlace(p)} />
            </div>
            <div className='col-span-9 h-[900px] mt-40'>
                <Map place={place} />
            </div>
        </div>
    )
}

export default MapPage