import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, Grid, Container, Hidden } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { primaryColor } from "../../styles/Style";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";

const useStyles = makeStyles(InfoAreaStyle);

export default function NewKilasCard({ product, chosenCategory }) {
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
      }}
    >
      <Container>
        <Grid container direction="row" justifyContent="center" spacing={3}>
          <Grid item xs={12} />
          <Grid item md={2} xs={12} />
          <Grid item md={3} xs={12}>
            <Hidden mdUp>
              <Typography style={{ marginTop: 0 }} size="heading">
                <strong style={{ backgroundColor: primaryColor }}>
                  Kilas Baru
                </strong>{" "}
                Minggu Ini!
              </Typography>
            </Hidden>
            <img
              src={coverLink}
              className={books.imgRounded + " " + books.imgFluid}
              style={{ maxWidth: "250px", width: "100%" }}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <Hidden smDown implementation="css">
              <Typography style={{ marginTop: 0 }} size="heading">
                <strong style={{ backgroundColor: primaryColor }}>
                  Kilas Baru
                </strong>{" "}
                Minggu Ini!
              </Typography>
            </Hidden>
            <Typography type="bold" size="subheading">
              {product.book_title}
            </Typography>
            <Typography>{product.descriptions[0]}</Typography>

            <div style={{ marginBottom: 20 }} />

            <Button round href={`/book-details/${product.book_title}`}>
              Baca Sekarang!
            </Button>
          </Grid>
          <Grid item md={2} xs={12} />
          <Grid item xs={12} />
        </Grid>
      </Container>
    </div>
  );
}
