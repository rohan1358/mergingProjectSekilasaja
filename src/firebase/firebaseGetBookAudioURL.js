import firebase from "firebase";

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

//Method to get book cover image from firebase storage
export async function getBookAudioURL(referenceName, referenceChapter) {
  var refName = "Book_Audio/" + referenceName + "/" + referenceChapter + ".mp3";
  var audioRef = storage.ref().child(refName);

  try {
    var url = await audioRef.getDownloadURL();
    if (url) {
      return url;
    }
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
