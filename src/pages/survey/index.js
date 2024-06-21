// pages/survey.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import SurveyForm from '@/Components/Survey';
import 'bootstrap/dist/css/bootstrap.min.css';

const SurveyPage = () => {
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
                    username: name,
                    role: role
                });
            } catch (error) {
                console.error("Failed to decode token:", error);
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
    }, [router]);

    if (!user) {
        return null; // Return null or a loading spinner while checking authentication
    }

    return <SurveyForm />;
};

export default SurveyPage;
