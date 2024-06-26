// SubmitButton.js
import React from 'react';
import { Button } from 'react-bootstrap';

const SubmitButton = ({ onSubmit }) => (
    <Button variant="primary" type="submit" className="w-100 mt-3" onClick={onSubmit}>
        Submit Survey
    </Button>
);

export default SubmitButton;
