import React, { useContext, useState, useEffect } from "react";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Typography from "../components/Typography";
import Button from "../components/Button";
import Header from "../components/NavBar/Header";
import HeaderLinks from "../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../components/NavBar/HeaderLinksMobile";
import Footer from "../components/Footer";
import { beigeColor, primaryColor, secondaryColor } from "../styles/Style";
import Loading from "./Loading";

// Material-UI components
import {
  Container,
  Grid,
  CardContent,
  CardActions,
  CardHeader,
  Card,
  makeStyles,
} from "@material-ui/core";

// Firebase components
import { AuthContext } from "../components/Routing/Auth";
import * as firebaseUpdateCart from "../firebase/firebaseUpdateCart";
import * as firebaseGetUserDataById from "../firebase/firebaseGetUserDataById";
import * as firebaseGetSubscription from "../firebase/firebaseGetSubscription";
import fire from "../firebase/fire";

// Redux
import { selectCart, setCart } from "../feature/cartSlice";
import { useSelector, useDispatch } from "react-redux";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

const useStyles = makeStyles((theme) => ({
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionMobile: {
    display: "block",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  ribbon: {
    backgroundColor: secondaryColor,
    position: "absolute",
    color: beigeColor,
    width: 150,
    textAlign: "center",
    textTransform: "uppercase",
    padding: 5,
    top: -1,
    marginLeft: 60,
    fontWeight: "bold",
  },
  ribbonMobile: {
    backgroundColor: secondaryColor,
    position: "absolute",
    color: beigeColor,
    width: 100,
    textAlign: "center",
    textTransform: "uppercase",
    padding: 5,
    top: -10,
    marginLeft: 0,
    fontWeight: "bold",
  },
  span: {},
  cross: {
    backgroundColor: "transparent",
    backgroundImage:
      "gradient(linear, 19.1% -7.9%, 81% 107.9%, color-stop(0, transparent), color-stop(.48, transparent), color-stop(.5, #000), color-stop(.52, transparent), color-stop(1, transparent))",
    backgroundImage:
      "repeating-linear-gradient(168deg, transparent 0%, transparent 48%, red 50%, transparent 52%, transparent 100%)",
  },
  cardHover: {
    position: "relative",
    top: 0,
    transition: "top ease 0.5s",
    "&:hover": {
      top: "-10px",
    },
  },
  orLabel: {
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid #41444b",
    lineHeight: "0.1em",
    margin: "10px 0 20px",
  },
  middle: {
    fontSize: "30px",
    fontWeight: 500,
    background: "#FAFAFA",
    padding: "0 10px",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: primaryColor,
  },
  cardHeaderKilas: {
    backgroundColor: secondaryColor,
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

export default function PricingPage({ match, history }) {
  // Styles
  const classes = useStyles();

  // Auth
  const { currentUser } = useContext(AuthContext);
  const firestore = fire.firestore();

  // Redux
  const cartItems = useSelector(selectCart).cart;
  const dispatch = useDispatch();

  // useState hooks
  const [userData, setUserData] = useState(null);
  const [subOne, setSubOne] = useState(null);
  const [subThree, setSubThree] = useState(null);
  const [subSix, setSubSix] = useState(null);
  const [subTwelve, setSubTwelve] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }

    const fetchSubData = async () => {
      const results1 = await firebaseGetSubscription.getSubscription(
        "Subscription 1 Bulan"
      );
      setSubOne(results1);
    };
    fetchSubData();

    return function cleanup() {
      setLoading(true);
      setSubOne(null);
      setSubThree(null);
      setSubSix(null);
      setSubTwelve(null);
    };
  }, []);

  useEffect(() => {
    const fetchSubData = async () => {
      const results3 = await firebaseGetSubscription.getSubscription(
        "Subscription 3 Bulan"
      );
      setSubThree(results3);
    };
    fetchSubData();
  }, [subOne]);

  useEffect(() => {
    const fetchSubData = async () => {
      const results6 = await firebaseGetSubscription.getSubscription(
        "Subscription 6 Bulan"
      );
      setSubSix(results6);
    };
    fetchSubData();
  }, [subThree]);

  useEffect(() => {
    const fetchSubData = async () => {
      const results12 = await firebaseGetSubscription.getSubscription(
        "Subscription 12 Bulan"
      );
      setSubTwelve(results12);
    };
    fetchSubData();
  }, [subSix]);

  useEffect(() => {
    setLoading(false);
  }, [subTwelve]);

  const handleAddCartOne = () => {
    const fetchData = async () => {
      // if (cartItems.length != 0) {
      //   firestore.collection("users").doc(currentUser.uid).update({
      //     cart: [],
      //   });
      // }
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subOne
      );

      if (results) {
        history.push("/payment");
      }

      const exist = cartItems.find(
        (x) => x.book_title === "Subscription 1 Bulan"
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, subOne]));
      }
    };
    fetchData();
    console.log(subOne);
  };

  const handleAddCartThree = () => {
    const fetchData = async () => {
      // if (cartItems.length != 0) {
      //   firestore.collection("users").doc(currentUser.uid).update({
      //     cart: [],
      //   });
      // }
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subThree
      );

      if (results) {
        history.push("/payment");
      }

      const exist = cartItems.find(
        (x) => x.book_title === "Subscription 3 Bulan"
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, subThree]));
      }
    };
    fetchData();
    console.log(subThree);
  };

  const handleAddCartSix = () => {
    const fetchData = async () => {
      // if (cartItems.length != 0) {
      //   firestore.collection("users").doc(currentUser.uid).update({
      //     cart: [],
      //   });
      // }

      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subSix
      );

      if (results) {
        history.push("/payment");
      }

      const exist = cartItems.find(
        (x) => x.book_title === "Subscription 6 Bulan"
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, subSix]));
      }
    };
    fetchData();
    console.log(subSix);
  };

  const handleAddCartTwelve = () => {
    const fetchData = async () => {
      // if (cartItems.length != 0) {
      //   firestore.collection("users").doc(currentUser.uid).update({
      //     cart: [],
      //   });
      // }

      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subTwelve
      );

      if (results) {
        history.push("/payment");
      }

      const exist = cartItems.find(
        (x) => x.book_title === "Subscription 12 Bulan"
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, subTwelve]));
      }
    };
    fetchData();
    console.log(subTwelve);
  };

  const tiers = [
    {
      title: "12 Bulan",
      monthlyPrice: "28.250",
      price: "588.000",
      hemat: "249.000",
      currentPrice: "339.000",
      disclaimer: "* Pembayaran langsung 12 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartTwelve,
    },
    {
      title: "6 Bulan",
      monthlyPrice: "31.500",
      price: "294.000",
      hemat: "105.000",
      currentPrice: "189.000",
      disclaimer: "* Pembayaran langsung 6 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartSix,
    },
    {
      title: "3  Bulan",
      monthlyPrice: "33.000",
      price: "147.000",
      hemat: "48.000",
      currentPrice: "99.000",
      disclaimer: "* Pembayaran langsung 3 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartThree,
    },
    {
      title: "1  Bulan",
      monthlyPrice: "39.000",
      price: "49.000",
      hemat: "10.000",
      currentPrice: "39.000",
      disclaimer: "* Pembayaran langsung 1 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartOne,
    },
  ];

  if (loading) {
    console.log("Loading screen...");
    return (
      <>
        <Loading />
      </>
    );
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

      {!!currentUser ? (
        <Container component="main">
          <Typography style={{ textAlign: "center" }} size="heading">
            Subscription
          </Typography>

          <div className={classes.sectionDesktop}>
            <Grid container spacing={2} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid
                  style={{
                    marginBottom: "10px",
                  }}
                  item
                  key={tier.title}
                  xs={12}
                  md={3}
                  className={classes.cardHover}
                  sm={tier.title === "Enterprise" ? 12 : 6}
                >
                  <Card>
                    <CardHeader
                      title={
                        <Typography size="subheading">{tier.title}</Typography>
                      }
                      subheader={
                        tier.title === "12 Bulan" ? (
                          <Typography className={classes.ribbon}>
                            {/* <img src={BestValue} className={info.imgBestValue} /> */}
                            BEST VALUE
                          </Typography>
                        ) : null
                      }
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      className={classes.cardHeader}
                    ></CardHeader>
                    <CardContent>
                      <div className={classes.cardPricing}>
                        <Typography
                          type="subheading"
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          Rp. {tier.monthlyPrice}
                        </Typography>
                        <Typography type="italic">/bulan</Typography>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Typography
                          type="italic"
                          style={{
                            color: "red",
                            marginBottom: 0,
                            fontWeight: "bold",
                            // transform: "rotate(-12deg)",
                          }}
                        >
                          Hemat Rp. {tier.hemat}
                        </Typography>
                        <Typography
                          style={{
                            // textDecoration: "line-through",
                            // textDecorationColor: "red",
                            marginBottom: "0",
                            fontSize: "20px",
                          }}
                          className={classes.cross}
                        >
                          Rp. {tier.price}
                        </Typography>
                        <Typography
                          size="italic"
                          type="bold"
                          style={{
                            fontSize: "20px",
                            marginTop: "0",
                            marginBottom: "25px",
                          }}
                        >
                          Jadi Rp. {tier.currentPrice}
                        </Typography>
                        <Typography style={{ fontSize: "12px" }} type="italic">
                          {tier.disclaimer}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={tier.route}
                        round
                        fullWidth
                        color="primary"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, orange, yellow)",
                        }}
                      >
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <div style={{ marginTop: "100px" }} />

            <Typography className={classes.orLabel} type="italic">
              <span className={classes.middle}>ATAU</span>
            </Typography>

            <div style={{ marginTop: "100px" }} />

            <Typography style={{ textAlign: "center" }} size="heading">
              Individual
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
              <Grid
                style={{
                  marginBottom: "10px",
                }}
                item
                xs={12}
                md={3}
                className={classes.cardHover}
              >
                <Card>
                  <CardHeader
                    title={
                      <Typography color="beigeColor" size="subheading">
                        Beli Per Kilas
                      </Typography>
                    }
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === "12 Bulan" ? <StarIcon /> : null}
                    className={classes.cardHeaderKilas}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        type="subheading"
                        style={{ fontSize: "20px" }}
                      >
                        Rp. 30.000
                      </Typography>
                      <Typography type="italic">/Kilas</Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ marginTop: "-30px" }}
                      href="/library"
                      round
                      fullWidth
                      color="secondary"
                    >
                      Beli Sekarang!
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div className={classes.sectionMobile}>
            <Grid container spacing={2} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    style={{
                      marginBottom: "22px",
                    }}
                    item
                    xs={12}
                    md={3}
                    className={classes.cardHover}
                  >
                    <Card elevation={5} style={{ padding: "15px" }}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={3}
                      >
                        <Grid item xs={3}>
                          {tier.title === "12 Bulan" ? (
                            <Typography className={classes.ribbonMobile}>
                              {/* <img src={BestValue} className={info.imgBestValue} /> */}
                              <div>BEST</div> VALUE
                            </Typography>
                          ) : null}
                          <Typography
                            style={{
                              textAlign: "center",
                            }}
                            size="subheading"
                          >
                            {tier.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <div
                            style={{
                              borderRight: "1px solid #41444b",
                              height: "170px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <div>
                            <Typography
                              type="italic"
                              style={{
                                color: "red",
                                marginBottom: 0,
                                fontWeight: "bold",
                              }}
                            >
                              Hemat Rp. {tier.hemat}
                            </Typography>

                            <Typography
                              type="subheading"
                              style={{
                                marginTop: "0",
                                fontSize: "25px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              Rp. {tier.monthlyPrice}
                              <Typography type="italic">/bulan</Typography>
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              style={{ fontSize: "12px" }}
                              type="italic"
                            >
                              {tier.disclaimer}
                            </Typography>
                          </div>
                          <div>
                            <Button
                              onClick={tier.route}
                              round
                              fullWidth
                              color="primary"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to right, orange, yellow)",
                              }}
                            >
                              {tier.buttonText}
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <div style={{ marginTop: "100px" }} />

            <Typography className={classes.orLabel} type="italic">
              <span className={classes.middle}>ATAU</span>
            </Typography>

            <div style={{ marginTop: "100px" }} />

            <Typography style={{ textAlign: "center" }} size="heading">
              Individual
            </Typography>

            <Grid container justifyContent="center" alignItems="center">
              <Grid
                style={{
                  marginBottom: "22px",
                }}
                item
                xs={12}
                md={3}
                className={classes.cardHover}
              >
                <Card elevation={5} style={{ padding: "15px" }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={3}
                  >
                    <Grid item xs={12}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          type="subheading"
                          style={{ fontSize: "20px" }}
                        >
                          Rp. 30.000
                        </Typography>
                        <Typography type="italic">/Kilas</Typography>
                      </div>

                      <div>
                        <Button
                          href="/library"
                          round
                          fullWidth
                          color="secondary"
                        >
                          Beli Sekarang!
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      ) : (
        <Container component="main">
          <Typography style={{ textAlign: "center" }} size="heading">
            Subscription
          </Typography>

          <div className={classes.sectionDesktop}>
            <Grid container spacing={2} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid
                  style={{
                    marginBottom: "10px",
                  }}
                  item
                  key={tier.title}
                  xs={12}
                  md={3}
                  className={classes.cardHover}
                  sm={tier.title === "Enterprise" ? 12 : 6}
                >
                  {tier.title === "12 Bulan" ? (
                    <div className={classes.ribbon}>
                      {/* <img src={BestValue} className={info.imgBestValue} /> */}
                      BEST VALUE
                    </div>
                  ) : null}
                  <Card>
                    <CardHeader
                      title={
                        <Typography size="subheading">{tier.title}</Typography>
                      }
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardPricing}>
                        <Typography style={{ fontSize: "14px" }} type="italic">
                          {tier.save}
                        </Typography>
                        <Typography
                          type="subheading"
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          Rp. {tier.monthlyPrice}
                        </Typography>
                        <Typography type="italic">/bulan</Typography>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Typography
                          type="italic"
                          style={{
                            color: "red",
                            marginBottom: 0,
                            fontWeight: "bold",
                            // transform: "rotate(-12deg)",
                          }}
                        >
                          Hemat Rp. {tier.hemat}
                        </Typography>
                        <Typography
                          style={{
                            // textDecoration: "line-through",
                            // textDecorationColor: "red",
                            marginBottom: "0",
                            fontSize: "20px",
                          }}
                          className={classes.cross}
                        >
                          Rp. {tier.price}
                        </Typography>
                        <Typography
                          size="italic"
                          type="bold"
                          style={{
                            fontSize: "20px",
                            marginTop: "0",
                            marginBottom: "25px",
                          }}
                        >
                          Jadi Rp. {tier.currentPrice}
                        </Typography>
                        <Typography style={{ fontSize: "12px" }} type="italic">
                          {tier.disclaimer}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        href="/login"
                        round
                        fullWidth
                        color="primary"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, orange, yellow)",
                        }}
                      >
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <div style={{ marginTop: "100px" }} />

            <Typography className={classes.orLabel} type="italic">
              <span className={classes.middle}>ATAU</span>
            </Typography>

            <div style={{ marginTop: "100px" }} />

            <Typography style={{ textAlign: "center" }} size="heading">
              Individual
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
              <Grid
                style={{
                  marginBottom: "10px",
                }}
                item
                xs={12}
                md={3}
                className={classes.cardHover}
              >
                <Card>
                  <CardHeader
                    title={
                      <Typography color="beigeColor" size="subheading">
                        Beli Per Kilas
                      </Typography>
                    }
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === "12 Bulan" ? <StarIcon /> : null}
                    className={classes.cardHeaderKilas}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        type="subheading"
                        style={{ fontSize: "20px" }}
                      >
                        Rp. 30.000
                      </Typography>
                      <Typography type="italic">/Kilas</Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ marginTop: "-30px" }}
                      href="/login"
                      round
                      fullWidth
                      color="secondary"
                    >
                      Beli Sekarang!
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div className={classes.sectionMobile}>
            <Grid container spacing={2} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    style={{
                      marginBottom: "22px",
                    }}
                    item
                    xs={12}
                    md={3}
                    className={classes.cardHover}
                  >
                    <Card elevation={5} style={{ padding: "15px" }}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={3}
                      >
                        <Grid item xs={3}>
                          {tier.title === "12 Bulan" ? (
                            <Typography className={classes.ribbonMobile}>
                              {/* <img src={BestValue} className={info.imgBestValue} /> */}
                              <div>BEST</div> VALUE
                            </Typography>
                          ) : null}
                          <Typography
                            style={{
                              textAlign: "center",
                            }}
                            size="subheading"
                          >
                            {tier.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          {/* <Divider orientation="vertical" /> */}
                          <div
                            style={{
                              borderRight: "1px solid #41444b",
                              height: "170px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <div>
                            <Typography
                              type="italic"
                              style={{
                                color: "red",
                                marginBottom: 0,
                                fontWeight: "bold",
                                // transform: "rotate(-12deg)",
                              }}
                            >
                              Hemat Rp. {tier.hemat}
                            </Typography>

                            <Typography
                              type="subheading"
                              style={{
                                marginTop: "0",
                                fontSize: "25px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              Rp. {tier.monthlyPrice}
                              <Typography type="italic">/bulan</Typography>
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              style={{ fontSize: "12px" }}
                              type="italic"
                            >
                              {tier.disclaimer}
                            </Typography>
                          </div>
                          <div>
                            <Button
                              // onClick={tier.route}
                              href={"/login"}
                              round
                              fullWidth
                              color="primary"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to right, orange, yellow)",
                              }}
                            >
                              {tier.buttonText}
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <div style={{ marginTop: "100px" }} />

            <Typography className={classes.orLabel} type="italic">
              <span className={classes.middle}>ATAU</span>
            </Typography>

            <div style={{ marginTop: "100px" }} />

            <Typography style={{ textAlign: "center" }} size="heading">
              Individual
            </Typography>

            <Grid container justifyContent="center" alignItems="center">
              <Grid
                style={{
                  marginBottom: "22px",
                }}
                item
                xs={12}
                md={3}
                className={classes.cardHover}
              >
                <Card elevation={5} style={{ padding: "15px" }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={3}
                  >
                    <Grid item xs={12}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          type="subheading"
                          style={{ fontSize: "20px" }}
                        >
                          Rp. 30.000
                        </Typography>
                        <Typography type="italic">/Kilas</Typography>
                      </div>
                      <div>
                        <Button href="/login" round fullWidth color="secondary">
                          Beli Sekarang!
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}

      {/*---------------------------------------------------------------*/}
      {/*---------------------- WHATSAPP FIXED NAV ---------------------*/}
      {/*---------------------------------------------------------------*/}
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
