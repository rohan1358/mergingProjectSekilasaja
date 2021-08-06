import React from "react";

// @material-ui/core components
import { makeStyles, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";
import MultiUseMobile from "../styles/MultiUseMobile";
import Button from "../components/Button";

// nodejs library to set properties for components
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function AddedToCardBooks(props) {
  const mobile = MultiUseMobile();
  const classes = useStyles();

  const { cover, title, price } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={5}>
          <img
            src={cover}
            className={
              classes.imgRounded +
              " " +
              classes.imgFluid +
              " " +
              classes.imgBookCover
            }
          />
        </Grid>

        <Grid item xs={1} />

        <Grid item xs={6}>
          <Typography type="bold">{title}</Typography>
          <Typography type="italic">{price}</Typography>
          <div className={mobile.extraSpace} />
          <Button color="secondary">
            <DeleteIcon /> Hapus
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

AddedToCardBooks.propTypes = {
  cover: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
