import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Custom components
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/Navbar";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import BookSearchResultCard from "../../components/BookSearchResultCard";
import SearchResultsBlock from "./SearchResultsBlock";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, setAllBooks } from "../../feature/allBooksSlice";

import Loading from "../Loading";

//import { getBookDashboardImageURL } from "../../firebase/firebaseGetBookDashboardImageURL";

// Firebase components
import fire from "../../firebase/fire";
import { AuthContext } from "../../components/Routing/Auth";

// Material-UI components
import { Container } from "@material-ui/core";

export default function SearchResults({ match, history }) {
  const classes = MultiUseMobile();
  const [pending, setPending] = useState(true);

  const allBooks = useSelector(selectAllBooks);

  const db = fire.firestore();
  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(() => {
    //Filter the books according to the search input
    const results = allBooks.filter(book =>
        book.book_title.toLowerCase().includes(match.params.searchValue.toLowerCase())
    );
    setSearchResults(results);
    setPending(false);
  }, [allBooks, history.location]);

  if (pending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
        <NavBar history={history}/>
        <div className={classes.extraSpace2} />
        <SearchResultsBlock searchResults={searchResults} history={history}/>
        <Footer />
    </div>
  );
}
