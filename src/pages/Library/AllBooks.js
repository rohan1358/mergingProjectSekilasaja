import React, { useState, useCallback, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavoriteBooks,
  setFavoriteBooks,
} from "../../feature/favoriteBooksSlice";

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

  const { favoriteBookTitles, history } = props;
  const [isFavoriteBookTitlesEmpty, setIsFavoriteBookTitlesEmpty] =
    useState(false);
  const favoriteBooks = useSelector(selectFavoriteBooks);

  // Check if the user has chosen a category or not
  const [chosenCategory, setChosenCategory] = useState("All");
  const [isChosenCategory, setIsChosenCategory] = useState(false);
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      SetProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });

    //Get books' data from books database based on favorite books of the user
    if (favoriteBookTitles.length > 0) {
      db.collection("books")
        .where("book_title", "in", favoriteBookTitles)
        .onSnapshot((snapshot) => {
          dispatch(
            setFavoriteBooks(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
              }))
            )
          );
        });
    } else {
      setIsFavoriteBookTitlesEmpty(true);
    }
  }, []);

  console.log(products);

  return (
    <div>
      <CategoryBarFilter
        chosenCategory={chosenCategory}
        setChosenCategory={setChosenCategory}
        setIsChosenCategory={setIsChosenCategory}
      ></CategoryBarFilter>

      {isChosenCategory === true ? (
        <div>
          {isFavoriteBookTitlesEmpty ? (
            <div>
              <Typography size="subheading">Favorite Books</Typography>
              <Typography type="italic">
                Kamu tidak memiliki kilas favorit sama sekali!
              </Typography>
            </div>
          ) : (
            <div>
              <Typography size="subheading">Favorite Books</Typography>
              <Carousel ssr={true} responsive={responsive}>
                {favoriteBooks
                  .filter(
                    (product) =>
                      product.category.includes(chosenCategory) == true
                  )
                  .map((categorisedProduct, index) => (
                    <BookCard key={index} product={categorisedProduct} />
                  ))}
              </Carousel>
            </div>
          )}

          <Typography size="subheading">Owned Books</Typography>
          <Carousel ssr={true} responsive={responsive}>
            {products
              .filter(
                (product) => product.category.includes(chosenCategory) == true
              )
              .map((categorisedProduct, index) => (
                <BookCard key={index} product={categorisedProduct} />
              ))}
          </Carousel>
        </div>
      ) : (
        <div>
          {isFavoriteBookTitlesEmpty ? (
            <div>
              <Typography size="subheading">Favorite Books</Typography>
              <Typography type="italic">
                Kamu tidak memiliki kilas favorit sama sekali!
              </Typography>
            </div>
          ) : (
            <div>
              <Typography size="subheading">Favorite Books</Typography>
              <Carousel ssr={true} responsive={responsive}>
                {favoriteBooks.map((product) => (
                  <BookCard key={product.id} product={product} />
                ))}
              </Carousel>
            </div>
          )}

          <Typography size="subheading">Owned Books</Typography>
          <Carousel ssr={true} responsive={responsive}>
            {products.map((product) => (
              <BookCard key={product.id} product={product} />
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
