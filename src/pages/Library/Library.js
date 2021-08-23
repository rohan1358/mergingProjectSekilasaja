import React, { useState, useEffect, useContext } from "react";

// Custom components
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/Navbar";
import OwnedBooksBlock from "./OwnedBooksBlock";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import CategoryBlock from "../Home/CategoryBlock";

import MultiUseMobile from "../../styles/MultiUseMobile";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectOwnedBookTitles,
  setOwnedBookTitles,
} from "../../feature/ownedBookTitlesSlice";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";

// Material-UI components
import { Container } from "@material-ui/core";

export default function Library({ history }) {
  const db = fire.firestore();

  const dispatch = useDispatch();
  const ownedBookTitles = useSelector(selectOwnedBookTitles);
  const { currentUser } = useContext(AuthContext);

  const classes = MultiUseMobile();

  useEffect(() => {
    //Check if user is logged in or not, if not logout to home page.
    // if (!currentUser) {
    //   return <Redirect to="/login" />;
    // }

    //Get owned book titles from user data
    db.collection("users")
      .where("email", "==", currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch(setOwnedBookTitles(doc.data()["owned_books"]));
        });
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Container>
        <Parallax
          border
          filter
          image={require("../../images/library.jpg").default}
        >
          <Typography color="beigeColor" size="heading">
            My Library
          </Typography>
        </Parallax>
        <div className={classes.extraSpace} />
        {/* <OwnedBooksBlock ownedBookTitles={ownedBookTitles} history={history} /> */}
      </Container>
      <Container>
        <div className={classes.extraSpace} />
        <CategoryBlock history={history} title={"Carilah buku buku disini!"} />
      </Container>
      <Footer />
    </div>
  );
}
