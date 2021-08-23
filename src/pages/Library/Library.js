import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router";

import Footer from "../../components/Footer";
import { AuthContext } from "../../components/Routing/Auth";
import NavBarLibrary from "../../components/NavBar/NavbarLibrary";
import OwnedBooksBlock from "./OwnedBooksBlock";

import CategoryBlock from "../Home/CategoryBlock";
import data from "../../data/bookData";

import MultiUseMobile from "../../styles/MultiUseMobile";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectOwnedBookTitles, setOwnedBookTitles } from "../../feature/ownedBookTitlesSlice";

// Firebase components
import fire from "../../firebase/fire";

// Material-UI components
import { Container, Grid, Divider, makeStyles } from "@material-ui/core";

export default function Library({ history }) {
    const { products } = data;

    const db = fire.firestore();

    const dispatch = useDispatch();
    const ownedBookTitles = useSelector(selectOwnedBookTitles);
    const { currentUser } = useContext(AuthContext);
    
    const classes = MultiUseMobile();

    useEffect(() => {
      //Check if user is logged in or not, if not logout to home page.
      if (!currentUser) {
        return <Redirect to="/" />
      }

      //Get owned book titles from user data
      db.collection("users").where("email", "==", currentUser.email).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch(
            setOwnedBookTitles(
              doc.data()['owned_books']
            )
          );
        });
      });
    }, []);

    return (
        <div>
             <NavBarLibrary />
             <Container>
                <div className={classes.extraSpace} />
                <OwnedBooksBlock
                  ownedBookTitles = {ownedBookTitles}
                  history={history}
                />
              </Container>
             <Container>
                <div className={classes.extraSpace} />
                <CategoryBlock
                  history={history}
                  title={"Carilah buku buku disini!"}
                  products={products}
                />
            </Container>
            <Footer />
        </div>
    );
}