import React, { useState } from "react";
import Button from "@mui/material/Button";

const AddClass = () => {
  const [batch, setBatch] = useState("");
  const [strand, setStrand] = useState("");

  const handleAddBatch = async () => {
    try {
      const response = await fetch("http://localhost:3000/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: batch || "" }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Batch Added:", data);
      } else {
        console.error("Error adding Batch:", data.error);
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  };

  const handleAddStrand = async () => {
    try {
      const response = await fetch("http://localhost:3000/strand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strand: strand || "" }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Strand Added:", data);
      } else {
        console.error("Error adding Strand:", data.error);
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  };

  return (
    <div>
      <div className="add-item2">
        <label>Batch</label>
        <input
          className="login-input2"
          type="text"
          placeholder="add new batch year"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddBatch} id="browse-rec">
          Add New Batch Year
        </Button>
      </div>

      <div className="add-item2">
        <label>Strand</label>
        <input
          className="login-input2"
          type="text"
          placeholder="add new strand"
          value={strand}
          onChange={(e) => setStrand(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddStrand} id="browse-rec">
          Add New Strand
        </Button>
      </div>
    </div>
  );
};

export default AddClass;
