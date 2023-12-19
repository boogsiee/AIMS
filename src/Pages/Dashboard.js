import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import ABackground from "../Components/ABackground";
import AdminPosts from "../Components/AdminPosts";
import Request from "../Components/Request";

const Dashboard = () => {
  const [totalRegisteredAlumna, setTotalRegisteredAlumna] = useState(0);
  const [totalVerifiedUsers, setTotalVerifiedUsers] = useState(0);
  const [strands, setStrands] = useState([]);
  const [strandCounts, setStrandCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total registered alumna
        const registeredResponse = await fetch(
          "http://localhost:3000/users/count"
        );
        const registeredData = await registeredResponse.json();

        if (!registeredResponse.ok) {
          throw new Error(
            `Failed to fetch total registered users. Status: ${registeredResponse.status}`
          );
        }

        setTotalRegisteredAlumna(registeredData.totalUsers);

        // Fetch total verified users
        const verifiedResponse = await fetch(
          "http://localhost:3000/verified-users/count"
        );
        const verifiedData = await verifiedResponse.json();

        if (!verifiedResponse.ok) {
          throw new Error(
            `Failed to fetch total verified users. Status: ${verifiedResponse.status}`
          );
        }

        setTotalVerifiedUsers(verifiedData.totalVerifiedUsers);

        // Fetch strands
        const strandsResponse = await fetch("http://localhost:3000/strands");
        const strandsData = await strandsResponse.json();

        if (!strandsResponse.ok) {
          throw new Error(
            `Failed to fetch strands. Status: ${strandsResponse.status}`
          );
        }

        setStrands(strandsData);

        // Fetch strand counts
        const strandCountsResponse = await fetch(
          "http://localhost:3000/alumna-count-by-strand"
        );
        const strandCountsData = await strandCountsResponse.json();

        if (!strandCountsResponse.ok) {
          throw new Error(
            `Failed to fetch strand counts. Status: ${strandCountsResponse.status}`
          );
        }

        // Transform the array of strand counts into an object
        const formattedStrandCounts = strandCountsData.reduce((acc, entry) => {
          acc[entry.strand_name] = entry.alumnaCount;
          return acc;
        }, {});

        setStrandCounts(formattedStrandCounts);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="home-main">
        <Sidebar />
        <div className="main-page-terminal">
          <h2>Dashboard</h2>
          <p>
            Welcome to your dashboard! Here you can see the overall status of
            your account and manage various settings.
          </p>
          <div className="dashboard-main">
            <div className="dashboard-p1">
              <div className="student-ct">
                <div className="dashboard-card">
                  <h4 className="count-lbl">Total Registered Alumna: </h4>
                  <h3 className="counts">{totalRegisteredAlumna}</h3>
                </div>

                <div className="dashboard-card">
                  <h4>Total Verified Alumna: </h4>
                  <h3 className="counts">{totalVerifiedUsers}</h3>
                </div>
              </div>

              <h3>Strand Data</h3>
              <div className="dashboard-strand-container">
                {strands.map((strand) => (
                  <div
                    className="dashboard-strand-card"
                    key={strand.strand_number}
                  >
                    <h4>
                      {strand.strand_name}:{" "}
                      <span className="strand-counts">
                        {strandCounts[strand.strand_name] || 0}
                      </span>
                    </h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="dashboard-p2">
              <div>
                <h2>Verification Requests</h2>
                <div>
                  <Request />
                </div>
              </div>
              <br />
              <div>
                <h2>Social Composition</h2>
                <AdminPosts />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ABackground />
    </div>
  );
};

export default Dashboard;
