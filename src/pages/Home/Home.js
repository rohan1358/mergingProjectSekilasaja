import React, { useContext } from "react";

// Pictures
import Logo from "../../images/yellow-logo.png";
import HomeBlock from "../../images/home3.jpg";
import Book from "../../images/book.png";
import BookMobile from "../../images/home-mobile.png";

// Custom components
import Typography from "../../components/Typography";
import Parallax from "../../components/Parallax";
import BenefitsBlock from "./BenefitsBlock";
import Button from "../../components/Button";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBlock from "./CategoryBlock";
import NavBar from "../../components/NavBar/Navbar";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Footer from "../../components/Footer";
import InfoAreaStyle from "../../styles/InfoAreaStyle";

// Material-UI components
import { Container, Grid, Divider, makeStyles } from "@material-ui/core";

// nodejs library to set properties for components
import classNames from "classnames";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";
import { primaryColor } from "../../styles/Style";

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
    // marginTop: "40px",
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
      {/* <NavBar cartItems={[]} history={history} /> */}
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
        }}
      />

      {!!currentUser ? (
        <div>
          <Parallax
            small
            image={require("../../images/home2.jpg").default}
          ></Parallax>

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
          {/* Landing Block */}
          <Parallax large image={require("../../images/home3.jpg").default}>
            <Container>
              <Grid container>
                <Grid item xs={5}>
                  <div style={{ width: "420px" }}>
                    <Typography size="heading">
                      Solusi Buat Kamu Yang{" "}
                      <strong
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: primaryColor,
                          textDecorationThickness: "10px",
                          textUnderlinePosition: "under",
                        }}
                      >
                        Malas Baca!
                      </strong>
                    </Typography>
                    <Typography>
                      Belajar rangkuman buku{" "}
                      <strong>
                        Bisnis, Investasi, dan Pengembangan diri terbaik dunia
                        hanya dalam 15 menit.
                      </strong>{" "}
                      Belajar dimanapun dan kapanpun.
                    </Typography>

                    <div style={{ marginTop: "20px" }} />

                    <Typography>
                      Mulai dari <strong>Rp. 1.000/hari</strong>
                    </Typography>

                    <div style={{ marginTop: "30px" }} />

                    <Button round href="/signup">
                      Bergabung Sekarang!
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Parallax>

          {/* Second Block */}
          <BenefitsBlock
            logo={<img src={Logo} className={books.imgLogoText} />}
            button={
              <Button round href="/signup">
                Bergabung Sekarang!
              </Button>
            }
          />

          <div
            style={{
              backgroundImage: `url(${HomeBlock})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          >
            <Container>
              <Grid container>
                {/* <Grid item xs={4}>
                  <img src={Book} className={books.imgHomeBook} />
                  <Typography size="heading">
                    Dapatkan ketiga buku ini secara gratis!
                  </Typography>
                </Grid>
                <Grid item xs={6}></Grid> */}
              </Grid>
            </Container>
          </div>

          <div className={classes.extraSpace} />

          {/* Third Block */}
          <Container>
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
