import React, { useState, useEffect } from "react";
import ABackground from "../Components/ABackground";
import { Link, useLocation } from "react-router-dom";

const SignUp = () => {
  const path = useLocation();
  const selectedUserId = path.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    usernumber: "",
    email: "",
    contact: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [greetingMessage, setGreetingMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${selectedUserId}`
        );
        const userData = await response.json();

        if (response.ok) {
          const formattedGreeting = `Hello! ${userData.user_fname}. You were once a student from ${userData.strand_name} - Section ${userData.section_number} under the banner of Batch ${userData.batch_year}. Please fill in some necessary data. You will be verified by the Admin.`;
          setGreetingMessage(formattedGreeting);
        } else {
          console.error("Error fetching user data:", userData.error);
        }
      } catch (error) {
        console.error("Error during fetchUserData:", error);
      }
    };

    fetchUserData();
  }, [selectedUserId]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleRegistration = async () => {
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/verify/${selectedUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_Id: selectedUserId,
            uname: formData.username,
            pword: formData.password,
            contact: formData.contact,
            vstat: 0, // Set the default value for vstat
          }),
        }
      );

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

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
    setPasswordsMatch(e.target.value === formData.confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData({
      ...formData,
      confirmPassword: e.target.value,
    });
    setPasswordsMatch(e.target.value === formData.password);
  };

  return (
    <div>
      <div>
        <div className="main">
          <div className="user-main2">
            <div id="title-left">
              <h2 className="prompt-title">Come Join Us!</h2>
            </div>
            <p className="veri-greet">{greetingMessage}</p>
            <br />
            <form action="/login" method="POST">
              <label htmlFor="contact">Phone Number</label> <br />
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                id="sign-input"
                name="contact"
                placeholder="Phone Number"
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                required
              />
              <br />
              <label htmlFor="username">Username</label> <br />
              <input
                type="text"
                id="sign-input"
                name="username"
                placeholder="Enter your username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
              <br />
              <label htmlFor="password">Password</label> <br />
              <input
                type="password"
                id="sign-input"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
              />
              <br />
              <label htmlFor="confirmPassword">Re-enter Password</label> <br />
              <input
                type="password"
                id="sign-input"
                name="confirmPassword"
                placeholder="Re-enter your password"
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordsMatch && (
                <p style={{ color: "red" }}>
                  Passwords do not match. Please try again.
                </p>
              )}
              <br /> <br />
              <Link to="/">
                <button
                  onClick={() => {
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
