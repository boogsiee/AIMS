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
// import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import AddClass from "../Components/AddClass";

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
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const selectedUserId =
    pathParts.length > 2 ? pathParts[pathParts.length - 1] : undefined;
  const [batchYears, setBatchYears] = useState([]);

  const [user, setUser] = useState(initialStateUser);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = Boolean(selectedUserId?.trim())
        ? `http://localhost:3000/users/${selectedUserId}`
        : "http://localhost:3000/users";
      const method = Boolean(selectedUserId?.trim()) ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log(response);

      if (response.ok) {
        alert(
          typeof selectedUserId !== "undefined"
            ? "Successfully Updated!"
            : "Successfully Added!"
        );

        console.log("Submit successful!"); // Add this line for console log

        // Reload the page after a successful form submission
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        if (selectedUserId) {
          const response = await fetch(
            `http://localhost:3000/users/${selectedUserId}`
          );
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchBatchYears = async () => {
      try {
        const response = await fetch("http://localhost:3000/batch_years");
        const data = await response.json();
        setBatchYears(data.batchYears || []);
      } catch (error) {
        console.error("Error fetching batch years:", error);
      }
    };

    fetchUserData(selectedUserId);

    fetchBatchYears();
  }, [selectedUserId]);

  const handleSelect = (event) => {
    setUser((prevState) => ({
      ...prevState,
      suffix: event.target.value,
    }));
  };

  const handleSelectStrand = (event) => {
    setUser((prevState) => ({
      ...prevState,
      strand: event.target.value,
    }));
  };

  const handleSelectBatch = (event) => {
    setUser((prevState) => ({
      ...prevState,
      batch: event.target.value,
    }));
  };

  const handleSelectSection = (event) => {
    setUser((prevState) => ({
      ...prevState,
      section: event.target.value,
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
                            className="login-input"
                            value={user.firstName}
                            type="text"
                            placeholder="add first name"
                            required
                            onChange={(e) =>
                              setUser((prevState) => ({
                                ...prevState,
                                firstName: e.target.value
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" "),
                              }))
                            }
                          />
                        </div>

                        <div className="add-item">
                          <label>Last Name</label>
                          <input
                            className="login-input"
                            type="text"
                            placeholder="add last name"
                            required
                            value={user.lastName}
                            onChange={(e) =>
                              setUser((prevState) => ({
                                ...prevState,
                                lastName: e.target.value
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" "),
                              }))
                            }
                          />
                        </div>

                        <div className="add-item">
                          <label>Middle Name</label>
                          <input
                            className="login-input"
                            type="text"
                            placeholder="add middle name"
                            required
                            value={user.midName}
                            onChange={(e) =>
                              setUser((prevState) => ({
                                ...prevState,
                                midName: e.target.value
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" "),
                              }))
                            }
                          />
                        </div>

                        <div className="class-desc">
                          <div className="add-item">
                            <Box sx={{ minWidth: 30 }}>
                              <InputLabel id="select-suffix">Suffix</InputLabel>
                              <Select
                                className="login-input"
                                labelId="select-suffix"
                                id="select-suffix-box"
                                value={user?.suffix || "default"}
                                label="Suffix"
                                onChange={handleSelect}
                                sx={{
                                  fontSize: 15,
                                  height: 50,
                                  width: 200,
                                  color: "black",
                                  "& .MuiInputBase-root": {
                                    color: "red",
                                  },
                                }}
                              >
                                <MenuItem value="default" disabled>
                                  Select Suffix Name
                                </MenuItem>
                                <MenuItem value={"N/A"}>N/A</MenuItem>
                                <MenuItem value={"Jr"}>Jr</MenuItem>
                                <MenuItem value={"Sr"}>Sr</MenuItem>
                                <MenuItem value={"III"}>III</MenuItem>
                                <MenuItem value={"IV"}>IV</MenuItem>
                              </Select>
                            </Box>
                          </div>

                          <div className="add-item">
                            <Box sx={{ minWidth: 10 }}>
                              <InputLabel id="select-batch">
                                Batch Year
                              </InputLabel>
                              <Select
                                className="login-input"
                                labelId="select-batch"
                                id="select-batch-box"
                                value={user?.batch_year || "default"}
                                label="Batch Year"
                                onChange={handleSelectBatch}
                                sx={{
                                  fontSize: 15,
                                  height: 50,
                                  width: 200,
                                  color: "black",
                                  "& .MuiInputBase-root": {
                                    color: "red",
                                  },
                                }}
                              >
                                <MenuItem value="default" disabled>
                                  Select Batch Year
                                </MenuItem>
                                {batchYears.map((batchYear) => (
                                  <MenuItem key={batchYear} value={batchYear}>
                                    {batchYear}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                          </div>
                        </div>

                        <div className="class-desc">
                          <div className="add-item">
                            <Box sx={{ minWidth: 10 }}>
                              <InputLabel id="select-strand">Strand</InputLabel>
                              <Select
                                className="login-input"
                                labelId="select-strand"
                                id="select-strand-box"
                                value={user?.strand_name || "default"}
                                label="Strand"
                                onChange={handleSelectStrand}
                                sx={{
                                  fontSize: 15,
                                  height: 50,
                                  width: 200,
                                  color: "black",
                                  "& .MuiInputBase-root": {
                                    color: "red",
                                  },
                                }}
                              >
                                <MenuItem value="default" disabled>
                                  Select Strand
                                </MenuItem>
                                <MenuItem value={"OLD CURRICULUM"}>
                                  Old Curriculum
                                </MenuItem>
                                <MenuItem value={"GAS"}>GAS</MenuItem>
                                <MenuItem value={"STEM"}>STEM</MenuItem>
                                <MenuItem value={"TVL"}>TVL</MenuItem>
                                <MenuItem value={"COOKERY"}>COOKERY</MenuItem>
                              </Select>
                            </Box>
                          </div>

                          <div className="add-item">
                            <Box sx={{ minWidth: 10 }}>
                              <InputLabel id="select-strand">
                                Section
                              </InputLabel>
                              <Select
                                className="login-input"
                                labelId="select-section"
                                id="select-strand-box"
                                value={user?.section_number || "default"}
                                label="Section"
                                onChange={handleSelectSection}
                                sx={{
                                  fontSize: 15,
                                  height: 50,
                                  width: 200,
                                  color: "black",
                                  "& .MuiInputBase-root": {
                                    color: "red",
                                  },
                                }}
                              >
                                <MenuItem value="default" disabled>
                                  Select Section
                                </MenuItem>
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4</MenuItem>
                              </Select>
                            </Box>
                          </div>
                        </div>
                        <br />
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          id="browse-rec"
                        >
                          Add to the Records
                        </Button>
                      </div>
                    </form>
                  </TabPanel>

                  <TabPanel value="2">
                    <AddClass />
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
