import fire from "./fire";

const firestore = fire.firestore();

//Method to get all categories of books in firestore database
export async function getUserDataById(userid) {
  //References to book information in database
  var docRef = firestore.collection("users").doc(userid).get();
  var results = null;
  try {
    results = await docRef.then((doc) => doc.data())
    .catch((err)=>{
        var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
    })
    return results
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
