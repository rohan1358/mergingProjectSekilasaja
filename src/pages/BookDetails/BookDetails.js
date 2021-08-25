import React, { useState, useEffect } from "react";

// @material-ui/core components
import {
  makeStyles,
  Grid,
  Divider,
  Container,
  ButtonBase,
} from "@material-ui/core";
import {
  ImportContacts,
  EmojiObjects,
  PlayArrow,
  Videocam,
} from "@material-ui/icons";

// Custom components
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

// nodejs library to set properties for components
import classNames from "classnames";
import PropTypes from "prop-types";

// Firebase components
import fire from "../../firebase/fire";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookDetails(props) {
  const {
    cover,
    title,
    author,
    description,
    descriptionTitle,
    readTime,
    watchTime,
    num,
    buttons,
  } = props;
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
      <div>
        <div className={classes.bookDetailsWidth}>
          <div className={desktopClass}>
            <Grid container>
              <Grid item xs={12}>
                <div className={mobile.extraSpace} />
              </Grid>

              <Grid item xs={9}>
                <div className={classes.bookDetailsDesc}>
                  <Typography size="subheading" type="bold">
                    {title}
                  </Typography>

                  <Typography type="italic">{author}</Typography>

                  <Divider />

                  <div className={classes.kilasDesc}>
                    <div className={classes.kilasDesc}>
                      <ImportContacts className={classes.logo} />
                      <Typography type="bold">{readTime} Menit</Typography>
                    </div>

                    <div className={classes.kilasDesc}>
                      <Videocam className={classes.logo} />
                      <Typography type="bold">{watchTime} Menit</Typography>
                    </div>

                    <div className={classes.kilasDesc}>
                      <EmojiObjects className={classes.logo} />
                      <Typography type="bold">{num} Kilas</Typography>
                    </div>

                    <div className={classes.kilasDesc}>
                      <PlayArrow className={classes.logo} />
                      <Typography type="bold">Video, Audio, & Text</Typography>
                    </div>
                  </div>

                  <Divider />

                  <Typography type="bold">{descriptionTitle}</Typography>
                  <Typography>{description}</Typography>
                </div>
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

              {buttons}

              <Grid item xs={12}>
                <div className={mobile.extraSpace} />
              </Grid>
            </Grid>
          </div>
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

                <Divider />

                <div className={classes.kilasDescMobile}>
                  <div className={classes.kilasDescMobileCenter}>
                    <ImportContacts className={classes.logo} />
                    <Typography type="bold">{readTime} Menit</Typography>
                  </div>

                  <div className={classes.kilasDescMobileCenter}>
                    <Videocam className={classes.logo} />
                    <Typography type="bold">{watchTime} Menit</Typography>
                  </div>

                  <div className={classes.kilasDescMobileCenter}>
                    <EmojiObjects className={classes.logo} />
                    <Typography type="bold">{num} Kilas</Typography>
                  </div>

                  <div className={classes.kilasDescMobileCenter}>
                    <PlayArrow className={classes.logo} />
                    <Typography type="bold">Video, Audio, & Text</Typography>
                  </div>
                </div>

                <Divider />

                <Typography type="bold">{descriptionTitle}</Typography>
                <Typography>{description}</Typography>

                {buttons}
              </div>
            </Grid>

            <Grid item xs={1} />
          </Grid>
        </div>
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
  readTime: PropTypes.string.isRequired,
  watchTime: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
};
