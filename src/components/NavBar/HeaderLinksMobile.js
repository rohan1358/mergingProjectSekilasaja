import React, { useContext, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PeopleIcon from "@material-ui/icons/People";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import HelpIcon from "@material-ui/icons/Help";

// Custom components
import Button from "../Button";
import styles from "../../styles/HeaderLinksStyle";
import { secondaryColor } from "../../styles/Style";

//Firebase components
import fire from "../.././firebase/fire";
import { AuthContext } from "../Routing/Auth";

const useStyles = makeStyles(styles);

export default function HeaderLinksMobile({ history }) {
  // Styles
  const header = useStyles();

  // Auth
  const { currentUser } = useContext(AuthContext);

  //Handle event to navigate to accounts page
  const goToAccounts = () => {
    // console.log(history);
    history.push(`/accounts`);
  };

  //Handle event to navigate to pricing page
  const goToPricing = () => {
    // console.log(history);
    history.push(`/pricing`);
  };

  //Handle event to navigate to pricing page
  const goToFAQ = () => {
    // console.log(history);
    history.push(`/faq`);
  };

  useEffect(() => {
    const signout = async () => {
      fire.auth().signOut();
    };

    //If user is logged in but not email verified, logout so currentUser becomes null
    if (currentUser && !currentUser.emailVerified) {
      signout();
    }
  }, []);

  return (
    <div>
      {!!currentUser ? (
        <List className={header.list}>
          {/* <ListItem className={header.listItem}>
            <Button fullWidth href="/library" round color="transparent">
              <div style={{ color: secondaryColor }}>
                <LibraryBooksIcon />
                My Library
              </div>
            </Button>
          </ListItem> */}

          <ListItem className={header.listItem}>
            <Button fullWidth onClick={goToAccounts} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <AccountCircleIcon /> Profil
              </div>
            </Button>
          </ListItem>

          <ListItem className={header.listItem}>
            <Button fullWidth onClick={goToFAQ} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <HelpIcon /> FAQ
              </div>
            </Button>
          </ListItem>

          <ListItem className={header.listItem}>
            <Button fullWidth onClick={goToPricing} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <MonetizationOnIcon /> Harga
              </div>
            </Button>
          </ListItem>
        </List>
      ) : (
        <List className={header.list}>
          <ListItem className={header.listItem}>
            <Button fullWidth href="/signup" round color="transparent">
              <div style={{ color: secondaryColor }}>
                <PeopleIcon /> Daftar
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button fullWidth href="/login" round color="transparent">
              <div style={{ color: secondaryColor }}>
                <VpnKeyIcon /> Login
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button fullWidth onClick={goToFAQ} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <HelpIcon /> FAQ
              </div>
            </Button>
          </ListItem>
          <ListItem className={header.listItem}>
            <Button fullWidth onClick={goToPricing} round color="transparent">
              <div style={{ color: secondaryColor }}>
                <MonetizationOnIcon /> Harga
              </div>
            </Button>
          </ListItem>
        </List>
      )}
    </div>
  );
}
