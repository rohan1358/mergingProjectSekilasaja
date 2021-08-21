import React, { useState, useCallback , useContext} from "react";
import { Redirect, withRouter } from "react-router";

// Material UI components
import { makeStyles, TextField, Link } from "@material-ui/core";

// Custom components
import Button from "../Button";
import Typography from "../Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

import { AuthContext } from "../Routing/Auth";

//Import firebase for signUp function
import * as firebaseSignUp from "../.././firebase/firebaseSignUp.js";

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

//Form for signing up, including all other methods relevant to signing up
const SignUpForm = ({ history }) => {
  const classes = useStyles();
  const multi = MultiUseMobile();

  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      reenterPassword
    );

    //Check if password and reenter password are the same or not.
    if (password != reenterPassword) {
        console.log("Passwords do not match.");
        alert("Passwords do not match!");
    } else {
        //Call function to do signup in firebase
        firebaseSignUp.signUp(email, password, firstName, lastName, phoneNumber);
    }
   };

   const { currentUser } = useContext(AuthContext);

   if (currentUser) {
       console.log('Current user id: ' + currentUser.uid);
       return <Redirect to="/accounts" />;
   }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography size="subheading">Sign up for SekilasAja!</Typography>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="filled"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Re-enter Password"
        variant="filled"
        type="password"
        required
        value={reenterPassword}
        onChange={(e) => setReenterPassword(e.target.value)}
      />
      <Button fullWidth round type="submit" color="primary">
        Sign Up
      </Button>

      <Typography>
        Sudah punya akun?{" "}
        <Link href="/login" className={multi.link} underline="none">
          Masuk sekarang!
        </Link>
      </Typography>
    </form>
  );
};

export default withRouter(SignUpForm);
