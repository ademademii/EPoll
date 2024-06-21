// components/ProfileBox.js

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const ProfileBox = ({ onLogout }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

                setUser({
                    name: name,
                    role: role
                });
            } catch (error) {
                console.error("Failed to decode token:", error);
                router.push('/login'); // Redirect to login page if token decoding fails
            }
        } else {
            router.push('/login'); // Redirect to login page if token is not found
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        onLogout();
        router.push('/login'); // Redirect to login page after logout
    };

    const handleGoToSurvey = () => {
        // Check current route to determine where to navigate
        if (router.pathname === '/dashboard') {
            router.push('/survey'); // Navigate to survey form page
        } else if (router.pathname === '/survey') {
            router.push('/dashboard'); // Navigate to dashboard page
        }
    };

    return (
        <div className="bg-light p-3 shadow rounded text-dark" style={{ width: '300px' }}>
            <h4 className="mb-3">Profile</h4>
            {user ? (
                <>
                    <p><strong>Username:</strong> {user.name}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <Button variant="outline-danger border-5" onClick={handleLogout} className="mb-2" block>
                        Logout
                    </Button> 
                    {user.role === 'Admin' && (
                        <Button variant="outline-primary  border-5" onClick={handleGoToSurvey} className='mb-2' block>
                            {router.pathname === '/dashboard' ? 'Go to Survey Form' : 'Go to Dashboard'}
                        </Button>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfileBox;
