import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router";

// Custom components
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/Navbar";
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, setAllBooks } from "../../feature/allBooksSlice";

import Loading from "../Loading";

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
    console.log("Search value: " + match.params.searchValue);
    console.log(allBooks);
    const results = allBooks.filter(book =>
        book.book_title.toLowerCase().includes(match.params.searchValue)
    );
    setSearchResults(results);
    //Check if user is logged in or not, if not logout to home page.
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
  }, [history.location]);

  console.log(searchResults);
//   if (pending) {
//     return (
//       <>
//         <Loading />
//       </>
//     );
//   }

  return (
    <div>
      <NavBar history={history}/>
      <Footer />
    </div>
  );
}
