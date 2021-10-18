import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Footer from "../../components/Footer";
import UnsubscribedLibrary from "./UnsubscribedLibrary";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import SubscribedLibrary from "./SubscribedLibrary";
import Button from "../../components/Button";
import Loading from "../Utilities/Loading";
import { beigeColor, primaryColor, secondaryColor } from "../../styles/Style";
import NewBooksCardLibrary from "./NewBooksCardLibrary";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectOwnedBookTitles,
  setOwnedBookTitles,
} from "../../feature/ownedBookTitlesSlice";
import { selectUser } from "../../feature/userSlice";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

// Material-UI components
import { Container, Paper, Grid } from "@material-ui/core";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";
const LibraryBackground =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Flibrary.jpg?alt=media&token=694df049-4675-4ea9-97bc-7562b045e445";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 5,
  },
};

export default function Library({ history }) {
  // Styles
  const classes = MultiUseMobile();

  // Auth
  const db = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  // Redux
  const dispatch = useDispatch();
  const ownedBookTitles = useSelector(selectOwnedBookTitles);
  const userData = useSelector(selectUser);

  // useState Hooks
  const [pending, setPending] = useState(true);
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    //Get owned book titles from user data
    db.collection("users")
      .where("email", "==", currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch(setOwnedBookTitles(doc.data()["owned_books"]));
          setPending(false);
        });
      });

    // Get books info
    db.collection("books").onSnapshot((snapshot) => {
      SetProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, []);

  if (pending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "70px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
      {!!userData.user.is_subscribed ? (
        <Parallax small filter image={LibraryBackground}>
          <Grid container>
            <Grid item md={6} xs={12}>
              <Typography
                style={{ marginBottom: 0 }}
                color="beigeColor"
                size="heading"
              >
                MY LIBRARY
              </Typography>
              <Typography
                style={{ marginTop: 5 }}
                color="beigeColor"
                size="subheading"
              >
                <strong
                  style={{
                    color: secondaryColor,
                    backgroundColor: primaryColor,
                  }}
                >
                  Kilas Baru
                </strong>{" "}
                Minggu Ini!
              </Typography>
              {/* <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              > */}
              <Carousel
                arrows={false}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                ssr={true}
                responsive={responsive}
              >
                {products
                  .filter(
                    (product) =>
                      product.category.includes("New Release!") == true
                  )
                  .map((categorisedProduct, index) => (
                    <NewBooksCardLibrary
                      chosenCategory={"New Release!"}
                      key={index}
                      product={categorisedProduct}
                      extraSpace={<div style={{ marginTop: "20px" }} />}
                    />
                  ))}
              </Carousel>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </Parallax>
      ) : (
        <Parallax small filter image={LibraryBackground}>
          <Typography color="beigeColor" size="heading">
            MY LIBRARY
          </Typography>
          <Typography color="beigeColor">
            Dengan hanya Rp. <strong>1.000/hari!</strong>{" "}
            <div>
              Kamu bisa memiliki <strong>akses untuk semua buku!</strong>
            </div>
          </Typography>
          <Button
            href="/pricing"
            round
            style={{
              backgroundImage: "linear-gradient(to right, orange, yellow)",
            }}
          >
            Berlanggan sekarang!
          </Button>
        </Parallax>
      )}

      <Container>
        <div className={classes.extraSpace} />
        {!!userData.user.is_subscribed ? (
          <SubscribedLibrary history={history} />
        ) : (
          <UnsubscribedLibrary
            ownedBookTitles={ownedBookTitles}
            history={history}
            upsellBlock={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Paper
                  style={{
                    width: "100%",
                    maxWidth: 500,
                    marginBottom: 30,
                    textAlign: "center",
                    padding: "15px",
                  }}
                  elevation={5}
                >
                  {/* <ErrorIcon
                    fontSize="large"
                    style={{
                      marginRight: "10px",
                      color: secondaryColor,
                    }}
                  /> */}
                  <Typography
                    style={{
                      textAlign: "center",
                    }}
                    type="italic"
                    size="bold"
                  >
                    Ingin memiliki akses untuk semua kilas? Dengan hanya Rp.
                    1.000/hari, Kamu bisa mengakses semua kilas!
                  </Typography>
                  <Button
                    href="/pricing"
                    round
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, orange, yellow)",
                    }}
                  >
                    Berlanggan sekarang!
                  </Button>
                </Paper>
              </div>
            }
          />
        )}
      </Container>

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
