import React, { useState, useEffect } from "react";

// Material UI components
import { Grid, makeStyles, Container } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import InfoStyle from "../../styles/InfoAreaStyle";
import Button from "../../components/Button";

//Import firebase for login function
import fire from "../../firebase/fire";

const useStyles = makeStyles(InfoStyle);

const BookDetailsSimple = ({
  descriptionTitle,
  title,
  author,
  description,
  handleClose,
  cover,
}) => {
  const classes = useStyles();
  const multi = MultiUseMobile();
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <div className={multi.paddedContent} onClose={handleSubmit}>
      <div className={multi.sectionDesktop}>
        <Container>
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
              <div className={classes.bookDetailsDesc}>
                <Typography size="subheading" type="bold">
                  {title}
                </Typography>
                <Typography type="italic">{author}</Typography>
                <Typography type="bold">{descriptionTitle}</Typography>
                <Typography>{description}</Typography>
                <Button fullWidth href="/book-details">
                  See details
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className={multi.sectionMobile}>
        <Container>
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
                <Typography type="bold">{descriptionTitle}</Typography>
                <Typography>{description}</Typography>
                <Button fullWidth href="/book-details">
                  See details
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default BookDetailsSimple;
