import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";

// Pictures
import Logo from "../../images/yellow-logo.png";
import Whatsapp from "../../images/Whatsapp.png";

// Custom components
import BenefitsBlock from "./BenefitsBlock";
import Button from "../../components/Button";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBlock from "./CategoryBlock";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Footer from "../../components/Footer";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
<<<<<<< HEAD
import { beigeColor, secondaryColor } from "../../styles/Style";
=======
import { beigeColor } from "../../styles/Style";
import LandingUserBlock from "./LandingUserBlock";
import LandingNonUserBlock from "./LandingNonUserBlock";
import TopKilasBlock from "./TopKilasBlocks";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
>>>>>>> 41b118750aaee96e03507fef4bf406e70d554b10

// Material-UI components
import { Container, Grid, makeStyles, Tooltip } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

// nodejs library to set properties for components
import classNames from "classnames";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";
import { primaryColor } from "../../styles/Style";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import ReviewCard from "../../components/ReviewCard";
import ReviewBlock from "./ReviewBlock";

const useStyles = makeStyles(InfoAreaStyle);

const mobileStyles = makeStyles((theme) => ({
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionMobile: {
    display: "flex",
    // marginTop: "40px",
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Home({ history }) {
  // Styles
  const mobile = mobileStyles();
  const classes = MultiUseMobile();
  const books = useStyles();
  const mobileClass = classNames({
    [mobile.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [mobile.sectionDesktop]: true,
  });

  // Auth
  const { currentUser } = useContext(AuthContext);

  // useState hooks
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setIsSubscribed(results.is_subscribed);
      };
      fetchData();
    } else {
      console.log("Not logged in");
    }
  }, []);

  if (isSubscribed == true) {
    return <Redirect to={"/library"} />;
  }

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 20,
        }}
      />

      {!!currentUser ? (
        <div>
          {/*---------------------------------------------------------------*/}
          {/*--------------------------- LOGGED IN -------------------------*/}
          {/*---------------------------------------------------------------*/}

          {/* Landing Block */}
          <LandingUserBlock />

          {/* Second Block */}
          <BenefitsBlock
            logo={<img src={Logo} className={books.imgLogoText} />}
            button={
              <Button round href="/pricing">
                Berlanggan Sekarang!
              </Button>
            }
          />

          <TopKilasBlock
            button={
              <Button round href="/library">
                <LibraryBooksIcon /> Akses Library Kamu Sekarang!
              </Button>
            }
          />

          <div style={{ marginTop: "40px" }} />

          {/* Third Block */}
          <Container>
            <CategoryBlock
              history={history}
              title={"Temukan Kategori Kesukaan Kamu!"}
            />
          </Container>
        </div>
      ) : (
        <div>
          {/* Landing Block */}
          <LandingNonUserBlock />

          {/* Second Block */}
          <BenefitsBlock
            logo={<img src={Logo} className={books.imgLogoText} />}
            button={
              <Button round href="/signup">
                Bergabung Sekarang!
              </Button>
            }
          />

          <TopKilasBlock
            button={
              <Button round href="/signup">
                Daftar Sekarang!
              </Button>
            }
          />

          <div style={{ marginTop: "40px" }} />

          {/* Review Block */}
          <ReviewBlock />

          <div style={{ marginTop: "40px" }} />

          {/* Third Block */}
          <Container>
            <CategoryBlock
              history={history}
              title={"Temukan Kategori Kesukaan Kamu!"}
            />
          </Container>
        </div>
      )}
      <Footer />

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
            className={books.imgWhatsappLogo + " " + classes.fixedLogo}
          />
        </Tooltip>
      </a>
    </div>
  );
}
