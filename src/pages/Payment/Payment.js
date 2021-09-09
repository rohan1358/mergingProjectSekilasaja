import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "react-router";

import ReactPixel from "react-facebook-pixel";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import InfoStyle from "../../styles/InfoAreaStyle";
import Box from "../../components/Box";
import PaymentStyle from "../../styles/PaymentStyle";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Loading from "../Loading";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";
import { selectUser } from "../../feature/userSlice";

// Material-UI components
import {
  Container,
  Paper,
  Grid,
  TextField,
  Link,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import { Alert } from "@material-ui/lab";
import ErrorIcon from "@material-ui/icons/Error";

// Firebase components
import fire from "../../firebase/fire";
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
import * as firebaseGetPromoCode from "../../firebase/firebaseGetPromoCode";
import * as firebaseUploadPaymentInfo from "../../firebase/firebaseUploadPaymentInfo";
import { AuthContext } from "../../components/Routing/Auth";

//Email js components
import * as emailService from "../../emailService/emailService";
import { beigeColor, primaryColor, secondaryColor } from "../../styles/Style";
import BuktiBCA from "./BuktiBCA";
import BuktiBRI from "./BuktiBRI";

const useStyles = makeStyles(InfoStyle);

const firestore = fire.firestore();

export default function Payment({ history }) {
  const { currentUser } = useContext(AuthContext);
  const classes = MultiUseMobile();
  const payment_classes = PaymentStyle();
  const styles = useStyles();
  const [value, setValue] = useState("female");

  const [pending, setPending] = useState(false);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  // Get user data
  const userData = useSelector(selectUser);

  // create state variables for each input
  const [namaDiRekening, setNamaDiRekening] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [akunTelegram, setAkunTelegram] = useState("");
  const [namaBank, setNamaBank] = useState("");

  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [promoError, setPromoError] = useState("");
  const [cartError, setCartError] = useState("");
  const [namaBankError, setNamaBankError] = useState("");
  const [promoCodeData, setPromoCodeData] = useState("");

  // Cart total price
  const promoCodeRef = useRef("");
  const [promoCode, setPromoCode] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart).cart;
  const [discountAmount, setDiscountAmount] = useState(0);
  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const totalPrice = Intl.NumberFormat().format(
    itemsPrice + discountAmount > 0 ? itemsPrice + discountAmount : 0
  );
  const [promoAdded, setPromoAdded] = useState(false);
  const [isSubAdded, setIsSubAdded] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    //Check if user is logged in or not, if not logout to home page.
    if (!currentUser) {
      console.log("User is not logged in, redirecting to login page...");
      return <Redirect to="/login" />;
    } else if (currentUser && !currentUser.emailVerified) {
      console.log(
        "Redirect to email not verified page to ask for email verification..."
      );
      return <Redirect to="/verify-email" />;
    }
  }, []);

  useEffect(() => {
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
    // console.log(promoCodeRef.current.value);
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetPromoCode.getPromoCode(
          promoCodeRef.current.value
        );
        if (results.length != 0) {
          if (results[0].code != "") {
            setPromoError("");
            setDiscountAmount(-1 * results[0].amount);
            setPromoAdded(true);
            setPromoCode(results);
            setPromoCodeData(results[0].code);
          } else {
            setPromoError("Kamu tidak mengisi kode promo apapun!");
            setPromoCodeData("");
          }
        } else {
          setPromoError("Tidak ditemukan kode promo!");
          setPromoCodeData("");
        }
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  };

  const handleChange = (e) => {
    //Check if file size exceeds 2mb or not
    setFileError("");
    var fsize = e.target.files[0].size;
    var convertedFileSize = Math.round(fsize / 1024);
    if (convertedFileSize >= 2048) {
      e.target.value = "";
      return setFileError(
        "File yang diupload melebihi 2mb, tolong upload ulang!"
      );
    } else {
      setFile(e.target.files[0]);
    }
  };

  console.log(promoCodeData);

  // function to handle modal open for login
  const handlePayment = async () => {
    setError("");
    setFileError("");
    setCartError("");
    setNamaBankError("");
    setIsEmailSent(false);

    // See if any input values are empty (ALL REQUIRED TO BE FILLED!)
    if (namaDiRekening.length === 0) {
      return setError("Nama di rekening belum terisi!");
    } else if (nomorRekening.length === 0) {
      return setError("Nomor rekening belum terisi!");
    } else if (namaBank.length === 0) {
      return setNamaBankError("Kamu belum memilih jenis pembayaran!");
    } else if (cartItems.length === 0) {
      // console.log("belum beli apa-apa");
      return setCartError("Kamu belum membeli apa-apa!");
    }

    // See if image has been uploaded or not (REQUIRED!)
    if (!file || file.length === 0) {
      return setFileError("Tolong upload image bukti pembayaran!");
    }

    setPending(true);
    //Put payment information into firestore storage and database
    var image_url = await firebaseUploadPaymentInfo.uploadPaymentInfo(
      userData,
      cartItems,
      file,
      totalPrice,
      akunTelegram,
      namaBank,
      nomorRekening,
      namaDiRekening,
      promoCodeData
    );

    firestore.collection("users").doc(currentUser.uid).update({
      cart: [],
    });

    if (promoCode.length != 0) {
      firestore.collection("promo").doc(promoCode[0].code).update({
        code: "",
        amount: 0,
      });
    }

    // //Send email notification
    // await emailService.sendPaymentNotification(
    //   userData,
    //   image_url,
    //   namaBank,
    //   namaDiRekening,
    //   nomorRekening,
    //   promoCodeData,
    //   cartItems
    // );

    if (image_url) {
      setPending(false);
      setIsEmailSent(true);
    }
  };

  // Image Preview bukti pembayaran
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Go to payment success page if succeeded in uploading to firebase and send email notification
  if (isEmailSent && !pending) {
    history.push("/payment-success");
  }

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "120px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
      <Container maxWidth="md">
        <div className={classes.sectionDesktop}>
          <Grid container direction="row" justifyContent="center" spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.center} size="heading">
                Checkout Page
              </Typography>
            </Grid>

            <Grid item xs={6}>
              {isSubAdded ? (
                <></>
              ) : (
                <div>
                  <Paper className={classes.paddedContent} elevation={5}>
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      type="italic"
                      size="bold"
                    >
                      <ErrorIcon
                        fontSize="large"
                        style={{ marginRight: "10px" }}
                      />
                      Dengan hanya Rp. 1.000/hari, Kamu bisa memiliki akses
                      untuk semua buku!
                    </Typography>
                    <Button href="/pricing" round fullWidth>
                      Berlanggan sekarang!
                    </Button>
                  </Paper>

                  <div style={{ marginBottom: "20px" }} />
                </div>
              )}

              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">1. Your Orders</Typography>

                {cartItems.map((item) => (
                  <div className={classes.spaceBetween}>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <img
                          src={item.coverLink}
                          alt={item.book_title}
                          className={
                            styles.imgFluid + " " + styles.imgBookCover
                          }
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography type="italic">{item.book_title}</Typography>
                        <Typography type="italic">
                          Rp. {Intl.NumberFormat().format(item.price)}
                        </Typography>
                      </Grid>
                    </Grid>

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

                {!!promoAdded ? (
                  <div>
                    <Typography type="italic" size="bold" color="dangerColor">
                      Pemotongan dari kode promo
                    </Typography>
                    <Typography type="italic" size="bold" color="dangerColor">
                      - Rp. {Intl.NumberFormat().format(-1 * discountAmount)}
                    </Typography>
                  </div>
                ) : (
                  <></>
                )}

                <div className={classes.extraSpace} />
                {promoError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{promoError}</Alert>
                  </div>
                )}
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
                    label="Nama Lengkap Di Rekening"
                    variant="filled"
                    value={namaDiRekening}
                    onChange={(e) => setNamaDiRekening(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Nomor Rekening atau Nomor HP QRIS"
                    variant="filled"
                    value={nomorRekening}
                    onChange={(e) => setNomorRekening(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Akun Telegram untuk diinvite ke group eksklusif"
                    variant="filled"
                    value={akunTelegram}
                    onChange={(e) => setAkunTelegram(e.target.value)}
                    fullWidth
                  />
                </form>

                <div style={{ marginTop: "20px" }} />

                <Typography size="subheading">3. Payment</Typography>

                {namaBankError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{namaBankError}</Alert>
                  </div>
                )}
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleRadioChange}
                    required
                  >
                    <FormControlLabel
                      value="BCA Transfer"
                      control={<Radio style={{ color: secondaryColor }} />}
                      label="BCA Transfer"
                      onChange={(e) => setNamaBank(e.target.value)}
                    />
                    <Box
                      text={
                        <div>
                          <Typography>
                            Transfer nominal yang akan dibayarkan ke:{" "}
                            <div>
                              <strong>No. Rekening: 3720266503</strong>
                            </div>{" "}
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Nama: Darren Lucky Buntoro</strong>
                            </div>
                            Lampirkan bukti pembayaran dibawah.
                          </Typography>
                          <BuktiBCA open={open} handleClose={handleClose} />
                          <Button
                            color="secondary"
                            onClick={handleClickOpen}
                            round
                            fullWidth
                          >
                            Contoh Bukti
                          </Button>
                        </div>
                      }
                      value="BCA Transfer"
                      chosenValue={value}
                    ></Box>
                    <FormControlLabel
                      value="BRI Transfer"
                      control={<Radio style={{ color: secondaryColor }} />}
                      label="BRI Transfer"
                      onChange={(e) => setNamaBank(e.target.value)}
                    />
                    <Box
                      text={
                        <div>
                          <Typography>
                            Transfer nominal yang akan dibayarkan ke:{" "}
                            <div>
                              <strong>No. Rekening: 0541 0100 0710 568</strong>
                            </div>{" "}
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Nama: Darren Lucky Buntoro</strong>
                            </div>
                            Lampirkan bukti pembayaran dibawah.
                          </Typography>
                          <BuktiBRI open={open} handleClose={handleClose} />
                          <Button
                            color="secondary"
                            onClick={handleClickOpen}
                            round
                            fullWidth
                          >
                            Contoh Bukti
                          </Button>
                        </div>
                      }
                      value="BRI Transfer"
                      chosenValue={value}
                    ></Box>
                    <FormControlLabel
                      disabled
                      value="QRIS (DANA, GoPay, ShopeePay, OVO, LinkAja!)"
                      control={<Radio style={{ color: secondaryColor }} />}
                      label="QRIS (DANA, GoPay, OVO, ShopeePay, LinkAja!) akan tersedia tanggal 20 September 2021"
                      onChange={(e) => setNamaBank(e.target.value)}
                    />
                    <Box
                      text={
                        <div>
                          <Typography>
                            asdasdsasdasdasdasd asdasdasdadas asdaas sadassdasda
                            s sdsda
                          </Typography>
                          {/* <BuktiBCA open={open} handleClose={handleClose} /> */}
                          <Button
                            color="secondary"
                            onClick={handleClickOpen}
                            round
                          >
                            Contoh
                          </Button>
                        </div>
                      }
                      value="QRIS (DANA, GoPay, ShopeePay, OVO, LinkAja!)"
                      chosenValue={value}
                    ></Box>
                  </RadioGroup>
                </FormControl>

                <Typography style={{ marginTop: "20px" }} size="subheading">
                  4. Lampirkan Bukti Pembayaran
                </Typography>

                {fileError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{fileError}</Alert>
                  </div>
                )}

                <TextField
                  required
                  id="outlined-full-width"
                  label="Lampirkan Bukti Pembayaran"
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

                {cartError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{cartError}</Alert>
                  </div>
                )}
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
              {isSubAdded ? (
                <></>
              ) : (
                <div>
                  <Paper className={classes.paddedContent} elevation={5}>
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      type="italic"
                      size="bold"
                    >
                      <ErrorIcon
                        fontSize="large"
                        style={{ marginRight: "10px" }}
                      />
                      Dengan hanya Rp. 1.000/hari, Kamu bisa memiliki akses
                      untuk semua buku!
                    </Typography>
                    <Button href="/pricing" round fullWidth>
                      Berlanggan sekarang!
                    </Button>
                  </Paper>

                  <div style={{ marginBottom: "20px" }} />
                </div>
              )}
              <Paper className={classes.paddedContent} elevation={5}>
                <Typography size="subheading">1. Your Orders</Typography>

                {cartItems.map((item) => (
                  <div className={classes.spaceBetween}>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <img
                          src={item.coverLink}
                          alt={item.book_title}
                          className={
                            styles.imgFluid + " " + styles.imgBookCover
                          }
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography type="italic">{item.book_title}</Typography>
                        <Typography type="italic">
                          Rp. {Intl.NumberFormat().format(item.price)}
                        </Typography>
                      </Grid>
                    </Grid>
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
                {promoError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{promoError}</Alert>
                  </div>
                )}
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
                    label="Nama Lengkap Di Rekening"
                    variant="filled"
                    value={namaDiRekening}
                    onChange={(e) => setNamaDiRekening(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Nomor Rekening atau Nomor HP QRIS"
                    variant="filled"
                    value={nomorRekening}
                    onChange={(e) => setNomorRekening(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    id="filled-basic"
                    label="Akun Telegram untuk diinvite ke group eksklusif"
                    variant="filled"
                    value={akunTelegram}
                    onChange={(e) => setAkunTelegram(e.target.value)}
                    fullWidth
                  />
                </form>

                <div style={{ marginTop: "20px" }} />

                <Typography size="subheading">3. Payment</Typography>

                {namaBankError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{namaBankError}</Alert>
                  </div>
                )}

                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="BCA Transfer"
                      control={<Radio style={{ color: secondaryColor }} />}
                      label="BCA Transfer"
                      onChange={(e) => setNamaBank(e.target.value)}
                    />
                    <Box
                      text={
                        <div>
                          <Typography>
                            Transfer nominal yang akan dibayarkan ke:{" "}
                            <div>
                              <strong>No. Rekening: 3720266503</strong>
                            </div>{" "}
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Nama: Darren Lucky Buntoro</strong>
                            </div>
                            Lampirkan bukti pembayaran dibawah.
                          </Typography>
                          <BuktiBCA open={open} handleClose={handleClose} />
                          <Button
                            color="secondary"
                            onClick={handleClickOpen}
                            round
                            fullWidth
                          >
                            Contoh Bukti
                          </Button>
                        </div>
                      }
                      value="BCA Transfer"
                      chosenValue={value}
                    ></Box>
                    <FormControlLabel
                      value="BRI Transfer"
                      control={<Radio style={{ color: secondaryColor }} />}
                      label="BRI Transfer"
                      onChange={(e) => setNamaBank(e.target.value)}
                    />
                    <Box
                      text={
                        <div>
                          <Typography>
                            Transfer nominal yang akan dibayarkan ke:{" "}
                            <div>
                              <strong>No. Rekening: 0541 0100 0710 568</strong>
                            </div>{" "}
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Nama: Darren Lucky Buntoro</strong>
                            </div>
                            Lampirkan bukti pembayaran dibawah.
                          </Typography>
                          <BuktiBRI open={open} handleClose={handleClose} />
                          <Button
                            color="secondary"
                            onClick={handleClickOpen}
                            round
                            fullWidth
                          >
                            Contoh Bukti
                          </Button>
                        </div>
                      }
                      value="BRI Transfer"
                      chosenValue={value}
                    ></Box>
                    <FormControlLabel
                      disabled
                      value="QRIS (DANA, GoPay, ShopeePay, OVO, LinkAja!)"
                      control={<Radio style={{ color: secondaryColor }} />}
                      label="QRIS (DANA, GoPay, OVO, ShopeePay, LinkAja!) akan tersedia tanggal 20 September 2021"
                      onChange={(e) => setNamaBank(e.target.value)}
                    />
                    <Box
                      text={
                        <div>
                          <Typography>
                            asdasdsasdasdasdasd asdasdasdadas asdaas sadassdasda
                            s sdsda
                          </Typography>
                          {/* <BuktiBCA open={open} handleClose={handleClose} /> */}
                          <Button
                            color="secondary"
                            onClick={handleClickOpen}
                            round
                          >
                            Contoh
                          </Button>
                        </div>
                      }
                      value="QRIS (DANA, GoPay, ShopeePay, OVO, LinkAja!)"
                      chosenValue={value}
                      onChange={(e) => setNamaBank(e.target.value)}
                    ></Box>
                  </RadioGroup>
                </FormControl>

                <Typography style={{ marginTop: "20px" }} size="subheading">
                  4. Lampirkan Bukti Pembayaran
                </Typography>
                {fileError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{fileError}</Alert>
                  </div>
                )}

                <TextField
                  required
                  id="outlined-full-width"
                  label="Lampirkan Bukti Pembayaran"
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

                {cartError && (
                  <div className={classes.alertRoot}>
                    <Alert severity="error">{cartError}</Alert>
                  </div>
                )}
                <Button fullWidth round onClick={handlePayment} type="submit">
                  <PaymentIcon /> Bayar Sekarang
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>

      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
        <Tooltip
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            style={{
              position: "fixed",
              bottom: 15,
              left: 15,
              width: "60px",
              "&:hover": {
                filter: "brightness(150%)",
              },
            }}
          />
        </Tooltip>
      </a>

      <Footer />
    </div>
  );
}
