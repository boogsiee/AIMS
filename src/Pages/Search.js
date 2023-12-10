import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import Result from "../Components/Result";

const Search = () => {
  const [batchData, setBatchData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/user-search?search=${searchKeyword}&batch_year=${selectedBatch}&section=${selectedSection}`
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

    const fetchSectionData = async () => {
      try {
        const response = await fetch("http://localhost:3000/sections");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch section data:", errorData.error);
          setError(`Failed to fetch section data: ${errorData.error}`);
          return;
        }

        const data = await response.json();
        console.log("Fetched Section Data:", data);

        if (Array.isArray(data)) {
          setSectionData(data);
        } else {
          console.error("Received data has unexpected format:", data);
          setError("Received data has unexpected format");
        }
      } catch (error) {
        console.error("Error during section data fetch:", error.message);
        setError(`Error during section data fetch: ${error.message}`);
      }
    };

    fetchBatchData();
    fetchSectionData();
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
              className="search-veri"
              name="search"
              placeholder="Type any keyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div className="search-cat">
              <select
                id="batchDropdown"
                onChange={(e) => setSelectedBatch(e.target.value)}
                value={selectedBatch !== null ? selectedBatch : " "}
              >
                <option value=" "> Select Batch</option>
                {batchData.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                id="sectionDropdown"
                onChange={(e) => setSelectedSection(e.target.value)}
                value={selectedSection !== null ? selectedSection : " "}
              >
                <option value=" "> Select Section</option>
                {sectionData.map((section) => (
                  <option
                    key={section.section_id}
                    value={section.section_number}
                  >
                    {section.section_number}
                  </option>
                ))}
              </select>

              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <div className="result-box">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <Result searchData={resultData} />}
          </div>

          <div className="suggest-box">
            <h3>Browse</h3>
            <div className="records-cont">
              {batchData.length === 0 ? (
                <h2>There is no batch existing.</h2>
              ) : (
                batchData
                  .sort((a, b) => b - a) // Sort batch years in descending order
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

export default Search;
