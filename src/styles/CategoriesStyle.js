import { makeStyles } from "@material-ui/core/styles";
import { secondaryColor } from "./Style";

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
    padding: "15px 55px",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    "&:hover": {
      background: "#41444B", //41444b
      color: "white",
    },
  },
  selectedButton: {
    background: "#41444b", //41444b
    color: "#FFFFFF",
  },
  container: {
    display: "block",
    textAlign: "center",
  },
}));

export default CategoriesStyle;