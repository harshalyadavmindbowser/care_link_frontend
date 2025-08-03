import { Fragment, useState } from "react";
import type { Place } from "../api/place";
import { search } from "../api/search";
import SearchBar from "./SearchBar";
import axios from "axios";

interface LocationSearchProp {
    onPlaceClick: (place: Place) => void;
    onRadiusChange: (radius: number) => void;


}

const LocationSearch = ({ onPlaceClick, onRadiusChange }: LocationSearchProp) => {
    const [places, setPlaces] = useState<Place[]>([])
    const [radius, setRadius] = useState<number>(10);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleSearch = async (value: string) => {
        if (value.trim() === "") {
            setPlaces([]);
            return;
        }
        const results = await search(value);
        setPlaces(results);
    }

    const handleRadiusChange = (value: number) => {
        setRadius(value);
        onRadiusChange(value);
    };


    const handleCategoryChange = async (category: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((item) => item !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });

        try {
            const response = await axios.post('http://localhost:8080/hospitals/category', {
                categoryNames: [...selectedCategories, category],
            });
            console.log('Selected Categories Sent to Backend:', response.data);
        } catch (error) {
            console.error('Error sending categories:', error);
        }
    };


    return (
        <div>
            <SearchBar
                className="mt-2 bg-gray-200"
                placeholder="Search for a location..."
                onSearch={handleSearch}
            />
            <div className="mt-4">
                <label>Search Radius</label>
                <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={radius}
                    onChange={(e) => handleRadiusChange(Number(e.target.value))}
                    className="w-full mt-1"
                    id="radius"
                />
                <div className="text-right">
                    Radius: <p className="text-blue-600">{radius} km</p>
                </div>
            </div>

            <hr />
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

            <div>
                <label htmlFor="category" className="font-semibold text-lg">Category</label>
                <ul>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="Cardiology"
                                checked={selectedCategories.includes("Cardiology")}
                                onChange={() => handleCategoryChange("Cardiology")}
                            /> Cardiology
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="Orthopedics"
                                checked={selectedCategories.includes("Orthopedics")}
                                onChange={() => handleCategoryChange("Orthopedics")}
                            /> Orthopedics
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="Pediatrics"
                                checked={selectedCategories.includes("Pediatrics")}
                                onChange={() => handleCategoryChange("Pediatrics")}
                            /> Pediatrics
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="Neurology"
                                checked={selectedCategories.includes("Neurology")}
                                onChange={() => handleCategoryChange("Neurology")}
                            /> Neurology
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="Dermatology"
                                checked={selectedCategories.includes("Dermatology")}
                                onChange={() => handleCategoryChange("Dermatology")}
                            /> Dermatology
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default LocationSearch;