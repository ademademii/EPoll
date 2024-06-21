// components/ProfileBox.js

import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const ProfileBox = ({ user, onLogout }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        onLogout();
        router.push('/login'); // Redirect to login page after logout
    };

    // Function to handle navigation to survey form
    const handleGoToSurvey = () => {
        router.push('/survey'); // Navigate to survey form page
    };

    // Check if user is defined and has the 'Admin' role
    const isAdmin = user && user.role === 'Admin';
    console.log(isAdmin)

    // Decode token from localStorage to get user information if user is not defined
    if (!user) {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

                user = {
                    username: name,
                    role: role
                };
            } catch (error) {
                console.error("Failed to decode token:", error);
                router.push('/login'); // Redirect to login page if token decoding fails
            }
        } else {
            router.push('/login'); // Redirect to login page if token is not found
        }
    }

    return (
        <div className="bg-light p-3 shadow rounded text-dark" style={{ width: '300px' }}>
            <h4 className="mb-3">Profile</h4>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            {isAdmin && (
                <Button variant="primary" className="mt-2" onClick={handleGoToSurvey}>
                    Go to Survey Form
                </Button>
            )}
        </div>
    );
};

export default ProfileBox;
