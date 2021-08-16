import React from "react";
import { Redirect } from "react-router";

// Custom components
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer";
import SignUpForm from "../components/SignUp/SignUpForm";
import MultiUseMobile from "../styles/MultiUseMobile";

// Material-UI components
import { Container, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const multi = MultiUseMobile();

  return (
    <div>
      <NavBar />
      <div className={multi.extraSpace} />
      <Container maxWidth="xs">
        <Paper className={classes.root}>
          <SignUpForm />
        </Paper>
        <div className={multi.extraSpace} />
      </Container>
      <Footer />
    </div>
  );
}
