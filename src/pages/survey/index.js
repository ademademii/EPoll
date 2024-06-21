// pages/survey.js
import React from 'react';
import AuthenticatedRoute from '@/Components/AuthenticateRoute';
import SurveyForm from '@/Components/Survey';
import 'bootstrap/dist/css/bootstrap.min.css';


const SurveyPage = () => {
    return (
        <AuthenticatedRoute allowedRoles={['Admin', 'Agent']}>
            <SurveyForm />
        </AuthenticatedRoute>
    );
};

export default SurveyPage;
