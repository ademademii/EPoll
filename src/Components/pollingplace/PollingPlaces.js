import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import PollingPlaceTableRow from './PollingPlaceTableRow';

const PollingPlaces = () => {
    const [pollingPlaces, setPollingPlaces] = useState([]);
    const [cities, setCities] = useState([]); // State to store cities

    const [showModal, setShowModal] = useState(false);
    const [currentPollingPlace, setCurrentPollingPlace] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pollingPlacesData = await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'GET');
                setPollingPlaces(pollingPlacesData);

                const citiesData = await dynamicFetch('https://localhost:44338/api/Cities', 'GET');
                setCities(citiesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const refreshPollingPlaces = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'GET');
            setPollingPlaces(data);
        } catch (error) {
            console.error('Error fetching polling places:', error);
        }
    };

    const handleCreate = async (pollingPlaceData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'POST', pollingPlaceData);
            setShowModal(false);
            refreshPollingPlaces();
        } catch (error) {
            console.error('Error creating polling place:', error);
        }
    };

    const handleUpdate = async (pollingPlaceData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/PollingPlaces/${currentPollingPlace.id}`, 'PUT', pollingPlaceData);
            setShowModal(false);
            refreshPollingPlaces();
        } catch (error) {
            console.error('Error updating polling place:', error);
        }
    };

    const handleDelete = async (pollingPlaceId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/PollingPlaces/${pollingPlaceId}`, 'DELETE');
            const updatedPollingPlaces = pollingPlaces.filter(pollingPlace => pollingPlace.id !== pollingPlaceId);
            setPollingPlaces(updatedPollingPlaces);
        } catch (error) {
            console.error('Error deleting polling place:', error);
        }
    };

    const openModal = (pollingPlace) => {
        setCurrentPollingPlace(pollingPlace);
        setModalTitle(pollingPlace ? 'Update Polling Place' : 'Create Polling Place');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentPollingPlace(null);
        setShowModal(false);
    };

    const pollingPlaceFormFields = [
        { name: 'name', label: 'Polling Place Name', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'population', label: 'Population', type: 'number' },
        { name: 'openingTime', label: 'Opening Time', type: 'datetime-local' },
        { name: 'closeingTime', label: 'Closing Time', type: 'datetime-local' },
        { name: 'cityId', label: 'City', type: 'select', options: cities.map(city => ({ value: city.id, label: city.name })) }
    ];

    return (
        <Container fluid id="polling-places" className="h-100">
            <h2 className="my-4 text-center">Manage Polling Places</h2>
            <Button onClick={() => openModal(null)} className="mb-3">Create Polling Place</Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentPollingPlace ? handleUpdate : handleCreate}
                initialValues={currentPollingPlace || {}}
                formFields={pollingPlaceFormFields}
                title={modalTitle}
            />
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
                    {pollingPlaces.map((pollingPlace) => (
                        <PollingPlaceTableRow
                            key={pollingPlace.id}
                            pollingPlace={pollingPlace}
                            onUpdate={() => openModal(pollingPlace)}
                            onDelete={() => handleDelete(pollingPlace.id)}
                            cities={cities}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PollingPlaces;
