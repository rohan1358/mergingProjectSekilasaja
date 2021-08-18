import React, { useState, useEffect } from "react";

// Material UI components
import { makeStyles, Link, TextField } from "@material-ui/core";

// Custom components
import Button from "../Button";
import Typography from "../Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

//Import firebase for login function
import fire from "../../fire";

const BookDetailsSimple = ({ handleClose }) => {
  const handleSubmit = () => {
    handleClose();
  };
  return (
    <div onClose={handleClose}>
      <Container>
        <Typography>Rich Dad Poor Dad</Typography>
      </Container>
    </div>
  );
};

export default BookDetailsSimple;
