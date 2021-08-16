import React from "react";

// Custom components
import Typography from "../../components/Typography";
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";
import SubscriptionPlan from "./SubscriptionPlan";

// firebase components
import fire from "../../fire";

// Material-UI components
import { Container, Paper, Divider, TextField } from "@material-ui/core";

export default function AccountsPage() {
  const classes = MultiUseMobile();

  return (
    <div>
      <NavBar />
      <Container maxWidth={"sm"}>
        <div className={classes.extraSpace} />
        <Paper className={classes.paddedContent}>
          <Typography className={classes.sectionTitle} size="heading">
            Accounts
          </Typography>
          <div className={classes.extraSpace} />
          <Typography size="subheading">Layanan Berlangganan</Typography>
          <SubscriptionPlan
            subscriptionType={"Belum Berlanggan"}
            number={"3"}
          />

          <div className={classes.extraSpace} />
          <Divider />
          <div className={classes.extraSpace} />

          <Typography size="subheading">Profil</Typography>
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="First Name"
            variant="filled"
            fullWidth
          />
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Last Name"
            variant="filled"
            fullWidth
          />
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Email"
            variant="filled"
            fullWidth
          />
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Phone Number"
            variant="filled"
            fullWidth
          />

          <div className={classes.extraSpace} />
          <Divider />
          <div className={classes.extraSpace} />

          <Typography size="subheading">Ganti Kata Sandi</Typography>
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Password Lama"
            variant="filled"
            fullWidth
          />
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Password Baru"
            variant="filled"
            fullWidth
          />
          <TextField
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Ketik Ulang Password Baru"
            variant="filled"
            fullWidth
          />
          <div className={classes.extraSpace} />

          <div className={classes.center}>
            <Button
              onClick={() => fire.auth().signOut()}
              round
              color="secondary"
            >
              Log out
            </Button>
          </div>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
