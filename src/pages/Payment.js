import React, { useState, useContext } from "react";

// Custom components
import Typography from "../components/Typography";
import MultiUseMobile from "../styles/MultiUseMobile";
import Button from "../components/Button";
import BookDetailsModal from "./BookDetails/BookDetailsModal";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../feature/cartSlice";
import { selectUser, setUser } from "../feature/userSlice";

// Material-UI components
import { Container, Paper, Grid, TextField, Link } from "@material-ui/core";
import { Input } from '@material-ui/core';

// Firebase components
import * as firebaseUpdateCart from "../firebase/firebaseUpdateCart";
import * as firebaseUploadPaymentInfo from "../firebase/firebaseUploadPaymentInfo";
import { AuthContext } from "../components/Routing/Auth";

export default function Payment() {
  const { currentUser } = useContext(AuthContext);
  const classes = MultiUseMobile();
  const [openBookDetails, setBookDetailsOpen] = useState(false);

  // Get user data
  const userData = useSelector(selectUser);

  // Cart total price
  const cartItems = useSelector(selectCart).cart;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const totalPrice = Intl.NumberFormat().format(itemsPrice);

  const dispatch = useDispatch();

  // function to handle modal open for login
  const handleBookDetailsOpen = async () => {
    setBookDetailsOpen(true);
    await firebaseUploadPaymentInfo.uploadPaymentInfo(userData, cartItems);
  };
  // function to handle modal close for login
  const handleBookDetailsClose = () => {
    setBookDetailsOpen(false);
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
      <Navbar />
      <Container maxWidth="md">
        <div className={classes.sectionDesktop}>
          <Grid container direction="row" justifyContent="center" spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.center} size="heading">
                Checkout Page
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">1. Your Orders</Typography>

                {cartItems.map((item) => (
                  <div className={classes.spaceBetween}>
                    <div>
                      <Typography type="italic">{item.book_title}</Typography>
                      <Typography type="italic">
                        Rp. {Intl.NumberFormat().format(item.price)}
                      </Typography>
                    </div>
                    <Typography>
                      <Link
                        className={classes.link}
                        underline="none"
                        onClick={() => onRemove_(item)}
                      >
                        Hapus
                      </Link>
                    </Typography>
                  </div>
                ))}

                <div className={classes.extraSpace} />
                <div className={classes.spaceBetween}>
                  <TextField
                    style={{ marginRight: "5px" }}
                    id="filled-basic"
                    label="Kode Promo"
                    variant="filled"
                    fullWidth
                  />
                  <Button>Apply</Button>
                </div>
                <div className={classes.spaceBetween}>
                  <Typography size="subheading">TOTAL</Typography>
                  <Typography size="subheading" type="bold">
                    Rp. {totalPrice}
                  </Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">2. Checkout Form</Typography>
                <form className={classes.textFieldRoot}>
                  <TextField
                    id="filled-basic"
                    label="First Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Last Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Phone Number"
                    variant="filled"
                    fullWidth
                  />
                </form>

                <div className={classes.extraSpace} />

                <Typography size="subheading">3. Payment</Typography>
                <Typography type="bold">Step 1:</Typography>
                <Typography>
                  • Transfer ke rekening BCA 123456789 a/n Darren Lucky
                </Typography>
                <Typography>
                  • Atau, transfer ke rekening Mandiri 123456789 a/n Darren
                  Lucky
                </Typography>
                <Typography>
                  • Atau, transfer ke rekening BRI 123456789 a/n Darren Lucky
                </Typography>
                <Typography className={classes.paragraphSpace} type="bold">
                  Step 2:
                </Typography>
                <Typography>
                  Pastikan nominal yang anda transfer sesuai dengan harga yang
                  tertulis, bila anda transfer dengan nominal yang salah harap
                  hubungi customer service kami.
                </Typography>
                <Typography className={classes.paragraphSpace} type="bold">
                  Step 3:
                </Typography>
                <Typography>
                  Foto atau screenshot bukti transfer anda, lalu upload foto
                  melalui tombol "Attach File" di bawah!
                </Typography>
                <Button className={classes.paragraphSpace} color="secondary">
                  Attach File
                </Button>

                <div className={classes.extraSpace} />

                <Button fullWidth round onClick={handleBookDetailsOpen}>
                  Bayar Sekarang
                </Button>
                <BookDetailsModal
                  open={openBookDetails}
                  handleClose={handleBookDetailsClose}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div style={{ textAlign: "left" }} className={classes.sectionMobile}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography className={classes.center} size="heading">
                Checkout Page
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">1. Your Orders</Typography>

                {cartItems.map((item) => (
                  <div className={classes.spaceBetween}>
                    <div>
                      <Typography type="italic">{item.book_title}</Typography>
                      <Typography type="italic">
                        Rp. {Intl.NumberFormat().format(item.price)}
                      </Typography>
                    </div>
                    <Typography>
                      <Link
                        className={classes.link}
                        underline="none"
                        onClick={() => onRemove_(item)}
                      >
                        Hapus
                      </Link>
                    </Typography>
                  </div>
                ))}

                <div className={classes.extraSpace} />
                <div className={classes.spaceBetween}>
                  <TextField
                    style={{ marginRight: "5px" }}
                    id="filled-basic"
                    label="Kode Promo"
                    variant="filled"
                    fullWidth
                  />
                  <Button>Apply</Button>
                </div>
                <div className={classes.spaceBetween}>
                  <Typography size="subheading">TOTAL</Typography>
                  <Typography size="subheading" type="bold">
                    Rp. {totalPrice}
                  </Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paddedContent} elevation={5}>
                <form className={classes.textFieldRoot}>
                  <Typography size="subheading">2. Checkout Form</Typography>
                  <TextField
                    id="filled-basic"
                    label="First Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Last Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Phone Number"
                    variant="filled"
                    fullWidth
                  />
                </form>

                <div className={classes.extraSpace} />

                <Typography size="subheading">3. Payment</Typography>
                <Typography type="bold">Step 1:</Typography>
                <Typography>
                  • Transfer ke rekening BCA 123456789 a/n Darren Lucky
                </Typography>
                <Typography>
                  • Atau, transfer ke rekening Mandiri 123456789 a/n Darren
                  Lucky
                </Typography>
                <Typography>
                  • Atau, transfer ke rekening BRI 123456789 a/n Darren Lucky
                </Typography>
                <Typography className={classes.paragraphSpace} type="bold">
                  Step 2:
                </Typography>
                <Typography>
                  Pastikan nominal yang anda transfer sesuai dengan harga yang
                  tertulis, bila anda transfer dengan nominal yang salah harap
                  hubungi customer service kami.
                </Typography>
                <Typography className={classes.paragraphSpace} type="bold">
                  Step 3:
                </Typography>
                <Typography>
                  Foto atau screenshot bukti transfer anda, lalu upload foto
                  melalui tombol "Attach File" di bawah!
                </Typography>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                  />
                  <Button variant="contained" component="span" className={classes.paragraphSpace} color="secondary">
                    Attach File
                  </Button>{" "}
                </label>
                <div className={classes.extraSpace} />

                <Button fullWidth round onClick={handleBookDetailsOpen}>
                  Bayar Sekarang
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <BookDetailsModal
          open={openBookDetails}
          handleClose={handleBookDetailsClose}
        />
      </Container>
      <Footer />
    </div>
  );
}
