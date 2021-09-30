import React, { useState, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";
import InfoStyle from "../../styles/InfoAreaStyle";
import ComingSoonCard from "../../pages/Home/ComingSoonCard";

// Material UI components
import { Grid, Container, makeStyles } from "@material-ui/core";

// Firebase components
import fire from "../../firebase/fire";

// Styles
const useInfoStyles = makeStyles(InfoStyle);

export default function SubscribedLibrary({ history }) {
  // Styles
  const classes = MultiUseMobile();
  const cards = useInfoStyles();

  // Auth
  const db = fire.firestore();

  // useState hooks
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
  }, []);

  return (
    <Container>
      <CategoryBarFilter
        chosenCategory={chosenCategory}
        setChosenCategory={setChosenCategory}
        setIsChosenCategory={setIsChosenCategory}
      />

      <div style={{ marginTop: "20px" }} />

      {isChosenCategory === true ? (
        <div>
          {chosenCategory === "Coming Soon!" ? (
            <div>
              <Typography style={{ textAlign: "center" }} size="heading">
                Coming Soon!
              </Typography>
              {products
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
            </div>
          ) : (
            <div>
              <Typography style={{ textAlign: "center" }} size="heading">
                Owned Books
              </Typography>
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
          )}
        </div>
      ) : (
        <div>
          <Typography style={{ textAlign: "center" }} size="heading">
            Owned Books
          </Typography>
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
      )}
    </Container>
  );
}
