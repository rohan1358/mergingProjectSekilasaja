import React from "react";

// @material-ui/core components
import { makeStyles, Grid, Paper } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

// nodejs library to set properties for components
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles(InfoAreaStyle);

export default function BookDetails(props) {
  const {
    totalNum,
    kilasTitle,
    kilasBody,
    video,
    audio,
    kilas1,
    kilas2,
    kilas3,
    kilas4,
    kilas5,
    kilas6,
    kilas7,
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
      <div className={classes.bookDetailsWidth}>
        <div className={desktopClass}>
          <Paper className={mobile.paddedContent} elevation={5}>
            <Grid container>
              <Grid item xs={7}>
                <Typography type="bold">Kilas 1 dari {totalNum}</Typography>

                <Typography size="subheading">{kilasTitle}</Typography>
                <Typography>{kilasBody}</Typography>
              </Grid>

              <Grid item xs={1} />

              <Grid item xs={4}>
                <div>
                  <Typography size="subheading" type="bold">
                    Video
                  </Typography>
                  {video}

                  <Typography type="italic">
                    TODO: There will be video here
                  </Typography>
                </div>

                <div>
                  <Typography size="subheading" type="bold">
                    Audio
                  </Typography>
                  <Typography type="italic">
                    TODO: There will be audio here
                  </Typography>
                  {audio}
                </div>

                <div>
                  <Typography size="subheading" type="bold">
                    Daftar Kilas
                  </Typography>
                  <Typography>1. {kilas1}</Typography>
                  <Typography>2. {kilas2}</Typography>
                  <Typography>3. {kilas3}</Typography>
                  <Typography>4. {kilas4}</Typography>
                  <Typography>5. {kilas5}</Typography>
                  <Typography>6. {kilas6}</Typography>
                  <Typography>7. {kilas7}</Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>

      <div className={mobileClass}>
        <Paper className={mobile.paddedContent} elevation={5}>
          <Grid container>
            <Grid item xs={12}>
              <div>
                <Typography size="subheading" type="bold">
                  Video
                </Typography>
                <Typography type="italic">
                  TODO: There will be video here
                </Typography>
              </div>

              <div>
                <Typography size="subheading" type="bold">
                  Audio
                </Typography>
                <Typography type="italic">
                  TODO: There will be audio here
                </Typography>
              </div>

              <div>
                <Typography size="subheading" type="bold">
                  Daftar Kilas
                </Typography>
                <Typography>1. {kilas1}</Typography>
                <Typography>2. {kilas2}</Typography>
                <Typography>3. {kilas3}</Typography>
                <Typography>4. {kilas4}</Typography>
                <Typography>5. {kilas5}</Typography>
                <Typography>6. {kilas6}</Typography>
                <Typography>7. {kilas7}</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={mobile.extraSpace} />
            </Grid>

            <Grid item xs={12}>
              <Typography type="bold">Kilas 1 dari {totalNum}</Typography>

              <Typography size="subheading">{kilasTitle}</Typography>
              <Typography>{kilasBody}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

BookDetails.propTypes = {
  totalNum: PropTypes.object.isRequired,
  kilasTitle: PropTypes.string.isRequired,
  kilasBody: PropTypes.string.isRequired,
  kilas1: PropTypes.string,
  kilas2: PropTypes.string,
  video: PropTypes.object,
  audio: PropTypes.object,
};
