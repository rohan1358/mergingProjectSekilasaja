import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";
import { selectUser } from "../../feature/userSlice";

// Material-UI components
import { Container, Paper, Grid, TextField, Link } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import { Alert } from "@material-ui/lab";

// Firebase components
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
import * as firebaseGetPromoCode from "../../firebase/firebaseGetPromoCode";
import * as firebaseUploadPaymentInfo from "../../firebase/firebaseUploadPaymentInfo";
import { AuthContext } from "../../components/Routing/Auth";

//Email js components
import * as emailService from "../../emailService/emailService";

export default function Payment({ history }) {
  const { currentUser } = useContext(AuthContext);
  const classes = MultiUseMobile();

  // Get user data
  const userData = useSelector(selectUser);

  //For upload image
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const fileRef = useRef();
  const phoneNumberRef = useRef();
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");

  // Cart total price
  const promoCodeRef = useRef("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart).cart;
  const [discountAmount, setDiscountAmount] = useState(0);
  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const totalPrice = Intl.NumberFormat().format(
    itemsPrice + discountAmount > 0 ? itemsPrice + discountAmount : 0
  );
  const [promoAdded, setPromoAdded] = useState(false);

  const onRemove_ = (product) => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.DeleteToCart(
        currentUser.uid,
        product
      );
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

  const handleApplyPromo = () => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetPromoCode.getPromoCode(
          promoCodeRef.current.value
        );
        if (results.length != 0) {
          setDiscountAmount(-1 * results[0].amount);
          setPromoAdded(true);
        }
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // function to handle modal open for login
  const handlePayment = async () => {
    setError("");
    setFileError("");

    if (firstNameRef.current.value.length === 0) {
      return setError("Ada bagian yang belum terisi!");
    }

    if (
      fileRef.current.value === undefined ||
      fileRef.current.value === [] ||
      fileRef.current.value === null
    ) {
      return setFileError("Bukti transfer belum diupload!");
    }

    //Put payment information into firestore storage and database
    var image_url = await firebaseUploadPaymentInfo.uploadPaymentInfo(
      userData,
      cartItems,
      file,
      totalPrice
    );
    //Send email notification
    await emailService.sendPaymentNotification(userData, image_url);
    history.push("/payment-success");
  };

  return (
    <div>
      <Navbar history={history} />
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
                    inputRef={promoCodeRef}
                  />
                  {!!promoAdded ? (
                    <Button color="gray">✔ Applied</Button>
                  ) : (
                    <Button onClick={handleApplyPromo}>Apply</Button>
                  )}
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
                <form
                  onSubmit={handlePayment}
                  className={classes.textFieldRoot}
                >
                  {error && (
                    <div className={classes.alertRoot}>
                      <Alert severity="error">{error}</Alert>
                    </div>
                  )}
                  <TextField
                    required
                    id="filled-basic"
                    label="First Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Last Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Phone Number"
                    variant="filled"
                    fullWidth
                  />
                </form>

                <div className={classes.extraSpace} />

                <Typography size="subheading">3. Payment</Typography>
                {fileError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{fileError}</Alert>
                  </div>
                )}
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
                {/* <Button className={classes.paragraphSpace} color="secondary">
                  Choose File
                </Button> */}

                <TextField
                  required
                  id="outlined-full-width"
                  label="Image Upload"
                  name="upload-photo"
                  type="file"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={handleChange}
                />

                <div className={classes.extraSpace} />

                <Button fullWidth round onClick={handlePayment} type="submit">
                  <PaymentIcon />
                  Bayar Sekarang
                </Button>
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
                  {!!promoAdded ? (
                    <Button color="gray">✔ Applied</Button>
                  ) : (
                    <Button onClick={handleApplyPromo}>Apply</Button>
                  )}
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
                <form
                  onSubmit={handlePayment}
                  className={classes.textFieldRoot}
                >
                  <Typography size="subheading">2. Checkout Form</Typography>
                  <TextField
                    inputRef={firstNameRef}
                    id="filled-basic"
                    label="First Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    inputRef={lastNameRef}
                    id="filled-basic"
                    label="Last Name"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    inputRef={emailRef}
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    inputRef={phoneNumberRef}
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
                <form>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      ref={fileRef}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      className={classes.paragraphSpace}
                      color="secondary"
                    >
                      Attach File
                    </Button>
                  </label>
                </form>

                <div className={classes.extraSpace} />

                <Button fullWidth round onClick={handlePayment} type="submit">
                  <PaymentIcon /> Bayar Sekarang
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
