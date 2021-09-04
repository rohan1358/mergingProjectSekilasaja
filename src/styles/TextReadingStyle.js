// Material-UI components
import { makeStyles } from "@material-ui/core/styles";
import { primaryColor, secondaryColor } from "./Style";

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
    padding: "20px",
    width: "80%",
    flex: "1",
    fontSize: "1em",
    textAlign: "center",
    flexDirection: "column",
    color: secondaryColor,
    justifyContent: "space-between",
    textAlign: "left",
  },
  book_title: {
    textDecoration: "underline",
    fontSize: "1.5em",
    fontWeight: "700",
    marginLeft: "20px",
    marginBottom: "30px",
    textAlign: "center",
  },
  title: {},
  paragraph: {
    fontFamily: "Lexend Deca",
    fontSize: "18px",
    marginBottom: "30px",
    userSelect: "none",
    pointerEvents: "none",
  },
  content: {},
  page: {
    display: "flex",
    alignItems: "flex-start",
  },
  tableOfContent: {
    marginTop: "40px",
    marginBottom: "90px",
    // border: "solid 1px #41444b",
  },
  tableOfContentMobile: {
    marginTop: "40px",
    marginBottom: "100px",
    flex: "0.4",
    // border: "solid 1px #41444b",
  },
  chapter: {
    fontFamily: "Lexend Deca",
    color: secondaryColor,
    marginBottom: "10px",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      background: secondaryColor,
      color: "white",
    },
  },
  chapterContent: {
    marginBottom: "40px",
  },
  selectedChapter: {
    background: primaryColor,
    fontWeight: "bold",
  },
  extraSpace: {
    marginTop: "40px",
  },
  audioBar: {
    top: "auto",
    bottom: 0,
  },
  audio: {
    background: "none",
    "&:-webkit-media-controls-play-button": {
      backgroundColor: secondaryColor,
      color: "white",
    },
  },
  extraSpace: {
    marginTop: "50px",
  },
  rootBar: {
    flexGrow: 1,
  },
  uncopyable: {
    userSelect: "none",
    pointerEvents: "none",
  },
  link: {
    fontWeight: "bold",
    color: secondaryColor,
    "&:hover,&:focus": {
      cursor: "pointer",
    },
  },
  audioControl: {
    width: "100%",
    maxWidth: "800px",
    padding: "5px",
  },
}));

export default TextReadingStyle;
