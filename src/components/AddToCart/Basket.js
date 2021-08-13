import React from "react";

// Custom components
import Typography from "../Typography";
import Button from "../Button";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Material-UI components
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(InfoAreaStyle);

export default function Basket(props) {
  const classes = useStyles();
  const mobile = MultiUseMobile();

  const { cartItems, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice;

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
                  src={item.cover}
                  alt={item.title}
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
                <Typography type="bold">Kilasan {item.title}</Typography>
                <Typography className="col-2 text-right">
                  Rp. {item.price.toFixed(0)}
                </Typography>

                <Button
                  color="secondary"
                  onClick={() => onRemove(item)}
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
              <Typography type="bold">Rp. {totalPrice.toFixed(2)}</Typography>
            </Grid>
            <Button
              fullWidth
              round
              onClick={() => alert("Implement Checkout!")}
            >
              Checkout
            </Button>
            <div className={mobile.extraSpace} />
          </>
        )}
      </div>
    </div>
  );
}
