import React, { useEffect, useContext, useState } from "react";
import { Redirect, Route } from "react-router";

// Material UI
import { Container } from "@material-ui/core";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import VideoComponent from "../components/VideoPlayer/VidPageComponent";
import FourOFourPage from "./404page";
import ReactPlayer from "react-player";
import Typography from "../components/Typography";

//Redux
import { useSelector } from "react-redux";
import { selectOwnedBooks } from "../feature/ownedBooksSlice";

//firebase components
import fire from "../firebase/fire";
import { AuthContext } from "../components/Routing/Auth";
import * as firebaseGetUserDataById from "../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../firebase/firebaseGetBookInfoByTitle";

const db = fire.firestore();

export default function VideoWatchingPage({ match, history }) {
  const [userData, setUserData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isBookOwned, setIsBookOwned] = useState(false);
  const [bookContent, setBookContent] = useState([]);
  const ownedBooks = useSelector(selectOwnedBooks);

  useEffect(() => {
    //Check if user is logged in or not, if not logout to home page.
    if (!currentUser) {
      console.log("User is not logged in, redirecting to login page...");
      return <Redirect to="/login" />;
    } else if (currentUser && !currentUser.emailVerified) {
      console.log(
        "Redirect to email not verified page to ask for email verification..."
      );
      return <Redirect to="/verify-email" />;
    }

    const fetchData = async () => {
      const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        match.params.book_title
      );
      setBookContent(book_);
      ownedBooks.map((x) => {
        if (x.book_title == book_.book_title) {
          setIsBookOwned(true);
        }
      });
    };
    fetchData();

    if (currentUser !== null) {
      const getUser = firebaseGetUserDataById.getUserDataById(currentUser.uid);
      const fetchData = async () => {
        const results = await getUser;
        setUserData(results);
      };
      fetchData();
    } else {
      console.log("You are not logged in!");
    }
  }, []);

  const isSubscribed = userData.is_subscribed;

  return (
    <div>
      {!!isSubscribed || !!isBookOwned ? (
        <div>
          <NavBarSecond />
          <div style={{ marginTop: "100px" }} />
          <Container maxWidth="sm">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReactPlayer
                url={bookContent.video_link}
                controls={true}
                config={{
                  file: {
                    attributes: {
                      crossorigin: "anonymous",
                    },
                  },
                }}
              />
            </div>

            <Typography size="subheading">{bookContent.book_title}</Typography>
            <Typography>{bookContent.description} </Typography>
          </Container>
        </div>
      ) : (
        <FourOFourPage />
      )}
    </div>
  );
}
