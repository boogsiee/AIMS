import React, { useState, useEffect } from "react";

// ... (previous imports)

const Request = () => {
  const [visibleRequests, setVisibleRequests] = useState([]);

  useEffect(() => {
    const fetchVerificationData = async () => {
      try {
        // Fetch verification data
        const verificationResponse = await fetch(
          "http://localhost:3000/verify"
        );

        if (verificationResponse.ok) {
          const verificationData = await verificationResponse.json();
          setVisibleRequests(verificationData);
        } else {
          console.error(
            "Failed to fetch verification data:",
            verificationResponse.status
          );
        }
      } catch (error) {
        console.error("Error fetching verification data:", error.message);
      }
    };

    // Call the fetchVerificationData function when the component mounts
    fetchVerificationData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  const handleAccept = async (user_Id) => {
    try {
      // Make a PATCH request to update vstat to 1 (verified)
      const response = await fetch(`http://localhost:3000/verify/${user_Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vstat: 1,
        }),
      });

      if (response.ok) {
        console.log(
          `Request for user with ID ${user_Id} verified successfully`
        );

        // Update the state to mark the request as verified (vstat = 1)
        setVisibleRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.user_Id === user_Id ? { ...request, vstat: 1 } : request
          )
        );
      } else {
        console.error(`Failed to verify request for user with ID ${user_Id}`);
      }
    } catch (error) {
      console.error("Error updating vstat:", error.message);
    }
  };

  const handleDecline = async (user_Id) => {
    try {
      // Make a PATCH request to update vstat to 2 (declined)
      const response = await fetch(`http://localhost:3000/verify/${user_Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vstat: 2,
        }),
      });

      if (response.ok) {
        console.log(
          `Request for user with ID ${user_Id} declined successfully`
        );
        // Update the state to remove the declined request
        setVisibleRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_Id !== user_Id)
        );
      } else {
        console.error(`Failed to decline request for user with ID ${user_Id}`);
      }
    } catch (error) {
      console.error("Error updating vstat:", error.message);
    }
  };

  return (
    <div className="request-box">
      {visibleRequests
        .sort((a, b) => new Date(b.date_verified) - new Date(a.date_verified))
        .map((request, index) => (
          <div className="req-card" key={index}>
            <p>
              A request from {request.user_fname} {request.user_lname} from{" "}
              {request.section_name} {request.strand_name}, Batch:{" "}
              {request.batch_year} with the number: {request.contact}.
            </p>
            <br />
            <div className="req-btn">
              {request.vstat === 1 && (
                <button id="req-btn" disabled>
                  Verified
                </button>
              )}
              {request.vstat === 2 && (
                <button id="req-btn" disabled>
                  Declined
                </button>
              )}
              {(request.vstat === 0 || request.vstat === null) && (
                <>
                  <button
                    id="req-btn"
                    onClick={() => handleAccept(request.user_Id)}
                  >
                    Accept
                  </button>
                  <button
                    id="req-btn"
                    onClick={() => handleDecline(request.user_Id)}
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Request;
