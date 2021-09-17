import React, { useEffect, useState } from "react";
import homeBG from "../../images/home3.jpg";
import newBadge from "../../images/new.png";

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
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";
import { beigeColor, primaryColor } from "../../styles/Style";

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

export default function TopKilasBlock({ button }) {
  // Styles
  const books = useStyles();

  // useState hooks
  const [bookOne, setBookOne] = useState([]);
  const [bookTwo, setBookTwo] = useState([]);
  const [bookThree, setBookThree] = useState([]);
  const [bookOneDesc, setBookOneDesc] = useState([]);
  const [bookTwoDesc, setBookTwoDesc] = useState([]);
  const [bookThreeDesc, setBookThreeDesc] = useState([]);
  const [coverOne, setCoverOne] = useState("");
  const [coverTwo, setCoverTwo] = useState("");
  const [coverThree, setCoverThree] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const book1 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "The Defining Decade"
      );

      const book2 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Kaizen"
      );

      const book3 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Rich Dad’s Cashflow Quadrant"
      );

      if (book1 != undefined) {
        setBookOne(book1);
        setBookOneDesc(book1.descriptions);
      }
      if (book2 != undefined) {
        setBookTwo(book2);
        setBookTwoDesc(book2.descriptions);
      }
      if (book3 != undefined) {
        setBookThree(book3);
        setBookThreeDesc(book3.descriptions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const link1 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "The Defining Decade"
      );
      const link2 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "Kaizen"
      );
      const link3 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "Rich Dad’s Cashflow Quadrant"
      );

      if (link1 !== undefined) setCoverOne(link1);
      if (link2 !== undefined) setCoverTwo(link2);
      if (link3 !== undefined) setCoverThree(link3);
    };
    fetchData();
  }, []);

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
                {/* <div className={books.newBadgePos}>
                  <Button
                    color="info"
                    style={{
                      cursor: "default",
                      padding: "20px 20px 20px 20px",
                    }}
                    round
                  >
                    <Typography style={{ margin: 0 }} type="bold">
                      NEW!
                    </Typography>
                  </Button>
                </div> */}
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
      </Carousel>
    </div>
    // <div
    //   style={{
    //     backgroundImage: `url(${HomeBG})`,
    //     backgroundSize: "cover",
    //   }}
    // >
    //   <Container>
    //     <Grid container direction="row" justifyContent="center" spacing={3}>
    //       {/* Kilas of the week */}
    //       <Grid item xs={12} />
    //       <Grid item xs={12}>
    //         <Typography
    //           style={{ marginTop: 0, textAlign: "center" }}
    //           size="heading"
    //         >
    //           <strong style={{ backgroundColor: primaryColor }}>
    //             Kilas Baru
    //           </strong>{" "}
    //           Minggu Ini
    //         </Typography>
    // <Grid container spacing={5} justifyContent="space-evenly">
    // {products
    //   .filter(
    //     (product) => product.category.includes("Productivity") == true
    //   )
    //   .map((categorisedProduct, index) => (
    //     <BookCard
    //       chosenCategory={"Productivity"}
    //       key={index}
    //       product={categorisedProduct}
    //       extraSpace={<div style={{ marginTop: "20px" }} />}
    //     />
    //   ))}
    // </Grid>
    //       </Grid>

    //       <Grid item xs={12}>
    //         <div style={{ display: "flex", justifyContent: "center" }}>
    //           {button}
    //         </div>
    //       </Grid>
    //       <Grid item xs={12} />
    //     </Grid>
    //   </Container>
    // </div>
  );
}
