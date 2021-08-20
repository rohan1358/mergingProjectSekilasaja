import React, { useState, useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Material UI components
import { makeStyles, Link, TextField } from "@material-ui/core";

// Custom components
import Button from "../Button";
import Typography from "../Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import { AuthContext } from "../Routing/Auth";

//Import firebase for login function
import * as firebaseLogin from "../.././firebase/firebaseLogin.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

//Form for login, including all other methods relevant to login
const LoginForm = ({ history }) => {
  const classes = useStyles();
  const multi = MultiUseMobile();

  // create state variables for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...");

    //Call function to login with firebase
    firebaseLogin.login(email, password);
  };

  const { currentUser } = useContext(AuthContext);

   if (currentUser) {
       console.log('Current user id: ' + currentUser.uid);
       return <Redirect to="/accounts" />;
   }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography size="subheading">Login to SekilasAja!</Typography>
      <TextField
        fullWidth={true}
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth={true}
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" color="primary" fullWidth round>
        Login
      </Button>

      <Typography>
        Belum punya akun?{" "}
        <Link className={multi.link} underline="none" href="/signup">
          Daftar Sekarang!
        </Link>
      </Typography>
    </form>
  );
};

export default withRouter(LoginForm);
