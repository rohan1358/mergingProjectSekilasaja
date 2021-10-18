import React from "react";

// Custom components
import ComingSoonCard from "../../Home/ComingSoonCard";
import MultiUseMobile from "../../../styles/MultiUseMobile";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Material-UI components
import { Container, Grid } from "@material-ui/core";
import Typography from "../../../components/Typography";

// Images
const comingSoonHuman =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fcoming-soon-human.png?alt=media&token=97e35cd8-a05c-4bb3-9f35-b5d2f976e720";

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

export default function ComingSoonBlock({ products }) {
  // Styles
  const multi = MultiUseMobile();

  return (
    <Container>
      <Typography size="heading">
        <strong className={multi.underline}>30++ Kilas Baru</strong> Yang Akan
        Datang!
      </Typography>
      <div style={{ display: "flex" }}>
        <img
          style={{ maxWidth: 400, height: 400, width: "100%" }}
          src={comingSoonHuman}
        />
        <div>
          <Carousel
            arrows={false}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
            ssr={true}
            responsive={responsive}
          >
            {products
              .filter(
                (product) => product.category.includes("Coming Soon!") == true
              )
              .map((categorisedProduct, index) => (
                <ComingSoonCard
                  chosenCategory={"Coming Soon!"}
                  key={index}
                  product={categorisedProduct}
                  extraSpace={<div style={{ marginTop: "40px" }} />}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </Container>
  );
}
