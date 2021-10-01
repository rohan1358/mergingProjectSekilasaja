import React, { useState, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";
import InfoStyles from "../../styles/InfoAreaStyle";
import Button from "../../components/Button";
import { secondaryColor } from "../../styles/Style";
import ComingSoonCard from "../../pages/Home/ComingSoonCard";

// Material UI components
import { Grid, makeStyles, Divider, CircularProgress } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectOwnedBooks, setOwnedBooks } from "../../feature/ownedBooksSlice";

// Firebase components
import fire from "../../firebase/fire";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

const useInfoStyles = makeStyles(InfoStyles);

export default function OwnedBooksBlock({
  ownedBookTitles,
  history,
  upsellBlock,
}) {
  // Styles
  const classes = MultiUseMobile();
  const cards = useInfoStyles();

  // Redux
  const dispatch = useDispatch();
  const ownedBooks = useSelector(selectOwnedBooks);

  // Auth
  const db = fire.firestore();

  // useState Hooks
  const [pending, setPending] = useState(true);
  const [isNotOwnedBooksEmpty, setIsNotOwnedBooksEmpty] = useState(false);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [isChosenCategory, setIsChosenCategory] = useState(false);
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
        const getBookData = async (book_title) => {
          const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
            book_title
          );
          return products_;
        };

        var book_ = [
          ...ownedBookTitles.map((book) => {
            return getBookData(book);
          }),
        ];

        var a = Promise.all(book_).then(function (book) {
          console.log("Finished setting owned books!");
          dispatch(setOwnedBooks(book));
          setPending(false);
        });
      };
      fetchData();
    } else {
      setPending(false);
    }
  }, []);

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

  if (pending) {
    return (
      <div
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          textAlign: "center",
        }}
      >
        <CircularProgress style={{ color: secondaryColor }} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <CategoryBarFilter
          chosenCategory={chosenCategory}
          setChosenCategory={setChosenCategory}
          setIsChosenCategory={setIsChosenCategory}
        />

        {/*---------------------------------------------------------------*/}
        {/*--------------------- OWNED BOOKS SECTION ---------------------*/}
        {/*---------------------------------------------------------------*/}

        {chosenCategory === "Coming Soon!" ? (
          <div>
            <Typography style={{ textAlign: "center" }} size="heading">
              Coming Soon!
            </Typography>

            <Grid container justifyContent={"center"} spacing={5}>
              {allBooks
                .filter(
                  (product) => product.category.includes("Coming Soon!") == true
                )
                .map((categorisedProduct, index) => (
                  <ComingSoonCard
                    notOwned={cards.notOwned}
                    chosenCategory={"Coming Soon!"}
                    key={index}
                    product={categorisedProduct}
                  />
                ))}
            </Grid>
          </div>
        ) : (
          <div>
            <div>
              {/* OWNED BOOKS DESKTOP */}
              {ownedBooks.length === 0 ? (
                <div>
                  <Typography style={{ textAlign: "center" }} size="heading">
                    Owned Books
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "25px",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    type="italic"
                  >
                    Kamu tidak memiliki kilas sama sekali. Berlanggan sekarang
                    untuk akses semua buku!
                  </Typography>
                </div>
              ) : (
                <div>
                  <div>
                    {ownedBooks.filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
                    ).length !== 0 ? (
                      <div>
                        <Typography
                          style={{ textAlign: "center" }}
                          size="heading"
                        >
                          Owned Books
                        </Typography>
                        <Grid container justifyContent={"center"} spacing={5}>
                          {ownedBooks
                            .filter(
                              (product) =>
                                product.category.includes(chosenCategory) ==
                                true
                            )
                            .map((categorisedProduct, index) => (
                              <BookCard
                                chosenCategory={chosenCategory}
                                coverTitle={categorisedProduct.book_title}
                                key={index}
                                product={categorisedProduct}
                              />
                            ))}
                        </Grid>
                      </div>
                    ) : (
                      <div>
                        <Typography
                          style={{ textAlign: "center" }}
                          size="heading"
                        >
                          Owned Books
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "25px",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                          type="italic"
                        >
                          Tidak ditemukan kilas di kategori ini!
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Divider style={{ marginTop: "20px" }} />

            {/*---------------------------------------------------------------*/}
            {/*---------------------- NOT OWNED SECTION ----------------------*/}
            {/*---------------------------------------------------------------*/}
            <div>
              {/* NOT OWNED BOOKS DESKTOP */}
              {isNotOwnedBooksEmpty ? (
                <div>
                  <Typography style={{ textAlign: "center" }} size="heading">
                    Not Owned Books
                  </Typography>
                  <div>{upsellBlock}</div>
                  <Typography
                    style={{
                      fontSize: "25px",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    type="italic"
                  >
                    Kamu telah memiliki semua kilas!
                  </Typography>
                </div>
              ) : (
                <div>
                  {booksNotOwned.filter(
                    (product) =>
                      product.category.includes(chosenCategory) == true
                  ).length !== 0 ? (
                    <div>
                      <Typography
                        style={{ textAlign: "center" }}
                        size="heading"
                      >
                        Not Owned Books
                      </Typography>

                      <div>{upsellBlock}</div>
                      <Grid container justifyContent={"center"} spacing={5}>
                        {booksNotOwned
                          .filter(
                            (product) =>
                              product.category.includes(chosenCategory) == true
                          )
                          .map((categorisedProduct, index) => (
                            <BookCard
                              notOwned={cards.notOwned}
                              chosenCategory={chosenCategory}
                              coverTitle={categorisedProduct.book_title}
                              key={index}
                              product={categorisedProduct}
                              buttonMobile={
                                <Button fullWidth round>
                                  <ShoppingCartIcon
                                    style={{ marginRight: "-0.5px" }}
                                    fontSize="small"
                                  />
                                </Button>
                              }
                              addedButtonMobile={
                                <Button round color="gray" fullWidth>
                                  ✔ Added
                                </Button>
                              }
                            />
                            // <BookCard
                            //   notOwned={cards.notOwned}
                            //   chosenCategory={chosenCategory}
                            //   coverTitle={categorisedProduct.book_title}
                            //   key={index}
                            //   product={categorisedProduct}
                            //   addedButton={
                            //     <Button
                            //       color="gray"
                            //       style={{
                            //         borderRadius: "100%",
                            //         paddingRight: "12px",
                            //         paddingLeft: "12px",
                            //       }}
                            //     >
                            //       ✔ Added
                            //     </Button>
                            //   }
                            //   button={
                            //     <Button
                            //       style={{
                            //         borderRadius: "100%",
                            //         paddingRight: "12px",
                            //         paddingLeft: "12px",
                            //       }}
                            //     >
                            //       <ShoppingCartIcon
                            //         style={{ marginRight: "-0.5px" }}
                            //         fontSize="small"
                            //       />
                            //     </Button>
                            //   }
                            // />
                          ))}
                      </Grid>
                    </div>
                  ) : (
                    <div>
                      <Typography
                        style={{ textAlign: "center" }}
                        size="heading"
                      >
                        Not Owned Books
                      </Typography>

                      <div>{upsellBlock}</div>
                      <Typography
                        style={{
                          fontSize: "25px",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                        type="italic"
                      >
                        Kamu memiliki semua kilas di kategori ini!
                      </Typography>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
