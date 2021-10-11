import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";

// Custom components
import MultiUseMobile from "../../styles/MultiUseMobile";
import Typography from "../../components/Typography";

// Material-UI components
import { Container, Paper, makeStyles, Link } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";

//For email verification
import { AuthContext } from "../../components/Routing/Auth";
import { beigeColor } from "../../styles/Style";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
  },
}));

export default function VerifyEmail() {
  // Styles
  const classes = useStyles();
  const multi = MultiUseMobile();

  // Auth
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && !currentUser.emailVerified) {
      console.log("Sending verification email...");
      sendVerificationEmail();
    }
  }, []);

  //Function to generate alert that email verification has been sent on clicking "Kirim ulang"
  const resendEmailVerification = () => {
    if (currentUser && !currentUser.emailVerified) {
      currentUser
        .sendEmailVerification()
        .then(() => {
          console.log("Email verification has been resent!");
          alert("Email verification has been resent!");
        })
        .catch((err) => {
          var errorCode = err.code;
          var errorMessage = err.message;
          console.log("Error: " + errorCode + "\n\n" + errorMessage);
        });
    }
  };

  //Function to send email verification
  const sendVerificationEmail = () => {
    if (currentUser && !currentUser.emailVerified) {
      currentUser
        .sendEmailVerification()
        .then(() => {
          console.log("Email verification sent!");
        })
        .catch((err) => {
          var errorCode = err.code;
          var errorMessage = err.message;
          console.log("Error: " + errorCode + "\n\n" + errorMessage);
        });
    }
  };

  if (currentUser && currentUser.emailVerified) {
    console.log("Redirecting to library...");
    return <Redirect to="/" />;
  } else if (!currentUser) {
    console.log("Redirecting to login page as user is not signed in...");
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "130px" }} />
      <Container maxWidth="xs">
        <Paper
          elevation={5}
          style={{ textAlign: "center" }}
          className={classes.root}
        >
          <EmailIcon className={multi.iconColor} fontSize="large" />
          <Typography size="subheading">
            Email verifikasi sudah terkirim. Silahkan cek email kamu sekarang!
          </Typography>

          <Typography>
            Jika sudah terverifikasi, silahkan kembali ke halaman ini, dan
            refresh halaman ini!
          </Typography>
        </Paper>

        <div style={{ marginTop: "30px" }} />

        <Typography style={{ textAlign: "center" }}>
          Belum dapat?{" "}
          <Link
            className={multi.link}
            underline="none"
            onClick={resendEmailVerification}
          >
            Kirim ulang
          </Link>
        </Typography>
        <div className={multi.extraSpace} />
      </Container>
    </div>
  );
}
