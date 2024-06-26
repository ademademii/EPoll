import React from 'react';
import { Button, Table } from 'react-bootstrap';

const StateTableRow = ({ state, onUpdate, onDelete }) => {
    const handleUpdate = () => {
        onUpdate(state);
    };

    const handleDelete = () => {
        onDelete(state.id);
    };

    return (
        <tr key={state.id}>
            <td>{state.id}</td>
            <td>{state.name}</td>
            <td>{state.population}</td>
            <td className="text-center">
                <Button variant="warning" size="sm" onClick={handleUpdate} style={{ marginRight: '8px' }}>
                    Update
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete} style={{ marginLeft: '8px' }}>
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default StateTableRow;
