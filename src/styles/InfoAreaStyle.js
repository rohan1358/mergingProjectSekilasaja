import ImagesStyle from "./ImagesStyle";
import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  secondaryColor,
  grayColor,
} from "./Style";

const InfoStyle = {
  bookCover: {
    maxWidth: "200px",
    marginTop: "30px",
  },
  infoArea: {
    margin: "0 auto",
    padding: "0px",
    textAlign: "center",
  },
  iconWrapper: {
    float: "left",
    marginTop: "24px",
  },
  primary: {
    color: primaryColor,
  },
  warning: {
    color: warningColor,
  },
  danger: {
    color: dangerColor,
  },
  success: {
    color: successColor,
  },
  secondary: {
    color: secondaryColor,
  },
  gray: {
    color: grayColor,
  },
  icon: {
    color: secondaryColor,
    width: "36px",
    height: "36px",
  },
  descriptionWrapper: {
    color: secondaryColor,
    overflow: "hidden",
  },
  description: {
    color: secondaryColor,
    overflow: "hidden",
    marginTop: "0px",
  },
  iconWrapperVertical: {
    float: "none",
  },
  iconVertical: {
    width: "61px",
    height: "61px",
  },
  ...ImagesStyle,
};

export default InfoStyle;
