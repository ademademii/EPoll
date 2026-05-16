import React from 'react';
import { Button } from 'react-bootstrap';

const RezervimiFushesTableRow = ({ rezervimiFushes, onUpdate, onDelete, fushaPadels }) => {
    const handleUpdate = () => {
        onUpdate(rezervimiFushes);
    };

    const handleDelete = () => {
        onDelete(rezervimiFushes.id);
    };

    // Find the state name based on stateId
    const fushaName = fushaPadels.find(fushaPadel => fushaPadel.id === rezervimiFushes.fushaPadelId)?.emriFushes || 'Unknown';
    // const stateName = states.find(state => state.id === city.stateId)?.name || 'Unknow
    return (
        <tr key={rezervimiFushes.id}>
            <td>{rezervimiFushes.id}</td>
            <td>{rezervimiFushes.emriRezervuesit}</td>
            <td>{rezervimiFushes.nrPersonave}</td>
            <td>{fushaName}</td>
            <td className="d-flex justify-content-start">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2" style={{ marginRight: '8px' }}>Update</Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginRight: '8px' }}>Delete</Button>
            </td>
        </tr>
    );
};

export default RezervimiFushesTableRow;
