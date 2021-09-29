import React, { useState, useEffect, useContext } from "react";

// @material-ui/core components
import { makeStyles, Link, Grid } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";

// Firebase components
import * as firebaseGetBookCoverImageURL from "../firebase/firebaseGetBookCoverImageURL";
import * as firebaseUpdateCart from "../firebase/firebaseUpdateCart";
import { AuthContext } from "./Routing/Auth";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../feature/cartSlice";

import fire from "../firebase/fire";

const useStyles = makeStyles(InfoAreaStyle);

const useHoverStyles = makeStyles((theme) => ({
  root: {
    "& .appearItem": {
      display: "none",
    },
    "&:hover .appearItem": {
      display: "block",
    },
  },
}));

export default function BookCard({
  product,
  chosenCategory,
  notOwned,
  button,
  addedButton,
  buttonMobile,
  addedButtonMobile,
  extraSpace,
}) {
  // Styles
  const classes = useStyles();
  const hover = useHoverStyles();

  // Auth
  const { currentUser } = useContext(AuthContext);
  const db = fire.firestore();

  // useState hooks
  const [coverLink, setCoverLink] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  // Redux
  const cartItems = useSelector(selectCart).cart;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(
        product.book_title
      );
      const link = await getLink;

      if (link !== undefined) setCoverLink(link);
    };
    fetchData();
  }, [, chosenCategory]);

  const handleAddCart = () => {
    console.log("Adding to cart...");
    if (!product.coverLink && (coverLink != null || !coverLink)) {
      product.coverLink = coverLink;
    }
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        product
      );
      dispatch(setCart([...cartItems, product]));
    };
    fetchData();
  };

  useEffect(() => {
    const changeBtn = () => {
      // console.log(cartItems);
      // console.log(product);
      const exist = cartItems.find((x) => x.book_title === product.book_title);
      if (exist) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
    };
    changeBtn();
  }, [cartItems]);

  return (
    <Grid
      style={{ padding: 5 }}
      className={classes.cardHover + " " + notOwned + " " + hover.root}
      item
    >
      {isAdded ? (
        <div onClick={handleAddCart} className={classes.buttonAddedHoverPos}>
          <div className={"appearItem"}>{addedButton}</div>
        </div>
      ) : (
        <div onClick={handleAddCart} className={classes.buttonHoverPos}>
          <div className={"appearItem"}>{button}</div>
        </div>
      )}

      <Link underline="none" href={`book-details/${product.book_title}`}>
        <div className={classes.bookCover}>
          <div>
            <img
              src={coverLink}
              alt={product.book_title}
              className={
                classes.imgRounded +
                " " +
                classes.imgFluid +
                " " +
                classes.imgBookCover
              }
            />
            <div className={classes.descriptionWrapper}>
              <Typography type="bold">{product.book_title}</Typography>
              <Typography type="italic">{product.author}</Typography>
              <Typography>{product.short_desc}</Typography>
            </div>

            <div style={{ marginBottom: "0px" }} />
          </div>
        </div>
      </Link>
      {isAdded ? (
        <div onClick={handleAddCart}>
          <div className={classes.addedMobileButtonPos}>
            {addedButtonMobile}
          </div>
        </div>
      ) : (
        <div onClick={handleAddCart} className={classes.mobileButtonPos}>
          {buttonMobile}
        </div>
      )}
      {extraSpace}
    </Grid>
  );
}
