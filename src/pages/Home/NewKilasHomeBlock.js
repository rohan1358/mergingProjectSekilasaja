import React from "react";
import homeBG from "../../images/home3.jpg";

// Custom components
import NewKilasCard from "./NewKilasCard";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Firebase components
import fire from "../../firebase/fire";

const db = fire.firestore();

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

export default function NewKilasHomeBlock({ products }) {
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
        autoPlay={true}
        autoPlaySpeed={1500}
        ssr={true}
        responsive={responsive}
      >
        {products
          .filter(
            (product) => product.category.includes("New Release!") == true
          )
          .map((categorisedProduct, index) => (
            <NewKilasCard
              chosenCategory={"New Release!"}
              key={index}
              product={categorisedProduct}
            />
          ))}
      </Carousel>
    </div>
  );
}
