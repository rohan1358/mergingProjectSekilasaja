import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";

// Custom components
import NavBarSecond from "../../components/NavBar/NavBarSecond";
import Drawer from "../../components/Drawer";
import TextReadingStyle from "../../styles/TextReadingStyle";
import NavbarStyle from "../../styles/NavbarStyle";
import TableOfContent from "./TableOfContent";
import Typography from "../../components/Typography";
import FourOFourPage from "../404page";
import ReactAudioPlayer from "react-audio-player";

// Material UI components
import DvrIcon from "@material-ui/icons/Dvr";
import { Container, AppBar, Grid, Paper, Link } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Custom components
import Button from "../../components/Button";

//Redux
import { useSelector } from "react-redux";
import { selectOwnedBooks } from "../../feature/ownedBooksSlice";

//firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookAudioURL from "../../firebase/firebaseGetBookAudioURL";
import { beigeColor, primaryColor } from "../../styles/Style";

export default function TextReading({ match, history }) {
  const db = fire.firestore();

  const classes = TextReadingStyle();
  const nav = NavbarStyle();

  const [chapterContent, setChapterContent] = useState([]);
  const [chosenChapter, setChosenChapter] = useState(1);
  const [audioLink, setAudioLink] = useState(null);
  const [userData, setUserData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isBookOwned, setIsBookOwned] = useState(false);
  const ownedBooks = useSelector(selectOwnedBooks);

  const handleNext = () => {
    if (chosenChapter === chapterContent.length) {
      setChosenChapter(1);
      window.scrollTo(0, 0);
    } else {
      setChosenChapter(chosenChapter + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (chosenChapter === 1) {
      setChosenChapter(chapterContent.length);
      window.scrollTo(0, 0);
    } else {
      setChosenChapter(chosenChapter - 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    db.collection("books")
      .doc(match.params.book_title)
      .collection("kilasan")
      .orderBy("kilas")
      .onSnapshot((snapshot) => {
        setChapterContent(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data(),
          }))
        );
      });

    ownedBooks.map((x) => {
      if (x.book_title == match.params.book_title) {
        setIsBookOwned(true);
      }
    });

    if (currentUser !== null) {
      const getUser = firebaseGetUserDataById.getUserDataById(currentUser.uid);
      const getlink = firebaseGetBookAudioURL.getBookAudioURL(
        match.params.book_title,
        chosenChapter
      );
      const fetchData = async () => {
        const results = await getUser;
        const link = await getlink;
        setUserData(results);
        setAudioLink(link);
      };
      fetchData();
    } else {
      console.log("You are not logged in!");
    }

    if (!userData.is_subscribed) {
      if (!isBookOwned) {
        <Redirect to="/404page" />;
      }
    }
  }, [, chosenChapter]);

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "70px" }} />
      {/* {!!isSubscribed || !!isBookOwned ? ( */}
      <div>
        <div className={classes.sectionDesktop}>
          <NavBarSecond
            children={
              <Typography size="subheading">
                {match.params.book_title}
              </Typography>
            }
          />
          <Container>
            {chapterContent.length !== 0 && (
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper style={{ maxWidth: "375px" }} square elevation={3}>
                    <TableOfContent
                      chapterContent={chapterContent}
                      chosenChapter={chosenChapter}
                      setChosenChapter={setChosenChapter}
                      classes={classes.tableOfContent}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={8}>
                  {chosenChapter === chapterContent.length ? (
                    <div>
                      <div className={classes.extraSpace} />
                      <div className={classes.title}>
                        <Typography
                          className={classes.uncopyable}
                          size="subheading"
                        >
                          {"Ringkasan Akhir"}
                        </Typography>
                      </div>
                      <div className={classes.chapterContent}>
                        {chapterContent[
                          chapterContent.length - 1
                        ].content.details.map((paragraph, index) => (
                          <Typography className={classes.paragraph}>
                            {paragraph}
                          </Typography>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={classes.extraSpace} />
                      <div className={classes.title}>
                        <Typography
                          className={classes.uncopyable}
                          size="subheading"
                        >
                          {chapterContent[chosenChapter - 1].content.title}
                        </Typography>
                      </div>
                      <div className={classes.chapterContent}>
                        {chapterContent[chosenChapter - 1].content.details.map(
                          (paragraph, index) => (
                            <Typography
                              className={classes.uncopyable}
                              className={classes.paragraph}
                            >
                              {paragraph}
                            </Typography>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
          </Container>
        </div>

        <div className={classes.sectionMobile}>
          <NavBarSecond
            children={
              <Drawer
                direction={"left"}
                drawerLogo={<DvrIcon className={nav.hugeIcon} />}
                drawerTitle={"Daftar Kilas"}
                logo={<DvrIcon className={nav.iconColor} />}
                children={
                  <TableOfContent
                    chapterContent={chapterContent}
                    chosenChapter={chosenChapter}
                    setChosenChapter={setChosenChapter}
                  />
                }
              />
            }
            buttons={
              <div>
                <Button
                  round
                  style={{ fontSize: "17px", width: 0 }}
                  color="gray"
                  onClick={handlePrev}
                >
                  <ArrowBackIcon />
                </Button>
                <Button
                  color="gray"
                  style={{ fontSize: "17px", width: 0 }}
                  round
                  onClick={handleNext}
                >
                  <ArrowForwardIcon />
                </Button>
              </div>
            }
          />

          <Container maxWidth={"md"}>
            {chapterContent.length !== 0 && (
              <div className={classes.page}>
                <div className={classes.container}>
                  <div className={classes.book_title}>
                    <Typography className={classes.uncopyable} size="heading">
                      {match.params.book_title}
                    </Typography>
                  </div>
                  {chosenChapter === chapterContent.length ? (
                    <div>
                      <div className={classes.title}>
                        <Typography
                          className={classes.uncopyable}
                          size="subheading"
                        >
                          {"Ringkasan Akhir"}
                        </Typography>
                      </div>
                      <div className={classes.chapterContent}>
                        {chapterContent[
                          chapterContent.length - 1
                        ].content.details.map((paragraph, index) => (
                          <Typography className={classes.paragraph}>
                            {paragraph}
                          </Typography>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={classes.title}>
                        <Typography
                          className={classes.uncopyable}
                          type="italic"
                          size="bold"
                        >
                          Kilas #{chapterContent[chosenChapter - 1].id}
                        </Typography>
                      </div>
                      <div className={classes.title}>
                        <Typography
                          className={classes.uncopyable}
                          size="subheading"
                        >
                          {chapterContent[chosenChapter - 1].content.title}
                        </Typography>
                      </div>
                      <div className={classes.chapterContent}>
                        {chapterContent[chosenChapter - 1].content.details.map(
                          (paragraph, index) => (
                            <Typography
                              className={classes.uncopyable}
                              className={classes.paragraph}
                            >
                              {paragraph}
                            </Typography>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Container>
        </div>

        <div style={{ marginTop: "100px" }}>
          <AppBar color="white" position="fixed" className={classes.audioBar}>
            <Container>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={classes.sectionDesktop}>
                  <Button
                    round
                    style={{ fontSize: "17px", width: 0 }}
                    onClick={handlePrev}
                  >
                    <ArrowBackIcon />
                  </Button>
                </div>

                <ReactAudioPlayer
                  className={classes.audioControl}
                  controlsList="nodownload"
                  src={audioLink}
                  autoPlay
                  controls
                  onEnded={handleNext}
                />

                <div className={classes.sectionDesktop}>
                  <Button
                    style={{ fontSize: "17px", width: 0 }}
                    round
                    onClick={handleNext}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </div>
              </div>
            </Container>
          </AppBar>
        </div>
      </div>
      {/* ) : (
        <FourOFourPage />
      )} */}
    </div>
  );
}
