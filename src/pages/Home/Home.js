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
import { beigeColor } from "../../styles/Style";
import LandingUserBlock from "./LandingUserBlock";
import LandingNonUserBlock from "./LandingNonUserBlock";
import NewKilasHomeBlock from "./NewKilasHomeBlock";
import ReviewBlock from "./ReviewBlock";
import Loading from "../Loading";

// Material-UI components
import { Container, makeStyles, Tooltip } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import fire from "../../firebase/fire";

// Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";

const db = fire.firestore();

const useStyles = makeStyles(InfoAreaStyle);

export default function Home({ history }) {
  // Styles
  const classes = MultiUseMobile();
  const books = useStyles();

  // Auth
  const { currentUser } = useContext(AuthContext);
  const userData = useSelector(selectUser);

  // useState hooks
  const [pending, setPending] = useState(true);
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    // Get books info
    db.collection("books").onSnapshot((snapshot) => {
      SetProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, []);

  if (userData.user.is_subscribed == true) {
    return <Redirect to={"/library"} />;
  }

  if (products && pending) {
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
              <Button
                round
                href="/pricing"
                style={{
                  backgroundImage: "linear-gradient(to right, orange, yellow)",
                }}
              >
                Berlanggan Sekarang!
              </Button>
            }
          />

          <NewKilasHomeBlock products={products} />

          <div style={{ marginTop: "40px" }} />

          <ReviewBlock />
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              round
              href="/pricing"
              style={{
                backgroundImage: "linear-gradient(to right, orange, yellow)",
              }}
            >
              Berlanggan Sekarang!
            </Button>
          </div>

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
                Daftar Sekarang!
              </Button>
            }
          />

          <NewKilasHomeBlock products={products} />

          <div style={{ marginTop: "40px" }} />

          {/* Review Block */}
          <ReviewBlock />
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button round href="/login">
              Daftar Sekarang!
            </Button>
          </div>

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
