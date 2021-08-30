import React, { useState, useCallback, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectOwnedBooks, setOwnedBooks } from "../../feature/ownedBooksSlice";

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

export default function FavoriteBooksBlock(props) {
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const { history, ownedBookTitles } = props;

  const [isOwnedBookTitlesEmpty, setIsOwnedBookTitlesEmpty] = useState(false);
  const ownedBooks = useSelector(selectOwnedBooks);

  console.log(ownedBookTitles);

  useEffect(() => {
    //Get books' data from books database based on owned books of the user
    if (ownedBookTitles.length > 0) {
      db.collection("books")
        .where("book_title", "in", ownedBookTitles)
        .onSnapshot((snapshot) => {
          dispatch(
            setOwnedBooks(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
              }))
            )
          );
        });
    } else {
      setIsOwnedBookTitlesEmpty(true);
    }
  }, []);

  return (
    <div>
      {isOwnedBookTitlesEmpty ? (
        <Typography type="italic">Simpan buku favorit kamu di sini!</Typography>
      ) : (
        <div className={classes.title}>
          <Carousel
            autoPlay={true}
            autoPlaySpeed={1500}
            ssr={true}
            responsive={responsive}
          >
            {ownedBooks.map((product) => (
              <BookCard key={product.id} product={product} />
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}