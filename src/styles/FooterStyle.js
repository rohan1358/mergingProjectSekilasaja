// Custom components
import { secondaryColor, beigeColor } from "./Style";

// Material-UI components
import { makeStyles } from "@material-ui/core/styles";

const FooterStyle = makeStyles((theme) => ({
  footer: {
    marginTop: 20,
    backgroundColor: secondaryColor,
  },
  divider: {
    background: beigeColor,
  },
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
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icon: {
    marginTop: "18px",
    width: "250px",
  },
}));

export default FooterStyle;
