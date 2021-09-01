import React, { useContext, useState, useEffect } from "react";

// Custom components
import Typography from "../components/Typography";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer";

// Material-UI components
import { Container, Grid, Paper } from "@material-ui/core";

// Firebase components
import { AuthContext } from "../components/Routing/Auth";
import * as firebaseUpdateCart from "../firebase/firebaseUpdateCart";
import * as firebaseGetUserDataById from "../firebase/firebaseGetUserDataById";
import * as firebaseGetSubscription from "../firebase/firebaseGetSubscription";
import fire from "../firebase/fire";

// Redux
import { selectCart, setCart } from "../feature/cartSlice";
import { useSelector, useDispatch } from "react-redux";

export default function PricingPage({ match, history }) {
  const db = fire.firestore();

  const classes = MultiUseMobile();
  const { currentUser } = useContext(AuthContext);
  const cartItems = useSelector(selectCart).cart;

  const [isAdded, setIsAdded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [subOne, setSubOne] = useState(null);
  const [subThree, setSubThree] = useState(null);
  const [subSix, setSubSix] = useState(null);
  const [subTwelve, setSubTwelve] = useState(null);

  const dispatch = useDispatch();

  // const subscriptionData = [
  //   { book_title: "Subscription 1 Bulan", price: 39000 },
  //   { book_title: "Subscription 3 Bulan", price: 110000 },
  //   { book_title: "Subscription 6 Bulan", price: 200000 },
  //   { book_title: "Subscription 12 Bulan", price: 390000 },
  // ];

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

  // useEffect(() => {
  //   const changeBtn = () => {
  //     const subsMap = subscriptionData.map((x) => x.book_title);
  //     const exist = cartItems.find((x) => x.book_title === subsMap);

  //     if (exist) {
  //       setIsAdded(true);
  //     } else {
  //       setIsAdded(false);
  //     }
  //   };
  //   changeBtn();
  // }, [cartItems]);

  console.log(subOne);
  const handleAddCartOne = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        subOne
      );

      const exist = cartItems.find((x) => x.book_title === subOne.book_title);

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

      const exist = cartItems.find((x) => x.book_title === subThree.book_title);

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

      const exist = cartItems.find((x) => x.book_title === subSix.book_title);

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

      const exist = cartItems.find(
        (x) => x.book_title === subTwelve.book_title
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, subTwelve]));
      }
    };
    fetchData();
  };

  return (
    <div>
      <NavBar history={history} />
      <Container>
        <BenefitsBlock />

        {/* If logged in, remove this button */}
        {!!currentUser ? (
          <></>
        ) : (
          <div className={classes.center}>
            <Button href="/signup" round color="primary">
              Daftar Sekarang
            </Button>
          </div>
        )}
        <div className={classes.extraSpace} />
      </Container>

      <Container maxWidth={"sm"}>
        <div className={classes.center}>
          {!!currentUser ? (
            <Grid className={classes.desktopClass} spacing={3} container>
              <Grid item xs={12}>
                <Typography type="heading">Pricing Plan</Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Subscription</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <div>
                    <Button
                      onClick={handleAddCartOne}
                      // href="/payment"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 39.000 / Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Loren Ipsum Ngoman Balato Porche
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={handleAddCartThree}
                      // href="/payment"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 69.000 / 3 Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={handleAddCartSix}
                      // href="/payment"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 140.000 / 6 Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={handleAddCartTwelve}
                      // href="/payment"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 299.000 / 12 Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography type="italic" size="subheading">
                  OR
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Individual</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>

                  <div>
                    <Button
                      href="/library"
                      className={classes.pricingButton}
                      color="secondary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          style={{ color: "#FFFEF8" }}
                          size="subheading"
                        >
                          Rp. 10.000 / Kilas
                        </Typography>
                        <Typography
                          className={classes.normalText}
                          style={{ color: "#FFFEF8" }}
                          type="italic"
                        >
                          Loren Ipsum Ngoman Balato Porche
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={1} />
            </Grid>
          ) : (
            <Grid className={classes.desktopClass} spacing={3} container>
              <Grid item xs={12}>
                <Typography type="heading">Pricing Plan</Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Subscription</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <div>
                    <Button
                      href="/login"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 39.000 / Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Loren Ipsum Ngoman Balato Porche
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      href="/login"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 69.000 / 3 Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      href="/login"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 140.000 / 6 Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      href="/login"
                      className={classes.pricingButton}
                      color="primary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          size="subheading"
                        >
                          Rp. 299.000 / 12 Bulan
                        </Typography>
                        <Typography
                          type="italic"
                          className={classes.normalText}
                        >
                          Setara dengan Rp. 24.166,67 / Bulan
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography type="italic" size="subheading">
                  OR
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paddedContent} elevation={5}>
                  <Typography size="subheading">Individual</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>
                  <Typography>✔ Lorem ipsum dolor sit amet</Typography>

                  <div>
                    <Button
                      href="/login"
                      className={classes.pricingButton}
                      color="secondary"
                    >
                      <div className={classes.block}>
                        <Typography
                          className={classes.normalText}
                          style={{ color: "#FFFEF8" }}
                          size="subheading"
                        >
                          Rp. 10.000 / Kilas
                        </Typography>
                        <Typography
                          className={classes.normalText}
                          style={{ color: "#FFFEF8" }}
                          type="italic"
                        >
                          Loren Ipsum Ngoman Balato Porche
                        </Typography>
                      </div>
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          )}
        </div>

        <div className={classes.extraSpace} />
      </Container>
      <Footer />
    </div>
  );
}
