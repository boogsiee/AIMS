import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ABackground from "../Components/ABackground";

const EditProfile = () => {
  const path = useLocation();
  const selectedUserId = path.pathname.split("/")[2];
  // const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    contactNumber: "",
    emailAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async () => {
    const {
      firstName,
      middleName,
      lastName,
      address,
      contactNumber,
      emailAddress,
    } = formData;

    const patchData = {
      user_fname: firstName,
      user_mname: middleName,
      user_lname: lastName,
      address,
      cnumber: contactNumber,
      email: emailAddress,
      verified: 1,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch(
        `http://localhost:3000/users/${selectedUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patchData),
        }
      );

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      setError("Error updating profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleUserClick = () => {
  //   const userObject = { userId: selectedUserId };
  //   const userId = userObject.userId;
  //   history.push(`/edit/${userId}`);
  // };

  return (
    <div className="main-edit">
      <h1>Edit Profile</h1>
      <p>
        Make sure that all of the inputs are filled by entries. We might lose
        the other data if we patch only few from the form.
      </p>
      <div className="edit-board">
        <div className="edit-photo">
          <form>
            <div className="pic-holder">
              <div as="button">
                <h1>+</h1>
              </div>
            </div>
            <br />
            <button
              id="browse-rec"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </form>
        </div>
        <div className="edit-info">
          <label>First Name</label> <br />
          &nbsp; &nbsp;
          <input
            className="login-input"
            id="editinput"
            type="text"
            placeholder="edit first name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
          <br />
          <label>Middle Name</label>
          <br />
          &nbsp; &nbsp;
          <input
            className="login-input"
            id="editinput"
            type="text"
            placeholder="edit middle name"
            value={formData.middleName}
            onChange={(e) => handleChange("middleName", e.target.value)}
            required
          />
          <br />
          <label>Last Name</label>
          <br />
          &nbsp; &nbsp;
          <input
            className="login-input"
            id="editinput"
            type="text"
            placeholder="edit last name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
          <br />
          <label>Address</label>
          <br />
          &nbsp; &nbsp;
          <input
            className="login-input"
            id="editinput"
            type="text"
            placeholder="edit address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            required
          />
          <br />
          <label>Contact Number</label>
          <br />
          &nbsp; &nbsp;
          <input
            className="login-input"
            id="editinput"
            type="text"
            placeholder="edit contact number"
            value={formData.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            required
          />
          <br />
          <label>Email Address</label>
          <br />
          &nbsp; &nbsp;
          <input
            className="login-input"
            id="editinput"
            type="text"
            placeholder="edit email address"
            value={formData.emailAddress}
            onChange={(e) => handleChange("emailAddress", e.target.value)}
            required
          />
          <br />
        </div>
      </div>
      <ABackground />
      <Link type="button">Back to Profile</Link>
    </div>
  );
};

export default EditProfile;
