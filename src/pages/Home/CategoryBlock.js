import React, { useState, useCallback, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";
// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectBook, setBook } from "../../feature/bookSlice";

//Import firebase function to get books based on filter
import * as firebaseGetBooksByCategory from "../.././firebase/firebaseGetBooksByCategory.js";

// Firebase components
import fire from "../../firebase/fire";

const db = fire.firestore();

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
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const { title, history } = props;
  const [chosenCategory, setChosenCategory] = useState("All");

  // Check if the user has chosen a category or not
  const [isChosenCategory, setIsChosenCategory] = useState(false);

  const products = useSelector(selectBook);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      dispatch(
        setBook(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        )
      );
    });
  }, []);

  console.log(products);

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">{title}</Typography>
      </div>
      <CategoryBarFilter
        chosenCategory={chosenCategory}
        setChosenCategory={setChosenCategory}
        setIsChosenCategory={setIsChosenCategory}
      ></CategoryBarFilter>
      {isChosenCategory === true ? (
        <Carousel
          autoPlay={true}
          autoPlaySpeed={1500}
          ssr={true}
          responsive={responsive}
        >
          {products
            .filter(
              (product) => product.category.includes(chosenCategory) == true
            )
            .map((categorisedProduct, index) => (
              <BookCard key={index} product={categorisedProduct} />
            ))}
        </Carousel>
      ) : (
        <Carousel
          autoPlay={true}
          autoPlaySpeed={1500}
          ssr={true}
          responsive={responsive}
        >
          {products.map((product) => (
            <BookCard key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </div>
  );
}
