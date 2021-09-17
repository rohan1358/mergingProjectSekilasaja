import React, { useState, useEffect } from "react";

// Custom components
import Typography from "../../components/Typography";

// Material-UI components
import { Paper, CardActionArea, Grid, makeStyles } from "@material-ui/core";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  media: {
    width: 300,
  },
  details: {
    padding: "15px",
  },
  imgRounded: {
    borderRadius: "1px !important",
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  imgBookCover: {
    marginTop: "5px",
    width: "100%",
    maxWidth: "150px",
  },
});

export default function BookSearchResultCard({ product, title, history }) {
  const classes = useStyles();
  const [coverLink, setCoverLink] = useState("");

  console.log(product);
  useEffect(() => {
    if (title != null) {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(title);

      const fetchData = async () => {
        const link = await getLink;
        setCoverLink(link);
      };
      fetchData();
    }
  }, [product]);

  return (
    <Paper elevation={5} className={classes.root}>
      <CardActionArea
        className={classes.details}
        href={`/book-details/${product.book_title}`}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={8}>
            <Typography size="subheading">{title}</Typography>
            <Typography type="italic">{product.author}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.short_desc}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  );
}
