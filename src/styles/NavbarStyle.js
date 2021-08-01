import { makeStyles } from "@material-ui/core/styles";
import { secondaryColor } from "./Style";

const NavbarStyle = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  iconColor: {
    color: secondaryColor,
  },
  icon: {
    width: "100%",
    maxWidth: "120px",
  },
  link: {
    marginLeft: "100px",
    marginRight: "100px",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "12px",
    color: secondaryColor,
  },
}));

export default NavbarStyle;
