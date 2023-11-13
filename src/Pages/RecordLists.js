import React from 'react';
import Sidebar from '../Components/Sidebar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Section from '../Components/Section';


const RecordLists = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
return (
    <div>
      <div className='home-main'> 
        <Sidebar/>
        <div className='records-main'>
          <h1>Records</h1>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Strand 1" value="1" />
                  <Tab label="Strand 2" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <Section/>
              </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
          </Box>
          
        </div>
      </div>
    </div>
  )
}

export default RecordLists