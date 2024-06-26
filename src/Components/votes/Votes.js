import React, { useState, useEffect } from 'react';
import dynamicFetch from '@/helpers/dynamicfetch'; // Replace with actual path to dynamicFetch
import { Table, Container } from 'react-bootstrap';

const VotesComponent = () => {
    const [votes, setVotes] = useState([]);
    const [pollingPlaces, setPollingPlaces] = useState([]);
    const [parties, setParties] = useState([]);

    useEffect(() => {
        const fetchVotes = async () => {
            const votesData = await dynamicFetch('https://localhost:44338/api/Votes', 'GET');
            setVotes(votesData);
        };

        const fetchPollingPlaces = async () => {
            const placesData = await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'GET');
            setPollingPlaces(placesData);
        };

        const fetchParties = async () => {
            const partiesData = await dynamicFetch('https://localhost:44338/api/Parties', 'GET');
            setParties(partiesData);
        };

        fetchVotes();
        fetchPollingPlaces();
        fetchParties();
    }, []);

    // Helper function to get polling place name by ID
    const getPollingPlaceName = (pollingPlaceId) => {
        const place = pollingPlaces.find(place => place.id === pollingPlaceId);
        return place ? place.name : 'Unknown';
    };

    // Helper function to get party name by ID
    const getPartyName = (partyId) => {
        const party = parties.find(party => party.id === partyId);
        return party ? party.name : 'Unknown';
    };

    return (
        <Container fluid id="votes" className="h-100">
            <h2>Votes</h2>
            <Table striped bordered hover responsive className="flex-grow-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Age Group</th>
                        <th>Gender</th>
                        <th>Polling Place</th>
                        <th>Party</th>
                    </tr>
                </thead>
                <tbody>
                    {votes.map((vote) => (
                        <tr key={vote.id}>
                            <td>{vote.id}</td>
                            <td>{vote.ageGroup}</td>
                            <td>{vote.gender}</td>
                            <td>{getPollingPlaceName(vote.pollingPlaceId)}</td>
                            <td>{getPartyName(vote.partyId)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default VotesComponent;
