import {
  secondaryColor,
  successColor,
  warningColor,
  dangerColor,
  beigeColor,
  grayColor,
} from "./Style";

const TypographyStyle = {
  default: {
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: "16px",
    color: secondaryColor,
    marginTop: "10px",
    marginBottom: "10px",
  },
  heading: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "bold",
    fontSize: "36px",
    color: secondaryColor,
    marginTop: "20px",
    marginBottom: "20px",
  },
  subheading: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "bold",
    fontSize: "24px",
    color: secondaryColor,
    marginTop: "18px",
    marginBottom: "18px",
  },
  small: {
    fontSize: "75%",
  },
  beigeColor: {
    color: beigeColor,
  },
  grayColor: {
    color: grayColor,
  },
  warningColor: {
    color: warningColor,
  },
  dangerColor: {
    color: dangerColor,
  },
  successColor: {
    color: successColor,
  },
  italic: {
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold",
  },
  halfWidth: {
    width: "40%",
  },
};

export default TypographyStyle;
