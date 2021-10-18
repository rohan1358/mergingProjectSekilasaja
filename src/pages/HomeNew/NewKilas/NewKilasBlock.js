import React from "react";

// Custom components
import NewKilas from "./NewKilas";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Images
const homeBG =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fcoming-soon.png?alt=media&token=c6a47889-cc24-4cab-9d84-ff6106ec7c19";

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

export default function NewKilasBlock({ products }) {
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
            <NewKilas
              chosenCategory={"New Release!"}
              key={index}
              product={categorisedProduct}
            />
          ))}
      </Carousel>
    </div>
  );
}
