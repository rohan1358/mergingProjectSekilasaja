import React, { useState, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";

// Material UI components
import {
  Grid,
  Tabs,
  Tab,
  Container,
  makeStyles,
  useTheme,
  Box,
  AppBar,
} from "@material-ui/core";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavoriteBooks,
  setFavoriteBooks,
} from "../../feature/favoriteBooksSlice";

// Firebase components
import fire from "../../firebase/fire";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

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
  }, []);

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
    <Container>
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
                  <LibraryAddCheckIcon style={{ marginRight: "5px" }} /> Owned
                  Books
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
                  <RemoveCircleOutlineIcon style={{ marginRight: "5px" }} /> Not
                  Owned
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

      <div style={{ marginTop: "20px" }} />

      {isChosenCategory === true ? (
        <div>
          <div className={classes.sectionDesktopBlock}>
            <Typography style={{ textAlign: "center" }} size="heading">
              Owned Books
            </Typography>
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
                            product.category.includes(chosenCategory) == true
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
            <div>
              {products.filter(
                (product) => product.category.includes(chosenCategory) == true
              ).length !== 0 ? (
                <Grid container justifyContent={"center"} spacing={5}>
                  {products
                    .filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
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
                  <Typography size="heading">Owned Books</Typography>
                  <Typography type="italic">
                    Tidak ditemukan kilas di kategori ini!
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className={classes.sectionMobileBlock}>
            <Typography size="heading">Owned Books</Typography>
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
                            product.category.includes(chosenCategory) == true
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
            <div>
              {products.filter(
                (product) => product.category.includes(chosenCategory) == true
              ).length !== 0 ? (
                <Grid container justifyContent="center" spacing={5}>
                  {products
                    .filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
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
                  <Typography size="heading">Owned Books</Typography>
                  <Typography type="italic">
                    Tidak ditemukan kilas di kategori ini!
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.sectionDesktopBlock}>
            <Typography style={{ textAlign: "center" }} size="heading">
              Owned Books
            </Typography>
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
            <Grid container justifyContent={"center"} spacing={5}>
              {products.map((product) => (
                <BookCard
                  chosenCategory={chosenCategory}
                  coverTitle={product.book_title}
                  key={product.id}
                  product={product}
                />
              ))}
            </Grid>
          </div>

          <div className={classes.sectionMobileBlock}>
            <Typography size="heading">Owned Books</Typography>
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
            <Grid container justifyContent="center" spacing={5}>
              {products.map((product) => (
                <BookCard
                  chosenCategory={chosenCategory}
                  coverTitle={product.book_title}
                  key={product.id}
                  product={product}
                />
              ))}
            </Grid>
          </div>
        </div>
      )}
      {/* </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div style={{ marginBottom: "50px" }} />
            <Typography
              style={{
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
              type="italic"
            >
              Kamu sudah berlanggan dan telah memiliki semua buku!
            </Typography>
            <div style={{ marginBottom: "50px" }} />
          </TabPanel>
        </SwipeableViews> */}
    </Container>
  );
}
