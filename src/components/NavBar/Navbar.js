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

//Import firebase function to get user based on userid
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

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

  console.log(cart);

  const { history } = props;

  useEffect(() => {
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
          return products_;
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
      console.log("not log in");
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
      {!!isSubscribed ? (
        <AppBar position="fixed" color="white">
          <Container>
            <Toolbar>
              <a href="/">
                <img className={iconClass} src={Logo} />
              </a>

              <div className={growClass} />

              <div className={desktopClass}>
                <SearchBarDrawer
                  direction={"top"}
                  history = {history}
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
              </div>

              <div className={mobileClass}>
                <SearchBarDrawer
                  direction={"top"}
                  history = {history}
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
      ) : (
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
                    <SearchBarDrawer
                      direction={"top"}
                      history = {history}
                      logo={<SearchIcon className={iconColorClass}
                     />}
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
                      drawerLogo={
                        <ShoppingCartIcon className={classes.hugeIcon} />
                      }
                      drawerTitle={"Your Cart"}
                      logo={
                        <Badge badgeContent={cart.length} color="error">
                          <ShoppingCartIcon className={classes.iconColor} />
                        </Badge>
                      }
                      children={<Basket cartItems={cart} />}
                    />
                  </div>

                  <div className={mobileClass}>
                    <SearchBarDrawer
                      direction={"top"}
                      history = {history}
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
                      children={<Basket cartItems={cart} />}
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
                    <SearchBarDrawer
                      direction={"top"}
                      history = {history}
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
                  </div>

                  <div className={mobileClass}>
                    <SearchBarDrawer
                      direction={"top"}
                      history = {history}
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
        </div>
      )}

      <div className={classes.toolbar} />
      {renderMobileMenu}
    </div>
  );
}
