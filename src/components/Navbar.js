import React from "react";
import { useState } from "react";
import Logo from "../images/dark-logo.png";
import Book from "../images/rdpd.jpg";

// Material-UI components
import {
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
  Container,
  Link,
  Menu,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

//Import components for login and signup
import SignUpModalDialog from "./SignUp/SignUpModalDialog";
import LoginModalDialog from "./Login/LoginModalDialog";

// Custom components
import Drawer from "./Drawer";
import Button from "./Button";
import SearchBar from "./SearchBar";
import NavbarStyle from "../styles/NavbarStyle";
import AddedToCardBooks from "./AddedToCartBooks";
import SearchBarDrawer from "./SearchBarDrawer";

// nodejs library to set properties for components
import classNames from "classnames";

export default function NavBar() {
  // Other styles
  const classes = NavbarStyle();

  // FOR SIGNUP MODAL AND LOGIN MODAL
  // Declare a new state variable for modal open for signup and login
  const [openSignUp, setSignUpOpen] = useState(false);
  const [openLogin, setLoginOpen] = useState(false);

  // function to handle modal open for signup
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  // function to handle modal open for login
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  // function to handle modal close for signup
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  // function to handle modal close for login
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const growClass = classNames({
    [classes.grow]: true,
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
        <Link href="/pricing" underline="none" className={classes.link}>
          Pricing
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          underline="none"
          className={classes.link}
          onClick={handleSignUpOpen}
        >
          Sign Up
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          underline="none"
          className={classes.link}
          onClick={handleLoginOpen}
        >
          Login
        </Link>
      </MenuItem>
      <SignUpModalDialog open={openSignUp} handleClose={handleSignUpClose} />
      <LoginModalDialog open={openLogin} handleClose={handleLoginClose} />
    </Menu>
  );

  return (
    <div>
      <AppBar position="static" color="white">
        <Container>
          <Toolbar>
            <a href="/">
              <img className={iconClass} src={Logo} />
            </a>

            <div className={growClass} />

            <div className={desktopClass}>
              <SearchBarDrawer
                direction={"top"}
                logo={<SearchIcon className={iconColorClass} />}
                searchBar={<SearchBar />}
              />

              <Button href="/pricing" round color="transparent">
                Pricing
              </Button>

              <Button round color="transparent" onClick={handleSignUpOpen}>
                Sign Up
              </Button>
              <SignUpModalDialog
                open={openSignUp}
                handleClose={handleSignUpClose}
              />

              <Button round color="primary" onClick={handleLoginOpen}>
                Login
              </Button>

              <LoginModalDialog
                open={openLogin}
                handleClose={handleLoginClose}
              />
              <div className={classes.divider} />

              <Drawer
                direction={"right"}
                drawerLogo={<ShoppingCartIcon className={classes.hugeIcon} />}
                drawerTitle={"Your Cart"}
                logo={<ShoppingCartIcon className={classes.iconColor} />}
                button={
                  <Button round fullWidth color="primary">
                    Beli Sekarang
                  </Button>
                }
                toPurchaseBookSection={
                  <AddedToCardBooks
                    cover={Book}
                    title={"Rich Dad Poor Dad"}
                    price={"Rp. 10,000"}
                  />
                }
              />
            </div>

            <div className={mobileClass}>
              <SearchBarDrawer
                direction={"top"}
                logo={<SearchIcon className={iconColorClass} />}
                searchBar={<SearchBar />}
              />

              <Drawer />

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
    </div>
  );
}
