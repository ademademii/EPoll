// PollingPlaceSelection.js
import React from 'react';
import { Form } from 'react-bootstrap';

const PollingPlaceSelection = ({ filteredPollingPlaces, selectedPollingPlaceId, onChange }) => (
    <Form.Group controlId="formPollingPlace">
        <Form.Label>Polling Place</Form.Label>
        <Form.Control
            as="select"
            name="pollingPlaceId"
            value={selectedPollingPlaceId}
            onChange={onChange}
            required
        >
            <option value="">Select a polling place</option>
            {filteredPollingPlaces.map(place => (
                <option key={place.id} value={place.id}>{place.name}</option>
            ))}
        </Form.Control>
    </Form.Group>
);

export default PollingPlaceSelection;
