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
