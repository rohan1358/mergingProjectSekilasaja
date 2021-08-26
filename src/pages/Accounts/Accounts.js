import React, { useContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

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
import { Container, Paper, Divider, TextField, Input } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function AccountsPage() {
  const classes = MultiUseMobile();
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [bookNum, setBookNum] = useState([]);
  const [endDate, setEndDate] = useState([]);

  // Update Password
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setBookNum(results.owned_books);
        setEndDate(results.end_date.toDate().toString());
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  }, []);

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function handleUpdateUserInformation(e) {
    e.preventDefault();
  }

  function handleChangePassword(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password tidak sama!");
    }

    if (passwordRef.current.value !== "") {
      return setError("Proses Gagal!");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setSuccess("Proses berhasil!");
      })
      .catch(() => {
        setError("Proses Gagal!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <NavBar />
      {(userData !== null) == true && (
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
              number={bookNum.length}
              endDate={endDate}
            />

            <div className={classes.extraSpace} />
            <Divider />
            <div className={classes.extraSpace} />

            <Typography size="subheading">Profil</Typography>
            <form onSubmit={handleUpdateUserInformation}>
              {error && (
                <div className={classes.alertRoot}>
                  <Alert severity="error">{error}</Alert>
                </div>
              )}
              {success && (
                <div className={classes.alertRoot}>
                  <Alert severity="success">{success}</Alert>
                </div>
              )}
              <TextField
                defaultValue={userData.firstName}
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

              <Button disabled={loading} type="submit" fullWidth>
                Update Profile
              </Button>
            </form>

            <div className={classes.extraSpace} />
            <Divider />
            <div className={classes.extraSpace} />

            <form onSubmit={handleChangePassword}>
              <Typography size="subheading">Change Password</Typography>
              {error && (
                <div className={classes.alertRoot}>
                  <Alert severity="error">{error}</Alert>
                </div>
              )}
              {success && (
                <div className={classes.alertRoot}>
                  <Alert severity="success">{success}</Alert>
                </div>
              )}
              <TextField
                className={classes.textFieldRoot}
                id="filled-basic"
                label="Password Baru"
                variant="filled"
                inputRef={passwordRef}
                type="password"
                fullWidth
              />
              <TextField
                className={classes.textFieldRoot}
                id="filled-basic"
                label="Ketik Ulang Password Baru"
                variant="filled"
                type="password"
                inputRef={passwordConfirmRef}
                fullWidth
              />
              <Button disabled={loading} type="submit" fullWidth>
                Change Password
              </Button>
            </form>
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
      )}
      <Footer />
    </div>
  );
}
