import { useState, useEffect } from "react";
import dynamicFetch from "@/helpers/dynamicfetch";

export default function Cities() {
    const [cityData, setCityData] = useState({
        name: "",
        descriptions: "",
        population: "",
        zipCode: "",
        area: "",
        stateId: ""
    });
    const [addedCity, setAddedCity] = useState(null); // State to hold the added city data
    const [cities, setCities] = useState([]); // State to hold the fetched cities

    useEffect(() => {
        // Fetch cities when the component mounts
        const fetchCities = async () => {
            try {
                const responseData = await dynamicFetch('https://localhost:44338/api/Cities', 'GET');
                setCities(responseData);
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };

        fetchCities();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCityData({
            ...cityData,
            [name]: value
        });
    };

    const handleAddCity = async () => {
        try {
            const responseData = await dynamicFetch('https://localhost:44338/api/Cities', 'POST', cityData);
            console.log("City added successfully:", responseData);
            setAddedCity(responseData); // Set the added city data to state
            setCities([...cities, responseData]); // Update cities state to include the newly added city
            setCityData({
                name: "",
                descriptions: "",
                population: "",
                zipCode: "",
                area: "",
                stateId: ""
            }); // Reset cityData state for next entry
        } catch (error) {
            console.error("Failed to add city:", error);
        }
    };

    return (
        <div>
            <h1>Cities</h1>
            <form>
                <input type="text" name="name" value={cityData.name} onChange={handleInputChange} placeholder="Enter city name..." />
                <input type="text" name="descriptions" value={cityData.descriptions} onChange={handleInputChange} placeholder="Enter city descriptions..." />
                <input type="number" name="population" value={cityData.population} onChange={handleInputChange} placeholder="Enter city population..." />
                <input type="text" name="zipCode" value={cityData.zipCode} onChange={handleInputChange} placeholder="Enter city zip code..." />
                <input type="text" name="area" value={cityData.area} onChange={handleInputChange} placeholder="Enter city area..." />
                <input type="number" name="stateId" value={cityData.stateId} onChange={handleInputChange} placeholder="Enter state ID..." />
                <button type="button" onClick={handleAddCity}>Add City</button>
            </form>
            {addedCity && (
                <div>
                    <h2>Added City</h2>
                    <p>ID: {addedCity.id}</p>
                    <p>Name: {addedCity.name}</p>
                    <p>Descriptions: {addedCity.descriptions}</p>
                    <p>Population: {addedCity.population}</p>
                    <p>Zip Code: {addedCity.zipCode}</p>
                    <p>Area: {addedCity.area}</p>
                    <p>State ID: {addedCity.stateId}</p>
                </div>
            )}
            <h2>All Cities</h2>
            {cities.length > 0 ? (
                <ul>
                    {cities.map(city => (
                        <li key={city.id}>
                            <p>ID: {city.id}</p>
                            <p>Name: {city.name}</p>
                            <p>Descriptions: {city.descriptions}</p>
                            <p>Population: {city.population}</p>
                            <p>Zip Code: {city.zipCode}</p>
                            <p>Area: {city.area}</p>
                            <p>State ID: {city.stateId}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cities found.</p>
            )}
        </div>
    );
}
