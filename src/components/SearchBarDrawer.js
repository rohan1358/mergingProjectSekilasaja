import React, { useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, setAllBooks } from "../feature/allBooksSlice";

import SearchResults from "../pages/SearchResults/SearchResults";

// Material-UI components
import {
  IconButton,
  Container,
  makeStyles,
  Drawer,
  TextField,
} from "@material-ui/core";

// Custom components
import NavbarStyle from "../styles/NavbarStyle";

// nodejs library to set properties for component
import clsx from "clsx";
import PropTypes from "prop-types";

import Autocomplete from '@material-ui/lab/Autocomplete';

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

  const allBooks = useSelector(selectAllBooks);

  //Handle search input value change
  const inputValueRef = useRef('')
  const handleChange = () => {
    console.log("Current input value: " + inputValueRef.current.value);
  }

  //Handle event where user selects from autocomplete search (Goes to book details page immediately)
  const goToBookDetails = (event, value) => {
    //Handle event where user presses enter
    if (event.code == 'Enter') {
      history.push(`/searchResults/${value}`);
    } else {
      console.log("Book Selected: " + value);
      history.push(`/book-details/${value}`);
    }
  }

  //Handle event where user wants to get search results with inputted value by clicking on search icon
  const handleSubmit = () => {
    history.push(`/searchResults/${inputValueRef.current.value}`);
  }

  return (
      <div
        style={{width: 300}}
      >
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onChange={(event, value) => goToBookDetails(event, value)} 
            options={allBooks.map((option) => option.book_title)}
            renderInput={(params) => (
              <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                  {...params}
                  label="Search for books here..."
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                  onChange= {handleChange}
                  inputRef={inputValueRef}
                />
              </form>
            )}
          />
          <IconButton color="inherit" onClick={handleSubmit}>
            {logo}
          </IconButton>
      </div>
  );
}

SearchBarDrawer.propTypes = {
  logo: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
};
