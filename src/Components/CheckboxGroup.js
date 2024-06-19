// CheckboxGroup.js
import React from 'react';
import { Form } from 'react-bootstrap';

const CheckboxGroup = ({ options, selectedValue, groupName, onChange }) => (
    <Form.Group controlId={`form${groupName}`}>
        <Form.Label>{groupName.charAt(0).toUpperCase() + groupName.slice(1)}</Form.Label>
        {options.map(option => (
            <Form.Check 
                key={option.value}
                type="radio"
                label={option.label}
                name={groupName}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
            />
        ))}
    </Form.Group>
);

export default CheckboxGroup;
