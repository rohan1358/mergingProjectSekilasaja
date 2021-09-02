import fire from "./fire";

const firestore = fire.firestore();

//Method to get all categories of books in firestore database
export async function getPromoCode(inputCode) {
  //References to book information in database
  var docRef = firestore.collection("promo");
  var results = [];
  try {
    var docs = await docRef.get();
    await docs.forEach((doc) => {
      if (doc.data().code === inputCode) {
        const today = new Date();
        console.log(today);
        console.log(doc.data().end_date.toDate());
        console.log(today > doc.data().end_date.toDate());
        if (today < doc.data().end_date.toDate()) {
          console.log(doc.data());
          results.push(doc.data());
        }
      }
    });
    return results;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
