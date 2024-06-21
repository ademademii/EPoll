import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ProfileBox from '@/Components/ProfileBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardC from '@/Components/DashboardC';
import AuthenticatedRoute from '@/Components/AuthenticateRoute';

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.push('/login');
    };

    return (
        <AuthenticatedRoute allowedRoles={['Admin']}>
            <Container fluid className="p-4">
                <Navbar bg="secondary" expand="lg">
                    <Container fluid>
                        <Navbar.Brand className="text-white" style={{ fontSize: '2rem' }}>Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <ProfileBox onLogout={handleLogout} />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container fluid className="border border border-5 mt-4">
                    <Row>
                        <Col>
                            <DashboardC />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </AuthenticatedRoute>
    );
};

export default Dashboard;
