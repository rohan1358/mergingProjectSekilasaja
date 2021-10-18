import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, Grid, Container, Hidden } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../../../styles/InfoAreaStyle";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";
import { primaryColor } from "../../../styles/Style";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../../../firebase/firebaseGetBookCoverImageURL";

const useStyles = makeStyles(InfoAreaStyle);

export default function NewKilas({ product, chosenCategory }) {
  // Styles
  const books = useStyles();

  // useState hooks
  const [coverLink, setCoverLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(
        product.book_title
      );
      const link = await getLink;

      if (link !== undefined) setCoverLink(link);
    };
    fetchData();
  }, [, chosenCategory]);

  return (
    <div
      style={{
        // backgroundColor: "#CAEDA8",
        marginBottom: "5px",
        marginTop: "10px",
        padding: 10,
      }}
    >
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography
              style={{ margin: 0, color: primaryColor, textAlign: "center" }}
              size="heading"
            >
              <strong>Kilas Baru</strong> Minggu Ini!
            </Typography>
          </Grid>

          <Grid item md={2} xs={12} />
          <Grid item md={3} xs={12}>
            <a href={`/book-details/${product.book_title}`}>
              <img
                src={coverLink}
                className={
                  books.imgRounded +
                  " " +
                  books.imgFluid +
                  " " +
                  books.imgNewHomeBook
                }
              />
            </a>
          </Grid>
          <Grid item md={5} xs={12}>
            <Typography color="beigeColor" type="bold" size="subheading">
              {product.book_title}
            </Typography>
            <Typography color="beigeColor">
              {product.descriptions[0]}
            </Typography>

            <div style={{ marginBottom: 20 }} />

            {/* <Button round href={`/book-details/${product.book_title}`}>
              Baca Sekarang!
            </Button> */}
          </Grid>
          <Grid item md={2} xs={12} />
        </Grid>
      </Container>
    </div>
  );
}
