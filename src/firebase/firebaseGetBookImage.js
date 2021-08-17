import firebase from 'firebase';

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

//Method to get book image from firebase storage
export function getImageURL(referenceName) {
	var refName = 'Book_Cover_Images/' + referenceName;
	var imgRef = storage.ref().child(refName);

	imgRef.getDownloadURL().then((url) => {
		return url;
	}).catch((err) => {
		var errorCode = err.code;
		var errorMessage = err.message;
		console.log("Error: " + errorCode + "\n\n" + errorMessage);
	});
}