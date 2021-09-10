import React, { useState, useContext, useEffect } from "react";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";

// Material-UI components
import { Container, Grid, Paper } from "@material-ui/core";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import { AuthContext } from "../../components/Routing/Auth";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";
import { selectUser } from "../../feature/userSlice";

//Firebase
import fire from "../../firebase/fire";

export default function PaymentSuccess() {
  // Styles
  const multi = MultiUseMobile();

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const cart = useSelector(selectCart);

  // Auth
  const firestore = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const emptyCart = async () => {
      if (currentUser && cart.cart.length > 0) {
        firestore
          .collection("users")
          .doc(currentUser.uid)
          .update({
            cart: [],
          })
          .then(function () {
            dispatch(setCart([]));
            console.log("Emptied cart...");
          })
          .catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log("Error: " + errorCode + "\n\n" + errorMessage);
          });
      }
    };
    emptyCart();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "130px" }} />
      <Container maxWidth="xs">
        <Paper elevation={5} style={{ textAlign: "center", padding: "30px" }}>
          <BeachAccessIcon className={multi.iconColor} fontSize="large" />
          <Typography size="subheading">
            Selamat! Pembayaran kamu berhasil.
          </Typography>

          <Typography>
            Mohon menunggu 1x24 jam untuk order kamu diproses dan direview oleh
            tim kami. Jika belum aktif setelah 1x24 jam, silahkan hubungi
            customer service kami!
          </Typography>

          <div className={multi.extraSpace} />

          <Button round href="/">
            Kembali ke halaman beranda ►
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
