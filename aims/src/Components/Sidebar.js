import React from 'react'

const Sidebar = () => {
  return (
    <>
        <div className="sidebar">
            <div class="nav">
                <div>
                    <a  href="/home"><img width="40" height="40" src="https://img.icons8.com/material-rounded/24/home.png" alt="home"/></a>
                </div>
    
                <div>
                    <a href=" "><img width="40" height="40" src="https://img.icons8.com/material-rounded/48/search.png" alt="search"/></a>
                </div>
                
                <div>
                    <a href=" "><img width="40" height="40" src="https://img.icons8.com/ios-glyphs/30/control-panel--v1.png" alt="control-panel--v1"/></a>    
                </div>

                <div>
                    <a href=" ">
                        <img width="40" height="40" src="https://img.icons8.com/sf-black-filled/64/pen.png" alt="pen"/>
                    </a>
                </div>

            </div>
            <div class="nav">
                <a href='/'>
                    <img width="40" height="40" src="https://img.icons8.com/pulsar-line/48/exit.png" alt="exit"/>
                </a>
            </div>
        </div>
    </>
  )
}

export default Sidebar