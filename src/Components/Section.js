import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import NameList from "./NameList";
import { useLocation } from "react-router-dom";

const Section = () => {
  const pathname = useLocation();
  const query = pathname.search.split("?year=");
  const batchYear = query.length > 1 ? query[1] : undefined;

  const [sections, setSections] = useState([]);
  const [sectionDetails, setSectionDetails] = useState({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch("http://localhost:3000/sections");
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  const fetchSectionDetails = async (section) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sections?section_id=${section.section_id}`
      );
      const data = await response.json();
      setSectionDetails((prevState) => ({
        ...prevState,
        [section.section_id]: data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch details for each section
    sections.forEach((section) => {
      fetchSectionDetails(section);
    });
  }, [sections]);

  const renderSectionDetails = (sectionId) => {
    const details = sectionDetails[sectionId];

    if (!details) {
      return <div> </div>;
    }

    return (
      <div>
        {/* Render details for the section based on the 'details' object */}
        <Typography>{`Section Number: ${details.section_number}`}</Typography>
        <Typography>{`Image ID: ${details.ImageID}`}</Typography>
        {/* Add more details as needed */}
      </div>
    );
  };

  if (typeof batchYear == "undefined") {
    return <div>No batch available</div>;
  }

  return (
    <div>
      <div>
        {sections.map((section) => (
          <Accordion key={section.section_id}>
            <AccordionSummary
              aria-controls={`panel${section.section_id}-content`}
              id={`panel${section.section_id}-header`}
            >
              <Typography>{`Section ${section.section_number}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <NameList
                strand_name="desiredStrand"
                section_number={section.section_id}
                batch_year={batchYear}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Section;
