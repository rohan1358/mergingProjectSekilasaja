import React, { useState, useEffect } from "react";

// Custom components
import BookCard from "../../../components/BookCard";
import Typography from "../../../components/Typography";
import MultiUseMobile from "../../../styles/MultiUseMobile";
import CategoryBarFilter from "../../../components/CategoryBarFilter/CategoryBarFilter";
import ComingSoonCard from "../../Home/ComingSoonCard";
import InfoStyles from "../../../styles/InfoAreaStyle";
import Loading from "../../Utilities/Loading";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, setAllBooks } from "../../../feature/allBooksSlice";

// Firebase components
import fire from "../../../firebase/fire";

// Material UI components
import { makeStyles, Container } from "@material-ui/core";

// Styles
const useInfoStyles = makeStyles(InfoStyles);

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

export default function CategoryBlock({ title, history }) {
  // Auth
  const db = fire.firestore();

  // Styles
  const classes = MultiUseMobile();
  const cards = useInfoStyles();

  //For searching (Using the all books for searching)
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);

  // useState hooks
  const [chosenCategory, setChosenCategory] = useState("All");
  const [isChosenCategory, setIsChosenCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );

      //Add dispatch to store all books info for searching
      if (allBooks.length < 1) {
        dispatch(
          setAllBooks(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          )
        );
      }
    });

    return function cleanup() {
      setProducts([]);
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
    <Container>
      <Typography size="heading">
        Temukan{" "}
        <strong className={classes.underline}>Kategori Favoritmu!</strong>
      </Typography>

      <CategoryBarFilter
        chosenCategory={chosenCategory}
        setChosenCategory={setChosenCategory}
        setIsChosenCategory={setIsChosenCategory}
      ></CategoryBarFilter>
      <div style={{ marginTop: "20px" }} />
      {chosenCategory === "Coming Soon!" ? (
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
      ) : (
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
                (product) => product.category.includes(chosenCategory) == true
              )
              .map((categorisedProduct, index) => (
                <BookCard
                  chosenCategory={chosenCategory}
                  key={index}
                  product={categorisedProduct}
                  extraSpace={<div style={{ marginTop: "20px" }} />}
                />
              ))}
          </Carousel>
        </div>
      )}
    </Container>
  );
}
