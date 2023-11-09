import React, { useState } from 'react';
import ABackground from '../Components/ABackground';

import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Perform login logic here (e.g., send a request to your server)

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Successful login
        // Redirect or perform any action upon successful login
      } else {
        console.error(data.error); // Failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
        <div>
            <div class="main">
              <div class="user-main">
                <div id="title-left">
                  <h2 class="prompt-title">Welcome Home!</h2>
                  <p id="desc">Log in to your account and share your stories to the people of your Alma Mater.</p>
                </div> <br/>
                
                <form action="/" method="POST">
                  <label for="username">Username</label> <br/>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                  <br/> <br/>

                  <label for="password">Password</label>  <br/>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <br/> <br/>
                  <Link type="button" to="/home">
                    <button type="button" onClick={handleLogin} className="user-btn"> LOG IN</button>
                  </Link>
                  <br/> <br/>
                </form>
                <br/>
                <div>
                  Not a member yet? 
                  <Link to="/sign" style={{textDecoration: 'none', color:'black'}}><span> Sign up</span></Link>
                </div>
                <p>For inquiries, try to contact the Association</p>
                <br/>
              </div>
            </div>
        </div>
        <ABackground/>
    </div>
  )
}

export default Login