import React from "react";

// Custom components
import BookCard from "./BookCard";
import Typography from "./Typography";
import MultiUseMobile from "../styles/MultiUseMobile";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

export default function CategoryBlock(props) {
  const { products, title } = props;
  const classes = MultiUseMobile();

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">{title}</Typography>
      </div>
      <Carousel ssr={true} responsive={responsive}>
        {products.map((product) => (
          <BookCard key={product.id} product={product} link={"/book-details"} />
        ))}
      </Carousel>
    </div>
    // <div>
    // <div className={classes.title}>
    //   <Typography size="heading">{title}</Typography>
    // </div>

    //   <div className={classes.sectionDesktop}>
    // <Grid
    //   container
    //   direction="row"
    //   justifyContent="space-around"
    //   alignItems="center"
    //   spacing={3}
    // >
    // {products.map((product) => (
    //   <BookCard
    //     key={product.id}
    //     product={product}
    //     link={"/book-details"}
    //   />
    // ))}
    //     </Grid>
    //   </div>

    //   <div className={classes.sectionMobile}>
    //     <Grid
    //       container
    //       direction="column"
    //       justifyContent="space-between"
    //       alignItems="center"
    //     >
    //       {products.map((product) => (
    //         <BookCard
    //           key={product.id}
    //           product={product}
    //           link={"/book-details"}
    //         />
    //       ))}
    //     </Grid>
    //   </div>
    // </div>
  );
}
