import React, { useContext, useEffect } from "react";

// Custom components
import Typography from "../Typography";
import Button from "../Button";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Firebase components
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
import { AuthContext } from "../Routing/Auth";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";

// Material-UI components
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(InfoAreaStyle);

export default function Basket({ history }) {
  const classes = useStyles();
  const mobile = MultiUseMobile();
  const cartItems = useSelector(selectCart).cart;
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const totalPrice = Intl.NumberFormat().format(itemsPrice);

  //Handle event to navigate to accounts page
  const goToPayment = () => {
    // console.log(history);
    history.push(`/payment`);
  };

  const onRemove_ = (product) => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.DeleteToCart(
        currentUser.uid,
        product
      );
      console.log(results);
      dispatch(
        setCart([
          ...cartItems.filter(function (ele) {
            return ele.book_title != product.book_title;
          }),
        ])
      );
    };
    fetchData();
  };

  return (
    <div>
      <div>
        {cartItems.length === 0 && (
          <Typography type="italic">Your Cart is empty</Typography>
        )}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <Grid container>
              <Grid item xs={4}>
                <img
                  src={item.coverLink}
                  alt={item.book_title}
                  className={
                    classes.imgRounded +
                    " " +
                    classes.imgFluid +
                    " " +
                    classes.imgBookCover
                  }
                />
              </Grid>

              <Grid item xs={1} />

              <Grid item xs={7}>
                <Typography type="bold">{item.book_title}</Typography>
                <Typography className="col-2 text-right">
                  Rp. {Intl.NumberFormat().format(item.price)}
                </Typography>

                <Button
                  color="secondary"
                  onClick={() => onRemove_(item)}
                  className="remove"
                >
                  Hapus
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <div className={mobile.extraSpace} />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography type="bold">TOTAL</Typography>
              <Typography type="bold">Rp. {totalPrice}</Typography>
            </Grid>
            <Button fullWidth round onClick={goToPayment}>
              Bayar Sekarang!
            </Button>
            <div className={mobile.extraSpace} />
          </>
        )}
      </div>
    </div>
  );
}
