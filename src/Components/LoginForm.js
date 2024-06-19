import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function LoginForm(){
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(null); // Reset error state

        // Simulate authentication logic (replace with actual backend API call in real scenario)
        if (credentials.username === 'agent' && credentials.password === 'password') {
            router.push('/survey'); // Redirect to survey page upon successful login
        } else if (credentials.username === 'admin' && credentials.password === 'passi') {
            router.push('/dashboard');
        }
        else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-primary p-4 shadow rounded text-white" style={{ width: '400px', height: 'auto' }}>
                <h2 className="mb-4 text-center">Login</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            className="mb-3"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="mb-3"
                        />
                    </Form.Group>

                    <Button variant="light" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </div>
        </Container>
    );
};

