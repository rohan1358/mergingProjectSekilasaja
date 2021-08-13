import React from "react";

// Custom components
import Parallax from "../components/Parallax";
import Typography from "../components/Typography";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer";

// Material-UI components
import { Container } from "@material-ui/core";

export default function Contact() {
  return (
    <div>
      <NavBar />
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
