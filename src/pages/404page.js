import React from "react";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import FourOFourStyle from "../styles/404Style";
import Typography from "../components/Typography";
import Footer from "../components/Footer";
import Header from "../components/NavBar/Header";
import HeaderLinks from "../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../components/NavBar/HeaderLinksMobile";
import { beigeColor } from "../styles/Style";

// Material-UI components
import { makeStyles, Container } from "@material-ui/core";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

const useStyles = makeStyles(FourOFourStyle);

export default function FourOFourPage({ history }) {
  // Styles
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
