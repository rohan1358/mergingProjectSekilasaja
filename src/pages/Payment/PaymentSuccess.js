import React, { useState, useContext, useEffect } from "react";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";

// Material-UI components
import { Container, Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import { AuthContext } from "../../components/Routing/Auth";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";
import { selectUser } from "../../feature/userSlice";

//Firebase
import fire from "../../firebase/fire";

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const firestore = fire.firestore();
  const { currentUser } = useContext(AuthContext);
  const userData = useSelector(selectUser);
  const cart = useSelector(selectCart);

  useEffect(() => {
    const emptyCart = async () => {
      if(currentUser && cart.cart.length > 0){
        firestore.collection("users").doc(currentUser.uid).update({
          cart: [],
        }).then(function() {
          dispatch(setCart([]));
          console.log("Emptied cart...");
        }).catch((err) => {
          var errorCode = err.code;
          var errorMessage = err.message;
          console.log("Error: " + errorCode + "\n\n" + errorMessage);
        });
      }
    };
    emptyCart();
  }, []);
  
  const multi = MultiUseMobile();
  return (
    <div>
      <Container>
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <div className={multi.extraSpace} />
          </Grid>
          <Grid item xs={12}>
            <div className={multi.extraSpace} />
          </Grid>
          <Grid item xs={12}>
            <div className={multi.extraSpace} />
          </Grid>

          <Grid item xs={12}>
            <div className={multi.center}>
              <Typography type="italic" size="heading">
                Pembayaran Berhasil!
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={multi.center}>
              <Button href="/">
                <HomeIcon />
                Kembali ke halaman beranda
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
