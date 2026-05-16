import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import RezervimiFushesTableRow from './RezervimiFushesTableRow';

const RezervimiFushes = () => {
    const [rezervimiFushes, setRezervimiFushes] = useState([]);
    const [fushaPadels, setFushaPadels] = useState([]); // State to store states for city display

    const [showModal, setShowModal] = useState(false);
    const [currentRezervimiFushes, setCurrentRezervimiFushes] = useState(null);
    const [modalTitle, setModalTitle] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const RezervimiFushesData = await dynamicFetch('https://localhost:44338/api/RezervimiFushes', 'GET');
                setRezervimiFushes(RezervimiFushesData);

                const FushaPadelsData = await dynamicFetch('https://localhost:44338/api/FushaPadels', 'GET');
                setFushaPadels(FushaPadelsData);
                console.log("Fusha Padel", FushaPadelsData)

                
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        
        };

        console.log("lowercase fushaPadels",fushaPadels)
        
        

        fetchData();
    }, []);



    const refreshRezervimiFushes = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/RezervimiFushes', 'GET');
            setRezervimiFushes(data);
        } catch (error) {
            console.error('Error fetching RezervimiFushes:', error);
        }
    };

    const handleCreate = async (rezervimiFushesData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/RezervimiFushes', 'POST', rezervimiFushesData);
            setShowModal(false);
            refreshRezervimiFushes();
        } catch (error) {
            console.error('Error creating RezervimiFushes:', error);
        }
    };

    const handleUpdate = async (rezervimiFushesData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/RezervimiFushes/${rezervimiFushesData.id}`, 'PUT', rezervimiFushesData);
            setShowModal(false);
            refreshRezervimiFushes();
        } catch (error) {
            console.error('Error updating RezervimiFushes:', error);
        }
    };

    const handleDelete = async (rezervimiFushesId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/RezervimiFushes/${rezervimiFushesId}`, 'DELETE');
            const updatedRezervimiFushes = RezervimiFushes.filter(rezervimiFushes => rezervimiFushes.id !== rezervimiFushesId);
           setRezervimiFushes(updatedRezervimiFushes);
        } catch (error) {
            console.error('Error deleting RezervimiFushes:', error);
        }
    };

    const openModal = (rezervimiFushes) => {
        setCurrentRezervimiFushes(rezervimiFushes);
        setModalTitle(rezervimiFushes ? 'Update Rezervimi i Fushes' : 'Create Rezervimi i Fushes');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentRezervimiFushes(null);
        setShowModal(false);
    };

    return (
        <Container fluid id="RezervimiFushes" className="h-100">
            <h2 className="my-4 text-center">Manage RezervimiFushes</h2>
            <Button onClick={() => openModal(null)} className="mb-3">Create RezervimiFushes</Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentRezervimiFushes ? handleUpdate : handleCreate}
                initialValues={currentRezervimiFushes || {}}
                formFields={[
                    { name: 'emriRezervuesit', label: 'Emri i Rezervuesit', type: 'text' },
                    { name: 'nrPersonave', label: 'Nr i Personave', type: 'text' },
                    { name: 'fushaPadelId', label: 'FushaPadel', type: 'select', options: fushaPadels.map(fushaPadel => ({ value: fushaPadel.id, label: fushaPadel.emriFushes })) }

                ]}
                title={modalTitle}
            />
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Emri i Rezervuesit</th>
                        <th>Nr i Personave</th>
                        <th>FushaPadel</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rezervimiFushes.map((rezervimiFushes) => (
                       <RezervimiFushesTableRow
                            key={rezervimiFushes.id}
                            rezervimiFushes={rezervimiFushes}
                            onUpdate={() => openModal(rezervimiFushes)}
                            onDelete={() => handleDelete(rezervimiFushes.id)}
                            fushaPadels={fushaPadels}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default RezervimiFushes;
