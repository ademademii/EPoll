import React from 'react';
import { Button } from 'react-bootstrap';

const FushaPadelsTableRow = ({ fushaPadel, onUpdate, onDelete, states }) => {
    const handleUpdate = () => {
        onUpdate(fushaPadel);
    };


    const handleDelete = () => {
        onDelete(fushaPadel.id);
    };

    // Find the state name based on stateId
    // const stateName = states.find(state => state.id === city.stateId)?.name || 'Unknown';

    return (
        <tr key={fushaPadel.id}>
            <td>{fushaPadel.id}</td>
            <td>{fushaPadel.emriFushes}</td>
            <td>{fushaPadel.vendodhja}</td>
            {/* <td>{stateName}</td> */}
            <td className="d-flex justify-content-start">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2" style={{ marginRight: '8px' }}>Update</Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginRight: '8px' }}>Delete</Button>
            </td>
        </tr>
    );
};

export default FushaPadelsTableRow;
