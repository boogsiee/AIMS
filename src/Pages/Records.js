import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";

const Records = () => {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/batch_years");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch batch data:", errorData.error);
          return;
        }

        const data = await response.json();
        console.log("Fetched Batch Data:", data);

        if (Array.isArray(data.batchYears)) {
          // Sort the batch years in descending order
          const sortedBatchYears = data.batchYears.sort((a, b) => b - a);
          setBatchData(sortedBatchYears);
        } else {
          console.error("Received data has unexpected format:", data);
        }
      } catch (error) {
        console.error("Error during batch data fetch:", error.message);
      }
    };

    fetchBatchData();
  }, []);

  return (
    <div>
      <div className="home-main">
        <Sidebar />
        <div className="records-main">
          <h1>Records</h1>
          <div className="records-cont-main">
            {batchData.length === 0 ? (
              <h2>There is no batch existing.</h2>
            ) : (
              batchData.map((batch) => {
                console.log("Batch Object:", batch);

                return (
                  <Link
                    key={batch}
                    to={`/batch?year=${batch}`}
                    className="records-btn"
                  >
                    <div className="batch-card">
                      <h2>Batch {batch}</h2>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
