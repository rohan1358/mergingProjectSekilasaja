import React from "react";
import Book from "../images/book.png";

// Custom components
import Typography from "../components/Typography";
import Parallax from "../components/Parallax";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import CategoryBlock from "../components/CategoryBlock";

// Material-UI components
import { Container, Grid } from "@material-ui/core";

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

  return (
    <div>
      <Parallax
        className={desktopClass}
        image={require("../images/home.png").default}
      >
        <Container>
          <Grid container>
            <Grid item xs={6}>
              <Typography size="heading">
                Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
              </Typography>
              <Button href="/" round color="primary">
                Daftar Sekarang
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <img src={Book} />
            </Grid>
          </Grid>
        </Container>
      </Parallax>

      <div className={mobileClass}>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <img src={Book} />
            </Grid>
            <Grid item xs={12}>
              <Container>
                <Typography size="heading">
                  Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
                </Typography>
                <Button fullWidth href="/" round color="primary">
                  Daftar Sekarang
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container>
        <BenefitsBlock />
        <CategoryBlock heading={"Temukan Kategori Kesukaan Kamu!"} />
      </Container>
    </div>
  );
}
