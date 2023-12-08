import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import AddItems from "../Components/AddItems";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";

const initialStateUser = {
  firstName: "",
  lastName: "",
  midName: "",
  suffix: "",
  batch: "",
  strand: "",
  section: "",
};

const Terminals = () => {
  const path = useLocation();
  const selectedUserId = path.pathname.split("/")[2];

  const [user, setUser] = useState(initialStateUser);
  const [year, setBatch] = useState("");
  const [strand, setStrand] = useState("");
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddAlumna = async () => {
    try {
      const url =
        typeof selectedUserId !== "undefined"
          ? `http://localhost:3000/users/${selectedUserId}`
          : "http://localhost:3000/users";
      const method = typeof selectedUserId !== "undefined" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          suffix: user.suffix,
        }),
      });

      if (response.ok) {
        alert(
          typeof selectedUserId !== "undefined"
            ? "Successfully Updated!"
            : "Successfully Added!"
        );
      }
    } catch (error) {
      console.error("Error submitting Alumna data:", error);
    }
  };

  const handleAddBatch = async () => {
    try {
      const response = await fetch("http://localhost:3000/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: year }),
      });

      if (response.ok) {
        alert("Batch added successfully!");
      } else {
        throw new Error("Failed to add batch");
      }
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  const handleAddStrand = async () => {
    try {
      const response = await fetch("http://localhost:3000/strand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strand: strand }),
      });

      if (response.ok) {
        alert("Strand added successfully!");
      } else {
        throw new Error("Failed to add strand");
      }
    } catch (error) {
      console.error("Error adding strand:", error);
    }
  };

  const handleAddStudentClassData = async () => {
    try {
      alert("Student Class Data added successfully!");
    } catch (error) {
      console.error("Error adding student class data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value === "1") {
      // Handle Alumna form submission
      handleAddAlumna();
    } else if (value === "2") {
      // Handle Student Class Data form submission
      handleAddBatch();
      handleAddStrand();
      handleAddStudentClassData();
    } else {
      // Handle other tabs as needed
      // Add logic for other tabs if necessary
    }
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          firstName: userData.user_fname || "",
          lastName: userData.user_lname || "",
          midName: userData.user_mname || "",
          suffix: userData.user_suffix || "",
          batch: userData.batch_year || "",
          strand: userData.strand_name || "",
          section: userData.section_number || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (typeof selectedUserId !== "undefined") {
      fetchUserData(selectedUserId);
    }
  }, [selectedUserId]);

  const handleSelect = (event) => {
    setUser((prevState) => ({
      ...prevState,
      suffix: event.target.value,
    }));
  };

  return (
    <div>
      <div class="home-main">
        <Sidebar />
        <div class="main-page-terminal">
          <h2>Terminal</h2>
          <div className="data-pane">
            <div class="data-terminal">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Add Alumna" value="1" />
                      <Tab label="Add Student Class Data" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <form>
                      <div className="add-item-cont">
                        <div className="add-item">
                          <label>First Name</label>
                          <input
                            value={user.firstName}
                            type="text"
                            placeholder="add first name"
                            required
                            onChange={(e) =>
                              setUser((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="add-item">
                          <label>Last Name</label>
                          <input
                            type="text"
                            placeholder="add last name"
                            required
                            value={user.lastName}
                            onChange={(e) =>
                              setUser((prevState) => ({
                                ...prevState,
                                lastName: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="add-item">
                          <label>Middle Name</label>
                          <input
                            type="text"
                            placeholder="add middle name"
                            required
                            value={user.midName}
                            onChange={(e) =>
                              setUser((prevState) => ({
                                ...prevState,
                                midName: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="add-item">
                          <Box sx={{ minWidth: 30 }}>
                            <FormControl fullWidth>
                              <InputLabel id="select-suffix">Suffix</InputLabel>
                              <Select
                                labelId="select-suffix"
                                id="select-suffix-box"
                                value={user.suffix}
                                label="Suffix"
                                onChange={handleSelect}
                                sx={{
                                  fontSize: 15,
                                  height: 50,
                                  width: 250,
                                  color: "black",
                                  "& .MuiInputBase-root": {
                                    color: "red",
                                  },
                                }}
                              >
                                <MenuItem value={"N/A"}>N/A</MenuItem>
                                <MenuItem value={"Jr"}>Jr</MenuItem>
                                <MenuItem value={"Sr"}>Sr</MenuItem>
                                <MenuItem value={"III"}>III</MenuItem>
                                <MenuItem value={"IV"}>IV</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>

                        <div className="class-desc">
                          <div className="add-item">
                            <label>Batch</label>
                            <input
                              type="text"
                              placeholder="batch year"
                              required
                              value={user.batch}
                              onChange={(e) =>
                                setUser((prevState) => ({
                                  ...prevState,
                                  batch: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div className="add-item">
                            <label>Strand</label>
                            <input
                              type="text"
                              placeholder="add strand"
                              value={user.strand}
                              onChange={(e) =>
                                setUser((prevState) => ({
                                  ...prevState,
                                  strand: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div className="add-item">
                            <label>Section</label>
                            <input
                              type="text"
                              placeholder="add section"
                              value={user.section}
                              onChange={(e) =>
                                setUser((prevState) => ({
                                  ...prevState,
                                  section: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <button onClick={handleSubmit} id="browse-rec">
                          Add to the Records
                        </button>
                      </div>
                    </form>
                  </TabPanel>

                  <TabPanel value="2">
                    <form>
                      <div className="add-item">
                        <label>Batch</label>
                        <input
                          type="text"
                          placeholder="Batch Year"
                          value={year}
                          onChange={(e) => setBatch(e.target.value)}
                        />
                      </div>

                      <div className="add-item">
                        <label>Strand</label>
                        <input
                          type="text"
                          placeholder="Strand Name"
                          value={strand}
                          onChange={(e) => setStrand(e.target.value)}
                        />
                      </div>
                      {/* 
                      <div className="add-item">
                        <label>Section</label>
                        <input
                          type="text"
                          placeholder="Section Number"
                          value={user.section}
                          onChange={(e) =>
                            setUser((prevState) => ({
                              ...prevState,
                              section: e.target.value,
                            }))
                          }
                        />
                      </div> */}

                      <button id="browse-rec">Add to the Records</button>
                    </form>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
            <div class="rec-add">
              <AddItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminals;
