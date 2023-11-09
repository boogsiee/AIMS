import React from 'react';
import Sidebar from '../Components/Sidebar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

const RecordLists = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };
  return (
    <div>
      <div className='home-main'> 
        <Sidebar/>
        <div className='records-main'>
          <h1>Records</h1>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
              <LinkTab label="Strand 1" href="/drafts" />
              <LinkTab label="Strand 2" href="/trash" />
            </Tabs>
          </Box>
          
        </div>
      </div>
    </div>
  )
}

export default RecordLists