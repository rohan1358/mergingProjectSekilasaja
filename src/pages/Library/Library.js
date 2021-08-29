import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Custom components
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/Navbar";
import OwnedBooksBlock from "./OwnedBooksBlock";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

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

export default function Library({ history }) {
  const classes = MultiUseMobile();

  const db = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  const ownedBookTitles = useSelector(selectOwnedBookTitles);
  const favoriteBookTitles = useSelector(selectFavoriteBookTitles);

  useEffect(() => {
    //Check if user is logged in or not, if not logout to home page.
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    //Get owned book titles from user data
    db.collection("users")
      .where("email", "==", currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch(setOwnedBookTitles(doc.data()["owned_books"]));
          dispatch(setFavoriteBookTitles(doc.data()["favorite_books"]));
        });
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Container>
        <Parallax
          small
          border
          filter
          image={require("../../images/library.jpg").default}
        >
          <Typography color="beigeColor" size="heading">
            My Library
          </Typography>
        </Parallax>

        <div className={classes.extraSpace} />
        <OwnedBooksBlock
          ownedBookTitles={ownedBookTitles}
          favoriteBookTitles={favoriteBookTitles}
          history={history}
        />
      </Container>
      <Footer />
    </div>
  );
}
