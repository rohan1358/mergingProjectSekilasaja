import React from "react";

// @material-ui/core components
import { makeStyles, Grid, Divider } from "@material-ui/core";
import { Timelapse, EmojiObjects, PlayArrow } from "@material-ui/icons";

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
  const { cover, title, author, description, descriptionTitle, time, num } =
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

          <Grid item xs={8}>
            <div className={classes.bookDetailsDesc}>
              <Typography size="subheading" type="bold">
                {title}
              </Typography>

              <Typography type="italic">{author}</Typography>

              <Divider />

              <div className={classes.kilasDesc}>
                <div className={classes.kilasDesc}>
                  <Timelapse className={classes.logo} />
                  <Typography type="bold">{time} Menit</Typography>
                </div>

                <div className={classes.kilasDesc}>
                  <EmojiObjects className={classes.logo} />
                  <Typography type="bold">{num} Kilas</Typography>
                </div>

                <div className={classes.kilasDesc}>
                  <PlayArrow className={classes.logo} />
                  <Typography type="bold">Video, audio, & text</Typography>
                </div>
              </div>

              <Divider />

              <Typography type="bold">{descriptionTitle}</Typography>
              <Typography>{description}</Typography>
            </div>
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={3}>
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
            <div className={mobile.extraSpace} />
          </Grid>
        </Grid>
      </div>

      <div className={mobileClass}>
        <Grid container>
          <Grid item xs={12}>
            <div className={mobile.extraSpace} />
          </Grid>

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

              <Divider />

              <div className={classes.kilasDescMobile}>
                <div className={classes.kilasDesc}>
                  <Timelapse className={classes.logo} />
                  <Typography type="bold">{time} Menit</Typography>
                </div>

                <div className={classes.kilasDesc}>
                  <EmojiObjects className={classes.logo} />
                  <Typography type="bold">{num} Kilas</Typography>
                </div>

                <div className={classes.kilasDesc}>
                  <PlayArrow className={classes.logo} />
                  <Typography type="bold">Video, audio, & text</Typography>
                </div>
              </div>

              <Divider />

              <Typography type="bold">{descriptionTitle}</Typography>
              <Typography>{description}</Typography>
            </div>
          </Grid>

          <Grid item xs={1} />

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
  descriptionTitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
};
