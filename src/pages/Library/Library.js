import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/Navbar";
import OwnedBooksBlock from "./OwnedBooksBlock";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectOwnedBookTitles,
  setOwnedBookTitles,
} from "../../feature/ownedBookTitlesSlice";
import {
  selectFavoriteBookTitles,
  setFavoriteBookTitles,
} from "../../feature/favoriteBookTitlesSlice";

import Loading from "../Loading";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";

// Material-UI components
import { Container } from "@material-ui/core";
import { beigeColor } from "../../styles/Style";

export default function Library({ history }) {
  const classes = MultiUseMobile();

  const db = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);

  const ownedBookTitles = useSelector(selectOwnedBookTitles);
  const favoriteBookTitles = useSelector(selectFavoriteBookTitles);

  useEffect(() => {
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
          dispatch(setFavoriteBookTitles(doc.data()["favorite_books"]));
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
        <OwnedBooksBlock
          ownedBookTitles={ownedBookTitles}
          favoriteBookTitles={favoriteBookTitles}
          history={history}
        />
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
