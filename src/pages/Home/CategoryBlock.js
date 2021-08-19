import React, { useState, useCallback, useEffect } from "react";

// Custom components
import BookCard from "../../components/BookCard";
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import CategoryBarFilter from "../../components/CategoryBarFilter/CategoryBarFilter";
// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//Import firebase function to get books based on filter
import * as firebaseGetBooksByCategory from "../.././firebase/firebaseGetBooksByCategory.js";

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

export default function CategoryBlock(props) {
    const { products, title } = props;
    const [chosenCategory, setChosenCategory] = useState("All");
    // check the user chosen a category or not
    const [isChosenCategory, setIsChosenCategory] = useState(false);
    const classes = MultiUseMobile();
    console.log(chosenCategory);

    //Get books from firebase based on category
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            var results = await firebaseGetBooksByCategory.getBooksByCategory(chosenCategory);
            if (results) {
                console.log("HERE!");
                await results.forEach((doc) => {
                    console.log(doc.author);
                });
            }
            setBooks(results);
        };
        fetchData();
    }, [chosenCategory]);

    console.log(books);
 
    return (
    <div>
    <div className={classes.title}>
    <Typography size="heading">{title}</Typography>
    </div>
    <CategoryBarFilter
    chosenCategory={chosenCategory}
    setChosenCategory={setChosenCategory}
    setIsChosenCategory={setIsChosenCategory}
    ></CategoryBarFilter>

    {isChosenCategory === true ? (
    <Carousel
        autoPlay={true}
        autoPlaySpeed={1500}
        ssr={true}
        responsive={responsive}
    >
        {/*{products*/}
        {/*.filter(*/}
        {/*    (product) => product.categories.includes(chosenCategory) == true*/}
        {/*)*/}
        {/*.map((categorisedP_product) => (*/}
        {/*    //console.log(categorisedPproduct)*/}
        {/*    <BookCard*/}
        {/*    key={categorisedP_product.id}*/}
        {/*    product={categorisedP_product}*/}
        {/*    link={"/book-details"}*/}
        {/*    />*/}
        {/*))}*/}
        {books
            .map((book) => (
                //console.log(categorisedPproduct)
                <BookCard
                    key={book.title}
                    product={book}
                    link={"/book-details"}
                />
            ))}
    </Carousel>
    ) : (
    <Carousel
        autoPlay={true}
        autoPlaySpeed={1500}
        ssr={true}
        responsive={responsive}
    >
        {products.map((product) => (
        <BookCard
            key={product.id}
            product={product}
            link={"/book-details"}
        />
        ))}
    </Carousel>
    )}

      {/* {products.map((product) => (
          <BookCard key={product.id} product={product} link={"/book-details"} />
        ))} */}
    </div>
    // <div>
    // <div className={classes.title}>
    //   <Typography size="heading">{title}</Typography>
    // </div>

    //   <div className={classes.sectionDesktop}>
    // <Grid
    //   container
    //   direction="row"
    //   justifyContent="space-around"
    //   alignItems="center"
    //   spacing={3}
    // >
    // {products.map((product) => (
    //   <BookCard
    //     key={product.id}
    //     product={product}
    //     link={"/book-details"}
    //   />
    // ))}
    //     </Grid>
    //   </div>

    //   <div className={classes.sectionMobile}>
    //     <Grid
    //       container
    //       direction="column"
    //       justifyContent="space-between"
    //       alignItems="center"
    //     >
    //       {products.map((product) => (
    //         <BookCard
    //           key={product.id}
    //           product={product}
    //           link={"/book-details"}
    //         />
    //       ))}
    //     </Grid>
    //   </div>
    // </div>
  );
}
