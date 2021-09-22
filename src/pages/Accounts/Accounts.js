import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, withRouter } from "react-router";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import Footer from "../../components/Footer";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";
import SubscriptionPlan from "./SubscriptionPlan";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Loading from "../Loading";

// firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

// Material-UI components
import { Container, Paper, Divider, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { beigeColor } from "../../styles/Style";

export default function AccountsPage({ history }) {
  // Auth
  const firestore = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  // Styles
  const classes = MultiUseMobile();

  // useState Hooks
  const [userData, setUserData] = useState(null);
  const [bookNum, setBookNum] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [pending, setPending] = useState(true);

  // useRef hooks
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();

  useEffect(() => {
    //Check if user is logged in or not, if not logout to home page.
    if (!currentUser) {
      console.log("User is not logged in, redirecting to login page...");
      return <Redirect to="/login" />;
    }
    // else if (currentUser && !currentUser.emailVerified) {
    //   console.log(
    //     "Redirect to email not verified page to ask for email verification..."
    //   );
    //   return <Redirect to="/verify-email" />;
    // }

    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setBookNum(results.owned_books);

        // Set Date
        var month = results.end_date.toDate().getMonth();
        var year = results.end_date.toDate().getFullYear();
        var day = results.end_date.toDate().getDate();
        setEndDate(day + "/" + (month + 1) + "/" + year);
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

    setProfileError("");
    setProfileSuccess("");

    try {
      if (currentUser !== null) {
        firestore.collection("users").doc(currentUser.uid).update({
          firstName: firstNameRef.current.value,
          // lastName: lastNameRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
        });
      }

      if (
        userData.firstName === firstNameRef.current.value &&
        userData.phoneNumber === phoneNumberRef.current.value
        // && useData.lastName === lastNameRef.current.value
      ) {
        setProfileError("Tidak terjadi perubahan!");
        setProfileSuccess("");
      } else {
        setProfileSuccess("Profil berhasil diganti!");
        setProfileError("");
      }
    } catch (err) {
      var errorCode = err.code;
      var errorMessage = err.message;
      setProfileError("Error (" + errorCode + "): " + errorMessage);
      setProfileSuccess("");
    }
  }

  function handleChangePassword(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setSuccess("");
      return setError("Password tidak sama!");
    }

    if (passwordRef.current.value.length === 0) {
      setSuccess("");
      return setError("Proses Gagal!");
    }

    if (passwordRef.current.value) {
      setError("");
      setSuccess("Proses berhasil!");
      updatePassword(passwordRef.current.value);
    }
  }

  if (userData && bookNum && pending) {
    setPending(false);
  }

  if (pending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "100px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
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
            <form
              className={classes.textFieldRoot}
              onSubmit={handleUpdateUserInformation}
            >
              {profileError && (
                <div className={classes.alertRoot}>
                  <Alert severity="error">{profileError}</Alert>
                </div>
              )}
              {profileSuccess && (
                <div className={classes.alertRoot}>
                  <Alert severity="success">{profileSuccess}</Alert>
                </div>
              )}
              <TextField
                required
                defaultValue={userData.firstName}
                id="filled-basic"
                label="Nama Lengkap"
                variant="filled"
                inputRef={firstNameRef}
                fullWidth
              />
              {/* <TextField
                required
                defaultValue={userData.lastName}
                id="filled-basic"
                label="Last Name"
                variant="filled"
                inputRef={lastNameRef}
                fullWidth
              /> */}
              <TextField
                required
                disabled
                defaultValue={currentUser.email}
                id="filled-basic"
                label="Email"
                variant="filled"
                fullWidth
              />
              <TextField
                required
                defaultValue={userData.phoneNumber}
                id="filled-basic"
                label="Nomor HP"
                variant="filled"
                inputRef={phoneNumberRef}
                fullWidth
              />

              <Button type="submit" fullWidth>
                Update Profile
              </Button>
            </form>

            <div className={classes.extraSpace} />
            <Divider />
            <div className={classes.extraSpace} />

            <Typography size="subheading">Ganti Password</Typography>
            <form
              className={classes.textFieldRoot}
              onSubmit={handleChangePassword}
            >
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
                id="filled-basic"
                label="Password Baru"
                variant="filled"
                inputRef={passwordRef}
                // value={newPassword}
                type="password"
                fullWidth
              />
              <TextField
                id="filled-basic"
                label="Ketik Ulang Password Baru"
                variant="filled"
                type="password"
                inputRef={passwordConfirmRef}
                // value={newPasswordConfirm}
                fullWidth
              />
              <Button disabled={loading} type="submit" fullWidth>
                Change Password
              </Button>
            </form>
            <div className={classes.extraSpace} />

            <div className={classes.center}>
              <Button
                round
                onClick={() => fire.auth().signOut()}
                color="secondary"
              >
                <ExitToAppIcon />
                Logout
              </Button>
            </div>
          </Paper>
        </Container>
      )}

      {/*---------------------------------------------------------------*/}
      {/*---------------------- WHATSAPP FIXED NAV ---------------------*/}
      {/*---------------------------------------------------------------*/}
      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
        <Tooltip
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            style={{
              position: "fixed",
              bottom: 15,
              left: 15,
              width: "60px",
              "&:hover": {
                filter: "brightness(150%)",
              },
            }}
          />
        </Tooltip>
      </a>
      <Footer />
    </div>
  );
}
