import React, { useState, useEffect, useContext } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import AllBooks from "./AllBooks";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectOwnedBooks, setOwnedBooks } from "../../feature/ownedBooksSlice";
import {
  selectFavoriteBooks,
  setFavoriteBooks,
} from "../../feature/favoriteBooksSlice";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

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

export default function OwnedBooksBlock(props) {
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const { history, ownedBookTitles, favoriteBookTitles } = props;

  const [isOwnedBookTitlesEmpty, setIsOwnedBookTitlesEmpty] = useState(false);
  const ownedBooks = useSelector(selectOwnedBooks);

  const [isFavoriteBookTitlesEmpty, setIsFavoriteBookTitlesEmpty] =
    useState(false);
  const favoriteBooks = useSelector(selectFavoriteBooks);

  const [chosenCategory, setChosenCategory] = useState("All");
  const [isChosenCategory, setIsChosenCategory] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setIsSubscribed(results.is_subscribed);
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  }, []);

  return (
    <div>
      {!!isSubscribed ? (
        <AllBooks favoriteBookTitles={favoriteBookTitles} />
      ) : (
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

              {isOwnedBookTitlesEmpty ? (
                <div>
                  <Typography size="subheading">Owned Books</Typography>
                  <Typography type="italic">
                    Kamu tidak memiliki kilas sama sekali. Berlanggan sekarang
                    untuk akses semua buku!
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography size="subheading">Owned Books</Typography>
                  <Carousel ssr={true} responsive={responsive}>
                    {ownedBooks
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

              {isOwnedBookTitlesEmpty ? (
                <div>
                  <Typography size="subheading">Owned Books</Typography>
                  <Typography type="italic">
                    Kamu tidak memiliki kilas sama sekali. Berlanggan sekarang
                    untuk akses semua buku!
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography size="subheading">Owned Books</Typography>
                  <Carousel ssr={true} responsive={responsive}>
                    {ownedBooks.map((product) => (
                      <BookCard key={product.id} product={product} />
                    ))}
                  </Carousel>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
