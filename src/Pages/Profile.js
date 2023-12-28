import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { useLocation, useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const Profile = ({ fromVerification }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [vstat, setVstat] = useState(0); // Add state to store vstat
  const path = useLocation();
  const selectedUserId = path.pathname.split("/")[2];
  const history = useHistory();
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:3000/users/${selectedUserId}`,
          {
            method: "GET",
          }
        );

        if (!userResponse.ok) {
          console.error("Failed to fetch user data");
          return;
        }

        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch posts data
        const postsResponse = await fetch(
          `http://localhost:3000/posts/user/${selectedUserId}`
        );

        if (!postsResponse.ok) {
          console.error("Failed to fetch posts data");
          return;
        }

        const postsData = await postsResponse.json();

        // Format post_date before updating the state
        const formattedPosts = postsData.posts.map((post) => ({
          ...post,
          date_post: new Date(post.date_post).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));

        setPosts(formattedPosts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVerificationData = async () => {
      try {
        const verificationResponse = await fetch(
          `http://localhost:3000/verify-user/${selectedUserId}`
        );
        console.log("Selected User ID:", selectedUserId);

        if (verificationResponse.ok) {
          const verificationData = await verificationResponse.json();
          console.log("Verification Data:", verificationData);

          // Ensure that vstat has a value and defaults to 0 if it is NULL
          setVstat(
            verificationData.vstat !== null ? verificationData.vstat : 0
          );

          console.log("Vstat Updated:", vstat);
        } else {
          console.error(
            "Failed to fetch verification data:",
            verificationResponse.status
          );
        }
      } catch (error) {
        console.error("Error fetching verification data:", error.message);
      }
    };

    fetchData();
    fetchVerificationData();
  }, [selectedUserId, vstat]);

  const handleEditClick = () => {
    const userObject = { userId: selectedUserId };
    const userId = userObject.userId;
    history.push(`/edit/${userId}`);
  };

  const handleVerifyClick = () => {
    const userObject = { userId: selectedUserId };
    const userId = userObject.userId;
    history.push(`/sign/${userId}`);
  };

  const getVerificationStatus = () => {
    if (vstat === 1) {
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
    } else if (vstat === 2 || vstat === 0) {
      return (
        <div className="NV">
          <h4 id="verilabel">Not Yet Verified</h4>
          <Tooltip title="Verify Your Account" placement="right">
            <button onClick={handleVerifyClick} className="verify-btn">
              Verify Now
            </button>
          </Tooltip>
        </div>
      );
    } else {
      // Handle other cases or undefined vstat as needed
      return <p>Unknown Verification Status</p>;
    }
  };

  const getMidInitial = (midName) => {
    if (!midName || typeof midName !== "string") {
      return "";
    }
    return midName.charAt(0);
  };

  const getInitials = (firstName, lastName) => {
    if (
      !firstName ||
      !lastName ||
      typeof firstName !== "string" ||
      typeof lastName !== "string"
    ) {
      return "";
    }

    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);

    return `${firstInitial}${lastInitial}`;
  };

  const handleDelete = async (postNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postNumber}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Assuming you have a function to refresh posts after deletion
        // Call that function or refetch the posts data
        console.log("Post deleted successfully!");

        // Refresh the page
        window.location.reload();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostSubmit = async () => {
    try {
      const postData = {
        user_ID: selectedUserId,
        post_type: "Social", // Set the default post_type here
        supp: 0,
        post_content: postContent,
      };

      const response = await fetch(
        `http://localhost:3000/posts/user/${selectedUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Post created successfully!", responseData);
        setPostContent("");
        // Assuming you have a posts field in the response
        setPosts(responseData.posts || []);

        // Refresh the page
        window.location.reload();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
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
                <h1>
                  {getInitials(userData?.user_fname, userData?.user_lname)}
                </h1>
              </div>
              <br />
              <div className="verification">{getVerificationStatus()}</div>
            </div>
            <div className="profile-text">
              <h1>
                {`${userData?.user_fname || ""} ${getMidInitial(
                  userData?.user_mname
                )} ${userData?.user_lname || ""} ${
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
                    Section: <b>{`${userData?.section_number || " "}`}</b>
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
                  <Tooltip title="Edit Your Profile" placement="right">
                    <button id="edit" type="button" onClick={handleEditClick}>
                      <img
                        width="40"
                        height="40"
                        src="https://img.icons8.com/material-rounded/48/edit--v1.png"
                        alt="edit--v1"
                      />
                    </button>
                  </Tooltip>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <div className="story-tit">
                <h2>Your Stories</h2>
              </div>
              <TextField
                label="Share your marvelous endeavors and triumphs!"
                multiline
                rows={1}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                sx={{
                  width: "95%",
                  borderRadius: 20,
                  color: "black",
                  "& .MuiInputBase-input": {
                    color: "black",
                    "&:focus": {
                      color: "black",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Post" placement="right">
                      <img
                        width="32"
                        onClick={handlePostSubmit}
                        height="32"
                        src="https://img.icons8.com/material-rounded/48/sent.png"
                        alt="sent"
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  ),
                }}
              />
              <br />
              <div className="story-cont3">
                {loading ? (
                  <p>Loading stories...</p>
                ) : (
                  // Sort posts by date_post in descending order
                  posts
                    .slice()
                    .sort(
                      (a, b) => new Date(b.date_post) - new Date(a.date_post)
                    )
                    .map((post) => (
                      <div key={post.post_number} className="story-card">
                        <div className="story-identity">
                          <div className="pic-holder2">
                            {/* You may want to replace this placeholder with the actual profile picture */}
                            <h5>
                              {getInitials(
                                userData.user_fname,
                                userData.user_lname
                              )}
                            </h5>
                          </div>
                          <div className="post-name">
                            <h4>
                              {userData.user_fname} {userData.user_lname}
                            </h4>
                            <p>Batch: {userData.batch_year}</p>
                          </div>
                        </div>
                        <div className="main-story">
                          <p>{post.post_content}</p>
                        </div>
                        <div className="post-details">
                          <p>
                            {post.post_type} | {post.date_post}
                          </p>
                          {/* Add the delete button */}
                          <button
                            className="delbtn"
                            onClick={() => handleDelete(post.post_number)}
                          >
                            <img
                              width="30"
                              height="30"
                              src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                              alt="filled-trash"
                            />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
