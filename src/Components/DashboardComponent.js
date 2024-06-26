import React, { useState } from 'react';
import Sidebar from './common/Sidebar';
import States from './states/States';
import Cities from './cities/Cities';
import PollingPlaces from './pollingplace/PollingPlaces';
import Parties from './parties/Parties';
import Votes from './votes/Votes';
import Users from './users/Users';
import ViewResults from './votes/ViewResults';
import Projects from './projects/Projects';

const DashboardC = () => {
    const [currentComponent, setCurrentComponent] = useState('ViewResults');

    const handleComponentChange = (component) => {
        setCurrentComponent(component);
    };

    return (
        <div className="d-flex ">
            <Sidebar onComponentChange={handleComponentChange} />
            <div className="flex-grow-1 main-content p-4" style={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
                {currentComponent === 'Projects' && <Projects />}
                {currentComponent === 'States' && <States />}
                {currentComponent === 'Cities' && <Cities />}
                {currentComponent === 'PollingPlaces' && <PollingPlaces />}
                {currentComponent === 'Parties' && <Parties />}
                {currentComponent === 'Votes' && <Votes />}
                {currentComponent === 'Users' && <Users />}
                {currentComponent === 'ViewResults' && <ViewResults />}
            </div>
        </div>
    );
};

export default DashboardC;
