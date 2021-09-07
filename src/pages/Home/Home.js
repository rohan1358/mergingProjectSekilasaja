import React, { useContext, useEffect, useState } from "react";

// Pictures
import Logo from "../../images/yellow-logo.png";
import HomeBlock from "../../images/home3.jpg";
import Whatsapp from "../../images/Whatsapp.png";
import HomeBookPNG from "../../images/home-landing.png";

// Custom components
import Typography from "../../components/Typography";
import Parallax from "../../components/Parallax";
import BenefitsBlock from "./BenefitsBlock";
import Button from "../../components/Button";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBlock from "./CategoryBlock";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Footer from "../../components/Footer";
import InfoAreaStyle from "../../styles/InfoAreaStyle";

// Material-UI components
import { Container, Grid, makeStyles, Tooltip } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

// nodejs library to set properties for components
import classNames from "classnames";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";
import { primaryColor } from "../../styles/Style";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

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
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const mobileClass = classNames({
    [mobile.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [mobile.sectionDesktop]: true,
  });

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setIsSubscribed(results.is_subscribed);
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  }, []);

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
          {/* Landing Block */}
          <Parallax
            large
            className={desktopClass}
            image={require("../../images/home-landing.jpg").default}
          >
            <Container>
              <Grid container>
                <Grid item xs={12} md={5}>
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
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Parallax>

          <div className={mobileClass}>
            <Grid container>
              <Container>
                <Grid item xs={12}>
                  <div style={{ marginTop: "100px" }} />
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
                </Grid>
              </Container>

              <Grid xs={12}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={HomeBookPNG} className={books.imgHomePNG} />
                </div>
              </Grid>
            </Grid>
          </div>

          {/* Second Block */}
          <BenefitsBlock
            logo={<img src={Logo} className={books.imgLogoText} />}
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
                  <div style={{ marginTop: "40px" }} />

                  <a href={`/book-details/Steve%20Jobs`}>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FRich%20Dad's%20Cashflow%20Quadrant.png?alt=media&token=0a025345-b6fa-464d-a0a1-e7e917985490"
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
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FRich%20Dad's%20Cashflow%20Quadrant.png?alt=media&token=0a025345-b6fa-464d-a0a1-e7e917985490"
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
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FRich%20Dad's%20Cashflow%20Quadrant.png?alt=media&token=0a025345-b6fa-464d-a0a1-e7e917985490"
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
                    Dapatkan ketiga buku ini{" "}
                    <strong
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    >
                      secara gratis!
                    </strong>
                  </Typography>
                  <Typography>
                    Kamu bisa mendapatkan ketiga buku ini secara gratis hanya
                    dengan mendaftar!
                  </Typography>
                  <div style={{ marginTop: "30px" }} />
                </Grid>
              </Grid>
            </Container>
          </div>

          <div style={{ marginTop: "40px" }} />

          {/* Third Block */}
          <Container>
            <CategoryBlock
              history={history}
              title={"Temukan Kategori Kesukaan Kamu!"}
            />
          </Container>
        </div>
      ) : (
        <div>
          {/* Landing Block */}

          <Parallax
            large
            className={desktopClass}
            image={require("../../images/home-landing.jpg").default}
          >
            <Container>
              <Grid container>
                <Grid item xs={12} md={5}>
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

          <div className={mobileClass}>
            <Grid container>
              <Container>
                <Grid item xs={12}>
                  <div style={{ marginTop: "100px" }} />
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
                </Grid>
              </Container>

              <Grid xs={12}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={HomeBookPNG} className={books.imgHomePNG} />
                </div>
              </Grid>
            </Grid>
          </div>

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
                  <div style={{ marginTop: "40px" }} />
                  <a href={`/book-details/Steve%20Jobs`}>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FRich%20Dad's%20Cashflow%20Quadrant.png?alt=media&token=0a025345-b6fa-464d-a0a1-e7e917985490"
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
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FRich%20Dad's%20Cashflow%20Quadrant.png?alt=media&token=0a025345-b6fa-464d-a0a1-e7e917985490"
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
                        "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FRich%20Dad's%20Cashflow%20Quadrant.png?alt=media&token=0a025345-b6fa-464d-a0a1-e7e917985490"
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
                    Dapatkan ketiga buku ini{" "}
                    <strong
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    >
                      secara gratis!
                    </strong>
                  </Typography>
                  <Typography>
                    Kamu bisa mendapatkan ketiga buku ini secara gratis hanya
                    dengan mendaftar!
                  </Typography>
                  <div style={{ marginTop: "30px" }} />
                  <Button href="/signup" round>
                    Bergabung Sekarang!
                  </Button>

                  <div style={{ marginTop: "40px" }} />
                </Grid>
              </Grid>
            </Container>
          </div>

          <div style={{ marginTop: "40px" }} />

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

      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
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
