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
    width: "120px",
  },
}));

export default NavbarStyle;
