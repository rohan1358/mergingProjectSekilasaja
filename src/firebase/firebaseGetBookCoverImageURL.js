import firebase from "firebase";

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

//Method to get book cover image from firebase storage
export async function getBookCoverImageURL(referenceName) {
  var refName = "Book_Cover_Images/" + referenceName + " Cover.png";
  var imgRef = storage.ref().child(refName);

  try {
    var url = await imgRef.getDownloadURL();
    if (url) {
      return url;
    }
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }

  // NOT ASYNC WAY TO GET IMAGE
  //imgRef
  //.getDownloadURL()
  //    .then((url) => {
  //        console.log("HERE!");
  //        console.log(url);
  //        //return url;
  //})
  //.catch((err) => {
  //    var errorCode = err.code;
  //    var errorMessage = err.message;
  //    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  //});
}
