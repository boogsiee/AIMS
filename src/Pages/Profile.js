import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Social from "../Components/Stories";
import { Link, useLocation, useHistory } from "react-router-dom";

const Profile = ({ fromVerification }) => {
  const [userData, setUserData] = useState({});
  const path = useLocation();
  const selectedUserId = path.pathname.split("/")[2];
  const history = useHistory();

  const getInitial = (name) => {
    if (!name || typeof name !== "string") {
      return "";
    }
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0));
    return initials.join("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${selectedUserId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [selectedUserId]);

  const handleEditClick = () => {
    const userObject = { userId: selectedUserId };
    const userId = userObject.userId;
    history.push(`/edit/${userId}`);
  };

  const getVerificationStatus = (verified) => {
    if (verified === 1) {
      return (
        <>
          <h4 id="verilabel">Verified</h4>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/sf-regular/48/tiktok-verified-account.png"
            alt="tiktok-verified-account"
          />
        </>
      );
    } else {
      return (
        <>
          <h4 id="verilabel">Not Yet Verified</h4> &nbsp;
          <button className="search-btn2">Verify Now</button>
        </>
      );
    }
  };

  return (
    <div>
      <div className="home-main">
        {fromVerification ? null : <Sidebar />}
        <div className="profile-main">
          <h2>My Profile</h2>
          <div className="profile">
            <div className="profile-box">
              <div className="pic-holder">
                <img src="url(profile.png)" alt="profile" id="profile-pic" />
              </div>
              <br />
              <div className="verification">
                {getVerificationStatus(userData?.verified)}
              </div>
            </div>
            <div className="profile-text">
              <h1>
                {`${userData?.user_fname || ""} ${getInitial(
                  userData?.user_mname
                )}. ${userData?.user_lname || ""} ${
                  userData?.user_suffix !== "N/A" ? userData?.user_suffix : ""
                }`}
              </h1>

              <h4 id="batch-chip">
                Fruit of Batch {`${userData?.batch_year || " "}`}
              </h4>
              <br />
              <div className="profile-desc">
                <div className="pdesc1">
                  <p>
                    Strand: <b>{`${userData?.strand_name || " "}`}</b>
                  </p>
                  <p>
                    Address: <b>{`${userData?.address || "N/A"}`}</b>
                  </p>
                </div>
                <div className="pdesc2">
                  <p>
                    Contact: <b>{`${userData?.contact_number || "N/A"}`}</b>
                  </p>
                  <p>
                    Email Address: <b>{`${userData?.email || "N/A"}`}</b>
                  </p>
                </div>
                <div className="pdesc3">
                  <button id="edit" type="button" onClick={handleEditClick}>
                    <img
                      width="40"
                      height="40"
                      src="https://img.icons8.com/material-rounded/48/edit--v1.png"
                      alt="edit--v1"
                    />
                  </button>
                </div>

                {/* <h2>Background Achievements</h2> */}
                {/* <div className="profile-chip">
                  <div>Salutatorian</div>
                  <div>Ginoong Lakan 2021</div>
                  <div>MVP - Basketball</div>
                </div> */}
              </div>
              <br />
              <hr />
              <br />
              <div className="story-tit">
                <h2>Your Stories</h2>
                <Link to="/profile">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/external-Write-business-tanah-basah-basic-outline-tanah-basah.png"
                    alt="external-Write-business-tanah-basah-basic-outline-tanah-basah"
                  />
                </Link>
              </div>
              <div className="prof-story-box">
                <Social />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Profile fromVerification={false} /> */}
    </div>
  );
};

export default Profile;
