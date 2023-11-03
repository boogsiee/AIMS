import React from 'react';
import Sidebar from '../Components/Sidebar';
import Social from '../Components/Stories'
import Announcements from '../Components/Announcements';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div class="home-main">
        <Sidebar/>
        <div class="main-page">
          <div class="personal">
            <div class="greetings">
              <div>
                <h1> Hello, User</h1>
                <p>Welcome to Numancia School of Fisheries Alumni Portal. Your place to stay connected to your Alma Mater! Let us know how we may help you.  </p>
              </div>
            </div>
            <div class="profile-btn">
                <h3>Profile</h3>
                <Link to="/profile">
                  <div class="profile-pic">
                    <img src="profile.png" alt="pic" />
                  </div>
                </Link>
              </div>
          </div>

          <div class="social">
            <div class="social-sect">
              <h3>Succesful Stories</h3>
              <br/>
              <Social/>
            </div>
            <div class="right-pane">
              <h3>Announcements and Events</h3>
              <Announcements/>
              <div class="access">
                <div class="nav">
                  <Link to="/profile">
                    <img width="40" height="40" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/external-Write-business-tanah-basah-basic-outline-tanah-basah.png" alt="external-Write-business-tanah-basah-basic-outline-tanah-basah"/>
                  </Link>
                </div>
                <div>
                  <Link to="/records" type="button">
                    <button id="browse-rec"> Browse Records</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  )
}

export default Home