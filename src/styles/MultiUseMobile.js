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
  sectionMobile: {
    display: "flex",
    // marginTop: "40px",
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
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
  flex: {
    display: "flex",
  },
  block: {
    display: "block",
  },
  paddedContent: {
    padding: "40px",
    paddingTop: "20px",
  },
  normalText: {
    textTransform: "none",
    marginTop: "5px",
    marginBottom: "5px",
  },
  extraSpace: {
    marginTop: "50px",
  },
  extraSpace2: {
    marginTop: "100px",
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
  link: {
    fontWeight: "bold",
    color: secondaryColor,
    "&:hover,&:focus": {
      cursor: "pointer",
      backgroundColor: "#808080",
    },
  },
  pricingButton: {
    padding: 15,
    width: "100%",
  },
  textFieldRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  sectionTitle: {
    borderBottom: "1px solid",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  paragraphSpace: {
    marginTop: "30px",
  },
  iconColor: {
    color: secondaryColor,
  },
  blur: {
    filter: "blur(5px)",
    userSelect: "none",
    pointerEvents: "none",
  },
  paragraph: {
    fontSize: "18px",
    userSelect: "none",
    pointerEvents: "none",
    textAlign: "left",
  },
  alertRoot: {
    width: "100%",
    marginBottom: "8px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  audioControl: {
    // before
    // width: "100%",
    // maxWidth: "800px",

    // editted
    width: "100%",
    maxWidth: "600px",
  },
  fixedLogo: {
    position: "fixed",
    bottom: 15,
    left: 15,
  },
  underline: {
    borderBottom: "9px solid #FFE05D",
    display: "inline-block",
    lineHeight: 0.45,
  },
}));

export default MultiUseMobile;
