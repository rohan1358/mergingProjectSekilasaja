import React, { useState, useEffect } from "react";

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

//firebase components
import db from "../../firebase/fire";

export default function VideoWatchingPage({ match, history }) {
  console.log(match);

  const classes = TextReadingStyle();
  const nav = NavbarStyle();

  const [chapterContent, setChapterContent] = useState([]);
  const [conclusion, setConclusion] = useState([]);
  const [chosenChapter, setChosenChapter] = useState("1");

  useEffect(() => {
    db.collection("books")
      .doc(match.params.title)
      .collection("kilasan")
      .onSnapshot((snapshot) => {
        setChapterContent(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chapterContent: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("books")
      .doc(match.params.title)
      .collection("ringkasan_akhir")
      .onSnapshot((snapshot) => {
        setConclusion(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chapterContent: doc.data(),
          }))
        );
      });
  }, []);

  console.log(chapterContent);

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
              <div className={classes.title}>
                <Typography type="italic" size="bold">
                  Kilas #{chapterContent[chosenChapter - 1].id}
                </Typography>
              </div>
              <div className={classes.title}>
                <Typography size="subheading">
                  {chapterContent[chosenChapter - 1].chapterContent.title}
                </Typography>
              </div>
              <div className={classes.chapterContent}>
                {chapterContent[chosenChapter - 1].chapterContent.details.map(
                  (paragraph, index) => (
                    <Typography className={classes.paragraph}>
                      {paragraph}
                    </Typography>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
