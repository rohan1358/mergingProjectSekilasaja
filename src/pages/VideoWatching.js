import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router";

// Material UI
import { Container, makeStyles } from "@material-ui/core";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import Typography from "../components/Typography";
import { beigeColor } from "../styles/Style";

// Redux
import { useSelector } from "react-redux";
import { selectOwnedBooks } from "../feature/ownedBooksSlice";
import { selectUser } from "../feature/userSlice";

// firebase components
import * as firebaseGetBookInfoByTitle from "../firebase/firebaseGetBookInfoByTitle";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    paddingTop: "56.25%",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
}));

export default function VideoWatchingPage({ match, history }) {
  // styles
  const classes = useStyles();

  // useState hooks
  const [isBookOwned, setIsBookOwned] = useState(false);
  const [bookContent, setBookContent] = useState([]);
  const [pending, setPending] = useState(true);

  // Redux
  const userData = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        match.params.book_title
      );
      setBookContent(book_);

      if (userData.user.owned_books.includes(match.params.book_title)) {
        setIsBookOwned(true);
      }
      setPending(false);
    };
    fetchData();
  }, []);

  if (isBookOwned == false && !pending) {
    if (userData.user.is_subscribed == false) {
      return <Redirect to="/404page" />;
    }
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
      <div>
        <NavBarSecond />
        <div style={{ marginTop: "70px" }} />
        <Container maxWidth="md">
          <div className={classes.container}>
            <iframe
              className={classes.iframe}
              src={bookContent.video_link}
              frameborder="0"
              allow="fullscreen"
            />
          </div>

          <Typography size="subheading">{bookContent.book_title}</Typography>
        </Container>
      </div>
    </div>
  );
}
