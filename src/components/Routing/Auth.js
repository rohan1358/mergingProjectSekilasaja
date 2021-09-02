import React, { useEffect, useState } from "react";

// Firebase components
import fire from "../../firebase/fire";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

// custom components
import Loading from "../../pages/Loading";

// //Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../feature/userSlice";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  const firestore = fire.firestore();
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
      } else {
        console.log("Not logged in");
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
