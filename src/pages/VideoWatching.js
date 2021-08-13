import React from "react";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import VideoComponent from "../components/VidPageComponent";

export default function VideoWatchingPage() {
  return (
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
  );
}
