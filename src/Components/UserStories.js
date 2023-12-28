import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserStories = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`/posts/user/${userId}`);
        console.log(userId);
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setPosts(data.posts);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      <div className="story-cont">
        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <>
            <div className="story-identity">
              <div className="profile-pic">
                {/* You may want to replace this placeholder with the actual profile picture */}
                <h1>Name</h1>
              </div>
              <div>
                <h4>
                  {user.user_fname} {user.user_lname}
                </h4>
                <p>Batch {user.batch_year}</p>
              </div>
            </div>
            {posts.map((post) => (
              <div key={post.post_number} className="story-card">
                <div className="main-story">
                  <p>{post.post_content}</p>
                </div>
                <div className="post-details">
                  <p>
                    {post.post_type} | {post.date_post}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserStories;
