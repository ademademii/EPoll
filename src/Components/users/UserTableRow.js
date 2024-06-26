import React from 'react';
import { Button } from 'react-bootstrap';

const UserTableRow = ({ user, projectName, onUpdate, onDelete }) => {
    const handleUpdate = () => {
        onUpdate(user);
    };

    const handleDelete = () => {
        onDelete(user.id);
    };

    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{projectName}</td>
            <td className="d-flex justify-content-start">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2 " style={{ marginLeft: '8px' }}>Update</Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginLeft: '8px' }}>Delete</Button>
            </td>
        </tr>
    );
};

export default UserTableRow;
