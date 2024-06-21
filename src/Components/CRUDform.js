// components/CRUDForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch';

const CRUDForm = ({ endpoints, mode, formFields }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [updateId, setUpdateId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'read' || mode === 'delete') {
      fetchData();
    }
  }, [endpoints.read, mode]);

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

  const handleUpdateIdChange = (e) => {
    setUpdateId(e.target.value);
  };

  const fetchUpdateData = async () => {
    try {
      setLoading(true);
      const result = await dynamicFetch(endpoints.update.replace('{id}', updateId), 'GET');
      setFormData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'create' ? endpoints.create : endpoints.update.replace('{id}', updateId);
      const method = mode === 'create' ? 'POST' : 'PUT';
      await dynamicFetch(endpoint, method, formData);
      fetchData(); // Refresh data after submission
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

  return (
    <div>
      {(mode === 'create' || mode === 'update') && (
        <>
          {mode === 'update' && (
            <>
              <Form.Group controlId="updateId">
                <Form.Label>Update ID</Form.Label>
                <Form.Control
                  type="text"
                  value={updateId}
                  onChange={handleUpdateIdChange}
                />
                <Button variant="primary" onClick={fetchUpdateData}>
                  Fetch Data
                </Button>
              </Form.Group>
            </>
          )}
          <Form onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <Form.Group controlId={`form${field.name}`} key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  disabled={mode === 'update' && loading}
                />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
      {mode === 'read' && (
        <ListGroup>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            data.map((item) => (
              <ListGroup.Item key={item.id}>
                {Object.keys(item).map((key) => (
                  <div key={key}>
                    <strong>{key}:</strong> {item[key]}
                  </div>
                ))}
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
      {mode === 'delete' && (
        <ListGroup>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            data.map((item) => (
              <ListGroup.Item key={item.id}>
                {Object.keys(item).map((key) => (
                  <div key={key}>
                    <strong>{key}:</strong> {item[key]}
                  </div>
                ))}
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default CRUDForm;