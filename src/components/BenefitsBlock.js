import React from "react";

// @material-ui/core components
import { Grid } from "@material-ui/core";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import MenuBookIcon from "@material-ui/icons/MenuBook";

// Custom components
import InfoArea from "./InfoArea";
import MultiUseMobile from "../styles/MultiUseMobile";

// nodejs library to set properties for components
import classNames from "classnames";

export default function BenefitsBlock() {
  const classes = MultiUseMobile();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });
  return (
    <div>
      <div className={desktopClass}>
        <Grid container direction="row">
          <Grid item xs={4}>
            <InfoArea
              title="Text"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={MenuBookIcon}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={4}>
            <InfoArea
              title="Video"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VideoLibraryIcon}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={4}>
            <InfoArea
              title="Audio"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={AudiotrackIcon}
              iconColor="info"
              vertical
            />
          </Grid>
        </Grid>
      </div>

      <div className={mobileClass}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <InfoArea
              title="Text"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={MenuBookIcon}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={12}>
            <InfoArea
              title="Video"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VideoLibraryIcon}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={12}>
            <InfoArea
              title="Audio"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={AudiotrackIcon}
              iconColor="info"
              vertical
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
