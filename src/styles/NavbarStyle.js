import { makeStyles } from "@material-ui/core/styles";
import { grayColor, primaryColor, secondaryColor } from "./Style";

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
  yellowNavBar: {
    backgroundColor: primaryColor,
  },
  divider: {
    color: "#CFCFCF",
    borderRight: "1px solid",
    padding: "10px",
    marginRight: "3px",
  },
  drawerTitle: {
    marginTop: "20px",
    display: "flex",
  },
  hugeIcon: {
    color: secondaryColor,
    marginTop: "18px",
    marginRight: "7px",
    width: 35,
    height: 35,
  },
}));

export default NavbarStyle;
