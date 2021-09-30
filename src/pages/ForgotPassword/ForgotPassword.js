import React from "react";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Footer from "../../components/Footer";
import ForgotPasswordForm from "./ForgotPasswordForm";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Typography from "../../components/Typography";

// Material-UI components
import { Container, Paper, makeStyles, Link } from "@material-ui/core";
import { beigeColor } from "../../styles/Style";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function ForgotPassword({ history }) {
  // Styles
  const classes = useStyles();
  const multi = MultiUseMobile();

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
      <div className={multi.extraSpace} />
      <Container maxWidth="xs">
        <Paper className={classes.root}>
          <ForgotPasswordForm />
        </Paper>
        <Typography style={{ textAlign: "center" }}>
          Belum punya akun?{" "}
          <Link className={multi.link} underline="none" href="/signup">
            Daftar Sekarang!
          </Link>
        </Typography>
        <div className={multi.extraSpace} />
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
