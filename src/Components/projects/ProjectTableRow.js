import React from 'react';
import { Button } from 'react-bootstrap';

const ProjectTableRow = ({ project, onUpdate, onDelete, states }) => {
    const handleUpdate = () => {
        onUpdate(project);
    };

    const handleDelete = () => {
        onDelete(project.id);
    };

    return (
        <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.status}</td>
            <td>{project.startDate}</td>
            <td>{project.endDate}</td>
            <td>{states.find(state => state.id === project.stateId)?.name || 'Unknown'}</td>
            <td className="text-center">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2" style={{ marginRight: '8px' }}>
                    Update
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginRight: '8px' }}>
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default ProjectTableRow;
