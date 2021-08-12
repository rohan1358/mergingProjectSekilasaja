import React from "react";

// Custom components
import BookCard from "./BookCard";
import Typography from "./Typography";
import MultiUseMobile from "../styles/MultiUseMobile";

// Material-UI components
import { Grid } from "@material-ui/core";

export default function CategoryBlock(props) {
  const { products, onAdd, title } = props;
  const classes = MultiUseMobile();

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">{title}</Typography>
      </div>

      <div className={classes.sectionDesktop}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={3}
        >
          {products.map((product) => (
            <BookCard
              key={product.id}
              product={product}
              link={"/book-details"}
            />
          ))}
        </Grid>
      </div>

      <div className={classes.sectionMobile}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          {products.map((product) => (
            <BookCard
              key={product.id}
              product={product}
              link={"/book-details"}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}
