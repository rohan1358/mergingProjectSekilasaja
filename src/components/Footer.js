import React from "react";
import Logo from "../images/yellow-logo.png";

// Material-UI components
import {
  IconButton,
  CssBaseline,
  Grid,
  Container,
  Link,
} from "@material-ui/core";
import { Instagram, Twitter, Facebook } from "@material-ui/icons";

// Custom components
import Typography from "./Typography";
import FooterStyle from "../styles/FooterStyle";

// nodejs library to set properties for components
import classNames from "classnames";

function SocialIcons() {
  const classes = FooterStyle();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  return (
    <div>
      <div className={desktopClass}>
        <IconButton
          href="https://www.instagram.com/sekilasajacom"
          edge="start"
          size="small"
          className={classes.socialIcon}
          color="inherit"
          aria-label="menu"
        >
          <Instagram className={classes.iconColor} />
        </IconButton>

        <IconButton
          href="https://twitter.com/sekilasajacom"
          edge="start"
          size="small"
          className={classes.socialIcon}
          color="inherit"
          aria-label="menu"
        >
          <Twitter className={classes.iconColor} />
        </IconButton>

        <IconButton
          href="https://www.instagram.com/sekilasajacom"
          edge="start"
          size="small"
          className={classes.socialIcon}
          color="inherit"
          aria-label="menu"
        >
          <Facebook className={classes.iconColor} />
        </IconButton>
      </div>

      <div className={mobileClass}>
        <div className={classes.topSpacing}>
          <IconButton
            href="https://www.instagram.com/sekilasajacom"
            edge="start"
            size="small"
            className={classes.socialIcon}
            color="inherit"
            aria-label="menu"
          >
            <Instagram className={classes.iconColor} />
          </IconButton>

          <IconButton
            href="https://www.twitter.com/sekilasajacom"
            edge="start"
            size="small"
            className={classes.socialIcon}
            color="inherit"
            aria-label="menu"
          >
            <Twitter className={classes.iconColor} />
          </IconButton>

          <IconButton
            href="https://www.instagram.com/sekilasajacom"
            edge="start"
            size="small"
            className={classes.socialIcon}
            color="inherit"
            aria-label="menu"
          >
            <Facebook className={classes.iconColor} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function Copyright() {
  const classes = FooterStyle();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  return (
    <div>
      <div className={desktopClass}>
        <Typography color="beigeColor" size="small">
          {"Copyright © "}
          {"SekilasAja "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>

      <div className={mobileClass}>
        <Typography color="beigeColor" size="small">
          {"Copyright © "}
          {"SekilasAja "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </div>
  );
}

export default function Footer() {
  const classes = FooterStyle();
  const footerClass = classNames({
    [classes.footer]: true,
  });
  const dividerClass = classNames({
    [classes.divider]: true,
  });
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });
  const iconClass = classNames({
    [classes.icon]: true,
  });

  return (
    <div>
      <CssBaseline />
      <footer className={footerClass}>
        <Container>
          <Grid
            className={desktopClass}
            justifyContent="space-between"
            spacing={3}
            container
          >
            <Grid item xs={6}>
              <a href="/">
                <img className={iconClass} src={Logo} />
              </a>

              <Typography color="beigeColor">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography color="beigeColor" size="subheading">
                Bantuan & Panduan
              </Typography>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Hubungi Kami</Typography>
              </Link>
              {/* <Link underline="none" href="/contact">
                <Typography color="beigeColor">Kebijakan Privasi</Typography>
              </Link>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Syarat & Ketentuan</Typography>
              </Link> */}
            </Grid>

            <Grid item xs={3}>
              <Typography color="beigeColor" size="subheading">
                Link Penting
              </Typography>
              <Link href="/pricing" underline="none">
                <Typography color="beigeColor">Berlanggan Sekarang</Typography>
              </Link>
              {/* <Link underline="none">
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link underline="none">
                <Typography color="beigeColor">Link</Typography>
              </Link> */}
            </Grid>
          </Grid>

          <Grid
            className={mobileClass}
            justifyContent="space-between"
            spacing={3}
            container
          >
            <Grid item xs={12}>
              <a href="/">
                <img className={iconClass} src={Logo} />
              </a>

              <Typography color="beigeColor">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography color="beigeColor" size="subheading">
                Bantuan & Panduan
              </Typography>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Hubungi Kami</Typography>
              </Link>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Kebijakan Privasi</Typography>
              </Link>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Syarat & Ketentuan</Typography>
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Typography color="beigeColor" size="subheading">
                Link Penting
              </Typography>
              <Link href="/pricing" underline="none">
                <Typography color="beigeColor">Berlanggan Sekarang</Typography>
              </Link>
              {/* <Link underline="none">
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link underline="none">
                <Typography color="beigeColor">Link</Typography>
              </Link> */}
            </Grid>
          </Grid>
          <SocialIcons />
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
