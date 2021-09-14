import React, { useState, useEffect } from "react";

// Whatsapp Button
import Whatsapp from "../../images/Whatsapp.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Footer from "../../components/Footer";
import MultiUseMobile from "../../styles/MultiUseMobile";
import SearchResultsBlock from "./SearchResultsBlock";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";

//Redux
import { useSelector } from "react-redux";
import { selectAllBooks } from "../../feature/allBooksSlice";

import Loading from "../Loading";
import { beigeColor } from "../../styles/Style";

export default function SearchResults({ match, history }) {
  // Styles
  const classes = MultiUseMobile();

  // useState hooks
  const [pending, setPending] = useState(true);
  const [searchResults, setSearchResults] = React.useState([]);

  // Redux
  const allBooks = useSelector(selectAllBooks);

  useEffect(() => {
    //Filter the books according to the search input
    const results = allBooks.filter((book) =>
      book.book_title
        .toLowerCase()
        .includes(match.params.searchValue.toLowerCase())
    );
    setSearchResults(results);
  }, [allBooks, history.location]);

  useEffect(() => {
    //Set pending to false to notify that web finished pulling books based on search results
    if (searchResults) {
      setPending(false);
    }
  }, [searchResults]);

  if (pending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div style={{ backgroundColor: beigeColor }}>
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

      {/*---------------------------------------------------------------*/}
      {/*---------------------- WHATSAPP FIXED NAV ---------------------*/}
      {/*---------------------------------------------------------------*/}
      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
        <Tooltip
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            style={{
              position: "fixed",
              bottom: 15,
              left: 15,
              width: "60px",
              "&:hover": {
                filter: "brightness(150%)",
              },
            }}
          />
        </Tooltip>
      </a>

      <Footer />
    </div>
  );
}
