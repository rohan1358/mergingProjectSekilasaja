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

  const [chosenCategory, setChosenCategory] = useState("All");
  const [isChosenCategory, setIsChosenCategory] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

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

  console.log(allBooks);

  console.log(ownedBooks);

  console.log(allBooks.filter((x) => !ownedBooks.includes(x)));

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
                {/* <Typography size="subheading">Not Owned</Typography>
                <div>
                  {allBooks.filter((product) => !ownedBooks.includes(product))}
                </div> */}
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
                        <BookCard key={product.id} product={product} />
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
                        <BookCard key={product.id} product={product} />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {/* <Typography size="subheading">Not Owned</Typography>
                {allBooks.filter((product) => !ownedBooks.includes(product))
                  .length !== 0 ? (
                  <Grid container spacing={1}>
                    {allBooks
                      .filter((product) => !ownedBooks.includes(product))
                      .map((categorisedProduct, index) => (
                        <BookCard key={index} product={categorisedProduct} />
                      ))}
                  </Grid>
                ) : (
                  <Typography type="italic">
                    Kamu telah memiliki semua kilas!
                  </Typography>
                )} */}
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
                        <BookCard key={product.id} product={product} />
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
                        <BookCard key={product.id} product={product} />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} />

                {/* <Typography size="subheading">Not Owned</Typography>
                {allBooks.filter((product) => !ownedBooks.includes(product))
                  .length !== 0 ? (
                  <Grid container justifyContent="center" spacing={1}>
                    {allBooks
                      .filter((product) => !ownedBooks.includes(product))
                      .map((categorisedProduct, index) => (
                        <BookCard key={index} product={categorisedProduct} />
                      ))}
                  </Grid>
                ) : (
                  <Typography type="italic">
                    Kamu telah memiliki semua kilas!
                  </Typography>
                )} */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
