import React, { useState, useCallback, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";

// Material UI components
import { Grid } from "@material-ui/core";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavoriteBooks,
  setFavoriteBooks,
} from "../../feature/favoriteBooksSlice";

// Firebase components
import fire from "../../firebase/fire";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

const db = fire.firestore();

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

  return (
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

            <div className={classes.extraSpace} />

            <Typography size="subheading">Owned Books</Typography>
            <div>
              {products.filter(
                (product) => product.category.includes(chosenCategory) == true
              ).length !== 0 ? (
                <Grid container spacing={5}>
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
                <Typography type="italic">
                  Tidak ditemukan kilas di kategori ini!
                </Typography>
              )}
            </div>
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

            <div className={classes.extraSpace} />

            <Typography size="subheading">Owned Books</Typography>
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
                <Typography type="italic">
                  Tidak ditemukan kilas di kategori ini!
                </Typography>
              )}
            </div>
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

            <div className={classes.extraSpace} />

            <Typography size="subheading">Owned Books</Typography>
            <Grid container spacing={5}>
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

            <div className={classes.extraSpace} />

            <Typography size="subheading">Owned Books</Typography>
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
    </div>
  );
}
