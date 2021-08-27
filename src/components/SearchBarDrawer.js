import React, { useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, setAllBooks } from "../feature/allBooksSlice";

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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const allBooks = useSelector(selectAllBooks);

  //Handle search input value change
  const inputValueRef = useRef('')
  const handleChange = () => {
    console.log("Current input value: " + inputValueRef.current.value);
  }

  //Handle event where user selects from autocomplete search (Goes to book details page immediately)
  const goToBookDetails = (value) => {
    console.log("Book Selected: " + value);
    history.push(`/book-details/${value}`);
  }

  const list = (anchor) => (
    <div
      className={clsx(drawer.list, {
        [drawer.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Container maxWidth={"xs"}>
        {/* <form className={classes.root} noValidate autoComplete="off">
          <TextField fullWidth id="standard-basic" label="Search" />
        </form> */}

        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={allBooks.map((option) => option.book_title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for books here..."
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </Container>
    </div>
  );

  return (
    // <div>
    //   {[direction].map((anchor) => (
    //     <React.Fragment key={anchor}>
          // <IconButton onClick={toggleDrawer(anchor, true)} color="inherit">
          //   {logo}
          // </IconButton>

    //       <Drawer
    //         anchor={anchor}
    //         open={state[anchor]}
    //         onClose={toggleDrawer(anchor, false)}
    //       >
    //         {list(anchor)}
    //       </Drawer>
    //     </React.Fragment>
    //   ))}
    // </div>

    <div
      style={{width: 300}}
    >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          // onChange={(event, value) => console.log("HERE: " + value)} 
          onChange={(event, value) => goToBookDetails(value)} 
          options={allBooks.map((option) => option.book_title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for books here..."
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
              onChange= {handleChange}
              inputRef={inputValueRef}
            />
          )}
        />
        <IconButton color="inherit">
          {logo}
        </IconButton>
    </div>
  );
}

SearchBarDrawer.propTypes = {
  logo: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
};
