import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import PartyTableRow from './PartyTableRow';

const Parties = () => {
    const [parties, setParties] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentParty, setCurrentParty] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partiesData = await dynamicFetch('https://localhost:44338/api/Parties', 'GET');
                setParties(partiesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const refreshParties = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/Parties', 'GET');
            setParties(data);
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    };

    const handleCreate = async (partyData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/Parties', 'POST', partyData);
            setShowModal(false);
            refreshParties();
        } catch (error) {
            console.error('Error creating party:', error);
        }
    };

    const handleUpdate = async (partyData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Parties/${currentParty.id}`, 'PUT', partyData);
            setShowModal(false);
            refreshParties();
        } catch (error) {
            console.error('Error updating party:', error);
        }
    };

    const handleDelete = async (partyId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Parties/${partyId}`, 'DELETE');
            const updatedParties = parties.filter(party => party.id !== partyId);
            setParties(updatedParties);
        } catch (error) {
            console.error('Error deleting party:', error);
        }
    };

    const openModal = (party) => {
        setCurrentParty(party);
        setModalTitle(party ? 'Update Party' : 'Create Party');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentParty(null);
        setShowModal(false);
    };

    return (
        <Container fluid id="parties" className="h-100">
            <h2 className="my-4 text-center">Manage Parties</h2>
            <Button onClick={() => openModal(null)} className="mb-3">Create Party</Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentParty ? handleUpdate : handleCreate}
                initialValues={currentParty || {}}
                formFields={[
                    { name: 'name', label: 'Party Name', type: 'text' },
                    { name: 'description', label: 'Description', type: 'text' },
                    { name: 'foundedYear', label: 'Founded Year', type: 'number' }
                ]}
                title={modalTitle}
            />
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Founded Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parties.map((party) => (
                        <PartyTableRow
                            key={party.id}
                            party={party}
                            onUpdate={() => openModal(party)}
                            onDelete={() => handleDelete(party.id)}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Parties;
