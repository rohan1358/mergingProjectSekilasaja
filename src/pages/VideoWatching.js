import React, { useEffect, useContext, useState } from "react";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import VideoComponent from "../components/VideoPlayer/VidPageComponent";
import FourOFourPage from "./404page";

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
          <VideoComponent
            vidLink={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            title={bookContent.book_title}
            description={bookContent.description}
          />
        </div>
      ) : (
        <FourOFourPage />
      )}
    </div>
  );
}
