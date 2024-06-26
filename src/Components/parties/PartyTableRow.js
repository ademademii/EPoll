import React from 'react';
import { Button } from 'react-bootstrap';

const PartyTableRow = ({ party, onUpdate, onDelete }) => {
    const handleUpdate = () => {
        onUpdate(party);
    };

    const handleDelete = () => {
        onDelete(party.id);
    };

    return (
        <tr key={party.id}>
            <td>{party.id}</td>
            <td>{party.name}</td>
            <td>{party.ideology}</td>
            <td>{party.foundingDate}</td>
            <td className="d-flex justify-content-start">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2"  style={{ marginRight: '8px' }}>Update</Button>
                <Button variant="danger" size="sm" onClick={handleDelete}  style={{ marginRight: '8px' }}>Delete</Button>
            </td>
        </tr>
    );
};

export default PartyTableRow;
