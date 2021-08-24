import React, { useContext, useState, useEffect } from "react";

// Custom components
import Typography from "../../components/Typography";
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";
import SubscriptionPlan from "./SubscriptionPlan";

// firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

// Material-UI components
import { Container, Paper, Divider, TextField } from "@material-ui/core";

export default function AccountsPage() {
  const classes = MultiUseMobile();
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (currentUser !== null) {
      const getUser = firebaseGetUserDataById.getUserDataById(currentUser.uid);
      const fetchData = async () => {
        const results = await getUser;
        setUserData(results);
      };
      fetchData();
    } else {
      console.log("You are not logged in!");
    }
  }, []);

  const firstName = userData.firstName;

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
            defaultValue={firstName}
            className={classes.textFieldRoot}
            id="filled-basic"
            label="First Name"
            variant="filled"
            fullWidth
          />
          <TextField
            defaultValue={userData.lastName}
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Last Name"
            variant="filled"
            fullWidth
          />
          <TextField
            disabled
            defaultValue={currentUser.email}
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Email"
            variant="filled"
            fullWidth
          />
          <TextField
            defaultValue={userData.phoneNumber}
            className={classes.textFieldRoot}
            id="filled-basic"
            label="Phone Number"
            variant="filled"
            fullWidth
          />

          <Button fullWidth>Update Profile</Button>

          <div className={classes.extraSpace} />
          <Divider />
          <div className={classes.extraSpace} />

          <Typography size="subheading">Change Password</Typography>
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
          <Button fullWidth>Change Password</Button>
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
