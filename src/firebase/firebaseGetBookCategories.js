import fire from "./fire";

const firestore = fire.firestore();

//Method to get all categories of books in firestore database
export async function getBookCategories() {
  //References to book information in database
  var docRef = firestore.collection("books");
  var results = [];
  try {
    var docs = await docRef.get();
    await docs.forEach((doc) => {
      results.push(doc.data()["category"]);
    });
    results = results.reduce((book1, book2) => {
      return book1.concat(book2);
    });
    results = results.filter(function (item, pos) {
      return results.indexOf(item) == pos;
    });
    // console.log(results);
    return results;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
