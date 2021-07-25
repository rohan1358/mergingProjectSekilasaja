import React from "react";

// @material-ui/core components
import { Grid } from "@material-ui/core";
import { Audiotrack, VideoLibrary, MenuBook } from "@material-ui/icons";

// Custom components
import InfoArea from "./InfoArea";
import MultiUseMobile from "../styles/MultiUseMobile";
import Typography from "./Typography";

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
        <Grid container direction="row" spacing={3}>
          <Grid className={classes.title} item xs={12}>
            <Typography size="heading">Apa Yang Kamu Akan Dapatkan?</Typography>
          </Grid>
          <Grid item xs={4}>
            <InfoArea
              title="Text"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={MenuBook}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={4}>
            <InfoArea
              title="Video"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VideoLibrary}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={4}>
            <InfoArea
              title="Audio"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Audiotrack}
              iconColor="info"
              vertical
            />
          </Grid>
        </Grid>
      </div>

      <div className={mobileClass}>
        <Grid container>
          <Grid item xs={12}>
            <Typography size="heading">Apa Yang Kamu Akan Dapatkan?</Typography>
          </Grid>
          <Grid item xs={12}>
            <InfoArea
              title="Text"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={MenuBook}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={12}>
            <InfoArea
              title="Video"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VideoLibrary}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={12}>
            <InfoArea
              title="Audio"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Audiotrack}
              iconColor="info"
              vertical
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
