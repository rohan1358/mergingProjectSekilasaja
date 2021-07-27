import React from "react";

// Custom components
import FourOFourStyle from "../styles/404Style";
import Typography from "../components/Typography";

// Material-UI components
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles(FourOFourStyle);

export default function FourOFourPage() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.position}>
        <Typography className={classes.title} size="heading">
          404
        </Typography>
        <Typography size="heading">Halaman Tidak Ditemukan!</Typography>
        <Typography className={classes.description} size="subheading">
          Halaman yang kamu cari tidak ditemukan. Mungkin halaman sudah dihapus,
          diganti, atau memang pada dasarnya tidak pernah dibuat.
        </Typography>
      </Container>
    </div>
  );
}
