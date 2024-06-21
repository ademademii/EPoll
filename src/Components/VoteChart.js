// VoteChart.js

import { useEffect, useState } from 'react';

const VoteChart = () => {
  const [partiesData, setPartiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:44338/GetAllPartiesWithVotesAndPercentage');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPartiesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Vote Chart</h2>
      <table>
        <thead>
          <tr>
            <th>Party Name</th>
            <th>Vote Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {partiesData.map((party, index) => (
            <tr key={index}>
              <td>{party.partyName}</td>
              <td>{party.voteCount}</td>
              <td>{party.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoteChart;
