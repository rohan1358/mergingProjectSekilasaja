import React from "react";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import LoginForm from "./LoginForm";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Typography from "../../components/Typography";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";

// Material-UI components
import { Container, Paper, makeStyles, Link } from "@material-ui/core";
import { beigeColor } from "../../styles/Style";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function LoginPage({ history }) {
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
          <LoginForm />
        </Paper>
        <Typography style={{ textAlign: "center" }}>
          Belum punya akun?{" "}
          <Link className={multi.link} underline="none" href="/signup">
            Daftar Sekarang!
          </Link>
        </Typography>
        <div className={multi.extraSpace} />
      </Container>

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
