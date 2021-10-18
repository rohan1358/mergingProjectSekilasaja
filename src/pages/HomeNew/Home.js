import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import Footer from "../../components/Footer";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Button from "../../components/Button";
import InfoStyle from "../../styles/InfoAreaStyle";
import BenefitsBlock from "./BenefitsBlock/BenefitsBlock";
import NewKilasBlock from "./NewKilas/NewKilasBlock";
import Loading from "../Utilities/Loading";
import CategoryBlock from "./CategoryBlock/CategoryBlock";
import MultiUseMobile from "../../styles/MultiUseMobile";
import ComingSoonBlock from "./ComingSoonBlock/ComingSoonBlock";
import TestimonialBlock from "./TestimonialBlock/TestimonialBlock";

// Firebase components
import { AuthContext } from "../../components/Routing/Auth";
import fire from "../../firebase/fire";

// Material-UI components
import { Container, Grid, makeStyles, Hidden } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";
const AtomicHabits =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FAtomic%20Habits.png?alt=media&token=bf6b087c-ce51-4b90-b329-3b91bfe6a1e3";
const TheLittleBook =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Dashboard_Images%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing.png?alt=media&token=fd281a56-a2e0-4986-a1bd-b20bafe4b069";
const Logo =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fdark-logo.png?alt=media&token=cfd7dc4d-1687-473e-a272-4d7c66b97467";

// Styles
const useStyles = makeStyles(InfoStyle);

export default function HomeNew({ history }) {
  // Styles
  const books = useStyles();
  const multi = MultiUseMobile();

  // Auth
  const { currentUser } = useContext(AuthContext);
  const userData = useSelector(selectUser);
  const db = fire.firestore();

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

  if (userData.user.is_subscribed == true && currentUser) {
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
    <div>
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
      <div style={{ marginTop: "100px" }} />

      <Container style={{ textAlign: "center" }}>
        <Grid container>
          <Grid md={3} xs={12}>
            <Hidden smDown>
              <a
                href={`/book-details/The%20Little%20Book%20of%20Common%20Sense%20Investing`}
              >
                <img
                  src={TheLittleBook}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgNewHomeBook
                  }
                />
              </a>
            </Hidden>

            <Grid container>
              <Grid item xs={12}>
                <Hidden mdUp>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a
                      href={`/book-details/The%20Little%20Book%20of%20Common%20Sense%20Investing`}
                    >
                      <img
                        src={TheLittleBook}
                        className={
                          books.imgRounded +
                          " " +
                          books.imgFluid +
                          " " +
                          books.imgNewHomeBook
                        }
                      />
                    </a>
                    <a href={`/book-details/Atomic%20Habits`}>
                      <img
                        src={AtomicHabits}
                        className={
                          books.imgRounded +
                          " " +
                          books.imgFluid +
                          " " +
                          books.imgNewHomeBook
                        }
                      />
                    </a>
                  </div>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>

          <Grid md={6} xs={12}>
            <Typography size="heading">
              Malas Membaca?{" "}
              <div className={multi.underline}>Ini Solusi Buat Kamu!</div>
            </Typography>
            <Typography>
              Belajar rangkuman buku bisnis, investasi, dan pengembangan diri
              terbaik dunia hanya dalam 15 menit. Dapatkan kedua buku ini{" "}
              <strong>gratis</strong> dengan mendaftar sekarang!
            </Typography>
            <Button href="/signup" round>
              Daftar Sekarang
            </Button>
          </Grid>

          <Grid md={3}>
            <Hidden smDown>
              <a href={`/book-details/Atomic%20Habits`}>
                <img
                  src={AtomicHabits}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgNewHomeBook
                  }
                />
              </a>
            </Hidden>
          </Grid>
        </Grid>
      </Container>

      <div style={{ marginTop: 30 }} />

      <BenefitsBlock
        logo={
          <img
            src={Logo}
            style={{ marginBottom: -23 }}
            className={books.imgLogoText}
          />
        }
      />

      <div style={{ marginTop: 30 }} />

      <CategoryBlock />

      <div style={{ marginTop: 30 }} />

      <NewKilasBlock products={products} />

      <div style={{ marginTop: 30 }} />

      <ComingSoonBlock products={products} />

      <div style={{ marginTop: 30 }} />

      <TestimonialBlock />

      <div style={{ marginTop: 30 }} />

      <Container style={{ textAlign: "center" }}>
        <Grid container>
          <Grid md={3} xs={12}>
            <Hidden smDown>
              <a
                href={`/book-details/The%20Little%20Book%20of%20Common%20Sense%20Investing`}
              >
                <img
                  src={TheLittleBook}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgNewHomeBook
                  }
                />
              </a>
            </Hidden>

            <Grid container>
              <Grid item xs={12}>
                <Hidden mdUp>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a
                      href={`/book-details/The%20Little%20Book%20of%20Common%20Sense%20Investing`}
                    >
                      <img
                        src={TheLittleBook}
                        className={
                          books.imgRounded +
                          " " +
                          books.imgFluid +
                          " " +
                          books.imgNewHomeBook
                        }
                      />
                    </a>
                    <a href={`/book-details/Atomic%20Habits`}>
                      <img
                        src={AtomicHabits}
                        className={
                          books.imgRounded +
                          " " +
                          books.imgFluid +
                          " " +
                          books.imgNewHomeBook
                        }
                      />
                    </a>
                  </div>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>

          <Grid md={6} xs={12}>
            <Typography size="heading">
              Daftar sekarang dan{" "}
              <div className={multi.underline}>dapatkan kedua buku</div> ini
              gratis!
            </Typography>
            <Typography>
              Belajar rangkuman buku bisnis, investasi, dan pengembangan diri
              terbaik dunia hanya dalam 15 menit.
            </Typography>
            <Button href="/signup" round>
              Daftar Sekarang
            </Button>
          </Grid>

          <Grid md={3}>
            <Hidden smDown>
              <a href={`/book-details/Atomic%20Habits`}>
                <img
                  src={AtomicHabits}
                  className={
                    books.imgRounded +
                    " " +
                    books.imgFluid +
                    " " +
                    books.imgNewHomeBook
                  }
                />
              </a>
            </Hidden>
          </Grid>
        </Grid>
      </Container>

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
