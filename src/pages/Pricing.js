import React, { useState } from "react";

// Custom components
import Typography from "../components/Typography";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import NavBar from "../components/NavBar/Navbar";
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
      <Container maxWidth={"sm"}>
        <div className={classes.center}>
          <Grid className={classes.desktopClass} spacing={3} container>
            <Grid item xs={1} />
            <Grid item xs={12}>
              <Typography type="heading">Pricing Plan</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">Subscription</Typography>
                <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                <div>
                  <Button className={classes.pricingButton} color="primary">
                    <div className={classes.block}>
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 39.000 / Bulan
                      </Typography>
                      <Typography type="italic" className={classes.normalText}>
                        Loren Ipsum Ngoman Balato Porche
                      </Typography>
                    </div>
                  </Button>
                </div>
                <div>
                  <Button className={classes.pricingButton} color="primary">
                    <div className={classes.block}>
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 69.000 / 3 Bulan
                      </Typography>
                      <Typography type="italic" className={classes.normalText}>
                        Setara dengan Rp. 24.166,67 / Bulan
                      </Typography>
                    </div>
                  </Button>
                </div>
                <div>
                  <Button className={classes.pricingButton} color="primary">
                    <div className={classes.block}>
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 140.000 / 6 Bulan
                      </Typography>
                      <Typography type="italic" className={classes.normalText}>
                        Setara dengan Rp. 24.166,67 / Bulan
                      </Typography>
                    </div>
                  </Button>
                </div>
                <div>
                  <Button className={classes.pricingButton} color="primary">
                    <div className={classes.block}>
                      <Typography
                        className={classes.normalText}
                        size="subheading"
                      >
                        Rp. 299.000 / 12 Bulan
                      </Typography>
                      <Typography type="italic" className={classes.normalText}>
                        Setara dengan Rp. 24.166,67 / Bulan
                      </Typography>
                    </div>
                  </Button>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography type="italic" size="subheading">
                OR
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">Individual</Typography>
                <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                <Typography>✔ Lorem ipsum dolor sit amet</Typography>

                <div>
                  <Button className={classes.pricingButton} color="secondary">
                    <div className={classes.block}>
                      <Typography
                        className={classes.beigeText}
                        size="subheading"
                      >
                        Rp. 10.000 / Kilas
                      </Typography>
                      <Typography type="italic" className={classes.beigeText}>
                        Loren Ipsum Ngoman Balato Porche
                      </Typography>
                    </div>
                  </Button>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={1} />
          </Grid>
        </div>

        <div className={classes.extraSpace} />
      </Container>

      <Container>
        <BenefitsBlock />
      </Container>

      {/* If logged in, remove this button */}
      <div className={classes.center}>
        <Button round color="primary">
          Daftar Sekarang
        </Button>
      </div>
      <Footer />
    </div>
  );
}
