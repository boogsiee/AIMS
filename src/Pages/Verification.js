import React, { useState } from "react";
import ABackground from "../Components/ABackground";
import Result from "../Components/Result";
import { Link } from "react-router-dom";
// import Profile from "./Profile";

const Verification = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/user-search?search=${searchKeyword}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Failed to fetch search results: ${errorData.error}`);
        return;
      }

      const searchData = await response.json();
      console.log("Fetched Search Results:", searchData);

      setResultData(searchData);
    } catch (error) {
      console.error("Error during search:", error.message);
      setError(`Error during search: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="home-main">
          <div className="search-main2">
            <h2>Search your Name for Verification</h2>
            <p>
              This will help you handle your registration process. After
              selecting your account, try to fill up the necessary data for
              successful request of registration
            </p>
            <br />
            <input
              type="text"
              className="search-veri"
              name="search"
              placeholder="Type any keyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <br />

            <button className="search-btn2" onClick={handleSearch}>
              Search
            </button>
            <br />

            <div className="result-box">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {!loading && !error && <Result searchData={resultData} />}
            </div>

            <Link to="/">Back to Login</Link>
          </div>
        </div>
      </div>
      <ABackground />
      {/* <Profile fromVerification={true} /> */}
    </div>
  );
};

export default Verification;
