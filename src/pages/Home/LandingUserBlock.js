import React from "react";

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

// Images
const HomeBookPNG =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fhome-landing.png?alt=media&token=edcd982a-108d-470f-a0a7-946827cc3d41";
const HomeBookJPG =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fhome-landing.jpg?alt=media&token=aa12eeb4-f07c-4536-8e4c-64a12c6e2b17";
const AtomicHabits =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FAtomic%20Habits.png?alt=media&token=bf6b087c-ce51-4b90-b329-3b91bfe6a1e3";
const TheLittleBook =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing.png?alt=media&token=fd281a56-a2e0-4986-a1bd-b20bafe4b069";

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

export default function LandingUserBlock({}) {
  // Styles
  const mobile = mobileStyles();
  const books = useStyles();

  const mobileClass = classNames({
    [mobile.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [mobile.sectionDesktop]: true,
  });

  return (
    <div>
      <Parallax large className={desktopClass} image={HomeBookJPG}>
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
                  Belajar dimanapun dan kapanpun.
                </Typography>
                <Typography>
                  Mulai dari <strong>Rp. 1.000/hari!</strong>
                </Typography>

                <div style={{ marginTop: "20px" }} />

                <Button
                  round
                  href="/pricing"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, orange, yellow)",
                  }}
                >
                  Berlanggan Sekarang!
                </Button>

                <div style={{ marginTop: "20px" }} />

                <Typography
                  style={{
                    fontSize: "22px",
                  }}
                  size="subheading"
                >
                  Akses Kedua Bukumu{" "}
                  <strong
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    Sekarang!
                  </strong>{" "}
                </Typography>

                <div style={{ marginTop: "20px" }} />

                <a href={`/book-details/Atomic%20Habits`}>
                  <img
                    src={AtomicHabits}
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
                    src={TheLittleBook}
                    className={
                      books.imgRounded +
                      " " +
                      books.imgFluid +
                      " " +
                      books.imgHomeBook
                    }
                  />
                </a>

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
                Belajar dimanapun dan kapanpun.
              </Typography>
              <Typography>
                Mulai dari <strong>Rp. 1.000/hari!</strong>
              </Typography>

              <div style={{ marginTop: "20px" }} />

              <Button
                round
                href="/pricing"
                style={{
                  backgroundImage: "linear-gradient(to right, orange, yellow)",
                }}
              >
                Berlanggan Sekarang!
              </Button>

              <div style={{ marginTop: "20px" }} />

              <Typography
                style={{
                  fontSize: "22px",
                }}
                size="subheading"
              >
                Akses Kedua Bukumu{" "}
                <strong
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  Sekarang!
                </strong>{" "}
              </Typography>

              <div style={{ marginTop: "20px" }} />

              <a href={`/book-details/Atomic%20Habits`}>
                <img
                  src={AtomicHabits}
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
                  src={TheLittleBook}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgHomeBook
                  }
                />
              </a>

              <div style={{ marginTop: "30px" }} />
            </Grid>
          </Container>

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
