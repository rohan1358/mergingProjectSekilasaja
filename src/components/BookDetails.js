import React from "react";

// @material-ui/core components
import { makeStyles, Grid } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";
import MultiUseMobile from "../styles/MultiUseMobile";
import Button from "./Button";

// nodejs library to set properties for components
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookDetails(props) {
  const { cover, title, author, description, button1, button2, button3 } =
    props;

  const mobile = MultiUseMobile();
  const classes = useStyles();

  const mobileClass = classNames({
    [mobile.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [mobile.sectionDesktop]: true,
  });

  return (
    <div>
      <div className={desktopClass}>
        <Grid container>
          <Grid item xs={12}>
            <div className={mobile.extraSpace} />
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={2}>
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

          <Grid item xs={8}>
            <div className={classes.bookDetailsDesc}>
              <Typography size="subheading" type="bold">
                {title}
              </Typography>
              <Typography type="italic">{author}</Typography>
              <Typography>{description}</Typography>
              <div>
                <Button color="primary" round>
                  {button1}
                </Button>
              </div>

              <div>
                <Button color="primary" round>
                  {button2}
                </Button>
              </div>

              <div>
                <Button color="primary" round>
                  {button3}
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={12}>
            <div className={mobile.extraSpace} />
          </Grid>
        </Grid>
      </div>

      <div className={mobileClass}>
        <Grid container>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <div className={classes.bookDetailsDesc}>
              <Typography size="subheading" type="bold">
                {title}
              </Typography>
              <Typography type="italic">{author}</Typography>
              <Typography>{description}</Typography>
              <div>
                <Button color="primary" round>
                  {button1}
                </Button>
              </div>

              <div>
                <Button color="primary" round>
                  {button2}
                </Button>
              </div>

              <div>
                <Button color="primary" round>
                  {button3}
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={mobile.extraSpace} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

BookDetails.propTypes = {
  cover: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  button3: PropTypes.string.isRequired,
};
