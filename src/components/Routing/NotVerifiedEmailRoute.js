import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// Firebase components
import { AuthContext } from "./Auth";

const NotVerifiedEmailRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  const notVerified = () => {
    if (currentUser && !currentUser.emailVerified) {
      return <Route {...rest} render={<Redirect to={"/verify-email"} />} />;
    } else {
      return (
        <Route
          {...rest}
          render={(routeProps) => <RouteComponent {...routeProps} />}
        />
      );
    }
  };

  return <div>{notVerified}</div>;
};

export default NotVerifiedEmailRoute;
