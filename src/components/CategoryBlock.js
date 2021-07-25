import React from "react";
import BookCover from "../images/rdpd.jpg";

// @material-ui/core components
import { Grid } from "@material-ui/core";

// Custom components
import BookCard from "./BookCard";
import MultiUseMobile from "../styles/MultiUseMobile";
import Typography from "./Typography";

// nodejs library to set properties for components
import classNames from "classnames";
import PropTypes from "prop-types";

export default function CategoryBlock(props) {
  const { heading } = props;
  const classes = MultiUseMobile();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">{heading}</Typography>
      </div>

      <div>
        <Grid container spacing={3}>
          <BookCard
            cover={BookCover}
            title={"Rich Dad Poor Dad"}
            author={"Robert Kiyosaki"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
            }
          />
        </Grid>
      </div>
    </div>
  );
}

CategoryBlock.propTypes = {
  heading: PropTypes.string,
};
