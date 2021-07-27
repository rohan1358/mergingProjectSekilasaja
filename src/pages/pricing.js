import React from "react";

// Custom components
import Typography from "../components/Typography";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";

// Material-UI components
import { Container, Grid, Paper } from "@material-ui/core";

export default function PricingPage() {
  const classes = MultiUseMobile();

  return (
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

      <BenefitsBlock />

      {/* If logged in, remove this button */}
      <div className={classes.center}>
        <Button round color="primary">
          Daftar Sekarang
        </Button>
      </div>
    </Container>
  );
}
