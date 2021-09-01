import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// Firebase components
import { AuthContext } from "./Auth";

const NotVerifiedEmailRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          currentUser.emailVerified ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={"/signup"} />
          )
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};

export default NotVerifiedEmailRoute;
