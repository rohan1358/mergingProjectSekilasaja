import fire from "./fire";
import BookInfo from ".././model/book";

const firestore = fire.firestore();

//Method to get book info with book title
export function getBookInfo(title) {
  //References to book information in database
  var docRef = firestore.collection("books").doc(title);
  var kilasanRef = docRef.collection("kilasan");
  var ringkasanRef = docRef.collection("ringkasan_akhir");

  //Initial get book data for initial fields
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        doc = doc.data();
        console.log(doc.author);
        console.log("Document data:", doc);
        return doc;
      } else {
        console.log("Error: Book not found!");
      }

      //console.log(bookInfo.author);
      ////Get kilasan of the book
      //kilasanRef.get().then((querySnapshot) => {
      //    querySnapshot.forEach((doc) => {
      //        console.log("Document data:", doc.data());
      //    });
      //}).catch((err) => {
      //    var errorCode = err.code;
      //    var errorMessage = err.message;
      //    console.log("Error: " + errorCode + "\n\n" + errorMessage);
      //});
      ////Get ringkasan akhir of the book
      //ringkasanRef.get().then((querySnapshot) => {
      //    querySnapshot.forEach((doc) => {
      //        console.log("Document data:", doc.data());
      //    });
      //}).catch((err) => {
      //    var errorCode = err.code;
      //    var errorMessage = err.message;
      //    console.log("Error: " + errorCode + "\n\n" + errorMessage);
      //});
    })
    .catch((err) => {
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log("Error: " + errorCode + "\n\n" + errorMessage);
    });
}
