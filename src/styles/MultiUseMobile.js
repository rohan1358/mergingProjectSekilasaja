// Material-UI components
import { makeStyles } from "@material-ui/core/styles";
import { beigeColor, grayColor, secondaryColor } from "./Style";

const MultiUseMobile = makeStyles((theme) => ({
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktopBlock: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionMobile: {
    display: "flex",
    marginTop: "40px",
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionMobileBlock: {
    display: "block",
    marginTop: "40px",
    textAlign: "center",
    justifyContent: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  center: {
    textAlign: "center",
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
  },
  vLine: {
    borderLeft: "1px solid",
    borderColor: secondaryColor,
    height: "80%",
    position: "absolute",
    left: "50%",
    marginTop: "120px",
    marginLeft: "-3px",
    top: 0,
  },
  block: {
    display: "block",
  },
  paddedContent: {
    padding: "40px",
    paddingTop: "10px",
  },
  normalText: {
    textTransform: "none",
  },
  extraSpace: {
    marginTop: "50px",
  },
  title: {
    textAlign: "center",
  },
  dividerColor: {
    backgroundColor: grayColor,
  },
  secWidth: {
    maxWidth: "800px",
    width: "100%",
  },
  beigeText: {
    textTransform: "none",
    color: beigeColor,
  },
  pricingButton: {
    padding: 15,
    width: "100%",
  },
}));

export default MultiUseMobile;
