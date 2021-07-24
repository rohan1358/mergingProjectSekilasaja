import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles, Container } from "@material-ui/core";

// core components
import ParallaxStyle from "../styles/ParallaxStyle";

const useStyles = makeStyles(ParallaxStyle);

export default function Parallax(props) {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    // setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  const { filter, className, children, style, image, small, border } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [classes.border]: border,
    [className]: className !== undefined,
  });
  return (
    <div>
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: "url(" + image + ")",
          transform: transform,
        }}
      >
        <Container>{children}</Container>
      </div>
    </div>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
  border: PropTypes.bool,
};
