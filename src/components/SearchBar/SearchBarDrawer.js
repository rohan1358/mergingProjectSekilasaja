import React, { useRef } from "react";

// Redux
import { useSelector } from "react-redux";
import { selectAllBooks } from "../../feature/allBooksSlice";

// Material-UI components
import {
  IconButton,
  Container,
  makeStyles,
  Drawer,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

// Custom components
import NavbarStyle from "../../styles/NavbarStyle";

// nodejs library to set properties for component
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles({
  list: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  fullList: {
    width: "auto",
  },
});

export default function SearchBarDrawer(props) {
  const { logo, direction, history } = props;
  const classes = NavbarStyle();

  // Cart Drawer
  const drawer = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(drawer.list, {
        [drawer.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <div style={{ marginTop: "15px" }}>
        <Container maxWidth={"md"}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onChange={(event, value) => goToBookDetails(event, value)}
            options={allBooks.map((option) => option.book_title)}
            renderInput={(params) => (
              <form
                style={{ alignItems: "center", display: "flex" }}
                onSubmit={handleSubmit}
              >
                <div className={classes.search}>
                  <TextField
                    {...params}
                    size="small"
                    label={
                      <div className={classes.search}>
                        <SearchIcon /> Cari The Intelligent Investor...
                      </div>
                    }
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                    onChange={handleChange}
                    inputRef={inputValueRef}
                  />
                </div>
              </form>
            )}
          />
        </Container>
      </div>
    </div>
  );

  // Search Functions
  const allBooks = useSelector(selectAllBooks);

  //Handle search input value change
  const inputValueRef = useRef("");
  const handleChange = () => {
    console.log("Current input value: " + inputValueRef.current.value);
  };

  //Handle event where user selects from autocomplete search (Goes to book details page immediately)
  const goToBookDetails = (event, value) => {
    //Handle event where user presses enter
    if (event.code == "Enter") {
      history.push(`/searchResults/${value}`);
    } else {
      console.log("Book Selected: " + value);
      history.push(`/book-details/${value}`);
    }
  };

  //Handle event where user wants to get search results with inputted value by clicking on search icon
  const handleSubmit = () => {
    if (inputValueRef.current.value !== "")
      history.push(`/searchResults/${inputValueRef.current.value}`);
  };

  return (
    <div>
      {[direction].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)} color="inherit">
            {logo}
          </IconButton>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

SearchBarDrawer.propTypes = {
  logo: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
};
