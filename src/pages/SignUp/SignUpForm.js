import React, { useState, useCallback, useContext, useHistory } from "react";
import { Redirect, withRouter } from "react-router";

// Material UI components
import { makeStyles, TextField, Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Custom components
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

// firebase components
import { AuthContext } from "../../components/Routing/Auth";
import fire from "../../firebase/fire";

const auth = fire.auth();
const firestore = fire.firestore();

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

  alertRoot: {
    width: "100%",
    marginBottom: theme.spacing(1),
    "& > * + *": {
      marginTop: theme.spacing(2),
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
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Check if password and reenter password are the same or not.
    if (password != reenterPassword) {
      return setError("Passwords do not match!");
    } else {
      //Call function to do signup in firebase
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((resp) => {
          //Store the new user information in the database via firestore
          firestore
            .collection("users")
            .doc(resp.user.uid)
            .set({
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              email: email,
              owned_books: ["Steve Jobs", "Atomic Habits"],
              favorite_books: [],
              is_subscribed: false,
              cart: [],
              start_date: new Date("9/9/99"), // this date means UNSUBSCRIBED
              end_date: new Date("9/9/99"), // this date means UNSUBSCRIBED
            });
          //Sign up success case
          console.log("Firebase signup suceeded!");
        })
        .catch((err) => {
          //Sign up fail case
          var errorCode = err.code;
          var errorMessage = err.message;
          return setError("ERROR (" + errorCode + "):" + "\n\n" + errorMessage);
        });
    }
  };

  if (currentUser && currentUser.emailVerified) {
    console.log("Current user id: " + currentUser.uid);
    console.log("Redirecting to library page...");
    return <Redirect to="/library" />;
  } else if (currentUser && !currentUser.emailVerified) {
    console.log("Redirect to email not verified page to ask for email verification...");
    return <Redirect to="/verify-email"/>;
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography size="subheading">Sign up for SekilasAja!</Typography>
      {error && (
        <div className={classes.alertRoot}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
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
