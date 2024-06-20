// components/ProfileBox.js

import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const ProfileBox = ({ user, onLogout }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        onLogout();
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <div className="bg-light p-3 shadow rounded text-dark" style={{ width: '300px' }}>
            <h4 className="mb-3">Profile</h4>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default ProfileBox;
