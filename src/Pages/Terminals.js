import React from 'react';
import Sidebar from '../Components/Sidebar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddItems from '../Components/AddItems';

const Terminals = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

return (
    <div>
        <div class="home-main">
            <Sidebar/>
            <div class="main-page-terminal">
                <h2>Terminal</h2>
                <div className='data-pane'>
                    <div class="data-terminal">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Add Alumna" value="1" />
                                    <Tab label="Add Student Class Data" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <form>
                                    <div className='add-item-cont'>
                                        <div className='add-item'>
                                            <label>First Name</label>
                                            <input type="text" placeholder='add first name' required/>
                                        </div>
                                    
                                        <div className='add-item'>
                                            <label>Last Name</label>
                                            <input type="text"  placeholder='add last name'required/>
                                        </div>
                                    
                                        <div className='add-item'>
                                            <label>Middle Name</label>
                                            <input type="text" placeholder='add middle name' required/>
                                        </div>
                                    
                                        <div className='add-item'>
                                            <label>Suffix</label>
                                            <input type="text" placeholder='add suffix'/>
                                        </div>

                                        <div className='class-desc'>
                                            <div className='add-item'>
                                                <label>Batch</label>
                                                <input type="text" placeholder='add batch year'/>
                                            </div>

                                            <div className='add-item'>
                                                <label>Strand</label>
                                                <input type="text" placeholder='add strand'/>
                                            </div>

                                            <div className='add-item'>
                                                <label>Section</label>
                                                <input type="text" placeholder='add section'/>
                                            </div>
                                        </div>

                                        <button id="browse-rec"> Add to the Records</button>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel value="2">
                                <form>
                                    <div className='add-item'>
                                        <label>Batch</label>
                                        <input type="text" placeholder='add new batch year'/>
                                    </div>

                                    <div className='add-item'>
                                        <label>Strand</label>
                                        <input type="text" placeholder='add newstrand'/>
                                    </div>

                                    <div className='add-item'>
                                        <label>Section</label>
                                        <input type="text" placeholder='add new section'/>
                                    </div>

                                    <button id="browse-rec"> Add to the Records</button>
                                </form>
                            </TabPanel>
                        </TabContext>
                    </Box>
                    </div>
                    <div class="rec-add">
                        <AddItems/>
                    </div>

                </div>
            </div>
        </div>
    </div>
)
}

export default Terminals