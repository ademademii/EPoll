import React, { useState, useEffect } from 'react';
import dynamicFetch from '@/helpers/dynamicfetch';
import { Table, Container } from 'react-bootstrap';

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

    return (
        <Container fluid id="view-results" className="h-100">
            <h2>View Results</h2>
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
        </Container>
    );
};

export default ViewResults;
