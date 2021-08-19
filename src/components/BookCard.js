import React from "react";

import RdpdCover from "../images/rdpd.jpg";

// @material-ui/core components
import { makeStyles, Link, Grid, Card } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";

// nodejs library to set properties for components
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookCard({product}) {
  const classes = useStyles();
  return (
    <Grid item>
      {/* <Link onClick={() => onAdd(product)} underline="none" href={link}> */}
      <Link  underline="none" href={`book-details/${product.book_title}`}>
        <div className={classes.bookCover} >
          <div>
            <img
              src={RdpdCover}
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

BookCard.propTypes = {
  link: PropTypes.string,
  cover: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
