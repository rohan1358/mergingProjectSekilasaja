import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";

// core components
import TypographyStyle from "../styles/TypographyStyle";

const makeComponentStyles = makeStyles(() => ({
  ...TypographyStyle,
}));

export default function Typography(props) {
  const { color, children, size, className, type, halfWidth, ...rest } = props;

  const classes = makeComponentStyles();

  const typographyClasses = classNames({
    [classes.default]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes[type]]: type,
    [classes.halfWidth]: halfWidth,
    [className]: className,
  });

  return (
    <div {...rest} className={typographyClasses}>
      {children}
    </div>
  );
}

Typography.propTypes = {
  color: PropTypes.oneOf([
    "beigeColor",
    "grayColor",
    "warningColor",
    "dangerColor",
    "successColor",
  ]),
  size: PropTypes.oneOf(["heading", "subheading", "small"]),
  type: PropTypes.oneOf(["italic", "bold"]),
  children: PropTypes.node,
  className: PropTypes.string,
  halfWidth: PropTypes.bool,
};
