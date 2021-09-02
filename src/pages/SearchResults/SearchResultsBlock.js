import React, { useState, useEffect } from "react";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Other components
import { Container, Divider } from "@material-ui/core";

import BookSearchResultCard from "./BookSearchResultCard";

export default function SearchResultsBlock(props) {
  const classes = MultiUseMobile();
  const { searchResults, history } = props;

  const [isSearchResultsEmpty, setIsSearchResultsEmpty] = useState(true);

  useEffect(() => {
    if (searchResults.length < 1) {
      setIsSearchResultsEmpty(true);
    } else {
      setIsSearchResultsEmpty(false);
    }
  }, []);

  return (
    <div>
      {isSearchResultsEmpty ? (
        <div className={classes.title}>
          <div style={{ marginTop: "200px" }} />
          <Typography size="heading">Hasil Pencarian</Typography>
          <Typography
            style={{ fontWeight: "normal" }}
            size="subheading"
            type="italic"
          >
            Kilas tidak ditemukan!
          </Typography>

          <div style={{ marginBottom: "220px" }} />
        </div>
      ) : (
        <div>
          <div className={classes.title}>
            <Typography size="heading">Hasil Pencarian</Typography>
          </div>
          {searchResults.map((product) => (
            <Container maxWidth={"md"} className={classes.extraSpace}>
              <BookSearchResultCard
                title={product.book_title}
                product={product}
              />
            </Container>
          ))}
          <div style={{ marginBottom: "120px" }} />
        </div>
      )}
    </div>
  );
}
