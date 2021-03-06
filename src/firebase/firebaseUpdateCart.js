import fire from "./fire";
import React, { useState } from "react";
import * as firebaseGetBookInfoByTitle from "../firebase/firebaseGetBookInfoByTitle";
const firestore = fire.firestore();

export function GetCartDataByBooks_Title(books_title) {
  const [cartItems, setCartItems] = useState([]);
  const getCartData = async (book_title) => {
    const products_ = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
      book_title
    );
    return products_;
  };

  var cart_ = [
    ...books_title.map((book) => {
      return getCartData(book);
    }),
  ];

  var cart = Promise.all(cart_).then(function (book) {
    setCartItems(book);
  });
  return cartItems;
}

//Method to get all categories of books in firestore database
export async function AddToCart(userid, product) {
  //References to book information in database
  var docRef = firestore.collection("users").doc(userid).get();
  var cartItems = null;
  try {
    cartItems = await docRef.then((doc) => doc.data()["cart"]);
    console.log(cartItems);
    const exist = cartItems.find((x) => x === product.book_title);
    console.log(exist);
    if (exist) {
      console.log("Already Added");
    } else {
      cartItems = [...cartItems, product.book_title];
      // console.log(product);
      firestore.collection("users").doc(userid).update({
        cart: cartItems,
      });
    }
    return cartItems;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}

//Method to get all categories of books in firestore database
export async function AddToFavorite(userid, product) {
  //References to book information in database
  var docRef = firestore.collection("users").doc(userid).get();
  var favoriteBooks = null;
  try {
    favoriteBooks = await docRef.then((doc) => doc.data()["favorite_books"]);
    console.log(favoriteBooks);
    const exist = favoriteBooks.find((x) => x === product.book_title);
    console.log(exist);
    if (exist) {
      console.log("Already Added");
    } else {
      favoriteBooks = [...favoriteBooks, product.book_title];
      console.log(product);
      firestore.collection("users").doc(userid).update({
        favorite_books: favoriteBooks,
      });
    }
    return favoriteBooks;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}

export async function DeleteFromFavorite(userid, product) {
  //References to book information in database
  var docRef = firestore.collection("users").doc(userid).get();
  var favoriteBooks = null;
  try {
    favoriteBooks = await docRef.then((doc) => doc.data()["favorite_books"]);

    const exist = favoriteBooks.find((x) => x === product.book_title);

    if (exist) {
      favoriteBooks = [
        ...favoriteBooks.filter(function (ele) {
          return ele != product.book_title;
        }),
      ];

      firestore.collection("users").doc(userid).update({
        favorite_books: favoriteBooks,
      });
    } else {
      console.log("Already Deleted");
    }
    return favoriteBooks;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}

export async function DeleteToCart(userid, product) {
  //References to book information in database
  console.log(product);
  var docRef = firestore.collection("users").doc(userid).get();
  var cartItems = null;
  try {
    cartItems = await docRef.then((doc) => doc.data()["cart"]);

    const exist = cartItems.find((x) => x === product.book_title);

    if (exist) {
      cartItems = [
        ...cartItems.filter(function (ele) {
          return ele != product.book_title;
        }),
      ];

      firestore.collection("users").doc(userid).update({
        cart: cartItems,
      });
    } else {
      console.log("Already Deleted");
    }
    return cartItems;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
