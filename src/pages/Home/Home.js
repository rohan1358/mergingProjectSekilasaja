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
import TopKilasBlock from "./TopKilasBlocks";
import ReviewBlock from "./ReviewBlock";

// Material-UI components
import { Container, makeStyles, Tooltip } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";

const useStyles = makeStyles(InfoAreaStyle);

export default function Home({ history }) {
  // Styles
  const classes = MultiUseMobile();
  const books = useStyles();

  // Auth
  const { currentUser } = useContext(AuthContext);

  // useState hooks
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [bookOne, setBookOne] = useState([]);
  const [bookTwo, setBookTwo] = useState([]);
  const [bookThree, setBookThree] = useState([]);
  const [bookFour, setBookFour] = useState([]);
  const [bookFive, setBookFive] = useState([]);

  const [bookOneDesc, setBookOneDesc] = useState([]);
  const [bookTwoDesc, setBookTwoDesc] = useState([]);
  const [bookThreeDesc, setBookThreeDesc] = useState([]);
  const [bookFourDesc, setBookFourDesc] = useState([]);
  const [bookFiveDesc, setBookFiveDesc] = useState([]);

  const [coverOne, setCoverOne] = useState("");
  const [coverTwo, setCoverTwo] = useState("");
  const [coverThree, setCoverThree] = useState("");
  const [coverFour, setCoverFour] = useState("");
  const [coverFive, setCoverFive] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const book1 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "The Defining Decade"
      );
      const book2 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Kaizen"
      );
      const book3 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Rich Dad's Guide To Investing"
      );
      const book4 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Rich Dad’s Cashflow Quadrant"
      );
      const book5 = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Steve Jobs"
      );

      if (book1 != undefined) {
        setBookOne(book1);
        setBookOneDesc(book1.descriptions);
      }
      if (book2 != undefined) {
        setBookTwo(book2);
        setBookTwoDesc(book2.descriptions);
      }
      if (book3 != undefined) {
        setBookThree(book3);
        setBookThreeDesc(book3.descriptions);
      }
      if (book4 != undefined) {
        setBookFour(book4);
        setBookFourDesc(book4.descriptions);
      }
      if (book5 != undefined) {
        setBookFive(book5);
        setBookFiveDesc(book5.descriptions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const link1 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "The Defining Decade"
      );
      const link2 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "Kaizen"
      );
      const link3 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "Rich Dad's Guide To Investing"
      );
      const link4 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "Rich Dad’s Cashflow Quadrant"
      );
      const link5 = await firebaseGetBookCoverImageURL.getBookCoverImageURL(
        "Steve Jobs"
      );

      if (link1 !== undefined) setCoverOne(link1);
      if (link2 !== undefined) setCoverTwo(link2);
      if (link3 !== undefined) setCoverThree(link3);
      if (link4 !== undefined) setCoverFour(link4);
      if (link5 !== undefined) setCoverFive(link5);
    };
    fetchData();
  }, []);

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

          <TopKilasBlock
            bookOne={bookOne}
            bookTwo={bookTwo}
            bookThree={bookThree}
            bookFour={bookFour}
            bookFive={bookFive}
            bookOneDesc={bookOneDesc}
            bookTwoDesc={bookTwoDesc}
            bookThreeDesc={bookThreeDesc}
            bookFourDesc={bookFourDesc}
            bookFiveDesc={bookFiveDesc}
            coverOne={coverOne}
            coverTwo={coverTwo}
            coverThree={coverThree}
            coverFour={coverFour}
            coverFive={coverFive}
          />

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
                Bergabung Sekarang!
              </Button>
            }
          />

          <TopKilasBlock
            bookOne={bookOne}
            bookTwo={bookTwo}
            bookThree={bookThree}
            bookFour={bookFour}
            bookFive={bookFive}
            bookOneDesc={bookOneDesc}
            bookTwoDesc={bookTwoDesc}
            bookThreeDesc={bookThreeDesc}
            bookFourDesc={bookFourDesc}
            bookFiveDesc={bookFiveDesc}
            coverOne={coverOne}
            coverTwo={coverTwo}
            coverThree={coverThree}
            coverFour={coverFour}
            coverFive={coverFive}
          />

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
