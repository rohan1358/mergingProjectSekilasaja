import React, { useEffect, useState } from "react";
import homeBG from "../../images/home3.jpg";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Material UI
import { Container, Grid, makeStyles } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Button from "../../components/Button";

// Firebase component
import { primaryColor } from "../../styles/Style";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles(InfoAreaStyle);

export default function TopKilasBlock({
  bookOne,
  bookTwo,
  bookThree,
  bookFour,
  bookFive,
  bookOneDesc,
  bookTwoDesc,
  bookThreeDesc,
  bookFourDesc,
  bookFiveDesc,
  coverOne,
  coverTwo,
  coverThree,
  coverFour,
  coverFive,
}) {
  // Styles
  const books = useStyles();

  return (
    <div
      style={{
        backgroundImage: `url(${homeBG})`,
        backgroundSize: "cover",
        padding: 10,
      }}
    >
      <Carousel
        arrows={false}
        showDots={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={2000}
        ssr={true}
        responsive={responsive}
      >
        <div
          style={{
            // backgroundColor: "#F7D3BB",
            marginBottom: "5px",
            marginTop: "10px",
          }}
        >
          <Container>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid item xs={12} />
              <Grid item md={2} xs={12} />
              <Grid item md={3} xs={12}>
                <img
                  src={coverFour}
                  className={books.imgRounded + " " + books.imgFluid}
                  style={{ maxWidth: "250px", width: "100%" }}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography style={{ marginTop: 0 }} size="heading">
                  <strong style={{ backgroundColor: primaryColor }}>
                    Kilas Baru
                  </strong>{" "}
                  Minggu Ini!
                </Typography>
                <Typography type="bold" size="subheading">
                  {bookFour.book_title}
                </Typography>
                <Typography>{bookFourDesc[0]}</Typography>
                {/* {bookOneDesc.map((x) => (
                  <Typography>{x}</Typography>
                ))} */}

                <div style={{ marginBottom: 20 }} />

                <Button round href={`/book-details/${bookFour.book_title}`}>
                  Baca Sekarang!
                </Button>
              </Grid>
              <Grid item md={2} xs={12} />
              <Grid item xs={12} />
            </Grid>
          </Container>
        </div>

        <div
          style={{
            // backgroundColor: "#CAEDA8",
            marginBottom: "5px",
            marginTop: "10px",
          }}
        >
          <Container>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid item xs={12} />
              <Grid item md={2} xs={12} />
              <Grid item md={3} xs={12}>
                <img
                  src={coverFive}
                  className={books.imgRounded + " " + books.imgFluid}
                  style={{ maxWidth: "250px", width: "100%" }}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography style={{ marginTop: 0 }} size="heading">
                  <strong style={{ backgroundColor: primaryColor }}>
                    Kilas Baru
                  </strong>{" "}
                  Minggu Ini!
                </Typography>
                <Typography type="bold" size="subheading">
                  {bookFive.book_title}
                </Typography>
                <Typography>{bookFiveDesc[0]}</Typography>

                <div style={{ marginBottom: 20 }} />

                <Button round href={`/book-details/${bookFive.book_title}`}>
                  Baca Sekarang!
                </Button>
              </Grid>
              <Grid item md={2} xs={12} />
              <Grid item xs={12} />
            </Grid>
          </Container>
        </div>

        <div
          style={{
            // backgroundColor: "#CAEDA8",
            marginBottom: "5px",
            marginTop: "10px",
          }}
        >
          <Container>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid item xs={12} />
              <Grid item md={2} xs={12} />
              <Grid item md={3} xs={12}>
                <img
                  src={coverThree}
                  className={books.imgRounded + " " + books.imgFluid}
                  style={{ maxWidth: "250px", width: "100%" }}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography style={{ marginTop: 0 }} size="heading">
                  <strong style={{ backgroundColor: primaryColor }}>
                    Kilas Baru
                  </strong>{" "}
                  Minggu Ini!
                </Typography>
                <Typography type="bold" size="subheading">
                  {bookThree.book_title}
                </Typography>
                <Typography>{bookThreeDesc[0]}</Typography>

                <div style={{ marginBottom: 20 }} />

                <Button round href={`/book-details/${bookThree.book_title}`}>
                  Baca Sekarang!
                </Button>
              </Grid>
              <Grid item md={2} xs={12} />
              <Grid item xs={12} />
            </Grid>
          </Container>
        </div>

        <div
          style={{
            // backgroundColor: "#F7D3BB",
            marginBottom: "5px",
            marginTop: "10px",
          }}
        >
          <Container>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid item xs={12} />
              <Grid item md={2} xs={12} />
              <Grid item md={3} xs={12}>
                <img
                  src={coverOne}
                  className={books.imgRounded + " " + books.imgFluid}
                  style={{ maxWidth: "250px", width: "100%" }}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography style={{ marginTop: 0 }} size="heading">
                  <strong style={{ backgroundColor: primaryColor }}>
                    Kilas Baru
                  </strong>{" "}
                  Minggu Ini!
                </Typography>
                <Typography type="bold" size="subheading">
                  {bookOne.book_title}
                </Typography>
                <Typography>{bookOneDesc[0]}</Typography>
                {/* {bookOneDesc.map((x) => (
                  <Typography>{x}</Typography>
                ))} */}

                <div style={{ marginBottom: 20 }} />

                <Button round href={`/book-details/${bookOne.book_title}`}>
                  Baca Sekarang!
                </Button>
              </Grid>
              <Grid item md={2} xs={12} />
              <Grid item xs={12} />
            </Grid>
          </Container>
        </div>

        <div
          style={{
            // backgroundColor: "#E0DDE4",
            marginBottom: "5px",
            marginTop: "10px",
          }}
        >
          <Container>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid item xs={12} />
              <Grid item md={2} xs={12} />
              <Grid item md={3} xs={12}>
                <img
                  src={coverTwo}
                  className={books.imgRounded + " " + books.imgFluid}
                  style={{ maxWidth: "250px", width: "100%" }}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography style={{ marginTop: 0 }} size="heading">
                  <strong style={{ backgroundColor: primaryColor }}>
                    Kilas Baru
                  </strong>{" "}
                  Minggu Ini!
                </Typography>
                <Typography type="bold" size="subheading">
                  {bookTwo.book_title}
                </Typography>
                <Typography>{bookTwoDesc[0]}</Typography>

                <div style={{ marginBottom: 20 }} />

                <Button round href={`/book-details/${bookTwo.book_title}`}>
                  Baca Sekarang!
                </Button>
              </Grid>
              <Grid item md={2} xs={12} />
              <Grid item xs={12} />
            </Grid>
          </Container>
        </div>
      </Carousel>
    </div>
  );
}
