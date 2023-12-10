import React from "react";
import { Link } from "react-router-dom";

const Result = ({ searchData }) => {
  return (
    <div>
      <h3>Search Results</h3>
      {searchData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {searchData.map((user) => (
            <div key={user.user_ID}>
              <Link to={`/profile/${user.user_ID}`}>
                <h4>
                  {user.user_fname} {user.user_lname}
                </h4>
                <p>
                  {user.batch_year} - {user.strand_name}
                </p>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Result;
