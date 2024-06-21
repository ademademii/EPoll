import React from 'react';
import { ListGroup } from 'react-bootstrap';

const areas = ['project', 'state', 'city', 'votingPlace', 'parties', 'votes', 'users'];

const Sidebar = ({ onSelect }) => {
  return (
    <ListGroup className="py-5 border border-primary "> {/* Adding vertical padding of 3 units */}
      {areas.map((area) => (
        <ListGroup.Item key={area} action onClick={() => onSelect(area)} className="px-4 py-2"> {/* Adding horizontal padding of 4 units and vertical padding of 2 units */}
          {area.charAt(0).toUpperCase() + area.slice(1)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Sidebar;
