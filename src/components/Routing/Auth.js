import React, { useEffect, useState } from "react";
import fire from "../../fire";

// custom components
import Typography from "../Typography";

// Material UI Components
import { Container } from "@material-ui/core";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <>
        <Container maxWidth="xs">
          <Typography size="heading">Loading...</Typography>
        </Container>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
