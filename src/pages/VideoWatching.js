import React, { useEffect, useContext, useState } from "react";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import VideoComponent from "../components/VidPageComponent";
import FourOFourPage from "./404page";

//firebase components
import fire from "../firebase/fire";
import { AuthContext } from "../components/Routing/Auth";
import * as firebaseGetUserDataById from "../firebase/firebaseGetUserDataById";

export default function VideoWatchingPage() {
  const [userData, setUserData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
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
      {!!isSubscribed ? (
        <div>
          <NavBarSecond />
          <VideoComponent
            vidLink={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            title={"The Intelligent Investor"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada consectetur nibh ut ornare. Ut non tempor justo, lobortis porttitor lorem. Aenean sed metus dolor. Praesent in metus a lacus suscipit interdum id sit amet metus. Aliquam erat volutpat. Vestibulum id auctor leo."
            }
          />
        </div>
      ) : (
        <FourOFourPage />
      )}
    </div>
  );
}
