import React, { useState, useEffect } from "react";
import ABackground from "../Components/ABackground";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    middlename: "",
    suffix: "",
    usernumber: "",
    batch: "",
    strand: "",
    section: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [strands, setStrands] = useState([]);
  const [sections, setSections] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // Fetch available strands when the component mounts
    const fetchStrands = async () => {
      try {
        const response = await fetch("http://localhost:3000/strands");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch strands. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setStrands(data);
      } catch (error) {
        console.error("Error fetching strands:", error.message);
      }
    };

    // Fetch available sections when the component mounts
    const fetchSections = async () => {
      try {
        const response = await fetch("http://localhost:3000/sections");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch sections. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error("Error fetching sections:", error.message);
      }
    };

    fetchStrands();
    fetchSections();
  }, []);

  const handleRegister = async () => {
    // ... (your existing registration logic)

    // Validation to check if Batch is filled before registration
    if (!formData.batch) {
      console.error("Batch input must be filled before registration");
      return;
    }

    try {
      // ... (your existing fetch logic)
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data.message);
      } else {
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <div>
        <div class="main">
          <div class="user-main2">
            <div id="title-left">
              <h2 class="prompt-title">Come Join Us!</h2>
              <p id="desc">
                Register your account. It will ll be verified by the Admin,
                shortly.
              </p>
            </div>

            <form action="/login" method="POST">
              <div class="usersname">
                <div id="username-tab">
                  <label for="username">First Name</label> <br />
                  <input
                    type="text"
                    id="sign-input"
                    name="firstname"
                    placeholder="First Name"
                    required
                  />
                </div>

                <div id="username-tab">
                  <label for="username">Surname</label> <br />
                  <input
                    type="text"
                    id="sign-input"
                    name="surname"
                    placeholder="Surname"
                    required
                  />
                </div>

                <div id="username-tab">
                  <label for="username">Middle Name</label> <br />
                  <input
                    type="text"
                    id="sign-input"
                    name="middle name"
                    placeholder="Middle Name"
                    required
                  />
                </div>

                <div id="username-tab">
                  <label for="username">Suffix</label> <br />
                  <input
                    type="text"
                    id="sign-input"
                    name="suffix"
                    placeholder="Suffix"
                  />
                </div>
              </div>
              <div class="contact">
                <div id="username-tab">
                  <label for="username">Phone Number</label> <br />
                  <input
                    type="tel"
                    id="sign-input"
                    name="usernumber"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div id="username-tab">
                  <label htmlFor="batch">Batch</label> <br />
                  <input
                    type="text"
                    id="sign-input"
                    name="batch"
                    placeholder="Batch"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="contact">
                <div id="username-tab">
                  <label htmlFor="strand">Strand</label> <br />
                  <select
                    id="sign-select"
                    name="strand"
                    disabled={!formData.batch}
                    onChange={handleChange}
                    value={formData.strand}
                  >
                    <option value=" "> Select Strand</option>
                    {strands.map((strand) => (
                      <option
                        key={strand.strand_number}
                        value={strand.strand_name}
                      >
                        {strand.strand_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div id="username-tab">
                  <label htmlFor="section">Section</label> <br />
                  <select
                    id="sign-select"
                    name="section"
                    disabled={!formData.batch}
                    onChange={handleChange}
                    value={formData.section}
                  >
                    <option value=""> Select Section</option>
                    {sections.map((section) => (
                      <option
                        key={section.section_id}
                        value={section.section_number}
                      >
                        {section.section_number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label for="username">Username</label> <br />
              <input
                type="text"
                id="sign-input"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <br />
              <label htmlFor="password">Password</label> <br />
              <input
                type="password"
                id="sign-input"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <label for="password">Re-enter Password</label> <br />
              <input
                type="password"
                id="sign-input"
                name="password"
                placeholder="Re-enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <br /> <br />
              <Link type="button" to="/">
                <button
                  onClick={() => {
                    handleRegister();
                    handleRegistration();
                  }}
                  className="user-btn"
                >
                  REGISTER
                </button>
              </Link>
              <br /> <br />
            </form>
            <br />
            <p>For inquiries, try to contact the Association</p>
            <br />
          </div>
        </div>
      </div>
      <ABackground />
    </div>
  );
};

export default SignUp;
