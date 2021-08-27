import React from "react";
import Logo from "../../images/dark-logo.png";

// Material-UI components
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Grid,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

// Custom components
import NavbarStyle from "../../styles/NavbarStyle";
import MultiUseMobile from "../../styles/MultiUseMobile";

// nodejs library to set properties for components
import classNames from "classnames";

export default function NavBarSecond(props) {
  const { children } = props;

  const classes = NavbarStyle();
  const multi = MultiUseMobile();

  const growClass = classNames({
    [classes.grow]: true,
  });
  const toolbarClass = classNames({
    [classes.toolbar]: true,
  });
  const iconColorClass = classNames({
    [classes.iconColor]: true,
  });

  return (
    <div>
      <div className={multi.mobileDesktop}>
        <AppBar className={classes.yellowNavBar}>
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <IconButton href="/" color="inherit">
                  <HomeIcon className={iconColorClass} />
                </IconButton>
              </Grid>

              <Grid item xs={3} />

              <Grid item xs={3}>
                {children}
              </Grid>

              <Grid item xs={3} />

              <Grid item xs={3} />
            </Grid>
          </Container>
        </AppBar>
      </div>

      <div className={multi.sectionMobile}>
        <AppBar className={classes.yellowNavBar}>
          <Toolbar>
            <IconButton href="/" color="inherit">
              <HomeIcon className={iconColorClass} />
            </IconButton>

            {children}

            <div className={growClass} />
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
