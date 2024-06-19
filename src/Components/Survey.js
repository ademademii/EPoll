// SurveyForm.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Alert, Row, Col } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch';
import CitySelection from './CitySelection';
import PollingPlaceSelection from './PollingPlaceSelection';
import CheckboxGroup from './CheckboxGroup';
import SubmitButton from './SubmitButton';
import PartiesSelection from './PartiesSelection'; // Import PartiesSelection component

const SurveyForm = () => {
    const [cities, setCities] = useState([]);
    const [pollingPlaces, setPollingPlaces] = useState([]);
    const [filteredPollingPlaces, setFilteredPollingPlaces] = useState([]);
    const [parties, setParties] = useState([]);
    const [surveyData, setSurveyData] = useState({
        cityId: '',
        age: '',
        gender: '',
        pollingPlaceId: '',
        partyId: ''
    });
    const [selectedCityId, setSelectedCityId] = useState('');
    const [selectedPollingPlaceId, setSelectedPollingPlaceId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const citiesData = await dynamicFetch('https://localhost:44338/api/Cities', 'GET');
                setCities(citiesData);

                const pollingPlacesData = await dynamicFetch('https://localhost:44338/api/PollingPlaces', 'GET');
                setPollingPlaces(pollingPlacesData);

                const partiesData = await dynamicFetch('https://localhost:44338/api/Parties', 'GET');
                setParties(partiesData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data.");
            }
        };
        fetchData();

        const storedCityId = localStorage.getItem('selectedCityId');
        const storedPollingPlaceId = localStorage.getItem('selectedPollingPlaceId');
        if (storedCityId && storedPollingPlaceId) {
            setSelectedCityId(storedCityId);
            setSelectedPollingPlaceId(storedPollingPlaceId);
            setSurveyData({
                ...surveyData,
                cityId: storedCityId,
                pollingPlaceId: storedPollingPlaceId
            });
        }
    }, []);

    useEffect(() => {
        if (surveyData.cityId) {
            const filteredPlaces = pollingPlaces.filter(place => place.cityId === parseInt(surveyData.cityId));
            setFilteredPollingPlaces(filteredPlaces);
        } else {
            setFilteredPollingPlaces(pollingPlaces);
        }
    }, [surveyData.cityId, pollingPlaces]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSurveyData({
            ...surveyData,
            [name]: value
        });

        if (name === 'cityId') {
            setSelectedCityId(value);
            localStorage.setItem('selectedCityId', value);
        } else if (name === 'pollingPlaceId') {
            setSelectedPollingPlaceId(value);
            localStorage.setItem('selectedPollingPlaceId', value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const postData = {
            ageGroup: surveyData.age,
            gender: surveyData.gender,
            pollingPlaceId: parseInt(surveyData.pollingPlaceId),
            partyId: parseInt(surveyData.partyId)
        };

        console.log(postData, 111);

        try {
            await dynamicFetch('https://localhost:44338/api/Votes', 'POST', postData);
            setSuccess("Survey submitted successfully!");
            // Reset the page after submission
            window.location.reload();
        } catch (error) {
            console.error("Error submitting survey:", error);
            setError("Failed to submit survey.");
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4 text-center">Survey Form</h2>
                    <Form onSubmit={handleSubmit}>
                        <CitySelection
                            cities={cities}
                            selectedCityId={selectedCityId}
                            onChange={handleInputChange}
                        />

                        <PollingPlaceSelection
                            filteredPollingPlaces={filteredPollingPlaces}
                            selectedPollingPlaceId={selectedPollingPlaceId}
                            onChange={handleInputChange}
                        />

                        <CheckboxGroup
                            options={[
                                { label: '18-30 vjeq', value: '18-30' },
                                { label: '30-50 vjeq', value: '30-50' },
                                { label: 'Mbi 50 vjeq', value: '50+' }
                            ]}
                            selectedValue={surveyData.age}
                            groupName="age"
                            onChange={handleInputChange}
                        />

                        <CheckboxGroup
                            options={[
                                { label: 'Male', value: 'M' },
                                { label: 'Female', value: 'F' }
                            ]}
                            selectedValue={surveyData.gender}
                            groupName="gender"
                            onChange={handleInputChange}
                        />

                        {/* Render PartiesSelection component */}
                        <PartiesSelection
                            parties={parties}
                            selectedPartyId={surveyData.partyId}
                            onChange={handleInputChange}
                        />

                        <SubmitButton onSubmit={handleSubmit} />
                    </Form>

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default SurveyForm;
