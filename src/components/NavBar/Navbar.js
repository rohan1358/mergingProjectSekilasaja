import React, { useContext } from "react";
import Logo from "../../images/dark-logo.png";

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
import Drawer from "../Drawer";
import Button from "../Button";
import NavbarStyle from "../../styles/NavbarStyle";
import SearchBarDrawer from "../SearchBarDrawer";
import Basket from "../AddToCart/Basket";

// nodejs library to set properties for components
import classNames from "classnames";

// firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../Routing/Auth";

export default function NavBar(props) {
  const { cartItems, onAdd, onRemove } = props;
  const { currentUser } = useContext(AuthContext);

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
      {!!currentUser ? (
        <div>
          <MenuItem>
            <Link href="/pricing" underline="none" className={classes.link}>
              Pricing
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/library">
              Library
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/accounts">
              Accounts
            </Link>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <Link href="/pricing" underline="none" className={classes.link}>
              Pricing
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/signup">
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/login">
              Login
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div>
      {!!currentUser ? (
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
                />

                <Button href="/pricing" round color="transparent">
                  Pricing
                </Button>

                <Button round color="transparent" href="/library">
                  Library
                </Button>

                <Button round color="primary" href="/accounts">
                  Accounts
                </Button>

                <div className={classes.divider} />

                <Drawer
                  direction={"right"}
                  drawerLogo={<ShoppingCartIcon className={classes.hugeIcon} />}
                  drawerTitle={"Your Cart"}
                  logo={<ShoppingCartIcon className={classes.iconColor} />}
                  children={
                    <Basket
                      cartItems={cartItems}
                      onAdd={onAdd}
                      onRemove={onRemove}
                    />
                  }
                />
              </div>

              <div className={mobileClass}>
                <SearchBarDrawer
                  direction={"top"}
                  logo={<SearchIcon className={iconColorClass} />}
                />

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
                />

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
      ) : (
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
                />

                <Button href="/pricing" round color="transparent">
                  Pricing
                </Button>

                <Button round color="transparent" href="/signup">
                  Sign Up
                </Button>

                <Button round color="primary" href="/login">
                  Login
                </Button>

                <div className={classes.divider} />

                <Drawer
                  direction={"right"}
                  drawerLogo={<ShoppingCartIcon className={classes.hugeIcon} />}
                  drawerTitle={"Your Cart"}
                  logo={<ShoppingCartIcon className={classes.iconColor} />}
                  children={
                    <Basket
                      cartItems={cartItems}
                      onAdd={onAdd}
                      onRemove={onRemove}
                    />
                  }
                />
              </div>

              <div className={mobileClass}>
                <SearchBarDrawer
                  direction={"top"}
                  logo={<SearchIcon className={iconColorClass} />}
                />

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
                />

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
      )}
      {renderMobileMenu}
    </div>
  );
}
