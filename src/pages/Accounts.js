import React from "react";

// Custom components
import Parallax from "../components/Parallax";
import Typography from "../components/Typography";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiUseMobile from "../styles/MultiUseMobile";
import Button from "../components/Button";

// Material-UI components
import { Container, Paper, Divider } from "@material-ui/core";

export default function AccountsPage() {
  const classes = MultiUseMobile();

  return (
    <div>
      <NavBar />
      <Container maxWidth={"md"}>
        <div className={classes.extraSpace} />
        <Paper className={classes.paddedContent}>
          <Typography size="heading">Accounts</Typography>
          <Typography size="subheading">Profil</Typography>
          <Divider />
          <Typography size="subheading">Layanan Berlangganan</Typography>
          <Divider />
          <Typography size="subheading">Ganti Kata Sandi</Typography>
          <div className={classes.extraSpace} />
          <Button round color="secondary">
            Log out
          </Button>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
