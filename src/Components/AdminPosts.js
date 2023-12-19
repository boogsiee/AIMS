import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AdminPosts = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submit logic for both radio group and comment
    console.log("Radio group submitted:", selectedOption);
    console.log("Comment submitted:", comment);
    // Add your additional logic here, e.g., send data to server
    // You can also reset the form state if needed
    setSelectedOption("");
    setComment("");
  };
  return (
    <div className="admin-social">
      <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
        <FormControlLabel
          value="Announcement"
          control={<Radio />}
          label="Announcement"
        />
        <FormControlLabel value="Event" control={<Radio />} label="Event" />
        <FormControlLabel
          value="JobOffers"
          control={<Radio />}
          label="Job Offers"
        />
      </RadioGroup>

      <TextField
        label="Write some words to publicize"
        multiline
        rows={5}
        value={comment}
        onChange={handleCommentChange}
        sx={{
          width: "100%",
          color: "black",
          "& .MuiInputBase-input": {
            color: "black",
            "&:focus": {
              color: "black", // Set the text color when focused
            },
          },
        }}
      />
      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: "black",
          color: "white",
          marginTop: 2,
          width: "100%",
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AdminPosts;
