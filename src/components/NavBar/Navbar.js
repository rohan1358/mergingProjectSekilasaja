import React, { useState, useContext, useEffect } from "react";
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
  Badge,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PeopleIcon from "@material-ui/icons/People";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

// Custom components
import Drawer from "../Drawer";
import Button from "../Button";
import NavbarStyle from "../../styles/NavbarStyle";
import SearchBar from "../SearchBar/SearchBar";
import SearchBarDrawer from "../SearchBar/SearchBarDrawer";
import Basket from "../AddToCart/Basket";
import Typography from "../Typography";

// nodejs library to set properties for components
import classNames from "classnames";

// firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../Routing/Auth";

//Import firebase function to get user based on userid
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseGetSubscription from "../../firebase/firebaseGetSubscription";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";

export default function NavBar(props) {
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

  const { currentUser } = useContext(AuthContext);

  const cart = useSelector(selectCart).cart;
  const dispatch = useDispatch();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const { history } = props;

  //Handle event to navigate to accounts page
  const goToAccounts = () => {
    console.log(history);
    history.push(`/accounts`);
  };

  //Handle event to navigate to pricing page
  const goToPricing = () => {
    console.log(history);
    history.push(`/pricing`);
  };

  useEffect(() => {
    const signout = async () => {
      fire.auth().signOut();
    };

    //If user is logged in but not email verified, logout so currentUser becomes null
    if (currentUser && !currentUser.emailVerified) {
      signout();
    }

    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );

        setIsSubscribed(results.is_subscribed);

        const getCartData = async (book_title) => {
          const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
            book_title
          );
          const subs_ = await firebaseGetSubscription.getSubscription(
            book_title
          );

          if (products_ === undefined) {
            return subs_;
          } else {
            return products_;
          }
        };

        var a = [
          ...results.cart.map((book) => {
            return getCartData(book);
          }),
        ];

        Promise.all(a).then((b) => {
          dispatch(setCart(b));
        });
        return results;
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }

    if (cart.length > 0) {
      setIsCart(true);
    }
  }, []);

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
            <Link
              onClick={goToPricing}
              underline="none"
              className={classes.link}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <MonetizationOnIcon style={{ marginRight: "8px" }} />{" "}
                <Typography type="bold">Pricing</Typography>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/library">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LibraryBooksIcon style={{ marginRight: "8px" }} />{" "}
                <Typography type="bold">Library</Typography>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              underline="none"
              className={classes.link}
              onClick={goToAccounts}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AccountCircleIcon style={{ marginRight: "8px" }} />{" "}
                <Typography type="bold">My Account</Typography>
              </div>
            </Link>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <Link
              onClick={goToPricing}
              underline="none"
              className={classes.link}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <MonetizationOnIcon style={{ marginRight: "8px" }} />{" "}
                <Typography type="bold">Pricing</Typography>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/signup">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <PeopleIcon style={{ marginRight: "8px" }} />{" "}
                <Typography type="bold">Sign Up</Typography>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link underline="none" className={classes.link} href="/login">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <VpnKeyIcon style={{ marginRight: "8px" }} />{" "}
                <Typography type="bold">Login</Typography>
              </div>
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div>
      {!!currentUser ? (
        <AppBar position="fixed" color="white">
          <Container>
            <Toolbar>
              <a href="/">
                <img className={iconClass} src={Logo} />
              </a>

              <div className={growClass} />

              <div className={desktopClass}>
                <SearchBar history={history} />

                <Button onClick={goToPricing} round color="transparent">
                  Pricing
                </Button>

                <Button round color="transparent" href="/library">
                  Library
                </Button>

                <Button round color="primary" onClick={goToAccounts}>
                  My Account
                </Button>

                <div className={classes.divider} />

                <Drawer
                  direction={"right"}
                  drawerLogo={<ShoppingCartIcon className={classes.hugeIcon} />}
                  drawerTitle={"Your Cart"}
                  logo={
                    <Badge badgeContent={cart.length} color="error">
                      <ShoppingCartIcon className={classes.iconColor} />
                    </Badge>
                  }
                  childrenCart={<Basket />}
                />
              </div>

              <div className={mobileClass}>
                <SearchBarDrawer
                  direction={"top"}
                  history={history}
                  logo={<SearchIcon className={iconColorClass} />}
                />

                <Drawer
                  direction={"right"}
                  drawerLogo={
                    <ShoppingCartIcon className={classes.iconColor} />
                  }
                  drawerTitle={"Your Cart"}
                  logo={
                    <Badge badgeContent={cart.length} color="error">
                      <ShoppingCartIcon className={classes.iconColor} />
                    </Badge>
                  }
                  childrenCart={<Basket />}
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
        <AppBar position="fixed" color="white">
          <Container>
            <Toolbar>
              <a href="/">
                <img className={iconClass} src={Logo} />
              </a>

              <div className={growClass} />

              <div className={desktopClass}>
                <SearchBar history={history} />

                <Button onClick={goToPricing} round color="transparent">
                  Pricing
                </Button>

                <Button round color="transparent" href="/signup">
                  Sign Up
                </Button>

                <Button round color="primary" href="/login">
                  Login
                </Button>
              </div>

              <div className={mobileClass}>
                <SearchBarDrawer
                  direction={"top"}
                  history={history}
                  logo={<SearchIcon className={iconColorClass} />}
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

      <div className={classes.toolbar} />
      {renderMobileMenu}
    </div>
  );
}
