import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// Firebase components
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          // currentUser.emailVerified ? (
          //   <RouteComponent {...routeProps} />
          // ) : (
          //   <Redirect to={"/signup"} />
          // )
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
