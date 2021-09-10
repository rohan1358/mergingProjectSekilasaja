import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
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

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectOwnedBookTitles,
  setOwnedBookTitles,
} from "../../feature/ownedBookTitlesSlice";

import Loading from "../Loading";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

// Material-UI components
import { Container } from "@material-ui/core";
import { beigeColor } from "../../styles/Style";

export default function Library({ history }) {
  // Styles
  const classes = MultiUseMobile();

  // Auth
  const db = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  // Redux
  const dispatch = useDispatch();
  const ownedBookTitles = useSelector(selectOwnedBookTitles);

  // useState Hooks
  const [pending, setPending] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setIsSubscribed(results.is_subscribed);
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }

    //Check if user is logged in or not, if not logout to home page.
    if (currentUser && !currentUser.emailVerified) {
      console.log(
        "Redirect to email not verified page to ask for email verification..."
      );
      return <Redirect to="/verify-email" />;
    } else if (!currentUser) {
      console.log("User is not logged in, redirecting to login page...");
      return <Redirect to="/login" />;
    }

    //Get owned book titles from user data
    db.collection("users")
      .where("email", "==", currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch(setOwnedBookTitles(doc.data()["owned_books"]));
          setPending(false);
        });
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
      <Parallax
        small
        filter
        image={require("../../images/library.jpg").default}
      >
        <Typography color="beigeColor" size="heading">
          MY LIBRARY
        </Typography>
      </Parallax>
      <Container>
        <div className={classes.extraSpace} />
        {!!isSubscribed ? (
          <SubscribedLibrary history={history} />
        ) : (
          <UnsubscribedLibrary
            ownedBookTitles={ownedBookTitles}
            history={history}
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
