import React from "react";

// @material-ui/core components
import { makeStyles, Link } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";
import MultiUseMobile from "../styles/MultiUseMobile";

// nodejs library to set properties for components
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookCard(props) {
  const mobile = MultiUseMobile();
  const classes = useStyles();

  const mobileClass = classNames({
    [mobile.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [mobile.sectionDesktop]: true,
  });
  const { cover, title, author, description, link } = props;
  return (
    <div>
      <Link underline="none" href={link}>
        <div className={desktopClass}>
          <div className={classes.bookCover}>
            <div>
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
              <div className={classes.descriptionWrapper}>
                <Typography type="bold">{title}</Typography>
                <Typography type="italic">{author}</Typography>
                <Typography>{description}</Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={mobileClass}>
          <div className={classes.bookCover}>
            <div>
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
              <div className={classes.descriptionWrapper}>
                <Typography type="bold">{title}</Typography>
                <Typography type="italic">{author}</Typography>
                <Typography>{description}</Typography>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

BookCard.propTypes = {
  link: PropTypes.string,
  cover: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
