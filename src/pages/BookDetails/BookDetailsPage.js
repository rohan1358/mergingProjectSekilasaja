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

  //const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [is_subscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
      match.params.title
    );
    setCurrent_Product(book_);
    }
    fetchData();

    if (currentUser !== null) {
      const fetchData = async () => {
        const results = await firebaseGetUserDataById.getUserDataById(
          currentUser.uid
        );
        setUserData(results);
        setIsSubscribed(results.is_subscribed);        
      };
      fetchData();
    } else {
      console.log("not log in");
    }
  }, []);

  return (
    <div>
      <NavBar />
      {!!is_subscribed ? (
        <div>
          {(current_product !== null) === true && (
            <div>
              {(current_product.kilasan[0].length !== 0) === true && (
                <Container>
                  <BookDetails
                    isSubscribed={is_subscribed}
                    cover={BookCover}
                    product={current_product}
                    currentUser={currentUser}
                    userData={userData}
                    title={current_product.title}
                    author={current_product.author}
                    descriptionTitle={"Tentang Apa?"}
                    description={current_product.description}
                    watchTime={"15"}
                    readTime={"15"}
                    num={current_product.kilasan[0].length}
                  />

                  <TextDetails
                    totalNum={current_product.kilasan[0].length}
                    kilasTitle={current_product.kilasan[0].title}
                    kilasBody={current_product.kilasan[0].details.map(
                      (paragraph) => (
                        <Typography className={classes.paragraph}>
                          {paragraph}
                        </Typography>
                      )
                    )}
                    tableOfContents={current_product.kilasan.map(
                      (kilas, index) => (
                        <div>
                          <Typography className={classes.paragraph}>
                            {kilas.title === undefined
                              ? "Ringkasan Akhir"
                              : "Kilas #" + (index + 1) + " : " + kilas.title}
                          </Typography>
                          <Divider />
                        </div>
                      )
                    )}
                  />
                </Container>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {(current_product !== null) === true && (
            <div>
              {(current_product.kilasan[0].length !== 0) === true && (
                <Container>
                  <BookDetails
                    isSubscribed={is_subscribed}
                    cover={BookCover}
                    product={current_product}
                    currentUser={currentUser}
                    userData={userData}
                    title={current_product.book_title}
                    author={current_product.author}
                    descriptionTitle={"Tentang Apa?"}
                    description={current_product.description}
                    watchTime={"15"}
                    readTime={"15"}
                    num={current_product.kilasan[0].length}
                  />
                  <TextDetails
                    totalNum={current_product.kilasan[0].length}
                    kilasTitle={current_product.kilasan[0].title}
                    kilasBody={
                      <div>
                        <Typography className={classes.paragraph}>
                          {current_product.kilasan[0].details[0]}
                        </Typography>

                        <Typography className={classes.paragraph}>
                          {current_product.kilasan[0].details[1]}
                        </Typography>

                        {current_product.kilasan[0].details.map((paragraph) => (
                          <div className={classes.blur}>
                            <Typography className={classes.paragraph}>
                              {paragraph ===
                                current_product.kilasan[0].details[0] ||
                              paragraph ===
                                current_product.kilasan[0].details[1]
                                ? ""
                                : paragraph}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    }
                    tableOfContents={current_product.kilasan.map(
                      (kilas, index) => (
                        <div>
                          {index < 3 ? (
                            <div>
                              <Typography className={classes.paragraph}>
                                {kilas.title === undefined
                                  ? "Ringkasan Akhir"
                                  : "Kilas #" +
                                    (index + 1) +
                                    " : " +
                                    kilas.title}
                              </Typography>
                              <Divider />
                            </div>
                          ) : (
                            <div className={classes.blur}>
                              <Typography className={classes.paragraph}>
                                {kilas.title === undefined
                                  ? "Ringkasan Akhir"
                                  : "Kilas #" +
                                    (index + 1) +
                                    " : " +
                                    kilas.title}
                              </Typography>
                              <Divider />
                            </div>
                          )}
                        </div>
                      )
                    )}
                  />
                </Container>
              )}
            </div>
          )}
        </div>
      )}

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
        </Container>
      )}

      <Footer />
    </div>
  );
}
