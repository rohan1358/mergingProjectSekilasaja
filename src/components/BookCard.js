import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, Link, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../firebase/firebaseGetBookCoverImageURL";
import fire from "../firebase/fire";

const useStyles = makeStyles(InfoAreaStyle);

const useHoverStyles = makeStyles((theme) => ({
  root: {
    "& .appear-item": {
      display: "none",
    },
    "&:hover .appear-item": {
      display: "block",
    },
  },
}));

export default function BookCard({
  product,
  chosenCategory,
  notOwned,
  button,
}) {
  const classes = useStyles();
  const hover = useHoverStyles();

  const db = fire.firestore();
  const [coverLink, setCoverLink] = useState("");
  const [products, SetProducts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      SetProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(
        product.book_title
      );
      const link = await getLink;

      if (link !== undefined) setCoverLink(link);
    };
    fetchData();
  }, [, chosenCategory]);

  return (
    <Grid
      className={classes.cardHover + " " + notOwned + " " + hover.root}
      item
    >
      <div className={classes.buttonHoverPos + " " + "appear-item"}>
        {button}
      </div>
      <Link
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        underline="none"
        href={`book-details/${product.book_title}`}
      >
        <div className={classes.bookCover}>
          <div>
            <img
              src={coverLink}
              alt={product.book_title}
              className={
                classes.imgRounded +
                " " +
                classes.imgFluid +
                " " +
                classes.imgBookCover
              }
            />
            <div className={classes.descriptionWrapper}>
              <Typography type="bold">{product.book_title}</Typography>
              <Typography type="italic">{product.author}</Typography>
              <Typography>{product.description}</Typography>
            </div>

            <div style={{ marginBottom: "0px" }} />
          </div>
        </div>
      </Link>
    </Grid>
  );
}
