// CitySelection.js
import React from 'react';
import { Form } from 'react-bootstrap';

const CitySelection = ({ cities, selectedCityId, onChange }) => (
    <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
            as="select"
            name="cityId"
            value={selectedCityId}
            onChange={onChange}
            required
        >
            <option value="">Select a city</option>
            {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
            ))}
        </Form.Control>
    </Form.Group>
);

export default CitySelection;
