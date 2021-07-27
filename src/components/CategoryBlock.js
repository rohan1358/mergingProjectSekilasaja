import React from "react";
import BookCover from "../images/rdpd.jpg";

// @material-ui/core components
import { Grid } from "@material-ui/core";

// Custom components
import BookCard from "./BookCard";
import MultiUseMobile from "../styles/MultiUseMobile";
import Typography from "./Typography";
import CategoryBar from "./CategoryBarFilter";

// nodejs library to set properties for components
import classNames from "classnames";
import PropTypes from "prop-types";

export default function CategoryBlock(props) {
  const { heading } = props;
  const classes = MultiUseMobile();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">{heading}</Typography>
      </div>

      <div>
        <CategoryBar
          color="secondary"
          tabs={[
            {
              tabButton: "Profile",
              tabContent: (
                <span>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                  </p>
                  <br />
                  <p>
                    Dramatically visualize customer directed convergence without
                    revolutionary ROI. Collaboratively administrate empowered
                    markets via plug-and-play networks. Dynamically
                    procrastinate B2C users after installed base benefits.
                  </p>
                  <br />
                  <p>This is very nice.</p>
                </span>
              ),
            },
            {
              tabButton: "Settings",
              tabContent: (
                <span>
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                  </p>
                  <br />
                  <p>
                    Dramatically maintain clicks-and-mortar solutions without
                    functional solutions.
                  </p>
                </span>
              ),
            },
            {
              tabButton: "Options",
              tabContent: (
                <span>
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.{" "}
                  </p>
                  <br />
                  <p>
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </span>
              ),
            },
          ]}
        />
        <Grid container spacing={3}>
          <BookCard
            cover={BookCover}
            title={"Rich Dad Poor Dad"}
            author={"Robert Kiyosaki"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
            }
          />
        </Grid>
      </div>
    </div>
  );
}

CategoryBlock.propTypes = {
  heading: PropTypes.string,
};
