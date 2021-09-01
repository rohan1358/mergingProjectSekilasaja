import React from "react";

// Custom components
import MultiUseMobile from "../styles/MultiUseMobile";
import Typography from "../components/Typography";

// Material-UI components
import { Container, Paper, makeStyles, Link } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function VerifyEmail() {
  const classes = useStyles();
  const multi = MultiUseMobile();

  return (
    <div>
      <div style={{ marginTop: "200px" }} />
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
        </Paper>

        <div style={{ marginTop: "30px" }} />

        <Typography style={{ textAlign: "center" }}>
          Belum dapat?{" "}
          <Link className={multi.link} underline="none" href="/signup">
            Kirim ulang
          </Link>
        </Typography>
        <div className={multi.extraSpace} />
      </Container>
    </div>
  );
}
