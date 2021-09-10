import React from "react";

// Whatsapp Button
import Whatsapp from "../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Parallax from "../components/Parallax";
import Typography from "../components/Typography";
import Footer from "../components/Footer";
import Header from "../components/NavBar/Header";
import HeaderLinks from "../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../components/NavBar/HeaderLinksMobile";

// Material-UI components
import { Container } from "@material-ui/core";
import { beigeColor } from "../styles/Style";

export default function Contact({ history }) {
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

      {/*---------------------------------------------------------------*/}
      {/*---------------------- WHATSAPP FIXED NAV ---------------------*/}
      {/*---------------------------------------------------------------*/}
      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
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
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            style={{
              position: "fixed",
              bottom: 15,
              left: 15,
              width: "60px",
              "&:hover": {
                filter: "brightness(150%)",
              },
            }}
          />
        </Tooltip>
      </a>
      <Footer />
    </div>
  );
}
