import React, { useState, useEffect } from 'react';
import dynamicFetch from '@/helpers/dynamicfetch';
import { Button, Form, Table, Container } from 'react-bootstrap';

const PollingPlaces = () => {
    const [pollingPlaces, setPollingPlaces] = useState([]);
    const [cities, setCities] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentPollingPlace, setCurrentPollingPlace] = useState(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [population, setPopulation] = useState(0);
    const [openingTime, setOpeningTime] = useState('0001-01-01T00:00:00');
    const [closingTime, setClosingTime] = useState('0001-01-01T00:00:00');
    const [selectedCityId, setSelectedCityId] = useState('');

    useEffect(() => {
        const fetchPollingPlaces = async () => {
            const data = await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'GET');
            setPollingPlaces(data);
        };

        const fetchCities = async () => {
            const data = await dynamicFetch('https://localhost:44338/api/Cities', 'GET');
            setCities(data);
        };

        fetchPollingPlaces();
        fetchCities();
    }, []);

    const refreshPollingPlaces = async () => {
        const data = await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'GET');
        setPollingPlaces(data);
    };

    const handleCreate = async () => {
        await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'POST', {
            name,
            address,
            population,
            openingTime,
            closingTime,
            cityId: selectedCityId
        });
        clearForm();
        refreshPollingPlaces();
    };

    const handleUpdate = async () => {
        await dynamicFetch(`https://localhost:44338/api/PollingPlaces/${currentPollingPlace.id}`, 'PUT', {
            name,
            address,
            population,
            openingTime,
            closingTime,
            cityId: selectedCityId
        });
        setIsEditing(false);
        clearForm();
        refreshPollingPlaces();
    };

    const handleDelete = async (pollingPlaceId) => {
        await dynamicFetch(`https://localhost:44338/api/PollingPlaces/${pollingPlaceId}`, 'DELETE');
        refreshPollingPlaces();
    };

    const startUpdate = (pollingPlace) => {
        setCurrentPollingPlace(pollingPlace);
        setName(pollingPlace.name);
        setAddress(pollingPlace.address);
        setPopulation(pollingPlace.population);
        setOpeningTime(pollingPlace.openingTime);
        setClosingTime(pollingPlace.closingTime);
        setSelectedCityId(pollingPlace.cityId);
        setIsEditing(true);
        setIsCreating(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        clearForm();
    };

    const startCreate = () => {
        setIsCreating(true);
        setIsEditing(false);
        clearForm();
    };

    const cancelCreate = () => {
        setIsCreating(false);
        clearForm();
    };

    const clearForm = () => {
        setName('');
        setAddress('');
        setPopulation(0);
        setOpeningTime('0001-01-01T00:00:00');
        setClosingTime('0001-01-01T00:00:00');
        setSelectedCityId('');
    };

    return (
        <Container fluid id="polling-places" className="h-100">
            <h2>Polling Places</h2>
            <Button onClick={startCreate} className="mb-3">Create Polling Place</Button>
            {isCreating && (
                <Form inline className="mb-3">
                    <Form.Group>
                        <Form.Label className="mr-2">Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Population</Form.Label>
                        <Form.Control
                            type="number"
                            value={population}
                            onChange={(e) => setPopulation(parseInt(e.target.value))}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Opening Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={openingTime}
                            onChange={(e) => setOpeningTime(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Closing Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={closingTime}
                            onChange={(e) => setClosingTime(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">City</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCityId}
                            onChange={(e) => setSelectedCityId(e.target.value)}
                            className="mr-2"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleCreate} className="mr-2">Create</Button>
                    <Button variant="secondary" onClick={cancelCreate}>Cancel</Button>
                </Form>
            )}
            {isEditing && (
                <Form inline className="mb-3">
                    <Form.Group>
                        <Form.Label className="mr-2">Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Population</Form.Label>
                        <Form.Control
                            type="number"
                            value={population}
                            onChange={(e) => setPopulation(parseInt(e.target.value))}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Opening Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={openingTime}
                            onChange={(e) => setOpeningTime(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">Closing Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={closingTime}
                            onChange={(e) => setClosingTime(e.target.value)}
                            className="mr-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mr-2">City</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCityId}
                            onChange={(e) => setSelectedCityId(e.target.value)}
                            className="mr-2"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdate} className="mr-2">Update</Button>
                    <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
                </Form>
            )}
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Population</th>
                        <th>Opening Time</th>
                        <th>Closing Time</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pollingPlaces.map((place) => (
                        <tr key={place.id}>
                            <td>{place.id}</td>
                            <td>{place.name}</td>
                            <td>{place.address}</td>
                            <td>{place.population}</td>
                            <td>{new Date(place.openingTime).toLocaleString()}</td>
                            <td>{new Date(place.closingTime).toLocaleString()}</td>
                            <td>{cities.find(city => city.id === place.cityId)?.name || 'Unknown'}</td>
                            <td className="d-flex justify-content-start">
                                <Button variant="warning" size="sm" onClick={() => startUpdate(place)} className="mr-2">Update</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(place.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PollingPlaces;
