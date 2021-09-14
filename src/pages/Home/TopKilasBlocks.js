import React, { useEffect, useState } from "react";

// Material UI
import { Container, Paper, Grid, makeStyles } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import { beigeColor, primaryColor, secondaryColor } from "../../styles/Style";
import BookCard from "../../components/BookCard";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, setAllBooks } from "../../feature/allBooksSlice";

// Firebase component
import fire from "../../firebase/fire";

const useStyles = makeStyles(InfoAreaStyle);
const useTopStyles = makeStyles((theme) => ({
  kilasDesc: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    color: secondaryColor,
  },
  logo: {
    marginRight: "4px",
  },
}));

export default function TopKilasBlock({}) {
  // Auth
  const db = fire.firestore();

  // Styles
  const books = useStyles();
  const classes = useTopStyles();

  //For searching (Using the all books for searching)
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);

  // useState hooks
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );

      //Add dispatch to store all books info for searching
      if (allBooks.length < 1) {
        dispatch(
          setAllBooks(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          )
        );
      }
    });
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        {/* Kilas of the week */}
        <Grid item md={6} xs={12}>
          <Typography size="subheading" style={{ textAlign: "center" }}>
            Kilas Of The Week
          </Typography>
          <Paper
            style={{ backgroundColor: primaryColor, padding: 20 }}
            elevation={5}
          >
            <Grid container spacing={5} justifyContent="space-evenly">
              {products
                .filter((product) => product.category.includes("All") == true)
                .map((categorisedProduct, index) => (
                  <BookCard
                    chosenCategory={"All"}
                    key={index}
                    product={categorisedProduct}
                    extraSpace={<div style={{ marginTop: "20px" }} />}
                  />
                ))}
            </Grid>
          </Paper>
        </Grid>

        {/* New release */}
        <Grid item md={6} xs={12}>
          <Typography size="subheading" style={{ textAlign: "center" }}>
            New Release
          </Typography>
          <Paper
            style={{ backgroundColor: beigeColor, padding: 20 }}
            elevation={0}
          >
            <Grid container spacing={5} justifyContent="space-evenly">
              {products
                .filter((product) => product.category.includes("All") == true)
                .map((categorisedProduct, index) => (
                  <BookCard
                    chosenCategory={"All"}
                    key={index}
                    product={categorisedProduct}
                    extraSpace={<div style={{ marginTop: "20px" }} />}
                  />
                ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
