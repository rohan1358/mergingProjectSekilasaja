import React from "react";

// Custom components
import Styles from "../../styles/NewWebStyle";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

// Material-UI components
import { Container, IconButton, Paper, makeStyles } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";
import { beigeColor } from "../../styles/Style";

// Images
const Logo =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fdark-logo.png?alt=media&token=cfd7dc4d-1687-473e-a272-4d7c66b97467";

const useStyles = makeStyles(Styles);

export default function NewWebLanding() {
  // Styles
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <Container>
        <Paper className={classes.paper} elevation={5}>
          <img className={classes.logo} src={Logo} />
          <Typography size="heading">
            Maaf! Website Under Maintenance.
          </Typography>
          <Typography
            className={classes.description}
            type="italic"
            size="subheading"
          >
            Mohon menunggu dan terima kasih atas kesabaranmu, bila ada
            pertanyaan tolong hubungi instagram kami
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
