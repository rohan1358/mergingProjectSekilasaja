import React from "react";
import Logo from "../images/dark-logo.png";

// Custom components
import Styles from "../styles/NewWebStyle";
import Typography from "../components/Typography";
import Button from "../components/Button";

// Material-UI components
import { Container, IconButton, Paper, makeStyles } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";
import { beigeColor } from "../styles/Style";

const useStyles = makeStyles(Styles);

export default function NewWebLanding() {
  // Styles
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <Container>
        <Paper className={classes.paper} elevation={5}>
          <img className={classes.logo} src={Logo} />
          <Typography size="heading">Sebentar Lagi!</Typography>
          <Typography
            className={classes.description}
            type="italic"
            size="subheading"
          >
            "Sebentar lagi kami akan merilis website ini dan menawarkan berbagai
            kilas buku terpopuler di dunia dalam bentuk video, audio, dan teks."
          </Typography>
          <Button
            href="https://instagram.com/sekilasajacom"
            round
            color="secondary"
          >
            <Instagram className={classes.iconStyle} />
            <Typography color="beigeColor" type="italic">
              sekilasajacom
            </Typography>
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
