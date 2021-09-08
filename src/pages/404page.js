import React from "react";

// Custom components
import FourOFourStyle from "../styles/404Style";
import Typography from "../components/Typography";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer";
import Header from "../components/NavBar/Header";
import HeaderLinks from "../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../components/NavBar/HeaderLinksMobile";

// Material-UI components
import { makeStyles, Container } from "@material-ui/core";
import { beigeColor } from "../styles/Style";

const useStyles = makeStyles(FourOFourStyle);

export default function FourOFourPage({ history }) {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "100px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
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
      <Footer />
    </div>
  );
}
