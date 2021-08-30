import React, { useState, useEffect, useContext } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import AllBooks from "./AllBooks";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";

// Material UI components
import { Grid } from "@material-ui/core";

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
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

const db = fire.firestore();

export default function OwnedBooksBlock(props) {
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const { history, ownedBookTitles, favoriteBookTitles } = props;

  const [isOwnedBookTitlesEmpty, setIsOwnedBookTitlesEmpty] = useState(false);
  const ownedBooks = useSelector(selectOwnedBooks);

  const [isFavoriteBookTitlesEmpty, setIsFavoriteBookTitlesEmpty] =
    useState(false);
  const favoriteBooks = useSelector(selectFavoriteBooks);

  const [isNotOwnedBooksEmpty, setIsNotOwnedBooksEmpty] = useState(false);

  const [chosenCategory, setChosenCategory] = useState("All");
  const [isChosenCategory, setIsChosenCategory] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [booksNotOwned, setBooksNotOwned] = useState([]);

  useEffect(() => {
    // Get books
    db.collection("books").onSnapshot((snapshot) => {
      setAllBooks(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });

    //Get books' data from books database based on owned books of the user
    if (ownedBookTitles.length > 0) {
      const fetchData = () => {
        const getCartData = async (book_title) => {
          const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
            book_title
          );
          return products_;
        };

        var book_ = [
          ...ownedBookTitles.map((book) => {
            return getCartData(book);
          }),
        ];

        var a = Promise.all(book_).then(function (book) {
          dispatch(setOwnedBooks(book));
        });
      };
      fetchData();
    } else {
      setIsOwnedBookTitlesEmpty(true);
    }

    //Get books' data from books database based on favorite books of the user
    if (favoriteBookTitles.length > 0) {
      const fetchData = () => {
        const getCartData = async (book_title) => {
          const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
            book_title
          );
          return products_;
        };

        var book_ = [
          ...favoriteBookTitles.map((book) => {
            return getCartData(book);
          }),
        ];

        var a = Promise.all(book_).then(function (book) {
          dispatch(setFavoriteBooks(book));
        });
      };
      fetchData();
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
  console.log(ownedBooks);
  useEffect(() => {
    // Filtering not owned books
    var a = [],
      diff = [],
      notOwned = [];

    for (var i = 0; i < allBooks.length; i++) {
      a[allBooks[i].book_title] = true;
    }

    for (var i = 0; i < ownedBooks.length; i++) {
      if (a[ownedBooks[i].book_title]) {
        delete a[ownedBooks[i].book_title];
      } else {
        a[ownedBooks[i].book_title] = true;
      }
    }

    for (var k in a) {
      diff.push(k);
    }

    for (var i = 0; i < allBooks.length; i++) {
      for (var j = 0; j < diff.length; j++) {
        if (diff[j] === allBooks[i].book_title) {
          notOwned = [...notOwned, allBooks[i]];
        }
      }
    }

    setBooksNotOwned(notOwned);

    if (notOwned.length <= 0) {
      setIsNotOwnedBooksEmpty(true);
    } else {
      setIsNotOwnedBooksEmpty(false);
    }
  }, [allBooks, ownedBooks]);

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
          />

          <div className={classes.extraSpace} />

          {isChosenCategory === true ? (
            <div>
              <div className={classes.sectionBlock}>
                {/* FAVORITE BOOKS DESKTOP */}
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
                    <div>
                      {favoriteBooks.filter(
                        (product) =>
                          product.category.includes(chosenCategory) == true
                      ).length !== 0 ? (
                        <Grid container spacing={1}>
                          {favoriteBooks
                            .filter(
                              (product) =>
                                product.category.includes(chosenCategory) ==
                                true
                            )
                            .map((categorisedProduct, index) => (
                              <BookCard
                                coverTitle={categorisedProduct.book_title}
                                key={index}
                                product={categorisedProduct}
                              />
                            ))}
                        </Grid>
                      ) : (
                        <Typography type="italic">
                          Kilas favorit kamu tidak ditemukan di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {/* OWNED BOOKS DESKTOP */}
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
                    <div>
                      {ownedBooks.filter(
                        (product) =>
                          product.category.includes(chosenCategory) == true
                      ).length !== 0 ? (
                        <Grid container spacing={1}>
                          {ownedBooks
                            .filter(
                              (product) =>
                                product.category.includes(chosenCategory) ==
                                true
                            )
                            .map((categorisedProduct, index) => (
                              <BookCard
                                coverTitle={categorisedProduct.book_title}
                                key={index}
                                product={categorisedProduct}
                              />
                            ))}
                        </Grid>
                      ) : (
                        <Typography type="italic">
                          Tidak ditemukan kilas di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {/* NOT OWNED BOOKS DESKTOP */}
                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    <Typography type="italic">
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    {booksNotOwned.filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
                    ).length !== 0 ? (
                      <Grid container spacing={1}>
                        {booksNotOwned
                          .filter(
                            (product) =>
                              product.category.includes(chosenCategory) == true
                          )
                          .map((categorisedProduct, index) => (
                            <BookCard
                              coverTitle={categorisedProduct.book_title}
                              key={index}
                              product={categorisedProduct}
                            />
                          ))}
                      </Grid>
                    ) : (
                      <Typography type="italic">
                        Kamu memiliki semua kilas di kategori ini!
                      </Typography>
                    )}
                  </div>
                )}
              </div>

              <div className={classes.sectionMobileBlock}>
                {/* FAVORITE BOOKS MOBILE */}
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
                    <div>
                      {favoriteBooks.filter(
                        (product) =>
                          product.category.includes(chosenCategory) == true
                      ).length !== 0 ? (
                        <Grid container justifyContent="center" spacing={1}>
                          {favoriteBooks
                            .filter(
                              (product) =>
                                product.category.includes(chosenCategory) ==
                                true
                            )
                            .map((categorisedProduct, index) => (
                              <BookCard
                                coverTitle={categorisedProduct.book_title}
                                key={index}
                                product={categorisedProduct}
                              />
                            ))}
                        </Grid>
                      ) : (
                        <Typography type="italic">
                          Kilas favorit kamu tidak ditemukan di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {/* OWNED BOOKS MOBILE */}
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
                    <Grid container justifyContent="center" spacing={1}>
                      {ownedBooks.filter(
                        (product) =>
                          product.category.includes(chosenCategory) == true
                      ).length !== 0 ? (
                        <div>
                          {ownedBooks.filter(
                            (product) =>
                              product.category.includes(chosenCategory) == true
                          ).length !== 0 ? (
                            <Grid container justifyContent="center" spacing={1}>
                              {ownedBooks
                                .filter(
                                  (product) =>
                                    product.category.includes(chosenCategory) ==
                                    true
                                )
                                .map((categorisedProduct, index) => (
                                  <BookCard
                                    coverTitle={categorisedProduct.book_title}
                                    key={index}
                                    product={categorisedProduct}
                                  />
                                ))}
                            </Grid>
                          ) : (
                            <Typography type="italic">
                              Kamu tidak memiliki kilas di dalam kategori ini!
                            </Typography>
                          )}
                        </div>
                      ) : (
                        <Typography type="italic">
                          Tidak ditemukan kilas di kategori ini!
                        </Typography>
                      )}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />
                {/* NOT OWNED BOOKS MOBILE */}
                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    <Typography type="italic">
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    {booksNotOwned.filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
                    ).length !== 0 ? (
                      <Grid container justifyContent="center" spacing={1}>
                        {booksNotOwned
                          .filter(
                            (product) =>
                              product.category.includes(chosenCategory) == true
                          )
                          .map((categorisedProduct, index) => (
                            <BookCard
                              coverTitle={categorisedProduct.book_title}
                              key={index}
                              product={categorisedProduct}
                            />
                          ))}
                      </Grid>
                    ) : (
                      <Typography type="italic">
                        Kamu memiliki semua kilas di kategori ini!
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.sectionDesktopBlock}>
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
                    <Grid container spacing={1}>
                      {favoriteBooks.map((product) => (
                        <BookCard
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />

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
                    <Grid container spacing={1}>
                      {ownedBooks.map((product) => (
                        <BookCard
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    <Typography type="italic">
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    <Grid container spacing={1}>
                      {booksNotOwned.map((product) => (
                        <BookCard
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />
              </div>

              <div className={classes.sectionMobileBlock}>
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
                    <Grid container justifyContent="center" spacing={1}>
                      {favoriteBooks.map((product) => (
                        <BookCard
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />

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
                    <Grid container justifyContent="center" spacing={1}>
                      {ownedBooks.map((product) => (
                        <BookCard
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    <Typography type="italic">
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Not Owned Books</Typography>
                    <Grid container justifyContent="center" spacing={1}>
                      {booksNotOwned.map((product) => (
                        <BookCard
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
