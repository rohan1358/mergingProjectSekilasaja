import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, Link, Grid } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Typography from "../../components/Typography";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";

const useStyles = makeStyles(InfoAreaStyle);

export default function NewBooksCardLibrary({ product, chosenCategory }) {
  // Styles
  const classes = useStyles();

  // useState hooks
  const [coverLink, setCoverLink] = useState("");

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
    <Grid item>
      <Link underline="none" href={`book-details/${product.book_title}`}>
        <div>
          <img
            src={coverLink}
            alt={product.book_title}
            className={
              classes.imgRounded +
              " " +
              classes.imgFluid +
              " " +
              classes.imgLibraryNewBook
            }
          />

          <div style={{ marginBottom: "0px" }} />
        </div>
      </Link>
    </Grid>
  );
}
