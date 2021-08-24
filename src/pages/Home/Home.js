import React, { useContext } from "react";
import Book from "../../images/book.png";

// Custom components
import Typography from "../../components/Typography";
import Parallax from "../../components/Parallax";
import BenefitsBlock from "../../components/BenefitsBlock";
import Button from "../../components/Button";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBlock from "./CategoryBlock";
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import InfoAreaStyle from "../../styles/InfoAreaStyle";

// Material-UI components
import { Container, Grid, Divider, makeStyles } from "@material-ui/core";

// nodejs library to set properties for components
import classNames from "classnames";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";

const useStyles = makeStyles(InfoAreaStyle);

const mobileStyles = makeStyles((theme) => ({
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionMobile: {
    display: "flex",
    marginTop: "40px",
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Home({ history }) {
  const { currentUser } = useContext(AuthContext);
  const mobile = mobileStyles();
  const classes = MultiUseMobile();
  const books = useStyles();

  const mobileClass = classNames({
    [mobile.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [mobile.sectionDesktop]: true,
  });

  return (
    <div>
      <NavBar cartItems={[]} />
      {!!currentUser ? (
        <div>
          <Parallax filter image={require("../../images/home2.jpg").default}>
            <Grid
              style={{ textAlign: "center" }}
              container
              justifyContent="center"
            >
              <Grid item>
                <Typography color="beigeColor" size="heading">
                  "Ketika kamu berhenti belajar, di titik itu kamu berhenti
                  bertumbuh."
                </Typography>
              </Grid>
              {/* <Grid item xs={2} />
              <Grid item xs={4}>
                <img
                  src={Book}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgHomeBook
                  }
                />
              </Grid> */}
            </Grid>
          </Parallax>

          <div className={classes.extraSpace} />

          <Container>
            <BenefitsBlock />
            <div className={classes.extraSpace} />
            <CategoryBlock
              history={history}
              title={"Temukan Kategori Kesukaan Kamu!"}
            />
          </Container>
        </div>
      ) : (
        <div>
          <Parallax
            className={desktopClass}
            image={require("../../images/home.png").default}
          >
            <Grid container>
              <Grid item xs={6}>
                <Typography size="heading">
                  Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
                </Typography>
                <Button href="/signup" round color="primary">
                  Daftar Sekarang
                </Button>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={4}>
                <img
                  src={Book}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgHomeBook
                  }
                />
              </Grid>
            </Grid>
          </Parallax>

          <div className={mobileClass}>
            <Grid container>
              <Grid item xs={12}>
                <img
                  src={Book}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgHomeBook
                  }
                />
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
            <CategoryBlock
              history={history}
              title={"Temukan Kategori Kesukaan Kamu!"}
            />
          </Container>
        </div>
      )}
      <Footer />
    </div>
  );
}
