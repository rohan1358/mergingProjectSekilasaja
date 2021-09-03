import React from "react";
import { useHistory } from "react-router";

// Material-UI components
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Grid,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// Custom components
import NavbarStyle from "../../styles/NavbarStyle";
import MultiUseMobile from "../../styles/MultiUseMobile";

// nodejs library to set properties for components
import classNames from "classnames";

export default function NavBarSecond(props) {
  const { children } = props;

  const backHistory = useHistory();

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
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  onClick={() => backHistory.goBack()}
                  color="inherit"
                >
                  <ArrowBackIosIcon className={iconColorClass} />
                </IconButton>
                <IconButton href="/library" color="inherit">
                  <AccountBalanceIcon className={iconColorClass} />
                </IconButton>
              </Grid>

              <Grid item>{children}</Grid>

              <Grid item />
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
