import React, { useState, useContext, useEffect } from "react";

// @material-ui/core components
import { makeStyles, List, ListItem, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Custom components
import Button from "../Button";
import styles from "../../styles/HeaderLinksStyle";
import { secondaryColor } from "../../styles/Style";
import NavbarStyle from "../../styles/NavbarStyle";
import Drawer from "../Drawer";
import Basket from "../AddToCart/Basket";

//Firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseGetSubscription from "../../firebase/firebaseGetSubscription";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";

const useStyles = makeStyles(styles);

export default function HeaderLinks({ history }) {
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
              <div style={{ color: secondaryColor }}>Harga</div>
            </Button>
          </ListItem>

          <ListItem className={header.listItem}>
            <Button onClick={goToAccounts} round color="transparent">
              <div style={{ color: secondaryColor }}>Profil</div>
            </Button>
          </ListItem>

          <ListItem style={{ display: "flex" }} className={header.listItem}>
            <Button href="/library" round color="primary">
              <div style={{ color: secondaryColor }}>My Library</div>
            </Button>

            <div className={classes.divider} />
          </ListItem>

          <ListItem
            style={{ display: "flex", alignItems: "center" }}
            className={header.listItem}
          ></ListItem>

          <ListItem className={header.listItem}>
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
          </ListItem>
        </List>
      ) : (
        <List className={header.list}>
          <ListItem className={header.listItem}>
            <Button onClick={goToPricing} round color="transparent">
              <div style={{ color: secondaryColor }}>Harga</div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button href="/signup" round color="transparent">
              <div style={{ color: secondaryColor }}>Daftar</div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button href="/login" round color="primary">
              <div style={{ color: secondaryColor }}>Login</div>
            </Button>
          </ListItem>
        </List>
      )}
    </div>
  );
}
