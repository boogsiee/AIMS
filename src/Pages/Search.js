import React from 'react';
import Sidebar from '../Components/Sidebar';


const Search = () => {
return (
    <div>
        <div className='home-main'> 
            <Sidebar/>
            <div className='search-main'>
                <h2>Search</h2>
                <div className='search-pane'>
                    <input type="text" id="search" name="search" placeholder="Type any keyword"/>
                    <div className='search-cat'>
                        <select>
                            <option value=" "> Select Batch</option>
                            <option value=" ">2000</option>
                            <option value=" ">2001</option>
                        </select>

                        <select>
                            <option value=" "> Select Section</option>
                            <option value=" ">Section 1</option>
                            <option value=" ">Section 2</option>
                        </select>

                        <select>
                            <option value=" "> Select Gender </option>
                            <option value=" ">Male</option>
                            <option value=" ">Female</option>
                        </select>
                    </div>
                </div>
                <div className='result-box'>
                    No Result Shown
                </div>
                <div className='suggest-box'>
                    <h3>Browse</h3>
                    <div className='suggest-box-inner'>
                        Suggest all the Chips of Batches
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Search