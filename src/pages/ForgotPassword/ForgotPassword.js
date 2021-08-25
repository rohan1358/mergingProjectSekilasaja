import React from "react";

// Custom components
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import ForgotPasswordForm from "./ForgotPasswordForm";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Typography from "../../components/Typography";

// Material-UI components
import { Container, Paper, makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const multi = MultiUseMobile();

  return (
    <div>
      <NavBar />
      <div className={multi.extraSpace} />
      <Container maxWidth="xs">
        <Paper className={classes.root}>
          <ForgotPasswordForm />
        </Paper>
        <Typography style={{ textAlign: "center" }}>
          Belum punya akun?{" "}
          <Link className={multi.link} underline="none" href="/signup">
            Daftar Sekarang!
          </Link>
        </Typography>
        <div className={multi.extraSpace} />
      </Container>
      <Footer />
    </div>
  );
}
