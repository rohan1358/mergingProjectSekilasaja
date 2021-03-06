import React, { useContext, useState, useEffect } from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles, Badge } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Basket from "../AddToCart/Basket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

// core components
import styles from "../../styles/HeaderStyle";
import NavbarStyle from "../../styles/NavbarStyle";
import SearchBar from "../SearchBar/SearchBar";
import SearchBarDrawer from "../SearchBar/SearchBarDrawer";
import { secondaryColor, beigeColor, primaryColor } from "../../styles/Style";
import CartDrawer from "../../components/Drawer";

// Redux
import { useSelector } from "react-redux";
import { selectCart } from "../../feature/cartSlice";

// User
import { AuthContext } from "../Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

// Images
const Logo =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fdark-logo.png?alt=media&token=cfd7dc4d-1687-473e-a272-4d7c66b97467";

// Styles
const useStyles = makeStyles(styles);

export default function Header(props) {
  // Auth
  const { currentUser } = useContext(AuthContext);

  // Styles
  const classes = useStyles();
  const nav = NavbarStyle();

  // Redux
  const cart = useSelector(selectCart).cart;

  //  useState hooks
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  const {
    color,
    rightLinks,
    leftLinks,
    fixed,
    absolute,
    history,
    rightLinksMobile,
  } = props;

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  const brandComponent = (
    <a href="/">
      <img className={nav.icon} src={Logo} />
    </a>
  );

  const brandComponentSubscribed = (
    <a href="/library">
      <img className={nav.icon} src={Logo} />
    </a>
  );

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Get user info
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setIsSubscribed(results.is_subscribed);
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  }, []);

  return (
    <AppBar style={{ backgroundColor: beigeColor }} className={appBarClasses}>
      <Toolbar className={classes.container}>
        {!!isSubscribed ? (
          <div className={classes.flex}>{brandComponentSubscribed}</div>
        ) : (
          <div className={classes.flex}>{brandComponent}</div>
        )}
        <Hidden smDown implementation="css">
          <div style={{ display: "flex" }}>
            <SearchBar history={history} />
            {rightLinks}
          </div>
        </Hidden>
        <Hidden mdUp>
          <SearchBarDrawer
            direction={"top"}
            history={history}
            logo={<SearchIcon style={{ color: secondaryColor }} />}
          />
          {!!currentUser ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CartDrawer
                direction={"right"}
                drawerLogo={<ShoppingCartIcon className={nav.hugeIcon} />}
                drawerTitle={"Your Cart"}
                logo={
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon className={nav.iconColor} />
                  </Badge>
                }
                childrenCart={<Basket />}
              />
              <IconButton
                style={{
                  color: secondaryColor,
                  backgroundColor: primaryColor,
                  boxShadow: "2px 2px 2px #D9DDDC",
                }}
                aria-label="open drawer"
                href={"/library"}
              >
                <LibraryBooksIcon />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
          <IconButton
            style={{ color: secondaryColor }}
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinksMobile}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
