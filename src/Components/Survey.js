import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import dynamicFetch from '@/helpers/dynamicfetch';

const SurveyForm = () => {
    const [pollingPlaces, setPollingPlaces] = useState([]);
    const [parties, setParties] = useState([]);
    const [surveyData, setSurveyData] = useState({
        age: '',
        gender: '',
        pollingPlaceId: '',
        partyId: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

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
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSurveyData({
            ...surveyData,
            [name]: value
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const postData = {
            ageGroup: surveyData.age, // Assuming 'ageGroup' corresponds to 'age' in your server-side model
            gender: surveyData.gender,
            pollingPlaceId: parseInt(surveyData.pollingPlaceId),
            partyId: parseInt(surveyData.partyId)
        };

        console.log(postData,111)

        try {
            await dynamicFetch('https://localhost:44338/api/Votes', 'POST', postData);
            setSuccess("Survey submitted successfully!");
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
               

                        <Form.Group controlId="formPollingPlace">
                            <Form.Label>Polling Place</Form.Label>
                            <Form.Control
                                as="select"
                                name="pollingPlaceId"
                                value={surveyData.pollingPlaceId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a polling place</option>
                                {pollingPlaces.map(place => (
                                    <option key={place.id} value={place.id}>{place.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={surveyData.age}
                                onChange={handleInputChange}
                                placeholder="Enter age"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={surveyData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formParty">
                            <Form.Label>Party</Form.Label>
                            <Form.Control
                                as="select"
                                name="partyId"
                                value={surveyData.partyId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a party</option>
                                {parties.map(party => (
                                    <option key={party.id} value={party.id}>{party.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Submit Survey
                        </Button>
                    </Form>

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default SurveyForm;
