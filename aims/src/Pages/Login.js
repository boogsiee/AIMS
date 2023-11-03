import React from 'react';
import ABackground from '../Components/ABackground';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
        <div>
            <div class="main">
              <div class="user-main">
                <div id="title-left">
                  <h2 class="prompt-title">Welcome Home!</h2>
                  <p id="desc">Log in to your account and share your stories to the people of your Alma Mater.</p>
                </div> <br/>
                
                <form action="/login" method="POST">
                  <label for="username">Username</label> <br/>
                  <input type="text" id="username" name="username" placeholder="Enter your username" required />

                  <br/> <br/>

                  <label for="password">Password</label>  <br/>
                  <input type="password" id="password" name="password" placeholder="Enter your password" required />

                  <br/> <br/>
                  <Link type="button" to="/home">
                    <button class="user-btn"> LOG IN</button>
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