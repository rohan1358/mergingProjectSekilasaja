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
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
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
const firestore = fire.firestore();

export default function BookDetailsPage({ match, history }) {
  const classes = MultiUseMobile();

  const [current_product, setCurrent_Product] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);

        const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
          match.params.title
        );
        setCurrent_Product(book_);

        //console.log(firebaseUpdateCart.GetCartDataByBooks_Title(results.cart))

        const getCartData = async (book_title) => {
          const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
            book_title
          );
          return products_;
        };

        var a = [
          ...results.cart.map((book) => {
            return getCartData(book);
          }),
        ];

        Promise.all(a).then((b) => {
          console.log(b);
          setCartItems(b);
        });
      };
      fetchData();
    } else {
      console.log("not log in");
    }
  }, []);


  console.log(current_product)



  return (
    <div>
      <NavBar cartItems={cartItems} />
      {(current_product !== null) === true && (
        <Container>
          <BookDetails
            cover={BookCover}
            product={current_product}
            currentUser={currentUser}
            userData={userData}
            title={current_product.title}
            author={current_product.author}
            descriptionTitle={"Tentang Apa?"}
            description={current_product.description}
            time={"15"}
            num={"9"}
          />

          {(current_product.kilasan.length !== 0) === true && (
            <TextDetails
              totalNum={current_product.kilasan.length}
              kilasTitle={current_product.kilasan[0].title}
              kilasBody={current_product.kilasan[0].details.map((paragraph) => (
                <Typography className={classes.paragraph}>
                  {paragraph}
                </Typography>
              ))}
              tableOfContents={current_product.kilasan.map((kilas, index) => (
                <div>
                  <Typography className={classes.paragraph}>
                    {"Kilas #" + (index + 1) + " : " + kilas.title}
                  </Typography>
                  <Divider />
                </div>
              ))}
            />
          )}
        </Container>
      )}

      <Footer />
    </div>
  );
}
