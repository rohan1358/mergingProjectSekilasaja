import React, { useContext, useEffect, useState } from "react";

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
import { makeStyles, Grid, Paper } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { secondaryColor } from "../../styles/Style";

const useStyles = makeStyles(InfoAreaStyle);

export default function Basket({}) {
  const classes = useStyles();
  const mobile = MultiUseMobile();
  const cartItems = useSelector(selectCart).cart;
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [isSubAdded, setIsSubAdded] = useState(false);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const totalPrice = Intl.NumberFormat().format(itemsPrice);

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

  useEffect(() => {
    if (cartItems.length == 0) return setIsSubAdded(true);

    cartItems.map((x) => {
      if (
        x.book_title == "Subscription 1 Bulan" ||
        x.book_title == "Subscription 3 Bulan" ||
        x.book_title == "Subscription 6 Bulan" ||
        x.book_title == "Subscription 12 Bulan"
      ) {
        setIsSubAdded(true);
      } else {
        setIsSubAdded(false);
      }
    });
  }, [cartItems]);

  return (
    <div>
      <div>
        {isSubAdded ? (
          <></>
        ) : (
          <div>
            <Paper
              style={{ textAlign: "center", padding: "5px" }}
              elevation={5}
            >
              <ErrorIcon
                fontSize="large"
                style={{ marginRight: "10px", color: secondaryColor }}
              />
              <Typography
                style={{
                  textAlign: "center",
                }}
                type="italic"
                size="bold"
              >
                Dengan hanya Rp. 1.000/hari, kamu bisa mempunyai akses terhadap
                semua buku!
              </Typography>
              <Button href="/pricing" round fullWidth>
                Berlanggan sekarang!
              </Button>
            </Paper>

            <div style={{ marginBottom: "20px" }} />
          </div>
        )}

        {cartItems.length === 0 && (
          <Typography type="italic">Your Cart is empty</Typography>
        )}

        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <Grid container>
              <Grid item xs={12}></Grid>
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
            <Button fullWidth round href="/payment">
              Bayar Sekarang!
            </Button>
            <div className={mobile.extraSpace} />
          </>
        )}
      </div>
    </div>
  );
}
