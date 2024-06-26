// components/common/ModalForm.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FormField from './FormField'; // Adjust the import path if necessary

const ModalForm = ({ show, onHide, onSubmit, initialValues = {}, formFields, title }) => {
    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data on Submit:", formData); // Debug log
        await onSubmit(formData);
    };

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    {formFields.map(({ name, label, type, options }) => (
                        <FormField
                            key={name}
                            name={name}
                            label={label}
                            type={type}
                            value={formData[name] || ''}
                            onChange={e => handleInputChange(name, e.target.value)}
                            options={options || []}
                        />
                    ))}
                    <Button variant="primary" type="submit" className="mr-2">
                        {title.includes('Update') ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="secondary" onClick={onHide}>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForm;
