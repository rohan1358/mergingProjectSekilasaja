import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, Grid, Divider, Tooltip } from "@material-ui/core";
import { ImportContacts, EmojiObjects, Videocam } from "@material-ui/icons";

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
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <div style={{ marginTop: "5px" }} />
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
                      <Tooltip
                        title={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            <ImportContacts
                              fontSize="large"
                              style={{ marginRight: "10px" }}
                            />
                            Perkiraan waktu yang dibutuhkan untuk membaca kilas
                          </div>
                        }
                        placement="top"
                      >
                        <ImportContacts className={classes.logo} />
                      </Tooltip>
                      <Typography type="bold">{readTime} Menit</Typography>
                    </div>

                    <div className={classes.kilasDesc}>
                      <Tooltip
                        title={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            <Videocam
                              fontSize="large"
                              style={{ marginRight: "10px" }}
                            />
                            Waktu yang dibutuhkan untuk menonton video kilas
                          </div>
                        }
                        placement="top"
                      >
                        <Videocam className={classes.logo} />
                      </Tooltip>
                      <Typography type="bold">{watchTime} Menit</Typography>
                    </div>

                    <div className={classes.kilasDesc}>
                      <Tooltip
                        title={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            <EmojiObjects
                              fontSize="large"
                              style={{ marginRight: "10px" }}
                            />
                            Total kilas (bab) yang ada di setiap rangkuman
                          </div>
                        }
                        placement="top"
                      >
                        <EmojiObjects className={classes.logo} />
                      </Tooltip>
                      <Typography type="bold">{num} Kilas</Typography>
                    </div>

                    {/* <div className={classes.kilasDesc}>
                      <PlayArrow className={classes.logo} />
                      <Typography type="bold">Video, Audio, & Text</Typography>
                    </div> */}
                  </div>

                  <Divider />

                  <Typography type="bold">{descriptionTitle}</Typography>
                  {description.map((paragraph, index) => (
                    <Typography
                      className={classes.uncopyable}
                      className={classes.paragraph}
                    >
                      {paragraph}
                    </Typography>
                  ))}

                  <div style={{ marginTop: "40px" }} />
                  {buttons}
                </div>
              </Grid>

              <Grid item xs={3}>
                <img
                  src={cover}
                  className={
                    classes.imgRounded +
                    " " +
                    classes.imgFluid +
                    " " +
                    classes.imgBookDetailsCover
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ marginTop: "7px" }} />
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
                  classes.imgBookDetailsCover
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
                    <Tooltip
                      title={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            lineHeight: "20px",
                          }}
                        >
                          <ImportContacts
                            fontSize="large"
                            style={{ marginRight: "10px" }}
                          />
                          Perkiraan waktu yang dibutuhkan untuk membaca kilas
                        </div>
                      }
                      placement="top"
                    >
                      <ImportContacts className={classes.logo} />
                    </Tooltip>
                    <Typography type="bold">{readTime} Menit</Typography>
                  </div>

                  <div className={classes.kilasDescMobileCenter}>
                    <Tooltip
                      title={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            lineHeight: "20px",
                          }}
                        >
                          <Videocam
                            fontSize="large"
                            style={{ marginRight: "10px" }}
                          />
                          Waktu yang dibutuhkan untuk menonton video kilas
                        </div>
                      }
                      placement="top"
                    >
                      <Videocam className={classes.logo} />
                    </Tooltip>
                    <Typography type="bold">{watchTime} Menit</Typography>
                  </div>

                  <div className={classes.kilasDescMobileCenter}>
                    <Tooltip
                      title={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            lineHeight: "20px",
                          }}
                        >
                          <EmojiObjects
                            fontSize="large"
                            style={{ marginRight: "10px" }}
                          />
                          Total kilas (bab) yang ada di setiap rangkuman
                        </div>
                      }
                      placement="top"
                    >
                      <EmojiObjects className={classes.logo} />
                    </Tooltip>
                    <Typography type="bold">{num} Kilas</Typography>
                  </div>

                  {/* <div className={classes.kilasDescMobileCenter}>
                    <PlayArrow className={classes.logo} />
                    <Typography type="bold">Video, Audio, & Text</Typography>
                  </div> */}
                </div>

                <Divider />

                <Typography type="bold">{descriptionTitle}</Typography>
                {description.map((paragraph, index) => (
                  <Typography
                    className={classes.uncopyable}
                    className={classes.paragraph}
                  >
                    {paragraph}
                  </Typography>
                ))}

                {buttons}
                <div style={{ marginTop: "20px" }} />
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
