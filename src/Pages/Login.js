import React from "react";
import ABackground from "../Components/ABackground";
import { Link } from "react-router-dom";

const Login = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const history = useHistory();

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: username, pword: password }),
  //     });

  //     if (response.ok) {
  //       // Redirect to home page on successful login
  //       history.push("/home");
  //     } else {
  //       const responseBody = await response.json(); // Parse response body
  //       console.error("Login error:", responseBody.error);
  //       setError("Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error.message);
  //     setError("Invalid credentials");
  //   }
  // };

  return (
    <div>
      <div>
        <div className="main">
          <div className="user-main">
            <div id="title-left">
              <h2 className="prompt-title">Welcome Home!</h2>
              <p id="desc">
                Log in to your account and share your stories with the people of
                your Alma Mater.
              </p>
            </div>{" "}
            <br />
            <form>
              <label htmlFor="username">Username</label> <br />
              <input
                className="login-input"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                // value={username}
                // onChange=""
                // required
              />
              <br /> <br />
              <label htmlFor="password">Password</label> <br />
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                // value={password}
                // onChange=" "
                // required
              />
              <br /> <br />
              <Link to="/home" type="button" className="user-btn">
                LOGIN
              </Link>
              <br /> <br />
            </form>
            <br />
            <div>
              Not a member yet?
              <Link
                to="/verification"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span> Sign up</span>
              </Link>
            </div>
            <p>For inquiries, try to contact the Association</p>
            <br />
          </div>
        </div>
      </div>
      <ABackground />
    </div>
  );
};

export default Login;
