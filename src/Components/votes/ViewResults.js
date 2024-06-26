import React, { useState, useEffect } from 'react';
import dynamicFetch from '@/helpers/dynamicfetch';
import { Table, Container, Row, Col } from 'react-bootstrap';
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

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const data = await dynamicFetch('https://localhost:44338/GetAllPartiesWithVotesAndPercentage', 'GET');
            setPartiesWithVotes(data);
        } catch (error) {
            console.error('Error fetching results:', error);
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
                    <Pie data={chartData} />
                </Col>
            </Row>
        </Container>
    );
};

export default ViewResults;
