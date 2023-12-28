import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Stories = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Updated loading state
  const { userId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/posts/user/${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched posts:", data);

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error as needed
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="story-cont">
      {loading ? (
        <p>Loading stories...</p>
      ) : (
        posts.map((post) => (
          <div key={post.post_number} className="story-card">
            {/* Your existing code for displaying post data */}
            <div className="story-identity">
              <div className="profile-pic">
                <img src="profile.png" alt="pic" />
              </div>
              <div>
                <h4>
                  {post.user_fname} {post.user_lname}
                </h4>
                <p>Batch {post.batch_year}</p>
              </div>
            </div>
            <div className="main-story">
              <p>{post.post_content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Stories;
