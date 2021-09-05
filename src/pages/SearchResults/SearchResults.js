import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Custom components
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/Navbar";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import BookSearchResultCard from "./BookSearchResultCard";
import SearchResultsBlock from "./SearchResultsBlock";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";

//Redux
import { useSelector } from "react-redux";
import { selectAllBooks, setAllBooks } from "../../feature/allBooksSlice";

import Loading from "../Loading";

export default function SearchResults({ match, history }) {
  const classes = MultiUseMobile();
  const [pending, setPending] = useState(true);

  const allBooks = useSelector(selectAllBooks);

  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(() => {
    //Filter the books according to the search input
    const results = allBooks.filter((book) =>
      book.book_title
        .toLowerCase()
        .includes(match.params.searchValue.toLowerCase())
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
      <div style={{ marginTop: "100px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
      <div className={classes.extraSpace2} />
      <SearchResultsBlock searchResults={searchResults} history={history} />
      <Footer />
    </div>
  );
}
