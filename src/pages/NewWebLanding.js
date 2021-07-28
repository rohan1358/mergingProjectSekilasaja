import React from "react";
import Logo from "../images/dark-logo.png";

// Custom components
import Styles from "../styles/NewWebStyle";
import Typography from "../components/Typography";

// Material-UI components
import { Container, IconButton, Paper, makeStyles } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";

const useStyles = makeStyles(Styles);

export default function NewWebLanding() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper className={classes.paper} elevation={5}>
          <img className={classes.logo} src={Logo} />
          <Typography size="heading">Sebentar Lagi!</Typography>
          <Typography className={classes.description} size="subheading">
            "Sebentar lagi kami akan merilis website ini dan menawarkan berbagai
            kilas buku terpopuler di dunia dalam bentu video, audio, dan teks."
          </Typography>
          <IconButton
            href="https://www.instagram.com/sekilasajacom"
            edge="start"
            size="small"
            color="inherit"
            aria-label="menu"
          >
            <Instagram className={classes.iconStyle} />
            <Typography type="italic">SekilasAja!</Typography>
          </IconButton>
        </Paper>
      </Container>
    </div>
  );
}
