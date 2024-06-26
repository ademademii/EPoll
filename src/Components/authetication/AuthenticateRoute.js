// components/AuthenticatedRoute.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const AuthenticatedRoute = ({ allowedRoles, children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserData = async () => {
            try {
                if (!token) {
                    // If no token is present, redirect to login
                    router.push('/login');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

                setUser({
                    username: name,
                    role: role
                });

                if (!allowedRoles.includes(role)) {
                    // If user role is not allowed, redirect to not-authorized
                    router.push('/not-authorized');
                    return;
                }

                // Handle specific role-based restrictions
                if (role === 'Agent' && router.pathname === '/dashboard') {
                    router.push('/not-authorized'); // Redirect Agent away from Dashboard
                    return;
                }

                // Proceed with loading children if all checks pass
                setLoading(false);
            } catch (error) {
                console.error("Failed to decode token:", error);
                localStorage.removeItem('token');
                router.push('/login'); // Redirect to login if token decoding fails
            }
        };

        fetchUserData();
    }, [router, allowedRoles]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while checking authentication
    }

    return <>{children}</>;
};

export default AuthenticatedRoute;
