import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import ModalForm from '../common/ModalForm';
import ProjectTableRow from './ProjectTableRow';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [states, setStates] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchStates = async () => {
            const data = await dynamicFetch('https://localhost:44338/api/States', 'GET');
            setStates(data);
        };
        fetchStates();
    }, []);

    useEffect(() => {
        refreshProjects();
    }, []);

    const refreshProjects = async () => {
        const data = await dynamicFetch('https://localhost:44338/api/Projects', 'GET');
        setProjects(data);
    };

    const handleCreate = async (projectData) => {
        try {
            await dynamicFetch('https://localhost:44338/api/Projects', 'POST', {
                ...projectData,
                startDate: formatDate(projectData.startDate), // Format start date before sending
                endDate: formatDate(projectData.endDate), // Format end date before sending
            });
            setShowModal(false);
            refreshProjects();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleUpdate = async (projectData) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Projects/${currentProject.id}`, 'PUT', {
                ...projectData,
                startDate: formatDate(projectData.startDate), // Format start date before sending
                endDate: formatDate(projectData.endDate), // Format end date before sending
            });
            setShowModal(false);
            refreshProjects();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await dynamicFetch(`https://localhost:44338/api/Projects/${projectId}`, 'DELETE');
            const updatedProjects = projects.filter(project => project.id !== projectId);
            setProjects(updatedProjects);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const openModal = (project) => {
        setCurrentProject(project);
        setModalTitle(project ? 'Update Project' : 'Create Project');
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentProject(null);
        setShowModal(false);
    };

    const formatDate = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        }
        return '';
    };

    const projectFormFields = [
        { name: 'name', label: 'Project Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'stateId', label: 'State', type: 'select', options: states.map(state => ({ value: state.id, label: state.name })) }
    ];

    return (
        <Container fluid id="projects" className="h-100">
            <h2 className="my-4 text-center">Manage Projects</h2>
            <Button onClick={() => openModal(null)} variant="primary" className="mb-3">
                Create Project
            </Button>
            <ModalForm
                show={showModal}
                onHide={closeModal}
                onSubmit={currentProject ? handleUpdate : handleCreate}
                initialValues={currentProject || {}}
                formFields={projectFormFields}
                title={modalTitle}
            />
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>State</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <ProjectTableRow
                            key={project.id}
                            project={project}
                            onUpdate={() => openModal(project)}
                            onDelete={() => handleDelete(project.id)}
                            states={states}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Projects;
