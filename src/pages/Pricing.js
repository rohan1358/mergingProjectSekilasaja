import React, { useContext, useState, useEffect } from "react";

// Custom components
import Typography from "../components/Typography";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import Header from "../components/NavBar/Header";
import HeaderLinks from "../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../components/NavBar/HeaderLinksMobile";
import Footer from "../components/Footer";
import { beigeColor, primaryColor, secondaryColor } from "../styles/Style";

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

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const cartItems = useSelector(selectCart).cart;

  const [userData, setUserData] = useState(null);
  const [subOne, setSubOne] = useState(null);
  const [subThree, setSubThree] = useState(null);
  const [subSix, setSubSix] = useState(null);
  const [subTwelve, setSubTwelve] = useState(null);

  const dispatch = useDispatch();

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
      const results3 = await firebaseGetSubscription.getSubscription(
        "Subscription 3 Bulan"
      );
      const results6 = await firebaseGetSubscription.getSubscription(
        "Subscription 6 Bulan"
      );
      const results12 = await firebaseGetSubscription.getSubscription(
        "Subscription 12 Bulan"
      );
      setSubOne(results1);
      setSubThree(results3);
      setSubSix(results6);
      setSubTwelve(results12);
    };
    fetchSubData();
  }, []);

  const handleAddCartOne = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subOne
      );

      history.push("/payment");

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
  };

  const handleAddCartThree = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subThree
      );

      history.push("/payment");

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
  };

  const handleAddCartSix = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subSix
      );

      history.push("/payment");

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
  };

  const handleAddCartTwelve = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subTwelve
      );

      history.push("/payment");

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
  };

  const tiers = [
    {
      title: "12 Bulan",
      monthlyPrice: "30.000",
      price: "285.000",
      currentPrice: "35.000",
      disclaimer: "* Pembayaran langsung 12 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartTwelve,
    },
    {
      title: "6 Bulan",
      monthlyPrice: "30.000",
      price: "145.000",
      currentPrice: "35.000",
      disclaimer: "* Pembayaran langsung 6 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartSix,
    },
    {
      title: "3  Bulan",
      monthlyPrice: "30.000",
      price: "75.000",
      currentPrice: "35.000",
      disclaimer: "* Pembayaran langsung 3 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartThree,
    },
    {
      title: "1  Bulan",
      monthlyPrice: "30.000",
      price: "39.000",
      currentPrice: "35.000",
      disclaimer: "* Pembayaran langsung 1 bulan di depan",
      buttonText: "Berlanggan Sekarang!",
      route: handleAddCartOne,
    },
  ];

  return (
    <div>
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
          <Typography style={{ textAlign: "center" }} size="subheading">
            Subscription
          </Typography>
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
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === "12 Bulan" ? <StarIcon /> : null}
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
                        Rp.{tier.monthlyPrice}
                      </Typography>
                      <Typography type="italic">/bulan</Typography>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Typography
                        style={{
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                          marginBottom: "0",
                        }}
                      >
                        Rp. {tier.price}
                      </Typography>
                      <Typography
                        size="italic"
                        type="bold"
                        style={{ marginTop: "0", marginBottom: "25px" }}
                      >
                        Promo Rp. {tier.currentPrice}
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
            <span className={classes.middle}>OR</span>
          </Typography>

          <div style={{ marginTop: "100px" }} />

          <Typography style={{ textAlign: "center" }} size="subheading">
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
                    <Typography type="subheading" style={{ fontSize: "20px" }}>
                      Rp. 15.000
                    </Typography>
                    <Typography type="italic">/kilas</Typography>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Typography style={{ fontSize: "13px" }}>
                      ✔ Loren ipsum bada cara tana opseum ipun.
                    </Typography>
                    <Typography style={{ fontSize: "13px" }}>
                      ✔ Loren ipsum bada cara tana opseum ipun.
                    </Typography>
                    <Typography style={{ fontSize: "13px" }}>
                      ✔ Loren ipsum bada cara tana opseum ipun.
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button href="/library" round fullWidth color="secondary">
                    Beli Sekarang!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container component="main">
          <Typography style={{ textAlign: "center" }} size="subheading">
            Subscription
          </Typography>
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
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === "12 Bulan" ? <StarIcon /> : null}
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
                        Rp.{tier.monthlyPrice}
                      </Typography>
                      <Typography type="italic">/bulan</Typography>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Typography
                        style={{
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                          marginBottom: "0",
                        }}
                      >
                        Rp. {tier.price}
                      </Typography>
                      <Typography
                        size="italic"
                        type="bold"
                        style={{ marginTop: "0", marginBottom: "25px" }}
                      >
                        Promo Rp. {tier.currentPrice}
                      </Typography>
                      <Typography style={{ fontSize: "12px" }} type="italic">
                        {tier.disclaimer}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button href="/login" round fullWidth color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div style={{ marginTop: "100px" }} />

          <Typography className={classes.orLabel} type="italic">
            <span className={classes.middle}>OR</span>
          </Typography>

          <div style={{ marginTop: "100px" }} />

          <Typography style={{ textAlign: "center" }} size="subheading">
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
                    <Typography type="subheading" style={{ fontSize: "20px" }}>
                      Rp. 15.000
                    </Typography>
                    <Typography type="italic">/kilas</Typography>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Typography style={{ fontSize: "13px" }}>
                      ✔ Loren ipsum bada cara tana opseum ipun.
                    </Typography>
                    <Typography style={{ fontSize: "13px" }}>
                      ✔ Loren ipsum bada cara tana opseum ipun.
                    </Typography>
                    <Typography style={{ fontSize: "13px" }}>
                      ✔ Loren ipsum bada cara tana opseum ipun.
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button href="/login" round fullWidth color="secondary">
                    Beli Sekarang!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
    </div>
  );
}
