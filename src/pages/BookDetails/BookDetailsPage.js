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
import Button from "../../components/Button";

// Material-UI components
import { Container, Divider, Grid } from "@material-ui/core";

//Redux
import { useSelector } from "react-redux";
import { selectOwnedBooks } from "../../feature/ownedBooksSlice";

// Auth and fire
import { AuthContext } from "../../components/Routing/Auth";
import fire from "../../firebase/fire";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
import { current } from "@reduxjs/toolkit";
const firestore = fire.firestore();

export default function BookDetailsPage({ match, history }) {
  const classes = MultiUseMobile();

  const [current_product, setCurrent_Product] = useState(null);

  //const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isBookOwned, setIsBookOwned] = useState(false);
  const ownedBooks = useSelector(selectOwnedBooks);

  useEffect(() => {
    const fetchData = async () => {
      const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        match.params.title
      );
      setCurrent_Product(book_);
      ownedBooks.map((x) => {
        if (x.book_title == book_.title) {
          setIsBookOwned(true);
        }
      });
    };
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
      console.log("Not logged in");
    }
  }, []);

  console.log(isSubscribed);

  return (
    <div>
      <NavBar />
      {!!isSubscribed || !!isBookOwned ? (
        <div>
          {(current_product !== null) === true && (
            <div>
              {(current_product.kilasan[0].length !== 0) === true && (
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
                    watchTime={"15"}
                    readTime={"15"}
                    num={current_product.kilasan[0].length}
                    buttons={
                      <div>
                        <div className={classes.sectionDesktop}>
                          <Grid container spacing={3}>
                            <Grid item>
                              <Button
                                href={`/text-page/${current_product.title}`}
                              >
                                Read or listen now!
                              </Button>
                            </Grid>

                            <Grid item>
                              <Button href={`/video/${current_product.title}`}>
                                Watch now!
                              </Button>
                            </Grid>

                            <Grid item>
                              <Button color="secondary">
                                Add to Favorites
                              </Button>
                            </Grid>
                          </Grid>
                        </div>

                        <div className={classes.sectionMobileBlock}>
                          <Grid item xs={12}>
                            <Button href={current_product.title} fullWidth>
                              Read or listen now!
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              href={`/video/${current_product.title}`}
                            >
                              Watch now!
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button fullWidth color="secondary">
                              Add to Favorites
                            </Button>
                          </Grid>
                        </div>
                      </div>
                    }
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
                    buttons={
                      <div>
                        <div className={classes.sectionDesktop}>
                          <Grid container spacing={3}>
                            <Grid item>
                              <Button href={"/pricing"}>Subscribe Now!</Button>
                            </Grid>

                            <Grid item>
                              {/* <Button onClick={handleAddCart} fullWidth color="secondary"> */}
                              <Button fullWidth color="secondary">
                                Add To Cart
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                        <div className={classes.sectionMobile}>
                          <Grid item xs={12}>
                            <Button fullWidth href={"/pricing"}>
                              Subscribe Now!
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            {/* <Button onClick={handleAddCart} fullWidth color="secondary"> */}
                            <Button fullWidth color="secondary">
                              Add To Cart
                            </Button>
                          </Grid>
                        </div>
                      </div>
                    }
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
                          {index < 2 ? (
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

      <Footer />
    </div>
  );
}
