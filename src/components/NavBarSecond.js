import React from "react";
import Logo from "../images/dark-logo.png";

// Material-UI components
import { AppBar, Toolbar, IconButton, Container } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import DvrIcon from "@material-ui/icons/Dvr";

// Custom components
import Button from "./Button";
import SearchBar from "./SearchBar";
import NavbarStyle from "../styles/NavbarStyle";

// nodejs library to set properties for components
import classNames from "classnames";

export default function NavBarSecond() {
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
          <IconButton href="/library" color="inherit">
            <HomeIcon className={iconColorClass} />
          </IconButton>
          <IconButton color="inherit">
            <DvrIcon className={iconColorClass} />
          </IconButton>
          <div className={growClass} />
        </Toolbar>
      </AppBar>
      <div className={toolbarClass} />
    </div>
  );
}