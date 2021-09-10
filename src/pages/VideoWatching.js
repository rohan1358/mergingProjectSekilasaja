import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router";

// Material UI
import { Container } from "@material-ui/core";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import ReactPlayer from "react-player";
import Typography from "../components/Typography";
import { beigeColor } from "../styles/Style";

//Redux
import { useSelector } from "react-redux";
import { selectOwnedBooks } from "../feature/ownedBooksSlice";

//firebase components
import { AuthContext } from "../components/Routing/Auth";
import * as firebaseGetUserDataById from "../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../firebase/firebaseGetBookInfoByTitle";

export default function VideoWatchingPage({ match, history }) {
  // Auth
  const { currentUser } = useContext(AuthContext);

  // useState hooks
  const [userData, setUserData] = useState([]);
  const [isBookOwned, setIsBookOwned] = useState(false);
  const [bookContent, setBookContent] = useState([]);

  // Redux
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

    if (!userData.is_subscribed) {
      if (!isBookOwned) {
        <Redirect to="/404page" />;
      }
    }
  }, []);

  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div>
        <NavBarSecond />
        <div style={{ marginTop: "70px" }} />
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

          <Typography style={{ marginTop: -15 }} size="subheading">
            {bookContent.book_title}
          </Typography>
        </Container>
      </div>
    </div>
  );
}
