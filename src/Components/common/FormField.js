import React from 'react';
import { Form } from 'react-bootstrap';

const FormField = ({ label, value, onChange, type = 'text', options = [], ...rest }) => {
    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <Form.Control
                        as="textarea"
                        value={value}
                        onChange={onChange}
                        {...rest}
                    />
                );
            case 'select':
                return (
                    <Form.Control
                        as="select"
                        value={value}
                        onChange={onChange}
                        {...rest}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Control>
                );
            case 'date':
                return (
                    <Form.Control
                        type="date"
                        value={value}
                        onChange={onChange}
                        {...rest}
                    />
                );
            default:
                return (
                    <Form.Control
                        type={type}
                        value={value}
                        onChange={onChange}
                        {...rest}
                    />
                );
        }
    };

    return (
        <Form.Group>
            <Form.Label className="mr-2">{label}</Form.Label>
            {renderInput()}
        </Form.Group>
    );
};

export default FormField;
