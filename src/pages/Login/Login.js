import React from "react";

// Custom components
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import LoginForm from "./LoginForm";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Material-UI components
import { Container, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const multi = MultiUseMobile();

  return (
    <div>
      <NavBar />
      <div className={multi.extraSpace} />
      <Container maxWidth="xs">
        <Paper className={classes.root}>
          <LoginForm />
        </Paper>
        <div className={multi.extraSpace} />
      </Container>
      <Footer />
    </div>
  );
}
