// components/LoginForm.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import dynamicFetch from '@/helpers/dynamicfetch';
const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await dynamicFetch('https://localhost:44338/api/Auth/Authenticate', 'POST', {
                userName: credentials.username,
                password: credentials.password,
            });
            
            console.log(response,"response")

            if (response.token) {
                const decodedToken = jwtDecode(response.token);
                const role = decodedToken.Role;
                const role1 = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                console.log(decodedToken,"decoded");
                console.log(role1,"role")

                localStorage.setItem('token', response.token);
                localStorage.setItem('role', role);

                if (role1 === 'Agent') {
                    router.push('/survey');
                } else if (role1 === 'Admin') {
                    router.push('/dashboard');
                } else {
                    setError("Unauthorized role");
                }
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
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

                    <Button variant="light" type="submit" className="w-100" disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
                    </Button>
                </Form>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </div>
        </Container>
    );
};

export default LoginForm;
