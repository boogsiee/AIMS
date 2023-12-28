import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();

        if (response.ok) {
          // Sort posts by date_post in descending order
          const sortedPosts = data.posts.sort(
            (a, b) => new Date(b.date_post) - new Date(a.date_post)
          );
          setPosts(sortedPosts);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run the effect only once when the component mounts

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

  return (
    <div className="story-cont2">
      {loading ? (
        <p>Loading stories...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.post_number} className="story-card">
            {post.user ? (
              <>
                <div className="story-identity-main">
                  <div className="profile-pic">
                    <div className="pic-holder2">
                      <h5>
                        {getInitials(
                          post.user.user_fname,
                          post.user.user_fname
                        )}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h4>
                      {post.user.user_fname} {post.user.user_lname}
                    </h4>
                    <p>Batch {post.user.batch_year}</p>
                  </div>
                </div>
                <div className="main-story">
                  <p>{post.post_content}</p>
                  <br />
                  <p>
                    <i>{post.date_post}</i>
                  </p>
                </div>
              </>
            ) : null}
          </div>
        ))
      ) : (
        <p>No Post to Display</p>
      )}
    </div>
  );
};

export default Posts;
