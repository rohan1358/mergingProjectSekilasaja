import React, { useState, useContext, useEffect } from "react";

// Custom components
import BookDetails from "./BookDetails";
import TextDetails from "./TextDetails";
import NavBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer";
import Typography from "../../components/Typography";
import VideoComponent from "../../components/VideoPlayer/VidPageComponent";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";

// Material-UI components
import { Container, Divider, Grid } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectOwnedBooks } from "../../feature/ownedBooksSlice";
import { selectCart, setCart } from "../../feature/cartSlice";
import {
  selectFavoriteBooks,
  setFavoriteBooks,
} from "../../feature/favoriteBooksSlice";

// Auth and fire
import { AuthContext } from "../../components/Routing/Auth";
import fire from "../../firebase/fire";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";
import * as firebaseUpdateCart from "../../firebase/firebaseUpdateCart";
import * as firebaseGetBookCoverImageURL from "../../firebase/firebaseGetBookCoverImageURL";
import * as firebaseGetBookAudioURL from "../../firebase/firebaseGetBookAudioURL";

const firestore = fire.firestore();

export default function BookDetailsPage({ match, history }) {
  const classes = MultiUseMobile();

  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  const ownedBooks = useSelector(selectOwnedBooks);
  const cartItems = useSelector(selectCart).cart;
  const favoriteBooks = useSelector(selectFavoriteBooks);

  const [current_product, setCurrent_Product] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isBookOwned, setIsBookOwned] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [coverLink, setCoverLink] = useState("");
  const [audioLink, setAudioLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const book_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        match.params.book_title
      );
      setCurrent_Product(book_);
      ownedBooks.map((x) => {
        if (x.book_title == book_.book_title) {
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

    if (match.params.book_title != null) {
      const getLink = firebaseGetBookCoverImageURL.getBookCoverImageURL(
        match.params.book_title
      );
      const getAudioLink = firebaseGetBookAudioURL.getBookAudioURL(
        match.params.book_title,
        1
      );

      const fetchData = async () => {
        const link = await getLink;
        const audioLink = await getAudioLink;
        setCoverLink(link);
        setAudioLink(audioLink);
      };
      fetchData();
    }
  }, [history.location]);

  useEffect(() => {
    const changeBtn = () => {
      const exist = cartItems.find(
        (x) => x.book_title === match.params.book_title
      );
      if (exist) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
    };
    changeBtn();
  }, [cartItems]);

  useEffect(() => {
    const changeBtn = () => {
      const exist = favoriteBooks.find(
        (x) => x.book_title === match.params.book_title
      );
      if (exist) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };
    changeBtn();
  }, [, favoriteBooks]);

  // console.log(isFavorite);

  const handleAddCart = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToCart(
        currentUser.uid,
        current_product
      );

      const exist = cartItems.find(
        (x) => x.book_title === match.params.book_title
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setCart([...cartItems, current_product]));
      }
    };
    fetchData();
  };

  const handleAddFavorite = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.AddToFavorite(
        currentUser.uid,
        current_product
      );

      const exist = favoriteBooks.find(
        (x) => x.book_title === match.params.book_title
      );

      if (exist) {
        console.log("Already Added");
      } else {
        dispatch(setFavoriteBooks([...favoriteBooks, current_product]));
      }
    };
    fetchData();
  };

  const handleDeleteFavorite = () => {
    const fetchData = async () => {
      const results = await firebaseUpdateCart.DeleteFromFavorite(
        currentUser.uid,
        current_product
      );
      console.log(results);
      dispatch(
        setFavoriteBooks([
          ...favoriteBooks.filter(function (ele) {
            return ele.book_title != current_product.book_title;
          }),
        ])
      );
    };
    fetchData();
  };

  return (
    <div>
      <NavBar history={history} />
      {!!currentUser ? (
        <div>
          {!!isSubscribed || !!isBookOwned ? (
            <div>
              {(current_product !== null) === true && (
                <div>
                  {(current_product.kilasan.length !== 0) === true && (
                    <Container>
                      <BookDetails
                        cover={coverLink}
                        title={current_product.book_title}
                        author={current_product.author}
                        descriptionTitle={"Tentang Apa?"}
                        description={current_product.description}
                        watchTime={"15"}
                        readTime={"15"}
                        num={current_product.kilasan.length}
                        buttons={
                          <div>
                            <div className={classes.sectionDesktop}>
                              <Grid container spacing={3}>
                                <Grid item>
                                  <Button
                                    href={`/text-page/${current_product.book_title}`}
                                  >
                                    Read or listen now!
                                  </Button>
                                </Grid>

                                <Grid item>
                                  <Button
                                    href={`/video/${current_product.book_title}`}
                                  >
                                    Watch now!
                                  </Button>
                                </Grid>

                                <Grid item>
                                  {isFavorite === false ? (
                                    <Button
                                      onClick={handleAddFavorite}
                                      color="secondary"
                                    >
                                      Add To Favorites
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={handleDeleteFavorite}
                                      color="gray"
                                    >
                                      Remove From Favorites!
                                    </Button>
                                  )}
                                </Grid>
                              </Grid>
                            </div>

                            <div className={classes.sectionMobileBlock}>
                              <Grid item xs={12}>
                                <Button
                                  href={`/text-page/${current_product.book_title}`}
                                  fullWidth
                                >
                                  Read or listen now!
                                </Button>
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  fullWidth
                                  href={`/video/${current_product.book_title}`}
                                >
                                  Watch now!
                                </Button>
                              </Grid>
                              <Grid item xs={12}>
                                {isFavorite === false ? (
                                  <Button
                                    onClick={handleAddFavorite}
                                    color="secondary"
                                    fullWidth
                                  >
                                    Add To Favorites
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={handleDeleteFavorite}
                                    color="gray"
                                    fullWidth
                                  >
                                    Remove From Favorites!
                                  </Button>
                                )}
                              </Grid>
                            </div>
                          </div>
                        }
                      />

                      <TextDetails
                        video={
                          <Button
                            href={`/video/${current_product.book_title}`}
                            color="primary"
                            fullWidth
                          >
                            <PlayCircleFilledIcon /> Akses Videonya Sekarang!
                          </Button>
                        }
                        audio={
                          <div style={{ marginTop: "3px" }}>
                            <AudioPlayer vidLink={audioLink} />
                          </div>
                        }
                        totalNum={current_product.kilasan.length}
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
                                  : "Kilas #" +
                                    (index + 1) +
                                    " : " +
                                    kilas.title}
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
                  {(current_product.kilasan.length !== 0) === true && (
                    <Container>
                      <BookDetails
                        cover={coverLink}
                        title={current_product.book_title}
                        author={current_product.author}
                        descriptionTitle={"Tentang Apa?"}
                        description={current_product.description}
                        watchTime={"15"}
                        readTime={"15"}
                        num={current_product.kilasan.length}
                        buttons={
                          <div>
                            <div className={classes.sectionDesktop}>
                              <Grid container spacing={3}>
                                <Grid item>
                                  <Button href={"/pricing"}>
                                    Subscribe Now!
                                  </Button>
                                </Grid>

                                <Grid item>
                                  {isAdded === false ? (
                                    <Button
                                      onClick={handleAddCart}
                                      color="secondary"
                                    >
                                      Add To Cart
                                    </Button>
                                  ) : (
                                    <Typography type="bold">
                                      ✔ Added to Cart!
                                    </Typography>
                                  )}
                                </Grid>
                              </Grid>
                            </div>

                            <div className={classes.sectionMobileBlock}>
                              <Grid item xs={12}>
                                <Button fullWidth href={"/pricing"}>
                                  Subscribe Now!
                                </Button>
                              </Grid>
                              <Grid item xs={12}>
                                {isAdded === false ? (
                                  <Button
                                    onClick={handleAddCart}
                                    fullWidth
                                    color="secondary"
                                  >
                                    Add To Cart
                                  </Button>
                                ) : (
                                  <Typography type="bold">
                                    ✔ Added to Cart!
                                  </Typography>
                                )}
                              </Grid>
                            </div>
                          </div>
                        }
                      />
                      <TextDetails
                        video={
                          <Button href="/pricing" color="secondary" fullWidth>
                            <PlayCircleFilledIcon /> Akses Videonya Sekarang!
                          </Button>
                        }
                        audio={
                          <div style={{ marginTop: "3px" }}>
                            <AudioPlayer vidLink={audioLink} />
                          </div>
                        }
                        totalNum={current_product.kilasan.length}
                        kilasTitle={current_product.kilasan[0].title}
                        kilasBody={
                          <div>
                            <Typography className={classes.paragraph}>
                              {current_product.kilasan[0].details[0]}
                            </Typography>

                            <Typography className={classes.paragraph}>
                              {current_product.kilasan[0].details[1]}
                            </Typography>

                            {current_product.kilasan[0].details.map(
                              (paragraph) => (
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
                              )
                            )}
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
        </div>
      ) : (
        <div>
          {(current_product !== null) === true && (
            <div>
              {(current_product.kilasan.length !== 0) === true && (
                <Container>
                  <BookDetails
                    cover={coverLink}
                    title={current_product.book_title}
                    author={current_product.author}
                    descriptionTitle={"Tentang Apa?"}
                    description={current_product.description}
                    watchTime={"15"}
                    readTime={"15"}
                    num={current_product.kilasan.length}
                    buttons={
                      <div>
                        <div className={classes.sectionDesktop}>
                          <Grid container spacing={3}>
                            <Grid item>
                              <Button href={"/login"}>
                                {" "}
                                <VpnKeyIcon /> Masuk Sekarang!
                              </Button>
                            </Grid>
                          </Grid>
                        </div>

                        <div className={classes.sectionMobileBlock}>
                          <Grid item xs={12}>
                            <Button fullWidth href={"/login"}>
                              <VpnKeyIcon />
                              Masuk Sekarang!
                            </Button>
                          </Grid>
                        </div>
                      </div>
                    }
                  />
                  <TextDetails
                    video={
                      <Button href="/pricing" color="secondary" fullWidth>
                        <PlayCircleFilledIcon /> Akses Videonya Sekarang!
                      </Button>
                    }
                    audio={
                      <div style={{ marginTop: "3px" }}>
                        <AudioPlayer vidLink={audioLink} />
                      </div>
                    }
                    totalNum={current_product.kilasan.length}
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
