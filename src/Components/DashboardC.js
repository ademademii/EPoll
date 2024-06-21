// pages/dashboard.js
import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Sidebar from './SideBar';
import CRUDForm from './CRUDform';
const fieldConfigs = {
  project: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' },
    { name: 'stateId', label: 'State ID', type: 'number' },
  ],
  state: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'population', label: 'Population', type: 'number' },
  ],
  city: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'descriptions', label: 'Descriptions', type: 'text' },
    { name: 'population', label: 'Population', type: 'number' },
    { name: 'zipCode', label: 'Zip Code', type: 'number' },
    { name: 'area', label: 'Area', type: 'text' },
    { name: 'stateId', label: 'State ID', type: 'number' },
  ],
  votingPlace: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'population', label: 'Population', type: 'number' },
    { name: 'cityId', label: 'City ID', type: 'number' },
  ],
  parties: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'ideology', label: 'Ideology', type: 'text' },
  ],
  votes: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'ideology', label: 'Ideology', type: 'text' },
  ],
  users: [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
  ],
};

const endpoints = {
  project: {
    read: 'https://localhost:44338/api/Projects',
    create: 'https://localhost:44338/api/Projects',
    update: 'https://localhost:44338/api/Projects/{id}',
    delete: 'https://localhost:44338/api/Projects',
  },
  state: {
    read: 'https://localhost:44338/api/States',
    create: 'https://localhost:44338/api/States',
    update: 'https://localhost:44338/api/States/{id}',
    delete: 'https://localhost:44338/api/States',
  },
  city: {
    read: 'https://localhost:44338/api/Cities',
    create: 'https://localhost:44338/api/Cities',
    update: 'https://localhost:44338/api/Cities/{id}',
    delete: 'https://localhost:44338/api/Cities',
  },
  votingPlace: {
    read: 'https://localhost:44338/api/PollingPlaces?sort=desc',
    create: 'https://localhost:44338/api/PollingPlaces',
    update: 'https://localhost:44338/api/PollingPlaces/{id}',
    delete: 'https://localhost:44338/api/PollingPlaces',
  },
  parties: {
    read: 'https://localhost:44338/api/Parties',
    create: 'https://localhost:44338/api/Parties',
    update: 'https://localhost:44338/api/Parties/{id}',
    delete: 'https://localhost:44338/api/Parties',
  },
  votes: {
    read: 'https://localhost:44338/api/Votes',
    create: 'https://localhost:44338/api/Votes',
    update: 'https://localhost:44338/api/Votes/{id}',
    delete: 'https://localhost:44338/api/Votes',
  },
  users: {
    read: 'https://localhost:44338/api/Users',
    create: 'https://localhost:44338/api/Users',
    update: 'https://localhost:44338/api/Users/{id}',
    delete: 'https://localhost:44338/api/Users',
  },
};

const DashboardC = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [mode, setMode] = useState('read');

  const handleSelect = (area) => {
    setSelectedArea(area);
    setMode('read'); // Default to read mode
  };

  return (
    <Container fluid className='p-5'>
      <Row>
        <Col md={3}>
          <Sidebar onSelect={(area) => handleSelect(area)} />
        </Col>
        <Col md={9}>
          {selectedArea && endpoints[selectedArea] ? (
            <div>
              <ButtonGroup className="mb-3">
                <Button onClick={() => setMode('create')}>Create</Button>
                <Button onClick={() => setMode('read')}>Read</Button>
                <Button onClick={() => setMode('update')}>Update</Button>
                <Button onClick={() => setMode('delete')}>Delete</Button>
              </ButtonGroup>
              <CRUDForm
                endpoints={endpoints[selectedArea]}
                mode={mode}
                formFields={fieldConfigs[selectedArea]}
              />
            </div>
          ) : (
            <p>Please select an area from the sidebar.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardC;