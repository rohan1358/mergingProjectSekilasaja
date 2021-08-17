import { makeStyles } from "@material-ui/core/styles";
import { AutorenewTwoTone } from "@material-ui/icons";

const CategoriesStyle = makeStyles((theme) => ({
  // small: 600px; md, medium: 960px; lg, large: 1280px
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
        display: "flex",
        justifyContent: "space-between",
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
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "5px",
    border: "solid 1px black",
    borderRadius: "5px",
    padding: "10px 20px",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    "&:hover": {
      background: "gray", //41444b
      color: "white",
    },
  },
  selectedButton: {
    background: "#41444b", //41444b
    color: "white",
  },
  container: {
    display: "block",
    textAlign: "center",
  },
}));

export default CategoriesStyle;
