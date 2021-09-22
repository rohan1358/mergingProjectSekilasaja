import React, { useState, useContext, useEffect } from "react";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import BookDetails from "./BookDetails";
import TextDetails from "./TextDetails";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Footer from "../../components/Footer";
import Typography from "../../components/Typography";
import ReactAudioPlayer from "react-audio-player";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";
import TextReadingStyle from "../../styles/TextReadingStyle";
import Loading from "../Loading";

// Material-UI components
import { Container, Divider, Grid, makeStyles } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setCart } from "../../feature/cartSlice";

// Auth and fire
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";
import * as firebaseGetBookAudioURL from "../../firebase/firebaseGetBookAudioURL";
import * as firebaseGetBookAudioTrialURL from "../../firebase/firebaseGetBookAudioTrialURL";
import { beigeColor } from "../../styles/Style";

const useStyles = makeStyles(() => ({
  root: {
    overflowY: "scroll",
    height: 250,
  },
}));

export default function BookDetailsPage({ match, history }) {
  // Styles
  const classes = MultiUseMobile();
  const books = TextReadingStyle();

  // Auth
  const { currentUser } = useContext(AuthContext);

  // Redux
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart).cart;
  const tabs = useStyles();

  // useState Hooks
  const [current_product, setCurrent_Product] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isBookOwned, setIsBookOwned] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [coverLink, setCoverLink] = useState("");
  const [audioLink, setAudioLink] = useState(null);
  const [audioTrialLink, setAudioTrialLink] = useState(null);
  const [pending, setPending] = useState(true);
  const [isFinishPullUserData, setIsFinishPullUserData] = useState(false);

  //First useEffect to grab user data...
  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setIsSubscribed(results.is_subscribed);

        results.owned_books.map((x) => {
          if (x == match.params.book_title) {
            setIsBookOwned(true);
          }
        });
      };
      fetchData();
    } else {
      console.log("Not logged in");
      setIsFinishPullUserData(true);
    }
  }, [history.location]);

  // Once user data is grabbed, grab book details...
  useEffect(() => {
    const fetchData = async () => {
      const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        match.params.book_title
      );
      setCurrent_Product(book_);
    };
    fetchData();
    if (isFinishPullUserData) {
      setIsFinishPullUserData(false);
    }
  }, [userData, isSubscribed, isFinishPullUserData]);

  // Once book details is grabbed, grab book cover image...
  useEffect(() => {
    if (match.params.book_title != null) {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(
        match.params.book_title
      );

      const fetchData = async () => {
        const link = await getLink;
        setCoverLink(link);
      };
      fetchData();
    }
  }, [current_product]);

  // Once book cover image is grabbed, grab audio link...
  useEffect(() => {
    if (match.params.book_title != null) {
      const getAudioLink = firebaseGetBookAudioTrialURL.getBookAudioTrialURL(
        match.params.book_title
      );

      const fetchData = async () => {
        const audioLink = await getAudioLink;
        setAudioLink(audioLink);
      };
      fetchData();
    }
  }, [coverLink]);

  useEffect(() => {
    const changeBtn = () => {
      const exist = cartItems.find(
        (x) => x.book_title === match.params.book_title
      );
      if (exist) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
    };
    changeBtn();
  }, [cartItems]);

  const handleAddCart = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        current_product
      );

      const exist = cartItems.find(
        (x) => x.book_title === match.params.book_title
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, current_product]));
      }
    };
    fetchData();
  };

  //Only stop loading (Set pending to false) when all book details have been pulled from database
  if (current_product && coverLink && audioLink && pending) {
    setPending(false);
  }

  //Make page loading till book details have been loaded
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
      {!!currentUser ? (
        <div>
          {!!isSubscribed || !!isBookOwned ? (
            <div>
              {(current_product !== null) === true && (
                <div>
                  {(current_product.kilasan.length !== 0) === true && (
                    <Container>
                      <BookDetails
                        cover={coverLink}
                        title={current_product.book_title}
                        author={current_product.author}
                        descriptionTitle={"Tentang Apa?"}
                        description={current_product.descriptions}
                        watchTime={current_product.watch_time}
                        readTime={current_product.read_time}
                        num={current_product.kilasan.length}
                        buttons={
                          <div>
                            <div className={classes.sectionDesktop}>
                              <Grid container spacing={3}>
                                <Grid item>
                                  <Button
                                    href={`/text-page/${current_product.book_title}`}
                                  >
                                    Read or listen now!
                                  </Button>
                                </Grid>

                                <Grid item>
                                  {current_product.video_link ? (
                                    <Button
                                      href={`/video/${current_product.book_title}`}
                                    >
                                      Watch now!
                                    </Button>
                                  ) : (
                                    <Button disabled="true">
                                      Video coming soon!
                                    </Button>
                                  )}
                                </Grid>

                                <Grid item>
                                  <Button color="secondary" href="/library">
                                    <LibraryBooksIcon /> My Library
                                  </Button>
                                </Grid>
                              </Grid>
                            </div>

                            <div
                              style={{ textAlign: "left" }}
                              className={classes.sectionMobileBlock}
                            >
                              <Grid item xs={12}>
                                <Button
                                  href={`/text-page/${current_product.book_title}`}
                                  fullWidth
                                >
                                  Read or listen now!
                                </Button>
                              </Grid>

                              <Grid item xs={12}>
                                {current_product.video_link ? (
                                  <Button
                                    fullWidth
                                    href={`/video/${current_product.book_title}`}
                                  >
                                    Watch now!
                                  </Button>
                                ) : (
                                  <Button fullWidth disabled="true">
                                    Video coming soon!
                                  </Button>
                                )}
                              </Grid>

                              <Grid item>
                                <Button
                                  fullWidth
                                  color="secondary"
                                  href="/library"
                                >
                                  <LibraryBooksIcon /> My Library
                                </Button>
                              </Grid>
                            </div>
                          </div>
                        }
                      />

                      <TextDetails
                        libraryButton={
                          <Button fullWidth color="secondary" href="/library">
                            <LibraryBooksIcon /> Go To My Library
                          </Button>
                        }
                        video={
                          current_product.video_link ? (
                            <Button
                              href={`/video/${current_product.book_title}`}
                              color="primary"
                              fullWidth
                            >
                              <PlayCircleFilledIcon /> Akses Videonya Sekarang!
                            </Button>
                          ) : (
                            <Button disabled="true" color="primary" fullWidth>
                              <PlayCircleFilledIcon />
                              Video coming soon!
                            </Button>
                          )
                        }
                        audio={
                          <ReactAudioPlayer
                            className={classes.audioControl}
                            controlsList="nodownload"
                            src={audioLink}
                            controls
                          />
                        }
                        totalNum={current_product.kilasan.length}
                        kilasTitle={
                          <Typography
                            style={{ textAlign: "left" }}
                            size="subheading"
                          >
                            {current_product.kilasan[0].title}
                          </Typography>
                        }
                        kilasBody={current_product.kilasan[0].details.map(
                          (paragraph) => (
                            <Typography
                              style={{ textAlign: "left" }}
                              className={books.paragraphBookDetails}
                            >
                              {paragraph}
                            </Typography>
                          )
                        )}
                        tableOfContents={
                          <div className={tabs.root}>
                            {current_product.kilasan.map((kilas, index) => (
                              <Typography style={{ textAlign: "left" }}>
                                {kilas.title === undefined
                                  ? "Ringkasan Akhir"
                                  : "Kilas #" +
                                    (index + 1) +
                                    " : " +
                                    kilas.title}
                                <Divider
                                  style={{
                                    marginTop: "12px",
                                    marginBottom: "12px",
                                  }}
                                />
                              </Typography>
                            ))}
                          </div>
                        }
                      />
                    </Container>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {(current_product !== null) === true && (
                <div>
                  {(current_product.kilasan.length !== 0) === true && (
                    <Container>
                      <BookDetails
                        cover={coverLink}
                        title={current_product.book_title}
                        author={current_product.author}
                        descriptionTitle={"Tentang Apa?"}
                        description={current_product.descriptions}
                        watchTime={current_product.watch_time}
                        readTime={current_product.read_time}
                        num={current_product.kilasan.length}
                        buttons={
                          <div>
                            <div className={classes.sectionDesktop}>
                              <Grid container spacing={3}>
                                <Grid item>
                                  <Button href={"/pricing"}>
                                    Berlanggan Sekarang!
                                  </Button>
                                </Grid>

                                <Grid item>
                                  {isAdded === false ? (
                                    <Button
                                      onClick={handleAddCart}
                                      color="secondary"
                                    >
                                      Tambah Ke Keranjang!
                                    </Button>
                                  ) : (
                                    <Typography type="bold">
                                      ✔ Added!
                                    </Typography>
                                  )}
                                </Grid>

                                <Grid item>
                                  <Button color="secondary" href="/library">
                                    <LibraryBooksIcon /> My Library
                                  </Button>
                                </Grid>
                              </Grid>
                            </div>

                            <div className={classes.sectionMobileBlock}>
                              <Grid item xs={12}>
                                <Button fullWidth href={"/pricing"}>
                                  Berlanggan Sekarang!
                                </Button>
                              </Grid>
                              <Grid item xs={12}>
                                {isAdded === false ? (
                                  <Button
                                    onClick={handleAddCart}
                                    fullWidth
                                    color="secondary"
                                  >
                                    Tambah Ke Keranjang
                                  </Button>
                                ) : (
                                  <Typography type="bold">✔ Added!</Typography>
                                )}
                              </Grid>

                              <Grid item>
                                <Button
                                  fullWidth
                                  color="secondary"
                                  href="/library"
                                >
                                  <LibraryBooksIcon /> My Library
                                </Button>
                              </Grid>
                            </div>
                          </div>
                        }
                      />

                      <TextDetails
                        libraryButton={
                          <Button fullWidth color="secondary" href="/library">
                            <LibraryBooksIcon /> Go To My Library
                          </Button>
                        }
                        video={
                          current_product.video_link ? (
                            <Button href="/pricing" color="secondary" fullWidth>
                              <PlayCircleFilledIcon /> Akses Videonya Sekarang!
                            </Button>
                          ) : (
                            <Button disabled="true" color="primary" fullWidth>
                              <PlayCircleFilledIcon />
                              Video coming soon!
                            </Button>
                          )
                        }
                        audio={
                          <ReactAudioPlayer
                            className={classes.audioControl}
                            controlsList="nodownload"
                            src={audioLink}
                            controls
                          />
                        }
                        totalNum={current_product.kilasan.length}
                        kilasTitle={
                          <Typography
                            style={{ textAlign: "left" }}
                            size="subheading"
                          >
                            {current_product.kilasan[0].title}
                          </Typography>
                        }
                        kilasBody={
                          <div style={{ textAlign: "left" }}>
                            <Typography className={books.paragraphBookDetails}>
                              {current_product.kilasan[0].details[0]}
                            </Typography>

                            <Typography className={books.paragraphBookDetails}>
                              {current_product.kilasan[0].details[1]}
                            </Typography>

                            <Typography className={books.paragraphBookDetails}>
                              {current_product.kilasan[0].details[2]}
                            </Typography>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button round href="/pricing">
                                Berlanggan Sekarang!
                              </Button>
                            </div>

                            {current_product.kilasan[0].details.map(
                              (paragraph) => (
                                <div className={classes.blur}>
                                  <Typography
                                    className={books.paragraphBookDetails}
                                  >
                                    {paragraph ===
                                      current_product.kilasan[0].details[0] ||
                                    paragraph ===
                                      current_product.kilasan[0].details[1] ||
                                    paragraph ===
                                      current_product.kilasan[0].details[2]
                                      ? ""
                                      : paragraph}
                                  </Typography>
                                </div>
                              )
                            )}
                          </div>
                        }
                        tableOfContents={
                          <div className={tabs.root}>
                            {current_product.kilasan.map((kilas, index) => (
                              <div>
                                {index < 2 ? (
                                  <div>
                                    <Typography
                                      style={{ textAlign: "left" }}
                                      className={books.paragraphBookDetails}
                                    >
                                      {kilas.title === undefined
                                        ? "Ringkasan Akhir"
                                        : "Kilas #" +
                                          (index + 1) +
                                          " : " +
                                          kilas.title}
                                    </Typography>
                                    <Divider />
                                  </div>
                                ) : (
                                  <div className={classes.blur}>
                                    <Typography
                                      style={{ textAlign: "left" }}
                                      className={books.paragraphBookDetails}
                                    >
                                      {kilas.title === undefined
                                        ? "Ringkasan Akhir"
                                        : "Kilas #" +
                                          (index + 1) +
                                          " : " +
                                          kilas.title}
                                    </Typography>
                                    <Divider />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        }
                      />
                    </Container>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {(current_product !== null) === true && (
            <div>
              {(current_product.kilasan.length !== 0) === true && (
                <Container>
                  <BookDetails
                    cover={coverLink}
                    title={current_product.book_title}
                    author={current_product.author}
                    descriptionTitle={"Tentang Apa?"}
                    description={current_product.descriptions}
                    watchTime={"15"}
                    readTime={"15"}
                    num={current_product.kilasan.length}
                    buttons={
                      <div>
                        <div className={classes.sectionDesktop}>
                          <Grid container spacing={3}>
                            <Grid item>
                              <Button href={"/login"}>
                                {" "}
                                <VpnKeyIcon /> Masuk Sekarang!
                              </Button>
                            </Grid>
                          </Grid>
                        </div>

                        <div className={classes.sectionMobileBlock}>
                          <Grid item xs={12}>
                            <Button fullWidth href={"/login"}>
                              <VpnKeyIcon />
                              Masuk Sekarang!
                            </Button>
                          </Grid>
                        </div>
                      </div>
                    }
                  />

                  <TextDetails
                    libraryButton={
                      <Button fullWidth color="secondary" href="/library">
                        <LibraryBooksIcon /> Go To My Library
                      </Button>
                    }
                    video={
                      current_product.video_link ? (
                        <Button href="/pricing" color="secondary" fullWidth>
                          <PlayCircleFilledIcon /> Akses Videonya Sekarang!
                        </Button>
                      ) : (
                        <Button disabled="true" color="primary" fullWidth>
                          <PlayCircleFilledIcon />
                          Video coming soon!
                        </Button>
                      )
                    }
                    audio={
                      <ReactAudioPlayer
                        className={classes.audioControl}
                        controlsList="nodownload"
                        src={audioLink}
                        controls
                      />
                    }
                    totalNum={current_product.kilasan.length}
                    kilasTitle={
                      <Typography
                        style={{ textAlign: "left" }}
                        size="subheading"
                      >
                        {current_product.kilasan[0].title}
                      </Typography>
                    }
                    kilasBody={
                      <div style={{ textAlign: "left" }}>
                        <Typography className={books.paragraphBookDetails}>
                          {current_product.kilasan[0].details[0]}
                        </Typography>

                        <Typography className={books.paragraphBookDetails}>
                          {current_product.kilasan[0].details[1]}
                        </Typography>

                        <Typography className={books.paragraphBookDetails}>
                          {current_product.kilasan[0].details[2]}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button round href="/pricing">
                            Berlanggan Sekarang!
                          </Button>
                        </div>

                        {current_product.kilasan[0].details.map((paragraph) => (
                          <div className={classes.blur}>
                            <Typography className={books.paragraphBookDetails}>
                              {paragraph ===
                                current_product.kilasan[0].details[0] ||
                              paragraph ===
                                current_product.kilasan[0].details[1] ||
                              paragraph ===
                                current_product.kilasan[0].details[2]
                                ? ""
                                : paragraph}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    }
                    tableOfContents={
                      <div className={tabs.root}>
                        {current_product.kilasan.map((kilas, index) => (
                          <div>
                            {index < 2 ? (
                              <div>
                                <Typography
                                  style={{ textAlign: "left" }}
                                  className={books.paragraphBookDetails}
                                >
                                  {kilas.title === undefined
                                    ? "Ringkasan Akhir"
                                    : "Kilas #" +
                                      (index + 1) +
                                      " : " +
                                      kilas.title}
                                </Typography>
                                <Divider />
                              </div>
                            ) : (
                              <div className={classes.blur}>
                                <Typography
                                  style={{ textAlign: "left" }}
                                  className={books.paragraphBookDetails}
                                >
                                  {kilas.title === undefined
                                    ? "Ringkasan Akhir"
                                    : "Kilas #" +
                                      (index + 1) +
                                      " : " +
                                      kilas.title}
                                </Typography>
                                <Divider />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    }
                  />
                </Container>
              )}
            </div>
          )}
        </div>
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
