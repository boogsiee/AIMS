import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';

const Records = () => {
  const [batchYears, setBatchYears] = useState([]);

  useEffect(() => {
    const fetchBatchYears = async () => {
      try {
        const response = await fetch('/api/batch'); // Replace with your actual endpoint
        const data = await response.json();

        if (response.ok) {
          setBatchYears(data.batchYears);
        } else {
          console.error('Failed to fetch batch years:', data.error);
        }
      } catch (error) {
        console.error('Error during batch years fetch:', error);
      }
    };

    fetchBatchYears();
  }, []);

  return (
    <div>
      <div className='home-main'> 
        <Sidebar/>
        <div className='records-main'>
          <h1>Records</h1>
          <div className='records-cont'>
            {batchYears.length === 0 ? (
              <h2>There is no batch existing.</h2>
            ) : (
              batchYears.map((year) => (
                <div key={year} className='batch-card'>
                  <h2>{year}</h2>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records;
