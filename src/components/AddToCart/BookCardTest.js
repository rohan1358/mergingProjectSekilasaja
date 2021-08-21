import React from "react";

import RdpdCover from "../../images/rdpd.jpg";

// @material-ui/core components
import { makeStyles, Link, Grid, Card } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Typography from "../Typography";

// nodejs library to set properties for components
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookCardTest({ product, onAdd }) {
  const classes = useStyles();
  // const { link, product, onAdd } = props;
  return (
    <Grid item>
      {/* <Link onClick={() => onAdd(product)} underline="none" href={link}> */}
      <Link underline="none" onClick={() => onAdd(product)}>
        <div className={classes.bookCover}>
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
              <Typography>Rp. {product.price}</Typography>
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );
}
