import React from "react";
import Logo from "../images/yellow-logo.png";

// Material-UI components
import { Divider, CssBaseline, Grid, Container, Link } from "@material-ui/core";

// Custom components
import Typography from "./Typography";
import FooterStyle from "../styles/FooterStyle";

// nodejs library to set properties for components
import classNames from "classnames";

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
                Title
              </Typography>
              <Link href="/contact">
                <Typography color="beigeColor">Contact</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Typography color="beigeColor" size="subheading">
                Title
              </Typography>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
            </Grid>
          </Grid>

          <Grid className={mobileClass} container>
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
                Title
              </Typography>
              <Link href="/contact">
                <Typography color="beigeColor">Contact</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Typography color="beigeColor" size="subheading">
                Title
              </Typography>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
              <Link>
                <Typography color="beigeColor">Link</Typography>
              </Link>
            </Grid>
          </Grid>

          {/* <Divider className={dividerClass} /> */}
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
