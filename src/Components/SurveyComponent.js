import React, { useState, useEffect } from 'react';
import { Container, Form, Alert, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import dynamicFetch from '@/helpers/dynamicfetch';
import CitySelection from './survey/CitySelection';
import PollingPlaceSelection from './survey/PollingPlaceSelection';
import CheckboxGroup from './survey/CheckboxGroup';
import SubmitButton from './common/SubmitButton';
import PartiesSelection from './survey/PartiesSelection';
import ProfileBox from './common/ProfileBox';
import { jwtDecode } from 'jwt-decode';

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
    const [user, setUser] = useState(null); // State to hold user data
    const router = useRouter();

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

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const projectId = decodedToken.ProjectId;
            const userId = decodedToken.UserId;
            console.log(projectId,'projectId');

            setUser({
                username: name,
                role: role,
                projectId:projectId,
                userId:userId
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
            partyId: parseInt(surveyData.partyId),
            projectId: user.projectId,
            userId: user.userId
            
        };
        console.log(postData,'postdata')

        try {
            await dynamicFetch('https://localhost:44338/api/Votes', 'POST', postData);
            setSuccess("Survey submitted successfully!");
            // Reset the page after submission
        } catch (error) {
            console.error("Error submitting survey:", error);
            setError("Failed to submit survey.");
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <Container className="py-4">
            {user && (
                <div className="profile-box-container">
                    <div className={`profile-box`}>
                        <ProfileBox user={user} onLogout={handleLogout} />
                    </div>
                </div>
            )}
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
            <style jsx>{`
                .profile-box-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                .profile-box {
                    display: block;
                }
            `}</style>
        </Container>
    );
};

export default SurveyForm;
