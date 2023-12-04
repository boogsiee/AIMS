import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Section from "../Components/Section";

const RecordLists = () => {
  const [value, setValue] = useState("1");
  const [strands, setStrands] = useState([]);

  useEffect(() => {
    // Fetch strands when the component mounts
    fetchStrands();
  }, []);

  const fetchStrands = async () => {
    try {
      const response = await fetch("http://localhost:3000/strands"); // Update the API endpoint
      const data = await response.json();
      setStrands(data);
      // Set the default value to the first strand (if available)
      if (data.length > 0) {
        setValue(data[0].strand_number.toString());
      }
    } catch (error) {
      console.error("Error fetching strands:", error);
    }
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="home-main">
        <Sidebar />
        <div className="records-main">
          <h1>Records</h1>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {strands.map((strand) => (
                    <Tab
                      key={strand.strand_number}
                      label={strand.strand_name}
                      value={strand.strand_number.toString()}
                    />
                  ))}
                </TabList>
              </Box>
              {strands.map((strand) => (
                <TabPanel
                  key={strand.strand_number}
                  value={strand.strand_number.toString()}
                >
                  <div>
                    <Section strandId={strand.strand_number} />
                  </div>
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RecordLists;
