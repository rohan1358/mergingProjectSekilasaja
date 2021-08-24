import React, { useState, useContext, useEffect } from "react";
import BookCover from "../../images/rdpd.jpg";

// Custom components
import BookDetails from "./BookDetails";
import TextDetails from "./TextDetails";
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import Typography from "../../components/Typography";
import VideoComponent from "../../components/VidPageComponent";
import MultiUseMobile from "../../styles/MultiUseMobile";

//Import firebase function to get user based on userid
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectBook, setBook } from "../../feature/bookSlice";

// Material-UI components
import { Container, Divider } from "@material-ui/core";

// Auth and fire
import { AuthContext } from "../../components/Routing/Auth";
// Firebase components
import fire from "../../firebase/fire";

export default function BookDetailsPage({ match, history }) {
  const firestore = fire.firestore();
  const classes = MultiUseMobile();
  const dispatch = useDispatch();
  const products = useSelector(selectBook);
  const [current_product, setCurrent_Product] = useState([]);
  const [current_product_kilasan, setCurrent_Product_Kilasan] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    firestore.collection("books").onSnapshot((snapshot) => {
      dispatch(
        setBook(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        )
      );
    });

    firestore
      .collection("books")
      .doc(match.params.title)
      .collection("kilasan")
      .onSnapshot((snapshot) => {
        setCurrent_Product_Kilasan(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
      });

    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
      };
      fetchData();
    } else {
      console.log("You are not logged in!");
    }
  }, []);

  useEffect(() => {
    setCurrent_Product(
      products.filter((book) => book.book_title === match.params.title)
    );
  }, [products]);

  useEffect(() => {});

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div>
      <NavBar cartItems={cartItems} onRemove={onRemove} />
      {(current_product_kilasan.length !== 0 &&
        current_product.length !== 0) === true && (
        <Container>
          <BookDetails
            cover={BookCover}
            product={current_product[0]}
            onAdd={onAdd}
            currentUser={currentUser}
            userData={userData}
            title={current_product[0].book_title}
            author={current_product[0].author}
            descriptionTitle={"Tentang Apa?"}
            description={current_product[0].description}
            watchTime={"15"}
            readTime={"15"}
            num={current_product_kilasan.length}
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
                  {kilas.title === undefined
                    ? "Ringkasan Akhir"
                    : "Kilas #" + (index + 1) + " : " + kilas.title}
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
