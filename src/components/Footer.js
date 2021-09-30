import React from "react";

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
import { beigeColor } from "../styles/Style";

// Images
const Logo =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fyellow-logo.png?alt=media&token=7483e708-574b-455d-9128-b03fe6b0e4e2";

function SocialIcons() {
  // Styles
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
          color={beigeColor}
          aria-label="menu"
        >
          <Instagram className={classes.iconColor} />{" "}
          <Typography style={{ marginLeft: "5px" }} color="beigeColor" small>
            sekilasajacom
          </Typography>
        </IconButton>

        {/* <IconButton
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
        </IconButton> */}
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
            <Typography style={{ marginLeft: "5px" }} color="beigeColor" small>
              sekilasajacom
            </Typography>
          </IconButton>
          {/* 
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
          </IconButton> */}
        </div>
      </div>
    </div>
  );
}

function Copyright() {
  // Styles
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
          {"SekilasAja! "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>

      <div className={mobileClass}>
        <Typography color="beigeColor" size="small">
          {"Copyright © "}
          {"SekilasAja! "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </div>
  );
}

export default function Footer() {
  // Styles
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

              {/* <Typography color="beigeColor">
                Bantuin Kamu Ngerti Isi Buku <div>HANYA Dalam 15 Menit!</div>
              </Typography> */}
              <SocialIcons />
            </Grid>

            <Grid item xs={3}>
              <Typography color="beigeColor" size="subheading">
                Bantuan & Panduan
              </Typography>
              <Link
                underline="none"
                href="https://docs.google.com/forms/d/1SVfaa6G8yOglsZCMelTjslwGrbnkKuOQ6u0Xo6F-Tws/edit"
                target="_blank"
              >
                <Typography color="beigeColor">Kirim Feedback</Typography>
              </Link>
              <Link underline="none">
                <Typography style={{ maxWidth: "260px" }} color="beigeColor">
                  Hubungi kami jika ada pertanyaan atau masalah di{" "}
                  <a
                    style={{
                      color: beigeColor,
                      textDecoration: "none",
                      fontStyle: "italic",
                    }}
                    href="mailto:sekilasaja.contact@gmail.com"
                    className={classes.linkHover}
                  >
                    sekilasaja.contact@gmail.com
                  </a>
                </Typography>
              </Link>
              {/* <Link underline="none" href="/contact">
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
              <Link href="/faq" underline="none">
                <Typography color="beigeColor">FAQ</Typography>
              </Link>
              {/* <Link underline="none">
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
              <SocialIcons />

              {/* <Typography color="beigeColor">
                Bantuin Kamu Ngerti Isi Buku HANYA Dalam 15 Menit!
              </Typography> */}
            </Grid>

            <Grid item xs={12}>
              <Typography color="beigeColor" size="subheading">
                Bantuan & Panduan
              </Typography>
              <Link
                underline="none"
                href="https://docs.google.com/forms/d/1SVfaa6G8yOglsZCMelTjslwGrbnkKuOQ6u0Xo6F-Tws/edit"
              >
                <Typography color="beigeColor">Kirim Feedback</Typography>
              </Link>
              <Link underline="none">
                <Typography color="beigeColor">
                  Hubungi kami jika ada pertanyaan atau masalah di{" "}
                  <a
                    style={{
                      color: beigeColor,
                      textDecoration: "none",
                      fontStyle: "italic",
                    }}
                    href="mailto:sekilasaja.contact@gmail.com"
                    className={classes.linkHover}
                  >
                    sekilasaja.contact@gmail.com
                  </a>
                </Typography>
              </Link>
              {/* <Link underline="none" href="/contact">
                <Typography color="beigeColor">Hubungi Kami</Typography>
              </Link>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Kebijakan Privasi</Typography>
              </Link>
              <Link underline="none" href="/contact">
                <Typography color="beigeColor">Syarat & Ketentuan</Typography>
              </Link> */}
            </Grid>

            <Grid item xs={12}>
              <Typography color="beigeColor" size="subheading">
                Link Penting
              </Typography>
              <Link href="/pricing" underline="none">
                <Typography color="beigeColor">Berlanggan Sekarang</Typography>
              </Link>
              <Link href="/faq" underline="none">
                <Typography color="beigeColor">FAQ</Typography>
              </Link>
              {/* <Link underline="none">
                <Typography color="beigeColor">Link</Typography>
              </Link> */}
              <div style={{ marginBottom: "30px" }} />
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
