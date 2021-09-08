import React, { useState, useEffect, useContext } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import AllBooks from "./AllBooks";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";
import InfoStyles from "../../styles/InfoAreaStyle";
import Button from "../../components/Button";

// Material UI components
import {
  Grid,
  Tabs,
  Tab,
  Box,
  makeStyles,
  AppBar,
  useTheme,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectOwnedBooks, setOwnedBooks } from "../../feature/ownedBooksSlice";
import {
  selectFavoriteBooks,
  setFavoriteBooks,
} from "../../feature/favoriteBooksSlice";
import { selectCart, setCart } from "../../feature/cartSlice";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";

// Other
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import { primaryColor, secondaryColor } from "../../styles/Style";

const db = fire.firestore();

// Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const useInfoStyles = makeStyles(InfoStyles);

export default function OwnedBooksBlock(props) {
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const cards = useInfoStyles();

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
        const getBookData = async (book_title) => {
          const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
            book_title
          );
          return products_;
        };

        var book_ = [
          ...favoriteBookTitles.map((book) => {
            return getBookData(book);
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

  // Tabs
  const tabs = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      {!!isSubscribed ? (
        <AllBooks favoriteBookTitles={favoriteBookTitles} />
      ) : (
        <div>
          {/* <div className={tabs.root}> */}
          {/* <AppBar position="static" color="default">
              <Tabs
                style={{ color: secondaryColor }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: primaryColor,
                    height: "5px",
                  },
                }}
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "17px",
                      }}
                    >
                      <LibraryAddCheckIcon style={{ marginRight: "5px" }} />{" "}
                      Owned
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "17px",
                      }}
                    >
                      <RemoveCircleOutlineIcon style={{ marginRight: "5px" }} />{" "}
                      Not Owned
                    </div>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar> */}
          {/* <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}> */}
          <CategoryBarFilter
            chosenCategory={chosenCategory}
            setChosenCategory={setChosenCategory}
            setIsChosenCategory={setIsChosenCategory}
          />
          {/* <div className={classes.extraSpace} /> */}

          {isChosenCategory === true ? (
            <div>
              <div className={classes.sectionDesktopBlock}>
                {/* FAVORITE BOOKS DESKTOP */}
                {/* {isFavoriteBookTitlesEmpty ? (
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
                        <Grid container spacing={5}>
                          {favoriteBooks
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
                      ) : (
                        <Typography type="italic">
                          Kilas favorit kamu tidak ditemukan di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {/* OWNED BOOKS DESKTOP */}
                {isOwnedBookTitlesEmpty ? (
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

              <div className={classes.sectionMobileBlock}>
                {/* FAVORITE BOOKS MOBILE */}
                {/* {isFavoriteBookTitlesEmpty ? (
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
                        <Grid container justifyContent="center" spacing={5}>
                          {favoriteBooks
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
                      ) : (
                        <Typography type="italic">
                          Kilas favorit kamu tidak ditemukan di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {/* OWNED BOOKS MOBILE */}
                {isOwnedBookTitlesEmpty ? (
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
                    <Grid container justifyContent="center" spacing={5}>
                      <Typography
                        style={{ textAlign: "center" }}
                        size="heading"
                      >
                        Owned Books
                      </Typography>
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
                          {ownedBooks.filter(
                            (product) =>
                              product.category.includes(chosenCategory) == true
                          ).length !== 0 ? (
                            <Grid container justifyContent="center" spacing={5}>
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
                                Kamu tidak memiliki kilas di dalam kategori ini!
                              </Typography>
                            </div>
                          )}
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
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.sectionDesktopBlock}>
                {/* {isFavoriteBookTitlesEmpty ? (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Typography type="italic">
                      Kamu tidak memiliki kilas favorit sama sekali!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Grid container spacing={5}>
                      {favoriteBooks.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {isOwnedBookTitlesEmpty ? (
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
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Owned Books
                    </Typography>
                    <Grid container justifyContent={"center"} spacing={5}>
                      {ownedBooks.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}
              </div>

              <div className={classes.sectionMobileBlock}>
                {/* {isFavoriteBookTitlesEmpty ? (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Typography type="italic">
                      Kamu tidak memiliki kilas favorit sama sekali!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Grid container justifyContent="center" spacing={5}>
                      {favoriteBooks.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {isOwnedBookTitlesEmpty ? (
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
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Owned Books
                    </Typography>
                    <Grid container justifyContent="center" spacing={5}>
                      {ownedBooks.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
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
          {/* </TabPanel> */}

          {/* <TabPanel value={value} index={1} dir={theme.direction}> */}
          {/* <CategoryBarFilter
                  chosenCategory={chosenCategory}
                  setChosenCategory={setChosenCategory}
                  setIsChosenCategory={setIsChosenCategory}
                /> */}
          {/* <div className={classes.extraSpace} /> */}

          {isChosenCategory === true ? (
            <div>
              <div className={classes.sectionDesktopBlock}>
                {/* FAVORITE BOOKS DESKTOP */}
                {/* {isFavoriteBookTitlesEmpty ? (
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
                        <Grid container spacing={5}>
                          {favoriteBooks
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
                      ) : (
                        <Typography type="italic">
                          Kilas favorit kamu tidak ditemukan di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}
                <Divider style={{ marginTop: "20px" }} />
                {/* NOT OWNED BOOKS DESKTOP */}
                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
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
                        <Grid container justifyContent={"center"} spacing={5}>
                          {booksNotOwned
                            .filter(
                              (product) =>
                                product.category.includes(chosenCategory) ==
                                true
                            )
                            .map((categorisedProduct, index) => (
                              <BookCard
                                notOwned={cards.notOwned}
                                chosenCategory={chosenCategory}
                                coverTitle={categorisedProduct.book_title}
                                key={index}
                                product={categorisedProduct}
                                addedButton={
                                  <Button
                                    color="gray"
                                    style={{
                                      borderRadius: "100%",
                                      paddingRight: "12px",
                                      paddingLeft: "12px",
                                    }}
                                  >
                                    ✔ Added
                                  </Button>
                                }
                                button={
                                  <Button
                                    style={{
                                      borderRadius: "100%",
                                      paddingRight: "12px",
                                      paddingLeft: "12px",
                                    }}
                                  >
                                    <ShoppingCartIcon
                                      style={{ marginRight: "-0.5px" }}
                                      fontSize="small"
                                    />
                                  </Button>
                                }
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
                          Not Owned Books
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
                          Kamu memiliki semua kilas di kategori ini!
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={classes.sectionMobileBlock}>
                {/* FAVORITE BOOKS MOBILE */}
                {/* {isFavoriteBookTitlesEmpty ? (
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
                        <Grid container justifyContent="center" spacing={5}>
                          {favoriteBooks
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
                      ) : (
                        <Typography type="italic">
                          Kilas favorit kamu tidak ditemukan di kategori ini!
                        </Typography>
                      )}
                    </div>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {/* NOT OWNED BOOKS MOBILE */}
                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
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
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
                    </Typography>
                    {booksNotOwned.filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
                    ).length !== 0 ? (
                      <div>
                        <Grid container justifyContent="center" spacing={5}>
                          {booksNotOwned
                            .filter(
                              (product) =>
                                product.category.includes(chosenCategory) ==
                                true
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
          ) : (
            <div>
              <div className={classes.sectionDesktopBlock}>
                {/* {isFavoriteBookTitlesEmpty ? (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Typography type="italic">
                      Kamu tidak memiliki kilas favorit sama sekali!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Grid container spacing={5}>
                      {favoriteBooks.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
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
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
                    </Typography>
                    <Grid container justifyContent={"center"} spacing={5}>
                      {booksNotOwned.map((product) => (
                        <BookCard
                          addedButton={
                            <Button
                              color="gray"
                              style={{
                                borderRadius: "100%",
                                paddingRight: "12px",
                                paddingLeft: "12px",
                              }}
                            >
                              ✔ Added
                            </Button>
                          }
                          button={
                            <Button
                              style={{
                                borderRadius: "100%",
                                paddingRight: "12px",
                                paddingLeft: "12px",
                              }}
                            >
                              <ShoppingCartIcon
                                style={{ marginRight: "-0.5px" }}
                                fontSize="small"
                              />
                            </Button>
                          }
                          notOwned={cards.notOwned}
                          chosenCategory={chosenCategory}
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
                {/* {isFavoriteBookTitlesEmpty ? (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Typography type="italic">
                      Kamu tidak memiliki kilas favorit sama sekali!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography size="subheading">Favorite Books</Typography>
                    <Grid container justifyContent="center" spacing={5}>
                      {favoriteBooks.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </Grid>
                  </div>
                )}

                <div className={classes.extraSpace} /> */}

                {isNotOwnedBooksEmpty ? (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
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
                      Kamu telah memiliki semua kilas!
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography style={{ textAlign: "center" }} size="heading">
                      Not Owned Books
                    </Typography>
                    <Grid container justifyContent="center" spacing={5}>
                      {booksNotOwned.map((product) => (
                        <BookCard
                          chosenCategory={chosenCategory}
                          coverTitle={product.book_title}
                          key={product.id}
                          product={product}
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
                      ))}
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* </TabPanel>
            </SwipeableViews>
          </div> */}
        </div>
      )}
    </div>
  );
}
