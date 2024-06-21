// components/CRUDForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Table, Modal } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch';

const CrudForm = ({ endpoints, formFields }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [updateId, setUpdateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    fetchData();
  }, [endpoints]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await dynamicFetch(endpoints.read, 'GET');
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = updateId ? endpoints.update.replace('{id}', updateId) : endpoints.create;
      const method = updateId ? 'PUT' : 'POST';
      console.log(`Submitting to ${endpoint} with method ${method} and data`, formData); // Debugging log
      await dynamicFetch(endpoint, method, formData);
      fetchData(); // Refresh data after submission
      setFormData({}); // Clear form after submission
      setUpdateId(''); // Clear updateId after submission
      setShowModal(false); // Close modal after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dynamicFetch(`${endpoints.delete}/${id}`, 'DELETE');
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setUpdateId(item.id);
    setShowModal(true); // Show modal on update
  };

  const handleCreate = () => {
    setFormData({});
    setUpdateId('');
    setShowModal(true); // Show modal for create
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setUpdateId('');
  };

  return (
    <div>
      <Button variant="primary" onClick={handleCreate} block>
        Create
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              {endpoints.read !== 'https://localhost:44338/api/Votes' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {Object.keys(item).map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
                {endpoints.read !== 'https://localhost:44338/api/Votes' && (
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{updateId ? 'Update Item' : 'Create Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <Form.Group controlId={`form${field.name}`} key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudForm;
