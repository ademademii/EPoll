import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import CityTableRow from './CityTableRow'; // Update to match your file structure

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]); // State to store states for city display

    const [showModal, setShowModal] = useState(false);
    const [currentCity, setCurrentCity] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const citiesData = await dynamicFetch('https://localhost:44338/api/Cities', 'GET');
                setCities(citiesData);

                const statesData = await dynamicFetch('https://localhost:44338/api/States', 'GET');
                setStates(statesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const refreshCities = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/Cities', 'GET');
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleCreate = async (cityData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/Cities', 'POST', cityData);
            setShowModal(false);
            refreshCities();
        } catch (error) {
            console.error('Error creating city:', error);
        }
    };

    const handleUpdate = async (cityData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Cities/${currentCity.id}`, 'PUT', cityData);
            setShowModal(false);
            refreshCities();
        } catch (error) {
            console.error('Error updating city:', error);
        }
    };

    const handleDelete = async (cityId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Cities/${cityId}`, 'DELETE');
            const updatedCities = cities.filter(city => city.id !== cityId);
            setCities(updatedCities);
        } catch (error) {
            console.error('Error deleting city:', error);
        }
    };

    const openModal = (city) => {
        setCurrentCity(city);
        setModalTitle(city ? 'Update City' : 'Create City');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentCity(null);
        setShowModal(false);
    };

    return (
        <Container fluid id="cities" className="h-100">
            <h2 className="my-4 text-center">Manage Cities</h2>
            <Button onClick={() => openModal(null)} className="mb-3">Create City</Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentCity ? handleUpdate : handleCreate}
                initialValues={currentCity || {}}
                formFields={[
                    { name: 'name', label: 'City Name', type: 'text' },
                    { name: 'descriptions', label: 'Description', type: 'text' },
                    { name: 'population', label: 'Population', type: 'number' },
                    { name: 'zipCode', label: 'ZIP Code', type: 'number' },
                    { name: 'area', label: 'Area', type: 'text' },
                    { name: 'stateId', label: 'State', type: 'select', options: states.map(state => ({ value: state.id, label: state.name })) }
                ]}
                title={modalTitle}
            />
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Population</th>
                        <th>ZIP Code</th>
                        <th>Area</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map((city) => (
                        <CityTableRow
                            key={city.id}
                            city={city}
                            onUpdate={() => openModal(city)}
                            onDelete={() => handleDelete(city.id)}
                            states={states}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Cities;
