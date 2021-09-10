import React, { useState, useRef, useContext } from "react";
import { withRouter } from "react-router";

// Material UI components
import { makeStyles, Link, TextField } from "@material-ui/core";

// Custom components
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import { Alert } from "@material-ui/lab";

//Import firebase for login function
import * as firebaseLogin from "../../firebase/firebaseLogin.js";
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
const ForgotPasswordForm = () => {
  // Styles
  const classes = useStyles();
  const multi = MultiUseMobile();

  // Ref
  const emailRef = useRef();

  // useState hooks
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);

      await resetPassword(emailRef.current.value);
      setMessage("Cek email kamu untuk mengganti password!");
    } catch {
      setError("Gagal reset password!");
    }

    setLoading(false);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography size="subheading">Lupa Password?</Typography>
      {error && (
        <div className={classes.alertRoot}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {message && (
        <div className={classes.alertRoot}>
          <Alert severity="success">{message}</Alert>
        </div>
      )}
      <TextField
        fullWidth={true}
        label="Email"
        variant="filled"
        type="email"
        inputRef={emailRef}
        required
      />

      <Button disabled={loading} type="submit" color="primary" fullWidth round>
        Reset Password
      </Button>

      <Typography>
        <Link className={multi.link} underline="none" href="/login">
          Login
        </Link>
      </Typography>
    </form>
  );
};

export default withRouter(ForgotPasswordForm);
