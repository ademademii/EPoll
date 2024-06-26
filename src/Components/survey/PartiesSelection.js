// PartiesSelection.js
import React from 'react';
import { Form } from 'react-bootstrap';

const PartiesSelection = ({ parties, selectedPartyId, onChange }) => (
    <Form.Group controlId="formParty">
        <Form.Label>Political Party</Form.Label>
        {parties.map(party => (
            <Form.Check
                key={party.id}
                type="checkbox"
                label={party.name}
                name="partyId"
                value={party.id}
                checked={selectedPartyId === party.id.toString()}
                onChange={onChange}
            />
        ))}
    </Form.Group>
);

export default PartiesSelection;
