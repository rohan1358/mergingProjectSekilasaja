import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core";

// Custom components
import InfoStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";
import { beigeColor, secondaryColor } from "../styles/Style";

const useStyles = makeStyles(InfoStyle);

export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });
  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <props.icon style={{ color: beigeColor }} className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <Typography
          color="beigeColor"
          size="subheading"
          className={classes.title}
        >
          {title}
        </Typography>
        <Typography color="beigeColor" className={classes.description}>
          {description}
        </Typography>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "secondary",
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "secondary",
    "gray",
  ]),
  vertical: PropTypes.bool,
};
