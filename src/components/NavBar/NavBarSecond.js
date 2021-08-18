import React from "react";
import Logo from "../../images/dark-logo.png";

// Material-UI components
import { AppBar, Toolbar, IconButton, Container } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

// Custom components
import Button from "../Button";
import Drawer from "../Drawer";
import NavbarStyle from "../../styles/NavbarStyle";

// nodejs library to set properties for components
import classNames from "classnames";

export default function NavBarSecond(props) {
  const { children } = props;

  const classes = NavbarStyle();
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
      <AppBar className={classes.yellowNavBar}>
        <Toolbar>
          <IconButton href="/" color="inherit">
            <HomeIcon className={iconColorClass} />
          </IconButton>

          {children}

          <div className={growClass} />
        </Toolbar>
      </AppBar>
      <div className={toolbarClass} />
    </div>
  );
}
