import fire from "./fire";
import * as firebaseGetBookCoverImageURL from "./firebaseGetBookCoverImageURL.js";
import * as firebaseGetBookDashboardImageURL from "./firebaseGetBookDashboardImageURL.js";
const firestore = fire.firestore();

//Method to get all categories of books in firestore database
export async function getSubscription(book_title) {
  //References to book information in database
  var docRef = firestore.collection("subscription");
  var results = null;

  try {
    var docs = await docRef.get();
    await docs.forEach((doc) => {
      if (doc.data().book_title === book_title) {
        results = { ...doc.data() };
      }
    });
    return results;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
