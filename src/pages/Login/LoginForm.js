import React, { useState, useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Material UI components
import { makeStyles, Link, TextField } from "@material-ui/core";

// Custom components
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import { AuthContext } from "../../components/Routing/Auth";
import { Alert } from "@material-ui/lab";

//Import firebase for login function
import fire from "../../firebase/fire";

const auth = fire.auth();

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

//Form for login, including all other methods relevant to login
const LoginForm = ({ history }) => {
  // Styles
  const classes = useStyles();
  const multi = MultiUseMobile();

  // useState hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Auth
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log("Firebase login suceeded!");
      })
      .catch((err) => {
        var errorCode = err.code;
        var errorMessage = err.message;
        return setError("ERROR (" + errorCode + "): " + "\n\n" + errorMessage);
      });
  };

  // if (currentUser && currentUser.emailVerified) {
  //   console.log("Current user id: " + currentUser.uid);
  //   console.log("Redirecting to library page...");
  //   return <Redirect to="/" />;
  // } else if (currentUser && !currentUser.emailVerified) {
  //   console.log(
  //     "Redirect to email not verified page to ask for email verification..."
  //   );
  //   return <Redirect to="/verify-email" />;
  // }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography size="subheading">Login to SekilasAja!</Typography>
      {error && (
        <div className={classes.alertRoot}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
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
        <Link className={multi.link} underline="none" href="/lupa-password">
          Lupa Password?
        </Link>
      </Typography>
    </form>
  );
};

export default withRouter(LoginForm);
