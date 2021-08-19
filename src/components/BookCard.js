import React from "react";

// @material-ui/core components
import { makeStyles, Link, Grid, Card } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";

// nodejs library to set properties for components
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookCard(props) {
  const classes = useStyles();
  // const { link, product, onAdd } = props;
  const { link, product } = props;
    console.log(product);
  return (
    <Grid item>
      {/* <Link onClick={() => onAdd(product)} underline="none" href={link}> */}
      <Link underline="none" href={link}>
        <div className={classes.bookCover}>
          <div>
            <img
              src={product.bookCoverImageLink}
              alt={product.title}
              className={
                classes.imgRounded +
                " " +
                classes.imgFluid +
                " " +
                classes.imgBookCover
              }
            />
            <div className={classes.descriptionWrapper}>
              <Typography type="bold">{product.title}</Typography>
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
