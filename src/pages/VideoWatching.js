import React from "react";

// Custom components
import NavBarSecond from "../components/NavBarSecond";
import VideoComponent from "../components/VidPageComponent";

// Material-UI components
import { Container } from "@material-ui/core";

export default function VideoWatchingPage() {
  return (
    <div>
      <NavBarSecond />
      <VideoComponent
        title={"The Intelligent Investor"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada consectetur nibh ut ornare. Ut non tempor justo, lobortis porttitor lorem. Aenean sed metus dolor. Praesent in metus a lacus suscipit interdum id sit amet metus. Aliquam erat volutpat. Vestibulum id auctor leo."
        }
      />
    </div>
  );
}
