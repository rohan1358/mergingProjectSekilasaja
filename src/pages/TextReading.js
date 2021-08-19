import React, { useState, useEffect } from "react";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import Drawer from "../components/Drawer";
import TextReadingStyle from "../styles/TextReadingStyle";
import NavbarStyle from "../styles/NavbarStyle";
import TableOfContent from "../components/TableOfContent";
import Typography from "../components/Typography";

// Material UI components
import DvrIcon from "@material-ui/icons/Dvr";
import { Container } from "@material-ui/core";

//firebase components
import fire from ".././firebase/fire";

export default function VideoWatchingPage() {
    const db = fire.firestore();
  const classes = TextReadingStyle();
  const nav = NavbarStyle();

  const [book, setBooks] = useState([]);
  const [content, setContent] = useState([]);
  const [chosenChapter, setChosenChapter] = useState("1");

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      setBooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          book: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    db.collection("books")
      .doc("Alibaba")
      .collection("kilasan")
      .onSnapshot((snapshot) => {
        setContent(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data(),
          }))
        );
      });
  }, []);

  console.log(content);

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
                content={content}
                chosenChapter={chosenChapter}
                setChosenChapter={setChosenChapter}
              />
            }
          />
        }
      />

      <Container maxWidth={"md"}>
        {content.length !== 0 && (
          <div className={classes.page}>
            <div className={classes.container}>
              <div className={classes.book_title}>
                <Typography size="heading">Alibaba</Typography>
              </div>
              <div className={classes.title}>
                <Typography type="italic" size="bold">
                  Kilas #{content[chosenChapter - 1].id}
                </Typography>
              </div>
              <div className={classes.title}>
                <Typography size="subheading">
                  {content[chosenChapter - 1].content.title}
                </Typography>
              </div>
              <div className={classes.content}>
                {content[chosenChapter - 1].content.details.map(
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
