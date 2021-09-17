import React, { useEffect, useState } from "react";

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
  const [coverOne, setCoverOne] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const book = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "The Defining Decade"
      );

      if (book != undefined) setBookOne(book);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "The Defining Decade"
      );
      const link = await getLink;

      if (link !== undefined) setCoverOne(link);
    };
    fetchData();
  }, []);

  return (
    <Carousel
      arrows={false}
      showDots={true}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={1500}
      ssr={true}
      responsive={responsive}
    >
      <div style={{ marginBottom: "15px", marginTop: "10px" }}>
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
              <Typography style={{ marginTop: 0 }} size="subheading">
                Kilas Baru Minggu Ini
              </Typography>
              <Typography type="bold">{bookOne.book_title}</Typography>
              {/* {bookOne.descriptions.map((x) => (
                <Typography>{x}</Typography>
              ))} */}

              <Button round href={`/book-details/${bookOne.book_title}`}>
                Baca Sekarang!
              </Button>
            </Grid>
            <Grid item md={2} xs={12} />
            <Grid item xs={12} />
          </Grid>
        </Container>
      </div>
    </Carousel>
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
