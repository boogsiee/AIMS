import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NameList = ({ strand_name, section_number, batch_year }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(
      "Fetching data for strand_name:",
      strand_name,
      "section_number:",
      section_number,
      "and batch_year:",
      batch_year
    );
    fetch(
      `http://localhost:3000/users?strand_name=${strand_name}&section_number=${section_number}&batch_year=${batch_year}`
    )
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message || "An error occurred while fetching users.");
      });
  }, [strand_name, section_number, batch_year]);

  if (error) {
    return <div>{error}</div>;
  }
  const sortedUsers = [...users].sort((a, b) =>
    a.user_fname.localeCompare(b.user_fname)
  );

  return (
    <div>
      {sortedUsers.map((user) => (
        <Link key={user.user_ID} to={`/profile/${user.user_ID}`} type="button">
          <h4>{`${user.user_fname} ${user.user_lname}`}</h4>
        </Link>
      ))}
    </div>
  );
};

export default NameList;
