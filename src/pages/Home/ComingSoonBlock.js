import React, { useState, useEffect } from "react";

// Custom components
import ComingSoonCard from "./ComingSoonCard";
import Typography from "../../components/Typography";
import InfoStyle from "../../styles/InfoAreaStyle";
import Loading from "../Utilities/Loading";
import { beigeColor, primaryColor } from "../../styles/Style";

// Material-UI components
import { Container, makeStyles, Grid } from "@material-ui/core";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Firebase components
import fire from "../../firebase/fire";

// Images
const ComingSoonBackground =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fcoming-soon.png?alt=media&token=c6a47889-cc24-4cab-9d84-ff6106ec7c19";

// Styles
const useInfoStyles = makeStyles(InfoStyle);

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
};

export default function ComingSoonBlock({}) {
  // Auth
  const db = fire.firestore();

  // Styles
  const cards = useInfoStyles();

  // useState hooks
  const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      SetProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });

    return function cleanup() {
      SetProducts([]);
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${ComingSoonBackground})`,
        backgroundSize: "cover",
        padding: 30,
        color: beigeColor,
      }}
    >
      <Container>
        <Typography
          color="beigeColor"
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "0px",
            marginBottom: "0",
            letterSpacing: "3px",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <strong>
            <strong style={{ color: primaryColor, fontFamily: "Montserrat" }}>
              30++ buku baru
            </strong>{" "}
            di bulan Oktober!
          </strong>
        </Typography>
        <Typography
          color="beigeColor"
          style={{ textAlign: "center" }}
          size="heading"
        >
          <strong style={{ color: primaryColor }}>Kilas Baru</strong> Yang Akan
          Datang!
        </Typography>

        <div style={{ marginTop: "20px" }} />
        {/* <Carousel
          arrows={false}
          showDots={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          ssr={true}
          responsive={responsive}
        > */}
        <Grid container justifyContent="center">
          {products
            .filter(
              (product) => product.category.includes("Coming Soon!") == true
            )
            .map((categorisedProduct, index) => (
              <ComingSoonCard
                imgSize={cards.imgBookComingSoon}
                chosenCategory={"Coming Soon!"}
                key={index}
                product={categorisedProduct}
              />
            ))}
        </Grid>
        {/* </Carousel> */}
      </Container>
    </div>
  );
}
