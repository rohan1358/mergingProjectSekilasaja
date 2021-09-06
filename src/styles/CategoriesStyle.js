import { makeStyles } from "@material-ui/core/styles";
import { primaryColor, secondaryColor } from "./Style";

const CategoriesStyle = makeStyles((theme) => ({
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      textAlign: "center",
    },
  },
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionMobile: {
    display: "block",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  text: {
    margin: "auto 5px",
  },
  button: {
    color: secondaryColor,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "5px",
    border: "solid 1px #41444B",
    borderRadius: "5px",
    padding: "15px 47px",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    "&:hover": {
      background: primaryColor, //41444b
      // color: "white",
      border: "solid 1px #FFE05D",
    },
  },
  selectedButton: {
    background: primaryColor, //41444b
    // color: "#FFFFFF",
    border: "solid 1px #FFE05D",
  },
  container: {
    display: "block",
    textAlign: "center",
  },
}));

export default CategoriesStyle;
