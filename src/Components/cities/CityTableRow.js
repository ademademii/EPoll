import React from 'react';
import { Button } from 'react-bootstrap';

const CityTableRow = ({ city, onUpdate, onDelete, states }) => {
    const handleUpdate = () => {
        onUpdate(city);
    };

    const handleDelete = () => {
        onDelete(city.id);
    };

    // Find the state name based on stateId
    const stateName = states.find(state => state.id === city.stateId)?.name || 'Unknown';

    return (
        <tr key={city.id}>
            <td>{city.id}</td>
            <td>{city.name}</td>
            <td>{city.descriptions}</td>
            <td>{city.population}</td>
            <td>{city.zipCode}</td>
            <td>{city.area}</td>
            <td>{stateName}</td>
            <td className="d-flex justify-content-start">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2" style={{ marginRight: '8px' }}>Update</Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginRight: '8px' }}>Delete</Button>
            </td>
        </tr>
    );
};

export default CityTableRow;
