"use client"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function HomePage() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login'); // Navigate to the login page
    };

    return (
        <div className="bg-light" style={{ minHeight: '100vh' }}> {/* Set a background color and full height */}
            <Container className="py-5">
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <h1 className="display-4 mb-4">Welcome to Pipos</h1>
                        <p className="lead mb-4">We are here for you!</p>
                        <Button variant="primary" size="lg" onClick={handleLogin}>Login</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
