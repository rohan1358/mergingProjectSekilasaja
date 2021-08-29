import React, { useState, useEffect, useContext } from "react";

// Custom components
import NavBarSecond from "../../components/NavBar/NavBarSecond";
import Drawer from "../../components/Drawer";
import TextReadingStyle from "../../styles/TextReadingStyle";
import NavbarStyle from "../../styles/NavbarStyle";
import TableOfContent from "./TableOfContent";
import Typography from "../../components/Typography";
import FourOFourPage from "../404page";

// Material UI components
import DvrIcon from "@material-ui/icons/Dvr";
import { Container, AppBar, Grid, Paper } from "@material-ui/core";

// Custom components
import Button from "../../components/Button";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

//Redux
import { useSelector } from "react-redux";
import { selectOwnedBooks } from "../../feature/ownedBooksSlice";

//firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookAudioURL from "../../firebase/firebaseGetBookAudioURL";
const db = fire.firestore();

export default function TextReading({ match, history }) {
  console.log(match);

  const classes = TextReadingStyle();
  const nav = NavbarStyle();

  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
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
    } else {
      setChosenChapter(chosenChapter + 1);
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
  }, [, chosenChapter]);
  console.log(audioLink);
  const isSubscribed = userData.is_subscribed;

  return (
    <div>
      <div style={{ marginTop: "70px" }} />
      {!!isSubscribed || !!isBookOwned ? (
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
                    <Paper square elevation={3}>
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
                          {chapterContent[
                            chosenChapter - 1
                          ].content.details.map((paragraph, index) => (
                            <Typography
                              className={classes.uncopyable}
                              className={classes.paragraph}
                            >
                              {paragraph}
                            </Typography>
                          ))}
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
                          {chapterContent[
                            chosenChapter - 1
                          ].content.details.map((paragraph, index) => (
                            <Typography
                              className={classes.uncopyable}
                              className={classes.paragraph}
                            >
                              {paragraph}
                            </Typography>
                          ))}
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
                <AudioPlayer
                  vidLink={audioLink}
                  button={
                    <Button color="transparent" onClick={handleNext}>
                      <Typography type="bold">Next ►</Typography>
                    </Button>
                  }
                />
              </Container>
            </AppBar>
          </div>
        </div>
      ) : (
        <FourOFourPage />
      )}
    </div>
  );
}
