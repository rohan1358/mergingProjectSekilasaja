// Material-UI components
import { alpha, makeStyles } from "@material-ui/core/styles";

// Custom component
import { secondaryColor } from "./Style";

const SearchBarStyle = makeStyles((theme) => ({
  search: {
    position: "relative",
    alignItems: "center",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: "thin",
    borderColor: secondaryColor,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: "60%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "35%",
    },
  },
  searchIcon: {
    color: secondaryColor,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

export default SearchBarStyle;
