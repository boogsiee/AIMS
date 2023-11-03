import React from 'react';
import Sidebar from '../Components/Sidebar';
import Social from '../Components/Stories'
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <div className='home-main'> 
        <Sidebar/>
        <div className='profile-main'>
          <h2>My Profile</h2>
          <div className='profile'>
            <div className='profile-box'>
              <div className='pic-holder'>
                <img src="profile.png" alt="profile" id="profile-pic"/>
              </div>
            </div>
              <div className='profile-text'>
                <div className='profile-desc'>
                  <h1>Juan Dela Cruz</h1>
                  <Link to="/records">
                    <p id="batch-chip">Batch 2022</p>
                  </Link>
                  <p>405  Elm Street, Kalibo, Aklan</p>
                  <br/>
                  <hr/>
                  <h2>Background Achievements</h2>
                  <div className='profile-chip'>
                    <div>Salutatorian</div>
                    <div>Ginoong Lakan 2021</div>
                    <div>MVP - Basketball</div>
                  </div>
                </div>
                <div className='story-tit'>
                  <h2>Your Stories</h2>
                  <Link to="/profile">
                    <img width="40" height="40" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/external-Write-business-tanah-basah-basic-outline-tanah-basah.png" alt="external-Write-business-tanah-basah-basic-outline-tanah-basah"/>
                  </Link>
                </div>
                <div className='prof-story-box'>
                  <Social/>
                  
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile