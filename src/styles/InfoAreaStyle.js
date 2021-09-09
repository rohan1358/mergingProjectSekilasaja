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
  buttonAddedHoverPos: {
    position: "absolute",
    // top: 270,
    marginTop: 250,
    marginLeft: 115,
  },
  buttonHoverPos: {
    position: "absolute",
    // top: 270,
    marginTop: 250,
    marginLeft: 145,
  },
  mobileButtonPos: {
    // position: "absolute",
    // top: 270,
    // marginLeft: 145,
  },
  addedMobileButtonPos: {
    // position: "absolute",
    // top: 270,
    // marginLeft: 145,
  },
  cardHover: {
    "&:hover": {
      filter: "brightness(100%)",
    },
  },
  notOwned: {
    filter: "grayscale(100%)",
  },
  bookCover: {
    maxWidth: "200px",
    // marginTop: "30px",
  },
  bookDetails: {
    marginTop: "40px",
  },
  bookDetailsDesc: {
    display: "block",
    marginLeft: "15px",
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
    // color: secondaryColor,
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
  logo: {
    marginTop: "10px",
    color: secondaryColor,
    marginRight: "2px",
  },
  kilasDesc: {
    display: "flex",
    marginRight: "20px",
  },
  kilasDescMobile: {
    display: "block",
  },
  kilasDescMobileCenter: {
    display: "flex",
    justifyContent: "center",
  },
  ...ImagesStyle,
  bookDetailsWidth: {
    marginLeft: "40px",
    marginRight: "40px",
  },
};

export default InfoStyle;
