import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import StateTableRow from './StateTableRow';

const States = () => {
    const [states, setStates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentState, setCurrentState] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        refreshStates();
    }, []);

    const refreshStates = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/States', 'GET');
            setStates(data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const handleCreate = async (stateData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/States', 'POST', stateData);
            setShowModal(false);
            refreshStates();
        } catch (error) {
            console.error('Error creating state:', error);
        }
    };

    const handleUpdate = async (stateData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/States/${currentState.id}`, 'PUT', stateData);
            setShowModal(false);
            refreshStates();
        } catch (error) {
            console.error('Error updating state:', error);
        }
    };

    const handleDelete = async (stateId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/States/${stateId}`, 'DELETE');
            // After successful deletion, update the states list
            const updatedStates = states.filter(state => state.id !== stateId);
            setStates(updatedStates);
        } catch (error) {
            console.error('Error deleting state:', error);
        }
    };

    const openModal = (state) => {
        setCurrentState(state);
        setModalTitle(state ? 'Update State' : 'Create State');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentState(null);
        setShowModal(false);
    };

    return (
        <Container fluid id="states" className="h-100">
            <h2 className="my-4 text-center">Manage States</h2>
            <Button onClick={() => openModal(null)} variant="primary" className="mb-3">
                Create State
            </Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentState ? handleUpdate : handleCreate}
                initialValues={currentState || {}}
                title={modalTitle}
                formFields={[
                    { name: 'name', label: 'State Name', type: 'text' },
                    { name: 'population', label: 'Population', type: 'number' }
                ]}
            />
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Population</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {states.map(state => (
                        <StateTableRow
                            key={state.id}
                            state={state}
                            onUpdate={openModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default States;
