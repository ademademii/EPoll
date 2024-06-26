import React from 'react';
import { Button } from 'react-bootstrap';

const PollingPlaceTableRow = ({ pollingPlace, onUpdate, onDelete, cities }) => {
    const handleUpdate = () => {
        onUpdate(pollingPlace);
    };

    const handleDelete = () => {
        onDelete(pollingPlace.id);
    };

    // Find the city name based on cityId
    const cityName = cities.find(city => city.id === pollingPlace.cityId)?.name || 'Unknown';

    return (
        <tr key={pollingPlace.id}>
            <td>{pollingPlace.id}</td>
            <td>{pollingPlace.name}</td>
            <td>{pollingPlace.address}</td>
            <td>{pollingPlace.population}</td>
            <td>{pollingPlace.openingTime}</td>
            <td>{pollingPlace.closeingTime}</td>
            <td>{cityName}</td>
            <td className="d-flex justify-content-start">
                <Button variant="warning" size="sm" onClick={handleUpdate} className="mr-2" style={{ marginRight: '8px' }}>Update</Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginRight: '8px' }}>Delete</Button>
            </td>
        </tr>
    );
};

export default PollingPlaceTableRow;
