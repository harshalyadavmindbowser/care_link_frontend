import { Fragment, useState } from "react";
import type { Place } from "../api/place";
import { search } from "../api/search";
import SearchBar from "./SearchBar";

interface LocationSearchProp {
    onPlaceClick: (place: Place) => void;
}

const LocationSearch = ({ onPlaceClick }: LocationSearchProp) => {
    const [places, setPlaces] = useState<Place[]>([])

    const handleSearch = async (value : string) => {
        if (value.trim() === "") {
            setPlaces([]);
            return;
        }
        const results = await search(value);
        setPlaces(results);
    }

    return (
        <div>
            <SearchBar
                className="mt-2"
                placeholder="Search for a location..."
                onSearch={handleSearch}
            />
            <h1 className="font-bold mt-6">
                Found Locations
            </h1>
            <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
                {
                    places.map(place => {
                        return <Fragment key={place.id}>
                            <p className="text-sm">{place.name}</p>
                            <button
                                className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded" onClick={() => onPlaceClick(place)}>GO</button>
                        </Fragment>
                    })
                }
            </div>
        </div>
    )
};

export default LocationSearch;