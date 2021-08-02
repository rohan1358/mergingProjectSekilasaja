import React from "react";
import VideoPrototype from "../images/video-prototype.png";

// Custom components
import Typography from "../components/Typography";
import MultiUseMobile from "../styles/MultiUseMobile";

// Material-UI components
import { Container } from "@material-ui/core";

// nodejs library to set properties for components
import PropTypes from "prop-types";

export default function VideoComponent(props) {
  const { title, description } = props;
  const mobile = MultiUseMobile();
  return (
    <div>
      <Container className={mobile.secWidth}>
        <div className={mobile.extraSpace} />

        <div>
          {/* TODO: Video */}
          <img className={mobile.secWidth} src={VideoPrototype} />
        </div>

        <div>
          <Typography size="subheading">{title}</Typography>
          <Typography>{description}</Typography>
        </div>

        <div className={mobile.extraSpace} />
      </Container>
    </div>
  );
}

VideoComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
