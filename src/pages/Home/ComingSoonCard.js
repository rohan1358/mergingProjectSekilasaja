import React, { useState, useEffect, useContext } from "react";

// @material-ui/core components
import { makeStyles, Link, Grid } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Typography from "../../components/Typography";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";

const useStyles = makeStyles(InfoAreaStyle);

export default function ComingSoonCard({
  product,
  chosenCategory,
  notOwned,
  extraSpace,
}) {
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
    <Grid
      style={{ padding: 5 }}
      // className={notOwned}
      item
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
          {/* <div className={classes.descriptionWrapper}>
            <Typography type="bold">{product.book_title}</Typography>
            <Typography type="italic">{product.author}</Typography>
            <Typography>{product.short_desc}</Typography>
          </div> */}

          <div style={{ marginBottom: "0px" }} />
        </div>
      </div>
      {extraSpace}
    </Grid>
  );
}
