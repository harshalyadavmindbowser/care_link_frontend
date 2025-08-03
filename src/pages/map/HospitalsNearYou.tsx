import { useState } from 'react'
import LocationSearch from '../../components/LocationSearch'
import Map from '../../components/Map'
import type { Place } from "../../api/place";
import HospitalCard from '../../components/HospitalCard';
import useFetchData from '../../hooks/useHospitalFetchData';


function HospitalsNearYou() {
    const [place, setPlace] = useState<Place | null>(null);
    const [radius, setRadius] = useState<number>(10);
    const { hospitalData } = useFetchData();

    const hospitalImages = hospitalData?.images || [];



    return (
        <div className="grid grid-cols-12 w-full gap-4 px-4 mt-10">
            <div className="col-span-3">
                <LocationSearch onPlaceClick={(p) => setPlace(p)} onRadiusChange={(r) => setRadius(r)} />

            </div>
            <div className="col-span-9 mt-3">
                <Map place={place} radius={radius} />
                <div className="col-span-9 mt-5">
                    <HospitalCard hospitalName={hospitalData?.hospital_name} hospitalAddress={hospitalData?.hospital_address} hospitalImages={hospitalImages} />
                </div>
            </div>
        </div>

    )
}

export default HospitalsNearYou