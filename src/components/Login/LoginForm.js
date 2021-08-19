import React, { useState, useEffect } from "react";

// Material UI components
import { makeStyles, Link, TextField } from "@material-ui/core";

// Custom components
import Button from "../Button";
import Typography from "../Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import SignUpModalDialog from "../SignUp/SignUpModalDialog";
import { secondaryColor } from "../../styles/Style";

//Import firebase for login function
import fire from "../../firebase/fire";

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
const LoginForm = ({ handleClose }) => {
  const classes = useStyles();
  const multi = MultiUseMobile();

  // create state variables for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Method to login with firebase
  const login = () => {
    const auth = fire.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log("Login successful!");
        handleClose();
      })
      .catch((err) => {
        console.log("Error: " + err.toString());
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...");

    //Call function to login with firebase
    login();
  };

  // // FOR SIGNUP MODAL
  // // Declare a new state variable for modal open for SIGNUP
  // const [openSignUp, setSignUpOpen] = useState(false);

  // // function to handle modal open for signup
  // const handleSignUpOpen = () => {
  //   setSignUpOpen(true);
  // };

  // // function to handle modal close for signup
  // const handleSignUpClose = () => {
  //   setSignUpOpen(false);
  // };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography size="subheading">Login to SekilasAja!</Typography>
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
      <Button type="submit" color="primary" fullWidth round>
        Login
      </Button>

      {/* <Typography>
        Belum punya akun?{" "}
        <Link
          onClick={handleSignUpOpen}
          className={multi.link}
          underline="none"
        >
          Daftar Sekarang!
        </Link>
        <SignUpModalDialog open={openSignUp} handleClose={handleSignUpClose} />
      </Typography> */}
    </form>
  );
};

export default LoginForm;
