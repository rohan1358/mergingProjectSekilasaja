import React, { useState, useContext, useEffect } from "react";

// @material-ui/core components
import { makeStyles, Link, Grid } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";

// Firebase components
import { AuthContext } from "../components/Routing/Auth";
import * as firebaseGetBookCoverImageURL from "../firebase/firebaseGetBookCoverImageURL";
import fire from "../firebase/fire";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookCard({ product, coverTitle }) {
  const classes = useStyles();

  const db = fire.firestore();
  const { currentUser } = useContext(AuthContext);
  const [coverLink, setCoverLink] = useState("");
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      SetProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });

    if (coverTitle != null) {
      const getLink =
        firebaseGetBookCoverImageURL.getBookCoverImageURL(coverTitle);

      const fetchData = async () => {
        const link = await getLink;
        setCoverLink(link);
      };
      fetchData();
    }
  }, []);

  console.log(coverLink);

  return (
    <Grid item>
      <Link underline="none" href={`book-details/${product.book_title}`}>
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
          </div>
        </div>
      </Link>
    </Grid>
  );
}
