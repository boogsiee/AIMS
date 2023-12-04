import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "batch", headerName: "Batch Year", width: 200 },
  { field: "strand", headerName: "Strand", width: 200 },
  { field: "section", headerName: "Section", width: 200 },
];
const AddClassItems = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [batchData, strandData, sectionData] = await Promise.all([
          fetch("http://localhost:3000/batch").then((response) =>
            response.json()
          ),
          fetch("http://localhost:3000/strand").then((response) =>
            response.json()
          ),
          fetch("http://localhost:3000/section").then((response) =>
            response.json()
          ),
        ]);

        const combinedData = batchData.map((batch, index) => ({
          id: index + 1,
          batch: batch.batch,
          strand: strandData[index].strand,
          section: sectionData[index].section,
        }));

        setRows(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Recently Added Classes</h2> <br />
      <div style={{ height: 150, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
      </div>
    </div>
  );
};

export default AddClassItems;
