import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import FushaPadelsTableRow from './FushaPadelsTableRow';

const FushaPadels = () => {
    const [fushaPadels, setFushaPadels] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [currentFushaPadel, setCurrentFushaPadel] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const FushaPadelsData = await dynamicFetch('https://localhost:44338/api/FushaPadels', 'GET');
                setFushaPadels(FushaPadelsData);
                console.log("Fusha Padel data tonat", FushaPadelsData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        };

        
        fetchData();
    }, []);

        
    const refreshFushaPadels = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/FushaPadels', 'GET');
            setFushaPadels(data);
        } catch (error) {
            console.error('Error fetching Fusha Padels:', error);
        }
    };

    const handleCreate = async (fushaPadelData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/FushaPadels', 'POST', fushaPadelData);
            setShowModal(false);
            refreshFushaPadels();
        } catch (error) {
            console.error('Error creating Fusha Padels Data:', error);
        }
    };

    const handleUpdate = async (fushaPadelData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/FushaPadels/${currentFushaPadel.id}`, 'PUT', fushaPadelData);
            setShowModal(false);
            refreshFushaPadels();
        } catch (error) {
            console.error('Error updating Fusha Padels:', error);
        }
    };

    const handleDelete = async (fushaPadelId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/FushaPadels/${fushaPadelId}`, 'DELETE');
            const updatedFushaPadels = fushaPadels.filter(fushaPadel => fushaPadel.id !== fushaPadelId);
            setFushaPadels(updatedFushaPadels);
        } catch (error) {
            console.error('Error deleting Fusha Padels:', error);
        }
    };

    const openModal = (fushaPadel) => {
        setCurrentFushaPadel(fushaPadel);
        setModalTitle(fushaPadel ? 'Update Fusha Padel' : 'Create Fusha Padel');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentFushaPadel(null);
        setShowModal(false);
    };

    return (
        <Container fluid id="FushaPadels" className="h-100">
            <h2 className="my-4 text-center">Manage Fusha Padels</h2>
            <Button onClick={() => openModal(null)} className="mb-3">Create Fusha Padel</Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentFushaPadel ? handleUpdate : handleCreate}
                initialValues={currentFushaPadel || {}}
                formFields={[
                    { name: 'emriFushes', label: 'Emri i Fushes', type: 'text' },
                    { name: 'vendodhja', label: 'Vendodhja', type: 'text' }
                    // { name: 'stateId', label: 'State', type: 'select', options: states.map(state => ({ value: state.id, label: state.name })) }
                ]}
                title={modalTitle}
            />
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Emri i Fushes</th>
                        <th>Vendodhja</th>
                    </tr>
                </thead>
                <tbody>
                    {fushaPadels.map((fushaPadel) => (
                        <FushaPadelsTableRow
                            key={fushaPadel.id}
                            fushaPadel={fushaPadel}
                            onUpdate={() => openModal(fushaPadel)}
                            onDelete={() => handleDelete(fushaPadel.id)}
                            //states={states}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default FushaPadels;
