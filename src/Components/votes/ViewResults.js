import React, { useState, useEffect } from 'react';
import dynamicFetch from '@/helpers/dynamicfetch';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ViewResults = () => {
    const [partiesWithVotes, setPartiesWithVotes] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsData = await dynamicFetch('https://localhost:44338/api/Projects', 'GET');
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Error fetching projects. Please try again.');
            }
        };

        fetchProjects();
    }, []);

    const fetchResults = async (id) => {
        try {
            console.log(`Fetching results for project ID: ${id}`); // Debugging log
            const data = await dynamicFetch(`https://localhost:44338/GetAllPartiesWithVotesAndPercentage/?projectid=${id}`, 'GET');
            console.log('Fetched data:', data); // Debugging log
            setPartiesWithVotes(data);
            setError('');
        } catch (error) {
            console.error('Error fetching results:', error); // Debugging log
            setError('Error fetching results. Please try again.');
            setPartiesWithVotes([]);
        }
    };

    const handleSelectChange = (e) => {
        setProjectId(e.target.value);
    };

    const handleButtonClick = () => {
        if (projectId) {
            fetchResults(projectId);
        } else {
            setError('Please select a valid project.');
        }
    };

    const chartData = {
        labels: partiesWithVotes.map(party => party.partyName),
        datasets: [
            {
                label: 'Percentage of Votes in %',
                data: partiesWithVotes.map(party => party.percentage),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ]
            }
        ]
    };

    return (
        <Container fluid id="view-results" className="h-100">
            <h2 className="my-4 text-center">View Results</h2>
            <Row className="mb-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form className="justify-content-center">
                        <Form.Group>
                            <Form.Control as="select" value={projectId} onChange={handleSelectChange}>
                                <option value="">Select Project</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={handleButtonClick}>
                            Kerko Rezultatet
                        </Button>
                    </Form>
                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Table striped bordered hover responsive className="flex-grow-1">
                        <thead>
                            <tr>
                                <th>Party Name</th>
                                <th>Votes</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partiesWithVotes.map((party) => (
                                <tr key={party.partyId}>
                                    <td>{party.partyName}</td>
                                    <td>{party.voteCount}</td>
                                    <td>{party.percentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <Pie data={chartData} width={800} height={800} /> {/* Adjust the size here */}
                </Col>
            </Row>
        </Container>
    );
};

export default ViewResults;
