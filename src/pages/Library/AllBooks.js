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

  return (
    <div>
      <CategoryBarFilter
        chosenCategory={chosenCategory}
        setChosenCategory={setChosenCategory}
        setIsChosenCategory={setIsChosenCategory}
      ></CategoryBarFilter>

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
                <Grid container spacing={1}>
                  {favoriteBooks.filter(
                    (product) =>
                      product.category.includes(chosenCategory) == true
                  ).length !== 0 ? (
                    <div>
                      {favoriteBooks
                        .filter(
                          (product) =>
                            product.category.includes(chosenCategory) == true
                        )
                        .map((categorisedProduct, index) => (
                          <BookCard key={index} product={categorisedProduct} />
                        ))}
                    </div>
                  ) : (
                    <Typography type="italic">
                      Kilas favorit kamu tidak ada di kategori ini!
                    </Typography>
                  )}
                </Grid>
              </div>
            )}

            <div className={classes.extraSpace} />

            <Typography size="subheading">Owned Books</Typography>
            <div>
              {products.filter(
                (product) => product.category.includes(chosenCategory) == true
              ).length !== 0 ? (
                <Grid container spacing={1}>
                  {products.filter(
                    (product) =>
                      product.category.includes(chosenCategory) == true
                  ).length !== 0 ? (
                    <div>
                      {products
                        .filter(
                          (product) =>
                            product.category.includes(chosenCategory) == true
                        )
                        .map((categorisedProduct, index) => (
                          <BookCard key={index} product={categorisedProduct} />
                        ))}
                    </div>
                  ) : (
                    <Typography type="italic">
                      Kilas favorit kamu tidak ada di kategori ini!
                    </Typography>
                  )}
                </Grid>
              ) : (
                <Typography type="italic">
                  Kilas favorit kamu tidak ada di kategori ini!
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
                <Grid container justifyContent="center" spacing={1}>
                  {favoriteBooks.filter(
                    (product) =>
                      product.category.includes(chosenCategory) == true
                  ).length !== 0 ? (
                    <div>
                      {favoriteBooks
                        .filter(
                          (product) =>
                            product.category.includes(chosenCategory) == true
                        )
                        .map((categorisedProduct, index) => (
                          <BookCard key={index} product={categorisedProduct} />
                        ))}
                    </div>
                  ) : (
                    <Typography type="italic">
                      Kilas favorit kamu tidak ada di kategori ini!
                    </Typography>
                  )}
                </Grid>
              </div>
            )}
            <div className={classes.extraSpace} />
            <Typography size="subheading">Owned Books</Typography>
            <Grid container justifyContent="center" spacing={1}>
              {products.filter(
                (product) => product.category.includes(chosenCategory) == true
              ).length !== 0 ? (
                <div>
                  {products
                    .filter(
                      (product) =>
                        product.category.includes(chosenCategory) == true
                    )
                    .map((categorisedProduct, index) => (
                      <BookCard key={index} product={categorisedProduct} />
                    ))}
                </div>
              ) : (
                <Typography type="italic">
                  Kilas favorit kamu tidak ada di kategori ini!
                </Typography>
              )}
            </Grid>
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

            <Typography size="subheading">Owned Books</Typography>
            <Grid container spacing={1}>
              {products.map((product) => (
                <BookCard key={product.id} product={product} />
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
                <Grid container justifyContent="center" spacing={1}>
                  {favoriteBooks.map((product) => (
                    <BookCard key={product.id} product={product} />
                  ))}
                </Grid>
              </div>
            )}

            <div className={classes.extraSpace} />

            <Typography size="subheading">Owned Books</Typography>
            <Grid container spacing={1}>
              {products.map((product) => (
                <BookCard key={product.id} product={product} />
              ))}
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}
