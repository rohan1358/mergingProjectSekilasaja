import React, { useState } from "react";
import Book from "../images/book.png";

// Custom components
import Typography from "../components/Typography";
import Parallax from "../components/Parallax";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import CategoryBlock from "../components/CategoryBlock";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpModalDialog from "../components/SignUp/SignUpModalDialog";

// Material-UI components
import { Container, Grid, Divider } from "@material-ui/core";

// nodejs library to set properties for components
import classNames from "classnames";

export default function Home() {
  const classes = MultiUseMobile();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  // FOR SIGNUP MODAL AND LOGIN MODAL
  // Declare a new state variable for modal open for signup and login
  const [openSignUp, setSignUpOpen] = useState(false);

  // function to handle modal open for signup
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  // function to handle modal close for signup
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  return (
    <div>
      <NavBar />
      <Parallax
        className={desktopClass}
        image={require("../images/home.png").default}
      >
        <Grid container>
          <Grid item xs={6}>
            <Typography size="heading">
              Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
            </Typography>
            <Button onClick={handleSignUpOpen} round color="primary">
              Daftar Sekarang
            </Button>
            <SignUpModalDialog
              open={openSignUp}
              handleClose={handleSignUpClose}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <img src={Book} />
          </Grid>
        </Grid>
      </Parallax>

      <div className={mobileClass}>
        <Grid container>
          <Grid item xs={12}>
            <img src={Book} />
          </Grid>

          <Grid item xs={12}>
            <Container>
              <Typography size="heading">
                Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
              </Typography>
              <Button
                fullWidth
                onClick={handleSignUpOpen}
                round
                color="primary"
              >
                Daftar Sekarang
              </Button>
              <SignUpModalDialog
                open={openSignUp}
                handleClose={handleSignUpClose}
              />
            </Container>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.extraSpace} />
            <Divider className={classes.dividerColor} />
          </Grid>
        </Grid>
      </div>

      <div className={classes.extraSpace} />

      <Container>
        <BenefitsBlock />
        <div className={classes.extraSpace} />
        <CategoryBlock heading={"Temukan Kategori Kesukaan Kamu!"} />
      </Container>
      <Footer />
    </div>
  );
}
