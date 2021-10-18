import React, { useRef, useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { selectAllBooks } from "../../feature/allBooksSlice";

// Material-UI components
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

// Custom components
import NavbarStyle from "../../styles/NavbarStyle";
import Loading from "../../pages/Utilities/Loading";

// Firebase components
import fire from "../../firebase/fire";

export default function SearchBar({ history }) {
  // Auth
  const db = fire.firestore();

  // Styles
  const classes = NavbarStyle();

  // Redux
  const allBooks = useSelector(selectAllBooks);

  // useState hooks
  const [pending, setPending] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, []);

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
      // console.log("Book Selected: " + value);
      // history.push(`/book-details/${value}`);
      history.push(`/searchResults/${value}`);
    }
  };

  //Handle event where user wants to get search results with inputted value by clicking on search icon
  const handleSubmit = () => {
    if (inputValueRef.current.value !== "")
      history.push(`/searchResults/${inputValueRef.current.value}`);
  };

  if (pending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className={classes.search}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={(event, value) => goToBookDetails(event, value)}
        options={products
          .filter((product) => product.category.includes("All") == true)
          .map((categorisedProduct) => categorisedProduct.book_title)}
        renderInput={(params) => (
          <form
            style={{ alignItems: "center", display: "flex" }}
            // onSubmit={handleSubmit}
          >
            <div className={classes.search}>
              <TextField
                {...params}
                size="small"
                label={
                  <div className={classes.search}>
                    <SearchIcon
                      style={{ marginLeft: "-5px", marginTop: "-4px" }}
                    />
                    <div style={{ marginLeft: "3px", marginTop: "-4px" }}>
                      Cari The Intelligent Investor...
                    </div>
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
    </div>
  );
}
