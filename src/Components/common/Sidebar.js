import { Colors } from 'chart.js';
import React from 'react';
import { Nav } from 'react-bootstrap';
import {
    FaTasks,
    FaMapMarkerAlt,
    FaBuilding,
    FaUserFriends,
    FaPoll,
    FaVoteYea,
    FaUser,
    FaChartBar
} from 'react-icons/fa';

const Sidebar = ({ onComponentChange }) => {

    const handleItemClick = (component) => {
        onComponentChange(component);
    };

    const linkStyle = {
        fontSize: '1.4rem',
        color: 'white' // Adjust text size as needed
    };

    const iconStyle = {
        fontSize: '2rem', // Adjust icon size as needed
        marginRight: '10px',
        color: 'white' // Adjust margin between icon and text
    };

    return (
        <Nav className="col-md-2 d-none d-md-block sidebar flex-column py-3 bg-primary">
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('Projects')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaTasks style={iconStyle} />
                    <span className="ml-3">Projects</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('States')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaMapMarkerAlt style={iconStyle} />
                    <span className="ml-3">States</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('Cities')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaBuilding style={iconStyle} />
                    <span className="ml-3">Cities</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('PollingPlaces')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaMapMarkerAlt style={iconStyle} />
                    <span className="ml-3">Polling Places</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('Parties')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaUserFriends style={iconStyle} />
                    <span className="ml-3">Parties</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('Votes')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaVoteYea style={iconStyle} />
                    <span className="ml-3">Votes</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('Users')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaUser style={iconStyle} />
                    <span className="ml-3">Users</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Nav.Link
                    onClick={() => handleItemClick('ViewResults')}
                    style={linkStyle}
                    className="d-flex align-items-center"
                >
                    <FaChartBar style={iconStyle} />
                    <span className="ml-3">View Results</span>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
