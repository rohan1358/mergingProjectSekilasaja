import React, { useState, useCallback, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import BookCardTest from "./BookCardTest";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CategoryBlockTest(props) {
  const classes = MultiUseMobile();
  const { products, onAdd } = props;

  console.log(products);

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">Duc and Dat Sexy</Typography>
      </div>
      <div>
          {products.map((product) => (<BookCardTest key={product.id} product={product} onAdd={onAdd} />))}
      </div>
    
    </div>
  );
}
