import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import ABackground from "../Components/ABackground";

const EditProfile = () => {
  const path = useLocation();
  const selectedUserId = path.pathname.split("/")[2];
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    contactNumber: "",
    emailAddress: "",
    username: "",
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
      username,
    } = formData;

    const patchData = {
      user_fname: firstName,
      user_mname: middleName,
      user_lname: lastName,
      address,
      cnumber: contactNumber,
      email: emailAddress,
      username,
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

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${selectedUserId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSuccessMessage("Profile deleted successfully!");
        // Redirect to a different page after deletion
        history.push("/home");
      } else {
        setError("Failed to delete profile");
      }
    } catch (error) {
      setError("Error deleting profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-edit">
      <h1>Edit Profile</h1>
      <p>
        Make sure that all of the inputs are filled by entries. We might lose
        the other data if we patch only a few from the form.
      </p>
      <div className="edit-board">
        <div className="edit-info">
          <div className="editbox">
            <div className="editcard">
              <label>First Name</label>
              <br />
              &nbsp; &nbsp;
              <input
                className="login-input"
                id="editinput"
                type="text"
                placeholder="Edit first name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
            </div>
            <br />
            <div className="editcard">
              <label>Middle Name</label>
              <br />
              &nbsp; &nbsp;
              <input
                className="login-input"
                id="editinput"
                type="text"
                placeholder="Edit middle name"
                value={formData.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
                required
              />
            </div>
            <br />
            <div className="editcard">
              <label>Last Name</label>
              <br />
              &nbsp; &nbsp;
              <input
                className="login-input"
                id="editinput"
                type="text"
                placeholder="Edit last name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          <br />
          <div className="editbox">
            <div className="editcard">
              <label>Address</label>
              <br />
              &nbsp; &nbsp;
              <input
                className="login-input"
                id="editinput"
                type="text"
                placeholder="Edit address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                required
              />
            </div>
            <br />
            <div className="editcard">
              <label>Contact Number</label>
              <br />
              &nbsp; &nbsp;
              <input
                className="login-input"
                id="editinput"
                type="text"
                placeholder="Edit contact number"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                required
              />
            </div>
            <br />
            <div className="editcard">
              <label>Email Address</label>
              <br />
              &nbsp; &nbsp;
              <input
                className="login-input"
                id="editinput"
                type="text"
                placeholder="Edit email address"
                value={formData.emailAddress}
                onChange={(e) => handleChange("emailAddress", e.target.value)}
                required
              />
            </div>
            <br />
          </div>
        </div>
        <div className="edit-photo">
          <form className="editbts">
            <br />
            <div>
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
            </div>

            <div>
              <button id="del" type="button" onClick={handleDelete}>
                Delete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link to="/home">
        {" "}
        <h2>Go Back</h2>
      </Link>
      <ABackground />
    </div>
  );
};

export default EditProfile;
