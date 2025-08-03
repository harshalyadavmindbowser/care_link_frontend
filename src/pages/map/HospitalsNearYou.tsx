import { useState } from 'react'
import LocationSearch from '../../components/LocationSearch'
import Map from '../../components/Map'
import type { Place } from "../../api/place";
import HospitalCard from '../../components/HospitalCard';
import useFetchData from '../../hooks/useHospitalFetchData';


function HospitalsNearYou() {
    const [place, setPlace] = useState<Place | null>(null);
    const [radius, setRadius] = useState<number>(16);
    const { hospitalData } = useFetchData();

    console.log('hospitalData', hospitalData)
    return (
        <div className="grid grid-cols-12 w-full gap-4 px-4 mt-10">
            <div className="col-span-3">
                <LocationSearch onPlaceClick={(p) => setPlace(p)} onRadiusChange={(r) => setRadius(r)} />

            </div>
            <div className="col-span-9 mt-3">
                <Map place={place} radius={radius} />
                <div className="col-span-9 mt-5">
                    {
                        hospitalData?.map((hospital, index) => (
                            <HospitalCard
                                key={index}
                                hospitalName={hospital.hospital_name}
                                hospitalAddress={hospital.hospital_address}
                                hospitalImages={hospital.images}
                            />
                        ))
                        }

                </div>
            </div>
        </div >

    )
}

export default HospitalsNearYou