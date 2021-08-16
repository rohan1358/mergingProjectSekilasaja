import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "firebase";

const isLogin = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      return false;
    }
  });
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/accounts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
