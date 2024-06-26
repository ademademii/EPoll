import React, { useState } from 'react';
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
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (component) => {
        setSelectedItem(component);
        onComponentChange(component);
    };

    const linkStyle = {
        fontSize: '1.4rem', // Adjust text size as needed
        color: 'white', // Set text color to white
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        marginBottom: '10px', // Adjust vertical gap between items
        transition: 'background-color 0.3s ease', // Smooth transition for hover effect
    };

    const iconStyle = {
        fontSize: '2rem', // Adjust icon size as needed
        marginRight: '10px', // Adjust margin between icon and text
        color: 'white', // Set icon color to white
    };

    const hoverStyle = {
        backgroundColor: '#343a40', // Dark background color on hover
    };

    const selectedStyle = {
        backgroundColor: '#495057', // Darker background color for selected item
    };

    return (
        <Nav className="col-md-2 d-none d-md-block sidebar flex-column py-3 bg-primary">
            {[
                { eventKey: 'Projects', icon: <FaTasks style={iconStyle} />, label: 'Projects' },
                { eventKey: 'States', icon: <FaMapMarkerAlt style={iconStyle} />, label: 'States' },
                { eventKey: 'Cities', icon: <FaBuilding style={iconStyle} />, label: 'Cities' },
                { eventKey: 'PollingPlaces', icon: <FaMapMarkerAlt style={iconStyle} />, label: 'Polling Places' },
                { eventKey: 'Parties', icon: <FaUserFriends style={iconStyle} />, label: 'Parties' },
                { eventKey: 'Votes', icon: <FaVoteYea style={iconStyle} />, label: 'Votes' },
                { eventKey: 'Users', icon: <FaUser style={iconStyle} />, label: 'Users' },
                { eventKey: 'ViewResults', icon: <FaChartBar style={iconStyle} />, label: 'View Results' },
            ].map((item) => (
                <Nav.Item key={item.eventKey} className="mb-3">
                    <Nav.Link
                        eventKey={item.eventKey}
                        onClick={() => handleItemClick(item.eventKey)}
                        style={{
                            ...linkStyle,
                            ...(selectedItem === item.eventKey ? selectedStyle : {}),
                            ...(hoveredItem === item.eventKey ? hoverStyle : {}),
                        }}
                        onMouseEnter={() => setHoveredItem(item.eventKey)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="d-flex align-items-center"
                    >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
};

export default Sidebar;
