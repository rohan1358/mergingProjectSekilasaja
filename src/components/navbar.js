import React from "react";
import Logo from "../images/dark-logo.png";

// Material-UI components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";

// Custom components
import Button from "./Button";
import SearchBar from "../components/SearchBar";
import NavbarStyle from "../styles/NavbarStyle";

// nodejs library to set properties for components
import classNames from "classnames";

export default function NavBar() {
  const classes = NavbarStyle();
  const growClass = classNames({
    [classes.grow]: true,
  });
  const titleClass = classNames({
    [classes.title]: true,
  });
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });
  const toolbarClass = classNames({
    [classes.toolbar]: true,
  });
  const iconColorClass = classNames({
    [classes.iconColor]: true,
  });
  const iconClass = classNames({
    [classes.icon]: true,
  });

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button href="/pricing" round color="transparent">
          Pricing
        </Button>
      </MenuItem>
      <MenuItem>
        <Button href="/signup" round color="transparent">
          Sign Up
        </Button>
      </MenuItem>
      <MenuItem>
        <Button href="/login" round color="primary">
          Login
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar color="white">
        <Container>
          <Toolbar>
            <a href="/">
              <img className={iconClass} src={Logo} />
            </a>
            <SearchBar />

            <div className={growClass} />

            <div className={desktopClass}>
              <Button href="/pricing" round color="transparent">
                Pricing
              </Button>
              <Button href="/signup" round color="transparent">
                Sign Up
              </Button>
              <Button href="/login" round color="primary">
                Login
              </Button>
            </div>

            <div className={mobileClass}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon className={iconColorClass} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      <div className={toolbarClass} />
    </div>
  );
}
