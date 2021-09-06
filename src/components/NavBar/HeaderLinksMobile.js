import React, { useState, useContext, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PeopleIcon from "@material-ui/icons/People";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

// Custom components
import Button from "../Button";
import styles from "../../styles/HeaderLinksStyle";
import { secondaryColor } from "../../styles/Style";
import NavbarStyle from "../../styles/NavbarStyle";

//Firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseGetSubscription from "../../firebase/firebaseGetSubscription";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";

// Other
import classNames from "classnames";

const useStyles = makeStyles(styles);

export default function HeaderLinksMobile({ history }) {
  const header = useStyles();
  const classes = NavbarStyle();

  const { currentUser } = useContext(AuthContext);

  const cart = useSelector(selectCart).cart;
  const dispatch = useDispatch();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCart, setIsCart] = useState(false);

  //Handle event to navigate to accounts page
  const goToAccounts = () => {
    // console.log(history);
    history.push(`/accounts`);
  };

  //Handle event to navigate to pricing page
  const goToPricing = () => {
    // console.log(history);
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

  return (
    <div>
      {!!currentUser ? (
        <List className={header.list}>
          <ListItem className={header.listItem}>
            <Button onClick={goToPricing} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <MonetizationOnIcon /> Pricing
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button href="/library" round color="transparent">
              <div style={{ color: secondaryColor }}>
                <LibraryBooksIcon />
                Library
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button onClick={goToAccounts} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <AccountCircleIcon /> My Account
              </div>
            </Button>
          </ListItem>
        </List>
      ) : (
        <List className={header.list}>
          <ListItem className={header.listItem}>
            <Button fullWidth onClick={goToPricing} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <MonetizationOnIcon /> Pricing
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button fullWidth href="/signup" round color="transparent">
              <div style={{ color: secondaryColor }}>
                <PeopleIcon /> Sign Up
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button fullWidth href="/login" round color="transparent">
              <div style={{ color: secondaryColor }}>
                <VpnKeyIcon /> Login
              </div>
            </Button>
          </ListItem>
        </List>
      )}
    </div>
  );
}
