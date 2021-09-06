import React, { useContext } from "react";

// Pictures
import Logo from "../../images/yellow-logo.png";
import HomeBlock from "../../images/home3.jpg";
import Book from "../../images/book.png";
import BookMobile from "../../images/home-mobile.png";
import Whatsapp from "../../images/Whatsapp.png";

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
import {
  Container,
  Grid,
  Divider,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

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
        <div></div>
      ) : (
        <div>
          {/* Landing Block */}
          <Parallax large image={require("../../images/home3.jpg").default}>
            <Container>
              <Grid container>
                <Grid item xs={10} md={5}>
                  <div style={{ width: "420px" }}>
                    <Typography size="heading">
                      Solusi Buat Kamu Yang{" "}
                      <strong
                        style={{
                          // textDecoration: "underline",
                          // textDecorationColor: primaryColor,
                          // textDecorationThickness: "10px",
                          // textUnderlinePosition: "under",
                          backgroundColor: primaryColor,
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
                <Grid item xs={12} md={5}>
                  <div className={classes.extraSpace} />
                  <a href={`/book-details/Steve%20Jobs`}>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Cover_Images%2FAtomic%20Habits%20Cover.png?alt=media&token=412e534f-6c3b-43e9-a3b7-d3e93ec384e5"
                      }
                      className={
                        books.imgRounded +
                        " " +
                        books.imgFluid +
                        " " +
                        books.imgHomeBook
                      }
                    />
                  </a>
                  <a href={`/book-details/Steve%20Jobs`}>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Cover_Images%2FSteve%20Jobs%20Cover.png?alt=media&token=08496dea-25b8-4c0a-b151-4916aa64affd"
                      }
                      className={
                        books.imgRounded +
                        " " +
                        books.imgFluid +
                        " " +
                        books.imgHomeBook
                      }
                    />
                  </a>
                  <a href={`/book-details/Steve%20Jobs`}>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Cover_Images%2FRich%20Dad's%20Cashflow%20Quadrant%20Cover.png?alt=media&token=6a33064a-e6e7-4e3e-bbf5-b58e897f0a91"
                      }
                      className={
                        books.imgRounded +
                        " " +
                        books.imgFluid +
                        " " +
                        books.imgHomeBook
                      }
                    />
                  </a>
                  <Typography size="heading">
                    Dapatkan ketiga buku ini secara gratis!
                  </Typography>
                  <Typography>
                    Kamu bisa mendapatkan ketiga buku ini secara gratis hanya
                    dengan mendaftar!
                  </Typography>
                  <div style={{ marginTop: "30px" }} />
                  <Button round>Bergabung Sekarang!</Button>

                  <div className={classes.extraSpace} />
                </Grid>
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

      <a href="/">
        <Tooltip
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            className={books.imgWhatsappLogo + " " + classes.fixedLogo}
          />
        </Tooltip>
      </a>
    </div>
  );
}
