import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import Result from "../Components/Result";

const Search = () => {
  const [batchData, setBatchData] = useState([]);
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

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/batch_years");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch batch data:", errorData.error);
          setError(`Failed to fetch batch data: ${errorData.error}`);
          return;
        }

        const data = await response.json();
        console.log("Fetched Batch Data:", data);

        if (Array.isArray(data.batchYears)) {
          setBatchData(data.batchYears);
        } else {
          console.error("Received data has unexpected format:", data);
          setError("Received data has unexpected format");
        }
      } catch (error) {
        console.error("Error during batch data fetch:", error.message);
        setError(`Error during batch data fetch: ${error.message}`);
      }
    };

    fetchBatchData();
  }, []);

  return (
    <div>
      <div className="home-main">
        <Sidebar />
        <div className="search-main">
          <h2>Search</h2>
          <div className="search-pane">
            <input
              type="text"
              className="search-veri1"
              name="search"
              placeholder="Type any keyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="result-box">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <Result searchData={resultData} />}
          </div>

          <div className="suggest-box">
            <div className="records-cont">
              {batchData.length === 0 ? (
                <h2>There is no batch existing.</h2>
              ) : (
                // Use a proper shuffling algorithm to randomize the order
                shuffleArray(batchData)
                  .slice(0, 8)
                  .map((batch) => (
                    <Link
                      key={batch}
                      to={`/batch?year=${batch}`}
                      className="records-btn"
                    >
                      <div className="batch-card">
                        <h3>Batch {batch}</h3>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default Search;
