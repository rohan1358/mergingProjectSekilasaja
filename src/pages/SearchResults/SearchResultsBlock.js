import React, { useState, useEffect } from "react";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Other components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Container } from "@material-ui/core";

import BookSearchResultCard from "../../components/BookSearchResultCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
};

export default function SearchResultsBlock(props) {
  const classes = MultiUseMobile();
  const {searchResults, history} = props;

  const [isSearchResultsEmpty, setIsSearchResultsEmpty] = useState(true);

  useEffect(() => {
    if(searchResults.length < 1){
        setIsSearchResultsEmpty(true);
    } else {
        setIsSearchResultsEmpty(false);
    }
  }, []);

  return (
    <div>
      <div className={classes.title}>
        <Typography size="heading">Search Results</Typography>
      </div>
        {isSearchResultsEmpty ? (
            <div className={classes.title}>
                <Typography size="heading">Not Found</Typography>
            </div>
        ) : (
            <div>
                {searchResults.map((product) => (
                    <Container className={classes.extraSpace}>
                        <BookSearchResultCard title={product.book_title} product={product}/>
                    </Container>
                ))}
            </div>
        )}
      {/* <BookSearchResultCard title={searchResults[0].book_title} product={searchResults[0]} history={history}/> */}
      {/* <List>
          {searchResults.map((product) => {
            <ListItem>
                  <BookSearchResultCard title={product.book_title} product={product}/>
            </ListItem>
          })}
      </List> */}
        {/* <Carousel
          autoPlay={true}
          autoPlaySpeed={1500}
          ssr={true}
          responsive={responsive}
        >
          {products.map((product) => (
            <BookCard
              coverTitle={product.book_title}
              key={product.id}
              product={product}
            />
          ))}
        </Carousel> */}
    </div>
  );
}
