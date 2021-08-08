import React from "react";
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
        <Link href="/signup" underline="none" className={classes.link}>
          Sign Up
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/login" underline="none" className={classes.link}>
          Login
        </Link>
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

              <Button href="/signup" round color="transparent">
                Sign Up
              </Button>

              <Button href="/login" round color="primary">
                Login
              </Button>

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
      <div className={toolbarClass} />
    </div>
  );
}
