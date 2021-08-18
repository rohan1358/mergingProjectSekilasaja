// Material-UI components
import { makeStyles } from "@material-ui/core/styles";

const TextReadingStyle = makeStyles((theme) => ({
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
  container: {
    display: "flex",
    margin: "auto",
    padding: "10px",
    width: "80%",
    flex: "1",
    fontSize: "1em",
    textAlign: "center",
    flexDirection: "column",
    color: "#black",
    justifyContent: "space-between",
    textAlign: "left"
  },
  book_title:{
    textDecoration: "underline",
    fontSize: "1.5em",
    fontWeight: "700",
    marginLeft: "20px",
    marginBottom: "30px",
    textAlign: "center"
    
  },
  title: {
    fontWeight: "700",
    fontSize: "1.2em",
    marginBottom: "30px",
    textAlign: "center"
  },
  paragraph: {
    marginBottom: "30px"
  },
  content:{
    
  },
  page: {
    display: "flex",
    alignItems : "flex-start"
  },
  tableOfContent: {
    flex: "0.4",
    border: "solid 1px black"
  },
  chapter:{
    marginBottom: "10px",
    padding: "10px",
    cursor: "pointer",
     "&:hover": {
      background: "gray", //41444b
      color: "white",
    },
  },
  selectedChapter:{
    background: "black", //41444b
    color: "white",
  }
}));

export default TextReadingStyle;
