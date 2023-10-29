import React from 'react';
import ABackground from '../Components/ABackground';
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <div>
        <div class="main">
          <div class="user-main2">
            <div id="title-left">
              <h1 class="prompt-title">Come Join Us!</h1>
              <p id="desc">Register your account. It will ll be verified by the Admin, shortly.</p>
            </div>
            
            <form action="/login" method="POST">
              <div class="usersname">
                <div id="username-tab">
                  <label for="username">First Name</label> <br/>
                  <input type="text" id="firstname" name="firstname" placeholder="First Name" required />
                </div>
                
                <div id="username-tab">
                  <label for="username">Surname</label> <br/>
                  <input type="text" id="surname" name="surname" placeholder="Surname" required />
                </div>

                <div id="username-tab">
                  <label for="username">Middle Name</label> <br/>
                  <input type="text" id="mid-name" name="middle name" placeholder="Middle Name" required />
                </div>

                <div id="username-tab">
                  <label for="username">Suffix</label> <br/>
                  <input type="text" id="suffix" name="suffix" placeholder="Suffix" />
                </div>
              </div>

              <div class="contact">
                <div id="username-tab">
                  <label for="username">Phone Number</label> <br/>
                  <input type="tel" id="user-number" name="usernumber" placeholder="Phone Number" required />
                </div>
                <div id="username-tab">
                  <label for="username">Batch</label> <br/>
                  <input type="text" id="batch" name="batch" placeholder="Batch" required />
                </div>
              </div>
             
              <label for="username">Username</label> <br/>
              <input type="text" id="username" name="username" placeholder="Enter your username" required />
              <br/>
              <label for="password">Password</label>  <br/>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
              <br/> 
              <label for="password">Re-enter Password</label>  <br/>
              <input type="password" id="password" name="password" placeholder="Re-enter your password" required />
              <br/> <br/>
              <Link type="button" to="/">
                <button class="user-btn">REGISTER</button>
              </Link>
              <br/> <br/>
            </form>
            <br/>
            <p>For inquiries, try to contact the Association</p>
            <br/>
          </div>
        </div>
      </div>
      <ABackground/>
  </div>
  )
}

export default SignUp