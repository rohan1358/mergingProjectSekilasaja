import React from "react";

// Custom components
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import SignUpForm from "./SignUpForm";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";

// Material-UI components
import { Container, Paper, makeStyles } from "@material-ui/core";
import { beigeColor } from "../../styles/Style";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function SignUpPage({ history }) {
  const classes = useStyles();
  const multi = MultiUseMobile();

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "100px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
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
