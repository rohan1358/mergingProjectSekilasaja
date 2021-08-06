import React, { useState } from "react";

// Custom components
import Typography from "../components/Typography";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpModalDialog from "../components/SignUp/SignUpModalDialog";

// Material-UI components
import { Container, Grid, Paper } from "@material-ui/core";

export default function PricingPage() {
  const classes = MultiUseMobile();

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
      <Container>
        <div className={classes.sectionDesktopBlock}>
          <div className={classes.center}>
            <Grid className={classes.desktopClass} spacing={3} container>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Subscription</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <div>
                    <Button round color="primary">
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 39.000 / Bulan
                      </Typography>
                    </Button>
                  </div>
                  <div>
                    <Button round color="primary">
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 69.000 / 3 Bulan
                        </Typography>
                        <Typography className={classes.normalText}>
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button round color="primary">
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 299.000 / Tahun
                        </Typography>
                        <Typography className={classes.normalText}>
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={5}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Individual</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>

                  <div>
                    <Button round color="primary">
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 10.000 / Kilas
                      </Typography>
                    </Button>
                  </div>
                  <div>
                    <Button round color="primary">
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 25.000 / 3 Kilas
                        </Typography>
                        <Typography className={classes.normalText}>
                          Setara dengan Rp. 8.333,33 / Kilas
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={1} />
            </Grid>
          </div>
        </div>

        <div className={classes.sectionMobileBlock}>
          <div className={classes.center}>
            <Grid className={classes.desktopClass} spacing={3} container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Subscription</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <div>
                    <Button round color="primary">
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 39.000 / Bulan
                      </Typography>
                    </Button>
                  </div>
                  <div>
                    <Button round color="primary">
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 69.000 / 3 Bulan
                        </Typography>
                        <Typography className={classes.normalText}>
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button round color="primary">
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 299.000 / Tahun
                        </Typography>
                        <Typography className={classes.normalText}>
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={1} />

              <Grid item xs={1} />
              <Grid item xs={10}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Individual</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>

                  <div>
                    <Button round color="primary">
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 10.000 / Kilas
                      </Typography>
                    </Button>
                  </div>
                  <div>
                    <Button round color="primary">
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 25.000 / 3 Kilas
                        </Typography>
                        <Typography className={classes.normalText}>
                          Setara dengan Rp. 8.333,33 / Kilas
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </div>
        </div>

        <div className={classes.extraSpace} />

        <Container>
          <BenefitsBlock />
        </Container>

        {/* If logged in, remove this button */}
        <div className={classes.center}>
          <Button round color="primary" onClick={handleSignUpOpen}>
            Daftar Sekarang
          </Button>
          <SignUpModalDialog
            open={openSignUp}
            handleClose={handleSignUpClose}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
