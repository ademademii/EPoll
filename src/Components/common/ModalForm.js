import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ModalForm = ({ show, onHide, onSubmit, initialValues, formFields, title }) => {
    const [formValues, setFormValues] = React.useState(initialValues);

    React.useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <Form.Group key={field.name} controlId={field.name}>
                            <Form.Label>{field.label}</Form.Label>
                            {field.type === 'select' ? (
                                <Form.Control
                                    as="select"
                                    name={field.name}
                                    value={formValues[field.name] || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option> {/* Adding default "Select" option */}
                                    {field.options.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Control>
                            ) : (
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    value={formValues[field.name] || ''}
                                    onChange={handleChange}
                                />
                            )}
                        </Form.Group>
                    ))}
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForm;
