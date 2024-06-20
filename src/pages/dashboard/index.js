import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ProfileBox from '@/Components/ProfileBox';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState(null); // State to hold user data

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            // Parse user information from token or local storage
            const decodedToken = jwtDecode(token); // Assuming you have a function like jwtDecode
            const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            console.log(name)

            setUser({
                username: name,
                role: role
            });
        } else {
            // Redirect to login if user is not authenticated
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null); // Clear user state
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <>
            {user ? (
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Hello, {user.userName}!</h1>
                    <ProfileBox user={user} onLogout={handleLogout} />
                </div>
            ) : null}

            {/* Dashboard content here */}
            <p>This is your dashboard content...</p>

            {/* Logout Button (optional, can be in ProfileBox as well) */}
            {/* <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button> */}
        </>
    );
};

export default Dashboard;
