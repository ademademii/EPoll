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
    const [gender, setGender] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [error, setError] = useState('');

    // Fetch all projects on component mount
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

    // Fetch results with optional filters
    const fetchResults = async () => {
        if (!projectId) {
            setError('Please select a valid project.');
            return;
        }

        try {
            // Build query with optional filters
            let url = `https://localhost:44338/GetAllPartiesWithVotesAndPercentage?projectId=${projectId}`;
            if (gender) url += `&gender=${gender}`;
            if (ageGroup) url += `&ageGroup=${ageGroup}`;

            console.log('Fetching results from:', url);
            const data = await dynamicFetch(url, 'GET');
            setPartiesWithVotes(data);
            setError('');
        } catch (err) {
            console.error('Error fetching results:', err);
            setError('Error fetching results. Please try again.');
            setPartiesWithVotes([]);
        }
    };

    // Chart.js data
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
                        {/* Project Select */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                value={projectId}
                                onChange={e => setProjectId(e.target.value)}
                            >
                                <option value="">Select Project</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Gender Filter */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                            >
                                <option value="">Select Gender (Optional)</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Age Group Filter */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                value={ageGroup}
                                onChange={e => setAgeGroup(e.target.value)}
                            >
                                <option value="">Select Age Group (Optional)</option>
                                <option value="18-30">18-30</option>
                                <option value="30-50">30-50</option>
                                <option value="50+">50+</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" onClick={fetchResults}>
                            Kerko Rezultatet
                        </Button>

                        {error && <p className="text-danger text-center mt-3">{error}</p>}
                    </Form>
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
                            {partiesWithVotes.map(party => (
                                <tr key={party.partyName}>
                                    <td>{party.partyName}</td>
                                    <td>{party.voteCount}</td>
                                    <td>{party.percentage.toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <Pie data={chartData} width={800} height={800} />
                </Col>
            </Row>
        </Container>
    );
};

export default ViewResults;
