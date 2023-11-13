import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import NameList from './NameList';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Section = () => {
  return (
    <div>
        <div>
      <Accordion>
        <AccordionSummary

          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Section 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NameList/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Section 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NameList/>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  )
}

export default Section