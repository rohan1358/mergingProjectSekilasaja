import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core";

// Custom components
import InfoStyle from "../../../styles/InfoAreaStyle";
import Typography from "../../../components/Typography";

const useStyles = makeStyles(InfoStyle);

export default function InfoArea(props) {
  const { title, description, iconColor, vertical } = props;

  //Styles
  const classes = useStyles();

  return (
    <div>
      <props.icon className={classes.iconCircle} />
      <Typography size="subheading">{title}</Typography>
      <Typography>{description}</Typography>
    </div>
  );
}
