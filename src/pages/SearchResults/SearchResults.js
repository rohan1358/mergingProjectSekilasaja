import React, { useState, useEffect } from "react";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Footer from "../../components/Footer";
import MultiUseMobile from "../../styles/MultiUseMobile";
import SearchResultsBlock from "./SearchResultsBlock";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Loading from "../Loading";
import { beigeColor } from "../../styles/Style";

//Redux
import { useSelector } from "react-redux";
import { selectAllBooks } from "../../feature/allBooksSlice";

// Firebase components
import fire from "../../firebase/fire";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

export default function SearchResults({ match, history }) {
  // Auth
  const db = fire.firestore();

  // Styles
  const classes = MultiUseMobile();

  // useState hooks
  const [pending, setPending] = useState(true);
  const [searchResults, setSearchResults] = React.useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Redux
  const allBooks = useSelector(selectAllBooks);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((categorisedProduct) => ({
          ...categorisedProduct.data(),
        }))
      );

      setFilteredProducts(
        products
          .filter((product) => product.category.includes("All") == true)
          .map((categorisedProduct) => categorisedProduct)
      );
    });
  }, []);

  console.log(products);
  console.log(filteredProducts);

  useEffect(() => {
    //Filter the books according to the search input
    const results = filteredProducts.filter((book) =>
      book.book_title
        .toLowerCase()
        .includes(match.params.searchValue.toLowerCase())
    );
    setSearchResults(results);

    //Clean up function for when page changes...
    return function cleanup() {
      setPending(true);
      setSearchResults([]);
    };
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
