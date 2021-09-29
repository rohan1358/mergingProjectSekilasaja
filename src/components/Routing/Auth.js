import React, { useEffect, useState } from "react";

// Firebase components
import fire from "../../firebase/fire";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";
import * as firebaseGetSubscription from "../../firebase/firebaseGetSubscription";
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

// Custom components
import Loading from "../../pages/Loading";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../feature/userSlice";
import { selectCart, setCart } from "../../feature/cartSlice";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // Auth
  const dispatch = useDispatch();
  const firestore = fire.firestore();
  const userCartTitles = useSelector(selectUser).user.cart;

  // useState Hooks
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [isEndDateSet, setIsEndDateSet] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);

      if (user) {
        const fetchData = async () => {
          const results = await firebaseGetUserDataById.getUserDataById(
            user.uid
          );

          dispatch(setUser(results));

          const unsDate = new Date("9/9/99"); // Default year for unsubscribers
          const today = new Date(); // Today's date

          // Check if user is subcribed or not.
          // If false, user is subscribed. Otherwise, true.
          if (results.end_date.toDate().toString() === unsDate.toString()) {
            setIsEndDateSet(true);
          }

          // if user is subscribed and today is the endDate, convert to unsubscribed.
          if (isEndDateSet === false) {
            if (today > results.end_date.toDate()) {
              firestore
                .collection("users")
                .doc(user.uid)
                .update({
                  is_subscribed: false,
                  end_date: new Date("9/9/99"),
                  start_date: new Date("9/9/99"),
                });
            }
          }
        };
        fetchData();

        // if (userCartTitles.length > 0) {
        //   const fetchData = () => {
        //     const getBookData = async (book_title) => {
        //       var products_ = null;
        //       if (
        //         book_title == "Subscription 1 Bulan" ||
        //         book_title == "Subscription 3 Bulan" ||
        //         book_title == "Subscription 6 Bulan" ||
        //         book_title == "Subscription 12 Bulan"
        //       ) {
        //         products_ = await firebaseGetSubscription.getSubscription(
        //           book_title
        //         );
        //       } else {
        //         products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        //           book_title
        //         );
        //       }
        //       return products_;
        //     };

        //     var book_ = [
        //       ...userCartTitles.map((book) => {
        //         return getBookData(book);
        //       }),
        //     ];

        //     var a = Promise.all(book_).then(function (book) {
        //       dispatch(setCart(book));
        //     });

        //     setPending(false);
        //   };
        //   fetchData();
        // }
      } else {
        console.log("Not logged in");
        setPending(false);
      }
    });
  }, []);

  if (pending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
