import React, { useState, useEffect } from "react";
import BookCover from "../../images/rdpd.jpg";

// Custom components
import BookDetails from "./BookDetails";
import TextDetails from "./TextDetails";
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import Typography from "../../components/Typography";
import VideoComponent from "../../components/VidPageComponent";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Firebase components
import db from "../../firebase/fire";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectBook, setBook } from "../../feature/bookSlice";

// Material-UI components
import { Container, Divider } from "@material-ui/core";

export default function BookDetailsPage({ match, history }) {
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const products = useSelector(selectBook);
  const [current_product, setCurrent_Product] = useState([]);
  const [current_product_kilasan, setCurrent_Product_Kilasan] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(match.params.title);

  useEffect(() => {
    db.collection("books").onSnapshot((snapshot) => {
      dispatch(
        setBook(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        )
      );
    });

    db.collection("books")
      .doc(match.params.title)
      .collection("kilasan")
      .onSnapshot((snapshot) => {
        setCurrent_Product_Kilasan(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setCurrent_Product(
      products.filter((book) => book.book_title === match.params.title)
    );
  }, [products]);

  return (
    <div>
      <NavBar />
      {(current_product_kilasan.length !== 0 &&
        current_product.length !== 0) === true && (
        <Container>
          <BookDetails
            cover={BookCover}
            title={current_product[0].book_title}
            author={current_product[0].author}
            descriptionTitle={"Tentang Apa?"}
            description={current_product[0].description}
            time={"15"}
            num={"9"}
          />

          <TextDetails
            totalNum={current_product_kilasan.length}
            kilasTitle={current_product_kilasan[0].title}
            kilasBody={current_product_kilasan[0].details.map((paragraph) => (
              <Typography className={classes.paragraph}>{paragraph}</Typography>
            ))}
            tableOfContents={current_product_kilasan.map((kilas, index) => (
              <div>
                <Typography className={classes.paragraph}>
                  {"Kilas #" + (index + 1) + " : " + kilas.title}
                </Typography>
                <Divider />
              </div>
            ))}
          />
        </Container>
      )}

      <Footer />
    </div>
  );
}
