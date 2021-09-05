import React from "react";

// Custom components
import Parallax from "../components/Parallax";
import Typography from "../components/Typography";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer";
import Header from "../components/NavBar/Header";
import HeaderLinks from "../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../components/NavBar/HeaderLinksMobile";

// Material-UI components
import { Container } from "@material-ui/core";

export default function Contact({ history }) {
  return (
    <div>
      <div style={{ marginTop: "100px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
      <Container>
        <Parallax
          border
          filter
          image={require("../images/contact.jpg").default}
        >
          <Typography color="beigeColor" size="heading">
            Kamu Bisa Hubungi Kami Lewat
          </Typography>
          <Typography color="beigeColor" size="subheading" type="italic">
            hi@sekilasaja.com
          </Typography>
        </Parallax>
      </Container>
      <Footer />
    </div>
  );
}
