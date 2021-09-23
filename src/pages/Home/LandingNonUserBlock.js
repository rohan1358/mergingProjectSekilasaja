import React from "react";
import HomeBookPNG from "../../images/home-landing.png";

// Material UI
import { Container, Grid, makeStyles } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import Parallax from "../../components/Parallax";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import MultiUseMobile from "../../styles/MultiUseMobile";
import { primaryColor } from "../../styles/Style";
import Button from "../../components/Button";

// nodejs library to set properties for components
import classNames from "classnames";

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

export default function LandingNonUserBlock({}) {
  // Styles
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
      <Parallax
        large
        className={desktopClass}
        image={require("../../images/home-landing.jpg").default}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} md={5}>
              <div style={{ width: "420px", marginTop: "80px" }}>
                <Typography size="heading">
                  Solusi Buat Kamu Yang{" "}
                  <strong
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    Malas Baca!
                  </strong>
                </Typography>
                <Typography>
                  Belajar rangkuman buku{" "}
                  <strong>
                    Bisnis, Investasi, dan Pengembangan diri terbaik dunia hanya
                    dalam 15 menit.
                  </strong>{" "}
                </Typography>

                <div style={{ marginTop: "20px" }} />

                <a href={`/book-details/Atomic%20Habits`}>
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FAtomic%20Habits.png?alt=media&token=bf6b087c-ce51-4b90-b329-3b91bfe6a1e3"
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
                <a
                  href={`/book-details/The%20Little%20Book%20of%20Common%20Sense%20Investing`}
                >
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing.png?alt=media&token=fd281a56-a2e0-4986-a1bd-b20bafe4b069"
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

                <Typography
                  style={{
                    fontSize: "22px",
                  }}
                  size="subheading"
                >
                  Dapatkan kedua buku ini{" "}
                  <strong
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    GRATIS
                  </strong>{" "}
                  hanya dengan mendaftar!
                </Typography>

                <div style={{ marginTop: "20px" }} />

                <Button round href="/signup">
                  Daftar Sekarang!
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Parallax>

      <div className={mobileClass}>
        <Grid container>
          <Grid item xs={12}>
            <Container>
              <div style={{ marginTop: "100px" }} />
              <Typography size="heading">
                Solusi Buat Kamu Yang{" "}
                <strong
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  Malas Baca!
                </strong>
              </Typography>
              <Typography>
                Belajar rangkuman buku{" "}
                <strong>
                  Bisnis, Investasi, dan Pengembangan diri terbaik dunia hanya
                  dalam 15 menit.
                </strong>{" "}
              </Typography>

              <div style={{ marginTop: "20px" }} />

              <a href={`/book-details/Atomic%20Habits`}>
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FAtomic%20Habits.png?alt=media&token=bf6b087c-ce51-4b90-b329-3b91bfe6a1e3"
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
              <a
                href={`/book-details/The%20Little%20Book%20of%20Common%20Sense%20Investing`}
              >
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing.png?alt=media&token=fd281a56-a2e0-4986-a1bd-b20bafe4b069"
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

              <Typography
                style={{
                  fontSize: "22px",
                }}
                size="subheading"
              >
                Dapatkan kedua buku ini{" "}
                <strong
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  GRATIS
                </strong>{" "}
                hanya dengan mendaftar!
              </Typography>

              <div style={{ marginTop: "20px" }} />

              <Button round href="/signup">
                Daftar Sekarang!
              </Button>
            </Container>
          </Grid>

          <Grid xs={12}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <img src={HomeBookPNG} className={books.imgHomePNG} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
