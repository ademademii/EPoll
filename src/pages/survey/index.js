// pages/survey.js
import React from 'react';
import AuthenticatedRoute from '@/Components/authetication/AuthenticateRoute';
import SurveyForm from '@/Components/SurveyComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


const SurveyPage = () => {
    return (
        <AuthenticatedRoute allowedRoles={['Admin', 'Agent']}>
            <SurveyForm />
        </AuthenticatedRoute>
    );
};

export default SurveyPage;
