import React, { useState, useEffect, useLayoutEffect } from "react";

// Custom components
import NavBarSecond from "../../components/NavBar/NavBarSecond";
import Drawer from "../../components/Drawer";
import TextReadingStyle from "../../styles/TextReadingStyle";
import NavbarStyle from "../../styles/NavbarStyle";
import TableOfContent from "./TableOfContent";
import Typography from "../../components/Typography";

// Material UI components
import DvrIcon from "@material-ui/icons/Dvr";
import { Container } from "@material-ui/core";
import Button from "../../components/Button";
// Material-UI components
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

//firebase components
import fire from "../../firebase/fire";

const db = fire.firestore();

export default function VideoWatchingPage({ match, history }) {
  console.log(match);

  const classes = TextReadingStyle();
  const nav = NavbarStyle();
  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
  const [chapterContent, setChapterContent] = useState([]);
  const [chosenChapter, setChosenChapter] = useState(1);

  const handleNext = () => {
    if (chosenChapter === chapterContent.length) {
      setChosenChapter(1);
    } else {
      setChosenChapter(chosenChapter + 1);
    }
  };

  useEffect(() => {
    db.collection("books")
      .doc(match.params.title)
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
  }, []);

  console.log(chapterContent.length);

  return (
    <div>
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
                <Typography size="heading">{match.params.title}</Typography>
              </div>
              {chosenChapter === chapterContent.length ? (
                <div>
                  <div className={classes.title}>
                    <Typography size="subheading">{"Conclusion"}</Typography>
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
                    <Typography type="italic" size="bold">
                      Kilas #{chapterContent[chosenChapter - 1].id}
                    </Typography>
                  </div>
                  <div className={classes.title}>
                    <Typography size="subheading">
                      {chapterContent[chosenChapter - 1].content.title}
                    </Typography>
                  </div>
                  <div className={classes.chapterContent}>
                    {chapterContent[chosenChapter - 1].content.details.map(
                      (paragraph, index) => (
                        <Typography className={classes.paragraph}>
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

      <div className={classes.extraSpace}>
        <AppBar color="white" position="fixed" className={classes.audioBar}>
          <Container>
            <Toolbar>
              <div className={classes.rootBar} />
              <Button color="transparent" onClick={handleNext}>
                <Typography type="bold">Next ►</Typography>
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
}
