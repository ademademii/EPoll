import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import UserTableRow from './UserTableRow';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await dynamicFetch('https://localhost:44338/api/Auth', 'GET');
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const refreshUsers = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/api/Auth', 'GET');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreate = async (userData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/Auth/CreateUser', 'POST', userData);
            setShowModal(false);
            refreshUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdate = async (userData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Auth/${currentUserId}`, 'PUT', userData);
            setShowModal(false);
            refreshUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Auth/${userId}`, 'DELETE');
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const openModal = (user) => {
        setCurrentUser(user);
        setModalTitle(user ? 'Update User' : 'Create User');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentUser(null);
        setShowModal(false);
    };

    return (
        <Container fluid id="users" className="h-100">
            <h2 className="my-4 text-center">Manage Users</h2>
            <Button onClick={() => openModal(null)} className="mb-3">Create User</Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentUser ? handleUpdate : handleCreate}
                initialValues={currentUser || {}}
                formFields={[
                    { name: 'name', label: 'Name', type: 'text' },
                    { name: 'surname', label: 'Surname', type: 'text' },
                    { name: 'userName', label: 'Username', type: 'text' },
                    { name: 'password', label: 'Password', type: 'password' },
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'role', label: 'Role', type: 'text' }
                ]}
                title={modalTitle}
            />
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserTableRow
                            key={user.id}
                            user={user}
                            onUpdate={() => openModal(user)}
                            onDelete={() => handleDelete(user.id)}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;
